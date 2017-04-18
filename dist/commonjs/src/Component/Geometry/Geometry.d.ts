import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Program } from "../Renderer/Program/Program";
export declare type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
};
export declare abstract class Geometry extends Component {
    readonly geometryData: GeometryData;
    readonly program: Program;
    bufferContainer: BufferContainer;
    private _shader;
    init(): void;
    protected abstract computeData(): GeometryDataType;
    protected createGeometryData(computeData: GeometryDataType): GeometryData;
}
