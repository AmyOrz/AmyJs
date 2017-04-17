import { RenderCommand } from "../command/RenderCommand";
import { WebglState } from "../state/WebglState";
import { ArrayBuffer } from "../../../Component/Renderer/Buffer/ArrayBuffer";
export abstract class Render {

    get webglState() {
        return this._wegbglState;
    }

    set webglState(webglState: WebglState) {
        this._wegbglState = webglState;
    }

    private _wegbglState: WebglState = WebglState.create();

    public setClearColor(r: number, g: number, b: number, a: number) {
        this._wegbglState.setClearColor(r, g, b, a);
    }

    abstract render(buffer: ArrayBuffer);
    abstract addCommand(renderCmd: RenderCommand);

}
