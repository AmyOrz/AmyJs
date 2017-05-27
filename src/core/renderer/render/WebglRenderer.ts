import { Queue } from "wonder-commonlib/dist/es2015/Queue";
import { RenderCommand } from "../command/RenderCommand";
import { Renderer } from "./Renderer";
export class WebglRenderer extends Renderer {
    public static create() {
        var obj = new this();

        return obj;
    }

    private _commandQueue: Queue<RenderCommand> = new Queue<RenderCommand>();

    public init() {
        this.webglState.init();
    }

    public render() {
        this._commandQueue.forEach((renderCmd: RenderCommand) => {
            renderCmd.draw();
        })
    }
    public addCommand(renderCmd: RenderCommand) {
        this._commandQueue.addChild(renderCmd);
    }
    public hasCommand() {
        return this._commandQueue.getCount() > 0;
    }
}