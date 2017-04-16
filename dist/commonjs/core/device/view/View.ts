import { IView } from "./IView";
import { ContextConfigData } from "../../ContextConfig";
export class View implements IView {
    public static create(view: any) {
        var obj = new this(view);
        return obj;
    }
    constructor(private _dom: any) { }

    get offset() {
        var view = this._dom,
            offset = { x: view.offsetLeft, y: view.offsetTop };

        while (view = view.offsetParent) {
            offset.x += view.offsetLeft;
            offset.y += view.offsetTop;
        }

        return offset;
    }
    get dom() {
        return this._dom;
    }
    get x() {
        return this._dom.style.x;
    }
    set x(val: number) {
        this._dom.style.x = `${val}px`;
    }
    get y() {
        return this.dom.style.y;
    }
    set y(val: number) {
        this._dom.style.y = `${val}px`;
    }

    get width() {
        return this.dom.clientWidth;
    }
    set width(width: number) {
        this._dom.width = width;
    }
    get height() {
        return this.dom.clientHeight;
    }
    set height(height: number) {
        this._dom.height = height;
    }

    get styleWidth() {
        return this._dom.style.width;
    }
    set styleWidth(width: string) {
        this._dom.style.width = width;
    }
    get styleHeight() {
        return this._dom.style.height;
    }
    set styleHeight(height: string) {
        this._dom.style.height = height;
    }

    public getContext(contextConfig: ContextConfigData): WebGLRenderingContext {
        let names: string[] = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
        var gl: WebGLRenderingContext;
        for (let item of names) {
            try {
                gl = this._dom.getContext(item, contextConfig);
            } catch (e) {
            }
            if (gl) {
                break;
            }
        }
        return gl;
    }
    public initCanvas(): void {
        this._dom.style.cssText = "position:absolute;left:0;top:0;";
    }

}
