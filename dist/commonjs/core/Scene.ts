import { singleton } from "../until/singleton";
import { EntityObject } from "./Entity/EntityObject";

@singleton()
export class Scene extends EntityObject {
    public static getInstance(): any { }


}