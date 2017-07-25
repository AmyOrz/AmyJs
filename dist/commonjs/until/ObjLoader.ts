import "wonder-frp/dist/commonjs/stream/MapStream";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export class ObjLoader {
    public static create() {
        var obj = new this();

        return obj;
    }

    private regexp = {
        // v float float float
        vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vn float float float
        normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vt float float
        uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        face_pattern: /f\s(.+)/,
        // f vertex vertex vertex
        face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        // f vertex/uv vertex/uv vertex/uv
        face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        // f vertex/uv/normal vertex/uv/normal vertex/uv/normal
        face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        // f vertex//normal vertex//normal vertex//normal
        face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        // o object_name | g group_name
        object_pattern: /^[og]\s*(.+)?/,
        // s boolean
        smoothing_pattern: /^s\s+(\d+|on|off)/,
        // mtllib file_reference
        material_library_pattern: /^mtllib /,
        // usemtl material_name
        material_use_pattern: /^usemtl /
    };

    public objects: Collection<ObjectModel> = new Collection<ObjectModel>();
    public mtlFilePath: string = null;
    public materialName: string = null;
    public name: string = null;

    private _vertices: Array<number> = [];
    private _normals: Array<number> = [];
    private _texCoords: Array<number> = [];
    private _currentObject: ObjectModel = null;

    public convert(result, fileContent, fileName) {

        this._convertObject(fileContent);

        var currentObj: any;
        var objs = [];
        this._buildPrimitiveArr().forEach((item: any) => {
            if (item.material == void 0) {
                currentObj = {
                    attribute: item.attributes,
                    material: []
                };
                objs.push(currentObj);
            }
            else {
                currentObj.material.push(item)
            }
        });
        result.objs = objs;
        return result;
    }

    private _buildPrimitiveArr() {
        var me = this,
            arr = [];

        this.objects.forEach((objectModel: ObjectModel) => {
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
            })
        });
        return arr;
    }

    private _convertObject(fileContent) {
        if (fileContent.indexOf('\r\n') !== -1) {
            fileContent = fileContent.replace(/\r\n/g, '\n');
        }
        if (fileContent.indexOf('\\\n') !== -1) {
            fileContent = fileContent.replace(/\\\n/g, "");
        }

        var res = fileContent.split("\n"),
            result = [];

        for (var line of res) {

            line = line.trim();

            var lineFirst = line.charAt(0);

            if (lineFirst === "#" || lineFirst == '') continue;

            if (lineFirst === 'v') {

                var lineSecond = line.charAt(1);

                if (lineSecond === ' ' && (result = this.regexp.vertex_pattern.exec(line)) !== null) {
                    //result =  ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                    //          result[0]          res1   res2   res3

                    this._vertices.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                    );
                } else if (lineSecond === "n" && (result = this.regexp.normal_pattern.exec(line)) !== null) {
                    //result =  ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                    this._normals.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                    );
                } else if (lineSecond === "t" && (result = this.regexp.uv_pattern.exec(line)) !== null) {
                    //result =  ["vt 1.0 2.0", "1.0", "2.0"]

                    this._texCoords.push(
                        parseFloat(result[1]),
                        parseFloat(result[2])
                    );
                } else {
                    throw new Error("Unexpected vertex/normal/uv line: '" + line + "'");
                }
            } else if (lineFirst === "f") {
                this._convertFace(line);

            } else if ((result = this.regexp.object_pattern.exec(line)) !== null) {
                //o Cube || g Cube

                this._currentObject = ObjectModel.create();
                this._currentObject.name = result[1];
                this.objects.addChild(this._currentObject);

            } else if (this.regexp.material_use_pattern.test(line)) {
                //usemtl material
                this.convertUsemtl(line);

            } else if (this.regexp.material_library_pattern.test(line)) {
                //mtllib material
                this.mtlFilePath = line.substring(7).trim();

            } else if ((result = this.regexp.smoothing_pattern.exec(line)) !== null) {
                // smooth shading

            } else {
                console.log("Unexpected line: '" + line + "'");
            }
        }
    }

    private convertUsemtl(line: string) {
        var materialName = line.substring(7).trim();

        var objName = this._getObjectNameWithMultMaterialOfSingleObj(materialName);

        this._currentObject = ObjectModel.create();
        this._currentObject.name = objName;
        this.objects.addChild(this._currentObject);

        this._currentObject.materialName = materialName;
    }

    private _getObjectNameWithMultMaterialOfSingleObj(materialName: string) {
        if (this._currentObject) {
            return `${this._currentObject.name}_${materialName}`;
        }
        return materialName;
    }

    private _convertFace(lines) {
        var lineResult = this.regexp.face_pattern.exec(lines);
        var face = lineResult[1].trim().split(" "),
            line = lineResult[0],
            triangles = [],
            result = null,
            k = null,
            verticeIndices = [],
            normalIndices = [],
            texCoordIndices = [];

        if (!this._currentObject) {
            this._currentObject = ObjectModel.create();

            this.objects.addChild(this._currentObject);
        }

        if (face.length < 3) return;

        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        texCoordIndices = this._currentObject.texCoordIndices;

        this._getTriangles(face, triangles);

        if ((result = this.regexp.face_vertex_uv_normal.exec(line)) !== null) {

            // f vertex/uv/normal vertex/uv/normal vertex/uv/normal
            // 0                        1    2    3    4    5    6    7    8    9   10         11         12
            // ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(parseInt(point[0]) - 1);
                texCoordIndices.push(parseInt(point[1]) - 1);
                normalIndices.push(parseInt(point[2]) - 1);
            }

        } else if ((result = this.regexp.face_vertex_uv.exec(line)) !== null) {

            // f vertex/texCoord vertex/texCoord vertex/texCoord
            // 0                  1    2    3    4    5    6   7          8
            // ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(~~(point[0]) - 1);
                texCoordIndices.push(~~(point[1]) - 1);
            }

        } else if ((result = this.regexp.face_vertex_normal.exec(line)) !== null) {

            // f vertex//normal vertex//normal vertex//normal
            // 0                     1    2    3    4    5    6   7          8
            // ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

            for (k of triangles) {
                let point = k.split("//");

                verticeIndices.push(parseInt(point[0]) - 1);
                normalIndices.push(parseInt(point[1]) - 1);
            }

        } else if ((result = this.regexp.face_vertex.exec(line)) !== null) {

            // f vertex vertex vertex
            // 0            1    2    3   4
            // ["f 1 2 3", "1", "2", "3", undefined]

            for (k of triangles) {
                verticeIndices.push(~~(k) - 1);
            }
        } else {
            console.log("this line is error: " + lineResult)
        }
    }

    private _getTriangles(face: Array<string>, triangles: Array<string>) {
        var getTriangles = (v: number) => {
            if (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;

                getTriangles(v);
            }
        };

        getTriangles(1);
    }
}

export class ObjectModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    public vertices: number[] = [];
    public normals: number[] = [];
    public texCoords: number[] = [];
    public verticeIndices: number[] = [];
    public normalIndices: number[] = [];
    public texCoordIndices: number[] = [];
    public materialName: string = null;
    public name: string = null;
    public indicesCount: number = 0;
}
