export class Shader {
    public static create() {
        var obj = new this();

        return obj;
    }

    public VSource: string =
    "attribute vec4 a_Position;" +
    "attribute vec4 a_Color;" +
    "uniform mat4 u_MvpMatrix;" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_Position = u_MvpMatrix * a_Position;" +
    "   v_Color = a_Color;" +
    "}";
    public FSource: string =
    "#ifdef GL_ES\n" +
    "precision mediump float;\n" +
    "#endif\n" +
    "varying vec4 v_Color;" +
    "void main(){" +
    "   gl_FragColor = v_Color;" +
    "}";

}
