import { Geometry, GeometryDataType } from "./Geometry";

export class PlaneGeometry extends Geometry {
    public static create() {
        var obj = new this();

        return obj;
    }

    public computeData(): GeometryDataType {
        var vertices = [],
            texCoords = [],
            normals = [],
            color = [],
            indices = [];

        color = [
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0
        ];
        indices = [0, 1, 2, 0, 2, 3];

        texCoords = [1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];

        vertices = [
            1.0, 1.0, 0.0,
            -1.0, 1.0, 0.0,
            -1.0, -1.0, 0.0,
            1.0, -1.0, 0.0    // v0-v1-v2-v3
        ];
        return {
            vertice: vertices,
            // faces: GeometryUtils.convertToFaces(indices, normals),
            texCoord: texCoords,
            color: color,
            indice: indices
        };
    }
}
