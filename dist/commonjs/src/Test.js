"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var TriangleGeometry_1 = require("./Component/Geometry/TriangleGeometry");
var Director_1 = require("./core/Director");
var GameObject_1 = require("./core/Entity/GameObject");
var MeshRenderer_1 = require("./Component/Render/MeshRender/MeshRenderer");
var Test = (function () {
    function Test() {
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        var gameobj = this.createTriangle();
        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(0.4, 0, 0);
        var object = this.createTriangle();
        object.transform.translate(-0.4, -0.2, 0);
        object.transform.rotate(30, 0, 0, 1);
        var director = Director_1.Director.getInstance();
        director.renderer.setClearColor(0, 0, 0, 1);
        director.scene.addChild(gameobj);
        director.scene.addChild(object);
        director.start();
    };
    Test.prototype.createTriangle = function () {
        var gameObject = GameObject_1.GameObject.create();
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        gameObject.addComponent(triangle);
        gameObject.addComponent(MeshRenderer_1.MeshRenderer.create());
        return gameObject;
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map