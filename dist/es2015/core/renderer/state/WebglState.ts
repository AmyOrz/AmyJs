import { Device } from "../../device/Device";
export class WebglState {
    public static create() {
        var obj = new this();

        return obj;
    }

    public setClearColor(r: number, g: number, b: number, a: number) {
        var gl = Device.getInstance().gl;

        gl.clearColor(r, g, b, a);

    }

    public init() {
        this._depthTest();

        this._clear();
    }

    private _depthTest() {
        var gl = Device.getInstance().gl;
        gl.enable(gl.DEPTH_TEST);
    }
    private _clear() {
        var gl = Device.getInstance().gl;

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
}