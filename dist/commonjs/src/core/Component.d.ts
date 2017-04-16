import { EntityObject } from "./Entity/EntityObject";
import { Entity } from "./Entity/Entity";
export declare class Component extends Entity {
    readonly transform: void;
    entityObject: EntityObject;
    init(): void;
    addToObject(entityObject: EntityObject): void;
    addToComponentContainer(): void;
}
