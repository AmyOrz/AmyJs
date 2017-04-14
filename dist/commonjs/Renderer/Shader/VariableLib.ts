import {EVariableType} from "../Program/EVariableType";
export class VariableLib{
    public static a_Position = {
        type:EVariableType.FLOAT_3
    }

    public static a_Color = {
        type:EVariableType.FLOAT_3
    }

    public static u_mMatrix = {
        type:EVariableType.FLOAT_MAT4,
    };

    public static u_vMatrix = {
        type:EVariableType.FLOAT_MAT4,
    };

    public static u_pMatrix = {
        type:EVariableType.FLOAT_MAT4,
    };

    public static u_mvpMatrix = {
        type:EVariableType.FLOAT_MAT4,
    };

}
