import { ObjLoader } from "./ObjLoader";
import { MaterialLoader } from "./MaterialLoader";
import { Promise } from "rsvp/dist/rsvp.js";
import { AjaxUtil } from "./AjaxUtil";
import { ModelGeometry } from "../Component/Geometry/ModelGeometry";
import * as rxjs from "rxjs";
var Loader = (function () {
    function Loader() {
        this._objLoader = ObjLoader.create();
        this._materialLoader = MaterialLoader.create();
    }
    Loader.of = function () {
        var obj = new this();
        return obj;
    };
    Loader.prototype.readFileToStream = function (files) {
        var _this = this;
        var streamArr = [];
        for (var i = 0, f; f = files[i]; i++) {
            streamArr.push(f);
        }
        var res = {};
        return rxjs.Observable.from(streamArr).flatMap(function (f) {
            return rxjs.Observable.fromPromise(new Promise(function (resolve, reject) {
                var postfix = f.name.split(".")[1];
                if (postfix != "obj" && postfix != "mtl") {
                    reject("你选择的文件格式错误。");
                }
                var reader = new FileReader();
                reader.onload = function () {
                    res[postfix] = this.result;
                    if (postfix == "obj")
                        res["name"] = f.name.split(".")[0];
                    resolve(res);
                };
                reader.readAsText(f);
            }));
        }).last().flatMap(function (res) {
            console.log(res);
            return _this.convertByFile(res);
        });
    };
    Loader.prototype.convertByFile = function (fileObject) {
        var _this = this;
        var result = {};
        var materialStream = null;
        this._objLoader.convert(result, fileObject["obj"], fileObject["name"]);
        if (this._objLoader.mtlFilePath) {
            materialStream = this._materialLoader.convert(result, fileObject["mtl"]);
        }
        if (materialStream) {
            return materialStream.map(function (res) {
                return _this._getModelGeometryByResult(res);
            });
        }
        else {
            console.log("没有材质信息，无法完成渲染");
        }
    };
    Loader.prototype.convertByPath = function (filePath) {
        var _this = this;
        var result = {};
        var objStream = this._getStream(filePath);
        var fileName = this._getName(filePath);
        return objStream.flatMap(function (fileContent) {
            _this._objLoader.convert(result, fileContent, fileName);
            if (_this._objLoader.mtlFilePath) {
                var materialStream = _this._getStream("./build/" + _this._objLoader.mtlFilePath);
                return materialStream.flatMap(function (fileContent) {
                    return _this._materialLoader.convert(result, fileContent);
                });
            }
            return rxjs.Observable.from(result);
        }).map(function (res) {
            return _this._getModelGeometryByResult(res);
        });
    };
    Loader.prototype._getModelGeometryByResult = function (res) {
        var objects = res.objs;
        var materials = res.materials == void 0 ? null : res.materials;
        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];
        objects.forEach(function (obj) {
            var objVertices = obj.attribute.POSITION;
            var objNormals = obj.attribute.NORMAL;
            var objTexCoords = obj.attribute.TEXCOORD;
            obj.material.forEach(function (mater) {
                var currentMaterial = materials[mater.material];
                var color = currentMaterial.values.diffuse;
                var verticeIndices = mater.verticeIndices;
                var normalIndices = mater.normalIndices;
                var texCoordIndices = mater.texCoordIndices;
                verticeIndices.forEach(function (id) {
                    vertices.push(objVertices[id * 3]);
                    vertices.push(objVertices[id * 3 + 1]);
                    vertices.push(objVertices[id * 3 + 2]);
                    indices.push(id);
                    colors.push(color[0]);
                    colors.push(color[1]);
                    colors.push(color[2]);
                });
                normalIndices.forEach(function (id) {
                    normals.push(objNormals[id * 3]);
                    normals.push(objNormals[id * 3 + 1]);
                    normals.push(objNormals[id * 3 + 2]);
                });
                texCoordIndices.forEach(function (id) {
                    texCoords.push(objTexCoords[id * 2]);
                    texCoords.push(objTexCoords[id * 2 + 1]);
                });
            });
        });
        var modelGeometry = ModelGeometry.create();
        modelGeometry.vertices = vertices;
        modelGeometry.colors = colors;
        modelGeometry.texCoords = texCoords;
        modelGeometry.normals = normals;
        modelGeometry.indices = indices;
        return modelGeometry;
    };
    Loader.prototype._getStream = function (filePath) {
        return rxjs.Observable.fromPromise(new Promise(function (resolve, reject) {
            AjaxUtil.ajax({
                url: filePath,
                success: function (val) { return resolve(val); },
                error: function (val) { return reject(val); }
            });
        }));
    };
    Loader.prototype._getName = function (filePath) {
        var reg = /[^\/]\w+/g;
        var result = filePath.match(reg);
        return result[result.length - 2];
    };
    return Loader;
}());
export { Loader };
//# sourceMappingURL=Loader.js.map