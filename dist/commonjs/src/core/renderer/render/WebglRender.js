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
var Queue_1 = require("wonder-commonlib/dist/commonjs/Queue");
var Render_1 = require("./Render");
var WebglRender = (function (_super) {
    __extends(WebglRender, _super);
    function WebglRender() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = new Queue_1.Queue();
        return _this;
    }
    WebglRender.create = function () {
        var obj = new this();
        return obj;
    };
    WebglRender.prototype.render = function (buffer) {
        this.webglState.init();
        this._commandQueue.forEach(function (renderCmd) {
            renderCmd.draw(buffer);
        });
    };
    WebglRender.prototype.addCommand = function (renderCmd) {
        this._commandQueue.addChild(renderCmd);
    };
    return WebglRender;
}(Render_1.Render));
exports.WebglRender = WebglRender;
//# sourceMappingURL=WebglRender.js.map