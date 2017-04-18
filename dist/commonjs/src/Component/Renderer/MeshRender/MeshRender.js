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
var RendererComponent_1 = require("../RendererComponent");
var RenderCommand_1 = require("../../../core/renderer/command/RenderCommand");
var MeshRender = (function (_super) {
    __extends(MeshRender, _super);
    function MeshRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRender.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRender.prototype.render = function (render, targetObject) {
        render.addCommand(this._createCmd(targetObject));
    };
    MeshRender.prototype._createCmd = function (targetObject) {
        var geometry = targetObject.geometry;
        var renderCmd = RenderCommand_1.RenderCommand.create();
        renderCmd.buffers = geometry.bufferContainer;
        return renderCmd;
    };
    return MeshRender;
}(RendererComponent_1.RendererComponent));
exports.MeshRender = MeshRender;
//# sourceMappingURL=MeshRender.js.map