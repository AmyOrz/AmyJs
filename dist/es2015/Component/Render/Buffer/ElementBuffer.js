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
var ElementBuffer = (function (_super) {
    __extends(ElementBuffer, _super);
    function ElementBuffer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = null;
        _this.count = null;
        _this.usage = null;
        _this.data = null;
        return _this;
    }
    ElementBuffer.create = function (data, type, useage) {
        if (type === void 0) { type = EBufferType.UNSIGNED_BYTE; }
        if (useage === void 0) { useage = EBufferUseage.STATIC_DRAW; }
        var obj = new this();
        var result = obj.initWhenCreate(data, type, useage);
        if (result == void 0)
            return null;
        return obj;
    };
    ElementBuffer.prototype.initWhenCreate = function (data, type, useage) {
        if (data == void 0)
            return null;
        var gl = Device.getInstance().gl;
        var typeData = new Uint8Array(data);
        var buffer = gl.createBuffer();
        if (!buffer)
            console.log("element Buffer create buffer error");
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeData, gl[useage]);
        this._saveData(typeData, type, useage);
        this.buffer = buffer;
    };
    ElementBuffer.prototype._saveData = function (data, type, useage) {
        this.data = data;
        this.type = type;
        this.usage = useage;
        this.count = data.length;
    };
    return ElementBuffer;
}(Buffer));
export { ElementBuffer };
//# sourceMappingURL=ElementBuffer.js.map