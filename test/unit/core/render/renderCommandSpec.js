describe("renderCommand operation",function(){
    var sandbox,gl,device;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("draw method shoud call", function () {
        var renderCmd = amy.RenderCommand.create();
        renderCmd.draw();

        expect(gl.drawArrays).toCalledOnce();
    })
});