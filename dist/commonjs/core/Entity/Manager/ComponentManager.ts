import { EntityObject } from "../EntityObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Geometry } from "../../../Component/Geometry/Geometry";
import { Component } from "../../Component";
import { Transform } from "../../../Component/Transform/Transform";
import { MeshRenderer } from "../../../Component/Render/MeshRender/MeshRenderer";

export class ComponentManager {
    public static create(entityObject: EntityObject) {
        var obj = new this(entityObject);

        return obj;
    }

    constructor(private _entityObject: EntityObject) { }

    public transform: Transform = null;
    public geometry: Geometry = null;

    private _componentList: Collection<any> = new Collection<any>();
    private _renderComponent: MeshRenderer = null;

    public init() {
        this._componentList.forEach((component: Component) => {
            component.init();
        })
    }

    public addComponent(component: Component) {
        if (component instanceof Geometry) {
            this.geometry = component;
        }
        else if (component instanceof Transform) {
            this.transform = component;
        }
        else if (component instanceof MeshRenderer) {
            this._renderComponent = component;
        }

        this._componentList.addChild(component);

        component.addToObject(this._entityObject);
    }

    public getComponent<T>(componentClass: any): T {
        return this._componentList.findOne((component: Component) => {
            return component instanceof componentClass;
        })
    }

    public hasComponent<T>(componentClass: any): boolean {
        var res = this._componentList.hasChildWithFunc((component: Component) => {
            return component instanceof componentClass;
        })
        return res;
    }

    public getRenderComponent() {
        return this._renderComponent;
    }
}
