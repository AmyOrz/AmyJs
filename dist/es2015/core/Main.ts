import { Device } from "./device/Device";
import { ContextConfigData } from "./ContextConfig";
export class Main {

    private static _parentId: string = null;
    private static _config: ContextConfigData;
    private static _canvasId: string;

    public static setCanvas(canvasId?: string, parentId?: string) {
        this._parentId = parentId;
        this._canvasId = canvasId;
        this._config = {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        };
        return this;
    }

    public static init() {
        Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
        Device.getInstance().setScreen();
        return this;
    }
}
