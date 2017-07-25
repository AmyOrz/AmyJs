"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EVariableType_1 = require("../Program/EVariableType");
var EBufferDataType_1 = require("../../Geometry/BufferContainer/EBufferDataType");
var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_position = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: EBufferDataType_1.EBufferDataType.VERTICE
};
VariableLib.a_color = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: EBufferDataType_1.EBufferDataType.COLOR
};
VariableLib.a_normal = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: EBufferDataType_1.EBufferDataType.NORMAL
};
VariableLib.u_color = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: "color"
};
VariableLib.u_a = {
    type: EVariableType_1.EVariableType.FLOAT_1,
    buffer: "opacity"
};
VariableLib.u_mMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    buffer: "mMatrix"
};
VariableLib.u_vMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    buffer: "vMatrix"
};
VariableLib.u_pMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
    buffer: "pMatrix"
};
VariableLib.u_mvpMatrix = {
    type: EVariableType_1.EVariableType.FLOAT_MAT4,
};
exports.VariableLib = VariableLib;
//# sourceMappingURL=VariableLib.js.map