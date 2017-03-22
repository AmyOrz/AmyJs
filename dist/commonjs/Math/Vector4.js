"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vector4 = (function () {
    function Vector4(opt_src) {
        var v = new Float32Array(4);
        if (opt_src && typeof opt_src === 'object') {
            v[0] = opt_src[0];
            v[1] = opt_src[1];
            v[2] = opt_src[2];
            v[3] = opt_src[3];
        }
        this.elements = v;
    }
    return Vector4;
}());
exports.Vector4 = Vector4;
//# sourceMappingURL=Vector4.js.map