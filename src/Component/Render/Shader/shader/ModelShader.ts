import {Shader} from "./Shader";
import {ModelShaderLib} from "../lib/ModelShaderLib";
import {RenderCommand} from "../../../../core/renderer/command/RenderCommand";
import {Material} from "../../../Material/Material";
import {VariableLib} from "../VariableLib";
export class ModelShader extends Shader{
    public static create(){
        var obj = new this();

        return obj;
    }

    initProgram() {
        this.program.initProgramWithShader(this);
    }

    createShaderLib(){
        return ModelShaderLib.create();
    }

    update(cmd: RenderCommand, material: Material) {
        this.program.use();
        //循环遍历所以attribute uniform 进行传值
        this._shaderLib.getAttributes().forEach((item) => {
            var buffer = cmd.buffers.getChild(VariableLib[item].buffer);

            this.sendAttributeBuffer(item, buffer);
        });
        this.program.sendAllBufferData();

        this._shaderLib.getUniforms().forEach((item) => {
            this.sendUniformData(item, cmd[VariableLib[item].buffer]);
        });
    }
}