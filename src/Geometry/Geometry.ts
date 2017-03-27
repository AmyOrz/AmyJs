import { Component } from "../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Buffer } from "../Renderer/Buffer/Buffer";
export type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
}

export abstract class Geometry extends Component {
    get geometryData() {
        return this._bufferContainer.geometryData;
    }

    private _bufferContainer: BufferContainer = null;

    public init() {
        var computeData: GeometryDataType = this.computeData();

        this._bufferContainer = BufferContainer.create();

        this._bufferContainer.geometryData = this.createGeometryData(computeData);

        this._bufferContainer.init();

    }

    public getChild(name: string): Buffer {
        return this._bufferContainer.getChild(name);
    }

    protected abstract computeData(): GeometryDataType;

    protected createGeometryData(computeData: GeometryDataType): GeometryData {
        var {
            vertice,
            color,
            // texCoord
        } = computeData;
        var geometryData = GeometryData.create();

        geometryData.vertice = vertice;
        geometryData.color = color;
        // geometryData.texCoord = texCoord;

        return geometryData;
    }
}
