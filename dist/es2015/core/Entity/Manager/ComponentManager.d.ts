import { EntityObject } from "../EntityObject";
import { Geometry } from "../../../Component/Geometry/Geometry";
import { Component } from "../../Component";
import { Transform } from "../../../Component/Transform/Transform";
import { MeshRenderer } from "../../../Component/Render/MeshRender/MeshRenderer";
export declare class ComponentManager {
    private _entityObject;
    static create(entityObject: EntityObject): ComponentManager;
    constructor(_entityObject: EntityObject);
    transform: Transform;
    geometry: Geometry;
    private _componentList;
    private _renderComponent;
    init(): void;
    addComponent(component: Component): void;
    getComponent<T>(componentClass: any): T;
    hasComponent<T>(componentClass: any): boolean;
    removeComponent(component: Component): void;
    getRenderComponent(): MeshRenderer;
    removeAllComponent(): void;
}
