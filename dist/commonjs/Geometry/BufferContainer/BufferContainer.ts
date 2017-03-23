import { Buffer } from "../../Renderer/Buffer/Buffer";
import { EBufferDataType } from "./EBufferDataType";
import { GeometryData } from "../Data/GeometryData";
import { Hash } from "wonder-commonlib/dist/commonjs/Hash";
import { ArrayBuffer } from "../../Renderer/Buffer/ArrayBuffer";

export class BufferContainer {
    public static create() {
        var obj = new this();

        return obj;
    }
    constructor() { }

    public geometryData: GeometryData = null;

    private _bufferList: Hash<Buffer> = new Hash<Buffer>();

    public init() {
        this.addChild("verticeBuffer", this._getBufferByType(EBufferDataType.VERTICE));
        this.addChild("colorBuffer", this._getBufferByType(EBufferDataType.COLOR));
        // this.addChild("indiceBuffer", this._getBufferByType(EBufferDataType.INDICE));
        // this.addChild("normalBuffer", this._getBufferByType(EBufferDataType.NORMAL));
        // this.addChild("texCoordBuffer", this._getBufferByType(EBufferDataType.TEXCOORD));
    }

    public addChild(bufferName: string, buffer: Buffer) {
        this._bufferList.addChild(bufferName, buffer);
    }

    public getChild(bufferName: string) {
        return this._bufferList.getChild(bufferName);
    }

    public hasChild(bufferName: string): boolean {
        return this._bufferList.hasChild(bufferName);
    }

    public getChildren() {
        return this._bufferList.getChildren();
    }

    private _getBufferByType(type: EBufferDataType): Buffer {
        var buffer: Buffer = null;
        switch (type) {
            case EBufferDataType.VERTICE: buffer = this._getVerticeBuffer(); break;
            case EBufferDataType.COLOR: buffer = this._getColorBuffer(); break;
            // case EBufferDataType.INDICE: bufferContainer = this._getIndiceBuffer(); break;
            // case EBufferDataType.NORMAL: bufferContainer = this._getNormalBuffer(); break;
            // case EBufferDataType.TEXCOORD: bufferContainer = this._getTexCoordBuffer(); break;
        }
        return buffer;
    }

    private _getVerticeBuffer(): Buffer {
        return ArrayBuffer.create(this.geometryData.vertice, 3);
    }

    private _getColorBuffer(): Buffer {
        return ArrayBuffer.create(this.geometryData.color, 3);
    }

    private _getNormalBuffer() {

    }

    private _getIndiceBuffer() {

    }
    private _getTexCoordBuffer() {

    }
}
