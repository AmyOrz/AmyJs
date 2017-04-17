import { Render } from "./renderer/render/Render";
export declare class Director {
    static getInstance(): void;
    render: Render;
    init(): void;
}
