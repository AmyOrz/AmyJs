describe("transform", function () {
    var sandbox = null;
    var transform = null;

    beforeEach(function (){
        sandbox = sinon.sandbox.create();

        transform = amy.Transform.create();
    });
    afterEach(function (){
        sandbox.restore();
    });

    describe("method rotate", function () {
        it("method rotate should change mMatrix",function () {
            transform.rotate(20,0,1,0);

            expect(transform.mMatrix.elements[0]).not.toBeNull();
        })
    });

    describe("method scale", function () {
        it("method scale should change mMatrix",function () {
            transform.scale(2,1,1);
            expect(transform.mMatrix.elements[0]).not.toBeNull();
        })
    });

    describe("method translate", function () {
        it("method translate should change mMatrix",function () {
            transform.translate(20,1,0);
            expect(transform.mMatrix.elements[0]).not.toBeNull();
        })
    });
});