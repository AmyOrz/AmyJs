"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebglState_1 = require("../state/WebglState");
var Renderer = (function () {
    function Renderer() {
        this._wegbglState = WebglState_1.WebglState.create();
    }
    Object.defineProperty(Renderer.prototype, "webglState", {
        get: function () {
            return this._wegbglState;
        },
        set: function (webglState) {
            this._wegbglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Renderer.prototype.setClearColor = function (r, g, b, a) {
        this._wegbglState.setClearColor(r, g, b, a);
    };
    return Renderer;
}());
exports.Renderer = Renderer;
//# sourceMappingURL=Renderer.js.map