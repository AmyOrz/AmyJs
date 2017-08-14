import { singleton } from "../../until/singleton";
import { IView } from "./view/IView";
import { View } from "./view/View";
import { ContextConfigData } from "../ContextConfig";

@singleton()
export class Device {
    public static getInstance(): any { }

    public gl: WebGLRenderingContext;
    public canvas: HTMLCanvasElement;
    public view: IView;

    private _parentEle: any;

    public createGL(canvasId: string, contextConfigData: ContextConfigData, parentId: string) {
        let canvas: HTMLCanvasElement = document.createElement("canvas");
        if (canvasId) {
            canvas.setAttribute("id", canvasId);
        }
        if (parentId) {
            this._parentEle = document.querySelector("#" + parentId);
            if (this._parentEle == void 0)
                alert("找不到指定parentId的dom节点");
        }
        if (this._parentEle) this._parentEle.appendChild(canvas);
        else {
            var body = document.createElement("body");
            body.style.margin = "0";
            body.appendChild(canvas);
            document.querySelector("html").appendChild(body);
        }

        this.canvas = canvas;
        this.view = View.create(this.canvas);
        this.gl = this.view.getContext(contextConfigData);
        if (!this.gl)
            alert("你的浏览器不支持webgl");

    }

    public setViewport(width: number, height: number) {
        this.gl.viewport(0, 0, width, height);
    }

    public setScreen() {
        let width: number = 0,
            height: number = 0,
            x: number = 0,
            y: number = 0,
            styleWidth: string = null,
            styleHeight: string = null;
        if (this._parentEle) {
            x = this._parentEle.offsetLeft;
            y = this._parentEle.offsetTop;
            width = this._parentEle.offsetWidth;
            height = this._parentEle.offsetHeight;
            styleWidth = `${width}px`;
            styleHeight = `${height}px`;
        } else {
            width = window.innerWidth;
            height = window.innerHeight;
            styleWidth = "100%";
            styleHeight = "100%";
        }

        this.view.initCanvas();
        this.view.x = x;
        this.view.y = y;
        this.view.width = width;
        this.view.height = height;
        this.view.styleWidth = styleWidth;
        this.view.styleHeight = styleHeight;
        console.log(width, height);
        this.gl.viewport(0, 0, width, height);
        this._parentEle = null;
    }
}
