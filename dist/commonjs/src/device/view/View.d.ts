import { IView } from "./IView";
import { ContextConfigData } from "../../core/ContextConfig";
export declare class View implements IView {
    private _dom;
    static create(view: any): View;
    constructor(_dom: any);
    readonly offset: {
        x: any;
        y: any;
    };
    readonly dom: any;
    x: number;
    y: number;
    width: number;
    height: number;
    styleWidth: string;
    styleHeight: string;
    getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
    initCanvas(): void;
}
