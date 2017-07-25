import { Material } from "./Material";
import { BasicShader } from "../Render/Shader/shader/BasicShader";
export class BasicMaterial extends Material {
    public static create() {
        var obj = new this();
        obj.initWhenCreate();

        return obj;
    }

    public getShader() {
        return BasicShader.create();
    }


}
