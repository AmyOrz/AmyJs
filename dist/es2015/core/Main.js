import { Device } from "./device/Device";
var Main = (function () {
    function Main() {
    }
    Main.setCanvas = function (canvasId, parentId) {
        this._parentId = parentId;
        this._canvasId = canvasId;
        this._config = {
            alpha: true,
            depth: true,
            stencil: false,
            antialias: true,
            premultipliedAlpha: true,
            preserveDrawingBuffer: false
        };
        return this;
    };
    Main.init = function () {
        Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
        Device.getInstance().setScreen();
        return this;
    };
    return Main;
}());
export { Main };
Main._parentId = null;
//# sourceMappingURL=Main.js.map