import { EntityObject } from "../EntityObject";
import { Component } from "../../Component";
import { Transform } from "../../../Component/Transform/Transform";
export declare class ComponentManager {
    private _entityObject;
    static create(entityObject: EntityObject): ComponentManager;
    constructor(_entityObject: EntityObject);
    transform: Transform;
    private _componentList;
    private _geometry;
    init(): void;
    addComponent(component: Component): void;
}
