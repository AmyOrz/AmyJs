import { Color } from "../../Math/Color";
var Material = (function () {
    function Material() {
        this._color = Color.create("#ffffff");
        this.opacity = 1.0;
        this._shader = null;
    }
    Object.defineProperty(Material.prototype, "program", {
        get: function () {
            return this._shader.program;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (color) {
            if (this._color !== color) {
                this._color = color;
            }
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
export { Material };
//# sourceMappingURL=Material.js.map