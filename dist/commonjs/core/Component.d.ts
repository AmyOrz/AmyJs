/// <reference types="wonder-frp" />
import { Entity } from "wonder-frp/dist/commonjs/core/Entity";
import { EntityObject } from "./Entity/EntityObject";
export declare class Component extends Entity {
    readonly transform: any;
    entityObject: EntityObject;
    init(): void;
    dispose(): void;
    clone(): any;
    addToObject(entityObject: EntityObject): void;
    addToComponentContainer(): void;
    removeFromObject(entityObject: EntityObject): void;
    removeFromComponentContainer(): void;
}
