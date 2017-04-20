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
        it("method init should add two child",function () {
            var geometryData = new amy.GeometryData();
            bufferContainer.geometryData = geometryData;

            sandbox.stub(bufferContainer,"getChild");

            bufferContainer.init();

            expect(bufferContainer.getChild).toCalledTwice();
        });
        it("_getChildByType should addChild by type",function () {
            var geometryData = new amy.GeometryData();
            bufferContainer.geometryData = geometryData;

            sandbox.stub(bufferContainer,"getChild");

            bufferContainer.init();

            expect(bufferContainer.getChild.callCount).toEqual(2);
            expect(bufferContainer.getChild.getCall(0)).toCalledWith(amy.EBufferDataType.VERTICE);
            expect(bufferContainer.getChild.getCall(1)).toCalledWith(amy.EBufferDataType.COLOR);
        })
    });
});
