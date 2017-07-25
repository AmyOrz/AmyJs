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
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Entity } from "../Entity";
import { JudgeUtils } from "wonder-frp/dist/es2015/JudgeUtils";
var EntityManager = (function (_super) {
    __extends(EntityManager, _super);
    function EntityManager(_entityDispatcher) {
        var _this = _super.call(this) || this;
        _this._entityDispatcher = _entityDispatcher;
        _this._objectList = new Collection();
        return _this;
    }
    EntityManager.create = function (entityDispatcher) {
        var obj = new this(entityDispatcher);
        return obj;
    };
    EntityManager.prototype.init = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.dispose = function () {
        this.forEach(function (child) {
            child.init();
        });
    };
    EntityManager.prototype.hasChild = function (child) {
        return this._objectList.hasChild(child);
    };
    EntityManager.prototype.addChild = function (child) {
        this._objectList.addChild(child);
        return this;
    };
    EntityManager.prototype.addChildren = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var addChild = args[1] == void 0 ? this.addChild : args[1];
        if (JudgeUtils.isArray(args[0])) {
            var children = args[0];
            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
                var child = children_1[_a];
                addChild(child);
            }
        }
        else
            addChild(args[0]);
        return this;
    };
    EntityManager.prototype.forEach = function (func) {
        this._objectList.forEach(func);
        return this;
    };
    EntityManager.prototype.filter = function (func) {
        return this._objectList.filter(func);
    };
    EntityManager.prototype.getChildren = function () {
        return this._objectList;
    };
    EntityManager.prototype.getAllChildren = function () {
        var res = Collection.create();
        var getChildren = function (children) {
            res.addChildren(children.getChildren());
            children.forEach(function (child) {
                getChildren(child);
            });
        };
        getChildren(this._entityDispatcher);
        return res;
    };
    EntityManager.prototype.getChild = function (index) {
        return this._objectList.getChild(index);
    };
    EntityManager.prototype.findChildById = function (uid) {
        return this._objectList.findOne(function (child) {
            return child.uid == uid;
        });
    };
    EntityManager.prototype.findChildByName = function (name) {
        return this._objectList.findOne(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.findChildrenByName = function (name) {
        return this.filter(function (child) {
            return child.name.search(name) > -1;
        });
    };
    EntityManager.prototype.removeChild = function (child) {
        this._objectList.removeChild(child);
        return this;
    };
    EntityManager.prototype.removeAllChildren = function () {
        var _this = this;
        this._objectList.forEach(function (child) {
            _this.removeChild(child);
        }, this);
    };
    return EntityManager;
}(Entity));
export { EntityManager };
//# sourceMappingURL=EntityManager.js.map