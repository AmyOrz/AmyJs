import { EVariableType } from "../Program/EVariableType";
import { EBufferDataType } from "../../Geometry/BufferContainer/EBufferDataType";
export class VariableLib {
    public static a_Position = {
        type: EVariableType.FLOAT_3,
        buffer: EBufferDataType.VERTICE
    }

    public static a_Color = {
        type: EVariableType.FLOAT_3,
        buffer: EBufferDataType.COLOR
    }

    public static u_mMatrix = {
        type: EVariableType.FLOAT_MAT4,
        buffer: "mMatrix"
    };

    public static u_vMatrix = {
        type: EVariableType.FLOAT_MAT4,
        buffer: "vMatrix"
    };

    public static u_pMatrix = {
        type: EVariableType.FLOAT_MAT4,
        buffer: "pMatrix"
    };

    public static u_mvpMatrix = {
        type: EVariableType.FLOAT_MAT4,
    };

}
