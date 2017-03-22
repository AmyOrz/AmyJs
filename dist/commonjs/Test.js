"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Main_1 = require("./core/Main");
var Device_1 = require("./device/Device");
var TriangleData_1 = require("./Geometry/Data/TriangleData");
var Matrix4_1 = require("./Math/Matrix4");
var Test = (function () {
    function Test() {
        this.vs = "attribute vec4 a_Position;" +
            "attribute vec4 a_Color;" +
            "uniform mat4 u_MvpMatrix;" +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_Position = u_MvpMatrix * a_Position;" +
            "   v_Color = a_Color;" +
            "}";
        this.fs = '#ifdef GL_ES\n' +
            'precision mediump float;\n' +
            '#endif\n' +
            "varying vec4 v_Color;" +
            "void main(){" +
            "   gl_FragColor = v_Color;" +
            "}";
        this._gl = null;
        this._program = null;
    }
    Test.prototype.testCanvas = function () {
        Main_1.Main.setCanvas("webgl").init();
        this._gl = Device_1.Device.getInstance().gl;
        this._program = this.initShader(this.vs, this.fs);
        if (!this._program)
            alert("program error");
        this._gl.useProgram(this._program);
        this._gl.clearColor(0, 0, 0, 1);
        var a_Position = this._gl.getAttribLocation(this._program, "a_Position");
        var a_Color = this._gl.getAttribLocation(this._program, "a_Color");
        var u_MvpMatrix = this._gl.getUniformLocation(this._program, "u_MvpMatrix");
        var modelMatrix = new Matrix4_1.Matrix4();
        var viewMatrix = new Matrix4_1.Matrix4();
        var projMatrix = new Matrix4_1.Matrix4();
        var mvpMatrix = new Matrix4_1.Matrix4();
        modelMatrix.setRotate(60, 1, 1, 0);
        viewMatrix.lookAt(0, 0, -8, 0, 0, 0, 0, 1, 0);
        projMatrix.perspective(45, 1, 1, 100);
        mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
        this._gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
        var buffer = this._gl.createBuffer();
        if (!buffer)
            alert('buffer error');
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData_1.TriangleData.vertices, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(a_Position, 3, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(a_Position);
        var buffer = this._gl.createBuffer();
        if (!buffer)
            alert('buffer error');
        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData_1.TriangleData.color, this._gl.STATIC_DRAW);
        this._gl.vertexAttribPointer(a_Color, 3, this._gl.FLOAT, false, 0, 0);
        this._gl.enableVertexAttribArray(a_Color);
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
    };
    Test.prototype.initShader = function (vs, fs) {
        var program = this._gl.createProgram();
        var vshader = this._loadShader(this._gl.VERTEX_SHADER, vs);
        var fshader = this._loadShader(this._gl.FRAGMENT_SHADER, fs);
        if (!vshader || !fshader) {
            return;
        }
        this._gl.attachShader(program, vshader);
        this._gl.attachShader(program, fshader);
        this._gl.linkProgram(program);
        var linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
        if (!linked) {
            var err = this._gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            this._gl.deleteProgram(program);
            this._gl.deleteShader(vshader);
            this._gl.deleteShader(vshader);
            return;
        }
        if (!program)
            console.log("program error");
        return program;
    };
    Test.prototype._loadShader = function (type, value) {
        var shader = this._gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        this._gl.shaderSource(shader, value);
        this._gl.compileShader(shader);
        var compiled = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
        if (!compiled) {
            var error = this._gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            this._gl.deleteShader(shader);
            return;
        }
        return shader;
    };
    Test.prototype._createTriangle = function () {
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.testCanvas();
//# sourceMappingURL=Test.js.map