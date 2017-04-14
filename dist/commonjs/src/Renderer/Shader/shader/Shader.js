"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Program_1 = require("../../Program/Program");
var VariableLib_1 = require("../VariableLib");
var Shader = (function () {
    function Shader() {
        this.program = Program_1.Program.create();
    }
    Shader.prototype.init = function () {
        this.initProgram();
        this.sendShaderAttribute();
        this.program.use();
        this.sendShaderUniform();
    };
    Shader.prototype.sendAttributeBuffer = function (name, data) {
        this.program.sendAttributeBuffer(name, data);
    };
    Shader.prototype.sendUniformData = function (name, data) {
        this.program.sendUniformData(name, VariableLib_1.VariableLib[name].type, data);
    };
    return Shader;
}());
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map