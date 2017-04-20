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
        // this.addChild("indiceBuffer", this._getBufferByType(EBufferDataType.INDICE));
        // this.addChild("normalBuffer", this._getBufferByType(EBufferDataType.NORMAL));
        // this.addChild("texCoordBuffer", this._getBufferByType(EBufferDataType.TEXCOORD));

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
            // case EBufferDataType.INDICE: bufferContainer = this._getIndiceBuffer(); break;
            // case EBufferDataType.NORMAL: bufferContainer = this._getNormalBuffer(); break;
            // case EBufferDataType.TEXCOORD: bufferContainer = this._getTexCoordBuffer(); break;
        }
        return buffer;
    }

    private _getVerticeBuffer(type: any): Buffer {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.vertice, 3);
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        } else {
            this.addChild(type, buffer);
            return buffer;
        }

    }

    private _getColorBuffer(type: any): Buffer {
        var buffer: Buffer = ArrayBuffer.create(this.geometryData.color, 3);
        if (this._bufferList.hasChild(type)) {
            return this._bufferList.getChild(type);
        } else {
            this.addChild(type, buffer);
            return buffer;
        }
    }

    private _getNormalBuffer() {

    }

    private _getIndiceBuffer() {

    }
    private _getTexCoordBuffer() {

    }
}
