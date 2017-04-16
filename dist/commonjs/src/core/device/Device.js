"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var singleton_1 = require("../../until/singleton");
var View_1 = require("./view/View");
var Device = (function () {
    function Device() {
    }
    Device.getInstance = function () { };
    Device.prototype.createGL = function (canvasId, contextConfigData, parentId) {
        var canvas = document.createElement("canvas");
        if (canvasId) {
            canvas.setAttribute("id", canvasId);
        }
        if (parentId) {
            this._parentEle = document.getElementById(parentId);
            if (this._parentEle == void 0)
                alert("找不到指定parentId的dom节点");
        }
        if (this._parentEle)
            this._parentEle.appendChild(canvas);
        else {
            var body = document.createElement("body");
            body.style.margin = "0";
            body.appendChild(canvas);
            document.querySelector("html").appendChild(body);
        }
        this.canvas = canvas;
        this.view = View_1.View.create(this.canvas);
        this.gl = this.view.getContext(contextConfigData);
        if (!this.gl)
            alert("你的浏览器不支持webgl");
    };
    Device.prototype.setScreen = function () {
        var width = 0, height = 0, x = 0, y = 0, styleWidth = null, styleHeight = null;
        if (this._parentEle) {
            x = this._parentEle.offsetLeft;
            y = this._parentEle.offsetTop;
            width = this._parentEle.offsetWidth;
            height = this._parentEle.offsetHeight;
            styleWidth = width + "px";
            styleHeight = height + "px";
        }
        else {
            width = window.innerWidth;
            height = window.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
        }
        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        this.gl.viewport(0, 0, width, height);
        this._parentEle = null;
    };
    return Device;
}());
Device = __decorate([
    singleton_1.singleton()
], Device);
exports.Device = Device;
//# sourceMappingURL=Device.js.map