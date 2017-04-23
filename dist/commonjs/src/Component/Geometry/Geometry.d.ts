import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Shader } from "../Render/Shader/shader/Shader";
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
    shader: Shader;
    init(): void;
    protected abstract computeData(): GeometryDataType;
    protected abstract getShader(): Shader;
    protected createGeometryData(computeData: GeometryDataType): GeometryData;
}
