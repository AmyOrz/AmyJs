import {Program} from "../../Program/Program";
import {VariableLib} from "../VariableLib";
import {Geometry} from "../../../Geometry/Geometry";
export abstract class Shader {

    public VSource:string;
    public FSource:string;

    public program:Program = Program.create();

    public init(geometry:Geometry){
        this.initProgram(geometry);
    }

    protected sendAttributeBuffer(name:string,data:any){
        this.program.sendAttributeBuffer(name,data);
    }
    protected sendUniformBData(name:string,data:any){
        this.program.sendUniformData(name,VariableLib[name].type,data);
    }

    protected abstract initProgram(geometry:Geometry);
    protected abstract sendShaderVariables();
}
