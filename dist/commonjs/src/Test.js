"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var TriangleGeometry_1 = require("./Component/Geometry/TriangleGeometry");
var Director_1 = require("./core/Director");
var GameObject_1 = require("./core/Entity/GameObject");
var MeshRenderer_1 = require("./Component/Render/MeshRender/MeshRenderer");
var Device_1 = require("./core/device/Device");
var PerspectiveCamera_1 = require("./Component/Camera/PerspectiveCamera");
var CameraController_1 = require("./Component/Camera/Controll/CameraController");
var BasicMaterial_1 = require("./Component/Material/BasicMaterial");
var PlaneGeometry_1 = require("./Component/Geometry/PlaneGeometry");
var Test = (function () {
    function Test() {
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        var gameobj = this.createTriangle();
        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(0.4, 0, 0);
        var object = this.createPlane();
        object.transform.translate(-0.4, -0.2, 0);
        object.transform.rotate(30, 0, 0, 1);
        var director = Director_1.Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(gameobj);
        director.scene.addChild(object);
        director.scene.addChild(this.createCamera());
        director.start();
    };
    Test.prototype.createTriangle = function () {
        var gameObject = GameObject_1.GameObject.create();
        var material = BasicMaterial_1.BasicMaterial.create();
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        triangle.material = material;
        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer_1.MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createPlane = function () {
        var gameObject = GameObject_1.GameObject.create();
        var material = BasicMaterial_1.BasicMaterial.create();
        var geometry = PlaneGeometry_1.PlaneGeometry.create();
        geometry.material = material;
        gameObject.addComponent(geometry);
        gameObject.addComponent(MeshRenderer_1.MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createCamera = function () {
        var camera = GameObject_1.GameObject.create(), view = Device_1.Device.getInstance().view, cameraComponent = PerspectiveCamera_1.PerspectiveCamera.create();
        cameraComponent.fovy = 30;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 1;
        cameraComponent.far = 100;
        cameraComponent.translate(0, 0, -9);
        var cameraControll = CameraController_1.CameraController.create(cameraComponent);
        camera.addComponent(cameraControll);
        return camera;
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map