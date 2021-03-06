import { EntityObject } from "./Entity/EntityObject";
import { Entity } from "./Entity/Entity";
import { Transform } from "../Component/Transform/Transform";

export class Component extends Entity {
    get transform(): Transform {
        if (this.entityObject == void 0) return null;

        return this.entityObject.transform;
    }

    public entityObject: EntityObject = null;

    public init() {

    }


    public addToObject(entityObject: EntityObject) {

        this.entityObject = entityObject;

        this.addToComponentContainer();
    }

    public addToComponentContainer() {

    }

}