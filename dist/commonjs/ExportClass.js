"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InnerClass_1 = require("./InnerClass");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
var ExportClass = (function () {
    function ExportClass() {
    }
    ExportClass.prototype.method = function (callback) {
        var result = 0;
        Operator_1.fromArray([1, 2])
            .subscribe(function (num) {
            result += num;
        }, null, function () {
            callback(new InnerClass_1.InnerClass().method() + result);
        });
    };
    return ExportClass;
}());
exports.ExportClass = ExportClass;
//# sourceMappingURL=ExportClass.js.map