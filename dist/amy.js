(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.amy = {})));
}(this, (function (exports) { 'use strict';

	function __extends(d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __decorate(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}

	var Vector3 = (function () {
	    function Vector3(opt_src) {
	        var v = new Float32Array(3);
	        if (opt_src && typeof opt_src === 'object') {
	            v[0] = opt_src[0];
	            v[1] = opt_src[1];
	            v[2] = opt_src[2];
	        }
	        this.elements = v;
	    }
	    Vector3.prototype.normalize = function () {
	        var v = this.elements;
	        var c = v[0], d = v[1], e = v[2], g = Math.sqrt(c * c + d * d + e * e);
	        if (g) {
	            if (g == 1)
	                return this;
	        }
	        else {
	            v[0] = 0;
	            v[1] = 0;
	            v[2] = 0;
	            return this;
	        }
	        g = 1 / g;
	        v[0] = c * g;
	        v[1] = d * g;
	        v[2] = e * g;
	        return this;
	    };
	    return Vector3;
	}());

	var Vector4 = (function () {
	    function Vector4(opt_src) {
	        var v = new Float32Array(4);
	        if (opt_src && typeof opt_src === 'object') {
	            v[0] = opt_src[0];
	            v[1] = opt_src[1];
	            v[2] = opt_src[2];
	            v[3] = opt_src[3];
	        }
	        this.elements = v;
	    }
	    return Vector4;
	}());

	var Matrix4 = (function () {
	    function Matrix4(opt_src) {
	        var i, s, d;
	        if (opt_src && typeof opt_src === 'object' && opt_src.hasOwnProperty('elements')) {
	            s = opt_src.elements;
	            d = new Float32Array(16);
	            for (i = 0; i < 16; ++i) {
	                d[i] = s[i];
	            }
	            this.elements = d;
	        }
	        else {
	            this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
	        }
	    }
	    
	    Matrix4.prototype.setIdentity = function () {
	        var e = this.elements;
	        e[0] = 1;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = 0;
	        e[1] = 0;
	        e[5] = 1;
	        e[9] = 0;
	        e[13] = 0;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = 1;
	        e[14] = 0;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.set = function (src) {
	        var i, s, d;
	        s = src.elements;
	        d = this.elements;
	        if (s === d) {
	            return;
	        }
	        for (i = 0; i < 16; ++i) {
	            d[i] = s[i];
	        }
	        return this;
	    };
	    Matrix4.prototype.concat = function (other) {
	        var i, e, a, b, ai0, ai1, ai2, ai3;
	        e = this.elements;
	        a = this.elements;
	        b = other.elements;
	        if (e === b) {
	            b = new Float32Array(16);
	            for (i = 0; i < 16; ++i) {
	                b[i] = e[i];
	            }
	        }
	        for (i = 0; i < 4; i++) {
	            ai0 = a[i];
	            ai1 = a[i + 4];
	            ai2 = a[i + 8];
	            ai3 = a[i + 12];
	            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
	            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
	            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
	            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
	        }
	        return this;
	    };
	    Matrix4.prototype.multiply = function (other) {
	        var i, e, a, b, ai0, ai1, ai2, ai3;
	        e = this.elements;
	        a = this.elements;
	        b = other.elements;
	        if (e === b) {
	            b = new Float32Array(16);
	            for (i = 0; i < 16; ++i) {
	                b[i] = e[i];
	            }
	        }
	        for (i = 0; i < 4; i++) {
	            ai0 = a[i];
	            ai1 = a[i + 4];
	            ai2 = a[i + 8];
	            ai3 = a[i + 12];
	            e[i] = ai0 * b[0] + ai1 * b[1] + ai2 * b[2] + ai3 * b[3];
	            e[i + 4] = ai0 * b[4] + ai1 * b[5] + ai2 * b[6] + ai3 * b[7];
	            e[i + 8] = ai0 * b[8] + ai1 * b[9] + ai2 * b[10] + ai3 * b[11];
	            e[i + 12] = ai0 * b[12] + ai1 * b[13] + ai2 * b[14] + ai3 * b[15];
	        }
	        return this;
	    };
	    Matrix4.prototype.multiplyVector3 = function (pos) {
	        var e = this.elements;
	        var p = pos.elements;
	        var v = new Vector3();
	        var result = v.elements;
	        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + e[11];
	        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + e[12];
	        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + e[13];
	        return v;
	    };
	    Matrix4.prototype.multiplyVector4 = function (pos) {
	        var e = this.elements;
	        var p = pos.elements;
	        var v = new Vector4();
	        var result = v.elements;
	        result[0] = p[0] * e[0] + p[1] * e[4] + p[2] * e[8] + p[3] * e[12];
	        result[1] = p[0] * e[1] + p[1] * e[5] + p[2] * e[9] + p[3] * e[13];
	        result[2] = p[0] * e[2] + p[1] * e[6] + p[2] * e[10] + p[3] * e[14];
	        result[3] = p[0] * e[3] + p[1] * e[7] + p[2] * e[11] + p[3] * e[15];
	        return v;
	    };
	    Matrix4.prototype.transpose = function () {
	        var e, t;
	        e = this.elements;
	        t = e[1];
	        e[1] = e[4];
	        e[4] = t;
	        t = e[2];
	        e[2] = e[8];
	        e[8] = t;
	        t = e[3];
	        e[3] = e[12];
	        e[12] = t;
	        t = e[6];
	        e[6] = e[9];
	        e[9] = t;
	        t = e[7];
	        e[7] = e[13];
	        e[13] = t;
	        t = e[11];
	        e[11] = e[14];
	        e[14] = t;
	        return this;
	    };
	    Matrix4.prototype.setInverseOf = function (other) {
	        var i, s, d, inv, det;
	        s = other.elements;
	        d = this.elements;
	        inv = new Float32Array(16);
	        inv[0] = s[5] * s[10] * s[15] - s[5] * s[11] * s[14] - s[9] * s[6] * s[15]
	            + s[9] * s[7] * s[14] + s[13] * s[6] * s[11] - s[13] * s[7] * s[10];
	        inv[4] = -s[4] * s[10] * s[15] + s[4] * s[11] * s[14] + s[8] * s[6] * s[15]
	            - s[8] * s[7] * s[14] - s[12] * s[6] * s[11] + s[12] * s[7] * s[10];
	        inv[8] = s[4] * s[9] * s[15] - s[4] * s[11] * s[13] - s[8] * s[5] * s[15]
	            + s[8] * s[7] * s[13] + s[12] * s[5] * s[11] - s[12] * s[7] * s[9];
	        inv[12] = -s[4] * s[9] * s[14] + s[4] * s[10] * s[13] + s[8] * s[5] * s[14]
	            - s[8] * s[6] * s[13] - s[12] * s[5] * s[10] + s[12] * s[6] * s[9];
	        inv[1] = -s[1] * s[10] * s[15] + s[1] * s[11] * s[14] + s[9] * s[2] * s[15]
	            - s[9] * s[3] * s[14] - s[13] * s[2] * s[11] + s[13] * s[3] * s[10];
	        inv[5] = s[0] * s[10] * s[15] - s[0] * s[11] * s[14] - s[8] * s[2] * s[15]
	            + s[8] * s[3] * s[14] + s[12] * s[2] * s[11] - s[12] * s[3] * s[10];
	        inv[9] = -s[0] * s[9] * s[15] + s[0] * s[11] * s[13] + s[8] * s[1] * s[15]
	            - s[8] * s[3] * s[13] - s[12] * s[1] * s[11] + s[12] * s[3] * s[9];
	        inv[13] = s[0] * s[9] * s[14] - s[0] * s[10] * s[13] - s[8] * s[1] * s[14]
	            + s[8] * s[2] * s[13] + s[12] * s[1] * s[10] - s[12] * s[2] * s[9];
	        inv[2] = s[1] * s[6] * s[15] - s[1] * s[7] * s[14] - s[5] * s[2] * s[15]
	            + s[5] * s[3] * s[14] + s[13] * s[2] * s[7] - s[13] * s[3] * s[6];
	        inv[6] = -s[0] * s[6] * s[15] + s[0] * s[7] * s[14] + s[4] * s[2] * s[15]
	            - s[4] * s[3] * s[14] - s[12] * s[2] * s[7] + s[12] * s[3] * s[6];
	        inv[10] = s[0] * s[5] * s[15] - s[0] * s[7] * s[13] - s[4] * s[1] * s[15]
	            + s[4] * s[3] * s[13] + s[12] * s[1] * s[7] - s[12] * s[3] * s[5];
	        inv[14] = -s[0] * s[5] * s[14] + s[0] * s[6] * s[13] + s[4] * s[1] * s[14]
	            - s[4] * s[2] * s[13] - s[12] * s[1] * s[6] + s[12] * s[2] * s[5];
	        inv[3] = -s[1] * s[6] * s[11] + s[1] * s[7] * s[10] + s[5] * s[2] * s[11]
	            - s[5] * s[3] * s[10] - s[9] * s[2] * s[7] + s[9] * s[3] * s[6];
	        inv[7] = s[0] * s[6] * s[11] - s[0] * s[7] * s[10] - s[4] * s[2] * s[11]
	            + s[4] * s[3] * s[10] + s[8] * s[2] * s[7] - s[8] * s[3] * s[6];
	        inv[11] = -s[0] * s[5] * s[11] + s[0] * s[7] * s[9] + s[4] * s[1] * s[11]
	            - s[4] * s[3] * s[9] - s[8] * s[1] * s[7] + s[8] * s[3] * s[5];
	        inv[15] = s[0] * s[5] * s[10] - s[0] * s[6] * s[9] - s[4] * s[1] * s[10]
	            + s[4] * s[2] * s[9] + s[8] * s[1] * s[6] - s[8] * s[2] * s[5];
	        det = s[0] * inv[0] + s[1] * inv[4] + s[2] * inv[8] + s[3] * inv[12];
	        if (det === 0) {
	            return this;
	        }
	        det = 1 / det;
	        for (i = 0; i < 16; i++) {
	            d[i] = inv[i] * det;
	        }
	        return this;
	    };
	    Matrix4.prototype.invert = function () {
	        return this.setInverseOf(this);
	    };
	    Matrix4.prototype.setOrtho = function (left, right, bottom, top, near, far) {
	        var e, rw, rh, rd;
	        if (left === right || bottom === top || near === far) {
	            throw 'null frustum';
	        }
	        rw = 1 / (right - left);
	        rh = 1 / (top - bottom);
	        rd = 1 / (far - near);
	        e = this.elements;
	        e[0] = 2 * rw;
	        e[1] = 0;
	        e[2] = 0;
	        e[3] = 0;
	        e[4] = 0;
	        e[5] = 2 * rh;
	        e[6] = 0;
	        e[7] = 0;
	        e[8] = 0;
	        e[9] = 0;
	        e[10] = -2 * rd;
	        e[11] = 0;
	        e[12] = -(right + left) * rw;
	        e[13] = -(top + bottom) * rh;
	        e[14] = -(far + near) * rd;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
	        return this.concat(new Matrix4().setOrtho(left, right, bottom, top, near, far));
	    };
	    Matrix4.prototype.setFrustum = function (left, right, bottom, top, near, far) {
	        var e, rw, rh, rd;
	        if (left === right || top === bottom || near === far) {
	            throw 'null frustum';
	        }
	        if (near <= 0) {
	            throw 'near <= 0';
	        }
	        if (far <= 0) {
	            throw 'far <= 0';
	        }
	        rw = 1 / (right - left);
	        rh = 1 / (top - bottom);
	        rd = 1 / (far - near);
	        e = this.elements;
	        e[0] = 2 * near * rw;
	        e[1] = 0;
	        e[2] = 0;
	        e[3] = 0;
	        e[4] = 0;
	        e[5] = 2 * near * rh;
	        e[6] = 0;
	        e[7] = 0;
	        e[8] = (right + left) * rw;
	        e[9] = (top + bottom) * rh;
	        e[10] = -(far + near) * rd;
	        e[11] = -1;
	        e[12] = 0;
	        e[13] = 0;
	        e[14] = -2 * near * far * rd;
	        e[15] = 0;
	        return this;
	    };
	    Matrix4.prototype.frustum = function (left, right, bottom, top, near, far) {
	        return this.concat(new Matrix4().setFrustum(left, right, bottom, top, near, far));
	    };
	    Matrix4.prototype.setPerspective = function (fovy, aspect, near, far) {
	        var e, rd, s, ct;
	        if (near === far || aspect === 0) {
	            throw 'null frustum';
	        }
	        if (near <= 0) {
	            throw 'near <= 0';
	        }
	        if (far <= 0) {
	            throw 'far <= 0';
	        }
	        fovy = Math.PI * fovy / 180 / 2;
	        s = Math.sin(fovy);
	        if (s === 0) {
	            throw 'null frustum';
	        }
	        rd = 1 / (far - near);
	        ct = Math.cos(fovy) / s;
	        e = this.elements;
	        e[0] = ct / aspect;
	        e[1] = 0;
	        e[2] = 0;
	        e[3] = 0;
	        e[4] = 0;
	        e[5] = ct;
	        e[6] = 0;
	        e[7] = 0;
	        e[8] = 0;
	        e[9] = 0;
	        e[10] = -(far + near) * rd;
	        e[11] = -1;
	        e[12] = 0;
	        e[13] = 0;
	        e[14] = -2 * near * far * rd;
	        e[15] = 0;
	        return this;
	    };
	    Matrix4.prototype.perspective = function (fovy, aspect, near, far) {
	        return this.concat(new Matrix4().setPerspective(fovy, aspect, near, far));
	    };
	    Matrix4.prototype.setScale = function (x, y, z) {
	        var e = this.elements;
	        e[0] = x;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = 0;
	        e[1] = 0;
	        e[5] = y;
	        e[9] = 0;
	        e[13] = 0;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = z;
	        e[14] = 0;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.scale = function (x, y, z) {
	        var e = this.elements;
	        e[0] *= x;
	        e[4] *= y;
	        e[8] *= z;
	        e[1] *= x;
	        e[5] *= y;
	        e[9] *= z;
	        e[2] *= x;
	        e[6] *= y;
	        e[10] *= z;
	        e[3] *= x;
	        e[7] *= y;
	        e[11] *= z;
	        return this;
	    };
	    Matrix4.prototype.setTranslate = function (x, y, z) {
	        var e = this.elements;
	        e[0] = 1;
	        e[4] = 0;
	        e[8] = 0;
	        e[12] = x;
	        e[1] = 0;
	        e[5] = 1;
	        e[9] = 0;
	        e[13] = y;
	        e[2] = 0;
	        e[6] = 0;
	        e[10] = 1;
	        e[14] = z;
	        e[3] = 0;
	        e[7] = 0;
	        e[11] = 0;
	        e[15] = 1;
	        return this;
	    };
	    Matrix4.prototype.translate = function (x, y, z) {
	        var e = this.elements;
	        e[12] += e[0] * x + e[4] * y + e[8] * z;
	        e[13] += e[1] * x + e[5] * y + e[9] * z;
	        e[14] += e[2] * x + e[6] * y + e[10] * z;
	        e[15] += e[3] * x + e[7] * y + e[11] * z;
	        return this;
	    };
	    Matrix4.prototype.setRotate = function (angle, x, y, z) {
	        var e, s, c, len, rlen, nc, xy, yz, zx, xs, ys, zs;
	        angle = Math.PI * angle / 180;
	        e = this.elements;
	        s = Math.sin(angle);
	        c = Math.cos(angle);
	        if (0 !== x && 0 === y && 0 === z) {
	            if (x < 0) {
	                s = -s;
	            }
	            e[0] = 1;
	            e[4] = 0;
	            e[8] = 0;
	            e[12] = 0;
	            e[1] = 0;
	            e[5] = c;
	            e[9] = -s;
	            e[13] = 0;
	            e[2] = 0;
	            e[6] = s;
	            e[10] = c;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else if (0 === x && 0 !== y && 0 === z) {
	            if (y < 0) {
	                s = -s;
	            }
	            e[0] = c;
	            e[4] = 0;
	            e[8] = s;
	            e[12] = 0;
	            e[1] = 0;
	            e[5] = 1;
	            e[9] = 0;
	            e[13] = 0;
	            e[2] = -s;
	            e[6] = 0;
	            e[10] = c;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else if (0 === x && 0 === y && 0 !== z) {
	            if (z < 0) {
	                s = -s;
	            }
	            e[0] = c;
	            e[4] = -s;
	            e[8] = 0;
	            e[12] = 0;
	            e[1] = s;
	            e[5] = c;
	            e[9] = 0;
	            e[13] = 0;
	            e[2] = 0;
	            e[6] = 0;
	            e[10] = 1;
	            e[14] = 0;
	            e[3] = 0;
	            e[7] = 0;
	            e[11] = 0;
	            e[15] = 1;
	        }
	        else {
	            len = Math.sqrt(x * x + y * y + z * z);
	            if (len !== 1) {
	                rlen = 1 / len;
	                x *= rlen;
	                y *= rlen;
	                z *= rlen;
	            }
	            nc = 1 - c;
	            xy = x * y;
	            yz = y * z;
	            zx = z * x;
	            xs = x * s;
	            ys = y * s;
	            zs = z * s;
	            e[0] = x * x * nc + c;
	            e[1] = xy * nc + zs;
	            e[2] = zx * nc - ys;
	            e[3] = 0;
	            e[4] = xy * nc - zs;
	            e[5] = y * y * nc + c;
	            e[6] = yz * nc + xs;
	            e[7] = 0;
	            e[8] = zx * nc + ys;
	            e[9] = yz * nc - xs;
	            e[10] = z * z * nc + c;
	            e[11] = 0;
	            e[12] = 0;
	            e[13] = 0;
	            e[14] = 0;
	            e[15] = 1;
	        }
	        return this;
	    };
	    Matrix4.prototype.rotate = function (angle, x, y, z) {
	        return this.concat(new Matrix4().setRotate(angle, x, y, z));
	    };
	    Matrix4.prototype.setLookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
	        var e, fx, fy, fz, rlf, sx, sy, sz, rls, ux, uy, uz;
	        fx = centerX - eyeX;
	        fy = centerY - eyeY;
	        fz = centerZ - eyeZ;
	        rlf = 1 / Math.sqrt(fx * fx + fy * fy + fz * fz);
	        fx *= rlf;
	        fy *= rlf;
	        fz *= rlf;
	        sx = fy * upZ - fz * upY;
	        sy = fz * upX - fx * upZ;
	        sz = fx * upY - fy * upX;
	        rls = 1 / Math.sqrt(sx * sx + sy * sy + sz * sz);
	        sx *= rls;
	        sy *= rls;
	        sz *= rls;
	        ux = sy * fz - sz * fy;
	        uy = sz * fx - sx * fz;
	        uz = sx * fy - sy * fx;
	        e = this.elements;
	        e[0] = sx;
	        e[1] = ux;
	        e[2] = -fx;
	        e[3] = 0;
	        e[4] = sy;
	        e[5] = uy;
	        e[6] = -fy;
	        e[7] = 0;
	        e[8] = sz;
	        e[9] = uz;
	        e[10] = -fz;
	        e[11] = 0;
	        e[12] = 0;
	        e[13] = 0;
	        e[14] = 0;
	        e[15] = 1;
	        return this.translate(-eyeX, -eyeY, -eyeZ);
	    };
	    Matrix4.prototype.lookAt = function (eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ) {
	        return this.concat(new Matrix4().setLookAt(eyeX, eyeY, eyeZ, centerX, centerY, centerZ, upX, upY, upZ));
	    };
	    Matrix4.prototype.dropShadow = function (plane, light) {
	        var mat = new Matrix4();
	        var e = mat.elements;
	        var dot = plane[0] * light[0] + plane[1] * light[1] + plane[2] * light[2] + plane[3] * light[3];
	        e[0] = dot - light[0] * plane[0];
	        e[1] = -light[1] * plane[0];
	        e[2] = -light[2] * plane[0];
	        e[3] = -light[3] * plane[0];
	        e[4] = -light[0] * plane[1];
	        e[5] = dot - light[1] * plane[1];
	        e[6] = -light[2] * plane[1];
	        e[7] = -light[3] * plane[1];
	        e[8] = -light[0] * plane[2];
	        e[9] = -light[1] * plane[2];
	        e[10] = dot - light[2] * plane[2];
	        e[11] = -light[3] * plane[2];
	        e[12] = -light[0] * plane[3];
	        e[13] = -light[1] * plane[3];
	        e[14] = -light[2] * plane[3];
	        e[15] = dot - light[3] * plane[3];
	        return this.concat(mat);
	    };
	    Matrix4.prototype.dropShadowDirectionally = function (normX, normY, normZ, planeX, planeY, planeZ, lightX, lightY, lightZ) {
	        var a = planeX * normX + planeY * normY + planeZ * normZ;
	        return this.dropShadow([normX, normY, normZ, -a], [lightX, lightY, lightZ, 0]);
	    };
	    return Matrix4;
	}());

	var Vector = (function () {
	    function Vector(x, y, z, w) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (z === void 0) { z = 0; }
	        if (w === void 0) { w = 1; }
	        this.x = 0;
	        this.y = 0;
	        this.z = 0;
	        this.w = 0;
	        this.x = x;
	        this.y = y;
	        this.z = z;
	        this.w = w;
	    }
	    return Vector;
	}());

	var Camera = (function () {
	    function Camera() {
	        this._pMatrix = new Matrix4();
	        this._vMatrix = new Matrix4();
	        this.view = new Vector();
	        this.entityObject = null;
	    }
	    Object.defineProperty(Camera.prototype, "near", {
	        get: function () {
	            return this._near;
	        },
	        set: function (near) {
	            this._near = near;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "far", {
	        get: function () {
	            return this._far;
	        },
	        set: function (far) {
	            this._far = far;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "pMatrix", {
	        get: function () {
	            return this._pMatrix;
	        },
	        set: function (pMatrix) {
	            this._pMatrix = pMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Camera.prototype, "vMatrix", {
	        get: function () {
	            return this._vMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Camera.prototype.translate = function (x, y, z) {
	        this.view.x = x;
	        this.view.y = y;
	        this.view.z = z;
	    };
	    Camera.prototype.init = function () {
	        this.updateProjectionMatrix();
	    };
	    return Camera;
	}());

	var Entity = (function () {
	    function Entity() {
	        this.uid = Entity._count;
	        Entity._count++;
	    }
	    return Entity;
	}());
	Entity._count = 1;

	var Component = (function (_super) {
	    __extends(Component, _super);
	    function Component() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.entityObject = null;
	        return _this;
	    }
	    Object.defineProperty(Component.prototype, "transform", {
	        get: function () {
	            if (this.entityObject == void 0)
	                return null;
	            return this.entityObject.transform;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Component.prototype.init = function () {
	    };
	    Component.prototype.addToObject = function (entityObject) {
	        this.entityObject = entityObject;
	        this.addToComponentContainer();
	    };
	    Component.prototype.addToComponentContainer = function () {
	    };
	    return Component;
	}(Entity));

	var CameraController = (function (_super) {
	    __extends(CameraController, _super);
	    function CameraController() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.camera = null;
	        return _this;
	    }
	    CameraController.create = function (camera) {
	        var obj = new this();
	        obj.camera = camera;
	        return obj;
	    };
	    Object.defineProperty(CameraController.prototype, "pMatrix", {
	        get: function () {
	            return this.camera.pMatrix;
	        },
	        set: function (pMatrix) {
	            this.camera.pMatrix = pMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CameraController.prototype, "vMatrix", {
	        get: function () {
	            return this.camera.vMatrix;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CameraController.prototype.init = function () {
	        this.camera.entityObject = this.entityObject;
	        this.camera.init();
	    };
	    return CameraController;
	}(Component));

	var PerspectiveCamera = (function (_super) {
	    __extends(PerspectiveCamera, _super);
	    function PerspectiveCamera() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PerspectiveCamera.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(PerspectiveCamera.prototype, "fovy", {
	        get: function () {
	            return this._fovy;
	        },
	        set: function (fovy) {
	            this._fovy = fovy;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PerspectiveCamera.prototype, "aspect", {
	        get: function () {
	            return this._aspect;
	        },
	        set: function (aspect) {
	            this._aspect = aspect;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PerspectiveCamera.prototype.updateProjectionMatrix = function () {
	        this.pMatrix.perspective(this._fovy, this._aspect, this.near, this.far);
	        this.vMatrix.lookAt(this.view.x, this.view.y, this.view.z, 0, 0, 0, 0, 1, 0);
	    };
	    return PerspectiveCamera;
	}(Camera));

	var GeometryData = (function () {
	    function GeometryData() {
	        this.vertice = null;
	        this.color = null;
	        this.indice = null;
	        this.normal = null;
	        this.texCoord = null;
	    }
	    GeometryData.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    return GeometryData;
	}());

	(function (EBufferDataType) {
	    EBufferDataType[EBufferDataType["VERTICE"] = "VERTICE"] = "VERTICE";
	    EBufferDataType[EBufferDataType["INDICE"] = "INDICE"] = "INDICE";
	    EBufferDataType[EBufferDataType["NORMAL"] = "NORMAL"] = "NORMAL";
	    EBufferDataType[EBufferDataType["TEXCOORD"] = "TEXCOORD"] = "TEXCOORD";
	    EBufferDataType[EBufferDataType["COLOR"] = "COLOR"] = "COLOR";
	})(exports.EBufferDataType || (exports.EBufferDataType = {}));

	var JudgeUtils = (function () {
	    function JudgeUtils() {
	    }
	    JudgeUtils.isArray = function (arr) {
	        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	        var length = arr && arr.length;
	        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	    };
	    JudgeUtils.isArrayExactly = function (arr) {
	        return Object.prototype.toString.call(arr) === "[object Array]";
	    };
	    JudgeUtils.isNumber = function (num) {
	        return typeof num == "number";
	    };
	    JudgeUtils.isNumberExactly = function (num) {
	        return Object.prototype.toString.call(num) === "[object Number]";
	    };
	    JudgeUtils.isString = function (str) {
	        return typeof str == "string";
	    };
	    JudgeUtils.isStringExactly = function (str) {
	        return Object.prototype.toString.call(str) === "[object String]";
	    };
	    JudgeUtils.isBoolean = function (bool) {
	        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
	    };
	    JudgeUtils.isDom = function (obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	    JudgeUtils.isObject = function (obj) {
	        var type = typeof obj;
	        return type === 'function' || type === 'object' && !!obj;
	    };
	    JudgeUtils.isDirectObject = function (obj) {
	        return Object.prototype.toString.call(obj) === "[object Object]";
	    };
	    JudgeUtils.isHostMethod = function (object, property) {
	        var type = typeof object[property];
	        return type === "function" ||
	            (type === "object" && !!object[property]);
	    };
	    JudgeUtils.isNodeJs = function () {
	        return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
	    };
	    JudgeUtils.isFunction = function (func) {
	        return true;
	    };
	    return JudgeUtils;
	}());
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    JudgeUtils.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var $BREAK = {
	    break: true
	};
	var $REMOVE = void 0;

	var List = (function () {
	    function List() {
	        this.children = null;
	    }
	    List.prototype.getCount = function () {
	        return this.children.length;
	    };
	    List.prototype.hasChild = function (child) {
	        var c = null, children = this.children;
	        for (var i = 0, len = children.length; i < len; i++) {
	            c = children[i];
	            if (child.uid && c.uid && child.uid == c.uid) {
	                return true;
	            }
	            else if (child === c) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.hasChildWithFunc = function (func) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (func(this.children[i], i)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.getChildren = function () {
	        return this.children;
	    };
	    List.prototype.getChild = function (index) {
	        return this.children[index];
	    };
	    List.prototype.addChild = function (child) {
	        this.children.push(child);
	        return this;
	    };
	    List.prototype.addChildren = function (arg) {
	        if (JudgeUtils.isArray(arg)) {
	            var children = arg;
	            this.children = this.children.concat(children);
	        }
	        else if (arg instanceof List) {
	            var children = arg;
	            this.children = this.children.concat(children.getChildren());
	        }
	        else {
	            var child = arg;
	            this.addChild(child);
	        }
	        return this;
	    };
	    List.prototype.setChildren = function (children) {
	        this.children = children;
	        return this;
	    };
	    List.prototype.unShiftChild = function (child) {
	        this.children.unshift(child);
	    };
	    List.prototype.removeAllChildren = function () {
	        this.children = [];
	        return this;
	    };
	    List.prototype.forEach = function (func, context) {
	        this._forEach(this.children, func, context);
	        return this;
	    };
	    List.prototype.toArray = function () {
	        return this.children;
	    };
	    List.prototype.copyChildren = function () {
	        return this.children.slice(0);
	    };
	    List.prototype.removeChildHelper = function (arg) {
	        var result = null;
	        if (JudgeUtils.isFunction(arg)) {
	            var func = arg;
	            result = this._removeChild(this.children, func);
	        }
	        else if (arg.uid) {
	            result = this._removeChild(this.children, function (e) {
	                if (!e.uid) {
	                    return false;
	                }
	                return e.uid === arg.uid;
	            });
	        }
	        else {
	            result = this._removeChild(this.children, function (e) {
	                return e === arg;
	            });
	        }
	        return result;
	    };
	    List.prototype._forEach = function (arr, func, context) {
	        var scope = context, i = 0, len = arr.length;
	        for (i = 0; i < len; i++) {
	            if (func.call(scope, arr[i], i) === $BREAK) {
	                break;
	            }
	        }
	    };
	    List.prototype._removeChild = function (arr, func) {
	        var self = this, removedElementArr = [], remainElementArr = [];
	        this._forEach(arr, function (e, index) {
	            if (!!func.call(self, e)) {
	                removedElementArr.push(e);
	            }
	            else {
	                remainElementArr.push(e);
	            }
	        });
	        this.children = remainElementArr;
	        return removedElementArr;
	    };
	    return List;
	}());

	var ExtendUtils = (function () {
	    function ExtendUtils() {
	    }
	    ExtendUtils.extendDeep = function (parent, child, filter) {
	        if (filter === void 0) { filter = function (val, i) { return true; }; }
	        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
	        if (toStr.call(parent) === sArr) {
	            _child = child || [];
	            for (i = 0, len = parent.length; i < len; i++) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else if (toStr.call(parent) === sOb) {
	            _child = child || {};
	            for (i in parent) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else {
	            _child = parent;
	        }
	        return _child;
	    };
	    ExtendUtils.extend = function (destination, source) {
	        var property = "";
	        for (property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    };
	    ExtendUtils.copyPublicAttri = function (source) {
	        var property = null, destination = {};
	        this.extendDeep(source, destination, function (item, property) {
	            return property.slice(0, 1) !== "_"
	                && !JudgeUtils.isFunction(item);
	        });
	        return destination;
	    };
	    return ExtendUtils;
	}());

	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Collection.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Collection.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Collection.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Collection.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend([], this.children));
	        }
	        return target;
	    };
	    Collection.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Collection.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK;
	        });
	        return result;
	    };
	    Collection.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Collection.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Collection.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Collection.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Collection.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Collection.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Collection;
	}(List));

	var root;
	if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
	    root = global;
	}
	else if (typeof window != "undefined") {
	    root = window;
	}
	else if (typeof self != "undefined") {
	    root = self;
	}
	else {
	    Log.error("no avaliable root!");
	}

	var Log = (function () {
	    function Log() {
	    }
	    Log.log = function () {
	        var messages = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            messages[_i] = arguments[_i];
	        }
	        if (!this._exec("log", messages)) {
	            root.alert(messages.join(","));
	        }
	        this._exec("trace", messages);
	    };
	    Log.assert = function (cond) {
	        var messages = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            messages[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            if (!this._exec("assert", arguments, 1)) {
	                this.log.apply(this, Array.prototype.slice.call(arguments, 1));
	            }
	        }
	    };
	    Log.error = function (cond) {
	        var message = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            message[_i - 1] = arguments[_i];
	        }
	        if (cond) {
	            throw new Error(Array.prototype.slice.call(arguments, 1).join("\n"));
	        }
	    };
	    Log.warn = function () {
	        var message = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            message[_i] = arguments[_i];
	        }
	        var result = this._exec("warn", arguments);
	        if (!result) {
	            this.log.apply(this, arguments);
	        }
	        else {
	            this._exec("trace", ["warn trace"]);
	        }
	    };
	    Log._exec = function (consoleMethod, args, sliceBegin) {
	        if (sliceBegin === void 0) { sliceBegin = 0; }
	        if (root.console && root.console[consoleMethod]) {
	            root.console[consoleMethod].apply(root.console, Array.prototype.slice.call(args, sliceBegin));
	            return true;
	        }
	        return false;
	    };
	    return Log;
	}());
	Log.info = {
	    INVALID_PARAM: "invalid parameter",
	    helperFunc: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var result = "";
	        args.forEach(function (val) {
	            result += String(val) + " ";
	        });
	        return result.slice(0, -1);
	    },
	    assertion: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 2) {
	            return this.helperFunc(args[0], args[1]);
	        }
	        else if (args.length === 3) {
	            return this.helperFunc(args[1], args[0], args[2]);
	        }
	        else {
	            throw new Error("args.length must <= 3");
	        }
	    },
	    FUNC_INVALID: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("invalid");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_BE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must be");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_NOT_BE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must not be");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SHOULD: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("should");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SHOULD_NOT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("should not");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_SUPPORT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("support");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_NOT_SUPPORT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("not support");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_DEFINE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must define");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_MUST_NOT_DEFINE: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("must not define");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_UNKNOW: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("unknow");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_EXPECT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("expect");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_UNEXPECT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("unexpect");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_EXIST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("exist");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_NOT_EXIST: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("not exist");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_ONLY: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("only");
	        return this.assertion.apply(this, args);
	    },
	    FUNC_CAN_NOT: function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        args.unshift("can't");
	        return this.assertion.apply(this, args);
	    }
	};

	var Hash = (function () {
	    function Hash(children) {
	        if (children === void 0) { children = {}; }
	        this._children = null;
	        this._children = children;
	    }
	    Hash.create = function (children) {
	        if (children === void 0) { children = {}; }
	        var obj = new this(children);
	        return obj;
	    };
	    Hash.prototype.getChildren = function () {
	        return this._children;
	    };
	    Hash.prototype.getCount = function () {
	        var result = 0, children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result++;
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getKeys = function () {
	        var result = Collection.create(), children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result.addChild(key);
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getValues = function () {
	        var result = Collection.create(), children = this._children, key = null;
	        for (key in children) {
	            if (children.hasOwnProperty(key)) {
	                result.addChild(children[key]);
	            }
	        }
	        return result;
	    };
	    Hash.prototype.getChild = function (key) {
	        return this._children[key];
	    };
	    Hash.prototype.setValue = function (key, value) {
	        this._children[key] = value;
	        return this;
	    };
	    Hash.prototype.addChild = function (key, value) {
	        this._children[key] = value;
	        return this;
	    };
	    Hash.prototype.addChildren = function (arg) {
	        var i = null, children = null;
	        if (arg instanceof Hash) {
	            children = arg.getChildren();
	        }
	        else {
	            children = arg;
	        }
	        for (i in children) {
	            if (children.hasOwnProperty(i)) {
	                this.addChild(i, children[i]);
	            }
	        }
	        return this;
	    };
	    Hash.prototype.appendChild = function (key, value) {
	        if (this._children[key] instanceof Collection) {
	            var c = (this._children[key]);
	            c.addChild(value);
	        }
	        else {
	            this._children[key] = (Collection.create().addChild(value));
	        }
	        return this;
	    };
	    Hash.prototype.setChildren = function (children) {
	        this._children = children;
	    };
	    Hash.prototype.removeChild = function (arg) {
	        var result = [];
	        if (JudgeUtils.isString(arg)) {
	            var key = arg;
	            result.push(this._children[key]);
	            this._children[key] = void 0;
	            delete this._children[key];
	        }
	        else if (JudgeUtils.isFunction(arg)) {
	            var func_1 = arg, self_1 = this;
	            this.forEach(function (val, key) {
	                if (func_1(val, key)) {
	                    result.push(self_1._children[key]);
	                    self_1._children[key] = void 0;
	                    delete self_1._children[key];
	                }
	            });
	        }
	        return Collection.create(result);
	    };
	    Hash.prototype.removeAllChildren = function () {
	        this._children = {};
	    };
	    Hash.prototype.hasChild = function (key) {
	        return this._children[key] !== void 0;
	    };
	    Hash.prototype.hasChildWithFunc = function (func) {
	        var result = false;
	        this.forEach(function (val, key) {
	            if (func(val, key)) {
	                result = true;
	                return $BREAK;
	            }
	        });
	        return result;
	    };
	    Hash.prototype.forEach = function (func, context) {
	        var children = this._children;
	        for (var i in children) {
	            if (children.hasOwnProperty(i)) {
	                if (func.call(context, children[i], i) === $BREAK) {
	                    break;
	                }
	            }
	        }
	        return this;
	    };
	    Hash.prototype.filter = function (func) {
	        var result = {}, children = this._children, value = null;
	        for (var key in children) {
	            if (children.hasOwnProperty(key)) {
	                value = children[key];
	                if (func.call(children, value, key)) {
	                    result[key] = value;
	                }
	            }
	        }
	        return Hash.create(result);
	    };
	    Hash.prototype.findOne = function (func) {
	        var result = [], self = this, scope = this._children;
	        this.forEach(function (val, key) {
	            if (!func.call(scope, val, key)) {
	                return;
	            }
	            result = [key, self.getChild(key)];
	            return $BREAK;
	        });
	        return result;
	    };
	    Hash.prototype.map = function (func) {
	        var resultMap = {};
	        this.forEach(function (val, key) {
	            var result = func(val, key);
	            if (result !== $REMOVE) {
	                Log.error(!JudgeUtils.isArray(result) || result.length !== 2, Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
	                resultMap[result[0]] = result[1];
	            }
	        });
	        return Hash.create(resultMap);
	    };
	    Hash.prototype.toCollection = function () {
	        var result = Collection.create();
	        this.forEach(function (val, key) {
	            if (val instanceof Collection) {
	                result.addChildren(val);
	            }
	            else {
	                result.addChild(val);
	            }
	        });
	        return result;
	    };
	    Hash.prototype.toArray = function () {
	        var result = [];
	        this.forEach(function (val, key) {
	            if (val instanceof Collection) {
	                result = result.concat(val.getChildren());
	            }
	            else {
	                result.push(val);
	            }
	        });
	        return result;
	    };
	    Hash.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Hash.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils.isBoolean(args[0])) {
	                target = Hash.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils.extendDeep(this._children));
	        }
	        else {
	            target.setChildren(ExtendUtils.extend({}, this._children));
	        }
	        return target;
	    };
	    return Hash;
	}());

	function singleton(isInitWhenCreate) {
	    if (isInitWhenCreate === void 0) { isInitWhenCreate = false; }
	    return function (target) {
	        target._instance = null;
	        if (isInitWhenCreate) {
	            target.getInstance = function () {
	                if (target._instance == null) {
	                    var instance = new target();
	                    target._instance = instance;
	                    instance.initWhenCreate();
	                }
	                return target._instance;
	            };
	        }
	        else {
	            target.getInstance = function () {
	                if (target._instance == null) {
	                    target._instance = new target();
	                }
	                return target._instance;
	            };
	        }
	    };
	}

	var View = (function () {
	    function View(_dom) {
	        this._dom = _dom;
	    }
	    View.create = function (view) {
	        var obj = new this(view);
	        return obj;
	    };
	    Object.defineProperty(View.prototype, "offset", {
	        get: function () {
	            var view = this._dom, offset = { x: view.offsetLeft, y: view.offsetTop };
	            while (view = view.offsetParent) {
	                offset.x += view.offsetLeft;
	                offset.y += view.offsetTop;
	            }
	            return offset;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "dom", {
	        get: function () {
	            return this._dom;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "x", {
	        get: function () {
	            return this._dom.style.x;
	        },
	        set: function (val) {
	            this._dom.style.x = val + "px";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "y", {
	        get: function () {
	            return this.dom.style.y;
	        },
	        set: function (val) {
	            this._dom.style.y = val + "px";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "width", {
	        get: function () {
	            return this.dom.clientWidth;
	        },
	        set: function (width) {
	            this._dom.width = width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "height", {
	        get: function () {
	            return this.dom.clientHeight;
	        },
	        set: function (height) {
	            this._dom.height = height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "styleWidth", {
	        get: function () {
	            return this._dom.style.width;
	        },
	        set: function (width) {
	            this._dom.style.width = width;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(View.prototype, "styleHeight", {
	        get: function () {
	            return this._dom.style.height;
	        },
	        set: function (height) {
	            this._dom.style.height = height;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    View.prototype.getContext = function (contextConfig) {
	        var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
	        var gl;
	        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
	            var item = names_1[_i];
	            try {
	                gl = this._dom.getContext(item, contextConfig);
	            }
	            catch (e) {
	            }
	            if (gl) {
	                break;
	            }
	        }
	        return gl;
	    };
	    View.prototype.initCanvas = function () {
	        this._dom.style.cssText = "position:absolute;left:0;top:0;";
	    };
	    return View;
	}());

	exports.Device = (function () {
	    function Device() {
	    }
	    Device.getInstance = function () { };
	    Device.prototype.createGL = function (canvasId, contextConfigData, parentId) {
	        var canvas = document.createElement("canvas");
	        if (canvasId) {
	            canvas.setAttribute("id", canvasId);
	        }
	        if (parentId) {
	            this._parentEle = document.querySelector("#" + parentId);
	            if (this._parentEle == void 0)
	                alert("找不到指定parentId的dom节点");
	        }
	        if (this._parentEle)
	            this._parentEle.appendChild(canvas);
	        else {
	            var body = document.createElement("body");
	            body.style.margin = "0";
	            body.appendChild(canvas);
	            document.querySelector("html").appendChild(body);
	        }
	        this.canvas = canvas;
	        this.view = View.create(this.canvas);
	        this.gl = this.view.getContext(contextConfigData);
	        if (!this.gl)
	            alert("你的浏览器不支持webgl");
	    };
	    Device.prototype.setViewport = function (width, height) {
	        this.gl.viewport(0, 0, width, height);
	    };
	    Device.prototype.setScreen = function () {
	        var width = 0, height = 0, x = 0, y = 0, styleWidth = null, styleHeight = null;
	        if (this._parentEle) {
	            x = this._parentEle.offsetLeft;
	            y = this._parentEle.offsetTop;
	            width = this._parentEle.offsetWidth;
	            height = this._parentEle.offsetHeight;
	            styleWidth = width + "px";
	            styleHeight = height + "px";
	        }
	        else {
	            width = window.innerWidth;
	            height = window.innerHeight;
	            styleWidth = "100%";
	            styleHeight = "100%";
	        }
	        this.view.initCanvas();
	        this.view.x = x;
	        this.view.y = y;
	        this.view.width = width;
	        this.view.height = height;
	        this.view.styleWidth = styleWidth;
	        this.view.styleHeight = styleHeight;
	        console.log(width, height);
	        this.gl.viewport(0, 0, width, height);
	        this._parentEle = null;
	    };
	    return Device;
	}());
	exports.Device = __decorate([
	    singleton()
	], exports.Device);

	var Buffer = (function () {
	    function Buffer() {
	        this.buffer = null;
	    }
	    Buffer.prototype.dispose = function () {
	        exports.Device.getInstance().gl.deleteBuffer(this.buffer);
	        delete this.buffer;
	    };
	    return Buffer;
	}());

	(function (EBufferType) {
	    EBufferType[EBufferType["BYTE"] = "BYTE"] = "BYTE";
	    EBufferType[EBufferType["UNSIGNED_BYTE"] = "UNSIGNED_BYTE"] = "UNSIGNED_BYTE";
	    EBufferType[EBufferType["SHORT"] = "SHORT"] = "SHORT";
	    EBufferType[EBufferType["UNSIGNED_SHORT"] = "UNSIGNED_SHORT"] = "UNSIGNED_SHORT";
	    EBufferType[EBufferType["INT"] = "INT"] = "INT";
	    EBufferType[EBufferType["UNSIGNED_INT"] = "UNSIGNED_INT"] = "UNSIGNED_INT";
	    EBufferType[EBufferType["FLOAT"] = "FLOAT"] = "FLOAT";
	})(exports.EBufferType || (exports.EBufferType = {}));

	(function (EBufferUseage) {
	    EBufferUseage[EBufferUseage["STREAM_DRAW"] = "STREAM_DRAW"] = "STREAM_DRAW";
	    EBufferUseage[EBufferUseage["STATIC_DRAW"] = "STATIC_DRAW"] = "STATIC_DRAW";
	    EBufferUseage[EBufferUseage["DYNAMIC_DRAW"] = "DYNAMIC_DRAW"] = "DYNAMIC_DRAW";
	})(exports.EBufferUseage || (exports.EBufferUseage = {}));

	var ArrayBuffer = (function (_super) {
	    __extends(ArrayBuffer, _super);
	    function ArrayBuffer() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.size = null;
	        _this.data = null;
	        _this.type = null;
	        _this.usage = null;
	        _this.count = null;
	        return _this;
	    }
	    ArrayBuffer.create = function (data, size, type, usage) {
	        if (type === void 0) { type = exports.EBufferType.FLOAT; }
	        if (usage === void 0) { usage = exports.EBufferUseage.STATIC_DRAW; }
	        var obj = new this();
	        obj.initWhenCreate(data, size, type, usage);
	        return obj;
	    };
	    ArrayBuffer.prototype.initWhenCreate = function (data, size, type, usage) {
	        if (type === void 0) { type = exports.EBufferType.FLOAT; }
	        if (usage === void 0) { usage = exports.EBufferUseage.STATIC_DRAW; }
	        if (data == void 0)
	            return null;
	        var gl = exports.Device.getInstance().gl;
	        var typeData = new Float32Array(data);
	        this.buffer = gl.createBuffer();
	        if (!this.buffer) {
	            console.log("the bufferContainer create error");
	            return null;
	        }
	        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
	        gl.bufferData(gl.ARRAY_BUFFER, typeData, gl[usage]);
	        this._saveData(typeData, size, type, usage);
	        return this.buffer;
	    };
	    ArrayBuffer.prototype._saveData = function (data, size, type, usage) {
	        this.data = data;
	        this.size = size;
	        this.count = data.length / size;
	        this.type = type;
	        this.usage = usage;
	    };
	    return ArrayBuffer;
	}(Buffer));

	var ElementBuffer = (function (_super) {
	    __extends(ElementBuffer, _super);
	    function ElementBuffer() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.type = null;
	        _this.count = null;
	        _this.usage = null;
	        _this.data = null;
	        return _this;
	    }
	    ElementBuffer.create = function (data, type, useage) {
	        if (type === void 0) { type = exports.EBufferType.UNSIGNED_BYTE; }
	        if (useage === void 0) { useage = exports.EBufferUseage.STATIC_DRAW; }
	        var obj = new this();
	        var result = obj.initWhenCreate(data, type, useage);
	        if (result == void 0)
	            return null;
	        return obj;
	    };
	    ElementBuffer.prototype.initWhenCreate = function (data, type, useage) {
	        if (data == void 0)
	            return null;
	        var gl = exports.Device.getInstance().gl;
	        var typeData = new Uint8Array(data);
	        var buffer = gl.createBuffer();
	        if (!buffer)
	            console.log("element Buffer create buffer error");
	        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
	        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, typeData, gl[useage]);
	        this._saveData(typeData, type, useage);
	        this.buffer = buffer;
	    };
	    ElementBuffer.prototype._saveData = function (data, type, useage) {
	        this.data = data;
	        this.type = type;
	        this.usage = useage;
	        this.count = data.length;
	    };
	    return ElementBuffer;
	}(Buffer));

	var BufferContainer = (function () {
	    function BufferContainer() {
	        this.geometryData = null;
	        this._bufferList = new Hash();
	    }
	    BufferContainer.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    BufferContainer.prototype.init = function () {
	        this.getChild(exports.EBufferDataType.VERTICE);
	        this.getChild(exports.EBufferDataType.COLOR);
	        this.getChild(exports.EBufferDataType.INDICE);
	        this.getChild(exports.EBufferDataType.NORMAL);
	        this.getChild(exports.EBufferDataType.TEXCOORD);
	    };
	    BufferContainer.prototype.addChild = function (bufferName, buffer) {
	        this._bufferList.addChild(bufferName, buffer);
	    };
	    BufferContainer.prototype.hasChild = function (bufferName) {
	        return this._bufferList.hasChild(bufferName);
	    };
	    BufferContainer.prototype.getChildren = function () {
	        return this._bufferList.getChildren();
	    };
	    BufferContainer.prototype.getChild = function (type) {
	        var buffer = null;
	        switch (type) {
	            case exports.EBufferDataType.VERTICE:
	                buffer = this._getVerticeBuffer(type);
	                break;
	            case exports.EBufferDataType.COLOR:
	                buffer = this._getColorBuffer(type);
	                break;
	            case exports.EBufferDataType.INDICE:
	                buffer = this._getIndiceBuffer(type);
	                break;
	            case exports.EBufferDataType.NORMAL:
	                buffer = this._getNormalBuffer(type);
	                break;
	            case exports.EBufferDataType.TEXCOORD:
	                buffer = this._getTexCoordBuffer(type);
	                break;
	        }
	        return buffer;
	    };
	    BufferContainer.prototype._getVerticeBuffer = function (type) {
	        var buffer = ArrayBuffer.create(this.geometryData.vertice, 3);
	        return this._bufferCache(type, buffer);
	    };
	    BufferContainer.prototype._getColorBuffer = function (type) {
	        var buffer = ArrayBuffer.create(this.geometryData.color, 3);
	        return this._bufferCache(type, buffer);
	    };
	    BufferContainer.prototype._getNormalBuffer = function (type) {
	        var buffer = ArrayBuffer.create(this.geometryData.normal, 3);
	        return this._bufferCache(type, buffer);
	    };
	    BufferContainer.prototype._getIndiceBuffer = function (type) {
	        var buffer = ElementBuffer.create(this.geometryData.indice);
	        return this._bufferCache(type, buffer);
	    };
	    BufferContainer.prototype._getTexCoordBuffer = function (type) {
	        var buffer = ArrayBuffer.create(this.geometryData.texCoord, 3);
	        return this._bufferCache(type, buffer);
	    };
	    BufferContainer.prototype._bufferCache = function (type, buffer) {
	        if (this._bufferList.hasChild(type)) {
	            return this._bufferList.getChild(type);
	        }
	        else {
	            this.addChild(type, buffer);
	            return buffer;
	        }
	    };
	    return BufferContainer;
	}());

	var Geometry = (function (_super) {
	    __extends(Geometry, _super);
	    function Geometry() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.bufferContainer = null;
	        _this.material = null;
	        return _this;
	    }
	    Object.defineProperty(Geometry.prototype, "geometryData", {
	        get: function () {
	            return this.bufferContainer.geometryData;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Geometry.prototype.init = function () {
	        var computeData = this.computeData();
	        this.bufferContainer = BufferContainer.create();
	        this.bufferContainer.geometryData = this.createGeometryData(computeData);
	        this.bufferContainer.init();
	        this.material.init();
	    };
	    Geometry.prototype.createGeometryData = function (computeData) {
	        var vertice = computeData.vertice, color = computeData.color, texCoord = computeData.texCoord, normal = computeData.normal, indice = computeData.indice;
	        var geometryData = GeometryData.create();
	        geometryData.vertice = vertice;
	        geometryData.color = color;
	        geometryData.texCoord = texCoord;
	        geometryData.normal = normal;
	        geometryData.indice = indice;
	        return geometryData;
	    };
	    return Geometry;
	}(Component));

	var BoxGeometry = (function (_super) {
	    __extends(BoxGeometry, _super);
	    function BoxGeometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BoxGeometry.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    BoxGeometry.prototype.computeData = function () {
	        var vertices = [], texCoords = [], normals = [], indices = [];
	        normals = [
	            0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
	            1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	            -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
	            0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
	            0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
	        ];
	        indices = [
	            0, 1, 2, 0, 2, 3,
	            4, 5, 6, 4, 6, 7,
	            8, 9, 10, 8, 10, 11,
	            12, 13, 14, 12, 14, 15,
	            16, 17, 18, 16, 18, 19,
	            20, 21, 22, 20, 22, 23
	        ];
	        texCoords = [
	            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	            0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
	            1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	            1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	            0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	        ];
	        vertices = [
	            1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
	            1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
	            1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
	            -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
	            -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
	            1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0
	        ];
	        return {
	            vertice: vertices,
	            texCoord: texCoords,
	            indice: indices,
	            normal: normals
	        };
	    };
	    return BoxGeometry;
	}(Geometry));

	var ModelGeometry = (function (_super) {
	    __extends(ModelGeometry, _super);
	    function ModelGeometry() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.indices = null;
	        _this.vertices = null;
	        _this.normals = null;
	        _this.texCoords = null;
	        _this.colors = null;
	        return _this;
	    }
	    ModelGeometry.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    ModelGeometry.prototype.computeData = function () {
	        return {
	            vertice: this.vertices,
	            normal: this.normals,
	            texCoord: this.texCoords,
	            indice: this.indices,
	            color: this.colors,
	        };
	    };
	    return ModelGeometry;
	}(Geometry));

	var PlaneGeometry = (function (_super) {
	    __extends(PlaneGeometry, _super);
	    function PlaneGeometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PlaneGeometry.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    PlaneGeometry.prototype.computeData = function () {
	        var vertices = [], texCoords = [], normals = [], color = [], indices = [];
	        indices = [0, 1, 2, 0, 2, 3];
	        texCoords = [1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0];
	        vertices = [
	            1.0, 1.0, 0.0,
	            -1.0, 1.0, 0.0,
	            -1.0, -1.0, 0.0,
	            1.0, -1.0, 0.0
	        ];
	        return {
	            vertice: vertices,
	            texCoord: texCoords,
	            indice: indices
	        };
	    };
	    return PlaneGeometry;
	}(Geometry));

	var TriangleGeometry = (function (_super) {
	    __extends(TriangleGeometry, _super);
	    function TriangleGeometry() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.width = 1;
	        _this.height = 1;
	        return _this;
	    }
	    TriangleGeometry.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    TriangleGeometry.prototype.computeData = function () {
	        var width = this.width, height = this.height, left = -width / 2, right = width / 2, up = height / 2, down = -height / 2, vertice = null, texCoord = null, indice = null, color = null, normal = null;
	        vertice = [
	            0.0, up, 0,
	            left, down, 0,
	            right, down, 0
	        ];
	        indice = [
	            0, 1, 2
	        ];
	        texCoord = [
	            0.5, 1.0,
	            0.0, 0.0,
	            1.0, 0.0
	        ];
	        normal = [
	            0, 0, 1,
	            0, 0, 1,
	            0, 0, 1
	        ];
	        return {
	            vertice: vertice,
	            texCoord: texCoord,
	            normal: normal,
	            indice: indice
	        };
	    };
	    return TriangleGeometry;
	}(Geometry));

	var Color = (function () {
	    function Color() {
	        this._r = null;
	        this._g = null;
	        this._b = null;
	        this._a = null;
	    }
	    Color.create = function (colorVal) {
	        var obj = new this();
	        obj.initWhenCreate(colorVal);
	        return obj;
	    };
	    Object.defineProperty(Color.prototype, "r", {
	        get: function () {
	            return this._r;
	        },
	        set: function (r) {
	            if (this._r !== r)
	                this._r = r;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "g", {
	        get: function () {
	            return this._g;
	        },
	        set: function (g) {
	            if (this._g !== g)
	                this._g = g;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "b", {
	        get: function () {
	            return this._b;
	        },
	        set: function (b) {
	            if (this._b !== b)
	                this._b = b;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Color.prototype, "a", {
	        get: function () {
	            return this._a;
	        },
	        set: function (a) {
	            if (this._a !== a)
	                this._a = a;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Color.prototype.initWhenCreate = function (colorVal) {
	        if (colorVal == void 0)
	            return;
	        this._setColor(colorVal);
	    };
	    Color.prototype.toArray = function () {
	        return [this.r, this.g, this.b];
	    };
	    Color.prototype._setColor = function (colorVal) {
	        var REGEX_RGBA = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([^\)]+)\)$/i, REGEX_RGBA_2 = /^rgba\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+),\s*([^\)]+)\)$/i, REGEX_RGB = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i, REGEX_RGB_2 = /^rgb\((\d+\.\d+),\s*(\d+\.\d+),\s*(\d+\.\d+)\)$/i, REGEX_NUM = /^\#([0-9a-f]{6})$/i;
	        var color = null;
	        if (REGEX_RGBA.test(colorVal)) {
	            color = REGEX_RGBA.exec(colorVal);
	            this.r = this._getColorValue(color, 1);
	            this.g = this._getColorValue(color, 2);
	            this.b = this._getColorValue(color, 3);
	            this.a = Number(color[4]);
	            return this;
	        }
	        if (REGEX_RGBA_2.test(colorVal)) {
	            color = REGEX_RGBA_2.exec(colorVal);
	            this.r = parseFloat(color[1]);
	            this.g = parseFloat(color[2]);
	            this.b = parseFloat(color[3]);
	            this.a = Number(color[4]);
	            return this;
	        }
	        if (REGEX_RGB.test(colorVal)) {
	            color = REGEX_RGB.exec(colorVal);
	            this.r = this._getColorValue(color, 1);
	            this.g = this._getColorValue(color, 2);
	            this.b = this._getColorValue(color, 3);
	            this.a = 1;
	            return this;
	        }
	        if (REGEX_RGB_2.test(colorVal)) {
	            color = REGEX_RGB_2.exec(colorVal);
	            this.r = parseFloat(color[1]);
	            this.g = parseFloat(color[2]);
	            this.b = parseFloat(color[3]);
	            this.a = 1;
	            return this;
	        }
	        if (REGEX_NUM.test(colorVal)) {
	            color = REGEX_NUM.exec(colorVal);
	            this._setHex(parseInt(color[1], 16));
	            return this;
	        }
	    };
	    Color.prototype._getColorValue = function (color, index, num) {
	        if (num === void 0) { num = 255; }
	        return Math.min(num, parseInt(color[index], 10)) / num;
	    };
	    Color.prototype._setHex = function (hex) {
	        hex = Math.floor(hex);
	        this.r = (hex >> 16 & 255) / 255;
	        this.g = (hex >> 8 & 255) / 255;
	        this.b = (hex & 255) / 255;
	        this.a = 1;
	        return this;
	    };
	    return Color;
	}());

	var Material = (function () {
	    function Material() {
	        this._color = Color.create("#ffffff");
	        this.opacity = 1.0;
	        this._shader = null;
	    }
	    Object.defineProperty(Material.prototype, "program", {
	        get: function () {
	            return this._shader.program;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Material.prototype, "color", {
	        get: function () {
	            return this._color;
	        },
	        set: function (color) {
	            if (this._color !== color) {
	                this._color = color;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Material.prototype.initWhenCreate = function () {
	        this._shader = this.getShader();
	    };
	    Material.prototype.init = function () {
	        this._shader.init();
	    };
	    Material.prototype.update = function (cmd) {
	        this._shader.update(cmd, this);
	    };
	    return Material;
	}());

	(function (EVariableType) {
	    EVariableType[EVariableType["FLOAT_1"] = "FLOAT_1"] = "FLOAT_1";
	    EVariableType[EVariableType["FLOAT_2"] = "FLOAT_2"] = "FLOAT_2";
	    EVariableType[EVariableType["FLOAT_3"] = "FLOAT_3"] = "FLOAT_3";
	    EVariableType[EVariableType["FLOAT_4"] = "FLOAT_4"] = "FLOAT_4";
	    EVariableType[EVariableType["VECTOR_2"] = "VECTOR_2"] = "VECTOR_2";
	    EVariableType[EVariableType["VECTOR_3"] = "VECTOR_3"] = "VECTOR_3";
	    EVariableType[EVariableType["VECTOR_4"] = "VECTOR_4"] = "VECTOR_4";
	    EVariableType[EVariableType["COLOR_3"] = "COLOR_3"] = "COLOR_3";
	    EVariableType[EVariableType["FLOAT_MAT3"] = "FLOAT_MAT3"] = "FLOAT_MAT3";
	    EVariableType[EVariableType["FLOAT_MAT4"] = "FLOAT_MAT4"] = "FLOAT_MAT4";
	    EVariableType[EVariableType["BUFFER"] = "BUFFER"] = "BUFFER";
	    EVariableType[EVariableType["SAMPLER_CUBE"] = "SAMPLER_CUBE"] = "SAMPLER_CUBE";
	    EVariableType[EVariableType["SAMPLER_2D"] = "SAMPLER_2D"] = "SAMPLER_2D";
	    EVariableType[EVariableType["NUMBER_1"] = "NUMBER_1"] = "NUMBER_1";
	    EVariableType[EVariableType["STRUCTURE"] = "STRUCTURE"] = "STRUCTURE";
	    EVariableType[EVariableType["STRUCTURES"] = "STRUCTURES"] = "STRUCTURES";
	    EVariableType[EVariableType["SAMPLER_ARRAY"] = "SAMPLER_ARRAY"] = "SAMPLER_ARRAY";
	    EVariableType[EVariableType["FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY"] = "FLOAT_MAT4_ARRAY";
	})(exports.EVariableType || (exports.EVariableType = {}));

	var GLSLDataSender = (function () {
	    function GLSLDataSender(_program) {
	        this._program = _program;
	        this._getUniformLocationCache = {};
	        this._toSendBufferArr = [];
	    }
	    GLSLDataSender.create = function (program) {
	        var obj = new this(program);
	        return obj;
	    };
	    GLSLDataSender.prototype.addBufferToSendList = function (pos, buffer) {
	        this._toSendBufferArr[pos] = buffer;
	    };
	    GLSLDataSender.prototype.sendAllBufferData = function () {
	        for (var pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
	            this.sendBuffer(pos, this._toSendBufferArr[pos]);
	        }
	    };
	    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
	        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
	        this._getGl().vertexAttribPointer(pos, buffer.size, this._getGl()[buffer.type], false, 0, 0);
	        this._getGl().enableVertexAttribArray(pos);
	    };
	    GLSLDataSender.prototype.sendFloat1 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform1f(uniform, data);
	    };
	    GLSLDataSender.prototype.sendFloat2 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform2f(uniform, data[0], data[1]);
	    };
	    GLSLDataSender.prototype.sendFloat3 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform3f(uniform, data[0], data[1], data[2]);
	    };
	    GLSLDataSender.prototype.sendFloat4 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform4f(uniform, data[0], data[1], data[2], data[3]);
	    };
	    GLSLDataSender.prototype.sendVector2 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform2f(uniform, data.x, data.y);
	    };
	    GLSLDataSender.prototype.sendVector3 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform3f(uniform, data.x, data.y, data.z);
	    };
	    GLSLDataSender.prototype.sendVector4 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform4f(uniform, data.x, data.y, data.z, data.w);
	    };
	    GLSLDataSender.prototype.sendNum1 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniform1i(uniform, data);
	    };
	    GLSLDataSender.prototype.sendMatrix4 = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniformMatrix4fv(uniform, false, data.elements);
	    };
	    GLSLDataSender.prototype.sendMatrix4Array = function (name, data) {
	        var uniform = this.getUniformLocation(name);
	        this._getGl().uniformMatrix4fv(uniform, false, data);
	    };
	    GLSLDataSender.prototype.getUniformLocation = function (name) {
	        if (this._getUniformLocationCache[name] != void 0) {
	            return this._getUniformLocationCache[name];
	        }
	        var uniform = this._getGl().getUniformLocation(this._program.glProgram, name);
	        if (uniform == void 0) {
	            throw new TypeError("the uniform is not find");
	        }
	        this._getUniformLocationCache[name] = uniform;
	        return uniform;
	    };
	    GLSLDataSender.prototype._getGl = function () {
	        return exports.Device.getInstance().gl;
	    };
	    return GLSLDataSender;
	}());

	var Program = (function (_super) {
	    __extends(Program, _super);
	    function Program() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.glProgram = null;
	        _this._attributeList = new Hash();
	        _this._glslSend = GLSLDataSender.create(_this);
	        return _this;
	    }
	    Program.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Program.prototype.use = function () {
	        this._getGl().useProgram(this.glProgram);
	    };
	    Program.prototype.getAttribLocation = function (name) {
	        var pos = this._attributeList.getChild(name);
	        if (pos !== void 0)
	            return pos;
	        var attribute = this._getGl().getAttribLocation(this.glProgram, name);
	        this._attributeList.addChild(name, attribute);
	        return attribute;
	    };
	    Program.prototype.getUniformLocation = function (name) {
	        return this._glslSend.getUniformLocation(name);
	    };
	    Program.prototype.sendAttributeBuffer = function (name, buffer) {
	        var pos = this.getAttribLocation(name);
	        if (pos == -1) {
	            throw new TypeError("the attribute is not find");
	        }
	        
	        this._glslSend.addBufferToSendList(pos, buffer);
	    };
	    Program.prototype.sendAllBufferData = function () {
	        this._glslSend.sendAllBufferData();
	    };
	    Program.prototype.sendUniformData = function (name, type, data) {
	        if (data === null) {
	            return;
	        }
	        switch (type) {
	            case exports.EVariableType.FLOAT_1:
	                this._glslSend.sendFloat1(name, data);
	                break;
	            case exports.EVariableType.FLOAT_2:
	                this._glslSend.sendFloat2(name, data);
	                break;
	            case exports.EVariableType.FLOAT_3:
	                this._glslSend.sendFloat3(name, data);
	                break;
	            case exports.EVariableType.FLOAT_4:
	                this._glslSend.sendFloat4(name, data);
	                break;
	            case exports.EVariableType.VECTOR_2:
	                this._glslSend.sendVector2(name, data);
	                break;
	            case exports.EVariableType.VECTOR_3:
	                this._glslSend.sendVector3(name, data);
	                break;
	            case exports.EVariableType.VECTOR_4:
	                this._glslSend.sendVector4(name, data);
	                break;
	            case exports.EVariableType.FLOAT_MAT4:
	                this._glslSend.sendMatrix4(name, data);
	                break;
	            case exports.EVariableType.NUMBER_1:
	            case exports.EVariableType.SAMPLER_CUBE:
	            case exports.EVariableType.SAMPLER_2D:
	                this._glslSend.sendNum1(name, data);
	                break;
	            case exports.EVariableType.FLOAT_MAT4_ARRAY:
	                this._glslSend.sendMatrix4Array(name, data);
	                break;
	            default:
	                console.log("the type is not find");
	                break;
	        }
	    };
	    Program.prototype.sendFloat1 = function (name, data) {
	        this._glslSend.sendFloat1(name, data);
	    };
	    Program.prototype.sendFloat2 = function (name, data) {
	        this._glslSend.sendFloat2(name, data);
	    };
	    Program.prototype.sendFloat3 = function (name, data) {
	        this._glslSend.sendFloat3(name, data);
	    };
	    Program.prototype.sendFloat4 = function (name, data) {
	        this._glslSend.sendFloat4(name, data);
	    };
	    Program.prototype.sendVector2 = function (name, data) {
	        this._glslSend.sendVector2(name, data);
	    };
	    Program.prototype.sendVector3 = function (name, data) {
	        this._glslSend.sendVector3(name, data);
	    };
	    Program.prototype.sendVector4 = function (name, data) {
	        this._glslSend.sendVector4(name, data);
	    };
	    Program.prototype.sendNum1 = function (name, data) {
	        this._glslSend.sendNum1(name, data);
	    };
	    Program.prototype.sendMatrix4 = function (name, data) {
	        this._glslSend.sendMatrix4(name, data);
	    };
	    Program.prototype.sendMatrix4Array = function (name, data) {
	        this._glslSend.sendMatrix4Array(name, data);
	    };
	    Program.prototype.initProgramWithShader = function (shader) {
	        var gl = exports.Device.getInstance().gl;
	        var program = gl.createProgram();
	        var vshader = this._loadShader(gl, gl.VERTEX_SHADER, shader.VSource);
	        var fshader = this._loadShader(gl, gl.FRAGMENT_SHADER, shader.FSource);
	        if (!vshader || !fshader) {
	            return;
	        }
	        gl.attachShader(program, vshader);
	        gl.attachShader(program, fshader);
	        gl.linkProgram(program);
	        var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
	        if (!linked) {
	            var err = gl.getProgramInfoLog(program);
	            console.log("faild to link _program:" + err);
	            gl.deleteProgram(program);
	            gl.deleteShader(vshader);
	            gl.deleteShader(vshader);
	            return;
	        }
	        if (!program)
	            console.log("program error");
	        this.glProgram = program;
	    };
	    Program.prototype._loadShader = function (gl, type, value) {
	        var shader = gl.createShader(type);
	        if (shader == null) {
	            console.log("unable to create shader");
	            return;
	        }
	        gl.shaderSource(shader, value);
	        gl.compileShader(shader);
	        var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	        if (!compiled) {
	            var error = gl.getShaderInfoLog(shader);
	            console.log("faild to compile shader:" + error);
	            gl.deleteShader(shader);
	            return;
	        }
	        return shader;
	    };
	    Program.prototype._getGl = function () {
	        return exports.Device.getInstance().gl;
	    };
	    return Program;
	}(Entity));

	var VariableLib = (function () {
	    function VariableLib() {
	    }
	    return VariableLib;
	}());
	VariableLib.a_position = {
	    type: exports.EVariableType.FLOAT_3,
	    buffer: exports.EBufferDataType.VERTICE
	};
	VariableLib.a_color = {
	    type: exports.EVariableType.FLOAT_3,
	    buffer: exports.EBufferDataType.COLOR
	};
	VariableLib.a_normal = {
	    type: exports.EVariableType.FLOAT_3,
	    buffer: exports.EBufferDataType.NORMAL
	};
	VariableLib.u_color = {
	    type: exports.EVariableType.FLOAT_3,
	    buffer: "color"
	};
	VariableLib.u_a = {
	    type: exports.EVariableType.FLOAT_1,
	    buffer: "opacity"
	};
	VariableLib.u_mMatrix = {
	    type: exports.EVariableType.FLOAT_MAT4,
	    buffer: "mMatrix"
	};
	VariableLib.u_vMatrix = {
	    type: exports.EVariableType.FLOAT_MAT4,
	    buffer: "vMatrix"
	};
	VariableLib.u_pMatrix = {
	    type: exports.EVariableType.FLOAT_MAT4,
	    buffer: "pMatrix"
	};
	VariableLib.u_mvpMatrix = {
	    type: exports.EVariableType.FLOAT_MAT4,
	};

	var Shader = (function (_super) {
	    __extends(Shader, _super);
	    function Shader() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.program = Program.create();
	        _this._shaderLib = _this.createShaderLib();
	        return _this;
	    }
	    Object.defineProperty(Shader.prototype, "VSource", {
	        get: function () {
	            return this._shaderLib.VSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Shader.prototype, "FSource", {
	        get: function () {
	            return this._shaderLib.FSource;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Shader.prototype.init = function () {
	        this.initProgram();
	        this._shaderLib.init();
	    };
	    Shader.prototype.sendAttributeBuffer = function (name, data) {
	        this.program.sendAttributeBuffer(name, data);
	    };
	    Shader.prototype.sendUniformData = function (name, data) {
	        this.program.sendUniformData(name, VariableLib[name].type, data);
	    };
	    return Shader;
	}(Component));

	var ShaderLib = (function () {
	    function ShaderLib() {
	        this._attributes = [];
	        this._uniforms = [];
	    }
	    ShaderLib.prototype.getAttributes = function () {
	        return this._attributes;
	    };
	    ShaderLib.prototype.getUniforms = function () {
	        return this._uniforms;
	    };
	    
	    return ShaderLib;
	}());

	var BasicShaderLib = (function (_super) {
	    __extends(BasicShaderLib, _super);
	    function BasicShaderLib() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.VSource = "attribute vec4 a_position;" +
	            "uniform mat4 u_mMatrix;" +
	            "uniform mat4 u_vMatrix;" +
	            "uniform mat4 u_pMatrix;" +
	            "void main(){" +
	            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
	            "}";
	        _this.FSource = "#ifdef GL_ES\n" +
	            "precision mediump float;\n" +
	            "#endif\n" +
	            "uniform vec3 u_color;" +
	            "uniform float u_a;" +
	            "void main(){" +
	            "   gl_FragColor = vec4(u_color,u_a);" +
	            "}";
	        return _this;
	    }
	    BasicShaderLib.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    BasicShaderLib.prototype.init = function () {
	        this._attributes.push("a_position");
	        this._uniforms.push("u_color");
	        this._uniforms.push("u_a");
	        this._uniforms.push("u_mMatrix");
	        this._uniforms.push("u_vMatrix");
	        this._uniforms.push("u_pMatrix");
	    };
	    return BasicShaderLib;
	}(ShaderLib));

	var BasicShader = (function (_super) {
	    __extends(BasicShader, _super);
	    function BasicShader() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BasicShader.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    BasicShader.prototype.initProgram = function () {
	        this.program.initProgramWithShader(this);
	    };
	    BasicShader.prototype.createShaderLib = function () {
	        return BasicShaderLib.create();
	    };
	    BasicShader.prototype.update = function (cmd, material) {
	        var _this = this;
	        this.program.use();
	        this._shaderLib.getAttributes().forEach(function (item) {
	            var buffer = cmd.buffers.getChild(VariableLib[item].buffer);
	            _this.sendAttributeBuffer(item, buffer);
	        });
	        this.program.sendAllBufferData();
	        this._shaderLib.getUniforms().forEach(function (item) {
	            _this.sendUniformData(item, cmd[VariableLib[item].buffer]);
	        });
	    };
	    return BasicShader;
	}(Shader));

	var BasicMaterial = (function (_super) {
	    __extends(BasicMaterial, _super);
	    function BasicMaterial() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BasicMaterial.create = function () {
	        var obj = new this();
	        obj.initWhenCreate();
	        return obj;
	    };
	    BasicMaterial.prototype.getShader = function () {
	        return BasicShader.create();
	    };
	    return BasicMaterial;
	}(Material));

	var ModelShaderLib = (function (_super) {
	    __extends(ModelShaderLib, _super);
	    function ModelShaderLib() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.VSource = "attribute vec4 a_position;" +
	            "attribute vec4 a_color;" +
	            "attribute vec4 a_normal;" +
	            "uniform mat4 u_mMatrix;" +
	            "uniform mat4 u_vMatrix;" +
	            "uniform mat4 u_pMatrix;" +
	            "varying vec4 v_color;" +
	            "void main(){" +
	            "   gl_Position = u_pMatrix * u_vMatrix * u_mMatrix * a_position;" +
	            '   vec3 lightDirection = vec3(1.35, 0.35, -3.87);' +
	            '   vec3 normal = normalize(vec3(a_normal));\n' +
	            '   float nDotL = max(dot(normal, lightDirection), 0.0);\n' +
	            '   v_color = vec4(a_color.rgb * nDotL, a_color.a);\n' +
	            "}";
	        _this.FSource = "#ifdef GL_ES\n" +
	            "precision mediump float;\n" +
	            "#endif\n" +
	            "varying vec4 v_color;" +
	            "void main(){" +
	            "   gl_FragColor = v_color;" +
	            "}";
	        return _this;
	    }
	    ModelShaderLib.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    ModelShaderLib.prototype.init = function () {
	        this._attributes.push("a_position");
	        this._attributes.push("a_color");
	        this._attributes.push("a_normal");
	        this._uniforms.push("u_mMatrix");
	        this._uniforms.push("u_vMatrix");
	        this._uniforms.push("u_pMatrix");
	    };
	    return ModelShaderLib;
	}(ShaderLib));

	var ModelShader = (function (_super) {
	    __extends(ModelShader, _super);
	    function ModelShader() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ModelShader.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    ModelShader.prototype.initProgram = function () {
	        this.program.initProgramWithShader(this);
	    };
	    ModelShader.prototype.createShaderLib = function () {
	        return ModelShaderLib.create();
	    };
	    ModelShader.prototype.update = function (cmd, material) {
	        var _this = this;
	        this.program.use();
	        this._shaderLib.getAttributes().forEach(function (item) {
	            var buffer = cmd.buffers.getChild(VariableLib[item].buffer);
	            _this.sendAttributeBuffer(item, buffer);
	        });
	        this.program.sendAllBufferData();
	        this._shaderLib.getUniforms().forEach(function (item) {
	            _this.sendUniformData(item, cmd[VariableLib[item].buffer]);
	        });
	    };
	    return ModelShader;
	}(Shader));

	var ModelMaterial = (function (_super) {
	    __extends(ModelMaterial, _super);
	    function ModelMaterial() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    ModelMaterial.create = function () {
	        var obj = new this();
	        obj.initWhenCreate();
	        return obj;
	    };
	    ModelMaterial.prototype.getShader = function () {
	        return ModelShader.create();
	    };
	    return ModelMaterial;
	}(Material));

	var RendererComponent = (function (_super) {
	    __extends(RendererComponent, _super);
	    function RendererComponent() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return RendererComponent;
	}(Component));

	(function (EDrawMode) {
	    EDrawMode[EDrawMode["POINTS"] = "POINTS"] = "POINTS";
	    EDrawMode[EDrawMode["LINES"] = "LINES"] = "LINES";
	    EDrawMode[EDrawMode["LINE_LOOP"] = "LINE_LOOP"] = "LINE_LOOP";
	    EDrawMode[EDrawMode["LINE_STRIP"] = "LINE_STRIP"] = "LINE_STRIP";
	    EDrawMode[EDrawMode["TRIANGLES"] = "TRIANGLES"] = "TRIANGLES";
	    EDrawMode[EDrawMode["TRIANGLE_STRIP"] = "TRIANGLE_STRIP"] = "TRIANGLE_STRIP";
	    EDrawMode[EDrawMode["TRIANGLE_FAN"] = "TRIANGLE_FAN"] = "TRIANGLE_FAN";
	})(exports.EDrawMode || (exports.EDrawMode = {}));

	var RenderCommand = (function () {
	    function RenderCommand() {
	        this.buffers = null;
	        this.mMatrix = null;
	        this.vMatrix = null;
	        this.pMatrix = null;
	        this.targetObject = null;
	        this.material = null;
	        this._drawMode = exports.EDrawMode.TRIANGLES;
	    }
	    RenderCommand.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(RenderCommand.prototype, "color", {
	        get: function () {
	            return this.material.color.toArray();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderCommand.prototype, "opacity", {
	        get: function () {
	            return this.material.opacity;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    RenderCommand.prototype.draw = function () {
	        var startOffset = 0, gl = exports.Device.getInstance().gl;
	        this.material.update(this);
	        var elementBuffer = this.buffers.getChild(exports.EBufferDataType.INDICE);
	        var verticeBuffer = this.buffers.getChild(exports.EBufferDataType.VERTICE);
	        if (elementBuffer != void 0)
	            gl.drawElements(gl[this._drawMode], elementBuffer.count, gl[elementBuffer.type], 0);
	        else
	            gl.drawArrays(gl[this._drawMode], startOffset, verticeBuffer.count);
	    };
	    return RenderCommand;
	}());

	var MeshRenderer = (function (_super) {
	    __extends(MeshRenderer, _super);
	    function MeshRenderer() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    MeshRenderer.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    MeshRenderer.prototype.render = function (renderer, targetObject, camera) {
	        renderer.addCommand(this._createCmd(targetObject, camera));
	    };
	    MeshRenderer.prototype._createCmd = function (targetObject, camera) {
	        var geometry = targetObject.geometry;
	        var renderCmd = RenderCommand.create();
	        var cameraComponent = camera.getComponent(CameraController);
	        renderCmd.material = geometry.material;
	        renderCmd.buffers = geometry.bufferContainer;
	        renderCmd.targetObject = targetObject;
	        renderCmd.mMatrix = targetObject.transform.mMatrix;
	        renderCmd.vMatrix = cameraComponent.vMatrix;
	        renderCmd.pMatrix = cameraComponent.pMatrix;
	        return renderCmd;
	    };
	    return MeshRenderer;
	}(RendererComponent));

	var Transform = (function (_super) {
	    __extends(Transform, _super);
	    function Transform() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.mMatrix = new Matrix4();
	        return _this;
	    }
	    Transform.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Transform.prototype.rotate = function (angle, x, y, z) {
	        this.mMatrix.rotate(angle, x, y, z);
	    };
	    Transform.prototype.scale = function (x, y, z) {
	        this.mMatrix.scale(x, y, z);
	    };
	    Transform.prototype.translate = function (x, y, z) {
	        this.mMatrix.translate(x, y, z);
	    };
	    return Transform;
	}(Component));

	var ThreeDTransform = (function (_super) {
	    __extends(ThreeDTransform, _super);
	    function ThreeDTransform() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return ThreeDTransform;
	}(Transform));

	(function (EScreenSize) {
	    EScreenSize[EScreenSize["FULL"] = 0] = "FULL";
	})(exports.EScreenSize || (exports.EScreenSize = {}));

	var JudgeUtils$1 = (function () {
	    function JudgeUtils() {
	    }
	    JudgeUtils.isArray = function (arr) {
	        var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	        var length = arr && arr.length;
	        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	    };
	    JudgeUtils.isArrayExactly = function (arr) {
	        return Object.prototype.toString.call(arr) === "[object Array]";
	    };
	    JudgeUtils.isNumber = function (num) {
	        return typeof num == "number";
	    };
	    JudgeUtils.isNumberExactly = function (num) {
	        return Object.prototype.toString.call(num) === "[object Number]";
	    };
	    JudgeUtils.isString = function (str) {
	        return typeof str == "string";
	    };
	    JudgeUtils.isStringExactly = function (str) {
	        return Object.prototype.toString.call(str) === "[object String]";
	    };
	    JudgeUtils.isBoolean = function (bool) {
	        return bool === true || bool === false || toString.call(bool) === '[boolect Boolean]';
	    };
	    JudgeUtils.isDom = function (obj) {
	        return !!(obj && obj.nodeType === 1);
	    };
	    JudgeUtils.isObject = function (obj) {
	        var type = typeof obj;
	        return type === 'function' || type === 'object' && !!obj;
	    };
	    JudgeUtils.isDirectObject = function (obj) {
	        return Object.prototype.toString.call(obj) === "[object Object]";
	    };
	    JudgeUtils.isHostMethod = function (object, property) {
	        var type = typeof object[property];
	        return type === "function" ||
	            (type === "object" && !!object[property]);
	    };
	    JudgeUtils.isNodeJs = function () {
	        return ((typeof global != "undefined" && global.module) || (typeof module != "undefined")) && typeof module.exports != "undefined";
	    };
	    JudgeUtils.isFunction = function (func) {
	        return true;
	    };
	    return JudgeUtils;
	}());
	if (typeof /./ != 'function' && typeof Int8Array != 'object') {
	    JudgeUtils$1.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils$1.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var $BREAK$1 = {
	    break: true
	};
	var $REMOVE$1 = void 0;

	var List$1 = (function () {
	    function List() {
	        this.children = null;
	    }
	    List.prototype.getCount = function () {
	        return this.children.length;
	    };
	    List.prototype.hasChild = function (child) {
	        var c = null, children = this.children;
	        for (var i = 0, len = children.length; i < len; i++) {
	            c = children[i];
	            if (child.uid && c.uid && child.uid == c.uid) {
	                return true;
	            }
	            else if (child === c) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.hasChildWithFunc = function (func) {
	        for (var i = 0, len = this.children.length; i < len; i++) {
	            if (func(this.children[i], i)) {
	                return true;
	            }
	        }
	        return false;
	    };
	    List.prototype.getChildren = function () {
	        return this.children;
	    };
	    List.prototype.getChild = function (index) {
	        return this.children[index];
	    };
	    List.prototype.addChild = function (child) {
	        this.children.push(child);
	        return this;
	    };
	    List.prototype.addChildren = function (arg) {
	        if (JudgeUtils$1.isArray(arg)) {
	            var children = arg;
	            this.children = this.children.concat(children);
	        }
	        else if (arg instanceof List) {
	            var children = arg;
	            this.children = this.children.concat(children.getChildren());
	        }
	        else {
	            var child = arg;
	            this.addChild(child);
	        }
	        return this;
	    };
	    List.prototype.setChildren = function (children) {
	        this.children = children;
	        return this;
	    };
	    List.prototype.unShiftChild = function (child) {
	        this.children.unshift(child);
	    };
	    List.prototype.removeAllChildren = function () {
	        this.children = [];
	        return this;
	    };
	    List.prototype.forEach = function (func, context) {
	        this._forEach(this.children, func, context);
	        return this;
	    };
	    List.prototype.toArray = function () {
	        return this.children;
	    };
	    List.prototype.copyChildren = function () {
	        return this.children.slice(0);
	    };
	    List.prototype.removeChildHelper = function (arg) {
	        var result = null;
	        if (JudgeUtils$1.isFunction(arg)) {
	            var func = arg;
	            result = this._removeChild(this.children, func);
	        }
	        else if (arg.uid) {
	            result = this._removeChild(this.children, function (e) {
	                if (!e.uid) {
	                    return false;
	                }
	                return e.uid === arg.uid;
	            });
	        }
	        else {
	            result = this._removeChild(this.children, function (e) {
	                return e === arg;
	            });
	        }
	        return result;
	    };
	    List.prototype._forEach = function (arr, func, context) {
	        var scope = context, i = 0, len = arr.length;
	        for (i = 0; i < len; i++) {
	            if (func.call(scope, arr[i], i) === $BREAK$1) {
	                break;
	            }
	        }
	    };
	    List.prototype._removeChild = function (arr, func) {
	        var self = this, removedElementArr = [], remainElementArr = [];
	        this._forEach(arr, function (e, index) {
	            if (!!func.call(self, e)) {
	                removedElementArr.push(e);
	            }
	            else {
	                remainElementArr.push(e);
	            }
	        });
	        this.children = remainElementArr;
	        return removedElementArr;
	    };
	    return List;
	}());

	var Queue = (function (_super) {
	    __extends(Queue, _super);
	    function Queue(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Queue.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Object.defineProperty(Queue.prototype, "front", {
	        get: function () {
	            return this.children[this.children.length - 1];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Queue.prototype, "rear", {
	        get: function () {
	            return this.children[0];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Queue.prototype.push = function (element) {
	        this.children.unshift(element);
	    };
	    Queue.prototype.pop = function () {
	        return this.children.pop();
	    };
	    Queue.prototype.clear = function () {
	        this.removeAllChildren();
	    };
	    return Queue;
	}(List$1));

	var WebglState = (function () {
	    function WebglState() {
	    }
	    WebglState.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    WebglState.prototype.setClearColor = function (r, g, b, a) {
	        var gl = exports.Device.getInstance().gl;
	        gl.clearColor(r, g, b, a);
	    };
	    WebglState.prototype.init = function () {
	        this._depthTest();
	        this._clear();
	    };
	    WebglState.prototype._depthTest = function () {
	        var gl = exports.Device.getInstance().gl;
	        gl.enable(gl.DEPTH_TEST);
	    };
	    WebglState.prototype._clear = function () {
	        var gl = exports.Device.getInstance().gl;
	        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	    };
	    return WebglState;
	}());

	var Renderer = (function () {
	    function Renderer() {
	        this._wegbglState = WebglState.create();
	    }
	    Object.defineProperty(Renderer.prototype, "webglState", {
	        get: function () {
	            return this._wegbglState;
	        },
	        set: function (webglState) {
	            this._wegbglState = webglState;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Renderer.prototype.setClearColor = function (r, g, b, a) {
	        this._wegbglState.setClearColor(r, g, b, a);
	    };
	    return Renderer;
	}());

	var WebglRenderer = (function (_super) {
	    __extends(WebglRenderer, _super);
	    function WebglRenderer() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this._commandQueue = new Queue();
	        return _this;
	    }
	    WebglRenderer.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    WebglRenderer.prototype.init = function () {
	        this.webglState.init();
	    };
	    WebglRenderer.prototype.render = function () {
	        this._commandQueue.forEach(function (renderCmd) {
	            renderCmd.draw();
	        });
	    };
	    WebglRenderer.prototype.addCommand = function (renderCmd) {
	        this._commandQueue.addChild(renderCmd);
	    };
	    WebglRenderer.prototype.hasCommand = function () {
	        return this._commandQueue.getCount() > 0;
	    };
	    return WebglRenderer;
	}(Renderer));

	var Util = (function () {
	    function Util() {
	    }
	    Util.isArray = function (target) {
	        return {}.toString.call(target).slice(8, -1).toLowerCase() == "array";
	    };
	    Util.ajax = function (config) {
	        var url = config.url;
	        var success = config.success;
	        var error = config.error;
	        var data = config.data;
	        var type = config.data == void 0 ? "GET" : config.data;
	        var xhr = this._createAjax(error);
	        xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4 && xhr.status === 200) {
	                if (success !== null) {
	                    success(xhr.responseText);
	                }
	            }
	            else {
	                if (this.error !== void 0) {
	                    this.error("出错了");
	                }
	            }
	        };
	        xhr.open(type, url, true);
	        xhr.send(null);
	    };
	    Util._createAjax = function (error) {
	        var xhr = null;
	        try {
	            xhr = new ActiveXObject("microsoft.xmlhttp");
	        }
	        catch (e1) {
	            try {
	                xhr = new XMLHttpRequest();
	            }
	            catch (e2) {
	                error(xhr, { message: "您的浏览器不支持ajax，请更换！" });
	                return null;
	            }
	        }
	        return xhr;
	    };
	    return Util;
	}());

	var EntityManager = (function (_super) {
	    __extends(EntityManager, _super);
	    function EntityManager(_entityDispatcher) {
	        var _this = _super.call(this) || this;
	        _this._entityDispatcher = _entityDispatcher;
	        _this._objectList = new Collection();
	        return _this;
	    }
	    EntityManager.create = function (entityDispatcher) {
	        var obj = new this(entityDispatcher);
	        return obj;
	    };
	    EntityManager.prototype.init = function () {
	        this.forEach(function (child) {
	            child.init();
	        });
	    };
	    EntityManager.prototype.dispose = function () {
	        this.forEach(function (child) {
	            child.init();
	        });
	    };
	    EntityManager.prototype.hasChild = function (child) {
	        return this._objectList.hasChild(child);
	    };
	    EntityManager.prototype.addChild = function (child) {
	        this._objectList.addChild(child);
	        return this;
	    };
	    EntityManager.prototype.addChildren = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var addChild = args[1] == void 0 ? this.addChild : args[1];
	        if (Util.isArray(args[0])) {
	            var children = args[0];
	            for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
	                var child = children_1[_a];
	                addChild(child);
	            }
	        }
	        else
	            addChild(args[0]);
	        return this;
	    };
	    EntityManager.prototype.forEach = function (func) {
	        this._objectList.forEach(func);
	        return this;
	    };
	    EntityManager.prototype.filter = function (func) {
	        return this._objectList.filter(func);
	    };
	    EntityManager.prototype.getChildren = function () {
	        return this._objectList;
	    };
	    EntityManager.prototype.getAllChildren = function () {
	        var res = Collection.create();
	        var getChildren = function (children) {
	            res.addChildren(children.getChildren());
	            children.forEach(function (child) {
	                getChildren(child);
	            });
	        };
	        getChildren(this._entityDispatcher);
	        return res;
	    };
	    EntityManager.prototype.getChild = function (index) {
	        return this._objectList.getChild(index);
	    };
	    EntityManager.prototype.findChildById = function (uid) {
	        return this._objectList.findOne(function (child) {
	            return child.uid == uid;
	        });
	    };
	    EntityManager.prototype.findChildByName = function (name) {
	        return this._objectList.findOne(function (child) {
	            return child.name.search(name) > -1;
	        });
	    };
	    EntityManager.prototype.findChildrenByName = function (name) {
	        return this.filter(function (child) {
	            return child.name.search(name) > -1;
	        });
	    };
	    EntityManager.prototype.removeChild = function (child) {
	        this._objectList.removeChild(child);
	        return this;
	    };
	    EntityManager.prototype.removeAllChildren = function () {
	        var _this = this;
	        this._objectList.forEach(function (child) {
	            _this.removeChild(child);
	        }, this);
	    };
	    return EntityManager;
	}(Entity));

	var ComponentManager = (function () {
	    function ComponentManager(_entityObject) {
	        this._entityObject = _entityObject;
	        this.transform = null;
	        this.geometry = null;
	        this._componentList = new Collection();
	        this._renderComponent = null;
	    }
	    ComponentManager.create = function (entityObject) {
	        var obj = new this(entityObject);
	        return obj;
	    };
	    ComponentManager.prototype.init = function () {
	        this._componentList.forEach(function (component) {
	            component.init();
	        });
	    };
	    ComponentManager.prototype.addComponent = function (component) {
	        if (component instanceof Geometry) {
	            this.geometry = component;
	        }
	        else if (component instanceof Transform) {
	            this.transform = component;
	        }
	        else if (component instanceof MeshRenderer) {
	            this._renderComponent = component;
	        }
	        this._componentList.addChild(component);
	        component.addToObject(this._entityObject);
	    };
	    ComponentManager.prototype.getComponent = function (componentClass) {
	        return this._componentList.findOne(function (component) {
	            return component instanceof componentClass;
	        });
	    };
	    ComponentManager.prototype.hasComponent = function (componentClass) {
	        var res = this._componentList.hasChildWithFunc(function (component) {
	            return component instanceof componentClass;
	        });
	        return res;
	    };
	    ComponentManager.prototype.removeComponent = function (component) {
	        this._componentList.removeChild(component);
	    };
	    ComponentManager.prototype.getRenderComponent = function () {
	        return this._renderComponent;
	    };
	    ComponentManager.prototype.removeAllComponent = function () {
	        this._componentList.removeAllChildren();
	    };
	    return ComponentManager;
	}());

	var EntityObject = (function (_super) {
	    __extends(EntityObject, _super);
	    function EntityObject() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.parent = null;
	        _this.name = null;
	        _this._entityManager = EntityManager.create(_this);
	        _this._componentManager = ComponentManager.create(_this);
	        return _this;
	    }
	    Object.defineProperty(EntityObject.prototype, "transform", {
	        get: function () {
	            return this._componentManager.transform;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(EntityObject.prototype, "geometry", {
	        get: function () {
	            return this._componentManager.geometry;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EntityObject.prototype.initWhenCreate = function () {
	        this._componentManager.addComponent(this.createTransform());
	    };
	    EntityObject.prototype.init = function () {
	        this._componentManager.init();
	        this._entityManager.init();
	        return this;
	    };
	    EntityObject.prototype.render = function (renderer, camera) {
	        var renderComponent = this._componentManager.getRenderComponent();
	        if (renderComponent != void 0)
	            renderComponent.render(renderer, this, camera);
	        this.getChildren().forEach(function (child) {
	            child.render(renderer, camera);
	        });
	    };
	    EntityObject.prototype.dispose = function () {
	        this._entityManager.dispose();
	        return this;
	    };
	    EntityObject.prototype.hasChild = function (child) {
	        return this._entityManager.hasChild(child);
	    };
	    EntityObject.prototype.addChild = function (child) {
	        this._entityManager.addChild(child);
	        return this;
	    };
	    EntityObject.prototype.addChildren = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this._entityManager.addChildren(args);
	        return this;
	    };
	    EntityObject.prototype.forEach = function (func) {
	        this._entityManager.forEach(func);
	        return this;
	    };
	    EntityObject.prototype.filter = function (func) {
	        return this._entityManager.filter(func);
	    };
	    EntityObject.prototype.getChildren = function () {
	        return this._entityManager.getChildren();
	    };
	    EntityObject.prototype.getAllChildren = function () {
	        return this._entityManager.getAllChildren();
	    };
	    EntityObject.prototype.getChild = function (index) {
	        return this._entityManager.getChild(index);
	    };
	    EntityObject.prototype.findChildById = function (uid) {
	        return this._entityManager.findChildById(uid);
	    };
	    EntityObject.prototype.findChildByName = function (name) {
	        return this._entityManager.findChildByName(name);
	    };
	    EntityObject.prototype.findChildrenByName = function (name) {
	        return this._entityManager.findChildrenByName(name);
	    };
	    EntityObject.prototype.removeChild = function (child) {
	        return this._entityManager.removeChild(child);
	    };
	    EntityObject.prototype.removeAllChildren = function () {
	        this._entityManager.removeAllChildren();
	    };
	    EntityObject.prototype.addComponent = function (component) {
	        this._componentManager.addComponent(component);
	    };
	    EntityObject.prototype.getComponent = function (componentClass) {
	        return this._componentManager.getComponent(componentClass);
	    };
	    EntityObject.prototype.hasComponent = function (componentClass) {
	        return this._componentManager.hasComponent(componentClass);
	    };
	    EntityObject.prototype.removeComponent = function (component) {
	        this._componentManager.removeComponent(component);
	    };
	    EntityObject.prototype.removeAllComponent = function () {
	        this._componentManager.removeAllComponent();
	    };
	    return EntityObject;
	}(Entity));

	var GameObject = (function (_super) {
	    __extends(GameObject, _super);
	    function GameObject() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GameObject.create = function () {
	        var obj = new this();
	        obj.initWhenCreate();
	        return obj;
	    };
	    GameObject.prototype.initWhenCreate = function () {
	        _super.prototype.initWhenCreate.call(this);
	        this.name = "GameObject" + this.uid;
	    };
	    GameObject.prototype.createTransform = function () {
	        return Transform.create();
	    };
	    return GameObject;
	}(EntityObject));

	var GameObjectScene = (function (_super) {
	    __extends(GameObjectScene, _super);
	    function GameObjectScene() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    GameObjectScene.create = function () {
	        var obj = new this();
	        obj.initWhenCreate();
	        return obj;
	    };
	    Object.defineProperty(GameObjectScene.prototype, "currentCamera", {
	        get: function () {
	            return this._currentCamera;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    GameObjectScene.prototype.initWhenCreate = function () {
	        this.name = "GameObjectScene" + this.uid;
	    };
	    GameObjectScene.prototype.render = function (renderer) {
	        _super.prototype.render.call(this, renderer, this.currentCamera);
	    };
	    GameObjectScene.prototype.addChild = function (child) {
	        if (child.hasComponent(CameraController)) {
	            this._currentCamera = child;
	        }
	        _super.prototype.addChild.call(this, child);
	        return this;
	    };
	    GameObjectScene.prototype.createTransform = function () {
	        return null;
	    };
	    return GameObjectScene;
	}(EntityObject));

	var Scene = (function (_super) {
	    __extends(Scene, _super);
	    function Scene() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.gameObjectScene = GameObjectScene.create();
	        return _this;
	    }
	    Scene.create = function () {
	        var obj = new this();
	        obj.initWhenCreate();
	        return obj;
	    };
	    Scene.prototype.initWhenCreate = function () {
	        this.name = "Scene" + this.uid;
	    };
	    Scene.prototype.createTransform = function () {
	        return null;
	    };
	    Scene.prototype.addChild = function (child) {
	        if (child instanceof GameObject) {
	            this.gameObjectScene.addChild(child);
	        }
	        child.parent = this;
	        return this;
	    };
	    return Scene;
	}(EntityObject));

	exports.Director = (function () {
	    function Director() {
	        this.renderer = null;
	        this.scene = null;
	    }
	    Director.getInstance = function () { };
	    Director.prototype.initWhenCreate = function () {
	        this.renderer = WebglRenderer.create();
	        this.scene = Scene.create();
	    };
	    Director.prototype.init = function () {
	        this.renderer.init();
	        this.scene.gameObjectScene.init();
	    };
	    Director.prototype.Render = function () {
	        this.scene.gameObjectScene.render(this.renderer);
	        this.renderer.render();
	    };
	    Director.prototype.start = function () {
	        this.init();
	        this.Render();
	    };
	    return Director;
	}());
	exports.Director = __decorate([
	    singleton(true)
	], exports.Director);

	var Main = (function () {
	    function Main() {
	    }
	    Main.setCanvas = function (canvasId, parentId) {
	        this._parentId = parentId;
	        this._canvasId = canvasId;
	        this._config = {
	            alpha: true,
	            depth: true,
	            stencil: false,
	            antialias: true,
	            premultipliedAlpha: true,
	            preserveDrawingBuffer: false
	        };
	        return this;
	    };
	    Main.init = function () {
	        exports.Device.getInstance().createGL(this._canvasId, this._config, this._parentId);
	        exports.Device.getInstance().setScreen();
	        return this;
	    };
	    return Main;
	}());
	Main._parentId = null;

	var ExtendUtils$1 = (function () {
	    function ExtendUtils() {
	    }
	    ExtendUtils.extendDeep = function (parent, child, filter) {
	        if (filter === void 0) { filter = function (val, i) { return true; }; }
	        var i = null, len = 0, toStr = Object.prototype.toString, sArr = "[object Array]", sOb = "[object Object]", type = "", _child = null;
	        if (toStr.call(parent) === sArr) {
	            _child = child || [];
	            for (i = 0, len = parent.length; i < len; i++) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else if (toStr.call(parent) === sOb) {
	            _child = child || {};
	            for (i in parent) {
	                var member = parent[i];
	                if (!filter(member, i)) {
	                    continue;
	                }
	                if (member.clone) {
	                    _child[i] = member.clone();
	                    continue;
	                }
	                type = toStr.call(member);
	                if (type === sArr || type === sOb) {
	                    _child[i] = type === sArr ? [] : {};
	                    ExtendUtils.extendDeep(member, _child[i]);
	                }
	                else {
	                    _child[i] = member;
	                }
	            }
	        }
	        else {
	            _child = parent;
	        }
	        return _child;
	    };
	    ExtendUtils.extend = function (destination, source) {
	        var property = "";
	        for (property in source) {
	            destination[property] = source[property];
	        }
	        return destination;
	    };
	    ExtendUtils.copyPublicAttri = function (source) {
	        var property = null, destination = {};
	        this.extendDeep(source, destination, function (item, property) {
	            return property.slice(0, 1) !== "_"
	                && !JudgeUtils$1.isFunction(item);
	        });
	        return destination;
	    };
	    return ExtendUtils;
	}());

	var Collection$1 = (function (_super) {
	    __extends(Collection, _super);
	    function Collection(children) {
	        if (children === void 0) { children = []; }
	        var _this = _super.call(this) || this;
	        _this.children = children;
	        return _this;
	    }
	    Collection.create = function (children) {
	        if (children === void 0) { children = []; }
	        var obj = new this(children);
	        return obj;
	    };
	    Collection.prototype.clone = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var target = null, isDeep = null;
	        if (args.length === 0) {
	            isDeep = false;
	            target = Collection.create();
	        }
	        else if (args.length === 1) {
	            if (JudgeUtils$1.isBoolean(args[0])) {
	                target = Collection.create();
	                isDeep = args[0];
	            }
	            else {
	                target = args[0];
	                isDeep = false;
	            }
	        }
	        else {
	            target = args[0];
	            isDeep = args[1];
	        }
	        if (isDeep === true) {
	            target.setChildren(ExtendUtils$1.extendDeep(this.children));
	        }
	        else {
	            target.setChildren(ExtendUtils$1.extend([], this.children));
	        }
	        return target;
	    };
	    Collection.prototype.filter = function (func) {
	        var children = this.children, result = [], value = null;
	        for (var i = 0, len = children.length; i < len; i++) {
	            value = children[i];
	            if (func.call(children, value, i)) {
	                result.push(value);
	            }
	        }
	        return Collection.create(result);
	    };
	    Collection.prototype.findOne = function (func) {
	        var scope = this.children, result = null;
	        this.forEach(function (value, index) {
	            if (!func.call(scope, value, index)) {
	                return;
	            }
	            result = value;
	            return $BREAK$1;
	        });
	        return result;
	    };
	    Collection.prototype.reverse = function () {
	        return Collection.create(this.copyChildren().reverse());
	    };
	    Collection.prototype.removeChild = function (arg) {
	        return Collection.create(this.removeChildHelper(arg));
	    };
	    Collection.prototype.sort = function (func, isSortSelf) {
	        if (isSortSelf === void 0) { isSortSelf = false; }
	        if (isSortSelf) {
	            this.children.sort(func);
	            return this;
	        }
	        return Collection.create(this.copyChildren().sort(func));
	    };
	    Collection.prototype.map = function (func) {
	        var resultArr = [];
	        this.forEach(function (e, index) {
	            var result = func(e, index);
	            if (result !== $REMOVE$1) {
	                resultArr.push(result);
	            }
	        });
	        return Collection.create(resultArr);
	    };
	    Collection.prototype.removeRepeatItems = function () {
	        var noRepeatList = Collection.create();
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                return;
	            }
	            noRepeatList.addChild(item);
	        });
	        return noRepeatList;
	    };
	    Collection.prototype.hasRepeatItems = function () {
	        var noRepeatList = Collection.create(), hasRepeat = false;
	        this.forEach(function (item) {
	            if (noRepeatList.hasChild(item)) {
	                hasRepeat = true;
	                return $BREAK$1;
	            }
	            noRepeatList.addChild(item);
	        });
	        return hasRepeat;
	    };
	    return Collection;
	}(List$1));

	var ObjLoader = (function () {
	    function ObjLoader() {
	        this.regexp = {
	            vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
	            normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
	            uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
	            face_pattern: /f\s(.+)/,
	            face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
	            face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
	            face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
	            face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
	            object_pattern: /^[og]\s*(.+)?/,
	            smoothing_pattern: /^s\s+(\d+|on|off)/,
	            material_library_pattern: /^mtllib /,
	            material_use_pattern: /^usemtl /
	        };
	        this.objects = new Collection$1();
	        this.mtlFilePath = null;
	        this.materialName = null;
	        this.name = null;
	        this._vertices = [];
	        this._normals = [];
	        this._texCoords = [];
	        this._currentObject = null;
	    }
	    ObjLoader.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    ObjLoader.prototype.convert = function (result, fileContent, fileName) {
	        this._convertObject(fileContent);
	        var currentObj;
	        var objs = [];
	        this._buildPrimitiveArr().forEach(function (item) {
	            if (item.material == void 0) {
	                currentObj = {
	                    attribute: item.attributes,
	                    material: []
	                };
	                objs.push(currentObj);
	            }
	            else {
	                currentObj.material.push(item);
	            }
	        });
	        result.objs = objs;
	        return result;
	    };
	    ObjLoader.prototype._buildPrimitiveArr = function () {
	        var me = this, arr = [];
	        this.objects.forEach(function (objectModel) {
	            arr.push({
	                name: objectModel.name,
	                attributes: {
	                    POSITION: me._vertices,
	                    TEXCOORD: me._texCoords,
	                    NORMAL: me._normals
	                },
	                verticeIndices: objectModel.verticeIndices,
	                normalIndices: objectModel.normalIndices,
	                texCoordIndices: objectModel.texCoordIndices,
	                material: objectModel.materialName,
	                mode: 4
	            });
	        });
	        return arr;
	    };
	    ObjLoader.prototype._convertObject = function (fileContent) {
	        if (fileContent.indexOf('\r\n') !== -1) {
	            fileContent = fileContent.replace(/\r\n/g, '\n');
	        }
	        if (fileContent.indexOf('\\\n') !== -1) {
	            fileContent = fileContent.replace(/\\\n/g, "");
	        }
	        var res = fileContent.split("\n"), result = [];
	        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
	            var line = res_1[_i];
	            line = line.trim();
	            var lineFirst = line.charAt(0);
	            if (lineFirst === "#" || lineFirst == '')
	                continue;
	            if (lineFirst === 'v') {
	                var lineSecond = line.charAt(1);
	                if (lineSecond === ' ' && (result = this.regexp.vertex_pattern.exec(line)) !== null) {
	                    this._vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
	                }
	                else if (lineSecond === "n" && (result = this.regexp.normal_pattern.exec(line)) !== null) {
	                    this._normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
	                }
	                else if (lineSecond === "t" && (result = this.regexp.uv_pattern.exec(line)) !== null) {
	                    this._texCoords.push(parseFloat(result[1]), parseFloat(result[2]));
	                }
	                else {
	                    throw new Error("Unexpected vertex/normal/uv line: '" + line + "'");
	                }
	            }
	            else if (lineFirst === "f") {
	                this._convertFace(line);
	            }
	            else if ((result = this.regexp.object_pattern.exec(line)) !== null) {
	                this._currentObject = ObjectModel.create();
	                this._currentObject.name = result[1];
	                this.objects.addChild(this._currentObject);
	            }
	            else if (this.regexp.material_use_pattern.test(line)) {
	                this.convertUsemtl(line);
	            }
	            else if (this.regexp.material_library_pattern.test(line)) {
	                this.mtlFilePath = line.substring(7).trim();
	            }
	            else if ((result = this.regexp.smoothing_pattern.exec(line)) !== null) {
	            }
	            else {
	                console.log("Unexpected line: '" + line + "'");
	            }
	        }
	    };
	    ObjLoader.prototype.convertUsemtl = function (line) {
	        var materialName = line.substring(7).trim();
	        var objName = this._getObjectNameWithMultMaterialOfSingleObj(materialName);
	        this._currentObject = ObjectModel.create();
	        this._currentObject.name = objName;
	        this.objects.addChild(this._currentObject);
	        this._currentObject.materialName = materialName;
	    };
	    ObjLoader.prototype._getObjectNameWithMultMaterialOfSingleObj = function (materialName) {
	        if (this._currentObject) {
	            return this._currentObject.name + "_" + materialName;
	        }
	        return materialName;
	    };
	    ObjLoader.prototype._convertFace = function (lines) {
	        var lineResult = this.regexp.face_pattern.exec(lines);
	        var face = lineResult[1].trim().split(" "), line = lineResult[0], triangles = [], result = null, k = null, verticeIndices = [], normalIndices = [], texCoordIndices = [];
	        if (!this._currentObject) {
	            this._currentObject = ObjectModel.create();
	            this.objects.addChild(this._currentObject);
	        }
	        if (face.length < 3)
	            return;
	        verticeIndices = this._currentObject.verticeIndices;
	        normalIndices = this._currentObject.normalIndices;
	        texCoordIndices = this._currentObject.texCoordIndices;
	        this._getTriangles(face, triangles);
	        if ((result = this.regexp.face_vertex_uv_normal.exec(line)) !== null) {
	            for (var _i = 0, triangles_1 = triangles; _i < triangles_1.length; _i++) {
	                k = triangles_1[_i];
	                var point = k.split("/");
	                verticeIndices.push(parseInt(point[0]) - 1);
	                texCoordIndices.push(parseInt(point[1]) - 1);
	                normalIndices.push(parseInt(point[2]) - 1);
	            }
	        }
	        else if ((result = this.regexp.face_vertex_uv.exec(line)) !== null) {
	            for (var _a = 0, triangles_2 = triangles; _a < triangles_2.length; _a++) {
	                k = triangles_2[_a];
	                var point = k.split("/");
	                verticeIndices.push(~~(point[0]) - 1);
	                texCoordIndices.push(~~(point[1]) - 1);
	            }
	        }
	        else if ((result = this.regexp.face_vertex_normal.exec(line)) !== null) {
	            for (var _b = 0, triangles_3 = triangles; _b < triangles_3.length; _b++) {
	                k = triangles_3[_b];
	                var point = k.split("//");
	                verticeIndices.push(parseInt(point[0]) - 1);
	                normalIndices.push(parseInt(point[1]) - 1);
	            }
	        }
	        else if ((result = this.regexp.face_vertex.exec(line)) !== null) {
	            for (var _c = 0, triangles_4 = triangles; _c < triangles_4.length; _c++) {
	                k = triangles_4[_c];
	                verticeIndices.push(~~(k) - 1);
	            }
	        }
	        else {
	            console.log("this line is error: " + lineResult);
	        }
	    };
	    ObjLoader.prototype._getTriangles = function (face, triangles) {
	        var getTriangles = function (v) {
	            if (v + 1 < face.length) {
	                triangles.push(face[0], face[v], face[v + 1]);
	                v++;
	                getTriangles(v);
	            }
	        };
	        getTriangles(1);
	    };
	    return ObjLoader;
	}());
	var ObjectModel = (function () {
	    function ObjectModel() {
	        this.vertices = [];
	        this.normals = [];
	        this.texCoords = [];
	        this.verticeIndices = [];
	        this.normalIndices = [];
	        this.texCoordIndices = [];
	        this.materialName = null;
	        this.name = null;
	        this.indicesCount = 0;
	    }
	    ObjectModel.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    return ObjectModel;
	}());

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}



	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	// CommonJS / Node have global context exposed as "global" variable.
	// We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
	// the global "global" var for now.
	var __window = typeof window !== 'undefined' && window;
	var __self = typeof self !== 'undefined' && typeof WorkerGlobalScope !== 'undefined' &&
	    self instanceof WorkerGlobalScope && self;
	var __global = typeof commonjsGlobal !== 'undefined' && commonjsGlobal;
	var _root = __window || __global || __self;
	var root_1$1 = _root;
	// Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
	// This is needed when used with angular/tsickle which inserts a goog.module statement.
	// Wrap in IIFE
	(function () {
	    if (!_root) {
	        throw new Error('RxJS could not find any global context (window, self, global)');
	    }
	})();


	var root$1 = {
		root: root_1$1
	};

	function isFunction(x) {
	    return typeof x === 'function';
	}
	var isFunction_2 = isFunction;


	var isFunction_1$1 = {
		isFunction: isFunction_2
	};

	var isArray_1$1 = Array.isArray || (function (x) { return x && typeof x.length === 'number'; });


	var isArray = {
		isArray: isArray_1$1
	};

	function isObject(x) {
	    return x != null && typeof x === 'object';
	}
	var isObject_2 = isObject;


	var isObject_1$1 = {
		isObject: isObject_2
	};

	// typeof any so that it we don't have to cast when comparing a result to the error object
	var errorObject_1$2 = { e: {} };


	var errorObject = {
		errorObject: errorObject_1$2
	};

	var errorObject_1$1 = errorObject;
	var tryCatchTarget;
	function tryCatcher() {
	    try {
	        return tryCatchTarget.apply(this, arguments);
	    }
	    catch (e) {
	        errorObject_1$1.errorObject.e = e;
	        return errorObject_1$1.errorObject;
	    }
	}
	function tryCatch(fn) {
	    tryCatchTarget = fn;
	    return tryCatcher;
	}
	var tryCatch_2 = tryCatch;



	var tryCatch_1$1 = {
		tryCatch: tryCatch_2
	};

	var __extends$3 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when one or more errors have occurred during the
	 * `unsubscribe` of a {@link Subscription}.
	 */
	var UnsubscriptionError$1 = (function (_super) {
	    __extends$3(UnsubscriptionError, _super);
	    function UnsubscriptionError(errors) {
	        _super.call(this);
	        this.errors = errors;
	        var err = Error.call(this, errors ?
	            errors.length + " errors occurred during unsubscription:\n  " + errors.map(function (err, i) { return ((i + 1) + ") " + err.toString()); }).join('\n  ') : '');
	        this.name = err.name = 'UnsubscriptionError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return UnsubscriptionError;
	}(Error));
	var UnsubscriptionError_2 = UnsubscriptionError$1;


	var UnsubscriptionError_1$2 = {
		UnsubscriptionError: UnsubscriptionError_2
	};

	var isArray_1 = isArray;
	var isObject_1 = isObject_1$1;
	var isFunction_1$3 = isFunction_1$1;
	var tryCatch_1 = tryCatch_1$1;
	var errorObject_1 = errorObject;
	var UnsubscriptionError_1$1 = UnsubscriptionError_1$2;
	/**
	 * Represents a disposable resource, such as the execution of an Observable. A
	 * Subscription has one important method, `unsubscribe`, that takes no argument
	 * and just disposes the resource held by the subscription.
	 *
	 * Additionally, subscriptions may be grouped together through the `add()`
	 * method, which will attach a child Subscription to the current Subscription.
	 * When a Subscription is unsubscribed, all its children (and its grandchildren)
	 * will be unsubscribed as well.
	 *
	 * @class Subscription
	 */
	var Subscription$1 = (function () {
	    /**
	     * @param {function(): void} [unsubscribe] A function describing how to
	     * perform the disposal of resources when the `unsubscribe` method is called.
	     */
	    function Subscription(unsubscribe) {
	        /**
	         * A flag to indicate whether this Subscription has already been unsubscribed.
	         * @type {boolean}
	         */
	        this.closed = false;
	        this._parent = null;
	        this._parents = null;
	        this._subscriptions = null;
	        if (unsubscribe) {
	            this._unsubscribe = unsubscribe;
	        }
	    }
	    /**
	     * Disposes the resources held by the subscription. May, for instance, cancel
	     * an ongoing Observable execution or cancel any other type of work that
	     * started when the Subscription was created.
	     * @return {void}
	     */
	    Subscription.prototype.unsubscribe = function () {
	        var hasErrors = false;
	        var errors;
	        if (this.closed) {
	            return;
	        }
	        var _a = this, _parent = _a._parent, _parents = _a._parents, _unsubscribe = _a._unsubscribe, _subscriptions = _a._subscriptions;
	        this.closed = true;
	        this._parent = null;
	        this._parents = null;
	        // null out _subscriptions first so any child subscriptions that attempt
	        // to remove themselves from this subscription will noop
	        this._subscriptions = null;
	        var index = -1;
	        var len = _parents ? _parents.length : 0;
	        // if this._parent is null, then so is this._parents, and we
	        // don't have to remove ourselves from any parent subscriptions.
	        while (_parent) {
	            _parent.remove(this);
	            // if this._parents is null or index >= len,
	            // then _parent is set to null, and the loop exits
	            _parent = ++index < len && _parents[index] || null;
	        }
	        if (isFunction_1$3.isFunction(_unsubscribe)) {
	            var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
	            if (trial === errorObject_1.errorObject) {
	                hasErrors = true;
	                errors = errors || (errorObject_1.errorObject.e instanceof UnsubscriptionError_1$1.UnsubscriptionError ?
	                    flattenUnsubscriptionErrors(errorObject_1.errorObject.e.errors) : [errorObject_1.errorObject.e]);
	            }
	        }
	        if (isArray_1.isArray(_subscriptions)) {
	            index = -1;
	            len = _subscriptions.length;
	            while (++index < len) {
	                var sub = _subscriptions[index];
	                if (isObject_1.isObject(sub)) {
	                    var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
	                    if (trial === errorObject_1.errorObject) {
	                        hasErrors = true;
	                        errors = errors || [];
	                        var err = errorObject_1.errorObject.e;
	                        if (err instanceof UnsubscriptionError_1$1.UnsubscriptionError) {
	                            errors = errors.concat(flattenUnsubscriptionErrors(err.errors));
	                        }
	                        else {
	                            errors.push(err);
	                        }
	                    }
	                }
	            }
	        }
	        if (hasErrors) {
	            throw new UnsubscriptionError_1$1.UnsubscriptionError(errors);
	        }
	    };
	    /**
	     * Adds a tear down to be called during the unsubscribe() of this
	     * Subscription.
	     *
	     * If the tear down being added is a subscription that is already
	     * unsubscribed, is the same reference `add` is being called on, or is
	     * `Subscription.EMPTY`, it will not be added.
	     *
	     * If this subscription is already in an `closed` state, the passed
	     * tear down logic will be executed immediately.
	     *
	     * @param {TeardownLogic} teardown The additional logic to execute on
	     * teardown.
	     * @return {Subscription} Returns the Subscription used or created to be
	     * added to the inner subscriptions list. This Subscription can be used with
	     * `remove()` to remove the passed teardown logic from the inner subscriptions
	     * list.
	     */
	    Subscription.prototype.add = function (teardown) {
	        if (!teardown || (teardown === Subscription.EMPTY)) {
	            return Subscription.EMPTY;
	        }
	        if (teardown === this) {
	            return this;
	        }
	        var subscription = teardown;
	        switch (typeof teardown) {
	            case 'function':
	                subscription = new Subscription(teardown);
	            case 'object':
	                if (subscription.closed || typeof subscription.unsubscribe !== 'function') {
	                    return subscription;
	                }
	                else if (this.closed) {
	                    subscription.unsubscribe();
	                    return subscription;
	                }
	                else if (typeof subscription._addParent !== 'function' /* quack quack */) {
	                    var tmp = subscription;
	                    subscription = new Subscription();
	                    subscription._subscriptions = [tmp];
	                }
	                break;
	            default:
	                throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
	        }
	        var subscriptions = this._subscriptions || (this._subscriptions = []);
	        subscriptions.push(subscription);
	        subscription._addParent(this);
	        return subscription;
	    };
	    /**
	     * Removes a Subscription from the internal list of subscriptions that will
	     * unsubscribe during the unsubscribe process of this Subscription.
	     * @param {Subscription} subscription The subscription to remove.
	     * @return {void}
	     */
	    Subscription.prototype.remove = function (subscription) {
	        var subscriptions = this._subscriptions;
	        if (subscriptions) {
	            var subscriptionIndex = subscriptions.indexOf(subscription);
	            if (subscriptionIndex !== -1) {
	                subscriptions.splice(subscriptionIndex, 1);
	            }
	        }
	    };
	    Subscription.prototype._addParent = function (parent) {
	        var _a = this, _parent = _a._parent, _parents = _a._parents;
	        if (!_parent || _parent === parent) {
	            // If we don't have a parent, or the new parent is the same as the
	            // current parent, then set this._parent to the new parent.
	            this._parent = parent;
	        }
	        else if (!_parents) {
	            // If there's already one parent, but not multiple, allocate an Array to
	            // store the rest of the parent Subscriptions.
	            this._parents = [parent];
	        }
	        else if (_parents.indexOf(parent) === -1) {
	            // Only add the new parent to the _parents list if it's not already there.
	            _parents.push(parent);
	        }
	    };
	    Subscription.EMPTY = (function (empty) {
	        empty.closed = true;
	        return empty;
	    }(new Subscription()));
	    return Subscription;
	}());
	var Subscription_2 = Subscription$1;
	function flattenUnsubscriptionErrors(errors) {
	    return errors.reduce(function (errs, err) { return errs.concat((err instanceof UnsubscriptionError_1$1.UnsubscriptionError) ? err.errors : err); }, []);
	}


	var Subscription_1$3 = {
		Subscription: Subscription_2
	};

	var empty = {
	    closed: true,
	    next: function (value) { },
	    error: function (err) { throw err; },
	    complete: function () { }
	};


	var Observer = {
		empty: empty
	};

	var rxSubscriber = createCommonjsModule(function (module, exports) {
	"use strict";
	var root_1 = root$1;
	var Symbol = root_1.root.Symbol;
	exports.rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ?
	    Symbol.for('rxSubscriber') : '@@rxSubscriber';
	/**
	 * @deprecated use rxSubscriber instead
	 */
	exports.$$rxSubscriber = exports.rxSubscriber;

	});

	var __extends$2 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1 = isFunction_1$1;
	var Subscription_1$2 = Subscription_1$3;
	var Observer_1$1 = Observer;
	var rxSubscriber_1$3 = rxSubscriber;
	/**
	 * Implements the {@link Observer} interface and extends the
	 * {@link Subscription} class. While the {@link Observer} is the public API for
	 * consuming the values of an {@link Observable}, all Observers get converted to
	 * a Subscriber, in order to provide Subscription-like capabilities such as
	 * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
	 * implementing operators, but it is rarely used as a public API.
	 *
	 * @class Subscriber<T>
	 */
	var Subscriber$1 = (function (_super) {
	    __extends$2(Subscriber, _super);
	    /**
	     * @param {Observer|function(value: T): void} [destinationOrNext] A partially
	     * defined Observer or a `next` callback function.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     */
	    function Subscriber(destinationOrNext, error, complete) {
	        _super.call(this);
	        this.syncErrorValue = null;
	        this.syncErrorThrown = false;
	        this.syncErrorThrowable = false;
	        this.isStopped = false;
	        switch (arguments.length) {
	            case 0:
	                this.destination = Observer_1$1.empty;
	                break;
	            case 1:
	                if (!destinationOrNext) {
	                    this.destination = Observer_1$1.empty;
	                    break;
	                }
	                if (typeof destinationOrNext === 'object') {
	                    if (destinationOrNext instanceof Subscriber) {
	                        this.destination = destinationOrNext;
	                        this.destination.add(this);
	                    }
	                    else {
	                        this.syncErrorThrowable = true;
	                        this.destination = new SafeSubscriber(this, destinationOrNext);
	                    }
	                    break;
	                }
	            default:
	                this.syncErrorThrowable = true;
	                this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
	                break;
	        }
	    }
	    Subscriber.prototype[rxSubscriber_1$3.rxSubscriber] = function () { return this; };
	    /**
	     * A static factory for a Subscriber, given a (potentially partial) definition
	     * of an Observer.
	     * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
	     * @param {function(e: ?any): void} [error] The `error` callback of an
	     * Observer.
	     * @param {function(): void} [complete] The `complete` callback of an
	     * Observer.
	     * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
	     * Observer represented by the given arguments.
	     */
	    Subscriber.create = function (next, error, complete) {
	        var subscriber = new Subscriber(next, error, complete);
	        subscriber.syncErrorThrowable = false;
	        return subscriber;
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `next` from
	     * the Observable, with a value. The Observable may call this method 0 or more
	     * times.
	     * @param {T} [value] The `next` value.
	     * @return {void}
	     */
	    Subscriber.prototype.next = function (value) {
	        if (!this.isStopped) {
	            this._next(value);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive notifications of type `error` from
	     * the Observable, with an attached {@link Error}. Notifies the Observer that
	     * the Observable has experienced an error condition.
	     * @param {any} [err] The `error` exception.
	     * @return {void}
	     */
	    Subscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._error(err);
	        }
	    };
	    /**
	     * The {@link Observer} callback to receive a valueless notification of type
	     * `complete` from the Observable. Notifies the Observer that the Observable
	     * has finished sending push-based notifications.
	     * @return {void}
	     */
	    Subscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            this.isStopped = true;
	            this._complete();
	        }
	    };
	    Subscriber.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.isStopped = true;
	        _super.prototype.unsubscribe.call(this);
	    };
	    Subscriber.prototype._next = function (value) {
	        this.destination.next(value);
	    };
	    Subscriber.prototype._error = function (err) {
	        this.destination.error(err);
	        this.unsubscribe();
	    };
	    Subscriber.prototype._complete = function () {
	        this.destination.complete();
	        this.unsubscribe();
	    };
	    Subscriber.prototype._unsubscribeAndRecycle = function () {
	        var _a = this, _parent = _a._parent, _parents = _a._parents;
	        this._parent = null;
	        this._parents = null;
	        this.unsubscribe();
	        this.closed = false;
	        this.isStopped = false;
	        this._parent = _parent;
	        this._parents = _parents;
	        return this;
	    };
	    return Subscriber;
	}(Subscription_1$2.Subscription));
	var Subscriber_2 = Subscriber$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SafeSubscriber = (function (_super) {
	    __extends$2(SafeSubscriber, _super);
	    function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
	        _super.call(this);
	        this._parentSubscriber = _parentSubscriber;
	        var next;
	        var context = this;
	        if (isFunction_1.isFunction(observerOrNext)) {
	            next = observerOrNext;
	        }
	        else if (observerOrNext) {
	            next = observerOrNext.next;
	            error = observerOrNext.error;
	            complete = observerOrNext.complete;
	            if (observerOrNext !== Observer_1$1.empty) {
	                context = Object.create(observerOrNext);
	                if (isFunction_1.isFunction(context.unsubscribe)) {
	                    this.add(context.unsubscribe.bind(context));
	                }
	                context.unsubscribe = this.unsubscribe.bind(this);
	            }
	        }
	        this._context = context;
	        this._next = next;
	        this._error = error;
	        this._complete = complete;
	    }
	    SafeSubscriber.prototype.next = function (value) {
	        if (!this.isStopped && this._next) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (!_parentSubscriber.syncErrorThrowable) {
	                this.__tryOrUnsub(this._next, value);
	            }
	            else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (this._error) {
	                if (!_parentSubscriber.syncErrorThrowable) {
	                    this.__tryOrUnsub(this._error, err);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parentSubscriber, this._error, err);
	                    this.unsubscribe();
	                }
	            }
	            else if (!_parentSubscriber.syncErrorThrowable) {
	                this.unsubscribe();
	                throw err;
	            }
	            else {
	                _parentSubscriber.syncErrorValue = err;
	                _parentSubscriber.syncErrorThrown = true;
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.complete = function () {
	        var _this = this;
	        if (!this.isStopped) {
	            var _parentSubscriber = this._parentSubscriber;
	            if (this._complete) {
	                var wrappedComplete = function () { return _this._complete.call(_this._context); };
	                if (!_parentSubscriber.syncErrorThrowable) {
	                    this.__tryOrUnsub(wrappedComplete);
	                    this.unsubscribe();
	                }
	                else {
	                    this.__tryOrSetError(_parentSubscriber, wrappedComplete);
	                    this.unsubscribe();
	                }
	            }
	            else {
	                this.unsubscribe();
	            }
	        }
	    };
	    SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            this.unsubscribe();
	            throw err;
	        }
	    };
	    SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
	        try {
	            fn.call(this._context, value);
	        }
	        catch (err) {
	            parent.syncErrorValue = err;
	            parent.syncErrorThrown = true;
	            return true;
	        }
	        return false;
	    };
	    SafeSubscriber.prototype._unsubscribe = function () {
	        var _parentSubscriber = this._parentSubscriber;
	        this._context = null;
	        this._parentSubscriber = null;
	        _parentSubscriber.unsubscribe();
	    };
	    return SafeSubscriber;
	}(Subscriber$1));


	var Subscriber_1$3 = {
		Subscriber: Subscriber_2
	};

	var Subscriber_1$2 = Subscriber_1$3;
	var rxSubscriber_1$2 = rxSubscriber;
	var Observer_1 = Observer;
	function toSubscriber(nextOrObserver, error, complete) {
	    if (nextOrObserver) {
	        if (nextOrObserver instanceof Subscriber_1$2.Subscriber) {
	            return nextOrObserver;
	        }
	        if (nextOrObserver[rxSubscriber_1$2.rxSubscriber]) {
	            return nextOrObserver[rxSubscriber_1$2.rxSubscriber]();
	        }
	    }
	    if (!nextOrObserver && !error && !complete) {
	        return new Subscriber_1$2.Subscriber(Observer_1.empty);
	    }
	    return new Subscriber_1$2.Subscriber(nextOrObserver, error, complete);
	}
	var toSubscriber_2 = toSubscriber;


	var toSubscriber_1$1 = {
		toSubscriber: toSubscriber_2
	};

	var observable = createCommonjsModule(function (module, exports) {
	"use strict";
	var root_1 = root$1;
	function getSymbolObservable(context) {
	    var $$observable;
	    var Symbol = context.Symbol;
	    if (typeof Symbol === 'function') {
	        if (Symbol.observable) {
	            $$observable = Symbol.observable;
	        }
	        else {
	            $$observable = Symbol('observable');
	            Symbol.observable = $$observable;
	        }
	    }
	    else {
	        $$observable = '@@observable';
	    }
	    return $$observable;
	}
	exports.getSymbolObservable = getSymbolObservable;
	exports.observable = getSymbolObservable(root_1.root);
	/**
	 * @deprecated use observable instead
	 */
	exports.$$observable = exports.observable;

	});

	var root_1 = root$1;
	var toSubscriber_1 = toSubscriber_1$1;
	var observable_1$1 = observable;
	/**
	 * A representation of any set of values over any amount of time. This the most basic building block
	 * of RxJS.
	 *
	 * @class Observable<T>
	 */
	var Observable$1 = (function () {
	    /**
	     * @constructor
	     * @param {Function} subscribe the function that is  called when the Observable is
	     * initially subscribed to. This function is given a Subscriber, to which new values
	     * can be `next`ed, or an `error` method can be called to raise an error, or
	     * `complete` can be called to notify of a successful completion.
	     */
	    function Observable(subscribe) {
	        this._isScalar = false;
	        if (subscribe) {
	            this._subscribe = subscribe;
	        }
	    }
	    /**
	     * Creates a new Observable, with this Observable as the source, and the passed
	     * operator defined as the new observable's operator.
	     * @method lift
	     * @param {Operator} operator the operator defining the operation to take on the observable
	     * @return {Observable} a new observable with the Operator applied
	     */
	    Observable.prototype.lift = function (operator) {
	        var observable$$1 = new Observable();
	        observable$$1.source = this;
	        observable$$1.operator = operator;
	        return observable$$1;
	    };
	    /**
	     * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
	     *
	     * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
	     *
	     * `subscribe` is not a regular operator, but a method that calls Observables internal `subscribe` function. It
	     * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
	     * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
	     * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
	     * thought.
	     *
	     * Apart from starting the execution of an Observable, this method allows you to listen for values
	     * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
	     * following ways.
	     *
	     * The first way is creating an object that implements {@link Observer} interface. It should have methods
	     * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
	     * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
	     * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
	     * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
	     * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
	     * be left uncaught.
	     *
	     * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
	     * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
	     * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
	     * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
	     * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
	     * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
	     *
	     * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
	     * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
	     * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
	     * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
	     *
	     * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
	     * It is an Observable itself that decides when these functions will be called. For example {@link of}
	     * by default emits all its values synchronously. Always check documentation for how given Observable
	     * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
	     *
	     * @example <caption>Subscribe with an Observer</caption>
	     * const sumObserver = {
	     *   sum: 0,
	     *   next(value) {
	     *     console.log('Adding: ' + value);
	     *     this.sum = this.sum + value;
	     *   },
	     *   error() { // We actually could just remote this method,
	     *   },        // since we do not really care about errors right now.
	     *   complete() {
	     *     console.log('Sum equals: ' + this.sum);
	     *   }
	     * };
	     *
	     * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
	     * .subscribe(sumObserver);
	     *
	     * // Logs:
	     * // "Adding: 1"
	     * // "Adding: 2"
	     * // "Adding: 3"
	     * // "Sum equals: 6"
	     *
	     *
	     * @example <caption>Subscribe with functions</caption>
	     * let sum = 0;
	     *
	     * Rx.Observable.of(1, 2, 3)
	     * .subscribe(
	     *   function(value) {
	     *     console.log('Adding: ' + value);
	     *     sum = sum + value;
	     *   },
	     *   undefined,
	     *   function() {
	     *     console.log('Sum equals: ' + sum);
	     *   }
	     * );
	     *
	     * // Logs:
	     * // "Adding: 1"
	     * // "Adding: 2"
	     * // "Adding: 3"
	     * // "Sum equals: 6"
	     *
	     *
	     * @example <caption>Cancel a subscription</caption>
	     * const subscription = Rx.Observable.interval(1000).subscribe(
	     *   num => console.log(num),
	     *   undefined,
	     *   () => console.log('completed!') // Will not be called, even
	     * );                                // when cancelling subscription
	     *
	     *
	     * setTimeout(() => {
	     *   subscription.unsubscribe();
	     *   console.log('unsubscribed!');
	     * }, 2500);
	     *
	     * // Logs:
	     * // 0 after 1s
	     * // 1 after 2s
	     * // "unsubscribed!" after 2,5s
	     *
	     *
	     * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
	     *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
	     *  Observable.
	     * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
	     *  the error will be thrown as unhandled.
	     * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
	     * @return {ISubscription} a subscription reference to the registered handlers
	     * @method subscribe
	     */
	    Observable.prototype.subscribe = function (observerOrNext, error, complete) {
	        var operator = this.operator;
	        var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
	        if (operator) {
	            operator.call(sink, this.source);
	        }
	        else {
	            sink.add(this.source ? this._subscribe(sink) : this._trySubscribe(sink));
	        }
	        if (sink.syncErrorThrowable) {
	            sink.syncErrorThrowable = false;
	            if (sink.syncErrorThrown) {
	                throw sink.syncErrorValue;
	            }
	        }
	        return sink;
	    };
	    Observable.prototype._trySubscribe = function (sink) {
	        try {
	            return this._subscribe(sink);
	        }
	        catch (err) {
	            sink.syncErrorThrown = true;
	            sink.syncErrorValue = err;
	            sink.error(err);
	        }
	    };
	    /**
	     * @method forEach
	     * @param {Function} next a handler for each value emitted by the observable
	     * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
	     * @return {Promise} a promise that either resolves on observable completion or
	     *  rejects with the handled error
	     */
	    Observable.prototype.forEach = function (next, PromiseCtor) {
	        var _this = this;
	        if (!PromiseCtor) {
	            if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
	                PromiseCtor = root_1.root.Rx.config.Promise;
	            }
	            else if (root_1.root.Promise) {
	                PromiseCtor = root_1.root.Promise;
	            }
	        }
	        if (!PromiseCtor) {
	            throw new Error('no Promise impl found');
	        }
	        return new PromiseCtor(function (resolve, reject) {
	            // Must be declared in a separate statement to avoid a RefernceError when
	            // accessing subscription below in the closure due to Temporal Dead Zone.
	            var subscription;
	            subscription = _this.subscribe(function (value) {
	                if (subscription) {
	                    // if there is a subscription, then we can surmise
	                    // the next handling is asynchronous. Any errors thrown
	                    // need to be rejected explicitly and unsubscribe must be
	                    // called manually
	                    try {
	                        next(value);
	                    }
	                    catch (err) {
	                        reject(err);
	                        subscription.unsubscribe();
	                    }
	                }
	                else {
	                    // if there is NO subscription, then we're getting a nexted
	                    // value synchronously during subscription. We can just call it.
	                    // If it errors, Observable's `subscribe` will ensure the
	                    // unsubscription logic is called, then synchronously rethrow the error.
	                    // After that, Promise will trap the error and send it
	                    // down the rejection path.
	                    next(value);
	                }
	            }, reject, resolve);
	        });
	    };
	    Observable.prototype._subscribe = function (subscriber) {
	        return this.source.subscribe(subscriber);
	    };
	    /**
	     * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
	     * @method Symbol.observable
	     * @return {Observable} this instance of the observable
	     */
	    Observable.prototype[observable_1$1.observable] = function () {
	        return this;
	    };
	    // HACK: Since TypeScript inherits static properties too, we have to
	    // fight against TypeScript here so Subject can have a different static create signature
	    /**
	     * Creates a new cold Observable by calling the Observable constructor
	     * @static true
	     * @owner Observable
	     * @method create
	     * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
	     * @return {Observable} a new cold observable
	     */
	    Observable.create = function (subscribe) {
	        return new Observable(subscribe);
	    };
	    return Observable;
	}());
	var Observable_2 = Observable$1;


	var Observable_1$2 = {
		Observable: Observable_2
	};

	var __extends$4 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an action is invalid because the object has been
	 * unsubscribed.
	 *
	 * @see {@link Subject}
	 * @see {@link BehaviorSubject}
	 *
	 * @class ObjectUnsubscribedError
	 */
	var ObjectUnsubscribedError$1 = (function (_super) {
	    __extends$4(ObjectUnsubscribedError, _super);
	    function ObjectUnsubscribedError() {
	        var err = _super.call(this, 'object unsubscribed');
	        this.name = err.name = 'ObjectUnsubscribedError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ObjectUnsubscribedError;
	}(Error));
	var ObjectUnsubscribedError_2 = ObjectUnsubscribedError$1;


	var ObjectUnsubscribedError_1$2 = {
		ObjectUnsubscribedError: ObjectUnsubscribedError_2
	};

	var __extends$5 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1$5 = Subscription_1$3;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubjectSubscription = (function (_super) {
	    __extends$5(SubjectSubscription, _super);
	    function SubjectSubscription(subject, subscriber) {
	        _super.call(this);
	        this.subject = subject;
	        this.subscriber = subscriber;
	        this.closed = false;
	    }
	    SubjectSubscription.prototype.unsubscribe = function () {
	        if (this.closed) {
	            return;
	        }
	        this.closed = true;
	        var subject = this.subject;
	        var observers = subject.observers;
	        this.subject = null;
	        if (!observers || observers.length === 0 || subject.isStopped || subject.closed) {
	            return;
	        }
	        var subscriberIndex = observers.indexOf(this.subscriber);
	        if (subscriberIndex !== -1) {
	            observers.splice(subscriberIndex, 1);
	        }
	    };
	    return SubjectSubscription;
	}(Subscription_1$5.Subscription));
	var SubjectSubscription_2 = SubjectSubscription;


	var SubjectSubscription_1$1 = {
		SubjectSubscription: SubjectSubscription_2
	};

	var __extends$1 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$1 = Observable_1$2;
	var Subscriber_1$1 = Subscriber_1$3;
	var Subscription_1$1 = Subscription_1$3;
	var ObjectUnsubscribedError_1$1 = ObjectUnsubscribedError_1$2;
	var SubjectSubscription_1 = SubjectSubscription_1$1;
	var rxSubscriber_1$1 = rxSubscriber;
	/**
	 * @class SubjectSubscriber<T>
	 */
	var SubjectSubscriber = (function (_super) {
	    __extends$1(SubjectSubscriber, _super);
	    function SubjectSubscriber(destination) {
	        _super.call(this, destination);
	        this.destination = destination;
	    }
	    return SubjectSubscriber;
	}(Subscriber_1$1.Subscriber));
	var SubjectSubscriber_1 = SubjectSubscriber;
	/**
	 * @class Subject<T>
	 */
	var Subject$1 = (function (_super) {
	    __extends$1(Subject, _super);
	    function Subject() {
	        _super.call(this);
	        this.observers = [];
	        this.closed = false;
	        this.isStopped = false;
	        this.hasError = false;
	        this.thrownError = null;
	    }
	    Subject.prototype[rxSubscriber_1$1.rxSubscriber] = function () {
	        return new SubjectSubscriber(this);
	    };
	    Subject.prototype.lift = function (operator) {
	        var subject = new AnonymousSubject$1(this, this);
	        subject.operator = operator;
	        return subject;
	    };
	    Subject.prototype.next = function (value) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
	        }
	        if (!this.isStopped) {
	            var observers = this.observers;
	            var len = observers.length;
	            var copy = observers.slice();
	            for (var i = 0; i < len; i++) {
	                copy[i].next(value);
	            }
	        }
	    };
	    Subject.prototype.error = function (err) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
	        }
	        this.hasError = true;
	        this.thrownError = err;
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].error(err);
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.complete = function () {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
	        }
	        this.isStopped = true;
	        var observers = this.observers;
	        var len = observers.length;
	        var copy = observers.slice();
	        for (var i = 0; i < len; i++) {
	            copy[i].complete();
	        }
	        this.observers.length = 0;
	    };
	    Subject.prototype.unsubscribe = function () {
	        this.isStopped = true;
	        this.closed = true;
	        this.observers = null;
	    };
	    Subject.prototype._trySubscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
	        }
	        else {
	            return _super.prototype._trySubscribe.call(this, subscriber);
	        }
	    };
	    Subject.prototype._subscribe = function (subscriber) {
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$1.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1$1.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	            return Subscription_1$1.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            return new SubjectSubscription_1.SubjectSubscription(this, subscriber);
	        }
	    };
	    Subject.prototype.asObservable = function () {
	        var observable = new Observable_1$1.Observable();
	        observable.source = this;
	        return observable;
	    };
	    Subject.create = function (destination, source) {
	        return new AnonymousSubject$1(destination, source);
	    };
	    return Subject;
	}(Observable_1$1.Observable));
	var Subject_2 = Subject$1;
	/**
	 * @class AnonymousSubject<T>
	 */
	var AnonymousSubject$1 = (function (_super) {
	    __extends$1(AnonymousSubject, _super);
	    function AnonymousSubject(destination, source) {
	        _super.call(this);
	        this.destination = destination;
	        this.source = source;
	    }
	    AnonymousSubject.prototype.next = function (value) {
	        var destination = this.destination;
	        if (destination && destination.next) {
	            destination.next(value);
	        }
	    };
	    AnonymousSubject.prototype.error = function (err) {
	        var destination = this.destination;
	        if (destination && destination.error) {
	            this.destination.error(err);
	        }
	    };
	    AnonymousSubject.prototype.complete = function () {
	        var destination = this.destination;
	        if (destination && destination.complete) {
	            this.destination.complete();
	        }
	    };
	    AnonymousSubject.prototype._subscribe = function (subscriber) {
	        var source = this.source;
	        if (source) {
	            return this.source.subscribe(subscriber);
	        }
	        else {
	            return Subscription_1$1.Subscription.EMPTY;
	        }
	    };
	    return AnonymousSubject;
	}(Subject$1));
	var AnonymousSubject_1 = AnonymousSubject$1;


	var Subject_1$1 = {
		SubjectSubscriber: SubjectSubscriber_1,
		Subject: Subject_2,
		AnonymousSubject: AnonymousSubject_1
	};

	var __extends$7 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$3 = Subject_1$1;
	var Subscription_1$6 = Subscription_1$3;
	/**
	 * @class AsyncSubject<T>
	 */
	var AsyncSubject$1 = (function (_super) {
	    __extends$7(AsyncSubject, _super);
	    function AsyncSubject() {
	        _super.apply(this, arguments);
	        this.value = null;
	        this.hasNext = false;
	        this.hasCompleted = false;
	    }
	    AsyncSubject.prototype._subscribe = function (subscriber) {
	        if (this.hasError) {
	            subscriber.error(this.thrownError);
	            return Subscription_1$6.Subscription.EMPTY;
	        }
	        else if (this.hasCompleted && this.hasNext) {
	            subscriber.next(this.value);
	            subscriber.complete();
	            return Subscription_1$6.Subscription.EMPTY;
	        }
	        return _super.prototype._subscribe.call(this, subscriber);
	    };
	    AsyncSubject.prototype.next = function (value) {
	        if (!this.hasCompleted) {
	            this.value = value;
	            this.hasNext = true;
	        }
	    };
	    AsyncSubject.prototype.error = function (error) {
	        if (!this.hasCompleted) {
	            _super.prototype.error.call(this, error);
	        }
	    };
	    AsyncSubject.prototype.complete = function () {
	        this.hasCompleted = true;
	        if (this.hasNext) {
	            _super.prototype.next.call(this, this.value);
	        }
	        _super.prototype.complete.call(this);
	    };
	    return AsyncSubject;
	}(Subject_1$3.Subject));
	var AsyncSubject_2 = AsyncSubject$1;


	var AsyncSubject_1$2 = {
		AsyncSubject: AsyncSubject_2
	};

	var __extends$6 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$5 = Observable_1$2;
	var tryCatch_1$3 = tryCatch_1$1;
	var errorObject_1$3 = errorObject;
	var AsyncSubject_1$1 = AsyncSubject_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var BoundCallbackObservable = (function (_super) {
	    __extends$6(BoundCallbackObservable, _super);
	    function BoundCallbackObservable(callbackFunc, selector, args, context, scheduler) {
	        _super.call(this);
	        this.callbackFunc = callbackFunc;
	        this.selector = selector;
	        this.args = args;
	        this.context = context;
	        this.scheduler = scheduler;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * Converts a callback API to a function that returns an Observable.
	     *
	     * <span class="informal">Give it a function `f` of type `f(x, callback)` and
	     * it will return a function `g` that when called as `g(x)` will output an
	     * Observable.</span>
	     *
	     * `bindCallback` is not an operator because its input and output are not
	     * Observables. The input is a function `func` with some parameters, but the
	     * last parameter must be a callback function that `func` calls when it is
	     * done.
	     *
	     * The output of `bindCallback` is a function that takes the same parameters
	     * as `func`, except the last one (the callback). When the output function
	     * is called with arguments, it will return an Observable. If `func` function
	     * calls its callback with one argument, the Observable will emit that value.
	     * If on the other hand callback is called with multiple values, resulting
	     * Observable will emit an array with these arguments.
	     *
	     * It is very important to remember, that input function `func` is not called
	     * when output function is, but rather when Observable returned by output
	     * function is subscribed. This means if `func` makes AJAX request, that request
	     * will be made every time someone subscribes to resulting Observable, but not before.
	     *
	     * Optionally, selector function can be passed to `bindObservable`. That function
	     * takes the same arguments as callback, and returns value
	     * that will be emitted by Observable instead of callback parameters themselves.
	     * Even though by default multiple arguments passed to callback appear in the stream as array,
	     * selector function will be called with arguments directly, just as callback would.
	     * This means you can imagine default selector (when one is not provided explicitly)
	     * as function that aggregates all its arguments into array, or simply returns first argument,
	     * if there is only one.
	     *
	     * Last optional parameter - {@link Scheduler} - can be used to control when call
	     * to `func` happens after someone subscribes to Observable, as well as when results
	     * passed to callback will be emitted. By default subscription to Observable calls `func`
	     * synchronously, but using `Scheduler.async` as last parameter will defer call to input function,
	     * just like wrapping that call in `setTimeout` with time `0` would. So if you use async Scheduler
	     * and call `subscribe` on output Observable, all function calls that are currently executing,
	     * will end before `func` is invoked.
	     *
	     * When it comes to emitting results passed to callback, by default they are emitted
	     * immediately after `func` invokes callback. In particular, if callback is called synchronously,
	     * then subscription to resulting Observable will call `next` function synchronously as well.
	     * If you want to defer that call, using `Scheduler.async` will, again, do the job.
	     * This means that by using `Scheduler.async` you can, in a sense, ensure that `func`
	     * always calls its callback asynchronously, thus avoiding terrifying Zalgo.
	     *
	     * Note that Observable created by output function will always emit only one value
	     * and then complete right after. Even if `func` calls callback multiple times, values from
	     * second and following calls will never appear in the stream. If you need to
	     * listen for multiple calls, you probably want to use {@link fromEvent} or
	     * {@link fromEventPattern} instead.
	     *
	     * If `func` depends on some context (`this` property), that context will be set
	     * to the same context that output function has at call time. In particular, if `func`
	     * is called as method of some object, in order to preserve proper behaviour,
	     * it is recommended to set context of output function to that object as well,
	     * provided `func` is not already bound.
	     *
	     * If input function calls its callback in "node style" (i.e. first argument to callback is
	     * optional error parameter signaling whether call failed or not), {@link bindNodeCallback}
	     * provides convenient error handling and probably is a better choice.
	     * `bindCallback` will treat such functions without any difference and error parameter
	     * (whether passed or not) will always be interpreted as regular callback argument.
	     *
	     *
	     * @example <caption>Convert jQuery's getJSON to an Observable API</caption>
	     * // Suppose we have jQuery.getJSON('/my/url', callback)
	     * var getJSONAsObservable = Rx.Observable.bindCallback(jQuery.getJSON);
	     * var result = getJSONAsObservable('/my/url');
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     *
	     * @example <caption>Receive array of arguments passed to callback</caption>
	     * someFunction((a, b, c) => {
	     *   console.log(a); // 5
	     *   console.log(b); // 'some string'
	     *   console.log(c); // {someProperty: 'someValue'}
	     * });
	     *
	     * const boundSomeFunction = Rx.Observable.bindCallback(someFunction);
	     * boundSomeFunction().subscribe(values => {
	     *   console.log(values) // [5, 'some string', {someProperty: 'someValue'}]
	     * });
	     *
	     *
	     * @example <caption>Use bindCallback with selector function</caption>
	     * someFunction((a, b, c) => {
	     *   console.log(a); // 'a'
	     *   console.log(b); // 'b'
	     *   console.log(c); // 'c'
	     * });
	     *
	     * const boundSomeFunction = Rx.Observable.bindCallback(someFunction, (a, b, c) => a + b + c);
	     * boundSomeFunction().subscribe(value => {
	     *   console.log(value) // 'abc'
	     * });
	     *
	     *
	     * @example <caption>Compare behaviour with and without async Scheduler</caption>
	     * function iCallMyCallbackSynchronously(cb) {
	     *   cb();
	     * }
	     *
	     * const boundSyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously);
	     * const boundAsyncFn = Rx.Observable.bindCallback(iCallMyCallbackSynchronously, null, Rx.Scheduler.async);
	     *
	     * boundSyncFn().subscribe(() => console.log('I was sync!'));
	     * boundAsyncFn().subscribe(() => console.log('I was async!'));
	     * console.log('This happened...');
	     *
	     * // Logs:
	     * // I was sync!
	     * // This happened...
	     * // I was async!
	     *
	     *
	     * @example <caption>Use bindCallback on object method</caption>
	     * const boundMethod = Rx.Observable.bindCallback(someObject.methodWithCallback);
	     * boundMethod.call(someObject) // make sure methodWithCallback has access to someObject
	     * .subscribe(subscriber);
	     *
	     *
	     * @see {@link bindNodeCallback}
	     * @see {@link from}
	     * @see {@link fromPromise}
	     *
	     * @param {function} func Function with a callback as the last parameter.
	     * @param {function} [selector] A function which takes the arguments from the
	     * callback and maps those to a value to emit on the output Observable.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * callbacks.
	     * @return {function(...params: *): Observable} A function which returns the
	     * Observable that delivers the same values the callback would deliver.
	     * @static true
	     * @name bindCallback
	     * @owner Observable
	     */
	    BoundCallbackObservable.create = function (func, selector, scheduler) {
	        if (selector === void 0) { selector = undefined; }
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return new BoundCallbackObservable(func, selector, args, this, scheduler);
	        };
	    };
	    BoundCallbackObservable.prototype._subscribe = function (subscriber) {
	        var callbackFunc = this.callbackFunc;
	        var args = this.args;
	        var scheduler = this.scheduler;
	        var subject = this.subject;
	        if (!scheduler) {
	            if (!subject) {
	                subject = this.subject = new AsyncSubject_1$1.AsyncSubject();
	                var handler = function handlerFn() {
	                    var innerArgs = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        innerArgs[_i - 0] = arguments[_i];
	                    }
	                    var source = handlerFn.source;
	                    var selector = source.selector, subject = source.subject;
	                    if (selector) {
	                        var result_1 = tryCatch_1$3.tryCatch(selector).apply(this, innerArgs);
	                        if (result_1 === errorObject_1$3.errorObject) {
	                            subject.error(errorObject_1$3.errorObject.e);
	                        }
	                        else {
	                            subject.next(result_1);
	                            subject.complete();
	                        }
	                    }
	                    else {
	                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
	                        subject.complete();
	                    }
	                };
	                // use named function instance to avoid closure.
	                handler.source = this;
	                var result = tryCatch_1$3.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
	                if (result === errorObject_1$3.errorObject) {
	                    subject.error(errorObject_1$3.errorObject.e);
	                }
	            }
	            return subject.subscribe(subscriber);
	        }
	        else {
	            return scheduler.schedule(BoundCallbackObservable.dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
	        }
	    };
	    BoundCallbackObservable.dispatch = function (state) {
	        var self = this;
	        var source = state.source, subscriber = state.subscriber, context = state.context;
	        var callbackFunc = source.callbackFunc, args = source.args, scheduler = source.scheduler;
	        var subject = source.subject;
	        if (!subject) {
	            subject = source.subject = new AsyncSubject_1$1.AsyncSubject();
	            var handler = function handlerFn() {
	                var innerArgs = [];
	                for (var _i = 0; _i < arguments.length; _i++) {
	                    innerArgs[_i - 0] = arguments[_i];
	                }
	                var source = handlerFn.source;
	                var selector = source.selector, subject = source.subject;
	                if (selector) {
	                    var result_2 = tryCatch_1$3.tryCatch(selector).apply(this, innerArgs);
	                    if (result_2 === errorObject_1$3.errorObject) {
	                        self.add(scheduler.schedule(dispatchError, 0, { err: errorObject_1$3.errorObject.e, subject: subject }));
	                    }
	                    else {
	                        self.add(scheduler.schedule(dispatchNext, 0, { value: result_2, subject: subject }));
	                    }
	                }
	                else {
	                    var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
	                    self.add(scheduler.schedule(dispatchNext, 0, { value: value, subject: subject }));
	                }
	            };
	            // use named function to pass values in without closure
	            handler.source = source;
	            var result = tryCatch_1$3.tryCatch(callbackFunc).apply(context, args.concat(handler));
	            if (result === errorObject_1$3.errorObject) {
	                subject.error(errorObject_1$3.errorObject.e);
	            }
	        }
	        self.add(subject.subscribe(subscriber));
	    };
	    return BoundCallbackObservable;
	}(Observable_1$5.Observable));
	var BoundCallbackObservable_2 = BoundCallbackObservable;
	function dispatchNext(arg) {
	    var value = arg.value, subject = arg.subject;
	    subject.next(value);
	    subject.complete();
	}
	function dispatchError(arg) {
	    var err = arg.err, subject = arg.subject;
	    subject.error(err);
	}


	var BoundCallbackObservable_1$1 = {
		BoundCallbackObservable: BoundCallbackObservable_2
	};

	var BoundCallbackObservable_1 = BoundCallbackObservable_1$1;
	var bindCallback_1$1 = BoundCallbackObservable_1.BoundCallbackObservable.create;


	var bindCallback$2 = {
		bindCallback: bindCallback_1$1
	};

	var Observable_1$4 = Observable_1$2;
	var bindCallback_1 = bindCallback$2;
	Observable_1$4.Observable.bindCallback = bindCallback_1.bindCallback;

	var __extends$8 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$7 = Observable_1$2;
	var tryCatch_1$4 = tryCatch_1$1;
	var errorObject_1$4 = errorObject;
	var AsyncSubject_1$4 = AsyncSubject_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var BoundNodeCallbackObservable = (function (_super) {
	    __extends$8(BoundNodeCallbackObservable, _super);
	    function BoundNodeCallbackObservable(callbackFunc, selector, args, context, scheduler) {
	        _super.call(this);
	        this.callbackFunc = callbackFunc;
	        this.selector = selector;
	        this.args = args;
	        this.context = context;
	        this.scheduler = scheduler;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * Converts a Node.js-style callback API to a function that returns an
	     * Observable.
	     *
	     * <span class="informal">It's just like {@link bindCallback}, but the
	     * callback is expected to be of type `callback(error, result)`.</span>
	     *
	     * `bindNodeCallback` is not an operator because its input and output are not
	     * Observables. The input is a function `func` with some parameters, but the
	     * last parameter must be a callback function that `func` calls when it is
	     * done. The callback function is expected to follow Node.js conventions,
	     * where the first argument to the callback is an error object, signaling
	     * whether call was successful. If that object is passed to callback, it means
	     * something went wrong.
	     *
	     * The output of `bindNodeCallback` is a function that takes the same
	     * parameters as `func`, except the last one (the callback). When the output
	     * function is called with arguments, it will return an Observable.
	     * If `func` calls its callback with error parameter present, Observable will
	     * error with that value as well. If error parameter is not passed, Observable will emit
	     * second parameter. If there are more parameters (third and so on),
	     * Observable will emit an array with all arguments, except first error argument.
	     *
	     * Optionally `bindNodeCallback` accepts selector function, which allows you to
	     * make resulting Observable emit value computed by selector, instead of regular
	     * callback arguments. It works similarly to {@link bindCallback} selector, but
	     * Node.js-style error argument will never be passed to that function.
	     *
	     * Note that `func` will not be called at the same time output function is,
	     * but rather whenever resulting Observable is subscribed. By default call to
	     * `func` will happen synchronously after subscription, but that can be changed
	     * with proper {@link Scheduler} provided as optional third parameter. Scheduler
	     * can also control when values from callback will be emitted by Observable.
	     * To find out more, check out documentation for {@link bindCallback}, where
	     * Scheduler works exactly the same.
	     *
	     * As in {@link bindCallback}, context (`this` property) of input function will be set to context
	     * of returned function, when it is called.
	     *
	     * After Observable emits value, it will complete immediately. This means
	     * even if `func` calls callback again, values from second and consecutive
	     * calls will never appear on the stream. If you need to handle functions
	     * that call callbacks multiple times, check out {@link fromEvent} or
	     * {@link fromEventPattern} instead.
	     *
	     * Note that `bindNodeCallback` can be used in non-Node.js environments as well.
	     * "Node.js-style" callbacks are just a convention, so if you write for
	     * browsers or any other environment and API you use implements that callback style,
	     * `bindNodeCallback` can be safely used on that API functions as well.
	     *
	     * Remember that Error object passed to callback does not have to be an instance
	     * of JavaScript built-in `Error` object. In fact, it does not even have to an object.
	     * Error parameter of callback function is interpreted as "present", when value
	     * of that parameter is truthy. It could be, for example, non-zero number, non-empty
	     * string or boolean `true`. In all of these cases resulting Observable would error
	     * with that value. This means usually regular style callbacks will fail very often when
	     * `bindNodeCallback` is used. If your Observable errors much more often then you
	     * would expect, check if callback really is called in Node.js-style and, if not,
	     * switch to {@link bindCallback} instead.
	     *
	     * Note that even if error parameter is technically present in callback, but its value
	     * is falsy, it still won't appear in array emitted by Observable or in selector function.
	     *
	     *
	     * @example <caption>Read a file from the filesystem and get the data as an Observable</caption>
	     * import * as fs from 'fs';
	     * var readFileAsObservable = Rx.Observable.bindNodeCallback(fs.readFile);
	     * var result = readFileAsObservable('./roadNames.txt', 'utf8');
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     *
	     * @example <caption>Use on function calling callback with multiple arguments</caption>
	     * someFunction((err, a, b) => {
	     *   console.log(err); // null
	     *   console.log(a); // 5
	     *   console.log(b); // "some string"
	     * });
	     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
	     * boundSomeFunction()
	     * .subscribe(value => {
	     *   console.log(value); // [5, "some string"]
	     * });
	     *
	     *
	     * @example <caption>Use with selector function</caption>
	     * someFunction((err, a, b) => {
	     *   console.log(err); // undefined
	     *   console.log(a); // "abc"
	     *   console.log(b); // "DEF"
	     * });
	     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction, (a, b) => a + b);
	     * boundSomeFunction()
	     * .subscribe(value => {
	     *   console.log(value); // "abcDEF"
	     * });
	     *
	     *
	     * @example <caption>Use on function calling callback in regular style</caption>
	     * someFunction(a => {
	     *   console.log(a); // 5
	     * });
	     * var boundSomeFunction = Rx.Observable.bindNodeCallback(someFunction);
	     * boundSomeFunction()
	     * .subscribe(
	     *   value => {}             // never gets called
	     *   err => console.log(err) // 5
	     *);
	     *
	     *
	     * @see {@link bindCallback}
	     * @see {@link from}
	     * @see {@link fromPromise}
	     *
	     * @param {function} func Function with a Node.js-style callback as the last parameter.
	     * @param {function} [selector] A function which takes the arguments from the
	     * callback and maps those to a value to emit on the output Observable.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * callbacks.
	     * @return {function(...params: *): Observable} A function which returns the
	     * Observable that delivers the same values the Node.js callback would
	     * deliver.
	     * @static true
	     * @name bindNodeCallback
	     * @owner Observable
	     */
	    BoundNodeCallbackObservable.create = function (func, selector, scheduler) {
	        if (selector === void 0) { selector = undefined; }
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return new BoundNodeCallbackObservable(func, selector, args, this, scheduler);
	        };
	    };
	    BoundNodeCallbackObservable.prototype._subscribe = function (subscriber) {
	        var callbackFunc = this.callbackFunc;
	        var args = this.args;
	        var scheduler = this.scheduler;
	        var subject = this.subject;
	        if (!scheduler) {
	            if (!subject) {
	                subject = this.subject = new AsyncSubject_1$4.AsyncSubject();
	                var handler = function handlerFn() {
	                    var innerArgs = [];
	                    for (var _i = 0; _i < arguments.length; _i++) {
	                        innerArgs[_i - 0] = arguments[_i];
	                    }
	                    var source = handlerFn.source;
	                    var selector = source.selector, subject = source.subject;
	                    var err = innerArgs.shift();
	                    if (err) {
	                        subject.error(err);
	                    }
	                    else if (selector) {
	                        var result_1 = tryCatch_1$4.tryCatch(selector).apply(this, innerArgs);
	                        if (result_1 === errorObject_1$4.errorObject) {
	                            subject.error(errorObject_1$4.errorObject.e);
	                        }
	                        else {
	                            subject.next(result_1);
	                            subject.complete();
	                        }
	                    }
	                    else {
	                        subject.next(innerArgs.length <= 1 ? innerArgs[0] : innerArgs);
	                        subject.complete();
	                    }
	                };
	                // use named function instance to avoid closure.
	                handler.source = this;
	                var result = tryCatch_1$4.tryCatch(callbackFunc).apply(this.context, args.concat(handler));
	                if (result === errorObject_1$4.errorObject) {
	                    subject.error(errorObject_1$4.errorObject.e);
	                }
	            }
	            return subject.subscribe(subscriber);
	        }
	        else {
	            return scheduler.schedule(dispatch, 0, { source: this, subscriber: subscriber, context: this.context });
	        }
	    };
	    return BoundNodeCallbackObservable;
	}(Observable_1$7.Observable));
	var BoundNodeCallbackObservable_2 = BoundNodeCallbackObservable;
	function dispatch(state) {
	    var self = this;
	    var source = state.source, subscriber = state.subscriber, context = state.context;
	    // XXX: cast to `any` to access to the private field in `source`.
	    var _a = source, callbackFunc = _a.callbackFunc, args = _a.args, scheduler = _a.scheduler;
	    var subject = source.subject;
	    if (!subject) {
	        subject = source.subject = new AsyncSubject_1$4.AsyncSubject();
	        var handler = function handlerFn() {
	            var innerArgs = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                innerArgs[_i - 0] = arguments[_i];
	            }
	            var source = handlerFn.source;
	            var selector = source.selector, subject = source.subject;
	            var err = innerArgs.shift();
	            if (err) {
	                self.add(scheduler.schedule(dispatchError$1, 0, { err: err, subject: subject }));
	            }
	            else if (selector) {
	                var result_2 = tryCatch_1$4.tryCatch(selector).apply(this, innerArgs);
	                if (result_2 === errorObject_1$4.errorObject) {
	                    self.add(scheduler.schedule(dispatchError$1, 0, { err: errorObject_1$4.errorObject.e, subject: subject }));
	                }
	                else {
	                    self.add(scheduler.schedule(dispatchNext$1, 0, { value: result_2, subject: subject }));
	                }
	            }
	            else {
	                var value = innerArgs.length <= 1 ? innerArgs[0] : innerArgs;
	                self.add(scheduler.schedule(dispatchNext$1, 0, { value: value, subject: subject }));
	            }
	        };
	        // use named function to pass values in without closure
	        handler.source = source;
	        var result = tryCatch_1$4.tryCatch(callbackFunc).apply(context, args.concat(handler));
	        if (result === errorObject_1$4.errorObject) {
	            self.add(scheduler.schedule(dispatchError$1, 0, { err: errorObject_1$4.errorObject.e, subject: subject }));
	        }
	    }
	    self.add(subject.subscribe(subscriber));
	}
	function dispatchNext$1(arg) {
	    var value = arg.value, subject = arg.subject;
	    subject.next(value);
	    subject.complete();
	}
	function dispatchError$1(arg) {
	    var err = arg.err, subject = arg.subject;
	    subject.error(err);
	}


	var BoundNodeCallbackObservable_1$1 = {
		BoundNodeCallbackObservable: BoundNodeCallbackObservable_2
	};

	var BoundNodeCallbackObservable_1 = BoundNodeCallbackObservable_1$1;
	var bindNodeCallback_1$1 = BoundNodeCallbackObservable_1.BoundNodeCallbackObservable.create;


	var bindNodeCallback$2 = {
		bindNodeCallback: bindNodeCallback_1$1
	};

	var Observable_1$6 = Observable_1$2;
	var bindNodeCallback_1 = bindNodeCallback$2;
	Observable_1$6.Observable.bindNodeCallback = bindNodeCallback_1.bindNodeCallback;

	function isScheduler(value) {
	    return value && typeof value.schedule === 'function';
	}
	var isScheduler_2 = isScheduler;


	var isScheduler_1$1 = {
		isScheduler: isScheduler_2
	};

	var __extends$10 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$10 = Observable_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ScalarObservable = (function (_super) {
	    __extends$10(ScalarObservable, _super);
	    function ScalarObservable(value, scheduler) {
	        _super.call(this);
	        this.value = value;
	        this.scheduler = scheduler;
	        this._isScalar = true;
	        if (scheduler) {
	            this._isScalar = false;
	        }
	    }
	    ScalarObservable.create = function (value, scheduler) {
	        return new ScalarObservable(value, scheduler);
	    };
	    ScalarObservable.dispatch = function (state) {
	        var done = state.done, value = state.value, subscriber = state.subscriber;
	        if (done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.closed) {
	            return;
	        }
	        state.done = true;
	        this.schedule(state);
	    };
	    ScalarObservable.prototype._subscribe = function (subscriber) {
	        var value = this.value;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ScalarObservable.dispatch, 0, {
	                done: false, value: value, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.next(value);
	            if (!subscriber.closed) {
	                subscriber.complete();
	            }
	        }
	    };
	    return ScalarObservable;
	}(Observable_1$10.Observable));
	var ScalarObservable_2 = ScalarObservable;


	var ScalarObservable_1$1 = {
		ScalarObservable: ScalarObservable_2
	};

	var __extends$11 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$11 = Observable_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var EmptyObservable = (function (_super) {
	    __extends$11(EmptyObservable, _super);
	    function EmptyObservable(scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits a complete notification.
	     *
	     * <span class="informal">Just emits 'complete', and nothing else.
	     * </span>
	     *
	     * <img src="./img/empty.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the complete notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then complete.</caption>
	     * var result = Rx.Observable.empty().startWith(7);
	     * result.subscribe(x => console.log(x));
	     *
	     * @example <caption>Map and flatten only odd numbers to the sequence 'a', 'b', 'c'</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x % 2 === 1 ? Rx.Observable.of('a', 'b', 'c') : Rx.Observable.empty()
	     * );
	     * result.subscribe(x => console.log(x));
	     *
	     * // Results in the following to the console:
	     * // x is equal to the count on the interval eg(0,1,2,3,...)
	     * // x will occur every 1000ms
	     * // if x % 2 is equal to 1 print abc
	     * // if x % 2 is not equal to 1 nothing will be output
	     *
	     * @see {@link create}
	     * @see {@link never}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
	     * the emission of the complete notification.
	     * @return {Observable} An "empty" Observable: emits only the complete
	     * notification.
	     * @static true
	     * @name empty
	     * @owner Observable
	     */
	    EmptyObservable.create = function (scheduler) {
	        return new EmptyObservable(scheduler);
	    };
	    EmptyObservable.dispatch = function (arg) {
	        var subscriber = arg.subscriber;
	        subscriber.complete();
	    };
	    EmptyObservable.prototype._subscribe = function (subscriber) {
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(EmptyObservable.dispatch, 0, { subscriber: subscriber });
	        }
	        else {
	            subscriber.complete();
	        }
	    };
	    return EmptyObservable;
	}(Observable_1$11.Observable));
	var EmptyObservable_2 = EmptyObservable;


	var EmptyObservable_1$1 = {
		EmptyObservable: EmptyObservable_2
	};

	var __extends$9 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$9 = Observable_1$2;
	var ScalarObservable_1 = ScalarObservable_1$1;
	var EmptyObservable_1 = EmptyObservable_1$1;
	var isScheduler_1$3 = isScheduler_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayObservable = (function (_super) {
	    __extends$9(ArrayObservable, _super);
	    function ArrayObservable(array, scheduler) {
	        _super.call(this);
	        this.array = array;
	        this.scheduler = scheduler;
	        if (!scheduler && array.length === 1) {
	            this._isScalar = true;
	            this.value = array[0];
	        }
	    }
	    ArrayObservable.create = function (array, scheduler) {
	        return new ArrayObservable(array, scheduler);
	    };
	    /**
	     * Creates an Observable that emits some values you specify as arguments,
	     * immediately one after the other, and then emits a complete notification.
	     *
	     * <span class="informal">Emits the arguments you provide, then completes.
	     * </span>
	     *
	     * <img src="./img/of.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the arguments given, and the complete notification thereafter. It can
	     * be used for composing with other Observables, such as with {@link concat}.
	     * By default, it uses a `null` IScheduler, which means the `next`
	     * notifications are sent synchronously, although with a different IScheduler
	     * it is possible to determine when those notifications will be delivered.
	     *
	     * @example <caption>Emit 10, 20, 30, then 'a', 'b', 'c', then start ticking every second.</caption>
	     * var numbers = Rx.Observable.of(10, 20, 30);
	     * var letters = Rx.Observable.of('a', 'b', 'c');
	     * var interval = Rx.Observable.interval(1000);
	     * var result = numbers.concat(letters).concat(interval);
	     * result.subscribe(x => console.log(x));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link throw}
	     *
	     * @param {...T} values Arguments that represent `next` values to be emitted.
	     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
	     * the emissions of the `next` notifications.
	     * @return {Observable<T>} An Observable that emits each given input value.
	     * @static true
	     * @name of
	     * @owner Observable
	     */
	    ArrayObservable.of = function () {
	        var array = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            array[_i - 0] = arguments[_i];
	        }
	        var scheduler = array[array.length - 1];
	        if (isScheduler_1$3.isScheduler(scheduler)) {
	            array.pop();
	        }
	        else {
	            scheduler = null;
	        }
	        var len = array.length;
	        if (len > 1) {
	            return new ArrayObservable(array, scheduler);
	        }
	        else if (len === 1) {
	            return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
	        }
	        else {
	            return new EmptyObservable_1.EmptyObservable(scheduler);
	        }
	    };
	    ArrayObservable.dispatch = function (state) {
	        var array = state.array, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(array[index]);
	        if (subscriber.closed) {
	            return;
	        }
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var array = this.array;
	        var count = array.length;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(ArrayObservable.dispatch, 0, {
	                array: array, index: index, count: count, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < count && !subscriber.closed; i++) {
	                subscriber.next(array[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayObservable;
	}(Observable_1$9.Observable));
	var ArrayObservable_2 = ArrayObservable;


	var ArrayObservable_1$1 = {
		ArrayObservable: ArrayObservable_2
	};

	var __extends$13 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$5 = Subscriber_1$3;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var OuterSubscriber = (function (_super) {
	    __extends$13(OuterSubscriber, _super);
	    function OuterSubscriber() {
	        _super.apply(this, arguments);
	    }
	    OuterSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    OuterSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.destination.error(error);
	    };
	    OuterSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.destination.complete();
	    };
	    return OuterSubscriber;
	}(Subscriber_1$5.Subscriber));
	var OuterSubscriber_2 = OuterSubscriber;


	var OuterSubscriber_1$1 = {
		OuterSubscriber: OuterSubscriber_2
	};

	var isArrayLike_1$1 = (function (x) { return x && typeof x.length === 'number'; });


	var isArrayLike = {
		isArrayLike: isArrayLike_1$1
	};

	function isPromise(value) {
	    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
	}
	var isPromise_2 = isPromise;


	var isPromise_1$1 = {
		isPromise: isPromise_2
	};

	var iterator = createCommonjsModule(function (module, exports) {
	"use strict";
	var root_1 = root$1;
	function symbolIteratorPonyfill(root) {
	    var Symbol = root.Symbol;
	    if (typeof Symbol === 'function') {
	        if (!Symbol.iterator) {
	            Symbol.iterator = Symbol('iterator polyfill');
	        }
	        return Symbol.iterator;
	    }
	    else {
	        // [for Mozilla Gecko 27-35:](https://mzl.la/2ewE1zC)
	        var Set_1 = root.Set;
	        if (Set_1 && typeof new Set_1()['@@iterator'] === 'function') {
	            return '@@iterator';
	        }
	        var Map_1 = root.Map;
	        // required for compatability with es6-shim
	        if (Map_1) {
	            var keys = Object.getOwnPropertyNames(Map_1.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                // according to spec, Map.prototype[@@iterator] and Map.orototype.entries must be equal.
	                if (key !== 'entries' && key !== 'size' && Map_1.prototype[key] === Map_1.prototype['entries']) {
	                    return key;
	                }
	            }
	        }
	        return '@@iterator';
	    }
	}
	exports.symbolIteratorPonyfill = symbolIteratorPonyfill;
	exports.iterator = symbolIteratorPonyfill(root_1.root);
	/**
	 * @deprecated use iterator instead
	 */
	exports.$$iterator = exports.iterator;

	});

	var __extends$14 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$6 = Subscriber_1$3;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerSubscriber = (function (_super) {
	    __extends$14(InnerSubscriber, _super);
	    function InnerSubscriber(parent, outerValue, outerIndex) {
	        _super.call(this);
	        this.parent = parent;
	        this.outerValue = outerValue;
	        this.outerIndex = outerIndex;
	        this.index = 0;
	    }
	    InnerSubscriber.prototype._next = function (value) {
	        this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
	    };
	    InnerSubscriber.prototype._error = function (error) {
	        this.parent.notifyError(error, this);
	        this.unsubscribe();
	    };
	    InnerSubscriber.prototype._complete = function () {
	        this.parent.notifyComplete(this);
	        this.unsubscribe();
	    };
	    return InnerSubscriber;
	}(Subscriber_1$6.Subscriber));
	var InnerSubscriber_2 = InnerSubscriber;


	var InnerSubscriber_1$1 = {
		InnerSubscriber: InnerSubscriber_2
	};

	var root_1$2 = root$1;
	var isArrayLike_1 = isArrayLike;
	var isPromise_1 = isPromise_1$1;
	var isObject_1$3 = isObject_1$1;
	var Observable_1$12 = Observable_1$2;
	var iterator_1$1 = iterator;
	var InnerSubscriber_1 = InnerSubscriber_1$1;
	var observable_1$3 = observable;
	function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
	    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
	    if (destination.closed) {
	        return null;
	    }
	    if (result instanceof Observable_1$12.Observable) {
	        if (result._isScalar) {
	            destination.next(result.value);
	            destination.complete();
	            return null;
	        }
	        else {
	            return result.subscribe(destination);
	        }
	    }
	    else if (isArrayLike_1.isArrayLike(result)) {
	        for (var i = 0, len = result.length; i < len && !destination.closed; i++) {
	            destination.next(result[i]);
	        }
	        if (!destination.closed) {
	            destination.complete();
	        }
	    }
	    else if (isPromise_1.isPromise(result)) {
	        result.then(function (value) {
	            if (!destination.closed) {
	                destination.next(value);
	                destination.complete();
	            }
	        }, function (err) { return destination.error(err); })
	            .then(null, function (err) {
	            // Escaping the Promise trap: globally throw unhandled errors
	            root_1$2.root.setTimeout(function () { throw err; });
	        });
	        return destination;
	    }
	    else if (result && typeof result[iterator_1$1.iterator] === 'function') {
	        var iterator$$1 = result[iterator_1$1.iterator]();
	        do {
	            var item = iterator$$1.next();
	            if (item.done) {
	                destination.complete();
	                break;
	            }
	            destination.next(item.value);
	            if (destination.closed) {
	                break;
	            }
	        } while (true);
	    }
	    else if (result && typeof result[observable_1$3.observable] === 'function') {
	        var obs = result[observable_1$3.observable]();
	        if (typeof obs.subscribe !== 'function') {
	            destination.error(new TypeError('Provided object does not correctly implement Symbol.observable'));
	        }
	        else {
	            return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
	        }
	    }
	    else {
	        var value = isObject_1$3.isObject(result) ? 'an invalid object' : "'" + result + "'";
	        var msg = ("You provided " + value + " where a stream was expected.")
	            + ' You can provide an Observable, Promise, Array, or Iterable.';
	        destination.error(new TypeError(msg));
	    }
	    return null;
	}
	var subscribeToResult_2 = subscribeToResult;


	var subscribeToResult_1$1 = {
		subscribeToResult: subscribeToResult_2
	};

	var __extends$12 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ArrayObservable_1$3 = ArrayObservable_1$1;
	var isArray_1$3 = isArray;
	var OuterSubscriber_1 = OuterSubscriber_1$1;
	var subscribeToResult_1 = subscribeToResult_1$1;
	var none = {};
	/* tslint:enable:max-line-length */
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from this Observable with values from
	 * Observables passed as arguments. This is done by subscribing to each
	 * Observable, in order, and collecting an array of each of the most recent
	 * values any time any of the input Observables emits, then either taking that
	 * array and passing it as arguments to an optional `project` function and
	 * emitting the return value of that, or just emitting the array of recent
	 * values directly if there is no `project` function.
	 *
	 * @example <caption>Dynamically calculate the Body-Mass Index from an Observable of weight and one for height</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = weight.combineLatest(height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * // With output to console:
	 * // BMI is 24.212293388429753
	 * // BMI is 23.93948099205209
	 * // BMI is 23.671253629592222
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {ObservableInput} other An input Observable to combine with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @method combineLatest
	 * @owner Observable
	 */
	function combineLatest$3() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1$3.isArray(observables[0])) {
	        observables = observables[0].slice();
	    }
	    observables.unshift(this);
	    return this.lift.call(new ArrayObservable_1$3.ArrayObservable(observables), new CombineLatestOperator(project));
	}
	var combineLatest_2$2 = combineLatest$3;
	var CombineLatestOperator = (function () {
	    function CombineLatestOperator(project) {
	        this.project = project;
	    }
	    CombineLatestOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new CombineLatestSubscriber(subscriber, this.project));
	    };
	    return CombineLatestOperator;
	}());
	var CombineLatestOperator_1 = CombineLatestOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CombineLatestSubscriber = (function (_super) {
	    __extends$12(CombineLatestSubscriber, _super);
	    function CombineLatestSubscriber(destination, project) {
	        _super.call(this, destination);
	        this.project = project;
	        this.active = 0;
	        this.values = [];
	        this.observables = [];
	    }
	    CombineLatestSubscriber.prototype._next = function (observable) {
	        this.values.push(none);
	        this.observables.push(observable);
	    };
	    CombineLatestSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        }
	        else {
	            this.active = len;
	            this.toRespond = len;
	            for (var i = 0; i < len; i++) {
	                var observable = observables[i];
	                this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyComplete = function (unused) {
	        if ((this.active -= 1) === 0) {
	            this.destination.complete();
	        }
	    };
	    CombineLatestSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var values = this.values;
	        var oldVal = values[outerIndex];
	        var toRespond = !this.toRespond
	            ? 0
	            : oldVal === none ? --this.toRespond : this.toRespond;
	        values[outerIndex] = innerValue;
	        if (toRespond === 0) {
	            if (this.project) {
	                this._tryProject(values);
	            }
	            else {
	                this.destination.next(values.slice());
	            }
	        }
	    };
	    CombineLatestSubscriber.prototype._tryProject = function (values) {
	        var result;
	        try {
	            result = this.project.apply(this, values);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return CombineLatestSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));
	var CombineLatestSubscriber_1 = CombineLatestSubscriber;


	var combineLatest_1$2 = {
		combineLatest: combineLatest_2$2,
		CombineLatestOperator: CombineLatestOperator_1,
		CombineLatestSubscriber: CombineLatestSubscriber_1
	};

	var isScheduler_1 = isScheduler_1$1;
	var isArray_1$2 = isArray;
	var ArrayObservable_1 = ArrayObservable_1$1;
	var combineLatest_1$1 = combineLatest_1$2;
	/* tslint:enable:max-line-length */
	/**
	 * Combines multiple Observables to create an Observable whose values are
	 * calculated from the latest values of each of its input Observables.
	 *
	 * <span class="informal">Whenever any input Observable emits a value, it
	 * computes a formula using the latest values from all the inputs, then emits
	 * the output of that formula.</span>
	 *
	 * <img src="./img/combineLatest.png" width="100%">
	 *
	 * `combineLatest` combines the values from all the Observables passed as
	 * arguments. This is done by subscribing to each Observable in order and,
	 * whenever any Observable emits, collecting an array of the most recent
	 * values from each Observable. So if you pass `n` Observables to operator,
	 * returned Observable will always emit an array of `n` values, in order
	 * corresponding to order of passed Observables (value from the first Observable
	 * on the first place and so on).
	 *
	 * Static version of `combineLatest` accepts either an array of Observables
	 * or each Observable can be put directly as an argument. Note that array of
	 * Observables is good choice, if you don't know beforehand how many Observables
	 * you will combine. Passing empty array will result in Observable that
	 * completes immediately.
	 *
	 * To ensure output array has always the same length, `combineLatest` will
	 * actually wait for all input Observables to emit at least once,
	 * before it starts emitting results. This means if some Observable emits
	 * values before other Observables started emitting, all that values but last
	 * will be lost. On the other hand, is some Observable does not emit value but
	 * completes, resulting Observable will complete at the same moment without
	 * emitting anything, since it will be now impossible to include value from
	 * completed Observable in resulting array. Also, if some input Observable does
	 * not emit any value and never completes, `combineLatest` will also never emit
	 * and never complete, since, again, it will wait for all streams to emit some
	 * value.
	 *
	 * If at least one Observable was passed to `combineLatest` and all passed Observables
	 * emitted something, resulting Observable will complete when all combined
	 * streams complete. So even if some Observable completes, result of
	 * `combineLatest` will still emit values when other Observables do. In case
	 * of completed Observable, its value from now on will always be the last
	 * emitted value. On the other hand, if any Observable errors, `combineLatest`
	 * will error immediately as well, and all other Observables will be unsubscribed.
	 *
	 * `combineLatest` accepts as optional parameter `project` function, which takes
	 * as arguments all values that would normally be emitted by resulting Observable.
	 * `project` can return any kind of value, which will be then emitted by Observable
	 * instead of default array. Note that `project` does not take as argument that array
	 * of values, but values themselves. That means default `project` can be imagined
	 * as function that takes all its arguments and puts them into an array.
	 *
	 *
	 * @example <caption>Combine two timer Observables</caption>
	 * const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
	 * const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
	 * const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
	 * combinedTimers.subscribe(value => console.log(value));
	 * // Logs
	 * // [0, 0] after 0.5s
	 * // [1, 0] after 1s
	 * // [1, 1] after 1.5s
	 * // [2, 1] after 2s
	 *
	 *
	 * @example <caption>Combine an array of Observables</caption>
	 * const observables = [1, 5, 10].map(
	 *   n => Rx.Observable.of(n).delay(n * 1000).startWith(0) // emit 0 and then emit n after n seconds
	 * );
	 * const combined = Rx.Observable.combineLatest(observables);
	 * combined.subscribe(value => console.log(value));
	 * // Logs
	 * // [0, 0, 0] immediately
	 * // [1, 0, 0] after 1s
	 * // [1, 5, 0] after 5s
	 * // [1, 5, 10] after 10s
	 *
	 *
	 * @example <caption>Use project function to dynamically calculate the Body-Mass Index</caption>
	 * var weight = Rx.Observable.of(70, 72, 76, 79, 75);
	 * var height = Rx.Observable.of(1.76, 1.77, 1.78);
	 * var bmi = Rx.Observable.combineLatest(weight, height, (w, h) => w / (h * h));
	 * bmi.subscribe(x => console.log('BMI is ' + x));
	 *
	 * // With output to console:
	 * // BMI is 24.212293388429753
	 * // BMI is 23.93948099205209
	 * // BMI is 23.671253629592222
	 *
	 *
	 * @see {@link combineAll}
	 * @see {@link merge}
	 * @see {@link withLatestFrom}
	 *
	 * @param {ObservableInput} observable1 An input Observable to combine with other Observables.
	 * @param {ObservableInput} observable2 An input Observable to combine with other Observables.
	 * More than one input Observables may be given as arguments
	 * or an array of Observables may be given as the first argument.
	 * @param {function} [project] An optional function to project the values from
	 * the combined latest values into a new value on the output Observable.
	 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
	 * each input Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @static true
	 * @name combineLatest
	 * @owner Observable
	 */
	function combineLatest$2() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = null;
	    var scheduler = null;
	    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
	        scheduler = observables.pop();
	    }
	    if (typeof observables[observables.length - 1] === 'function') {
	        project = observables.pop();
	    }
	    // if the first and only other argument besides the resultSelector is an array
	    // assume it's been called with `combineLatest([obs1, obs2, obs3], project)`
	    if (observables.length === 1 && isArray_1$2.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new combineLatest_1$1.CombineLatestOperator(project));
	}
	var combineLatest_3 = combineLatest$2;


	var combineLatest_2 = {
		combineLatest: combineLatest_3
	};

	var Observable_1$8 = Observable_1$2;
	var combineLatest_1 = combineLatest_2;
	Observable_1$8.Observable.combineLatest = combineLatest_1.combineLatest;

	var __extends$15 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$3 = OuterSubscriber_1$1;
	var subscribeToResult_1$3 = subscribeToResult_1$1;
	/**
	 * Converts a higher-order Observable into a first-order Observable which
	 * concurrently delivers all values that are emitted on the inner Observables.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables.</span>
	 *
	 * <img src="./img/mergeAll.png" width="100%">
	 *
	 * `mergeAll` subscribes to an Observable that emits Observables, also known as
	 * a higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, it subscribes to that and delivers all the values from the
	 * inner Observable on the output Observable. The output Observable only
	 * completes once all inner Observables have completed. Any error delivered by
	 * a inner Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Spawn a new interval Observable for each click event, and blend their outputs as one Observable</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
	 * var firstOrder = higherOrder.mergeAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @example <caption>Count from 0 to 9 every second for each click, but only allow 2 concurrent timers</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
	 * var firstOrder = higherOrder.mergeAll(2);
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link exhaust}
	 * @see {@link merge}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of inner
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits values coming from all the
	 * inner Observables emitted by the source Observable.
	 * @method mergeAll
	 * @owner Observable
	 */
	function mergeAll(concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    return this.lift(new MergeAllOperator(concurrent));
	}
	var mergeAll_2 = mergeAll;
	var MergeAllOperator = (function () {
	    function MergeAllOperator(concurrent) {
	        this.concurrent = concurrent;
	    }
	    MergeAllOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new MergeAllSubscriber(observer, this.concurrent));
	    };
	    return MergeAllOperator;
	}());
	var MergeAllOperator_1 = MergeAllOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeAllSubscriber = (function (_super) {
	    __extends$15(MergeAllSubscriber, _super);
	    function MergeAllSubscriber(destination, concurrent) {
	        _super.call(this, destination);
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	    }
	    MergeAllSubscriber.prototype._next = function (observable) {
	        if (this.active < this.concurrent) {
	            this.active++;
	            this.add(subscribeToResult_1$3.subscribeToResult(this, observable));
	        }
	        else {
	            this.buffer.push(observable);
	        }
	    };
	    MergeAllSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeAllSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeAllSubscriber;
	}(OuterSubscriber_1$3.OuterSubscriber));
	var MergeAllSubscriber_1 = MergeAllSubscriber;


	var mergeAll_1$1 = {
		mergeAll: mergeAll_2,
		MergeAllOperator: MergeAllOperator_1,
		MergeAllSubscriber: MergeAllSubscriber_1
	};

	var Observable_1$14 = Observable_1$2;
	var isScheduler_1$4 = isScheduler_1$1;
	var ArrayObservable_1$4 = ArrayObservable_1$1;
	var mergeAll_1 = mergeAll_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which sequentially emits all values from every
	 * given input Observable after the current Observable.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * Joins this Observable with multiple other Observables by subscribing to them
	 * one at a time, starting with the source, and merging their results into the
	 * output Observable. Will wait for each Observable to complete before moving
	 * on to the next.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = timer.concat(sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * // results in:
	 * // 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
	 *
	 * @example <caption>Concatenate 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = timer1.concat(timer2, timer3);
	 * result.subscribe(x => console.log(x));
	 *
	 * // results in the following:
	 * // (Prints to console sequentially)
	 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
	 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
	 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {ObservableInput} other An input Observable to concatenate after the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @method concat
	 * @owner Observable
	 */
	function concat$4() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return this.lift.call(concatStatic.apply(void 0, [this].concat(observables)));
	}
	var concat_2$1 = concat$4;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which sequentially emits all values from given
	 * Observable and then moves on to the next.
	 *
	 * <span class="informal">Concatenates multiple Observables together by
	 * sequentially emitting their values, one Observable after the other.</span>
	 *
	 * <img src="./img/concat.png" width="100%">
	 *
	 * `concat` joins multiple Observables together, by subscribing to them one at a time and
	 * merging their results into the output Observable. You can pass either an array of
	 * Observables, or put them directly as arguments. Passing an empty array will result
	 * in Observable that completes immediately.
	 *
	 * `concat` will subscribe to first input Observable and emit all its values, without
	 * changing or affecting them in any way. When that Observable completes, it will
	 * subscribe to then next Observable passed and, again, emit its values. This will be
	 * repeated, until the operator runs out of Observables. When last input Observable completes,
	 * `concat` will complete as well. At any given moment only one Observable passed to operator
	 * emits values. If you would like to emit values from passed Observables concurrently, check out
	 * {@link merge} instead, especially with optional `concurrent` parameter. As a matter of fact,
	 * `concat` is an equivalent of `merge` operator with `concurrent` parameter set to `1`.
	 *
	 * Note that if some input Observable never completes, `concat` will also never complete
	 * and Observables following the one that did not complete will never be subscribed. On the other
	 * hand, if some Observable simply completes immediately after it is subscribed, it will be
	 * invisible for `concat`, which will just move on to the next Observable.
	 *
	 * If any Observable in chain errors, instead of passing control to the next Observable,
	 * `concat` will error immediately as well. Observables that would be subscribed after
	 * the one that emitted error, never will.
	 *
	 * If you pass to `concat` the same Observable many times, its stream of values
	 * will be "replayed" on every subscription, which means you can repeat given Observable
	 * as many times as you like. If passing the same Observable to `concat` 1000 times becomes tedious,
	 * you can always use {@link repeat}.
	 *
	 * @example <caption>Concatenate a timer counting from 0 to 3 with a synchronous sequence from 1 to 10</caption>
	 * var timer = Rx.Observable.interval(1000).take(4);
	 * var sequence = Rx.Observable.range(1, 10);
	 * var result = Rx.Observable.concat(timer, sequence);
	 * result.subscribe(x => console.log(x));
	 *
	 * // results in:
	 * // 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3 -immediate-> 1 ... 10
	 *
	 *
	 * @example <caption>Concatenate an array of 3 Observables</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var result = Rx.Observable.concat([timer1, timer2, timer3]); // note that array is passed
	 * result.subscribe(x => console.log(x));
	 *
	 * // results in the following:
	 * // (Prints to console sequentially)
	 * // -1000ms-> 0 -1000ms-> 1 -1000ms-> ... 9
	 * // -2000ms-> 0 -2000ms-> 1 -2000ms-> ... 5
	 * // -500ms-> 0 -500ms-> 1 -500ms-> ... 9
	 *
	 *
	 * @example <caption>Concatenate the same Observable to repeat it</caption>
	 * const timer = Rx.Observable.interval(1000).take(2);
	 *
	 * Rx.Observable.concat(timer, timer) // concating the same Observable!
	 * .subscribe(
	 *   value => console.log(value),
	 *   err => {},
	 *   () => console.log('...and it is done!')
	 * );
	 *
	 * // Logs:
	 * // 0 after 1s
	 * // 1 after 2s
	 * // 0 after 3s
	 * // 1 after 4s
	 * // "...and it is done!" also after 4s
	 *
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 *
	 * @param {ObservableInput} input1 An input Observable to concatenate with others.
	 * @param {ObservableInput} input2 An input Observable to concatenate with others.
	 * More than one input Observables may be given as argument.
	 * @param {Scheduler} [scheduler=null] An optional IScheduler to schedule each
	 * Observable subscription on.
	 * @return {Observable} All values of each passed Observable merged into a
	 * single Observable, in order, in serial fashion.
	 * @static true
	 * @name concat
	 * @owner Observable
	 */
	function concatStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var scheduler = null;
	    var args = observables;
	    if (isScheduler_1$4.isScheduler(args[observables.length - 1])) {
	        scheduler = args.pop();
	    }
	    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1$14.Observable) {
	        return observables[0];
	    }
	    return new ArrayObservable_1$4.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
	}
	var concatStatic_1 = concatStatic;


	var concat_1$2 = {
		concat: concat_2$1,
		concatStatic: concatStatic_1
	};

	var concat_1$1 = concat_1$2;
	var concat_2 = concat_1$1.concatStatic;


	var concat$2 = {
		concat: concat_2
	};

	var Observable_1$13 = Observable_1$2;
	var concat_1 = concat$2;
	Observable_1$13.Observable.concat = concat_1.concat;

	var __extends$16 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$16 = Observable_1$2;
	var subscribeToResult_1$4 = subscribeToResult_1$1;
	var OuterSubscriber_1$4 = OuterSubscriber_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var DeferObservable = (function (_super) {
	    __extends$16(DeferObservable, _super);
	    function DeferObservable(observableFactory) {
	        _super.call(this);
	        this.observableFactory = observableFactory;
	    }
	    /**
	     * Creates an Observable that, on subscribe, calls an Observable factory to
	     * make an Observable for each new Observer.
	     *
	     * <span class="informal">Creates the Observable lazily, that is, only when it
	     * is subscribed.
	     * </span>
	     *
	     * <img src="./img/defer.png" width="100%">
	     *
	     * `defer` allows you to create the Observable only when the Observer
	     * subscribes, and create a fresh Observable for each Observer. It waits until
	     * an Observer subscribes to it, and then it generates an Observable,
	     * typically with an Observable factory function. It does this afresh for each
	     * subscriber, so although each subscriber may think it is subscribing to the
	     * same Observable, in fact each subscriber gets its own individual
	     * Observable.
	     *
	     * @example <caption>Subscribe to either an Observable of clicks or an Observable of interval, at random</caption>
	     * var clicksOrInterval = Rx.Observable.defer(function () {
	     *   if (Math.random() > 0.5) {
	     *     return Rx.Observable.fromEvent(document, 'click');
	     *   } else {
	     *     return Rx.Observable.interval(1000);
	     *   }
	     * });
	     * clicksOrInterval.subscribe(x => console.log(x));
	     *
	     * // Results in the following behavior:
	     * // If the result of Math.random() is greater than 0.5 it will listen
	     * // for clicks anywhere on the "document"; when document is clicked it
	     * // will log a MouseEvent object to the console. If the result is less
	     * // than 0.5 it will emit ascending numbers, one every second(1000ms).
	     *
	     * @see {@link create}
	     *
	     * @param {function(): SubscribableOrPromise} observableFactory The Observable
	     * factory function to invoke for each Observer that subscribes to the output
	     * Observable. May also return a Promise, which will be converted on the fly
	     * to an Observable.
	     * @return {Observable} An Observable whose Observers' subscriptions trigger
	     * an invocation of the given Observable factory function.
	     * @static true
	     * @name defer
	     * @owner Observable
	     */
	    DeferObservable.create = function (observableFactory) {
	        return new DeferObservable(observableFactory);
	    };
	    DeferObservable.prototype._subscribe = function (subscriber) {
	        return new DeferSubscriber(subscriber, this.observableFactory);
	    };
	    return DeferObservable;
	}(Observable_1$16.Observable));
	var DeferObservable_2 = DeferObservable;
	var DeferSubscriber = (function (_super) {
	    __extends$16(DeferSubscriber, _super);
	    function DeferSubscriber(destination, factory) {
	        _super.call(this, destination);
	        this.factory = factory;
	        this.tryDefer();
	    }
	    DeferSubscriber.prototype.tryDefer = function () {
	        try {
	            this._callFactory();
	        }
	        catch (err) {
	            this._error(err);
	        }
	    };
	    DeferSubscriber.prototype._callFactory = function () {
	        var result = this.factory();
	        if (result) {
	            this.add(subscribeToResult_1$4.subscribeToResult(this, result));
	        }
	    };
	    return DeferSubscriber;
	}(OuterSubscriber_1$4.OuterSubscriber));


	var DeferObservable_1$1 = {
		DeferObservable: DeferObservable_2
	};

	var DeferObservable_1 = DeferObservable_1$1;
	var defer_1$1 = DeferObservable_1.DeferObservable.create;


	var defer$2 = {
		defer: defer_1$1
	};

	var Observable_1$15 = Observable_1$2;
	var defer_1 = defer$2;
	Observable_1$15.Observable.defer = defer_1.defer;

	var EmptyObservable_1$3 = EmptyObservable_1$1;
	var empty_1$1 = EmptyObservable_1$3.EmptyObservable.create;


	var empty$3 = {
		empty: empty_1$1
	};

	var Observable_1$17 = Observable_1$2;
	var empty_1 = empty$3;
	Observable_1$17.Observable.empty = empty_1.empty;

	var __extends$17 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$19 = Observable_1$2;
	var EmptyObservable_1$4 = EmptyObservable_1$1;
	var isArray_1$4 = isArray;
	var subscribeToResult_1$5 = subscribeToResult_1$1;
	var OuterSubscriber_1$5 = OuterSubscriber_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ForkJoinObservable = (function (_super) {
	    __extends$17(ForkJoinObservable, _super);
	    function ForkJoinObservable(sources, resultSelector) {
	        _super.call(this);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * @param sources
	     * @return {any}
	     * @static true
	     * @name forkJoin
	     * @owner Observable
	     */
	    ForkJoinObservable.create = function () {
	        var sources = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            sources[_i - 0] = arguments[_i];
	        }
	        if (sources === null || arguments.length === 0) {
	            return new EmptyObservable_1$4.EmptyObservable();
	        }
	        var resultSelector = null;
	        if (typeof sources[sources.length - 1] === 'function') {
	            resultSelector = sources.pop();
	        }
	        // if the first and only other argument besides the resultSelector is an array
	        // assume it's been called with `forkJoin([obs1, obs2, obs3], resultSelector)`
	        if (sources.length === 1 && isArray_1$4.isArray(sources[0])) {
	            sources = sources[0];
	        }
	        if (sources.length === 0) {
	            return new EmptyObservable_1$4.EmptyObservable();
	        }
	        return new ForkJoinObservable(sources, resultSelector);
	    };
	    ForkJoinObservable.prototype._subscribe = function (subscriber) {
	        return new ForkJoinSubscriber(subscriber, this.sources, this.resultSelector);
	    };
	    return ForkJoinObservable;
	}(Observable_1$19.Observable));
	var ForkJoinObservable_2 = ForkJoinObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ForkJoinSubscriber = (function (_super) {
	    __extends$17(ForkJoinSubscriber, _super);
	    function ForkJoinSubscriber(destination, sources, resultSelector) {
	        _super.call(this, destination);
	        this.sources = sources;
	        this.resultSelector = resultSelector;
	        this.completed = 0;
	        this.haveValues = 0;
	        var len = sources.length;
	        this.total = len;
	        this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            var source = sources[i];
	            var innerSubscription = subscribeToResult_1$5.subscribeToResult(this, source, null, i);
	            if (innerSubscription) {
	                innerSubscription.outerIndex = i;
	                this.add(innerSubscription);
	            }
	        }
	    }
	    ForkJoinSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values[outerIndex] = innerValue;
	        if (!innerSub._hasValue) {
	            innerSub._hasValue = true;
	            this.haveValues++;
	        }
	    };
	    ForkJoinSubscriber.prototype.notifyComplete = function (innerSub) {
	        var destination = this.destination;
	        var _a = this, haveValues = _a.haveValues, resultSelector = _a.resultSelector, values = _a.values;
	        var len = values.length;
	        if (!innerSub._hasValue) {
	            destination.complete();
	            return;
	        }
	        this.completed++;
	        if (this.completed !== len) {
	            return;
	        }
	        if (haveValues === len) {
	            var value = resultSelector ? resultSelector.apply(this, values) : values;
	            destination.next(value);
	        }
	        destination.complete();
	    };
	    return ForkJoinSubscriber;
	}(OuterSubscriber_1$5.OuterSubscriber));


	var ForkJoinObservable_1$1 = {
		ForkJoinObservable: ForkJoinObservable_2
	};

	var ForkJoinObservable_1 = ForkJoinObservable_1$1;
	var forkJoin_1$1 = ForkJoinObservable_1.ForkJoinObservable.create;


	var forkJoin$2 = {
		forkJoin: forkJoin_1$1
	};

	var Observable_1$18 = Observable_1$2;
	var forkJoin_1 = forkJoin$2;
	Observable_1$18.Observable.forkJoin = forkJoin_1.forkJoin;

	var __extends$19 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1$3 = root$1;
	var Observable_1$22 = Observable_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var PromiseObservable = (function (_super) {
	    __extends$19(PromiseObservable, _super);
	    function PromiseObservable(promise, scheduler) {
	        _super.call(this);
	        this.promise = promise;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Converts a Promise to an Observable.
	     *
	     * <span class="informal">Returns an Observable that just emits the Promise's
	     * resolved value, then completes.</span>
	     *
	     * Converts an ES2015 Promise or a Promises/A+ spec compliant Promise to an
	     * Observable. If the Promise resolves with a value, the output Observable
	     * emits that resolved value as a `next`, and then completes. If the Promise
	     * is rejected, then the output Observable emits the corresponding Error.
	     *
	     * @example <caption>Convert the Promise returned by Fetch to an Observable</caption>
	     * var result = Rx.Observable.fromPromise(fetch('http://myserver.com/'));
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link bindCallback}
	     * @see {@link from}
	     *
	     * @param {PromiseLike<T>} promise The promise to be converted.
	     * @param {Scheduler} [scheduler] An optional IScheduler to use for scheduling
	     * the delivery of the resolved value (or the rejection).
	     * @return {Observable<T>} An Observable which wraps the Promise.
	     * @static true
	     * @name fromPromise
	     * @owner Observable
	     */
	    PromiseObservable.create = function (promise, scheduler) {
	        return new PromiseObservable(promise, scheduler);
	    };
	    PromiseObservable.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var promise = this.promise;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            if (this._isScalar) {
	                if (!subscriber.closed) {
	                    subscriber.next(this.value);
	                    subscriber.complete();
	                }
	            }
	            else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.next(value);
	                        subscriber.complete();
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
	                        subscriber.error(err);
	                    }
	                })
	                    .then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1$3.root.setTimeout(function () { throw err; });
	                });
	            }
	        }
	        else {
	            if (this._isScalar) {
	                if (!subscriber.closed) {
	                    return scheduler.schedule(dispatchNext$2, 0, { value: this.value, subscriber: subscriber });
	                }
	            }
	            else {
	                promise.then(function (value) {
	                    _this.value = value;
	                    _this._isScalar = true;
	                    if (!subscriber.closed) {
	                        subscriber.add(scheduler.schedule(dispatchNext$2, 0, { value: value, subscriber: subscriber }));
	                    }
	                }, function (err) {
	                    if (!subscriber.closed) {
	                        subscriber.add(scheduler.schedule(dispatchError$2, 0, { err: err, subscriber: subscriber }));
	                    }
	                })
	                    .then(null, function (err) {
	                    // escape the promise trap, throw unhandled errors
	                    root_1$3.root.setTimeout(function () { throw err; });
	                });
	            }
	        }
	    };
	    return PromiseObservable;
	}(Observable_1$22.Observable));
	var PromiseObservable_2 = PromiseObservable;
	function dispatchNext$2(arg) {
	    var value = arg.value, subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.next(value);
	        subscriber.complete();
	    }
	}
	function dispatchError$2(arg) {
	    var err = arg.err, subscriber = arg.subscriber;
	    if (!subscriber.closed) {
	        subscriber.error(err);
	    }
	}


	var PromiseObservable_1$1 = {
		PromiseObservable: PromiseObservable_2
	};

	var __extends$20 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1$4 = root$1;
	var Observable_1$23 = Observable_1$2;
	var iterator_1$4 = iterator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IteratorObservable = (function (_super) {
	    __extends$20(IteratorObservable, _super);
	    function IteratorObservable(iterator$$2, scheduler) {
	        _super.call(this);
	        this.scheduler = scheduler;
	        if (iterator$$2 == null) {
	            throw new Error('iterator cannot be null.');
	        }
	        this.iterator = getIterator(iterator$$2);
	    }
	    IteratorObservable.create = function (iterator$$2, scheduler) {
	        return new IteratorObservable(iterator$$2, scheduler);
	    };
	    IteratorObservable.dispatch = function (state) {
	        var index = state.index, hasError = state.hasError, iterator$$2 = state.iterator, subscriber = state.subscriber;
	        if (hasError) {
	            subscriber.error(state.error);
	            return;
	        }
	        var result = iterator$$2.next();
	        if (result.done) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(result.value);
	        state.index = index + 1;
	        if (subscriber.closed) {
	            if (typeof iterator$$2.return === 'function') {
	                iterator$$2.return();
	            }
	            return;
	        }
	        this.schedule(state);
	    };
	    IteratorObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, iterator$$2 = _a.iterator, scheduler = _a.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(IteratorObservable.dispatch, 0, {
	                index: index, iterator: iterator$$2, subscriber: subscriber
	            });
	        }
	        else {
	            do {
	                var result = iterator$$2.next();
	                if (result.done) {
	                    subscriber.complete();
	                    break;
	                }
	                else {
	                    subscriber.next(result.value);
	                }
	                if (subscriber.closed) {
	                    if (typeof iterator$$2.return === 'function') {
	                        iterator$$2.return();
	                    }
	                    break;
	                }
	            } while (true);
	        }
	    };
	    return IteratorObservable;
	}(Observable_1$23.Observable));
	var IteratorObservable_2 = IteratorObservable;
	var StringIterator = (function () {
	    function StringIterator(str, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = str.length; }
	        this.str = str;
	        this.idx = idx;
	        this.len = len;
	    }
	    StringIterator.prototype[iterator_1$4.iterator] = function () { return (this); };
	    StringIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.str.charAt(this.idx++)
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return StringIterator;
	}());
	var ArrayIterator = (function () {
	    function ArrayIterator(arr, idx, len) {
	        if (idx === void 0) { idx = 0; }
	        if (len === void 0) { len = toLength(arr); }
	        this.arr = arr;
	        this.idx = idx;
	        this.len = len;
	    }
	    ArrayIterator.prototype[iterator_1$4.iterator] = function () { return this; };
	    ArrayIterator.prototype.next = function () {
	        return this.idx < this.len ? {
	            done: false,
	            value: this.arr[this.idx++]
	        } : {
	            done: true,
	            value: undefined
	        };
	    };
	    return ArrayIterator;
	}());
	function getIterator(obj) {
	    var i = obj[iterator_1$4.iterator];
	    if (!i && typeof obj === 'string') {
	        return new StringIterator(obj);
	    }
	    if (!i && obj.length !== undefined) {
	        return new ArrayIterator(obj);
	    }
	    if (!i) {
	        throw new TypeError('object is not iterable');
	    }
	    return obj[iterator_1$4.iterator]();
	}
	var maxSafeInteger = Math.pow(2, 53) - 1;
	function toLength(o) {
	    var len = +o.length;
	    if (isNaN(len)) {
	        return 0;
	    }
	    if (len === 0 || !numberIsFinite(len)) {
	        return len;
	    }
	    len = sign(len) * Math.floor(Math.abs(len));
	    if (len <= 0) {
	        return 0;
	    }
	    if (len > maxSafeInteger) {
	        return maxSafeInteger;
	    }
	    return len;
	}
	function numberIsFinite(value) {
	    return typeof value === 'number' && root_1$4.root.isFinite(value);
	}
	function sign(value) {
	    var valueAsNumber = +value;
	    if (valueAsNumber === 0) {
	        return valueAsNumber;
	    }
	    if (isNaN(valueAsNumber)) {
	        return valueAsNumber;
	    }
	    return valueAsNumber < 0 ? -1 : 1;
	}


	var IteratorObservable_1$1 = {
		IteratorObservable: IteratorObservable_2
	};

	var __extends$21 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$24 = Observable_1$2;
	var ScalarObservable_1$3 = ScalarObservable_1$1;
	var EmptyObservable_1$5 = EmptyObservable_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ArrayLikeObservable = (function (_super) {
	    __extends$21(ArrayLikeObservable, _super);
	    function ArrayLikeObservable(arrayLike, scheduler) {
	        _super.call(this);
	        this.arrayLike = arrayLike;
	        this.scheduler = scheduler;
	        if (!scheduler && arrayLike.length === 1) {
	            this._isScalar = true;
	            this.value = arrayLike[0];
	        }
	    }
	    ArrayLikeObservable.create = function (arrayLike, scheduler) {
	        var length = arrayLike.length;
	        if (length === 0) {
	            return new EmptyObservable_1$5.EmptyObservable();
	        }
	        else if (length === 1) {
	            return new ScalarObservable_1$3.ScalarObservable(arrayLike[0], scheduler);
	        }
	        else {
	            return new ArrayLikeObservable(arrayLike, scheduler);
	        }
	    };
	    ArrayLikeObservable.dispatch = function (state) {
	        var arrayLike = state.arrayLike, index = state.index, length = state.length, subscriber = state.subscriber;
	        if (subscriber.closed) {
	            return;
	        }
	        if (index >= length) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(arrayLike[index]);
	        state.index = index + 1;
	        this.schedule(state);
	    };
	    ArrayLikeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, arrayLike = _a.arrayLike, scheduler = _a.scheduler;
	        var length = arrayLike.length;
	        if (scheduler) {
	            return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
	                arrayLike: arrayLike, index: index, length: length, subscriber: subscriber
	            });
	        }
	        else {
	            for (var i = 0; i < length && !subscriber.closed; i++) {
	                subscriber.next(arrayLike[i]);
	            }
	            subscriber.complete();
	        }
	    };
	    return ArrayLikeObservable;
	}(Observable_1$24.Observable));
	var ArrayLikeObservable_2 = ArrayLikeObservable;


	var ArrayLikeObservable_1$1 = {
		ArrayLikeObservable: ArrayLikeObservable_2
	};

	var Observable_1$25 = Observable_1$2;
	/**
	 * Represents a push-based event or value that an {@link Observable} can emit.
	 * This class is particularly useful for operators that manage notifications,
	 * like {@link materialize}, {@link dematerialize}, {@link observeOn}, and
	 * others. Besides wrapping the actual delivered value, it also annotates it
	 * with metadata of, for instance, what type of push message it is (`next`,
	 * `error`, or `complete`).
	 *
	 * @see {@link materialize}
	 * @see {@link dematerialize}
	 * @see {@link observeOn}
	 *
	 * @class Notification<T>
	 */
	var Notification$1 = (function () {
	    function Notification(kind, value, error) {
	        this.kind = kind;
	        this.value = value;
	        this.error = error;
	        this.hasValue = kind === 'N';
	    }
	    /**
	     * Delivers to the given `observer` the value wrapped by this Notification.
	     * @param {Observer} observer
	     * @return
	     */
	    Notification.prototype.observe = function (observer) {
	        switch (this.kind) {
	            case 'N':
	                return observer.next && observer.next(this.value);
	            case 'E':
	                return observer.error && observer.error(this.error);
	            case 'C':
	                return observer.complete && observer.complete();
	        }
	    };
	    /**
	     * Given some {@link Observer} callbacks, deliver the value represented by the
	     * current Notification to the correctly corresponding callback.
	     * @param {function(value: T): void} next An Observer `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.do = function (next, error, complete) {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return next && next(this.value);
	            case 'E':
	                return error && error(this.error);
	            case 'C':
	                return complete && complete();
	        }
	    };
	    /**
	     * Takes an Observer or its individual callback functions, and calls `observe`
	     * or `do` methods accordingly.
	     * @param {Observer|function(value: T): void} nextOrObserver An Observer or
	     * the `next` callback.
	     * @param {function(err: any): void} [error] An Observer `error` callback.
	     * @param {function(): void} [complete] An Observer `complete` callback.
	     * @return {any}
	     */
	    Notification.prototype.accept = function (nextOrObserver, error, complete) {
	        if (nextOrObserver && typeof nextOrObserver.next === 'function') {
	            return this.observe(nextOrObserver);
	        }
	        else {
	            return this.do(nextOrObserver, error, complete);
	        }
	    };
	    /**
	     * Returns a simple Observable that just delivers the notification represented
	     * by this Notification instance.
	     * @return {any}
	     */
	    Notification.prototype.toObservable = function () {
	        var kind = this.kind;
	        switch (kind) {
	            case 'N':
	                return Observable_1$25.Observable.of(this.value);
	            case 'E':
	                return Observable_1$25.Observable.throw(this.error);
	            case 'C':
	                return Observable_1$25.Observable.empty();
	        }
	        throw new Error('unexpected notification kind value');
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `next` from a
	     * given value.
	     * @param {T} value The `next` value.
	     * @return {Notification<T>} The "next" Notification representing the
	     * argument.
	     */
	    Notification.createNext = function (value) {
	        if (typeof value !== 'undefined') {
	            return new Notification('N', value);
	        }
	        return this.undefinedValueNotification;
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `error` from a
	     * given error.
	     * @param {any} [err] The `error` error.
	     * @return {Notification<T>} The "error" Notification representing the
	     * argument.
	     */
	    Notification.createError = function (err) {
	        return new Notification('E', undefined, err);
	    };
	    /**
	     * A shortcut to create a Notification instance of the type `complete`.
	     * @return {Notification<any>} The valueless "complete" Notification.
	     */
	    Notification.createComplete = function () {
	        return this.completeNotification;
	    };
	    Notification.completeNotification = new Notification('C');
	    Notification.undefinedValueNotification = new Notification('N', undefined);
	    return Notification;
	}());
	var Notification_2 = Notification$1;


	var Notification_1$2 = {
		Notification: Notification_2
	};

	var __extends$22 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$7 = Subscriber_1$3;
	var Notification_1$1 = Notification_1$2;
	/**
	 *
	 * Re-emits all notifications from source Observable with specified scheduler.
	 *
	 * <span class="informal">Ensure a specific scheduler is used, from outside of an Observable.</span>
	 *
	 * `observeOn` is an operator that accepts a scheduler as a first parameter, which will be used to reschedule
	 * notifications emitted by the source Observable. It might be useful, if you do not have control over
	 * internal scheduler of a given Observable, but want to control when its values are emitted nevertheless.
	 *
	 * Returned Observable emits the same notifications (nexted values, complete and error events) as the source Observable,
	 * but rescheduled with provided scheduler. Note that this doesn't mean that source Observables internal
	 * scheduler will be replaced in any way. Original scheduler still will be used, but when the source Observable emits
	 * notification, it will be immediately scheduled again - this time with scheduler passed to `observeOn`.
	 * An anti-pattern would be calling `observeOn` on Observable that emits lots of values synchronously, to split
	 * that emissions into asynchronous chunks. For this to happen, scheduler would have to be passed into the source
	 * Observable directly (usually into the operator that creates it). `observeOn` simply delays notifications a
	 * little bit more, to ensure that they are emitted at expected moments.
	 *
	 * As a matter of fact, `observeOn` accepts second parameter, which specifies in milliseconds with what delay notifications
	 * will be emitted. The main difference between {@link delay} operator and `observeOn` is that `observeOn`
	 * will delay all notifications - including error notifications - while `delay` will pass through error
	 * from source Observable immediately when it is emitted. In general it is highly recommended to use `delay` operator
	 * for any kind of delaying of values in the stream, while using `observeOn` to specify which scheduler should be used
	 * for notification emissions in general.
	 *
	 * @example <caption>Ensure values in subscribe are called just before browser repaint.</caption>
	 * const intervals = Rx.Observable.interval(10); // Intervals are scheduled
	 *                                               // with async scheduler by default...
	 *
	 * intervals
	 * .observeOn(Rx.Scheduler.animationFrame)       // ...but we will observe on animationFrame
	 * .subscribe(val => {                           // scheduler to ensure smooth animation.
	 *   someDiv.style.height = val + 'px';
	 * });
	 *
	 * @see {@link delay}
	 *
	 * @param {IScheduler} scheduler Scheduler that will be used to reschedule notifications from source Observable.
	 * @param {number} [delay] Number of milliseconds that states with what delay every notification should be rescheduled.
	 * @return {Observable<T>} Observable that emits the same notifications as the source Observable,
	 * but with provided scheduler.
	 *
	 * @method observeOn
	 * @owner Observable
	 */
	function observeOn(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new ObserveOnOperator(scheduler, delay));
	}
	var observeOn_2 = observeOn;
	var ObserveOnOperator = (function () {
	    function ObserveOnOperator(scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
	    };
	    return ObserveOnOperator;
	}());
	var ObserveOnOperator_1 = ObserveOnOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ObserveOnSubscriber = (function (_super) {
	    __extends$22(ObserveOnSubscriber, _super);
	    function ObserveOnSubscriber(destination, scheduler, delay) {
	        if (delay === void 0) { delay = 0; }
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    ObserveOnSubscriber.dispatch = function (arg) {
	        var notification = arg.notification, destination = arg.destination;
	        notification.observe(destination);
	        this.unsubscribe();
	    };
	    ObserveOnSubscriber.prototype.scheduleMessage = function (notification) {
	        this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
	    };
	    ObserveOnSubscriber.prototype._next = function (value) {
	        this.scheduleMessage(Notification_1$1.Notification.createNext(value));
	    };
	    ObserveOnSubscriber.prototype._error = function (err) {
	        this.scheduleMessage(Notification_1$1.Notification.createError(err));
	    };
	    ObserveOnSubscriber.prototype._complete = function () {
	        this.scheduleMessage(Notification_1$1.Notification.createComplete());
	    };
	    return ObserveOnSubscriber;
	}(Subscriber_1$7.Subscriber));
	var ObserveOnSubscriber_1 = ObserveOnSubscriber;
	var ObserveOnMessage = (function () {
	    function ObserveOnMessage(notification, destination) {
	        this.notification = notification;
	        this.destination = destination;
	    }
	    return ObserveOnMessage;
	}());
	var ObserveOnMessage_1 = ObserveOnMessage;


	var observeOn_1$1 = {
		observeOn: observeOn_2,
		ObserveOnOperator: ObserveOnOperator_1,
		ObserveOnSubscriber: ObserveOnSubscriber_1,
		ObserveOnMessage: ObserveOnMessage_1
	};

	var __extends$18 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1$5 = isArray;
	var isArrayLike_1$2 = isArrayLike;
	var isPromise_1$3 = isPromise_1$1;
	var PromiseObservable_1 = PromiseObservable_1$1;
	var IteratorObservable_1 = IteratorObservable_1$1;
	var ArrayObservable_1$5 = ArrayObservable_1$1;
	var ArrayLikeObservable_1 = ArrayLikeObservable_1$1;
	var iterator_1$3 = iterator;
	var Observable_1$21 = Observable_1$2;
	var observeOn_1 = observeOn_1$1;
	var observable_1$4 = observable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromObservable = (function (_super) {
	    __extends$18(FromObservable, _super);
	    function FromObservable(ish, scheduler) {
	        _super.call(this, null);
	        this.ish = ish;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable from an Array, an array-like object, a Promise, an
	     * iterable object, or an Observable-like object.
	     *
	     * <span class="informal">Converts almost anything to an Observable.</span>
	     *
	     * <img src="./img/from.png" width="100%">
	     *
	     * Convert various other objects and data types into Observables. `from`
	     * converts a Promise or an array-like or an
	     * [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)
	     * object into an Observable that emits the items in that promise or array or
	     * iterable. A String, in this context, is treated as an array of characters.
	     * Observable-like objects (contains a function named with the ES2015 Symbol
	     * for Observable) can also be converted through this operator.
	     *
	     * @example <caption>Converts an array to an Observable</caption>
	     * var array = [10, 20, 30];
	     * var result = Rx.Observable.from(array);
	     * result.subscribe(x => console.log(x));
	     *
	     * // Results in the following:
	     * // 10 20 30
	     *
	     * @example <caption>Convert an infinite iterable (from a generator) to an Observable</caption>
	     * function* generateDoubles(seed) {
	     *   var i = seed;
	     *   while (true) {
	     *     yield i;
	     *     i = 2 * i; // double it
	     *   }
	     * }
	     *
	     * var iterator = generateDoubles(3);
	     * var result = Rx.Observable.from(iterator).take(10);
	     * result.subscribe(x => console.log(x));
	     *
	     * // Results in the following:
	     * // 3 6 12 24 48 96 192 384 768 1536
	     *
	     * @see {@link create}
	     * @see {@link fromEvent}
	     * @see {@link fromEventPattern}
	     * @see {@link fromPromise}
	     *
	     * @param {ObservableInput<T>} ish A subscribable object, a Promise, an
	     * Observable-like, an Array, an iterable or an array-like object to be
	     * converted.
	     * @param {Scheduler} [scheduler] The scheduler on which to schedule the
	     * emissions of values.
	     * @return {Observable<T>} The Observable whose values are originally from the
	     * input object that was converted.
	     * @static true
	     * @name from
	     * @owner Observable
	     */
	    FromObservable.create = function (ish, scheduler) {
	        if (ish != null) {
	            if (typeof ish[observable_1$4.observable] === 'function') {
	                if (ish instanceof Observable_1$21.Observable && !scheduler) {
	                    return ish;
	                }
	                return new FromObservable(ish, scheduler);
	            }
	            else if (isArray_1$5.isArray(ish)) {
	                return new ArrayObservable_1$5.ArrayObservable(ish, scheduler);
	            }
	            else if (isPromise_1$3.isPromise(ish)) {
	                return new PromiseObservable_1.PromiseObservable(ish, scheduler);
	            }
	            else if (typeof ish[iterator_1$3.iterator] === 'function' || typeof ish === 'string') {
	                return new IteratorObservable_1.IteratorObservable(ish, scheduler);
	            }
	            else if (isArrayLike_1$2.isArrayLike(ish)) {
	                return new ArrayLikeObservable_1.ArrayLikeObservable(ish, scheduler);
	            }
	        }
	        throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
	    };
	    FromObservable.prototype._subscribe = function (subscriber) {
	        var ish = this.ish;
	        var scheduler = this.scheduler;
	        if (scheduler == null) {
	            return ish[observable_1$4.observable]().subscribe(subscriber);
	        }
	        else {
	            return ish[observable_1$4.observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
	        }
	    };
	    return FromObservable;
	}(Observable_1$21.Observable));
	var FromObservable_2 = FromObservable;


	var FromObservable_1$1 = {
		FromObservable: FromObservable_2
	};

	var FromObservable_1 = FromObservable_1$1;
	var from_1$1 = FromObservable_1.FromObservable.create;


	var from$2 = {
		from: from_1$1
	};

	var Observable_1$20 = Observable_1$2;
	var from_1 = from$2;
	Observable_1$20.Observable.from = from_1.from;

	var __extends$23 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$27 = Observable_1$2;
	var tryCatch_1$5 = tryCatch_1$1;
	var isFunction_1$4 = isFunction_1$1;
	var errorObject_1$5 = errorObject;
	var Subscription_1$7 = Subscription_1$3;
	var toString$1 = Object.prototype.toString;
	function isNodeStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
	}
	function isJQueryStyleEventEmitter(sourceObj) {
	    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
	}
	function isNodeList(sourceObj) {
	    return !!sourceObj && toString$1.call(sourceObj) === '[object NodeList]';
	}
	function isHTMLCollection(sourceObj) {
	    return !!sourceObj && toString$1.call(sourceObj) === '[object HTMLCollection]';
	}
	function isEventTarget(sourceObj) {
	    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
	}
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromEventObservable = (function (_super) {
	    __extends$23(FromEventObservable, _super);
	    function FromEventObservable(sourceObj, eventName, selector, options) {
	        _super.call(this);
	        this.sourceObj = sourceObj;
	        this.eventName = eventName;
	        this.selector = selector;
	        this.options = options;
	    }
	    /* tslint:enable:max-line-length */
	    /**
	     * Creates an Observable that emits events of a specific type coming from the
	     * given event target.
	     *
	     * <span class="informal">Creates an Observable from DOM events, or Node
	     * EventEmitter events or others.</span>
	     *
	     * <img src="./img/fromEvent.png" width="100%">
	     *
	     * Creates an Observable by attaching an event listener to an "event target",
	     * which may be an object with `addEventListener` and `removeEventListener`,
	     * a Node.js EventEmitter, a jQuery style EventEmitter, a NodeList from the
	     * DOM, or an HTMLCollection from the DOM. The event handler is attached when
	     * the output Observable is subscribed, and removed when the Subscription is
	     * unsubscribed.
	     *
	     * @example <caption>Emits clicks happening on the DOM document</caption>
	     * var clicks = Rx.Observable.fromEvent(document, 'click');
	     * clicks.subscribe(x => console.log(x));
	     *
	     * // Results in:
	     * // MouseEvent object logged to console everytime a click
	     * // occurs on the document.
	     *
	     * @see {@link from}
	     * @see {@link fromEventPattern}
	     *
	     * @param {EventTargetLike} target The DOMElement, event target, Node.js
	     * EventEmitter, NodeList or HTMLCollection to attach the event handler to.
	     * @param {string} eventName The event name of interest, being emitted by the
	     * `target`.
	     * @param {EventListenerOptions} [options] Options to pass through to addEventListener
	     * @param {SelectorMethodSignature<T>} [selector] An optional function to
	     * post-process results. It takes the arguments from the event handler and
	     * should return a single value.
	     * @return {Observable<T>}
	     * @static true
	     * @name fromEvent
	     * @owner Observable
	     */
	    FromEventObservable.create = function (target, eventName, options, selector) {
	        if (isFunction_1$4.isFunction(options)) {
	            selector = options;
	            options = undefined;
	        }
	        return new FromEventObservable(target, eventName, selector, options);
	    };
	    FromEventObservable.setupSubscription = function (sourceObj, eventName, handler, subscriber, options) {
	        var unsubscribe;
	        if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
	            for (var i = 0, len = sourceObj.length; i < len; i++) {
	                FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
	            }
	        }
	        else if (isEventTarget(sourceObj)) {
	            var source_1 = sourceObj;
	            sourceObj.addEventListener(eventName, handler, options);
	            unsubscribe = function () { return source_1.removeEventListener(eventName, handler); };
	        }
	        else if (isJQueryStyleEventEmitter(sourceObj)) {
	            var source_2 = sourceObj;
	            sourceObj.on(eventName, handler);
	            unsubscribe = function () { return source_2.off(eventName, handler); };
	        }
	        else if (isNodeStyleEventEmitter(sourceObj)) {
	            var source_3 = sourceObj;
	            sourceObj.addListener(eventName, handler);
	            unsubscribe = function () { return source_3.removeListener(eventName, handler); };
	        }
	        else {
	            throw new TypeError('Invalid event target');
	        }
	        subscriber.add(new Subscription_1$7.Subscription(unsubscribe));
	    };
	    FromEventObservable.prototype._subscribe = function (subscriber) {
	        var sourceObj = this.sourceObj;
	        var eventName = this.eventName;
	        var options = this.options;
	        var selector = this.selector;
	        var handler = selector ? function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var result = tryCatch_1$5.tryCatch(selector).apply(void 0, args);
	            if (result === errorObject_1$5.errorObject) {
	                subscriber.error(errorObject_1$5.errorObject.e);
	            }
	            else {
	                subscriber.next(result);
	            }
	        } : function (e) { return subscriber.next(e); };
	        FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber, options);
	    };
	    return FromEventObservable;
	}(Observable_1$27.Observable));
	var FromEventObservable_2 = FromEventObservable;


	var FromEventObservable_1$1 = {
		FromEventObservable: FromEventObservable_2
	};

	var FromEventObservable_1 = FromEventObservable_1$1;
	var fromEvent_1$1 = FromEventObservable_1.FromEventObservable.create;


	var fromEvent$2 = {
		fromEvent: fromEvent_1$1
	};

	var Observable_1$26 = Observable_1$2;
	var fromEvent_1 = fromEvent$2;
	Observable_1$26.Observable.fromEvent = fromEvent_1.fromEvent;

	var __extends$24 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isFunction_1$5 = isFunction_1$1;
	var Observable_1$29 = Observable_1$2;
	var Subscription_1$8 = Subscription_1$3;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var FromEventPatternObservable = (function (_super) {
	    __extends$24(FromEventPatternObservable, _super);
	    function FromEventPatternObservable(addHandler, removeHandler, selector) {
	        _super.call(this);
	        this.addHandler = addHandler;
	        this.removeHandler = removeHandler;
	        this.selector = selector;
	    }
	    /**
	     * Creates an Observable from an API based on addHandler/removeHandler
	     * functions.
	     *
	     * <span class="informal">Converts any addHandler/removeHandler API to an
	     * Observable.</span>
	     *
	     * <img src="./img/fromEventPattern.png" width="100%">
	     *
	     * Creates an Observable by using the `addHandler` and `removeHandler`
	     * functions to add and remove the handlers, with an optional selector
	     * function to project the event arguments to a result. The `addHandler` is
	     * called when the output Observable is subscribed, and `removeHandler` is
	     * called when the Subscription is unsubscribed.
	     *
	     * @example <caption>Emits clicks happening on the DOM document</caption>
	     * function addClickHandler(handler) {
	     *   document.addEventListener('click', handler);
	     * }
	     *
	     * function removeClickHandler(handler) {
	     *   document.removeEventListener('click', handler);
	     * }
	     *
	     * var clicks = Rx.Observable.fromEventPattern(
	     *   addClickHandler,
	     *   removeClickHandler
	     * );
	     * clicks.subscribe(x => console.log(x));
	     *
	     * @see {@link from}
	     * @see {@link fromEvent}
	     *
	     * @param {function(handler: Function): any} addHandler A function that takes
	     * a `handler` function as argument and attaches it somehow to the actual
	     * source of events.
	     * @param {function(handler: Function, signal?: any): void} [removeHandler] An optional function that
	     * takes a `handler` function as argument and removes it in case it was
	     * previously attached using `addHandler`. if addHandler returns signal to teardown when remove,
	     * removeHandler function will forward it.
	     * @param {function(...args: any): T} [selector] An optional function to
	     * post-process results. It takes the arguments from the event handler and
	     * should return a single value.
	     * @return {Observable<T>}
	     * @static true
	     * @name fromEventPattern
	     * @owner Observable
	     */
	    FromEventPatternObservable.create = function (addHandler, removeHandler, selector) {
	        return new FromEventPatternObservable(addHandler, removeHandler, selector);
	    };
	    FromEventPatternObservable.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var removeHandler = this.removeHandler;
	        var handler = !!this.selector ? function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            _this._callSelector(subscriber, args);
	        } : function (e) { subscriber.next(e); };
	        var retValue = this._callAddHandler(handler, subscriber);
	        if (!isFunction_1$5.isFunction(removeHandler)) {
	            return;
	        }
	        subscriber.add(new Subscription_1$8.Subscription(function () {
	            //TODO: determine whether or not to forward to error handler
	            removeHandler(handler, retValue);
	        }));
	    };
	    FromEventPatternObservable.prototype._callSelector = function (subscriber, args) {
	        try {
	            var result = this.selector.apply(this, args);
	            subscriber.next(result);
	        }
	        catch (e) {
	            subscriber.error(e);
	        }
	    };
	    FromEventPatternObservable.prototype._callAddHandler = function (handler, errorSubscriber) {
	        try {
	            return this.addHandler(handler) || null;
	        }
	        catch (e) {
	            errorSubscriber.error(e);
	        }
	    };
	    return FromEventPatternObservable;
	}(Observable_1$29.Observable));
	var FromEventPatternObservable_2 = FromEventPatternObservable;


	var FromEventPatternObservable_1$1 = {
		FromEventPatternObservable: FromEventPatternObservable_2
	};

	var FromEventPatternObservable_1 = FromEventPatternObservable_1$1;
	var fromEventPattern_1$1 = FromEventPatternObservable_1.FromEventPatternObservable.create;


	var fromEventPattern$2 = {
		fromEventPattern: fromEventPattern_1$1
	};

	var Observable_1$28 = Observable_1$2;
	var fromEventPattern_1 = fromEventPattern$2;
	Observable_1$28.Observable.fromEventPattern = fromEventPattern_1.fromEventPattern;

	var PromiseObservable_1$3 = PromiseObservable_1$1;
	var fromPromise_1$1 = PromiseObservable_1$3.PromiseObservable.create;


	var fromPromise$2 = {
		fromPromise: fromPromise_1$1
	};

	var Observable_1$30 = Observable_1$2;
	var fromPromise_1 = fromPromise$2;
	Observable_1$30.Observable.fromPromise = fromPromise_1.fromPromise;

	var __extends$25 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$32 = Observable_1$2;
	var isScheduler_1$5 = isScheduler_1$1;
	var selfSelector = function (value) { return value; };
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var GenerateObservable = (function (_super) {
	    __extends$25(GenerateObservable, _super);
	    function GenerateObservable(initialState, condition, iterate, resultSelector, scheduler) {
	        _super.call(this);
	        this.initialState = initialState;
	        this.condition = condition;
	        this.iterate = iterate;
	        this.resultSelector = resultSelector;
	        this.scheduler = scheduler;
	    }
	    GenerateObservable.create = function (initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler) {
	        if (arguments.length == 1) {
	            return new GenerateObservable(initialStateOrOptions.initialState, initialStateOrOptions.condition, initialStateOrOptions.iterate, initialStateOrOptions.resultSelector || selfSelector, initialStateOrOptions.scheduler);
	        }
	        if (resultSelectorOrObservable === undefined || isScheduler_1$5.isScheduler(resultSelectorOrObservable)) {
	            return new GenerateObservable(initialStateOrOptions, condition, iterate, selfSelector, resultSelectorOrObservable);
	        }
	        return new GenerateObservable(initialStateOrOptions, condition, iterate, resultSelectorOrObservable, scheduler);
	    };
	    GenerateObservable.prototype._subscribe = function (subscriber) {
	        var state = this.initialState;
	        if (this.scheduler) {
	            return this.scheduler.schedule(GenerateObservable.dispatch, 0, {
	                subscriber: subscriber,
	                iterate: this.iterate,
	                condition: this.condition,
	                resultSelector: this.resultSelector,
	                state: state });
	        }
	        var _a = this, condition = _a.condition, resultSelector = _a.resultSelector, iterate = _a.iterate;
	        do {
	            if (condition) {
	                var conditionResult = void 0;
	                try {
	                    conditionResult = condition(state);
	                }
	                catch (err) {
	                    subscriber.error(err);
	                    return;
	                }
	                if (!conditionResult) {
	                    subscriber.complete();
	                    break;
	                }
	            }
	            var value = void 0;
	            try {
	                value = resultSelector(state);
	            }
	            catch (err) {
	                subscriber.error(err);
	                return;
	            }
	            subscriber.next(value);
	            if (subscriber.closed) {
	                break;
	            }
	            try {
	                state = iterate(state);
	            }
	            catch (err) {
	                subscriber.error(err);
	                return;
	            }
	        } while (true);
	    };
	    GenerateObservable.dispatch = function (state) {
	        var subscriber = state.subscriber, condition = state.condition;
	        if (subscriber.closed) {
	            return;
	        }
	        if (state.needIterate) {
	            try {
	                state.state = state.iterate(state.state);
	            }
	            catch (err) {
	                subscriber.error(err);
	                return;
	            }
	        }
	        else {
	            state.needIterate = true;
	        }
	        if (condition) {
	            var conditionResult = void 0;
	            try {
	                conditionResult = condition(state.state);
	            }
	            catch (err) {
	                subscriber.error(err);
	                return;
	            }
	            if (!conditionResult) {
	                subscriber.complete();
	                return;
	            }
	            if (subscriber.closed) {
	                return;
	            }
	        }
	        var value;
	        try {
	            value = state.resultSelector(state.state);
	        }
	        catch (err) {
	            subscriber.error(err);
	            return;
	        }
	        if (subscriber.closed) {
	            return;
	        }
	        subscriber.next(value);
	        if (subscriber.closed) {
	            return;
	        }
	        return this.schedule(state);
	    };
	    return GenerateObservable;
	}(Observable_1$32.Observable));
	var GenerateObservable_2 = GenerateObservable;


	var GenerateObservable_1$1 = {
		GenerateObservable: GenerateObservable_2
	};

	var Observable_1$31 = Observable_1$2;
	var GenerateObservable_1 = GenerateObservable_1$1;
	Observable_1$31.Observable.generate = GenerateObservable_1.GenerateObservable.create;

	var __extends$26 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$34 = Observable_1$2;
	var subscribeToResult_1$6 = subscribeToResult_1$1;
	var OuterSubscriber_1$6 = OuterSubscriber_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IfObservable = (function (_super) {
	    __extends$26(IfObservable, _super);
	    function IfObservable(condition, thenSource, elseSource) {
	        _super.call(this);
	        this.condition = condition;
	        this.thenSource = thenSource;
	        this.elseSource = elseSource;
	    }
	    IfObservable.create = function (condition, thenSource, elseSource) {
	        return new IfObservable(condition, thenSource, elseSource);
	    };
	    IfObservable.prototype._subscribe = function (subscriber) {
	        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
	        return new IfSubscriber(subscriber, condition, thenSource, elseSource);
	    };
	    return IfObservable;
	}(Observable_1$34.Observable));
	var IfObservable_2 = IfObservable;
	var IfSubscriber = (function (_super) {
	    __extends$26(IfSubscriber, _super);
	    function IfSubscriber(destination, condition, thenSource, elseSource) {
	        _super.call(this, destination);
	        this.condition = condition;
	        this.thenSource = thenSource;
	        this.elseSource = elseSource;
	        this.tryIf();
	    }
	    IfSubscriber.prototype.tryIf = function () {
	        var _a = this, condition = _a.condition, thenSource = _a.thenSource, elseSource = _a.elseSource;
	        var result;
	        try {
	            result = condition();
	            var source = result ? thenSource : elseSource;
	            if (source) {
	                this.add(subscribeToResult_1$6.subscribeToResult(this, source));
	            }
	            else {
	                this._complete();
	            }
	        }
	        catch (err) {
	            this._error(err);
	        }
	    };
	    return IfSubscriber;
	}(OuterSubscriber_1$6.OuterSubscriber));


	var IfObservable_1$1 = {
		IfObservable: IfObservable_2
	};

	var IfObservable_1 = IfObservable_1$1;
	var _if_1 = IfObservable_1.IfObservable.create;


	var _if$2 = {
		_if: _if_1
	};

	var Observable_1$33 = Observable_1$2;
	var if_1 = _if$2;
	Observable_1$33.Observable.if = if_1._if;

	var isArray_1$6 = isArray;
	function isNumeric(val) {
	    // parseFloat NaNs numeric-cast false positives (null|true|false|"")
	    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
	    // subtraction forces infinities to NaN
	    // adding 1 corrects loss of precision from parseFloat (#15100)
	    return !isArray_1$6.isArray(val) && (val - parseFloat(val) + 1) >= 0;
	}
	var isNumeric_2 = isNumeric;



	var isNumeric_1$1 = {
		isNumeric: isNumeric_2
	};

	var __extends$29 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1$9 = Subscription_1$3;
	/**
	 * A unit of work to be executed in a {@link Scheduler}. An action is typically
	 * created from within a Scheduler and an RxJS user does not need to concern
	 * themselves about creating and manipulating an Action.
	 *
	 * ```ts
	 * class Action<T> extends Subscription {
	 *   new (scheduler: Scheduler, work: (state?: T) => void);
	 *   schedule(state?: T, delay: number = 0): Subscription;
	 * }
	 * ```
	 *
	 * @class Action<T>
	 */
	var Action = (function (_super) {
	    __extends$29(Action, _super);
	    function Action(scheduler, work) {
	        _super.call(this);
	    }
	    /**
	     * Schedules this action on its parent Scheduler for execution. May be passed
	     * some context object, `state`. May happen at some point in the future,
	     * according to the `delay` parameter, if specified.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler.
	     * @return {void}
	     */
	    Action.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        return this;
	    };
	    return Action;
	}(Subscription_1$9.Subscription));
	var Action_2 = Action;


	var Action_1$1 = {
		Action: Action_2
	};

	var __extends$28 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1$5 = root$1;
	var Action_1 = Action_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AsyncAction = (function (_super) {
	    __extends$28(AsyncAction, _super);
	    function AsyncAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.pending = false;
	    }
	    AsyncAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (this.closed) {
	            return this;
	        }
	        // Always replace the current state with the new state.
	        this.state = state;
	        // Set the pending flag indicating that this action has been scheduled, or
	        // has recursively rescheduled itself.
	        this.pending = true;
	        var id = this.id;
	        var scheduler = this.scheduler;
	        //
	        // Important implementation note:
	        //
	        // Actions only execute once by default, unless rescheduled from within the
	        // scheduled callback. This allows us to implement single and repeat
	        // actions via the same code path, without adding API surface area, as well
	        // as mimic traditional recursion but across asynchronous boundaries.
	        //
	        // However, JS runtimes and timers distinguish between intervals achieved by
	        // serial `setTimeout` calls vs. a single `setInterval` call. An interval of
	        // serial `setTimeout` calls can be individually delayed, which delays
	        // scheduling the next `setTimeout`, and so on. `setInterval` attempts to
	        // guarantee the interval callback will be invoked more precisely to the
	        // interval period, regardless of load.
	        //
	        // Therefore, we use `setInterval` to schedule single and repeat actions.
	        // If the action reschedules itself with the same delay, the interval is not
	        // canceled. If the action doesn't reschedule, or reschedules with a
	        // different delay, the interval will be canceled after scheduled callback
	        // execution.
	        //
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, delay);
	        }
	        this.delay = delay;
	        // If this action has already an async Id, don't request a new one.
	        this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
	        return this;
	    };
	    AsyncAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        return root_1$5.root.setInterval(scheduler.flush.bind(scheduler, this), delay);
	    };
	    AsyncAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If this action is rescheduled with the same delay time, don't clear the interval id.
	        if (delay !== null && this.delay === delay && this.pending === false) {
	            return id;
	        }
	        // Otherwise, if the action's delay time is different from the current delay,
	        // or the action has been rescheduled before it's executed, clear the interval id
	        return root_1$5.root.clearInterval(id) && undefined || undefined;
	    };
	    /**
	     * Immediately executes this action and the `work` it contains.
	     * @return {any}
	     */
	    AsyncAction.prototype.execute = function (state, delay) {
	        if (this.closed) {
	            return new Error('executing a cancelled action');
	        }
	        this.pending = false;
	        var error = this._execute(state, delay);
	        if (error) {
	            return error;
	        }
	        else if (this.pending === false && this.id != null) {
	            // Dequeue if the action didn't reschedule itself. Don't call
	            // unsubscribe(), because the action could reschedule later.
	            // For example:
	            // ```
	            // scheduler.schedule(function doWork(counter) {
	            //   /* ... I'm a busy worker bee ... */
	            //   var originalAction = this;
	            //   /* wait 100ms before rescheduling the action */
	            //   setTimeout(function () {
	            //     originalAction.schedule(counter + 1);
	            //   }, 100);
	            // }, 1000);
	            // ```
	            this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	        }
	    };
	    AsyncAction.prototype._execute = function (state, delay) {
	        var errored = false;
	        var errorValue = undefined;
	        try {
	            this.work(state);
	        }
	        catch (e) {
	            errored = true;
	            errorValue = !!e && e || new Error(e);
	        }
	        if (errored) {
	            this.unsubscribe();
	            return errorValue;
	        }
	    };
	    AsyncAction.prototype._unsubscribe = function () {
	        var id = this.id;
	        var scheduler = this.scheduler;
	        var actions = scheduler.actions;
	        var index = actions.indexOf(this);
	        this.work = null;
	        this.state = null;
	        this.pending = false;
	        this.scheduler = null;
	        if (index !== -1) {
	            actions.splice(index, 1);
	        }
	        if (id != null) {
	            this.id = this.recycleAsyncId(scheduler, id, null);
	        }
	        this.delay = null;
	    };
	    return AsyncAction;
	}(Action_1.Action));
	var AsyncAction_2 = AsyncAction;


	var AsyncAction_1$1 = {
		AsyncAction: AsyncAction_2
	};

	/**
	 * An execution context and a data structure to order tasks and schedule their
	 * execution. Provides a notion of (potentially virtual) time, through the
	 * `now()` getter method.
	 *
	 * Each unit of work in a Scheduler is called an {@link Action}.
	 *
	 * ```ts
	 * class Scheduler {
	 *   now(): number;
	 *   schedule(work, delay?, state?): Subscription;
	 * }
	 * ```
	 *
	 * @class Scheduler
	 */
	var Scheduler$1 = (function () {
	    function Scheduler(SchedulerAction, now) {
	        if (now === void 0) { now = Scheduler.now; }
	        this.SchedulerAction = SchedulerAction;
	        this.now = now;
	    }
	    /**
	     * Schedules a function, `work`, for execution. May happen at some point in
	     * the future, according to the `delay` parameter, if specified. May be passed
	     * some context object, `state`, which will be passed to the `work` function.
	     *
	     * The given arguments will be processed an stored as an Action object in a
	     * queue of actions.
	     *
	     * @param {function(state: ?T): ?Subscription} work A function representing a
	     * task, or some unit of work to be executed by the Scheduler.
	     * @param {number} [delay] Time to wait before executing the work, where the
	     * time unit is implicit and defined by the Scheduler itself.
	     * @param {T} [state] Some contextual data that the `work` function uses when
	     * called by the Scheduler.
	     * @return {Subscription} A subscription in order to be able to unsubscribe
	     * the scheduled work.
	     */
	    Scheduler.prototype.schedule = function (work, delay, state) {
	        if (delay === void 0) { delay = 0; }
	        return new this.SchedulerAction(this, work).schedule(state, delay);
	    };
	    Scheduler.now = Date.now ? Date.now : function () { return +new Date(); };
	    return Scheduler;
	}());
	var Scheduler_2 = Scheduler$1;


	var Scheduler_1$2 = {
		Scheduler: Scheduler_2
	};

	var __extends$30 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Scheduler_1$1 = Scheduler_1$2;
	var AsyncScheduler = (function (_super) {
	    __extends$30(AsyncScheduler, _super);
	    function AsyncScheduler() {
	        _super.apply(this, arguments);
	        this.actions = [];
	        /**
	         * A flag to indicate whether the Scheduler is currently executing a batch of
	         * queued actions.
	         * @type {boolean}
	         */
	        this.active = false;
	        /**
	         * An internal ID used to track the latest asynchronous task such as those
	         * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
	         * others.
	         * @type {any}
	         */
	        this.scheduled = undefined;
	    }
	    AsyncScheduler.prototype.flush = function (action) {
	        var actions = this.actions;
	        if (this.active) {
	            actions.push(action);
	            return;
	        }
	        var error;
	        this.active = true;
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (action = actions.shift()); // exhaust the scheduler queue
	        this.active = false;
	        if (error) {
	            while (action = actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsyncScheduler;
	}(Scheduler_1$1.Scheduler));
	var AsyncScheduler_2 = AsyncScheduler;


	var AsyncScheduler_1$1 = {
		AsyncScheduler: AsyncScheduler_2
	};

	var AsyncAction_1 = AsyncAction_1$1;
	var AsyncScheduler_1 = AsyncScheduler_1$1;
	/**
	 *
	 * Async Scheduler
	 *
	 * <span class="informal">Schedule task as if you used setTimeout(task, duration)</span>
	 *
	 * `async` scheduler schedules tasks asynchronously, by putting them on the JavaScript
	 * event loop queue. It is best used to delay tasks in time or to schedule tasks repeating
	 * in intervals.
	 *
	 * If you just want to "defer" task, that is to perform it right after currently
	 * executing synchronous code ends (commonly achieved by `setTimeout(deferredTask, 0)`),
	 * better choice will be the {@link asap} scheduler.
	 *
	 * @example <caption>Use async scheduler to delay task</caption>
	 * const task = () => console.log('it works!');
	 *
	 * Rx.Scheduler.async.schedule(task, 2000);
	 *
	 * // After 2 seconds logs:
	 * // "it works!"
	 *
	 *
	 * @example <caption>Use async scheduler to repeat task in intervals</caption>
	 * function task(state) {
	 *   console.log(state);
	 *   this.schedule(state + 1, 1000); // `this` references currently executing Action,
	 *                                   // which we reschedule with new state and delay
	 * }
	 *
	 * Rx.Scheduler.async.schedule(task, 3000, 0);
	 *
	 * // Logs:
	 * // 0 after 3s
	 * // 1 after 4s
	 * // 2 after 5s
	 * // 3 after 6s
	 *
	 * @static true
	 * @name async
	 * @owner Scheduler
	 */
	var async_1$2 = new AsyncScheduler_1.AsyncScheduler(AsyncAction_1.AsyncAction);


	var async = {
		async: async_1$2
	};

	var __extends$27 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1 = isNumeric_1$1;
	var Observable_1$36 = Observable_1$2;
	var async_1$1 = async;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var IntervalObservable = (function (_super) {
	    __extends$27(IntervalObservable, _super);
	    function IntervalObservable(period, scheduler) {
	        if (period === void 0) { period = 0; }
	        if (scheduler === void 0) { scheduler = async_1$1.async; }
	        _super.call(this);
	        this.period = period;
	        this.scheduler = scheduler;
	        if (!isNumeric_1.isNumeric(period) || period < 0) {
	            this.period = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = async_1$1.async;
	        }
	    }
	    /**
	     * Creates an Observable that emits sequential numbers every specified
	     * interval of time, on a specified IScheduler.
	     *
	     * <span class="informal">Emits incremental numbers periodically in time.
	     * </span>
	     *
	     * <img src="./img/interval.png" width="100%">
	     *
	     * `interval` returns an Observable that emits an infinite sequence of
	     * ascending integers, with a constant interval of time of your choosing
	     * between those emissions. The first emission is not sent immediately, but
	     * only after the first period has passed. By default, this operator uses the
	     * `async` IScheduler to provide a notion of time, but you may pass any
	     * IScheduler to it.
	     *
	     * @example <caption>Emits ascending numbers, one every second (1000ms)</caption>
	     * var numbers = Rx.Observable.interval(1000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link timer}
	     * @see {@link delay}
	     *
	     * @param {number} [period=0] The interval size in milliseconds (by default)
	     * or the time unit determined by the scheduler's clock.
	     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
	     * the emission of values, and providing a notion of "time".
	     * @return {Observable} An Observable that emits a sequential number each time
	     * interval.
	     * @static true
	     * @name interval
	     * @owner Observable
	     */
	    IntervalObservable.create = function (period, scheduler) {
	        if (period === void 0) { period = 0; }
	        if (scheduler === void 0) { scheduler = async_1$1.async; }
	        return new IntervalObservable(period, scheduler);
	    };
	    IntervalObservable.dispatch = function (state) {
	        var index = state.index, subscriber = state.subscriber, period = state.period;
	        subscriber.next(index);
	        if (subscriber.closed) {
	            return;
	        }
	        state.index += 1;
	        this.schedule(state, period);
	    };
	    IntervalObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var period = this.period;
	        var scheduler = this.scheduler;
	        subscriber.add(scheduler.schedule(IntervalObservable.dispatch, period, {
	            index: index, subscriber: subscriber, period: period
	        }));
	    };
	    return IntervalObservable;
	}(Observable_1$36.Observable));
	var IntervalObservable_2 = IntervalObservable;


	var IntervalObservable_1$1 = {
		IntervalObservable: IntervalObservable_2
	};

	var IntervalObservable_1 = IntervalObservable_1$1;
	var interval_1$1 = IntervalObservable_1.IntervalObservable.create;


	var interval$2 = {
		interval: interval_1$1
	};

	var Observable_1$35 = Observable_1$2;
	var interval_1 = interval$2;
	Observable_1$35.Observable.interval = interval_1.interval;

	var Observable_1$38 = Observable_1$2;
	var ArrayObservable_1$6 = ArrayObservable_1$1;
	var mergeAll_1$3 = mergeAll_1$1;
	var isScheduler_1$6 = isScheduler_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which concurrently emits all values from every
	 * given input Observable.
	 *
	 * <span class="informal">Flattens multiple Observables together by blending
	 * their values into one Observable.</span>
	 *
	 * <img src="./img/merge.png" width="100%">
	 *
	 * `merge` subscribes to each given input Observable (either the source or an
	 * Observable given as argument), and simply forwards (without doing any
	 * transformation) all the values from all the input Observables to the output
	 * Observable. The output Observable only completes once all input Observables
	 * have completed. Any error delivered by an input Observable will be immediately
	 * emitted on the output Observable.
	 *
	 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var timer = Rx.Observable.interval(1000);
	 * var clicksOrTimer = clicks.merge(timer);
	 * clicksOrTimer.subscribe(x => console.log(x));
	 *
	 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var concurrent = 2; // the argument
	 * var merged = timer1.merge(timer2, timer3, concurrent);
	 * merged.subscribe(x => console.log(x));
	 *
	 * @see {@link mergeAll}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 *
	 * @param {ObservableInput} other An input Observable to merge with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
	 * concurrency of input Observables.
	 * @return {Observable} An Observable that emits items that are the result of
	 * every input Observable.
	 * @method merge
	 * @owner Observable
	 */
	function merge$4() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return this.lift.call(mergeStatic.apply(void 0, [this].concat(observables)));
	}
	var merge_2$1 = merge$4;
	/* tslint:enable:max-line-length */
	/**
	 * Creates an output Observable which concurrently emits all values from every
	 * given input Observable.
	 *
	 * <span class="informal">Flattens multiple Observables together by blending
	 * their values into one Observable.</span>
	 *
	 * <img src="./img/merge.png" width="100%">
	 *
	 * `merge` subscribes to each given input Observable (as arguments), and simply
	 * forwards (without doing any transformation) all the values from all the input
	 * Observables to the output Observable. The output Observable only completes
	 * once all input Observables have completed. Any error delivered by an input
	 * Observable will be immediately emitted on the output Observable.
	 *
	 * @example <caption>Merge together two Observables: 1s interval and clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var timer = Rx.Observable.interval(1000);
	 * var clicksOrTimer = Rx.Observable.merge(clicks, timer);
	 * clicksOrTimer.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // timer will emit ascending values, one every second(1000ms) to console
	 * // clicks logs MouseEvents to console everytime the "document" is clicked
	 * // Since the two streams are merged you see these happening
	 * // as they occur.
	 *
	 * @example <caption>Merge together 3 Observables, but only 2 run concurrently</caption>
	 * var timer1 = Rx.Observable.interval(1000).take(10);
	 * var timer2 = Rx.Observable.interval(2000).take(6);
	 * var timer3 = Rx.Observable.interval(500).take(10);
	 * var concurrent = 2; // the argument
	 * var merged = Rx.Observable.merge(timer1, timer2, timer3, concurrent);
	 * merged.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // - First timer1 and timer2 will run concurrently
	 * // - timer1 will emit a value every 1000ms for 10 iterations
	 * // - timer2 will emit a value every 2000ms for 6 iterations
	 * // - after timer1 hits it's max iteration, timer2 will
	 * //   continue, and timer3 will start to run concurrently with timer2
	 * // - when timer2 hits it's max iteration it terminates, and
	 * //   timer3 will continue to emit a value every 500ms until it is complete
	 *
	 * @see {@link mergeAll}
	 * @see {@link mergeMap}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 *
	 * @param {...ObservableInput} observables Input Observables to merge together.
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @param {Scheduler} [scheduler=null] The IScheduler to use for managing
	 * concurrency of input Observables.
	 * @return {Observable} an Observable that emits items that are the result of
	 * every input Observable.
	 * @static true
	 * @name merge
	 * @owner Observable
	 */
	function mergeStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var concurrent = Number.POSITIVE_INFINITY;
	    var scheduler = null;
	    var last = observables[observables.length - 1];
	    if (isScheduler_1$6.isScheduler(last)) {
	        scheduler = observables.pop();
	        if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
	            concurrent = observables.pop();
	        }
	    }
	    else if (typeof last === 'number') {
	        concurrent = observables.pop();
	    }
	    if (scheduler === null && observables.length === 1 && observables[0] instanceof Observable_1$38.Observable) {
	        return observables[0];
	    }
	    return new ArrayObservable_1$6.ArrayObservable(observables, scheduler).lift(new mergeAll_1$3.MergeAllOperator(concurrent));
	}
	var mergeStatic_1 = mergeStatic;


	var merge_1$2 = {
		merge: merge_2$1,
		mergeStatic: mergeStatic_1
	};

	var merge_1$1 = merge_1$2;
	var merge_2 = merge_1$1.mergeStatic;


	var merge$2 = {
		merge: merge_2
	};

	var Observable_1$37 = Observable_1$2;
	var merge_1 = merge$2;
	Observable_1$37.Observable.merge = merge_1.merge;

	var __extends$31 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isArray_1$7 = isArray;
	var ArrayObservable_1$7 = ArrayObservable_1$1;
	var OuterSubscriber_1$7 = OuterSubscriber_1$1;
	var subscribeToResult_1$7 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that mirrors the first source Observable to emit an item
	 * from the combination of this Observable and supplied Observables.
	 * @param {...Observables} ...observables Sources used to race for which Observable emits first.
	 * @return {Observable} An Observable that mirrors the output of the first Observable to emit an item.
	 * @method race
	 * @owner Observable
	 */
	function race$2() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    // if the only argument is an array, it was most likely called with
	    // `pair([obs1, obs2, ...])`
	    if (observables.length === 1 && isArray_1$7.isArray(observables[0])) {
	        observables = observables[0];
	    }
	    return this.lift.call(raceStatic.apply(void 0, [this].concat(observables)));
	}
	var race_2 = race$2;
	function raceStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    // if the only argument is an array, it was most likely called with
	    // `race([obs1, obs2, ...])`
	    if (observables.length === 1) {
	        if (isArray_1$7.isArray(observables[0])) {
	            observables = observables[0];
	        }
	        else {
	            return observables[0];
	        }
	    }
	    return new ArrayObservable_1$7.ArrayObservable(observables).lift(new RaceOperator());
	}
	var raceStatic_1 = raceStatic;
	var RaceOperator = (function () {
	    function RaceOperator() {
	    }
	    RaceOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new RaceSubscriber(subscriber));
	    };
	    return RaceOperator;
	}());
	var RaceOperator_1 = RaceOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RaceSubscriber = (function (_super) {
	    __extends$31(RaceSubscriber, _super);
	    function RaceSubscriber(destination) {
	        _super.call(this, destination);
	        this.hasFirst = false;
	        this.observables = [];
	        this.subscriptions = [];
	    }
	    RaceSubscriber.prototype._next = function (observable) {
	        this.observables.push(observable);
	    };
	    RaceSubscriber.prototype._complete = function () {
	        var observables = this.observables;
	        var len = observables.length;
	        if (len === 0) {
	            this.destination.complete();
	        }
	        else {
	            for (var i = 0; i < len && !this.hasFirst; i++) {
	                var observable = observables[i];
	                var subscription = subscribeToResult_1$7.subscribeToResult(this, observable, observable, i);
	                if (this.subscriptions) {
	                    this.subscriptions.push(subscription);
	                }
	                this.add(subscription);
	            }
	            this.observables = null;
	        }
	    };
	    RaceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (!this.hasFirst) {
	            this.hasFirst = true;
	            for (var i = 0; i < this.subscriptions.length; i++) {
	                if (i !== outerIndex) {
	                    var subscription = this.subscriptions[i];
	                    subscription.unsubscribe();
	                    this.remove(subscription);
	                }
	            }
	            this.subscriptions = null;
	        }
	        this.destination.next(innerValue);
	    };
	    return RaceSubscriber;
	}(OuterSubscriber_1$7.OuterSubscriber));
	var RaceSubscriber_1 = RaceSubscriber;


	var race_1$1 = {
		race: race_2,
		raceStatic: raceStatic_1,
		RaceOperator: RaceOperator_1,
		RaceSubscriber: RaceSubscriber_1
	};

	var Observable_1$39 = Observable_1$2;
	var race_1 = race_1$1;
	Observable_1$39.Observable.race = race_1.raceStatic;

	/* tslint:disable:no-empty */
	function noop() { }
	var noop_2 = noop;


	var noop_1$1 = {
		noop: noop_2
	};

	var __extends$32 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$41 = Observable_1$2;
	var noop_1 = noop_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var NeverObservable = (function (_super) {
	    __extends$32(NeverObservable, _super);
	    function NeverObservable() {
	        _super.call(this);
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer.
	     *
	     * <span class="informal">An Observable that never emits anything.</span>
	     *
	     * <img src="./img/never.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that emits
	     * neither values nor errors nor the completion notification. It can be used
	     * for testing purposes or for composing with other Observables. Please note
	     * that by never emitting a complete notification, this Observable keeps the
	     * subscription from being disposed automatically. Subscriptions need to be
	     * manually disposed.
	     *
	     * @example <caption>Emit the number 7, then never emit anything else (not even complete).</caption>
	     * function info() {
	     *   console.log('Will not be called');
	     * }
	     * var result = Rx.Observable.never().startWith(7);
	     * result.subscribe(x => console.log(x), info, info);
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link of}
	     * @see {@link throw}
	     *
	     * @return {Observable} A "never" Observable: never emits anything.
	     * @static true
	     * @name never
	     * @owner Observable
	     */
	    NeverObservable.create = function () {
	        return new NeverObservable();
	    };
	    NeverObservable.prototype._subscribe = function (subscriber) {
	        noop_1.noop();
	    };
	    return NeverObservable;
	}(Observable_1$41.Observable));
	var NeverObservable_2 = NeverObservable;


	var NeverObservable_1$1 = {
		NeverObservable: NeverObservable_2
	};

	var NeverObservable_1 = NeverObservable_1$1;
	var never_1$1 = NeverObservable_1.NeverObservable.create;


	var never$2 = {
		never: never_1$1
	};

	var Observable_1$40 = Observable_1$2;
	var never_1 = never$2;
	Observable_1$40.Observable.never = never_1.never;

	var ArrayObservable_1$8 = ArrayObservable_1$1;
	var of_1$1 = ArrayObservable_1$8.ArrayObservable.of;


	var of$2 = {
		of: of_1$1
	};

	var Observable_1$42 = Observable_1$2;
	var of_1 = of$2;
	Observable_1$42.Observable.of = of_1.of;

	var __extends$33 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var FromObservable_1$3 = FromObservable_1$1;
	var isArray_1$8 = isArray;
	var OuterSubscriber_1$8 = OuterSubscriber_1$1;
	var subscribeToResult_1$8 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * When any of the provided Observable emits an complete or error notification, it immediately subscribes to the next one
	 * that was passed.
	 *
	 * <span class="informal">Execute series of Observables no matter what, even if it means swallowing errors.</span>
	 *
	 * <img src="./img/onErrorResumeNext.png" width="100%">
	 *
	 * `onErrorResumeNext` is an operator that accepts a series of Observables, provided either directly as
	 * arguments or as an array. If no single Observable is provided, returned Observable will simply behave the same
	 * as the source.
	 *
	 * `onErrorResumeNext` returns an Observable that starts by subscribing and re-emitting values from the source Observable.
	 * When its stream of values ends - no matter if Observable completed or emitted an error - `onErrorResumeNext`
	 * will subscribe to the first Observable that was passed as an argument to the method. It will start re-emitting
	 * its values as well and - again - when that stream ends, `onErrorResumeNext` will proceed to subscribing yet another
	 * Observable in provided series, no matter if previous Observable completed or ended with an error. This will
	 * be happening until there is no more Observables left in the series, at which point returned Observable will
	 * complete - even if the last subscribed stream ended with an error.
	 *
	 * `onErrorResumeNext` can be therefore though of as version of {@link concat} operator, which is more permissive
	 * when it comes to the errors emitted by its input Observables. While `concat` subscribes to the next Observable
	 * in series only if previous one successfully completed, `onErrorResumeNext` subscribes even if it ended with
	 * an error.
	 *
	 * Note that you do not get any access to errors emitted by the Observables. In particular do not
	 * expect these errors to appear in error callback passed to {@link subscribe}. If you want to take
	 * specific actions based on what error was emitted by an Observable, you should try out {@link catch} instead.
	 *
	 *
	 * @example <caption>Subscribe to the next Observable after map fails</caption>
	 * Rx.Observable.of(1, 2, 3, 0)
	 *   .map(x => {
	 *       if (x === 0) { throw Error(); }
	         return 10 / x;
	 *   })
	 *   .onErrorResumeNext(Rx.Observable.of(1, 2, 3))
	 *   .subscribe(
	 *     val => console.log(val),
	 *     err => console.log(err),          // Will never be called.
	 *     () => console.log('that\'s it!')
	 *   );
	 *
	 * // Logs:
	 * // 10
	 * // 5
	 * // 3.3333333333333335
	 * // 1
	 * // 2
	 * // 3
	 * // "that's it!"
	 *
	 * @see {@link concat}
	 * @see {@link catch}
	 *
	 * @param {...ObservableInput} observables Observables passed either directly or as an array.
	 * @return {Observable} An Observable that emits values from source Observable, but - if it errors - subscribes
	 * to the next passed Observable and so on, until it completes or runs out of Observables.
	 * @method onErrorResumeNext
	 * @owner Observable
	 */
	function onErrorResumeNext$2() {
	    var nextSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        nextSources[_i - 0] = arguments[_i];
	    }
	    if (nextSources.length === 1 && isArray_1$8.isArray(nextSources[0])) {
	        nextSources = nextSources[0];
	    }
	    return this.lift(new OnErrorResumeNextOperator(nextSources));
	}
	var onErrorResumeNext_2 = onErrorResumeNext$2;
	/* tslint:enable:max-line-length */
	function onErrorResumeNextStatic() {
	    var nextSources = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        nextSources[_i - 0] = arguments[_i];
	    }
	    var source = null;
	    if (nextSources.length === 1 && isArray_1$8.isArray(nextSources[0])) {
	        nextSources = nextSources[0];
	    }
	    source = nextSources.shift();
	    return new FromObservable_1$3.FromObservable(source, null).lift(new OnErrorResumeNextOperator(nextSources));
	}
	var onErrorResumeNextStatic_1 = onErrorResumeNextStatic;
	var OnErrorResumeNextOperator = (function () {
	    function OnErrorResumeNextOperator(nextSources) {
	        this.nextSources = nextSources;
	    }
	    OnErrorResumeNextOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new OnErrorResumeNextSubscriber(subscriber, this.nextSources));
	    };
	    return OnErrorResumeNextOperator;
	}());
	var OnErrorResumeNextSubscriber = (function (_super) {
	    __extends$33(OnErrorResumeNextSubscriber, _super);
	    function OnErrorResumeNextSubscriber(destination, nextSources) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.nextSources = nextSources;
	    }
	    OnErrorResumeNextSubscriber.prototype.notifyError = function (error, innerSub) {
	        this.subscribeToNextSource();
	    };
	    OnErrorResumeNextSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.subscribeToNextSource();
	    };
	    OnErrorResumeNextSubscriber.prototype._error = function (err) {
	        this.subscribeToNextSource();
	    };
	    OnErrorResumeNextSubscriber.prototype._complete = function () {
	        this.subscribeToNextSource();
	    };
	    OnErrorResumeNextSubscriber.prototype.subscribeToNextSource = function () {
	        var next = this.nextSources.shift();
	        if (next) {
	            this.add(subscribeToResult_1$8.subscribeToResult(this, next));
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return OnErrorResumeNextSubscriber;
	}(OuterSubscriber_1$8.OuterSubscriber));


	var onErrorResumeNext_1$1 = {
		onErrorResumeNext: onErrorResumeNext_2,
		onErrorResumeNextStatic: onErrorResumeNextStatic_1
	};

	var Observable_1$43 = Observable_1$2;
	var onErrorResumeNext_1 = onErrorResumeNext_1$1;
	Observable_1$43.Observable.onErrorResumeNext = onErrorResumeNext_1.onErrorResumeNextStatic;

	var __extends$34 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$45 = Observable_1$2;
	function dispatch$1(state) {
	    var obj = state.obj, keys = state.keys, length = state.length, index = state.index, subscriber = state.subscriber;
	    if (index === length) {
	        subscriber.complete();
	        return;
	    }
	    var key = keys[index];
	    subscriber.next([key, obj[key]]);
	    state.index = index + 1;
	    this.schedule(state);
	}
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var PairsObservable = (function (_super) {
	    __extends$34(PairsObservable, _super);
	    function PairsObservable(obj, scheduler) {
	        _super.call(this);
	        this.obj = obj;
	        this.scheduler = scheduler;
	        this.keys = Object.keys(obj);
	    }
	    /**
	     * Convert an object into an observable sequence of [key, value] pairs
	     * using an optional IScheduler to enumerate the object.
	     *
	     * @example <caption>Converts a javascript object to an Observable</caption>
	     * var obj = {
	     *   foo: 42,
	     *   bar: 56,
	     *   baz: 78
	     * };
	     *
	     * var source = Rx.Observable.pairs(obj);
	     *
	     * var subscription = source.subscribe(
	     *   function (x) {
	     *     console.log('Next: %s', x);
	     *   },
	     *   function (err) {
	     *     console.log('Error: %s', err);
	     *   },
	     *   function () {
	     *     console.log('Completed');
	     *   });
	     *
	     * @param {Object} obj The object to inspect and turn into an
	     * Observable sequence.
	     * @param {Scheduler} [scheduler] An optional IScheduler to run the
	     * enumeration of the input sequence on.
	     * @returns {(Observable<Array<string | T>>)} An observable sequence of
	     * [key, value] pairs from the object.
	     */
	    PairsObservable.create = function (obj, scheduler) {
	        return new PairsObservable(obj, scheduler);
	    };
	    PairsObservable.prototype._subscribe = function (subscriber) {
	        var _a = this, keys = _a.keys, scheduler = _a.scheduler;
	        var length = keys.length;
	        if (scheduler) {
	            return scheduler.schedule(dispatch$1, 0, {
	                obj: this.obj, keys: keys, length: length, index: 0, subscriber: subscriber
	            });
	        }
	        else {
	            for (var idx = 0; idx < length; idx++) {
	                var key = keys[idx];
	                subscriber.next([key, this.obj[key]]);
	            }
	            subscriber.complete();
	        }
	    };
	    return PairsObservable;
	}(Observable_1$45.Observable));
	var PairsObservable_2 = PairsObservable;


	var PairsObservable_1$1 = {
		PairsObservable: PairsObservable_2
	};

	var PairsObservable_1 = PairsObservable_1$1;
	var pairs_1$1 = PairsObservable_1.PairsObservable.create;


	var pairs$2 = {
		pairs: pairs_1$1
	};

	var Observable_1$44 = Observable_1$2;
	var pairs_1 = pairs$2;
	Observable_1$44.Observable.pairs = pairs_1.pairs;

	var __extends$35 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$47 = Observable_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var RangeObservable = (function (_super) {
	    __extends$35(RangeObservable, _super);
	    function RangeObservable(start, count, scheduler) {
	        _super.call(this);
	        this.start = start;
	        this._count = count;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits a sequence of numbers within a specified
	     * range.
	     *
	     * <span class="informal">Emits a sequence of numbers in a range.</span>
	     *
	     * <img src="./img/range.png" width="100%">
	     *
	     * `range` operator emits a range of sequential integers, in order, where you
	     * select the `start` of the range and its `length`. By default, uses no
	     * IScheduler and just delivers the notifications synchronously, but may use
	     * an optional IScheduler to regulate those deliveries.
	     *
	     * @example <caption>Emits the numbers 1 to 10</caption>
	     * var numbers = Rx.Observable.range(1, 10);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link timer}
	     * @see {@link interval}
	     *
	     * @param {number} [start=0] The value of the first integer in the sequence.
	     * @param {number} [count=0] The number of sequential integers to generate.
	     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
	     * the emissions of the notifications.
	     * @return {Observable} An Observable of numbers that emits a finite range of
	     * sequential integers.
	     * @static true
	     * @name range
	     * @owner Observable
	     */
	    RangeObservable.create = function (start, count, scheduler) {
	        if (start === void 0) { start = 0; }
	        if (count === void 0) { count = 0; }
	        return new RangeObservable(start, count, scheduler);
	    };
	    RangeObservable.dispatch = function (state) {
	        var start = state.start, index = state.index, count = state.count, subscriber = state.subscriber;
	        if (index >= count) {
	            subscriber.complete();
	            return;
	        }
	        subscriber.next(start);
	        if (subscriber.closed) {
	            return;
	        }
	        state.index = index + 1;
	        state.start = start + 1;
	        this.schedule(state);
	    };
	    RangeObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var start = this.start;
	        var count = this._count;
	        var scheduler = this.scheduler;
	        if (scheduler) {
	            return scheduler.schedule(RangeObservable.dispatch, 0, {
	                index: index, count: count, start: start, subscriber: subscriber
	            });
	        }
	        else {
	            do {
	                if (index++ >= count) {
	                    subscriber.complete();
	                    break;
	                }
	                subscriber.next(start++);
	                if (subscriber.closed) {
	                    break;
	                }
	            } while (true);
	        }
	    };
	    return RangeObservable;
	}(Observable_1$47.Observable));
	var RangeObservable_2 = RangeObservable;


	var RangeObservable_1$1 = {
		RangeObservable: RangeObservable_2
	};

	var RangeObservable_1 = RangeObservable_1$1;
	var range_1$1 = RangeObservable_1.RangeObservable.create;


	var range$2 = {
		range: range_1$1
	};

	var Observable_1$46 = Observable_1$2;
	var range_1 = range$2;
	Observable_1$46.Observable.range = range_1.range;

	var __extends$36 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$49 = Observable_1$2;
	var subscribeToResult_1$9 = subscribeToResult_1$1;
	var OuterSubscriber_1$9 = OuterSubscriber_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var UsingObservable = (function (_super) {
	    __extends$36(UsingObservable, _super);
	    function UsingObservable(resourceFactory, observableFactory) {
	        _super.call(this);
	        this.resourceFactory = resourceFactory;
	        this.observableFactory = observableFactory;
	    }
	    UsingObservable.create = function (resourceFactory, observableFactory) {
	        return new UsingObservable(resourceFactory, observableFactory);
	    };
	    UsingObservable.prototype._subscribe = function (subscriber) {
	        var _a = this, resourceFactory = _a.resourceFactory, observableFactory = _a.observableFactory;
	        var resource;
	        try {
	            resource = resourceFactory();
	            return new UsingSubscriber(subscriber, resource, observableFactory);
	        }
	        catch (err) {
	            subscriber.error(err);
	        }
	    };
	    return UsingObservable;
	}(Observable_1$49.Observable));
	var UsingObservable_2 = UsingObservable;
	var UsingSubscriber = (function (_super) {
	    __extends$36(UsingSubscriber, _super);
	    function UsingSubscriber(destination, resource, observableFactory) {
	        _super.call(this, destination);
	        this.resource = resource;
	        this.observableFactory = observableFactory;
	        destination.add(resource);
	        this.tryUse();
	    }
	    UsingSubscriber.prototype.tryUse = function () {
	        try {
	            var source = this.observableFactory.call(this, this.resource);
	            if (source) {
	                this.add(subscribeToResult_1$9.subscribeToResult(this, source));
	            }
	        }
	        catch (err) {
	            this._error(err);
	        }
	    };
	    return UsingSubscriber;
	}(OuterSubscriber_1$9.OuterSubscriber));


	var UsingObservable_1$1 = {
		UsingObservable: UsingObservable_2
	};

	var UsingObservable_1 = UsingObservable_1$1;
	var using_1$1 = UsingObservable_1.UsingObservable.create;


	var using$2 = {
		using: using_1$1
	};

	var Observable_1$48 = Observable_1$2;
	var using_1 = using$2;
	Observable_1$48.Observable.using = using_1.using;

	var __extends$37 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$51 = Observable_1$2;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var ErrorObservable = (function (_super) {
	    __extends$37(ErrorObservable, _super);
	    function ErrorObservable(error, scheduler) {
	        _super.call(this);
	        this.error = error;
	        this.scheduler = scheduler;
	    }
	    /**
	     * Creates an Observable that emits no items to the Observer and immediately
	     * emits an error notification.
	     *
	     * <span class="informal">Just emits 'error', and nothing else.
	     * </span>
	     *
	     * <img src="./img/throw.png" width="100%">
	     *
	     * This static operator is useful for creating a simple Observable that only
	     * emits the error notification. It can be used for composing with other
	     * Observables, such as in a {@link mergeMap}.
	     *
	     * @example <caption>Emit the number 7, then emit an error.</caption>
	     * var result = Rx.Observable.throw(new Error('oops!')).startWith(7);
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @example <caption>Map and flatten numbers to the sequence 'a', 'b', 'c', but throw an error for 13</caption>
	     * var interval = Rx.Observable.interval(1000);
	     * var result = interval.mergeMap(x =>
	     *   x === 13 ?
	     *     Rx.Observable.throw('Thirteens are bad') :
	     *     Rx.Observable.of('a', 'b', 'c')
	     * );
	     * result.subscribe(x => console.log(x), e => console.error(e));
	     *
	     * @see {@link create}
	     * @see {@link empty}
	     * @see {@link never}
	     * @see {@link of}
	     *
	     * @param {any} error The particular Error to pass to the error notification.
	     * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
	     * the emission of the error notification.
	     * @return {Observable} An error Observable: emits only the error notification
	     * using the given error argument.
	     * @static true
	     * @name throw
	     * @owner Observable
	     */
	    ErrorObservable.create = function (error, scheduler) {
	        return new ErrorObservable(error, scheduler);
	    };
	    ErrorObservable.dispatch = function (arg) {
	        var error = arg.error, subscriber = arg.subscriber;
	        subscriber.error(error);
	    };
	    ErrorObservable.prototype._subscribe = function (subscriber) {
	        var error = this.error;
	        var scheduler = this.scheduler;
	        subscriber.syncErrorThrowable = true;
	        if (scheduler) {
	            return scheduler.schedule(ErrorObservable.dispatch, 0, {
	                error: error, subscriber: subscriber
	            });
	        }
	        else {
	            subscriber.error(error);
	        }
	    };
	    return ErrorObservable;
	}(Observable_1$51.Observable));
	var ErrorObservable_2 = ErrorObservable;


	var ErrorObservable_1$1 = {
		ErrorObservable: ErrorObservable_2
	};

	var ErrorObservable_1 = ErrorObservable_1$1;
	var _throw_1 = ErrorObservable_1.ErrorObservable.create;


	var _throw$2 = {
		_throw: _throw_1
	};

	var Observable_1$50 = Observable_1$2;
	var throw_1 = _throw$2;
	Observable_1$50.Observable.throw = throw_1._throw;

	function isDate(value) {
	    return value instanceof Date && !isNaN(+value);
	}
	var isDate_2 = isDate;


	var isDate_1$1 = {
		isDate: isDate_2
	};

	var __extends$38 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var isNumeric_1$3 = isNumeric_1$1;
	var Observable_1$53 = Observable_1$2;
	var async_1$3 = async;
	var isScheduler_1$7 = isScheduler_1$1;
	var isDate_1 = isDate_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var TimerObservable = (function (_super) {
	    __extends$38(TimerObservable, _super);
	    function TimerObservable(dueTime, period, scheduler) {
	        if (dueTime === void 0) { dueTime = 0; }
	        _super.call(this);
	        this.period = -1;
	        this.dueTime = 0;
	        if (isNumeric_1$3.isNumeric(period)) {
	            this.period = Number(period) < 1 && 1 || Number(period);
	        }
	        else if (isScheduler_1$7.isScheduler(period)) {
	            scheduler = period;
	        }
	        if (!isScheduler_1$7.isScheduler(scheduler)) {
	            scheduler = async_1$3.async;
	        }
	        this.scheduler = scheduler;
	        this.dueTime = isDate_1.isDate(dueTime) ?
	            (+dueTime - this.scheduler.now()) :
	            dueTime;
	    }
	    /**
	     * Creates an Observable that starts emitting after an `initialDelay` and
	     * emits ever increasing numbers after each `period` of time thereafter.
	     *
	     * <span class="informal">Its like {@link interval}, but you can specify when
	     * should the emissions start.</span>
	     *
	     * <img src="./img/timer.png" width="100%">
	     *
	     * `timer` returns an Observable that emits an infinite sequence of ascending
	     * integers, with a constant interval of time, `period` of your choosing
	     * between those emissions. The first emission happens after the specified
	     * `initialDelay`. The initial delay may be a {@link Date}. By default, this
	     * operator uses the `async` IScheduler to provide a notion of time, but you
	     * may pass any IScheduler to it. If `period` is not specified, the output
	     * Observable emits only one value, `0`. Otherwise, it emits an infinite
	     * sequence.
	     *
	     * @example <caption>Emits ascending numbers, one every second (1000ms), starting after 3 seconds</caption>
	     * var numbers = Rx.Observable.timer(3000, 1000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @example <caption>Emits one number after five seconds</caption>
	     * var numbers = Rx.Observable.timer(5000);
	     * numbers.subscribe(x => console.log(x));
	     *
	     * @see {@link interval}
	     * @see {@link delay}
	     *
	     * @param {number|Date} initialDelay The initial delay time to wait before
	     * emitting the first value of `0`.
	     * @param {number} [period] The period of time between emissions of the
	     * subsequent numbers.
	     * @param {Scheduler} [scheduler=async] The IScheduler to use for scheduling
	     * the emission of values, and providing a notion of "time".
	     * @return {Observable} An Observable that emits a `0` after the
	     * `initialDelay` and ever increasing numbers after each `period` of time
	     * thereafter.
	     * @static true
	     * @name timer
	     * @owner Observable
	     */
	    TimerObservable.create = function (initialDelay, period, scheduler) {
	        if (initialDelay === void 0) { initialDelay = 0; }
	        return new TimerObservable(initialDelay, period, scheduler);
	    };
	    TimerObservable.dispatch = function (state) {
	        var index = state.index, period = state.period, subscriber = state.subscriber;
	        var action = this;
	        subscriber.next(index);
	        if (subscriber.closed) {
	            return;
	        }
	        else if (period === -1) {
	            return subscriber.complete();
	        }
	        state.index = index + 1;
	        action.schedule(state, period);
	    };
	    TimerObservable.prototype._subscribe = function (subscriber) {
	        var index = 0;
	        var _a = this, period = _a.period, dueTime = _a.dueTime, scheduler = _a.scheduler;
	        return scheduler.schedule(TimerObservable.dispatch, dueTime, {
	            index: index, period: period, subscriber: subscriber
	        });
	    };
	    return TimerObservable;
	}(Observable_1$53.Observable));
	var TimerObservable_2 = TimerObservable;


	var TimerObservable_1$1 = {
		TimerObservable: TimerObservable_2
	};

	var TimerObservable_1 = TimerObservable_1$1;
	var timer_1$1 = TimerObservable_1.TimerObservable.create;


	var timer$2 = {
		timer: timer_1$1
	};

	var Observable_1$52 = Observable_1$2;
	var timer_1 = timer$2;
	Observable_1$52.Observable.timer = timer_1.timer;

	var __extends$39 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var ArrayObservable_1$9 = ArrayObservable_1$1;
	var isArray_1$9 = isArray;
	var Subscriber_1$8 = Subscriber_1$3;
	var OuterSubscriber_1$10 = OuterSubscriber_1$1;
	var subscribeToResult_1$10 = subscribeToResult_1$1;
	var iterator_1$5 = iterator;
	/* tslint:enable:max-line-length */
	/**
	 * @param observables
	 * @return {Observable<R>}
	 * @method zip
	 * @owner Observable
	 */
	function zipProto() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    return this.lift.call(zipStatic.apply(void 0, [this].concat(observables)));
	}
	var zipProto_1 = zipProto;
	/* tslint:enable:max-line-length */
	/**
	 * Combines multiple Observables to create an Observable whose values are calculated from the values, in order, of each
	 * of its input Observables.
	 *
	 * If the latest parameter is a function, this function is used to compute the created value from the input values.
	 * Otherwise, an array of the input values is returned.
	 *
	 * @example <caption>Combine age and name from different sources</caption>
	 *
	 * let age$ = Observable.of<number>(27, 25, 29);
	 * let name$ = Observable.of<string>('Foo', 'Bar', 'Beer');
	 * let isDev$ = Observable.of<boolean>(true, true, false);
	 *
	 * Observable
	 *     .zip(age$,
	 *          name$,
	 *          isDev$,
	 *          (age: number, name: string, isDev: boolean) => ({ age, name, isDev }))
	 *     .subscribe(x => console.log(x));
	 *
	 * // outputs
	 * // { age: 27, name: 'Foo', isDev: true }
	 * // { age: 25, name: 'Bar', isDev: true }
	 * // { age: 29, name: 'Beer', isDev: false }
	 *
	 * @param observables
	 * @return {Observable<R>}
	 * @static true
	 * @name zip
	 * @owner Observable
	 */
	function zipStatic() {
	    var observables = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        observables[_i - 0] = arguments[_i];
	    }
	    var project = observables[observables.length - 1];
	    if (typeof project === 'function') {
	        observables.pop();
	    }
	    return new ArrayObservable_1$9.ArrayObservable(observables).lift(new ZipOperator(project));
	}
	var zipStatic_1 = zipStatic;
	var ZipOperator = (function () {
	    function ZipOperator(project) {
	        this.project = project;
	    }
	    ZipOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ZipSubscriber(subscriber, this.project));
	    };
	    return ZipOperator;
	}());
	var ZipOperator_1 = ZipOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ZipSubscriber = (function (_super) {
	    __extends$39(ZipSubscriber, _super);
	    function ZipSubscriber(destination, project, values) {
	        if (values === void 0) { values = Object.create(null); }
	        _super.call(this, destination);
	        this.iterators = [];
	        this.active = 0;
	        this.project = (typeof project === 'function') ? project : null;
	        this.values = values;
	    }
	    ZipSubscriber.prototype._next = function (value) {
	        var iterators = this.iterators;
	        if (isArray_1$9.isArray(value)) {
	            iterators.push(new StaticArrayIterator(value));
	        }
	        else if (typeof value[iterator_1$5.iterator] === 'function') {
	            iterators.push(new StaticIterator(value[iterator_1$5.iterator]()));
	        }
	        else {
	            iterators.push(new ZipBufferIterator(this.destination, this, value));
	        }
	    };
	    ZipSubscriber.prototype._complete = function () {
	        var iterators = this.iterators;
	        var len = iterators.length;
	        if (len === 0) {
	            this.destination.complete();
	            return;
	        }
	        this.active = len;
	        for (var i = 0; i < len; i++) {
	            var iterator$$2 = iterators[i];
	            if (iterator$$2.stillUnsubscribed) {
	                this.add(iterator$$2.subscribe(iterator$$2, i));
	            }
	            else {
	                this.active--; // not an observable
	            }
	        }
	    };
	    ZipSubscriber.prototype.notifyInactive = function () {
	        this.active--;
	        if (this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    ZipSubscriber.prototype.checkIterators = function () {
	        var iterators = this.iterators;
	        var len = iterators.length;
	        var destination = this.destination;
	        // abort if not all of them have values
	        for (var i = 0; i < len; i++) {
	            var iterator$$2 = iterators[i];
	            if (typeof iterator$$2.hasValue === 'function' && !iterator$$2.hasValue()) {
	                return;
	            }
	        }
	        var shouldComplete = false;
	        var args = [];
	        for (var i = 0; i < len; i++) {
	            var iterator$$2 = iterators[i];
	            var result = iterator$$2.next();
	            // check to see if it's completed now that you've gotten
	            // the next value.
	            if (iterator$$2.hasCompleted()) {
	                shouldComplete = true;
	            }
	            if (result.done) {
	                destination.complete();
	                return;
	            }
	            args.push(result.value);
	        }
	        if (this.project) {
	            this._tryProject(args);
	        }
	        else {
	            destination.next(args);
	        }
	        if (shouldComplete) {
	            destination.complete();
	        }
	    };
	    ZipSubscriber.prototype._tryProject = function (args) {
	        var result;
	        try {
	            result = this.project.apply(this, args);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return ZipSubscriber;
	}(Subscriber_1$8.Subscriber));
	var ZipSubscriber_1 = ZipSubscriber;
	var StaticIterator = (function () {
	    function StaticIterator(iterator$$2) {
	        this.iterator = iterator$$2;
	        this.nextResult = iterator$$2.next();
	    }
	    StaticIterator.prototype.hasValue = function () {
	        return true;
	    };
	    StaticIterator.prototype.next = function () {
	        var result = this.nextResult;
	        this.nextResult = this.iterator.next();
	        return result;
	    };
	    StaticIterator.prototype.hasCompleted = function () {
	        var nextResult = this.nextResult;
	        return nextResult && nextResult.done;
	    };
	    return StaticIterator;
	}());
	var StaticArrayIterator = (function () {
	    function StaticArrayIterator(array) {
	        this.array = array;
	        this.index = 0;
	        this.length = 0;
	        this.length = array.length;
	    }
	    StaticArrayIterator.prototype[iterator_1$5.iterator] = function () {
	        return this;
	    };
	    StaticArrayIterator.prototype.next = function (value) {
	        var i = this.index++;
	        var array = this.array;
	        return i < this.length ? { value: array[i], done: false } : { value: null, done: true };
	    };
	    StaticArrayIterator.prototype.hasValue = function () {
	        return this.array.length > this.index;
	    };
	    StaticArrayIterator.prototype.hasCompleted = function () {
	        return this.array.length === this.index;
	    };
	    return StaticArrayIterator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ZipBufferIterator = (function (_super) {
	    __extends$39(ZipBufferIterator, _super);
	    function ZipBufferIterator(destination, parent, observable) {
	        _super.call(this, destination);
	        this.parent = parent;
	        this.observable = observable;
	        this.stillUnsubscribed = true;
	        this.buffer = [];
	        this.isComplete = false;
	    }
	    ZipBufferIterator.prototype[iterator_1$5.iterator] = function () {
	        return this;
	    };
	    // NOTE: there is actually a name collision here with Subscriber.next and Iterator.next
	    //    this is legit because `next()` will never be called by a subscription in this case.
	    ZipBufferIterator.prototype.next = function () {
	        var buffer = this.buffer;
	        if (buffer.length === 0 && this.isComplete) {
	            return { value: null, done: true };
	        }
	        else {
	            return { value: buffer.shift(), done: false };
	        }
	    };
	    ZipBufferIterator.prototype.hasValue = function () {
	        return this.buffer.length > 0;
	    };
	    ZipBufferIterator.prototype.hasCompleted = function () {
	        return this.buffer.length === 0 && this.isComplete;
	    };
	    ZipBufferIterator.prototype.notifyComplete = function () {
	        if (this.buffer.length > 0) {
	            this.isComplete = true;
	            this.parent.notifyInactive();
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    ZipBufferIterator.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.buffer.push(innerValue);
	        this.parent.checkIterators();
	    };
	    ZipBufferIterator.prototype.subscribe = function (value, index) {
	        return subscribeToResult_1$10.subscribeToResult(this, this.observable, this, index);
	    };
	    return ZipBufferIterator;
	}(OuterSubscriber_1$10.OuterSubscriber));


	var zip$4 = {
		zipProto: zipProto_1,
		zipStatic: zipStatic_1,
		ZipOperator: ZipOperator_1,
		ZipSubscriber: ZipSubscriber_1
	};

	var zip_1$1 = zip$4;
	var zip_2 = zip_1$1.zipStatic;


	var zip$2 = {
		zip: zip_2
	};

	var Observable_1$54 = Observable_1$2;
	var zip_1 = zip$2;
	Observable_1$54.Observable.zip = zip_1.zip;

	var __extends$41 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$10 = Subscriber_1$3;
	/**
	 * Applies a given `project` function to each value emitted by the source
	 * Observable, and emits the resulting values as an Observable.
	 *
	 * <span class="informal">Like [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map),
	 * it passes each source value through a transformation function to get
	 * corresponding output values.</span>
	 *
	 * <img src="./img/map.png" width="100%">
	 *
	 * Similar to the well known `Array.prototype.map` function, this operator
	 * applies a projection to each value and emits that projection in the output
	 * Observable.
	 *
	 * @example <caption>Map every click to the clientX position of that click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks.map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link mapTo}
	 * @see {@link pluck}
	 *
	 * @param {function(value: T, index: number): R} project The function to apply
	 * to each `value` emitted by the source Observable. The `index` parameter is
	 * the number `i` for the i-th emission that has happened since the
	 * subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to define what `this` is in the
	 * `project` function.
	 * @return {Observable<R>} An Observable that emits the values from the source
	 * Observable transformed by the given `project` function.
	 * @method map
	 * @owner Observable
	 */
	function map(project, thisArg) {
	    if (typeof project !== 'function') {
	        throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
	    }
	    return this.lift(new MapOperator(project, thisArg));
	}
	var map_2 = map;
	var MapOperator = (function () {
	    function MapOperator(project, thisArg) {
	        this.project = project;
	        this.thisArg = thisArg;
	    }
	    MapOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
	    };
	    return MapOperator;
	}());
	var MapOperator_1 = MapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapSubscriber = (function (_super) {
	    __extends$41(MapSubscriber, _super);
	    function MapSubscriber(destination, project, thisArg) {
	        _super.call(this, destination);
	        this.project = project;
	        this.count = 0;
	        this.thisArg = thisArg || this;
	    }
	    // NOTE: This looks unoptimized, but it's actually purposefully NOT
	    // using try/catch optimizations.
	    MapSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.project.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return MapSubscriber;
	}(Subscriber_1$10.Subscriber));


	var map_1$1 = {
		map: map_2,
		MapOperator: MapOperator_1
	};

	var __extends$40 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var root_1$6 = root$1;
	var tryCatch_1$6 = tryCatch_1$1;
	var errorObject_1$6 = errorObject;
	var Observable_1$56 = Observable_1$2;
	var Subscriber_1$9 = Subscriber_1$3;
	var map_1 = map_1$1;
	function getCORSRequest() {
	    if (root_1$6.root.XMLHttpRequest) {
	        return new root_1$6.root.XMLHttpRequest();
	    }
	    else if (!!root_1$6.root.XDomainRequest) {
	        return new root_1$6.root.XDomainRequest();
	    }
	    else {
	        throw new Error('CORS is not supported by your browser');
	    }
	}
	function getXMLHttpRequest() {
	    if (root_1$6.root.XMLHttpRequest) {
	        return new root_1$6.root.XMLHttpRequest();
	    }
	    else {
	        var progId = void 0;
	        try {
	            var progIds = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
	            for (var i = 0; i < 3; i++) {
	                try {
	                    progId = progIds[i];
	                    if (new root_1$6.root.ActiveXObject(progId)) {
	                        break;
	                    }
	                }
	                catch (e) {
	                }
	            }
	            return new root_1$6.root.ActiveXObject(progId);
	        }
	        catch (e) {
	            throw new Error('XMLHttpRequest is not supported by your browser');
	        }
	    }
	}
	function ajaxGet(url, headers) {
	    if (headers === void 0) { headers = null; }
	    return new AjaxObservable({ method: 'GET', url: url, headers: headers });
	}
	var ajaxGet_1 = ajaxGet;

	function ajaxPost(url, body, headers) {
	    return new AjaxObservable({ method: 'POST', url: url, body: body, headers: headers });
	}
	var ajaxPost_1 = ajaxPost;

	function ajaxDelete(url, headers) {
	    return new AjaxObservable({ method: 'DELETE', url: url, headers: headers });
	}
	var ajaxDelete_1 = ajaxDelete;

	function ajaxPut(url, body, headers) {
	    return new AjaxObservable({ method: 'PUT', url: url, body: body, headers: headers });
	}
	var ajaxPut_1 = ajaxPut;

	function ajaxPatch(url, body, headers) {
	    return new AjaxObservable({ method: 'PATCH', url: url, body: body, headers: headers });
	}
	var ajaxPatch_1 = ajaxPatch;

	function ajaxGetJSON(url, headers) {
	    return new AjaxObservable({ method: 'GET', url: url, responseType: 'json', headers: headers })
	        .lift(new map_1.MapOperator(function (x, index) { return x.response; }, null));
	}
	var ajaxGetJSON_1 = ajaxGetJSON;

	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var AjaxObservable = (function (_super) {
	    __extends$40(AjaxObservable, _super);
	    function AjaxObservable(urlOrRequest) {
	        _super.call(this);
	        var request = {
	            async: true,
	            createXHR: function () {
	                return this.crossDomain ? getCORSRequest.call(this) : getXMLHttpRequest();
	            },
	            crossDomain: false,
	            withCredentials: false,
	            headers: {},
	            method: 'GET',
	            responseType: 'json',
	            timeout: 0
	        };
	        if (typeof urlOrRequest === 'string') {
	            request.url = urlOrRequest;
	        }
	        else {
	            for (var prop in urlOrRequest) {
	                if (urlOrRequest.hasOwnProperty(prop)) {
	                    request[prop] = urlOrRequest[prop];
	                }
	            }
	        }
	        this.request = request;
	    }
	    AjaxObservable.prototype._subscribe = function (subscriber) {
	        return new AjaxSubscriber(subscriber, this.request);
	    };
	    /**
	     * Creates an observable for an Ajax request with either a request object with
	     * url, headers, etc or a string for a URL.
	     *
	     * @example
	     * source = Rx.Observable.ajax('/products');
	     * source = Rx.Observable.ajax({ url: 'products', method: 'GET' });
	     *
	     * @param {string|Object} request Can be one of the following:
	     *   A string of the URL to make the Ajax call.
	     *   An object with the following properties
	     *   - url: URL of the request
	     *   - body: The body of the request
	     *   - method: Method of the request, such as GET, POST, PUT, PATCH, DELETE
	     *   - async: Whether the request is async
	     *   - headers: Optional headers
	     *   - crossDomain: true if a cross domain request, else false
	     *   - createXHR: a function to override if you need to use an alternate
	     *   XMLHttpRequest implementation.
	     *   - resultSelector: a function to use to alter the output value type of
	     *   the Observable. Gets {@link AjaxResponse} as an argument.
	     * @return {Observable} An observable sequence containing the XMLHttpRequest.
	     * @static true
	     * @name ajax
	     * @owner Observable
	    */
	    AjaxObservable.create = (function () {
	        var create = function (urlOrRequest) {
	            return new AjaxObservable(urlOrRequest);
	        };
	        create.get = ajaxGet;
	        create.post = ajaxPost;
	        create.delete = ajaxDelete;
	        create.put = ajaxPut;
	        create.patch = ajaxPatch;
	        create.getJSON = ajaxGetJSON;
	        return create;
	    })();
	    return AjaxObservable;
	}(Observable_1$56.Observable));
	var AjaxObservable_2 = AjaxObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AjaxSubscriber = (function (_super) {
	    __extends$40(AjaxSubscriber, _super);
	    function AjaxSubscriber(destination, request) {
	        _super.call(this, destination);
	        this.request = request;
	        this.done = false;
	        var headers = request.headers = request.headers || {};
	        // force CORS if requested
	        if (!request.crossDomain && !headers['X-Requested-With']) {
	            headers['X-Requested-With'] = 'XMLHttpRequest';
	        }
	        // ensure content type is set
	        if (!('Content-Type' in headers) && !(root_1$6.root.FormData && request.body instanceof root_1$6.root.FormData) && typeof request.body !== 'undefined') {
	            headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
	        }
	        // properly serialize body
	        request.body = this.serializeBody(request.body, request.headers['Content-Type']);
	        this.send();
	    }
	    AjaxSubscriber.prototype.next = function (e) {
	        this.done = true;
	        var _a = this, xhr = _a.xhr, request = _a.request, destination = _a.destination;
	        var response = new AjaxResponse$1(e, xhr, request);
	        destination.next(response);
	    };
	    AjaxSubscriber.prototype.send = function () {
	        var _a = this, request = _a.request, _b = _a.request, user = _b.user, method = _b.method, url = _b.url, async = _b.async, password = _b.password, headers = _b.headers, body = _b.body;
	        var createXHR = request.createXHR;
	        var xhr = tryCatch_1$6.tryCatch(createXHR).call(request);
	        if (xhr === errorObject_1$6.errorObject) {
	            this.error(errorObject_1$6.errorObject.e);
	        }
	        else {
	            this.xhr = xhr;
	            // set up the events before open XHR
	            // https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
	            // You need to add the event listeners before calling open() on the request.
	            // Otherwise the progress events will not fire.
	            this.setupEvents(xhr, request);
	            // open XHR
	            var result = void 0;
	            if (user) {
	                result = tryCatch_1$6.tryCatch(xhr.open).call(xhr, method, url, async, user, password);
	            }
	            else {
	                result = tryCatch_1$6.tryCatch(xhr.open).call(xhr, method, url, async);
	            }
	            if (result === errorObject_1$6.errorObject) {
	                this.error(errorObject_1$6.errorObject.e);
	                return null;
	            }
	            // timeout, responseType and withCredentials can be set once the XHR is open
	            if (async) {
	                xhr.timeout = request.timeout;
	                xhr.responseType = request.responseType;
	            }
	            if ('withCredentials' in xhr) {
	                xhr.withCredentials = !!request.withCredentials;
	            }
	            // set headers
	            this.setHeaders(xhr, headers);
	            // finally send the request
	            result = body ? tryCatch_1$6.tryCatch(xhr.send).call(xhr, body) : tryCatch_1$6.tryCatch(xhr.send).call(xhr);
	            if (result === errorObject_1$6.errorObject) {
	                this.error(errorObject_1$6.errorObject.e);
	                return null;
	            }
	        }
	        return xhr;
	    };
	    AjaxSubscriber.prototype.serializeBody = function (body, contentType) {
	        if (!body || typeof body === 'string') {
	            return body;
	        }
	        else if (root_1$6.root.FormData && body instanceof root_1$6.root.FormData) {
	            return body;
	        }
	        if (contentType) {
	            var splitIndex = contentType.indexOf(';');
	            if (splitIndex !== -1) {
	                contentType = contentType.substring(0, splitIndex);
	            }
	        }
	        switch (contentType) {
	            case 'application/x-www-form-urlencoded':
	                return Object.keys(body).map(function (key) { return (encodeURI(key) + "=" + encodeURI(body[key])); }).join('&');
	            case 'application/json':
	                return JSON.stringify(body);
	            default:
	                return body;
	        }
	    };
	    AjaxSubscriber.prototype.setHeaders = function (xhr, headers) {
	        for (var key in headers) {
	            if (headers.hasOwnProperty(key)) {
	                xhr.setRequestHeader(key, headers[key]);
	            }
	        }
	    };
	    AjaxSubscriber.prototype.setupEvents = function (xhr, request) {
	        var progressSubscriber = request.progressSubscriber;
	        function xhrTimeout(e) {
	            var _a = xhrTimeout, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (progressSubscriber) {
	                progressSubscriber.error(e);
	            }
	            subscriber.error(new AjaxTimeoutError$1(this, request)); //TODO: Make betterer.
	        }
	        
	        xhr.ontimeout = xhrTimeout;
	        xhrTimeout.request = request;
	        xhrTimeout.subscriber = this;
	        xhrTimeout.progressSubscriber = progressSubscriber;
	        if (xhr.upload && 'withCredentials' in xhr) {
	            if (progressSubscriber) {
	                var xhrProgress_1;
	                xhrProgress_1 = function (e) {
	                    var progressSubscriber = xhrProgress_1.progressSubscriber;
	                    progressSubscriber.next(e);
	                };
	                if (root_1$6.root.XDomainRequest) {
	                    xhr.onprogress = xhrProgress_1;
	                }
	                else {
	                    xhr.upload.onprogress = xhrProgress_1;
	                }
	                xhrProgress_1.progressSubscriber = progressSubscriber;
	            }
	            var xhrError_1;
	            xhrError_1 = function (e) {
	                var _a = xhrError_1, progressSubscriber = _a.progressSubscriber, subscriber = _a.subscriber, request = _a.request;
	                if (progressSubscriber) {
	                    progressSubscriber.error(e);
	                }
	                subscriber.error(new AjaxError$1('ajax error', this, request));
	            };
	            xhr.onerror = xhrError_1;
	            xhrError_1.request = request;
	            xhrError_1.subscriber = this;
	            xhrError_1.progressSubscriber = progressSubscriber;
	        }
	        function xhrReadyStateChange(e) {
	            var _a = xhrReadyStateChange, subscriber = _a.subscriber, progressSubscriber = _a.progressSubscriber, request = _a.request;
	            if (this.readyState === 4) {
	                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
	                var status_1 = this.status === 1223 ? 204 : this.status;
	                var response = (this.responseType === 'text' ? (this.response || this.responseText) : this.response);
	                // fix status code when it is 0 (0 status is undocumented).
	                // Occurs when accessing file resources or on Android 4.1 stock browser
	                // while retrieving files from application cache.
	                if (status_1 === 0) {
	                    status_1 = response ? 200 : 0;
	                }
	                if (200 <= status_1 && status_1 < 300) {
	                    if (progressSubscriber) {
	                        progressSubscriber.complete();
	                    }
	                    subscriber.next(e);
	                    subscriber.complete();
	                }
	                else {
	                    if (progressSubscriber) {
	                        progressSubscriber.error(e);
	                    }
	                    subscriber.error(new AjaxError$1('ajax error ' + status_1, this, request));
	                }
	            }
	        }
	        
	        xhr.onreadystatechange = xhrReadyStateChange;
	        xhrReadyStateChange.subscriber = this;
	        xhrReadyStateChange.progressSubscriber = progressSubscriber;
	        xhrReadyStateChange.request = request;
	    };
	    AjaxSubscriber.prototype.unsubscribe = function () {
	        var _a = this, done = _a.done, xhr = _a.xhr;
	        if (!done && xhr && xhr.readyState !== 4 && typeof xhr.abort === 'function') {
	            xhr.abort();
	        }
	        _super.prototype.unsubscribe.call(this);
	    };
	    return AjaxSubscriber;
	}(Subscriber_1$9.Subscriber));
	var AjaxSubscriber_1 = AjaxSubscriber;
	/**
	 * A normalized AJAX response.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxResponse
	 */
	var AjaxResponse$1 = (function () {
	    function AjaxResponse(originalEvent, xhr, request) {
	        this.originalEvent = originalEvent;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	        this.responseType = xhr.responseType || request.responseType;
	        switch (this.responseType) {
	            case 'json':
	                if ('response' in xhr) {
	                    //IE does not support json as responseType, parse it internally
	                    this.response = xhr.responseType ? xhr.response : JSON.parse(xhr.response || xhr.responseText || 'null');
	                }
	                else {
	                    this.response = JSON.parse(xhr.responseText || 'null');
	                }
	                break;
	            case 'xml':
	                this.response = xhr.responseXML;
	                break;
	            case 'text':
	            default:
	                this.response = ('response' in xhr) ? xhr.response : xhr.responseText;
	                break;
	        }
	    }
	    return AjaxResponse;
	}());
	var AjaxResponse_1 = AjaxResponse$1;
	/**
	 * A normalized AJAX error.
	 *
	 * @see {@link ajax}
	 *
	 * @class AjaxError
	 */
	var AjaxError$1 = (function (_super) {
	    __extends$40(AjaxError, _super);
	    function AjaxError(message, xhr, request) {
	        _super.call(this, message);
	        this.message = message;
	        this.xhr = xhr;
	        this.request = request;
	        this.status = xhr.status;
	    }
	    return AjaxError;
	}(Error));
	var AjaxError_1 = AjaxError$1;
	/**
	 * @see {@link ajax}
	 *
	 * @class AjaxTimeoutError
	 */
	var AjaxTimeoutError$1 = (function (_super) {
	    __extends$40(AjaxTimeoutError, _super);
	    function AjaxTimeoutError(xhr, request) {
	        _super.call(this, 'ajax timeout', xhr, request);
	    }
	    return AjaxTimeoutError;
	}(AjaxError$1));
	var AjaxTimeoutError_1 = AjaxTimeoutError$1;


	var AjaxObservable_1$2 = {
		ajaxGet: ajaxGet_1,
		ajaxPost: ajaxPost_1,
		ajaxDelete: ajaxDelete_1,
		ajaxPut: ajaxPut_1,
		ajaxPatch: ajaxPatch_1,
		ajaxGetJSON: ajaxGetJSON_1,
		AjaxObservable: AjaxObservable_2,
		AjaxSubscriber: AjaxSubscriber_1,
		AjaxResponse: AjaxResponse_1,
		AjaxError: AjaxError_1,
		AjaxTimeoutError: AjaxTimeoutError_1
	};

	var AjaxObservable_1$1 = AjaxObservable_1$2;
	var ajax_1$1 = AjaxObservable_1$1.AjaxObservable.create;


	var ajax$2 = {
		ajax: ajax_1$1
	};

	var Observable_1$55 = Observable_1$2;
	var ajax_1 = ajax$2;
	Observable_1$55.Observable.ajax = ajax_1.ajax;

	var __extends$44 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncAction_1$3 = AsyncAction_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var QueueAction = (function (_super) {
	    __extends$44(QueueAction, _super);
	    function QueueAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	    }
	    QueueAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (delay > 0) {
	            return _super.prototype.schedule.call(this, state, delay);
	        }
	        this.delay = delay;
	        this.state = state;
	        this.scheduler.flush(this);
	        return this;
	    };
	    QueueAction.prototype.execute = function (state, delay) {
	        return (delay > 0 || this.closed) ?
	            _super.prototype.execute.call(this, state, delay) :
	            this._execute(state, delay);
	    };
	    QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If delay exists and is greater than 0, or if the delay is null (the
	        // action wasn't rescheduled) but was originally scheduled as an async
	        // action, then recycle as an async action.
	        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        // Otherwise flush the scheduler starting with this action.
	        return scheduler.flush(this);
	    };
	    return QueueAction;
	}(AsyncAction_1$3.AsyncAction));
	var QueueAction_2 = QueueAction;


	var QueueAction_1$1 = {
		QueueAction: QueueAction_2
	};

	var __extends$45 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncScheduler_1$3 = AsyncScheduler_1$1;
	var QueueScheduler = (function (_super) {
	    __extends$45(QueueScheduler, _super);
	    function QueueScheduler() {
	        _super.apply(this, arguments);
	    }
	    return QueueScheduler;
	}(AsyncScheduler_1$3.AsyncScheduler));
	var QueueScheduler_2 = QueueScheduler;


	var QueueScheduler_1$1 = {
		QueueScheduler: QueueScheduler_2
	};

	var QueueAction_1 = QueueAction_1$1;
	var QueueScheduler_1 = QueueScheduler_1$1;
	/**
	 *
	 * Queue Scheduler
	 *
	 * <span class="informal">Put every next task on a queue, instead of executing it immediately</span>
	 *
	 * `queue` scheduler, when used with delay, behaves the same as {@link async} scheduler.
	 *
	 * When used without delay, it schedules given task synchronously - executes it right when
	 * it is scheduled. However when called recursively, that is when inside the scheduled task,
	 * another task is scheduled with queue scheduler, instead of executing immediately as well,
	 * that task will be put on a queue and wait for current one to finish.
	 *
	 * This means that when you execute task with `queue` scheduler, you are sure it will end
	 * before any other task scheduled with that scheduler will start.
	 *
	 * @examples <caption>Schedule recursively first, then do something</caption>
	 *
	 * Rx.Scheduler.queue.schedule(() => {
	 *   Rx.Scheduler.queue.schedule(() => console.log('second')); // will not happen now, but will be put on a queue
	 *
	 *   console.log('first');
	 * });
	 *
	 * // Logs:
	 * // "first"
	 * // "second"
	 *
	 *
	 * @example <caption>Reschedule itself recursively</caption>
	 *
	 * Rx.Scheduler.queue.schedule(function(state) {
	 *   if (state !== 0) {
	 *     console.log('before', state);
	 *     this.schedule(state - 1); // `this` references currently executing Action,
	 *                               // which we reschedule with new state
	 *     console.log('after', state);
	 *   }
	 * }, 0, 3);
	 *
	 * // In scheduler that runs recursively, you would expect:
	 * // "before", 3
	 * // "before", 2
	 * // "before", 1
	 * // "after", 1
	 * // "after", 2
	 * // "after", 3
	 *
	 * // But with queue it logs:
	 * // "before", 3
	 * // "after", 3
	 * // "before", 2
	 * // "after", 2
	 * // "before", 1
	 * // "after", 1
	 *
	 *
	 * @static true
	 * @name queue
	 * @owner Scheduler
	 */
	var queue_1$2 = new QueueScheduler_1.QueueScheduler(QueueAction_1.QueueAction);


	var queue = {
		queue: queue_1$2
	};

	var __extends$43 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$5 = Subject_1$1;
	var queue_1$1 = queue;
	var Subscription_1$11 = Subscription_1$3;
	var observeOn_1$3 = observeOn_1$1;
	var ObjectUnsubscribedError_1$4 = ObjectUnsubscribedError_1$2;
	var SubjectSubscription_1$3 = SubjectSubscription_1$1;
	/**
	 * @class ReplaySubject<T>
	 */
	var ReplaySubject$1 = (function (_super) {
	    __extends$43(ReplaySubject, _super);
	    function ReplaySubject(bufferSize, windowTime, scheduler) {
	        if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
	        if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
	        _super.call(this);
	        this.scheduler = scheduler;
	        this._events = [];
	        this._bufferSize = bufferSize < 1 ? 1 : bufferSize;
	        this._windowTime = windowTime < 1 ? 1 : windowTime;
	    }
	    ReplaySubject.prototype.next = function (value) {
	        var now = this._getNow();
	        this._events.push(new ReplayEvent(now, value));
	        this._trimBufferThenGetEvents();
	        _super.prototype.next.call(this, value);
	    };
	    ReplaySubject.prototype._subscribe = function (subscriber) {
	        var _events = this._trimBufferThenGetEvents();
	        var scheduler = this.scheduler;
	        var subscription;
	        if (this.closed) {
	            throw new ObjectUnsubscribedError_1$4.ObjectUnsubscribedError();
	        }
	        else if (this.hasError) {
	            subscription = Subscription_1$11.Subscription.EMPTY;
	        }
	        else if (this.isStopped) {
	            subscription = Subscription_1$11.Subscription.EMPTY;
	        }
	        else {
	            this.observers.push(subscriber);
	            subscription = new SubjectSubscription_1$3.SubjectSubscription(this, subscriber);
	        }
	        if (scheduler) {
	            subscriber.add(subscriber = new observeOn_1$3.ObserveOnSubscriber(subscriber, scheduler));
	        }
	        var len = _events.length;
	        for (var i = 0; i < len && !subscriber.closed; i++) {
	            subscriber.next(_events[i].value);
	        }
	        if (this.hasError) {
	            subscriber.error(this.thrownError);
	        }
	        else if (this.isStopped) {
	            subscriber.complete();
	        }
	        return subscription;
	    };
	    ReplaySubject.prototype._getNow = function () {
	        return (this.scheduler || queue_1$1.queue).now();
	    };
	    ReplaySubject.prototype._trimBufferThenGetEvents = function () {
	        var now = this._getNow();
	        var _bufferSize = this._bufferSize;
	        var _windowTime = this._windowTime;
	        var _events = this._events;
	        var eventsCount = _events.length;
	        var spliceCount = 0;
	        // Trim events that fall out of the time window.
	        // Start at the front of the list. Break early once
	        // we encounter an event that falls within the window.
	        while (spliceCount < eventsCount) {
	            if ((now - _events[spliceCount].time) < _windowTime) {
	                break;
	            }
	            spliceCount++;
	        }
	        if (eventsCount > _bufferSize) {
	            spliceCount = Math.max(spliceCount, eventsCount - _bufferSize);
	        }
	        if (spliceCount > 0) {
	            _events.splice(0, spliceCount);
	        }
	        return _events;
	    };
	    return ReplaySubject;
	}(Subject_1$5.Subject));
	var ReplaySubject_2 = ReplaySubject$1;
	var ReplayEvent = (function () {
	    function ReplayEvent(time, value) {
	        this.time = time;
	        this.value = value;
	    }
	    return ReplayEvent;
	}());


	var ReplaySubject_1$2 = {
		ReplaySubject: ReplaySubject_2
	};

	var root_1$8 = root$1;
	function assignImpl(target) {
	    var sources = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        sources[_i - 1] = arguments[_i];
	    }
	    var len = sources.length;
	    for (var i = 0; i < len; i++) {
	        var source = sources[i];
	        for (var k in source) {
	            if (source.hasOwnProperty(k)) {
	                target[k] = source[k];
	            }
	        }
	    }
	    return target;
	}
	var assignImpl_1 = assignImpl;

	function getAssign(root) {
	    return root.Object.assign || assignImpl;
	}
	var getAssign_1 = getAssign;
	var assign_1$1 = getAssign(root_1$8.root);


	var assign = {
		assignImpl: assignImpl_1,
		getAssign: getAssign_1,
		assign: assign_1$1
	};

	var __extends$42 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$4 = Subject_1$1;
	var Subscriber_1$11 = Subscriber_1$3;
	var Observable_1$58 = Observable_1$2;
	var Subscription_1$10 = Subscription_1$3;
	var root_1$7 = root$1;
	var ReplaySubject_1$1 = ReplaySubject_1$2;
	var tryCatch_1$7 = tryCatch_1$1;
	var errorObject_1$7 = errorObject;
	var assign_1 = assign;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var WebSocketSubject = (function (_super) {
	    __extends$42(WebSocketSubject, _super);
	    function WebSocketSubject(urlConfigOrSource, destination) {
	        if (urlConfigOrSource instanceof Observable_1$58.Observable) {
	            _super.call(this, destination, urlConfigOrSource);
	        }
	        else {
	            _super.call(this);
	            this.WebSocketCtor = root_1$7.root.WebSocket;
	            this._output = new Subject_1$4.Subject();
	            if (typeof urlConfigOrSource === 'string') {
	                this.url = urlConfigOrSource;
	            }
	            else {
	                // WARNING: config object could override important members here.
	                assign_1.assign(this, urlConfigOrSource);
	            }
	            if (!this.WebSocketCtor) {
	                throw new Error('no WebSocket constructor can be found');
	            }
	            this.destination = new ReplaySubject_1$1.ReplaySubject();
	        }
	    }
	    WebSocketSubject.prototype.resultSelector = function (e) {
	        return JSON.parse(e.data);
	    };
	    /**
	     * Wrapper around the w3c-compatible WebSocket object provided by the browser.
	     *
	     * @example <caption>Wraps browser WebSocket</caption>
	     *
	     * let socket$ = Observable.webSocket('ws://localhost:8081');
	     *
	     * socket$.subscribe(
	     *    (msg) => console.log('message received: ' + msg),
	     *    (err) => console.log(err),
	     *    () => console.log('complete')
	     *  );
	     *
	     * socket$.next(JSON.stringify({ op: 'hello' }));
	     *
	     * @example <caption>Wraps WebSocket from nodejs-websocket (using node.js)</caption>
	     *
	     * import { w3cwebsocket } from 'websocket';
	     *
	     * let socket$ = Observable.webSocket({
	     *   url: 'ws://localhost:8081',
	     *   WebSocketCtor: w3cwebsocket
	     * });
	     *
	     * socket$.subscribe(
	     *    (msg) => console.log('message received: ' + msg),
	     *    (err) => console.log(err),
	     *    () => console.log('complete')
	     *  );
	     *
	     * socket$.next(JSON.stringify({ op: 'hello' }));
	     *
	     * @param {string | WebSocketSubjectConfig} urlConfigOrSource the source of the websocket as an url or a structure defining the websocket object
	     * @return {WebSocketSubject}
	     * @static true
	     * @name webSocket
	     * @owner Observable
	     */
	    WebSocketSubject.create = function (urlConfigOrSource) {
	        return new WebSocketSubject(urlConfigOrSource);
	    };
	    WebSocketSubject.prototype.lift = function (operator) {
	        var sock = new WebSocketSubject(this, this.destination);
	        sock.operator = operator;
	        return sock;
	    };
	    WebSocketSubject.prototype._resetState = function () {
	        this.socket = null;
	        if (!this.source) {
	            this.destination = new ReplaySubject_1$1.ReplaySubject();
	        }
	        this._output = new Subject_1$4.Subject();
	    };
	    // TODO: factor this out to be a proper Operator/Subscriber implementation and eliminate closures
	    WebSocketSubject.prototype.multiplex = function (subMsg, unsubMsg, messageFilter) {
	        var self = this;
	        return new Observable_1$58.Observable(function (observer) {
	            var result = tryCatch_1$7.tryCatch(subMsg)();
	            if (result === errorObject_1$7.errorObject) {
	                observer.error(errorObject_1$7.errorObject.e);
	            }
	            else {
	                self.next(result);
	            }
	            var subscription = self.subscribe(function (x) {
	                var result = tryCatch_1$7.tryCatch(messageFilter)(x);
	                if (result === errorObject_1$7.errorObject) {
	                    observer.error(errorObject_1$7.errorObject.e);
	                }
	                else if (result) {
	                    observer.next(x);
	                }
	            }, function (err) { return observer.error(err); }, function () { return observer.complete(); });
	            return function () {
	                var result = tryCatch_1$7.tryCatch(unsubMsg)();
	                if (result === errorObject_1$7.errorObject) {
	                    observer.error(errorObject_1$7.errorObject.e);
	                }
	                else {
	                    self.next(result);
	                }
	                subscription.unsubscribe();
	            };
	        });
	    };
	    WebSocketSubject.prototype._connectSocket = function () {
	        var _this = this;
	        var WebSocketCtor = this.WebSocketCtor;
	        var observer = this._output;
	        var socket = null;
	        try {
	            socket = this.protocol ?
	                new WebSocketCtor(this.url, this.protocol) :
	                new WebSocketCtor(this.url);
	            this.socket = socket;
	            if (this.binaryType) {
	                this.socket.binaryType = this.binaryType;
	            }
	        }
	        catch (e) {
	            observer.error(e);
	            return;
	        }
	        var subscription = new Subscription_1$10.Subscription(function () {
	            _this.socket = null;
	            if (socket && socket.readyState === 1) {
	                socket.close();
	            }
	        });
	        socket.onopen = function (e) {
	            var openObserver = _this.openObserver;
	            if (openObserver) {
	                openObserver.next(e);
	            }
	            var queue = _this.destination;
	            _this.destination = Subscriber_1$11.Subscriber.create(function (x) { return socket.readyState === 1 && socket.send(x); }, function (e) {
	                var closingObserver = _this.closingObserver;
	                if (closingObserver) {
	                    closingObserver.next(undefined);
	                }
	                if (e && e.code) {
	                    socket.close(e.code, e.reason);
	                }
	                else {
	                    observer.error(new TypeError('WebSocketSubject.error must be called with an object with an error code, ' +
	                        'and an optional reason: { code: number, reason: string }'));
	                }
	                _this._resetState();
	            }, function () {
	                var closingObserver = _this.closingObserver;
	                if (closingObserver) {
	                    closingObserver.next(undefined);
	                }
	                socket.close();
	                _this._resetState();
	            });
	            if (queue && queue instanceof ReplaySubject_1$1.ReplaySubject) {
	                subscription.add(queue.subscribe(_this.destination));
	            }
	        };
	        socket.onerror = function (e) {
	            _this._resetState();
	            observer.error(e);
	        };
	        socket.onclose = function (e) {
	            _this._resetState();
	            var closeObserver = _this.closeObserver;
	            if (closeObserver) {
	                closeObserver.next(e);
	            }
	            if (e.wasClean) {
	                observer.complete();
	            }
	            else {
	                observer.error(e);
	            }
	        };
	        socket.onmessage = function (e) {
	            var result = tryCatch_1$7.tryCatch(_this.resultSelector)(e);
	            if (result === errorObject_1$7.errorObject) {
	                observer.error(errorObject_1$7.errorObject.e);
	            }
	            else {
	                observer.next(result);
	            }
	        };
	    };
	    WebSocketSubject.prototype._subscribe = function (subscriber) {
	        var _this = this;
	        var source = this.source;
	        if (source) {
	            return source.subscribe(subscriber);
	        }
	        if (!this.socket) {
	            this._connectSocket();
	        }
	        var subscription = new Subscription_1$10.Subscription();
	        subscription.add(this._output.subscribe(subscriber));
	        subscription.add(function () {
	            var socket = _this.socket;
	            if (_this._output.observers.length === 0) {
	                if (socket && socket.readyState === 1) {
	                    socket.close();
	                }
	                _this._resetState();
	            }
	        });
	        return subscription;
	    };
	    WebSocketSubject.prototype.unsubscribe = function () {
	        var _a = this, source = _a.source, socket = _a.socket;
	        if (socket && socket.readyState === 1) {
	            socket.close();
	            this._resetState();
	        }
	        _super.prototype.unsubscribe.call(this);
	        if (!source) {
	            this.destination = new ReplaySubject_1$1.ReplaySubject();
	        }
	    };
	    return WebSocketSubject;
	}(Subject_1$4.AnonymousSubject));
	var WebSocketSubject_2 = WebSocketSubject;


	var WebSocketSubject_1$1 = {
		WebSocketSubject: WebSocketSubject_2
	};

	var WebSocketSubject_1 = WebSocketSubject_1$1;
	var webSocket_1$1 = WebSocketSubject_1.WebSocketSubject.create;


	var webSocket$2 = {
		webSocket: webSocket_1$1
	};

	var Observable_1$57 = Observable_1$2;
	var webSocket_1 = webSocket$2;
	Observable_1$57.Observable.webSocket = webSocket_1.webSocket;

	var __extends$46 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$11 = OuterSubscriber_1$1;
	var subscribeToResult_1$11 = subscribeToResult_1$1;
	/**
	 * Buffers the source Observable values until `closingNotifier` emits.
	 *
	 * <span class="informal">Collects values from the past as an array, and emits
	 * that array only when another Observable emits.</span>
	 *
	 * <img src="./img/buffer.png" width="100%">
	 *
	 * Buffers the incoming Observable values until the given `closingNotifier`
	 * Observable emits a value, at which point it emits the buffer on the output
	 * Observable and starts a new buffer internally, awaiting the next time
	 * `closingNotifier` emits.
	 *
	 * @example <caption>On every click, emit array of most recent interval events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var interval = Rx.Observable.interval(1000);
	 * var buffered = interval.buffer(clicks);
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @see {@link bufferCount}
	 * @see {@link bufferTime}
	 * @see {@link bufferToggle}
	 * @see {@link bufferWhen}
	 * @see {@link window}
	 *
	 * @param {Observable<any>} closingNotifier An Observable that signals the
	 * buffer to be emitted on the output Observable.
	 * @return {Observable<T[]>} An Observable of buffers, which are arrays of
	 * values.
	 * @method buffer
	 * @owner Observable
	 */
	function buffer$2(closingNotifier) {
	    return this.lift(new BufferOperator(closingNotifier));
	}
	var buffer_2 = buffer$2;
	var BufferOperator = (function () {
	    function BufferOperator(closingNotifier) {
	        this.closingNotifier = closingNotifier;
	    }
	    BufferOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new BufferSubscriber(subscriber, this.closingNotifier));
	    };
	    return BufferOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferSubscriber = (function (_super) {
	    __extends$46(BufferSubscriber, _super);
	    function BufferSubscriber(destination, closingNotifier) {
	        _super.call(this, destination);
	        this.buffer = [];
	        this.add(subscribeToResult_1$11.subscribeToResult(this, closingNotifier));
	    }
	    BufferSubscriber.prototype._next = function (value) {
	        this.buffer.push(value);
	    };
	    BufferSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var buffer = this.buffer;
	        this.buffer = [];
	        this.destination.next(buffer);
	    };
	    return BufferSubscriber;
	}(OuterSubscriber_1$11.OuterSubscriber));


	var buffer_1$1 = {
		buffer: buffer_2
	};

	var Observable_1$59 = Observable_1$2;
	var buffer_1 = buffer_1$1;
	Observable_1$59.Observable.prototype.buffer = buffer_1.buffer;

	var __extends$47 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$12 = Subscriber_1$3;
	/**
	 * Buffers the source Observable values until the size hits the maximum
	 * `bufferSize` given.
	 *
	 * <span class="informal">Collects values from the past as an array, and emits
	 * that array only when its size reaches `bufferSize`.</span>
	 *
	 * <img src="./img/bufferCount.png" width="100%">
	 *
	 * Buffers a number of values from the source Observable by `bufferSize` then
	 * emits the buffer and clears it, and starts a new buffer each
	 * `startBufferEvery` values. If `startBufferEvery` is not provided or is
	 * `null`, then new buffers are started immediately at the start of the source
	 * and when each buffer closes and is emitted.
	 *
	 * @example <caption>Emit the last two click events as an array</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var buffered = clicks.bufferCount(2);
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @example <caption>On every click, emit the last two click events as an array</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var buffered = clicks.bufferCount(2, 1);
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferTime}
	 * @see {@link bufferToggle}
	 * @see {@link bufferWhen}
	 * @see {@link pairwise}
	 * @see {@link windowCount}
	 *
	 * @param {number} bufferSize The maximum size of the buffer emitted.
	 * @param {number} [startBufferEvery] Interval at which to start a new buffer.
	 * For example if `startBufferEvery` is `2`, then a new buffer will be started
	 * on every other value from the source. A new buffer is started at the
	 * beginning of the source by default.
	 * @return {Observable<T[]>} An Observable of arrays of buffered values.
	 * @method bufferCount
	 * @owner Observable
	 */
	function bufferCount$2(bufferSize, startBufferEvery) {
	    if (startBufferEvery === void 0) { startBufferEvery = null; }
	    return this.lift(new BufferCountOperator(bufferSize, startBufferEvery));
	}
	var bufferCount_2 = bufferCount$2;
	var BufferCountOperator = (function () {
	    function BufferCountOperator(bufferSize, startBufferEvery) {
	        this.bufferSize = bufferSize;
	        this.startBufferEvery = startBufferEvery;
	        if (!startBufferEvery || bufferSize === startBufferEvery) {
	            this.subscriberClass = BufferCountSubscriber;
	        }
	        else {
	            this.subscriberClass = BufferSkipCountSubscriber;
	        }
	    }
	    BufferCountOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new this.subscriberClass(subscriber, this.bufferSize, this.startBufferEvery));
	    };
	    return BufferCountOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferCountSubscriber = (function (_super) {
	    __extends$47(BufferCountSubscriber, _super);
	    function BufferCountSubscriber(destination, bufferSize) {
	        _super.call(this, destination);
	        this.bufferSize = bufferSize;
	        this.buffer = [];
	    }
	    BufferCountSubscriber.prototype._next = function (value) {
	        var buffer = this.buffer;
	        buffer.push(value);
	        if (buffer.length == this.bufferSize) {
	            this.destination.next(buffer);
	            this.buffer = [];
	        }
	    };
	    BufferCountSubscriber.prototype._complete = function () {
	        var buffer = this.buffer;
	        if (buffer.length > 0) {
	            this.destination.next(buffer);
	        }
	        _super.prototype._complete.call(this);
	    };
	    return BufferCountSubscriber;
	}(Subscriber_1$12.Subscriber));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferSkipCountSubscriber = (function (_super) {
	    __extends$47(BufferSkipCountSubscriber, _super);
	    function BufferSkipCountSubscriber(destination, bufferSize, startBufferEvery) {
	        _super.call(this, destination);
	        this.bufferSize = bufferSize;
	        this.startBufferEvery = startBufferEvery;
	        this.buffers = [];
	        this.count = 0;
	    }
	    BufferSkipCountSubscriber.prototype._next = function (value) {
	        var _a = this, bufferSize = _a.bufferSize, startBufferEvery = _a.startBufferEvery, buffers = _a.buffers, count = _a.count;
	        this.count++;
	        if (count % startBufferEvery === 0) {
	            buffers.push([]);
	        }
	        for (var i = buffers.length; i--;) {
	            var buffer = buffers[i];
	            buffer.push(value);
	            if (buffer.length === bufferSize) {
	                buffers.splice(i, 1);
	                this.destination.next(buffer);
	            }
	        }
	    };
	    BufferSkipCountSubscriber.prototype._complete = function () {
	        var _a = this, buffers = _a.buffers, destination = _a.destination;
	        while (buffers.length > 0) {
	            var buffer = buffers.shift();
	            if (buffer.length > 0) {
	                destination.next(buffer);
	            }
	        }
	        _super.prototype._complete.call(this);
	    };
	    return BufferSkipCountSubscriber;
	}(Subscriber_1$12.Subscriber));


	var bufferCount_1$1 = {
		bufferCount: bufferCount_2
	};

	var Observable_1$60 = Observable_1$2;
	var bufferCount_1 = bufferCount_1$1;
	Observable_1$60.Observable.prototype.bufferCount = bufferCount_1.bufferCount;

	var __extends$48 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1$4 = async;
	var Subscriber_1$13 = Subscriber_1$3;
	var isScheduler_1$8 = isScheduler_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Buffers the source Observable values for a specific time period.
	 *
	 * <span class="informal">Collects values from the past as an array, and emits
	 * those arrays periodically in time.</span>
	 *
	 * <img src="./img/bufferTime.png" width="100%">
	 *
	 * Buffers values from the source for a specific time duration `bufferTimeSpan`.
	 * Unless the optional argument `bufferCreationInterval` is given, it emits and
	 * resets the buffer every `bufferTimeSpan` milliseconds. If
	 * `bufferCreationInterval` is given, this operator opens the buffer every
	 * `bufferCreationInterval` milliseconds and closes (emits and resets) the
	 * buffer every `bufferTimeSpan` milliseconds. When the optional argument
	 * `maxBufferSize` is specified, the buffer will be closed either after
	 * `bufferTimeSpan` milliseconds or when it contains `maxBufferSize` elements.
	 *
	 * @example <caption>Every second, emit an array of the recent click events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var buffered = clicks.bufferTime(1000);
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @example <caption>Every 5 seconds, emit the click events from the next 2 seconds</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var buffered = clicks.bufferTime(2000, 5000);
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferCount}
	 * @see {@link bufferToggle}
	 * @see {@link bufferWhen}
	 * @see {@link windowTime}
	 *
	 * @param {number} bufferTimeSpan The amount of time to fill each buffer array.
	 * @param {number} [bufferCreationInterval] The interval at which to start new
	 * buffers.
	 * @param {number} [maxBufferSize] The maximum buffer size.
	 * @param {Scheduler} [scheduler=async] The scheduler on which to schedule the
	 * intervals that determine buffer boundaries.
	 * @return {Observable<T[]>} An observable of arrays of buffered values.
	 * @method bufferTime
	 * @owner Observable
	 */
	function bufferTime$2(bufferTimeSpan) {
	    var length = arguments.length;
	    var scheduler = async_1$4.async;
	    if (isScheduler_1$8.isScheduler(arguments[arguments.length - 1])) {
	        scheduler = arguments[arguments.length - 1];
	        length--;
	    }
	    var bufferCreationInterval = null;
	    if (length >= 2) {
	        bufferCreationInterval = arguments[1];
	    }
	    var maxBufferSize = Number.POSITIVE_INFINITY;
	    if (length >= 3) {
	        maxBufferSize = arguments[2];
	    }
	    return this.lift(new BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler));
	}
	var bufferTime_2 = bufferTime$2;
	var BufferTimeOperator = (function () {
	    function BufferTimeOperator(bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
	        this.bufferTimeSpan = bufferTimeSpan;
	        this.bufferCreationInterval = bufferCreationInterval;
	        this.maxBufferSize = maxBufferSize;
	        this.scheduler = scheduler;
	    }
	    BufferTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new BufferTimeSubscriber(subscriber, this.bufferTimeSpan, this.bufferCreationInterval, this.maxBufferSize, this.scheduler));
	    };
	    return BufferTimeOperator;
	}());
	var Context = (function () {
	    function Context() {
	        this.buffer = [];
	    }
	    return Context;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferTimeSubscriber = (function (_super) {
	    __extends$48(BufferTimeSubscriber, _super);
	    function BufferTimeSubscriber(destination, bufferTimeSpan, bufferCreationInterval, maxBufferSize, scheduler) {
	        _super.call(this, destination);
	        this.bufferTimeSpan = bufferTimeSpan;
	        this.bufferCreationInterval = bufferCreationInterval;
	        this.maxBufferSize = maxBufferSize;
	        this.scheduler = scheduler;
	        this.contexts = [];
	        var context = this.openContext();
	        this.timespanOnly = bufferCreationInterval == null || bufferCreationInterval < 0;
	        if (this.timespanOnly) {
	            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
	            this.add(context.closeAction = scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
	        }
	        else {
	            var closeState = { subscriber: this, context: context };
	            var creationState = { bufferTimeSpan: bufferTimeSpan, bufferCreationInterval: bufferCreationInterval, subscriber: this, scheduler: scheduler };
	            this.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, closeState));
	            this.add(scheduler.schedule(dispatchBufferCreation, bufferCreationInterval, creationState));
	        }
	    }
	    BufferTimeSubscriber.prototype._next = function (value) {
	        var contexts = this.contexts;
	        var len = contexts.length;
	        var filledBufferContext;
	        for (var i = 0; i < len; i++) {
	            var context = contexts[i];
	            var buffer = context.buffer;
	            buffer.push(value);
	            if (buffer.length == this.maxBufferSize) {
	                filledBufferContext = context;
	            }
	        }
	        if (filledBufferContext) {
	            this.onBufferFull(filledBufferContext);
	        }
	    };
	    BufferTimeSubscriber.prototype._error = function (err) {
	        this.contexts.length = 0;
	        _super.prototype._error.call(this, err);
	    };
	    BufferTimeSubscriber.prototype._complete = function () {
	        var _a = this, contexts = _a.contexts, destination = _a.destination;
	        while (contexts.length > 0) {
	            var context = contexts.shift();
	            destination.next(context.buffer);
	        }
	        _super.prototype._complete.call(this);
	    };
	    BufferTimeSubscriber.prototype._unsubscribe = function () {
	        this.contexts = null;
	    };
	    BufferTimeSubscriber.prototype.onBufferFull = function (context) {
	        this.closeContext(context);
	        var closeAction = context.closeAction;
	        closeAction.unsubscribe();
	        this.remove(closeAction);
	        if (!this.closed && this.timespanOnly) {
	            context = this.openContext();
	            var bufferTimeSpan = this.bufferTimeSpan;
	            var timeSpanOnlyState = { subscriber: this, context: context, bufferTimeSpan: bufferTimeSpan };
	            this.add(context.closeAction = this.scheduler.schedule(dispatchBufferTimeSpanOnly, bufferTimeSpan, timeSpanOnlyState));
	        }
	    };
	    BufferTimeSubscriber.prototype.openContext = function () {
	        var context = new Context();
	        this.contexts.push(context);
	        return context;
	    };
	    BufferTimeSubscriber.prototype.closeContext = function (context) {
	        this.destination.next(context.buffer);
	        var contexts = this.contexts;
	        var spliceIndex = contexts ? contexts.indexOf(context) : -1;
	        if (spliceIndex >= 0) {
	            contexts.splice(contexts.indexOf(context), 1);
	        }
	    };
	    return BufferTimeSubscriber;
	}(Subscriber_1$13.Subscriber));
	function dispatchBufferTimeSpanOnly(state) {
	    var subscriber = state.subscriber;
	    var prevContext = state.context;
	    if (prevContext) {
	        subscriber.closeContext(prevContext);
	    }
	    if (!subscriber.closed) {
	        state.context = subscriber.openContext();
	        state.context.closeAction = this.schedule(state, state.bufferTimeSpan);
	    }
	}
	function dispatchBufferCreation(state) {
	    var bufferCreationInterval = state.bufferCreationInterval, bufferTimeSpan = state.bufferTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler;
	    var context = subscriber.openContext();
	    var action = this;
	    if (!subscriber.closed) {
	        subscriber.add(context.closeAction = scheduler.schedule(dispatchBufferClose, bufferTimeSpan, { subscriber: subscriber, context: context }));
	        action.schedule(state, bufferCreationInterval);
	    }
	}
	function dispatchBufferClose(arg) {
	    var subscriber = arg.subscriber, context = arg.context;
	    subscriber.closeContext(context);
	}


	var bufferTime_1$1 = {
		bufferTime: bufferTime_2
	};

	var Observable_1$61 = Observable_1$2;
	var bufferTime_1 = bufferTime_1$1;
	Observable_1$61.Observable.prototype.bufferTime = bufferTime_1.bufferTime;

	var __extends$49 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1$12 = Subscription_1$3;
	var subscribeToResult_1$12 = subscribeToResult_1$1;
	var OuterSubscriber_1$12 = OuterSubscriber_1$1;
	/**
	 * Buffers the source Observable values starting from an emission from
	 * `openings` and ending when the output of `closingSelector` emits.
	 *
	 * <span class="informal">Collects values from the past as an array. Starts
	 * collecting only when `opening` emits, and calls the `closingSelector`
	 * function to get an Observable that tells when to close the buffer.</span>
	 *
	 * <img src="./img/bufferToggle.png" width="100%">
	 *
	 * Buffers values from the source by opening the buffer via signals from an
	 * Observable provided to `openings`, and closing and sending the buffers when
	 * a Subscribable or Promise returned by the `closingSelector` function emits.
	 *
	 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var openings = Rx.Observable.interval(1000);
	 * var buffered = clicks.bufferToggle(openings, i =>
	 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
	 * );
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferCount}
	 * @see {@link bufferTime}
	 * @see {@link bufferWhen}
	 * @see {@link windowToggle}
	 *
	 * @param {SubscribableOrPromise<O>} openings A Subscribable or Promise of notifications to start new
	 * buffers.
	 * @param {function(value: O): SubscribableOrPromise} closingSelector A function that takes
	 * the value emitted by the `openings` observable and returns a Subscribable or Promise,
	 * which, when it emits, signals that the associated buffer should be emitted
	 * and cleared.
	 * @return {Observable<T[]>} An observable of arrays of buffered values.
	 * @method bufferToggle
	 * @owner Observable
	 */
	function bufferToggle$2(openings, closingSelector) {
	    return this.lift(new BufferToggleOperator(openings, closingSelector));
	}
	var bufferToggle_2 = bufferToggle$2;
	var BufferToggleOperator = (function () {
	    function BufferToggleOperator(openings, closingSelector) {
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }
	    BufferToggleOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new BufferToggleSubscriber(subscriber, this.openings, this.closingSelector));
	    };
	    return BufferToggleOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferToggleSubscriber = (function (_super) {
	    __extends$49(BufferToggleSubscriber, _super);
	    function BufferToggleSubscriber(destination, openings, closingSelector) {
	        _super.call(this, destination);
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	        this.contexts = [];
	        this.add(subscribeToResult_1$12.subscribeToResult(this, openings));
	    }
	    BufferToggleSubscriber.prototype._next = function (value) {
	        var contexts = this.contexts;
	        var len = contexts.length;
	        for (var i = 0; i < len; i++) {
	            contexts[i].buffer.push(value);
	        }
	    };
	    BufferToggleSubscriber.prototype._error = function (err) {
	        var contexts = this.contexts;
	        while (contexts.length > 0) {
	            var context = contexts.shift();
	            context.subscription.unsubscribe();
	            context.buffer = null;
	            context.subscription = null;
	        }
	        this.contexts = null;
	        _super.prototype._error.call(this, err);
	    };
	    BufferToggleSubscriber.prototype._complete = function () {
	        var contexts = this.contexts;
	        while (contexts.length > 0) {
	            var context = contexts.shift();
	            this.destination.next(context.buffer);
	            context.subscription.unsubscribe();
	            context.buffer = null;
	            context.subscription = null;
	        }
	        this.contexts = null;
	        _super.prototype._complete.call(this);
	    };
	    BufferToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        outerValue ? this.closeBuffer(outerValue) : this.openBuffer(innerValue);
	    };
	    BufferToggleSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.closeBuffer(innerSub.context);
	    };
	    BufferToggleSubscriber.prototype.openBuffer = function (value) {
	        try {
	            var closingSelector = this.closingSelector;
	            var closingNotifier = closingSelector.call(this, value);
	            if (closingNotifier) {
	                this.trySubscribe(closingNotifier);
	            }
	        }
	        catch (err) {
	            this._error(err);
	        }
	    };
	    BufferToggleSubscriber.prototype.closeBuffer = function (context) {
	        var contexts = this.contexts;
	        if (contexts && context) {
	            var buffer = context.buffer, subscription = context.subscription;
	            this.destination.next(buffer);
	            contexts.splice(contexts.indexOf(context), 1);
	            this.remove(subscription);
	            subscription.unsubscribe();
	        }
	    };
	    BufferToggleSubscriber.prototype.trySubscribe = function (closingNotifier) {
	        var contexts = this.contexts;
	        var buffer = [];
	        var subscription = new Subscription_1$12.Subscription();
	        var context = { buffer: buffer, subscription: subscription };
	        contexts.push(context);
	        var innerSubscription = subscribeToResult_1$12.subscribeToResult(this, closingNotifier, context);
	        if (!innerSubscription || innerSubscription.closed) {
	            this.closeBuffer(context);
	        }
	        else {
	            innerSubscription.context = context;
	            this.add(innerSubscription);
	            subscription.add(innerSubscription);
	        }
	    };
	    return BufferToggleSubscriber;
	}(OuterSubscriber_1$12.OuterSubscriber));


	var bufferToggle_1$1 = {
		bufferToggle: bufferToggle_2
	};

	var Observable_1$62 = Observable_1$2;
	var bufferToggle_1 = bufferToggle_1$1;
	Observable_1$62.Observable.prototype.bufferToggle = bufferToggle_1.bufferToggle;

	var __extends$50 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscription_1$13 = Subscription_1$3;
	var tryCatch_1$8 = tryCatch_1$1;
	var errorObject_1$8 = errorObject;
	var OuterSubscriber_1$13 = OuterSubscriber_1$1;
	var subscribeToResult_1$13 = subscribeToResult_1$1;
	/**
	 * Buffers the source Observable values, using a factory function of closing
	 * Observables to determine when to close, emit, and reset the buffer.
	 *
	 * <span class="informal">Collects values from the past as an array. When it
	 * starts collecting values, it calls a function that returns an Observable that
	 * tells when to close the buffer and restart collecting.</span>
	 *
	 * <img src="./img/bufferWhen.png" width="100%">
	 *
	 * Opens a buffer immediately, then closes the buffer when the observable
	 * returned by calling `closingSelector` function emits a value. When it closes
	 * the buffer, it immediately opens a new buffer and repeats the process.
	 *
	 * @example <caption>Emit an array of the last clicks every [1-5] random seconds</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var buffered = clicks.bufferWhen(() =>
	 *   Rx.Observable.interval(1000 + Math.random() * 4000)
	 * );
	 * buffered.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferCount}
	 * @see {@link bufferTime}
	 * @see {@link bufferToggle}
	 * @see {@link windowWhen}
	 *
	 * @param {function(): Observable} closingSelector A function that takes no
	 * arguments and returns an Observable that signals buffer closure.
	 * @return {Observable<T[]>} An observable of arrays of buffered values.
	 * @method bufferWhen
	 * @owner Observable
	 */
	function bufferWhen$2(closingSelector) {
	    return this.lift(new BufferWhenOperator(closingSelector));
	}
	var bufferWhen_2 = bufferWhen$2;
	var BufferWhenOperator = (function () {
	    function BufferWhenOperator(closingSelector) {
	        this.closingSelector = closingSelector;
	    }
	    BufferWhenOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new BufferWhenSubscriber(subscriber, this.closingSelector));
	    };
	    return BufferWhenOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var BufferWhenSubscriber = (function (_super) {
	    __extends$50(BufferWhenSubscriber, _super);
	    function BufferWhenSubscriber(destination, closingSelector) {
	        _super.call(this, destination);
	        this.closingSelector = closingSelector;
	        this.subscribing = false;
	        this.openBuffer();
	    }
	    BufferWhenSubscriber.prototype._next = function (value) {
	        this.buffer.push(value);
	    };
	    BufferWhenSubscriber.prototype._complete = function () {
	        var buffer = this.buffer;
	        if (buffer) {
	            this.destination.next(buffer);
	        }
	        _super.prototype._complete.call(this);
	    };
	    BufferWhenSubscriber.prototype._unsubscribe = function () {
	        this.buffer = null;
	        this.subscribing = false;
	    };
	    BufferWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.openBuffer();
	    };
	    BufferWhenSubscriber.prototype.notifyComplete = function () {
	        if (this.subscribing) {
	            this.complete();
	        }
	        else {
	            this.openBuffer();
	        }
	    };
	    BufferWhenSubscriber.prototype.openBuffer = function () {
	        var closingSubscription = this.closingSubscription;
	        if (closingSubscription) {
	            this.remove(closingSubscription);
	            closingSubscription.unsubscribe();
	        }
	        var buffer = this.buffer;
	        if (this.buffer) {
	            this.destination.next(buffer);
	        }
	        this.buffer = [];
	        var closingNotifier = tryCatch_1$8.tryCatch(this.closingSelector)();
	        if (closingNotifier === errorObject_1$8.errorObject) {
	            this.error(errorObject_1$8.errorObject.e);
	        }
	        else {
	            closingSubscription = new Subscription_1$13.Subscription();
	            this.closingSubscription = closingSubscription;
	            this.add(closingSubscription);
	            this.subscribing = true;
	            closingSubscription.add(subscribeToResult_1$13.subscribeToResult(this, closingNotifier));
	            this.subscribing = false;
	        }
	    };
	    return BufferWhenSubscriber;
	}(OuterSubscriber_1$13.OuterSubscriber));


	var bufferWhen_1$1 = {
		bufferWhen: bufferWhen_2
	};

	var Observable_1$63 = Observable_1$2;
	var bufferWhen_1 = bufferWhen_1$1;
	Observable_1$63.Observable.prototype.bufferWhen = bufferWhen_1.bufferWhen;

	var __extends$51 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$14 = OuterSubscriber_1$1;
	var subscribeToResult_1$14 = subscribeToResult_1$1;
	/**
	 * Catches errors on the observable to be handled by returning a new observable or throwing an error.
	 *
	 * <img src="./img/catch.png" width="100%">
	 *
	 * @example <caption>Continues with a different Observable when there's an error</caption>
	 *
	 * Observable.of(1, 2, 3, 4, 5)
	 *   .map(n => {
	 * 	   if (n == 4) {
	 * 	     throw 'four!';
	 *     }
	 *	   return n;
	 *   })
	 *   .catch(err => Observable.of('I', 'II', 'III', 'IV', 'V'))
	 *   .subscribe(x => console.log(x));
	 *   // 1, 2, 3, I, II, III, IV, V
	 *
	 * @example <caption>Retries the caught source Observable again in case of error, similar to retry() operator</caption>
	 *
	 * Observable.of(1, 2, 3, 4, 5)
	 *   .map(n => {
	 * 	   if (n === 4) {
	 * 	     throw 'four!';
	 *     }
	 * 	   return n;
	 *   })
	 *   .catch((err, caught) => caught)
	 *   .take(30)
	 *   .subscribe(x => console.log(x));
	 *   // 1, 2, 3, 1, 2, 3, ...
	 *
	 * @example <caption>Throws a new error when the source Observable throws an error</caption>
	 *
	 * Observable.of(1, 2, 3, 4, 5)
	 *   .map(n => {
	 *     if (n == 4) {
	 *       throw 'four!';
	 *     }
	 *     return n;
	 *   })
	 *   .catch(err => {
	 *     throw 'error in source. Details: ' + err;
	 *   })
	 *   .subscribe(
	 *     x => console.log(x),
	 *     err => console.log(err)
	 *   );
	 *   // 1, 2, 3, error in source. Details: four!
	 *
	 * @param {function} selector a function that takes as arguments `err`, which is the error, and `caught`, which
	 *  is the source observable, in case you'd like to "retry" that observable by returning it again. Whatever observable
	 *  is returned by the `selector` will be used to continue the observable chain.
	 * @return {Observable} An observable that originates from either the source or the observable returned by the
	 *  catch `selector` function.
	 * @method catch
	 * @name catch
	 * @owner Observable
	 */
	function _catch$2(selector) {
	    var operator = new CatchOperator(selector);
	    var caught = this.lift(operator);
	    return (operator.caught = caught);
	}
	var _catch_2 = _catch$2;
	var CatchOperator = (function () {
	    function CatchOperator(selector) {
	        this.selector = selector;
	    }
	    CatchOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new CatchSubscriber(subscriber, this.selector, this.caught));
	    };
	    return CatchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CatchSubscriber = (function (_super) {
	    __extends$51(CatchSubscriber, _super);
	    function CatchSubscriber(destination, selector, caught) {
	        _super.call(this, destination);
	        this.selector = selector;
	        this.caught = caught;
	    }
	    // NOTE: overriding `error` instead of `_error` because we don't want
	    // to have this flag this subscriber as `isStopped`. We can mimic the
	    // behavior of the RetrySubscriber (from the `retry` operator), where
	    // we unsubscribe from our source chain, reset our Subscriber flags,
	    // then subscribe to the selector result.
	    CatchSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var result = void 0;
	            try {
	                result = this.selector(err, this.caught);
	            }
	            catch (err2) {
	                _super.prototype.error.call(this, err2);
	                return;
	            }
	            this._unsubscribeAndRecycle();
	            this.add(subscribeToResult_1$14.subscribeToResult(this, result));
	        }
	    };
	    return CatchSubscriber;
	}(OuterSubscriber_1$14.OuterSubscriber));


	var _catch_1 = {
		_catch: _catch_2
	};

	var Observable_1$64 = Observable_1$2;
	var catch_1 = _catch_1;
	Observable_1$64.Observable.prototype.catch = catch_1._catch;
	Observable_1$64.Observable.prototype._catch = catch_1._catch;

	var combineLatest_1$4 = combineLatest_1$2;
	/**
	 * Converts a higher-order Observable into a first-order Observable by waiting
	 * for the outer Observable to complete, then applying {@link combineLatest}.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables by applying
	 * {@link combineLatest} when the Observable-of-Observables completes.</span>
	 *
	 * <img src="./img/combineAll.png" width="100%">
	 *
	 * Takes an Observable of Observables, and collects all Observables from it.
	 * Once the outer Observable completes, it subscribes to all collected
	 * Observables and combines their values using the {@link combineLatest}
	 * strategy, such that:
	 * - Every time an inner Observable emits, the output Observable emits.
	 * - When the returned observable emits, it emits all of the latest values by:
	 *   - If a `project` function is provided, it is called with each recent value
	 *     from each inner Observable in whatever order they arrived, and the result
	 *     of the `project` function is what is emitted by the output Observable.
	 *   - If there is no `project` function, an array of all of the most recent
	 *     values is emitted by the output Observable.
	 *
	 * @example <caption>Map two click events to a finite interval Observable, then apply combineAll</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map(ev =>
	 *   Rx.Observable.interval(Math.random()*2000).take(3)
	 * ).take(2);
	 * var result = higherOrder.combineAll();
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link combineLatest}
	 * @see {@link mergeAll}
	 *
	 * @param {function} [project] An optional function to map the most recent
	 * values from each inner Observable into a new result. Takes each of the most
	 * recent values from each collected inner Observable as arguments, in order.
	 * @return {Observable} An Observable of projected results or arrays of recent
	 * values.
	 * @method combineAll
	 * @owner Observable
	 */
	function combineAll$2(project) {
	    return this.lift(new combineLatest_1$4.CombineLatestOperator(project));
	}
	var combineAll_2 = combineAll$2;


	var combineAll_1$1 = {
		combineAll: combineAll_2
	};

	var Observable_1$65 = Observable_1$2;
	var combineAll_1 = combineAll_1$1;
	Observable_1$65.Observable.prototype.combineAll = combineAll_1.combineAll;

	var Observable_1$66 = Observable_1$2;
	var combineLatest_1$5 = combineLatest_1$2;
	Observable_1$66.Observable.prototype.combineLatest = combineLatest_1$5.combineLatest;

	var Observable_1$67 = Observable_1$2;
	var concat_1$4 = concat_1$2;
	Observable_1$67.Observable.prototype.concat = concat_1$4.concat;

	var mergeAll_1$4 = mergeAll_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Converts a higher-order Observable into a first-order Observable by
	 * concatenating the inner Observables in order.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables by putting one
	 * inner Observable after the other.</span>
	 *
	 * <img src="./img/concatAll.png" width="100%">
	 *
	 * Joins every Observable emitted by the source (a higher-order Observable), in
	 * a serial fashion. It subscribes to each inner Observable only after the
	 * previous inner Observable has completed, and merges all of their values into
	 * the returned observable.
	 *
	 * __Warning:__ If the source Observable emits Observables quickly and
	 * endlessly, and the inner Observables it emits generally complete slower than
	 * the source emits, you can run into memory issues as the incoming Observables
	 * collect in an unbounded buffer.
	 *
	 * Note: `concatAll` is equivalent to `mergeAll` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
	 * var firstOrder = higherOrder.concatAll();
	 * firstOrder.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // (results are not concurrent)
	 * // For every click on the "document" it will emit values 0 to 3 spaced
	 * // on a 1000ms interval
	 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
	 *
	 * @see {@link combineAll}
	 * @see {@link concat}
	 * @see {@link concatMap}
	 * @see {@link concatMapTo}
	 * @see {@link exhaust}
	 * @see {@link mergeAll}
	 * @see {@link switch}
	 * @see {@link zipAll}
	 *
	 * @return {Observable} An Observable emitting values from all the inner
	 * Observables concatenated.
	 * @method concatAll
	 * @owner Observable
	 */
	function concatAll$2() {
	    return this.lift(new mergeAll_1$4.MergeAllOperator(1));
	}
	var concatAll_2 = concatAll$2;


	var concatAll_1$1 = {
		concatAll: concatAll_2
	};

	var Observable_1$68 = Observable_1$2;
	var concatAll_1 = concatAll_1$1;
	Observable_1$68.Observable.prototype.concatAll = concatAll_1.concatAll;

	var __extends$52 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var subscribeToResult_1$15 = subscribeToResult_1$1;
	var OuterSubscriber_1$15 = OuterSubscriber_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link mergeAll}.</span>
	 *
	 * <img src="./img/mergeMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an Observable, and then merging those resulting Observables and
	 * emitting the results of this merger.
	 *
	 * @example <caption>Map and flatten each letter to an Observable ticking every 1 second</caption>
	 * var letters = Rx.Observable.of('a', 'b', 'c');
	 * var result = letters.mergeMap(x =>
	 *   Rx.Observable.interval(1000).map(i => x+i)
	 * );
	 * result.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // a0
	 * // b0
	 * // c0
	 * // a1
	 * // b1
	 * // c1
	 * // continues to list a,b,c with respective ascending integers
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link merge}
	 * @see {@link mergeAll}
	 * @see {@link mergeMapTo}
	 * @see {@link mergeScan}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): ObservableInput} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and merging the results of the Observables obtained
	 * from this transformation.
	 * @method mergeMap
	 * @owner Observable
	 */
	function mergeMap(project, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	        resultSelector = null;
	    }
	    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
	}
	var mergeMap_2 = mergeMap;
	var MergeMapOperator = (function () {
	    function MergeMapOperator(project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
	    };
	    return MergeMapOperator;
	}());
	var MergeMapOperator_1 = MergeMapOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeMapSubscriber = (function (_super) {
	    __extends$52(MergeMapSubscriber, _super);
	    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	        this.index = 0;
	    }
	    MergeMapSubscriber.prototype._next = function (value) {
	        if (this.active < this.concurrent) {
	            this._tryNext(value);
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    MergeMapSubscriber.prototype._tryNext = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.active++;
	        this._innerSub(result, value, index);
	    };
	    MergeMapSubscriber.prototype._innerSub = function (ish, value, index) {
	        this.add(subscribeToResult_1$15.subscribeToResult(this, ish, value, index));
	    };
	    MergeMapSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    MergeMapSubscriber.prototype._notifyResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    MergeMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeMapSubscriber;
	}(OuterSubscriber_1$15.OuterSubscriber));
	var MergeMapSubscriber_1 = MergeMapSubscriber;


	var mergeMap_1$1 = {
		mergeMap: mergeMap_2,
		MergeMapOperator: MergeMapOperator_1,
		MergeMapSubscriber: MergeMapSubscriber_1
	};

	var mergeMap_1 = mergeMap_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, in a serialized fashion waiting for each one to complete before
	 * merging the next.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link concatAll}.</span>
	 *
	 * <img src="./img/concatMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each new inner Observable is
	 * concatenated with the previous inner Observable.
	 *
	 * __Warning:__ if source values arrive endlessly and faster than their
	 * corresponding inner Observables can complete, it will result in memory issues
	 * as inner Observables amass in an unbounded buffer waiting for their turn to
	 * be subscribed to.
	 *
	 * Note: `concatMap` is equivalent to `mergeMap` with concurrency parameter set
	 * to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
	 * result.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // (results are not concurrent)
	 * // For every click on the "document" it will emit values 0 to 3 spaced
	 * // on a 1000ms interval
	 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
	 *
	 * @see {@link concat}
	 * @see {@link concatAll}
	 * @see {@link concatMapTo}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): ObservableInput} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking values from each projected inner
	 * Observable sequentially.
	 * @method concatMap
	 * @owner Observable
	 */
	function concatMap$2(project, resultSelector) {
	    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
	}
	var concatMap_2 = concatMap$2;


	var concatMap_1$1 = {
		concatMap: concatMap_2
	};

	var Observable_1$69 = Observable_1$2;
	var concatMap_1 = concatMap_1$1;
	Observable_1$69.Observable.prototype.concatMap = concatMap_1.concatMap;

	var __extends$53 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$16 = OuterSubscriber_1$1;
	var subscribeToResult_1$16 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to the same Observable which is merged multiple
	 * times in the output Observable.
	 *
	 * <span class="informal">It's like {@link mergeMap}, but maps each value always
	 * to the same inner Observable.</span>
	 *
	 * <img src="./img/mergeMapTo.png" width="100%">
	 *
	 * Maps each source value to the given Observable `innerObservable` regardless
	 * of the source value, and then merges those resulting Observables into one
	 * single Observable, which is the output Observable.
	 *
	 * @example <caption>For each click event, start an interval Observable ticking every 1 second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.mergeMapTo(Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMapTo}
	 * @see {@link merge}
	 * @see {@link mergeAll}
	 * @see {@link mergeMap}
	 * @see {@link mergeScan}
	 * @see {@link switchMapTo}
	 *
	 * @param {ObservableInput} innerObservable An Observable to replace each value from
	 * the source Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @return {Observable} An Observable that emits items from the given
	 * `innerObservable` (and optionally transformed through `resultSelector`) every
	 * time a value is emitted on the source Observable.
	 * @method mergeMapTo
	 * @owner Observable
	 */
	function mergeMapTo(innerObservable, resultSelector, concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    if (typeof resultSelector === 'number') {
	        concurrent = resultSelector;
	        resultSelector = null;
	    }
	    return this.lift(new MergeMapToOperator(innerObservable, resultSelector, concurrent));
	}
	var mergeMapTo_2 = mergeMapTo;
	// TODO: Figure out correct signature here: an Operator<Observable<T>, R>
	//       needs to implement call(observer: Subscriber<R>): Subscriber<Observable<T>>
	var MergeMapToOperator = (function () {
	    function MergeMapToOperator(ish, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        this.ish = ish;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	    }
	    MergeMapToOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new MergeMapToSubscriber(observer, this.ish, this.resultSelector, this.concurrent));
	    };
	    return MergeMapToOperator;
	}());
	var MergeMapToOperator_1 = MergeMapToOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeMapToSubscriber = (function (_super) {
	    __extends$53(MergeMapToSubscriber, _super);
	    function MergeMapToSubscriber(destination, ish, resultSelector, concurrent) {
	        if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	        _super.call(this, destination);
	        this.ish = ish;
	        this.resultSelector = resultSelector;
	        this.concurrent = concurrent;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	        this.index = 0;
	    }
	    MergeMapToSubscriber.prototype._next = function (value) {
	        if (this.active < this.concurrent) {
	            var resultSelector = this.resultSelector;
	            var index = this.index++;
	            var ish = this.ish;
	            var destination = this.destination;
	            this.active++;
	            this._innerSub(ish, destination, resultSelector, value, index);
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    MergeMapToSubscriber.prototype._innerSub = function (ish, destination, resultSelector, value, index) {
	        this.add(subscribeToResult_1$16.subscribeToResult(this, ish, value, index));
	    };
	    MergeMapToSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            this.destination.complete();
	        }
	    };
	    MergeMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        if (resultSelector) {
	            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            destination.next(innerValue);
	        }
	    };
	    MergeMapToSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        var result;
	        try {
	            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        destination.next(result);
	    };
	    MergeMapToSubscriber.prototype.notifyError = function (err) {
	        this.destination.error(err);
	    };
	    MergeMapToSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return MergeMapToSubscriber;
	}(OuterSubscriber_1$16.OuterSubscriber));
	var MergeMapToSubscriber_1 = MergeMapToSubscriber;


	var mergeMapTo_1$1 = {
		mergeMapTo: mergeMapTo_2,
		MergeMapToOperator: MergeMapToOperator_1,
		MergeMapToSubscriber: MergeMapToSubscriber_1
	};

	var mergeMapTo_1 = mergeMapTo_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to the same Observable which is merged multiple
	 * times in a serialized fashion on the output Observable.
	 *
	 * <span class="informal">It's like {@link concatMap}, but maps each value
	 * always to the same inner Observable.</span>
	 *
	 * <img src="./img/concatMapTo.png" width="100%">
	 *
	 * Maps each source value to the given Observable `innerObservable` regardless
	 * of the source value, and then flattens those resulting Observables into one
	 * single Observable, which is the output Observable. Each new `innerObservable`
	 * instance emitted on the output Observable is concatenated with the previous
	 * `innerObservable` instance.
	 *
	 * __Warning:__ if source values arrive endlessly and faster than their
	 * corresponding inner Observables can complete, it will result in memory issues
	 * as inner Observables amass in an unbounded buffer waiting for their turn to
	 * be subscribed to.
	 *
	 * Note: `concatMapTo` is equivalent to `mergeMapTo` with concurrency parameter
	 * set to `1`.
	 *
	 * @example <caption>For each click event, tick every second from 0 to 3, with no concurrency</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
	 * result.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // (results are not concurrent)
	 * // For every click on the "document" it will emit values 0 to 3 spaced
	 * // on a 1000ms interval
	 * // one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3
	 *
	 * @see {@link concat}
	 * @see {@link concatAll}
	 * @see {@link concatMap}
	 * @see {@link mergeMapTo}
	 * @see {@link switchMapTo}
	 *
	 * @param {ObservableInput} innerObservable An Observable to replace each value from
	 * the source Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An observable of values merged together by joining the
	 * passed observable with itself, one after the other, for each value emitted
	 * from the source.
	 * @method concatMapTo
	 * @owner Observable
	 */
	function concatMapTo$2(innerObservable, resultSelector) {
	    return this.lift(new mergeMapTo_1.MergeMapToOperator(innerObservable, resultSelector, 1));
	}
	var concatMapTo_2 = concatMapTo$2;


	var concatMapTo_1$1 = {
		concatMapTo: concatMapTo_2
	};

	var Observable_1$70 = Observable_1$2;
	var concatMapTo_1 = concatMapTo_1$1;
	Observable_1$70.Observable.prototype.concatMapTo = concatMapTo_1.concatMapTo;

	var __extends$54 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$14 = Subscriber_1$3;
	/**
	 * Counts the number of emissions on the source and emits that number when the
	 * source completes.
	 *
	 * <span class="informal">Tells how many values were emitted, when the source
	 * completes.</span>
	 *
	 * <img src="./img/count.png" width="100%">
	 *
	 * `count` transforms an Observable that emits values into an Observable that
	 * emits a single value that represents the number of values emitted by the
	 * source Observable. If the source Observable terminates with an error, `count`
	 * will pass this error notification along without emitting a value first. If
	 * the source Observable does not terminate at all, `count` will neither emit
	 * a value nor terminate. This operator takes an optional `predicate` function
	 * as argument, in which case the output emission will represent the number of
	 * source values that matched `true` with the `predicate`.
	 *
	 * @example <caption>Counts how many seconds have passed before the first click happened</caption>
	 * var seconds = Rx.Observable.interval(1000);
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var secondsBeforeClick = seconds.takeUntil(clicks);
	 * var result = secondsBeforeClick.count();
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Counts how many odd numbers are there between 1 and 7</caption>
	 * var numbers = Rx.Observable.range(1, 7);
	 * var result = numbers.count(i => i % 2 === 1);
	 * result.subscribe(x => console.log(x));
	 *
	 * // Results in:
	 * // 4
	 *
	 * @see {@link max}
	 * @see {@link min}
	 * @see {@link reduce}
	 *
	 * @param {function(value: T, i: number, source: Observable<T>): boolean} [predicate] A
	 * boolean function to select what values are to be counted. It is provided with
	 * arguments of:
	 * - `value`: the value from the source Observable.
	 * - `index`: the (zero-based) "index" of the value from the source Observable.
	 * - `source`: the source Observable instance itself.
	 * @return {Observable} An Observable of one number that represents the count as
	 * described above.
	 * @method count
	 * @owner Observable
	 */
	function count$2(predicate) {
	    return this.lift(new CountOperator(predicate, this));
	}
	var count_2 = count$2;
	var CountOperator = (function () {
	    function CountOperator(predicate, source) {
	        this.predicate = predicate;
	        this.source = source;
	    }
	    CountOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new CountSubscriber(subscriber, this.predicate, this.source));
	    };
	    return CountOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var CountSubscriber = (function (_super) {
	    __extends$54(CountSubscriber, _super);
	    function CountSubscriber(destination, predicate, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.source = source;
	        this.count = 0;
	        this.index = 0;
	    }
	    CountSubscriber.prototype._next = function (value) {
	        if (this.predicate) {
	            this._tryPredicate(value);
	        }
	        else {
	            this.count++;
	        }
	    };
	    CountSubscriber.prototype._tryPredicate = function (value) {
	        var result;
	        try {
	            result = this.predicate(value, this.index++, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.count++;
	        }
	    };
	    CountSubscriber.prototype._complete = function () {
	        this.destination.next(this.count);
	        this.destination.complete();
	    };
	    return CountSubscriber;
	}(Subscriber_1$14.Subscriber));


	var count_1$1 = {
		count: count_2
	};

	var Observable_1$71 = Observable_1$2;
	var count_1 = count_1$1;
	Observable_1$71.Observable.prototype.count = count_1.count;

	var __extends$55 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$15 = Subscriber_1$3;
	/**
	 * Converts an Observable of {@link Notification} objects into the emissions
	 * that they represent.
	 *
	 * <span class="informal">Unwraps {@link Notification} objects as actual `next`,
	 * `error` and `complete` emissions. The opposite of {@link materialize}.</span>
	 *
	 * <img src="./img/dematerialize.png" width="100%">
	 *
	 * `dematerialize` is assumed to operate an Observable that only emits
	 * {@link Notification} objects as `next` emissions, and does not emit any
	 * `error`. Such Observable is the output of a `materialize` operation. Those
	 * notifications are then unwrapped using the metadata they contain, and emitted
	 * as `next`, `error`, and `complete` on the output Observable.
	 *
	 * Use this operator in conjunction with {@link materialize}.
	 *
	 * @example <caption>Convert an Observable of Notifications to an actual Observable</caption>
	 * var notifA = new Rx.Notification('N', 'A');
	 * var notifB = new Rx.Notification('N', 'B');
	 * var notifE = new Rx.Notification('E', void 0,
	 *   new TypeError('x.toUpperCase is not a function')
	 * );
	 * var materialized = Rx.Observable.of(notifA, notifB, notifE);
	 * var upperCase = materialized.dematerialize();
	 * upperCase.subscribe(x => console.log(x), e => console.error(e));
	 *
	 * // Results in:
	 * // A
	 * // B
	 * // TypeError: x.toUpperCase is not a function
	 *
	 * @see {@link Notification}
	 * @see {@link materialize}
	 *
	 * @return {Observable} An Observable that emits items and notifications
	 * embedded in Notification objects emitted by the source Observable.
	 * @method dematerialize
	 * @owner Observable
	 */
	function dematerialize$2() {
	    return this.lift(new DeMaterializeOperator());
	}
	var dematerialize_2 = dematerialize$2;
	var DeMaterializeOperator = (function () {
	    function DeMaterializeOperator() {
	    }
	    DeMaterializeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DeMaterializeSubscriber(subscriber));
	    };
	    return DeMaterializeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DeMaterializeSubscriber = (function (_super) {
	    __extends$55(DeMaterializeSubscriber, _super);
	    function DeMaterializeSubscriber(destination) {
	        _super.call(this, destination);
	    }
	    DeMaterializeSubscriber.prototype._next = function (value) {
	        value.observe(this.destination);
	    };
	    return DeMaterializeSubscriber;
	}(Subscriber_1$15.Subscriber));


	var dematerialize_1$1 = {
		dematerialize: dematerialize_2
	};

	var Observable_1$72 = Observable_1$2;
	var dematerialize_1 = dematerialize_1$1;
	Observable_1$72.Observable.prototype.dematerialize = dematerialize_1.dematerialize;

	var __extends$56 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$17 = OuterSubscriber_1$1;
	var subscribeToResult_1$17 = subscribeToResult_1$1;
	/**
	 * Emits a value from the source Observable only after a particular time span
	 * determined by another Observable has passed without another source emission.
	 *
	 * <span class="informal">It's like {@link debounceTime}, but the time span of
	 * emission silence is determined by a second Observable.</span>
	 *
	 * <img src="./img/debounce.png" width="100%">
	 *
	 * `debounce` delays values emitted by the source Observable, but drops previous
	 * pending delayed emissions if a new value arrives on the source Observable.
	 * This operator keeps track of the most recent value from the source
	 * Observable, and spawns a duration Observable by calling the
	 * `durationSelector` function. The value is emitted only when the duration
	 * Observable emits a value or completes, and if no other value was emitted on
	 * the source Observable since the duration Observable was spawned. If a new
	 * value appears before the duration Observable emits, the previous value will
	 * be dropped and will not be emitted on the output Observable.
	 *
	 * Like {@link debounceTime}, this is a rate-limiting operator, and also a
	 * delay-like operator since output emissions do not necessarily occur at the
	 * same time as they did on the source Observable.
	 *
	 * @example <caption>Emit the most recent click after a burst of clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.debounce(() => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link audit}
	 * @see {@link debounceTime}
	 * @see {@link delayWhen}
	 * @see {@link throttle}
	 *
	 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
	 * that receives a value from the source Observable, for computing the timeout
	 * duration for each source value, returned as an Observable or a Promise.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by the specified duration Observable returned by
	 * `durationSelector`, and may drop some values if they occur too frequently.
	 * @method debounce
	 * @owner Observable
	 */
	function debounce$2(durationSelector) {
	    return this.lift(new DebounceOperator(durationSelector));
	}
	var debounce_2 = debounce$2;
	var DebounceOperator = (function () {
	    function DebounceOperator(durationSelector) {
	        this.durationSelector = durationSelector;
	    }
	    DebounceOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
	    };
	    return DebounceOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DebounceSubscriber = (function (_super) {
	    __extends$56(DebounceSubscriber, _super);
	    function DebounceSubscriber(destination, durationSelector) {
	        _super.call(this, destination);
	        this.durationSelector = durationSelector;
	        this.hasValue = false;
	        this.durationSubscription = null;
	    }
	    DebounceSubscriber.prototype._next = function (value) {
	        try {
	            var result = this.durationSelector.call(this, value);
	            if (result) {
	                this._tryNext(value, result);
	            }
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	    };
	    DebounceSubscriber.prototype._complete = function () {
	        this.emitValue();
	        this.destination.complete();
	    };
	    DebounceSubscriber.prototype._tryNext = function (value, duration) {
	        var subscription = this.durationSubscription;
	        this.value = value;
	        this.hasValue = true;
	        if (subscription) {
	            subscription.unsubscribe();
	            this.remove(subscription);
	        }
	        subscription = subscribeToResult_1$17.subscribeToResult(this, duration);
	        if (!subscription.closed) {
	            this.add(this.durationSubscription = subscription);
	        }
	    };
	    DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.emitValue();
	    };
	    DebounceSubscriber.prototype.notifyComplete = function () {
	        this.emitValue();
	    };
	    DebounceSubscriber.prototype.emitValue = function () {
	        if (this.hasValue) {
	            var value = this.value;
	            var subscription = this.durationSubscription;
	            if (subscription) {
	                this.durationSubscription = null;
	                subscription.unsubscribe();
	                this.remove(subscription);
	            }
	            this.value = null;
	            this.hasValue = false;
	            _super.prototype._next.call(this, value);
	        }
	    };
	    return DebounceSubscriber;
	}(OuterSubscriber_1$17.OuterSubscriber));


	var debounce_1$1 = {
		debounce: debounce_2
	};

	var Observable_1$73 = Observable_1$2;
	var debounce_1 = debounce_1$1;
	Observable_1$73.Observable.prototype.debounce = debounce_1.debounce;

	var __extends$57 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$16 = Subscriber_1$3;
	var async_1$5 = async;
	/**
	 * Emits a value from the source Observable only after a particular time span
	 * has passed without another source emission.
	 *
	 * <span class="informal">It's like {@link delay}, but passes only the most
	 * recent value from each burst of emissions.</span>
	 *
	 * <img src="./img/debounceTime.png" width="100%">
	 *
	 * `debounceTime` delays values emitted by the source Observable, but drops
	 * previous pending delayed emissions if a new value arrives on the source
	 * Observable. This operator keeps track of the most recent value from the
	 * source Observable, and emits that only when `dueTime` enough time has passed
	 * without any other value appearing on the source Observable. If a new value
	 * appears before `dueTime` silence occurs, the previous value will be dropped
	 * and will not be emitted on the output Observable.
	 *
	 * This is a rate-limiting operator, because it is impossible for more than one
	 * value to be emitted in any time window of duration `dueTime`, but it is also
	 * a delay-like operator since output emissions do not occur at the same time as
	 * they did on the source Observable. Optionally takes a {@link IScheduler} for
	 * managing timers.
	 *
	 * @example <caption>Emit the most recent click after a burst of clicks</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.debounceTime(1000);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link auditTime}
	 * @see {@link debounce}
	 * @see {@link delay}
	 * @see {@link sampleTime}
	 * @see {@link throttleTime}
	 *
	 * @param {number} dueTime The timeout duration in milliseconds (or the time
	 * unit determined internally by the optional `scheduler`) for the window of
	 * time required to wait for emission silence before emitting the most recent
	 * source value.
	 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
	 * managing the timers that handle the timeout for each value.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by the specified `dueTime`, and may drop some values if they occur
	 * too frequently.
	 * @method debounceTime
	 * @owner Observable
	 */
	function debounceTime$2(dueTime, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$5.async; }
	    return this.lift(new DebounceTimeOperator(dueTime, scheduler));
	}
	var debounceTime_2 = debounceTime$2;
	var DebounceTimeOperator = (function () {
	    function DebounceTimeOperator(dueTime, scheduler) {
	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	    }
	    DebounceTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DebounceTimeSubscriber(subscriber, this.dueTime, this.scheduler));
	    };
	    return DebounceTimeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DebounceTimeSubscriber = (function (_super) {
	    __extends$57(DebounceTimeSubscriber, _super);
	    function DebounceTimeSubscriber(destination, dueTime, scheduler) {
	        _super.call(this, destination);
	        this.dueTime = dueTime;
	        this.scheduler = scheduler;
	        this.debouncedSubscription = null;
	        this.lastValue = null;
	        this.hasValue = false;
	    }
	    DebounceTimeSubscriber.prototype._next = function (value) {
	        this.clearDebounce();
	        this.lastValue = value;
	        this.hasValue = true;
	        this.add(this.debouncedSubscription = this.scheduler.schedule(dispatchNext$3, this.dueTime, this));
	    };
	    DebounceTimeSubscriber.prototype._complete = function () {
	        this.debouncedNext();
	        this.destination.complete();
	    };
	    DebounceTimeSubscriber.prototype.debouncedNext = function () {
	        this.clearDebounce();
	        if (this.hasValue) {
	            this.destination.next(this.lastValue);
	            this.lastValue = null;
	            this.hasValue = false;
	        }
	    };
	    DebounceTimeSubscriber.prototype.clearDebounce = function () {
	        var debouncedSubscription = this.debouncedSubscription;
	        if (debouncedSubscription !== null) {
	            this.remove(debouncedSubscription);
	            debouncedSubscription.unsubscribe();
	            this.debouncedSubscription = null;
	        }
	    };
	    return DebounceTimeSubscriber;
	}(Subscriber_1$16.Subscriber));
	function dispatchNext$3(subscriber) {
	    subscriber.debouncedNext();
	}


	var debounceTime_1$1 = {
		debounceTime: debounceTime_2
	};

	var Observable_1$74 = Observable_1$2;
	var debounceTime_1 = debounceTime_1$1;
	Observable_1$74.Observable.prototype.debounceTime = debounceTime_1.debounceTime;

	var __extends$58 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$17 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Emits a given value if the source Observable completes without emitting any
	 * `next` value, otherwise mirrors the source Observable.
	 *
	 * <span class="informal">If the source Observable turns out to be empty, then
	 * this operator will emit a default value.</span>
	 *
	 * <img src="./img/defaultIfEmpty.png" width="100%">
	 *
	 * `defaultIfEmpty` emits the values emitted by the source Observable or a
	 * specified default value if the source Observable is empty (completes without
	 * having emitted any `next` value).
	 *
	 * @example <caption>If no clicks happen in 5 seconds, then emit "no clicks"</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksBeforeFive = clicks.takeUntil(Rx.Observable.interval(5000));
	 * var result = clicksBeforeFive.defaultIfEmpty('no clicks');
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link empty}
	 * @see {@link last}
	 *
	 * @param {any} [defaultValue=null] The default value used if the source
	 * Observable is empty.
	 * @return {Observable} An Observable that emits either the specified
	 * `defaultValue` if the source Observable emits no items, or the values emitted
	 * by the source Observable.
	 * @method defaultIfEmpty
	 * @owner Observable
	 */
	function defaultIfEmpty$2(defaultValue) {
	    if (defaultValue === void 0) { defaultValue = null; }
	    return this.lift(new DefaultIfEmptyOperator(defaultValue));
	}
	var defaultIfEmpty_2 = defaultIfEmpty$2;
	var DefaultIfEmptyOperator = (function () {
	    function DefaultIfEmptyOperator(defaultValue) {
	        this.defaultValue = defaultValue;
	    }
	    DefaultIfEmptyOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DefaultIfEmptySubscriber(subscriber, this.defaultValue));
	    };
	    return DefaultIfEmptyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DefaultIfEmptySubscriber = (function (_super) {
	    __extends$58(DefaultIfEmptySubscriber, _super);
	    function DefaultIfEmptySubscriber(destination, defaultValue) {
	        _super.call(this, destination);
	        this.defaultValue = defaultValue;
	        this.isEmpty = true;
	    }
	    DefaultIfEmptySubscriber.prototype._next = function (value) {
	        this.isEmpty = false;
	        this.destination.next(value);
	    };
	    DefaultIfEmptySubscriber.prototype._complete = function () {
	        if (this.isEmpty) {
	            this.destination.next(this.defaultValue);
	        }
	        this.destination.complete();
	    };
	    return DefaultIfEmptySubscriber;
	}(Subscriber_1$17.Subscriber));


	var defaultIfEmpty_1$1 = {
		defaultIfEmpty: defaultIfEmpty_2
	};

	var Observable_1$75 = Observable_1$2;
	var defaultIfEmpty_1 = defaultIfEmpty_1$1;
	Observable_1$75.Observable.prototype.defaultIfEmpty = defaultIfEmpty_1.defaultIfEmpty;

	var __extends$59 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1$6 = async;
	var isDate_1$3 = isDate_1$1;
	var Subscriber_1$18 = Subscriber_1$3;
	var Notification_1$4 = Notification_1$2;
	/**
	 * Delays the emission of items from the source Observable by a given timeout or
	 * until a given Date.
	 *
	 * <span class="informal">Time shifts each item by some specified amount of
	 * milliseconds.</span>
	 *
	 * <img src="./img/delay.png" width="100%">
	 *
	 * If the delay argument is a Number, this operator time shifts the source
	 * Observable by that amount of time expressed in milliseconds. The relative
	 * time intervals between the values are preserved.
	 *
	 * If the delay argument is a Date, this operator time shifts the start of the
	 * Observable execution until the given date occurs.
	 *
	 * @example <caption>Delay each click by one second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var delayedClicks = clicks.delay(1000); // each click emitted after 1 second
	 * delayedClicks.subscribe(x => console.log(x));
	 *
	 * @example <caption>Delay all clicks until a future date happens</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var date = new Date('March 15, 2050 12:00:00'); // in the future
	 * var delayedClicks = clicks.delay(date); // click emitted only after that date
	 * delayedClicks.subscribe(x => console.log(x));
	 *
	 * @see {@link debounceTime}
	 * @see {@link delayWhen}
	 *
	 * @param {number|Date} delay The delay duration in milliseconds (a `number`) or
	 * a `Date` until which the emission of the source items is delayed.
	 * @param {Scheduler} [scheduler=async] The IScheduler to use for
	 * managing the timers that handle the time-shift for each item.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by the specified timeout or Date.
	 * @method delay
	 * @owner Observable
	 */
	function delay$2(delay, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$6.async; }
	    var absoluteDelay = isDate_1$3.isDate(delay);
	    var delayFor = absoluteDelay ? (+delay - scheduler.now()) : Math.abs(delay);
	    return this.lift(new DelayOperator(delayFor, scheduler));
	}
	var delay_2 = delay$2;
	var DelayOperator = (function () {
	    function DelayOperator(delay, scheduler) {
	        this.delay = delay;
	        this.scheduler = scheduler;
	    }
	    DelayOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DelaySubscriber(subscriber, this.delay, this.scheduler));
	    };
	    return DelayOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DelaySubscriber = (function (_super) {
	    __extends$59(DelaySubscriber, _super);
	    function DelaySubscriber(destination, delay, scheduler) {
	        _super.call(this, destination);
	        this.delay = delay;
	        this.scheduler = scheduler;
	        this.queue = [];
	        this.active = false;
	        this.errored = false;
	    }
	    DelaySubscriber.dispatch = function (state) {
	        var source = state.source;
	        var queue = source.queue;
	        var scheduler = state.scheduler;
	        var destination = state.destination;
	        while (queue.length > 0 && (queue[0].time - scheduler.now()) <= 0) {
	            queue.shift().notification.observe(destination);
	        }
	        if (queue.length > 0) {
	            var delay_1 = Math.max(0, queue[0].time - scheduler.now());
	            this.schedule(state, delay_1);
	        }
	        else {
	            source.active = false;
	        }
	    };
	    DelaySubscriber.prototype._schedule = function (scheduler) {
	        this.active = true;
	        this.add(scheduler.schedule(DelaySubscriber.dispatch, this.delay, {
	            source: this, destination: this.destination, scheduler: scheduler
	        }));
	    };
	    DelaySubscriber.prototype.scheduleNotification = function (notification) {
	        if (this.errored === true) {
	            return;
	        }
	        var scheduler = this.scheduler;
	        var message = new DelayMessage(scheduler.now() + this.delay, notification);
	        this.queue.push(message);
	        if (this.active === false) {
	            this._schedule(scheduler);
	        }
	    };
	    DelaySubscriber.prototype._next = function (value) {
	        this.scheduleNotification(Notification_1$4.Notification.createNext(value));
	    };
	    DelaySubscriber.prototype._error = function (err) {
	        this.errored = true;
	        this.queue = [];
	        this.destination.error(err);
	    };
	    DelaySubscriber.prototype._complete = function () {
	        this.scheduleNotification(Notification_1$4.Notification.createComplete());
	    };
	    return DelaySubscriber;
	}(Subscriber_1$18.Subscriber));
	var DelayMessage = (function () {
	    function DelayMessage(time, notification) {
	        this.time = time;
	        this.notification = notification;
	    }
	    return DelayMessage;
	}());


	var delay_1$1 = {
		delay: delay_2
	};

	var Observable_1$76 = Observable_1$2;
	var delay_1 = delay_1$1;
	Observable_1$76.Observable.prototype.delay = delay_1.delay;

	var __extends$60 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$19 = Subscriber_1$3;
	var Observable_1$78 = Observable_1$2;
	var OuterSubscriber_1$18 = OuterSubscriber_1$1;
	var subscribeToResult_1$18 = subscribeToResult_1$1;
	/**
	 * Delays the emission of items from the source Observable by a given time span
	 * determined by the emissions of another Observable.
	 *
	 * <span class="informal">It's like {@link delay}, but the time span of the
	 * delay duration is determined by a second Observable.</span>
	 *
	 * <img src="./img/delayWhen.png" width="100%">
	 *
	 * `delayWhen` time shifts each emitted value from the source Observable by a
	 * time span determined by another Observable. When the source emits a value,
	 * the `delayDurationSelector` function is called with the source value as
	 * argument, and should return an Observable, called the "duration" Observable.
	 * The source value is emitted on the output Observable only when the duration
	 * Observable emits a value or completes.
	 *
	 * Optionally, `delayWhen` takes a second argument, `subscriptionDelay`, which
	 * is an Observable. When `subscriptionDelay` emits its first value or
	 * completes, the source Observable is subscribed to and starts behaving like
	 * described in the previous paragraph. If `subscriptionDelay` is not provided,
	 * `delayWhen` will subscribe to the source Observable as soon as the output
	 * Observable is subscribed.
	 *
	 * @example <caption>Delay each click by a random amount of time, between 0 and 5 seconds</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var delayedClicks = clicks.delayWhen(event =>
	 *   Rx.Observable.interval(Math.random() * 5000)
	 * );
	 * delayedClicks.subscribe(x => console.log(x));
	 *
	 * @see {@link debounce}
	 * @see {@link delay}
	 *
	 * @param {function(value: T): Observable} delayDurationSelector A function that
	 * returns an Observable for each value emitted by the source Observable, which
	 * is then used to delay the emission of that item on the output Observable
	 * until the Observable returned from this function emits a value.
	 * @param {Observable} subscriptionDelay An Observable that triggers the
	 * subscription to the source Observable once it emits any value.
	 * @return {Observable} An Observable that delays the emissions of the source
	 * Observable by an amount of time specified by the Observable returned by
	 * `delayDurationSelector`.
	 * @method delayWhen
	 * @owner Observable
	 */
	function delayWhen$2(delayDurationSelector, subscriptionDelay) {
	    if (subscriptionDelay) {
	        return new SubscriptionDelayObservable(this, subscriptionDelay)
	            .lift(new DelayWhenOperator(delayDurationSelector));
	    }
	    return this.lift(new DelayWhenOperator(delayDurationSelector));
	}
	var delayWhen_2 = delayWhen$2;
	var DelayWhenOperator = (function () {
	    function DelayWhenOperator(delayDurationSelector) {
	        this.delayDurationSelector = delayDurationSelector;
	    }
	    DelayWhenOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DelayWhenSubscriber(subscriber, this.delayDurationSelector));
	    };
	    return DelayWhenOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DelayWhenSubscriber = (function (_super) {
	    __extends$60(DelayWhenSubscriber, _super);
	    function DelayWhenSubscriber(destination, delayDurationSelector) {
	        _super.call(this, destination);
	        this.delayDurationSelector = delayDurationSelector;
	        this.completed = false;
	        this.delayNotifierSubscriptions = [];
	        this.values = [];
	    }
	    DelayWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(outerValue);
	        this.removeSubscription(innerSub);
	        this.tryComplete();
	    };
	    DelayWhenSubscriber.prototype.notifyError = function (error, innerSub) {
	        this._error(error);
	    };
	    DelayWhenSubscriber.prototype.notifyComplete = function (innerSub) {
	        var value = this.removeSubscription(innerSub);
	        if (value) {
	            this.destination.next(value);
	        }
	        this.tryComplete();
	    };
	    DelayWhenSubscriber.prototype._next = function (value) {
	        try {
	            var delayNotifier = this.delayDurationSelector(value);
	            if (delayNotifier) {
	                this.tryDelay(delayNotifier, value);
	            }
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	    };
	    DelayWhenSubscriber.prototype._complete = function () {
	        this.completed = true;
	        this.tryComplete();
	    };
	    DelayWhenSubscriber.prototype.removeSubscription = function (subscription) {
	        subscription.unsubscribe();
	        var subscriptionIdx = this.delayNotifierSubscriptions.indexOf(subscription);
	        var value = null;
	        if (subscriptionIdx !== -1) {
	            value = this.values[subscriptionIdx];
	            this.delayNotifierSubscriptions.splice(subscriptionIdx, 1);
	            this.values.splice(subscriptionIdx, 1);
	        }
	        return value;
	    };
	    DelayWhenSubscriber.prototype.tryDelay = function (delayNotifier, value) {
	        var notifierSubscription = subscribeToResult_1$18.subscribeToResult(this, delayNotifier, value);
	        if (notifierSubscription && !notifierSubscription.closed) {
	            this.add(notifierSubscription);
	            this.delayNotifierSubscriptions.push(notifierSubscription);
	        }
	        this.values.push(value);
	    };
	    DelayWhenSubscriber.prototype.tryComplete = function () {
	        if (this.completed && this.delayNotifierSubscriptions.length === 0) {
	            this.destination.complete();
	        }
	    };
	    return DelayWhenSubscriber;
	}(OuterSubscriber_1$18.OuterSubscriber));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubscriptionDelayObservable = (function (_super) {
	    __extends$60(SubscriptionDelayObservable, _super);
	    function SubscriptionDelayObservable(source, subscriptionDelay) {
	        _super.call(this);
	        this.source = source;
	        this.subscriptionDelay = subscriptionDelay;
	    }
	    SubscriptionDelayObservable.prototype._subscribe = function (subscriber) {
	        this.subscriptionDelay.subscribe(new SubscriptionDelaySubscriber(subscriber, this.source));
	    };
	    return SubscriptionDelayObservable;
	}(Observable_1$78.Observable));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SubscriptionDelaySubscriber = (function (_super) {
	    __extends$60(SubscriptionDelaySubscriber, _super);
	    function SubscriptionDelaySubscriber(parent, source) {
	        _super.call(this);
	        this.parent = parent;
	        this.source = source;
	        this.sourceSubscribed = false;
	    }
	    SubscriptionDelaySubscriber.prototype._next = function (unused) {
	        this.subscribeToSource();
	    };
	    SubscriptionDelaySubscriber.prototype._error = function (err) {
	        this.unsubscribe();
	        this.parent.error(err);
	    };
	    SubscriptionDelaySubscriber.prototype._complete = function () {
	        this.subscribeToSource();
	    };
	    SubscriptionDelaySubscriber.prototype.subscribeToSource = function () {
	        if (!this.sourceSubscribed) {
	            this.sourceSubscribed = true;
	            this.unsubscribe();
	            this.source.subscribe(this.parent);
	        }
	    };
	    return SubscriptionDelaySubscriber;
	}(Subscriber_1$19.Subscriber));


	var delayWhen_1$1 = {
		delayWhen: delayWhen_2
	};

	var Observable_1$77 = Observable_1$2;
	var delayWhen_1 = delayWhen_1$1;
	Observable_1$77.Observable.prototype.delayWhen = delayWhen_1.delayWhen;

	var root_1$9 = root$1;
	function minimalSetImpl() {
	    // THIS IS NOT a full impl of Set, this is just the minimum
	    // bits of functionality we need for this library.
	    return (function () {
	        function MinimalSet() {
	            this._values = [];
	        }
	        MinimalSet.prototype.add = function (value) {
	            if (!this.has(value)) {
	                this._values.push(value);
	            }
	        };
	        MinimalSet.prototype.has = function (value) {
	            return this._values.indexOf(value) !== -1;
	        };
	        Object.defineProperty(MinimalSet.prototype, "size", {
	            get: function () {
	                return this._values.length;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        MinimalSet.prototype.clear = function () {
	            this._values.length = 0;
	        };
	        return MinimalSet;
	    }());
	}
	var minimalSetImpl_1 = minimalSetImpl;
	var Set = root_1$9.root.Set || minimalSetImpl();


	var _Set = {
		minimalSetImpl: minimalSetImpl_1,
		Set: Set
	};

	var __extends$61 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$19 = OuterSubscriber_1$1;
	var subscribeToResult_1$19 = subscribeToResult_1$1;
	var Set_1 = _Set;
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
	 *
	 * If a keySelector function is provided, then it will project each value from the source observable into a new value that it will
	 * check for equality with previously projected values. If a keySelector function is not provided, it will use each value from the
	 * source observable directly with an equality check against previous values.
	 *
	 * In JavaScript runtimes that support `Set`, this operator will use a `Set` to improve performance of the distinct value checking.
	 *
	 * In other runtimes, this operator will use a minimal implementation of `Set` that relies on an `Array` and `indexOf` under the
	 * hood, so performance will degrade as more values are checked for distinction. Even in newer browsers, a long-running `distinct`
	 * use might result in memory leaks. To help alleviate this in some scenarios, an optional `flushes` parameter is also provided so
	 * that the internal `Set` can be "flushed", basically clearing it of values.
	 *
	 * @example <caption>A simple example with numbers</caption>
	 * Observable.of(1, 1, 2, 2, 2, 1, 2, 3, 4, 3, 2, 1)
	 *   .distinct()
	 *   .subscribe(x => console.log(x)); // 1, 2, 3, 4
	 *
	 * @example <caption>An example using a keySelector function</caption>
	 * interface Person {
	 *    age: number,
	 *    name: string
	 * }
	 *
	 * Observable.of<Person>(
	 *     { age: 4, name: 'Foo'},
	 *     { age: 7, name: 'Bar'},
	 *     { age: 5, name: 'Foo'})
	 *     .distinct((p: Person) => p.name)
	 *     .subscribe(x => console.log(x));
	 *
	 * // displays:
	 * // { age: 4, name: 'Foo' }
	 * // { age: 7, name: 'Bar' }
	 *
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 *
	 * @param {function} [keySelector] Optional function to select which value you want to check as distinct.
	 * @param {Observable} [flushes] Optional Observable for flushing the internal HashSet of the operator.
	 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
	 * @method distinct
	 * @owner Observable
	 */
	function distinct$2(keySelector, flushes) {
	    return this.lift(new DistinctOperator(keySelector, flushes));
	}
	var distinct_2 = distinct$2;
	var DistinctOperator = (function () {
	    function DistinctOperator(keySelector, flushes) {
	        this.keySelector = keySelector;
	        this.flushes = flushes;
	    }
	    DistinctOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DistinctSubscriber(subscriber, this.keySelector, this.flushes));
	    };
	    return DistinctOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctSubscriber = (function (_super) {
	    __extends$61(DistinctSubscriber, _super);
	    function DistinctSubscriber(destination, keySelector, flushes) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.values = new Set_1.Set();
	        if (flushes) {
	            this.add(subscribeToResult_1$19.subscribeToResult(this, flushes));
	        }
	    }
	    DistinctSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values.clear();
	    };
	    DistinctSubscriber.prototype.notifyError = function (error, innerSub) {
	        this._error(error);
	    };
	    DistinctSubscriber.prototype._next = function (value) {
	        if (this.keySelector) {
	            this._useKeySelector(value);
	        }
	        else {
	            this._finalizeNext(value, value);
	        }
	    };
	    DistinctSubscriber.prototype._useKeySelector = function (value) {
	        var key;
	        var destination = this.destination;
	        try {
	            key = this.keySelector(value);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        this._finalizeNext(key, value);
	    };
	    DistinctSubscriber.prototype._finalizeNext = function (key, value) {
	        var values = this.values;
	        if (!values.has(key)) {
	            values.add(key);
	            this.destination.next(value);
	        }
	    };
	    return DistinctSubscriber;
	}(OuterSubscriber_1$19.OuterSubscriber));
	var DistinctSubscriber_1 = DistinctSubscriber;


	var distinct_1$1 = {
		distinct: distinct_2,
		DistinctSubscriber: DistinctSubscriber_1
	};

	var Observable_1$79 = Observable_1$2;
	var distinct_1 = distinct_1$1;
	Observable_1$79.Observable.prototype.distinct = distinct_1.distinct;

	var __extends$62 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$20 = Subscriber_1$3;
	var tryCatch_1$9 = tryCatch_1$1;
	var errorObject_1$9 = errorObject;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item.
	 *
	 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
	 *
	 * If a comparator function is not provided, an equality check is used by default.
	 *
	 * @example <caption>A simple example with numbers</caption>
	 * Observable.of(1, 1, 2, 2, 2, 1, 1, 2, 3, 3, 4)
	 *   .distinctUntilChanged()
	 *   .subscribe(x => console.log(x)); // 1, 2, 1, 2, 3, 4
	 *
	 * @example <caption>An example using a compare function</caption>
	 * interface Person {
	 *    age: number,
	 *    name: string
	 * }
	 *
	 * Observable.of<Person>(
	 *     { age: 4, name: 'Foo'},
	 *     { age: 7, name: 'Bar'},
	 *     { age: 5, name: 'Foo'})
	 *     { age: 6, name: 'Foo'})
	 *     .distinctUntilChanged((p: Person, q: Person) => p.name === q.name)
	 *     .subscribe(x => console.log(x));
	 *
	 * // displays:
	 * // { age: 4, name: 'Foo' }
	 * // { age: 7, name: 'Bar' }
	 * // { age: 5, name: 'Foo' }
	 *
	 * @see {@link distinct}
	 * @see {@link distinctUntilKeyChanged}
	 *
	 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
	 * @return {Observable} An Observable that emits items from the source Observable with distinct values.
	 * @method distinctUntilChanged
	 * @owner Observable
	 */
	function distinctUntilChanged$2(compare, keySelector) {
	    return this.lift(new DistinctUntilChangedOperator(compare, keySelector));
	}
	var distinctUntilChanged_2 = distinctUntilChanged$2;
	var DistinctUntilChangedOperator = (function () {
	    function DistinctUntilChangedOperator(compare, keySelector) {
	        this.compare = compare;
	        this.keySelector = keySelector;
	    }
	    DistinctUntilChangedOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DistinctUntilChangedSubscriber(subscriber, this.compare, this.keySelector));
	    };
	    return DistinctUntilChangedOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DistinctUntilChangedSubscriber = (function (_super) {
	    __extends$62(DistinctUntilChangedSubscriber, _super);
	    function DistinctUntilChangedSubscriber(destination, compare, keySelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.hasKey = false;
	        if (typeof compare === 'function') {
	            this.compare = compare;
	        }
	    }
	    DistinctUntilChangedSubscriber.prototype.compare = function (x, y) {
	        return x === y;
	    };
	    DistinctUntilChangedSubscriber.prototype._next = function (value) {
	        var keySelector = this.keySelector;
	        var key = value;
	        if (keySelector) {
	            key = tryCatch_1$9.tryCatch(this.keySelector)(value);
	            if (key === errorObject_1$9.errorObject) {
	                return this.destination.error(errorObject_1$9.errorObject.e);
	            }
	        }
	        var result = false;
	        if (this.hasKey) {
	            result = tryCatch_1$9.tryCatch(this.compare)(this.key, key);
	            if (result === errorObject_1$9.errorObject) {
	                return this.destination.error(errorObject_1$9.errorObject.e);
	            }
	        }
	        else {
	            this.hasKey = true;
	        }
	        if (Boolean(result) === false) {
	            this.key = key;
	            this.destination.next(value);
	        }
	    };
	    return DistinctUntilChangedSubscriber;
	}(Subscriber_1$20.Subscriber));


	var distinctUntilChanged_1$1 = {
		distinctUntilChanged: distinctUntilChanged_2
	};

	var Observable_1$80 = Observable_1$2;
	var distinctUntilChanged_1 = distinctUntilChanged_1$1;
	Observable_1$80.Observable.prototype.distinctUntilChanged = distinctUntilChanged_1.distinctUntilChanged;

	var distinctUntilChanged_1$3 = distinctUntilChanged_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from the previous item,
	 * using a property accessed by using the key provided to check if the two items are distinct.
	 *
	 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
	 *
	 * If a comparator function is not provided, an equality check is used by default.
	 *
	 * @example <caption>An example comparing the name of persons</caption>
	 *
	 *  interface Person {
	 *     age: number,
	 *     name: string
	 *  }
	 *
	 * Observable.of<Person>(
	 *     { age: 4, name: 'Foo'},
	 *     { age: 7, name: 'Bar'},
	 *     { age: 5, name: 'Foo'},
	 *     { age: 6, name: 'Foo'})
	 *     .distinctUntilKeyChanged('name')
	 *     .subscribe(x => console.log(x));
	 *
	 * // displays:
	 * // { age: 4, name: 'Foo' }
	 * // { age: 7, name: 'Bar' }
	 * // { age: 5, name: 'Foo' }
	 *
	 * @example <caption>An example comparing the first letters of the name</caption>
	 *
	 * interface Person {
	 *     age: number,
	 *     name: string
	 *  }
	 *
	 * Observable.of<Person>(
	 *     { age: 4, name: 'Foo1'},
	 *     { age: 7, name: 'Bar'},
	 *     { age: 5, name: 'Foo2'},
	 *     { age: 6, name: 'Foo3'})
	 *     .distinctUntilKeyChanged('name', (x: string, y: string) => x.substring(0, 3) === y.substring(0, 3))
	 *     .subscribe(x => console.log(x));
	 *
	 * // displays:
	 * // { age: 4, name: 'Foo1' }
	 * // { age: 7, name: 'Bar' }
	 * // { age: 5, name: 'Foo2' }
	 *
	 * @see {@link distinct}
	 * @see {@link distinctUntilChanged}
	 *
	 * @param {string} key String key for object property lookup on each item.
	 * @param {function} [compare] Optional comparison function called to test if an item is distinct from the previous item in the source.
	 * @return {Observable} An Observable that emits items from the source Observable with distinct values based on the key specified.
	 * @method distinctUntilKeyChanged
	 * @owner Observable
	 */
	function distinctUntilKeyChanged$2(key, compare) {
	    return distinctUntilChanged_1$3.distinctUntilChanged.call(this, function (x, y) {
	        if (compare) {
	            return compare(x[key], y[key]);
	        }
	        return x[key] === y[key];
	    });
	}
	var distinctUntilKeyChanged_2 = distinctUntilKeyChanged$2;


	var distinctUntilKeyChanged_1$1 = {
		distinctUntilKeyChanged: distinctUntilKeyChanged_2
	};

	var Observable_1$81 = Observable_1$2;
	var distinctUntilKeyChanged_1 = distinctUntilKeyChanged_1$1;
	Observable_1$81.Observable.prototype.distinctUntilKeyChanged = distinctUntilKeyChanged_1.distinctUntilKeyChanged;

	var __extends$63 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$21 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Perform a side effect for every emission on the source Observable, but return
	 * an Observable that is identical to the source.
	 *
	 * <span class="informal">Intercepts each emission on the source and runs a
	 * function, but returns an output which is identical to the source as long as errors don't occur.</span>
	 *
	 * <img src="./img/do.png" width="100%">
	 *
	 * Returns a mirrored Observable of the source Observable, but modified so that
	 * the provided Observer is called to perform a side effect for every value,
	 * error, and completion emitted by the source. Any errors that are thrown in
	 * the aforementioned Observer or handlers are safely sent down the error path
	 * of the output Observable.
	 *
	 * This operator is useful for debugging your Observables for the correct values
	 * or performing other side effects.
	 *
	 * Note: this is different to a `subscribe` on the Observable. If the Observable
	 * returned by `do` is not subscribed, the side effects specified by the
	 * Observer will never happen. `do` therefore simply spies on existing
	 * execution, it does not trigger an execution to happen like `subscribe` does.
	 *
	 * @example <caption>Map every click to the clientX position of that click, while also logging the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var positions = clicks
	 *   .do(ev => console.log(ev))
	 *   .map(ev => ev.clientX);
	 * positions.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 * @see {@link subscribe}
	 *
	 * @param {Observer|function} [nextOrObserver] A normal Observer object or a
	 * callback for `next`.
	 * @param {function} [error] Callback for errors in the source.
	 * @param {function} [complete] Callback for the completion of the source.
	 * @return {Observable} An Observable identical to the source, but runs the
	 * specified Observer or callback(s) for each item.
	 * @method do
	 * @name do
	 * @owner Observable
	 */
	function _do$2(nextOrObserver, error, complete) {
	    return this.lift(new DoOperator(nextOrObserver, error, complete));
	}
	var _do_2 = _do$2;
	var DoOperator = (function () {
	    function DoOperator(nextOrObserver, error, complete) {
	        this.nextOrObserver = nextOrObserver;
	        this.error = error;
	        this.complete = complete;
	    }
	    DoOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
	    };
	    return DoOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var DoSubscriber = (function (_super) {
	    __extends$63(DoSubscriber, _super);
	    function DoSubscriber(destination, nextOrObserver, error, complete) {
	        _super.call(this, destination);
	        var safeSubscriber = new Subscriber_1$21.Subscriber(nextOrObserver, error, complete);
	        safeSubscriber.syncErrorThrowable = true;
	        this.add(safeSubscriber);
	        this.safeSubscriber = safeSubscriber;
	    }
	    DoSubscriber.prototype._next = function (value) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.next(value);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.next(value);
	        }
	    };
	    DoSubscriber.prototype._error = function (err) {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.error(err);
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.error(err);
	        }
	    };
	    DoSubscriber.prototype._complete = function () {
	        var safeSubscriber = this.safeSubscriber;
	        safeSubscriber.complete();
	        if (safeSubscriber.syncErrorThrown) {
	            this.destination.error(safeSubscriber.syncErrorValue);
	        }
	        else {
	            this.destination.complete();
	        }
	    };
	    return DoSubscriber;
	}(Subscriber_1$21.Subscriber));


	var _do_1 = {
		_do: _do_2
	};

	var Observable_1$82 = Observable_1$2;
	var do_1 = _do_1;
	Observable_1$82.Observable.prototype.do = do_1._do;
	Observable_1$82.Observable.prototype._do = do_1._do;

	var __extends$64 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$20 = OuterSubscriber_1$1;
	var subscribeToResult_1$20 = subscribeToResult_1$1;
	/**
	 * Converts a higher-order Observable into a first-order Observable by dropping
	 * inner Observables while the previous inner Observable has not yet completed.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables by dropping the
	 * next inner Observables while the current inner is still executing.</span>
	 *
	 * <img src="./img/exhaust.png" width="100%">
	 *
	 * `exhaust` subscribes to an Observable that emits Observables, also known as a
	 * higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, the output Observable begins emitting the items emitted by that
	 * inner Observable. So far, it behaves like {@link mergeAll}. However,
	 * `exhaust` ignores every new inner Observable if the previous Observable has
	 * not yet completed. Once that one completes, it will accept and flatten the
	 * next inner Observable and repeat this process.
	 *
	 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(5));
	 * var result = higherOrder.exhaust();
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link switch}
	 * @see {@link mergeAll}
	 * @see {@link exhaustMap}
	 * @see {@link zipAll}
	 *
	 * @return {Observable} An Observable that takes a source of Observables and propagates the first observable
	 * exclusively until it completes before subscribing to the next.
	 * @method exhaust
	 * @owner Observable
	 */
	function exhaust$2() {
	    return this.lift(new SwitchFirstOperator());
	}
	var exhaust_2 = exhaust$2;
	var SwitchFirstOperator = (function () {
	    function SwitchFirstOperator() {
	    }
	    SwitchFirstOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SwitchFirstSubscriber(subscriber));
	    };
	    return SwitchFirstOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchFirstSubscriber = (function (_super) {
	    __extends$64(SwitchFirstSubscriber, _super);
	    function SwitchFirstSubscriber(destination) {
	        _super.call(this, destination);
	        this.hasCompleted = false;
	        this.hasSubscription = false;
	    }
	    SwitchFirstSubscriber.prototype._next = function (value) {
	        if (!this.hasSubscription) {
	            this.hasSubscription = true;
	            this.add(subscribeToResult_1$20.subscribeToResult(this, value));
	        }
	    };
	    SwitchFirstSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (!this.hasSubscription) {
	            this.destination.complete();
	        }
	    };
	    SwitchFirstSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.hasSubscription = false;
	        if (this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return SwitchFirstSubscriber;
	}(OuterSubscriber_1$20.OuterSubscriber));


	var exhaust_1$1 = {
		exhaust: exhaust_2
	};

	var Observable_1$83 = Observable_1$2;
	var exhaust_1 = exhaust_1$1;
	Observable_1$83.Observable.prototype.exhaust = exhaust_1.exhaust;

	var __extends$65 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$21 = OuterSubscriber_1$1;
	var subscribeToResult_1$21 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable only if the previous projected Observable has completed.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link exhaust}.</span>
	 *
	 * <img src="./img/exhaustMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. When it projects a source value to
	 * an Observable, the output Observable begins emitting the items emitted by
	 * that projected Observable. However, `exhaustMap` ignores every new projected
	 * Observable if the previous projected Observable has not yet completed. Once
	 * that one completes, it will accept and flatten the next projected Observable
	 * and repeat this process.
	 *
	 * @example <caption>Run a finite timer for each click, only if there is no currently active timer</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.exhaustMap((ev) => Rx.Observable.interval(1000).take(5));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaust}
	 * @see {@link mergeMap}
	 * @see {@link switchMap}
	 *
	 * @param {function(value: T, ?index: number): ObservableInput} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable containing projected Observables
	 * of each item of the source, ignoring projected Observables that start before
	 * their preceding Observable has completed.
	 * @method exhaustMap
	 * @owner Observable
	 */
	function exhaustMap$2(project, resultSelector) {
	    return this.lift(new SwitchFirstMapOperator(project, resultSelector));
	}
	var exhaustMap_2 = exhaustMap$2;
	var SwitchFirstMapOperator = (function () {
	    function SwitchFirstMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchFirstMapOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SwitchFirstMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchFirstMapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchFirstMapSubscriber = (function (_super) {
	    __extends$65(SwitchFirstMapSubscriber, _super);
	    function SwitchFirstMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.hasSubscription = false;
	        this.hasCompleted = false;
	        this.index = 0;
	    }
	    SwitchFirstMapSubscriber.prototype._next = function (value) {
	        if (!this.hasSubscription) {
	            this.tryNext(value);
	        }
	    };
	    SwitchFirstMapSubscriber.prototype.tryNext = function (value) {
	        var index = this.index++;
	        var destination = this.destination;
	        try {
	            var result = this.project(value, index);
	            this.hasSubscription = true;
	            this.add(subscribeToResult_1$21.subscribeToResult(this, result, value, index));
	        }
	        catch (err) {
	            destination.error(err);
	        }
	    };
	    SwitchFirstMapSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (!this.hasSubscription) {
	            this.destination.complete();
	        }
	    };
	    SwitchFirstMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        if (resultSelector) {
	            this.trySelectResult(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            destination.next(innerValue);
	        }
	    };
	    SwitchFirstMapSubscriber.prototype.trySelectResult = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        try {
	            var result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	            destination.next(result);
	        }
	        catch (err) {
	            destination.error(err);
	        }
	    };
	    SwitchFirstMapSubscriber.prototype.notifyError = function (err) {
	        this.destination.error(err);
	    };
	    SwitchFirstMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.hasSubscription = false;
	        if (this.hasCompleted) {
	            this.destination.complete();
	        }
	    };
	    return SwitchFirstMapSubscriber;
	}(OuterSubscriber_1$21.OuterSubscriber));


	var exhaustMap_1$1 = {
		exhaustMap: exhaustMap_2
	};

	var Observable_1$84 = Observable_1$2;
	var exhaustMap_1 = exhaustMap_1$1;
	Observable_1$84.Observable.prototype.exhaustMap = exhaustMap_1.exhaustMap;

	var __extends$66 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1$10 = tryCatch_1$1;
	var errorObject_1$10 = errorObject;
	var OuterSubscriber_1$22 = OuterSubscriber_1$1;
	var subscribeToResult_1$22 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Recursively projects each source value to an Observable which is merged in
	 * the output Observable.
	 *
	 * <span class="informal">It's similar to {@link mergeMap}, but applies the
	 * projection function to every source value as well as every output value.
	 * It's recursive.</span>
	 *
	 * <img src="./img/expand.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an Observable, and then merging those resulting Observables and
	 * emitting the results of this merger. *Expand* will re-emit on the output
	 * Observable every source value. Then, each output value is given to the
	 * `project` function which returns an inner Observable to be merged on the
	 * output Observable. Those output values resulting from the projection are also
	 * given to the `project` function to produce new output values. This is how
	 * *expand* behaves recursively.
	 *
	 * @example <caption>Start emitting the powers of two on every click, at most 10 of them</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var powersOfTwo = clicks
	 *   .mapTo(1)
	 *   .expand(x => Rx.Observable.of(2 * x).delay(1000))
	 *   .take(10);
	 * powersOfTwo.subscribe(x => console.log(x));
	 *
	 * @see {@link mergeMap}
	 * @see {@link mergeScan}
	 *
	 * @param {function(value: T, index: number) => Observable} project A function
	 * that, when applied to an item emitted by the source or the output Observable,
	 * returns an Observable.
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of input
	 * Observables being subscribed to concurrently.
	 * @param {Scheduler} [scheduler=null] The IScheduler to use for subscribing to
	 * each projected inner Observable.
	 * @return {Observable} An Observable that emits the source values and also
	 * result of applying the projection function to each value emitted on the
	 * output Observable and and merging the results of the Observables obtained
	 * from this transformation.
	 * @method expand
	 * @owner Observable
	 */
	function expand$2(project, concurrent, scheduler) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    if (scheduler === void 0) { scheduler = undefined; }
	    concurrent = (concurrent || 0) < 1 ? Number.POSITIVE_INFINITY : concurrent;
	    return this.lift(new ExpandOperator(project, concurrent, scheduler));
	}
	var expand_2 = expand$2;
	var ExpandOperator = (function () {
	    function ExpandOperator(project, concurrent, scheduler) {
	        this.project = project;
	        this.concurrent = concurrent;
	        this.scheduler = scheduler;
	    }
	    ExpandOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ExpandSubscriber(subscriber, this.project, this.concurrent, this.scheduler));
	    };
	    return ExpandOperator;
	}());
	var ExpandOperator_1 = ExpandOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ExpandSubscriber = (function (_super) {
	    __extends$66(ExpandSubscriber, _super);
	    function ExpandSubscriber(destination, project, concurrent, scheduler) {
	        _super.call(this, destination);
	        this.project = project;
	        this.concurrent = concurrent;
	        this.scheduler = scheduler;
	        this.index = 0;
	        this.active = 0;
	        this.hasCompleted = false;
	        if (concurrent < Number.POSITIVE_INFINITY) {
	            this.buffer = [];
	        }
	    }
	    ExpandSubscriber.dispatch = function (arg) {
	        var subscriber = arg.subscriber, result = arg.result, value = arg.value, index = arg.index;
	        subscriber.subscribeToProjection(result, value, index);
	    };
	    ExpandSubscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        if (destination.closed) {
	            this._complete();
	            return;
	        }
	        var index = this.index++;
	        if (this.active < this.concurrent) {
	            destination.next(value);
	            var result = tryCatch_1$10.tryCatch(this.project)(value, index);
	            if (result === errorObject_1$10.errorObject) {
	                destination.error(errorObject_1$10.errorObject.e);
	            }
	            else if (!this.scheduler) {
	                this.subscribeToProjection(result, value, index);
	            }
	            else {
	                var state = { subscriber: this, result: result, value: value, index: index };
	                this.add(this.scheduler.schedule(ExpandSubscriber.dispatch, 0, state));
	            }
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    ExpandSubscriber.prototype.subscribeToProjection = function (result, value, index) {
	        this.active++;
	        this.add(subscribeToResult_1$22.subscribeToResult(this, result, value, index));
	    };
	    ExpandSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.hasCompleted && this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    ExpandSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this._next(innerValue);
	    };
	    ExpandSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer && buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        if (this.hasCompleted && this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    return ExpandSubscriber;
	}(OuterSubscriber_1$22.OuterSubscriber));
	var ExpandSubscriber_1 = ExpandSubscriber;


	var expand_1$1 = {
		expand: expand_2,
		ExpandOperator: ExpandOperator_1,
		ExpandSubscriber: ExpandSubscriber_1
	};

	var Observable_1$85 = Observable_1$2;
	var expand_1 = expand_1$1;
	Observable_1$85.Observable.prototype.expand = expand_1.expand;

	var __extends$68 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an element was queried at a certain index of an
	 * Observable, but no such index or position exists in that sequence.
	 *
	 * @see {@link elementAt}
	 * @see {@link take}
	 * @see {@link takeLast}
	 *
	 * @class ArgumentOutOfRangeError
	 */
	var ArgumentOutOfRangeError$1 = (function (_super) {
	    __extends$68(ArgumentOutOfRangeError, _super);
	    function ArgumentOutOfRangeError() {
	        var err = _super.call(this, 'argument out of range');
	        this.name = err.name = 'ArgumentOutOfRangeError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return ArgumentOutOfRangeError;
	}(Error));
	var ArgumentOutOfRangeError_2 = ArgumentOutOfRangeError$1;


	var ArgumentOutOfRangeError_1$2 = {
		ArgumentOutOfRangeError: ArgumentOutOfRangeError_2
	};

	var __extends$67 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$22 = Subscriber_1$3;
	var ArgumentOutOfRangeError_1$1 = ArgumentOutOfRangeError_1$2;
	/**
	 * Emits the single value at the specified `index` in a sequence of emissions
	 * from the source Observable.
	 *
	 * <span class="informal">Emits only the i-th value, then completes.</span>
	 *
	 * <img src="./img/elementAt.png" width="100%">
	 *
	 * `elementAt` returns an Observable that emits the item at the specified
	 * `index` in the source Observable, or a default value if that `index` is out
	 * of range and the `default` argument is provided. If the `default` argument is
	 * not given and the `index` is out of range, the output Observable will emit an
	 * `ArgumentOutOfRangeError` error.
	 *
	 * @example <caption>Emit only the third click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.elementAt(2);
	 * result.subscribe(x => console.log(x));
	 *
	 * // Results in:
	 * // click 1 = nothing
	 * // click 2 = nothing
	 * // click 3 = MouseEvent object logged to console
	 *
	 * @see {@link first}
	 * @see {@link last}
	 * @see {@link skip}
	 * @see {@link single}
	 * @see {@link take}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `elementAt(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0` or the
	 * Observable has completed before emitting the i-th `next` notification.
	 *
	 * @param {number} index Is the number `i` for the i-th source emission that has
	 * happened since the subscription, starting from the number `0`.
	 * @param {T} [defaultValue] The default value returned for missing indices.
	 * @return {Observable} An Observable that emits a single item, if it is found.
	 * Otherwise, will emit the default value if given. If not, then emits an error.
	 * @method elementAt
	 * @owner Observable
	 */
	function elementAt$2(index, defaultValue) {
	    return this.lift(new ElementAtOperator(index, defaultValue));
	}
	var elementAt_2 = elementAt$2;
	var ElementAtOperator = (function () {
	    function ElementAtOperator(index, defaultValue) {
	        this.index = index;
	        this.defaultValue = defaultValue;
	        if (index < 0) {
	            throw new ArgumentOutOfRangeError_1$1.ArgumentOutOfRangeError;
	        }
	    }
	    ElementAtOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ElementAtSubscriber(subscriber, this.index, this.defaultValue));
	    };
	    return ElementAtOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ElementAtSubscriber = (function (_super) {
	    __extends$67(ElementAtSubscriber, _super);
	    function ElementAtSubscriber(destination, index, defaultValue) {
	        _super.call(this, destination);
	        this.index = index;
	        this.defaultValue = defaultValue;
	    }
	    ElementAtSubscriber.prototype._next = function (x) {
	        if (this.index-- === 0) {
	            this.destination.next(x);
	            this.destination.complete();
	        }
	    };
	    ElementAtSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.index >= 0) {
	            if (typeof this.defaultValue !== 'undefined') {
	                destination.next(this.defaultValue);
	            }
	            else {
	                destination.error(new ArgumentOutOfRangeError_1$1.ArgumentOutOfRangeError);
	            }
	        }
	        destination.complete();
	    };
	    return ElementAtSubscriber;
	}(Subscriber_1$22.Subscriber));


	var elementAt_1$1 = {
		elementAt: elementAt_2
	};

	var Observable_1$86 = Observable_1$2;
	var elementAt_1 = elementAt_1$1;
	Observable_1$86.Observable.prototype.elementAt = elementAt_1.elementAt;

	var __extends$69 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$23 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Filter items emitted by the source Observable by only emitting those that
	 * satisfy a specified predicate.
	 *
	 * <span class="informal">Like
	 * [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter),
	 * it only emits a value from the source if it passes a criterion function.</span>
	 *
	 * <img src="./img/filter.png" width="100%">
	 *
	 * Similar to the well-known `Array.prototype.filter` method, this operator
	 * takes values from the source Observable, passes them through a `predicate`
	 * function and only emits those values that yielded `true`.
	 *
	 * @example <caption>Emit only click events whose target was a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var clicksOnDivs = clicks.filter(ev => ev.target.tagName === 'DIV');
	 * clicksOnDivs.subscribe(x => console.log(x));
	 *
	 * @see {@link distinct}
	 * @see {@link distinctUntilChanged}
	 * @see {@link distinctUntilKeyChanged}
	 * @see {@link ignoreElements}
	 * @see {@link partition}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted, if `false` the value is not passed to the output
	 * Observable. The `index` parameter is the number `i` for the i-th source
	 * emission that has happened since the subscription, starting from the number
	 * `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of values from the source that were
	 * allowed by the `predicate` function.
	 * @method filter
	 * @owner Observable
	 */
	function filter$2(predicate, thisArg) {
	    return this.lift(new FilterOperator(predicate, thisArg));
	}
	var filter_2 = filter$2;
	var FilterOperator = (function () {
	    function FilterOperator(predicate, thisArg) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	    }
	    FilterOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
	    };
	    return FilterOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FilterSubscriber = (function (_super) {
	    __extends$69(FilterSubscriber, _super);
	    function FilterSubscriber(destination, predicate, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.count = 0;
	        this.predicate = predicate;
	    }
	    // the try catch block below is left specifically for
	    // optimization and perf reasons. a tryCatcher is not necessary here.
	    FilterSubscriber.prototype._next = function (value) {
	        var result;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.count++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this.destination.next(value);
	        }
	    };
	    return FilterSubscriber;
	}(Subscriber_1$23.Subscriber));


	var filter_1$1 = {
		filter: filter_2
	};

	var Observable_1$87 = Observable_1$2;
	var filter_1 = filter_1$1;
	Observable_1$87.Observable.prototype.filter = filter_1.filter;

	var __extends$70 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$24 = Subscriber_1$3;
	var Subscription_1$14 = Subscription_1$3;
	/**
	 * Returns an Observable that mirrors the source Observable, but will call a specified function when
	 * the source terminates on complete or error.
	 * @param {function} callback Function to be called when source terminates.
	 * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
	 * @method finally
	 * @owner Observable
	 */
	function _finally$2(callback) {
	    return this.lift(new FinallyOperator(callback));
	}
	var _finally_2 = _finally$2;
	var FinallyOperator = (function () {
	    function FinallyOperator(callback) {
	        this.callback = callback;
	    }
	    FinallyOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new FinallySubscriber(subscriber, this.callback));
	    };
	    return FinallyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FinallySubscriber = (function (_super) {
	    __extends$70(FinallySubscriber, _super);
	    function FinallySubscriber(destination, callback) {
	        _super.call(this, destination);
	        this.add(new Subscription_1$14.Subscription(callback));
	    }
	    return FinallySubscriber;
	}(Subscriber_1$24.Subscriber));


	var _finally_1 = {
		_finally: _finally_2
	};

	var Observable_1$88 = Observable_1$2;
	var finally_1 = _finally_1;
	Observable_1$88.Observable.prototype.finally = finally_1._finally;
	Observable_1$88.Observable.prototype._finally = finally_1._finally;

	var __extends$71 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$25 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Emits only the first value emitted by the source Observable that meets some
	 * condition.
	 *
	 * <span class="informal">Finds the first value that passes some test and emits
	 * that.</span>
	 *
	 * <img src="./img/find.png" width="100%">
	 *
	 * `find` searches for the first item in the source Observable that matches the
	 * specified condition embodied by the `predicate`, and returns the first
	 * occurrence in the source. Unlike {@link first}, the `predicate` is required
	 * in `find`, and does not emit an error if a valid value is not found.
	 *
	 * @example <caption>Find and emit the first click that happens on a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.find(ev => ev.target.tagName === 'DIV');
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link filter}
	 * @see {@link first}
	 * @see {@link findIndex}
	 * @see {@link take}
	 *
	 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
	 * A function called with each item to test for condition matching.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable<T>} An Observable of the first item that matches the
	 * condition.
	 * @method find
	 * @owner Observable
	 */
	function find$2(predicate, thisArg) {
	    if (typeof predicate !== 'function') {
	        throw new TypeError('predicate is not a function');
	    }
	    return this.lift(new FindValueOperator(predicate, this, false, thisArg));
	}
	var find_2 = find$2;
	var FindValueOperator = (function () {
	    function FindValueOperator(predicate, source, yieldIndex, thisArg) {
	        this.predicate = predicate;
	        this.source = source;
	        this.yieldIndex = yieldIndex;
	        this.thisArg = thisArg;
	    }
	    FindValueOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new FindValueSubscriber(observer, this.predicate, this.source, this.yieldIndex, this.thisArg));
	    };
	    return FindValueOperator;
	}());
	var FindValueOperator_1 = FindValueOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FindValueSubscriber = (function (_super) {
	    __extends$71(FindValueSubscriber, _super);
	    function FindValueSubscriber(destination, predicate, source, yieldIndex, thisArg) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.source = source;
	        this.yieldIndex = yieldIndex;
	        this.thisArg = thisArg;
	        this.index = 0;
	    }
	    FindValueSubscriber.prototype.notifyComplete = function (value) {
	        var destination = this.destination;
	        destination.next(value);
	        destination.complete();
	    };
	    FindValueSubscriber.prototype._next = function (value) {
	        var _a = this, predicate = _a.predicate, thisArg = _a.thisArg;
	        var index = this.index++;
	        try {
	            var result = predicate.call(thisArg || this, value, index, this.source);
	            if (result) {
	                this.notifyComplete(this.yieldIndex ? index : value);
	            }
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	    };
	    FindValueSubscriber.prototype._complete = function () {
	        this.notifyComplete(this.yieldIndex ? -1 : undefined);
	    };
	    return FindValueSubscriber;
	}(Subscriber_1$25.Subscriber));
	var FindValueSubscriber_1 = FindValueSubscriber;


	var find_1$1 = {
		find: find_2,
		FindValueOperator: FindValueOperator_1,
		FindValueSubscriber: FindValueSubscriber_1
	};

	var Observable_1$89 = Observable_1$2;
	var find_1 = find_1$1;
	Observable_1$89.Observable.prototype.find = find_1.find;

	var find_1$3 = find_1$1;
	/**
	 * Emits only the index of the first value emitted by the source Observable that
	 * meets some condition.
	 *
	 * <span class="informal">It's like {@link find}, but emits the index of the
	 * found value, not the value itself.</span>
	 *
	 * <img src="./img/findIndex.png" width="100%">
	 *
	 * `findIndex` searches for the first item in the source Observable that matches
	 * the specified condition embodied by the `predicate`, and returns the
	 * (zero-based) index of the first occurrence in the source. Unlike
	 * {@link first}, the `predicate` is required in `findIndex`, and does not emit
	 * an error if a valid value is not found.
	 *
	 * @example <caption>Emit the index of first click that happens on a DIV element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.findIndex(ev => ev.target.tagName === 'DIV');
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link filter}
	 * @see {@link find}
	 * @see {@link first}
	 * @see {@link take}
	 *
	 * @param {function(value: T, index: number, source: Observable<T>): boolean} predicate
	 * A function called with each item to test for condition matching.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {Observable} An Observable of the index of the first item that
	 * matches the condition.
	 * @method find
	 * @owner Observable
	 */
	function findIndex$2(predicate, thisArg) {
	    return this.lift(new find_1$3.FindValueOperator(predicate, this, true, thisArg));
	}
	var findIndex_2 = findIndex$2;


	var findIndex_1$1 = {
		findIndex: findIndex_2
	};

	var Observable_1$90 = Observable_1$2;
	var findIndex_1 = findIndex_1$1;
	Observable_1$90.Observable.prototype.findIndex = findIndex_1.findIndex;

	var __extends$73 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when an Observable or a sequence was queried but has no
	 * elements.
	 *
	 * @see {@link first}
	 * @see {@link last}
	 * @see {@link single}
	 *
	 * @class EmptyError
	 */
	var EmptyError$1 = (function (_super) {
	    __extends$73(EmptyError, _super);
	    function EmptyError() {
	        var err = _super.call(this, 'no elements in sequence');
	        this.name = err.name = 'EmptyError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return EmptyError;
	}(Error));
	var EmptyError_2 = EmptyError$1;


	var EmptyError_1$2 = {
		EmptyError: EmptyError_2
	};

	var __extends$72 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$26 = Subscriber_1$3;
	var EmptyError_1$1 = EmptyError_1$2;
	/**
	 * Emits only the first value (or the first value that meets some condition)
	 * emitted by the source Observable.
	 *
	 * <span class="informal">Emits only the first value. Or emits only the first
	 * value that passes some test.</span>
	 *
	 * <img src="./img/first.png" width="100%">
	 *
	 * If called with no arguments, `first` emits the first value of the source
	 * Observable, then completes. If called with a `predicate` function, `first`
	 * emits the first value of the source that matches the specified condition. It
	 * may also take a `resultSelector` function to produce the output value from
	 * the input value, and a `defaultValue` to emit in case the source completes
	 * before it is able to emit a valid value. Throws an error if `defaultValue`
	 * was not provided and a matching element is not found.
	 *
	 * @example <caption>Emit only the first click that happens on the DOM</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.first();
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Emits the first click that happens on a DIV</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.first(ev => ev.target.tagName === 'DIV');
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link filter}
	 * @see {@link find}
	 * @see {@link take}
	 *
	 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
	 * callback if the Observable completes before any `next` notification was sent.
	 *
	 * @param {function(value: T, index: number, source: Observable<T>): boolean} [predicate]
	 * An optional function called with each item to test for condition matching.
	 * @param {function(value: T, index: number): R} [resultSelector] A function to
	 * produce the value on the output Observable based on the values
	 * and the indices of the source Observable. The arguments passed to this
	 * function are:
	 * - `value`: the value that was emitted on the source.
	 * - `index`: the "index" of the value from the source.
	 * @param {R} [defaultValue] The default value emitted in case no valid value
	 * was found on the source.
	 * @return {Observable<T|R>} An Observable of the first item that matches the
	 * condition.
	 * @method first
	 * @owner Observable
	 */
	function first$2(predicate, resultSelector, defaultValue) {
	    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
	}
	var first_2 = first$2;
	var FirstOperator = (function () {
	    function FirstOperator(predicate, resultSelector, defaultValue, source) {
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }
	    FirstOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
	    };
	    return FirstOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var FirstSubscriber = (function (_super) {
	    __extends$72(FirstSubscriber, _super);
	    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	        this.index = 0;
	        this.hasCompleted = false;
	        this._emitted = false;
	    }
	    FirstSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this._tryPredicate(value, index);
	        }
	        else {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._tryPredicate = function (value, index) {
	        var result;
	        try {
	            result = this.predicate(value, index, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            this._emit(value, index);
	        }
	    };
	    FirstSubscriber.prototype._emit = function (value, index) {
	        if (this.resultSelector) {
	            this._tryResultSelector(value, index);
	            return;
	        }
	        this._emitFinal(value);
	    };
	    FirstSubscriber.prototype._tryResultSelector = function (value, index) {
	        var result;
	        try {
	            result = this.resultSelector(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this._emitFinal(result);
	    };
	    FirstSubscriber.prototype._emitFinal = function (value) {
	        var destination = this.destination;
	        if (!this._emitted) {
	            this._emitted = true;
	            destination.next(value);
	            destination.complete();
	            this.hasCompleted = true;
	        }
	    };
	    FirstSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
	            destination.next(this.defaultValue);
	            destination.complete();
	        }
	        else if (!this.hasCompleted) {
	            destination.error(new EmptyError_1$1.EmptyError);
	        }
	    };
	    return FirstSubscriber;
	}(Subscriber_1$26.Subscriber));


	var first_1$1 = {
		first: first_2
	};

	var Observable_1$91 = Observable_1$2;
	var first_1 = first_1$1;
	Observable_1$91.Observable.prototype.first = first_1.first;

	var MapPolyfill = (function () {
	    function MapPolyfill() {
	        this.size = 0;
	        this._values = [];
	        this._keys = [];
	    }
	    MapPolyfill.prototype.get = function (key) {
	        var i = this._keys.indexOf(key);
	        return i === -1 ? undefined : this._values[i];
	    };
	    MapPolyfill.prototype.set = function (key, value) {
	        var i = this._keys.indexOf(key);
	        if (i === -1) {
	            this._keys.push(key);
	            this._values.push(value);
	            this.size++;
	        }
	        else {
	            this._values[i] = value;
	        }
	        return this;
	    };
	    MapPolyfill.prototype.delete = function (key) {
	        var i = this._keys.indexOf(key);
	        if (i === -1) {
	            return false;
	        }
	        this._values.splice(i, 1);
	        this._keys.splice(i, 1);
	        this.size--;
	        return true;
	    };
	    MapPolyfill.prototype.clear = function () {
	        this._keys.length = 0;
	        this._values.length = 0;
	        this.size = 0;
	    };
	    MapPolyfill.prototype.forEach = function (cb, thisArg) {
	        for (var i = 0; i < this.size; i++) {
	            cb.call(thisArg, this._values[i], this._keys[i]);
	        }
	    };
	    return MapPolyfill;
	}());
	var MapPolyfill_2 = MapPolyfill;


	var MapPolyfill_1$1 = {
		MapPolyfill: MapPolyfill_2
	};

	var root_1$10 = root$1;
	var MapPolyfill_1 = MapPolyfill_1$1;
	var Map = root_1$10.root.Map || (function () { return MapPolyfill_1.MapPolyfill; })();


	var _Map = {
		Map: Map
	};

	var FastMap = (function () {
	    function FastMap() {
	        this.values = {};
	    }
	    FastMap.prototype.delete = function (key) {
	        this.values[key] = null;
	        return true;
	    };
	    FastMap.prototype.set = function (key, value) {
	        this.values[key] = value;
	        return this;
	    };
	    FastMap.prototype.get = function (key) {
	        return this.values[key];
	    };
	    FastMap.prototype.forEach = function (cb, thisArg) {
	        var values = this.values;
	        for (var key in values) {
	            if (values.hasOwnProperty(key) && values[key] !== null) {
	                cb.call(thisArg, values[key], key);
	            }
	        }
	    };
	    FastMap.prototype.clear = function () {
	        this.values = {};
	    };
	    return FastMap;
	}());
	var FastMap_2 = FastMap;


	var FastMap_1$1 = {
		FastMap: FastMap_2
	};

	var __extends$74 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$27 = Subscriber_1$3;
	var Subscription_1$15 = Subscription_1$3;
	var Observable_1$93 = Observable_1$2;
	var Subject_1$6 = Subject_1$1;
	var Map_1 = _Map;
	var FastMap_1 = FastMap_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Groups the items emitted by an Observable according to a specified criterion,
	 * and emits these grouped items as `GroupedObservables`, one
	 * {@link GroupedObservable} per group.
	 *
	 * <img src="./img/groupBy.png" width="100%">
	 *
	 * @example <caption>Group objects by id and return as array</caption>
	 * Observable.of<Obj>({id: 1, name: 'aze1'},
	 *                    {id: 2, name: 'sf2'},
	 *                    {id: 2, name: 'dg2'},
	 *                    {id: 1, name: 'erg1'},
	 *                    {id: 1, name: 'df1'},
	 *                    {id: 2, name: 'sfqfb2'},
	 *                    {id: 3, name: 'qfs3'},
	 *                    {id: 2, name: 'qsgqsfg2'}
	 *     )
	 *     .groupBy(p => p.id)
	 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], []))
	 *     .subscribe(p => console.log(p));
	 *
	 * // displays:
	 * // [ { id: 1, name: 'aze1' },
	 * //   { id: 1, name: 'erg1' },
	 * //   { id: 1, name: 'df1' } ]
	 * //
	 * // [ { id: 2, name: 'sf2' },
	 * //   { id: 2, name: 'dg2' },
	 * //   { id: 2, name: 'sfqfb2' },
	 * //   { id: 2, name: 'qsgqsfg2' } ]
	 * //
	 * // [ { id: 3, name: 'qfs3' } ]
	 *
	 * @example <caption>Pivot data on the id field</caption>
	 * Observable.of<Obj>({id: 1, name: 'aze1'},
	 *                    {id: 2, name: 'sf2'},
	 *                    {id: 2, name: 'dg2'},
	 *                    {id: 1, name: 'erg1'},
	 *                    {id: 1, name: 'df1'},
	 *                    {id: 2, name: 'sfqfb2'},
	 *                    {id: 3, name: 'qfs1'},
	 *                    {id: 2, name: 'qsgqsfg2'}
	 *                   )
	 *     .groupBy(p => p.id, p => p.name)
	 *     .flatMap( (group$) => group$.reduce((acc, cur) => [...acc, cur], ["" + group$.key]))
	 *     .map(arr => ({'id': parseInt(arr[0]), 'values': arr.slice(1)}))
	 *     .subscribe(p => console.log(p));
	 *
	 * // displays:
	 * // { id: 1, values: [ 'aze1', 'erg1', 'df1' ] }
	 * // { id: 2, values: [ 'sf2', 'dg2', 'sfqfb2', 'qsgqsfg2' ] }
	 * // { id: 3, values: [ 'qfs1' ] }
	 *
	 * @param {function(value: T): K} keySelector A function that extracts the key
	 * for each item.
	 * @param {function(value: T): R} [elementSelector] A function that extracts the
	 * return element for each item.
	 * @param {function(grouped: GroupedObservable<K,R>): Observable<any>} [durationSelector]
	 * A function that returns an Observable to determine how long each group should
	 * exist.
	 * @return {Observable<GroupedObservable<K,R>>} An Observable that emits
	 * GroupedObservables, each of which corresponds to a unique key value and each
	 * of which emits those items from the source Observable that share that key
	 * value.
	 * @method groupBy
	 * @owner Observable
	 */
	function groupBy$2(keySelector, elementSelector, durationSelector, subjectSelector) {
	    return this.lift(new GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector));
	}
	var groupBy_2 = groupBy$2;
	var GroupByOperator = (function () {
	    function GroupByOperator(keySelector, elementSelector, durationSelector, subjectSelector) {
	        this.keySelector = keySelector;
	        this.elementSelector = elementSelector;
	        this.durationSelector = durationSelector;
	        this.subjectSelector = subjectSelector;
	    }
	    GroupByOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new GroupBySubscriber(subscriber, this.keySelector, this.elementSelector, this.durationSelector, this.subjectSelector));
	    };
	    return GroupByOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var GroupBySubscriber = (function (_super) {
	    __extends$74(GroupBySubscriber, _super);
	    function GroupBySubscriber(destination, keySelector, elementSelector, durationSelector, subjectSelector) {
	        _super.call(this, destination);
	        this.keySelector = keySelector;
	        this.elementSelector = elementSelector;
	        this.durationSelector = durationSelector;
	        this.subjectSelector = subjectSelector;
	        this.groups = null;
	        this.attemptedToUnsubscribe = false;
	        this.count = 0;
	    }
	    GroupBySubscriber.prototype._next = function (value) {
	        var key;
	        try {
	            key = this.keySelector(value);
	        }
	        catch (err) {
	            this.error(err);
	            return;
	        }
	        this._group(value, key);
	    };
	    GroupBySubscriber.prototype._group = function (value, key) {
	        var groups = this.groups;
	        if (!groups) {
	            groups = this.groups = typeof key === 'string' ? new FastMap_1.FastMap() : new Map_1.Map();
	        }
	        var group = groups.get(key);
	        var element;
	        if (this.elementSelector) {
	            try {
	                element = this.elementSelector(value);
	            }
	            catch (err) {
	                this.error(err);
	            }
	        }
	        else {
	            element = value;
	        }
	        if (!group) {
	            group = this.subjectSelector ? this.subjectSelector() : new Subject_1$6.Subject();
	            groups.set(key, group);
	            var groupedObservable = new GroupedObservable(key, group, this);
	            this.destination.next(groupedObservable);
	            if (this.durationSelector) {
	                var duration = void 0;
	                try {
	                    duration = this.durationSelector(new GroupedObservable(key, group));
	                }
	                catch (err) {
	                    this.error(err);
	                    return;
	                }
	                this.add(duration.subscribe(new GroupDurationSubscriber(key, group, this)));
	            }
	        }
	        if (!group.closed) {
	            group.next(element);
	        }
	    };
	    GroupBySubscriber.prototype._error = function (err) {
	        var groups = this.groups;
	        if (groups) {
	            groups.forEach(function (group, key) {
	                group.error(err);
	            });
	            groups.clear();
	        }
	        this.destination.error(err);
	    };
	    GroupBySubscriber.prototype._complete = function () {
	        var groups = this.groups;
	        if (groups) {
	            groups.forEach(function (group, key) {
	                group.complete();
	            });
	            groups.clear();
	        }
	        this.destination.complete();
	    };
	    GroupBySubscriber.prototype.removeGroup = function (key) {
	        this.groups.delete(key);
	    };
	    GroupBySubscriber.prototype.unsubscribe = function () {
	        if (!this.closed) {
	            this.attemptedToUnsubscribe = true;
	            if (this.count === 0) {
	                _super.prototype.unsubscribe.call(this);
	            }
	        }
	    };
	    return GroupBySubscriber;
	}(Subscriber_1$27.Subscriber));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var GroupDurationSubscriber = (function (_super) {
	    __extends$74(GroupDurationSubscriber, _super);
	    function GroupDurationSubscriber(key, group, parent) {
	        _super.call(this, group);
	        this.key = key;
	        this.group = group;
	        this.parent = parent;
	    }
	    GroupDurationSubscriber.prototype._next = function (value) {
	        this.complete();
	    };
	    GroupDurationSubscriber.prototype._unsubscribe = function () {
	        var _a = this, parent = _a.parent, key = _a.key;
	        this.key = this.parent = null;
	        if (parent) {
	            parent.removeGroup(key);
	        }
	    };
	    return GroupDurationSubscriber;
	}(Subscriber_1$27.Subscriber));
	/**
	 * An Observable representing values belonging to the same group represented by
	 * a common key. The values emitted by a GroupedObservable come from the source
	 * Observable. The common key is available as the field `key` on a
	 * GroupedObservable instance.
	 *
	 * @class GroupedObservable<K, T>
	 */
	var GroupedObservable = (function (_super) {
	    __extends$74(GroupedObservable, _super);
	    function GroupedObservable(key, groupSubject, refCountSubscription) {
	        _super.call(this);
	        this.key = key;
	        this.groupSubject = groupSubject;
	        this.refCountSubscription = refCountSubscription;
	    }
	    GroupedObservable.prototype._subscribe = function (subscriber) {
	        var subscription = new Subscription_1$15.Subscription();
	        var _a = this, refCountSubscription = _a.refCountSubscription, groupSubject = _a.groupSubject;
	        if (refCountSubscription && !refCountSubscription.closed) {
	            subscription.add(new InnerRefCountSubscription(refCountSubscription));
	        }
	        subscription.add(groupSubject.subscribe(subscriber));
	        return subscription;
	    };
	    return GroupedObservable;
	}(Observable_1$93.Observable));
	var GroupedObservable_1 = GroupedObservable;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var InnerRefCountSubscription = (function (_super) {
	    __extends$74(InnerRefCountSubscription, _super);
	    function InnerRefCountSubscription(parent) {
	        _super.call(this);
	        this.parent = parent;
	        parent.count++;
	    }
	    InnerRefCountSubscription.prototype.unsubscribe = function () {
	        var parent = this.parent;
	        if (!parent.closed && !this.closed) {
	            _super.prototype.unsubscribe.call(this);
	            parent.count -= 1;
	            if (parent.count === 0 && parent.attemptedToUnsubscribe) {
	                parent.unsubscribe();
	            }
	        }
	    };
	    return InnerRefCountSubscription;
	}(Subscription_1$15.Subscription));


	var groupBy_1$1 = {
		groupBy: groupBy_2,
		GroupedObservable: GroupedObservable_1
	};

	var Observable_1$92 = Observable_1$2;
	var groupBy_1 = groupBy_1$1;
	Observable_1$92.Observable.prototype.groupBy = groupBy_1.groupBy;

	var __extends$75 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$28 = Subscriber_1$3;
	var noop_1$3 = noop_1$1;
	/**
	 * Ignores all items emitted by the source Observable and only passes calls of `complete` or `error`.
	 *
	 * <img src="./img/ignoreElements.png" width="100%">
	 *
	 * @return {Observable} An empty Observable that only calls `complete`
	 * or `error`, based on which one is called by the source Observable.
	 * @method ignoreElements
	 * @owner Observable
	 */
	function ignoreElements$2() {
	    return this.lift(new IgnoreElementsOperator());
	}
	var ignoreElements_2 = ignoreElements$2;

	var IgnoreElementsOperator = (function () {
	    function IgnoreElementsOperator() {
	    }
	    IgnoreElementsOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new IgnoreElementsSubscriber(subscriber));
	    };
	    return IgnoreElementsOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var IgnoreElementsSubscriber = (function (_super) {
	    __extends$75(IgnoreElementsSubscriber, _super);
	    function IgnoreElementsSubscriber() {
	        _super.apply(this, arguments);
	    }
	    IgnoreElementsSubscriber.prototype._next = function (unused) {
	        noop_1$3.noop();
	    };
	    return IgnoreElementsSubscriber;
	}(Subscriber_1$28.Subscriber));


	var ignoreElements_1$1 = {
		ignoreElements: ignoreElements_2
	};

	var Observable_1$94 = Observable_1$2;
	var ignoreElements_1 = ignoreElements_1$1;
	Observable_1$94.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;

	var __extends$76 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$29 = Subscriber_1$3;
	/**
	 * If the source Observable is empty it returns an Observable that emits true, otherwise it emits false.
	 *
	 * <img src="./img/isEmpty.png" width="100%">
	 *
	 * @return {Observable} An Observable that emits a Boolean.
	 * @method isEmpty
	 * @owner Observable
	 */
	function isEmpty$2() {
	    return this.lift(new IsEmptyOperator());
	}
	var isEmpty_2 = isEmpty$2;
	var IsEmptyOperator = (function () {
	    function IsEmptyOperator() {
	    }
	    IsEmptyOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new IsEmptySubscriber(observer));
	    };
	    return IsEmptyOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var IsEmptySubscriber = (function (_super) {
	    __extends$76(IsEmptySubscriber, _super);
	    function IsEmptySubscriber(destination) {
	        _super.call(this, destination);
	    }
	    IsEmptySubscriber.prototype.notifyComplete = function (isEmpty) {
	        var destination = this.destination;
	        destination.next(isEmpty);
	        destination.complete();
	    };
	    IsEmptySubscriber.prototype._next = function (value) {
	        this.notifyComplete(false);
	    };
	    IsEmptySubscriber.prototype._complete = function () {
	        this.notifyComplete(true);
	    };
	    return IsEmptySubscriber;
	}(Subscriber_1$29.Subscriber));


	var isEmpty_1$1 = {
		isEmpty: isEmpty_2
	};

	var Observable_1$95 = Observable_1$2;
	var isEmpty_1 = isEmpty_1$1;
	Observable_1$95.Observable.prototype.isEmpty = isEmpty_1.isEmpty;

	var __extends$77 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1$11 = tryCatch_1$1;
	var errorObject_1$11 = errorObject;
	var OuterSubscriber_1$23 = OuterSubscriber_1$1;
	var subscribeToResult_1$23 = subscribeToResult_1$1;
	/**
	 * Ignores source values for a duration determined by another Observable, then
	 * emits the most recent value from the source Observable, then repeats this
	 * process.
	 *
	 * <span class="informal">It's like {@link auditTime}, but the silencing
	 * duration is determined by a second Observable.</span>
	 *
	 * <img src="./img/audit.png" width="100%">
	 *
	 * `audit` is similar to `throttle`, but emits the last value from the silenced
	 * time window, instead of the first value. `audit` emits the most recent value
	 * from the source Observable on the output Observable as soon as its internal
	 * timer becomes disabled, and ignores source values while the timer is enabled.
	 * Initially, the timer is disabled. As soon as the first source value arrives,
	 * the timer is enabled by calling the `durationSelector` function with the
	 * source value, which returns the "duration" Observable. When the duration
	 * Observable emits a value or completes, the timer is disabled, then the most
	 * recent source value is emitted on the output Observable, and this process
	 * repeats for the next source value.
	 *
	 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.audit(ev => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link auditTime}
	 * @see {@link debounce}
	 * @see {@link delayWhen}
	 * @see {@link sample}
	 * @see {@link throttle}
	 *
	 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
	 * that receives a value from the source Observable, for computing the silencing
	 * duration, returned as an Observable or a Promise.
	 * @return {Observable<T>} An Observable that performs rate-limiting of
	 * emissions from the source Observable.
	 * @method audit
	 * @owner Observable
	 */
	function audit$2(durationSelector) {
	    return this.lift(new AuditOperator(durationSelector));
	}
	var audit_2 = audit$2;
	var AuditOperator = (function () {
	    function AuditOperator(durationSelector) {
	        this.durationSelector = durationSelector;
	    }
	    AuditOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new AuditSubscriber(subscriber, this.durationSelector));
	    };
	    return AuditOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AuditSubscriber = (function (_super) {
	    __extends$77(AuditSubscriber, _super);
	    function AuditSubscriber(destination, durationSelector) {
	        _super.call(this, destination);
	        this.durationSelector = durationSelector;
	        this.hasValue = false;
	    }
	    AuditSubscriber.prototype._next = function (value) {
	        this.value = value;
	        this.hasValue = true;
	        if (!this.throttled) {
	            var duration = tryCatch_1$11.tryCatch(this.durationSelector)(value);
	            if (duration === errorObject_1$11.errorObject) {
	                this.destination.error(errorObject_1$11.errorObject.e);
	            }
	            else {
	                var innerSubscription = subscribeToResult_1$23.subscribeToResult(this, duration);
	                if (innerSubscription.closed) {
	                    this.clearThrottle();
	                }
	                else {
	                    this.add(this.throttled = innerSubscription);
	                }
	            }
	        }
	    };
	    AuditSubscriber.prototype.clearThrottle = function () {
	        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
	        if (throttled) {
	            this.remove(throttled);
	            this.throttled = null;
	            throttled.unsubscribe();
	        }
	        if (hasValue) {
	            this.value = null;
	            this.hasValue = false;
	            this.destination.next(value);
	        }
	    };
	    AuditSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        this.clearThrottle();
	    };
	    AuditSubscriber.prototype.notifyComplete = function () {
	        this.clearThrottle();
	    };
	    return AuditSubscriber;
	}(OuterSubscriber_1$23.OuterSubscriber));


	var audit_1$1 = {
		audit: audit_2
	};

	var Observable_1$96 = Observable_1$2;
	var audit_1 = audit_1$1;
	Observable_1$96.Observable.prototype.audit = audit_1.audit;

	var __extends$78 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1$7 = async;
	var Subscriber_1$30 = Subscriber_1$3;
	/**
	 * Ignores source values for `duration` milliseconds, then emits the most recent
	 * value from the source Observable, then repeats this process.
	 *
	 * <span class="informal">When it sees a source values, it ignores that plus
	 * the next ones for `duration` milliseconds, and then it emits the most recent
	 * value from the source.</span>
	 *
	 * <img src="./img/auditTime.png" width="100%">
	 *
	 * `auditTime` is similar to `throttleTime`, but emits the last value from the
	 * silenced time window, instead of the first value. `auditTime` emits the most
	 * recent value from the source Observable on the output Observable as soon as
	 * its internal timer becomes disabled, and ignores source values while the
	 * timer is enabled. Initially, the timer is disabled. As soon as the first
	 * source value arrives, the timer is enabled. After `duration` milliseconds (or
	 * the time unit determined internally by the optional `scheduler`) has passed,
	 * the timer is disabled, then the most recent source value is emitted on the
	 * output Observable, and this process repeats for the next source value.
	 * Optionally takes a {@link IScheduler} for managing timers.
	 *
	 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.auditTime(1000);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link audit}
	 * @see {@link debounceTime}
	 * @see {@link delay}
	 * @see {@link sampleTime}
	 * @see {@link throttleTime}
	 *
	 * @param {number} duration Time to wait before emitting the most recent source
	 * value, measured in milliseconds or the time unit determined internally
	 * by the optional `scheduler`.
	 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
	 * managing the timers that handle the rate-limiting behavior.
	 * @return {Observable<T>} An Observable that performs rate-limiting of
	 * emissions from the source Observable.
	 * @method auditTime
	 * @owner Observable
	 */
	function auditTime$2(duration, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$7.async; }
	    return this.lift(new AuditTimeOperator(duration, scheduler));
	}
	var auditTime_2 = auditTime$2;
	var AuditTimeOperator = (function () {
	    function AuditTimeOperator(duration, scheduler) {
	        this.duration = duration;
	        this.scheduler = scheduler;
	    }
	    AuditTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new AuditTimeSubscriber(subscriber, this.duration, this.scheduler));
	    };
	    return AuditTimeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AuditTimeSubscriber = (function (_super) {
	    __extends$78(AuditTimeSubscriber, _super);
	    function AuditTimeSubscriber(destination, duration, scheduler) {
	        _super.call(this, destination);
	        this.duration = duration;
	        this.scheduler = scheduler;
	        this.hasValue = false;
	    }
	    AuditTimeSubscriber.prototype._next = function (value) {
	        this.value = value;
	        this.hasValue = true;
	        if (!this.throttled) {
	            this.add(this.throttled = this.scheduler.schedule(dispatchNext$4, this.duration, this));
	        }
	    };
	    AuditTimeSubscriber.prototype.clearThrottle = function () {
	        var _a = this, value = _a.value, hasValue = _a.hasValue, throttled = _a.throttled;
	        if (throttled) {
	            this.remove(throttled);
	            this.throttled = null;
	            throttled.unsubscribe();
	        }
	        if (hasValue) {
	            this.value = null;
	            this.hasValue = false;
	            this.destination.next(value);
	        }
	    };
	    return AuditTimeSubscriber;
	}(Subscriber_1$30.Subscriber));
	function dispatchNext$4(subscriber) {
	    subscriber.clearThrottle();
	}


	var auditTime_1$1 = {
		auditTime: auditTime_2
	};

	var Observable_1$97 = Observable_1$2;
	var auditTime_1 = auditTime_1$1;
	Observable_1$97.Observable.prototype.auditTime = auditTime_1.auditTime;

	var __extends$79 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$31 = Subscriber_1$3;
	var EmptyError_1$4 = EmptyError_1$2;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that emits only the last item emitted by the source Observable.
	 * It optionally takes a predicate function as a parameter, in which case, rather than emitting
	 * the last item from the source Observable, the resulting Observable will emit the last item
	 * from the source Observable that satisfies the predicate.
	 *
	 * <img src="./img/last.png" width="100%">
	 *
	 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
	 * callback if the Observable completes before any `next` notification was sent.
	 * @param {function} predicate - The condition any source emitted item has to satisfy.
	 * @return {Observable} An Observable that emits only the last item satisfying the given condition
	 * from the source, or an NoSuchElementException if no such items are emitted.
	 * @throws - Throws if no items that match the predicate are emitted by the source Observable.
	 * @method last
	 * @owner Observable
	 */
	function last$2(predicate, resultSelector, defaultValue) {
	    return this.lift(new LastOperator(predicate, resultSelector, defaultValue, this));
	}
	var last_2 = last$2;
	var LastOperator = (function () {
	    function LastOperator(predicate, resultSelector, defaultValue, source) {
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	    }
	    LastOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new LastSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
	    };
	    return LastOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var LastSubscriber = (function (_super) {
	    __extends$79(LastSubscriber, _super);
	    function LastSubscriber(destination, predicate, resultSelector, defaultValue, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.resultSelector = resultSelector;
	        this.defaultValue = defaultValue;
	        this.source = source;
	        this.hasValue = false;
	        this.index = 0;
	        if (typeof defaultValue !== 'undefined') {
	            this.lastValue = defaultValue;
	            this.hasValue = true;
	        }
	    }
	    LastSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this._tryPredicate(value, index);
	        }
	        else {
	            if (this.resultSelector) {
	                this._tryResultSelector(value, index);
	                return;
	            }
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    };
	    LastSubscriber.prototype._tryPredicate = function (value, index) {
	        var result;
	        try {
	            result = this.predicate(value, index, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (result) {
	            if (this.resultSelector) {
	                this._tryResultSelector(value, index);
	                return;
	            }
	            this.lastValue = value;
	            this.hasValue = true;
	        }
	    };
	    LastSubscriber.prototype._tryResultSelector = function (value, index) {
	        var result;
	        try {
	            result = this.resultSelector(value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.lastValue = result;
	        this.hasValue = true;
	    };
	    LastSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.hasValue) {
	            destination.next(this.lastValue);
	            destination.complete();
	        }
	        else {
	            destination.error(new EmptyError_1$4.EmptyError);
	        }
	    };
	    return LastSubscriber;
	}(Subscriber_1$31.Subscriber));


	var last_1$1 = {
		last: last_2
	};

	var Observable_1$98 = Observable_1$2;
	var last_1 = last_1$1;
	Observable_1$98.Observable.prototype.last = last_1.last;

	/**
	 * @param func
	 * @return {Observable<R>}
	 * @method let
	 * @owner Observable
	 */
	function letProto(func) {
	    return func(this);
	}
	var letProto_1 = letProto;


	var _let$2 = {
		letProto: letProto_1
	};

	var Observable_1$99 = Observable_1$2;
	var let_1 = _let$2;
	Observable_1$99.Observable.prototype.let = let_1.letProto;
	Observable_1$99.Observable.prototype.letBind = let_1.letProto;

	var __extends$80 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$32 = Subscriber_1$3;
	/**
	 * Returns an Observable that emits whether or not every item of the source satisfies the condition specified.
	 *
	 * @example <caption>A simple example emitting true if all elements are less than 5, false otherwise</caption>
	 *  Observable.of(1, 2, 3, 4, 5, 6)
	 *     .every(x => x < 5)
	 *     .subscribe(x => console.log(x)); // -> false
	 *
	 * @param {function} predicate A function for determining if an item meets a specified condition.
	 * @param {any} [thisArg] Optional object to use for `this` in the callback.
	 * @return {Observable} An Observable of booleans that determines if all items of the source Observable meet the condition specified.
	 * @method every
	 * @owner Observable
	 */
	function every$2(predicate, thisArg) {
	    return this.lift(new EveryOperator(predicate, thisArg, this));
	}
	var every_2 = every$2;
	var EveryOperator = (function () {
	    function EveryOperator(predicate, thisArg, source) {
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	    }
	    EveryOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new EverySubscriber(observer, this.predicate, this.thisArg, this.source));
	    };
	    return EveryOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var EverySubscriber = (function (_super) {
	    __extends$80(EverySubscriber, _super);
	    function EverySubscriber(destination, predicate, thisArg, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.thisArg = thisArg;
	        this.source = source;
	        this.index = 0;
	        this.thisArg = thisArg || this;
	    }
	    EverySubscriber.prototype.notifyComplete = function (everyValueMatch) {
	        this.destination.next(everyValueMatch);
	        this.destination.complete();
	    };
	    EverySubscriber.prototype._next = function (value) {
	        var result = false;
	        try {
	            result = this.predicate.call(this.thisArg, value, this.index++, this.source);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        if (!result) {
	            this.notifyComplete(false);
	        }
	    };
	    EverySubscriber.prototype._complete = function () {
	        this.notifyComplete(true);
	    };
	    return EverySubscriber;
	}(Subscriber_1$32.Subscriber));


	var every_1$1 = {
		every: every_2
	};

	var Observable_1$100 = Observable_1$2;
	var every_1 = every_1$1;
	Observable_1$100.Observable.prototype.every = every_1.every;

	var Observable_1$101 = Observable_1$2;
	var map_1$3 = map_1$1;
	Observable_1$101.Observable.prototype.map = map_1$3.map;

	var __extends$81 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$33 = Subscriber_1$3;
	/**
	 * Emits the given constant value on the output Observable every time the source
	 * Observable emits a value.
	 *
	 * <span class="informal">Like {@link map}, but it maps every source value to
	 * the same output value every time.</span>
	 *
	 * <img src="./img/mapTo.png" width="100%">
	 *
	 * Takes a constant `value` as argument, and emits that whenever the source
	 * Observable emits a value. In other words, ignores the actual source value,
	 * and simply uses the emission moment to know when to emit the given `value`.
	 *
	 * @example <caption>Map every click to the string 'Hi'</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var greetings = clicks.mapTo('Hi');
	 * greetings.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 *
	 * @param {any} value The value to map each source value to.
	 * @return {Observable} An Observable that emits the given `value` every time
	 * the source Observable emits something.
	 * @method mapTo
	 * @owner Observable
	 */
	function mapTo$2(value) {
	    return this.lift(new MapToOperator(value));
	}
	var mapTo_2 = mapTo$2;
	var MapToOperator = (function () {
	    function MapToOperator(value) {
	        this.value = value;
	    }
	    MapToOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new MapToSubscriber(subscriber, this.value));
	    };
	    return MapToOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MapToSubscriber = (function (_super) {
	    __extends$81(MapToSubscriber, _super);
	    function MapToSubscriber(destination, value) {
	        _super.call(this, destination);
	        this.value = value;
	    }
	    MapToSubscriber.prototype._next = function (x) {
	        this.destination.next(this.value);
	    };
	    return MapToSubscriber;
	}(Subscriber_1$33.Subscriber));


	var mapTo_1$1 = {
		mapTo: mapTo_2
	};

	var Observable_1$102 = Observable_1$2;
	var mapTo_1 = mapTo_1$1;
	Observable_1$102.Observable.prototype.mapTo = mapTo_1.mapTo;

	var __extends$82 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$34 = Subscriber_1$3;
	var Notification_1$5 = Notification_1$2;
	/**
	 * Represents all of the notifications from the source Observable as `next`
	 * emissions marked with their original types within {@link Notification}
	 * objects.
	 *
	 * <span class="informal">Wraps `next`, `error` and `complete` emissions in
	 * {@link Notification} objects, emitted as `next` on the output Observable.
	 * </span>
	 *
	 * <img src="./img/materialize.png" width="100%">
	 *
	 * `materialize` returns an Observable that emits a `next` notification for each
	 * `next`, `error`, or `complete` emission of the source Observable. When the
	 * source Observable emits `complete`, the output Observable will emit `next` as
	 * a Notification of type "complete", and then it will emit `complete` as well.
	 * When the source Observable emits `error`, the output will emit `next` as a
	 * Notification of type "error", and then `complete`.
	 *
	 * This operator is useful for producing metadata of the source Observable, to
	 * be consumed as `next` emissions. Use it in conjunction with
	 * {@link dematerialize}.
	 *
	 * @example <caption>Convert a faulty Observable to an Observable of Notifications</caption>
	 * var letters = Rx.Observable.of('a', 'b', 13, 'd');
	 * var upperCase = letters.map(x => x.toUpperCase());
	 * var materialized = upperCase.materialize();
	 * materialized.subscribe(x => console.log(x));
	 *
	 * // Results in the following:
	 * // - Notification {kind: "N", value: "A", error: undefined, hasValue: true}
	 * // - Notification {kind: "N", value: "B", error: undefined, hasValue: true}
	 * // - Notification {kind: "E", value: undefined, error: TypeError:
	 * //   x.toUpperCase is not a function at MapSubscriber.letters.map.x
	 * //   [as project] (http://1…, hasValue: false}
	 *
	 * @see {@link Notification}
	 * @see {@link dematerialize}
	 *
	 * @return {Observable<Notification<T>>} An Observable that emits
	 * {@link Notification} objects that wrap the original emissions from the source
	 * Observable with metadata.
	 * @method materialize
	 * @owner Observable
	 */
	function materialize$2() {
	    return this.lift(new MaterializeOperator());
	}
	var materialize_2 = materialize$2;
	var MaterializeOperator = (function () {
	    function MaterializeOperator() {
	    }
	    MaterializeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new MaterializeSubscriber(subscriber));
	    };
	    return MaterializeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MaterializeSubscriber = (function (_super) {
	    __extends$82(MaterializeSubscriber, _super);
	    function MaterializeSubscriber(destination) {
	        _super.call(this, destination);
	    }
	    MaterializeSubscriber.prototype._next = function (value) {
	        this.destination.next(Notification_1$5.Notification.createNext(value));
	    };
	    MaterializeSubscriber.prototype._error = function (err) {
	        var destination = this.destination;
	        destination.next(Notification_1$5.Notification.createError(err));
	        destination.complete();
	    };
	    MaterializeSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        destination.next(Notification_1$5.Notification.createComplete());
	        destination.complete();
	    };
	    return MaterializeSubscriber;
	}(Subscriber_1$34.Subscriber));


	var materialize_1$1 = {
		materialize: materialize_2
	};

	var Observable_1$103 = Observable_1$2;
	var materialize_1 = materialize_1$1;
	Observable_1$103.Observable.prototype.materialize = materialize_1.materialize;

	var __extends$83 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$35 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Applies an accumulator function over the source Observable, and returns the
	 * accumulated result when the source completes, given an optional seed value.
	 *
	 * <span class="informal">Combines together all values emitted on the source,
	 * using an accumulator function that knows how to join a new source value into
	 * the accumulation from the past.</span>
	 *
	 * <img src="./img/reduce.png" width="100%">
	 *
	 * Like
	 * [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce),
	 * `reduce` applies an `accumulator` function against an accumulation and each
	 * value of the source Observable (from the past) to reduce it to a single
	 * value, emitted on the output Observable. Note that `reduce` will only emit
	 * one value, only when the source Observable completes. It is equivalent to
	 * applying operator {@link scan} followed by operator {@link last}.
	 *
	 * Returns an Observable that applies a specified `accumulator` function to each
	 * item emitted by the source Observable. If a `seed` value is specified, then
	 * that value will be used as the initial value for the accumulator. If no seed
	 * value is specified, the first item of the source is used as the seed.
	 *
	 * @example <caption>Count the number of click events that happened in 5 seconds</caption>
	 * var clicksInFiveSeconds = Rx.Observable.fromEvent(document, 'click')
	 *   .takeUntil(Rx.Observable.interval(5000));
	 * var ones = clicksInFiveSeconds.mapTo(1);
	 * var seed = 0;
	 * var count = ones.reduce((acc, one) => acc + one, seed);
	 * count.subscribe(x => console.log(x));
	 *
	 * @see {@link count}
	 * @see {@link expand}
	 * @see {@link mergeScan}
	 * @see {@link scan}
	 *
	 * @param {function(acc: R, value: T, index: number): R} accumulator The accumulator function
	 * called on each source value.
	 * @param {R} [seed] The initial accumulation value.
	 * @return {Observable<R>} An Observable that emits a single value that is the
	 * result of accumulating the values emitted by the source Observable.
	 * @method reduce
	 * @owner Observable
	 */
	function reduce(accumulator, seed) {
	    var hasSeed = false;
	    // providing a seed of `undefined` *should* be valid and trigger
	    // hasSeed! so don't use `seed !== undefined` checks!
	    // For this reason, we have to check it here at the original call site
	    // otherwise inside Operator/Subscriber we won't know if `undefined`
	    // means they didn't provide anything or if they literally provided `undefined`
	    if (arguments.length >= 2) {
	        hasSeed = true;
	    }
	    return this.lift(new ReduceOperator(accumulator, seed, hasSeed));
	}
	var reduce_2 = reduce;
	var ReduceOperator = (function () {
	    function ReduceOperator(accumulator, seed, hasSeed) {
	        if (hasSeed === void 0) { hasSeed = false; }
	        this.accumulator = accumulator;
	        this.seed = seed;
	        this.hasSeed = hasSeed;
	    }
	    ReduceOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ReduceSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
	    };
	    return ReduceOperator;
	}());
	var ReduceOperator_1 = ReduceOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ReduceSubscriber = (function (_super) {
	    __extends$83(ReduceSubscriber, _super);
	    function ReduceSubscriber(destination, accumulator, seed, hasSeed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.hasSeed = hasSeed;
	        this.index = 0;
	        this.hasValue = false;
	        this.acc = seed;
	        if (!this.hasSeed) {
	            this.index++;
	        }
	    }
	    ReduceSubscriber.prototype._next = function (value) {
	        if (this.hasValue || (this.hasValue = this.hasSeed)) {
	            this._tryReduce(value);
	        }
	        else {
	            this.acc = value;
	            this.hasValue = true;
	        }
	    };
	    ReduceSubscriber.prototype._tryReduce = function (value) {
	        var result;
	        try {
	            result = this.accumulator(this.acc, value, this.index++);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.acc = result;
	    };
	    ReduceSubscriber.prototype._complete = function () {
	        if (this.hasValue || this.hasSeed) {
	            this.destination.next(this.acc);
	        }
	        this.destination.complete();
	    };
	    return ReduceSubscriber;
	}(Subscriber_1$35.Subscriber));
	var ReduceSubscriber_1 = ReduceSubscriber;


	var reduce_1$1 = {
		reduce: reduce_2,
		ReduceOperator: ReduceOperator_1,
		ReduceSubscriber: ReduceSubscriber_1
	};

	var reduce_1 = reduce_1$1;
	/**
	 * The Max operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
	 * and when source Observable completes it emits a single item: the item with the largest value.
	 *
	 * <img src="./img/max.png" width="100%">
	 *
	 * @example <caption>Get the maximal value of a series of numbers</caption>
	 * Rx.Observable.of(5, 4, 7, 2, 8)
	 *   .max()
	 *   .subscribe(x => console.log(x)); // -> 8
	 *
	 * @example <caption>Use a comparer function to get the maximal item</caption>
	 * interface Person {
	 *   age: number,
	 *   name: string
	 * }
	 * Observable.of<Person>({age: 7, name: 'Foo'},
	 *                       {age: 5, name: 'Bar'},
	 *                       {age: 9, name: 'Beer'})
	 *           .max<Person>((a: Person, b: Person) => a.age < b.age ? -1 : 1)
	 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Beer'
	 * }
	 *
	 * @see {@link min}
	 *
	 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
	 * value of two items.
	 * @return {Observable} An Observable that emits item with the largest value.
	 * @method max
	 * @owner Observable
	 */
	function max$2(comparer) {
	    var max = (typeof comparer === 'function')
	        ? function (x, y) { return comparer(x, y) > 0 ? x : y; }
	        : function (x, y) { return x > y ? x : y; };
	    return this.lift(new reduce_1.ReduceOperator(max));
	}
	var max_2 = max$2;


	var max_1$1 = {
		max: max_2
	};

	var Observable_1$104 = Observable_1$2;
	var max_1 = max_1$1;
	Observable_1$104.Observable.prototype.max = max_1.max;

	var Observable_1$105 = Observable_1$2;
	var merge_1$4 = merge_1$2;
	Observable_1$105.Observable.prototype.merge = merge_1$4.merge;

	var Observable_1$106 = Observable_1$2;
	var mergeAll_1$5 = mergeAll_1$1;
	Observable_1$106.Observable.prototype.mergeAll = mergeAll_1$5.mergeAll;

	var Observable_1$107 = Observable_1$2;
	var mergeMap_1$3 = mergeMap_1$1;
	Observable_1$107.Observable.prototype.mergeMap = mergeMap_1$3.mergeMap;
	Observable_1$107.Observable.prototype.flatMap = mergeMap_1$3.mergeMap;

	var Observable_1$108 = Observable_1$2;
	var mergeMapTo_1$3 = mergeMapTo_1$1;
	Observable_1$108.Observable.prototype.flatMapTo = mergeMapTo_1$3.mergeMapTo;
	Observable_1$108.Observable.prototype.mergeMapTo = mergeMapTo_1$3.mergeMapTo;

	var __extends$84 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var tryCatch_1$12 = tryCatch_1$1;
	var errorObject_1$12 = errorObject;
	var subscribeToResult_1$24 = subscribeToResult_1$1;
	var OuterSubscriber_1$24 = OuterSubscriber_1$1;
	/**
	 * Applies an accumulator function over the source Observable where the
	 * accumulator function itself returns an Observable, then each intermediate
	 * Observable returned is merged into the output Observable.
	 *
	 * <span class="informal">It's like {@link scan}, but the Observables returned
	 * by the accumulator are merged into the outer Observable.</span>
	 *
	 * @example <caption>Count the number of click events</caption>
	 * const click$ = Rx.Observable.fromEvent(document, 'click');
	 * const one$ = click$.mapTo(1);
	 * const seed = 0;
	 * const count$ = one$.mergeScan((acc, one) => Rx.Observable.of(acc + one), seed);
	 * count$.subscribe(x => console.log(x));
	 *
	 * // Results:
	 * 1
	 * 2
	 * 3
	 * 4
	 * // ...and so on for each click
	 *
	 * @param {function(acc: R, value: T): Observable<R>} accumulator
	 * The accumulator function called on each source value.
	 * @param seed The initial accumulation value.
	 * @param {number} [concurrent=Number.POSITIVE_INFINITY] Maximum number of
	 * input Observables being subscribed to concurrently.
	 * @return {Observable<R>} An observable of the accumulated values.
	 * @method mergeScan
	 * @owner Observable
	 */
	function mergeScan$2(accumulator, seed, concurrent) {
	    if (concurrent === void 0) { concurrent = Number.POSITIVE_INFINITY; }
	    return this.lift(new MergeScanOperator(accumulator, seed, concurrent));
	}
	var mergeScan_2 = mergeScan$2;
	var MergeScanOperator = (function () {
	    function MergeScanOperator(accumulator, seed, concurrent) {
	        this.accumulator = accumulator;
	        this.seed = seed;
	        this.concurrent = concurrent;
	    }
	    MergeScanOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new MergeScanSubscriber(subscriber, this.accumulator, this.seed, this.concurrent));
	    };
	    return MergeScanOperator;
	}());
	var MergeScanOperator_1 = MergeScanOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var MergeScanSubscriber = (function (_super) {
	    __extends$84(MergeScanSubscriber, _super);
	    function MergeScanSubscriber(destination, accumulator, acc, concurrent) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this.acc = acc;
	        this.concurrent = concurrent;
	        this.hasValue = false;
	        this.hasCompleted = false;
	        this.buffer = [];
	        this.active = 0;
	        this.index = 0;
	    }
	    MergeScanSubscriber.prototype._next = function (value) {
	        if (this.active < this.concurrent) {
	            var index = this.index++;
	            var ish = tryCatch_1$12.tryCatch(this.accumulator)(this.acc, value);
	            var destination = this.destination;
	            if (ish === errorObject_1$12.errorObject) {
	                destination.error(errorObject_1$12.errorObject.e);
	            }
	            else {
	                this.active++;
	                this._innerSub(ish, value, index);
	            }
	        }
	        else {
	            this.buffer.push(value);
	        }
	    };
	    MergeScanSubscriber.prototype._innerSub = function (ish, value, index) {
	        this.add(subscribeToResult_1$24.subscribeToResult(this, ish, value, index));
	    };
	    MergeScanSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0 && this.buffer.length === 0) {
	            if (this.hasValue === false) {
	                this.destination.next(this.acc);
	            }
	            this.destination.complete();
	        }
	    };
	    MergeScanSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var destination = this.destination;
	        this.acc = innerValue;
	        this.hasValue = true;
	        destination.next(innerValue);
	    };
	    MergeScanSubscriber.prototype.notifyComplete = function (innerSub) {
	        var buffer = this.buffer;
	        this.remove(innerSub);
	        this.active--;
	        if (buffer.length > 0) {
	            this._next(buffer.shift());
	        }
	        else if (this.active === 0 && this.hasCompleted) {
	            if (this.hasValue === false) {
	                this.destination.next(this.acc);
	            }
	            this.destination.complete();
	        }
	    };
	    return MergeScanSubscriber;
	}(OuterSubscriber_1$24.OuterSubscriber));
	var MergeScanSubscriber_1 = MergeScanSubscriber;


	var mergeScan_1$1 = {
		mergeScan: mergeScan_2,
		MergeScanOperator: MergeScanOperator_1,
		MergeScanSubscriber: MergeScanSubscriber_1
	};

	var Observable_1$109 = Observable_1$2;
	var mergeScan_1 = mergeScan_1$1;
	Observable_1$109.Observable.prototype.mergeScan = mergeScan_1.mergeScan;

	var reduce_1$3 = reduce_1$1;
	/**
	 * The Min operator operates on an Observable that emits numbers (or items that can be compared with a provided function),
	 * and when source Observable completes it emits a single item: the item with the smallest value.
	 *
	 * <img src="./img/min.png" width="100%">
	 *
	 * @example <caption>Get the minimal value of a series of numbers</caption>
	 * Rx.Observable.of(5, 4, 7, 2, 8)
	 *   .min()
	 *   .subscribe(x => console.log(x)); // -> 2
	 *
	 * @example <caption>Use a comparer function to get the minimal item</caption>
	 * interface Person {
	 *   age: number,
	 *   name: string
	 * }
	 * Observable.of<Person>({age: 7, name: 'Foo'},
	 *                       {age: 5, name: 'Bar'},
	 *                       {age: 9, name: 'Beer'})
	 *           .min<Person>( (a: Person, b: Person) => a.age < b.age ? -1 : 1)
	 *           .subscribe((x: Person) => console.log(x.name)); // -> 'Bar'
	 * }
	 *
	 * @see {@link max}
	 *
	 * @param {Function} [comparer] - Optional comparer function that it will use instead of its default to compare the
	 * value of two items.
	 * @return {Observable<R>} An Observable that emits item with the smallest value.
	 * @method min
	 * @owner Observable
	 */
	function min$2(comparer) {
	    var min = (typeof comparer === 'function')
	        ? function (x, y) { return comparer(x, y) < 0 ? x : y; }
	        : function (x, y) { return x < y ? x : y; };
	    return this.lift(new reduce_1$3.ReduceOperator(min));
	}
	var min_2 = min$2;


	var min_1$1 = {
		min: min_2
	};

	var Observable_1$110 = Observable_1$2;
	var min_1 = min_1$1;
	Observable_1$110.Observable.prototype.min = min_1.min;

	var __extends$85 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$7 = Subject_1$1;
	var Observable_1$112 = Observable_1$2;
	var Subscriber_1$36 = Subscriber_1$3;
	var Subscription_1$16 = Subscription_1$3;
	/**
	 * @class ConnectableObservable<T>
	 */
	var ConnectableObservable$1 = (function (_super) {
	    __extends$85(ConnectableObservable, _super);
	    function ConnectableObservable(source, subjectFactory) {
	        _super.call(this);
	        this.source = source;
	        this.subjectFactory = subjectFactory;
	        this._refCount = 0;
	        this._isComplete = false;
	    }
	    ConnectableObservable.prototype._subscribe = function (subscriber) {
	        return this.getSubject().subscribe(subscriber);
	    };
	    ConnectableObservable.prototype.getSubject = function () {
	        var subject = this._subject;
	        if (!subject || subject.isStopped) {
	            this._subject = this.subjectFactory();
	        }
	        return this._subject;
	    };
	    ConnectableObservable.prototype.connect = function () {
	        var connection = this._connection;
	        if (!connection) {
	            this._isComplete = false;
	            connection = this._connection = new Subscription_1$16.Subscription();
	            connection.add(this.source
	                .subscribe(new ConnectableSubscriber(this.getSubject(), this)));
	            if (connection.closed) {
	                this._connection = null;
	                connection = Subscription_1$16.Subscription.EMPTY;
	            }
	            else {
	                this._connection = connection;
	            }
	        }
	        return connection;
	    };
	    ConnectableObservable.prototype.refCount = function () {
	        return this.lift(new RefCountOperator(this));
	    };
	    return ConnectableObservable;
	}(Observable_1$112.Observable));
	var ConnectableObservable_2 = ConnectableObservable$1;
	var connectableProto = ConnectableObservable$1.prototype;
	var connectableObservableDescriptor = {
	    operator: { value: null },
	    _refCount: { value: 0, writable: true },
	    _subject: { value: null, writable: true },
	    _connection: { value: null, writable: true },
	    _subscribe: { value: connectableProto._subscribe },
	    _isComplete: { value: connectableProto._isComplete, writable: true },
	    getSubject: { value: connectableProto.getSubject },
	    connect: { value: connectableProto.connect },
	    refCount: { value: connectableProto.refCount }
	};
	var ConnectableSubscriber = (function (_super) {
	    __extends$85(ConnectableSubscriber, _super);
	    function ConnectableSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    ConnectableSubscriber.prototype._error = function (err) {
	        this._unsubscribe();
	        _super.prototype._error.call(this, err);
	    };
	    ConnectableSubscriber.prototype._complete = function () {
	        this.connectable._isComplete = true;
	        this._unsubscribe();
	        _super.prototype._complete.call(this);
	    };
	    ConnectableSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (connectable) {
	            this.connectable = null;
	            var connection = connectable._connection;
	            connectable._refCount = 0;
	            connectable._subject = null;
	            connectable._connection = null;
	            if (connection) {
	                connection.unsubscribe();
	            }
	        }
	    };
	    return ConnectableSubscriber;
	}(Subject_1$7.SubjectSubscriber));
	var RefCountOperator = (function () {
	    function RefCountOperator(connectable) {
	        this.connectable = connectable;
	    }
	    RefCountOperator.prototype.call = function (subscriber, source) {
	        var connectable = this.connectable;
	        connectable._refCount++;
	        var refCounter = new RefCountSubscriber(subscriber, connectable);
	        var subscription = source.subscribe(refCounter);
	        if (!refCounter.closed) {
	            refCounter.connection = connectable.connect();
	        }
	        return subscription;
	    };
	    return RefCountOperator;
	}());
	var RefCountSubscriber = (function (_super) {
	    __extends$85(RefCountSubscriber, _super);
	    function RefCountSubscriber(destination, connectable) {
	        _super.call(this, destination);
	        this.connectable = connectable;
	    }
	    RefCountSubscriber.prototype._unsubscribe = function () {
	        var connectable = this.connectable;
	        if (!connectable) {
	            this.connection = null;
	            return;
	        }
	        this.connectable = null;
	        var refCount = connectable._refCount;
	        if (refCount <= 0) {
	            this.connection = null;
	            return;
	        }
	        connectable._refCount = refCount - 1;
	        if (refCount > 1) {
	            this.connection = null;
	            return;
	        }
	        ///
	        // Compare the local RefCountSubscriber's connection Subscription to the
	        // connection Subscription on the shared ConnectableObservable. In cases
	        // where the ConnectableObservable source synchronously emits values, and
	        // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
	        // execution continues to here before the RefCountOperator has a chance to
	        // supply the RefCountSubscriber with the shared connection Subscription.
	        // For example:
	        // ```
	        // Observable.range(0, 10)
	        //   .publish()
	        //   .refCount()
	        //   .take(5)
	        //   .subscribe();
	        // ```
	        // In order to account for this case, RefCountSubscriber should only dispose
	        // the ConnectableObservable's shared connection Subscription if the
	        // connection Subscription exists, *and* either:
	        //   a. RefCountSubscriber doesn't have a reference to the shared connection
	        //      Subscription yet, or,
	        //   b. RefCountSubscriber's connection Subscription reference is identical
	        //      to the shared connection Subscription
	        ///
	        var connection = this.connection;
	        var sharedConnection = connectable._connection;
	        this.connection = null;
	        if (sharedConnection && (!connection || sharedConnection === connection)) {
	            sharedConnection.unsubscribe();
	        }
	    };
	    return RefCountSubscriber;
	}(Subscriber_1$36.Subscriber));


	var ConnectableObservable_1$2 = {
		ConnectableObservable: ConnectableObservable_2,
		connectableObservableDescriptor: connectableObservableDescriptor
	};

	var ConnectableObservable_1$1 = ConnectableObservable_1$2;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that emits the results of invoking a specified selector on items
	 * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
	 *
	 * <img src="./img/multicast.png" width="100%">
	 *
	 * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
	 * which the source sequence's elements will be multicast to the selector function
	 * or Subject to push source elements into.
	 * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
	 * as many times as needed, without causing multiple subscriptions to the source stream.
	 * Subscribers to the given source will receive all notifications of the source from the
	 * time of the subscription forward.
	 * @return {Observable} An Observable that emits the results of invoking the selector
	 * on the items emitted by a `ConnectableObservable` that shares a single subscription to
	 * the underlying stream.
	 * @method multicast
	 * @owner Observable
	 */
	function multicast$2(subjectOrSubjectFactory, selector) {
	    var subjectFactory;
	    if (typeof subjectOrSubjectFactory === 'function') {
	        subjectFactory = subjectOrSubjectFactory;
	    }
	    else {
	        subjectFactory = function subjectFactory() {
	            return subjectOrSubjectFactory;
	        };
	    }
	    if (typeof selector === 'function') {
	        return this.lift(new MulticastOperator(subjectFactory, selector));
	    }
	    var connectable = Object.create(this, ConnectableObservable_1$1.connectableObservableDescriptor);
	    connectable.source = this;
	    connectable.subjectFactory = subjectFactory;
	    return connectable;
	}
	var multicast_2 = multicast$2;
	var MulticastOperator = (function () {
	    function MulticastOperator(subjectFactory, selector) {
	        this.subjectFactory = subjectFactory;
	        this.selector = selector;
	    }
	    MulticastOperator.prototype.call = function (subscriber, source) {
	        var selector = this.selector;
	        var subject = this.subjectFactory();
	        var subscription = selector(subject).subscribe(subscriber);
	        subscription.add(source.subscribe(subject));
	        return subscription;
	    };
	    return MulticastOperator;
	}());
	var MulticastOperator_1 = MulticastOperator;


	var multicast_1$1 = {
		multicast: multicast_2,
		MulticastOperator: MulticastOperator_1
	};

	var Observable_1$111 = Observable_1$2;
	var multicast_1 = multicast_1$1;
	Observable_1$111.Observable.prototype.multicast = multicast_1.multicast;

	var Observable_1$113 = Observable_1$2;
	var observeOn_1$4 = observeOn_1$1;
	Observable_1$113.Observable.prototype.observeOn = observeOn_1$4.observeOn;

	var Observable_1$114 = Observable_1$2;
	var onErrorResumeNext_1$3 = onErrorResumeNext_1$1;
	Observable_1$114.Observable.prototype.onErrorResumeNext = onErrorResumeNext_1$3.onErrorResumeNext;

	var __extends$86 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$37 = Subscriber_1$3;
	/**
	 * Groups pairs of consecutive emissions together and emits them as an array of
	 * two values.
	 *
	 * <span class="informal">Puts the current value and previous value together as
	 * an array, and emits that.</span>
	 *
	 * <img src="./img/pairwise.png" width="100%">
	 *
	 * The Nth emission from the source Observable will cause the output Observable
	 * to emit an array [(N-1)th, Nth] of the previous and the current value, as a
	 * pair. For this reason, `pairwise` emits on the second and subsequent
	 * emissions from the source Observable, but not on the first emission, because
	 * there is no previous value in that case.
	 *
	 * @example <caption>On every click (starting from the second), emit the relative distance to the previous click</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var pairs = clicks.pairwise();
	 * var distance = pairs.map(pair => {
	 *   var x0 = pair[0].clientX;
	 *   var y0 = pair[0].clientY;
	 *   var x1 = pair[1].clientX;
	 *   var y1 = pair[1].clientY;
	 *   return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
	 * });
	 * distance.subscribe(x => console.log(x));
	 *
	 * @see {@link buffer}
	 * @see {@link bufferCount}
	 *
	 * @return {Observable<Array<T>>} An Observable of pairs (as arrays) of
	 * consecutive values from the source Observable.
	 * @method pairwise
	 * @owner Observable
	 */
	function pairwise$2() {
	    return this.lift(new PairwiseOperator());
	}
	var pairwise_2 = pairwise$2;
	var PairwiseOperator = (function () {
	    function PairwiseOperator() {
	    }
	    PairwiseOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new PairwiseSubscriber(subscriber));
	    };
	    return PairwiseOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var PairwiseSubscriber = (function (_super) {
	    __extends$86(PairwiseSubscriber, _super);
	    function PairwiseSubscriber(destination) {
	        _super.call(this, destination);
	        this.hasPrev = false;
	    }
	    PairwiseSubscriber.prototype._next = function (value) {
	        if (this.hasPrev) {
	            this.destination.next([this.prev, value]);
	        }
	        else {
	            this.hasPrev = true;
	        }
	        this.prev = value;
	    };
	    return PairwiseSubscriber;
	}(Subscriber_1$37.Subscriber));


	var pairwise_1$1 = {
		pairwise: pairwise_2
	};

	var Observable_1$115 = Observable_1$2;
	var pairwise_1 = pairwise_1$1;
	Observable_1$115.Observable.prototype.pairwise = pairwise_1.pairwise;

	function not(pred, thisArg) {
	    function notPred() {
	        return !(notPred.pred.apply(notPred.thisArg, arguments));
	    }
	    notPred.pred = pred;
	    notPred.thisArg = thisArg;
	    return notPred;
	}
	var not_2 = not;


	var not_1$1 = {
		not: not_2
	};

	var not_1 = not_1$1;
	var filter_1$3 = filter_1$1;
	/**
	 * Splits the source Observable into two, one with values that satisfy a
	 * predicate, and another with values that don't satisfy the predicate.
	 *
	 * <span class="informal">It's like {@link filter}, but returns two Observables:
	 * one like the output of {@link filter}, and the other with values that did not
	 * pass the condition.</span>
	 *
	 * <img src="./img/partition.png" width="100%">
	 *
	 * `partition` outputs an array with two Observables that partition the values
	 * from the source Observable through the given `predicate` function. The first
	 * Observable in that array emits source values for which the predicate argument
	 * returns true. The second Observable emits source values for which the
	 * predicate returns false. The first behaves like {@link filter} and the second
	 * behaves like {@link filter} with the predicate negated.
	 *
	 * @example <caption>Partition click events into those on DIV elements and those elsewhere</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var parts = clicks.partition(ev => ev.target.tagName === 'DIV');
	 * var clicksOnDivs = parts[0];
	 * var clicksElsewhere = parts[1];
	 * clicksOnDivs.subscribe(x => console.log('DIV clicked: ', x));
	 * clicksElsewhere.subscribe(x => console.log('Other clicked: ', x));
	 *
	 * @see {@link filter}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates each value emitted by the source Observable. If it returns `true`,
	 * the value is emitted on the first Observable in the returned array, if
	 * `false` the value is emitted on the second Observable in the array. The
	 * `index` parameter is the number `i` for the i-th source emission that has
	 * happened since the subscription, starting from the number `0`.
	 * @param {any} [thisArg] An optional argument to determine the value of `this`
	 * in the `predicate` function.
	 * @return {[Observable<T>, Observable<T>]} An array with two Observables: one
	 * with values that passed the predicate, and another with values that did not
	 * pass the predicate.
	 * @method partition
	 * @owner Observable
	 */
	function partition$2(predicate, thisArg) {
	    return [
	        filter_1$3.filter.call(this, predicate, thisArg),
	        filter_1$3.filter.call(this, not_1.not(predicate, thisArg))
	    ];
	}
	var partition_2 = partition$2;


	var partition_1$1 = {
		partition: partition_2
	};

	var Observable_1$116 = Observable_1$2;
	var partition_1 = partition_1$1;
	Observable_1$116.Observable.prototype.partition = partition_1.partition;

	var map_1$4 = map_1$1;
	/**
	 * Maps each source value (an object) to its specified nested property.
	 *
	 * <span class="informal">Like {@link map}, but meant only for picking one of
	 * the nested properties of every emitted object.</span>
	 *
	 * <img src="./img/pluck.png" width="100%">
	 *
	 * Given a list of strings describing a path to an object property, retrieves
	 * the value of a specified nested property from all values in the source
	 * Observable. If a property can't be resolved, it will return `undefined` for
	 * that value.
	 *
	 * @example <caption>Map every click to the tagName of the clicked target element</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var tagNames = clicks.pluck('target', 'tagName');
	 * tagNames.subscribe(x => console.log(x));
	 *
	 * @see {@link map}
	 *
	 * @param {...string} properties The nested properties to pluck from each source
	 * value (an object).
	 * @return {Observable} A new Observable of property values from the source values.
	 * @method pluck
	 * @owner Observable
	 */
	function pluck$2() {
	    var properties = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        properties[_i - 0] = arguments[_i];
	    }
	    var length = properties.length;
	    if (length === 0) {
	        throw new Error('list of properties cannot be empty.');
	    }
	    return map_1$4.map.call(this, plucker(properties, length));
	}
	var pluck_2 = pluck$2;
	function plucker(props, length) {
	    var mapper = function (x) {
	        var currentProp = x;
	        for (var i = 0; i < length; i++) {
	            var p = currentProp[props[i]];
	            if (typeof p !== 'undefined') {
	                currentProp = p;
	            }
	            else {
	                return undefined;
	            }
	        }
	        return currentProp;
	    };
	    return mapper;
	}


	var pluck_1$1 = {
		pluck: pluck_2
	};

	var Observable_1$117 = Observable_1$2;
	var pluck_1 = pluck_1$1;
	Observable_1$117.Observable.prototype.pluck = pluck_1.pluck;

	var Subject_1$8 = Subject_1$1;
	var multicast_1$3 = multicast_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Returns a ConnectableObservable, which is a variety of Observable that waits until its connect method is called
	 * before it begins emitting items to those Observers that have subscribed to it.
	 *
	 * <img src="./img/publish.png" width="100%">
	 *
	 * @param {Function} [selector] - Optional selector function which can use the multicasted source sequence as many times
	 * as needed, without causing multiple subscriptions to the source sequence.
	 * Subscribers to the given source will receive all notifications of the source from the time of the subscription on.
	 * @return A ConnectableObservable that upon connection causes the source Observable to emit items to its Observers.
	 * @method publish
	 * @owner Observable
	 */
	function publish$2(selector) {
	    return selector ? multicast_1$3.multicast.call(this, function () { return new Subject_1$8.Subject(); }, selector) :
	        multicast_1$3.multicast.call(this, new Subject_1$8.Subject());
	}
	var publish_2 = publish$2;


	var publish_1$1 = {
		publish: publish_2
	};

	var Observable_1$118 = Observable_1$2;
	var publish_1 = publish_1$1;
	Observable_1$118.Observable.prototype.publish = publish_1.publish;

	var __extends$87 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$9 = Subject_1$1;
	var ObjectUnsubscribedError_1$5 = ObjectUnsubscribedError_1$2;
	/**
	 * @class BehaviorSubject<T>
	 */
	var BehaviorSubject$1 = (function (_super) {
	    __extends$87(BehaviorSubject, _super);
	    function BehaviorSubject(_value) {
	        _super.call(this);
	        this._value = _value;
	    }
	    Object.defineProperty(BehaviorSubject.prototype, "value", {
	        get: function () {
	            return this.getValue();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    BehaviorSubject.prototype._subscribe = function (subscriber) {
	        var subscription = _super.prototype._subscribe.call(this, subscriber);
	        if (subscription && !subscription.closed) {
	            subscriber.next(this._value);
	        }
	        return subscription;
	    };
	    BehaviorSubject.prototype.getValue = function () {
	        if (this.hasError) {
	            throw this.thrownError;
	        }
	        else if (this.closed) {
	            throw new ObjectUnsubscribedError_1$5.ObjectUnsubscribedError();
	        }
	        else {
	            return this._value;
	        }
	    };
	    BehaviorSubject.prototype.next = function (value) {
	        _super.prototype.next.call(this, this._value = value);
	    };
	    return BehaviorSubject;
	}(Subject_1$9.Subject));
	var BehaviorSubject_2 = BehaviorSubject$1;


	var BehaviorSubject_1$2 = {
		BehaviorSubject: BehaviorSubject_2
	};

	var BehaviorSubject_1$1 = BehaviorSubject_1$2;
	var multicast_1$4 = multicast_1$1;
	/**
	 * @param value
	 * @return {ConnectableObservable<T>}
	 * @method publishBehavior
	 * @owner Observable
	 */
	function publishBehavior$2(value) {
	    return multicast_1$4.multicast.call(this, new BehaviorSubject_1$1.BehaviorSubject(value));
	}
	var publishBehavior_2 = publishBehavior$2;


	var publishBehavior_1$1 = {
		publishBehavior: publishBehavior_2
	};

	var Observable_1$119 = Observable_1$2;
	var publishBehavior_1 = publishBehavior_1$1;
	Observable_1$119.Observable.prototype.publishBehavior = publishBehavior_1.publishBehavior;

	var ReplaySubject_1$4 = ReplaySubject_1$2;
	var multicast_1$5 = multicast_1$1;
	/**
	 * @param bufferSize
	 * @param windowTime
	 * @param scheduler
	 * @return {ConnectableObservable<T>}
	 * @method publishReplay
	 * @owner Observable
	 */
	function publishReplay$2(bufferSize, windowTime, scheduler) {
	    if (bufferSize === void 0) { bufferSize = Number.POSITIVE_INFINITY; }
	    if (windowTime === void 0) { windowTime = Number.POSITIVE_INFINITY; }
	    return multicast_1$5.multicast.call(this, new ReplaySubject_1$4.ReplaySubject(bufferSize, windowTime, scheduler));
	}
	var publishReplay_2 = publishReplay$2;


	var publishReplay_1$1 = {
		publishReplay: publishReplay_2
	};

	var Observable_1$120 = Observable_1$2;
	var publishReplay_1 = publishReplay_1$1;
	Observable_1$120.Observable.prototype.publishReplay = publishReplay_1.publishReplay;

	var AsyncSubject_1$5 = AsyncSubject_1$2;
	var multicast_1$6 = multicast_1$1;
	/**
	 * @return {ConnectableObservable<T>}
	 * @method publishLast
	 * @owner Observable
	 */
	function publishLast$2() {
	    return multicast_1$6.multicast.call(this, new AsyncSubject_1$5.AsyncSubject());
	}
	var publishLast_2 = publishLast$2;


	var publishLast_1$1 = {
		publishLast: publishLast_2
	};

	var Observable_1$121 = Observable_1$2;
	var publishLast_1 = publishLast_1$1;
	Observable_1$121.Observable.prototype.publishLast = publishLast_1.publishLast;

	var Observable_1$122 = Observable_1$2;
	var race_1$3 = race_1$1;
	Observable_1$122.Observable.prototype.race = race_1$3.race;

	var Observable_1$123 = Observable_1$2;
	var reduce_1$4 = reduce_1$1;
	Observable_1$123.Observable.prototype.reduce = reduce_1$4.reduce;

	var __extends$88 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$38 = Subscriber_1$3;
	var EmptyObservable_1$6 = EmptyObservable_1$1;
	/**
	 * Returns an Observable that repeats the stream of items emitted by the source Observable at most count times.
	 *
	 * <img src="./img/repeat.png" width="100%">
	 *
	 * @param {number} [count] The number of times the source Observable items are repeated, a count of 0 will yield
	 * an empty Observable.
	 * @return {Observable} An Observable that repeats the stream of items emitted by the source Observable at most
	 * count times.
	 * @method repeat
	 * @owner Observable
	 */
	function repeat$2(count) {
	    if (count === void 0) { count = -1; }
	    if (count === 0) {
	        return new EmptyObservable_1$6.EmptyObservable();
	    }
	    else if (count < 0) {
	        return this.lift(new RepeatOperator(-1, this));
	    }
	    else {
	        return this.lift(new RepeatOperator(count - 1, this));
	    }
	}
	var repeat_2 = repeat$2;
	var RepeatOperator = (function () {
	    function RepeatOperator(count, source) {
	        this.count = count;
	        this.source = source;
	    }
	    RepeatOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new RepeatSubscriber(subscriber, this.count, this.source));
	    };
	    return RepeatOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RepeatSubscriber = (function (_super) {
	    __extends$88(RepeatSubscriber, _super);
	    function RepeatSubscriber(destination, count, source) {
	        _super.call(this, destination);
	        this.count = count;
	        this.source = source;
	    }
	    RepeatSubscriber.prototype.complete = function () {
	        if (!this.isStopped) {
	            var _a = this, source = _a.source, count = _a.count;
	            if (count === 0) {
	                return _super.prototype.complete.call(this);
	            }
	            else if (count > -1) {
	                this.count = count - 1;
	            }
	            source.subscribe(this._unsubscribeAndRecycle());
	        }
	    };
	    return RepeatSubscriber;
	}(Subscriber_1$38.Subscriber));


	var repeat_1$1 = {
		repeat: repeat_2
	};

	var Observable_1$124 = Observable_1$2;
	var repeat_1 = repeat_1$1;
	Observable_1$124.Observable.prototype.repeat = repeat_1.repeat;

	var __extends$89 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$10 = Subject_1$1;
	var tryCatch_1$13 = tryCatch_1$1;
	var errorObject_1$13 = errorObject;
	var OuterSubscriber_1$25 = OuterSubscriber_1$1;
	var subscribeToResult_1$25 = subscribeToResult_1$1;
	/**
	 * Returns an Observable that mirrors the source Observable with the exception of a `complete`. If the source
	 * Observable calls `complete`, this method will emit to the Observable returned from `notifier`. If that Observable
	 * calls `complete` or `error`, then this method will call `complete` or `error` on the child subscription. Otherwise
	 * this method will resubscribe to the source Observable.
	 *
	 * <img src="./img/repeatWhen.png" width="100%">
	 *
	 * @param {function(notifications: Observable): Observable} notifier - Receives an Observable of notifications with
	 * which a user can `complete` or `error`, aborting the repetition.
	 * @return {Observable} The source Observable modified with repeat logic.
	 * @method repeatWhen
	 * @owner Observable
	 */
	function repeatWhen$2(notifier) {
	    return this.lift(new RepeatWhenOperator(notifier));
	}
	var repeatWhen_2 = repeatWhen$2;
	var RepeatWhenOperator = (function () {
	    function RepeatWhenOperator(notifier) {
	        this.notifier = notifier;
	    }
	    RepeatWhenOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new RepeatWhenSubscriber(subscriber, this.notifier, source));
	    };
	    return RepeatWhenOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RepeatWhenSubscriber = (function (_super) {
	    __extends$89(RepeatWhenSubscriber, _super);
	    function RepeatWhenSubscriber(destination, notifier, source) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.source = source;
	        this.sourceIsBeingSubscribedTo = true;
	    }
	    RepeatWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.sourceIsBeingSubscribedTo = true;
	        this.source.subscribe(this);
	    };
	    RepeatWhenSubscriber.prototype.notifyComplete = function (innerSub) {
	        if (this.sourceIsBeingSubscribedTo === false) {
	            return _super.prototype.complete.call(this);
	        }
	    };
	    RepeatWhenSubscriber.prototype.complete = function () {
	        this.sourceIsBeingSubscribedTo = false;
	        if (!this.isStopped) {
	            if (!this.retries) {
	                this.subscribeToRetries();
	            }
	            else if (this.retriesSubscription.closed) {
	                return _super.prototype.complete.call(this);
	            }
	            this._unsubscribeAndRecycle();
	            this.notifications.next();
	        }
	    };
	    RepeatWhenSubscriber.prototype._unsubscribe = function () {
	        var _a = this, notifications = _a.notifications, retriesSubscription = _a.retriesSubscription;
	        if (notifications) {
	            notifications.unsubscribe();
	            this.notifications = null;
	        }
	        if (retriesSubscription) {
	            retriesSubscription.unsubscribe();
	            this.retriesSubscription = null;
	        }
	        this.retries = null;
	    };
	    RepeatWhenSubscriber.prototype._unsubscribeAndRecycle = function () {
	        var _a = this, notifications = _a.notifications, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
	        this.notifications = null;
	        this.retries = null;
	        this.retriesSubscription = null;
	        _super.prototype._unsubscribeAndRecycle.call(this);
	        this.notifications = notifications;
	        this.retries = retries;
	        this.retriesSubscription = retriesSubscription;
	        return this;
	    };
	    RepeatWhenSubscriber.prototype.subscribeToRetries = function () {
	        this.notifications = new Subject_1$10.Subject();
	        var retries = tryCatch_1$13.tryCatch(this.notifier)(this.notifications);
	        if (retries === errorObject_1$13.errorObject) {
	            return _super.prototype.complete.call(this);
	        }
	        this.retries = retries;
	        this.retriesSubscription = subscribeToResult_1$25.subscribeToResult(this, retries);
	    };
	    return RepeatWhenSubscriber;
	}(OuterSubscriber_1$25.OuterSubscriber));


	var repeatWhen_1$1 = {
		repeatWhen: repeatWhen_2
	};

	var Observable_1$125 = Observable_1$2;
	var repeatWhen_1 = repeatWhen_1$1;
	Observable_1$125.Observable.prototype.repeatWhen = repeatWhen_1.repeatWhen;

	var __extends$90 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$39 = Subscriber_1$3;
	/**
	 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
	 * calls `error`, this method will resubscribe to the source Observable for a maximum of `count` resubscriptions (given
	 * as a number parameter) rather than propagating the `error` call.
	 *
	 * <img src="./img/retry.png" width="100%">
	 *
	 * Any and all items emitted by the source Observable will be emitted by the resulting Observable, even those emitted
	 * during failed subscriptions. For example, if an Observable fails at first but emits [1, 2] then succeeds the second
	 * time and emits: [1, 2, 3, 4, 5] then the complete stream of emissions and notifications
	 * would be: [1, 2, 1, 2, 3, 4, 5, `complete`].
	 * @param {number} count - Number of retry attempts before failing.
	 * @return {Observable} The source Observable modified with the retry logic.
	 * @method retry
	 * @owner Observable
	 */
	function retry$2(count) {
	    if (count === void 0) { count = -1; }
	    return this.lift(new RetryOperator(count, this));
	}
	var retry_2 = retry$2;
	var RetryOperator = (function () {
	    function RetryOperator(count, source) {
	        this.count = count;
	        this.source = source;
	    }
	    RetryOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new RetrySubscriber(subscriber, this.count, this.source));
	    };
	    return RetryOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RetrySubscriber = (function (_super) {
	    __extends$90(RetrySubscriber, _super);
	    function RetrySubscriber(destination, count, source) {
	        _super.call(this, destination);
	        this.count = count;
	        this.source = source;
	    }
	    RetrySubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var _a = this, source = _a.source, count = _a.count;
	            if (count === 0) {
	                return _super.prototype.error.call(this, err);
	            }
	            else if (count > -1) {
	                this.count = count - 1;
	            }
	            source.subscribe(this._unsubscribeAndRecycle());
	        }
	    };
	    return RetrySubscriber;
	}(Subscriber_1$39.Subscriber));


	var retry_1$1 = {
		retry: retry_2
	};

	var Observable_1$126 = Observable_1$2;
	var retry_1 = retry_1$1;
	Observable_1$126.Observable.prototype.retry = retry_1.retry;

	var __extends$91 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$11 = Subject_1$1;
	var tryCatch_1$14 = tryCatch_1$1;
	var errorObject_1$14 = errorObject;
	var OuterSubscriber_1$26 = OuterSubscriber_1$1;
	var subscribeToResult_1$26 = subscribeToResult_1$1;
	/**
	 * Returns an Observable that mirrors the source Observable with the exception of an `error`. If the source Observable
	 * calls `error`, this method will emit the Throwable that caused the error to the Observable returned from `notifier`.
	 * If that Observable calls `complete` or `error` then this method will call `complete` or `error` on the child
	 * subscription. Otherwise this method will resubscribe to the source Observable.
	 *
	 * <img src="./img/retryWhen.png" width="100%">
	 *
	 * @param {function(errors: Observable): Observable} notifier - Receives an Observable of notifications with which a
	 * user can `complete` or `error`, aborting the retry.
	 * @return {Observable} The source Observable modified with retry logic.
	 * @method retryWhen
	 * @owner Observable
	 */
	function retryWhen$2(notifier) {
	    return this.lift(new RetryWhenOperator(notifier, this));
	}
	var retryWhen_2 = retryWhen$2;
	var RetryWhenOperator = (function () {
	    function RetryWhenOperator(notifier, source) {
	        this.notifier = notifier;
	        this.source = source;
	    }
	    RetryWhenOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new RetryWhenSubscriber(subscriber, this.notifier, this.source));
	    };
	    return RetryWhenOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var RetryWhenSubscriber = (function (_super) {
	    __extends$91(RetryWhenSubscriber, _super);
	    function RetryWhenSubscriber(destination, notifier, source) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.source = source;
	    }
	    RetryWhenSubscriber.prototype.error = function (err) {
	        if (!this.isStopped) {
	            var errors = this.errors;
	            var retries = this.retries;
	            var retriesSubscription = this.retriesSubscription;
	            if (!retries) {
	                errors = new Subject_1$11.Subject();
	                retries = tryCatch_1$14.tryCatch(this.notifier)(errors);
	                if (retries === errorObject_1$14.errorObject) {
	                    return _super.prototype.error.call(this, errorObject_1$14.errorObject.e);
	                }
	                retriesSubscription = subscribeToResult_1$26.subscribeToResult(this, retries);
	            }
	            else {
	                this.errors = null;
	                this.retriesSubscription = null;
	            }
	            this._unsubscribeAndRecycle();
	            this.errors = errors;
	            this.retries = retries;
	            this.retriesSubscription = retriesSubscription;
	            errors.next(err);
	        }
	    };
	    RetryWhenSubscriber.prototype._unsubscribe = function () {
	        var _a = this, errors = _a.errors, retriesSubscription = _a.retriesSubscription;
	        if (errors) {
	            errors.unsubscribe();
	            this.errors = null;
	        }
	        if (retriesSubscription) {
	            retriesSubscription.unsubscribe();
	            this.retriesSubscription = null;
	        }
	        this.retries = null;
	    };
	    RetryWhenSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var _a = this, errors = _a.errors, retries = _a.retries, retriesSubscription = _a.retriesSubscription;
	        this.errors = null;
	        this.retries = null;
	        this.retriesSubscription = null;
	        this._unsubscribeAndRecycle();
	        this.errors = errors;
	        this.retries = retries;
	        this.retriesSubscription = retriesSubscription;
	        this.source.subscribe(this);
	    };
	    return RetryWhenSubscriber;
	}(OuterSubscriber_1$26.OuterSubscriber));


	var retryWhen_1$1 = {
		retryWhen: retryWhen_2
	};

	var Observable_1$127 = Observable_1$2;
	var retryWhen_1 = retryWhen_1$1;
	Observable_1$127.Observable.prototype.retryWhen = retryWhen_1.retryWhen;

	var __extends$92 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$27 = OuterSubscriber_1$1;
	var subscribeToResult_1$27 = subscribeToResult_1$1;
	/**
	 * Emits the most recently emitted value from the source Observable whenever
	 * another Observable, the `notifier`, emits.
	 *
	 * <span class="informal">It's like {@link sampleTime}, but samples whenever
	 * the `notifier` Observable emits something.</span>
	 *
	 * <img src="./img/sample.png" width="100%">
	 *
	 * Whenever the `notifier` Observable emits a value or completes, `sample`
	 * looks at the source Observable and emits whichever value it has most recently
	 * emitted since the previous sampling, unless the source has not emitted
	 * anything since the previous sampling. The `notifier` is subscribed to as soon
	 * as the output Observable is subscribed.
	 *
	 * @example <caption>On every click, sample the most recent "seconds" timer</caption>
	 * var seconds = Rx.Observable.interval(1000);
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = seconds.sample(clicks);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link audit}
	 * @see {@link debounce}
	 * @see {@link sampleTime}
	 * @see {@link throttle}
	 *
	 * @param {Observable<any>} notifier The Observable to use for sampling the
	 * source Observable.
	 * @return {Observable<T>} An Observable that emits the results of sampling the
	 * values emitted by the source Observable whenever the notifier Observable
	 * emits value or completes.
	 * @method sample
	 * @owner Observable
	 */
	function sample$2(notifier) {
	    return this.lift(new SampleOperator(notifier));
	}
	var sample_2 = sample$2;
	var SampleOperator = (function () {
	    function SampleOperator(notifier) {
	        this.notifier = notifier;
	    }
	    SampleOperator.prototype.call = function (subscriber, source) {
	        var sampleSubscriber = new SampleSubscriber(subscriber);
	        var subscription = source.subscribe(sampleSubscriber);
	        subscription.add(subscribeToResult_1$27.subscribeToResult(sampleSubscriber, this.notifier));
	        return subscription;
	    };
	    return SampleOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SampleSubscriber = (function (_super) {
	    __extends$92(SampleSubscriber, _super);
	    function SampleSubscriber() {
	        _super.apply(this, arguments);
	        this.hasValue = false;
	    }
	    SampleSubscriber.prototype._next = function (value) {
	        this.value = value;
	        this.hasValue = true;
	    };
	    SampleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.emitValue();
	    };
	    SampleSubscriber.prototype.notifyComplete = function () {
	        this.emitValue();
	    };
	    SampleSubscriber.prototype.emitValue = function () {
	        if (this.hasValue) {
	            this.hasValue = false;
	            this.destination.next(this.value);
	        }
	    };
	    return SampleSubscriber;
	}(OuterSubscriber_1$27.OuterSubscriber));


	var sample_1$1 = {
		sample: sample_2
	};

	var Observable_1$128 = Observable_1$2;
	var sample_1 = sample_1$1;
	Observable_1$128.Observable.prototype.sample = sample_1.sample;

	var __extends$93 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$40 = Subscriber_1$3;
	var async_1$8 = async;
	/**
	 * Emits the most recently emitted value from the source Observable within
	 * periodic time intervals.
	 *
	 * <span class="informal">Samples the source Observable at periodic time
	 * intervals, emitting what it samples.</span>
	 *
	 * <img src="./img/sampleTime.png" width="100%">
	 *
	 * `sampleTime` periodically looks at the source Observable and emits whichever
	 * value it has most recently emitted since the previous sampling, unless the
	 * source has not emitted anything since the previous sampling. The sampling
	 * happens periodically in time every `period` milliseconds (or the time unit
	 * defined by the optional `scheduler` argument). The sampling starts as soon as
	 * the output Observable is subscribed.
	 *
	 * @example <caption>Every second, emit the most recent click at most once</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.sampleTime(1000);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link auditTime}
	 * @see {@link debounceTime}
	 * @see {@link delay}
	 * @see {@link sample}
	 * @see {@link throttleTime}
	 *
	 * @param {number} period The sampling period expressed in milliseconds or the
	 * time unit determined internally by the optional `scheduler`.
	 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
	 * managing the timers that handle the sampling.
	 * @return {Observable<T>} An Observable that emits the results of sampling the
	 * values emitted by the source Observable at the specified time interval.
	 * @method sampleTime
	 * @owner Observable
	 */
	function sampleTime$2(period, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$8.async; }
	    return this.lift(new SampleTimeOperator(period, scheduler));
	}
	var sampleTime_2 = sampleTime$2;
	var SampleTimeOperator = (function () {
	    function SampleTimeOperator(period, scheduler) {
	        this.period = period;
	        this.scheduler = scheduler;
	    }
	    SampleTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SampleTimeSubscriber(subscriber, this.period, this.scheduler));
	    };
	    return SampleTimeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SampleTimeSubscriber = (function (_super) {
	    __extends$93(SampleTimeSubscriber, _super);
	    function SampleTimeSubscriber(destination, period, scheduler) {
	        _super.call(this, destination);
	        this.period = period;
	        this.scheduler = scheduler;
	        this.hasValue = false;
	        this.add(scheduler.schedule(dispatchNotification, period, { subscriber: this, period: period }));
	    }
	    SampleTimeSubscriber.prototype._next = function (value) {
	        this.lastValue = value;
	        this.hasValue = true;
	    };
	    SampleTimeSubscriber.prototype.notifyNext = function () {
	        if (this.hasValue) {
	            this.hasValue = false;
	            this.destination.next(this.lastValue);
	        }
	    };
	    return SampleTimeSubscriber;
	}(Subscriber_1$40.Subscriber));
	function dispatchNotification(state) {
	    var subscriber = state.subscriber, period = state.period;
	    subscriber.notifyNext();
	    this.schedule(state, period);
	}


	var sampleTime_1$1 = {
		sampleTime: sampleTime_2
	};

	var Observable_1$129 = Observable_1$2;
	var sampleTime_1 = sampleTime_1$1;
	Observable_1$129.Observable.prototype.sampleTime = sampleTime_1.sampleTime;

	var __extends$94 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$41 = Subscriber_1$3;
	/* tslint:enable:max-line-length */
	/**
	 * Applies an accumulator function over the source Observable, and returns each
	 * intermediate result, with an optional seed value.
	 *
	 * <span class="informal">It's like {@link reduce}, but emits the current
	 * accumulation whenever the source emits a value.</span>
	 *
	 * <img src="./img/scan.png" width="100%">
	 *
	 * Combines together all values emitted on the source, using an accumulator
	 * function that knows how to join a new source value into the accumulation from
	 * the past. Is similar to {@link reduce}, but emits the intermediate
	 * accumulations.
	 *
	 * Returns an Observable that applies a specified `accumulator` function to each
	 * item emitted by the source Observable. If a `seed` value is specified, then
	 * that value will be used as the initial value for the accumulator. If no seed
	 * value is specified, the first item of the source is used as the seed.
	 *
	 * @example <caption>Count the number of click events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var ones = clicks.mapTo(1);
	 * var seed = 0;
	 * var count = ones.scan((acc, one) => acc + one, seed);
	 * count.subscribe(x => console.log(x));
	 *
	 * @see {@link expand}
	 * @see {@link mergeScan}
	 * @see {@link reduce}
	 *
	 * @param {function(acc: R, value: T, index: number): R} accumulator
	 * The accumulator function called on each source value.
	 * @param {T|R} [seed] The initial accumulation value.
	 * @return {Observable<R>} An observable of the accumulated values.
	 * @method scan
	 * @owner Observable
	 */
	function scan$2(accumulator, seed) {
	    var hasSeed = false;
	    // providing a seed of `undefined` *should* be valid and trigger
	    // hasSeed! so don't use `seed !== undefined` checks!
	    // For this reason, we have to check it here at the original call site
	    // otherwise inside Operator/Subscriber we won't know if `undefined`
	    // means they didn't provide anything or if they literally provided `undefined`
	    if (arguments.length >= 2) {
	        hasSeed = true;
	    }
	    return this.lift(new ScanOperator(accumulator, seed, hasSeed));
	}
	var scan_2 = scan$2;
	var ScanOperator = (function () {
	    function ScanOperator(accumulator, seed, hasSeed) {
	        if (hasSeed === void 0) { hasSeed = false; }
	        this.accumulator = accumulator;
	        this.seed = seed;
	        this.hasSeed = hasSeed;
	    }
	    ScanOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ScanSubscriber(subscriber, this.accumulator, this.seed, this.hasSeed));
	    };
	    return ScanOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ScanSubscriber = (function (_super) {
	    __extends$94(ScanSubscriber, _super);
	    function ScanSubscriber(destination, accumulator, _seed, hasSeed) {
	        _super.call(this, destination);
	        this.accumulator = accumulator;
	        this._seed = _seed;
	        this.hasSeed = hasSeed;
	        this.index = 0;
	    }
	    Object.defineProperty(ScanSubscriber.prototype, "seed", {
	        get: function () {
	            return this._seed;
	        },
	        set: function (value) {
	            this.hasSeed = true;
	            this._seed = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ScanSubscriber.prototype._next = function (value) {
	        if (!this.hasSeed) {
	            this.seed = value;
	            this.destination.next(value);
	        }
	        else {
	            return this._tryNext(value);
	        }
	    };
	    ScanSubscriber.prototype._tryNext = function (value) {
	        var index = this.index++;
	        var result;
	        try {
	            result = this.accumulator(this.seed, value, index);
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	        this.seed = result;
	        this.destination.next(result);
	    };
	    return ScanSubscriber;
	}(Subscriber_1$41.Subscriber));


	var scan_1$1 = {
		scan: scan_2
	};

	var Observable_1$130 = Observable_1$2;
	var scan_1 = scan_1$1;
	Observable_1$130.Observable.prototype.scan = scan_1.scan;

	var __extends$95 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$42 = Subscriber_1$3;
	var tryCatch_1$15 = tryCatch_1$1;
	var errorObject_1$15 = errorObject;
	/**
	 * Compares all values of two observables in sequence using an optional comparor function
	 * and returns an observable of a single boolean value representing whether or not the two sequences
	 * are equal.
	 *
	 * <span class="informal">Checks to see of all values emitted by both observables are equal, in order.</span>
	 *
	 * <img src="./img/sequenceEqual.png" width="100%">
	 *
	 * `sequenceEqual` subscribes to two observables and buffers incoming values from each observable. Whenever either
	 * observable emits a value, the value is buffered and the buffers are shifted and compared from the bottom
	 * up; If any value pair doesn't match, the returned observable will emit `false` and complete. If one of the
	 * observables completes, the operator will wait for the other observable to complete; If the other
	 * observable emits before completing, the returned observable will emit `false` and complete. If one observable never
	 * completes or emits after the other complets, the returned observable will never complete.
	 *
	 * @example <caption>figure out if the Konami code matches</caption>
	 * var code = Rx.Observable.from([
	 *  "ArrowUp",
	 *  "ArrowUp",
	 *  "ArrowDown",
	 *  "ArrowDown",
	 *  "ArrowLeft",
	 *  "ArrowRight",
	 *  "ArrowLeft",
	 *  "ArrowRight",
	 *  "KeyB",
	 *  "KeyA",
	 *  "Enter" // no start key, clearly.
	 * ]);
	 *
	 * var keys = Rx.Observable.fromEvent(document, 'keyup')
	 *  .map(e => e.code);
	 * var matches = keys.bufferCount(11, 1)
	 *  .mergeMap(
	 *    last11 =>
	 *      Rx.Observable.from(last11)
	 *        .sequenceEqual(code)
	 *   );
	 * matches.subscribe(matched => console.log('Successful cheat at Contra? ', matched));
	 *
	 * @see {@link combineLatest}
	 * @see {@link zip}
	 * @see {@link withLatestFrom}
	 *
	 * @param {Observable} compareTo The observable sequence to compare the source sequence to.
	 * @param {function} [comparor] An optional function to compare each value pair
	 * @return {Observable} An Observable of a single boolean value representing whether or not
	 * the values emitted by both observables were equal in sequence.
	 * @method sequenceEqual
	 * @owner Observable
	 */
	function sequenceEqual$2(compareTo, comparor) {
	    return this.lift(new SequenceEqualOperator(compareTo, comparor));
	}
	var sequenceEqual_2 = sequenceEqual$2;
	var SequenceEqualOperator = (function () {
	    function SequenceEqualOperator(compareTo, comparor) {
	        this.compareTo = compareTo;
	        this.comparor = comparor;
	    }
	    SequenceEqualOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SequenceEqualSubscriber(subscriber, this.compareTo, this.comparor));
	    };
	    return SequenceEqualOperator;
	}());
	var SequenceEqualOperator_1 = SequenceEqualOperator;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SequenceEqualSubscriber = (function (_super) {
	    __extends$95(SequenceEqualSubscriber, _super);
	    function SequenceEqualSubscriber(destination, compareTo, comparor) {
	        _super.call(this, destination);
	        this.compareTo = compareTo;
	        this.comparor = comparor;
	        this._a = [];
	        this._b = [];
	        this._oneComplete = false;
	        this.add(compareTo.subscribe(new SequenceEqualCompareToSubscriber(destination, this)));
	    }
	    SequenceEqualSubscriber.prototype._next = function (value) {
	        if (this._oneComplete && this._b.length === 0) {
	            this.emit(false);
	        }
	        else {
	            this._a.push(value);
	            this.checkValues();
	        }
	    };
	    SequenceEqualSubscriber.prototype._complete = function () {
	        if (this._oneComplete) {
	            this.emit(this._a.length === 0 && this._b.length === 0);
	        }
	        else {
	            this._oneComplete = true;
	        }
	    };
	    SequenceEqualSubscriber.prototype.checkValues = function () {
	        var _c = this, _a = _c._a, _b = _c._b, comparor = _c.comparor;
	        while (_a.length > 0 && _b.length > 0) {
	            var a = _a.shift();
	            var b = _b.shift();
	            var areEqual = false;
	            if (comparor) {
	                areEqual = tryCatch_1$15.tryCatch(comparor)(a, b);
	                if (areEqual === errorObject_1$15.errorObject) {
	                    this.destination.error(errorObject_1$15.errorObject.e);
	                }
	            }
	            else {
	                areEqual = a === b;
	            }
	            if (!areEqual) {
	                this.emit(false);
	            }
	        }
	    };
	    SequenceEqualSubscriber.prototype.emit = function (value) {
	        var destination = this.destination;
	        destination.next(value);
	        destination.complete();
	    };
	    SequenceEqualSubscriber.prototype.nextB = function (value) {
	        if (this._oneComplete && this._a.length === 0) {
	            this.emit(false);
	        }
	        else {
	            this._b.push(value);
	            this.checkValues();
	        }
	    };
	    return SequenceEqualSubscriber;
	}(Subscriber_1$42.Subscriber));
	var SequenceEqualSubscriber_1 = SequenceEqualSubscriber;
	var SequenceEqualCompareToSubscriber = (function (_super) {
	    __extends$95(SequenceEqualCompareToSubscriber, _super);
	    function SequenceEqualCompareToSubscriber(destination, parent) {
	        _super.call(this, destination);
	        this.parent = parent;
	    }
	    SequenceEqualCompareToSubscriber.prototype._next = function (value) {
	        this.parent.nextB(value);
	    };
	    SequenceEqualCompareToSubscriber.prototype._error = function (err) {
	        this.parent.error(err);
	    };
	    SequenceEqualCompareToSubscriber.prototype._complete = function () {
	        this.parent._complete();
	    };
	    return SequenceEqualCompareToSubscriber;
	}(Subscriber_1$42.Subscriber));


	var sequenceEqual_1$1 = {
		sequenceEqual: sequenceEqual_2,
		SequenceEqualOperator: SequenceEqualOperator_1,
		SequenceEqualSubscriber: SequenceEqualSubscriber_1
	};

	var Observable_1$131 = Observable_1$2;
	var sequenceEqual_1 = sequenceEqual_1$1;
	Observable_1$131.Observable.prototype.sequenceEqual = sequenceEqual_1.sequenceEqual;

	var multicast_1$7 = multicast_1$1;
	var Subject_1$12 = Subject_1$1;
	function shareSubjectFactory() {
	    return new Subject_1$12.Subject();
	}
	/**
	 * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
	 * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
	 * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
	 * This is an alias for .publish().refCount().
	 *
	 * <img src="./img/share.png" width="100%">
	 *
	 * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
	 * @method share
	 * @owner Observable
	 */
	function share$2() {
	    return multicast_1$7.multicast.call(this, shareSubjectFactory).refCount();
	}
	var share_2 = share$2;



	var share_1$1 = {
		share: share_2
	};

	var Observable_1$132 = Observable_1$2;
	var share_1 = share_1$1;
	Observable_1$132.Observable.prototype.share = share_1.share;

	var multicast_1$8 = multicast_1$1;
	var ReplaySubject_1$5 = ReplaySubject_1$2;
	/**
	 * @method shareReplay
	 * @owner Observable
	 */
	function shareReplay$2(bufferSize, windowTime, scheduler) {
	    var subject;
	    var connectable = multicast_1$8.multicast.call(this, function shareReplaySubjectFactory() {
	        if (this._isComplete) {
	            return subject;
	        }
	        else {
	            return (subject = new ReplaySubject_1$5.ReplaySubject(bufferSize, windowTime, scheduler));
	        }
	    });
	    return connectable.refCount();
	}
	var shareReplay_2 = shareReplay$2;



	var shareReplay_1$1 = {
		shareReplay: shareReplay_2
	};

	var Observable_1$133 = Observable_1$2;
	var shareReplay_1 = shareReplay_1$1;
	Observable_1$133.Observable.prototype.shareReplay = shareReplay_1.shareReplay;

	var __extends$96 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$43 = Subscriber_1$3;
	var EmptyError_1$5 = EmptyError_1$2;
	/**
	 * Returns an Observable that emits the single item emitted by the source Observable that matches a specified
	 * predicate, if that Observable emits one such item. If the source Observable emits more than one such item or no
	 * such items, notify of an IllegalArgumentException or NoSuchElementException respectively.
	 *
	 * <img src="./img/single.png" width="100%">
	 *
	 * @throws {EmptyError} Delivers an EmptyError to the Observer's `error`
	 * callback if the Observable completes before any `next` notification was sent.
	 * @param {Function} predicate - A predicate function to evaluate items emitted by the source Observable.
	 * @return {Observable<T>} An Observable that emits the single item emitted by the source Observable that matches
	 * the predicate.
	 .
	 * @method single
	 * @owner Observable
	 */
	function single$2(predicate) {
	    return this.lift(new SingleOperator(predicate, this));
	}
	var single_2 = single$2;
	var SingleOperator = (function () {
	    function SingleOperator(predicate, source) {
	        this.predicate = predicate;
	        this.source = source;
	    }
	    SingleOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SingleSubscriber(subscriber, this.predicate, this.source));
	    };
	    return SingleOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SingleSubscriber = (function (_super) {
	    __extends$96(SingleSubscriber, _super);
	    function SingleSubscriber(destination, predicate, source) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.source = source;
	        this.seenValue = false;
	        this.index = 0;
	    }
	    SingleSubscriber.prototype.applySingleValue = function (value) {
	        if (this.seenValue) {
	            this.destination.error('Sequence contains more than one element');
	        }
	        else {
	            this.seenValue = true;
	            this.singleValue = value;
	        }
	    };
	    SingleSubscriber.prototype._next = function (value) {
	        var index = this.index++;
	        if (this.predicate) {
	            this.tryNext(value, index);
	        }
	        else {
	            this.applySingleValue(value);
	        }
	    };
	    SingleSubscriber.prototype.tryNext = function (value, index) {
	        try {
	            if (this.predicate(value, index, this.source)) {
	                this.applySingleValue(value);
	            }
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	    };
	    SingleSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        if (this.index > 0) {
	            destination.next(this.seenValue ? this.singleValue : undefined);
	            destination.complete();
	        }
	        else {
	            destination.error(new EmptyError_1$5.EmptyError);
	        }
	    };
	    return SingleSubscriber;
	}(Subscriber_1$43.Subscriber));


	var single_1$1 = {
		single: single_2
	};

	var Observable_1$134 = Observable_1$2;
	var single_1 = single_1$1;
	Observable_1$134.Observable.prototype.single = single_1.single;

	var __extends$97 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$44 = Subscriber_1$3;
	/**
	 * Returns an Observable that skips the first `count` items emitted by the source Observable.
	 *
	 * <img src="./img/skip.png" width="100%">
	 *
	 * @param {Number} count - The number of times, items emitted by source Observable should be skipped.
	 * @return {Observable} An Observable that skips values emitted by the source Observable.
	 *
	 * @method skip
	 * @owner Observable
	 */
	function skip$2(count) {
	    return this.lift(new SkipOperator(count));
	}
	var skip_2 = skip$2;
	var SkipOperator = (function () {
	    function SkipOperator(total) {
	        this.total = total;
	    }
	    SkipOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SkipSubscriber(subscriber, this.total));
	    };
	    return SkipOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SkipSubscriber = (function (_super) {
	    __extends$97(SkipSubscriber, _super);
	    function SkipSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    SkipSubscriber.prototype._next = function (x) {
	        if (++this.count > this.total) {
	            this.destination.next(x);
	        }
	    };
	    return SkipSubscriber;
	}(Subscriber_1$44.Subscriber));


	var skip_1$1 = {
		skip: skip_2
	};

	var Observable_1$135 = Observable_1$2;
	var skip_1 = skip_1$1;
	Observable_1$135.Observable.prototype.skip = skip_1.skip;

	var __extends$98 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$45 = Subscriber_1$3;
	var ArgumentOutOfRangeError_1$4 = ArgumentOutOfRangeError_1$2;
	/**
	 * Skip the last `count` values emitted by the source Observable.
	 *
	 * <img src="./img/skipLast.png" width="100%">
	 *
	 * `skipLast` returns an Observable that accumulates a queue with a length
	 * enough to store the first `count` values. As more values are received,
	 * values are taken from the front of the queue and produced on the result
	 * sequence. This causes values to be delayed.
	 *
	 * @example <caption>Skip the last 2 values of an Observable with many values</caption>
	 * var many = Rx.Observable.range(1, 5);
	 * var skipLastTwo = many.skipLast(2);
	 * skipLastTwo.subscribe(x => console.log(x));
	 *
	 * // Results in:
	 * // 1 2 3
	 *
	 * @see {@link skip}
	 * @see {@link skipUntil}
	 * @see {@link skipWhile}
	 * @see {@link take}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `skipLast(i)`, it throws
	 * ArgumentOutOrRangeError if `i < 0`.
	 *
	 * @param {number} count Number of elements to skip from the end of the source Observable.
	 * @returns {Observable<T>} An Observable that skips the last count values
	 * emitted by the source Observable.
	 * @method skipLast
	 * @owner Observable
	 */
	function skipLast$2(count) {
	    return this.lift(new SkipLastOperator(count));
	}
	var skipLast_2 = skipLast$2;
	var SkipLastOperator = (function () {
	    function SkipLastOperator(_skipCount) {
	        this._skipCount = _skipCount;
	        if (this._skipCount < 0) {
	            throw new ArgumentOutOfRangeError_1$4.ArgumentOutOfRangeError;
	        }
	    }
	    SkipLastOperator.prototype.call = function (subscriber, source) {
	        if (this._skipCount === 0) {
	            // If we don't want to skip any values then just subscribe
	            // to Subscriber without any further logic.
	            return source.subscribe(new Subscriber_1$45.Subscriber(subscriber));
	        }
	        else {
	            return source.subscribe(new SkipLastSubscriber(subscriber, this._skipCount));
	        }
	    };
	    return SkipLastOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SkipLastSubscriber = (function (_super) {
	    __extends$98(SkipLastSubscriber, _super);
	    function SkipLastSubscriber(destination, _skipCount) {
	        _super.call(this, destination);
	        this._skipCount = _skipCount;
	        this._count = 0;
	        this._ring = new Array(_skipCount);
	    }
	    SkipLastSubscriber.prototype._next = function (value) {
	        var skipCount = this._skipCount;
	        var count = this._count++;
	        if (count < skipCount) {
	            this._ring[count] = value;
	        }
	        else {
	            var currentIndex = count % skipCount;
	            var ring = this._ring;
	            var oldValue = ring[currentIndex];
	            ring[currentIndex] = value;
	            this.destination.next(oldValue);
	        }
	    };
	    return SkipLastSubscriber;
	}(Subscriber_1$45.Subscriber));


	var skipLast_1$1 = {
		skipLast: skipLast_2
	};

	var Observable_1$136 = Observable_1$2;
	var skipLast_1 = skipLast_1$1;
	Observable_1$136.Observable.prototype.skipLast = skipLast_1.skipLast;

	var __extends$99 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$28 = OuterSubscriber_1$1;
	var subscribeToResult_1$28 = subscribeToResult_1$1;
	/**
	 * Returns an Observable that skips items emitted by the source Observable until a second Observable emits an item.
	 *
	 * <img src="./img/skipUntil.png" width="100%">
	 *
	 * @param {Observable} notifier - The second Observable that has to emit an item before the source Observable's elements begin to
	 * be mirrored by the resulting Observable.
	 * @return {Observable<T>} An Observable that skips items from the source Observable until the second Observable emits
	 * an item, then emits the remaining items.
	 * @method skipUntil
	 * @owner Observable
	 */
	function skipUntil$2(notifier) {
	    return this.lift(new SkipUntilOperator(notifier));
	}
	var skipUntil_2 = skipUntil$2;
	var SkipUntilOperator = (function () {
	    function SkipUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    SkipUntilOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SkipUntilSubscriber(subscriber, this.notifier));
	    };
	    return SkipUntilOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SkipUntilSubscriber = (function (_super) {
	    __extends$99(SkipUntilSubscriber, _super);
	    function SkipUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.hasValue = false;
	        this.isInnerStopped = false;
	        this.add(subscribeToResult_1$28.subscribeToResult(this, notifier));
	    }
	    SkipUntilSubscriber.prototype._next = function (value) {
	        if (this.hasValue) {
	            _super.prototype._next.call(this, value);
	        }
	    };
	    SkipUntilSubscriber.prototype._complete = function () {
	        if (this.isInnerStopped) {
	            _super.prototype._complete.call(this);
	        }
	        else {
	            this.unsubscribe();
	        }
	    };
	    SkipUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.hasValue = true;
	    };
	    SkipUntilSubscriber.prototype.notifyComplete = function () {
	        this.isInnerStopped = true;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    return SkipUntilSubscriber;
	}(OuterSubscriber_1$28.OuterSubscriber));


	var skipUntil_1$1 = {
		skipUntil: skipUntil_2
	};

	var Observable_1$137 = Observable_1$2;
	var skipUntil_1 = skipUntil_1$1;
	Observable_1$137.Observable.prototype.skipUntil = skipUntil_1.skipUntil;

	var __extends$100 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$46 = Subscriber_1$3;
	/**
	 * Returns an Observable that skips all items emitted by the source Observable as long as a specified condition holds
	 * true, but emits all further source items as soon as the condition becomes false.
	 *
	 * <img src="./img/skipWhile.png" width="100%">
	 *
	 * @param {Function} predicate - A function to test each item emitted from the source Observable.
	 * @return {Observable<T>} An Observable that begins emitting items emitted by the source Observable when the
	 * specified predicate becomes false.
	 * @method skipWhile
	 * @owner Observable
	 */
	function skipWhile$2(predicate) {
	    return this.lift(new SkipWhileOperator(predicate));
	}
	var skipWhile_2 = skipWhile$2;
	var SkipWhileOperator = (function () {
	    function SkipWhileOperator(predicate) {
	        this.predicate = predicate;
	    }
	    SkipWhileOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SkipWhileSubscriber(subscriber, this.predicate));
	    };
	    return SkipWhileOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SkipWhileSubscriber = (function (_super) {
	    __extends$100(SkipWhileSubscriber, _super);
	    function SkipWhileSubscriber(destination, predicate) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.skipping = true;
	        this.index = 0;
	    }
	    SkipWhileSubscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        if (this.skipping) {
	            this.tryCallPredicate(value);
	        }
	        if (!this.skipping) {
	            destination.next(value);
	        }
	    };
	    SkipWhileSubscriber.prototype.tryCallPredicate = function (value) {
	        try {
	            var result = this.predicate(value, this.index++);
	            this.skipping = Boolean(result);
	        }
	        catch (err) {
	            this.destination.error(err);
	        }
	    };
	    return SkipWhileSubscriber;
	}(Subscriber_1$46.Subscriber));


	var skipWhile_1$1 = {
		skipWhile: skipWhile_2
	};

	var Observable_1$138 = Observable_1$2;
	var skipWhile_1 = skipWhile_1$1;
	Observable_1$138.Observable.prototype.skipWhile = skipWhile_1.skipWhile;

	var ArrayObservable_1$10 = ArrayObservable_1$1;
	var ScalarObservable_1$4 = ScalarObservable_1$1;
	var EmptyObservable_1$7 = EmptyObservable_1$1;
	var concat_1$5 = concat_1$2;
	var isScheduler_1$9 = isScheduler_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Returns an Observable that emits the items you specify as arguments before it begins to emit
	 * items emitted by the source Observable.
	 *
	 * <img src="./img/startWith.png" width="100%">
	 *
	 * @param {...T} values - Items you want the modified Observable to emit first.
	 * @param {Scheduler} [scheduler] - A {@link IScheduler} to use for scheduling
	 * the emissions of the `next` notifications.
	 * @return {Observable} An Observable that emits the items in the specified Iterable and then emits the items
	 * emitted by the source Observable.
	 * @method startWith
	 * @owner Observable
	 */
	function startWith$2() {
	    var array = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        array[_i - 0] = arguments[_i];
	    }
	    var scheduler = array[array.length - 1];
	    if (isScheduler_1$9.isScheduler(scheduler)) {
	        array.pop();
	    }
	    else {
	        scheduler = null;
	    }
	    var len = array.length;
	    if (len === 1) {
	        return concat_1$5.concatStatic(new ScalarObservable_1$4.ScalarObservable(array[0], scheduler), this);
	    }
	    else if (len > 1) {
	        return concat_1$5.concatStatic(new ArrayObservable_1$10.ArrayObservable(array, scheduler), this);
	    }
	    else {
	        return concat_1$5.concatStatic(new EmptyObservable_1$7.EmptyObservable(scheduler), this);
	    }
	}
	var startWith_2 = startWith$2;


	var startWith_1$1 = {
		startWith: startWith_2
	};

	var Observable_1$139 = Observable_1$2;
	var startWith_1 = startWith_1$1;
	Observable_1$139.Observable.prototype.startWith = startWith_1.startWith;

	var root_1$11 = root$1;
	var ImmediateDefinition = (function () {
	    function ImmediateDefinition(root) {
	        this.root = root;
	        if (root.setImmediate && typeof root.setImmediate === 'function') {
	            this.setImmediate = root.setImmediate.bind(root);
	            this.clearImmediate = root.clearImmediate.bind(root);
	        }
	        else {
	            this.nextHandle = 1;
	            this.tasksByHandle = {};
	            this.currentlyRunningATask = false;
	            // Don't get fooled by e.g. browserify environments.
	            if (this.canUseProcessNextTick()) {
	                // For Node.js before 0.9
	                this.setImmediate = this.createProcessNextTickSetImmediate();
	            }
	            else if (this.canUsePostMessage()) {
	                // For non-IE10 modern browsers
	                this.setImmediate = this.createPostMessageSetImmediate();
	            }
	            else if (this.canUseMessageChannel()) {
	                // For web workers, where supported
	                this.setImmediate = this.createMessageChannelSetImmediate();
	            }
	            else if (this.canUseReadyStateChange()) {
	                // For IE 6–8
	                this.setImmediate = this.createReadyStateChangeSetImmediate();
	            }
	            else {
	                // For older browsers
	                this.setImmediate = this.createSetTimeoutSetImmediate();
	            }
	            var ci = function clearImmediate(handle) {
	                delete clearImmediate.instance.tasksByHandle[handle];
	            };
	            ci.instance = this;
	            this.clearImmediate = ci;
	        }
	    }
	    ImmediateDefinition.prototype.identify = function (o) {
	        return this.root.Object.prototype.toString.call(o);
	    };
	    ImmediateDefinition.prototype.canUseProcessNextTick = function () {
	        return this.identify(this.root.process) === '[object process]';
	    };
	    ImmediateDefinition.prototype.canUseMessageChannel = function () {
	        return Boolean(this.root.MessageChannel);
	    };
	    ImmediateDefinition.prototype.canUseReadyStateChange = function () {
	        var document = this.root.document;
	        return Boolean(document && 'onreadystatechange' in document.createElement('script'));
	    };
	    ImmediateDefinition.prototype.canUsePostMessage = function () {
	        var root = this.root;
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `root.postMessage` means something completely different and can't be used for this purpose.
	        if (root.postMessage && !root.importScripts) {
	            var postMessageIsAsynchronous_1 = true;
	            var oldOnMessage = root.onmessage;
	            root.onmessage = function () {
	                postMessageIsAsynchronous_1 = false;
	            };
	            root.postMessage('', '*');
	            root.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous_1;
	        }
	        return false;
	    };
	    // This function accepts the same arguments as setImmediate, but
	    // returns a function that requires no arguments.
	    ImmediateDefinition.prototype.partiallyApplied = function (handler) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var fn = function result() {
	            var _a = result, handler = _a.handler, args = _a.args;
	            if (typeof handler === 'function') {
	                handler.apply(undefined, args);
	            }
	            else {
	                (new Function('' + handler))();
	            }
	        };
	        fn.handler = handler;
	        fn.args = args;
	        return fn;
	    };
	    ImmediateDefinition.prototype.addFromSetImmediateArguments = function (args) {
	        this.tasksByHandle[this.nextHandle] = this.partiallyApplied.apply(undefined, args);
	        return this.nextHandle++;
	    };
	    ImmediateDefinition.prototype.createProcessNextTickSetImmediate = function () {
	        var fn = function setImmediate() {
	            var instance = setImmediate.instance;
	            var handle = instance.addFromSetImmediateArguments(arguments);
	            instance.root.process.nextTick(instance.partiallyApplied(instance.runIfPresent, handle));
	            return handle;
	        };
	        fn.instance = this;
	        return fn;
	    };
	    ImmediateDefinition.prototype.createPostMessageSetImmediate = function () {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
	        var root = this.root;
	        var messagePrefix = 'setImmediate$' + root.Math.random() + '$';
	        var onGlobalMessage = function globalMessageHandler(event) {
	            var instance = globalMessageHandler.instance;
	            if (event.source === root &&
	                typeof event.data === 'string' &&
	                event.data.indexOf(messagePrefix) === 0) {
	                instance.runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };
	        onGlobalMessage.instance = this;
	        root.addEventListener('message', onGlobalMessage, false);
	        var fn = function setImmediate() {
	            var _a = setImmediate, messagePrefix = _a.messagePrefix, instance = _a.instance;
	            var handle = instance.addFromSetImmediateArguments(arguments);
	            instance.root.postMessage(messagePrefix + handle, '*');
	            return handle;
	        };
	        fn.instance = this;
	        fn.messagePrefix = messagePrefix;
	        return fn;
	    };
	    ImmediateDefinition.prototype.runIfPresent = function (handle) {
	        // From the spec: 'Wait until any invocations of this algorithm started before this one have completed.'
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (this.currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // 'too much recursion' error.
	            this.root.setTimeout(this.partiallyApplied(this.runIfPresent, handle), 0);
	        }
	        else {
	            var task = this.tasksByHandle[handle];
	            if (task) {
	                this.currentlyRunningATask = true;
	                try {
	                    task();
	                }
	                finally {
	                    this.clearImmediate(handle);
	                    this.currentlyRunningATask = false;
	                }
	            }
	        }
	    };
	    ImmediateDefinition.prototype.createMessageChannelSetImmediate = function () {
	        var _this = this;
	        var channel = new this.root.MessageChannel();
	        channel.port1.onmessage = function (event) {
	            var handle = event.data;
	            _this.runIfPresent(handle);
	        };
	        var fn = function setImmediate() {
	            var _a = setImmediate, channel = _a.channel, instance = _a.instance;
	            var handle = instance.addFromSetImmediateArguments(arguments);
	            channel.port2.postMessage(handle);
	            return handle;
	        };
	        fn.channel = channel;
	        fn.instance = this;
	        return fn;
	    };
	    ImmediateDefinition.prototype.createReadyStateChangeSetImmediate = function () {
	        var fn = function setImmediate() {
	            var instance = setImmediate.instance;
	            var root = instance.root;
	            var doc = root.document;
	            var html = doc.documentElement;
	            var handle = instance.addFromSetImmediateArguments(arguments);
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement('script');
	            script.onreadystatechange = function () {
	                instance.runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	            return handle;
	        };
	        fn.instance = this;
	        return fn;
	    };
	    ImmediateDefinition.prototype.createSetTimeoutSetImmediate = function () {
	        var fn = function setImmediate() {
	            var instance = setImmediate.instance;
	            var handle = instance.addFromSetImmediateArguments(arguments);
	            instance.root.setTimeout(instance.partiallyApplied(instance.runIfPresent, handle), 0);
	            return handle;
	        };
	        fn.instance = this;
	        return fn;
	    };
	    return ImmediateDefinition;
	}());
	var ImmediateDefinition_1 = ImmediateDefinition;
	var Immediate_1$1 = new ImmediateDefinition(root_1$11.root);


	var Immediate = {
		ImmediateDefinition: ImmediateDefinition_1,
		Immediate: Immediate_1$1
	};

	var __extends$102 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Immediate_1 = Immediate;
	var AsyncAction_1$4 = AsyncAction_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AsapAction = (function (_super) {
	    __extends$102(AsapAction, _super);
	    function AsapAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	    }
	    AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If delay is greater than 0, request as an async action.
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        // Push the action to the end of the scheduler queue.
	        scheduler.actions.push(this);
	        // If a microtask has already been scheduled, don't schedule another
	        // one. If a microtask hasn't been scheduled yet, schedule one now. Return
	        // the current scheduled microtask id.
	        return scheduler.scheduled || (scheduler.scheduled = Immediate_1.Immediate.setImmediate(scheduler.flush.bind(scheduler, null)));
	    };
	    AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If delay exists and is greater than 0, or if the delay is null (the
	        // action wasn't rescheduled) but was originally scheduled as an async
	        // action, then recycle as an async action.
	        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        // If the scheduler queue is empty, cancel the requested microtask and
	        // set the scheduled flag to undefined so the next AsapAction will schedule
	        // its own.
	        if (scheduler.actions.length === 0) {
	            Immediate_1.Immediate.clearImmediate(id);
	            scheduler.scheduled = undefined;
	        }
	        // Return undefined so the action knows to request a new async id if it's rescheduled.
	        return undefined;
	    };
	    return AsapAction;
	}(AsyncAction_1$4.AsyncAction));
	var AsapAction_2 = AsapAction;


	var AsapAction_1$1 = {
		AsapAction: AsapAction_2
	};

	var __extends$103 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncScheduler_1$4 = AsyncScheduler_1$1;
	var AsapScheduler = (function (_super) {
	    __extends$103(AsapScheduler, _super);
	    function AsapScheduler() {
	        _super.apply(this, arguments);
	    }
	    AsapScheduler.prototype.flush = function (action) {
	        this.active = true;
	        this.scheduled = undefined;
	        var actions = this.actions;
	        var error;
	        var index = -1;
	        var count = actions.length;
	        action = action || actions.shift();
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (++index < count && (action = actions.shift()));
	        this.active = false;
	        if (error) {
	            while (++index < count && (action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AsapScheduler;
	}(AsyncScheduler_1$4.AsyncScheduler));
	var AsapScheduler_2 = AsapScheduler;


	var AsapScheduler_1$1 = {
		AsapScheduler: AsapScheduler_2
	};

	var AsapAction_1 = AsapAction_1$1;
	var AsapScheduler_1 = AsapScheduler_1$1;
	/**
	 *
	 * Asap Scheduler
	 *
	 * <span class="informal">Perform task as fast as it can be performed asynchronously</span>
	 *
	 * `asap` scheduler behaves the same as {@link async} scheduler when you use it to delay task
	 * in time. If however you set delay to `0`, `asap` will wait for current synchronously executing
	 * code to end and then it will try to execute given task as fast as possible.
	 *
	 * `asap` scheduler will do its best to minimize time between end of currently executing code
	 * and start of scheduled task. This makes it best candidate for performing so called "deferring".
	 * Traditionally this was achieved by calling `setTimeout(deferredTask, 0)`, but that technique involves
	 * some (although minimal) unwanted delay.
	 *
	 * Note that using `asap` scheduler does not necessarily mean that your task will be first to process
	 * after currently executing code. In particular, if some task was also scheduled with `asap` before,
	 * that task will execute first. That being said, if you need to schedule task asynchronously, but
	 * as soon as possible, `asap` scheduler is your best bet.
	 *
	 * @example <caption>Compare async and asap scheduler</caption>
	 *
	 * Rx.Scheduler.async.schedule(() => console.log('async')); // scheduling 'async' first...
	 * Rx.Scheduler.asap.schedule(() => console.log('asap'));
	 *
	 * // Logs:
	 * // "asap"
	 * // "async"
	 * // ... but 'asap' goes first!
	 *
	 * @static true
	 * @name asap
	 * @owner Scheduler
	 */
	var asap_1$2 = new AsapScheduler_1.AsapScheduler(AsapAction_1.AsapAction);


	var asap = {
		asap: asap_1$2
	};

	var __extends$101 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$141 = Observable_1$2;
	var asap_1$1 = asap;
	var isNumeric_1$4 = isNumeric_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @extends {Ignored}
	 * @hide true
	 */
	var SubscribeOnObservable = (function (_super) {
	    __extends$101(SubscribeOnObservable, _super);
	    function SubscribeOnObservable(source, delayTime, scheduler) {
	        if (delayTime === void 0) { delayTime = 0; }
	        if (scheduler === void 0) { scheduler = asap_1$1.asap; }
	        _super.call(this);
	        this.source = source;
	        this.delayTime = delayTime;
	        this.scheduler = scheduler;
	        if (!isNumeric_1$4.isNumeric(delayTime) || delayTime < 0) {
	            this.delayTime = 0;
	        }
	        if (!scheduler || typeof scheduler.schedule !== 'function') {
	            this.scheduler = asap_1$1.asap;
	        }
	    }
	    SubscribeOnObservable.create = function (source, delay, scheduler) {
	        if (delay === void 0) { delay = 0; }
	        if (scheduler === void 0) { scheduler = asap_1$1.asap; }
	        return new SubscribeOnObservable(source, delay, scheduler);
	    };
	    SubscribeOnObservable.dispatch = function (arg) {
	        var source = arg.source, subscriber = arg.subscriber;
	        return this.add(source.subscribe(subscriber));
	    };
	    SubscribeOnObservable.prototype._subscribe = function (subscriber) {
	        var delay = this.delayTime;
	        var source = this.source;
	        var scheduler = this.scheduler;
	        return scheduler.schedule(SubscribeOnObservable.dispatch, delay, {
	            source: source, subscriber: subscriber
	        });
	    };
	    return SubscribeOnObservable;
	}(Observable_1$141.Observable));
	var SubscribeOnObservable_2 = SubscribeOnObservable;


	var SubscribeOnObservable_1$1 = {
		SubscribeOnObservable: SubscribeOnObservable_2
	};

	var SubscribeOnObservable_1 = SubscribeOnObservable_1$1;
	/**
	 * Asynchronously subscribes Observers to this Observable on the specified IScheduler.
	 *
	 * <img src="./img/subscribeOn.png" width="100%">
	 *
	 * @param {Scheduler} scheduler - The IScheduler to perform subscription actions on.
	 * @return {Observable<T>} The source Observable modified so that its subscriptions happen on the specified IScheduler.
	 .
	 * @method subscribeOn
	 * @owner Observable
	 */
	function subscribeOn$2(scheduler, delay) {
	    if (delay === void 0) { delay = 0; }
	    return this.lift(new SubscribeOnOperator(scheduler, delay));
	}
	var subscribeOn_2 = subscribeOn$2;
	var SubscribeOnOperator = (function () {
	    function SubscribeOnOperator(scheduler, delay) {
	        this.scheduler = scheduler;
	        this.delay = delay;
	    }
	    SubscribeOnOperator.prototype.call = function (subscriber, source) {
	        return new SubscribeOnObservable_1.SubscribeOnObservable(source, this.delay, this.scheduler).subscribe(subscriber);
	    };
	    return SubscribeOnOperator;
	}());


	var subscribeOn_1$1 = {
		subscribeOn: subscribeOn_2
	};

	var Observable_1$140 = Observable_1$2;
	var subscribeOn_1 = subscribeOn_1$1;
	Observable_1$140.Observable.prototype.subscribeOn = subscribeOn_1.subscribeOn;

	var __extends$104 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$29 = OuterSubscriber_1$1;
	var subscribeToResult_1$29 = subscribeToResult_1$1;
	/**
	 * Converts a higher-order Observable into a first-order Observable by
	 * subscribing to only the most recently emitted of those inner Observables.
	 *
	 * <span class="informal">Flattens an Observable-of-Observables by dropping the
	 * previous inner Observable once a new one appears.</span>
	 *
	 * <img src="./img/switch.png" width="100%">
	 *
	 * `switch` subscribes to an Observable that emits Observables, also known as a
	 * higher-order Observable. Each time it observes one of these emitted inner
	 * Observables, the output Observable subscribes to the inner Observable and
	 * begins emitting the items emitted by that. So far, it behaves
	 * like {@link mergeAll}. However, when a new inner Observable is emitted,
	 * `switch` unsubscribes from the earlier-emitted inner Observable and
	 * subscribes to the new inner Observable and begins emitting items from it. It
	 * continues to behave like this for subsequent inner Observables.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * // Each click event is mapped to an Observable that ticks every second
	 * var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
	 * var switched = higherOrder.switch();
	 * // The outcome is that `switched` is essentially a timer that restarts
	 * // on every click. The interval Observables from older clicks do not merge
	 * // with the current interval Observable.
	 * switched.subscribe(x => console.log(x));
	 *
	 * @see {@link combineAll}
	 * @see {@link concatAll}
	 * @see {@link exhaust}
	 * @see {@link mergeAll}
	 * @see {@link switchMap}
	 * @see {@link switchMapTo}
	 * @see {@link zipAll}
	 *
	 * @return {Observable<T>} An Observable that emits the items emitted by the
	 * Observable most recently emitted by the source Observable.
	 * @method switch
	 * @name switch
	 * @owner Observable
	 */
	function _switch$2() {
	    return this.lift(new SwitchOperator());
	}
	var _switch_2 = _switch$2;
	var SwitchOperator = (function () {
	    function SwitchOperator() {
	    }
	    SwitchOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SwitchSubscriber(subscriber));
	    };
	    return SwitchOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchSubscriber = (function (_super) {
	    __extends$104(SwitchSubscriber, _super);
	    function SwitchSubscriber(destination) {
	        _super.call(this, destination);
	        this.active = 0;
	        this.hasCompleted = false;
	    }
	    SwitchSubscriber.prototype._next = function (value) {
	        this.unsubscribeInner();
	        this.active++;
	        this.add(this.innerSubscription = subscribeToResult_1$29.subscribeToResult(this, value));
	    };
	    SwitchSubscriber.prototype._complete = function () {
	        this.hasCompleted = true;
	        if (this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    SwitchSubscriber.prototype.unsubscribeInner = function () {
	        this.active = this.active > 0 ? this.active - 1 : 0;
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	            this.remove(innerSubscription);
	        }
	    };
	    SwitchSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.destination.next(innerValue);
	    };
	    SwitchSubscriber.prototype.notifyError = function (err) {
	        this.destination.error(err);
	    };
	    SwitchSubscriber.prototype.notifyComplete = function () {
	        this.unsubscribeInner();
	        if (this.hasCompleted && this.active === 0) {
	            this.destination.complete();
	        }
	    };
	    return SwitchSubscriber;
	}(OuterSubscriber_1$29.OuterSubscriber));


	var _switch_1 = {
		_switch: _switch_2
	};

	var Observable_1$142 = Observable_1$2;
	var switch_1 = _switch_1;
	Observable_1$142.Observable.prototype.switch = switch_1._switch;
	Observable_1$142.Observable.prototype._switch = switch_1._switch;

	var __extends$105 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$30 = OuterSubscriber_1$1;
	var subscribeToResult_1$30 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to an Observable which is merged in the output
	 * Observable, emitting values only from the most recently projected Observable.
	 *
	 * <span class="informal">Maps each value to an Observable, then flattens all of
	 * these inner Observables using {@link switch}.</span>
	 *
	 * <img src="./img/switchMap.png" width="100%">
	 *
	 * Returns an Observable that emits items based on applying a function that you
	 * supply to each item emitted by the source Observable, where that function
	 * returns an (so-called "inner") Observable. Each time it observes one of these
	 * inner Observables, the output Observable begins emitting the items emitted by
	 * that inner Observable. When a new inner Observable is emitted, `switchMap`
	 * stops emitting items from the earlier-emitted inner Observable and begins
	 * emitting items from the new one. It continues to behave like this for
	 * subsequent inner Observables.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.switchMap((ev) => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMap}
	 * @see {@link exhaustMap}
	 * @see {@link mergeMap}
	 * @see {@link switch}
	 * @see {@link switchMapTo}
	 *
	 * @param {function(value: T, ?index: number): ObservableInput} project A function
	 * that, when applied to an item emitted by the source Observable, returns an
	 * Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits the result of applying the
	 * projection function (and the optional `resultSelector`) to each item emitted
	 * by the source Observable and taking only the values from the most recently
	 * projected inner Observable.
	 * @method switchMap
	 * @owner Observable
	 */
	function switchMap$2(project, resultSelector) {
	    return this.lift(new SwitchMapOperator(project, resultSelector));
	}
	var switchMap_2 = switchMap$2;
	var SwitchMapOperator = (function () {
	    function SwitchMapOperator(project, resultSelector) {
	        this.project = project;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SwitchMapSubscriber(subscriber, this.project, this.resultSelector));
	    };
	    return SwitchMapOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapSubscriber = (function (_super) {
	    __extends$105(SwitchMapSubscriber, _super);
	    function SwitchMapSubscriber(destination, project, resultSelector) {
	        _super.call(this, destination);
	        this.project = project;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapSubscriber.prototype._next = function (value) {
	        var result;
	        var index = this.index++;
	        try {
	            result = this.project(value, index);
	        }
	        catch (error) {
	            this.destination.error(error);
	            return;
	        }
	        this._innerSub(result, value, index);
	    };
	    SwitchMapSubscriber.prototype._innerSub = function (result, value, index) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1$30.subscribeToResult(this, result, value, index));
	    };
	    SwitchMapSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.closed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (this.resultSelector) {
	            this._tryNotifyNext(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            this.destination.next(innerValue);
	        }
	    };
	    SwitchMapSubscriber.prototype._tryNotifyNext = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var result;
	        try {
	            result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return SwitchMapSubscriber;
	}(OuterSubscriber_1$30.OuterSubscriber));


	var switchMap_1$1 = {
		switchMap: switchMap_2
	};

	var Observable_1$143 = Observable_1$2;
	var switchMap_1 = switchMap_1$1;
	Observable_1$143.Observable.prototype.switchMap = switchMap_1.switchMap;

	var __extends$106 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$31 = OuterSubscriber_1$1;
	var subscribeToResult_1$31 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Projects each source value to the same Observable which is flattened multiple
	 * times with {@link switch} in the output Observable.
	 *
	 * <span class="informal">It's like {@link switchMap}, but maps each value
	 * always to the same inner Observable.</span>
	 *
	 * <img src="./img/switchMapTo.png" width="100%">
	 *
	 * Maps each source value to the given Observable `innerObservable` regardless
	 * of the source value, and then flattens those resulting Observables into one
	 * single Observable, which is the output Observable. The output Observables
	 * emits values only from the most recently emitted instance of
	 * `innerObservable`.
	 *
	 * @example <caption>Rerun an interval Observable on every click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.switchMapTo(Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link concatMapTo}
	 * @see {@link switch}
	 * @see {@link switchMap}
	 * @see {@link mergeMapTo}
	 *
	 * @param {ObservableInput} innerObservable An Observable to replace each value from
	 * the source Observable.
	 * @param {function(outerValue: T, innerValue: I, outerIndex: number, innerIndex: number): any} [resultSelector]
	 * A function to produce the value on the output Observable based on the values
	 * and the indices of the source (outer) emission and the inner Observable
	 * emission. The arguments passed to this function are:
	 * - `outerValue`: the value that came from the source
	 * - `innerValue`: the value that came from the projected Observable
	 * - `outerIndex`: the "index" of the value that came from the source
	 * - `innerIndex`: the "index" of the value from the projected Observable
	 * @return {Observable} An Observable that emits items from the given
	 * `innerObservable` (and optionally transformed through `resultSelector`) every
	 * time a value is emitted on the source Observable, and taking only the values
	 * from the most recently projected inner Observable.
	 * @method switchMapTo
	 * @owner Observable
	 */
	function switchMapTo$2(innerObservable, resultSelector) {
	    return this.lift(new SwitchMapToOperator(innerObservable, resultSelector));
	}
	var switchMapTo_2 = switchMapTo$2;
	var SwitchMapToOperator = (function () {
	    function SwitchMapToOperator(observable, resultSelector) {
	        this.observable = observable;
	        this.resultSelector = resultSelector;
	    }
	    SwitchMapToOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new SwitchMapToSubscriber(subscriber, this.observable, this.resultSelector));
	    };
	    return SwitchMapToOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var SwitchMapToSubscriber = (function (_super) {
	    __extends$106(SwitchMapToSubscriber, _super);
	    function SwitchMapToSubscriber(destination, inner, resultSelector) {
	        _super.call(this, destination);
	        this.inner = inner;
	        this.resultSelector = resultSelector;
	        this.index = 0;
	    }
	    SwitchMapToSubscriber.prototype._next = function (value) {
	        var innerSubscription = this.innerSubscription;
	        if (innerSubscription) {
	            innerSubscription.unsubscribe();
	        }
	        this.add(this.innerSubscription = subscribeToResult_1$31.subscribeToResult(this, this.inner, value, this.index++));
	    };
	    SwitchMapToSubscriber.prototype._complete = function () {
	        var innerSubscription = this.innerSubscription;
	        if (!innerSubscription || innerSubscription.closed) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapToSubscriber.prototype._unsubscribe = function () {
	        this.innerSubscription = null;
	    };
	    SwitchMapToSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.remove(innerSub);
	        this.innerSubscription = null;
	        if (this.isStopped) {
	            _super.prototype._complete.call(this);
	        }
	    };
	    SwitchMapToSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        if (resultSelector) {
	            this.tryResultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        else {
	            destination.next(innerValue);
	        }
	    };
	    SwitchMapToSubscriber.prototype.tryResultSelector = function (outerValue, innerValue, outerIndex, innerIndex) {
	        var _a = this, resultSelector = _a.resultSelector, destination = _a.destination;
	        var result;
	        try {
	            result = resultSelector(outerValue, innerValue, outerIndex, innerIndex);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        destination.next(result);
	    };
	    return SwitchMapToSubscriber;
	}(OuterSubscriber_1$31.OuterSubscriber));


	var switchMapTo_1$1 = {
		switchMapTo: switchMapTo_2
	};

	var Observable_1$144 = Observable_1$2;
	var switchMapTo_1 = switchMapTo_1$1;
	Observable_1$144.Observable.prototype.switchMapTo = switchMapTo_1.switchMapTo;

	var __extends$107 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$47 = Subscriber_1$3;
	var ArgumentOutOfRangeError_1$5 = ArgumentOutOfRangeError_1$2;
	var EmptyObservable_1$8 = EmptyObservable_1$1;
	/**
	 * Emits only the first `count` values emitted by the source Observable.
	 *
	 * <span class="informal">Takes the first `count` values from the source, then
	 * completes.</span>
	 *
	 * <img src="./img/take.png" width="100%">
	 *
	 * `take` returns an Observable that emits only the first `count` values emitted
	 * by the source Observable. If the source emits fewer than `count` values then
	 * all of its values are emitted. After that, it completes, regardless if the
	 * source completes.
	 *
	 * @example <caption>Take the first 5 seconds of an infinite 1-second interval Observable</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var five = interval.take(5);
	 * five.subscribe(x => console.log(x));
	 *
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
	 *
	 * @param {number} count The maximum number of `next` values to emit.
	 * @return {Observable<T>} An Observable that emits only the first `count`
	 * values emitted by the source Observable, or all of the values from the source
	 * if the source emits fewer than `count` values.
	 * @method take
	 * @owner Observable
	 */
	function take$2(count) {
	    if (count === 0) {
	        return new EmptyObservable_1$8.EmptyObservable();
	    }
	    else {
	        return this.lift(new TakeOperator(count));
	    }
	}
	var take_2 = take$2;
	var TakeOperator = (function () {
	    function TakeOperator(total) {
	        this.total = total;
	        if (this.total < 0) {
	            throw new ArgumentOutOfRangeError_1$5.ArgumentOutOfRangeError;
	        }
	    }
	    TakeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TakeSubscriber(subscriber, this.total));
	    };
	    return TakeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeSubscriber = (function (_super) {
	    __extends$107(TakeSubscriber, _super);
	    function TakeSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.count = 0;
	    }
	    TakeSubscriber.prototype._next = function (value) {
	        var total = this.total;
	        var count = ++this.count;
	        if (count <= total) {
	            this.destination.next(value);
	            if (count === total) {
	                this.destination.complete();
	                this.unsubscribe();
	            }
	        }
	    };
	    return TakeSubscriber;
	}(Subscriber_1$47.Subscriber));


	var take_1$1 = {
		take: take_2
	};

	var Observable_1$145 = Observable_1$2;
	var take_1 = take_1$1;
	Observable_1$145.Observable.prototype.take = take_1.take;

	var __extends$108 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$48 = Subscriber_1$3;
	var ArgumentOutOfRangeError_1$6 = ArgumentOutOfRangeError_1$2;
	var EmptyObservable_1$9 = EmptyObservable_1$1;
	/**
	 * Emits only the last `count` values emitted by the source Observable.
	 *
	 * <span class="informal">Remembers the latest `count` values, then emits those
	 * only when the source completes.</span>
	 *
	 * <img src="./img/takeLast.png" width="100%">
	 *
	 * `takeLast` returns an Observable that emits at most the last `count` values
	 * emitted by the source Observable. If the source emits fewer than `count`
	 * values then all of its values are emitted. This operator must wait until the
	 * `complete` notification emission from the source in order to emit the `next`
	 * values on the output Observable, because otherwise it is impossible to know
	 * whether or not more values will be emitted on the source. For this reason,
	 * all values are emitted synchronously, followed by the complete notification.
	 *
	 * @example <caption>Take the last 3 values of an Observable with many values</caption>
	 * var many = Rx.Observable.range(1, 100);
	 * var lastThree = many.takeLast(3);
	 * lastThree.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeUntil}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @throws {ArgumentOutOfRangeError} When using `takeLast(i)`, it delivers an
	 * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
	 *
	 * @param {number} count The maximum number of values to emit from the end of
	 * the sequence of values emitted by the source Observable.
	 * @return {Observable<T>} An Observable that emits at most the last count
	 * values emitted by the source Observable.
	 * @method takeLast
	 * @owner Observable
	 */
	function takeLast$2(count) {
	    if (count === 0) {
	        return new EmptyObservable_1$9.EmptyObservable();
	    }
	    else {
	        return this.lift(new TakeLastOperator(count));
	    }
	}
	var takeLast_2 = takeLast$2;
	var TakeLastOperator = (function () {
	    function TakeLastOperator(total) {
	        this.total = total;
	        if (this.total < 0) {
	            throw new ArgumentOutOfRangeError_1$6.ArgumentOutOfRangeError;
	        }
	    }
	    TakeLastOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TakeLastSubscriber(subscriber, this.total));
	    };
	    return TakeLastOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeLastSubscriber = (function (_super) {
	    __extends$108(TakeLastSubscriber, _super);
	    function TakeLastSubscriber(destination, total) {
	        _super.call(this, destination);
	        this.total = total;
	        this.ring = new Array();
	        this.count = 0;
	    }
	    TakeLastSubscriber.prototype._next = function (value) {
	        var ring = this.ring;
	        var total = this.total;
	        var count = this.count++;
	        if (ring.length < total) {
	            ring.push(value);
	        }
	        else {
	            var index = count % total;
	            ring[index] = value;
	        }
	    };
	    TakeLastSubscriber.prototype._complete = function () {
	        var destination = this.destination;
	        var count = this.count;
	        if (count > 0) {
	            var total = this.count >= this.total ? this.total : this.count;
	            var ring = this.ring;
	            for (var i = 0; i < total; i++) {
	                var idx = (count++) % total;
	                destination.next(ring[idx]);
	            }
	        }
	        destination.complete();
	    };
	    return TakeLastSubscriber;
	}(Subscriber_1$48.Subscriber));


	var takeLast_1$1 = {
		takeLast: takeLast_2
	};

	var Observable_1$146 = Observable_1$2;
	var takeLast_1 = takeLast_1$1;
	Observable_1$146.Observable.prototype.takeLast = takeLast_1.takeLast;

	var __extends$109 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$32 = OuterSubscriber_1$1;
	var subscribeToResult_1$32 = subscribeToResult_1$1;
	/**
	 * Emits the values emitted by the source Observable until a `notifier`
	 * Observable emits a value.
	 *
	 * <span class="informal">Lets values pass until a second Observable,
	 * `notifier`, emits something. Then, it completes.</span>
	 *
	 * <img src="./img/takeUntil.png" width="100%">
	 *
	 * `takeUntil` subscribes and begins mirroring the source Observable. It also
	 * monitors a second Observable, `notifier` that you provide. If the `notifier`
	 * emits a value or a complete notification, the output Observable stops
	 * mirroring the source Observable and completes.
	 *
	 * @example <caption>Tick every second until the first click happens</caption>
	 * var interval = Rx.Observable.interval(1000);
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = interval.takeUntil(clicks);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeLast}
	 * @see {@link takeWhile}
	 * @see {@link skip}
	 *
	 * @param {Observable} notifier The Observable whose first emitted value will
	 * cause the output Observable of `takeUntil` to stop emitting values from the
	 * source Observable.
	 * @return {Observable<T>} An Observable that emits the values from the source
	 * Observable until such time as `notifier` emits its first value.
	 * @method takeUntil
	 * @owner Observable
	 */
	function takeUntil$2(notifier) {
	    return this.lift(new TakeUntilOperator(notifier));
	}
	var takeUntil_2 = takeUntil$2;
	var TakeUntilOperator = (function () {
	    function TakeUntilOperator(notifier) {
	        this.notifier = notifier;
	    }
	    TakeUntilOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TakeUntilSubscriber(subscriber, this.notifier));
	    };
	    return TakeUntilOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeUntilSubscriber = (function (_super) {
	    __extends$109(TakeUntilSubscriber, _super);
	    function TakeUntilSubscriber(destination, notifier) {
	        _super.call(this, destination);
	        this.notifier = notifier;
	        this.add(subscribeToResult_1$32.subscribeToResult(this, notifier));
	    }
	    TakeUntilSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.complete();
	    };
	    TakeUntilSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    return TakeUntilSubscriber;
	}(OuterSubscriber_1$32.OuterSubscriber));


	var takeUntil_1$1 = {
		takeUntil: takeUntil_2
	};

	var Observable_1$147 = Observable_1$2;
	var takeUntil_1 = takeUntil_1$1;
	Observable_1$147.Observable.prototype.takeUntil = takeUntil_1.takeUntil;

	var __extends$110 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$49 = Subscriber_1$3;
	/**
	 * Emits values emitted by the source Observable so long as each value satisfies
	 * the given `predicate`, and then completes as soon as this `predicate` is not
	 * satisfied.
	 *
	 * <span class="informal">Takes values from the source only while they pass the
	 * condition given. When the first value does not satisfy, it completes.</span>
	 *
	 * <img src="./img/takeWhile.png" width="100%">
	 *
	 * `takeWhile` subscribes and begins mirroring the source Observable. Each value
	 * emitted on the source is given to the `predicate` function which returns a
	 * boolean, representing a condition to be satisfied by the source values. The
	 * output Observable emits the source values until such time as the `predicate`
	 * returns false, at which point `takeWhile` stops mirroring the source
	 * Observable and completes the output Observable.
	 *
	 * @example <caption>Emit click events only while the clientX property is greater than 200</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.takeWhile(ev => ev.clientX > 200);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link take}
	 * @see {@link takeLast}
	 * @see {@link takeUntil}
	 * @see {@link skip}
	 *
	 * @param {function(value: T, index: number): boolean} predicate A function that
	 * evaluates a value emitted by the source Observable and returns a boolean.
	 * Also takes the (zero-based) index as the second argument.
	 * @return {Observable<T>} An Observable that emits the values from the source
	 * Observable so long as each value satisfies the condition defined by the
	 * `predicate`, then completes.
	 * @method takeWhile
	 * @owner Observable
	 */
	function takeWhile$2(predicate) {
	    return this.lift(new TakeWhileOperator(predicate));
	}
	var takeWhile_2 = takeWhile$2;
	var TakeWhileOperator = (function () {
	    function TakeWhileOperator(predicate) {
	        this.predicate = predicate;
	    }
	    TakeWhileOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TakeWhileSubscriber(subscriber, this.predicate));
	    };
	    return TakeWhileOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TakeWhileSubscriber = (function (_super) {
	    __extends$110(TakeWhileSubscriber, _super);
	    function TakeWhileSubscriber(destination, predicate) {
	        _super.call(this, destination);
	        this.predicate = predicate;
	        this.index = 0;
	    }
	    TakeWhileSubscriber.prototype._next = function (value) {
	        var destination = this.destination;
	        var result;
	        try {
	            result = this.predicate(value, this.index++);
	        }
	        catch (err) {
	            destination.error(err);
	            return;
	        }
	        this.nextOrComplete(value, result);
	    };
	    TakeWhileSubscriber.prototype.nextOrComplete = function (value, predicateResult) {
	        var destination = this.destination;
	        if (Boolean(predicateResult)) {
	            destination.next(value);
	        }
	        else {
	            destination.complete();
	        }
	    };
	    return TakeWhileSubscriber;
	}(Subscriber_1$49.Subscriber));


	var takeWhile_1$1 = {
		takeWhile: takeWhile_2
	};

	var Observable_1$148 = Observable_1$2;
	var takeWhile_1 = takeWhile_1$1;
	Observable_1$148.Observable.prototype.takeWhile = takeWhile_1.takeWhile;

	var throttle_1$1 = createCommonjsModule(function (module, exports) {
	"use strict";
	var __extends = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1 = OuterSubscriber_1$1;
	var subscribeToResult_1 = subscribeToResult_1$1;
	exports.defaultThrottleConfig = {
	    leading: true,
	    trailing: false
	};
	/**
	 * Emits a value from the source Observable, then ignores subsequent source
	 * values for a duration determined by another Observable, then repeats this
	 * process.
	 *
	 * <span class="informal">It's like {@link throttleTime}, but the silencing
	 * duration is determined by a second Observable.</span>
	 *
	 * <img src="./img/throttle.png" width="100%">
	 *
	 * `throttle` emits the source Observable values on the output Observable
	 * when its internal timer is disabled, and ignores source values when the timer
	 * is enabled. Initially, the timer is disabled. As soon as the first source
	 * value arrives, it is forwarded to the output Observable, and then the timer
	 * is enabled by calling the `durationSelector` function with the source value,
	 * which returns the "duration" Observable. When the duration Observable emits a
	 * value or completes, the timer is disabled, and this process repeats for the
	 * next source value.
	 *
	 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.throttle(ev => Rx.Observable.interval(1000));
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link audit}
	 * @see {@link debounce}
	 * @see {@link delayWhen}
	 * @see {@link sample}
	 * @see {@link throttleTime}
	 *
	 * @param {function(value: T): SubscribableOrPromise} durationSelector A function
	 * that receives a value from the source Observable, for computing the silencing
	 * duration for each source value, returned as an Observable or a Promise.
	 * @param {Object} config a configuration object to define `leading` and `trailing` behavior. Defaults
	 * to `{ leading: true, trailing: false }`.
	 * @return {Observable<T>} An Observable that performs the throttle operation to
	 * limit the rate of emissions from the source.
	 * @method throttle
	 * @owner Observable
	 */
	function throttle(durationSelector, config) {
	    if (config === void 0) { config = exports.defaultThrottleConfig; }
	    return this.lift(new ThrottleOperator(durationSelector, config.leading, config.trailing));
	}
	exports.throttle = throttle;
	var ThrottleOperator = (function () {
	    function ThrottleOperator(durationSelector, leading, trailing) {
	        this.durationSelector = durationSelector;
	        this.leading = leading;
	        this.trailing = trailing;
	    }
	    ThrottleOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ThrottleSubscriber(subscriber, this.durationSelector, this.leading, this.trailing));
	    };
	    return ThrottleOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc
	 * @ignore
	 * @extends {Ignored}
	 */
	var ThrottleSubscriber = (function (_super) {
	    __extends(ThrottleSubscriber, _super);
	    function ThrottleSubscriber(destination, durationSelector, _leading, _trailing) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.durationSelector = durationSelector;
	        this._leading = _leading;
	        this._trailing = _trailing;
	        this._hasTrailingValue = false;
	    }
	    ThrottleSubscriber.prototype._next = function (value) {
	        if (this.throttled) {
	            if (this._trailing) {
	                this._hasTrailingValue = true;
	                this._trailingValue = value;
	            }
	        }
	        else {
	            var duration = this.tryDurationSelector(value);
	            if (duration) {
	                this.add(this.throttled = subscribeToResult_1.subscribeToResult(this, duration));
	            }
	            if (this._leading) {
	                this.destination.next(value);
	                if (this._trailing) {
	                    this._hasTrailingValue = true;
	                    this._trailingValue = value;
	                }
	            }
	        }
	    };
	    ThrottleSubscriber.prototype.tryDurationSelector = function (value) {
	        try {
	            return this.durationSelector(value);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return null;
	        }
	    };
	    ThrottleSubscriber.prototype._unsubscribe = function () {
	        var _a = this, throttled = _a.throttled, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue, _trailing = _a._trailing;
	        this._trailingValue = null;
	        this._hasTrailingValue = false;
	        if (throttled) {
	            this.remove(throttled);
	            this.throttled = null;
	            throttled.unsubscribe();
	        }
	    };
	    ThrottleSubscriber.prototype._sendTrailing = function () {
	        var _a = this, destination = _a.destination, throttled = _a.throttled, _trailing = _a._trailing, _trailingValue = _a._trailingValue, _hasTrailingValue = _a._hasTrailingValue;
	        if (throttled && _trailing && _hasTrailingValue) {
	            destination.next(_trailingValue);
	            this._trailingValue = null;
	            this._hasTrailingValue = false;
	        }
	    };
	    ThrottleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this._sendTrailing();
	        this._unsubscribe();
	    };
	    ThrottleSubscriber.prototype.notifyComplete = function () {
	        this._sendTrailing();
	        this._unsubscribe();
	    };
	    return ThrottleSubscriber;
	}(OuterSubscriber_1.OuterSubscriber));

	});

	var Observable_1$149 = Observable_1$2;
	var throttle_1 = throttle_1$1;
	Observable_1$149.Observable.prototype.throttle = throttle_1.throttle;

	var __extends$111 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$50 = Subscriber_1$3;
	var async_1$9 = async;
	var throttle_1$3 = throttle_1$1;
	/**
	 * Emits a value from the source Observable, then ignores subsequent source
	 * values for `duration` milliseconds, then repeats this process.
	 *
	 * <span class="informal">Lets a value pass, then ignores source values for the
	 * next `duration` milliseconds.</span>
	 *
	 * <img src="./img/throttleTime.png" width="100%">
	 *
	 * `throttleTime` emits the source Observable values on the output Observable
	 * when its internal timer is disabled, and ignores source values when the timer
	 * is enabled. Initially, the timer is disabled. As soon as the first source
	 * value arrives, it is forwarded to the output Observable, and then the timer
	 * is enabled. After `duration` milliseconds (or the time unit determined
	 * internally by the optional `scheduler`) has passed, the timer is disabled,
	 * and this process repeats for the next source value. Optionally takes a
	 * {@link IScheduler} for managing timers.
	 *
	 * @example <caption>Emit clicks at a rate of at most one click per second</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.throttleTime(1000);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link auditTime}
	 * @see {@link debounceTime}
	 * @see {@link delay}
	 * @see {@link sampleTime}
	 * @see {@link throttle}
	 *
	 * @param {number} duration Time to wait before emitting another value after
	 * emitting the last value, measured in milliseconds or the time unit determined
	 * internally by the optional `scheduler`.
	 * @param {Scheduler} [scheduler=async] The {@link IScheduler} to use for
	 * managing the timers that handle the throttling.
	 * @return {Observable<T>} An Observable that performs the throttle operation to
	 * limit the rate of emissions from the source.
	 * @method throttleTime
	 * @owner Observable
	 */
	function throttleTime$2(duration, scheduler, config) {
	    if (scheduler === void 0) { scheduler = async_1$9.async; }
	    if (config === void 0) { config = throttle_1$3.defaultThrottleConfig; }
	    return this.lift(new ThrottleTimeOperator(duration, scheduler, config.leading, config.trailing));
	}
	var throttleTime_2 = throttleTime$2;
	var ThrottleTimeOperator = (function () {
	    function ThrottleTimeOperator(duration, scheduler, leading, trailing) {
	        this.duration = duration;
	        this.scheduler = scheduler;
	        this.leading = leading;
	        this.trailing = trailing;
	    }
	    ThrottleTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ThrottleTimeSubscriber(subscriber, this.duration, this.scheduler, this.leading, this.trailing));
	    };
	    return ThrottleTimeOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ThrottleTimeSubscriber = (function (_super) {
	    __extends$111(ThrottleTimeSubscriber, _super);
	    function ThrottleTimeSubscriber(destination, duration, scheduler, leading, trailing) {
	        _super.call(this, destination);
	        this.duration = duration;
	        this.scheduler = scheduler;
	        this.leading = leading;
	        this.trailing = trailing;
	        this._hasTrailingValue = false;
	        this._trailingValue = null;
	    }
	    ThrottleTimeSubscriber.prototype._next = function (value) {
	        if (this.throttled) {
	            if (this.trailing) {
	                this._trailingValue = value;
	                this._hasTrailingValue = true;
	            }
	        }
	        else {
	            this.add(this.throttled = this.scheduler.schedule(dispatchNext$5, this.duration, { subscriber: this }));
	            if (this.leading) {
	                this.destination.next(value);
	            }
	        }
	    };
	    ThrottleTimeSubscriber.prototype.clearThrottle = function () {
	        var throttled = this.throttled;
	        if (throttled) {
	            if (this.trailing && this._hasTrailingValue) {
	                this.destination.next(this._trailingValue);
	                this._trailingValue = null;
	                this._hasTrailingValue = false;
	            }
	            throttled.unsubscribe();
	            this.remove(throttled);
	            this.throttled = null;
	        }
	    };
	    return ThrottleTimeSubscriber;
	}(Subscriber_1$50.Subscriber));
	function dispatchNext$5(arg) {
	    var subscriber = arg.subscriber;
	    subscriber.clearThrottle();
	}


	var throttleTime_1$1 = {
		throttleTime: throttleTime_2
	};

	var Observable_1$150 = Observable_1$2;
	var throttleTime_1 = throttleTime_1$1;
	Observable_1$150.Observable.prototype.throttleTime = throttleTime_1.throttleTime;

	var __extends$112 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$51 = Subscriber_1$3;
	var async_1$10 = async;
	/**
	 * @param scheduler
	 * @return {Observable<TimeInterval<any>>|WebSocketSubject<T>|Observable<T>}
	 * @method timeInterval
	 * @owner Observable
	 */
	function timeInterval$2(scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$10.async; }
	    return this.lift(new TimeIntervalOperator(scheduler));
	}
	var timeInterval_2 = timeInterval$2;
	var TimeInterval$1 = (function () {
	    function TimeInterval(value, interval) {
	        this.value = value;
	        this.interval = interval;
	    }
	    return TimeInterval;
	}());
	var TimeInterval_1 = TimeInterval$1;

	var TimeIntervalOperator = (function () {
	    function TimeIntervalOperator(scheduler) {
	        this.scheduler = scheduler;
	    }
	    TimeIntervalOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new TimeIntervalSubscriber(observer, this.scheduler));
	    };
	    return TimeIntervalOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TimeIntervalSubscriber = (function (_super) {
	    __extends$112(TimeIntervalSubscriber, _super);
	    function TimeIntervalSubscriber(destination, scheduler) {
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	        this.lastTime = 0;
	        this.lastTime = scheduler.now();
	    }
	    TimeIntervalSubscriber.prototype._next = function (value) {
	        var now = this.scheduler.now();
	        var span = now - this.lastTime;
	        this.lastTime = now;
	        this.destination.next(new TimeInterval$1(value, span));
	    };
	    return TimeIntervalSubscriber;
	}(Subscriber_1$51.Subscriber));


	var timeInterval_1$2 = {
		timeInterval: timeInterval_2,
		TimeInterval: TimeInterval_1
	};

	var Observable_1$151 = Observable_1$2;
	var timeInterval_1$1 = timeInterval_1$2;
	Observable_1$151.Observable.prototype.timeInterval = timeInterval_1$1.timeInterval;

	var __extends$114 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * An error thrown when duetime elapses.
	 *
	 * @see {@link timeout}
	 *
	 * @class TimeoutError
	 */
	var TimeoutError$1 = (function (_super) {
	    __extends$114(TimeoutError, _super);
	    function TimeoutError() {
	        var err = _super.call(this, 'Timeout has occurred');
	        this.name = err.name = 'TimeoutError';
	        this.stack = err.stack;
	        this.message = err.message;
	    }
	    return TimeoutError;
	}(Error));
	var TimeoutError_2 = TimeoutError$1;


	var TimeoutError_1$2 = {
		TimeoutError: TimeoutError_2
	};

	var __extends$113 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1$11 = async;
	var isDate_1$4 = isDate_1$1;
	var Subscriber_1$52 = Subscriber_1$3;
	var TimeoutError_1$1 = TimeoutError_1$2;
	/**
	 * @param {number} due
	 * @param {Scheduler} [scheduler]
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method timeout
	 * @owner Observable
	 */
	function timeout$2(due, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$11.async; }
	    var absoluteTimeout = isDate_1$4.isDate(due);
	    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
	    return this.lift(new TimeoutOperator(waitFor, absoluteTimeout, scheduler, new TimeoutError_1$1.TimeoutError()));
	}
	var timeout_2 = timeout$2;
	var TimeoutOperator = (function () {
	    function TimeoutOperator(waitFor, absoluteTimeout, scheduler, errorInstance) {
	        this.waitFor = waitFor;
	        this.absoluteTimeout = absoluteTimeout;
	        this.scheduler = scheduler;
	        this.errorInstance = errorInstance;
	    }
	    TimeoutOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TimeoutSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.scheduler, this.errorInstance));
	    };
	    return TimeoutOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TimeoutSubscriber = (function (_super) {
	    __extends$113(TimeoutSubscriber, _super);
	    function TimeoutSubscriber(destination, absoluteTimeout, waitFor, scheduler, errorInstance) {
	        _super.call(this, destination);
	        this.absoluteTimeout = absoluteTimeout;
	        this.waitFor = waitFor;
	        this.scheduler = scheduler;
	        this.errorInstance = errorInstance;
	        this.action = null;
	        this.scheduleTimeout();
	    }
	    TimeoutSubscriber.dispatchTimeout = function (subscriber) {
	        subscriber.error(subscriber.errorInstance);
	    };
	    TimeoutSubscriber.prototype.scheduleTimeout = function () {
	        var action = this.action;
	        if (action) {
	            // Recycle the action if we've already scheduled one. All the production
	            // Scheduler Actions mutate their state/delay time and return themeselves.
	            // VirtualActions are immutable, so they create and return a clone. In this
	            // case, we need to set the action reference to the most recent VirtualAction,
	            // to ensure that's the one we clone from next time.
	            this.action = action.schedule(this, this.waitFor);
	        }
	        else {
	            this.add(this.action = this.scheduler.schedule(TimeoutSubscriber.dispatchTimeout, this.waitFor, this));
	        }
	    };
	    TimeoutSubscriber.prototype._next = function (value) {
	        if (!this.absoluteTimeout) {
	            this.scheduleTimeout();
	        }
	        _super.prototype._next.call(this, value);
	    };
	    TimeoutSubscriber.prototype._unsubscribe = function () {
	        this.action = null;
	        this.scheduler = null;
	        this.errorInstance = null;
	    };
	    return TimeoutSubscriber;
	}(Subscriber_1$52.Subscriber));


	var timeout_1$1 = {
		timeout: timeout_2
	};

	var Observable_1$152 = Observable_1$2;
	var timeout_1 = timeout_1$1;
	Observable_1$152.Observable.prototype.timeout = timeout_1.timeout;

	var __extends$115 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var async_1$12 = async;
	var isDate_1$5 = isDate_1$1;
	var OuterSubscriber_1$33 = OuterSubscriber_1$1;
	var subscribeToResult_1$33 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * @param due
	 * @param withObservable
	 * @param scheduler
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method timeoutWith
	 * @owner Observable
	 */
	function timeoutWith$2(due, withObservable, scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$12.async; }
	    var absoluteTimeout = isDate_1$5.isDate(due);
	    var waitFor = absoluteTimeout ? (+due - scheduler.now()) : Math.abs(due);
	    return this.lift(new TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler));
	}
	var timeoutWith_2 = timeoutWith$2;
	var TimeoutWithOperator = (function () {
	    function TimeoutWithOperator(waitFor, absoluteTimeout, withObservable, scheduler) {
	        this.waitFor = waitFor;
	        this.absoluteTimeout = absoluteTimeout;
	        this.withObservable = withObservable;
	        this.scheduler = scheduler;
	    }
	    TimeoutWithOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new TimeoutWithSubscriber(subscriber, this.absoluteTimeout, this.waitFor, this.withObservable, this.scheduler));
	    };
	    return TimeoutWithOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var TimeoutWithSubscriber = (function (_super) {
	    __extends$115(TimeoutWithSubscriber, _super);
	    function TimeoutWithSubscriber(destination, absoluteTimeout, waitFor, withObservable, scheduler) {
	        _super.call(this, destination);
	        this.absoluteTimeout = absoluteTimeout;
	        this.waitFor = waitFor;
	        this.withObservable = withObservable;
	        this.scheduler = scheduler;
	        this.action = null;
	        this.scheduleTimeout();
	    }
	    TimeoutWithSubscriber.dispatchTimeout = function (subscriber) {
	        var withObservable = subscriber.withObservable;
	        subscriber._unsubscribeAndRecycle();
	        subscriber.add(subscribeToResult_1$33.subscribeToResult(subscriber, withObservable));
	    };
	    TimeoutWithSubscriber.prototype.scheduleTimeout = function () {
	        var action = this.action;
	        if (action) {
	            // Recycle the action if we've already scheduled one. All the production
	            // Scheduler Actions mutate their state/delay time and return themeselves.
	            // VirtualActions are immutable, so they create and return a clone. In this
	            // case, we need to set the action reference to the most recent VirtualAction,
	            // to ensure that's the one we clone from next time.
	            this.action = action.schedule(this, this.waitFor);
	        }
	        else {
	            this.add(this.action = this.scheduler.schedule(TimeoutWithSubscriber.dispatchTimeout, this.waitFor, this));
	        }
	    };
	    TimeoutWithSubscriber.prototype._next = function (value) {
	        if (!this.absoluteTimeout) {
	            this.scheduleTimeout();
	        }
	        _super.prototype._next.call(this, value);
	    };
	    TimeoutWithSubscriber.prototype._unsubscribe = function () {
	        this.action = null;
	        this.scheduler = null;
	        this.withObservable = null;
	    };
	    return TimeoutWithSubscriber;
	}(OuterSubscriber_1$33.OuterSubscriber));


	var timeoutWith_1$1 = {
		timeoutWith: timeoutWith_2
	};

	var Observable_1$153 = Observable_1$2;
	var timeoutWith_1 = timeoutWith_1$1;
	Observable_1$153.Observable.prototype.timeoutWith = timeoutWith_1.timeoutWith;

	var __extends$116 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$53 = Subscriber_1$3;
	var async_1$13 = async;
	/**
	 * @param scheduler
	 * @return {Observable<Timestamp<any>>|WebSocketSubject<T>|Observable<T>}
	 * @method timestamp
	 * @owner Observable
	 */
	function timestamp$2(scheduler) {
	    if (scheduler === void 0) { scheduler = async_1$13.async; }
	    return this.lift(new TimestampOperator(scheduler));
	}
	var timestamp_2 = timestamp$2;
	var Timestamp$1 = (function () {
	    function Timestamp(value, timestamp) {
	        this.value = value;
	        this.timestamp = timestamp;
	    }
	    return Timestamp;
	}());
	var Timestamp_1 = Timestamp$1;

	var TimestampOperator = (function () {
	    function TimestampOperator(scheduler) {
	        this.scheduler = scheduler;
	    }
	    TimestampOperator.prototype.call = function (observer, source) {
	        return source.subscribe(new TimestampSubscriber(observer, this.scheduler));
	    };
	    return TimestampOperator;
	}());
	var TimestampSubscriber = (function (_super) {
	    __extends$116(TimestampSubscriber, _super);
	    function TimestampSubscriber(destination, scheduler) {
	        _super.call(this, destination);
	        this.scheduler = scheduler;
	    }
	    TimestampSubscriber.prototype._next = function (value) {
	        var now = this.scheduler.now();
	        this.destination.next(new Timestamp$1(value, now));
	    };
	    return TimestampSubscriber;
	}(Subscriber_1$53.Subscriber));


	var timestamp_1$2 = {
		timestamp: timestamp_2,
		Timestamp: Timestamp_1
	};

	var Observable_1$154 = Observable_1$2;
	var timestamp_1$1 = timestamp_1$2;
	Observable_1$154.Observable.prototype.timestamp = timestamp_1$1.timestamp;

	var __extends$117 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$54 = Subscriber_1$3;
	/**
	 * @return {Observable<any[]>|WebSocketSubject<T>|Observable<T>}
	 * @method toArray
	 * @owner Observable
	 */
	function toArray$2() {
	    return this.lift(new ToArrayOperator());
	}
	var toArray_2 = toArray$2;
	var ToArrayOperator = (function () {
	    function ToArrayOperator() {
	    }
	    ToArrayOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new ToArraySubscriber(subscriber));
	    };
	    return ToArrayOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ToArraySubscriber = (function (_super) {
	    __extends$117(ToArraySubscriber, _super);
	    function ToArraySubscriber(destination) {
	        _super.call(this, destination);
	        this.array = [];
	    }
	    ToArraySubscriber.prototype._next = function (x) {
	        this.array.push(x);
	    };
	    ToArraySubscriber.prototype._complete = function () {
	        this.destination.next(this.array);
	        this.destination.complete();
	    };
	    return ToArraySubscriber;
	}(Subscriber_1$54.Subscriber));


	var toArray_1$1 = {
		toArray: toArray_2
	};

	var Observable_1$155 = Observable_1$2;
	var toArray_1 = toArray_1$1;
	Observable_1$155.Observable.prototype.toArray = toArray_1.toArray;

	var root_1$12 = root$1;
	/* tslint:enable:max-line-length */
	/**
	 * Converts an Observable sequence to a ES2015 compliant promise.
	 *
	 * @example
	 * // Using normal ES2015
	 * let source = Rx.Observable
	 *   .of(42)
	 *   .toPromise();
	 *
	 * source.then((value) => console.log('Value: %s', value));
	 * // => Value: 42
	 *
	 * // Rejected Promise
	 * // Using normal ES2015
	 * let source = Rx.Observable
	 *   .throw(new Error('woops'))
	 *   .toPromise();
	 *
	 * source
	 *   .then((value) => console.log('Value: %s', value))
	 *   .catch((err) => console.log('Error: %s', err));
	 * // => Error: Error: woops
	 *
	 * // Setting via the config
	 * Rx.config.Promise = RSVP.Promise;
	 *
	 * let source = Rx.Observable
	 *   .of(42)
	 *   .toPromise();
	 *
	 * source.then((value) => console.log('Value: %s', value));
	 * // => Value: 42
	 *
	 * // Setting via the method
	 * let source = Rx.Observable
	 *   .of(42)
	 *   .toPromise(RSVP.Promise);
	 *
	 * source.then((value) => console.log('Value: %s', value));
	 * // => Value: 42
	 *
	 * @param {PromiseConstructor} [PromiseCtor] The constructor of the promise. If not provided,
	 * it will look for a constructor first in Rx.config.Promise then fall back to
	 * the native Promise constructor if available.
	 * @return {Promise<T>} An ES2015 compatible promise with the last value from
	 * the observable sequence.
	 * @method toPromise
	 * @owner Observable
	 */
	function toPromise$2(PromiseCtor) {
	    var _this = this;
	    if (!PromiseCtor) {
	        if (root_1$12.root.Rx && root_1$12.root.Rx.config && root_1$12.root.Rx.config.Promise) {
	            PromiseCtor = root_1$12.root.Rx.config.Promise;
	        }
	        else if (root_1$12.root.Promise) {
	            PromiseCtor = root_1$12.root.Promise;
	        }
	    }
	    if (!PromiseCtor) {
	        throw new Error('no Promise impl found');
	    }
	    return new PromiseCtor(function (resolve, reject) {
	        var value;
	        _this.subscribe(function (x) { return value = x; }, function (err) { return reject(err); }, function () { return resolve(value); });
	    });
	}
	var toPromise_2 = toPromise$2;


	var toPromise_1$1 = {
		toPromise: toPromise_2
	};

	var Observable_1$156 = Observable_1$2;
	var toPromise_1 = toPromise_1$1;
	Observable_1$156.Observable.prototype.toPromise = toPromise_1.toPromise;

	var __extends$118 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$13 = Subject_1$1;
	var OuterSubscriber_1$34 = OuterSubscriber_1$1;
	var subscribeToResult_1$34 = subscribeToResult_1$1;
	/**
	 * Branch out the source Observable values as a nested Observable whenever
	 * `windowBoundaries` emits.
	 *
	 * <span class="informal">It's like {@link buffer}, but emits a nested Observable
	 * instead of an array.</span>
	 *
	 * <img src="./img/window.png" width="100%">
	 *
	 * Returns an Observable that emits windows of items it collects from the source
	 * Observable. The output Observable emits connected, non-overlapping
	 * windows. It emits the current window and opens a new one whenever the
	 * Observable `windowBoundaries` emits an item. Because each window is an
	 * Observable, the output is a higher-order Observable.
	 *
	 * @example <caption>In every window of 1 second each, emit at most 2 click events</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var interval = Rx.Observable.interval(1000);
	 * var result = clicks.window(interval)
	 *   .map(win => win.take(2)) // each window has at most 2 emissions
	 *   .mergeAll(); // flatten the Observable-of-Observables
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link windowCount}
	 * @see {@link windowTime}
	 * @see {@link windowToggle}
	 * @see {@link windowWhen}
	 * @see {@link buffer}
	 *
	 * @param {Observable<any>} windowBoundaries An Observable that completes the
	 * previous window and starts a new window.
	 * @return {Observable<Observable<T>>} An Observable of windows, which are
	 * Observables emitting values of the source Observable.
	 * @method window
	 * @owner Observable
	 */
	function window$3(windowBoundaries) {
	    return this.lift(new WindowOperator(windowBoundaries));
	}
	var window_2 = window$3;
	var WindowOperator = (function () {
	    function WindowOperator(windowBoundaries) {
	        this.windowBoundaries = windowBoundaries;
	    }
	    WindowOperator.prototype.call = function (subscriber, source) {
	        var windowSubscriber = new WindowSubscriber(subscriber);
	        var sourceSubscription = source.subscribe(windowSubscriber);
	        if (!sourceSubscription.closed) {
	            windowSubscriber.add(subscribeToResult_1$34.subscribeToResult(windowSubscriber, this.windowBoundaries));
	        }
	        return sourceSubscription;
	    };
	    return WindowOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WindowSubscriber = (function (_super) {
	    __extends$118(WindowSubscriber, _super);
	    function WindowSubscriber(destination) {
	        _super.call(this, destination);
	        this.window = new Subject_1$13.Subject();
	        destination.next(this.window);
	    }
	    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.openWindow();
	    };
	    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
	        this._error(error);
	    };
	    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
	        this._complete();
	    };
	    WindowSubscriber.prototype._next = function (value) {
	        this.window.next(value);
	    };
	    WindowSubscriber.prototype._error = function (err) {
	        this.window.error(err);
	        this.destination.error(err);
	    };
	    WindowSubscriber.prototype._complete = function () {
	        this.window.complete();
	        this.destination.complete();
	    };
	    WindowSubscriber.prototype._unsubscribe = function () {
	        this.window = null;
	    };
	    WindowSubscriber.prototype.openWindow = function () {
	        var prevWindow = this.window;
	        if (prevWindow) {
	            prevWindow.complete();
	        }
	        var destination = this.destination;
	        var newWindow = this.window = new Subject_1$13.Subject();
	        destination.next(newWindow);
	    };
	    return WindowSubscriber;
	}(OuterSubscriber_1$34.OuterSubscriber));


	var window_1$1 = {
		window: window_2
	};

	var Observable_1$157 = Observable_1$2;
	var window_1 = window_1$1;
	Observable_1$157.Observable.prototype.window = window_1.window;

	var __extends$119 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subscriber_1$55 = Subscriber_1$3;
	var Subject_1$14 = Subject_1$1;
	/**
	 * Branch out the source Observable values as a nested Observable with each
	 * nested Observable emitting at most `windowSize` values.
	 *
	 * <span class="informal">It's like {@link bufferCount}, but emits a nested
	 * Observable instead of an array.</span>
	 *
	 * <img src="./img/windowCount.png" width="100%">
	 *
	 * Returns an Observable that emits windows of items it collects from the source
	 * Observable. The output Observable emits windows every `startWindowEvery`
	 * items, each containing no more than `windowSize` items. When the source
	 * Observable completes or encounters an error, the output Observable emits
	 * the current window and propagates the notification from the source
	 * Observable. If `startWindowEvery` is not provided, then new windows are
	 * started immediately at the start of the source and when each window completes
	 * with size `windowSize`.
	 *
	 * @example <caption>Ignore every 3rd click event, starting from the first one</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.windowCount(3)
	 *   .map(win => win.skip(1)) // skip first of every 3 clicks
	 *   .mergeAll(); // flatten the Observable-of-Observables
	 * result.subscribe(x => console.log(x));
	 *
	 * @example <caption>Ignore every 3rd click event, starting from the third one</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks.windowCount(2, 3)
	 *   .mergeAll(); // flatten the Observable-of-Observables
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link window}
	 * @see {@link windowTime}
	 * @see {@link windowToggle}
	 * @see {@link windowWhen}
	 * @see {@link bufferCount}
	 *
	 * @param {number} windowSize The maximum number of values emitted by each
	 * window.
	 * @param {number} [startWindowEvery] Interval at which to start a new window.
	 * For example if `startWindowEvery` is `2`, then a new window will be started
	 * on every other value from the source. A new window is started at the
	 * beginning of the source by default.
	 * @return {Observable<Observable<T>>} An Observable of windows, which in turn
	 * are Observable of values.
	 * @method windowCount
	 * @owner Observable
	 */
	function windowCount$2(windowSize, startWindowEvery) {
	    if (startWindowEvery === void 0) { startWindowEvery = 0; }
	    return this.lift(new WindowCountOperator(windowSize, startWindowEvery));
	}
	var windowCount_2 = windowCount$2;
	var WindowCountOperator = (function () {
	    function WindowCountOperator(windowSize, startWindowEvery) {
	        this.windowSize = windowSize;
	        this.startWindowEvery = startWindowEvery;
	    }
	    WindowCountOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new WindowCountSubscriber(subscriber, this.windowSize, this.startWindowEvery));
	    };
	    return WindowCountOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WindowCountSubscriber = (function (_super) {
	    __extends$119(WindowCountSubscriber, _super);
	    function WindowCountSubscriber(destination, windowSize, startWindowEvery) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.windowSize = windowSize;
	        this.startWindowEvery = startWindowEvery;
	        this.windows = [new Subject_1$14.Subject()];
	        this.count = 0;
	        destination.next(this.windows[0]);
	    }
	    WindowCountSubscriber.prototype._next = function (value) {
	        var startWindowEvery = (this.startWindowEvery > 0) ? this.startWindowEvery : this.windowSize;
	        var destination = this.destination;
	        var windowSize = this.windowSize;
	        var windows = this.windows;
	        var len = windows.length;
	        for (var i = 0; i < len && !this.closed; i++) {
	            windows[i].next(value);
	        }
	        var c = this.count - windowSize + 1;
	        if (c >= 0 && c % startWindowEvery === 0 && !this.closed) {
	            windows.shift().complete();
	        }
	        if (++this.count % startWindowEvery === 0 && !this.closed) {
	            var window_1 = new Subject_1$14.Subject();
	            windows.push(window_1);
	            destination.next(window_1);
	        }
	    };
	    WindowCountSubscriber.prototype._error = function (err) {
	        var windows = this.windows;
	        if (windows) {
	            while (windows.length > 0 && !this.closed) {
	                windows.shift().error(err);
	            }
	        }
	        this.destination.error(err);
	    };
	    WindowCountSubscriber.prototype._complete = function () {
	        var windows = this.windows;
	        if (windows) {
	            while (windows.length > 0 && !this.closed) {
	                windows.shift().complete();
	            }
	        }
	        this.destination.complete();
	    };
	    WindowCountSubscriber.prototype._unsubscribe = function () {
	        this.count = 0;
	        this.windows = null;
	    };
	    return WindowCountSubscriber;
	}(Subscriber_1$55.Subscriber));


	var windowCount_1$1 = {
		windowCount: windowCount_2
	};

	var Observable_1$158 = Observable_1$2;
	var windowCount_1 = windowCount_1$1;
	Observable_1$158.Observable.prototype.windowCount = windowCount_1.windowCount;

	var __extends$120 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$15 = Subject_1$1;
	var async_1$14 = async;
	var Subscriber_1$56 = Subscriber_1$3;
	var isNumeric_1$5 = isNumeric_1$1;
	var isScheduler_1$10 = isScheduler_1$1;
	function windowTime$2(windowTimeSpan) {
	    var scheduler = async_1$14.async;
	    var windowCreationInterval = null;
	    var maxWindowSize = Number.POSITIVE_INFINITY;
	    if (isScheduler_1$10.isScheduler(arguments[3])) {
	        scheduler = arguments[3];
	    }
	    if (isScheduler_1$10.isScheduler(arguments[2])) {
	        scheduler = arguments[2];
	    }
	    else if (isNumeric_1$5.isNumeric(arguments[2])) {
	        maxWindowSize = arguments[2];
	    }
	    if (isScheduler_1$10.isScheduler(arguments[1])) {
	        scheduler = arguments[1];
	    }
	    else if (isNumeric_1$5.isNumeric(arguments[1])) {
	        windowCreationInterval = arguments[1];
	    }
	    return this.lift(new WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler));
	}
	var windowTime_2 = windowTime$2;
	var WindowTimeOperator = (function () {
	    function WindowTimeOperator(windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
	        this.windowTimeSpan = windowTimeSpan;
	        this.windowCreationInterval = windowCreationInterval;
	        this.maxWindowSize = maxWindowSize;
	        this.scheduler = scheduler;
	    }
	    WindowTimeOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new WindowTimeSubscriber(subscriber, this.windowTimeSpan, this.windowCreationInterval, this.maxWindowSize, this.scheduler));
	    };
	    return WindowTimeOperator;
	}());
	var CountedSubject = (function (_super) {
	    __extends$120(CountedSubject, _super);
	    function CountedSubject() {
	        _super.apply(this, arguments);
	        this._numberOfNextedValues = 0;
	    }
	    CountedSubject.prototype.next = function (value) {
	        this._numberOfNextedValues++;
	        _super.prototype.next.call(this, value);
	    };
	    Object.defineProperty(CountedSubject.prototype, "numberOfNextedValues", {
	        get: function () {
	            return this._numberOfNextedValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CountedSubject;
	}(Subject_1$15.Subject));
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WindowTimeSubscriber = (function (_super) {
	    __extends$120(WindowTimeSubscriber, _super);
	    function WindowTimeSubscriber(destination, windowTimeSpan, windowCreationInterval, maxWindowSize, scheduler) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.windowTimeSpan = windowTimeSpan;
	        this.windowCreationInterval = windowCreationInterval;
	        this.maxWindowSize = maxWindowSize;
	        this.scheduler = scheduler;
	        this.windows = [];
	        var window = this.openWindow();
	        if (windowCreationInterval !== null && windowCreationInterval >= 0) {
	            var closeState = { subscriber: this, window: window, context: null };
	            var creationState = { windowTimeSpan: windowTimeSpan, windowCreationInterval: windowCreationInterval, subscriber: this, scheduler: scheduler };
	            this.add(scheduler.schedule(dispatchWindowClose, windowTimeSpan, closeState));
	            this.add(scheduler.schedule(dispatchWindowCreation, windowCreationInterval, creationState));
	        }
	        else {
	            var timeSpanOnlyState = { subscriber: this, window: window, windowTimeSpan: windowTimeSpan };
	            this.add(scheduler.schedule(dispatchWindowTimeSpanOnly, windowTimeSpan, timeSpanOnlyState));
	        }
	    }
	    WindowTimeSubscriber.prototype._next = function (value) {
	        var windows = this.windows;
	        var len = windows.length;
	        for (var i = 0; i < len; i++) {
	            var window_1 = windows[i];
	            if (!window_1.closed) {
	                window_1.next(value);
	                if (window_1.numberOfNextedValues >= this.maxWindowSize) {
	                    this.closeWindow(window_1);
	                }
	            }
	        }
	    };
	    WindowTimeSubscriber.prototype._error = function (err) {
	        var windows = this.windows;
	        while (windows.length > 0) {
	            windows.shift().error(err);
	        }
	        this.destination.error(err);
	    };
	    WindowTimeSubscriber.prototype._complete = function () {
	        var windows = this.windows;
	        while (windows.length > 0) {
	            var window_2 = windows.shift();
	            if (!window_2.closed) {
	                window_2.complete();
	            }
	        }
	        this.destination.complete();
	    };
	    WindowTimeSubscriber.prototype.openWindow = function () {
	        var window = new CountedSubject();
	        this.windows.push(window);
	        var destination = this.destination;
	        destination.next(window);
	        return window;
	    };
	    WindowTimeSubscriber.prototype.closeWindow = function (window) {
	        window.complete();
	        var windows = this.windows;
	        windows.splice(windows.indexOf(window), 1);
	    };
	    return WindowTimeSubscriber;
	}(Subscriber_1$56.Subscriber));
	function dispatchWindowTimeSpanOnly(state) {
	    var subscriber = state.subscriber, windowTimeSpan = state.windowTimeSpan, window = state.window;
	    if (window) {
	        subscriber.closeWindow(window);
	    }
	    state.window = subscriber.openWindow();
	    this.schedule(state, windowTimeSpan);
	}
	function dispatchWindowCreation(state) {
	    var windowTimeSpan = state.windowTimeSpan, subscriber = state.subscriber, scheduler = state.scheduler, windowCreationInterval = state.windowCreationInterval;
	    var window = subscriber.openWindow();
	    var action = this;
	    var context = { action: action, subscription: null };
	    var timeSpanState = { subscriber: subscriber, window: window, context: context };
	    context.subscription = scheduler.schedule(dispatchWindowClose, windowTimeSpan, timeSpanState);
	    action.add(context.subscription);
	    action.schedule(state, windowCreationInterval);
	}
	function dispatchWindowClose(state) {
	    var subscriber = state.subscriber, window = state.window, context = state.context;
	    if (context && context.action && context.subscription) {
	        context.action.remove(context.subscription);
	    }
	    subscriber.closeWindow(window);
	}


	var windowTime_1$1 = {
		windowTime: windowTime_2
	};

	var Observable_1$159 = Observable_1$2;
	var windowTime_1 = windowTime_1$1;
	Observable_1$159.Observable.prototype.windowTime = windowTime_1.windowTime;

	var __extends$121 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$16 = Subject_1$1;
	var Subscription_1$17 = Subscription_1$3;
	var tryCatch_1$16 = tryCatch_1$1;
	var errorObject_1$16 = errorObject;
	var OuterSubscriber_1$35 = OuterSubscriber_1$1;
	var subscribeToResult_1$35 = subscribeToResult_1$1;
	/**
	 * Branch out the source Observable values as a nested Observable starting from
	 * an emission from `openings` and ending when the output of `closingSelector`
	 * emits.
	 *
	 * <span class="informal">It's like {@link bufferToggle}, but emits a nested
	 * Observable instead of an array.</span>
	 *
	 * <img src="./img/windowToggle.png" width="100%">
	 *
	 * Returns an Observable that emits windows of items it collects from the source
	 * Observable. The output Observable emits windows that contain those items
	 * emitted by the source Observable between the time when the `openings`
	 * Observable emits an item and when the Observable returned by
	 * `closingSelector` emits an item.
	 *
	 * @example <caption>Every other second, emit the click events from the next 500ms</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var openings = Rx.Observable.interval(1000);
	 * var result = clicks.windowToggle(openings, i =>
	 *   i % 2 ? Rx.Observable.interval(500) : Rx.Observable.empty()
	 * ).mergeAll();
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link window}
	 * @see {@link windowCount}
	 * @see {@link windowTime}
	 * @see {@link windowWhen}
	 * @see {@link bufferToggle}
	 *
	 * @param {Observable<O>} openings An observable of notifications to start new
	 * windows.
	 * @param {function(value: O): Observable} closingSelector A function that takes
	 * the value emitted by the `openings` observable and returns an Observable,
	 * which, when it emits (either `next` or `complete`), signals that the
	 * associated window should complete.
	 * @return {Observable<Observable<T>>} An observable of windows, which in turn
	 * are Observables.
	 * @method windowToggle
	 * @owner Observable
	 */
	function windowToggle$2(openings, closingSelector) {
	    return this.lift(new WindowToggleOperator(openings, closingSelector));
	}
	var windowToggle_2 = windowToggle$2;
	var WindowToggleOperator = (function () {
	    function WindowToggleOperator(openings, closingSelector) {
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	    }
	    WindowToggleOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new WindowToggleSubscriber(subscriber, this.openings, this.closingSelector));
	    };
	    return WindowToggleOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WindowToggleSubscriber = (function (_super) {
	    __extends$121(WindowToggleSubscriber, _super);
	    function WindowToggleSubscriber(destination, openings, closingSelector) {
	        _super.call(this, destination);
	        this.openings = openings;
	        this.closingSelector = closingSelector;
	        this.contexts = [];
	        this.add(this.openSubscription = subscribeToResult_1$35.subscribeToResult(this, openings, openings));
	    }
	    WindowToggleSubscriber.prototype._next = function (value) {
	        var contexts = this.contexts;
	        if (contexts) {
	            var len = contexts.length;
	            for (var i = 0; i < len; i++) {
	                contexts[i].window.next(value);
	            }
	        }
	    };
	    WindowToggleSubscriber.prototype._error = function (err) {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.error(err);
	                context.subscription.unsubscribe();
	            }
	        }
	        _super.prototype._error.call(this, err);
	    };
	    WindowToggleSubscriber.prototype._complete = function () {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.complete();
	                context.subscription.unsubscribe();
	            }
	        }
	        _super.prototype._complete.call(this);
	    };
	    WindowToggleSubscriber.prototype._unsubscribe = function () {
	        var contexts = this.contexts;
	        this.contexts = null;
	        if (contexts) {
	            var len = contexts.length;
	            var index = -1;
	            while (++index < len) {
	                var context = contexts[index];
	                context.window.unsubscribe();
	                context.subscription.unsubscribe();
	            }
	        }
	    };
	    WindowToggleSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        if (outerValue === this.openings) {
	            var closingSelector = this.closingSelector;
	            var closingNotifier = tryCatch_1$16.tryCatch(closingSelector)(innerValue);
	            if (closingNotifier === errorObject_1$16.errorObject) {
	                return this.error(errorObject_1$16.errorObject.e);
	            }
	            else {
	                var window_1 = new Subject_1$16.Subject();
	                var subscription = new Subscription_1$17.Subscription();
	                var context = { window: window_1, subscription: subscription };
	                this.contexts.push(context);
	                var innerSubscription = subscribeToResult_1$35.subscribeToResult(this, closingNotifier, context);
	                if (innerSubscription.closed) {
	                    this.closeWindow(this.contexts.length - 1);
	                }
	                else {
	                    innerSubscription.context = context;
	                    subscription.add(innerSubscription);
	                }
	                this.destination.next(window_1);
	            }
	        }
	        else {
	            this.closeWindow(this.contexts.indexOf(outerValue));
	        }
	    };
	    WindowToggleSubscriber.prototype.notifyError = function (err) {
	        this.error(err);
	    };
	    WindowToggleSubscriber.prototype.notifyComplete = function (inner) {
	        if (inner !== this.openSubscription) {
	            this.closeWindow(this.contexts.indexOf(inner.context));
	        }
	    };
	    WindowToggleSubscriber.prototype.closeWindow = function (index) {
	        if (index === -1) {
	            return;
	        }
	        var contexts = this.contexts;
	        var context = contexts[index];
	        var window = context.window, subscription = context.subscription;
	        contexts.splice(index, 1);
	        window.complete();
	        subscription.unsubscribe();
	    };
	    return WindowToggleSubscriber;
	}(OuterSubscriber_1$35.OuterSubscriber));


	var windowToggle_1$1 = {
		windowToggle: windowToggle_2
	};

	var Observable_1$160 = Observable_1$2;
	var windowToggle_1 = windowToggle_1$1;
	Observable_1$160.Observable.prototype.windowToggle = windowToggle_1.windowToggle;

	var __extends$122 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$17 = Subject_1$1;
	var tryCatch_1$17 = tryCatch_1$1;
	var errorObject_1$17 = errorObject;
	var OuterSubscriber_1$36 = OuterSubscriber_1$1;
	var subscribeToResult_1$36 = subscribeToResult_1$1;
	/**
	 * Branch out the source Observable values as a nested Observable using a
	 * factory function of closing Observables to determine when to start a new
	 * window.
	 *
	 * <span class="informal">It's like {@link bufferWhen}, but emits a nested
	 * Observable instead of an array.</span>
	 *
	 * <img src="./img/windowWhen.png" width="100%">
	 *
	 * Returns an Observable that emits windows of items it collects from the source
	 * Observable. The output Observable emits connected, non-overlapping windows.
	 * It emits the current window and opens a new one whenever the Observable
	 * produced by the specified `closingSelector` function emits an item. The first
	 * window is opened immediately when subscribing to the output Observable.
	 *
	 * @example <caption>Emit only the first two clicks events in every window of [1-5] random seconds</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var result = clicks
	 *   .windowWhen(() => Rx.Observable.interval(1000 + Math.random() * 4000))
	 *   .map(win => win.take(2)) // each window has at most 2 emissions
	 *   .mergeAll(); // flatten the Observable-of-Observables
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link window}
	 * @see {@link windowCount}
	 * @see {@link windowTime}
	 * @see {@link windowToggle}
	 * @see {@link bufferWhen}
	 *
	 * @param {function(): Observable} closingSelector A function that takes no
	 * arguments and returns an Observable that signals (on either `next` or
	 * `complete`) when to close the previous window and start a new one.
	 * @return {Observable<Observable<T>>} An observable of windows, which in turn
	 * are Observables.
	 * @method windowWhen
	 * @owner Observable
	 */
	function windowWhen$2(closingSelector) {
	    return this.lift(new WindowOperator$1(closingSelector));
	}
	var windowWhen_2 = windowWhen$2;
	var WindowOperator$1 = (function () {
	    function WindowOperator(closingSelector) {
	        this.closingSelector = closingSelector;
	    }
	    WindowOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new WindowSubscriber$1(subscriber, this.closingSelector));
	    };
	    return WindowOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WindowSubscriber$1 = (function (_super) {
	    __extends$122(WindowSubscriber, _super);
	    function WindowSubscriber(destination, closingSelector) {
	        _super.call(this, destination);
	        this.destination = destination;
	        this.closingSelector = closingSelector;
	        this.openWindow();
	    }
	    WindowSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.openWindow(innerSub);
	    };
	    WindowSubscriber.prototype.notifyError = function (error, innerSub) {
	        this._error(error);
	    };
	    WindowSubscriber.prototype.notifyComplete = function (innerSub) {
	        this.openWindow(innerSub);
	    };
	    WindowSubscriber.prototype._next = function (value) {
	        this.window.next(value);
	    };
	    WindowSubscriber.prototype._error = function (err) {
	        this.window.error(err);
	        this.destination.error(err);
	        this.unsubscribeClosingNotification();
	    };
	    WindowSubscriber.prototype._complete = function () {
	        this.window.complete();
	        this.destination.complete();
	        this.unsubscribeClosingNotification();
	    };
	    WindowSubscriber.prototype.unsubscribeClosingNotification = function () {
	        if (this.closingNotification) {
	            this.closingNotification.unsubscribe();
	        }
	    };
	    WindowSubscriber.prototype.openWindow = function (innerSub) {
	        if (innerSub === void 0) { innerSub = null; }
	        if (innerSub) {
	            this.remove(innerSub);
	            innerSub.unsubscribe();
	        }
	        var prevWindow = this.window;
	        if (prevWindow) {
	            prevWindow.complete();
	        }
	        var window = this.window = new Subject_1$17.Subject();
	        this.destination.next(window);
	        var closingNotifier = tryCatch_1$17.tryCatch(this.closingSelector)();
	        if (closingNotifier === errorObject_1$17.errorObject) {
	            var err = errorObject_1$17.errorObject.e;
	            this.destination.error(err);
	            this.window.error(err);
	        }
	        else {
	            this.add(this.closingNotification = subscribeToResult_1$36.subscribeToResult(this, closingNotifier));
	        }
	    };
	    return WindowSubscriber;
	}(OuterSubscriber_1$36.OuterSubscriber));


	var windowWhen_1$1 = {
		windowWhen: windowWhen_2
	};

	var Observable_1$161 = Observable_1$2;
	var windowWhen_1 = windowWhen_1$1;
	Observable_1$161.Observable.prototype.windowWhen = windowWhen_1.windowWhen;

	var __extends$123 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var OuterSubscriber_1$37 = OuterSubscriber_1$1;
	var subscribeToResult_1$37 = subscribeToResult_1$1;
	/* tslint:enable:max-line-length */
	/**
	 * Combines the source Observable with other Observables to create an Observable
	 * whose values are calculated from the latest values of each, only when the
	 * source emits.
	 *
	 * <span class="informal">Whenever the source Observable emits a value, it
	 * computes a formula using that value plus the latest values from other input
	 * Observables, then emits the output of that formula.</span>
	 *
	 * <img src="./img/withLatestFrom.png" width="100%">
	 *
	 * `withLatestFrom` combines each value from the source Observable (the
	 * instance) with the latest values from the other input Observables only when
	 * the source emits a value, optionally using a `project` function to determine
	 * the value to be emitted on the output Observable. All input Observables must
	 * emit at least one value before the output Observable will emit a value.
	 *
	 * @example <caption>On every click event, emit an array with the latest timer event plus the click event</caption>
	 * var clicks = Rx.Observable.fromEvent(document, 'click');
	 * var timer = Rx.Observable.interval(1000);
	 * var result = clicks.withLatestFrom(timer);
	 * result.subscribe(x => console.log(x));
	 *
	 * @see {@link combineLatest}
	 *
	 * @param {ObservableInput} other An input Observable to combine with the source
	 * Observable. More than one input Observables may be given as argument.
	 * @param {Function} [project] Projection function for combining values
	 * together. Receives all values in order of the Observables passed, where the
	 * first parameter is a value from the source Observable. (e.g.
	 * `a.withLatestFrom(b, c, (a1, b1, c1) => a1 + b1 + c1)`). If this is not
	 * passed, arrays will be emitted on the output Observable.
	 * @return {Observable} An Observable of projected values from the most recent
	 * values from each input Observable, or an array of the most recent values from
	 * each input Observable.
	 * @method withLatestFrom
	 * @owner Observable
	 */
	function withLatestFrom$2() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    var project;
	    if (typeof args[args.length - 1] === 'function') {
	        project = args.pop();
	    }
	    var observables = args;
	    return this.lift(new WithLatestFromOperator(observables, project));
	}
	var withLatestFrom_2 = withLatestFrom$2;
	var WithLatestFromOperator = (function () {
	    function WithLatestFromOperator(observables, project) {
	        this.observables = observables;
	        this.project = project;
	    }
	    WithLatestFromOperator.prototype.call = function (subscriber, source) {
	        return source.subscribe(new WithLatestFromSubscriber(subscriber, this.observables, this.project));
	    };
	    return WithLatestFromOperator;
	}());
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var WithLatestFromSubscriber = (function (_super) {
	    __extends$123(WithLatestFromSubscriber, _super);
	    function WithLatestFromSubscriber(destination, observables, project) {
	        _super.call(this, destination);
	        this.observables = observables;
	        this.project = project;
	        this.toRespond = [];
	        var len = observables.length;
	        this.values = new Array(len);
	        for (var i = 0; i < len; i++) {
	            this.toRespond.push(i);
	        }
	        for (var i = 0; i < len; i++) {
	            var observable = observables[i];
	            this.add(subscribeToResult_1$37.subscribeToResult(this, observable, observable, i));
	        }
	    }
	    WithLatestFromSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
	        this.values[outerIndex] = innerValue;
	        var toRespond = this.toRespond;
	        if (toRespond.length > 0) {
	            var found = toRespond.indexOf(outerIndex);
	            if (found !== -1) {
	                toRespond.splice(found, 1);
	            }
	        }
	    };
	    WithLatestFromSubscriber.prototype.notifyComplete = function () {
	        // noop
	    };
	    WithLatestFromSubscriber.prototype._next = function (value) {
	        if (this.toRespond.length === 0) {
	            var args = [value].concat(this.values);
	            if (this.project) {
	                this._tryProject(args);
	            }
	            else {
	                this.destination.next(args);
	            }
	        }
	    };
	    WithLatestFromSubscriber.prototype._tryProject = function (args) {
	        var result;
	        try {
	            result = this.project.apply(this, args);
	        }
	        catch (err) {
	            this.destination.error(err);
	            return;
	        }
	        this.destination.next(result);
	    };
	    return WithLatestFromSubscriber;
	}(OuterSubscriber_1$37.OuterSubscriber));


	var withLatestFrom_1$1 = {
		withLatestFrom: withLatestFrom_2
	};

	var Observable_1$162 = Observable_1$2;
	var withLatestFrom_1 = withLatestFrom_1$1;
	Observable_1$162.Observable.prototype.withLatestFrom = withLatestFrom_1.withLatestFrom;

	var Observable_1$163 = Observable_1$2;
	var zip_1$2 = zip$4;
	Observable_1$163.Observable.prototype.zip = zip_1$2.zipProto;

	var zip_1$3 = zip$4;
	/**
	 * @param project
	 * @return {Observable<R>|WebSocketSubject<T>|Observable<T>}
	 * @method zipAll
	 * @owner Observable
	 */
	function zipAll$2(project) {
	    return this.lift(new zip_1$3.ZipOperator(project));
	}
	var zipAll_2 = zipAll$2;


	var zipAll_1$1 = {
		zipAll: zipAll_2
	};

	var Observable_1$164 = Observable_1$2;
	var zipAll_1 = zipAll_1$1;
	Observable_1$164.Observable.prototype.zipAll = zipAll_1.zipAll;

	var SubscriptionLog = (function () {
	    function SubscriptionLog(subscribedFrame, unsubscribedFrame) {
	        if (unsubscribedFrame === void 0) { unsubscribedFrame = Number.POSITIVE_INFINITY; }
	        this.subscribedFrame = subscribedFrame;
	        this.unsubscribedFrame = unsubscribedFrame;
	    }
	    return SubscriptionLog;
	}());
	var SubscriptionLog_2 = SubscriptionLog;


	var SubscriptionLog_1$2 = {
		SubscriptionLog: SubscriptionLog_2
	};

	var SubscriptionLog_1$1 = SubscriptionLog_1$2;
	var SubscriptionLoggable = (function () {
	    function SubscriptionLoggable() {
	        this.subscriptions = [];
	    }
	    SubscriptionLoggable.prototype.logSubscribedFrame = function () {
	        this.subscriptions.push(new SubscriptionLog_1$1.SubscriptionLog(this.scheduler.now()));
	        return this.subscriptions.length - 1;
	    };
	    SubscriptionLoggable.prototype.logUnsubscribedFrame = function (index) {
	        var subscriptionLogs = this.subscriptions;
	        var oldSubscriptionLog = subscriptionLogs[index];
	        subscriptionLogs[index] = new SubscriptionLog_1$1.SubscriptionLog(oldSubscriptionLog.subscribedFrame, this.scheduler.now());
	    };
	    return SubscriptionLoggable;
	}());
	var SubscriptionLoggable_2 = SubscriptionLoggable;


	var SubscriptionLoggable_1$1 = {
		SubscriptionLoggable: SubscriptionLoggable_2
	};

	function applyMixins(derivedCtor, baseCtors) {
	    for (var i = 0, len = baseCtors.length; i < len; i++) {
	        var baseCtor = baseCtors[i];
	        var propertyKeys = Object.getOwnPropertyNames(baseCtor.prototype);
	        for (var j = 0, len2 = propertyKeys.length; j < len2; j++) {
	            var name_1 = propertyKeys[j];
	            derivedCtor.prototype[name_1] = baseCtor.prototype[name_1];
	        }
	    }
	}
	var applyMixins_2 = applyMixins;


	var applyMixins_1$1 = {
		applyMixins: applyMixins_2
	};

	var __extends$125 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$166 = Observable_1$2;
	var Subscription_1$18 = Subscription_1$3;
	var SubscriptionLoggable_1 = SubscriptionLoggable_1$1;
	var applyMixins_1 = applyMixins_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var ColdObservable = (function (_super) {
	    __extends$125(ColdObservable, _super);
	    function ColdObservable(messages, scheduler) {
	        _super.call(this, function (subscriber) {
	            var observable = this;
	            var index = observable.logSubscribedFrame();
	            subscriber.add(new Subscription_1$18.Subscription(function () {
	                observable.logUnsubscribedFrame(index);
	            }));
	            observable.scheduleMessages(subscriber);
	            return subscriber;
	        });
	        this.messages = messages;
	        this.subscriptions = [];
	        this.scheduler = scheduler;
	    }
	    ColdObservable.prototype.scheduleMessages = function (subscriber) {
	        var messagesLength = this.messages.length;
	        for (var i = 0; i < messagesLength; i++) {
	            var message = this.messages[i];
	            subscriber.add(this.scheduler.schedule(function (_a) {
	                var message = _a.message, subscriber = _a.subscriber;
	                message.notification.observe(subscriber);
	            }, message.frame, { message: message, subscriber: subscriber }));
	        }
	    };
	    return ColdObservable;
	}(Observable_1$166.Observable));
	var ColdObservable_2 = ColdObservable;
	applyMixins_1.applyMixins(ColdObservable, [SubscriptionLoggable_1.SubscriptionLoggable]);


	var ColdObservable_1$1 = {
		ColdObservable: ColdObservable_2
	};

	var __extends$126 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1$18 = Subject_1$1;
	var Subscription_1$19 = Subscription_1$3;
	var SubscriptionLoggable_1$3 = SubscriptionLoggable_1$1;
	var applyMixins_1$3 = applyMixins_1$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var HotObservable = (function (_super) {
	    __extends$126(HotObservable, _super);
	    function HotObservable(messages, scheduler) {
	        _super.call(this);
	        this.messages = messages;
	        this.subscriptions = [];
	        this.scheduler = scheduler;
	    }
	    HotObservable.prototype._subscribe = function (subscriber) {
	        var subject = this;
	        var index = subject.logSubscribedFrame();
	        subscriber.add(new Subscription_1$19.Subscription(function () {
	            subject.logUnsubscribedFrame(index);
	        }));
	        return _super.prototype._subscribe.call(this, subscriber);
	    };
	    HotObservable.prototype.setup = function () {
	        var subject = this;
	        var messagesLength = subject.messages.length;
	        /* tslint:disable:no-var-keyword */
	        for (var i = 0; i < messagesLength; i++) {
	            (function () {
	                var message = subject.messages[i];
	                /* tslint:enable */
	                subject.scheduler.schedule(function () { message.notification.observe(subject); }, message.frame);
	            })();
	        }
	    };
	    return HotObservable;
	}(Subject_1$18.Subject));
	var HotObservable_2 = HotObservable;
	applyMixins_1$3.applyMixins(HotObservable, [SubscriptionLoggable_1$3.SubscriptionLoggable]);


	var HotObservable_1$1 = {
		HotObservable: HotObservable_2
	};

	var __extends$127 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncAction_1$5 = AsyncAction_1$1;
	var AsyncScheduler_1$5 = AsyncScheduler_1$1;
	var VirtualTimeScheduler$1 = (function (_super) {
	    __extends$127(VirtualTimeScheduler, _super);
	    function VirtualTimeScheduler(SchedulerAction, maxFrames) {
	        var _this = this;
	        if (SchedulerAction === void 0) { SchedulerAction = VirtualAction; }
	        if (maxFrames === void 0) { maxFrames = Number.POSITIVE_INFINITY; }
	        _super.call(this, SchedulerAction, function () { return _this.frame; });
	        this.maxFrames = maxFrames;
	        this.frame = 0;
	        this.index = -1;
	    }
	    /**
	     * Prompt the Scheduler to execute all of its queued actions, therefore
	     * clearing its queue.
	     * @return {void}
	     */
	    VirtualTimeScheduler.prototype.flush = function () {
	        var _a = this, actions = _a.actions, maxFrames = _a.maxFrames;
	        var error, action;
	        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        }
	        if (error) {
	            while (action = actions.shift()) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    VirtualTimeScheduler.frameTimeFactor = 10;
	    return VirtualTimeScheduler;
	}(AsyncScheduler_1$5.AsyncScheduler));
	var VirtualTimeScheduler_2 = VirtualTimeScheduler$1;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var VirtualAction = (function (_super) {
	    __extends$127(VirtualAction, _super);
	    function VirtualAction(scheduler, work, index) {
	        if (index === void 0) { index = scheduler.index += 1; }
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	        this.index = index;
	        this.active = true;
	        this.index = scheduler.index = index;
	    }
	    VirtualAction.prototype.schedule = function (state, delay) {
	        if (delay === void 0) { delay = 0; }
	        if (!this.id) {
	            return _super.prototype.schedule.call(this, state, delay);
	        }
	        this.active = false;
	        // If an action is rescheduled, we save allocations by mutating its state,
	        // pushing it to the end of the scheduler queue, and recycling the action.
	        // But since the VirtualTimeScheduler is used for testing, VirtualActions
	        // must be immutable so they can be inspected later.
	        var action = new VirtualAction(this.scheduler, this.work);
	        this.add(action);
	        return action.schedule(state, delay);
	    };
	    VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        this.delay = scheduler.frame + delay;
	        var actions = scheduler.actions;
	        actions.push(this);
	        actions.sort(VirtualAction.sortActions);
	        return true;
	    };
	    VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        return undefined;
	    };
	    VirtualAction.prototype._execute = function (state, delay) {
	        if (this.active === true) {
	            return _super.prototype._execute.call(this, state, delay);
	        }
	    };
	    VirtualAction.sortActions = function (a, b) {
	        if (a.delay === b.delay) {
	            if (a.index === b.index) {
	                return 0;
	            }
	            else if (a.index > b.index) {
	                return 1;
	            }
	            else {
	                return -1;
	            }
	        }
	        else if (a.delay > b.delay) {
	            return 1;
	        }
	        else {
	            return -1;
	        }
	    };
	    return VirtualAction;
	}(AsyncAction_1$5.AsyncAction));
	var VirtualAction_1 = VirtualAction;


	var VirtualTimeScheduler_1$2 = {
		VirtualTimeScheduler: VirtualTimeScheduler_2,
		VirtualAction: VirtualAction_1
	};

	var __extends$124 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Observable_1$165 = Observable_1$2;
	var Notification_1$6 = Notification_1$2;
	var ColdObservable_1 = ColdObservable_1$1;
	var HotObservable_1 = HotObservable_1$1;
	var SubscriptionLog_1 = SubscriptionLog_1$2;
	var VirtualTimeScheduler_1$1 = VirtualTimeScheduler_1$2;
	var defaultMaxFrame = 750;
	var TestScheduler$1 = (function (_super) {
	    __extends$124(TestScheduler, _super);
	    function TestScheduler(assertDeepEqual) {
	        _super.call(this, VirtualTimeScheduler_1$1.VirtualAction, defaultMaxFrame);
	        this.assertDeepEqual = assertDeepEqual;
	        this.hotObservables = [];
	        this.coldObservables = [];
	        this.flushTests = [];
	    }
	    TestScheduler.prototype.createTime = function (marbles) {
	        var indexOf = marbles.indexOf('|');
	        if (indexOf === -1) {
	            throw new Error('marble diagram for time should have a completion marker "|"');
	        }
	        return indexOf * TestScheduler.frameTimeFactor;
	    };
	    TestScheduler.prototype.createColdObservable = function (marbles, values, error) {
	        if (marbles.indexOf('^') !== -1) {
	            throw new Error('cold observable cannot have subscription offset "^"');
	        }
	        if (marbles.indexOf('!') !== -1) {
	            throw new Error('cold observable cannot have unsubscription marker "!"');
	        }
	        var messages = TestScheduler.parseMarbles(marbles, values, error);
	        var cold = new ColdObservable_1.ColdObservable(messages, this);
	        this.coldObservables.push(cold);
	        return cold;
	    };
	    TestScheduler.prototype.createHotObservable = function (marbles, values, error) {
	        if (marbles.indexOf('!') !== -1) {
	            throw new Error('hot observable cannot have unsubscription marker "!"');
	        }
	        var messages = TestScheduler.parseMarbles(marbles, values, error);
	        var subject = new HotObservable_1.HotObservable(messages, this);
	        this.hotObservables.push(subject);
	        return subject;
	    };
	    TestScheduler.prototype.materializeInnerObservable = function (observable, outerFrame) {
	        var _this = this;
	        var messages = [];
	        observable.subscribe(function (value) {
	            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1$6.Notification.createNext(value) });
	        }, function (err) {
	            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1$6.Notification.createError(err) });
	        }, function () {
	            messages.push({ frame: _this.frame - outerFrame, notification: Notification_1$6.Notification.createComplete() });
	        });
	        return messages;
	    };
	    TestScheduler.prototype.expectObservable = function (observable, unsubscriptionMarbles) {
	        var _this = this;
	        if (unsubscriptionMarbles === void 0) { unsubscriptionMarbles = null; }
	        var actual = [];
	        var flushTest = { actual: actual, ready: false };
	        var unsubscriptionFrame = TestScheduler
	            .parseMarblesAsSubscriptions(unsubscriptionMarbles).unsubscribedFrame;
	        var subscription;
	        this.schedule(function () {
	            subscription = observable.subscribe(function (x) {
	                var value = x;
	                // Support Observable-of-Observables
	                if (x instanceof Observable_1$165.Observable) {
	                    value = _this.materializeInnerObservable(value, _this.frame);
	                }
	                actual.push({ frame: _this.frame, notification: Notification_1$6.Notification.createNext(value) });
	            }, function (err) {
	                actual.push({ frame: _this.frame, notification: Notification_1$6.Notification.createError(err) });
	            }, function () {
	                actual.push({ frame: _this.frame, notification: Notification_1$6.Notification.createComplete() });
	            });
	        }, 0);
	        if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
	            this.schedule(function () { return subscription.unsubscribe(); }, unsubscriptionFrame);
	        }
	        this.flushTests.push(flushTest);
	        return {
	            toBe: function (marbles, values, errorValue) {
	                flushTest.ready = true;
	                flushTest.expected = TestScheduler.parseMarbles(marbles, values, errorValue, true);
	            }
	        };
	    };
	    TestScheduler.prototype.expectSubscriptions = function (actualSubscriptionLogs) {
	        var flushTest = { actual: actualSubscriptionLogs, ready: false };
	        this.flushTests.push(flushTest);
	        return {
	            toBe: function (marbles) {
	                var marblesArray = (typeof marbles === 'string') ? [marbles] : marbles;
	                flushTest.ready = true;
	                flushTest.expected = marblesArray.map(function (marbles) {
	                    return TestScheduler.parseMarblesAsSubscriptions(marbles);
	                });
	            }
	        };
	    };
	    TestScheduler.prototype.flush = function () {
	        var hotObservables = this.hotObservables;
	        while (hotObservables.length > 0) {
	            hotObservables.shift().setup();
	        }
	        _super.prototype.flush.call(this);
	        var readyFlushTests = this.flushTests.filter(function (test) { return test.ready; });
	        while (readyFlushTests.length > 0) {
	            var test = readyFlushTests.shift();
	            this.assertDeepEqual(test.actual, test.expected);
	        }
	    };
	    TestScheduler.parseMarblesAsSubscriptions = function (marbles) {
	        if (typeof marbles !== 'string') {
	            return new SubscriptionLog_1.SubscriptionLog(Number.POSITIVE_INFINITY);
	        }
	        var len = marbles.length;
	        var groupStart = -1;
	        var subscriptionFrame = Number.POSITIVE_INFINITY;
	        var unsubscriptionFrame = Number.POSITIVE_INFINITY;
	        for (var i = 0; i < len; i++) {
	            var frame = i * this.frameTimeFactor;
	            var c = marbles[i];
	            switch (c) {
	                case '-':
	                case ' ':
	                    break;
	                case '(':
	                    groupStart = frame;
	                    break;
	                case ')':
	                    groupStart = -1;
	                    break;
	                case '^':
	                    if (subscriptionFrame !== Number.POSITIVE_INFINITY) {
	                        throw new Error('found a second subscription point \'^\' in a ' +
	                            'subscription marble diagram. There can only be one.');
	                    }
	                    subscriptionFrame = groupStart > -1 ? groupStart : frame;
	                    break;
	                case '!':
	                    if (unsubscriptionFrame !== Number.POSITIVE_INFINITY) {
	                        throw new Error('found a second subscription point \'^\' in a ' +
	                            'subscription marble diagram. There can only be one.');
	                    }
	                    unsubscriptionFrame = groupStart > -1 ? groupStart : frame;
	                    break;
	                default:
	                    throw new Error('there can only be \'^\' and \'!\' markers in a ' +
	                        'subscription marble diagram. Found instead \'' + c + '\'.');
	            }
	        }
	        if (unsubscriptionFrame < 0) {
	            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame);
	        }
	        else {
	            return new SubscriptionLog_1.SubscriptionLog(subscriptionFrame, unsubscriptionFrame);
	        }
	    };
	    TestScheduler.parseMarbles = function (marbles, values, errorValue, materializeInnerObservables) {
	        if (materializeInnerObservables === void 0) { materializeInnerObservables = false; }
	        if (marbles.indexOf('!') !== -1) {
	            throw new Error('conventional marble diagrams cannot have the ' +
	                'unsubscription marker "!"');
	        }
	        var len = marbles.length;
	        var testMessages = [];
	        var subIndex = marbles.indexOf('^');
	        var frameOffset = subIndex === -1 ? 0 : (subIndex * -this.frameTimeFactor);
	        var getValue = typeof values !== 'object' ?
	            function (x) { return x; } :
	            function (x) {
	                // Support Observable-of-Observables
	                if (materializeInnerObservables && values[x] instanceof ColdObservable_1.ColdObservable) {
	                    return values[x].messages;
	                }
	                return values[x];
	            };
	        var groupStart = -1;
	        for (var i = 0; i < len; i++) {
	            var frame = i * this.frameTimeFactor + frameOffset;
	            var notification = void 0;
	            var c = marbles[i];
	            switch (c) {
	                case '-':
	                case ' ':
	                    break;
	                case '(':
	                    groupStart = frame;
	                    break;
	                case ')':
	                    groupStart = -1;
	                    break;
	                case '|':
	                    notification = Notification_1$6.Notification.createComplete();
	                    break;
	                case '^':
	                    break;
	                case '#':
	                    notification = Notification_1$6.Notification.createError(errorValue || 'error');
	                    break;
	                default:
	                    notification = Notification_1$6.Notification.createNext(getValue(c));
	                    break;
	            }
	            if (notification) {
	                testMessages.push({ frame: groupStart > -1 ? groupStart : frame, notification: notification });
	            }
	        }
	        return testMessages;
	    };
	    return TestScheduler;
	}(VirtualTimeScheduler_1$1.VirtualTimeScheduler));

	var root_1$13 = root$1;
	var RequestAnimationFrameDefinition = (function () {
	    function RequestAnimationFrameDefinition(root) {
	        if (root.requestAnimationFrame) {
	            this.cancelAnimationFrame = root.cancelAnimationFrame.bind(root);
	            this.requestAnimationFrame = root.requestAnimationFrame.bind(root);
	        }
	        else if (root.mozRequestAnimationFrame) {
	            this.cancelAnimationFrame = root.mozCancelAnimationFrame.bind(root);
	            this.requestAnimationFrame = root.mozRequestAnimationFrame.bind(root);
	        }
	        else if (root.webkitRequestAnimationFrame) {
	            this.cancelAnimationFrame = root.webkitCancelAnimationFrame.bind(root);
	            this.requestAnimationFrame = root.webkitRequestAnimationFrame.bind(root);
	        }
	        else if (root.msRequestAnimationFrame) {
	            this.cancelAnimationFrame = root.msCancelAnimationFrame.bind(root);
	            this.requestAnimationFrame = root.msRequestAnimationFrame.bind(root);
	        }
	        else if (root.oRequestAnimationFrame) {
	            this.cancelAnimationFrame = root.oCancelAnimationFrame.bind(root);
	            this.requestAnimationFrame = root.oRequestAnimationFrame.bind(root);
	        }
	        else {
	            this.cancelAnimationFrame = root.clearTimeout.bind(root);
	            this.requestAnimationFrame = function (cb) { return root.setTimeout(cb, 1000 / 60); };
	        }
	    }
	    return RequestAnimationFrameDefinition;
	}());
	var RequestAnimationFrameDefinition_1 = RequestAnimationFrameDefinition;
	var AnimationFrame_1$1 = new RequestAnimationFrameDefinition(root_1$13.root);


	var AnimationFrame = {
		RequestAnimationFrameDefinition: RequestAnimationFrameDefinition_1,
		AnimationFrame: AnimationFrame_1$1
	};

	var __extends$128 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncAction_1$6 = AsyncAction_1$1;
	var AnimationFrame_1 = AnimationFrame;
	/**
	 * We need this JSDoc comment for affecting ESDoc.
	 * @ignore
	 * @extends {Ignored}
	 */
	var AnimationFrameAction = (function (_super) {
	    __extends$128(AnimationFrameAction, _super);
	    function AnimationFrameAction(scheduler, work) {
	        _super.call(this, scheduler, work);
	        this.scheduler = scheduler;
	        this.work = work;
	    }
	    AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If delay is greater than 0, request as an async action.
	        if (delay !== null && delay > 0) {
	            return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
	        }
	        // Push the action to the end of the scheduler queue.
	        scheduler.actions.push(this);
	        // If an animation frame has already been requested, don't request another
	        // one. If an animation frame hasn't been requested yet, request one. Return
	        // the current animation frame request id.
	        return scheduler.scheduled || (scheduler.scheduled = AnimationFrame_1.AnimationFrame.requestAnimationFrame(scheduler.flush.bind(scheduler, null)));
	    };
	    AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
	        if (delay === void 0) { delay = 0; }
	        // If delay exists and is greater than 0, or if the delay is null (the
	        // action wasn't rescheduled) but was originally scheduled as an async
	        // action, then recycle as an async action.
	        if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
	            return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
	        }
	        // If the scheduler queue is empty, cancel the requested animation frame and
	        // set the scheduled flag to undefined so the next AnimationFrameAction will
	        // request its own.
	        if (scheduler.actions.length === 0) {
	            AnimationFrame_1.AnimationFrame.cancelAnimationFrame(id);
	            scheduler.scheduled = undefined;
	        }
	        // Return undefined so the action knows to request a new async id if it's rescheduled.
	        return undefined;
	    };
	    return AnimationFrameAction;
	}(AsyncAction_1$6.AsyncAction));
	var AnimationFrameAction_2 = AnimationFrameAction;


	var AnimationFrameAction_1$1 = {
		AnimationFrameAction: AnimationFrameAction_2
	};

	var __extends$129 = (commonjsGlobal && commonjsGlobal.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AsyncScheduler_1$6 = AsyncScheduler_1$1;
	var AnimationFrameScheduler = (function (_super) {
	    __extends$129(AnimationFrameScheduler, _super);
	    function AnimationFrameScheduler() {
	        _super.apply(this, arguments);
	    }
	    AnimationFrameScheduler.prototype.flush = function (action) {
	        this.active = true;
	        this.scheduled = undefined;
	        var actions = this.actions;
	        var error;
	        var index = -1;
	        var count = actions.length;
	        action = action || actions.shift();
	        do {
	            if (error = action.execute(action.state, action.delay)) {
	                break;
	            }
	        } while (++index < count && (action = actions.shift()));
	        this.active = false;
	        if (error) {
	            while (++index < count && (action = actions.shift())) {
	                action.unsubscribe();
	            }
	            throw error;
	        }
	    };
	    return AnimationFrameScheduler;
	}(AsyncScheduler_1$6.AsyncScheduler));
	var AnimationFrameScheduler_2 = AnimationFrameScheduler;


	var AnimationFrameScheduler_1$1 = {
		AnimationFrameScheduler: AnimationFrameScheduler_2
	};

	var AnimationFrameAction_1 = AnimationFrameAction_1$1;
	var AnimationFrameScheduler_1 = AnimationFrameScheduler_1$1;
	/**
	 *
	 * Animation Frame Scheduler
	 *
	 * <span class="informal">Perform task when `window.requestAnimationFrame` would fire</span>
	 *
	 * When `animationFrame` scheduler is used with delay, it will fall back to {@link async} scheduler
	 * behaviour.
	 *
	 * Without delay, `animationFrame` scheduler can be used to create smooth browser animations.
	 * It makes sure scheduled task will happen just before next browser content repaint,
	 * thus performing animations as efficiently as possible.
	 *
	 * @example <caption>Schedule div height animation</caption>
	 * const div = document.querySelector('.some-div');
	 *
	 * Rx.Scheduler.schedule(function(height) {
	 *   div.style.height = height + "px";
	 *
	 *   this.schedule(height + 1);  // `this` references currently executing Action,
	 *                               // which we reschedule with new state
	 * }, 0, 0);
	 *
	 * // You will see .some-div element growing in height
	 *
	 *
	 * @static true
	 * @name animationFrame
	 * @owner Scheduler
	 */
	var animationFrame_1$1 = new AnimationFrameScheduler_1.AnimationFrameScheduler(AnimationFrameAction_1.AnimationFrameAction);

	/* tslint:enable:no-unused-variable */
	var Observable_1 = Observable_1$2;
	var Observable = Observable_1.Observable;

	var MaterialLoader = (function () {
	    function MaterialLoader() {
	        this.materials = new Collection$1();
	    }
	    MaterialLoader.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    MaterialLoader.prototype.convert = function (result, fileContent) {
	        var _this = this;
	        return Observable.create(function (observer) {
	            var materials = {};
	            _this._convertMaterial(fileContent);
	            _this.materials.forEach(function (material) {
	                var materialData = {}, valueData = {};
	                if (material.opacity != void 0) {
	                    if (material.opacity < 1) {
	                        materialData.transparent = true;
	                    }
	                    else {
	                        materialData.transparent = false;
	                    }
	                    materialData.transparency = material.opacity;
	                }
	                _this._addData(valueData, "diffuse", material.diffuseColor);
	                _this._addData(valueData, "specular", material.specularColor);
	                _this._addData(valueData, "emission", material.emissionColor);
	                _this._addData(valueData, "shininess", material.shininess);
	                materialData.values = valueData;
	                materials[material.name] = materialData;
	            });
	            result.materials = materials;
	            observer.next(result);
	        });
	    };
	    MaterialLoader.prototype._addData = function (valueData, key, data) {
	        if (!!data) {
	            valueData[key] = data;
	        }
	    };
	    MaterialLoader.prototype._convertMaterial = function (fileContent) {
	        var _this = this;
	        var DELIMITER_PATTERN = /\s+/;
	        var lines = fileContent.split("\n");
	        lines.forEach(function (line, i) {
	            var pos = line.indexOf(" ");
	            var key = _this._parseKey(line, pos);
	            var value = _this._parseValue(line, pos);
	            if (line.length === 0 || key == "#" || line == '')
	                return;
	            if (key == "newmtl") {
	                _this._currentMaterial = MaterialModel.create();
	                _this._currentMaterial.name = value;
	                _this.materials.addChild(_this._currentMaterial);
	            }
	            else if (key == "kd") {
	                _this._setColor("diffuseColor", value.split(DELIMITER_PATTERN, 3));
	            }
	            else if (key == "ka") {
	            }
	            else if (key === "ks") {
	                _this._setColor("specularColor", value.split(DELIMITER_PATTERN, 3));
	            }
	            else if (key === "ke") {
	                _this._setColor("emissionColor", value.split(DELIMITER_PATTERN, 3));
	            }
	            else if (key === "ni") {
	            }
	            else if (key === "ns") {
	                _this._currentMaterial.shininess = parseFloat(value);
	            }
	            else if (key === "d") {
	                _this._currentMaterial.opacity = parseFloat(value);
	            }
	            else if (key === "map_ka") {
	            }
	            else if (key === "map_kd") {
	                _this._currentMaterial.diffuseMapUrl = value;
	            }
	            else if (key === "map_ks") {
	                _this._currentMaterial.specularMapUrl = value;
	            }
	            else if (key === "map_ke") {
	                _this._currentMaterial.emissionMapUrl = value;
	            }
	            else if (key === "map_bump") {
	                _this._currentMaterial.bumpMapUrl = value;
	            }
	            else if (key === "map_d") {
	            }
	            else if (key === "illum") {
	            }
	            else {
	                console.log("Unhandled expression at line : " + (i + 1) + "\nvalue:" + line);
	            }
	        });
	    };
	    MaterialLoader.prototype._setColor = function (colorType, colorStrArr) {
	        this._currentMaterial[colorType] = colorStrArr;
	    };
	    MaterialLoader.prototype._parseKey = function (line, pos) {
	        return line.slice(0, pos).toLowerCase();
	    };
	    MaterialLoader.prototype._parseValue = function (line, pos) {
	        return line.slice(pos + 1);
	    };
	    return MaterialLoader;
	}());
	var MaterialModel = (function () {
	    function MaterialModel() {
	        this.name = null;
	        this.diffuseColor = null;
	        this.specularColor = null;
	        this.emissionColor = null;
	        this.opacity = null;
	        this.shininess = null;
	        this.diffuseMapUrl = null;
	        this.specularMapUrl = null;
	        this.emissionMapUrl = null;
	        this.bumpMapUrl = null;
	    }
	    MaterialModel.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    return MaterialModel;
	}());

	var rsvp = createCommonjsModule(function (module, exports) {
	/*!
	 * @overview RSVP - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
	 * @version   3.5.0
	 */

	(function (global, factory) {
		factory(exports);
	}(commonjsGlobal, (function (exports) { 'use strict';

	function indexOf(callbacks, callback) {
	  for (var i = 0, l = callbacks.length; i < l; i++) {
	    if (callbacks[i] === callback) {
	      return i;
	    }
	  }

	  return -1;
	}

	function callbacksFor(object) {
	  var callbacks = object._promiseCallbacks;

	  if (!callbacks) {
	    callbacks = object._promiseCallbacks = {};
	  }

	  return callbacks;
	}

	/**
	  @class RSVP.EventTarget
	*/
	var EventTarget = {

	  /**
	    `RSVP.EventTarget.mixin` extends an object with EventTarget methods. For
	    Example:
	     ```javascript
	    let object = {};
	     RSVP.EventTarget.mixin(object);
	     object.on('finished', function(event) {
	      // handle event
	    });
	     object.trigger('finished', { detail: value });
	    ```
	     `EventTarget.mixin` also works with prototypes:
	     ```javascript
	    let Person = function() {};
	    RSVP.EventTarget.mixin(Person.prototype);
	     let yehuda = new Person();
	    let tom = new Person();
	     yehuda.on('poke', function(event) {
	      console.log('Yehuda says OW');
	    });
	     tom.on('poke', function(event) {
	      console.log('Tom says OW');
	    });
	     yehuda.trigger('poke');
	    tom.trigger('poke');
	    ```
	     @method mixin
	    @for RSVP.EventTarget
	    @private
	    @param {Object} object object to extend with EventTarget methods
	  */
	  mixin: function mixin(object) {
	    object['on'] = this['on'];
	    object['off'] = this['off'];
	    object['trigger'] = this['trigger'];
	    object._promiseCallbacks = undefined;
	    return object;
	  },

	  /**
	    Registers a callback to be executed when `eventName` is triggered
	     ```javascript
	    object.on('event', function(eventInfo){
	      // handle the event
	    });
	     object.trigger('event');
	    ```
	     @method on
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName name of the event to listen for
	    @param {Function} callback function to be called when the event is triggered.
	  */
	  on: function on(eventName, callback) {
	    if (typeof callback !== 'function') {
	      throw new TypeError('Callback must be a function');
	    }

	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined;

	    callbacks = allCallbacks[eventName];

	    if (!callbacks) {
	      callbacks = allCallbacks[eventName] = [];
	    }

	    if (indexOf(callbacks, callback) === -1) {
	      callbacks.push(callback);
	    }
	  },

	  /**
	    You can use `off` to stop firing a particular callback for an event:
	     ```javascript
	    function doStuff() { // do stuff! }
	    object.on('stuff', doStuff);
	     object.trigger('stuff'); // doStuff will be called
	     // Unregister ONLY the doStuff callback
	    object.off('stuff', doStuff);
	    object.trigger('stuff'); // doStuff will NOT be called
	    ```
	     If you don't pass a `callback` argument to `off`, ALL callbacks for the
	    event will not be executed when the event fires. For example:
	     ```javascript
	    let callback1 = function(){};
	    let callback2 = function(){};
	     object.on('stuff', callback1);
	    object.on('stuff', callback2);
	     object.trigger('stuff'); // callback1 and callback2 will be executed.
	     object.off('stuff');
	    object.trigger('stuff'); // callback1 and callback2 will not be executed!
	    ```
	     @method off
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName event to stop listening to
	    @param {Function} callback optional argument. If given, only the function
	    given will be removed from the event's callback queue. If no `callback`
	    argument is given, all callbacks will be removed from the event's callback
	    queue.
	  */
	  off: function off(eventName, callback) {
	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined,
	        index = undefined;

	    if (!callback) {
	      allCallbacks[eventName] = [];
	      return;
	    }

	    callbacks = allCallbacks[eventName];

	    index = indexOf(callbacks, callback);

	    if (index !== -1) {
	      callbacks.splice(index, 1);
	    }
	  },

	  /**
	    Use `trigger` to fire custom events. For example:
	     ```javascript
	    object.on('foo', function(){
	      console.log('foo event happened!');
	    });
	    object.trigger('foo');
	    // 'foo event happened!' logged to the console
	    ```
	     You can also pass a value as a second argument to `trigger` that will be
	    passed as an argument to all event listeners for the event:
	     ```javascript
	    object.on('foo', function(value){
	      console.log(value.name);
	    });
	     object.trigger('foo', { name: 'bar' });
	    // 'bar' logged to the console
	    ```
	     @method trigger
	    @for RSVP.EventTarget
	    @private
	    @param {String} eventName name of the event to be triggered
	    @param {*} options optional value to be passed to any event handlers for
	    the given `eventName`
	  */
	  trigger: function trigger(eventName, options, label) {
	    var allCallbacks = callbacksFor(this),
	        callbacks = undefined,
	        callback = undefined;

	    if (callbacks = allCallbacks[eventName]) {
	      // Don't cache the callbacks.length since it may grow
	      for (var i = 0; i < callbacks.length; i++) {
	        callback = callbacks[i];

	        callback(options, label);
	      }
	    }
	  }
	};

	var config = {
	  instrument: false
	};

	EventTarget['mixin'](config);

	function configure(name, value) {
	  if (name === 'onerror') {
	    // handle for legacy users that expect the actual
	    // error to be passed to their function added via
	    // `RSVP.configure('onerror', someFunctionHere);`
	    config['on']('error', value);
	    return;
	  }

	  if (arguments.length === 2) {
	    config[name] = value;
	  } else {
	    return config[name];
	  }
	}

	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}

	function isFunction(x) {
	  return typeof x === 'function';
	}

	function isMaybeThenable(x) {
	  return typeof x === 'object' && x !== null;
	}

	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}

	var isArray = _isArray;

	// Date.now is not available in browsers < IE9
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now#Compatibility
	var now = Date.now || function () {
	  return new Date().getTime();
	};

	function F() {}

	var o_create = Object.create || function (o) {
	  if (arguments.length > 1) {
	    throw new Error('Second argument not supported');
	  }
	  if (typeof o !== 'object') {
	    throw new TypeError('Argument must be an object');
	  }
	  F.prototype = o;
	  return new F();
	};

	var queue = [];

	function scheduleFlush() {
	  setTimeout(function () {
	    for (var i = 0; i < queue.length; i++) {
	      var entry = queue[i];

	      var payload = entry.payload;

	      payload.guid = payload.key + payload.id;
	      payload.childGuid = payload.key + payload.childId;
	      if (payload.error) {
	        payload.stack = payload.error.stack;
	      }

	      config['trigger'](entry.name, entry.payload);
	    }
	    queue.length = 0;
	  }, 50);
	}
	function instrument$1(eventName, promise, child) {
	  if (1 === queue.push({
	    name: eventName,
	    payload: {
	      key: promise._guidKey,
	      id: promise._id,
	      eventName: eventName,
	      detail: promise._result,
	      childId: child && child._id,
	      label: promise._label,
	      timeStamp: now(),
	      error: config["instrument-with-stack"] ? new Error(promise._label) : null
	    } })) {
	    scheduleFlush();
	  }
	}

	/**
	  `RSVP.Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:

	  ```javascript
	  let promise = new RSVP.Promise(function(resolve, reject){
	    resolve(1);
	  });

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = RSVP.Promise.resolve(1);

	  promise.then(function(value){
	    // value === 1
	  });
	  ```

	  @method resolve
	  @static
	  @param {*} object value that the returned promise will be resolved with
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$1(object, label) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }

	  var promise = new Constructor(noop, label);
	  resolve(promise, object);
	  return promise;
	}

	function withOwnPromise() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}

	function noop() {}

	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;

	var GET_THEN_ERROR = new ErrorObject();

	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}

	function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then$$1.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}

	function handleForeignThenable(promise, thenable, then$$1) {
	  config.async(function (promise) {
	    var sealed = false;
	    var error = tryThen(then$$1, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        resolve(promise, value, undefined);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;

	      reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));

	    if (!sealed && error) {
	      sealed = true;
	      reject(promise, error);
	    }
	  }, promise);
	}

	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    thenable._onError = null;
	    reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      if (thenable !== value) {
	        resolve(promise, value, undefined);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }
	}

	function handleMaybeThenable(promise, maybeThenable, then$$1) {
	  if (maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$1) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$1 === GET_THEN_ERROR) {
	      reject(promise, GET_THEN_ERROR.error);
	      GET_THEN_ERROR.error = null;
	    } else if (then$$1 === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$1)) {
	      handleForeignThenable(promise, maybeThenable, then$$1);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}

	function resolve(promise, value) {
	  if (promise === value) {
	    fulfill(promise, value);
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}

	function publishRejection(promise) {
	  if (promise._onError) {
	    promise._onError(promise._result);
	  }

	  publish(promise);
	}

	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }

	  promise._result = value;
	  promise._state = FULFILLED;

	  if (promise._subscribers.length === 0) {
	    if (config.instrument) {
	      instrument$1('fulfilled', promise);
	    }
	  } else {
	    config.async(publish, promise);
	  }
	}

	function reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	  config.async(publishRejection, promise);
	}

	function subscribe(parent, child, onFulfillment, onRejection) {
	  var subscribers = parent._subscribers;
	  var length = subscribers.length;

	  parent._onError = null;

	  subscribers[length] = child;
	  subscribers[length + FULFILLED] = onFulfillment;
	  subscribers[length + REJECTED] = onRejection;

	  if (length === 0 && parent._state) {
	    config.async(publish, parent);
	  }
	}

	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;

	  if (config.instrument) {
	    instrument$1(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
	  }

	  if (subscribers.length === 0) {
	    return;
	  }

	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;

	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];

	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }

	  promise._subscribers.length = 0;
	}

	function ErrorObject() {
	  this.error = null;
	}

	var TRY_CATCH_ERROR = new ErrorObject();

	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}

	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;

	  if (hasCallback) {
	    value = tryCatch(callback, detail);

	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value.error = null; // release
	    } else {
	        succeeded = true;
	      }

	    if (promise === value) {
	      reject(promise, withOwnPromise());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }

	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      resolve(promise, value);
	    } else if (failed) {
	      reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      reject(promise, value);
	    }
	}

	function initializePromise(promise, resolver) {
	  var resolved = false;
	  try {
	    resolver(function (value) {
	      if (resolved) {
	        return;
	      }
	      resolved = true;
	      resolve(promise, value);
	    }, function (reason) {
	      if (resolved) {
	        return;
	      }
	      resolved = true;
	      reject(promise, reason);
	    });
	  } catch (e) {
	    reject(promise, e);
	  }
	}

	function then(onFulfillment, onRejection, label) {
	  var _arguments = arguments;

	  var parent = this;
	  var state = parent._state;

	  if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
	    config.instrument && instrument$1('chained', parent, parent);
	    return parent;
	  }

	  parent._onError = null;

	  var child = new parent.constructor(noop, label);
	  var result = parent._result;

	  config.instrument && instrument$1('chained', parent, child);

	  if (state) {
	    (function () {
	      var callback = _arguments[state - 1];
	      config.async(function () {
	        return invokeCallback(state, child, callback, result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }

	  return child;
	}

	function makeSettledResult(state, position, value) {
	  if (state === FULFILLED) {
	    return {
	      state: 'fulfilled',
	      value: value
	    };
	  } else {
	    return {
	      state: 'rejected',
	      reason: value
	    };
	  }
	}

	function Enumerator(Constructor, input, abortOnReject, label) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop, label);
	  this._abortOnReject = abortOnReject;

	  if (this._validateInput(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;

	    this._init();

	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    reject(this.promise, this._validationError());
	  }
	}

	Enumerator.prototype._validateInput = function (input) {
	  return isArray(input);
	};

	Enumerator.prototype._validationError = function () {
	  return new Error('Array Methods must be provided an Array');
	};

	Enumerator.prototype._init = function () {
	  this._result = new Array(this.length);
	};

	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var promise = this.promise;
	  var input = this._input;

	  for (var i = 0; promise._state === PENDING && i < length; i++) {
	    this._eachEntry(input[i], i);
	  }
	};

	Enumerator.prototype._settleMaybeThenable = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$1 = c.resolve;

	  if (resolve$$1 === resolve$1) {
	    var then$$1 = getThen(entry);

	    if (then$$1 === then && entry._state !== PENDING) {
	      entry._onError = null;
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof then$$1 !== 'function') {
	      this._remaining--;
	      this._result[i] = this._makeResult(FULFILLED, i, entry);
	    } else if (c === Promise$1) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, then$$1);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$1) {
	        return resolve$$1(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$1(entry), i);
	  }
	};

	Enumerator.prototype._eachEntry = function (entry, i) {
	  if (isMaybeThenable(entry)) {
	    this._settleMaybeThenable(entry, i);
	  } else {
	    this._remaining--;
	    this._result[i] = this._makeResult(FULFILLED, i, entry);
	  }
	};

	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;

	  if (promise._state === PENDING) {
	    this._remaining--;

	    if (this._abortOnReject && state === REJECTED) {
	      reject(promise, value);
	    } else {
	      this._result[i] = this._makeResult(state, i, value);
	    }
	  }

	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};

	Enumerator.prototype._makeResult = function (state, i, value) {
	  return value;
	};

	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;

	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};

	/**
	  `RSVP.Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.

	  Example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```

	  If any of the `promises` given to `RSVP.all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:

	  Example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error("2"));
	  let promise3 = RSVP.reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```

	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all$1(entries, label) {
	  return new Enumerator(this, entries, true, /* abort on reject */label).promise;
	}

	/**
	  `RSVP.Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.

	  Example:

	  ```javascript
	  let promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });

	  RSVP.Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```

	  `RSVP.Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:

	  ```javascript
	  let promise1 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });

	  let promise2 = new RSVP.Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });

	  RSVP.Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```

	  An example real-world use case is implementing timeouts:

	  ```javascript
	  RSVP.Promise.race([ajax('foo.json'), timeout(5000)])
	  ```

	  @method race
	  @static
	  @param {Array} entries array of promises to observe
	  @param {String} label optional string for describing the promise returned.
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race$1(entries, label) {
	  /*jshint validthis:true */
	  var Constructor = this;

	  var promise = new Constructor(noop, label);

	  if (!isArray(entries)) {
	    reject(promise, new TypeError('You must pass an array to race.'));
	    return promise;
	  }

	  for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
	    subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
	      return resolve(promise, value);
	    }, function (reason) {
	      return reject(promise, reason);
	    });
	  }

	  return promise;
	}

	/**
	  `RSVP.Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:

	  ```javascript
	  let promise = new RSVP.Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  Instead of writing the above, your code now simply becomes the following:

	  ```javascript
	  let promise = RSVP.Promise.reject(new Error('WHOOPS'));

	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```

	  @method reject
	  @static
	  @param {*} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$1(reason, label) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop, label);
	  reject(promise, reason);
	  return promise;
	}

	var guidKey = 'rsvp_' + now() + '-';
	var counter = 0;

	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}

	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}

	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise’s eventual value or the reason
	  why the promise cannot be fulfilled.

	  Terminology
	  -----------

	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.

	  A promise can be in one of three states: pending, fulfilled, or rejected.

	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.

	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.


	  Basic Usage:
	  ------------

	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);

	    // on failure
	    reject(reason);
	  });

	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Advanced Usage:
	  ---------------

	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.

	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();

	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();

	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }

	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```

	  Unlike callbacks, promises are great composable primitives.

	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON

	    return values;
	  });
	  ```

	  @class RSVP.Promise
	  @param {function} resolver
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @constructor
	*/
	function Promise$1(resolver) {
	  this._id = counter++;
	  this._label = null;
	  this._state = undefined;
	  this._result = undefined;
	  this._subscribers = [];

	  config.instrument && instrument$1('created', this);

	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise$1 ? initializePromise(this, resolver) : needsNew();
	  }
	}

	Promise$1.cast = resolve$1; // deprecated
	Promise$1.all = all$1;
	Promise$1.race = race$1;
	Promise$1.resolve = resolve$1;
	Promise$1.reject = reject$1;

	Promise$1.prototype = {
	  constructor: Promise$1,

	  _guidKey: guidKey,

	  _onError: function _onError(reason) {
	    var promise = this;
	    config.after(function () {
	      if (promise._onError) {
	        config['trigger']('error', reason, promise._label);
	      }
	    });
	  },

	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we\'re unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfillment
	    @param {Function} onRejection
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,

	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn\'t find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection, label) {
	    return this.then(undefined, onRejection, label);
	  },

	  /**
	    `finally` will be invoked regardless of the promise's fate just as native
	    try/catch/finally behaves
	  
	    Synchronous example:
	  
	    ```js
	    findAuthor() {
	      if (Math.random() > 0.5) {
	        throw new Error();
	      }
	      return new Author();
	    }
	  
	    try {
	      return findAuthor(); // succeed or fail
	    } catch(error) {
	      return findOtherAuthor();
	    } finally {
	      // always runs
	      // doesn't affect the return value
	    }
	    ```
	  
	    Asynchronous example:
	  
	    ```js
	    findAuthor().catch(function(reason){
	      return findOtherAuthor();
	    }).finally(function(){
	      // author was either found, or not
	    });
	    ```
	  
	    @method finally
	    @param {Function} callback
	    @param {String} label optional string for labeling the promise.
	    Useful for tooling.
	    @return {Promise}
	  */
	  'finally': function _finally(callback, label) {
	    var promise = this;
	    var constructor = promise.constructor;

	    return promise.then(function (value) {
	      return constructor.resolve(callback()).then(function () {
	        return value;
	      });
	    }, function (reason) {
	      return constructor.resolve(callback()).then(function () {
	        throw reason;
	      });
	    }, label);
	  }
	};

	function Result() {
	  this.value = undefined;
	}

	var ERROR = new Result();
	var GET_THEN_ERROR$1 = new Result();

	function getThen$1(obj) {
	  try {
	    return obj.then;
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}

	function tryApply(f, s, a) {
	  try {
	    f.apply(s, a);
	  } catch (error) {
	    ERROR.value = error;
	    return ERROR;
	  }
	}

	function makeObject(_, argumentNames) {
	  var obj = {};
	  var length = _.length;
	  var args = new Array(length);

	  for (var x = 0; x < length; x++) {
	    args[x] = _[x];
	  }

	  for (var i = 0; i < argumentNames.length; i++) {
	    var _name = argumentNames[i];
	    obj[_name] = args[i + 1];
	  }

	  return obj;
	}

	function arrayResult(_) {
	  var length = _.length;
	  var args = new Array(length - 1);

	  for (var i = 1; i < length; i++) {
	    args[i - 1] = _[i];
	  }

	  return args;
	}

	function wrapThenable(_then, promise) {
	  return {
	    then: function then(onFulFillment, onRejection) {
	      return _then.call(promise, onFulFillment, onRejection);
	    }
	  };
	}

	/**
	  `RSVP.denodeify` takes a 'node-style' function and returns a function that
	  will return an `RSVP.Promise`. You can use `denodeify` in Node.js or the
	  browser when you'd prefer to use promises over using callbacks. For example,
	  `denodeify` transforms the following:

	  ```javascript
	  let fs = require('fs');

	  fs.readFile('myfile.txt', function(err, data){
	    if (err) return handleError(err);
	    handleData(data);
	  });
	  ```

	  into:

	  ```javascript
	  let fs = require('fs');
	  let readFile = RSVP.denodeify(fs.readFile);

	  readFile('myfile.txt').then(handleData, handleError);
	  ```

	  If the node function has multiple success parameters, then `denodeify`
	  just returns the first one:

	  ```javascript
	  let request = RSVP.denodeify(require('request'));

	  request('http://example.com').then(function(res) {
	    // ...
	  });
	  ```

	  However, if you need all success parameters, setting `denodeify`'s
	  second parameter to `true` causes it to return all success parameters
	  as an array:

	  ```javascript
	  let request = RSVP.denodeify(require('request'), true);

	  request('http://example.com').then(function(result) {
	    // result[0] -> res
	    // result[1] -> body
	  });
	  ```

	  Or if you pass it an array with names it returns the parameters as a hash:

	  ```javascript
	  let request = RSVP.denodeify(require('request'), ['res', 'body']);

	  request('http://example.com').then(function(result) {
	    // result.res
	    // result.body
	  });
	  ```

	  Sometimes you need to retain the `this`:

	  ```javascript
	  let app = require('express')();
	  let render = RSVP.denodeify(app.render.bind(app));
	  ```

	  The denodified function inherits from the original function. It works in all
	  environments, except IE 10 and below. Consequently all properties of the original
	  function are available to you. However, any properties you change on the
	  denodeified function won't be changed on the original function. Example:

	  ```javascript
	  let request = RSVP.denodeify(require('request')),
	      cookieJar = request.jar(); // <- Inheritance is used here

	  request('http://example.com', {jar: cookieJar}).then(function(res) {
	    // cookieJar.cookies holds now the cookies returned by example.com
	  });
	  ```

	  Using `denodeify` makes it easier to compose asynchronous operations instead
	  of using callbacks. For example, instead of:

	  ```javascript
	  let fs = require('fs');

	  fs.readFile('myfile.txt', function(err, data){
	    if (err) { ... } // Handle error
	    fs.writeFile('myfile2.txt', data, function(err){
	      if (err) { ... } // Handle error
	      console.log('done')
	    });
	  });
	  ```

	  you can chain the operations together using `then` from the returned promise:

	  ```javascript
	  let fs = require('fs');
	  let readFile = RSVP.denodeify(fs.readFile);
	  let writeFile = RSVP.denodeify(fs.writeFile);

	  readFile('myfile.txt').then(function(data){
	    return writeFile('myfile2.txt', data);
	  }).then(function(){
	    console.log('done')
	  }).catch(function(error){
	    // Handle error
	  });
	  ```

	  @method denodeify
	  @static
	  @for RSVP
	  @param {Function} nodeFunc a 'node-style' function that takes a callback as
	  its last argument. The callback expects an error to be passed as its first
	  argument (if an error occurred, otherwise null), and the value from the
	  operation as its second argument ('function(err, value){ }').
	  @param {Boolean|Array} [options] An optional paramter that if set
	  to `true` causes the promise to fulfill with the callback's success arguments
	  as an array. This is useful if the node function has multiple success
	  paramters. If you set this paramter to an array with names, the promise will
	  fulfill with a hash with these names as keys and the success parameters as
	  values.
	  @return {Function} a function that wraps `nodeFunc` to return an
	  `RSVP.Promise`
	  @static
	*/
	function denodeify$1(nodeFunc, options) {
	  var fn = function fn() {
	    var self = this;
	    var l = arguments.length;
	    var args = new Array(l + 1);
	    var promiseInput = false;

	    for (var i = 0; i < l; ++i) {
	      var arg = arguments[i];

	      if (!promiseInput) {
	        // TODO: clean this up
	        promiseInput = needsPromiseInput(arg);
	        if (promiseInput === GET_THEN_ERROR$1) {
	          var p = new Promise$1(noop);
	          reject(p, GET_THEN_ERROR$1.value);
	          return p;
	        } else if (promiseInput && promiseInput !== true) {
	          arg = wrapThenable(promiseInput, arg);
	        }
	      }
	      args[i] = arg;
	    }

	    var promise = new Promise$1(noop);

	    args[l] = function (err, val) {
	      if (err) reject(promise, err);else if (options === undefined) resolve(promise, val);else if (options === true) resolve(promise, arrayResult(arguments));else if (isArray(options)) resolve(promise, makeObject(arguments, options));else resolve(promise, val);
	    };

	    if (promiseInput) {
	      return handlePromiseInput(promise, args, nodeFunc, self);
	    } else {
	      return handleValueInput(promise, args, nodeFunc, self);
	    }
	  };

	  fn.__proto__ = nodeFunc;

	  return fn;
	}

	function handleValueInput(promise, args, nodeFunc, self) {
	  var result = tryApply(nodeFunc, self, args);
	  if (result === ERROR) {
	    reject(promise, result.value);
	  }
	  return promise;
	}

	function handlePromiseInput(promise, args, nodeFunc, self) {
	  return Promise$1.all(args).then(function (args) {
	    var result = tryApply(nodeFunc, self, args);
	    if (result === ERROR) {
	      reject(promise, result.value);
	    }
	    return promise;
	  });
	}

	function needsPromiseInput(arg) {
	  if (arg && typeof arg === 'object') {
	    if (arg.constructor === Promise$1) {
	      return true;
	    } else {
	      return getThen$1(arg);
	    }
	  } else {
	    return false;
	  }
	}

	/**
	  This is a convenient alias for `RSVP.Promise.all`.

	  @method all
	  @static
	  @for RSVP
	  @param {Array} array Array of promises.
	  @param {String} label An optional label. This is useful
	  for tooling.
	*/
	function all$3(array, label) {
	  return Promise$1.all(array, label);
	}

	function AllSettled(Constructor, entries, label) {
	  this._superConstructor(Constructor, entries, false, /* don't abort on reject */label);
	}

	AllSettled.prototype = o_create(Enumerator.prototype);
	AllSettled.prototype._superConstructor = Enumerator;
	AllSettled.prototype._makeResult = makeSettledResult;
	AllSettled.prototype._validationError = function () {
	  return new Error('allSettled must be called with an array');
	};

	/**
	  `RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
	  a fail-fast method, it waits until all the promises have returned and
	  shows you all the results. This is useful if you want to handle multiple
	  promises' failure states together as a set.

	  Returns a promise that is fulfilled when all the given promises have been
	  settled. The return promise is fulfilled with an array of the states of
	  the promises passed into the `promises` array argument.

	  Each state object will either indicate fulfillment or rejection, and
	  provide the corresponding value or reason. The states will take one of
	  the following formats:

	  ```javascript
	  { state: 'fulfilled', value: value }
	    or
	  { state: 'rejected', reason: reason }
	  ```

	  Example:

	  ```javascript
	  let promise1 = RSVP.Promise.resolve(1);
	  let promise2 = RSVP.Promise.reject(new Error('2'));
	  let promise3 = RSVP.Promise.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  RSVP.allSettled(promises).then(function(array){
	    // array == [
	    //   { state: 'fulfilled', value: 1 },
	    //   { state: 'rejected', reason: Error },
	    //   { state: 'rejected', reason: Error }
	    // ]
	    // Note that for the second item, reason.message will be '2', and for the
	    // third item, reason.message will be '3'.
	  }, function(error) {
	    // Not run. (This block would only be called if allSettled had failed,
	    // for instance if passed an incorrect argument type.)
	  });
	  ```

	  @method allSettled
	  @static
	  @for RSVP
	  @param {Array} entries
	  @param {String} label - optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled with an array of the settled
	  states of the constituent promises.
	*/
	function allSettled$1(entries, label) {
	  return new AllSettled(Promise$1, entries, label).promise;
	}

	/**
	  This is a convenient alias for `RSVP.Promise.race`.

	  @method race
	  @static
	  @for RSVP
	  @param {Array} array Array of promises.
	  @param {String} label An optional label. This is useful
	  for tooling.
	 */
	function race$3(array, label) {
	  return Promise$1.race(array, label);
	}

	function PromiseHash(Constructor, object, label) {
	  this._superConstructor(Constructor, object, true, label);
	}

	PromiseHash.prototype = o_create(Enumerator.prototype);
	PromiseHash.prototype._superConstructor = Enumerator;
	PromiseHash.prototype._init = function () {
	  this._result = {};
	};

	PromiseHash.prototype._validateInput = function (input) {
	  return input && typeof input === 'object';
	};

	PromiseHash.prototype._validationError = function () {
	  return new Error('Promise.hash must be called with an object');
	};

	PromiseHash.prototype._enumerate = function () {
	  var enumerator = this;
	  var promise = enumerator.promise;
	  var input = enumerator._input;
	  var results = [];

	  for (var key in input) {
	    if (promise._state === PENDING && Object.prototype.hasOwnProperty.call(input, key)) {
	      results.push({
	        position: key,
	        entry: input[key]
	      });
	    }
	  }

	  var length = results.length;
	  enumerator._remaining = length;
	  var result = undefined;

	  for (var i = 0; promise._state === PENDING && i < length; i++) {
	    result = results[i];
	    enumerator._eachEntry(result.entry, result.position);
	  }
	};

	/**
	  `RSVP.hash` is similar to `RSVP.all`, but takes an object instead of an array
	  for its `promises` argument.

	  Returns a promise that is fulfilled when all the given promises have been
	  fulfilled, or rejected if any of them become rejected. The returned promise
	  is fulfilled with a hash that has the same key names as the `promises` object
	  argument. If any of the values in the object are not promises, they will
	  simply be copied over to the fulfilled object.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.resolve(1),
	    yourPromise: RSVP.resolve(2),
	    theirPromise: RSVP.resolve(3),
	    notAPromise: 4
	  };

	  RSVP.hash(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise: 1,
	    //   yourPromise: 2,
	    //   theirPromise: 3,
	    //   notAPromise: 4
	    // }
	  });
	  ````

	  If any of the `promises` given to `RSVP.hash` are rejected, the first promise
	  that is rejected will be given as the reason to the rejection handler.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.resolve(1),
	    rejectedPromise: RSVP.reject(new Error('rejectedPromise')),
	    anotherRejectedPromise: RSVP.reject(new Error('anotherRejectedPromise')),
	  };

	  RSVP.hash(promises).then(function(hash){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === 'rejectedPromise'
	  });
	  ```

	  An important note: `RSVP.hash` is intended for plain JavaScript objects that
	  are just a set of keys and values. `RSVP.hash` will NOT preserve prototype
	  chains.

	  Example:

	  ```javascript
	  function MyConstructor(){
	    this.example = RSVP.resolve('Example');
	  }

	  MyConstructor.prototype = {
	    protoProperty: RSVP.resolve('Proto Property')
	  };

	  let myObject = new MyConstructor();

	  RSVP.hash(myObject).then(function(hash){
	    // protoProperty will not be present, instead you will just have an
	    // object that looks like:
	    // {
	    //   example: 'Example'
	    // }
	    //
	    // hash.hasOwnProperty('protoProperty'); // false
	    // 'undefined' === typeof hash.protoProperty
	  });
	  ```

	  @method hash
	  @static
	  @for RSVP
	  @param {Object} object
	  @param {String} label optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all properties of `promises`
	  have been fulfilled, or rejected if any of them become rejected.
	*/
	function hash$1(object, label) {
	  return new PromiseHash(Promise$1, object, label).promise;
	}

	function HashSettled(Constructor, object, label) {
	  this._superConstructor(Constructor, object, false, label);
	}

	HashSettled.prototype = o_create(PromiseHash.prototype);
	HashSettled.prototype._superConstructor = Enumerator;
	HashSettled.prototype._makeResult = makeSettledResult;

	HashSettled.prototype._validationError = function () {
	  return new Error('hashSettled must be called with an object');
	};

	/**
	  `RSVP.hashSettled` is similar to `RSVP.allSettled`, but takes an object
	  instead of an array for its `promises` argument.

	  Unlike `RSVP.all` or `RSVP.hash`, which implement a fail-fast method,
	  but like `RSVP.allSettled`, `hashSettled` waits until all the
	  constituent promises have returned and then shows you all the results
	  with their states and values/reasons. This is useful if you want to
	  handle multiple promises' failure states together as a set.

	  Returns a promise that is fulfilled when all the given promises have been
	  settled, or rejected if the passed parameters are invalid.

	  The returned promise is fulfilled with a hash that has the same key names as
	  the `promises` object argument. If any of the values in the object are not
	  promises, they will be copied over to the fulfilled object and marked with state
	  'fulfilled'.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.Promise.resolve(1),
	    yourPromise: RSVP.Promise.resolve(2),
	    theirPromise: RSVP.Promise.resolve(3),
	    notAPromise: 4
	  };

	  RSVP.hashSettled(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise: { state: 'fulfilled', value: 1 },
	    //   yourPromise: { state: 'fulfilled', value: 2 },
	    //   theirPromise: { state: 'fulfilled', value: 3 },
	    //   notAPromise: { state: 'fulfilled', value: 4 }
	    // }
	  });
	  ```

	  If any of the `promises` given to `RSVP.hash` are rejected, the state will
	  be set to 'rejected' and the reason for rejection provided.

	  Example:

	  ```javascript
	  let promises = {
	    myPromise: RSVP.Promise.resolve(1),
	    rejectedPromise: RSVP.Promise.reject(new Error('rejection')),
	    anotherRejectedPromise: RSVP.Promise.reject(new Error('more rejection')),
	  };

	  RSVP.hashSettled(promises).then(function(hash){
	    // hash here is an object that looks like:
	    // {
	    //   myPromise:              { state: 'fulfilled', value: 1 },
	    //   rejectedPromise:        { state: 'rejected', reason: Error },
	    //   anotherRejectedPromise: { state: 'rejected', reason: Error },
	    // }
	    // Note that for rejectedPromise, reason.message == 'rejection',
	    // and for anotherRejectedPromise, reason.message == 'more rejection'.
	  });
	  ```

	  An important note: `RSVP.hashSettled` is intended for plain JavaScript objects that
	  are just a set of keys and values. `RSVP.hashSettled` will NOT preserve prototype
	  chains.

	  Example:

	  ```javascript
	  function MyConstructor(){
	    this.example = RSVP.Promise.resolve('Example');
	  }

	  MyConstructor.prototype = {
	    protoProperty: RSVP.Promise.resolve('Proto Property')
	  };

	  let myObject = new MyConstructor();

	  RSVP.hashSettled(myObject).then(function(hash){
	    // protoProperty will not be present, instead you will just have an
	    // object that looks like:
	    // {
	    //   example: { state: 'fulfilled', value: 'Example' }
	    // }
	    //
	    // hash.hasOwnProperty('protoProperty'); // false
	    // 'undefined' === typeof hash.protoProperty
	  });
	  ```

	  @method hashSettled
	  @for RSVP
	  @param {Object} object
	  @param {String} label optional string that describes the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when when all properties of `promises`
	  have been settled.
	  @static
	*/
	function hashSettled$1(object, label) {
	  return new HashSettled(Promise$1, object, label).promise;
	}

	/**
	  `RSVP.rethrow` will rethrow an error on the next turn of the JavaScript event
	  loop in order to aid debugging.

	  Promises A+ specifies that any exceptions that occur with a promise must be
	  caught by the promises implementation and bubbled to the last handler. For
	  this reason, it is recommended that you always specify a second rejection
	  handler function to `then`. However, `RSVP.rethrow` will throw the exception
	  outside of the promise, so it bubbles up to your console if in the browser,
	  or domain/cause uncaught exception in Node. `rethrow` will also throw the
	  error again so the error can be handled by the promise per the spec.

	  ```javascript
	  function throws(){
	    throw new Error('Whoops!');
	  }

	  let promise = new RSVP.Promise(function(resolve, reject){
	    throws();
	  });

	  promise.catch(RSVP.rethrow).then(function(){
	    // Code here doesn't run because the promise became rejected due to an
	    // error!
	  }, function (err){
	    // handle the error here
	  });
	  ```

	  The 'Whoops' error will be thrown on the next turn of the event loop
	  and you can watch for it in your console. You can also handle it using a
	  rejection handler given to `.then` or `.catch` on the returned promise.

	  @method rethrow
	  @static
	  @for RSVP
	  @param {Error} reason reason the promise became rejected.
	  @throws Error
	  @static
	*/
	function rethrow$1(reason) {
	  setTimeout(function () {
	    throw reason;
	  });
	  throw reason;
	}

	/**
	  `RSVP.defer` returns an object similar to jQuery's `$.Deferred`.
	  `RSVP.defer` should be used when porting over code reliant on `$.Deferred`'s
	  interface. New code should use the `RSVP.Promise` constructor instead.

	  The object returned from `RSVP.defer` is a plain object with three properties:

	  * promise - an `RSVP.Promise`.
	  * reject - a function that causes the `promise` property on this object to
	    become rejected
	  * resolve - a function that causes the `promise` property on this object to
	    become fulfilled.

	  Example:

	   ```javascript
	   let deferred = RSVP.defer();

	   deferred.resolve("Success!");

	   deferred.promise.then(function(value){
	     // value here is "Success!"
	   });
	   ```

	  @method defer
	  @static
	  @for RSVP
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Object}
	 */
	function defer$1(label) {
	  var deferred = { resolve: undefined, reject: undefined };

	  deferred.promise = new Promise$1(function (resolve, reject) {
	    deferred.resolve = resolve;
	    deferred.reject = reject;
	  }, label);

	  return deferred;
	}

	/**
	 `RSVP.map` is similar to JavaScript's native `map` method, except that it
	  waits for all promises to become fulfilled before running the `mapFn` on
	  each item in given to `promises`. `RSVP.map` returns a promise that will
	  become fulfilled with the result of running `mapFn` on the values the promises
	  become fulfilled with.

	  For example:

	  ```javascript

	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);
	  let promises = [ promise1, promise2, promise3 ];

	  let mapFn = function(item){
	    return item + 1;
	  };

	  RSVP.map(promises, mapFn).then(function(result){
	    // result is [ 2, 3, 4 ]
	  });
	  ```

	  If any of the `promises` given to `RSVP.map` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promise's
	  rejection handler. For example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error('2'));
	  let promise3 = RSVP.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  let mapFn = function(item){
	    return item + 1;
	  };

	  RSVP.map(promises, mapFn).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === '2'
	  });
	  ```

	  `RSVP.map` will also wait if a promise is returned from `mapFn`. For example,
	  say you want to get all comments from a set of blog posts, but you need
	  the blog posts first because they contain a url to those comments.

	  ```javscript

	  let mapFn = function(blogPost){
	    // getComments does some ajax and returns an RSVP.Promise that is fulfilled
	    // with some comments data
	    return getComments(blogPost.comments_url);
	  };

	  // getBlogPosts does some ajax and returns an RSVP.Promise that is fulfilled
	  // with some blog post data
	  RSVP.map(getBlogPosts(), mapFn).then(function(comments){
	    // comments is the result of asking the server for the comments
	    // of all blog posts returned from getBlogPosts()
	  });
	  ```

	  @method map
	  @static
	  @for RSVP
	  @param {Array} promises
	  @param {Function} mapFn function to be called on each fulfilled promise.
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled with the result of calling
	  `mapFn` on each fulfilled promise or value when they become fulfilled.
	   The promise will be rejected if any of the given `promises` become rejected.
	  @static
	*/
	function map$1(promises, mapFn, label) {
	  return Promise$1.all(promises, label).then(function (values) {
	    if (!isFunction(mapFn)) {
	      throw new TypeError("You must pass a function as map's second argument.");
	    }

	    var length = values.length;
	    var results = new Array(length);

	    for (var i = 0; i < length; i++) {
	      results[i] = mapFn(values[i]);
	    }

	    return Promise$1.all(results, label);
	  });
	}

	/**
	  This is a convenient alias for `RSVP.Promise.resolve`.

	  @method resolve
	  @static
	  @for RSVP
	  @param {*} value value that the returned promise will be resolved with
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve$3(value, label) {
	  return Promise$1.resolve(value, label);
	}

	/**
	  This is a convenient alias for `RSVP.Promise.reject`.

	  @method reject
	  @static
	  @for RSVP
	  @param {*} reason value that the returned promise will be rejected with.
	  @param {String} label optional string for identifying the returned promise.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject$3(reason, label) {
	  return Promise$1.reject(reason, label);
	}

	/**
	 `RSVP.filter` is similar to JavaScript's native `filter` method, except that it
	  waits for all promises to become fulfilled before running the `filterFn` on
	  each item in given to `promises`. `RSVP.filter` returns a promise that will
	  become fulfilled with the result of running `filterFn` on the values the
	  promises become fulfilled with.

	  For example:

	  ```javascript

	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.resolve(2);
	  let promise3 = RSVP.resolve(3);

	  let promises = [promise1, promise2, promise3];

	  let filterFn = function(item){
	    return item > 1;
	  };

	  RSVP.filter(promises, filterFn).then(function(result){
	    // result is [ 2, 3 ]
	  });
	  ```

	  If any of the `promises` given to `RSVP.filter` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promise's
	  rejection handler. For example:

	  ```javascript
	  let promise1 = RSVP.resolve(1);
	  let promise2 = RSVP.reject(new Error('2'));
	  let promise3 = RSVP.reject(new Error('3'));
	  let promises = [ promise1, promise2, promise3 ];

	  let filterFn = function(item){
	    return item > 1;
	  };

	  RSVP.filter(promises, filterFn).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(reason) {
	    // reason.message === '2'
	  });
	  ```

	  `RSVP.filter` will also wait for any promises returned from `filterFn`.
	  For instance, you may want to fetch a list of users then return a subset
	  of those users based on some asynchronous operation:

	  ```javascript

	  let alice = { name: 'alice' };
	  let bob   = { name: 'bob' };
	  let users = [ alice, bob ];

	  let promises = users.map(function(user){
	    return RSVP.resolve(user);
	  });

	  let filterFn = function(user){
	    // Here, Alice has permissions to create a blog post, but Bob does not.
	    return getPrivilegesForUser(user).then(function(privs){
	      return privs.can_create_blog_post === true;
	    });
	  };
	  RSVP.filter(promises, filterFn).then(function(users){
	    // true, because the server told us only Alice can create a blog post.
	    users.length === 1;
	    // false, because Alice is the only user present in `users`
	    users[0] === bob;
	  });
	  ```

	  @method filter
	  @static
	  @for RSVP
	  @param {Array} promises
	  @param {Function} filterFn - function to be called on each resolved value to
	  filter the final results.
	  @param {String} label optional string describing the promise. Useful for
	  tooling.
	  @return {Promise}
	*/

	function resolveAll(promises, label) {
	  return Promise$1.all(promises, label);
	}

	function resolveSingle(promise, label) {
	  return Promise$1.resolve(promise, label).then(function (promises) {
	    return resolveAll(promises, label);
	  });
	}
	function filter$1(promises, filterFn, label) {
	  var promise = isArray(promises) ? resolveAll(promises, label) : resolveSingle(promises, label);
	  return promise.then(function (values) {
	    if (!isFunction(filterFn)) {
	      throw new TypeError("You must pass a function as filter's second argument.");
	    }

	    var length = values.length;
	    var filtered = new Array(length);

	    for (var i = 0; i < length; i++) {
	      filtered[i] = filterFn(values[i]);
	    }

	    return resolveAll(filtered, label).then(function (filtered) {
	      var results = new Array(length);
	      var newLength = 0;

	      for (var i = 0; i < length; i++) {
	        if (filtered[i]) {
	          results[newLength] = values[i];
	          newLength++;
	        }
	      }

	      results.length = newLength;

	      return results;
	    });
	  });
	}

	var len = 0;
	var vertxNext = undefined;
	function asap$1(callback, arg) {
	  queue$1[len] = callback;
	  queue$1[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 1, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    scheduleFlush$1();
	  }
	}

	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

	// node
	function useNextTick() {
	  var nextTick = process.nextTick;
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // setImmediate should be used instead instead
	  var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
	  if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
	    nextTick = setImmediate;
	  }
	  return function () {
	    return nextTick(flush);
	  };
	}

	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }
	  return useSetTimeout();
	}

	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });

	  return function () {
	    return node.data = iterations = ++iterations % 2;
	  };
	}

	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}

	function useSetTimeout() {
	  return function () {
	    return setTimeout(flush, 1);
	  };
	}

	var queue$1 = new Array(1000);

	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue$1[i];
	    var arg = queue$1[i + 1];

	    callback(arg);

	    queue$1[i] = undefined;
	    queue$1[i + 1] = undefined;
	  }

	  len = 0;
	}

	function attemptVertex() {
	  try {
	    var r = commonjsRequire;
	    var vertx = r('vertx');
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}

	var scheduleFlush$1 = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush$1 = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush$1 = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush$1 = useMessageChannel();
	} else if (browserWindow === undefined && typeof commonjsRequire === 'function') {
	  scheduleFlush$1 = attemptVertex();
	} else {
	  scheduleFlush$1 = useSetTimeout();
	}

	var platform = undefined;

	/* global self */
	if (typeof self === 'object') {
	  platform = self;

	  /* global global */
	} else if (typeof commonjsGlobal === 'object') {
	    platform = commonjsGlobal;
	  } else {
	    throw new Error('no global: `self` or `global` found');
	  }

	var _async$filter;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	// defaults

	// the default export here is for backwards compat:
	//   https://github.com/tildeio/rsvp.js/issues/434
	config.async = asap$1;
	config.after = function (cb) {
	  return setTimeout(cb, 0);
	};
	var cast = resolve$3;

	var async = function async(callback, arg) {
	  return config.async(callback, arg);
	};

	function on() {
	  config['on'].apply(config, arguments);
	}

	function off() {
	  config['off'].apply(config, arguments);
	}

	// Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
	if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
	  var callbacks = window['__PROMISE_INSTRUMENTATION__'];
	  configure('instrument', true);
	  for (var eventName in callbacks) {
	    if (callbacks.hasOwnProperty(eventName)) {
	      on(eventName, callbacks[eventName]);
	    }
	  }
	}var rsvp = (_async$filter = {
	  asap: asap$1,
	  cast: cast,
	  Promise: Promise$1,
	  EventTarget: EventTarget,
	  all: all$3,
	  allSettled: allSettled$1,
	  race: race$3,
	  hash: hash$1,
	  hashSettled: hashSettled$1,
	  rethrow: rethrow$1,
	  defer: defer$1,
	  denodeify: denodeify$1,
	  configure: configure,
	  on: on,
	  off: off,
	  resolve: resolve$3,
	  reject: reject$3,
	  map: map$1
	}, _defineProperty(_async$filter, 'async', async), _defineProperty(_async$filter, 'filter', // babel seems to error if async isn't a computed prop here...
	filter$1), _async$filter);

	exports['default'] = rsvp;
	exports.asap = asap$1;
	exports.cast = cast;
	exports.Promise = Promise$1;
	exports.EventTarget = EventTarget;
	exports.all = all$3;
	exports.allSettled = allSettled$1;
	exports.race = race$3;
	exports.hash = hash$1;
	exports.hashSettled = hashSettled$1;
	exports.rethrow = rethrow$1;
	exports.defer = defer$1;
	exports.denodeify = denodeify$1;
	exports.configure = configure;
	exports.on = on;
	exports.off = off;
	exports.resolve = resolve$3;
	exports.reject = reject$3;
	exports.map = map$1;
	exports.async = async;
	exports.filter = filter$1;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


	});

	var rsvp_1 = rsvp.Promise;

	var Loader = (function () {
	    function Loader() {
	        this._objLoader = ObjLoader.create();
	        this._materialLoader = MaterialLoader.create();
	    }
	    Loader.of = function () {
	        var obj = new this();
	        return obj;
	    };
	    Loader.prototype.readFileToStream = function (files) {
	        var _this = this;
	        var streamArr = [];
	        for (var i = 0, f; f = files[i]; i++) {
	            streamArr.push(f);
	        }
	        var res = {};
	        return Observable.from(streamArr).flatMap(function (f) {
	            return Observable.fromPromise(new rsvp_1(function (resolve, reject) {
	                var postfix = f.name.split(".")[1];
	                if (postfix != "obj" && postfix != "mtl") {
	                    reject("你选择的文件格式错误。");
	                }
	                var reader = new FileReader();
	                reader.onload = function () {
	                    res[postfix] = this.result;
	                    if (postfix == "obj")
	                        res["name"] = f.name.split(".")[0];
	                    resolve(res);
	                };
	                reader.readAsText(f);
	            }));
	        }).last().flatMap(function (res) {
	            console.log(res);
	            return _this.convertByFile(res);
	        });
	    };
	    Loader.prototype.convertByFile = function (fileObject) {
	        var _this = this;
	        var result = {};
	        var materialStream = null;
	        this._objLoader.convert(result, fileObject["obj"], fileObject["name"]);
	        if (this._objLoader.mtlFilePath) {
	            materialStream = this._materialLoader.convert(result, fileObject["mtl"]);
	        }
	        if (materialStream) {
	            return materialStream.map(function (res) {
	                return _this._getModelGeometryByResult(res);
	            });
	        }
	        else {
	            console.log("没有材质信息，无法完成渲染");
	        }
	    };
	    Loader.prototype.convertByPath = function (filePath) {
	        var _this = this;
	        var result = {};
	        var objStream = this._getStream(filePath);
	        var fileName = this._getName(filePath);
	        return objStream.flatMap(function (fileContent) {
	            _this._objLoader.convert(result, fileContent, fileName);
	            if (_this._objLoader.mtlFilePath) {
	                var materialStream = _this._getStream("./build/" + _this._objLoader.mtlFilePath);
	                return materialStream.flatMap(function (fileContent) {
	                    return _this._materialLoader.convert(result, fileContent);
	                });
	            }
	            return Observable.from(result);
	        }).map(function (res) {
	            return _this._getModelGeometryByResult(res);
	        });
	    };
	    Loader.prototype._getModelGeometryByResult = function (res) {
	        var objects = res.objs;
	        var materials = res.materials == void 0 ? null : res.materials;
	        var vertices = [];
	        var colors = [];
	        var normals = [];
	        var texCoords = [];
	        var indices = [];
	        objects.forEach(function (obj) {
	            var objVertices = obj.attribute.POSITION;
	            var objNormals = obj.attribute.NORMAL;
	            var objTexCoords = obj.attribute.TEXCOORD;
	            obj.material.forEach(function (mater) {
	                var currentMaterial = materials[mater.material];
	                var color = currentMaterial.values.diffuse;
	                var verticeIndices = mater.verticeIndices;
	                var normalIndices = mater.normalIndices;
	                var texCoordIndices = mater.texCoordIndices;
	                verticeIndices.forEach(function (id) {
	                    vertices.push(objVertices[id * 3]);
	                    vertices.push(objVertices[id * 3 + 1]);
	                    vertices.push(objVertices[id * 3 + 2]);
	                    indices.push(id);
	                    colors.push(color[0]);
	                    colors.push(color[1]);
	                    colors.push(color[2]);
	                });
	                normalIndices.forEach(function (id) {
	                    normals.push(objNormals[id * 3]);
	                    normals.push(objNormals[id * 3 + 1]);
	                    normals.push(objNormals[id * 3 + 2]);
	                });
	                texCoordIndices.forEach(function (id) {
	                    texCoords.push(objTexCoords[id * 2]);
	                    texCoords.push(objTexCoords[id * 2 + 1]);
	                });
	            });
	        });
	        var modelGeometry = ModelGeometry.create();
	        modelGeometry.vertices = vertices;
	        modelGeometry.colors = colors;
	        modelGeometry.texCoords = texCoords;
	        modelGeometry.normals = normals;
	        modelGeometry.indices = indices;
	        return modelGeometry;
	    };
	    Loader.prototype._getStream = function (filePath) {
	        return Observable.fromPromise(new rsvp_1(function (resolve, reject) {
	            Util.ajax({
	                url: filePath,
	                success: function (val) { return resolve(val); },
	                error: function (val) { return reject(val); }
	            });
	        }));
	    };
	    Loader.prototype._getName = function (filePath) {
	        var reg = /[^\/]\w+/g;
	        var result = filePath.match(reg);
	        return result[result.length - 2];
	    };
	    return Loader;
	}());

	var Test = (function () {
	    function Test() {
	    }
	    Test.prototype.loadByFile = function (files) {
	        var _this = this;
	        var streamArr = [];
	        if (files.length <= 1 || files.length > 2) {
	            console.log("请选择.obj和.mtl 2个文件进行渲染");
	            return;
	        }
	        Loader.of().readFileToStream(files).subscribe(function (model) {
	            console.log(model);
	            _this.testCanvas(model);
	        });
	    };
	    Test.prototype.loadByPath = function (fileObj) {
	        var _this = this;
	        Loader.of().convertByPath("./build/male02.obj").subscribe(function (model) {
	            _this.testCanvas(model);
	        });
	    };
	    Test.prototype.testCanvas = function (models) {
	        Main.setCanvas("webgl", "ct").init();
	        var gameobj = this.createTriangle();
	        gameobj.transform.translate(0, 0, 0.2);
	        var director = exports.Director.getInstance();
	        director.renderer.setClearColor(0, 0, 0, 1);
	        director.scene.addChild(gameobj);
	        director.scene.addChild(this.createCamera());
	        director.start();
	    };
	    Test.prototype.createTriangle = function () {
	        var gameObject = GameObject.create();
	        var material = BasicMaterial.create();
	        material.color = Color.create("#0000ff");
	        material.opacity = 0.5;
	        var triangle = TriangleGeometry.create();
	        triangle.material = material;
	        gameObject.addComponent(triangle);
	        gameObject.addComponent(MeshRenderer.create());
	        return gameObject;
	    };
	    Test.prototype.createPlane = function (model) {
	        var gameObject = GameObject.create();
	        var material = ModelMaterial.create();
	        var geometry = model;
	        geometry.material = material;
	        gameObject.addComponent(model);
	        gameObject.addComponent(MeshRenderer.create());
	        return gameObject;
	    };
	    Test.prototype.createCamera = function () {
	        var camera = GameObject.create(), view = exports.Device.getInstance().view, cameraComponent = PerspectiveCamera.create();
	        cameraComponent.fovy = 30;
	        cameraComponent.aspect = view.width / view.height;
	        cameraComponent.near = 1;
	        cameraComponent.far = 1000;
	        cameraComponent.translate(0, 0, -4);
	        var cameraControll = CameraController.create(cameraComponent);
	        camera.addComponent(cameraControll);
	        return camera;
	    };
	    return Test;
	}());
	var a = new Test();
	a.testCanvas();

	exports.Camera = Camera;
	exports.CameraController = CameraController;
	exports.PerspectiveCamera = PerspectiveCamera;
	exports.BoxGeometry = BoxGeometry;
	exports.BufferContainer = BufferContainer;
	exports.GeometryData = GeometryData;
	exports.Geometry = Geometry;
	exports.ModelGeometry = ModelGeometry;
	exports.PlaneGeometry = PlaneGeometry;
	exports.TriangleGeometry = TriangleGeometry;
	exports.BasicMaterial = BasicMaterial;
	exports.Material = Material;
	exports.ModelMaterial = ModelMaterial;
	exports.ArrayBuffer = ArrayBuffer;
	exports.Buffer = Buffer;
	exports.ElementBuffer = ElementBuffer;
	exports.MeshRenderer = MeshRenderer;
	exports.RendererComponent = RendererComponent;
	exports.GLSLDataSender = GLSLDataSender;
	exports.Program = Program;
	exports.BasicShaderLib = BasicShaderLib;
	exports.ModelShaderLib = ModelShaderLib;
	exports.ShaderLib = ShaderLib;
	exports.BasicShader = BasicShader;
	exports.ModelShader = ModelShader;
	exports.Shader = Shader;
	exports.VariableLib = VariableLib;
	exports.ThreeDTransform = ThreeDTransform;
	exports.Transform = Transform;
	exports.Component = Component;
	exports.View = View;
	exports.Entity = Entity;
	exports.EntityObject = EntityObject;
	exports.GameObject = GameObject;
	exports.ComponentManager = ComponentManager;
	exports.EntityManager = EntityManager;
	exports.Main = Main;
	exports.RenderCommand = RenderCommand;
	exports.Renderer = Renderer;
	exports.WebglRenderer = WebglRenderer;
	exports.WebglState = WebglState;
	exports.GameObjectScene = GameObjectScene;
	exports.Scene = Scene;
	exports.Color = Color;
	exports.Matrix4 = Matrix4;
	exports.Vector = Vector;
	exports.Vector3 = Vector3;
	exports.Vector4 = Vector4;
	exports.Loader = Loader;
	exports.MaterialLoader = MaterialLoader;
	exports.MaterialModel = MaterialModel;
	exports.ObjLoader = ObjLoader;
	exports.ObjectModel = ObjectModel;
	exports.singleton = singleton;
	exports.Test = Test;
	exports.Util = Util;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=amy.js.map
