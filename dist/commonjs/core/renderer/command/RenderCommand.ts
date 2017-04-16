import { Device } from "../../device/Device";
export class RenderCommand {
    public static create() {
        var obj = new this();

        return obj;
    }

    private drawMode;

    public draw() {

        this._getGl().drawArrays();
    }

    private _getGl() {
        return Device.getInstance().gl;
    }
}
