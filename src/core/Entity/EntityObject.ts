import {EntityDispatcher} from "./EntityDispatcher";
import {ComponentManager} from "./Manager/ComponentManager";

export abstract class EntityObject extends EntityDispatcher{
    get transform(){
        return this
    }

    public parent:EntityObject = null;
    protected componentManager:ComponentManager = ComponentManager.create(this);

    public initWhencreate(){

    }
}
