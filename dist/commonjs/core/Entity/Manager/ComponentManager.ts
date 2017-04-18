import { EntityObject } from "../EntityObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Geometry } from "../../../Component/Geometry/Geometry";
import { Component } from "../../Component";
import { Transform } from "../../../Component/Transform/Transform";
import { MeshRender } from "../../../Component/Renderer/MeshRender/MeshRender";

export class ComponentManager {
    public static create(entityObject: EntityObject) {
        var obj = new this(entityObject);

        return obj;
    }

    constructor(private _entityObject: EntityObject) { }

    public transform: Transform = null;
    public geometry: Geometry = null;

    private _componentList: Collection<any> = new Collection<any>();
    private _renderComponent: MeshRender = null;

    public init() {
        console.log(this._componentList)
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
        else if (component instanceof MeshRender) {
            this._renderComponent = component;
        }

        this._componentList.addChild(component);

        component.addToObject(this._entityObject);
    }

    public getRenderComponent() {
        return this._renderComponent;
    }
}
