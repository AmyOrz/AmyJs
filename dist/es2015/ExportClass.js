import { fromArray } from "wonder-frp/dist/es2015/global/Operator";
var ExportClass = (function () {
    function ExportClass() {
    }
    ExportClass.prototype.method = function (callback) {
        var result = 0;
        fromArray([3, 4])
            .subscribe(function (num) {
            result += num;
        }, null, function () {
            callback(result);
        });
    };
    return ExportClass;
}());
export { ExportClass };
//# sourceMappingURL=ExportClass.js.map