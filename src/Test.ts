import { Main } from "./core/Main";
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";
import { Director } from "./core/Director";
import { GameObject } from "./core/Entity/GameObject";
import { MeshRenderer } from "./Component/Render/MeshRender/MeshRenderer";

export class Test {

    public testCanvas() {
        Main.setCanvas("webgl").init();

        var gameobj = GameObject.create();

        var triangle = TriangleGeometry.create();

        gameobj.addComponent(triangle);
        gameobj.addComponent(MeshRenderer.create());

        gameobj.transform.rotate(45,1,1,0);
        gameobj.transform.translate(0.4,0,0);


        var director = Director.getInstance();
        director.scene.addChild(gameobj);

        director.start();
    }
}
var a = new Test();
a.testCanvas();

