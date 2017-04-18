import { singleton } from "../until/singleton";
import { Scene } from "./Scene";
import { Render } from "./renderer/render/Render";
import { WebglRender } from "./renderer/render/WebglRender";

@singleton(true)
export class Director {
    public static getInstance() { }

    public render: Render;

    public initWhenCreate(){
        this.render = WebglRender.create();

    }
    public init() {

    }
}
