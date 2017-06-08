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
	}(List));

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

	var Entity = (function () {
	    function Entity() {
	        this.uid = Entity._count;
	        Entity._count++;
	    }
	    return Entity;
	}());
	Entity._count = 1;

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
	                && !JudgeUtils$1.isFunction(item);
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

	var JudgeUtils$2 = (function (_super) {
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
	}(JudgeUtils));

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
	        if (JudgeUtils$2.isArray(args[0])) {
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

	var root;
	if (JudgeUtils$1.isNodeJs() && typeof global != "undefined") {
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
	        if (JudgeUtils$1.isString(arg)) {
	            var key = arg;
	            result.push(this._children[key]);
	            this._children[key] = void 0;
	            delete this._children[key];
	        }
	        else if (JudgeUtils$1.isFunction(arg)) {
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
	                return $BREAK$1;
	            }
	        });
	        return result;
	    };
	    Hash.prototype.forEach = function (func, context) {
	        var children = this._children;
	        for (var i in children) {
	            if (children.hasOwnProperty(i)) {
	                if (func.call(context, children[i], i) === $BREAK$1) {
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
	            return $BREAK$1;
	        });
	        return result;
	    };
	    Hash.prototype.map = function (func) {
	        var resultMap = {};
	        this.forEach(function (val, key) {
	            var result = func(val, key);
	            if (result !== $REMOVE$1) {
	                Log.error(!JudgeUtils$1.isArray(result) || result.length !== 2, Log.info.FUNC_MUST_BE("iterator", "[key, value]"));
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
	            if (JudgeUtils$1.isBoolean(args[0])) {
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
	        console.log(computeData);
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

	var root$1;
	if (JudgeUtils.isNodeJs() && typeof global != "undefined") {
	    root$1 = global;
	}
	else if (typeof window != "undefined") {
	    root$1 = window;
	}
	else if (typeof self != "undefined") {
	    root$1 = self;
	}
	else {
	    Log$1.error("no avaliable root!");
	}

	var Log$1 = (function () {
	    function Log() {
	    }
	    Log.log = function () {
	        var messages = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            messages[_i] = arguments[_i];
	        }
	        if (!this._exec("log", messages)) {
	            root$1.alert(messages.join(","));
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
	        if (root$1.console && root$1.console[consoleMethod]) {
	            root$1.console[consoleMethod].apply(root$1.console, Array.prototype.slice.call(args, sliceBegin));
	            return true;
	        }
	        return false;
	    };
	    return Log;
	}());
	Log$1.info = {
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

	var Entity$1 = (function () {
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
	Entity$1.UID = 1;

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
	                && !JudgeUtils.isFunction(item);
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

	var SubjectObserver = (function () {
	    function SubjectObserver() {
	        this.observers = Collection$1.create();
	        this._disposable = null;
	    }
	    SubjectObserver.prototype.isEmpty = function () {
	        return this.observers.getCount() === 0;
	    };
	    SubjectObserver.prototype.next = function (value) {
	        this.observers.forEach(function (ob) {
	            ob.next(value);
	        });
	    };
	    SubjectObserver.prototype.error = function (error) {
	        this.observers.forEach(function (ob) {
	            ob.error(error);
	        });
	    };
	    SubjectObserver.prototype.completed = function () {
	        this.observers.forEach(function (ob) {
	            ob.completed();
	        });
	    };
	    SubjectObserver.prototype.addChild = function (observer) {
	        this.observers.addChild(observer);
	        observer.setDisposable(this._disposable);
	    };
	    SubjectObserver.prototype.removeChild = function (observer) {
	        this.observers.removeChild(function (ob) {
	            return JudgeUtils$2.isEqual(ob, observer);
	        });
	    };
	    SubjectObserver.prototype.dispose = function () {
	        this.observers.forEach(function (ob) {
	            ob.dispose();
	        });
	        this.observers.removeAllChildren();
	    };
	    SubjectObserver.prototype.setDisposable = function (disposable) {
	        this.observers.forEach(function (observer) {
	            observer.setDisposable(disposable);
	        });
	        this._disposable = disposable;
	    };
	    return SubjectObserver;
	}());

	var Observer = (function (_super) {
	    __extends(Observer, _super);
	    function Observer() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _this = _super.call(this, "Observer") || this;
	        _this._isDisposed = null;
	        _this.onUserNext = null;
	        _this.onUserError = null;
	        _this.onUserCompleted = null;
	        _this._isStop = false;
	        _this._disposable = null;
	        if (args.length === 1) {
	            var observer_1 = args[0];
	            _this.onUserNext = function (v) {
	                observer_1.next(v);
	            };
	            _this.onUserError = function (e) {
	                observer_1.error(e);
	            };
	            _this.onUserCompleted = function () {
	                observer_1.completed();
	            };
	        }
	        else {
	            var onNext = args[0], onError = args[1], onCompleted = args[2];
	            _this.onUserNext = onNext || function (v) { };
	            _this.onUserError = onError || function (e) {
	                throw e;
	            };
	            _this.onUserCompleted = onCompleted || function () { };
	        }
	        return _this;
	    }
	    Object.defineProperty(Observer.prototype, "isDisposed", {
	        get: function () {
	            return this._isDisposed;
	        },
	        set: function (isDisposed) {
	            this._isDisposed = isDisposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Observer.prototype.next = function (value) {
	        if (!this._isStop) {
	            return this.onNext(value);
	        }
	    };
	    Observer.prototype.error = function (error) {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onError(error);
	        }
	    };
	    Observer.prototype.completed = function () {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onCompleted();
	        }
	    };
	    Observer.prototype.dispose = function () {
	        this._isStop = true;
	        this._isDisposed = true;
	        if (this._disposable) {
	            this._disposable.dispose();
	        }
	    };
	    Observer.prototype.setDisposable = function (disposable) {
	        this._disposable = disposable;
	    };
	    return Observer;
	}(Entity$1));

	var Main$1 = (function () {
	    function Main() {
	    }
	    return Main;
	}());
	Main$1.isTest = false;

	function assert(cond, message) {
	    if (message === void 0) { message = "contract error"; }
	    Log$1.error(!cond, message);
	}
	function requireCheck(InFunc) {
	    return function (target, name, descriptor) {
	        var value = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            if (Main$1.isTest) {
	                InFunc.apply(this, args);
	            }
	            return value.apply(this, args);
	        };
	        return descriptor;
	    };
	}

	var AutoDetachObserver = (function (_super) {
	    __extends(AutoDetachObserver, _super);
	    function AutoDetachObserver() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AutoDetachObserver.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 1) {
	            return new this(args[0]);
	        }
	        else {
	            return new this(args[0], args[1], args[2]);
	        }
	    };
	    AutoDetachObserver.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        _super.prototype.dispose.call(this);
	    };
	    AutoDetachObserver.prototype.onNext = function (value) {
	        try {
	            this.onUserNext(value);
	        }
	        catch (e) {
	            this.onError(e);
	        }
	    };
	    AutoDetachObserver.prototype.onError = function (error) {
	        try {
	            this.onUserError(error);
	        }
	        catch (e) {
	            throw e;
	        }
	        finally {
	            this.dispose();
	        }
	    };
	    AutoDetachObserver.prototype.onCompleted = function () {
	        try {
	            this.onUserCompleted();
	            this.dispose();
	        }
	        catch (e) {
	            throw e;
	        }
	    };
	    return AutoDetachObserver;
	}(Observer));
	__decorate([
	    requireCheck(function () {
	        if (this.isDisposed) {
	            Log$1.warn("only can dispose once");
	        }
	    })
	], AutoDetachObserver.prototype, "dispose", null);

	var InnerSubscription = (function () {
	    function InnerSubscription(subject, observer) {
	        this._subject = null;
	        this._observer = null;
	        this._subject = subject;
	        this._observer = observer;
	    }
	    InnerSubscription.create = function (subject, observer) {
	        var obj = new this(subject, observer);
	        return obj;
	    };
	    InnerSubscription.prototype.dispose = function () {
	        this._subject.remove(this._observer);
	        this._observer.dispose();
	    };
	    return InnerSubscription;
	}());

	var Subject = (function () {
	    function Subject() {
	        this._source = null;
	        this._observer = new SubjectObserver();
	    }
	    Subject.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Subject.prototype, "source", {
	        get: function () {
	            return this._source;
	        },
	        set: function (source) {
	            this._source = source;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Subject.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = arg1 instanceof Observer
	            ? arg1
	            : AutoDetachObserver.create(arg1, onError, onCompleted);
	        this._observer.addChild(observer);
	        return InnerSubscription.create(this, observer);
	    };
	    Subject.prototype.next = function (value) {
	        this._observer.next(value);
	    };
	    Subject.prototype.error = function (error) {
	        this._observer.error(error);
	    };
	    Subject.prototype.completed = function () {
	        this._observer.completed();
	    };
	    Subject.prototype.start = function () {
	        if (!this._source) {
	            return;
	        }
	        this._observer.setDisposable(this._source.buildStream(this));
	    };
	    Subject.prototype.remove = function (observer) {
	        this._observer.removeChild(observer);
	    };
	    Subject.prototype.dispose = function () {
	        this._observer.dispose();
	    };
	    return Subject;
	}());

	var SingleDisposable = (function (_super) {
	    __extends(SingleDisposable, _super);
	    function SingleDisposable(disposeHandler) {
	        var _this = _super.call(this, "SingleDisposable") || this;
	        _this._disposeHandler = null;
	        _this._isDisposed = false;
	        _this._disposeHandler = disposeHandler;
	        return _this;
	    }
	    SingleDisposable.create = function (disposeHandler) {
	        if (disposeHandler === void 0) { disposeHandler = function () { }; }
	        var obj = new this(disposeHandler);
	        return obj;
	    };
	    SingleDisposable.prototype.setDisposeHandler = function (handler) {
	        this._disposeHandler = handler;
	    };
	    SingleDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._disposeHandler();
	    };
	    return SingleDisposable;
	}(Entity$1));

	var ClassMapUtils = (function () {
	    function ClassMapUtils() {
	    }
	    ClassMapUtils.addClassMap = function (className, _class) {
	        this._classMap[className] = _class;
	    };
	    ClassMapUtils.getClass = function (className) {
	        return this._classMap[className];
	    };
	    return ClassMapUtils;
	}());
	ClassMapUtils._classMap = {};

	var FunctionUtils = (function () {
	    function FunctionUtils() {
	    }
	    FunctionUtils.bind = function (object, func) {
	        return function () {
	            return func.apply(object, arguments);
	        };
	    };
	    return FunctionUtils;
	}());

	var Stream = (function (_super) {
	    __extends(Stream, _super);
	    function Stream(subscribeFunc) {
	        var _this = _super.call(this, "Stream") || this;
	        _this.scheduler = null;
	        _this.subscribeFunc = null;
	        _this.subscribeFunc = subscribeFunc || function () { };
	        return _this;
	    }
	    Stream.prototype.buildStream = function (observer) {
	        return SingleDisposable.create((this.subscribeFunc(observer) || function () { }));
	    };
	    Stream.prototype.do = function (onNext, onError, onCompleted) {
	        return ClassMapUtils.getClass("DoStream").create(this, onNext, onError, onCompleted);
	    };
	    Stream.prototype.map = function (selector) {
	        return ClassMapUtils.getClass("MapStream").create(this, selector);
	    };
	    Stream.prototype.flatMap = function (selector) {
	        return this.map(selector).mergeAll();
	    };
	    Stream.prototype.concatMap = function (selector) {
	        return this.map(selector).concatAll();
	    };
	    Stream.prototype.mergeAll = function () {
	        return ClassMapUtils.getClass("MergeAllStream").create(this);
	    };
	    Stream.prototype.concatAll = function () {
	        return this.merge(1);
	    };
	    Stream.prototype.skipUntil = function (otherStream) {
	        return ClassMapUtils.getClass("SkipUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.takeUntil = function (otherStream) {
	        return ClassMapUtils.getClass("TakeUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.take = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils.getClass("Operator").empty();
	        }
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            self.subscribe(function (value) {
	                if (count > 0) {
	                    observer.next(value);
	                }
	                count--;
	                if (count <= 0) {
	                    observer.completed();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeLast = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils.getClass("Operator").empty();
	        }
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > count) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                while (queue.length > 0) {
	                    observer.next(queue.shift());
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeWhile = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        var self = this, bindPredicate = null;
	        bindPredicate = FunctionUtils.bind(thisArg, predicate);
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var i = 0, isStart = false;
	            self.subscribe(function (value) {
	                if (bindPredicate(value, i++, self)) {
	                    try {
	                        observer.next(value);
	                        isStart = true;
	                    }
	                    catch (e) {
	                        observer.error(e);
	                        return;
	                    }
	                }
	                else {
	                    if (isStart) {
	                        observer.completed();
	                    }
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.lastOrDefault = function (defaultValue) {
	        if (defaultValue === void 0) { defaultValue = null; }
	        var self = this;
	        return ClassMapUtils.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > 1) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                if (queue.length === 0) {
	                    observer.next(defaultValue);
	                }
	                else {
	                    while (queue.length > 0) {
	                        observer.next(queue.shift());
	                    }
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.filter = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils.getClass("FilterStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.filterWithState = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils.getClass("FilterWithStateStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.concat = function () {
	        var args = null;
	        if (JudgeUtils$2.isArray(arguments[0])) {
	            args = arguments[0];
	        }
	        else {
	            args = Array.prototype.slice.call(arguments, 0);
	        }
	        args.unshift(this);
	        return ClassMapUtils.getClass("ConcatStream").create(args);
	    };
	    Stream.prototype.merge = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (JudgeUtils$2.isNumber(args[0])) {
	            var maxConcurrent = args[0];
	            return ClassMapUtils.getClass("MergeStream").create(this, maxConcurrent);
	        }
	        if (JudgeUtils$2.isArray(args[0])) {
	            args = arguments[0];
	        }
	        else {
	        }
	        var stream = null;
	        args.unshift(this);
	        stream = ClassMapUtils.getClass("Operator").fromArray(args).mergeAll();
	        return stream;
	    };
	    Stream.prototype.repeat = function (count) {
	        if (count === void 0) { count = -1; }
	        return ClassMapUtils.getClass("RepeatStream").create(this, count);
	    };
	    Stream.prototype.ignoreElements = function () {
	        return ClassMapUtils.getClass("IgnoreElementsStream").create(this);
	    };
	    Stream.prototype.handleSubject = function (subject) {
	        if (this._isSubject(subject)) {
	            this._setSubject(subject);
	            return true;
	        }
	        return false;
	    };
	    Stream.prototype._isSubject = function (subject) {
	        return subject instanceof Subject;
	    };
	    Stream.prototype._setSubject = function (subject) {
	        subject.source = this;
	    };
	    return Stream;
	}(Entity$1));
	__decorate([
	    requireCheck(function (count) {
	        if (count === void 0) { count = 1; }
	        assert(count >= 0, Log$1.info.FUNC_SHOULD("count", ">= 0"));
	    })
	], Stream.prototype, "take", null);
	__decorate([
	    requireCheck(function (count) {
	        if (count === void 0) { count = 1; }
	        assert(count >= 0, Log$1.info.FUNC_SHOULD("count", ">= 0"));
	    })
	], Stream.prototype, "takeLast", null);

	var BaseStream = (function (_super) {
	    __extends(BaseStream, _super);
	    function BaseStream() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BaseStream.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = null;
	        if (this.handleSubject(arg1)) {
	            return;
	        }
	        observer = arg1 instanceof Observer
	            ? AutoDetachObserver.create(arg1)
	            : AutoDetachObserver.create(arg1, onError, onCompleted);
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    BaseStream.prototype.buildStream = function (observer) {
	        _super.prototype.buildStream.call(this, observer);
	        return this.subscribeCore(observer);
	    };
	    return BaseStream;
	}(Stream));

	var MapObserver = (function (_super) {
	    __extends(MapObserver, _super);
	    function MapObserver(currentObserver, selector) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._currentObserver = null;
	        _this._selector = null;
	        _this._currentObserver = currentObserver;
	        _this._selector = selector;
	        return _this;
	    }
	    MapObserver.create = function (currentObserver, selector) {
	        return new this(currentObserver, selector);
	    };
	    MapObserver.prototype.onNext = function (value) {
	        var result = null;
	        try {
	            result = this._selector(value);
	        }
	        catch (e) {
	            this._currentObserver.error(e);
	        }
	        finally {
	            this._currentObserver.next(result);
	        }
	    };
	    MapObserver.prototype.onError = function (error) {
	        this._currentObserver.error(error);
	    };
	    MapObserver.prototype.onCompleted = function () {
	        this._currentObserver.completed();
	    };
	    return MapObserver;
	}(Observer));

	function registerClass(className) {
	    return function (target) {
	        ClassMapUtils.addClassMap(className, target);
	    };
	}

	var MapStream = (function (_super) {
	    __extends(MapStream, _super);
	    function MapStream(source, selector) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._selector = null;
	        _this._source = source;
	        _this.scheduler = _this._source.scheduler;
	        _this._selector = selector;
	        return _this;
	    }
	    MapStream.create = function (source, selector) {
	        var obj = new this(source, selector);
	        return obj;
	    };
	    MapStream.prototype.subscribeCore = function (observer) {
	        return this._source.buildStream(MapObserver.create(observer, this._selector));
	    };
	    return MapStream;
	}(BaseStream));
	MapStream = __decorate([
	    registerClass("MapStream")
	], MapStream);

	var GroupDisposable = (function (_super) {
	    __extends(GroupDisposable, _super);
	    function GroupDisposable(disposable) {
	        var _this = _super.call(this, "GroupDisposable") || this;
	        _this._group = Collection$1.create();
	        _this._isDisposed = false;
	        if (disposable) {
	            _this._group.addChild(disposable);
	        }
	        return _this;
	    }
	    GroupDisposable.create = function (disposable) {
	        var obj = new this(disposable);
	        return obj;
	    };
	    GroupDisposable.prototype.add = function (disposable) {
	        this._group.addChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.remove = function (disposable) {
	        this._group.removeChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._group.forEach(function (disposable) {
	            disposable.dispose();
	        });
	    };
	    return GroupDisposable;
	}(Entity$1));

	var root$2;
	if (JudgeUtils$2.isNodeJs() && typeof global != "undefined") {
	    root$2 = global;
	}
	else if (typeof window != "undefined") {
	    root$2 = window;
	}
	else if (typeof self != "undefined") {
	    root$2 = self;
	}
	else {
	    Log$1.error("no avaliable root!");
	}

	var Scheduler = (function () {
	    function Scheduler() {
	        this._requestLoopId = null;
	    }
	    Scheduler.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Scheduler.prototype, "requestLoopId", {
	        get: function () {
	            return this._requestLoopId;
	        },
	        set: function (requestLoopId) {
	            this._requestLoopId = requestLoopId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scheduler.prototype.publishRecursive = function (observer, initial, action) {
	        action(initial);
	    };
	    Scheduler.prototype.publishInterval = function (observer, initial, interval, action) {
	        return root$2.setInterval(function () {
	            initial = action(initial);
	        }, interval);
	    };
	    Scheduler.prototype.publishIntervalRequest = function (observer, action) {
	        var self = this, loop = function (time) {
	            var isEnd = action(time);
	            if (isEnd) {
	                return;
	            }
	            self._requestLoopId = root$2.requestNextAnimationFrame(loop);
	        };
	        this._requestLoopId = root$2.requestNextAnimationFrame(loop);
	    };
	    Scheduler.prototype.publishTimeout = function (observer, time, action) {
	        return root$2.setTimeout(function () {
	            action(time);
	            observer.completed();
	        }, time);
	    };
	    return Scheduler;
	}());

	var AnonymousStream = (function (_super) {
	    __extends(AnonymousStream, _super);
	    function AnonymousStream(subscribeFunc) {
	        var _this = _super.call(this, subscribeFunc) || this;
	        _this.scheduler = Scheduler.create();
	        return _this;
	    }
	    AnonymousStream.create = function (subscribeFunc) {
	        var obj = new this(subscribeFunc);
	        return obj;
	    };
	    AnonymousStream.prototype.buildStream = function (observer) {
	        return SingleDisposable.create((this.subscribeFunc(observer) || function () { }));
	    };
	    AnonymousStream.prototype.subscribe = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var observer = null;
	        if (args[0] instanceof Subject) {
	            var subject = args[0];
	            this.handleSubject(subject);
	            return;
	        }
	        else if (JudgeUtils$2.isIObserver(args[0])) {
	            observer = AutoDetachObserver.create(args[0]);
	        }
	        else {
	            var onNext = args[0], onError = args[1] || null, onCompleted = args[2] || null;
	            observer = AutoDetachObserver.create(onNext, onError, onCompleted);
	        }
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    return AnonymousStream;
	}(Stream));

	var FromArrayStream = (function (_super) {
	    __extends(FromArrayStream, _super);
	    function FromArrayStream(array, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._array = null;
	        _this._array = array;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromArrayStream.create = function (array, scheduler) {
	        var obj = new this(array, scheduler);
	        return obj;
	    };
	    FromArrayStream.prototype.subscribeCore = function (observer) {
	        var array = this._array, len = array.length;
	        function loopRecursive(i) {
	            if (i < len) {
	                observer.next(array[i]);
	                loopRecursive(i + 1);
	            }
	            else {
	                observer.completed();
	            }
	        }
	        this.scheduler.publishRecursive(observer, 0, loopRecursive);
	        return SingleDisposable.create();
	    };
	    return FromArrayStream;
	}(BaseStream));

	var FromPromiseStream = (function (_super) {
	    __extends(FromPromiseStream, _super);
	    function FromPromiseStream(promise, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._promise = null;
	        _this._promise = promise;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromPromiseStream.create = function (promise, scheduler) {
	        var obj = new this(promise, scheduler);
	        return obj;
	    };
	    FromPromiseStream.prototype.subscribeCore = function (observer) {
	        this._promise.then(function (data) {
	            observer.next(data);
	            observer.completed();
	        }, function (err) {
	            observer.error(err);
	        }, observer);
	        return SingleDisposable.create();
	    };
	    return FromPromiseStream;
	}(BaseStream));

	var FromEventPatternStream = (function (_super) {
	    __extends(FromEventPatternStream, _super);
	    function FromEventPatternStream(addHandler, removeHandler) {
	        var _this = _super.call(this, null) || this;
	        _this._addHandler = null;
	        _this._removeHandler = null;
	        _this._addHandler = addHandler;
	        _this._removeHandler = removeHandler;
	        return _this;
	    }
	    FromEventPatternStream.create = function (addHandler, removeHandler) {
	        var obj = new this(addHandler, removeHandler);
	        return obj;
	    };
	    FromEventPatternStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        function innerHandler(event) {
	            observer.next(event);
	        }
	        this._addHandler(innerHandler);
	        return SingleDisposable.create(function () {
	            self._removeHandler(innerHandler);
	        });
	    };
	    return FromEventPatternStream;
	}(BaseStream));

	var IntervalStream = (function (_super) {
	    __extends(IntervalStream, _super);
	    function IntervalStream(interval, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._interval = null;
	        _this._interval = interval;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalStream.create = function (interval, scheduler) {
	        var obj = new this(interval, scheduler);
	        obj.initWhenCreate();
	        return obj;
	    };
	    IntervalStream.prototype.initWhenCreate = function () {
	        this._interval = this._interval <= 0 ? 1 : this._interval;
	    };
	    IntervalStream.prototype.subscribeCore = function (observer) {
	        var self = this, id = null;
	        id = this.scheduler.publishInterval(observer, 0, this._interval, function (count) {
	            observer.next(count);
	            return count + 1;
	        });
	        return SingleDisposable.create(function () {
	            root$2.clearInterval(id);
	        });
	    };
	    return IntervalStream;
	}(BaseStream));

	var IntervalRequestStream = (function (_super) {
	    __extends(IntervalRequestStream, _super);
	    function IntervalRequestStream(scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._isEnd = false;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalRequestStream.create = function (scheduler) {
	        var obj = new this(scheduler);
	        return obj;
	    };
	    IntervalRequestStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        this.scheduler.publishIntervalRequest(observer, function (time) {
	            observer.next(time);
	            return self._isEnd;
	        });
	        return SingleDisposable.create(function () {
	            root$2.cancelNextRequestAnimationFrame(self.scheduler.requestLoopId);
	            self._isEnd = true;
	        });
	    };
	    return IntervalRequestStream;
	}(BaseStream));

	var TimeoutStream = (function (_super) {
	    __extends(TimeoutStream, _super);
	    function TimeoutStream(time, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._time = null;
	        _this._time = time;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    TimeoutStream.create = function (time, scheduler) {
	        var obj = new this(time, scheduler);
	        return obj;
	    };
	    TimeoutStream.prototype.subscribeCore = function (observer) {
	        var id = null;
	        id = this.scheduler.publishTimeout(observer, this._time, function (time) {
	            observer.next(time);
	        });
	        return SingleDisposable.create(function () {
	            root$2.clearTimeout(id);
	        });
	    };
	    return TimeoutStream;
	}(BaseStream));
	__decorate([
	    requireCheck(function (time, scheduler) {
	        assert(time > 0, Log$1.info.FUNC_SHOULD("time", "> 0"));
	    })
	], TimeoutStream, "create", null);

	var DeferStream = (function (_super) {
	    __extends(DeferStream, _super);
	    function DeferStream(buildStreamFunc) {
	        var _this = _super.call(this, null) || this;
	        _this._buildStreamFunc = null;
	        _this._buildStreamFunc = buildStreamFunc;
	        return _this;
	    }
	    DeferStream.create = function (buildStreamFunc) {
	        var obj = new this(buildStreamFunc);
	        return obj;
	    };
	    DeferStream.prototype.subscribeCore = function (observer) {
	        var group = GroupDisposable.create();
	        group.add(this._buildStreamFunc().buildStream(observer));
	        return group;
	    };
	    return DeferStream;
	}(BaseStream));

	var Operator = (function () {
	    function Operator() {
	    }
	    Operator.empty = function () {
	        return this.createStream(function (observer) {
	            observer.completed();
	        });
	    };
	    Operator.createStream = function (subscribeFunc) {
	        return AnonymousStream.create(subscribeFunc);
	    };
	    Operator.fromArray = function (array, scheduler) {
	        if (scheduler === void 0) { scheduler = Scheduler.create(); }
	        return FromArrayStream.create(array, scheduler);
	    };
	    return Operator;
	}());
	Operator = __decorate([
	    registerClass("Operator")
	], Operator);



	var fromPromise = function (promise, scheduler) {
	    if (scheduler === void 0) { scheduler = Scheduler.create(); }
	    return FromPromiseStream.create(promise, scheduler);
	};

	var MergeAllObserver = (function (_super) {
	    __extends(MergeAllObserver, _super);
	    function MergeAllObserver(currentObserver, streamGroup, groupDisposable) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this.done = false;
	        _this.currentObserver = null;
	        _this._streamGroup = null;
	        _this._groupDisposable = null;
	        _this.currentObserver = currentObserver;
	        _this._streamGroup = streamGroup;
	        _this._groupDisposable = groupDisposable;
	        return _this;
	    }
	    MergeAllObserver.create = function (currentObserver, streamGroup, groupDisposable) {
	        return new this(currentObserver, streamGroup, groupDisposable);
	    };
	    MergeAllObserver.prototype.onNext = function (innerSource) {
	        if (JudgeUtils$2.isPromise(innerSource)) {
	            innerSource = fromPromise(innerSource);
	        }
	        this._streamGroup.addChild(innerSource);
	        this._groupDisposable.add(innerSource.buildStream(InnerObserver.create(this, this._streamGroup, innerSource)));
	    };
	    MergeAllObserver.prototype.onError = function (error) {
	        this.currentObserver.error(error);
	    };
	    MergeAllObserver.prototype.onCompleted = function () {
	        this.done = true;
	        if (this._streamGroup.getCount() === 0) {
	            this.currentObserver.completed();
	        }
	    };
	    return MergeAllObserver;
	}(Observer));
	__decorate([
	    requireCheck(function (innerSource) {
	        assert(innerSource instanceof Stream || JudgeUtils$2.isPromise(innerSource), Log$1.info.FUNC_MUST_BE("innerSource", "Stream or Promise"));
	    })
	], MergeAllObserver.prototype, "onNext", null);
	var InnerObserver = (function (_super) {
	    __extends(InnerObserver, _super);
	    function InnerObserver(parent, streamGroup, currentStream) {
	        var _this = _super.call(this, null, null, null) || this;
	        _this._parent = null;
	        _this._streamGroup = null;
	        _this._currentStream = null;
	        _this._parent = parent;
	        _this._streamGroup = streamGroup;
	        _this._currentStream = currentStream;
	        return _this;
	    }
	    InnerObserver.create = function (parent, streamGroup, currentStream) {
	        var obj = new this(parent, streamGroup, currentStream);
	        return obj;
	    };
	    InnerObserver.prototype.onNext = function (value) {
	        this._parent.currentObserver.next(value);
	    };
	    InnerObserver.prototype.onError = function (error) {
	        this._parent.currentObserver.error(error);
	    };
	    InnerObserver.prototype.onCompleted = function () {
	        var currentStream = this._currentStream, parent = this._parent;
	        this._streamGroup.removeChild(function (stream) {
	            return JudgeUtils$2.isEqual(stream, currentStream);
	        });
	        if (this._isAsync() && this._streamGroup.getCount() === 0) {
	            parent.currentObserver.completed();
	        }
	    };
	    InnerObserver.prototype._isAsync = function () {
	        return this._parent.done;
	    };
	    return InnerObserver;
	}(Observer));

	var MergeAllStream = (function (_super) {
	    __extends(MergeAllStream, _super);
	    function MergeAllStream(source) {
	        var _this = _super.call(this, null) || this;
	        _this._source = null;
	        _this._observer = null;
	        _this._source = source;
	        _this.scheduler = _this._source.scheduler;
	        return _this;
	    }
	    MergeAllStream.create = function (source) {
	        var obj = new this(source);
	        return obj;
	    };
	    MergeAllStream.prototype.subscribeCore = function (observer) {
	        var streamGroup = Collection$1.create(), groupDisposable = GroupDisposable.create();
	        this._source.buildStream(MergeAllObserver.create(observer, streamGroup, groupDisposable));
	        return groupDisposable;
	    };
	    return MergeAllStream;
	}(BaseStream));
	MergeAllStream = __decorate([
	    registerClass("MergeAllStream")
	], MergeAllStream);

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
	        var meshes = {};
	        var meshId = fileName + "_mesh";
	        result.meshes = meshes;
	        meshes[meshId] = {
	            name: meshId,
	            primitives: this._buildPrimitiveArr()
	        };
	        return result;
	    };
	    ObjLoader.prototype._buildPrimitiveArr = function () {
	        var me = this, arr = [];
	        this.objects.forEach(function (objectModel) {
	            console.log(objectModel);
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

	var MaterialLoader = (function () {
	    function MaterialLoader() {
	        this.materials = new Collection$1();
	    }
	    MaterialLoader.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    MaterialLoader.prototype.convert = function (result, fileContent) {
	        var materials = {};
	        return materials;
	    };
	    return MaterialLoader;
	}());

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}



	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

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

	var AjaxUtil = (function () {
	    function AjaxUtil() {
	    }
	    AjaxUtil.ajax = function (config) {
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
	    AjaxUtil._createAjax = function (error) {
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
	    return AjaxUtil;
	}());

	var Entity$2 = (function () {
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
	Entity$2.UID = 1;

	var JudgeUtils$3 = (function (_super) {
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
	}(JudgeUtils$1));

	var SubjectObserver$1 = (function () {
	    function SubjectObserver() {
	        this.observers = Collection.create();
	        this._disposable = null;
	    }
	    SubjectObserver.prototype.isEmpty = function () {
	        return this.observers.getCount() === 0;
	    };
	    SubjectObserver.prototype.next = function (value) {
	        this.observers.forEach(function (ob) {
	            ob.next(value);
	        });
	    };
	    SubjectObserver.prototype.error = function (error) {
	        this.observers.forEach(function (ob) {
	            ob.error(error);
	        });
	    };
	    SubjectObserver.prototype.completed = function () {
	        this.observers.forEach(function (ob) {
	            ob.completed();
	        });
	    };
	    SubjectObserver.prototype.addChild = function (observer) {
	        this.observers.addChild(observer);
	        observer.setDisposable(this._disposable);
	    };
	    SubjectObserver.prototype.removeChild = function (observer) {
	        this.observers.removeChild(function (ob) {
	            return JudgeUtils$3.isEqual(ob, observer);
	        });
	    };
	    SubjectObserver.prototype.dispose = function () {
	        this.observers.forEach(function (ob) {
	            ob.dispose();
	        });
	        this.observers.removeAllChildren();
	    };
	    SubjectObserver.prototype.setDisposable = function (disposable) {
	        this.observers.forEach(function (observer) {
	            observer.setDisposable(disposable);
	        });
	        this._disposable = disposable;
	    };
	    return SubjectObserver;
	}());

	var Observer$1 = (function (_super) {
	    __extends(Observer, _super);
	    function Observer() {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var _this = _super.call(this, "Observer") || this;
	        _this._isDisposed = null;
	        _this.onUserNext = null;
	        _this.onUserError = null;
	        _this.onUserCompleted = null;
	        _this._isStop = false;
	        _this._disposable = null;
	        if (args.length === 1) {
	            var observer_1 = args[0];
	            _this.onUserNext = function (v) {
	                observer_1.next(v);
	            };
	            _this.onUserError = function (e) {
	                observer_1.error(e);
	            };
	            _this.onUserCompleted = function () {
	                observer_1.completed();
	            };
	        }
	        else {
	            var onNext = args[0], onError = args[1], onCompleted = args[2];
	            _this.onUserNext = onNext || function (v) { };
	            _this.onUserError = onError || function (e) {
	                throw e;
	            };
	            _this.onUserCompleted = onCompleted || function () { };
	        }
	        return _this;
	    }
	    Object.defineProperty(Observer.prototype, "isDisposed", {
	        get: function () {
	            return this._isDisposed;
	        },
	        set: function (isDisposed) {
	            this._isDisposed = isDisposed;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Observer.prototype.next = function (value) {
	        if (!this._isStop) {
	            return this.onNext(value);
	        }
	    };
	    Observer.prototype.error = function (error) {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onError(error);
	        }
	    };
	    Observer.prototype.completed = function () {
	        if (!this._isStop) {
	            this._isStop = true;
	            this.onCompleted();
	        }
	    };
	    Observer.prototype.dispose = function () {
	        this._isStop = true;
	        this._isDisposed = true;
	        if (this._disposable) {
	            this._disposable.dispose();
	        }
	    };
	    Observer.prototype.setDisposable = function (disposable) {
	        this._disposable = disposable;
	    };
	    return Observer;
	}(Entity$2));

	var Main$2 = (function () {
	    function Main() {
	    }
	    return Main;
	}());
	Main$2.isTest = false;

	function assert$1(cond, message) {
	    if (message === void 0) { message = "contract error"; }
	    Log.error(!cond, message);
	}
	function requireCheck$1(InFunc) {
	    return function (target, name, descriptor) {
	        var value = descriptor.value;
	        descriptor.value = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            if (Main$2.isTest) {
	                InFunc.apply(this, args);
	            }
	            return value.apply(this, args);
	        };
	        return descriptor;
	    };
	}

	var AutoDetachObserver$1 = (function (_super) {
	    __extends(AutoDetachObserver, _super);
	    function AutoDetachObserver() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    AutoDetachObserver.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (args.length === 1) {
	            return new this(args[0]);
	        }
	        else {
	            return new this(args[0], args[1], args[2]);
	        }
	    };
	    AutoDetachObserver.prototype.dispose = function () {
	        if (this.isDisposed) {
	            return;
	        }
	        _super.prototype.dispose.call(this);
	    };
	    AutoDetachObserver.prototype.onNext = function (value) {
	        try {
	            this.onUserNext(value);
	        }
	        catch (e) {
	            this.onError(e);
	        }
	    };
	    AutoDetachObserver.prototype.onError = function (error) {
	        try {
	            this.onUserError(error);
	        }
	        catch (e) {
	            throw e;
	        }
	        finally {
	            this.dispose();
	        }
	    };
	    AutoDetachObserver.prototype.onCompleted = function () {
	        try {
	            this.onUserCompleted();
	            this.dispose();
	        }
	        catch (e) {
	            throw e;
	        }
	    };
	    return AutoDetachObserver;
	}(Observer$1));
	__decorate([
	    requireCheck$1(function () {
	        if (this.isDisposed) {
	            Log.warn("only can dispose once");
	        }
	    })
	], AutoDetachObserver$1.prototype, "dispose", null);

	var InnerSubscription$1 = (function () {
	    function InnerSubscription(subject, observer) {
	        this._subject = null;
	        this._observer = null;
	        this._subject = subject;
	        this._observer = observer;
	    }
	    InnerSubscription.create = function (subject, observer) {
	        var obj = new this(subject, observer);
	        return obj;
	    };
	    InnerSubscription.prototype.dispose = function () {
	        this._subject.remove(this._observer);
	        this._observer.dispose();
	    };
	    return InnerSubscription;
	}());

	var Subject$1 = (function () {
	    function Subject() {
	        this._source = null;
	        this._observer = new SubjectObserver$1();
	    }
	    Subject.create = function () {
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Subject.prototype, "source", {
	        get: function () {
	            return this._source;
	        },
	        set: function (source) {
	            this._source = source;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Subject.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = arg1 instanceof Observer$1
	            ? arg1
	            : AutoDetachObserver$1.create(arg1, onError, onCompleted);
	        this._observer.addChild(observer);
	        return InnerSubscription$1.create(this, observer);
	    };
	    Subject.prototype.next = function (value) {
	        this._observer.next(value);
	    };
	    Subject.prototype.error = function (error) {
	        this._observer.error(error);
	    };
	    Subject.prototype.completed = function () {
	        this._observer.completed();
	    };
	    Subject.prototype.start = function () {
	        if (!this._source) {
	            return;
	        }
	        this._observer.setDisposable(this._source.buildStream(this));
	    };
	    Subject.prototype.remove = function (observer) {
	        this._observer.removeChild(observer);
	    };
	    Subject.prototype.dispose = function () {
	        this._observer.dispose();
	    };
	    return Subject;
	}());

	var SingleDisposable$1 = (function (_super) {
	    __extends(SingleDisposable, _super);
	    function SingleDisposable(disposeHandler) {
	        var _this = _super.call(this, "SingleDisposable") || this;
	        _this._disposeHandler = null;
	        _this._isDisposed = false;
	        _this._disposeHandler = disposeHandler;
	        return _this;
	    }
	    SingleDisposable.create = function (disposeHandler) {
	        if (disposeHandler === void 0) { disposeHandler = function () { }; }
	        var obj = new this(disposeHandler);
	        return obj;
	    };
	    SingleDisposable.prototype.setDisposeHandler = function (handler) {
	        this._disposeHandler = handler;
	    };
	    SingleDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._disposeHandler();
	    };
	    return SingleDisposable;
	}(Entity$2));

	var ClassMapUtils$1 = (function () {
	    function ClassMapUtils() {
	    }
	    ClassMapUtils.addClassMap = function (className, _class) {
	        this._classMap[className] = _class;
	    };
	    ClassMapUtils.getClass = function (className) {
	        return this._classMap[className];
	    };
	    return ClassMapUtils;
	}());
	ClassMapUtils$1._classMap = {};

	var FunctionUtils$1 = (function () {
	    function FunctionUtils() {
	    }
	    FunctionUtils.bind = function (object, func) {
	        return function () {
	            return func.apply(object, arguments);
	        };
	    };
	    return FunctionUtils;
	}());

	var Stream$1 = (function (_super) {
	    __extends(Stream, _super);
	    function Stream(subscribeFunc) {
	        var _this = _super.call(this, "Stream") || this;
	        _this.scheduler = null;
	        _this.subscribeFunc = null;
	        _this.subscribeFunc = subscribeFunc || function () { };
	        return _this;
	    }
	    Stream.prototype.buildStream = function (observer) {
	        return SingleDisposable$1.create((this.subscribeFunc(observer) || function () { }));
	    };
	    Stream.prototype.do = function (onNext, onError, onCompleted) {
	        return ClassMapUtils$1.getClass("DoStream").create(this, onNext, onError, onCompleted);
	    };
	    Stream.prototype.map = function (selector) {
	        return ClassMapUtils$1.getClass("MapStream").create(this, selector);
	    };
	    Stream.prototype.flatMap = function (selector) {
	        return this.map(selector).mergeAll();
	    };
	    Stream.prototype.concatMap = function (selector) {
	        return this.map(selector).concatAll();
	    };
	    Stream.prototype.mergeAll = function () {
	        return ClassMapUtils$1.getClass("MergeAllStream").create(this);
	    };
	    Stream.prototype.concatAll = function () {
	        return this.merge(1);
	    };
	    Stream.prototype.skipUntil = function (otherStream) {
	        return ClassMapUtils$1.getClass("SkipUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.takeUntil = function (otherStream) {
	        return ClassMapUtils$1.getClass("TakeUntilStream").create(this, otherStream);
	    };
	    Stream.prototype.take = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils$1.getClass("Operator").empty();
	        }
	        return ClassMapUtils$1.getClass("Operator").createStream(function (observer) {
	            self.subscribe(function (value) {
	                if (count > 0) {
	                    observer.next(value);
	                }
	                count--;
	                if (count <= 0) {
	                    observer.completed();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeLast = function (count) {
	        if (count === void 0) { count = 1; }
	        var self = this;
	        if (count === 0) {
	            return ClassMapUtils$1.getClass("Operator").empty();
	        }
	        return ClassMapUtils$1.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > count) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                while (queue.length > 0) {
	                    observer.next(queue.shift());
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.takeWhile = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        var self = this, bindPredicate = null;
	        bindPredicate = FunctionUtils$1.bind(thisArg, predicate);
	        return ClassMapUtils$1.getClass("Operator").createStream(function (observer) {
	            var i = 0, isStart = false;
	            self.subscribe(function (value) {
	                if (bindPredicate(value, i++, self)) {
	                    try {
	                        observer.next(value);
	                        isStart = true;
	                    }
	                    catch (e) {
	                        observer.error(e);
	                        return;
	                    }
	                }
	                else {
	                    if (isStart) {
	                        observer.completed();
	                    }
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.lastOrDefault = function (defaultValue) {
	        if (defaultValue === void 0) { defaultValue = null; }
	        var self = this;
	        return ClassMapUtils$1.getClass("Operator").createStream(function (observer) {
	            var queue = [];
	            self.subscribe(function (value) {
	                queue.push(value);
	                if (queue.length > 1) {
	                    queue.shift();
	                }
	            }, function (e) {
	                observer.error(e);
	            }, function () {
	                if (queue.length === 0) {
	                    observer.next(defaultValue);
	                }
	                else {
	                    while (queue.length > 0) {
	                        observer.next(queue.shift());
	                    }
	                }
	                observer.completed();
	            });
	        });
	    };
	    Stream.prototype.filter = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils$1.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils$1.getClass("FilterStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.filterWithState = function (predicate, thisArg) {
	        if (thisArg === void 0) { thisArg = this; }
	        if (this instanceof ClassMapUtils$1.getClass("FilterStream")) {
	            var self = this;
	            return self.internalFilter(predicate, thisArg);
	        }
	        return ClassMapUtils$1.getClass("FilterWithStateStream").create(this, predicate, thisArg);
	    };
	    Stream.prototype.concat = function () {
	        var args = null;
	        if (JudgeUtils$3.isArray(arguments[0])) {
	            args = arguments[0];
	        }
	        else {
	            args = Array.prototype.slice.call(arguments, 0);
	        }
	        args.unshift(this);
	        return ClassMapUtils$1.getClass("ConcatStream").create(args);
	    };
	    Stream.prototype.merge = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        if (JudgeUtils$3.isNumber(args[0])) {
	            var maxConcurrent = args[0];
	            return ClassMapUtils$1.getClass("MergeStream").create(this, maxConcurrent);
	        }
	        if (JudgeUtils$3.isArray(args[0])) {
	            args = arguments[0];
	        }
	        else {
	        }
	        var stream = null;
	        args.unshift(this);
	        stream = ClassMapUtils$1.getClass("Operator").fromArray(args).mergeAll();
	        return stream;
	    };
	    Stream.prototype.repeat = function (count) {
	        if (count === void 0) { count = -1; }
	        return ClassMapUtils$1.getClass("RepeatStream").create(this, count);
	    };
	    Stream.prototype.ignoreElements = function () {
	        return ClassMapUtils$1.getClass("IgnoreElementsStream").create(this);
	    };
	    Stream.prototype.handleSubject = function (subject) {
	        if (this._isSubject(subject)) {
	            this._setSubject(subject);
	            return true;
	        }
	        return false;
	    };
	    Stream.prototype._isSubject = function (subject) {
	        return subject instanceof Subject$1;
	    };
	    Stream.prototype._setSubject = function (subject) {
	        subject.source = this;
	    };
	    return Stream;
	}(Entity$2));
	__decorate([
	    requireCheck$1(function (count) {
	        if (count === void 0) { count = 1; }
	        assert$1(count >= 0, Log.info.FUNC_SHOULD("count", ">= 0"));
	    })
	], Stream$1.prototype, "take", null);
	__decorate([
	    requireCheck$1(function (count) {
	        if (count === void 0) { count = 1; }
	        assert$1(count >= 0, Log.info.FUNC_SHOULD("count", ">= 0"));
	    })
	], Stream$1.prototype, "takeLast", null);

	var root$3;
	if (JudgeUtils$3.isNodeJs() && typeof global != "undefined") {
	    root$3 = global;
	}
	else if (typeof window != "undefined") {
	    root$3 = window;
	}
	else if (typeof self != "undefined") {
	    root$3 = self;
	}
	else {
	    Log.error("no avaliable root!");
	}

	var Scheduler$1 = (function () {
	    function Scheduler() {
	        this._requestLoopId = null;
	    }
	    Scheduler.create = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var obj = new this();
	        return obj;
	    };
	    Object.defineProperty(Scheduler.prototype, "requestLoopId", {
	        get: function () {
	            return this._requestLoopId;
	        },
	        set: function (requestLoopId) {
	            this._requestLoopId = requestLoopId;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Scheduler.prototype.publishRecursive = function (observer, initial, action) {
	        action(initial);
	    };
	    Scheduler.prototype.publishInterval = function (observer, initial, interval, action) {
	        return root$3.setInterval(function () {
	            initial = action(initial);
	        }, interval);
	    };
	    Scheduler.prototype.publishIntervalRequest = function (observer, action) {
	        var self = this, loop = function (time) {
	            var isEnd = action(time);
	            if (isEnd) {
	                return;
	            }
	            self._requestLoopId = root$3.requestNextAnimationFrame(loop);
	        };
	        this._requestLoopId = root$3.requestNextAnimationFrame(loop);
	    };
	    Scheduler.prototype.publishTimeout = function (observer, time, action) {
	        return root$3.setTimeout(function () {
	            action(time);
	            observer.completed();
	        }, time);
	    };
	    return Scheduler;
	}());

	var AnonymousStream$1 = (function (_super) {
	    __extends(AnonymousStream, _super);
	    function AnonymousStream(subscribeFunc) {
	        var _this = _super.call(this, subscribeFunc) || this;
	        _this.scheduler = Scheduler$1.create();
	        return _this;
	    }
	    AnonymousStream.create = function (subscribeFunc) {
	        var obj = new this(subscribeFunc);
	        return obj;
	    };
	    AnonymousStream.prototype.buildStream = function (observer) {
	        return SingleDisposable$1.create((this.subscribeFunc(observer) || function () { }));
	    };
	    AnonymousStream.prototype.subscribe = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var observer = null;
	        if (args[0] instanceof Subject$1) {
	            var subject = args[0];
	            this.handleSubject(subject);
	            return;
	        }
	        else if (JudgeUtils$3.isIObserver(args[0])) {
	            observer = AutoDetachObserver$1.create(args[0]);
	        }
	        else {
	            var onNext = args[0], onError = args[1] || null, onCompleted = args[2] || null;
	            observer = AutoDetachObserver$1.create(onNext, onError, onCompleted);
	        }
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    return AnonymousStream;
	}(Stream$1));

	var BaseStream$1 = (function (_super) {
	    __extends(BaseStream, _super);
	    function BaseStream() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    BaseStream.prototype.subscribe = function (arg1, onError, onCompleted) {
	        var observer = null;
	        if (this.handleSubject(arg1)) {
	            return;
	        }
	        observer = arg1 instanceof Observer$1
	            ? AutoDetachObserver$1.create(arg1)
	            : AutoDetachObserver$1.create(arg1, onError, onCompleted);
	        observer.setDisposable(this.buildStream(observer));
	        return observer;
	    };
	    BaseStream.prototype.buildStream = function (observer) {
	        _super.prototype.buildStream.call(this, observer);
	        return this.subscribeCore(observer);
	    };
	    return BaseStream;
	}(Stream$1));

	var FromArrayStream$1 = (function (_super) {
	    __extends(FromArrayStream, _super);
	    function FromArrayStream(array, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._array = null;
	        _this._array = array;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromArrayStream.create = function (array, scheduler) {
	        var obj = new this(array, scheduler);
	        return obj;
	    };
	    FromArrayStream.prototype.subscribeCore = function (observer) {
	        var array = this._array, len = array.length;
	        function loopRecursive(i) {
	            if (i < len) {
	                observer.next(array[i]);
	                loopRecursive(i + 1);
	            }
	            else {
	                observer.completed();
	            }
	        }
	        this.scheduler.publishRecursive(observer, 0, loopRecursive);
	        return SingleDisposable$1.create();
	    };
	    return FromArrayStream;
	}(BaseStream$1));

	var FromPromiseStream$1 = (function (_super) {
	    __extends(FromPromiseStream, _super);
	    function FromPromiseStream(promise, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._promise = null;
	        _this._promise = promise;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    FromPromiseStream.create = function (promise, scheduler) {
	        var obj = new this(promise, scheduler);
	        return obj;
	    };
	    FromPromiseStream.prototype.subscribeCore = function (observer) {
	        this._promise.then(function (data) {
	            observer.next(data);
	            observer.completed();
	        }, function (err) {
	            observer.error(err);
	        }, observer);
	        return SingleDisposable$1.create();
	    };
	    return FromPromiseStream;
	}(BaseStream$1));

	var FromEventPatternStream$1 = (function (_super) {
	    __extends(FromEventPatternStream, _super);
	    function FromEventPatternStream(addHandler, removeHandler) {
	        var _this = _super.call(this, null) || this;
	        _this._addHandler = null;
	        _this._removeHandler = null;
	        _this._addHandler = addHandler;
	        _this._removeHandler = removeHandler;
	        return _this;
	    }
	    FromEventPatternStream.create = function (addHandler, removeHandler) {
	        var obj = new this(addHandler, removeHandler);
	        return obj;
	    };
	    FromEventPatternStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        function innerHandler(event) {
	            observer.next(event);
	        }
	        this._addHandler(innerHandler);
	        return SingleDisposable$1.create(function () {
	            self._removeHandler(innerHandler);
	        });
	    };
	    return FromEventPatternStream;
	}(BaseStream$1));

	var IntervalStream$1 = (function (_super) {
	    __extends(IntervalStream, _super);
	    function IntervalStream(interval, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._interval = null;
	        _this._interval = interval;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalStream.create = function (interval, scheduler) {
	        var obj = new this(interval, scheduler);
	        obj.initWhenCreate();
	        return obj;
	    };
	    IntervalStream.prototype.initWhenCreate = function () {
	        this._interval = this._interval <= 0 ? 1 : this._interval;
	    };
	    IntervalStream.prototype.subscribeCore = function (observer) {
	        var self = this, id = null;
	        id = this.scheduler.publishInterval(observer, 0, this._interval, function (count) {
	            observer.next(count);
	            return count + 1;
	        });
	        return SingleDisposable$1.create(function () {
	            root$3.clearInterval(id);
	        });
	    };
	    return IntervalStream;
	}(BaseStream$1));

	var IntervalRequestStream$1 = (function (_super) {
	    __extends(IntervalRequestStream, _super);
	    function IntervalRequestStream(scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._isEnd = false;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    IntervalRequestStream.create = function (scheduler) {
	        var obj = new this(scheduler);
	        return obj;
	    };
	    IntervalRequestStream.prototype.subscribeCore = function (observer) {
	        var self = this;
	        this.scheduler.publishIntervalRequest(observer, function (time) {
	            observer.next(time);
	            return self._isEnd;
	        });
	        return SingleDisposable$1.create(function () {
	            root$3.cancelNextRequestAnimationFrame(self.scheduler.requestLoopId);
	            self._isEnd = true;
	        });
	    };
	    return IntervalRequestStream;
	}(BaseStream$1));

	var TimeoutStream$1 = (function (_super) {
	    __extends(TimeoutStream, _super);
	    function TimeoutStream(time, scheduler) {
	        var _this = _super.call(this, null) || this;
	        _this._time = null;
	        _this._time = time;
	        _this.scheduler = scheduler;
	        return _this;
	    }
	    TimeoutStream.create = function (time, scheduler) {
	        var obj = new this(time, scheduler);
	        return obj;
	    };
	    TimeoutStream.prototype.subscribeCore = function (observer) {
	        var id = null;
	        id = this.scheduler.publishTimeout(observer, this._time, function (time) {
	            observer.next(time);
	        });
	        return SingleDisposable$1.create(function () {
	            root$3.clearTimeout(id);
	        });
	    };
	    return TimeoutStream;
	}(BaseStream$1));
	__decorate([
	    requireCheck$1(function (time, scheduler) {
	        assert$1(time > 0, Log.info.FUNC_SHOULD("time", "> 0"));
	    })
	], TimeoutStream$1, "create", null);

	var GroupDisposable$1 = (function (_super) {
	    __extends(GroupDisposable, _super);
	    function GroupDisposable(disposable) {
	        var _this = _super.call(this, "GroupDisposable") || this;
	        _this._group = Collection.create();
	        _this._isDisposed = false;
	        if (disposable) {
	            _this._group.addChild(disposable);
	        }
	        return _this;
	    }
	    GroupDisposable.create = function (disposable) {
	        var obj = new this(disposable);
	        return obj;
	    };
	    GroupDisposable.prototype.add = function (disposable) {
	        this._group.addChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.remove = function (disposable) {
	        this._group.removeChild(disposable);
	        return this;
	    };
	    GroupDisposable.prototype.dispose = function () {
	        if (this._isDisposed) {
	            return;
	        }
	        this._isDisposed = true;
	        this._group.forEach(function (disposable) {
	            disposable.dispose();
	        });
	    };
	    return GroupDisposable;
	}(Entity$2));

	var DeferStream$1 = (function (_super) {
	    __extends(DeferStream, _super);
	    function DeferStream(buildStreamFunc) {
	        var _this = _super.call(this, null) || this;
	        _this._buildStreamFunc = null;
	        _this._buildStreamFunc = buildStreamFunc;
	        return _this;
	    }
	    DeferStream.create = function (buildStreamFunc) {
	        var obj = new this(buildStreamFunc);
	        return obj;
	    };
	    DeferStream.prototype.subscribeCore = function (observer) {
	        var group = GroupDisposable$1.create();
	        group.add(this._buildStreamFunc().buildStream(observer));
	        return group;
	    };
	    return DeferStream;
	}(BaseStream$1));

	function registerClass$1(className) {
	    return function (target) {
	        ClassMapUtils$1.addClassMap(className, target);
	    };
	}

	var Operator$1 = (function () {
	    function Operator() {
	    }
	    Operator.empty = function () {
	        return this.createStream(function (observer) {
	            observer.completed();
	        });
	    };
	    Operator.createStream = function (subscribeFunc) {
	        return AnonymousStream$1.create(subscribeFunc);
	    };
	    Operator.fromArray = function (array, scheduler) {
	        if (scheduler === void 0) { scheduler = Scheduler$1.create(); }
	        return FromArrayStream$1.create(array, scheduler);
	    };
	    return Operator;
	}());
	Operator$1 = __decorate([
	    registerClass$1("Operator")
	], Operator$1);
	var createStream$1 = Operator$1.createStream;










	var just$1 = function (returnValue) {
	    return createStream$1(function (observer) {
	        observer.next(returnValue);
	        observer.completed();
	    });
	};

	var Loader = (function () {
	    function Loader() {
	        this._objLoader = ObjLoader.create();
	        this._materialLoader = MaterialLoader.create();
	    }
	    Loader.of = function () {
	        var obj = new this();
	        return obj;
	    };
	    Loader.prototype.convert = function (filePath) {
	        var _this = this;
	        var result = {};
	        var objStream = this._getStream(filePath);
	        var fileName = this._getName(filePath);
	        return objStream.flatMap(function (fileContent) {
	            _this._objLoader.convert(result, fileContent, fileName);
	            if (_this._objLoader.mtlFilePath) {
	                var materialStream = _this._getStream("./build/" + _this._objLoader.mtlFilePath);
	                return materialStream.map(function (fileContent) {
	                    result.materials = _this._materialLoader.convert(result, fileContent);
	                    return result;
	                });
	            }
	            return just$1(result);
	        });
	    };
	    Loader.prototype._getStream = function (filePath) {
	        return fromPromise(new rsvp_1(function (resolve, reject) {
	            AjaxUtil.ajax({
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
	    Test.prototype.init = function () {
	        Loader.of().convert("./build/cube.obj").subscribe(function (val) {
	            console.log(val);
	        });
	    };
	    Test.prototype.testCanvas = function (models) {
	        Main.setCanvas("webgl").init();
	        var gameobj = this.createTriangle();
	        gameobj.transform.rotate(45, 1, 1, 0);
	        gameobj.transform.translate(-1.4, 2, 0.2);
	        var object = this.createPlane(models[0]);
	        object.transform.translate(-0.4, -0.2, 0);
	        object.transform.rotate(30, 0, 1, 1);
	        var director = exports.Director.getInstance();
	        director.renderer.setClearColor(0, 0, 0, 1);
	        director.scene.addChild(object);
	        director.scene.addChild(this.createCamera());
	        director.start();
	    };
	    Test.prototype.createTriangle = function () {
	        var gameObject = GameObject.create();
	        var material = BasicMaterial.create();
	        material.color = Color.create("#0000ff");
	        material.opacity = 0.5;
	        var triangle = BoxGeometry.create();
	        triangle.material = material;
	        gameObject.addComponent(triangle);
	        gameObject.addComponent(MeshRenderer.create());
	        return gameObject;
	    };
	    Test.prototype.createPlane = function (model) {
	        var gameObject = GameObject.create();
	        var material = BasicMaterial.create();
	        material.color = Color.create("#ff0000");
	        var geometry = model;
	        geometry.material = material;
	        gameObject.addComponent(geometry);
	        gameObject.addComponent(MeshRenderer.create());
	        return gameObject;
	    };
	    Test.prototype.createCamera = function () {
	        var camera = GameObject.create(), view = exports.Device.getInstance().view, cameraComponent = PerspectiveCamera.create();
	        cameraComponent.fovy = 30;
	        cameraComponent.aspect = view.width / view.height;
	        cameraComponent.near = 1;
	        cameraComponent.far = 100;
	        cameraComponent.translate(0, 0, -9);
	        var cameraControll = CameraController.create(cameraComponent);
	        camera.addComponent(cameraControll);
	        return camera;
	    };
	    return Test;
	}());
	var a = new Test();
	a.init();

	var ModelGeometry = (function (_super) {
	    __extends(ModelGeometry, _super);
	    function ModelGeometry() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.vertices = null;
	        _this.normal = null;
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
	            texCoord: this.texCoords,
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

	exports.Test = Test;
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
	exports.ArrayBuffer = ArrayBuffer;
	exports.Buffer = Buffer;
	exports.ElementBuffer = ElementBuffer;
	exports.MeshRenderer = MeshRenderer;
	exports.RendererComponent = RendererComponent;
	exports.GLSLDataSender = GLSLDataSender;
	exports.Program = Program;
	exports.BasicShaderLib = BasicShaderLib;
	exports.ShaderLib = ShaderLib;
	exports.BasicShader = BasicShader;
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
	exports.AjaxUtil = AjaxUtil;
	exports.ObjLoader = ObjLoader;
	exports.singleton = singleton;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=amy.js.map
