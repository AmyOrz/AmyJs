import { Main } from "./core/Main";;
import { TriangleGeometry } from "./Component/Geometry/TriangleGeometry";
import { Director } from "./core/Director";
import { GameObject } from "./core/Entity/GameObject";
import { MeshRenderer } from "./Component/Render/MeshRender/MeshRenderer";
import { Device } from "./core/device/Device";
import { PerspectiveCamera } from "./Component/Camera/PerspectiveCamera";
import { CameraController } from "./Component/Camera/Controll/CameraController";
import { BasicMaterial } from "./Component/Material/BasicMaterial";
import { Color } from "./Math/Color";
import { BoxGeometry } from "./Component/Geometry/BoxGeometry";
import {Loader} from "./until/Loader";

export class Test {

    public init() {

        Loader.of().convert("./build/cube.obj").subscribe((val)=>{
            console.log(val)
        });
    }

    public testCanvas(models) {


        Main.setCanvas("webgl").init();


        var gameobj = this.createTriangle();

        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(-1.4, 2, 0.2);


        var object = this.createPlane(models[0]);

        object.transform.translate(-0.4, -0.2, 0);
        object.transform.rotate(30, 0, 1, 1);


        var director = Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        // director.scene.addChild(gameobj);
        director.scene.addChild(object);
        director.scene.addChild(this.createCamera());

        director.start();
    }
    private createTriangle() {
        var gameObject = GameObject.create();

        var material = BasicMaterial.create();
        material.color = Color.create("#0000ff");
        material.opacity = 0.5;

        var triangle = BoxGeometry.create();
        triangle.material = material;

        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer.create());

        return gameObject;

    }
    private createPlane(model) {
        var gameObject = GameObject.create();

        var material = BasicMaterial.create();
        material.color = Color.create("#ff0000");

        var geometry = model;
        geometry.material = material;

        gameObject.addComponent(geometry);
        gameObject.addComponent(MeshRenderer.create());

        return gameObject;
    }

    private createCamera() {
        var camera = GameObject.create(),
            view = Device.getInstance().view,
            cameraComponent = PerspectiveCamera.create();

        cameraComponent.fovy = 30;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 1;
        cameraComponent.far = 100;

        cameraComponent.translate(0, 0, -9);

        var cameraControll = CameraController.create(cameraComponent);

        camera.addComponent(cameraControll);

        return camera;
    }
}
var a = new Test();
a.init();

