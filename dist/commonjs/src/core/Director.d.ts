import { Render } from "./renderer/render/Render";
import { Scene } from "./Scene/Scene";
export declare class Director {
    static getInstance(): any;
    render: Render;
    scene: Scene;
    initWhenCreate(): void;
    init(): void;
    Render(): void;
    start(): void;
}
