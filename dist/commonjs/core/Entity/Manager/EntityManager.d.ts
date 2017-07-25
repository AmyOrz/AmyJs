import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Entity } from "../Entity";
import { EntityObject } from "../EntityObject";
export declare class EntityManager extends Entity {
    private _entityDispatcher;
    static create(entityDispatcher: EntityObject): EntityManager;
    constructor(_entityDispatcher: EntityObject);
    private _objectList;
    init(): void;
    dispose(): void;
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
    removeChild(child: EntityObject): this;
    removeAllChildren(): void;
}
