import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Material } from "../Material/Material";
export declare type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
    normal?: number[];
    indice?: number[];
};
export declare abstract class Geometry extends Component {
    readonly geometryData: GeometryData;
    bufferContainer: BufferContainer;
    material: Material;
    init(): void;
    protected abstract computeData(): GeometryDataType;
    protected createGeometryData(computeData: GeometryDataType): GeometryData;
}
