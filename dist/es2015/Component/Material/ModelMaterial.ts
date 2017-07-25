import { Material } from "./Material";
import { ModelShader } from "../Render/Shader/shader/ModelShader";
export class ModelMaterial extends Material {
    public static create() {
        var obj = new this();
        obj.initWhenCreate();

        return obj;
    }

    getShader() {
        return ModelShader.create();
    }
}
