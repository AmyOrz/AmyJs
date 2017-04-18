import { singleton } from "../until/singleton";
import { EntityObject } from "./Entity/EntityObject";

export class Scene extends EntityObject {
    public static create() {
        var obj = new this();

        return obj;
    }
    public createTransform() {
        return null;
    }
}
