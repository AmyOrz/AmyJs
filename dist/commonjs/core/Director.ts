import { singleton } from "../until/singleton";
import { Scene } from "./Scene";
import { Render } from "./renderer/render/Render";
import { WebglRender } from "./renderer/render/WebglRender";

@singleton()
export class Director {
    public static getInstance() { }

    public render: Render;

    public init() {
        this.render = WebglRender.create();
    }
}
