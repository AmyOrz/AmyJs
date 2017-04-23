import { RendererComponent } from "./RendererComponent";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
import { RenderCommand } from "../../../core/renderer/command/RenderCommand";
export class MeshRenderer extends RendererComponent {
    public static create() {
        var obj = new this();

        return obj;
    }


    public render(renderer: Renderer, targetObject: EntityObject) {
        renderer.addCommand(this._createCmd(targetObject));
    }

    private _createCmd(targetObject: EntityObject) {
        var geometry = targetObject.geometry;
        var renderCmd: RenderCommand = RenderCommand.create();

        renderCmd.shader = geometry.shader;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.targetObject = targetObject;

        renderCmd.mMatrix = targetObject.transform.mMatrix;
        // renderCmd.vMatrix = targetObject.transform.mMatrix;
        // renderCmd.pMatrix = targetObject.transform.mMatrix;


        return renderCmd;
    }
}
