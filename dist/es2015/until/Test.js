import { Main } from "../core/Main";
import { Director } from "../core/Director";
import { GameObject } from "../core/Entity/GameObject";
import { MeshRenderer } from "../Component/Render/MeshRender/MeshRenderer";
import { Device } from "../core/device/Device";
import { PerspectiveCamera } from "../Component/Camera/PerspectiveCamera";
import { CameraController } from "../Component/Camera/Controll/CameraController";
import { BasicMaterial } from "../Component/Material/BasicMaterial";
import { Color } from "../Math/Color";
import { BoxGeometry } from "../Component/Geometry/BoxGeometry";
import { Loader } from "./Loader";
import { ModelMaterial } from "../Component/Material/ModelMaterial";
var Test = (function () {
    function Test() {
    }
    Test.prototype.loadByFile = function (files) {
        var _this = this;
        var streamArr = [];
        if (files.length <= 1 || files.length > 2) {
            console.log("请选择.obj和.mtl 2个文件进行渲染");
            return;
        }
        Loader.of().readFileToStream(files).subscribe(function (model) {
            console.log(model);
            _this.testCanvas(model);
        });
    };
    Test.prototype.loadByPath = function (fileObj) {
        var _this = this;
        Loader.of().convertByPath("./build/male02.obj").subscribe(function (model) {
            _this.testCanvas(model);
        });
    };
    Test.prototype.testCanvas = function (models) {
        Main.setCanvas("webgl").init();
        var gameobj = this.createTriangle();
        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(-2.4, 2, 0.2);
        var object = this.createPlane(models);
        object.transform.translate(-0.4, -80.1, 0);
        object.transform.rotate(0, 0, 1, 0);
        var director = Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(object);
        director.scene.addChild(this.createCamera());
        director.start();
    };
    Test.prototype.createTriangle = function () {
        var gameObject = GameObject.create();
        var material = BasicMaterial.create();
        material.color = Color.create("#0000ff");
        material.opacity = 0.5;
        var triangle = BoxGeometry.create();
        triangle.material = material;
        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createPlane = function (model) {
        var gameObject = GameObject.create();
        var material = ModelMaterial.create();
        var geometry = model;
        geometry.material = material;
        gameObject.addComponent(model);
        gameObject.addComponent(MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createCamera = function () {
        var camera = GameObject.create(), view = Device.getInstance().view, cameraComponent = PerspectiveCamera.create();
        cameraComponent.fovy = 30;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 1;
        cameraComponent.far = 1000;
        cameraComponent.translate(56, 150, -400);
        var cameraControll = CameraController.create(cameraComponent);
        camera.addComponent(cameraControll);
        return camera;
    };
    return Test;
}());
export { Test };
//# sourceMappingURL=Test.js.map