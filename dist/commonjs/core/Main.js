"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../device/Device");
var Main = (function () {
    function Main() {
    }
    Main.setCanvas = function (canvasId, parentId) {
        this._parentId = parentId;
        this._canvasId = canvasId;
        this._config = {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        };
        return this;
    };
    Main.init = function () {
        Device_1.Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
        Device_1.Device.getInstance().setScreen();
        return this;
    };
    return Main;
}());
Main._parentId = null;
exports.Main = Main;
//# sourceMappingURL=Main.js.map