import { Geometry, GeometryDataType } from "./Geometry";
export declare class BoxGeometry extends Geometry {
    static create(): BoxGeometry;
    computeData(): GeometryDataType;
}
