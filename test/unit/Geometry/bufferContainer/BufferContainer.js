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

            sandbox.stub(bufferContainer,"addChild");

            bufferContainer.init();

            expect(bufferContainer.addChild).toCalledTwice();
        });
        it("_getChildByType should addChild by type",function () {
            var geometryData = new amy.GeometryData();
            bufferContainer.geometryData = geometryData;

            sandbox.stub(bufferContainer,"_getBufferByType");

            bufferContainer.init();

            expect(bufferContainer._getBufferByType.callCount).toEqual(2);
            expect(bufferContainer._getBufferByType.getCall(0)).toCalledWith(amy.EBufferDataType.VERTICE);
            expect(bufferContainer._getBufferByType.getCall(1)).toCalledWith(amy.EBufferDataType.COLOR);
        })
    });
});
