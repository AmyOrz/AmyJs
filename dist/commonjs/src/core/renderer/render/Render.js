"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebglState_1 = require("../state/WebglState");
var Render = (function () {
    function Render() {
        this._wegbglState = WebglState_1.WebglState.create();
    }
    Object.defineProperty(Render.prototype, "webglState", {
        get: function () {
            return this._wegbglState;
        },
        set: function (webglState) {
            this._wegbglState = webglState;
        },
        enumerable: true,
        configurable: true
    });
    Render.prototype.setClearColor = function (r, g, b, a) {
        this._wegbglState.setClearColor(r, g, b, a);
    };
    return Render;
}());
exports.Render = Render;
//# sourceMappingURL=Render.js.map