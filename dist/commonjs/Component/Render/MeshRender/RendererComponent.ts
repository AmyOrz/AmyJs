import { Component } from "../../../core/Component";
import { Renderer } from "../../../core/renderer/render/Renderer";
import { EntityObject } from "../../../core/Entity/EntityObject";

export abstract class RendererComponent extends Component {
    public abstract render(renderer: Renderer, targetObject: EntityObject);
}
