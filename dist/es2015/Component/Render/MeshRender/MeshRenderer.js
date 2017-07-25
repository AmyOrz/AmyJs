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
import { RendererComponent } from "./RendererComponent";
import { RenderCommand } from "../../../core/renderer/command/RenderCommand";
import { CameraController } from "../../Camera/Controll/CameraController";
var MeshRenderer = (function (_super) {
    __extends(MeshRenderer, _super);
    function MeshRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeshRenderer.create = function () {
        var obj = new this();
        return obj;
    };
    MeshRenderer.prototype.render = function (renderer, targetObject, camera) {
        renderer.addCommand(this._createCmd(targetObject, camera));
    };
    MeshRenderer.prototype._createCmd = function (targetObject, camera) {
        var geometry = targetObject.geometry;
        var renderCmd = RenderCommand.create();
        var cameraComponent = camera.getComponent(CameraController);
        renderCmd.material = geometry.material;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;
        renderCmd.mMatrix = targetObject.transform.mMatrix;
        renderCmd.vMatrix = cameraComponent.vMatrix;
        renderCmd.pMatrix = cameraComponent.pMatrix;
        return renderCmd;
    };
    return MeshRenderer;
}(RendererComponent));
export { MeshRenderer };
//# sourceMappingURL=MeshRenderer.js.map