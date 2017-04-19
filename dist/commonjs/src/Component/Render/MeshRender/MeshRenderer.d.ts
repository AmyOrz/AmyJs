import { RendererComponent } from "./RendererComponent";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
export declare class MeshRenderer extends RendererComponent {
    static create(): MeshRenderer;
    render(renderer: Renderer, targetObject: EntityObject): void;
    private _createCmd(targetObject);
}
