import { RendererComponent } from "./RendererComponent";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
import { RenderCommand } from "../../../core/renderer/command/RenderCommand";
import { GameObject } from "../../../core/Entity/GameObject";
import { CameraController } from "../../Camera/Controll/CameraController";
export class MeshRenderer extends RendererComponent {
    public static create() {
        var obj = new this();

        return obj;
    }


    public render(renderer: Renderer, targetObject: EntityObject, camera: GameObject) {
        renderer.addCommand(this._createCmd(targetObject, camera));
    }

    private _createCmd(targetObject: EntityObject, camera: GameObject) {
        var geometry = targetObject.geometry;
        var renderCmd: RenderCommand = RenderCommand.create();
        var cameraComponent = camera.getComponent<CameraController>(CameraController);

        renderCmd.material = geometry.material;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;

        renderCmd.mMatrix = targetObject.transform.mMatrix;
        renderCmd.vMatrix = cameraComponent.vMatrix;
        renderCmd.pMatrix = cameraComponent.pMatrix;


        return renderCmd;
    }
}
