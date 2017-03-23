import { Component } from "../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
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
