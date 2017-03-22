export declare class Matrix4 {
    elements: any;
    constructor(opt_src?: any);
    setIdentity(): any;
    set(src: any): any;
    concat(other: any): any;
    multiply(other: any): any;
    multiplyVector3(pos: any): any;
    multiplyVector4(pos: any): any;
    transpose(): any;
    setInverseOf(other: any): any;
    invert(): any;
    setOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number): any;
    ortho(left: number, right: number, bottom: number, top: number, near: number, far: number): any;
    setFrustum(left: number, right: number, bottom: number, top: number, near: number, far: number): any;
    frustum(left: number, right: number, bottom: number, top: number, near: number, far: number): any;
    setPerspective(fovy: number, aspect: number, near: number, far: number): any;
    perspective(fovy: number, aspect: number, near: number, far: number): any;
    setScale(x: number, y: number, z: number): any;
    scale(x: number, y: number, z: number): any;
    setTranslate(x: number, y: number, z: number): any;
    translate(x: number, y: number, z: number): any;
    setRotate(angle: number, x: number, y: number, z: number): any;
    rotate(angle: number, x: number, y: number, z: number): any;
    setLookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): any;
    lookAt(eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number): any;
    dropShadow(plane: any, light: any): any;
    dropShadowDirectionally(normX: any, normY: any, normZ: any, planeX: any, planeY: any, planeZ: any, lightX: any, lightY: any, lightZ: any): any;
}
