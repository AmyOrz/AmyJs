import { Device } from "../../device/Device";
export abstract class Buffer {
    public buffer: any = null;

    public dispose(): void {
        Device.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    }

}
