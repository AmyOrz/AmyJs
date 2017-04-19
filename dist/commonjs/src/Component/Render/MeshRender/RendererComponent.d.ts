import { Component } from "../../../core/Component";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";
export declare abstract class RendererComponent extends Component {
    abstract render(renderer: Renderer, targetObject: EntityObject): any;
}
