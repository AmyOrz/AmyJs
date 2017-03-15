import {Collection} from "wonder-commonlib/dist/commonjs/Collection";
import {Entity} from "../Entity";
import {EntityDispatcher} from "../EntityDispatcher";
import {JudgeUtils} from "wonder-frp/dist/es2015/JudgeUtils";

export abstract class EntityManager extends Entity{
    public static create(entityDispatcher:EntityDispatcher){
        var obj = new this(entityDispatcher);
        return obj;
    }
    constructor(private _entityDispatcher:EntityDispatcher){}

    private _objectList:Collection<any> = new Collection();

    public init(){
        this.forEach((child:EntityDispatcher)=>{
            child.init();
        })
    }

    public hasChild(child:EntityDispatcher):boolean{
        return this._objectList.hasChild(child);
    }

    public addChild(child:EntityDispatcher){
        this._objectList.addChild(child);

        child.onEnter();

        return this;
    }

    public addChildren(children:EntityDispatcher,addFunc?:Function);
    public addChildren(children:Array<EntityDispatcher>,addFunc?:Function);
    public addChildren(children:Collection<EntityDispatcher>,addFunc?:Function);

    public addChildren(...args){
        var addChild = args[1] == void 0?this.addChild:args[1];
        if(JudgeUtils.isArray(args[0])){
            let children:Array<EntityDispatcher> = args[0];
            for(let child of children){
                addChild(child);
            }
        }else addChild(args[0]);

        return this;
    }

    public forEach(func:(child:EntityDispatcher,index:number)=>void){
        this._objectList.forEach(func);
        return this;
    }

    public filter(func:(child:EntityDispatcher,index:number) => boolean):Collection<EntityDispatcher>{
        return this._objectList.filter(func);
    }

    public getChildren(){
        return this._objectList;
    }
    public getAllChildren(){
        var res:Collection<EntityDispatcher> = Collection.create<EntityDispatcher>();
        var getChildren = (children:EntityDispatcher)=>{
            res.addChildren(children.getChildren());

            children.forEach((child:EntityDispatcher)=>{
                getChildren(child);
            });
        }

        getChildren(this._entityDispatcher);
        return res;
    }

    public getChild(index:number){
        return this._objectList.getChild(index);
    }

    public findChildById(uid:number){
        return this._objectList.findOne((child:EntityDispatcher)=>{
            return child.uid == uid;
        });
    }

    public findChildByName(name:string){
        return this._objectList.findOne((child:EntityDispatcher)=>{
            return child.name.search(name) > -1;
        });
    }

    public findChildrenByName(name:string):Collection<EntityDispatcher>{
        return this.filter((child:EntityDispatcher)=>{
            return child.name.search(name) > -1;
        })
    }

    public removeChild(child:EntityDispatcher){
        child.onExit();

        this._objectList.removeChild(child);

        return this;
    }
    public removeAllChildren(){
        this._objectList.forEach((child:EntityDispatcher)=>{
            this.removeChild(child);
        },this);
    }

}
