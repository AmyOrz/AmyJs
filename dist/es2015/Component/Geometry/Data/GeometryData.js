var GeometryData = (function () {
    function GeometryData() {
        this.vertice = null;
        this.color = null;
        this.indice = null;
        this.normal = null;
        this.texCoord = null;
    }
    GeometryData.create = function () {
        var obj = new this();
        return obj;
    };
    return GeometryData;
}());
export { GeometryData };
//# sourceMappingURL=GeometryData.js.map