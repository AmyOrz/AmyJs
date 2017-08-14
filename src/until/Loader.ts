import { ObjLoader } from "./ObjLoader";
import { MaterialLoader } from "./MaterialLoader";
import { Promise } from "rsvp/dist/rsvp.js";
import { Util } from "./Util";
import { ModelGeometry } from "../Component/Geometry/ModelGeometry";
import * as rxjs from "rxjs";
export class Loader {

    public static of() {
        var obj = new this();

        return obj;
    }

    private _objLoader: ObjLoader = ObjLoader.create();
    private _materialLoader: MaterialLoader = MaterialLoader.create();

    public readFileToStream(files): any {
        var streamArr = [];
        for (var i = 0, f; f = files[i]; i++) {
            streamArr.push(f);
        }
        var res = {};

        //noinspection TypeScriptUnresolvedFunction
        return rxjs.Observable.from(streamArr).flatMap(f => {
            //noinspection TypeScriptUnresolvedFunction
            return rxjs.Observable.fromPromise(new Promise((resolve, reject) => {
                var postfix = f.name.split(".")[1];
                if (postfix != "obj" && postfix != "mtl") {
                    reject("你选择的文件格式错误。");
                }
                var reader = new FileReader();
                reader.onload = function() {
                    res[postfix] = this.result;
                    if (postfix == "obj")
                        res["name"] = f.name.split(".")[0];
                    resolve(res);
                };

                reader.readAsText(f);
            }));
        }).last().flatMap(res => {
            console.log(res)
            return this.convertByFile(res);
        })
    }

    public convertByFile(fileObject) {
        var result = {};
        var materialStream = null;

        this._objLoader.convert(result, fileObject["obj"], fileObject["name"]);
        if (this._objLoader.mtlFilePath) {
            materialStream = this._materialLoader.convert(result, fileObject["mtl"]);
        }
        if (materialStream) {
            return materialStream.map(res => {
                return this._getModelGeometryByResult(res);
            })
        } else {
            console.log("没有材质信息，无法完成渲染");
        }
    }

    public convertByPath(filePath: string): any {
        var result: any = {};

        var objStream = this._getStream(filePath);
        var fileName = this._getName(filePath);

        return objStream.flatMap((fileContent) => {

            this._objLoader.convert(result, fileContent, fileName);
            if (this._objLoader.mtlFilePath) {
                var materialStream = this._getStream("./build/" + this._objLoader.mtlFilePath);
                return materialStream.flatMap((fileContent) => {
                    return this._materialLoader.convert(result, fileContent);
                })
            }
            //noinspection TypeScriptUnresolvedFunction
            return rxjs.Observable.from(result);
        }).map(res => {
            return this._getModelGeometryByResult(res);
        })
    }

    private _getModelGeometryByResult(res) {

        var objects = res.objs;
        var materials = res.materials == void 0 ? null : res.materials;

        var vertices = [];
        var colors = [];
        var normals = [];
        var texCoords = [];
        var indices = [];

        objects.forEach(obj => {

            var objVertices = obj.attribute.POSITION;
            var objNormals = obj.attribute.NORMAL;
            var objTexCoords = obj.attribute.TEXCOORD;


            obj.material.forEach(mater => {

                var currentMaterial = materials[mater.material];
                var color = currentMaterial.values.diffuse;

                var verticeIndices = mater.verticeIndices;
                var normalIndices = mater.normalIndices;
                var texCoordIndices = mater.texCoordIndices;

                verticeIndices.forEach((id) => {
                    vertices.push(objVertices[id * 3]);
                    vertices.push(objVertices[id * 3 + 1]);
                    vertices.push(objVertices[id * 3 + 2]);

                    indices.push(id)

                    colors.push(color[0]);
                    colors.push(color[1]);
                    colors.push(color[2]);
                });

                normalIndices.forEach(id => {
                    normals.push(objNormals[id * 3]);
                    normals.push(objNormals[id * 3 + 1]);
                    normals.push(objNormals[id * 3 + 2]);
                })

                texCoordIndices.forEach(id => {
                    texCoords.push(objTexCoords[id * 2]);
                    texCoords.push(objTexCoords[id * 2 + 1]);
                })

            });
        });

        var modelGeometry: ModelGeometry = ModelGeometry.create();
        modelGeometry.vertices = vertices;
        modelGeometry.colors = colors;
        modelGeometry.texCoords = texCoords;
        modelGeometry.normals = normals;
        modelGeometry.indices = indices;

        return modelGeometry;
    }

    private _getStream(filePath) {
        //noinspection TypeScriptUnresolvedFunction
        return rxjs.Observable.fromPromise(new Promise((resolve, reject) => {
            Util.ajax({
                url: filePath,
                success: val => resolve(val),
                error: val => reject(val)
            })
        }));
    }

    private _getName(filePath: string) {
        var reg = /[^\/]\w+/g;
        var result = filePath.match(reg);

        return result[result.length - 2];
    }
}