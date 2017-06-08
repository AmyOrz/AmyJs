import wdCb = require("wdcb");
import Log = require("../../../ts/Log");
import Vector2 = require("../../../ts/Vector2");
import Vector3 = require("../../../ts/Vector3");
import ModelLoaderUtils = require("../../common/ModelLoaderUtils");
import { obj } from "through2";

//todo handle x,y,z,w case?
const VERTEX_PATTERN = /v\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
// vn float float float
    NORMAL_PATTERN = /vn\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
// vt float float
    TEXCOORD_PATTERN = /vt\s([\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/,
    FACE_PATTERN = /f\s(.+)/,
// f vertex vertex vertex ...
    FACE_PATTERN1 = /f\s(([\d]{1,}[\s]+){2,}([\d]{1,}[\s]?))+/,
// f vertex/texCoord vertex/texCoord vertex/texCoord ...
    FACE_PATTERN2 = /f\s((([\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}[\s]?))+)/,
// f vertex/texCoord/normal vertex/texCoord/normal vertex/texCoord/normal ...
    FACE_PATTERN3 = /f\s((([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]+){2,}([\d]{1,}\/[\d]{1,}\/[\d]{1,}[\s]?))+)/,
// f vertex//normal vertex//normal vertex//normal ...
    FACE_PATTERN4 = /f\s((([\d]{1,}\/\/[\d]{1,}[\s]+){2,}([\d]{1,}\/\/[\d]{1,}[\s]?))+)/,
//var comment_pattern = /# /;
    OBJ_PATTERN = /^o /,
    GROUP_PATTERN = /^g /,
    USEMTL_PATTERN = /^usemtl /,
    MTLLIB_PATTERN = /^mtllib /,
    SMOOTH_PATTERN = /^s /;


export class ObjectsConverter {
    public static create() {
        var obj = new this();

        return obj;
    }

    public objects:wdCb.Collection<ObjectModel> = wdCb.Collection.create<ObjectModel>();
    public mtlFilePath:string = null;
    public materialName:string = null;
    public name:string = null;

    private _vertices:Array<number> = [];
    private _normals:Array<number> = [];
    private _texCoords:Array<number> = [];
    private _currentObject:ObjectModel = null;

    private _isObjectCreatedWithNoFace:boolean = false;


    public convert(json:any, fileContent:string, nodeName:string) {
        var lines = fileContent.split('\n'),
            topObject:any = {children:[]},
            result = [];

        this._convertFromObj(lines);

        let nodes = {},
            meshId = `${nodeName}_mesh`;

        json.nodes = nodes;

        nodes[nodeName] = {
            children:[],
            matrix:[
                1,
                0,
                0,
                0,

                0,
                1,
                0,
                0,

                0,
                0,
                1,
                0,

                0,
                0,
                0,
                1
            ],
            mesh:meshId,
            name:nodeName
        };


        let meshes = {};

        json.meshes = meshes;

        meshes[meshId] = {
            name:meshId,
            primitives:this._buildPrimitiveArr()
        }

        return json;
    }
    
    private _buildPrimitiveArr(){
        var self = this,
            arr = [];
        
        this.objects.forEach((objectModel:ObjectModel) => {
            arr.push({
                name:objectModel.name,
                attributes:{
                    POSITION:self._vertices,
                    TEXCOORD:self._texCoords,
                    NORMAL:self._normals
                },
                verticeIndices: objectModel.verticeIndices,
                normalIndices: objectModel.normalIndices,
                texCoordIndices: objectModel.texCoordIndices,
                material:objectModel.materialName,
                mode:4
            });
        });

        return arr;
    }

    private _convertFromObj(lines:Array<string>) {
        lines.forEach((line:string, i:number) => {
            var result = null;

            line = line.trim();


            if (line.length === 0 || line.charAt(0) === '#') {
                return;
            }
            else if (( result = VERTEX_PATTERN.exec(line) ) !== null) {
                // ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                this._vertices.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                );

                // this._isObjectCreatedWithNoFace = false;
            }
            else if (( result = NORMAL_PATTERN.exec(line) ) !== null) {
                // ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                this._normals.push(
                        parseFloat(result[1]),
                        parseFloat(result[2]),
                        parseFloat(result[3])
                );

                // this._isObjectCreatedWithNoFace = false;
            }
            else if (( result = TEXCOORD_PATTERN.exec(line) ) !== null) {
                // ["vt 0.1 0.2", "0.1", "0.2"]

                this._texCoords.push(
                        parseFloat(result[1]),
                        parseFloat(result[2])
                );

                // this._isObjectCreatedWithNoFace = false;
            }
            else if ((result = FACE_PATTERN.exec(line)) !== null) {
                this._convertFace(result);

                this._isObjectCreatedWithNoFace = false;
            }
            else if (GROUP_PATTERN.test(line) || OBJ_PATTERN.test(line)) {
                this._currentObject = ObjectModel.create();
                this._currentObject.name = line.substring(2).trim();
                this.objects.addChild(this._currentObject);
                this._isObjectCreatedWithNoFace = true;
            }
            else if (USEMTL_PATTERN.test(line)) {
                this._convertUsemtl(line);
            }
            else if (MTLLIB_PATTERN.test(line)) {
                this.mtlFilePath = line.substring(7).trim();
            }
            else if (SMOOTH_PATTERN.test(line)) {
                //todo support
            }
            else {
                Log.log(`Unhandled expression at line : ${i}\nvalue:${line}`);
            }
        });
    }

    private _isMultiMaterialOfSingleObject(){
        return this._isObjectCreatedWithNoFace === false;
    }

    private _getObjectNameWithMultiMaterialOfSingleObject(materialName:string){
        if(this._currentObject){
            return `${this._currentObject.name}_${materialName}`;
        }

        return materialName;
    }

    private _convertUsemtl(line) {
        var materialName = line.substring(7).trim();

        if(this._isMultiMaterialOfSingleObject()){
            let objName = this._getObjectNameWithMultiMaterialOfSingleObject(materialName);

            this._currentObject = ObjectModel.create();
            this._currentObject.name = objName;

            this.objects.addChild(this._currentObject);
        }

        this._currentObject.materialName = materialName;
    }

    private _convertFace(lineResult:Array<string>) {
        var face = lineResult[1].trim().split(" "),
            line = lineResult[0],
            triangles = [],
            result = null,
            k = null,
            verticeIndices = null,
            normalIndices = null,
            texCoordIndices = null;

        if(!this._currentObject){
            this._currentObject = ObjectModel.create();

            this.objects.addChild(this._currentObject);
        }

        if (face.length < 3) {
            return;
        }

        verticeIndices = this._currentObject.verticeIndices;
        normalIndices = this._currentObject.normalIndices;
        texCoordIndices = this._currentObject.texCoordIndices;

        this._getTriangles(face, triangles);

        if (( result = FACE_PATTERN1.exec(line) ) !== null) {
            for (k of triangles) {
                verticeIndices.push(parseInt(k) - 1);
            }
        }
        else if (( result = FACE_PATTERN2.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(parseInt(point[0]) - 1);
                texCoordIndices.push(parseInt(point[1]) - 1);
            }
        }
        else if (( result = FACE_PATTERN3.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("/");

                verticeIndices.push(parseInt(point[0]) - 1);
                texCoordIndices.push(parseInt(point[1]) - 1);
                normalIndices.push(parseInt(point[2]) - 1);
            }
        }
        else if (( result = FACE_PATTERN4.exec(line) ) !== null) {
            for (k of triangles) {
                let point = k.split("//");

                verticeIndices.push(parseInt(point[0]) - 1);
                normalIndices.push(parseInt(point[1]) - 1);
            }
        }
        else {
            Log.error(true, Log.info.FUNC_UNKNOW(lineResult));
        }
    }

    /**
     * Create triangles from polygons by recursion
     * The best to understand how it works is to draw it in the same time you get the recursion.
     * It is important to notice that a triangle is a polygon
     * We get 4 patterns of face defined in OBJ File :
     * facePattern1 = ["1","2","3","4","5","6"]
     * facePattern2 = ["1/1","2/2","3/3","4/4","5/5","6/6"]
     * facePattern3 = ["1/1/1","2/2/2","3/3/3","4/4/4","5/5/5","6/6/6"]
     * facePattern4 = ["1//1","2//2","3//3","4//4","5//5","6//6"]
     * Each pattern is divided by the same method
     * @param face Array[String] The indices of elements
     * @param v Integer The variable to increment
     */
    private _getTriangles(face:Array<string>, triangles:Array<string>) {
        var getTriangles = (v:number) => {
            if (v + 1 < face.length) {
                triangles.push(face[0], face[v], face[v + 1]);
                v++;

                getTriangles(v);
            }
        };

        getTriangles(1);
    }
}

class ObjectModel {
    public static create() {
        var obj = new this();

        return obj;
    }

    //todo add colors data?

    public vertices:Array<number> = [];
    public normals:Array<number> = [];
    public texCoords:Array<number> = [];
    public verticeIndices:Array<number> = [];
    public normalIndices:Array<number> = [];
    public texCoordIndices:Array<number> = [];
    public materialName:string = null;
    public name:string = null;
    public indicesCount:number = 0;
}
