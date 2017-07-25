"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("../core/Main");
var Director_1 = require("../core/Director");
var GameObject_1 = require("../core/Entity/GameObject");
var MeshRenderer_1 = require("../Component/Render/MeshRender/MeshRenderer");
var Device_1 = require("../core/device/Device");
var PerspectiveCamera_1 = require("../Component/Camera/PerspectiveCamera");
var CameraController_1 = require("../Component/Camera/Controll/CameraController");
var BasicMaterial_1 = require("../Component/Material/BasicMaterial");
var Color_1 = require("../Math/Color");
var BoxGeometry_1 = require("../Component/Geometry/BoxGeometry");
var Loader_1 = require("./Loader");
var ModelMaterial_1 = require("../Component/Material/ModelMaterial");
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
        Loader_1.Loader.of().readFileToStream(files).subscribe(function (model) {
            console.log(model);
            _this.testCanvas(model);
        });
    };
    Test.prototype.loadByPath = function (fileObj) {
        var _this = this;
        Loader_1.Loader.of().convertByPath("./build/male02.obj").subscribe(function (model) {
            _this.testCanvas(model);
        });
    };
    Test.prototype.testCanvas = function (models) {
        Main_1.Main.setCanvas("webgl").init();
        var gameobj = this.createTriangle();
        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(-2.4, 2, 0.2);
        var object = this.createPlane(models);
        object.transform.translate(-0.4, -80.1, 0);
        object.transform.rotate(0, 0, 1, 0);
        var director = Director_1.Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(object);
        director.scene.addChild(this.createCamera());
        director.start();
    };
    Test.prototype.createTriangle = function () {
        var gameObject = GameObject_1.GameObject.create();
        var material = BasicMaterial_1.BasicMaterial.create();
        material.color = Color_1.Color.create("#0000ff");
        material.opacity = 0.5;
        var triangle = BoxGeometry_1.BoxGeometry.create();
        triangle.material = material;
        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer_1.MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createPlane = function (model) {
        var gameObject = GameObject_1.GameObject.create();
        var material = ModelMaterial_1.ModelMaterial.create();
        var geometry = model;
        geometry.material = material;
        gameObject.addComponent(model);
        gameObject.addComponent(MeshRenderer_1.MeshRenderer.create());
        return gameObject;
    };
    Test.prototype.createCamera = function () {
        var camera = GameObject_1.GameObject.create(), view = Device_1.Device.getInstance().view, cameraComponent = PerspectiveCamera_1.PerspectiveCamera.create();
        cameraComponent.fovy = 30;
        cameraComponent.aspect = view.width / view.height;
        cameraComponent.near = 1;
        cameraComponent.far = 1000;
        cameraComponent.translate(56, 150, -400);
        var cameraControll = CameraController_1.CameraController.create(cameraComponent);
        camera.addComponent(cameraControll);
        return camera;
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=Test.js.map