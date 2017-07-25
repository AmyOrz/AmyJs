import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Geometry } from "../../../Component/Geometry/Geometry";
import { Transform } from "../../../Component/Transform/Transform";
import { MeshRenderer } from "../../../Component/Render/MeshRender/MeshRenderer";
var ComponentManager = (function () {
    function ComponentManager(_entityObject) {
        this._entityObject = _entityObject;
        this.transform = null;
        this.geometry = null;
        this._componentList = new Collection();
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
        if (component instanceof Geometry) {
            this.geometry = component;
        }
        else if (component instanceof Transform) {
            this.transform = component;
        }
        else if (component instanceof MeshRenderer) {
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
export { ComponentManager };
//# sourceMappingURL=ComponentManager.js.map