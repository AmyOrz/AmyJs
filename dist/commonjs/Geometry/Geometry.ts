import { Component } from "../core/Component";
import { GeometryData } from "./Data/GeometryData";
import { BufferContainer } from "./BufferContainer/BufferContainer";
import { Buffer } from "../Renderer/Buffer/Buffer";
import { Shader } from "../Renderer/Shader/shader/Shader";
import { TriangleShader } from "../Renderer/Shader/shader/TriangleShader";
import { Program } from "../Renderer/Program/Program";
export type GeometryDataType = {
    vertice: number[];
    color?: number[];
    texCoord?: number[];
}

export abstract class Geometry extends Component {
    get geometryData() {
        return this._bufferContainer.geometryData;
    }

    get program(): Program {
        return this._shader.program;
    }

    private _bufferContainer: BufferContainer = null;
    private _shader: Shader = TriangleShader.create(this);

    public init() {
        var computeData: GeometryDataType = this.computeData();

        this._bufferContainer = BufferContainer.create();

        this._bufferContainer.geometryData = this.createGeometryData(computeData);

        this._bufferContainer.init();

        this._shader.init();
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
