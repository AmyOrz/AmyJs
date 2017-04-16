describe("render operation",function(){
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

    it("", function () {

    })
});