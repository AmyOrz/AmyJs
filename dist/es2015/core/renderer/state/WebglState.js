import { Device } from "../../device/Device";
var WebglState = (function () {
    function WebglState() {
    }
    WebglState.create = function () {
        var obj = new this();
        return obj;
    };
    WebglState.prototype.setClearColor = function (r, g, b, a) {
        var gl = Device.getInstance().gl;
        gl.clearColor(r, g, b, a);
    };
    WebglState.prototype.init = function () {
        this._depthTest();
        this._clear();
    };
    WebglState.prototype._depthTest = function () {
        var gl = Device.getInstance().gl;
        gl.enable(gl.DEPTH_TEST);
    };
    WebglState.prototype._clear = function () {
        var gl = Device.getInstance().gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    };
    return WebglState;
}());
export { WebglState };
//# sourceMappingURL=WebglState.js.map