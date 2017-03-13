export class GameObject{
    public static create(){
        var obj = new this();

        obj.initWhenCreate();

        return obj;
    }
    public name:string;
    public initWhenCreate(){
        this.name = "GameObject"
    }
}
