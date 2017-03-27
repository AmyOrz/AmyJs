import { EntityObject } from "./EntityObject";
export declare class GameObject extends EntityObject {
    static create(): GameObject;
    initWhenCreate(): void;
}
