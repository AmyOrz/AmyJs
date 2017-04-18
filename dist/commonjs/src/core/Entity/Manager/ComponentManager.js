"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("wonder-commonlib/dist/commonjs/Collection");
var Geometry_1 = require("../../../Component/Geometry/Geometry");
var Transform_1 = require("../../../Component/Transform/Transform");
var MeshRender_1 = require("../../../Component/Renderer/MeshRender/MeshRender");
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
        console.log(this._componentList);
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
        else if (component instanceof MeshRender_1.MeshRender) {
            this._renderComponent = component;
        }
        this._componentList.addChild(component);
        component.addToObject(this._entityObject);
    };
    ComponentManager.prototype.getRenderComponent = function () {
        return this._renderComponent;
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map