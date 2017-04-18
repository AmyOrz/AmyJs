import { RendererComponent } from "../RendererComponent";
import { Render } from "../../../core/renderer/render/Render";
import { EntityObject } from "../../../core/Entity/EntityObject";
export declare class MeshRender extends RendererComponent {
    static create(): MeshRender;
    render(render: Render, targetObject: EntityObject): void;
    private _createCmd(targetObject);
}
