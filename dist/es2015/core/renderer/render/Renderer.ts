import { RenderCommand } from "../command/RenderCommand";
import { WebglState } from "../state/WebglState";
export abstract class Renderer {

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

    public abstract render();
    public abstract addCommand(renderCmd: RenderCommand);
    public abstract init();

}
