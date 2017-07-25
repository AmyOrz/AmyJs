import { Geometry, GeometryDataType } from "./Geometry";
export declare class PlaneGeometry extends Geometry {
    static create(): PlaneGeometry;
    computeData(): GeometryDataType;
}
