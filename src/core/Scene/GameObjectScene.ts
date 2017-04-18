import {EntityObject} from "../Entity/EntityObject";
export class GameObjectScene extends EntityObject{
    public static create(){
        var obj = new this();

        return obj;
    }

    protected createTransform(){
        return null;
    }
}