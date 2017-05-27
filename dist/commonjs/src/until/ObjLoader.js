"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rsvp_js_1 = require("rsvp/dist/rsvp.js");
var Operator_1 = require("wonder-frp/dist/commonjs/global/Operator");
require("wonder-frp/dist/commonjs/stream/MapStream");
var AjaxUtil_1 = require("./AjaxUtil");
var ObjLoader = (function () {
    function ObjLoader(path) {
        this._path = null;
        this.regexp = {
            vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
            face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
            face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
            face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
            face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
            object_pattern: /^[og]\s*(.+)?/,
            smoothing_pattern: /^s\s+(\d+|on|off)/,
            material_library_pattern: /^mtllib /,
            material_use_pattern: /^usemtl /
        };
        this._path = path;
    }
    ObjLoader.create = function (path) {
        var obj = new this(path);
        return obj;
    };
    ObjLoader.prototype.load = function (path) {
        var path = path == void 0 ? this._path : path;
        return Operator_1.fromPromise(new rsvp_js_1.Promise(function (resolve, reject) {
            AjaxUtil_1.AjaxUtil.ajax({
                url: path,
                success: function (val) { return resolve(val); },
                error: function (val) { return reject(val); }
            });
        }));
    };
    ObjLoader.prototype.parse = function () {
        var _this = this;
        this.load().subscribe(function (val) {
            if (val.indexOf('\r\n') !== -1) {
                val = val.replace(/\r\n/g, '\n');
            }
            if (val.indexOf('\\\n') !== -1) {
                val = val.replace(/\\\n/g, "");
            }
            var res = val.split("\n");
            var state = _this._createParserState();
            var result = [];
            for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                var line = res_1[_i];
                line = line.trim();
                var lineFirst = line.charAt(0);
                if (lineFirst === "#")
                    continue;
                if (lineFirst === 'v') {
                    var lineSecond = line.charAt(1);
                    if (lineSecond === ' ' && (result = _this.regexp.vertex_pattern.exec(line)) !== null) {
                        state.vertices.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                    }
                    else if (lineSecond === "n" && (result = _this.regexp.normal_pattern.exec(line)) !== null) {
                        state.normals.push(parseFloat(result[1]), parseFloat(result[2]), parseFloat(result[3]));
                    }
                    else if (lineSecond === "t" && (result = _this.regexp.uv_pattern.exec(line)) !== null) {
                        state.uvs.push(parseFloat(result[1]), parseFloat(result[2]));
                    }
                    else {
                        throw new Error("Unexpected vertex/normal/uv line: '" + line + "'");
                    }
                }
                else if (lineFirst === "f") {
                    if ((result = _this.regexp.face_vertex_uv_normal.exec(line)) !== null) {
                        state.addFace(result[1], result[4], result[7], result[10], result[2], result[5], result[8], result[11], result[3], result[6], result[9], result[12]);
                    }
                    else if ((result = _this.regexp.face_vertex_uv.exec(line)) !== null) {
                        state.addFace(result[1], result[3], result[5], result[7], result[2], result[4], result[6], result[8]);
                    }
                    else if ((result = _this.regexp.face_vertex_normal.exec(line)) !== null) {
                        state.addFace(result[1], result[3], result[5], result[7], undefined, undefined, undefined, undefined, result[2], result[4], result[6], result[8]);
                    }
                    else if ((result = _this.regexp.face_vertex.exec(line)) !== null) {
                        state.addFace(result[1], result[2], result[3], result[4]);
                    }
                    else {
                        throw new Error("Unexpected face line: '" + line + "'");
                    }
                }
                else if ((result = _this.regexp.object_pattern.exec(line)) !== null) {
                    var name = result[1];
                    state.startObject(name);
                }
                else if (_this.regexp.material_use_pattern.test(line)) {
                }
                else if ((result = _this.regexp.smoothing_pattern.exec(line)) !== null) {
                    var value = result[1].trim().toLowerCase();
                }
                else {
                }
            }
            console.log(11);
            state.finalize();
            console.log(state);
        });
    };
    ObjLoader.prototype._createParserState = function () {
        var state = {
            objects: [],
            object: {},
            vertices: [],
            normals: [],
            uvs: [],
            materialLibraries: [],
            startObject: function (name, declaration) {
                if (this.object && this.object.declaration === false) {
                    this.object.name = name;
                    this.object.declaration = (declaration !== false);
                    return;
                }
                var previousMaterial = (this.object && this.object.currentMaterial === 'function' ? this.object.currentMatrial() : undefined);
                if (this.object && typeof this.object._finalize === 'function') {
                    this.object._finalize(true);
                }
                this.object = {
                    name: name || '',
                    declaration: (declaration !== false),
                    geometry: {
                        vertices: [],
                        normals: [],
                        texCoord: []
                    },
                    materials: [],
                    startMaterial: function (name, libraries) {
                        var previous = this._finalize(false);
                        if (previous && (previous.inherited || previous.groupCount <= 0)) {
                            this.materials.splice(previous.index, 1);
                        }
                        var materil = {
                            index: this.materials.length,
                            name: name || '',
                            mtllib: (Array.isArray(libraries) && libraries.length > 0 ? libraries[libraries.length - 1] : ''),
                            smooth: (previous !== void 0 ? previous.smooth : this.smooth),
                            groupStart: (previous !== void 0 ? previous.groupEnd : 0),
                            groupEnd: -1,
                            groupCount: -1,
                            inherited: false,
                            clone: function (index) {
                                var cloned = {
                                    index: (typeof index === 'number' ? index : this.index),
                                    name: this.name,
                                    mtllib: this.mtllib,
                                    smooth: this.smooth,
                                    groupStart: 0,
                                    groupEnd: -1,
                                    groupCount: -1,
                                    inherited: false,
                                    clone: null
                                };
                                cloned.clone = this.clone.bind(cloned);
                                return cloned;
                            }
                        };
                        this.materials.push(materil);
                        return materil;
                    },
                    currentMatrial: function () {
                        if (this.materials.length > 0) {
                            return this.materials[this.materials.length - 1];
                        }
                        return void 0;
                    },
                    _finalize: function (end) {
                        var lastMultiMaterial = this.currentMatrial();
                        if (lastMultiMaterial && lastMultiMaterial.groupEnd === -1) {
                            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
                            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
                            lastMultiMaterial.inherited = false;
                        }
                        if (end && this.materials.length > 1) {
                            for (var mi = this.materials.length - 1; mi >= 0; mi--) {
                                if (this.materials[mi].groupCount <= 0) {
                                    this.materials.splice(mi, 1);
                                }
                            }
                        }
                        if (end && this.materials.length === 0) {
                            this.materials.push({
                                name: '',
                                smooth: this.smooth
                            });
                        }
                        return lastMultiMaterial;
                    }
                };
                if (previousMaterial && previousMaterial && typeof previousMaterial.clone === "function") {
                    var declared = previousMaterial.clone(0);
                    declared.inherited = true;
                    this.object.materials.push(declared);
                }
                this.objects.push(this.object);
            },
            finalize: function () {
                if (this.object && typeof this.object._finalize == "function") {
                    this.object._finalize(true);
                }
            },
            parseVertexIndex: function (value, len) {
                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 3) * 3;
            },
            parseNormalIndex: function (value, len) {
                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 3) * 3;
            },
            parseUVIndex: function (value, len) {
                var index = parseInt(value, 10);
                return (index >= 0 ? index - 1 : index + len / 2) * 2;
            },
            addVertex: function (a, b, c) {
                var src = this.vertices;
                var dst = this.object.geometry.vertices;
                dst.push(src[a + 0]);
                dst.push(src[a + 1]);
                dst.push(src[a + 2]);
                dst.push(src[b + 0]);
                dst.push(src[b + 1]);
                dst.push(src[b + 2]);
                dst.push(src[c + 0]);
                dst.push(src[c + 1]);
                dst.push(src[c + 2]);
            },
            addVertexLine: function (a) {
                var src = this.vertices;
                var dst = this.object.geometry.vertices;
                dst.push(src[a + 0]);
                dst.push(src[a + 1]);
                dst.push(src[a + 2]);
            },
            addNormal: function (a, b, c) {
                var src = this.normals;
                var dst = this.object.geometry.normals;
                dst.push(src[a + 0]);
                dst.push(src[a + 1]);
                dst.push(src[a + 2]);
                dst.push(src[b + 0]);
                dst.push(src[b + 1]);
                dst.push(src[b + 2]);
                dst.push(src[c + 0]);
                dst.push(src[c + 1]);
                dst.push(src[c + 2]);
            },
            addUV: function (a, b, c) {
                var src = this.uvs;
                var dst = this.object.geometry.uvs;
                dst.push(src[a + 0]);
                dst.push(src[a + 1]);
                dst.push(src[b + 0]);
                dst.push(src[b + 1]);
                dst.push(src[c + 0]);
                dst.push(src[c + 1]);
            },
            addUVLine: function (a) {
                var src = this.uvs;
                var dst = this.object.geometry.uvs;
                dst.push(src[a + 0]);
                dst.push(src[a + 1]);
            },
            addFace: function (a, b, c, d, ua, ub, uc, ud, na, nb, nc, nd) {
                var vLen = this.vertices.length;
                var ia = this.parseVertexIndex(a, vLen);
                var ib = this.parseVertexIndex(b, vLen);
                var ic = this.parseVertexIndex(c, vLen);
                var id;
                if (d === undefined) {
                    this.addVertex(ia, ib, ic);
                }
                else {
                    id = this.parseVertexIndex(d, vLen);
                    this.addVertex(ia, ib, id);
                    this.addVertex(ib, ic, id);
                }
                if (ua !== undefined) {
                    var uvLen = this.uvs.length;
                    ia = this.parseUVIndex(ua, uvLen);
                    ib = this.parseUVIndex(ub, uvLen);
                    ic = this.parseUVIndex(uc, uvLen);
                    if (d === undefined) {
                        this.addUV(ia, ib, ic);
                    }
                    else {
                        id = this.parseUVIndex(ud, uvLen);
                        this.addUV(ia, ib, id);
                        this.addUV(ib, ic, id);
                    }
                }
                if (na !== undefined) {
                    var nLen = this.normals.length;
                    ia = this.parseNormalIndex(na, nLen);
                    ib = na === nb ? ia : this.parseNormalIndex(nb, nLen);
                    ic = na === nc ? ia : this.parseNormalIndex(nc, nLen);
                    if (d === undefined) {
                        this.addNormal(ia, ib, ic);
                    }
                    else {
                        id = this.parseNormalIndex(nd, nLen);
                        this.addNormal(ia, ib, id);
                        this.addNormal(ib, ic, id);
                    }
                }
            },
            addLineGeometry: function (vertices, uvs) {
                this.object.geometry.type = 'Line';
                var vLen = this.vertices.length;
                var uvLen = this.uvs.length;
                for (var vi = 0, l = vertices.length; vi < l; vi++) {
                    this.addVertexLine(this.parseVertexIndex(vertices[vi], vLen));
                }
                for (var uvi = 0, l = uvs.length; uvi < l; uvi++) {
                    this.addUVLine(this.parseUVIndex(uvs[uvi], uvLen));
                }
            }
        };
        state.startObject("", false);
        return state;
    };
    return ObjLoader;
}());
exports.ObjLoader = ObjLoader;
//# sourceMappingURL=ObjLoader.js.map