import { EntityDispatcher } from "./EntityDispatcher";
import { ComponentManager } from "./Manager/ComponentManager";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";

export abstract class EntityObject extends EntityDispatcher {
    get transform() {
        return this.componentManager.transform;
    }

    public parent: EntityObject = null;
    protected componentManager: ComponentManager = ComponentManager.create(this);

    public initWhencreate() {
        // this.componentManager.transform = ThreeDTransform.create();

    }
    public dispose() {
        if (this.parent) {
            this.parent.removeChild(this);
            this.parent = null;
        }
        super.dispose();
        this.componentManager.dispose();
    }
    public addChild(child: EntityObject) {
        if (child.parent) {
            child.parent.removeChild(child);
        }
        child.parent = this;
        child.transform.parent = this.transform;

        super.addChild(child);
    }

    public addChildren(children: EntityDispatcher);
    public addChildren(children: Array<EntityDispatcher>);
    public addChildren(children: Collection<EntityDispatcher>);

    public addChildren(...args) {
        super.addChildren(args, this.addChild);

        return this;
    }

    public getComponent<T>(_class: any): T {
        return this.componentManager.getComponent<T>(_class);
    }
}
