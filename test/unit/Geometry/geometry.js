describe("geometry", function () {
    var sandbox = null;
    var geometry = null;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test class TriangleGeometry", function () {
        it("triangleGeometry create method should have geometryData",function () {
            geometry = amy.TriangleGeometry.create();
            geometry.init();
            for(var data in geometry.geometryData){
                expect(geometry.geometryData[data]).not.toBeNull();
            }
        });
    });
});
