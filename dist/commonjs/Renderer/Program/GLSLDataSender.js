"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var GLSLDataSender = (function () {
    function GLSLDataSender(_program) {
        this._program = _program;
        this._getUniformLocationCache = {};
        this._toSendBufferArr = [];
    }
    GLSLDataSender.create = function (program) {
        var obj = new this(program);
        return obj;
    };
    GLSLDataSender.prototype.addBufferToSendList = function (name, buffer) {
        this._toSendBufferArr[name] = buffer;
    };
    GLSLDataSender.prototype.sendAllBufferData = function () {
        for (var pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
            this.sendBuffer(pos, this._toSendBufferArr[pos]);
        }
    };
    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
    };
    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1f(uniform, data);
    };
    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data[0], data[1]);
    };
    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data[0], data[1], data[2]);
    };
    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data[0], data[1], data[2], data[3]);
    };
    GLSLDataSender.prototype.sendVector2 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform2f(uniform, data.x, data.y);
    };
    GLSLDataSender.prototype.sendVector3 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform3f(uniform, data.x, data.y, data.z);
    };
    GLSLDataSender.prototype.sendVector4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform4f(uniform, data.x, data.y, data.z, data.w);
    };
    GLSLDataSender.prototype.sendNum1 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniform1i(uniform, data);
    };
    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data.elements);
    };
    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
        var uniform = this.getUniformLocation(name);
        this._getGl().uniformMatrix4fv(uniform, false, data);
    };
    GLSLDataSender.prototype.getUniformLocation = function (name) {
        if (this._getUniformLocationCache[name] != void 0) {
            return this._getUniformLocationCache[name];
        }
        var uniform = this._getGl().getUniformLocation(this._program.glProgram, name);
        return uniform;
    };
    GLSLDataSender.prototype._getGl = function () {
        return Device_1.Device.getInstance().gl;
    };
    return GLSLDataSender;
}());
exports.GLSLDataSender = GLSLDataSender;
//# sourceMappingURL=GLSLDataSender.js.map