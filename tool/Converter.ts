import wdFrp = require("wdfrp");
import fs = require("fs");
import {isObjectEmpty} from "./Util";

export = class Converter{
    public static create(){
        var obj = new this();

        return obj;
    }

    public convert(file:string) {

//noinspection TypeScriptUnresolvedFunction
        return wdFrp.fromNodeCallback(fs.readFile)(file)
            .map(fileBuffer => {

                var fileStr = fileBuffer.toString();

                var sceneObjects = JSON.parse(fileStr);

                var currentScene = sceneObjects.objects[0];

                var nodesIndex = [];
                var nodes:any = {};
                var meshes:any = {};
                var materials:any = {};

                var currentGameObjects = currentScene.children;
                circulateChildren(currentGameObjects);

                function circulateChildren(currentGameObjects:any[]) {
                    if (currentGameObjects.length == 0 || isObjectEmpty(currentGameObjects[0]))return;

                    currentGameObjects.forEach(gameObject=> {

                        nodesIndex.push(gameObject.name);

                        nodes[gameObject.name] = {
                            children: [],
                            mesh: `${gameObject.name}_mesh`,
                            name: gameObject.name

                        };

                        meshes[gameObject.name + "_mesh"] = {
                            name: `${gameObject.name}_mesh`,
                            primitives: []
                        };

                        setAttributeByGameObject(gameObject);

                        gameObject.children.forEach(child => {
                            nodes[gameObject.name].children.push(child.name)
                        });

                        circulateChildren(gameObject.children);
                    });
                }

                function setAttributeByGameObject(gameObject) {

                    gameObject.components.forEach(component => {

                        if (component.matrix || component.rotation || component.scale || component.translation) {
                            for (let item in component) {

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
                            var obj:any = {
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
                            }
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
    }
}


