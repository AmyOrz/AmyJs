import "wonder-frp/dist/es2015/stream/MapStream";
import "wonder-frp/dist/es2015/stream/MergeAllStream";
import {ObjLoader} from "./ObjLoader";
import {MaterialLoader} from "./MaterialLoader";
import { Promise } from "rsvp/dist/rsvp.js";
import { fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import { AjaxUtil } from "./AjaxUtil";
import {just} from "wonder-frp/dist/commonjs/global/Operator";
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
                return materialStream.map((fileContent) => {
                    result.materials = this._materialLoader.convert(result,fileContent);

                    return result
                })
            }
            return just(result);

        });
    }

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