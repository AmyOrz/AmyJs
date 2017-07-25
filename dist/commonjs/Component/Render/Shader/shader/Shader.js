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
var Program_1 = require("../../Program/Program");
var VariableLib_1 = require("../VariableLib");
var Component_1 = require("../../../../core/Component");
var Shader = (function (_super) {
    __extends(Shader, _super);
    function Shader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.program = Program_1.Program.create();
        _this._shaderLib = _this.createShaderLib();
        return _this;
    }
    Object.defineProperty(Shader.prototype, "VSource", {
        get: function () {
            return this._shaderLib.VSource;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Shader.prototype, "FSource", {
        get: function () {
            return this._shaderLib.FSource;
        },
        enumerable: true,
        configurable: true
    });
    Shader.prototype.init = function () {
        this.initProgram();
        this._shaderLib.init();
    };
    Shader.prototype.sendAttributeBuffer = function (name, data) {
        this.program.sendAttributeBuffer(name, data);
    };
    Shader.prototype.sendUniformData = function (name, data) {
        this.program.sendUniformData(name, VariableLib_1.VariableLib[name].type, data);
    };
    return Shader;
}(Component_1.Component));
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map