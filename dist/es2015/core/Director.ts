import { singleton } from "../until/singleton";
import { Renderer } from "./renderer/render/Renderer";
import { WebglRenderer } from "./renderer/render/WebglRenderer";
import { Scene } from "./Scene/Scene";

@singleton(true)
export class Director {
    public static getInstance(): any { }

    public renderer: Renderer = null;
    public scene: Scene = null;

    public initWhenCreate() {
        this.renderer = WebglRenderer.create();
        this.scene = Scene.create();
    }

    public init() {
        this.renderer.init();
        this.scene.gameObjectScene.init();
    }
    public Render() {
        this.scene.gameObjectScene.render(this.renderer);
        this.renderer.render();
    }

    public start() {
        this.init();
        this.Render();
    }
}
