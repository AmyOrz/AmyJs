describe("color Operator", function () {
    var sandbox = null;
    var color;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();

    });

    it("rgba(255,0,0,0)",function () {
        color = amy.Color.create("rgba(255,0,0,0)");
        expect(color.r).toEqual(1);
        expect(color.g).toEqual(0);
        expect(color.b).toEqual(0);
        expect(color.a).toEqual(0);
    })

    it("rgb(0,255,0)",function () {
        color = amy.Color.create("rgb(0,255,0)");
        expect(color.r).toEqual(0);
        expect(color.g).toEqual(1);
        expect(color.b).toEqual(0);
        expect(color.a).toEqual(1);
    })

    it("rgba(0.3,0.4,0.1,0.6)",function () {
        color = amy.Color.create("rgba(0.3,0.4,0.1,0.6)");
        expect(color.r).toEqual(0.3);
        expect(color.g).toEqual(0.4);
        expect(color.b).toEqual(0.1);
        expect(color.a).toEqual(0.6);
    })

    it("#ffffff",function () {
        color = amy.Color.create("#ffffff");
        expect(color.r).toEqual(1);
        expect(color.g).toEqual(1);
        expect(color.b).toEqual(1);
        expect(color.a).toEqual(1);
    })
});
