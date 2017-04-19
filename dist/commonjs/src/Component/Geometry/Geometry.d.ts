import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Shader } from "../Render/Shader/shader/Shader";
import { Program } from "../Render/Program/Program";
export declare type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
};
export declare abstract class Geometry extends Component {
    readonly geometryData: GeometryData;
    readonly program: Program;
    bufferContainer: BufferContainer;
    shader: Shader;
    init(): void;
    protected abstract computeData(): GeometryDataType;
    protected createGeometryData(computeData: GeometryDataType): GeometryData;
}
