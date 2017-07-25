import { Geometry } from "./Geometry";
export class ModelGeometry extends Geometry {
    public static create() {
        var obj = new this();

        return obj;
    }

    public indices: number[] = null;
    public vertices: number[] = null;
    public normals: number[] = null;
    public texCoords: number[] = null;
    public colors: number[] = null;

    public computeData() {
        return <any>{
            vertice: this.vertices,
            normal: this.normals,
            texCoord: this.texCoords,
            indice: this.indices,
            color: this.colors,
        };
    }
}
