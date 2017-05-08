import { Geometry, GeometryDataType } from "./Geometry";

export class PlaneGeometry extends Geometry {
    public static create() {
        var obj = new this();

        return obj;
    }

    public width: number = 1;
    public height: number = 1;
    public widthSegments:number = 1;
    public heightSegments:number = 1;

    public computeData():GeometryDataType{
        var width = this.width,
            height = this.height,
            widthSegments = this.widthSegments,
            heightSegments = this.heightSegments,
            x = null,
            y = null,
            z = null,
            u = null,
            v = null,
            i = null,
            j = null,
            vertices = [],
            texCoords = [],
            normals = [],
            color = [],
            indices = [];

        color = [
            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0
        ];
        indices = [0, 1, 2, 0, 2, 3];

        // Generate plane as follows (assigned UVs denoted at corners):
        // (0,1)x---------x(1,1)
        //      |         |
        //      |         |
        //      |    O--X |length
        //      |    |    |
        //      |    Z    |
        // (0,0)x---------x(1,0)
        //         width
/*        for (i = 0; i <= widthSegments; i++) {
            for (j = 0; j <= heightSegments; j++) {
                x = -width + 2.0 * width * i / widthSegments;
                y = 0.0;
                z = -(-height + 2.0 * height * j / heightSegments);
                u = i / widthSegments;
                v = j / heightSegments;

                // vertices.push(x, y, z);
                normals.push(0.0, 1.0, 0.0);
                texCoords.push(u, v);

                if ((i < widthSegments) && (j < heightSegments)) {
                    indices.push(j + i * (widthSegments + 1),       j + (i + 1) * (widthSegments + 1),     j + i * (widthSegments + 1) + 1);
                    indices.push(j + (i + 1) * (widthSegments + 1), j + (i + 1) * (widthSegments + 1) + 1, j + i * (widthSegments + 1) + 1);
                }
            }
        }*/

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
            color:color
        };
    }
}
