import { Entity } from "./Entity";
import { EntityManager } from "./Manager/EntityManager";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Component } from "../Component";
import { ComponentManager } from "./Manager/ComponentManager";
export declare abstract class EntityObject extends Entity {
    readonly transform: void;
    name: string;
    protected _entityManager: EntityManager;
    protected _componentManager: ComponentManager;
    init(): this;
    dispose(): this;
    hasChild(child: EntityObject): boolean;
    addChild(child: EntityObject): this;
    addChildren(children: EntityObject): any;
    addChildren(children: Array<EntityObject>): any;
    addChildren(children: Collection<EntityObject>): any;
    forEach(func: (child: EntityObject, index: number) => void): this;
    filter(func: (child: EntityObject, index: number) => boolean): Collection<EntityObject>;
    getChildren(): Collection<any>;
    getAllChildren(): Collection<EntityObject>;
    getChild(index: number): any;
    findChildById(uid: number): any;
    findChildByName(name: string): any;
    findChildrenByName(name: string): Collection<EntityObject>;
    removeChild(child: EntityObject): EntityManager;
    removeAllChildren(): void;
    addComponent(component: Component): void;
}
