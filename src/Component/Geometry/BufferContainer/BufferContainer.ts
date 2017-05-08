import { EBufferDataType } from "./EBufferDataType";
import { GeometryData } from "../Data/GeometryData";
import { Hash } from "../../../../node_modules/wonder-commonlib/dist/commonjs/Hash";
import { Buffer } from "../../Render/Buffer/Buffer";
import { ArrayBuffer } from "../../Render/Buffer/ArrayBuffer";

export class BufferContainer {
    public static create() {
        var obj = new this();

        return obj;
    }
    constructor() { }

    public geometryData: GeometryData = null;

    private _bufferList: Hash<Buffer> = new Hash<Buffer>();

    public init() {
        this.getChild(EBufferDataType.VERTICE);
        this.getChild(EBufferDataType.COLOR);
        this.getChild(EBufferDataType.INDICE);
        this.getChild(EBufferDataType.NORMAL);
        this.getChild(EBufferDataType.TEXCOORD);
    }

    public addChild(bufferName: any, buffer: Buffer) {
        this._bufferList.addChild(bufferName, buffer);
    }

    public hasChild(bufferName: any): boolean {
        return this._bufferList.hasChild(bufferName);
    }

    public getChildren() {
        return this._bufferList.getChildren();
    }

    public getChild(type: EBufferDataType) {
        var buffer: any = null;
        switch (type) {
            case EBufferDataType.VERTICE: buffer = this._getVerticeBuffer(type); break;
            case EBufferDataType.COLOR: buffer = this._getColorBuffer(type); break;
            case EBufferDataType.INDICE: buffer = this._getIndiceBuffer(type); break;
            case EBufferDataType.NORMAL: buffer = this._getNormalBuffer(type); break;
            case EBufferDataType.TEXCOORD: buffer = this._getTexCoordBuffer(type); break;
        }
        return buffer;
    }

    private _getVerticeBuffer(type: any): Buffer {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.vertice, 3);
        return this._bufferCache(type, buffer);
    }

    private _getColorBuffer(type: any): Buffer {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.color, 3);

        return this._bufferCache(type, buffer);
    }

    private _getNormalBuffer(type: any) {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.normal, 3);

        return this._bufferCache(type, buffer);
    }

    private _getIndiceBuffer(type: any) {

        // var buffer: Buffer = ArrayBuffer.create(this.geometryData.indice, 3);

        // return this._bufferCache(type,buffer);

    }
    private _getTexCoordBuffer(type: any): Buffer {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.texCoord, 3);
        return this._bufferCache(type, buffer);
    }

    private _bufferCache(type: any, buffer: any): Buffer {
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        } else {
            this.addChild(type, buffer);
            return buffer;
        }
    }
}
