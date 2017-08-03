"use strict";
var wdFrp = require("wdfrp");
var fs = require("fs");
var Util_1 = require("./Util");
module.exports = (function () {
    function Converter() {
    }
    Converter.create = function () {
        var obj = new this();
        return obj;
    };
    Converter.prototype.convert = function (file) {
        return wdFrp.fromNodeCallback(fs.readFile)(file)
            .map(function (fileBuffer) {
            var fileStr = fileBuffer.toString();
            var sceneObjects = JSON.parse(fileStr);
            var currentScene = sceneObjects.objects[0];
            var nodesIndex = [];
            var nodes = {};
            var meshes = {};
            var materials = {};
            var currentGameObjects = currentScene.children;
            circulateChildren(currentGameObjects);
            function circulateChildren(currentGameObjects) {
                if (currentGameObjects.length == 0 || Util_1.isObjectEmpty(currentGameObjects[0]))
                    return;
                currentGameObjects.forEach(function (gameObject) {
                    nodesIndex.push(gameObject.name);
                    nodes[gameObject.name] = {
                        children: [],
                        mesh: gameObject.name + "_mesh",
                        name: gameObject.name
                    };
                    meshes[gameObject.name + "_mesh"] = {
                        name: gameObject.name + "_mesh",
                        primitives: []
                    };
                    setAttributeByGameObject(gameObject);
                    gameObject.children.forEach(function (child) {
                        nodes[gameObject.name].children.push(child.name);
                    });
                    circulateChildren(gameObject.children);
                });
            }
            function setAttributeByGameObject(gameObject) {
                gameObject.components.forEach(function (component) {
                    if (component.matrix || component.rotation || component.scale || component.translation) {
                        for (var item in component) {
                            switch (item) {
                                case "matrix":
                                    nodes[gameObject.name].matrix = component[item];
                                    break;
                                case "rotation":
                                    nodes[gameObject.name].rotation = component[item];
                                    break;
                                case "scale":
                                    nodes[gameObject.name].scale = component[item];
                                    break;
                                case "translation":
                                    nodes[gameObject.name].translation = component[item];
                                    break;
                            }
                        }
                    }
                    else if (component.vertices || component.indices || component.material) {
                        var obj = {
                            attributes: {
                                POSITION: component.vertices,
                            },
                            verticeIndices: component.indices,
                            normalIndices: [],
                            texCoordIndices: [],
                            material: component.material.name,
                            mode: 4
                        };
                        obj.attributes.NORMAL = component.normal ? component.normal : [];
                        obj.attributes.TEXCOORD = component.texcoord ? component.texcoord : [];
                        meshes[gameObject.name + "_mesh"].primitives.push(obj);
                        materials[component.material.name] = {
                            technique: component.type,
                            transparent: false,
                            transparency: component.material.opacity,
                            values: {
                                diffuse: component.material.color,
                            }
                        };
                    }
                });
            }
            var fileObject = {
                scene: currentScene.name,
                scenes: {
                    Scene: {
                        nodes: nodesIndex
                    }
                },
                asset: {
                    version: "0.1.0",
                    generator: "WonderEditorConvert"
                },
                nodes: nodes,
                meshes: meshes,
                texture: {},
                samplers: {},
                images: {},
                materials: materials,
            };
            return fileObject;
        });
    };
    return Converter;
}());
