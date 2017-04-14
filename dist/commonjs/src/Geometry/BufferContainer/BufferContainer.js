"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EBufferDataType_1 = require("./EBufferDataType");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var ArrayBuffer_1 = require("../../Renderer/Buffer/ArrayBuffer");
var BufferContainer = (function () {
    function BufferContainer() {
        this.geometryData = null;
        this._bufferList = new Hash_1.Hash();
    }
    BufferContainer.create = function () {
        var obj = new this();
        return obj;
    };
    BufferContainer.prototype.init = function () {
        this.addChild("verticeBuffer", this._getBufferByType(EBufferDataType_1.EBufferDataType.VERTICE));
        this.addChild("colorBuffer", this._getBufferByType(EBufferDataType_1.EBufferDataType.COLOR));
    };
    BufferContainer.prototype.addChild = function (bufferName, buffer) {
        this._bufferList.addChild(bufferName, buffer);
    };
    BufferContainer.prototype.getChild = function (bufferName) {
        return this._bufferList.getChild(bufferName);
    };
    BufferContainer.prototype.hasChild = function (bufferName) {
        return this._bufferList.hasChild(bufferName);
    };
    BufferContainer.prototype.getChildren = function () {
        return this._bufferList.getChildren();
    };
    BufferContainer.prototype._getBufferByType = function (type) {
        var buffer = null;
        switch (type) {
            case EBufferDataType_1.EBufferDataType.VERTICE:
                buffer = this._getVerticeBuffer();
                break;
            case EBufferDataType_1.EBufferDataType.COLOR:
                buffer = this._getColorBuffer();
                break;
        }
        return buffer;
    };
    BufferContainer.prototype._getVerticeBuffer = function () {
        return ArrayBuffer_1.ArrayBuffer.create(this.geometryData.vertice, 3);
    };
    BufferContainer.prototype._getColorBuffer = function () {
        return ArrayBuffer_1.ArrayBuffer.create(this.geometryData.color, 3);
    };
    BufferContainer.prototype._getNormalBuffer = function () {
    };
    BufferContainer.prototype._getIndiceBuffer = function () {
    };
    BufferContainer.prototype._getTexCoordBuffer = function () {
    };
    return BufferContainer;
}());
exports.BufferContainer = BufferContainer;
//# sourceMappingURL=BufferContainer.js.map