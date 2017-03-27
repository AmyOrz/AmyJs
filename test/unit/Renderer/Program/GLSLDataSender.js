describe("GLSLDataSender", function () {
    var sandbox = null;
    var program = null;
    var glslSender = null;
    var pos0,buffer0;
    var pos1,buffer1;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        program = amy.Program.create();
        glslSender = amy.GLSLDataSender.create(program);
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test method send", function () {
        beforeEach(function () {
            pos0 = program.getAttribLocation("a_Position");
            pos1 = program.getAttribLocation("a_Color");

            buffer0 = amy.ArrayBuffer.create([1, 2, 3, 1.2, 0.2, 3.1, 3.3, 10.5, 9.1], 3);
            buffer1 = amy.ArrayBuffer.create([3, 4, 3, 1.2, 0.2, 3.1, 3.3, 10.5, 9.1], 3);
        });
        it("method addBufferToList",function () {
            glslSender.addBufferToSendList(pos0,buffer0);
            expect(glslSender._toSendBufferArr[pos0]).toEqual(buffer0);

            glslSender.addBufferToSendList(pos1,buffer1);
            expect(glslSender._toSendBufferArr[pos1]).toEqual(buffer1);
        });
    });
});
