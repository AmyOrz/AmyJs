import { Component } from "../../../core/Component";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
import { GameObject } from "../../../core/Entity/GameObject";
export declare abstract class RendererComponent extends Component {
    abstract render(renderer: Renderer, targetObject: EntityObject, camera: GameObject): any;
}
