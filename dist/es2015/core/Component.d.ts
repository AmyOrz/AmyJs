import { EntityObject } from "./Entity/EntityObject";
import { Entity } from "./Entity/Entity";
import { Transform } from "../Component/Transform/Transform";
export declare class Component extends Entity {
    readonly transform: Transform;
    entityObject: EntityObject;
    init(): void;
    addToObject(entityObject: EntityObject): void;
    addToComponentContainer(): void;
}
