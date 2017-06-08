"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var MaterialLoader = (function () {
    function MaterialLoader() {
        this.materials = new Collection_1.Collection();
    }
    MaterialLoader.create = function () {
        var obj = new this();
        return obj;
    };
    MaterialLoader.prototype.convert = function (result, fileContent) {
        var materials = {};
        return materials;
    };
    return MaterialLoader;
}());
exports.MaterialLoader = MaterialLoader;
var MaterialModel = (function () {
    function MaterialModel() {
        this.name = null;
        this.diffuseColor = null;
        this.specularColor = null;
        this.emissionColor = null;
        this.opacity = null;
        this.shininess = null;
        this.diffuseMapUrl = null;
        this.specularMapUrl = null;
        this.emissionMapUrl = null;
        this.bumpMapUrl = null;
    }
    MaterialModel.create = function () {
        var obj = new this();
        return obj;
    };
    return MaterialModel;
}());
exports.MaterialModel = MaterialModel;
//# sourceMappingURL=MaterialLoader.js.map