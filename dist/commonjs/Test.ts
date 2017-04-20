import { Main } from "./core/Main";
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";
import { Director } from "./core/Director";
import { GameObject } from "./core/Entity/GameObject";
import { MeshRenderer } from "./Component/Render/MeshRender/MeshRenderer";

export class Test {

    public testCanvas() {
        Main.setCanvas("webgl").init();

        var gameobj = this.createTriangle();

        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(0.4, 0, 0);

        var object = this.createTriangle();

        object.transform.translate(-0.4, -0.2, 0);
        object.transform.rotate(30, 0, 0, 1);


        var director = Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(gameobj);
        director.scene.addChild(object);

        director.start();
    }
    private createTriangle() {
        var gameObject = GameObject.create();

        var triangle = TriangleGeometry.create();

        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer.create());

        return gameObject;
    }
}
var a = new Test();
a.testCanvas();

