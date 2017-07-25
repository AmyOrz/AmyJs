"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = (function () {
    function Entity() {
        this.uid = Entity._count;
        Entity._count++;
    }
    return Entity;
}());
Entity._count = 1;
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map