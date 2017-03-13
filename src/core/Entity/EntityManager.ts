import {Collection} from "wonder-commonlib/dist/commonjs/Collection";
import {GameObject} from "./GameObject";
export abstract class EntityManager{

    private objectList:Collection<any> = new Collection();

    public addChild(gameObject:GameObject){
        this.objectList.addChild(gameObject);
    }
    public hasChild(gameObject:GameObject){
        this.objectList.hasChild(gameObject);
    }
    public removeChild(gameObject:GameObject){
        this.objectList.removeChild(gameObject);
    }
    public getChildren(){
        return this.objectList;
    }
}
