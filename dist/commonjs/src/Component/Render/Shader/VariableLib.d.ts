import { EVariableType } from "../Program/EVariableType";
import { EBufferDataType } from "../../Geometry/BufferContainer/EBufferDataType";
export declare class VariableLib {
    static a_position: {
        type: EVariableType;
        buffer: EBufferDataType;
    };
    static a_color: {
        type: EVariableType;
        buffer: EBufferDataType;
    };
    static u_color: {
        type: EVariableType;
        buffer: string;
    };
    static u_a: {
        type: EVariableType;
        buffer: string;
    };
    static u_mMatrix: {
        type: EVariableType;
        buffer: string;
    };
    static u_vMatrix: {
        type: EVariableType;
        buffer: string;
    };
    static u_pMatrix: {
        type: EVariableType;
        buffer: string;
    };
    static u_mvpMatrix: {
        type: EVariableType;
    };
}
