"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Program_1 = require("../../Program/Program");
var VariableLib_1 = require("../VariableLib");
var Shader = (function () {
    function Shader() {
        this.program = Program_1.Program.create();
    }
    Shader.prototype.init = function (geometry) {
        this.initProgram(geometry);
    };
    Shader.prototype.sendAttributeBuffer = function (name, data) {
        this.program.sendAttributeBuffer(name, data);
    };
    Shader.prototype.sendUniformBData = function (name, data) {
        this.program.sendUniformData(name, VariableLib_1.VariableLib[name].type, data);
    };
    return Shader;
}());
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map