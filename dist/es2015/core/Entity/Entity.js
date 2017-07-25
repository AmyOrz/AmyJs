var Entity = (function () {
    function Entity() {
        this.uid = Entity._count;
        Entity._count++;
    }
    return Entity;
}());
export { Entity };
Entity._count = 1;
//# sourceMappingURL=Entity.js.map