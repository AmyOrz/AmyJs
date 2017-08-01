import wdFrp = require("wdfrp");
import fs = require("fs");

//noinspection TypeScriptUnresolvedFunction
wdFrp.fromNodeCallback(fs.readFile)("../scene.json")
    .map(fileBuffer =>{

        var fileStr = fileBuffer.toString();

        var sceneObjects = JSON.parse(fileStr);

        var currentScene = sceneObjects.objects[0];

        var nodesIndex = [];
        var nodes = {};

        currentScene.children.forEach(gameObject=>{
            nodesIndex.push(gameObject.name);

        });


        var fileObject = {
            scene:currentScene.name,
            scenes:{
                Scene:{
                    nodes:nodesIndex
                }
            }
        };
        console.log(JSON.stringify(fileObject))
    })
    .subscribe(data=>{
    });
