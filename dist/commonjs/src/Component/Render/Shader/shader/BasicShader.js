"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Shader_1 = require("./Shader");
var BasicShaderLib_1 = require("../lib/BasicShaderLib");
var VariableLib_1 = require("../VariableLib");
var BasicShader = (function (_super) {
    __extends(BasicShader, _super);
    function BasicShader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicShader.create = function () {
        var obj = new this();
        return obj;
    };
    BasicShader.prototype.initProgram = function () {
        this.program.initProgramWithShader(this);
    };
    BasicShader.prototype.createShaderLib = function () {
        return BasicShaderLib_1.BasicShaderLib.create();
    };
    BasicShader.prototype.update = function (cmd, material) {
        var _this = this;
        this.program.use();
        this._shaderLib.getAttributes().forEach(function (item) {
            var buffer = cmd.buffers.getChild(VariableLib_1.VariableLib[item].buffer);
            _this.sendAttributeBuffer(item, buffer);
        });
        this.program.sendAllBufferData();
        this._shaderLib.getUniforms().forEach(function (item) {
            _this.sendUniformData(item, cmd[VariableLib_1.VariableLib[item].buffer]);
        });
    };
    return BasicShader;
}(Shader_1.Shader));
exports.BasicShader = BasicShader;
//# sourceMappingURL=BasicShader.js.map