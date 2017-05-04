import { EntityObject } from "../Entity/EntityObject";
import { Renderer } from "../renderer/render/Renderer";
import {CameraController} from "../../Component/Camera/Controll/CameraController";
export class GameObjectScene extends EntityObject {
    public static create() {
        var obj = new this();

        obj.initWhenCreate();
        return obj;
    }

    private _currentCamera;
    get currentCamera() {
        return this._currentCamera;
    }

    public initWhenCreate() {
        this.name = `GameObjectScene${this.uid}`;
    }

    public render(renderer: Renderer) {
        super.render(renderer, this.currentCamera);
    }

    public addChild(child:EntityObject){
        if(child.hasComponent(CameraController)){
            this._currentCamera = child;
        }
        super.addChild(child);
        return this;
    }

    protected createTransform() {
        return null;
    }
}