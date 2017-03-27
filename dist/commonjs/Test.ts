import { Main } from "./core/Main";
import { Device } from "./device/Device";
import { Matrix4 } from "./Math/Matrix4";
import { Program } from "./Renderer/Program/Program";
import {TriangleGeometry} from "./Geometry/TriangleGeometry";


export class Test {

    private _gl: WebGLRenderingContext = null;
    private _program: Program = null;

    public testCanvas() {
        Main.setCanvas("webgl").init();

        this._gl = Device.getInstance().gl;
        this._program = Program.create();
        this._program.use();

        this._gl.clearColor(0, 0, 0, 1);

        var modelMatrix = new Matrix4();
        var viewMatrix = new Matrix4();
        var projMatrix = new Matrix4();
        var mvpMatrix = new Matrix4();

        modelMatrix.setRotate(90, 0, 0, 1);
        viewMatrix.lookAt(0, 0, -8, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, 1, 1, 100);

        mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);

        this._program.sendMatrix4("u_MvpMatrix", mvpMatrix);

        var triangle = TriangleGeometry.create();
        triangle.init();

        var verticeBuffer = triangle.getChild("verticeBuffer") as ArrayBuffer;
        var colorBuffer = triangle.getChild("colorBuffer") as ArrayBuffer;

        this._program.sendAttributeBuffer("a_Position",verticeBuffer);
        this._program.sendAttributeBuffer("a_Color",colorBuffer);

        this._program.sendAllBufferData();

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

