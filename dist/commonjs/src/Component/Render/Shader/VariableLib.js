"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EVariableType_1 = require("../Program/EVariableType");
var EBufferDataType_1 = require("../../Geometry/BufferContainer/EBufferDataType");
var VariableLib = (function () {
    function VariableLib() {
    }
    return VariableLib;
}());
VariableLib.a_Position = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: EBufferDataType_1.EBufferDataType.VERTICE
};
VariableLib.a_Color = {
    type: EVariableType_1.EVariableType.FLOAT_3,
    buffer: EBufferDataType_1.EBufferDataType.COLOR
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