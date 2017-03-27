import { Entity } from "./Entity";
import { EntityManager } from "./Manager/EntityManager";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
export declare abstract class EntityObject extends Entity {
    name: string;
    protected _entityManager: EntityManager;
    init(): this;
    dispose(): this;
    onEnter(): void;
    onExit(): void;
    onDispose(): void;
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
}
