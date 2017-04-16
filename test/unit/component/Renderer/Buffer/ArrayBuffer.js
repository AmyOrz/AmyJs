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
        it("if param data is null,the bufferContainer->data should be Float32Array([])",function () {
            buffer = amy.ArrayBuffer.create(null,2);
            expect(buffer.data).toEqual(null);
        })
        it("if not pass param type,the bufferContainer->type should be FLOAT",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
           expect(buffer.type).toEqual(amy.EBufferType.FLOAT);
        })
        it("if not pass param usage,the bufferContainer->usage should be STATIC_DRAW",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
            expect(buffer.usage).toEqual(amy.EBufferUseage.STATIC_DRAW);
        })
        it("the bufferContainer->data should be Float32",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
            expect(buffer.data).toEqual(new Float32Array([1,2,3]));
        })
        it("the bufferContainer->size should be 2",function () {
            buffer = amy.ArrayBuffer.create([1,2,3],2);
            expect(buffer.size).toEqual(2);
        })
    });
});
