import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Material } from "../Material/Material";
export type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
    normal?: number[];
    indice?: number[];
}

export abstract class Geometry extends Component {
    get geometryData() {
        return this.bufferContainer.geometryData;
    }

    public bufferContainer: BufferContainer = null;
    public material: Material = null;

    public init() {

        var computeData: GeometryDataType = this.computeData();

        this.bufferContainer = BufferContainer.create();

        this.bufferContainer.geometryData = this.createGeometryData(computeData);

        this.bufferContainer.init();

        this.material.init();
    }

    protected abstract computeData(): GeometryDataType;

    protected createGeometryData(computeData: GeometryDataType): GeometryData {
        var {
            vertice,
            color,
            texCoord,
            normal,
            indice
        } = computeData;
        var geometryData = GeometryData.create();

        geometryData.vertice = vertice;
        geometryData.color = color;
        geometryData.texCoord = texCoord;
        geometryData.normal = normal;
        geometryData.indice = indice;

        return geometryData;
    }
}
