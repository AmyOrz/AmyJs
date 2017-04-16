describe("component",function () {
   var sandbox;
   var geometry;
   beforeEach(function () {
      sandbox = sinon.sandbox.create();
      geometry = amy.TriangleGeometry.create();
   });

   afterEach(function () {
      sandbox.restore();
   });

   it("should get the component type",function () {

   })
});
