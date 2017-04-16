import { Main } from "./core/Main";
import { Device } from "./core/device/Device";
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";

export class Test {

    private _gl: WebGLRenderingContext = null;

    public testCanvas() {
        Main.setCanvas("webgl").init();

        this._gl = Device.getInstance().gl;

        this._gl.clearColor(0, 0, 0, 1);

        var triangle = TriangleGeometry.create();
        triangle.init();

        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);

        /*        var director = Director.getInstance();
         director.scene.addChild(this._createTriangle());*/
    }
    private _createTriangle() {
        // var gameObj = amy.GameObject().create();
        // var geometry = amy.Triangle.create();
        // gameObj.addComponent(geometry);
        //gameObj.addComponent(amy.MeshRender.create());
    }
}
var a = new Test();
a.testCanvas();

