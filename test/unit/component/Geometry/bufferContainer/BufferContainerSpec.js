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
        it("getChild should addChild by type",function () {
            var geometryData = new amy.GeometryData();
            bufferContainer.geometryData = geometryData;

            sandbox.stub(bufferContainer,"getChild");

            bufferContainer.init();

            expect(bufferContainer.getChild.callCount).toEqual(5);
            expect(bufferContainer.getChild.getCall(0)).toCalledWith(amy.EBufferDataType.VERTICE);
            expect(bufferContainer.getChild.getCall(1)).toCalledWith(amy.EBufferDataType.COLOR);
            expect(bufferContainer.getChild.getCall(2)).toCalledWith(amy.EBufferDataType.INDICE);
            expect(bufferContainer.getChild.getCall(3)).toCalledWith(amy.EBufferDataType.NORMAL);
            expect(bufferContainer.getChild.getCall(4)).toCalledWith(amy.EBufferDataType.TEXCOORD);
        })
    });
});
