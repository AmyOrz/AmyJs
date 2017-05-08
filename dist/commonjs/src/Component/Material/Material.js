"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Material = (function () {
    function Material() {
        this._shader = null;
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this._shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Material.prototype.initWhenCreate = function () {
        this._shader = this.getShader();
    };
    Material.prototype.init = function () {
        this._shader.init();
    };
    Material.prototype.update = function (cmd) {
        this._shader.update(cmd, this);
    };
    return Material;
}());
exports.Material = Material;
//# sourceMappingURL=Material.js.map