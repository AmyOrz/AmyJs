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
        beforeEach(function () {
            gl.getAttribLocation.returns(pos);
        })
        it("method getAttribLocation should called once",function () {
            var pos1 = program.getAttribLocation(pos);

            expect(gl.getAttribLocation).toCalledOnce();
            expect(pos1).toEqual(pos);
        });
        it("if cached,retuen cache data",function () {
            var pos1 = program.getAttribLocation(pos);
            var pos2 = program.getAttribLocation(pos);

            expect(pos1).toEqual(pos2);
        })
    });

    describe("test method getUniformLocation", function () {
        var uniform = "u_MvpMatrix";
        beforeEach(function () {
            gl.getUniformLocation.returns(uniform)  ;
        });

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
        var pos = 10;
        beforeEach(function () {
            gl.UNSIGNED_SHORT = "UNSIGNED_SHORT";
            gl.getUniformLocation.returns(pos);

        });

        it("sendFloat1",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.FLOAT_1,0.5);
            expect(gl.uniform1f).toCalledWith(pos,0.5);
        })
        it("sendFloat2",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.FLOAT_2,[0.5,0.7]);
            expect(gl.uniform2f).toCalledWith(pos,0.5,0.7);
        })
        it("sendFloat3",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.FLOAT_3,[0.1,1,0.5]);

            expect(gl.uniform3f).toCalledWith(pos,0.1,1,0.5);
        })
        it("sendFloat4",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.FLOAT_4,[0.1,0.2,0.5,0.7]);
            expect(gl.uniform4f).toCalledWith(pos,0.1,0.2,0.5,0.7);
        })

        it("sendVector2",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.VECTOR_2,{x:3.0,y:25});
            expect(gl.uniform2f).toCalledWith(pos,3.0,25);
        })

        it("sendVector3",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.VECTOR_3,{x:3.0,y:25,z:11});
            expect(gl.uniform3f).toCalledWith(pos,3.0,25,11);
        })
        it("sendVector4",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.VECTOR_4,{x:3.0,y:25,z:11,w:12});
            expect(gl.uniform4f).toCalledWith(pos,3.0,25,11,12);
        })

        it("send float_mat4 ",function () {
            var mat = new amy.Matrix4();
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.FLOAT_MAT4,mat);

            expect(gl.uniformMatrix4fv).toCalledWith(pos,false,mat.elements);
        })

        it("send num1",function () {
            program.sendUniformData("u_MvpMatrix",amy.EVariableType.NUMBER_1,12);
            expect(gl.uniform1i).toCalledWith(pos,12);
        })
    })
});