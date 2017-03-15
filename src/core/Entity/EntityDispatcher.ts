import {Entity} from "./Entity";
import {EntityManager} from "./Manager/EntityManager";
import {Collection} from "wonder-commonlib/dist/es2015/Collection";

export abstract class EntityDispatcher extends Entity{
    public name:string = null;
    private _entityManager:EntityManager = EntityManager.create(this);

    public init(){
        this._entityManager.init();
        return this;
    }

    public onEnter(){

    }
    public onExit(){}

    public hasChild(child:EntityDispatcher):boolean{
        return this._entityManager.hasChild(child);
    }

    public addChild(child:EntityDispatcher){
        this._entityManager.addChild(child);

        return this;
    }

    public addChildren(children:EntityDispatcher,addFunc?:Function);
    public addChildren(children:Array<EntityDispatcher>,addFunc?:Function);
    public addChildren(children:Collection<EntityDispatcher>,addFunc?:Function);

    public addChildren(...args){
        this._entityManager.addChildren(args);

        return this;
    }

    public forEach(func:(child:EntityDispatcher,index:number)=>void){
        this._entityManager.forEach(func);
        return this;
    }

    public filter(func:(child:EntityDispatcher,index:number) => boolean):Collection<EntityDispatcher>{
        return this._entityManager.filter(func);
    }

    public getChildren(){
        return this._entityManager.getChildren();
    }

    public getAllChildren(){
        return this._entityManager.getAllChildren();
    }

    public getChild(index:number){
        return this._entityManager.getChild(index);
    }

    public findChildById(uid:number){
        return this._entityManager.findChildById(uid);
    }

    public findChildByName(name:string){
        return this._entityManager.findChildByName(name);
    }

    public findChildrenByName(name:string):Collection<EntityDispatcher>{
        return this._entityManager.findChildrenByName(name);
    }

    public removeChild(child:EntityDispatcher){
        return this._entityManager.removeChild(child);
    }
    public removeAllChildren(){
        this._entityManager.removeAllChildren();
    }
}
