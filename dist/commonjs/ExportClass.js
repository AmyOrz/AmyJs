"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var ExportClass = (function () {
    function ExportClass() {
    }
    ExportClass.prototype.method = function (callback) {
        var result = 0;
        Operator_1.fromArray([3, 4])
            .subscribe(function (num) {
            result += num;
        }, null, function () {
            callback(result);
        });
    };
    return ExportClass;
}());
exports.ExportClass = ExportClass;
//# sourceMappingURL=ExportClass.js.map