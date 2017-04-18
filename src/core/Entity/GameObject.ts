import { EntityObject } from "./EntityObject";
import { Transform } from "../../Component/Transform/Transform";

export class GameObject extends EntityObject {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }
    public initWhenCreate() {
        super.initWhenCreate();
        this.name = `GameObject${this.uid}`;
    }

    public createTransform() {
        return Transform.create();
    }
}
