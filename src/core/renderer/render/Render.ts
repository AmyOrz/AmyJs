import {RenderCommand} from "../command/RenderCommand";
import {WebglState} from "../state/WebglState";
export abstract class Render {

    get webglState(){
        return this._wegbglState;
    }

    set webglState(webglState:WebglState){
        this._wegbglState = webglState;
    }

    private _wegbglState:WebglState;

    public setClearColor(r:number,g:number,b:number,a:number){
        this._wegbglState.setClearColor(r,g,b,a);
    }

    abstract render();
    abstract addCommand(renderCmd:RenderCommand);

}
