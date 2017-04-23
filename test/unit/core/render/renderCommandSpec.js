describe("renderCommandSpec operation",function(){
    var sandbox,gl,device,pos = 100;
    var renderCmd,shader,buffers,geometry;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(pos);

        renderCmd = amy.RenderCommand.create();
        geometry = amy.TriangleGeometry.create();

        geometry.init();
        renderCmd.shader = geometry.shader;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.mMatrix = new amy.Matrix4();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("draw method should call gl.drawArrays", function () {
        renderCmd.draw();

        expect(gl.drawArrays).toCalledWith(gl.TRIANGLES,0,3);
    })
});