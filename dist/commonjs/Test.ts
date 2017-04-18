import { Main } from "./core/Main";
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";
import { Render } from "./core/renderer/render/Render";
import { Director } from "./core/Director";
import { GameObject } from "./core/Entity/GameObject";
import { MeshRender } from "./Component/Renderer/MeshRender/MeshRender";

export class Test {

    public testCanvas() {
        Main.setCanvas("webgl").init();

        var gameobj = GameObject.create();

        var triangle = TriangleGeometry.create();

        gameobj.addComponent(triangle);
        gameobj.addComponent(MeshRender.create());

        var director = Director.getInstance();
        director.scene.addChild(gameobj);

        director.start();
    }
}
var a = new Test();
a.testCanvas();

