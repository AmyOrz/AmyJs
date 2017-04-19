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
var EntityObject_1 = require("../Entity/EntityObject");
var GameObjectScene = (function (_super) {
    __extends(GameObjectScene, _super);
    function GameObjectScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameObjectScene.create = function () {
        var obj = new this();
        obj.initWhenCreate();
        return obj;
    };
    GameObjectScene.prototype.initWhenCreate = function () {
        this.name = "GameObjectScene" + this.uid;
    };
    GameObjectScene.prototype.createTransform = function () {
        return null;
    };
    return GameObjectScene;
}(EntityObject_1.EntityObject));
exports.GameObjectScene = GameObjectScene;
//# sourceMappingURL=GameObjectScene.js.map