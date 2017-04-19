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
        var gameobj = GameObject_1.GameObject.create();
        var triangle = TriangleGeometry_1.TriangleGeometry.create();
        gameobj.addComponent(triangle);
        gameobj.addComponent(MeshRenderer_1.MeshRenderer.create());
        gameobj.transform.rotate(45, 1, 1, 0);
        gameobj.transform.translate(0.4, 0, 0);
        var director = Director_1.Director.getInstance();
        director.scene.addChild(gameobj);
        director.start();
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map