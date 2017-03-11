
import { Main } from "./core/Main";
import {Director} from "../dist/commonjs/core/Director";
export class Test {
    public testCanvas() {
        Main.setCanvas("webgl","ct").init();

        var director = Director.getInstance();
        // director.scene.addChild(this._createTriangle());

    }
    private _createTriangle(){
        // var gameObj = amy.GameObject().create();
        // var geometry = amy.Triangle.create();
        // gameObj.addComponent(geometry);
        //gameObj.addComponent(amy.MeshRender.create());
    }
}
var a = new Test();
a.testCanvas();

