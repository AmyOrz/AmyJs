"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderLib = (function () {
    function ShaderLib() {
        this._attributes = [];
        this._uniforms = [];
    }
    ShaderLib.prototype.getAttributes = function () {
        return this._attributes;
    };
    ShaderLib.prototype.getUniforms = function () {
        return this._uniforms;
    };
    ;
    return ShaderLib;
}());
exports.ShaderLib = ShaderLib;
//# sourceMappingURL=ShaderLib.js.map