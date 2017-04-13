describe("GLSLDataSender", function () {
    var sandbox,device,gl,sender;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;
        sender = amy.GLSLDataSender.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("senderBuffer", function () {
        var pos,buffer;
        beforeEach(function () {
            pos = 1000;
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getAttribLocation.returns(pos);

            buffer = amy.ArrayBuffer.create([3, 4, 3, 1.2, 0.2, 3.1, 3.3, 10.5, 9.1], 3,amy.EBufferType.UNSIGNED_SHORT);
        });

        it("bind Array buffer",function () {
            sender.sendBuffer(pos,buffer);

            expect(gl.bindBuffer).toCalledWith(gl.ARRAY_BUFFER,buffer.buffer);
        });
        it("gl vertexAttribPointer is called once",function () {
            sender.sendBuffer(pos,buffer);

            expect(gl.vertexAttribPointer).toCalledWith(pos,3,gl.UNSIGNED_SHORT,false,0,0);
        });
        it("gl enableAttribute is called once",function () {
            sender.sendBuffer(pos,buffer);

            expect(gl.enableVertexAttribArray).toCalledWith(pos);
        })
    });
});
