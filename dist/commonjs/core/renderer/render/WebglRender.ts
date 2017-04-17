import { Queue } from "wonder-commonlib/dist/commonjs/Queue";
import { RenderCommand } from "../command/RenderCommand";
import { Render } from "./Render";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export class WebglRender extends Render {
    public static create() {
        var obj = new this();

        return obj;
    }


    private _commandQueue: Queue<RenderCommand> = new Queue<RenderCommand>();

    public render(buffer: ArrayBuffer) {
        this.webglState.init();

        this._commandQueue.forEach(function(renderCmd: RenderCommand) {

            renderCmd.draw(buffer);
        })
    }
    public addCommand(renderCmd: RenderCommand) {
        this._commandQueue.addChild(renderCmd);
    }
}