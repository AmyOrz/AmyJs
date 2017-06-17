import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/stream/MergeAllStream";
import {ObjLoader} from "./ObjLoader";
import {MaterialLoader} from "./MaterialLoader";
import { Promise } from "rsvp/dist/rsvp.js";
import { fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { AjaxUtil } from "./AjaxUtil";
import {just} from "wonder-frp/dist/commonjs/global/Operator";
import {ModelGeometry} from "../Component/Geometry/ModelGeometry";
export class Loader{

    public static of(){
        var obj = new this();

        return obj;
    }

    private _objLoader:ObjLoader = ObjLoader.create();
    private _materialLoader:MaterialLoader = MaterialLoader.create();


    public convert(filePath:string){
        var result:any = {};

        var objStream = this._getStream(filePath);
        var fileName = this._getName(filePath);

        return objStream.flatMap((fileContent)=>{

            this._objLoader.convert(result,fileContent,fileName);
            if(this._objLoader.mtlFilePath){
                var materialStream = this._getStream("./build/"+this._objLoader.mtlFilePath);
                return materialStream.flatMap((fileContent) => {
                    return this._materialLoader.convert(result,fileContent);
                })
            }
            return just(result);

        }).map((res)=>{
            var objects = res.objs;
            var materials = res.materials;

            var vertices = [];
            var colors = [];
            var normals = [];
            var texCoords = [];

            objects.forEach(obj=>{

                var objVertices = obj.attribute.POSITION;
                var objNormals = obj.attribute.NORMAL;
                var objTexCoords = obj.attribute.TEXCOORD;


                obj.material.forEach(mater=>{

                    var currentMaterial = materials[mater.material];
                    var color = currentMaterial.values.diffuse;

                    var verticeIndices = mater.verticeIndices;
                    var normalIndices = mater.normalIndices;
                    var texCoordIndices = mater.texCoordIndices;

                    verticeIndices.forEach((id)=>{
                        vertices.push(objVertices[id*3]);
                        vertices.push(objVertices[id*3+1]);
                        vertices.push(objVertices[id*3+2]);

                        colors.push(color[0]);
                        colors.push(color[1]);
                        colors.push(color[2]);
                    });

                    normalIndices.forEach(id=>{
                        normals.push(objNormals[id*3]);
                        normals.push(objNormals[id*3 + 1]);
                        normals.push(objNormals[id*3 + 2]);
                    })

                    texCoordIndices.forEach(id=>{
                        texCoords.push(objTexCoords[id*2]);
                        texCoords.push(objTexCoords[id*2 + 1]);
                    })

                });
            });

            var modelGeometry:ModelGeometry = ModelGeometry.create();
            modelGeometry.vertices = vertices;
            modelGeometry.colors = colors;
            modelGeometry.texCoords = texCoords;
            modelGeometry.normals = normals;

            return modelGeometry;
        })
    }t

    private _getStream(filePath){
        return fromPromise(new Promise((resolve, reject) => {
            AjaxUtil.ajax({
                url: filePath,
                success: val => resolve(val),
                error: val => reject(val)
            })
        }));
    }

    private _getName(filePath:string){
        var reg = /[^\/]\w+/g;
        var result = filePath.match(reg);

        return result[result.length-2];
    }
}