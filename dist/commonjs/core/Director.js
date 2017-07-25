"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleton_1 = require("../until/singleton");
var WebglRenderer_1 = require("./renderer/render/WebglRenderer");
var Scene_1 = require("./Scene/Scene");
var Director = (function () {
    function Director() {
        this.renderer = null;
        this.scene = null;
    }
    Director.getInstance = function () { };
    Director.prototype.initWhenCreate = function () {
        this.renderer = WebglRenderer_1.WebglRenderer.create();
        this.scene = Scene_1.Scene.create();
    };
    Director.prototype.init = function () {
        this.renderer.init();
        this.scene.gameObjectScene.init();
    };
    Director.prototype.Render = function () {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.render();
    };
    Director.prototype.start = function () {
        this.init();
        this.Render();
    };
    return Director;
}());
Director = __decorate([
    singleton_1.singleton(true)
], Director);
exports.Director = Director;
//# sourceMappingURL=Director.js.map