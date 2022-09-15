(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.tonyu2_token = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const TT=require("../lang/tonyu2_token");
module.exports=TT;

},{"../lang/tonyu2_token":4}],2:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRange = exports.setRange = exports.addRange = exports.lazy = exports.TokensParser = exports.tokensParserContext = exports.StringParser = exports.State = exports.Parser = exports.ParserContext = exports.SUBELEMENTS = exports.ALL = void 0;
const R_1 = __importDefault(require("../lib/R"));
exports.ALL = Symbol("ALL");
exports.SUBELEMENTS = Symbol("SUBELEMENTS");
const options = { traceTap: false, optimizeFirst: true, profile: false,
    verboseFirst: false, traceFirstTbl: false, traceToken: false };
function dispTbl(tbl) {
    var buf = "";
    var h = {};
    if (!tbl)
        return buf;
    for (let i in tbl) { // tbl:{char:Parser}   i:char
        const n = tbl[i].name;
        h[n] = (h[n] || "") + i;
    }
    if (tbl[exports.ALL]) {
        const n = tbl[exports.ALL].name;
        h[n] = (h[n] || "") + "*";
    }
    for (let n in h) {
        buf += h[n] + "->" + n + ",";
    }
    return buf;
}
//var console={log:function (s) { $.consoleBuffer+=s; }};
function _debug(s) { console.log(s); }
//export function Parser
/*export function create(parseFunc:ParseFunc) { // (State->State)->Parser
    return new Parser(parseFunc);
};*/
function nc(v, name) {
    if (v == null)
        throw new Error(name + " is null!");
    return v;
}
class ParserContext {
    constructor(space) {
        this.space = space;
    }
    create(f) {
        return new Parser(this, f);
    }
    lazy(pf) {
        return lazy(this, pf);
    }
    fromFirst(tbl) {
        if (this.space === "TOKEN") {
            return this.fromFirstTokens(tbl);
        }
        else {
            const res = this.create((s0) => {
                const s = (this.space === "RAWSTR" || this.space === "TOKEN" ? s0 : this.space.parse(s0));
                var f = s.src.str[s.pos];
                if (options.traceFirstTbl) {
                    console.log(res.name + ": first=" + f + " tbl=" + (tbl[f] ? tbl[f].name : "-"));
                }
                if (tbl[f]) {
                    return tbl[f].parse(s);
                }
                if (tbl[exports.ALL])
                    return tbl[exports.ALL].parse(s);
                return s.withError(R_1.default("expected", Object.keys(tbl).join("")));
            });
            res._first = tbl; //{space:space,tbl:tbl};
            //res.checkTbl();
            return res;
        }
    }
    fromFirstTokens(tbl) {
        var res = this.create(function (s) {
            const src = s.src;
            var t = src.tokens[s.pos];
            var f = t ? t.type : null;
            if (options.traceFirstTbl) {
                console.log(this.name + ": firstT=" + f + " tbl=" + (tbl[f] ? tbl[f].name : "-"));
            }
            if (f != null && tbl[f]) {
                return tbl[f].parse(s);
            }
            if (tbl[exports.ALL])
                return tbl[exports.ALL].parse(s);
            return s.withError(R_1.default("expected", Object.keys(tbl).join(", ")));
        });
        res._first = tbl; //{space:"TOKEN",tbl:tbl};
        //res.checkTbl();
        return res;
    }
    empty(result) {
        return this.create((s) => {
            s = s.clone();
            s.error = null;
            s.result = result;
            return s;
        }).setName("empty", { type: "empty" });
    }
}
exports.ParserContext = ParserContext;
class Parser {
    constructor(context, parseFunc) {
        this.context = context;
        if (!options.traceTap) {
            this.parse = parseFunc;
        }
        else {
            this.parse = function (s) {
                if (this.name === undefined) {
                    console.log(this);
                    throw new Error("undefined name");
                }
                console.log("tap: name=" + this.name + "  pos=" + (s ? s.pos : "?"));
                const r = parseFunc.apply(this, [s]);
                let img = "NOIMG";
                if (isStrStateSrc(r.src)) {
                    img = r.src.str.substring(r.pos - 3, r.pos) + "^" + r.src.str.substring(r.pos, r.pos + 3);
                }
                if (isTokenStateSrc(r.src)) {
                    const ts = r.src.tokens;
                    const f = (idx) => idx == ts.length ? "EOT" : idx > ts.length ? "" : ts[idx];
                    img = f(r.pos - 1) + "[" + f(r.pos) + "]" + f(r.pos + 1);
                }
                console.log("/tap: name=" + this.name +
                    " pos=" + (s ? s.pos : "?") + "->" + (r ? r.pos : "?") + " " + img + " " +
                    (r.success ? "res=[" + r.result.join(",") + "]" : ""));
                if (r.result.some((e) => e === undefined)) {
                    console.log(r.result);
                    throw new Error(this.name + " Has undefined");
                }
                return r;
            };
        }
    }
    get isEmpty() {
        if (!this.struct)
            return false;
        if (this.struct.type === "empty")
            return true;
        if (this.struct.type === "and" || this.struct.type === "or") {
            for (let p of this.struct.elems) {
                if (!p.isEmpty)
                    return false;
            }
            return true;
        }
        return false;
    }
    // Parser.parse:: State->State
    //static create(parserFunc:ParseFunc) { return create(parserFunc);}
    create(parserFunc) { return this.context.create(parserFunc); }
    dispTbl() {
        if (!this._first) {
            console.log("No table for " + this.name);
        }
        else {
            console.log("Table for " + this.name + ":");
            const tbl = this._first;
            //const h={};
            for (let i in tbl) { // tbl:{char:Parser}   i:char
                const n = tbl[i].name;
                console.log("  " + i + ": " + n);
            }
            if (tbl[exports.ALL]) {
                const n = tbl[exports.ALL].name;
                console.log("  ALL: " + n);
            }
        }
    }
    except(f) {
        var t = this;
        return this.and(this.create((res) => {
            //var res=t.parse(s);
            //if (!res.success) return res;
            res = res.clone();
            if (f.apply({}, res.result)) {
                res.error = "Except";
            }
            else {
                res.error = null;
            }
            return res;
        }).setName("(except " + t.name + ")", this));
    }
    noFollow(p) {
        var t = this;
        nc(p, "p");
        return this.and(this.create(function (res) {
            var res2 = p.parse(res);
            if (res2.success) {
                return res.withError(`Should not follow ${p.name}`);
            }
            else {
                return res.withError(null);
            }
        }).setName("(" + t.name + " noFollow " + p.name + ")", this));
    }
    andNoUnify(next) {
        //if (this.struct && this.struct.type==="empty") return next;
        nc(next, "next"); // next==next
        //var t=this; // Parser
        var res = this.create((s) => {
            var r1 = this.parse(s); // r1:State
            if (!r1.success)
                return r1;
            var r2 = next.parse(r1); //r2:State
            if (r2.success) {
                r2.result = r1.result.concat(r2.result); // concat===append built in func in Array
            }
            return r2;
        });
        const elems = this.structToArray("and"); //(this.struct && this.struct.type==="and" ? this.struct.elems : [this]);
        const nelems = [...elems, next];
        return res.setName("(" + nelems.map((p) => p.name).join(" ") + ")", { type: "and", elems: nelems });
    }
    and(next) {
        //if (this.struct && this.struct.type==="empty") return next;
        const _res = this.andNoUnify(next);
        if (!options.optimizeFirst)
            return _res;
        //if (!this._first) return _res;
        var tbl = this._first || { [exports.ALL]: this };
        var ntbl = {};
        //  tbl           ALL:a1  b:b1     c:c1
        //  next.tbl      ALL:a2           c:c2     d:d2
        //           ALL:a1>>next   b:b1>>next c:c1>>next
        for (let c in tbl) {
            ntbl[c] = tbl[c].andNoUnify(next);
        }
        if (tbl[exports.ALL]) {
            if (tbl[exports.ALL].isEmpty &&
                next._first && (!next._first[exports.ALL] || next._first[exports.ALL].isEmpty)) {
                for (let c in next._first) {
                    const p = tbl[exports.ALL].andNoUnify(next._first[c]);
                    if (ntbl[c])
                        ntbl[c] = ntbl[c].orNoUnify(p);
                    else
                        ntbl[c] = p;
                }
                if (next._first[exports.ALL])
                    ntbl[exports.ALL] = tbl[exports.ALL].andNoUnify(next._first[exports.ALL]);
            }
            else {
                ntbl[exports.ALL] = tbl[exports.ALL].andNoUnify(next);
            }
        }
        const res = this.context.fromFirst(ntbl);
        res.setAlias(_res);
        if (options.verboseFirst) {
            console.log("Created aunify name=" + res.name + " tbl=" + dispTbl(ntbl));
        }
        return res;
    }
    retNoUnify(f) {
        return this.create((s) => {
            const r1 = this.parse(s);
            if (!r1.success)
                return r1;
            const r2 = r1.clone();
            r2.result = [f(...r1.result)];
            if (r2.result[0] === undefined) {
                throw new Error(`${this.name}: ${f} returned undefined`);
            }
            return r2;
        }).setName(this.name + "@");
    }
    ret(next) {
        if (typeof next !== "function")
            throw new Error("Not function " + next);
        const _res = this.retNoUnify(next);
        if (!options.optimizeFirst)
            return _res;
        //if (!this._first) return this.retNoUnify(next);
        var tbl = this._first || { [exports.ALL]: this };
        var ntbl = {};
        for (var c in tbl) {
            ntbl[c] = tbl[c].retNoUnify(next);
        }
        if (tbl[exports.ALL])
            ntbl[exports.ALL] = tbl[exports.ALL].retNoUnify(next);
        const res = this.context.fromFirst(ntbl);
        res.setAlias(_res);
        if (options.verboseFirst) {
            console.log("Created runify name=" + res.name + " tbl=" + dispTbl(ntbl));
        }
        return res;
    }
    /*
    this._first={space: space, chars:String};
    this._first={space: space, tbl:{char:Parser}};
*/
    first(/*space:SpaceSpec,*/ ct /*|Symbol*/) {
        if (!options.optimizeFirst)
            return this;
        //if (space==null) throw "Space is null2!";
        if (typeof ct == "string") {
            var tbl = {};
            for (var i = 0; i < ct.length; i++) {
                tbl[ct.substring(i, i + 1)] = this;
            }
            //this._first={space: space, tbl:tbl};
            return this.context.fromFirst(tbl).setAlias(this);
            //        		this._first={space: space, chars:ct};
        }
        else if (ct === exports.ALL) {
            return this.context.fromFirst({ [exports.ALL]: this }).setAlias(this);
            //this._first={space:space, tbl:{ALL:this}};
        }
        else if (typeof ct == "object") {
            throw "this._first={space: space, tbl:ct}";
        }
        return this;
    }
    firstTokens(tokens /*|symbol*/) {
        if (!options.optimizeFirst)
            return this;
        const tbl = {};
        if (typeof tokens == "symbol") {
            if (tokens !== exports.ALL)
                throw new Error("except ALL not allowed ");
            tbl[exports.ALL] = this;
        }
        else {
            const tka = (typeof tokens == "string" ? [tokens] : tokens);
            for (const token of tka) {
                tbl[token] = this;
            }
        }
        return this.context.fromFirstTokens(tbl).setAlias(this);
    }
    copyFirst(src) {
        const fst = src._first;
        if (!fst || fst[exports.ALL])
            return this;
        if (this.context.space === "TOKEN") {
            return this.firstTokens(Object.keys(fst));
        }
        else {
            return this.first(Object.keys(fst).join(""));
        }
    }
    unifyFirst(other) {
        //var thiz=this;
        function or(a, b) {
            if (!a)
                return b;
            if (!b)
                return a;
            return a.orNoUnify(b); //.checkTbl();
        }
        var tbl = {}; // tbl.* includes tbl[ALL]
        //this.checkTbl();
        //other.checkTbl();
        function mergeTbl() {
            //   {except_ALL: contains_ALL}
            var t2 = other._first || { [exports.ALL]: other };
            //before tbl={ALL:a1, b:b1, c:c1}   t2={ALL:a2,c:c2,d:d2}
            //       b1 conts a1  c1 conts a1     c2 conts a2   d2 conts a2
            //after  tbl={ALL:a1|a2 , b:b1|a2    c:c1|c2    d:a1|d2 }
            var keys = {};
            for (let k in tbl) { /*if (d) console.log("tbl.k="+k);*/
                keys[k] = 1;
            }
            for (let k in t2) { /*if (d) console.log("t2.k="+k);*/
                keys[k] = 1;
            }
            //delete keys[ALL];
            if (tbl[exports.ALL] || t2[exports.ALL]) {
                tbl[exports.ALL] = or(tbl[exports.ALL], t2[exports.ALL]);
            }
            for (let k in keys) {
                //if (d) console.log("k="+k);
                //if (tbl[k] && !tbl[k].parse) throw "tbl["+k+"] = "+tbl[k];
                //if (t2[k] && !t2[k].parse) throw "t2["+k+"] = "+tbl[k];
                if (tbl[k] && t2[k]) {
                    tbl[k] = or(tbl[k], t2[k]);
                }
                else if (tbl[k] && !t2[k]) {
                    tbl[k] = or(tbl[k], t2[exports.ALL]);
                }
                else if (!tbl[k] && t2[k]) {
                    tbl[k] = or(tbl[exports.ALL], t2[k]);
                }
            }
        }
        Object.assign(tbl, this._first || { [exports.ALL]: this });
        mergeTbl();
        const elems = this.structToArray("or");
        const nelems = [...elems, other];
        var res = this.context.fromFirst(tbl).setName(`(${nelems.map((p) => p.name).join("|")})`, { type: "or", elems: nelems });
        if (options.verboseFirst)
            console.log("Created unify name=" + res.name + " tbl=" + dispTbl(tbl));
        return res;
    }
    or(other) {
        nc(other, "other");
        if (this.context === other.context) {
            return this.unifyFirst(other);
        }
        else {
            if (options.verboseFirst) {
                console.log("Cannot unify" + this.name + " || " + other.name, this.context, other.context);
            }
            return this.orNoUnify(other);
        }
    }
    structToArray(type) {
        return (this.struct && this.struct.type === type ? this.struct.elems : [this]);
    }
    orNoUnify(other) {
        var t = this; // t:Parser
        const elems = this.structToArray("or");
        const nelems = [...elems, other];
        var res = this.create(function (s) {
            var r1 = t.parse(s); // r1:State
            if (!r1.success) {
                var r2 = other.parse(s); // r2:State
                return r2;
            }
            else {
                return r1;
            }
        }).setName(`(${nelems.map((p) => p.name).join("|")})`, { type: "or", elems: nelems });
        return res;
    }
    setAlias(p) {
        return this.setName(p.name, p.struct);
    }
    setName(n, struct) {
        this.name = n;
        if (struct instanceof Parser) {
            this.struct = struct.struct || { type: "primitive", name: struct.name }; //{type:"alias", target:struct};
        }
        else {
            this.struct = this.struct || struct;
        }
        return this;
    }
    repNNoUnify(min) {
        var p = this;
        if (!min)
            min = 0;
        const res = this.create((s) => {
            let current = s;
            var result = [];
            while (true) {
                var next = p.parse(current);
                if (!next.success) {
                    let res;
                    if (result.length >= min) {
                        res = current.clone();
                        res.result = [result];
                        res.error = null;
                        //console.log("rep0 res="+disp(res.result));
                        return res;
                    }
                    else {
                        res = s.clone();
                        res.error = next.error;
                        return res;
                    }
                }
                else {
                    result.push(next.result[0]);
                    current = next;
                }
            }
        });
        return res.setName(`[${p.name}]x${min}`, { type: "rept", elem: p });
    }
    repN(min) {
        const _res = this.repNNoUnify(min);
        //return _res;
        if (!options.optimizeFirst /*|| min==0*/)
            return _res;
        const fst = this._first || { [exports.ALL]: this };
        const nf = {}; //{space: olf.space, tbl:{}};
        if (fst[exports.ALL]) {
            nf[exports.ALL] = _res; //fst[ALL].repNNoUnify(min);
        }
        else {
            for (let k in fst) {
                // fst[k].repNNoUnify(min); is KOWARERU.
                // suppose, k="if", first stmt is "if", seconds SHOULD ALSO be "if",
                nf[k] = _res; //fst[k].repNNoUnify(min);
            }
            if (min == 0) {
                nf[exports.ALL] = this.context.empty([[]]).setName("repEmpty");
            }
        }
        const res = this.context.fromFirst(nf).setAlias(_res);
        //if (min==0)	{console.log( "rep0 of ", this.name); res.dispTbl(); }
        return res;
    }
    rep0() { return this.repN(0); }
    rep1() { return this.repN(1); }
    optNoUnify() {
        var t = this;
        return this.create(function (s) {
            var r = t.parse(s);
            if (r.success) {
                return r;
            }
            else {
                s = s.clone();
                s.error = null;
                s.result = [null];
                return s;
            }
        }).setName("(" + t.name + ")?", { type: "opt", elem: t });
    }
    opt() {
        const _res = this.optNoUnify();
        //return _res;
        if (!options.optimizeFirst)
            return _res;
        const fst = this._first || { [exports.ALL]: this };
        const nf = {};
        for (let k in fst) {
            nf[k] = fst[k].optNoUnify();
        }
        if (fst[exports.ALL]) {
            nf[exports.ALL] = fst[exports.ALL].optNoUnify();
        }
        else {
            nf[exports.ALL] = this.context.empty([null]).setName("optEmpty");
        }
        return this.context.fromFirst(nf).setAlias(_res);
    }
    sep1(sep, valuesToArray) {
        var value = this;
        nc(value, "value");
        nc(sep, "sep");
        const tailSV = sep.and(value);
        const tail = (valuesToArray ? tailSV.retN(1) : tailSV.obj("sep", "value")); /*.ret(function(r1, r2) {
            if(valuesToArray) return r2;
            return {sep:r1, value:r2};
        });*/
        return value.and(tail.rep0()).ret(function (r1, r2) {
            //var i;
            if (valuesToArray) {
                /*var r=[r1];
                for (let i in r2) {
                    r.push(r2[i]);
                }*/
                return [r1, ...r2];
            }
            else {
                return { head: r1, tails: r2 };
            }
        }).setName("(sep1 " + value.name + " " + sep.name + ")", { type: "rept", elem: this });
    }
    sep0(s) {
        return this.sep1(s, true).opt().ret(function (r) {
            if (!r)
                return [];
            return r;
        }).setName(`(sep0 ${this.name})`, { type: "rept", elem: this });
    }
    tap(msg) {
        return this;
    }
    retN(i) {
        const elems = this.structToArray("and");
        if (i >= elems.length)
            throw new Error(`${this.name}: index must be 0 to ${elems.length - 1}`);
        return this.ret(function () {
            return arguments[i];
        }).setName("(retN " + elems.map((p, i2) => (i == i2 ? `[${p.name}]` : p.name)).join(" ") + ")", { type: "retN", index: i, elems });
    }
    obj(...names) {
        const elems = this.structToArray("and");
        if (names.length > elems.length)
            throw new Error(`${this.name} requires ${names.length} fields(${names.join(", ")}). Only ${elems.length} provided.`);
        const fields = {};
        const pnames = [];
        for (let i = 0; i < names.length; i++) {
            if (names[i]) {
                fields[names[i]] = i;
                pnames.push(`${names[i]}:${elems[i].name}`);
            }
            else {
                pnames.push(elems[i].name);
            }
        }
        return this.ret((...args) => {
            const res = { [exports.SUBELEMENTS]: args };
            for (let e of args) {
                const rg = setRange(e);
                addRange(res, rg);
            }
            for (let name in fields) {
                const idx = fields[name];
                if (idx < 0 || idx >= args.length)
                    throw new Error("Index out");
                /*if (args[idx]===undefined) {
                    throw new Error(`${this.name}: Undef ${names} ${idx} ${name}`);
                }*/
                res[name] = args[idx];
            }
            //console.log("GEN", this.name, res);
            return res;
        }).setName(`{${pnames.join(", ")}}`, { type: "object", fields, elems });
    }
    assign(a) {
        const elems = this.structToArray("and");
        if (elems.length !== 1)
            throw new Error(`Cannot use assign for ${this.name}. It Returns ${elems.length} elements`);
        return this.ret((r) => Object.assign(r, a)).setAlias(this);
    }
}
exports.Parser = Parser;
function isStrStateSrc(src) { return typeof src.str === "string"; }
function isTokenStateSrc(src) { return src.tokens; }
class State {
    constructor(strOrTokens, global) {
        /*updateMaxPos(npos:number) {
            if (npos > this.src.maxPos) {
                this.src.maxPos=npos;
            }
        }*/
        this.errorSet = false;
        if (strOrTokens != null) {
            //this.src={maxPos:0, global:global};// maxPos is shared by all state
            if (typeof strOrTokens == "string") {
                this.src = { maxErrors: { pos: 0, errors: [] }, global, str: strOrTokens };
            }
            if (strOrTokens instanceof Array) {
                this.src = { maxErrors: { pos: 0, errors: [] }, global, tokens: strOrTokens };
            }
            this.pos = 0;
            this.result = [];
            //this.success=true;
        }
    }
    get success() { return !this._error; }
    clone() {
        var s = new State();
        s.src = this.src;
        s.pos = this.pos;
        s.result = this.result.slice();
        //s.success=this.success;
        s._error = this._error;
        return s;
    }
    set error(error) {
        if (this.errorSet)
            throw new Error(`Cannot set error twice :${this}`);
        this.errorSet = true;
        this._error = error;
        if (!error)
            return;
        if (this.src.global && typeof this.src.global.backtrackCount === "number") {
            this.src.global.backtrackCount++;
        }
        if (this.pos == this.src.maxErrors.pos) {
            this.src.maxErrors.errors.push(error);
        }
        else if (this.pos > this.src.maxErrors.pos) {
            this.src.maxErrors = { pos: this.pos, errors: [error] };
        }
    }
    get error() { return this._error; }
    isSuccess() {
        return this.success;
    }
    getGlobal() {
        if (!this.src.global)
            this.src.global = {};
        return this.src.global;
    }
    withError(est) {
        const res = this.clone();
        res.error = est;
        return res;
    }
    toString() {
        let img = "NOIMG";
        const r = this;
        if (isStrStateSrc(r.src)) {
            img = r.src.str.substring(r.pos - 3, r.pos) + "^" + r.src.str.substring(r.pos, r.pos + 3);
        }
        if (isTokenStateSrc(r.src)) {
            const ts = r.src.tokens;
            const f = (idx) => idx < 0 ? "" : idx == ts.length ? "EOT" : idx > ts.length ? "" : ts[idx];
            img = f(r.pos - 1) + "[" + f(r.pos) + "]" + f(r.pos + 1);
        }
        return `pos=${r.pos} ${img} ${this.success ? `res=${this.result.length}` : "X"}`;
    }
}
exports.State = State;
const rawStringParserContext = new ParserContext("RAWSTR");
class StringParser {
    //context: ParserContext;
    constructor(context = rawStringParserContext) {
        this.context = context;
        this.empty = this.create(function (state) {
            const res = state.clone();
            res.error = null;
            res.result = [null]; //{length:0, isEmpty:true}];
            return res;
        }).setName("E");
        this.fail = this.create((s) => s.withError("FAIL")).setName("F");
        this.eof = this.strLike(function (str, pos) {
            if (pos == str.length)
                return { len: 0 };
            return { error: `Not EOF: pos=${pos}/${str.length}` };
        }).setName("EOF");
    }
    static withSpace(space) {
        return new StringParser(new ParserContext(space));
    }
    create(pf) { return this.context.create(pf); }
    str(st, name = st) {
        let res = this.strLike((str, pos) => {
            if (str.substring(pos, pos + st.length) === st)
                return { len: st.length };
            return { error: `Cannot read ${str}` };
        }).setName(name);
        if (st.length > 0)
            res = res.first(st[0]);
        return res;
    }
    strLike(func) {
        // func :: str,pos, state? -> {len:int, other...}  (null for no match )
        return this.create((state) => {
            if (this.context.space instanceof Parser) {
                state = this.context.space.parse(state);
            }
            const src = state.src;
            const str = src.str;
            if (str == null)
                throw new Error("strLike: str is null!");
            var spos = state.pos;
            //console.log(" strlike: "+str+" pos:"+spos);
            const r1 = func(str, spos, state);
            if (options.traceToken)
                console.log("pos=" + spos + " r=" + r1);
            if (r1 && typeof r1.len === "number") {
                if (options.traceToken)
                    console.log("str:succ");
                const rv = { pos: spos, src, len: r1.len };
                //r1.pos=spos;
                //r1.src=state.src; // insert 2013/05/01
                const ns = state.clone();
                ns.pos = spos + rv.len;
                ns.error = null;
                ns.result = [rv];
                //Object.assign(ns, {pos:spos+r1.len, success:true, result:[r1]});
                //state.updateMaxPos(ns.pos);
                return ns;
            }
            else {
                if (options.traceToken)
                    console.log("str:fail");
                return state.withError((r1 && r1.error) || "Tokenize Error");
            }
        }).setName("STRLIKE");
    }
    reg(r, name = r + "") {
        if (!(r + "").match(/^\/\^/))
            console.log("Waring regex should have ^ at the head:" + (r + ""));
        return this.strLike((str, pos) => {
            var res = r.exec(str.substring(pos));
            if (res) {
                //res.len=res[0].length;
                return { len: res[0].length };
            }
            return { error: `Cannot read reg ${r}` };
        }).setName(name);
    }
    parse(parser, str, global) {
        var st = new State(str, global);
        return parser.parse(st);
    }
}
exports.StringParser = StringParser;
//  why not eof: ? because StringParser.strLike
//$.StringParser=StringParser;
exports.tokensParserContext = new ParserContext("TOKEN");
exports.TokensParser = {
    context: exports.tokensParserContext,
    create(pf) {
        return exports.tokensParserContext.create(pf);
    },
    token(type) {
        return exports.tokensParserContext.create(function (s) {
            const src = s.src;
            const t = src.tokens[s.pos];
            if (t && t.type === type) {
                s = s.clone();
                //s.updateMaxPos(s.pos);
                s.pos++;
                s.error = null;
                s.result = [t];
            }
            else {
                s = s.withError(R_1.default("expected", type));
            }
            return s;
        }).setName("'" + type + "'", { type: "primitive", name: type }).firstTokens(type);
    },
    parse: function (parser, tokens, global = {}) {
        var st = new State(tokens, global);
        return parser.parse(st);
    },
    eof: exports.tokensParserContext.create((s) => {
        const src = s.src;
        const suc = (s.pos >= src.tokens.length);
        s = s.clone();
        if (!suc) {
            s.error = `Not EOF: ${src.tokens.length - s.pos} Token remains`;
        }
        else {
            s.error = null;
        }
        if (suc) {
            s.result = [{ type: "EOF" }];
        }
        return s;
    }).setName("EOT")
};
//$.TokensParser=TokensParser;
function lazy(context, pf) {
    //let p:Parser;
    const lz = { resolve, resolved: null };
    function resolve() {
        if (!lz.resolved) {
            lz.resolved = pf();
            if (!lz.resolved)
                throw new Error(pf + " returned null!");
            //if (!self.struct) self.struct=p.struct;
        }
        return lz.resolved;
    }
    const self = context.create(function (st) {
        //this.name=pf.name;
        return resolve().parse(st);
    }).setName("LZ");
    self._lazy = lz;
    return self;
}
exports.lazy = lazy;
function addRange(res, newr) {
    if (newr == null)
        return res;
    if (typeof (res.pos) != "number") {
        res.pos = newr.pos;
        res.len = newr.len;
        return res;
    }
    var newEnd = newr.pos + newr.len;
    var curEnd = res.pos + res.len;
    if (newr.pos < res.pos)
        res.pos = newr.pos;
    if (newEnd > curEnd)
        res.len = newEnd - res.pos;
    return res;
}
exports.addRange = addRange;
function setRange(res) {
    if (res == null || typeof res == "string" || typeof res == "number" || typeof res == "boolean")
        return;
    var exRange = getRange(res);
    if (exRange != null)
        return res;
    for (var i in res) {
        if (!res.hasOwnProperty(i))
            continue;
        var range = setRange(res[i]);
        addRange(res, range);
    }
    return res;
}
exports.setRange = setRange;
function getRange(e) {
    if (e == null)
        return null;
    if (typeof e.pos != "number")
        return null;
    if (typeof e.len == "number")
        return e;
    return null;
}
exports.getRange = getRange;
//	return $;
//})();
//export= Parser;

},{"../lib/R":5}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizerFactory = exports.BQX = exports.BQT = exports.BQH = void 0;
const parser_1 = require("./parser");
exports.BQH = "backquoteHead", exports.BQT = "backquoteTail", exports.BQX = "backquoteText";
function tokenizerFactory({ reserved, caseInsensitive }) {
    /*function profileTbl(parser, name) {
        var tbl=parser._first.tbl;
        for (var c in tbl) {
            tbl[c].profile();//(c+" of "+tbl[name);
        }
    }*/
    const BQ = "backquote";
    //const spcs={};for(i=0;i<=0xffff;i++) if (String.fromCharCode(i).match(/\s/)) spcs[i]=1;
    const spcs = {
        9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 32: 1, 160: 1, 5760: 1,
        8192: 1, 8193: 1, 8194: 1, 8195: 1, 8196: 1, 8197: 1, 8198: 1, 8199: 1,
        8200: 1, 8201: 1, 8202: 1, 8232: 1, 8233: 1, 8239: 1, 8287: 1,
        12288: 1, 65279: 1
    };
    function skipSpace(str, pos) {
        const spos = pos;
        const max = str.length;
        //const spcs={9:1,10:1,11:1,12:1,13:1,32:1};
        for (; pos < max; pos++) {
            if (spcs[str.charCodeAt(pos)])
                continue;
            if (str[pos] === "/") {
                if (str[pos + 1] === "*" && readMultiComment())
                    continue;
                else if (str[pos + 1] === "/" && readSingleComment())
                    continue;
            }
            break;
        }
        return { len: pos - spos };
        function readSingleComment() {
            /* <pos>//....<pos>\n */
            for (; pos < max; pos++) {
                if (str[pos] == "\n") {
                    return true;
                }
            }
            pos--;
            return true;
        }
        function readMultiComment() {
            // <pos>/*....*<pos>/
            const spos = pos;
            pos += 2;
            for (; pos < max; pos++) {
                if (str[pos] === "*" && str[pos + 1] === "/") {
                    pos++;
                    return true;
                }
            }
            pos = spos;
        }
    }
    //var sp=Parser.StringParser;
    var SAMENAME = "SAMENAME";
    const DIV = 1, REG = 2;
    //var space=sp.reg(/^(\s*(\/\*\/?([^\/]|[^*]\/|\r|\n)*\*\/)*(\/\/.*\r?\n)*)*/).setName("space");
    var space = new parser_1.StringParser().strLike(skipSpace).setName("space");
    const sp = parser_1.StringParser.withSpace(space);
    function tk(r, name) {
        let pat;
        //let fst:string;
        if (typeof r == "string") {
            if (!name)
                name = r;
            pat = sp.str(r, name);
            //if (r.length>0) fst=r.substring(0,1);
        }
        else {
            if (!name)
                name = r + "";
            pat = sp.reg(r, name);
        }
        return pat.ret((b) => {
            var res = {};
            res.pos = b.pos;
            if (typeof res.pos != "number")
                throw "no pos for " + name + " "; //+disp(b);
            res.len = b.len;
            res.text = b.src.str.substring(res.pos, res.pos + res.len);
            if (typeof res.text != "string")
                throw "no text(" + res.text + ") for " + name + " "; //+disp(b);
            res.toString = function () {
                return this.text;
            };
            res.isToken = true;
            return res;
        });
        //if (fst) res=res.first(fst);
        //return res;//.profile();
    }
    var parsers = {}, posts = {};
    function dtk2(prev, name, parser) {
        //console.log("2reg="+prev+" name="+name);
        if (typeof parser == "string")
            parser = tk(parser, name);
        parsers[prev] = or(parsers[prev], parser.ret((res) => {
            res.type = name;
            return res;
        }).setName(name));
    }
    function dtk(prev, name, parser, post) {
        if (name == SAMENAME)
            name = parser;
        for (var m = 1; m <= prev; m *= 2) {
            //prev=1  -> m=1
            //prev=2  -> m=1x,2
            //XXprev=3  -> m=1,2,3
            if ((prev & m) != 0)
                dtk2(prev & m, name, parser);
        }
        posts[name] = post;
    }
    function or(a, b) {
        if (!a)
            return b;
        return a.or(b);
    }
    class Step {
        constructor(state) {
            this.state = state;
            this.mode = REG;
        }
        next() {
            this.state = parsers[this.mode].parse(this.state);
            if (!this.state.success)
                return null;
            const e = this.state.result[0];
            this.mode = posts[e.type];
            return e;
        }
    }
    function tokenizeBQInner(stp) {
        const res = [];
        let curl = 1;
        while (true) {
            let e = stp.next();
            if (!e)
                break;
            if (e.text === "{") {
                curl++;
            }
            else if (e.text === "}") {
                curl--;
                if (curl <= 0)
                    break;
            }
            else if (e.type === exports.BQH) {
                tokenizeBQ(e, stp);
            }
            res.push(e);
        }
        return res;
    }
    function tokenizeBQ(bqt, stp) {
        let state = stp.state;
        let str = state.src.str;
        let pos = state.pos;
        let opos = pos;
        const subs = [];
        bqt.subs = subs;
        bqt.type = BQ;
        const pushBQX = () => {
            if (pos - opos > 0) {
                subs.push({ type: exports.BQX, text: str.substring(opos, pos), pos: opos, len: pos - opos });
            }
        };
        while (pos < str.length) {
            if (str[pos] === "`") {
                pushBQX();
                pos++;
                let ns = state.clone();
                ns.pos = pos;
                stp.state = ns;
                bqt.len = pos - bqt.pos;
                bqt.text = str.substring(bqt.pos, bqt.pos + bqt.len);
                break;
            }
            else if (str[pos] === "\\") {
                pos += 2;
            }
            else if (str.substring(pos, pos + 2) === "${") {
                pushBQX();
                pos += 2;
                let ns = state.clone();
                ns.pos = pos;
                stp.state = ns;
                subs.push(tokenizeBQInner(stp));
                pos = opos = stp.state.pos;
            }
            else {
                pos++;
            }
        }
    }
    function flattenBQ(tokens) {
        const res = [];
        const isAry = (a) => a && typeof a.map === "function";
        for (let token of tokens) {
            if (token.type === BQ) {
                res.push({ type: exports.BQH, text: "`", pos: token.pos });
                for (let sub of token.subs) {
                    if (isAry(sub)) {
                        for (let e of flattenBQ(sub)) {
                            res.push(e);
                        }
                    }
                    else {
                        res.push(sub);
                    }
                }
                res.push({ type: exports.BQT, text: "`", pos: token.pos + token.len - 1 });
            }
            else {
                res.push(token);
            }
        }
        return res;
    }
    const all = sp.create((st) => {
        /*var mode=REG;
        var res=[];
        while (true) {
            st=parsers[mode].parse(st);
            if (!st.success) break;
            var e=st.result[0];
            mode=posts[e.type];
            //console.log("Token",e, mode);
            res.push(e);
        }*/
        let res = [];
        const stp = new Step(st);
        while (true) {
            let e = stp.next();
            if (!e)
                break;
            if (e.type === exports.BQH) {
                tokenizeBQ(e, stp);
            }
            res.push(e);
        }
        st = stp.state;
        st = space.parse(st);
        const src = st.src;
        st = st.clone();
        if (st.pos === src.str.length) {
            st.error = null;
        }
        else {
            st.error = st.src.maxErrors.errors.join(" or ");
        }
        //st.success=st.src.maxPos==src.str.length;
        st.result[0] = flattenBQ(res);
        //console.dir(st.result[0],{depth:null});
        return st;
    }).setName("tokens:all");
    // Tested at https://codepen.io/hoge1e3/pen/NWWaaPB?editors=1010
    var num = tk(/^(?:0x[0-9a-f]+|0b[01]+|(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:e-?[0-9]+)?)/i, "'number'").ret(function (n) {
        n.type = "number";
        n.value = n.text - 0; //parseInt(n.text);
        return n;
    }).first("0123456789");
    var literal = tk({ exec: function (s) {
            var head = s.substring(0, 1);
            if (head !== '"' && head !== "'")
                return false;
            for (var i = 1; i < s.length; i++) {
                var c = s.substring(i, i + 1);
                if (c === head) {
                    return [s.substring(0, i + 1)];
                }
                else if (c === "\\") {
                    i++;
                }
            }
            return false;
        }, toString: function () { return "'literal'"; }
    }).first("\"'");
    var regex = tk({ exec: function (s) {
            if (s.substring(0, 1) !== '/')
                return false;
            for (var i = 1; i < s.length; i++) {
                var c = s.substring(i, i + 1);
                if (c === '/') {
                    var r = /^[ig]*/.exec(s.substring(i + 1));
                    return [s.substring(0, i + 1 + r[0].length)];
                }
                else if (c == "\n") {
                    return false;
                }
                else if (c === "\\") {
                    i++;
                }
            }
            return false;
        }, toString: function () { return "'regex'"; }
    }).first("/");
    dtk(REG | DIV, "number", num, DIV);
    dtk(REG, "regex", regex, DIV);
    dtk(REG | DIV, "literal", literal, DIV);
    dtk(REG | DIV, exports.BQH, "`", DIV);
    dtk(REG | DIV, SAMENAME, "++", DIV);
    dtk(REG | DIV, SAMENAME, "--", DIV);
    dtk(REG | DIV, SAMENAME, "!==", REG);
    dtk(REG | DIV, SAMENAME, "===", REG);
    dtk(REG | DIV, SAMENAME, ">>>", REG);
    dtk(REG | DIV, SAMENAME, "+=", REG);
    dtk(REG | DIV, SAMENAME, "-=", REG);
    dtk(REG | DIV, SAMENAME, "*=", REG);
    dtk(REG | DIV, SAMENAME, "/=", REG);
    dtk(REG | DIV, SAMENAME, "%=", REG);
    dtk(REG | DIV, SAMENAME, ">=", REG);
    dtk(REG | DIV, SAMENAME, "<=", REG);
    dtk(REG | DIV, SAMENAME, "!=", REG);
    dtk(REG | DIV, SAMENAME, "==", REG);
    dtk(REG | DIV, SAMENAME, ">>", REG);
    dtk(REG | DIV, SAMENAME, "<<", REG);
    dtk(REG | DIV, SAMENAME, "&&", REG);
    dtk(REG | DIV, SAMENAME, "||", REG);
    dtk(REG | DIV, SAMENAME, "(", REG);
    dtk(REG | DIV, SAMENAME, ")", DIV);
    dtk(REG | DIV, SAMENAME, "[", REG);
    dtk(REG | DIV, SAMENAME, "]", DIV); // a[i]/3
    dtk(REG | DIV, SAMENAME, "{", REG);
    //dtk(REG|DIV,SAMENAME ,"}",REG );  // if () { .. }  /[a-z]/.exec()
    dtk(REG | DIV, SAMENAME, "}", DIV); //in tonyu:  a{x:5}/3
    dtk(REG | DIV, SAMENAME, ">", REG);
    dtk(REG | DIV, SAMENAME, "<", REG);
    dtk(REG | DIV, SAMENAME, "^", REG);
    dtk(REG | DIV, SAMENAME, "+", REG);
    dtk(REG | DIV, SAMENAME, "-", REG);
    dtk(REG | DIV, SAMENAME, "...", REG);
    dtk(REG | DIV, SAMENAME, ".", REG);
    dtk(REG | DIV, SAMENAME, "?", REG);
    dtk(REG | DIV, SAMENAME, "=", REG);
    dtk(REG | DIV, SAMENAME, "*", REG);
    dtk(REG | DIV, SAMENAME, "%", REG);
    dtk(DIV, SAMENAME, "/", REG);
    //dtk(DIV|REG, SAMENAME ,"^",REG );
    dtk(DIV | REG, SAMENAME, "~", REG);
    dtk(DIV | REG, SAMENAME, "\\", REG);
    dtk(DIV | REG, SAMENAME, ":", REG);
    dtk(DIV | REG, SAMENAME, ";", REG);
    dtk(DIV | REG, SAMENAME, ",", REG);
    dtk(REG | DIV, SAMENAME, "!", REG);
    dtk(REG | DIV, SAMENAME, "&", REG);
    dtk(REG | DIV, SAMENAME, "|", REG);
    var symresv = tk(/^[a-zA-Z_$][a-zA-Z0-9_$]*/, "symresv_reg").ret(function (s) {
        s.type = (s.text == "constructor" ? "tk_constructor" :
            reserved.hasOwnProperty(s.text) ? s.text : "symbol");
        if (caseInsensitive) {
            s.text = s.text.toLowerCase();
        }
        return s;
    }); //.first(ALL);
    for (var n in reserved) {
        posts[n] = REG;
    }
    posts.tk_constructor = REG;
    posts.symbol = DIV;
    parsers[REG] = or(parsers[REG], symresv).setName("Token_REG");
    parsers[DIV] = or(parsers[DIV], symresv).setName("Token_DIV");
    //parsers[REG].dispTbl();
    //parsers[DIV].dispTbl();
    //console.log(parsers[DIV]);
    function parse(str) {
        var res = sp.parse(all, str);
        if (res.success) {
            //console.log("Token", res.result[0]);
        }
        else {
            console.log("Stopped with ", res.src.maxErrors);
            const maxPos = res.src.maxErrors.pos;
            console.log("Stopped at " +
                str.substring(maxPos - 5, maxPos) + "!!HERE!!" + str.substring(maxPos, maxPos + 5));
        }
        return res;
    }
    return { parse: parse, extension: "js", reserved: reserved };
}
exports.tokenizerFactory = tokenizerFactory;
;

},{"./parser":2}],4:[function(require,module,exports){
"use strict";
const tokenizerFactory_1 = require("./tokenizerFactory");
module.exports = tokenizerFactory_1.tokenizerFactory({
    caseInsensitive: false,
    reserved: {
        "function": true, "var": true, "return": true, "typeof": true, "if": true,
        "__typeof": true, "__await": true, "let": true, "const": true,
        "for": true,
        "else": true,
        "super": true,
        "while": true,
        "continue": true,
        "break": true,
        "do": true,
        "switch": true,
        "case": true,
        "default": true,
        "try": true,
        "catch": true,
        "finally": true,
        "throw": true,
        "of": true,
        "in": true,
        fiber: true,
        "native": true,
        "instanceof": true,
        "new": true,
        "is": true,
        "true": true,
        "false": true,
        "null": true,
        "this": true,
        "undefined": true,
        "usethread": true,
        "constructor": true,
        ifwait: true,
        nowait: true,
        _thread: true,
        arguments: true,
        "delete": true,
        "extends": true,
        "includes": true
    }
});

},{"./tokenizerFactory":3}],5:[function(require,module,exports){
"use strict";
const ja = {
    typeNotFound: "型{1}が見つかりません",
    cannotCallNonFunctionType: "関数・メソッドでないので呼び出すことはできません",
    memberNotFoundInClass: "クラス{1}にフィールドまたはメソッド{2}が定義されていません",
    expected: "ここには{1}などが入ることが予想されます",
    superClassIsUndefined: "親クラス {1}は定義されていません",
    classIsUndefined: "クラス {1}は定義されていません",
    invalidLeftValue: "'{1}'は左辺には書けません．",
    fieldDeclarationRequired: "{1}は宣言されていません（フィールドの場合，明示的に宣言してください）．",
    duplicateKeyInObjectLiteral: "オブジェクトリテラルのキー名'{1}'が重複しています",
    cannotUseStringLiteralAsAShorthandOfObjectValue: "オブジェクトリテラルのパラメタに単独の文字列は使えません",
    breakShouldBeUsedInIterationOrSwitchStatement: "break； は繰り返しまたはswitch文の中で使います.",
    continueShouldBeUsedInIterationStatement: "continue； は繰り返しの中で使います.",
    cannotUseObjectLiteralAsTheExpressionOfStatement: "オブジェクトリテラル単独の式文は書けません．",
    undefinedMethod: "メソッド{1}はありません．",
    undefinedSuperMethod: "親クラスまたは参照モジュールにメソッド'{1}'がありません．",
    notAWaitableMethod: "メソッド{1}は待機可能メソッドではありません",
    circularDependencyDetected: "次のクラス間に循環参照があります: {1}",
    cannotWriteReturnInTryStatement: "現実装では、tryの中にreturnは書けません",
    cannotWriteBreakInTryStatement: "現実装では、tryの中にbreakは書けません",
    cannotWriteContinueInTryStatement: "現実装では、tryの中にcontinueは書けません",
    cannotWriteTwoOrMoreCatch: "現実装では、catch節1個のみをサポートしています",
    lexicalError: "文法エラー(Token)",
    parseError: "文法エラー",
    ambiguousClassName: "曖昧なクラス名： {1}.{2}, {3}",
    cannotInvokeMethod: "{1}(={2})のメソッド {3}を呼び出せません",
    notAMethod: "{1}{2}(={3})はメソッドではありません",
    notAFunction: "{1}は関数ではありません",
    uninitialized: "{1}(={2})は初期化されていなません",
    newIsRequiredOnInstanciate: "クラス名{1}はnewをつけて呼び出して下さい。",
    bootClassIsNotFound: "{1}というクラスはありません．",
    infiniteLoopDetected: "無限ループをストップしました。\n" +
        "   プロジェクト オプションで無限ループチェックの有無を設定できます。\n" +
        "   [参考]https://edit.tonyu.jp/doc/options.html\n",
};
const en = {
    typeNotFound: "Type {1} is not found",
    cannotCallNonFunctionType: "Cannot call what is neither function or method.",
    memberNotFoundInClass: "No such field or method: {1}.{2}",
    "expected": "Expected: {1}",
    "superClassIsUndefined": "Super Class '{1}' is not defined",
    "classIsUndefined": "Class {1} is Undefined",
    "invalidLeftValue": "{1} is not a valid Left Value",
    "fieldDeclarationRequired": "'{1}' is not declared, If you have meant it is a Field, Declare Explicitly.",
    "duplicateKeyInObjectLiteral": "Duplicate Key In Object Literal: {1}",
    "cannotUseStringLiteralAsAShorthandOfObjectValue": "Cannot Use String Literal as a Shorthand of Object Value",
    "breakShouldBeUsedInIterationOrSwitchStatement": "break; Should be Used In Iteration or switch Statement",
    "continueShouldBeUsedInIterationStatement": "continue; Should be Used In Iteration Statement",
    "cannotUseObjectLiteralAsTheExpressionOfStatement": "Cannot Use Object Literal As The Expression Of Statement",
    "undefinedMethod": "Undefined Method: '{1}'",
    undefinedSuperMethod: "Method '{1}' is defined in neigher superclass or including modules.",
    "notAWaitableMethod": "Not A Waitable Method: '{1}'",
    "circularDependencyDetected": "Circular Dependency Detected: {1}",
    "cannotWriteReturnInTryStatement": "Cannot Write Return In Try Statement",
    "cannotWriteBreakInTryStatement": "Cannot Write Break In Try Statement",
    "cannotWriteContinueInTryStatement": "Cannot Write Continue In Try Statement",
    "cannotWriteTwoOrMoreCatch": "Cannot Write Two Or More Catch",
    "lexicalError": "Lexical Error",
    "parseError": "Parse Error",
    "ambiguousClassName": "Ambiguous Class Name: {1}.{2} vs {3}",
    "cannotInvokeMethod": "Cannot Invoke Method {1}(={2}).{3}",
    "notAMethod": "Not A Method: {1}{2}(={3})",
    "notAFunction": "Not A Function: {1}",
    "uninitialized": "Uninitialized: {1}(={2})",
    "newIsRequiredOnInstanciate": "new is required to Instanciate {1}",
    "bootClassIsNotFound": "Boot Class {1} Is Not Found",
    "infiniteLoopDetected": "Infinite Loop Detected",
};
/*let buf="";
    for (let k of Object.keys(ja)) {
        buf+=`"${k}" : "${englishify(k)}", //${ja[k]}\n`;
    }
    console.log(buf);*/
let dict = en;
function R(name, ...params) {
    let mesg = dict[name];
    if (!mesg) {
        return englishify(name) + (params.length ? ": " + params.join(",") : "");
    }
    return buildMesg(mesg, ...params); //+"です！";
}
function buildMesg(...params) {
    var a = Array.prototype.slice.call(arguments);
    var format = a.shift();
    if (a.length === 1 && a[0] instanceof Array)
        a = a[0];
    var P = "vroijvowe0r324";
    format = format.replace(/\{([0-9])\}/g, P + "$1" + P);
    format = format.replace(new RegExp(P + "([0-9])" + P, "g"), function (_, n) {
        return a[parseInt(n) - 1] + "";
    });
    return format;
}
function englishify(name) {
    name = name.replace(/([A-Z])/g, " $1");
    name = name[0].toUpperCase() + name.substring(1);
    return name;
}
R.setLocale = locale => {
    if (locale === "ja")
        dict = ja;
    if (locale === "en")
        dict = en;
};
module.exports = R;
//module.exports=R;

},{}]},{},[1])(1)
});
