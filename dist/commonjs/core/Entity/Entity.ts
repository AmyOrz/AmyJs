export abstract class Entity {
    private static _count = 1;
    constructor() {
        this.uid = Entity._count;
        Entity._count++;
    }
    public uid: number;

}
