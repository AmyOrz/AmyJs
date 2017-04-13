describe("Program", function () {
    var sandbox,program,gl,device;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        device = amy.Device.getInstance();
        sandbox.stub(device,"gl",testTool.buildFakeGl(sandbox));

        gl = device.gl;
        program = new amy.Program();
    });

    afterEach(function () {
        sandbox.restore();
    });

    describe("test use",function () {
        it("method use,the gl->program = Program.glProgram",function () {
            program.use();

            expect(gl.useProgram).toCalledOnce();
        });
    });
    describe("test method getAttribLocation", function () {
        var pos = 1;
        it("method getAttribLocation should called once",function () {
            var pos1 = program.getAttribLocation(pos);

            expect(gl.getAttribLocation).toCalledOnce();
        });
        it("if cached,retuen cache data",function () {
            var pos1 = program.getAttribLocation(pos);
            var pos2 = program.getAttribLocation(pos);

            expect(pos1).toEqual(pos2);
        })
    });

    describe("test method getUniformLocation", function () {
        var uniform = "u_MvpMatrix";

        it("method getUniformLocation should called once",function () {
            var mvpmatrix = program.getUniformLocation(uniform);

            expect(gl.getUniformLocation).toCalledOnce();
        });
        it("if cached,retuen cache data",function () {
            var mvpmatrix1 = program.getUniformLocation(uniform);
            var mvpmatrix2 = program.getUniformLocation(uniform);

            expect(mvpmatrix1).toEqual(mvpmatrix2);
        })
    });
    describe("sendUniformData",function () {
        var pos = 1000;
        beforeEach(function () {
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getUniformLocation.returns(pos);
        });

        it("",function () {

        })
    })
});