import { Program } from "../../Program/Program";
import { Geometry } from "../../../Geometry/Geometry";
export declare abstract class Shader {
    VSource: string;
    FSource: string;
    program: Program;
    init(geometry: Geometry): void;
    protected sendAttributeBuffer(name: string, data: any): void;
    protected sendUniformBData(name: string, data: any): void;
    protected abstract initProgram(geometry: Geometry): any;
    protected abstract sendShaderVariables(): any;
}
