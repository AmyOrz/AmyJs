import { Collection } from "wonder-commonlib/dist/commonjs/Collection";
import { Entity } from "../Entity";
import { JudgeUtils } from "wonder-frp/dist/es2015/JudgeUtils";
import { EntityObject } from "../EntityObject";

export class EntityManager extends Entity {
    public static create(entityDispatcher: EntityObject) {
        var obj = new this(entityDispatcher);
        return obj;
    }
    constructor(private _entityDispatcher: EntityObject) {
        super();
    }

    private _objectList: Collection<any> = new Collection();

    public init() {
        this.forEach((child: EntityObject) => {
            child.init();
        })
    }
    public dispose() {
        this.forEach((child: EntityObject) => {
            child.init();
        })

    }
    public hasChild(child: EntityObject): boolean {
        return this._objectList.hasChild(child);
    }

    public addChild(child: EntityObject) {
        this._objectList.addChild(child);

        child.onEnter();

        return this;
    }
    public addChildren(children: EntityObject);
    public addChildren(children: Array<EntityObject>);
    public addChildren(children: Collection<EntityObject>);

    public addChildren(...args) {
        var addChild = args[1] == void 0 ? this.addChild : args[1];
        if (JudgeUtils.isArray(args[0])) {
            let children: Array<EntityObject> = args[0];
            for (let child of children) {
                addChild(child);
            }
        } else addChild(args[0]);

        return this;
    }

    public forEach(func: (child: EntityObject, index: number) => void) {
        this._objectList.forEach(func);
        return this;
    }

    public filter(func: (child: EntityObject, index: number) => boolean): Collection<EntityObject> {
        return this._objectList.filter(func);
    }

    public getChildren() {
        return this._objectList;
    }
    public getAllChildren() {
        var res: Collection<EntityObject> = Collection.create<EntityObject>();
        var getChildren = (children: EntityObject) => {
            res.addChildren(children.getChildren());

            children.forEach((child: EntityObject) => {
                getChildren(child);
            });
        }

        getChildren(this._entityDispatcher);
        return res;
    }

    public getChild(index: number) {
        return this._objectList.getChild(index);
    }

    public findChildById(uid: number) {
        return this._objectList.findOne((child: EntityObject) => {
            return child.uid == uid;
        });
    }

    public findChildByName(name: string) {
        return this._objectList.findOne((child: EntityObject) => {
            return child.name.search(name) > -1;
        });
    }

    public findChildrenByName(name: string): Collection<EntityObject> {
        return this.filter((child: EntityObject) => {
            return child.name.search(name) > -1;
        })
    }

    public removeChild(child: EntityObject) {
        child.onExit();

        this._objectList.removeChild(child);

        return this;
    }
    public removeAllChildren() {
        this._objectList.forEach((child: EntityObject) => {
            this.removeChild(child);
        }, this);
    }

}
