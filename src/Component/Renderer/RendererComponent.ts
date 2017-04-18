import { Component } from "../../core/Component";
import { Render } from "../../core/renderer/render/Render";
import { EntityObject } from "../../core/Entity/EntityObject";

export abstract class RendererComponent extends Component {
    public abstract render(render: Render, targetObject: EntityObject);
}
