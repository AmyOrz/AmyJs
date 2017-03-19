import { singleton } from "../until/singleton";
import { EntityDispatcher } from "../core/Entity/EntityDispatcher";

@singleton()
export class Scene extends EntityDispatcher {
    public static getInstance() { }


}
