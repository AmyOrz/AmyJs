import { Device } from "../../../core/device/Device";
var Buffer = (function () {
    function Buffer() {
        this.buffer = null;
    }
    Buffer.prototype.dispose = function () {
        Device.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    };
    return Buffer;
}());
export { Buffer };
//# sourceMappingURL=Buffer.js.map