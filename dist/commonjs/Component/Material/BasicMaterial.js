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
var BasicShader_1 = require("../Render/Shader/shader/BasicShader");
var BasicMaterial = (function (_super) {
    __extends(BasicMaterial, _super);
    function BasicMaterial() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasicMaterial.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    BasicMaterial.prototype.getShader = function () {
        return BasicShader_1.BasicShader.create();
    };
    return BasicMaterial;
}(Material_1.Material));
exports.BasicMaterial = BasicMaterial;
//# sourceMappingURL=BasicMaterial.js.map