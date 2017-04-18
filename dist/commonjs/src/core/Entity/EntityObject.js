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
var Entity_1 = require("./Entity");
var EntityManager_1 = require("./Manager/EntityManager");
var ComponentManager_1 = require("./Manager/ComponentManager");
var EntityObject = (function (_super) {
    __extends(EntityObject, _super);
    function EntityObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this._entityManager = EntityManager_1.EntityManager.create(_this);
        _this._componentManager = ComponentManager_1.ComponentManager.create(_this);
        return _this;
    }
    Object.defineProperty(EntityObject.prototype, "transform", {
        get: function () {
            return this._componentManager.transform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EntityObject.prototype, "geometry", {
        get: function () {
            return this._componentManager.geometry;
        },
        enumerable: true,
        configurable: true
    });
    EntityObject.prototype.initWhenCreate = function () {
        this._componentManager.addComponent(this.createTransform());
    };
    EntityObject.prototype.init = function () {
        console.log(this);
        this._componentManager.init();
        this._entityManager.init();
        return this;
    };
    EntityObject.prototype.render = function (render) {
        var renderComponent = this._componentManager.getRenderComponent();
        if (renderComponent != void 0)
            renderComponent.render(render, this);
        this.getChildren().forEach(function (child) {
            child.render(render);
        });
    };
    EntityObject.prototype.dispose = function () {
        this._entityManager.dispose();
        return this;
    };
    EntityObject.prototype.hasChild = function (child) {
        return this._entityManager.hasChild(child);
    };
    EntityObject.prototype.addChild = function (child) {
        this._entityManager.addChild(child);
        return this;
    };
    EntityObject.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._entityManager.addChildren(args);
        return this;
    };
    EntityObject.prototype.forEach = function (func) {
        this._entityManager.forEach(func);
        return this;
    };
    EntityObject.prototype.filter = function (func) {
        return this._entityManager.filter(func);
    };
    EntityObject.prototype.getChildren = function () {
        return this._entityManager.getChildren();
    };
    EntityObject.prototype.getAllChildren = function () {
        return this._entityManager.getAllChildren();
    };
    EntityObject.prototype.getChild = function (index) {
        return this._entityManager.getChild(index);
    };
    EntityObject.prototype.findChildById = function (uid) {
        return this._entityManager.findChildById(uid);
    };
    EntityObject.prototype.findChildByName = function (name) {
        return this._entityManager.findChildByName(name);
    };
    EntityObject.prototype.findChildrenByName = function (name) {
        return this._entityManager.findChildrenByName(name);
    };
    EntityObject.prototype.removeChild = function (child) {
        return this._entityManager.removeChild(child);
    };
    EntityObject.prototype.removeAllChildren = function () {
        this._entityManager.removeAllChildren();
    };
    EntityObject.prototype.addComponent = function (component) {
        this._componentManager.addComponent(component);
    };
    return EntityObject;
}(Entity_1.Entity));
exports.EntityObject = EntityObject;
//# sourceMappingURL=EntityObject.js.map