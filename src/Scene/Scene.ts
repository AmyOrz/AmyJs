import {singleton} from "../until/singleton";
import {EntityManager} from "../core/Entity/EntityManager";

@singleton()
export class Scene extends EntityManager{
    public static getInstance(){}


}
