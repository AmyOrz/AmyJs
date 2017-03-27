"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var Buffer = (function () {
    function Buffer() {
        this.buffer = null;
    }
    Buffer.prototype.dispose = function () {
        Device_1.Device.getInstance().gl.deleteBuffer(this.buffer);
        delete this.buffer;
    };
    return Buffer;
}());
exports.Buffer = Buffer;
//# sourceMappingURL=Buffer.js.map