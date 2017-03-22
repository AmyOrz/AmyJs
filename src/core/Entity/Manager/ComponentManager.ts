import { EntityObject } from "../EntityObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Geometry } from "../../../Geometry/Geometry";
import { Transform } from "../../../Transform/Transform";

export class ComponentManager {
    public static create(entityObject: EntityObject) {
        var obj = new this(entityObject);

        return obj;
    }

    constructor(private _entityObject: EntityObject) { }

    public transform: Transform = null;

    private _componentList: Collection<any> = new Collection<any>();
    // private _rendererComponent: RendererComponent = null;
    private _geometry: Geometry = null;

    public init() {

    }

}
