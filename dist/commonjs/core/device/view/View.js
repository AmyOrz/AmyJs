"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.View = View;
//# sourceMappingURL=View.js.map