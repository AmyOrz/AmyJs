import { Component } from "../../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Shader } from "../Render/Shader/shader/Shader";
import { TriangleShader } from "../Render/Shader/shader/TriangleShader";
import { Program } from "../Render/Program/Program";
import { ArrayBuffer } from "../Render/Buffer/ArrayBuffer";
export type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
}

export abstract class Geometry extends Component {
    get geometryData() {
        return this.bufferContainer.geometryData;
    }

    public bufferContainer: BufferContainer = null;
    public shader: Shader = TriangleShader.create(this);

    public init() {
        var computeData: GeometryDataType = this.computeData();

        this.bufferContainer = BufferContainer.create();

        this.bufferContainer.geometryData = this.createGeometryData(computeData);

        this.bufferContainer.init();

        this.shader.init();
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
