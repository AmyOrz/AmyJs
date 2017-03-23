import { Geometry, GeometryDataType } from "./Geometry";

export class TriangleGeometry extends Geometry {
    public static create() {
        var obj = new this();

        return obj;
    }
    public width: number = 0;
    public height: number = 0;

    public computeData(): GeometryDataType {
        var width = this.width,
            height = this.height,
            left = -width / 2,
            right = width / 2,
            up = height / 2,
            down = -height / 2,
            vertices = null,
            texCoords = null,
            indices = null,
            color = null,
            normals = null;

        vertices = [
            0.0, up, 0,
            left, down, 0,
            right, down, 0
        ];

        indices = [
            0, 1, 2
        ];

        texCoords = [
            0.5, 1.0,
            0.0, 0.0,
            1.0, 0.0
        ];

        normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];
        color = [
            1.0, 0.5, 0.4, 0.0, 0.7, 0.8, 0.0, 1.0, 0.5
        ];
        return {
            vertice: vertices,
            // texCoord: texCoords,
            color:color
        };
    }
}
