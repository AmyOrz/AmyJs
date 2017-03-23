import { Main } from "./core/Main";
import { Device } from "./device/Device";
import { TriangleData } from "./Geometry/Data/TriangleData";
import { Matrix4 } from "./Math/Matrix4";


export class Test {
    private vs: string =
    "attribute vec4 a_Position;" +
    "attribute vec4 a_Color;" +
    "uniform mat4 u_MvpMatrix;" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_Position = u_MvpMatrix * a_Position;" +
    "   v_Color = a_Color;" +
    "}";
    private fs: string =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif\n' +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_FragColor = v_Color;" +
    "}";

    private _gl: WebGLRenderingContext = null;
    private _program: WebGLProgram = null;

    public testCanvas() {
        Main.setCanvas("webgl").init();

        this._gl = Device.getInstance().gl;
        this._program = this.initShader(this.vs, this.fs);
        if (!this._program) alert("program error");

        this._gl.useProgram(this._program);

        this._gl.clearColor(0, 0, 0, 1);

        var a_Position: number = this._gl.getAttribLocation(this._program, "a_Position");
        var a_Color: number = this._gl.getAttribLocation(this._program, "a_Color");


        var u_MvpMatrix = this._gl.getUniformLocation(this._program, "u_MvpMatrix");
        var modelMatrix = new Matrix4();
        var viewMatrix = new Matrix4();
        var projMatrix = new Matrix4();
        var mvpMatrix = new Matrix4();

        modelMatrix.setRotate(60, 1, 1, 0);
        viewMatrix.lookAt(0, 0, -8, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, 1, 1, 100);

        mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
        this._gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);


        var buffer = this._gl.createBuffer();
        if (!buffer) alert('bufferContainer error');

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData.vertices, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(a_Position, 3, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(a_Position);

        var buffer = this._gl.createBuffer();
        if (!buffer) alert('bufferContainer error');

        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData.color, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(a_Color, 3, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(a_Color);

        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);



        /*        var director = Director.getInstance();
         director.scene.addChild(this._createTriangle());*/
    }
    public initShader(vs: string, fs: string): WebGLProgram {
        let program: WebGLProgram = this._gl.createProgram();
        let vshader: WebGLShader = this._loadShader(this._gl.VERTEX_SHADER, vs);
        let fshader: WebGLShader = this._loadShader(this._gl.FRAGMENT_SHADER, fs);
        if (!vshader || !fshader) {
            return;
        }
        //连接着色器
        this._gl.attachShader(program, vshader);
        this._gl.attachShader(program, fshader);
        this._gl.linkProgram(program);
        let linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
        if (!linked) {
            let err = this._gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            this._gl.deleteProgram(program);
            this._gl.deleteShader(vshader);
            this._gl.deleteShader(vshader);
            return;
        }
        if (!program) console.log("program error");
        return program;
    }
    private _loadShader(type: number, value: string): WebGLShader {
        let shader: WebGLShader = this._gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        this._gl.shaderSource(shader, value);   //着色器赋值
        this._gl.compileShader(shader);        //编译着色器

        let compiled = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (!compiled) {
            let error = this._gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            this._gl.deleteShader(shader);
            return;
        }
        return shader;
    }
    private _createTriangle() {
        // var gameObj = amy.GameObject().create();
        // var geometry = amy.Triangle.create();
        // gameObj.addComponent(geometry);
        //gameObj.addComponent(amy.MeshRender.create());
    }
}
var a = new Test();
a.testCanvas();

