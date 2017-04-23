import { Entity } from "./Entity";
import { EntityManager } from "./Manager/EntityManager";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Component } from "../Component";
import { ComponentManager } from "./Manager/ComponentManager";
import { Renderer } from "../renderer/render/Renderer";
import { Geometry } from "../../Component/Geometry/Geometry";
import { Transform } from "../../Component/Transform/Transform";

export abstract class EntityObject extends Entity {
    get transform(): Transform {
        return this._componentManager.transform;
    }

    get geometry(): Geometry {
        return this._componentManager.geometry;
    }

    public parent:EntityObject = null;
    public name: string = null;
    protected _entityManager: EntityManager = EntityManager.create(this);

    protected _componentManager: ComponentManager = ComponentManager.create(this);

    public initWhenCreate() {
        this._componentManager.addComponent(this.createTransform())
    }

    public init() {
        this._componentManager.init();
        this._entityManager.init();
        return this;
    }

    public render(renderer: Renderer) {
        var renderComponent = this._componentManager.getRenderComponent();
        if (renderComponent != void 0)
            renderComponent.render(renderer, this);

        this.getChildren().forEach((child: EntityObject) => {
            child.render(renderer);
        });
    }

    protected abstract createTransform();

    public dispose() {
        this._entityManager.dispose();
        return this;
    }

    public hasChild(child: EntityObject): boolean {
        return this._entityManager.hasChild(child);
    }

    public addChild(child: EntityObject) {
        this._entityManager.addChild(child);

        return this;
    }

    public addChildren(children: EntityObject);
    public addChildren(children: Array<EntityObject>);
    public addChildren(children: Collection<EntityObject>);

    public addChildren(...args) {
        this._entityManager.addChildren(args);

        return this;
    }

    public forEach(func: (child: EntityObject, index: number) => void) {
        this._entityManager.forEach(func);
        return this;
    }

    public filter(func: (child: EntityObject, index: number) => boolean) {
        return this._entityManager.filter(func);
    }

    public getChildren() {
        return this._entityManager.getChildren();
    }

    public getAllChildren() {
        return this._entityManager.getAllChildren();
    }

    public getChild(index: number) {
        return this._entityManager.getChild(index);
    }

    public findChildById(uid: number) {
        return this._entityManager.findChildById(uid);
    }

    public findChildByName(name: string) {
        return this._entityManager.findChildByName(name);
    }

    public findChildrenByName(name: string) {
        return this._entityManager.findChildrenByName(name);
    }

    public removeChild(child: EntityObject) {
        return this._entityManager.removeChild(child);
    }
    public removeAllChildren() {
        this._entityManager.removeAllChildren();
    }

    public addComponent(component: Component) {
        this._componentManager.addComponent(component);
    }

}
