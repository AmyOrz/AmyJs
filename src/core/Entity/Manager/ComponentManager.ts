import { EntityObject } from "../EntityObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Geometry } from "../../../Component/Geometry/Geometry";
import { Component } from "../../Component";
import { Transform } from "../../../Component/Transform/Transform";

export class ComponentManager {
    public static create(entityObject: EntityObject) {
        var obj = new this(entityObject);

        return obj;
    }

    constructor(private _entityObject: EntityObject) { }

    public transform: Transform = null;

    private _componentList: Collection<any> = new Collection<any>();
    private _geometry: Geometry = null;
    private _renderer;

    public init() {

    }

    public addComponent(component: Component) {
        if (component instanceof Geometry) {
            this._geometry = component;
        }
        else if (component instanceof Transform) {
            this.transform = component;
        }
        // else if (component instanceof MeshRender)

        this._componentList.addChild(component);
    }

}
