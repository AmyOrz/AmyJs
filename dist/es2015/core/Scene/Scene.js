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
import { EntityObject } from "../Entity/EntityObject";
import { GameObject } from "../Entity/GameObject";
import { GameObjectScene } from "./GameObjectScene";
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gameObjectScene = GameObjectScene.create();
        return _this;
    }
    Scene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    Scene.prototype.initWhenCreate = function () {
        this.name = "Scene" + this.uid;
    };
    Scene.prototype.createTransform = function () {
        return null;
    };
    Scene.prototype.addChild = function (child) {
        if (child instanceof GameObject) {
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;
        return this;
    };
    return Scene;
}(EntityObject));
export { Scene };
//# sourceMappingURL=Scene.js.map