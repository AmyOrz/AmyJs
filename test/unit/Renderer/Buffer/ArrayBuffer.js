describe("ArrayBuffer", function () {
    var sandbox = null;
    var buffer = null;
    var device = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();

        buffer = new amy.ArrayBuffer();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test method create ", function () {
        it("if not pass param type,the buffer->type should be FLOAT",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
           expect(buffer.type).toEqual(amy.EBufferType.FLOAT);
        })
        it("if not pass param usage,the buffer->usage should be STATIC_DRAW",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
            expect(buffer.usage).toEqual(amy.EBufferUseage.STATIC_DRAW);
        })
    });
});
