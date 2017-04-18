import { Main } from "./core/Main";
import { Device } from "./core/device/Device";
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";
import { Render } from "./core/renderer/render/Render";
import { WebglRender } from "./core/renderer/render/WebglRender";
import { RenderCommand } from "./core/renderer/command/RenderCommand";

export class Test {

    private _render: Render;
    public testCanvas() {
        Main.setCanvas("webgl").init();

        this._render = WebglRender.create();
        this._render.setClearColor(0, 0, 0, 1);

        var triangle = TriangleGeometry.create();
        triangle.init();

        this._render.init();
        this._render.addCommand(RenderCommand.create());
        this._render.render(triangle.getChild("verticeBuffer"));
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

