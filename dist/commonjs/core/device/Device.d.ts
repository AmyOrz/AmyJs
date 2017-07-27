import { IView } from "./view/IView";
import { ContextConfigData } from "../ContextConfig";
export declare class Device {
    static getInstance(): any;
    gl: WebGLRenderingContext;
    canvas: HTMLCanvasElement;
    view: IView;
    private _parentEle;
    createGL(canvasId: string, contextConfigData: ContextConfigData, parentId: string): void;
    setViewport(width: number, height: number): void;
    setScreen(): void;
}
