"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Geometry_1 = require("../../../Component/Geometry/Geometry");
var Transform_1 = require("../../../Component/Transform/Transform");
var ComponentManager = (function () {
    function ComponentManager(_entityObject) {
        this._entityObject = _entityObject;
        this.transform = null;
        this._componentList = new Collection_1.Collection();
        this._geometry = null;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
    };
    ComponentManager.prototype.addComponent = function (component) {
        if (component instanceof Geometry_1.Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform_1.Transform) {
            this.transform = component;
        }
        this._componentList.addChild(component);
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map