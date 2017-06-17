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
var Material_1 = require("./Material");
var ModelShader_1 = require("../Render/Shader/shader/ModelShader");
var ModelMaterial = (function (_super) {
    __extends(ModelMaterial, _super);
    function ModelMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ModelMaterial.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    ModelMaterial.prototype.getShader = function () {
        return ModelShader_1.ModelShader.create();
    };
    return ModelMaterial;
}(Material_1.Material));
exports.ModelMaterial = ModelMaterial;
//# sourceMappingURL=ModelMaterial.js.map