import {Queue} from "wonder-commonlib/dist/es2015/Queue";
import {RenderCommand} from "../command/RenderCommand";
import {Render} from "./Render";
export class WebglRender extends Render{
    public static create(){
        var obj = new this();

        return obj;
    }


    private _commandQueue:Queue<RenderCommand> = new Queue<RenderCommand>();

    public render(){
        this.webglState.init();

        this._commandQueue.forEach(function () {
            
        })
    }
    public addCommand(renderCmd:RenderCommand){
        this._commandQueue.addChild(renderCmd);
    }
}