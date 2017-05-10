describe("ElementBuffer", function () {
    var sandbox = null;
    var buffer = null;
    var device = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();

        buffer = null;
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test method create ", function () {
        it("if param data is null,the elementBuffer->data should be null",function () {
            buffer = amy.ElementBuffer.create(null);
            expect(buffer.data).toEqual(null);
        })

        it("if not pass param type,the elementBuffer->type should be UNSIGNED_BYTE",function () {
            buffer = amy.ElementBuffer.create([1,2,3]);
            expect(buffer.type).toEqual(amy.EBufferType.UNSIGNED_BYTE);
        })

        it("if not pass param usage,the elementBUffer->usage should be STATIC_DRAW",function () {
            buffer = amy.ElementBuffer.create([1,2,3]);
            expect(buffer.usage).toEqual(amy.EBufferUseage.STATIC_DRAW);
        })

        it("the elementBuffer->data should be Uint8",function () {
            buffer = amy.ElementBuffer.create([1,2,3]);
            expect(buffer.data).toEqual(new Uint8Array([1,2,3]));
        })
    });
});
