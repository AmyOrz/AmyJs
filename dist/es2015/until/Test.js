import { Main } from "../core/Main";
import { Director } from "../core/Director";
import { GameObject } from "../core/Entity/GameObject";
import { MeshRenderer } from "../Component/Render/MeshRender/MeshRenderer";
import { Device } from "../core/device/Device";
import { PerspectiveCamera } from "../Component/Camera/PerspectiveCamera";
import { CameraController } from "../Component/Camera/Controll/CameraController";
import { BasicMaterial } from "../Component/Material/BasicMaterial";
import { Color } from "../Math/Color";
import { Loader } from "./Loader";
import { ModelMaterial } from "../Component/Material/ModelMaterial";
import { TriangleGeometry } from "../Component/Geometry/TriangleGeometry";
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
        var director = Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(gameobj);
        director.scene.addChild(this.createCamera());
        director.start();
    };
    Test.prototype.createTriangle = function () {
        var gameObject = GameObject.create();
        var material = BasicMaterial.create();
        material.color = Color.create("#0000ff");
        material.opacity = 0.5;
        var triangle = TriangleGeometry.create();
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
        cameraComponent.translate(0, 0, -7);
        var cameraControll = CameraController.create(cameraComponent);
        camera.addComponent(cameraControll);
        return camera;
    };
    return Test;
}());
export { Test };
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map