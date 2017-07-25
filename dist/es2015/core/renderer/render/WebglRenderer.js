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
import { Queue } from "wonder-commonlib/dist/es2015/Queue";
import { Renderer } from "./Renderer";
var WebglRenderer = (function (_super) {
    __extends(WebglRenderer, _super);
    function WebglRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._commandQueue = new Queue();
        return _this;
    }
    WebglRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    WebglRenderer.prototype.init = function () {
        this.webglState.init();
    };
    WebglRenderer.prototype.render = function () {
        this._commandQueue.forEach(function (renderCmd) {
            renderCmd.draw();
        });
    };
    WebglRenderer.prototype.addCommand = function (renderCmd) {
        this._commandQueue.addChild(renderCmd);
    };
    WebglRenderer.prototype.hasCommand = function () {
        return this._commandQueue.getCount() > 0;
    };
    return WebglRenderer;
}(Renderer));
export { WebglRenderer };
//# sourceMappingURL=WebglRenderer.js.map