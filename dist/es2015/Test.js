import { ExportClass } from "./ExportClass";
var Test = (function () {
    function Test() {
        this.ex = new ExportClass();
    }
    Test.prototype.Method = function () {
        this.ex.method(function (num) { return console.log("fck " + num + 11); });
    };
    return Test;
}());
export { Test };
var a = new Test();
a.Method();
//# sourceMappingURL=Test.js.map