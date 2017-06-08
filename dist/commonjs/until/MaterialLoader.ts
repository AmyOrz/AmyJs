import {Collection} from "wonder-commonlib/dist/commonjs/Collection";
export class MaterialLoader{
    public static create(){
        var obj = new this();

        return obj;
    }

    public materials:Collection<MaterialModel> = new Collection<MaterialModel>();

    private _currentMaterial:MaterialModel;


    public convert(result:any,fileContent:string){

        var materials = {};



        return materials
    }
}
export class MaterialModel{

    public static create() {
        var obj = new this();

        return obj;
    }

    public name:string = null;
    public diffuseColor:Array<number> = null;
    public specularColor:Array<number> = null;
    public emissionColor:Array<number> = null;
    public opacity:number = null;
    public shininess:number = null;
    public diffuseMapUrl:string = null;
    public specularMapUrl:string = null;
    public emissionMapUrl:string = null;
    public bumpMapUrl:string = null;
}