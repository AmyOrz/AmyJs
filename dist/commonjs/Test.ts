import { ExportClass } from "./ExportClass";
export class Test {
    private ex: ExportClass;
    constructor() {
        this.ex = new ExportClass();
    }
    public Method() {
        this.ex.method((num) => console.log("fck "+ num + 11));
    }
}
let a = new Test();
a.Method();

