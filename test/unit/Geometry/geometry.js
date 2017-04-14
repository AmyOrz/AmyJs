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
            geometry = new amy.Geometry();

        });
    });
});
