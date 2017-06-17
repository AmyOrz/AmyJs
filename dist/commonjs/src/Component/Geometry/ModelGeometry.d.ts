import { Geometry } from "./Geometry";
export declare class ModelGeometry extends Geometry {
    static create(): ModelGeometry;
    vertices: number[];
    normals: number[];
    texCoords: number[];
    colors: number[];
    computeData(): any;
}
