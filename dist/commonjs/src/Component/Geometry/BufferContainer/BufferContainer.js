"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EBufferDataType_1 = require("./EBufferDataType");
var Hash_1 = require("../../../../node_modules/wonder-commonlib/dist/commonjs/Hash");
var ArrayBuffer_1 = require("../../Render/Buffer/ArrayBuffer");
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
        this.getChild(EBufferDataType_1.EBufferDataType.VERTICE);
        this.getChild(EBufferDataType_1.EBufferDataType.COLOR);
        this.getChild(EBufferDataType_1.EBufferDataType.INDICE);
        this.getChild(EBufferDataType_1.EBufferDataType.NORMAL);
        this.getChild(EBufferDataType_1.EBufferDataType.TEXCOORD);
    };
    BufferContainer.prototype.addChild = function (bufferName, buffer) {
        this._bufferList.addChild(bufferName, buffer);
    };
    BufferContainer.prototype.hasChild = function (bufferName) {
        return this._bufferList.hasChild(bufferName);
    };
    BufferContainer.prototype.getChildren = function () {
        return this._bufferList.getChildren();
    };
    BufferContainer.prototype.getChild = function (type) {
        var buffer = null;
        switch (type) {
            case EBufferDataType_1.EBufferDataType.VERTICE:
                buffer = this._getVerticeBuffer(type);
                break;
            case EBufferDataType_1.EBufferDataType.COLOR:
                buffer = this._getColorBuffer(type);
                break;
            case EBufferDataType_1.EBufferDataType.INDICE:
                buffer = this._getIndiceBuffer(type);
                break;
            case EBufferDataType_1.EBufferDataType.NORMAL:
                buffer = this._getNormalBuffer(type);
                break;
            case EBufferDataType_1.EBufferDataType.TEXCOORD:
                buffer = this._getTexCoordBuffer(type);
                break;
        }
        return buffer;
    };
    BufferContainer.prototype._getVerticeBuffer = function (type) {
        var buffer = ArrayBuffer_1.ArrayBuffer.create(this.geometryData.vertice, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getColorBuffer = function (type) {
        var buffer = ArrayBuffer_1.ArrayBuffer.create(this.geometryData.color, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getNormalBuffer = function (type) {
        var buffer = ArrayBuffer_1.ArrayBuffer.create(this.geometryData.normal, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getIndiceBuffer = function (type) {
    };
    BufferContainer.prototype._getTexCoordBuffer = function (type) {
        var buffer = ArrayBuffer_1.ArrayBuffer.create(this.geometryData.texCoord, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._bufferCache = function (type, buffer) {
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        }
        else {
            this.addChild(type, buffer);
            return buffer;
        }
    };
    return BufferContainer;
}());
exports.BufferContainer = BufferContainer;
//# sourceMappingURL=BufferContainer.js.map