import { EntityObject } from "../Entity/EntityObject";
export class GameObjectScene extends EntityObject {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();
        return obj;
    }

    public initWhenCreate() {
        this.name = `GameObjectScene${this.uid}`;
    }

    protected createTransform() {
        return null;
    }
}