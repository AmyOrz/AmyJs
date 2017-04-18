import {Component} from "../../core/Component";
import {Render} from "../../core/renderer/render/Render";

export abstract class RendererComponent extends Component{
    public abstract render(render:Render);
}
