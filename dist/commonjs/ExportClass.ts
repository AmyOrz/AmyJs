import { fromArray } from "wonder-frp/dist/commonjs/global/Operator";

export class ExportClass {
    public method(callback: (num: number) => void) {
        var result = 0;

        fromArray([3, 4])
            .subscribe((num: number) => {
                result += num;
            }, null, () => {
                callback(result);
            });
    }
}
