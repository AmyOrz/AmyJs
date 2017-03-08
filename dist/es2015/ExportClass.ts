import { InnerClass } from "./InnerClass";
import { fromArray } from "wonder-frp/dist/es2015/global/Operator";
export class ExportClass {
    public method(callback: (num: number) => void) {
        var result = 0;

        fromArray([1, 2])
            .subscribe((num: number) => {
                result += num;
            }, null, () => {
                callback(new InnerClass().method() + result);
            });
    }
}
