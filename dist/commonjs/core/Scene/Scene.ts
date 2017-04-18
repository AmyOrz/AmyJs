import { EntityObject } from "../Entity/EntityObject";
import {GameObject} from "../Entity/GameObject";
import {GameObjectScene} from "./GameObjectScene";

export class Scene extends EntityObject {
    public static create() {
        var obj = new this();

        return obj;
    }

    public gameObjectScene:GameObjectScene = GameObjectScene.create();

    public createTransform() {
        return null;
    }

    public addChild(child:EntityObject){
        if(child instanceof GameObject){
            this.gameObjectScene.addChild(child);
        }
        child.parent = this;

        return this;
    }
}
