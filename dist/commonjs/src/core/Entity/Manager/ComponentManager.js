"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Geometry_1 = require("../../../Component/Geometry/Geometry");
var Transform_1 = require("../../../Component/Transform/Transform");
var MeshRenderer_1 = require("../../../Component/Render/MeshRender/MeshRenderer");
var ComponentManager = (function () {
    function ComponentManager(_entityObject) {
        this._entityObject = _entityObject;
        this.transform = null;
        this.geometry = null;
        this._componentList = new Collection_1.Collection();
        this._renderComponent = null;
    }
    ComponentManager.create = function (entityObject) {
        var obj = new this(entityObject);
        return obj;
    };
    ComponentManager.prototype.init = function () {
        this._componentList.forEach(function (component) {
            component.init();
        });
    };
    ComponentManager.prototype.addComponent = function (component) {
        if (component instanceof Geometry_1.Geometry) {
            this.geometry = component;
        }
        else if (component instanceof Transform_1.Transform) {
            this.transform = component;
        }
        else if (component instanceof MeshRenderer_1.MeshRenderer) {
            this._renderComponent = component;
        }
        this._componentList.addChild(component);
        component.addToObject(this._entityObject);
    };
    ComponentManager.prototype.getComponent = function (componentClass) {
        return this._componentList.findOne(function (component) {
            return component instanceof componentClass;
        });
    };
    ComponentManager.prototype.hasComponent = function (componentClass) {
        var res = this._componentList.hasChildWithFunc(function (component) {
            return component instanceof componentClass;
        });
        return res;
    };
    ComponentManager.prototype.removeComponent = function (component) {
        this._componentList.removeChild(component);
    };
    ComponentManager.prototype.getRenderComponent = function () {
        return this._renderComponent;
    };
    ComponentManager.prototype.removeAllComponent = function () {
        this._componentList.removeAllChildren();
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map