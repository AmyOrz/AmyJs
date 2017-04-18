import { singleton } from "../until/singleton";
import { Render } from "./renderer/render/Render";
import { WebglRender } from "./renderer/render/WebglRender";
import { Scene } from "./Scene/Scene";

@singleton(true)
export class Director {
    public static getInstance(): any { }

    public render: Render = null;
    public scene: Scene = null;

    public initWhenCreate() {
        this.render = WebglRender.create();
        this.scene = Scene.create();
    }

    public init() {
        this.render.init();
        this.scene.gameObjectScene.init();
    }
    public Render() {
        this.scene.gameObjectScene.render(this.render);
        this.render.render();
    }

    public start() {
        this.init();
        this.Render();
    }
}
