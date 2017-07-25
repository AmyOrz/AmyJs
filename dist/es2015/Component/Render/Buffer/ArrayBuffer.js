var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Buffer } from "./Buffer";
import { EBufferType } from "./EBufferType";
import { EBufferUseage } from "./EBufferUseage";
import { Device } from "../../../core/device/Device";
var ArrayBuffer = (function (_super) {
    __extends(ArrayBuffer, _super);
    function ArrayBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = null;
        _this.data = null;
        _this.type = null;
        _this.usage = null;
        _this.count = null;
        return _this;
    }
    ArrayBuffer.create = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        obj.initWhenCreate(data, size, type, usage);
        return obj;
    };
    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
        if (type === void 0) { type = EBufferType.FLOAT; }
        if (usage === void 0) { usage = EBufferUseage.STATIC_DRAW; }
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Float32Array(data);
        this.buffer = gl.createBuffer();
        if (!this.buffer) {
            console.log("the bufferContainer create error");
            return null;
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, typeData, gl[usage]);
        this._saveData(typeData, size, type, usage);
        return this.buffer;
    };
    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
        this.data = data;
        this.size = size;
        this.count = data.length / size;
        this.type = type;
        this.usage = usage;
    };
    return ArrayBuffer;
}(Buffer));
export { ArrayBuffer };
//# sourceMappingURL=ArrayBuffer.js.map