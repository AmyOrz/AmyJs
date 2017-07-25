import { EBufferDataType } from "./EBufferDataType";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { ArrayBuffer } from "../../Render/Buffer/ArrayBuffer";
import { ElementBuffer } from "../../Render/Buffer/ElementBuffer";
var BufferContainer = (function () {
    function BufferContainer() {
        this.geometryData = null;
        this._bufferList = new Hash();
    }
    BufferContainer.create = function () {
        var obj = new this();
        return obj;
    };
    BufferContainer.prototype.init = function () {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.COLOR);
        this.getChild(EBufferDataType.INDICE);
        this.getChild(EBufferDataType.NORMAL);
        this.getChild(EBufferDataType.TEXCOORD);
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
            case EBufferDataType.VERTICE:
                buffer = this._getVerticeBuffer(type);
                break;
            case EBufferDataType.COLOR:
                buffer = this._getColorBuffer(type);
                break;
            case EBufferDataType.INDICE:
                buffer = this._getIndiceBuffer(type);
                break;
            case EBufferDataType.NORMAL:
                buffer = this._getNormalBuffer(type);
                break;
            case EBufferDataType.TEXCOORD:
                buffer = this._getTexCoordBuffer(type);
                break;
        }
        return buffer;
    };
    BufferContainer.prototype._getVerticeBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.vertice, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getColorBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.color, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getNormalBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.normal, 3);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getIndiceBuffer = function (type) {
        var buffer = ElementBuffer.create(this.geometryData.indice);
        return this._bufferCache(type, buffer);
    };
    BufferContainer.prototype._getTexCoordBuffer = function (type) {
        var buffer = ArrayBuffer.create(this.geometryData.texCoord, 3);
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
export { BufferContainer };
//# sourceMappingURL=BufferContainer.js.map