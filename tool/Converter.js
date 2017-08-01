"use strict";
var wdFrp = require("wdfrp");
var fs = require("fs");
wdFrp.fromNodeCallback(fs.readFile)("../scene.json")
    .map(function (fileBuffer) {
    var fileStr = fileBuffer.toString();
    var sceneObjects = JSON.parse(fileStr);
    var currentScene = sceneObjects.objects[0];
    var nodes = [];
    currentScene.children.forEach(function (gameObject) {
        nodes.push(gameObject.name);
    });
    var fileObject = {
        scene: currentScene.name,
        scenes: {
            Scene: {
                nodes: nodes
            }
        }
    };
    console.log(JSON.stringify(fileObject));
})
    .subscribe(function (data) {
});
