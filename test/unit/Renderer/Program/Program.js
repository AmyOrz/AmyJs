describe("Program", function () {
    var sandbox = null;
    var program = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        program = amy.Program.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test use",function () {
        it("method use,the gl->program = Program.glProgram",function () {
            program.use();
            expect(program.glProgram).not.toBeNull()
        });
    });

    describe("test method getAttribLocation", function () {
        it("method getAttribLocation should open the buffer start 0",function () {
            var pos0 = program.getAttribLocation("a_Position");
            var pos1 = program.getAttribLocation("a_Color");

            expect(0).toEqual(pos0);
            expect(1).toEqual(pos1);
        });
    });
    describe("test attribute send to GPU ", function () {
        beforeEach(function () {
            var buffer = amy.ArrayBuffer.create([1,2,3],3);
            program.sendAttributeBuffer("a_Position",buffer);


            var colorBuffer = amy.ArrayBuffer.create([23,2,3],3);
            program.sendAttributeBuffer("a_Color",colorBuffer);
        });

        it("method sendAttributeBuffer should get the attribute send to glslDataSend",function () {
            expect(2).toEqual(program._glslSend._toSendBufferArr.length);
        });

        it("method sendAllBufferData should send all attribute+buffer to GPU ",function () {
            program.sendAllBufferData();

        })
    });
});