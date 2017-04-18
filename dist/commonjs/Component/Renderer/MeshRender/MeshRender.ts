import { RendererComponent } from "../RendererComponent";
import { Render } from "../../../core/renderer/render/Render";
import { EntityObject } from "../../../core/Entity/EntityObject";
import { RenderCommand } from "../../../core/renderer/command/RenderCommand";
export class MeshRender extends RendererComponent {
    public static create() {
        var obj = new this();

        return obj;
    }

    public render(render: Render, targetObject: EntityObject) {
        render.addCommand(this._createCmd(targetObject));
    }

    private _createCmd(targetObject: EntityObject) {
        var geometry = targetObject.geometry;
        var renderCmd: RenderCommand = RenderCommand.create();

        renderCmd.buffers = geometry.bufferContainer;

        return renderCmd;
    }
}
