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
var RendererComponent_1 = require("./RendererComponent");
var RenderCommand_1 = require("../../../core/renderer/command/RenderCommand");
var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, targetObject) {
        renderer.addCommand(this._createCmd(targetObject));
    };
    MeshRenderer.prototype._createCmd = function (targetObject) {
        var geometry = targetObject.geometry;
        var renderCmd = RenderCommand_1.RenderCommand.create();
        renderCmd.shader = geometry.shader;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;
        renderCmd.mMatrix = targetObject.transform.mMatrix;
        return renderCmd;
    };
    return MeshRenderer;
}(RendererComponent_1.RendererComponent));
exports.MeshRenderer = MeshRenderer;
//# sourceMappingURL=MeshRenderer.js.map