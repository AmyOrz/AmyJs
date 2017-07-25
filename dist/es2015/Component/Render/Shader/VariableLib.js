import { EVariableType } from "../Program/EVariableType";
import { EBufferDataType } from "../../Geometry/BufferContainer/EBufferDataType";
var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
export { VariableLib };
VariableLib.a_position = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.VERTICE
};
VariableLib.a_color = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.COLOR
};
VariableLib.a_normal = {
    type: EVariableType.FLOAT_3,
    buffer: EBufferDataType.NORMAL
};
VariableLib.u_color = {
    type: EVariableType.FLOAT_3,
    buffer: "color"
};
VariableLib.u_a = {
    type: EVariableType.FLOAT_1,
    buffer: "opacity"
};
VariableLib.u_mMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "mMatrix"
};
VariableLib.u_vMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "vMatrix"
};
VariableLib.u_pMatrix = {
    type: EVariableType.FLOAT_MAT4,
    buffer: "pMatrix"
};
VariableLib.u_mvpMatrix = {
    type: EVariableType.FLOAT_MAT4,
};
//# sourceMappingURL=VariableLib.js.map