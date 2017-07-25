import { RendererComponent } from "./RendererComponent";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
import { GameObject } from "../../../core/Entity/GameObject";
export declare class MeshRenderer extends RendererComponent {
    static create(): MeshRenderer;
    render(renderer: Renderer, targetObject: EntityObject, camera: GameObject): void;
    private _createCmd(targetObject, camera);
}
