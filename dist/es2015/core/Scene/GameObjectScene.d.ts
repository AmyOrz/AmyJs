import { EntityObject } from "../Entity/EntityObject";
import { Renderer } from "../renderer/render/Renderer";
export declare class GameObjectScene extends EntityObject {
    static create(): GameObjectScene;
    private _currentCamera;
    readonly currentCamera: any;
    initWhenCreate(): void;
    render(renderer: Renderer): void;
    addChild(child: EntityObject): this;
    protected createTransform(): any;
}
