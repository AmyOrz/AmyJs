import { EntityObject } from "./EntityObject";
import { Transform } from "../../Component/Transform/Transform";
export declare class GameObject extends EntityObject {
    static create(): GameObject;
    initWhenCreate(): void;
    createTransform(): Transform;
}
