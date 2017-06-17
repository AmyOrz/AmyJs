"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var MaterialLoader = (function () {
    function MaterialLoader() {
        this.materials = new Collection_1.Collection();
    }
    MaterialLoader.create = function () {
        var obj = new this();
        return obj;
    };
    MaterialLoader.prototype.convert = function (result, fileContent) {
        var _this = this;
        return Operator_1.createStream(function (observer) {
            var materials = {};
            _this._convertMaterial(fileContent);
            _this.materials.forEach(function (material) {
                var materialData = {}, valueData = {};
                if (material.opacity != void 0) {
                    if (material.opacity < 1) {
                        materialData.transparent = true;
                    }
                    else {
                        materialData.transparent = false;
                    }
                    materialData.transparency = material.opacity;
                }
                _this._addData(valueData, "diffuse", material.diffuseColor);
                _this._addData(valueData, "specular", material.specularColor);
                _this._addData(valueData, "emission", material.emissionColor);
                _this._addData(valueData, "shininess", material.shininess);
                materialData.values = valueData;
                materials[material.name] = materialData;
            });
            result.materials = materials;
            observer.next(result);
        });
    };
    MaterialLoader.prototype._addData = function (valueData, key, data) {
        if (!!data) {
            valueData[key] = data;
        }
    };
    MaterialLoader.prototype._convertMaterial = function (fileContent) {
        var _this = this;
        var DELIMITER_PATTERN = /\s+/;
        var lines = fileContent.split("\n");
        lines.forEach(function (line, i) {
            var pos = line.indexOf(" ");
            var key = _this._parseKey(line, pos);
            var value = _this._parseValue(line, pos);
            if (line.length === 0 || key == "#" || line == '')
                return;
            if (key == "newmtl") {
                _this._currentMaterial = MaterialModel.create();
                _this._currentMaterial.name = value;
                _this.materials.addChild(_this._currentMaterial);
            }
            else if (key == "kd") {
                _this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key == "ka") {
            }
            else if (key === "ks") {
                _this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ke") {
                _this._setColor("emissionColor", value.split(DELIMITER_PATTERN, 3));
            }
            else if (key === "ni") {
            }
            else if (key === "ns") {
                _this._currentMaterial.shininess = parseFloat(value);
            }
            else if (key === "d") {
                _this._currentMaterial.opacity = parseFloat(value);
            }
            else if (key === "map_ka") {
            }
            else if (key === "map_kd") {
                _this._currentMaterial.diffuseMapUrl = value;
            }
            else if (key === "map_ks") {
                _this._currentMaterial.specularMapUrl = value;
            }
            else if (key === "map_ke") {
                _this._currentMaterial.emissionMapUrl = value;
            }
            else if (key === "map_bump") {
                _this._currentMaterial.bumpMapUrl = value;
            }
            else if (key === "map_d") {
            }
            else if (key === "illum") {
            }
            else {
                console.log("Unhandled expression at line : " + (i + 1) + "\nvalue:" + line);
            }
        });
    };
    MaterialLoader.prototype._setColor = function (colorType, colorStrArr) {
        this._currentMaterial[colorType] = colorStrArr;
    };
    MaterialLoader.prototype._parseKey = function (line, pos) {
        return line.slice(0, pos).toLowerCase();
    };
    MaterialLoader.prototype._parseValue = function (line, pos) {
        return line.slice(pos + 1);
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