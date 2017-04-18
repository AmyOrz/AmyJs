import { Component } from "../../core/Component";
import { Render } from "../../core/renderer/render/Render";
import { EntityObject } from "../../core/Entity/EntityObject";
export declare abstract class RendererComponent extends Component {
    abstract render(render: Render, targetObject: EntityObject): any;
}
