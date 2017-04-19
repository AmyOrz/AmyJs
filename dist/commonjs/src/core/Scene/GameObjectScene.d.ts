import { EntityObject } from "../Entity/EntityObject";
export declare class GameObjectScene extends EntityObject {
    static create(): GameObjectScene;
    initWhenCreate(): void;
    protected createTransform(): any;
}
