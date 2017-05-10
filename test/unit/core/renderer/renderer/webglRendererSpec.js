describe("webglRenderer operation",function(){
    var sandbox,renderCmd1,renderCmd2;
    var webglRenderer;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        webglRenderer = amy.WebglRenderer.create();

        renderCmd1 = amy.RenderCommand.create();
        renderCmd2 = amy.RenderCommand.create();
        sandbox.stub(renderCmd1,"draw");
        sandbox.stub(renderCmd2,"draw");

        webglRenderer.addCommand(renderCmd1);
        webglRenderer.addCommand(renderCmd2);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it("addCommand method should add to commandQueue", function () {
        expect(webglRenderer.hasCommand()).toBeTruthy();
    });

    it("render should get all renderCmd execute draw",function () {
        webglRenderer.render();

        expect(renderCmd1.draw).toCalled();
        expect(renderCmd2.draw).toCalled();
    })

});