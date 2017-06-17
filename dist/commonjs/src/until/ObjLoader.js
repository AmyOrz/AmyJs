"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("wonder-frp/dist/commonjs/stream/MapStream");
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var ObjLoader = (function () {
    function ObjLoader() {
        this.regexp = {
            vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            face_pattern: /f\s(.+)/,
            face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
            face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
            face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
            face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
            object_pattern: /^[og]\s*(.+)?/,
            smoothing_pattern: /^s\s+(\d+|on|off)/,
            material_library_pattern: /^mtllib /,
            material_use_pattern: /^usemtl /
        };
        this.objects = new Collection_1.Collection();
        this.mtlFilePath = null;
        this.materialName = null;
        this.name = null;
        this._vertices = [];
        this._normals = [];
        this._texCoords = [];
        this._currentObject = null;
    }
    ObjLoader.create = function () {
        var obj = new this();
        return obj;
    };
    ObjLoader.prototype.convert = function (result, fileContent, fileName) {
        this._convertObject(fileContent);
        var currentObj;
        var objs = [];
        this._buildPrimitiveArr().forEach(function (item) {
            if (item.material == void 0) {
                currentObj = {
                    attribute: item.attributes,
                    material: []
                };
                objs.push(currentObj);
            }
            else {
                currentObj.material.push(item);
            }
        });
        result.objs = objs;
        return result;
    };
    ObjLoader.prototype._buildPrimitiveArr = function () {
        var me = this, arr = [];
        this.objects.forEach(function (objectModel) {
            arr.push({
                name: objectModel.name,
                attributes: {
                    POSITION: me._vertices,
                    TEXCOORD: me._texCoords,
                    NORMAL: me._normals
                },
                verticeIndices: objectModel.verticeIndices,
                normalIndices: objectModel.normalIndices,
                texCoordIndices: objectModel.texCoordIndices,
                material: objectModel.materialName,
                mode: 4
            });
        });
        return arr;
    };
    ObjLoader.prototype._convertObject = function (fileContent) {
        if (fileContent.indexOf('\r\n') !== -1) {
            fileContent = fileContent.replace(/\r\n/g, '\n');
        }
        if (fileContent.indexOf('\\\n') !== -1) {
            fileContent = fileContent.replace(/\\\n/g, "");
        }
        var res = fileContent.split("\n"), result = [];
        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
            var line = res_1[_i];
            line = line.trim();
            var lineFirst = line.charAt(0);
            if (lineFirst === "#" || lineFirst == '')
                continue;
            if (lineFirst === 'v') {
                var lineSecond = line.charAt(1);
                if (lineSecond === ' ' && (result = this.regexp.vertex_pattern.exec(line)) !== null) {
                    this._vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                }
                else if (lineSecond === "n" && (result = this.regexp.normal_pattern.exec(line)) !== null) {
                    this._normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                }
                else if (lineSecond === "t" && (result = this.regexp.uv_pattern.exec(line)) !== null) {
                    this._texCoords.push(parseFloat(result[1]), parseFloat(result[2]));
                }
                else {
                    throw new Error("Unexpected vertex/normal/uv line: '" + line + "'");
                }
            }
            else if (lineFirst === "f") {
                this._convertFace(line);
            }
            else if ((result = this.regexp.object_pattern.exec(line)) !== null) {
                this._currentObject = ObjectModel.create();
                this._currentObject.name = result[1];
                this.objects.addChild(this._currentObject);
            }
            else if (this.regexp.material_use_pattern.test(line)) {
                this.convertUsemtl(line);
            }
            else if (this.regexp.material_library_pattern.test(line)) {
                this.mtlFilePath = line.substring(7).trim();
            }
            else if ((result = this.regexp.smoothing_pattern.exec(line)) !== null) {
            }
            else {
                console.log("Unexpected line: '" + line + "'");
            }
        }
    };
    ObjLoader.prototype.convertUsemtl = function (line) {
        var materialName = line.substring(7).trim();
        var objName = this._getObjectNameWithMultMaterialOfSingleObj(materialName);
        this._currentObject = ObjectModel.create();
        this._currentObject.name = objName;
        this.objects.addChild(this._currentObject);
        this._currentObject.materialName = materialName;
    };
    ObjLoader.prototype._getObjectNameWithMultMaterialOfSingleObj = function (materialName) {
        if (this._currentObject) {
            return this._currentObject.name + "_" + materialName;
        }
        return materialName;
    };
    ObjLoader.prototype._convertFace = function (lines) {
        var lineResult = this.regexp.face_pattern.exec(lines);
        var face = lineResult[1].trim().split(" "), line = lineResult[0], triangles = [], result = null, k = null, verticeIndices = [], normalIndices = [], texCoordIndices = [];
        if (!this._currentObject) {
            this._currentObject = ObjectModel.create();
            this.objects.addChild(this._currentObject);
        }
        if (face.length < 3)
            return;
        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        texCoordIndices = this._currentObject.texCoordIndices;
        this._getTriangles(face, triangles);
        if ((result = this.regexp.face_vertex_uv_normal.exec(line)) !== null) {
            for (var _i = 0, triangles_1 = triangles; _i < triangles_1.length; _i++) {
                k = triangles_1[_i];
                var point = k.split("/");
                verticeIndices.push(parseInt(point[0]) - 1);
                texCoordIndices.push(parseInt(point[1]) - 1);
                normalIndices.push(parseInt(point[2]) - 1);
            }
        }
        else if ((result = this.regexp.face_vertex_uv.exec(line)) !== null) {
            for (var _a = 0, triangles_2 = triangles; _a < triangles_2.length; _a++) {
                k = triangles_2[_a];
                var point = k.split("/");
                verticeIndices.push(~~(point[0]) - 1);
                texCoordIndices.push(~~(point[1]) - 1);
            }
        }
        else if ((result = this.regexp.face_vertex_normal.exec(line)) !== null) {
            for (var _b = 0, triangles_3 = triangles; _b < triangles_3.length; _b++) {
                k = triangles_3[_b];
                var point = k.split("//");
                verticeIndices.push(parseInt(point[0]) - 1);
                normalIndices.push(parseInt(point[1]) - 1);
            }
        }
        else if ((result = this.regexp.face_vertex.exec(line)) !== null) {
            for (var _c = 0, triangles_4 = triangles; _c < triangles_4.length; _c++) {
                k = triangles_4[_c];
                verticeIndices.push(~~(k) - 1);
            }
        }
        else {
            console.log("this line is error: " + lineResult);
        }
    };
    ObjLoader.prototype._getTriangles = function (face, triangles) {
        var getTriangles = function (v) {
            if (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;
                getTriangles(v);
            }
        };
        getTriangles(1);
    };
    return ObjLoader;
}());
exports.ObjLoader = ObjLoader;
var ObjectModel = (function () {
    function ObjectModel() {
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        this.verticeIndices = [];
        this.normalIndices = [];
        this.texCoordIndices = [];
        this.materialName = null;
        this.name = null;
        this.indicesCount = 0;
    }
    ObjectModel.create = function () {
        var obj = new this();
        return obj;
    };
    return ObjectModel;
}());
exports.ObjectModel = ObjectModel;
//# sourceMappingURL=ObjLoader.js.map