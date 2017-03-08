"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExportClass_1 = require("./ExportClass");
var Test = (function () {
    function Test() {
        this.ex = new ExportClass_1.ExportClass();
    }
    Test.prototype.Method = function () {
        this.ex.method(function (num) { return console.log("fck " + num + 11); });
    };
    return Test;
}());
exports.Test = Test;
var a = new Test();
a.Method();
//# sourceMappingURL=Test.js.map