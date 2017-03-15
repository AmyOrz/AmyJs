import {EntityObject} from "./EntityObject";

export class GameObject extends EntityObject{
    public static create(){
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }
    public initWhenCreate(){
        super.initWhencreate();
        this.name = `GameObject${this.uid}`;
    }
}
