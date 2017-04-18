import { EntityObject } from "../Entity/EntityObject";
import { GameObjectScene } from "./GameObjectScene";
export declare class Scene extends EntityObject {
    static create(): Scene;
    gameObjectScene: GameObjectScene;
    createTransform(): any;
    addChild(child: EntityObject): this;
}
