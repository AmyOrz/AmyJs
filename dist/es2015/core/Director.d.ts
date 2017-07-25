import { Renderer } from "./renderer/render/Renderer";
import { Scene } from "./Scene/Scene";
export declare class Director {
    static getInstance(): any;
    renderer: Renderer;
    scene: Scene;
    initWhenCreate(): void;
    init(): void;
    Render(): void;
    start(): void;
}
