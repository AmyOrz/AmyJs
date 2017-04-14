"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Device_1 = require("../../device/Device");
var Hash_1 = require("wonder-commonlib/dist/commonjs/Hash");
var EVariableType_1 = require("./EVariableType");
var GLSLDataSender_1 = require("./GLSLDataSender");
var Program = (function () {
    function Program() {
        this.glProgram = null;
        this._attributeList = new Hash_1.Hash();
        this._glslSend = GLSLDataSender_1.GLSLDataSender.create(this);
    }
    Program.create = function () {
        var obj = new this();
        return obj;
    };
    Program.prototype.use = function () {
        this._getGl().useProgram(this.glProgram);
    };
    Program.prototype.getAttribLocation = function (name) {
        var pos = this._attributeList.getChild(name);
        if (pos !== void 0)
            return pos;
        var attribute = this._getGl().getAttribLocation(this.glProgram, name);
        this._attributeList.addChild(name, attribute);
        return attribute;
    };
    Program.prototype.getUniformLocation = function (name) {
        return this._glslSend.getUniformLocation(name);
    };
    Program.prototype.sendAttributeBuffer = function (name, buffer) {
        var pos = this.getAttribLocation(name);
        if (pos == -1)
            return;
        this._glslSend.addBufferToSendList(pos, buffer);
    };
    Program.prototype.sendAllBufferData = function () {
        this._glslSend.sendAllBufferData();
    };
    Program.prototype.sendUniformData = function (name, type, data) {
        if (data === null) {
            return;
        }
        switch (type) {
            case EVariableType_1.EVariableType.FLOAT_1:
                this._glslSend.sendFloat1(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_2:
                this._glslSend.sendFloat2(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_3:
                this._glslSend.sendFloat3(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_4:
                this._glslSend.sendFloat4(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_2:
                this._glslSend.sendVector2(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_3:
                this._glslSend.sendVector3(name, data);
                break;
            case EVariableType_1.EVariableType.VECTOR_4:
                this._glslSend.sendVector4(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_MAT4:
                this._glslSend.sendMatrix4(name, data);
                break;
            case EVariableType_1.EVariableType.NUMBER_1:
            case EVariableType_1.EVariableType.SAMPLER_CUBE:
            case EVariableType_1.EVariableType.SAMPLER_2D:
                this._glslSend.sendNum1(name, data);
                break;
            case EVariableType_1.EVariableType.FLOAT_MAT4_ARRAY:
                this._glslSend.sendMatrix4Array(name, data);
                break;
            default:
                console.log("the type is not find");
                break;
        }
    };
    Program.prototype.sendFloat1 = function (name, data) {
        this._glslSend.sendFloat1(name, data);
    };
    Program.prototype.sendFloat2 = function (name, data) {
        this._glslSend.sendFloat2(name, data);
    };
    Program.prototype.sendFloat3 = function (name, data) {
        this._glslSend.sendFloat3(name, data);
    };
    Program.prototype.sendFloat4 = function (name, data) {
        this._glslSend.sendFloat4(name, data);
    };
    Program.prototype.sendVector2 = function (name, data) {
        this._glslSend.sendVector2(name, data);
    };
    Program.prototype.sendVector3 = function (name, data) {
        this._glslSend.sendVector3(name, data);
    };
    Program.prototype.sendVector4 = function (name, data) {
        this._glslSend.sendVector4(name, data);
    };
    Program.prototype.sendNum1 = function (name, data) {
        this._glslSend.sendNum1(name, data);
    };
    Program.prototype.sendMatrix4 = function (name, data) {
        this._glslSend.sendMatrix4(name, data);
    };
    Program.prototype.sendMatrix4Array = function (name, data) {
        this._glslSend.sendMatrix4Array(name, data);
    };
    Program.prototype.initProgramWithShader = function (shader) {
        var gl = Device_1.Device.getInstance().gl;
        var program = gl.createProgram();
        var vshader = this._loadShader(gl, gl.VERTEX_SHADER, shader.VSource);
        var fshader = this._loadShader(gl, gl.FRAGMENT_SHADER, shader.FSource);
        if (!vshader || !fshader) {
            return;
        }
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);
        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var err = gl.getProgramInfoLog(program);
            console.log("faild to link _program:" + err);
            gl.deleteProgram(program);
            gl.deleteShader(vshader);
            gl.deleteShader(vshader);
            return;
        }
        if (!program)
            console.log("program error");
        this.glProgram = program;
    };
    Program.prototype._loadShader = function (gl, type, value) {
        var shader = gl.createShader(type);
        if (shader == null) {
            console.log("unable to create shader");
            return;
        }
        gl.shaderSource(shader, value);
        gl.compileShader(shader);
        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            var error = gl.getShaderInfoLog(shader);
            console.log("faild to compile shader:" + error);
            gl.deleteShader(shader);
            return;
        }
        return shader;
    };
    Program.prototype._getGl = function () {
        return Device_1.Device.getInstance().gl;
    };
    return Program;
}());
exports.Program = Program;
//# sourceMappingURL=Program.js.map