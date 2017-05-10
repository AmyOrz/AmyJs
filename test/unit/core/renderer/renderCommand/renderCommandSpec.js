describe("renderCommandSpec operation",function(){
    var sandbox,gl,device,pos = 100;
    var renderCmd,geometry,material;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;
        sandbox.stub(gl,"getUniformLocation").returns(pos);

        renderCmd = amy.RenderCommand.create();
        geometry = amy.TriangleGeometry.create();
        material = amy.BasicMaterial.create();
        geometry.material = material;

        geometry.init();
        renderCmd.material = geometry.material;
        renderCmd.buffers = geometry.bufferContainer;
        renderCmd.mMatrix = new amy.Matrix4();
        renderCmd.vMatrix = new amy.Matrix4();
        renderCmd.pMatrix = new amy.Matrix4();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("draw方法判断是否存在elementBuffer，存在则调用drawElements，否则则调用drawArrays", function () {
        renderCmd.draw();
        expect(gl.drawElements).toCalledWith(gl.TRIANGLES,3,gl.UNSIGNED_BYTE,0);
    })
});