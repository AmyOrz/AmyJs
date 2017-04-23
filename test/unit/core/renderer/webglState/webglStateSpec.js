describe("webglState operation",function(){
    var sandbox,gl,device,webglState;
    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;

        webglState = amy.WebglState.create();
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("setClearColor method should 设置背景颜色", function () {
        webglState.setClearColor(1,0,0,1);

        expect(gl.clearColor).toCalledWith(1,0,0,1);
    });

    it("init method 应该初始化颜色和深度缓冲",function () {
        webglState.init();

        expect(gl.enable).toCalledWith(gl.DEPTH_TEST);
        expect(gl.clear).toCalledWith(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);

    })
});
