import { Geometry, GeometryDataType } from "./Geometry";
export declare class TriangleGeometry extends Geometry {
    static create(): TriangleGeometry;
    width: number;
    height: number;
    computeData(): GeometryDataType;
}
