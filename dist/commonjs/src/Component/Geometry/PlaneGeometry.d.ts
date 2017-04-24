import { Geometry, GeometryDataType } from "./Geometry";
export declare class PlaneGeometry extends Geometry {
    static create(): PlaneGeometry;
    width: number;
    height: number;
    getShader(): any;
    computeData(): GeometryDataType;
}
