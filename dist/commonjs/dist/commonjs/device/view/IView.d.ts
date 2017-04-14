import { ContextConfigData } from "../../core/ContextConfig";
export interface IView {
    offset: {
        x: number;
        y: number;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    styleWidth: string;
    styleHeight: string;
    dom: any;
    getContext(contextConfig: ContextConfigData): WebGLRenderingContext;
    initCanvas(): void;
}
