import { Material } from "./Material";
import { BasicShader } from "../Render/Shader/shader/BasicShader";
export declare class BasicMaterial extends Material {
    static create(): BasicMaterial;
    getShader(): BasicShader;
}
