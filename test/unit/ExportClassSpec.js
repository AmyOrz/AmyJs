describe("ExportClass", function () {
    var sandbox = null;
    var _class = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        _class = new wd.ExportClass();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("method", function () {
        it("return 5", function (done) {
            _class.method(function(result){
                expect(result).toEqual(5);

                done();
            });
        });
    });
});
