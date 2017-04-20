describe("renderCommandSpec operation",function(){
    var sandbox,gl,device;
    var renderCmd,shader,buffers,geometry;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;

        renderCmd = amy.RenderCommand.create();
        geometry = amy.TriangleGeometry.create();

        renderCmd.shader = geometry.shader;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.mMatrix = new amy.Matrix4();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("draw method should call gl.drawArrays", function () {
        sandbox.stub(renderCmd.shader,"initProgram").returns({});

        geometry.init();

        renderCmd.draw();

        expect(gl.drawArrays).toCalledOnce();
    })
});