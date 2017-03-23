describe("BufferContains", function () {
    var sandbox = null;
    var bufferContainer = null;


    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        bufferContainer = new amy.BufferContainer();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test method getChild", function () {
        it("method getChildren is get vertice and color,the len is 2",function () {
            var geometryData = new amy.GeometryData();
            bufferContainer.geometryData = geometryData;
            bufferContainer.init();
            var count = 0;
            for(var name in bufferContainer.getChildren()){
                count++;
            }
            expect(2).toEqual(count);
        });
    });
});
