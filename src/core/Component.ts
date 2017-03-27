import { EntityObject } from "./Entity/EntityObject";
import { Entity } from "./Entity/Entity";

export class Component extends Entity {
    get transform() {
        if (this.entityObject == void 0) return null;

        // return this.entityObject.transform;
    }

    public entityObject: EntityObject = null;

    public init() { }

    public dispose() { }

    public clone(): any {

    }

    public addToObject(entityObject: EntityObject) {
        // if (this.entityObject) this.entityObject.removeComponent(this);

        this.entityObject = entityObject;

        this.addToComponentContainer();
    }

    public addToComponentContainer() {

    }

    public removeFromObject(entityObject: EntityObject) {
        this.removeFromComponentContainer();
    }

    public removeFromComponentContainer() {

    }
}