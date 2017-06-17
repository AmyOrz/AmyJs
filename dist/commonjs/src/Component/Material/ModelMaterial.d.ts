import { Material } from "./Material";
import { ModelShader } from "../Render/Shader/shader/ModelShader";
export declare class ModelMaterial extends Material {
    static create(): ModelMaterial;
    getShader(): ModelShader;
}
