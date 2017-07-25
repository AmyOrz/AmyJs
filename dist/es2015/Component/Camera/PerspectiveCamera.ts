import { Camera } from "./Camera";
export class PerspectiveCamera extends Camera {
    public static create() {
        var obj = new this();
        return obj;
    }

    private _fovy: number;
    get fovy() {
        return this._fovy;
    }
    set fovy(fovy: number) {
        this._fovy = fovy;
    }

    private _aspect: number;
    get aspect() {
        return this._aspect;
    }
    set aspect(aspect: number) {
        this._aspect = aspect;
    }

    public updateProjectionMatrix() {
        this.pMatrix.perspective(this._fovy, this._aspect, this.near, this.far);
        this.vMatrix.lookAt(this.view.x, this.view.y, this.view.z, 0, 0, 0, 0, 1, 0);
    }
}
