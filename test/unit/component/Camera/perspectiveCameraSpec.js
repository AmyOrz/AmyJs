describe("perspective camera Operation",function () {
    var projCamera,sandbox;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        projCamera = amy.PerspectiveCamera.create();
        projCamera.near = 1;
        projCamera.far = 100;
        projCamera.fovy = 45;
        projCamera.aspect = 1;

    });
    afterEach(function () {
        sandbox.restore();
    });
    it("near far fovy aspect attribute should have value",function () {
        expect(projCamera.near).toEqual(1);
        expect(projCamera.far).toEqual(100);
        expect(projCamera.fovy).toEqual(45);
        expect(projCamera.aspect).toEqual(1);
    });

    it("pMatrix have should execute perspective method",function () {
        var pMatrix = projCamera.pMatrix;
        sandbox.stub(pMatrix,"perspective");

        projCamera.init();

        expect(pMatrix.perspective).toCalledWith(45,1,1,100);
    })
});
