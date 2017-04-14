import { Component } from "../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { Buffer } from "../Renderer/Buffer/Buffer";
import { Program } from "../Renderer/Program/Program";
export declare type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
};
export declare abstract class Geometry extends Component {
    readonly geometryData: GeometryData;
    readonly program: Program;
    private _bufferContainer;
    private _shader;
    init(): void;
    getChild(name: string): Buffer;
    protected abstract computeData(): GeometryDataType;
    protected createGeometryData(computeData: GeometryDataType): GeometryData;
}
