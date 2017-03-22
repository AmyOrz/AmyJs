(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.amy = global.amy || {})));
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
	            this._parentEle = document.getElementById(parentId);
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
	        this.gl.viewport(0, 0, width, height);
	        this._parentEle = null;
	    };
	    return Device;
	}());
	exports.Device = __decorate([
	    singleton()
	], exports.Device);

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

	var TriangleData = (function () {
	    function TriangleData() {
	    }
	    return TriangleData;
	}());
	TriangleData.vertices = new Float32Array([
	    -0.0, 0.5, 0.0, -0.5, -0.5, 0.0, 0.5, -0.5, 0.0
	]);
	TriangleData.indices = new Uint8Array([0, 1, 2]);
	TriangleData.color = new Float32Array([
	    1.0, 0.5, 0.4, 0.0, 0.7, 0.8, 0.0, 1.0, 0.5
	]);

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

	var Test = (function () {
	    function Test() {
	        this.vs = "attribute vec4 a_Position;" +
	            "attribute vec4 a_Color;" +
	            "uniform mat4 u_MvpMatrix;" +
	            "varying vec4 v_Color;" +
	            "void main(){" +
	            "   gl_Position = u_MvpMatrix * a_Position;" +
	            "   v_Color = a_Color;" +
	            "}";
	        this.fs = '#ifdef GL_ES\n' +
	            'precision mediump float;\n' +
	            '#endif\n' +
	            "varying vec4 v_Color;" +
	            "void main(){" +
	            "   gl_FragColor = v_Color;" +
	            "}";
	        this._gl = null;
	        this._program = null;
	    }
	    Test.prototype.testCanvas = function () {
	        Main.setCanvas("webgl").init();
	        this._gl = exports.Device.getInstance().gl;
	        this._program = this.initShader(this.vs, this.fs);
	        if (!this._program)
	            alert("program error");
	        this._gl.useProgram(this._program);
	        this._gl.clearColor(0, 0, 0, 1);
	        var a_Position = this._gl.getAttribLocation(this._program, "a_Position");
	        var a_Color = this._gl.getAttribLocation(this._program, "a_Color");
	        var u_MvpMatrix = this._gl.getUniformLocation(this._program, "u_MvpMatrix");
	        var modelMatrix = new Matrix4();
	        var viewMatrix = new Matrix4();
	        var projMatrix = new Matrix4();
	        var mvpMatrix = new Matrix4();
	        modelMatrix.setRotate(60, 1, 1, 0);
	        viewMatrix.lookAt(0, 0, -8, 0, 0, 0, 0, 1, 0);
	        projMatrix.perspective(45, 1, 1, 100);
	        mvpMatrix.set(projMatrix).multiply(viewMatrix).multiply(modelMatrix);
	        this._gl.uniformMatrix4fv(u_MvpMatrix, false, mvpMatrix.elements);
	        var buffer = this._gl.createBuffer();
	        if (!buffer)
	            alert('buffer error');
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData.vertices, this._gl.STATIC_DRAW);
	        this._gl.vertexAttribPointer(a_Position, 3, this._gl.FLOAT, false, 0, 0);
	        this._gl.enableVertexAttribArray(a_Position);
	        var buffer = this._gl.createBuffer();
	        if (!buffer)
	            alert('buffer error');
	        this._gl.bindBuffer(this._gl.ARRAY_BUFFER, buffer);
	        this._gl.bufferData(this._gl.ARRAY_BUFFER, TriangleData.color, this._gl.STATIC_DRAW);
	        this._gl.vertexAttribPointer(a_Color, 3, this._gl.FLOAT, false, 0, 0);
	        this._gl.enableVertexAttribArray(a_Color);
	        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
	        this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
	    };
	    Test.prototype.initShader = function (vs, fs) {
	        var program = this._gl.createProgram();
	        var vshader = this._loadShader(this._gl.VERTEX_SHADER, vs);
	        var fshader = this._loadShader(this._gl.FRAGMENT_SHADER, fs);
	        if (!vshader || !fshader) {
	            return;
	        }
	        this._gl.attachShader(program, vshader);
	        this._gl.attachShader(program, fshader);
	        this._gl.linkProgram(program);
	        var linked = this._gl.getProgramParameter(program, this._gl.LINK_STATUS);
	        if (!linked) {
	            var err = this._gl.getProgramInfoLog(program);
	            console.log("faild to link _program:" + err);
	            this._gl.deleteProgram(program);
	            this._gl.deleteShader(vshader);
	            this._gl.deleteShader(vshader);
	            return;
	        }
	        if (!program)
	            console.log("program error");
	        return program;
	    };
	    Test.prototype._loadShader = function (type, value) {
	        var shader = this._gl.createShader(type);
	        if (shader == null) {
	            console.log("unable to create shader");
	            return;
	        }
	        this._gl.shaderSource(shader, value);
	        this._gl.compileShader(shader);
	        var compiled = this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS);
	        if (!compiled) {
	            var error = this._gl.getShaderInfoLog(shader);
	            console.log("faild to compile shader:" + error);
	            this._gl.deleteShader(shader);
	            return;
	        }
	        return shader;
	    };
	    Test.prototype._createTriangle = function () {
	    };
	    return Test;
	}());
	var a = new Test();
	a.testCanvas();

	var Entity = (function () {
	    function Entity(uidPre) {
	        this._uid = null;
	        this._uid = uidPre + String(Entity.UID++);
	    }
	    Object.defineProperty(Entity.prototype, "uid", {
	        get: function () {
	            return this._uid;
	        },
	        set: function (uid) {
	            this._uid = uid;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Entity;
	}());
	Entity.UID = 1;

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
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Component.prototype.init = function () { };
	    Component.prototype.dispose = function () { };
	    Component.prototype.clone = function () {
	    };
	    Component.prototype.addToObject = function (entityObject) {
	        this.entityObject = entityObject;
	        this.addToComponentContainer();
	    };
	    Component.prototype.addToComponentContainer = function () {
	    };
	    Component.prototype.removeFromObject = function (entityObject) {
	        this.removeFromComponentContainer();
	    };
	    Component.prototype.removeFromComponentContainer = function () {
	    };
	    return Component;
	}(Entity));

	exports.Director = (function () {
	    function Director() {
	    }
	    Director.getInstance = function () { };
	    return Director;
	}());
	exports.Director = __decorate([
	    singleton()
	], exports.Director);

	var Entity$1 = (function () {
	    function Entity() {
	        this.uid = Entity._count;
	        Entity._count++;
	    }
	    return Entity;
	}());
	Entity$1._count = 1;

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

	var JudgeUtils$2 = (function () {
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
	    JudgeUtils$2.isFunction = function (func) {
	        return typeof func == 'function';
	    };
	}
	else {
	    JudgeUtils$2.isFunction = function (func) {
	        return Object.prototype.toString.call(func) === "[object Function]";
	    };
	}

	var JudgeUtils$1 = (function (_super) {
	    __extends(JudgeUtils$$1, _super);
	    function JudgeUtils$$1() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    JudgeUtils$$1.isPromise = function (obj) {
	        return !!obj
	            && !_super.isFunction.call(this, obj.subscribe)
	            && _super.isFunction.call(this, obj.then);
	    };
	    JudgeUtils$$1.isEqual = function (ob1, ob2) {
	        return ob1.uid === ob2.uid;
	    };
	    JudgeUtils$$1.isIObserver = function (i) {
	        return i.next && i.error && i.completed;
	    };
	    return JudgeUtils$$1;
	}(JudgeUtils$2));

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
	        child.onEnter();
	        return this;
	    };
	    EntityManager.prototype.addChildren = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var addChild = args[1] == void 0 ? this.addChild : args[1];
	        if (JudgeUtils$1.isArray(args[0])) {
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
	        child.onExit();
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
	}(Entity$1));

	var EntityObject = (function (_super) {
	    __extends(EntityObject, _super);
	    function EntityObject() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.name = null;
	        _this._entityManager = EntityManager.create(_this);
	        return _this;
	    }
	    EntityObject.prototype.init = function () {
	        this._entityManager.init();
	        return this;
	    };
	    EntityObject.prototype.dispose = function () {
	        this.onDispose();
	        this._entityManager.dispose();
	        return this;
	    };
	    EntityObject.prototype.onEnter = function () {
	    };
	    EntityObject.prototype.onExit = function () {
	    };
	    EntityObject.prototype.onDispose = function () {
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
	    return EntityObject;
	}(Entity$1));

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
	        this.name = "GameObject" + this.uid;
	    };
	    return GameObject;
	}(EntityObject));

	var ComponentManager = (function () {
	    function ComponentManager(_entityObject) {
	        this._entityObject = _entityObject;
	        this.transform = null;
	        this._componentList = new Collection();
	        this._geometry = null;
	    }
	    ComponentManager.create = function (entityObject) {
	        var obj = new this(entityObject);
	        return obj;
	    };
	    ComponentManager.prototype.init = function () {
	    };
	    return ComponentManager;
	}());

	(function (EScreenSize) {
	    EScreenSize[EScreenSize["FULL"] = 0] = "FULL";
	})(exports.EScreenSize || (exports.EScreenSize = {}));

	var CubeData = (function () {
	    function CubeData() {
	    }
	    return CubeData;
	}());
	CubeData.vertices = new Float32Array([
	    1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
	    1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
	    1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
	    -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0,
	    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
	    1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0
	]);
	CubeData.texCoords = new Float32Array([
	    1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0,
	    1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0,
	    1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
	    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0
	]);
	CubeData.indices = new Uint8Array([
	    0, 1, 2, 0, 2, 3,
	    4, 5, 6, 4, 6, 7,
	    8, 9, 10, 8, 10, 11,
	    12, 13, 14, 12, 14, 15,
	    16, 17, 18, 16, 18, 19,
	    20, 21, 22, 20, 22, 23
	]);
	CubeData.normals = new Float32Array([
	    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,
	    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
	    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,
	    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,
	    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,
	    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0
	]);
	CubeData.color = new Float32Array([
	    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
	    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0,
	    1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
	    1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
	    1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
	    0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1
	]);

	var PlaneData = (function () {
	    function PlaneData() {
	    }
	    return PlaneData;
	}());
	PlaneData.vertices = new Float32Array([
	    1.0, 1.0, 0.0, -1.0, 1.0, 0.0, -1.0, -1.0, 0.0, 1.0, -1.0, 0.0
	]);
	PlaneData.texCoords = new Float32Array([1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0]);
	PlaneData.color = new Float32Array([
	    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0
	]);
	PlaneData.indices = new Uint8Array([0, 1, 2, 0, 2, 3]);

	var Geometry = (function (_super) {
	    __extends(Geometry, _super);
	    function Geometry() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return Geometry;
	}(Component));

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
	        var gl = exports.Device.getInstance().gl;
	        var typeData = new Float32Array(data);
	        this.buffer = gl.createBuffer();
	        if (!this.buffer) {
	            console.log("the buffer create error");
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
	        this.type = type;
	        this.usage = usage;
	    };
	    return ArrayBuffer;
	}(Buffer));

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
	    GLSLDataSender.prototype.addBufferToSendList = function (name, buffer) {
	        this._toSendBufferArr[name] = buffer;
	    };
	    GLSLDataSender.prototype.sendAllBufferData = function () {
	        for (var pos = 0, len = this._toSendBufferArr.length; pos < len; pos++) {
	            this.sendBuffer(pos, this._toSendBufferArr[pos]);
	        }
	    };
	    GLSLDataSender.prototype.sendBuffer = function (pos, buffer) {
	        this._getGl().bindBuffer(this._getGl().ARRAY_BUFFER, buffer.buffer);
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
	        return uniform;
	    };
	    GLSLDataSender.prototype._getGl = function () {
	        return exports.Device.getInstance().gl;
	    };
	    return GLSLDataSender;
	}());

	var Program = (function () {
	    function Program() {
	        this.glProgram = null;
	    }
	    Program.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    return Program;
	}());

	exports.Scene = (function (_super) {
	    __extends(Scene, _super);
	    function Scene() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Scene.getInstance = function () { };
	    return Scene;
	}(EntityObject));
	exports.Scene = __decorate([
	    singleton()
	], exports.Scene);

	var Transform = (function (_super) {
	    __extends(Transform, _super);
	    function Transform() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return Transform;
	}(Component));

	var ThreeDTransform = (function (_super) {
	    __extends(ThreeDTransform, _super);
	    function ThreeDTransform() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    return ThreeDTransform;
	}(Transform));

	exports.Test = Test;
	exports.Component = Component;
	exports.Entity = Entity$1;
	exports.EntityObject = EntityObject;
	exports.GameObject = GameObject;
	exports.ComponentManager = ComponentManager;
	exports.EntityManager = EntityManager;
	exports.Main = Main;
	exports.View = View;
	exports.CubeData = CubeData;
	exports.PlaneData = PlaneData;
	exports.TriangleData = TriangleData;
	exports.Geometry = Geometry;
	exports.Matrix4 = Matrix4;
	exports.Vector3 = Vector3;
	exports.Vector4 = Vector4;
	exports.ArrayBuffer = ArrayBuffer;
	exports.Buffer = Buffer;
	exports.GLSLDataSender = GLSLDataSender;
	exports.Program = Program;
	exports.ThreeDTransform = ThreeDTransform;
	exports.Transform = Transform;
	exports.singleton = singleton;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=amy.js.map
