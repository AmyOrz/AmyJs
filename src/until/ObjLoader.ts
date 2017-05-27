import { Promise } from "rsvp/dist/rsvp.js";
import { fromPromise } from "wonder-frp/dist/es2015/global/Operator";
import "wonder-frp/dist/es2015/stream/MapStream";
import { AjaxUtil } from "./AjaxUtil";
import { FromPromiseStream } from "wonder-frp/dist/es2015/stream/FromPromiseStream";
export class ObjLoader {
    public static create(path: string) {
        var obj = new this(path);

        return obj;
    }

    private _path: string = null;
    private regexp = {
        // v float float float
        vertex_pattern: /^v\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vn float float float
        normal_pattern: /^vn\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // vt float float
        uv_pattern: /^vt\s+([\d|\.|\+|\-|e|E]+)\s+([\d|\.|\+|\-|e|E]+)/,
        // f vertex vertex vertex
        face_vertex: /^f\s+(-?\d+)\s+(-?\d+)\s+(-?\d+)(?:\s+(-?\d+))?/,
        // f vertex/uv vertex/uv vertex/uv
        face_vertex_uv: /^f\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+))?/,
        // f vertex/uv/normal vertex/uv/normal vertex/uv/normal
        face_vertex_uv_normal: /^f\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)\s+(-?\d+)\/(-?\d+)\/(-?\d+)(?:\s+(-?\d+)\/(-?\d+)\/(-?\d+))?/,
        // f vertex//normal vertex//normal vertex//normal
        face_vertex_normal: /^f\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)\s+(-?\d+)\/\/(-?\d+)(?:\s+(-?\d+)\/\/(-?\d+))?/,
        // o object_name | g group_name
        object_pattern: /^[og]\s*(.+)?/,
        // s boolean
        smoothing_pattern: /^s\s+(\d+|on|off)/,
        // mtllib file_reference
        material_library_pattern: /^mtllib /,
        // usemtl material_name
        material_use_pattern: /^usemtl /
    };

    constructor(path: string) {
        this._path = path;
    }

    public load(path?: string): FromPromiseStream {
        var path = path == void 0 ? this._path : path;
        return fromPromise(new Promise((resolve, reject) => {
            AjaxUtil.ajax({
                url: path,
                success: val => resolve(val),
                error: val => reject(val)
            })
        }));
    }

    public parse() {

        this.load().subscribe((val) => {

            if(val.indexOf('\r\n') !== -1){
                val = val.replace(/\r\n/g,'\n');
            }
            if(val.indexOf('\\\n') !== -1){
                val = val.replace(/\\\n/g,"");
            }

            var res = val.split("\n");
            var state = this._createParserState();
            var result = [];

            for (var line of res) {

                line = line.trim();

                var lineFirst = line.charAt(0);

                if (lineFirst === "#") continue;

                if (lineFirst === 'v') {

                    var lineSecond = line.charAt(1);

                    if (lineSecond === ' ' && (result = this.regexp.vertex_pattern.exec(line)) !== null) {
                        //result =  ["v 1.0 2.0 3.0", "1.0", "2.0", "3.0"]
                        //          result[0]          res1   res2   res3

                        state.vertices.push(
                            parseFloat(result[1]),
                            parseFloat(result[2]),
                            parseFloat(result[3])
                        );
                    } else if(lineSecond === "n"  && (result = this.regexp.normal_pattern.exec(line)) !== null){
                        //result =  ["vn 1.0 2.0 3.0", "1.0", "2.0", "3.0"]

                        state.normals.push(
                            parseFloat( result[ 1 ] ),
                            parseFloat( result[ 2 ] ),
                            parseFloat( result[ 3 ] )
                        );
                    } else if(lineSecond === "t"  && (result = this.regexp.uv_pattern.exec(line)) !== null) {
                        //result =  ["vn 1.0 2.0", "1.0", "2.0"]

                        state.uvs.push(
                            parseFloat(result[1]),
                            parseFloat(result[2])
                        );
                    }else {
                        throw new Error( "Unexpected vertex/normal/uv line: '" + line  + "'" );
                    }
                } else if(lineFirst === "f") {

                    if ( ( result = this.regexp.face_vertex_uv_normal.exec( line ) ) !== null ) {

                        // f vertex/uv/normal vertex/uv/normal vertex/uv/normal
                        // 0                        1    2    3    4    5    6    7    8    9   10         11         12
                        // ["f 1/1/1 2/2/2 3/3/3", "1", "1", "1", "2", "2", "2", "3", "3", "3", undefined, undefined, undefined]

                        state.addFace(
                            result[ 1 ], result[ 4 ], result[ 7 ], result[ 10 ],
                            result[ 2 ], result[ 5 ], result[ 8 ], result[ 11 ],
                            result[ 3 ], result[ 6 ], result[ 9 ], result[ 12 ]
                        );

                    } else if ( ( result = this.regexp.face_vertex_uv.exec( line ) ) !== null ) {

                        // f vertex/uv vertex/uv vertex/uv
                        // 0                  1    2    3    4    5    6   7          8
                        // ["f 1/1 2/2 3/3", "1", "1", "2", "2", "3", "3", undefined, undefined]

                        state.addFace(
                            result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
                            result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
                        );

                    } else if ( ( result = this.regexp.face_vertex_normal.exec( line ) ) !== null ) {

                        // f vertex//normal vertex//normal vertex//normal
                        // 0                     1    2    3    4    5    6   7          8
                        // ["f 1//1 2//2 3//3", "1", "1", "2", "2", "3", "3", undefined, undefined]

                        state.addFace(
                            result[ 1 ], result[ 3 ], result[ 5 ], result[ 7 ],
                            undefined, undefined, undefined, undefined,
                            result[ 2 ], result[ 4 ], result[ 6 ], result[ 8 ]
                        );

                    } else if ( ( result = this.regexp.face_vertex.exec( line ) ) !== null ) {

                        // f vertex vertex vertex
                        // 0            1    2    3   4
                        // ["f 1 2 3", "1", "2", "3", undefined]

                        state.addFace(
                            result[ 1 ], result[ 2 ], result[ 3 ], result[ 4 ]
                        );

                    } else {

                        throw new Error( "Unexpected face line: '" + line  + "'" );

                    }


                } else if((result = this.regexp.object_pattern.exec(line)) !== null){
                    //o Cube

                    var name = result[1];

                    state.startObject(name);

                } else if(this.regexp.material_use_pattern.test(line)){
                    //usemtl material
                    state.object.startMaterial( line.substring( 7 ).trim(), state.materialLibraries );

                } else if ( ( result = this.regexp.smoothing_pattern.exec( line ) ) !== null ) {

                    // smooth shading

                    var value = result[1].trim().toLowerCase();
                    state.object.smooth = ( value === '1' || value === 'on' );

                    var material = state.object.currentMaterial();
                    if (material) {
                        material.smooth = state.object.smooth;
                    }
                } else {
                    // Handle null terminated files without exception
                    // if ( line === '\0' ) continue;
                    //
                    // throw new Error( "Unexpected line: '" + line  + "'" );
                }
            }

            state.finalize();
            console.log(state)
        });
    }

    private _createParserState() {

        var state = {
            objects: [],
            object: {},

            vertices: [],
            normals: [],
            uvs: [],

            materialLibraries: [],

            startObject(name,declaration?:boolean) {

                if(this.object && this.object.declaration === false){
                    this.object.name = name;
                    this.object.declaration = (declaration !== false);
                    return;
                }

                var previousMaterial = (this.object && this.object.currentMaterial === 'function'?this.object.currentMatrial():undefined);

                if(this.object && typeof this.object._finalize === 'function'){
                    this.object._finalize(true);
                }

                this.object = {
                    name:name || '',
                    declaration : (declaration !== false),
                    geometry:{
                        vertices:[],
                        normals :[],
                        texCoord:[]
                    },
                    materials:[],

                    startMaterial (name,libraries) {
                        var previous = this._finalize(false);

                        if(previous && (previous.inherited || previous.groupCount <= 0)){
                            this.materials.splice(previous.index,1);
                        }

                        var materil = {
                            index : this.materials.length,
                            name  : name || '',
                            mtllib: (Array.isArray(libraries) && libraries.length>0?libraries[libraries.length-1]:''),
                            smooth: (previous !== void 0?previous.smooth:this.smooth),
                            groupStart : (previous !== void 0?previous.groupEnd : 0),
                            groupEnd   : -1,
                            groupCount : -1,
                            inherited  : false,

                            clone (index) {
                                var cloned = {
                                    index  : (typeof index === 'number'?index:this.index),
                                    name   : this.name,
                                    mtllib : this.mtllib,
                                    smooth : this.smooth,
                                    groupStart  : 0,
                                    groupEnd    : -1,
                                    groupCount  : -1,
                                    inherited   : false,
                                    clone : null
                                };
                                cloned.clone = this.clone.bind(cloned);
                                return cloned;
                            }
                        }

                        this.materials.push(materil);
                        return materil;
                    },  //startMaterial

                    currentMatrial () {
                        if(this.materials.length > 0){
                            return this.materials[this.materials.length - 1];
                        }
                        return void 0;
                    },

                    _finalize (end) {
                        var lastMultiMaterial = this.currentMatrial();
                        console.log(lastMultiMaterial)
                        if(lastMultiMaterial && lastMultiMaterial.groupEnd === -1){
                            lastMultiMaterial.groupEnd = this.geometry.vertices.length / 3;
                            lastMultiMaterial.groupCount = lastMultiMaterial.groupEnd - lastMultiMaterial.groupStart;
                            lastMultiMaterial.inherited = false;
                        }

                        if(end && this.materials.length > 1){
                            for(var mi = this.materials.length - 1;mi >= 0;mi--){
                                if(this.materials[mi].groupCount <= 0){
                                    this.materials.splice(mi,1);
                                }
                            }
                        }

                        if(end && this.materials.length === 0){
                            this.materials.push({
                                name :'',
                                smooth: this.smooth
                            })
                        }
                        return lastMultiMaterial;
                    }
                };  //object

                if(previousMaterial && previousMaterial && typeof previousMaterial.clone === "function"){
                    var declared = previousMaterial.clone(0);
                    declared.inherited = true;
                    this.object.materials.push(declared);
                }

                this.objects.push(this.object);
            },   //startObject

            finalize () {
                if(this.object && typeof this.object._finalize == "function"){
                    this.object._finalize(true)
                }
            },

            parseVertexIndex (value ,len) {
                var index = parseInt(value,10);
                return (index >= 0?index - 1: index + len / 3)*3;
            },

            parseNormalIndex (value,len){
                var index = parseInt( value, 10 );
                return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;
            },

            parseUVIndex ( value, len ) {

                var index = parseInt( value, 10 );
                return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

            },

            addVertex: function ( a, b, c ) {

                var src = this.vertices;
                var dst = this.object.geometry.vertices;

                dst.push( src[ a + 0 ] );
                dst.push( src[ a + 1 ] );
                dst.push( src[ a + 2 ] );
                dst.push( src[ b + 0 ] );
                dst.push( src[ b + 1 ] );
                dst.push( src[ b + 2 ] );
                dst.push( src[ c + 0 ] );
                dst.push( src[ c + 1 ] );
                dst.push( src[ c + 2 ] );

            },

            addVertexLine: function ( a ) {

                var src = this.vertices;
                var dst = this.object.geometry.vertices;

                dst.push( src[ a + 0 ] );
                dst.push( src[ a + 1 ] );
                dst.push( src[ a + 2 ] );

            },

            addNormal : function ( a, b, c ) {

                var src = this.normals;
                var dst = this.object.geometry.normals;

                dst.push( src[ a + 0 ] );
                dst.push( src[ a + 1 ] );
                dst.push( src[ a + 2 ] );
                dst.push( src[ b + 0 ] );
                dst.push( src[ b + 1 ] );
                dst.push( src[ b + 2 ] );
                dst.push( src[ c + 0 ] );
                dst.push( src[ c + 1 ] );
                dst.push( src[ c + 2 ] );

            },

            addUV: function ( a, b, c ) {

                var src = this.uvs;
                var dst = this.object.geometry.uvs;

                dst.push( src[ a + 0 ] );
                dst.push( src[ a + 1 ] );
                dst.push( src[ b + 0 ] );
                dst.push( src[ b + 1 ] );
                dst.push( src[ c + 0 ] );
                dst.push( src[ c + 1 ] );

            },

            addUVLine: function ( a ) {

                var src = this.uvs;
                var dst = this.object.geometry.uvs;

                dst.push( src[ a + 0 ] );
                dst.push( src[ a + 1 ] );

            },

            addFace: function ( a, b, c, d, ua?:number, ub?:number, uc?:number, ud?:number, na?:number, nb?:number, nc?:number, nd?:number ) {

                var vLen = this.vertices.length;

                var ia = this.parseVertexIndex( a, vLen );
                var ib = this.parseVertexIndex( b, vLen );
                var ic = this.parseVertexIndex( c, vLen );
                var id;

                if ( d === undefined ) {

                    this.addVertex( ia, ib, ic );

                } else {

                    id = this.parseVertexIndex( d, vLen );

                    this.addVertex( ia, ib, id );
                    this.addVertex( ib, ic, id );

                }

                if ( ua !== undefined ) {

                    var uvLen = this.uvs.length;

                    ia = this.parseUVIndex( ua, uvLen );
                    ib = this.parseUVIndex( ub, uvLen );
                    ic = this.parseUVIndex( uc, uvLen );

                    if ( d === undefined ) {

                        this.addUV( ia, ib, ic );

                    } else {

                        id = this.parseUVIndex( ud, uvLen );

                        this.addUV( ia, ib, id );
                        this.addUV( ib, ic, id );

                    }

                }

                if ( na !== undefined ) {

                    // Normals are many times the same. If so, skip function call and parseInt.
                    var nLen = this.normals.length;
                    ia = this.parseNormalIndex( na, nLen );

                    ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
                    ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

                    if ( d === undefined ) {

                        this.addNormal( ia, ib, ic );

                    } else {

                        id = this.parseNormalIndex( nd, nLen );

                        this.addNormal( ia, ib, id );
                        this.addNormal( ib, ic, id );

                    }

                }

            },

            addLineGeometry: function ( vertices, uvs ) {

                this.object.geometry.type = 'Line';

                var vLen = this.vertices.length;
                var uvLen = this.uvs.length;

                for ( var vi = 0, l = vertices.length; vi < l; vi ++ ) {

                    this.addVertexLine( this.parseVertexIndex( vertices[ vi ], vLen ) );

                }

                for ( var uvi = 0, l = uvs.length; uvi < l; uvi ++ ) {

                    this.addUVLine( this.parseUVIndex( uvs[ uvi ], uvLen ) );

                }

            }

        };  //state

        state.startObject("",false);
        return state;
    }
}
