(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const Tonyu=require("../runtime/TonyuRuntime");
const Builder=require("../lang/Builder");//require("../lang/projectCompiler2");
const root=require("../lib/root");
const Worker=root.Worker;
const WS=require("../lib/WorkerServiceW");
const FS=require("../lib/FS");
root.FS=FS;
const F=require("../project/ProjectFactory");
const CompiledProject=require("../project/CompiledProject");
const langMod=require("../lang/langMod");
const R=require("../lib/R");
const NS2DepSpec=require("../project/NS2DepSpec");


let prj,builder;
let ns2depspec=new NS2DepSpec({});
const ram=FS.get("/prj/");
F.addDependencyResolver(function (prj, spec) {
    console.log("RESOLV",spec,ns2depspec);
    if (spec.namespace) {
        const s=ns2depspec.has(spec.namespace);
        return F.fromDependencySpec(prj, s);
    }
});
WS.serv("compiler/init", params=>{
    ns2depspec=new NS2DepSpec(params.ns2depspec);
    const files=params.files;
    const namespace=params.namespace||"user";
    const prjDir=ram.rel(namespace+"/");
    prjDir.importFromObject(files);
    //console.log(ram.rel("options.json").text());
    prj=CompiledProject.create({dir:prjDir});
    builder=new Builder(prj);
    if (params.locale) R.setLocale(params.locale);
    return {prjDir:prjDir.path()};
});
WS.serv("compiler/resetFiles", params=>{
    const files=params.files;
    //const namespace=params.namespace||"user";
    const prjDir=prj.getDir();// ram.rel(namespace+"/");
    prjDir.recursive(f=>console.log("RM",f.path(),!f.isDir() && f.rm()));
    prjDir.importFromObject(files);
    builder.requestRebuild();
});
WS.serv("compiler/uploadFiles", params=>{
    const files=params.files;
    const prjDir=prj.getDir();
    prjDir.importFromObject(files);
});
WS.serv("compiler/parse", async ({files})=>{
    try {
        // params.files:: relPath=>cont
        const prjDir=prj.getDir();
        prjDir.importFromObject({base:prjDir.path(), data:files});
        for (let k in files) {
            builder.parse(prjDir.rel(k));
        }
    } catch(e) {
        throw convertTError(e);
    }
});

WS.serv("compiler/fullCompile", async params=>{
    try {
        const res=await builder.fullCompile({destinations:{memory:1}});
        return res.export();
    } catch(e) {
        throw convertTError(e);
    }
});
WS.serv("compiler/postChange", async params=>{
    // postChange is for file(s), modify files before call(at Builder.js)
    try {
        // But it changes files inside postchange...
        const fs=params.files;// "relpath"=>"content"
        let relPath;for(let n in fs) {relPath=n;break;}
        const f=prj.getDir().rel(relPath);
        f.text(fs[relPath]);
        const ns=await builder.postChange(f);
        return ns.export();
    } catch(e) {
        throw convertTError(e);
    }
});
WS.serv("compiler/renameClassName", async params=>{
    try {
        const ns=await builder.renameClassName(params.from, params.to);
        const res={};
        for (let n of ns) {
            if (n.exists()) {
                res[n.path()]=n.text();
            } else {
                res[n.path()]=null;
            }
        }
        return res;
    } catch(e) {
        throw convertTError(e);
    }
});
WS.serv("compiler/serializeAnnotatedNodes",async params=>{
    try {
        const res=await builder.serializeAnnotatedNodes();
        return res;
    } catch(e) {
        throw convertTError(e);
    }
});
function convertTError(e) {
    if (e.isTError) {
        e.src=e.src.path();
    }
    return e;
}
WS.ready();

},{"../lang/Builder":3,"../lang/langMod":17,"../lib/FS":27,"../lib/R":28,"../lib/WorkerServiceW":30,"../lib/root":32,"../project/CompiledProject":33,"../project/NS2DepSpec":34,"../project/ProjectFactory":35,"../runtime/TonyuRuntime":39}],3:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const TonyuRuntime_1 = __importDefault(require("../runtime/TonyuRuntime"));
const TError_1 = __importDefault(require("../runtime/TError"));
const R_1 = __importDefault(require("../lib/R"));
const tonyu1_1 = require("./tonyu1");
const JSGenerator = require("./JSGenerator");
const IndentBuffer_1 = require("./IndentBuffer");
const Semantics = __importStar(require("./Semantics"));
const SourceFiles_1 = require("./SourceFiles");
const TypeChecker_1 = require("./TypeChecker");
const CompilerTypes_1 = require("./CompilerTypes");
//type ClassMap={[key: string]:Meta};
//const langMod=require("./langMod");
function orderByInheritance(classes) {
    var added = {};
    var res = [];
    //var crumbs={};
    var ccnt = 0;
    for (var n in classes) { /*ENVC*/
        added[n] = false;
        ccnt++;
    }
    while (res.length < ccnt) {
        var p = res.length;
        for (let n in classes) { /*ENVC*/
            if (added[n])
                continue;
            var c = classes[n]; /*ENVC*/
            var deps = dep1(c);
            if (deps.length == 0) {
                res.push(c);
                added[n] = true;
            }
        }
        if (res.length == p) {
            //var loop=[];
            for (let n in classes) {
                if (!added[n]) {
                    detectLoop(classes[n]); // || [];
                    break;
                }
            }
            throw (0, TError_1.default)((0, R_1.default)("circularDependencyDetected", ""), "Unknown", 0);
        }
    }
    function dep1(c) {
        let deps = TonyuRuntime_1.default.klass.getDependingClasses(c);
        /*var spc=c.superclass;
        var deps=spc ? [spc]:[] ;
        if (c.includes) deps=deps.concat(c.includes);*/
        deps = deps.filter(function (cl) {
            return cl && classes[cl.fullName] && !cl.builtin && !added[cl.fullName];
        });
        return deps;
    }
    function detectLoop(c) {
        var path = [];
        var visited = {};
        function pushPath(c) {
            path.push(c.fullName);
            if (visited[c.fullName]) {
                throw (0, TError_1.default)((0, R_1.default)("circularDependencyDetected", path.join("->")), "Unknown", 0);
            }
            visited[c.fullName] = true;
        }
        function popPath() {
            var p = path.pop();
            delete visited[p];
        }
        function loop(c) {
            //console.log("detectLoop2",c.fullName,JSON.stringify(visited));
            pushPath(c);
            var dep = dep1(c);
            dep.forEach(loop);
            popPath();
        }
        loop(c);
    }
    return res;
}
module.exports = class Builder {
    // Difference from TonyuProject
    //    projectCompiler defines projects of Tonyu 'Language'.
    //    Responsible for transpilation.
    //var traceTbl=Tonyu.TraceTbl;//();
    //var F=DU.throwF;
    //TPR.env.traceTbl=traceTbl;
    /*
    env: {
        options: options.json
        classes: classMeta of all projects(usually ===Tonyu.classMetas)
        aliases: shortName->fullName
        (parsedNode:) NO USE
        (amdPaths:) optional
        (traceTbl:) NO USE
    }
    ctx: {
        (visited:) not used??
        classes: ===env.classes===Tonyu.classMetas
        options: compile option( same as options.json:compiler?? )
    }
    */
    constructor(prj) {
        this.prj = prj;
    }
    isTonyu1() {
        const options = this.getOptions();
        return (0, tonyu1_1.isTonyu1)(options);
    }
    getOptions() { return this.prj.getOptions(); }
    getOutputFile(...f) { return this.prj.getOutputFile(...f); }
    getNamespace() { return this.prj.getNamespace(); }
    getDir() { return this.prj.getDir(); }
    getEXT() { return this.prj.getEXT(); }
    sourceFiles(ns) { return this.prj.sourceFiles(); }
    loadDependingClasses(ctx) { return this.prj.loadDependingClasses(ctx); }
    getEnv() {
        //this.env=this.env||{};
        if (this.env) {
            this.env.options = this.env.options || this.getOptions();
            this.env.aliases = this.env.aliases || {};
        }
        else {
            this.env = {
                options: this.getOptions(),
                aliases: {},
                classes: TonyuRuntime_1.default.classMetas,
                unresolvedVars: 0,
                //amdPaths:[],
            };
        }
        //this.env.options=this.env.options||this.getOptions();
        //this.env.aliases=this.env.aliases||{};
        return this.env;
    }
    // Difference of ctx and env:  env is of THIS project. ctx is of cross-project
    initCtx(ctx) {
        //どうしてclassMetasとclassesをわけるのか？
        // metaはFunctionより先に作られるから
        //if (!ctx) ctx={};
        function isBuilderContext(ctx) {
            return ctx && ctx.classes && ctx.options;
        }
        if (isBuilderContext(ctx))
            return ctx;
        const env = this.getEnv();
        return { /*visited:{},*/ classes: (env.classes = env.classes || TonyuRuntime_1.default.classMetas), options: ctx || {} };
    }
    requestRebuild() {
        var env = this.getEnv();
        env.options = this.getOptions();
        for (let k of this.getMyClasses()) {
            console.log("RMMeta", k.fullName);
            delete env.classes[k.fullName];
        }
        const myNsp = this.getNamespace();
        TonyuRuntime_1.default.klass.removeMetaAll(myNsp);
    }
    getMyClasses() {
        var env = this.getEnv();
        var ns = this.getNamespace();
        const res = [];
        for (var kn in env.classes) {
            var k = env.classes[kn];
            if (k.namespace == ns) {
                res.push(k);
            }
        }
        return res;
    }
    fileToClass(file) {
        const shortName = this.fileToShortClassName(file);
        const env = this.getEnv();
        const fullName = env.aliases[shortName];
        if (!fullName)
            return null;
        let res = env.classes[fullName];
        return res;
    }
    postChange(file) {
        // It may fails before call fullCompile
        const classMeta = this.fileToClass(file);
        if (!classMeta) {
            // new file added ( no dependency <- NO! all file should compile again!)
            // Why?  `new Added`  will change from `new _this.Added` to `new Tonyu.classes.user.Added`
            const m = this.addMetaFromFile(file);
            const c = {};
            c[m.fullName] = m;
            // TODO aliases?
            return this.partialCompile(c);
        }
        else {
            // existing file modified
            console.log("Ex", classMeta.fullName);
            return this.partialCompile(this.reverseDependingClasses(classMeta));
        }
    }
    reverseDependingClasses(klass) {
        // TODO: cache
        const dep = {};
        dep[klass.fullName] = klass;
        let mod = false;
        do {
            mod = false;
            for (let k of this.getMyClasses()) {
                if (dep[k.fullName])
                    continue;
                for (let k2 of TonyuRuntime_1.default.klass.getDependingClasses(k)) {
                    if (dep[k2.fullName]) {
                        dep[k.fullName] = k;
                        mod = true;
                        break;
                    }
                }
            }
        } while (mod);
        //console.log("revdep",Object.keys(dep));
        return dep;
    }
    parse(f) {
        const klass = this.addMetaFromFile(f);
        return Semantics.parse(klass);
    }
    fileToShortClassName(f) {
        const s = f.truncExt(this.getEXT());
        return this.isTonyu1() ? s.toLowerCase() : s;
    }
    addMetaFromFile(f) {
        const env = this.getEnv();
        const shortCn = this.fileToShortClassName(f);
        const myNsp = this.getNamespace();
        const fullCn = myNsp + "." + shortCn;
        const m = TonyuRuntime_1.default.klass.addMeta(fullCn, {
            fullName: fullCn,
            shortName: shortCn,
            namespace: myNsp
        });
        m.src = m.src || {};
        m.src.tonyu = f;
        // Q.1 is resolved here
        env.aliases[shortCn] = fullCn;
        return m;
    }
    async fullCompile(_ctx /*or options(For external call)*/) {
        const dir = this.getDir();
        const ctx = this.initCtx(_ctx);
        const ctxOpt = ctx.options || {};
        //if (!ctx.options.hot) Tonyu.runMode=false;
        this.showProgress("Compile: " + dir.name());
        console.log("Compile: " + dir.path(), "ctx:", ctx);
        var myNsp = this.getNamespace();
        let baseClasses, env, myClasses, sf;
        let compilingClasses;
        ctxOpt.destinations = ctxOpt.destinations || {
            memory: true,
            file: true
        };
        this.requestRebuild(); // Alternetes removeMetaAll
        await this.loadDependingClasses(ctx); // *254
        baseClasses = ctx.classes;
        env = this.getEnv();
        env.aliases = {};
        // Q2. Also remove depending classes?? (Already loaded in *254)
        //    NO! argument myNsp filters only this project classes.
        //Tonyu.klass.removeMetaAll(myNsp); // for removed files
        //env.parsedNode=env.parsedNode||{};
        env.classes = baseClasses;
        //console.log("env.classes===Tonyu.classMetas",env.classes===Tonyu.classMetas);
        for (var n in baseClasses) {
            var cl = baseClasses[n];
            // Q.1: Override same name in different namespace??
            // A.1: See definition of addMetaFromFile
            env.aliases[cl.shortName] = cl.fullName;
        }
        this.showProgress("scan sources");
        myClasses = {};
        //fileAddedOrRemoved=!!ctxOpt.noIncremental;
        sf = this.sourceFiles(myNsp);
        console.log("Sourcefiles", sf);
        for (var shortCn in sf) {
            var f = sf[shortCn];
            const m_1 = this.addMetaFromFile(f);
            myClasses[m_1.fullName] = baseClasses[m_1.fullName] = m_1;
        }
        this.showProgress("update check");
        compilingClasses = myClasses;
        console.log("compilingClasses", compilingClasses);
        return await this.partialCompile(compilingClasses, ctxOpt);
    }
    async partialCompile(compilingClasses, ctxOpt) {
        let env = this.getEnv();
        ctxOpt = ctxOpt || {};
        const destinations = ctxOpt.destinations || {
            memory: true
        };
        await Promise.resolve();
        for (var n in compilingClasses) {
            console.log("initClassDecl: " + n);
            // does parsing in Semantics
            Semantics.initClassDecls(compilingClasses[n], env); /*ENVC*/
        }
        await this.showProgress("order");
        const ord = orderByInheritance(compilingClasses); /*ENVC*/
        console.log("ORD", ord.map(c => c.fullName));
        ord.forEach(c_1 => {
            if (compilingClasses[c_1.fullName]) {
                console.log("annotate :" + c_1.fullName);
                Semantics.annotate(c_1, env);
            }
        });
        if (env.options.compiler.typeCheck) {
            console.log("Type check");
            let prevU = null;
            while (true) {
                env.unresolvedVars = 0;
                for (let n_1 in compilingClasses) {
                    (0, TypeChecker_1.checkTypeDecl)(compilingClasses[n_1], env);
                }
                for (let n_2 in compilingClasses) {
                    (0, TypeChecker_1.checkExpr)(compilingClasses[n_2], env);
                }
                if (env.unresolvedVars <= 0)
                    break;
                if (typeof prevU === "number" && env.unresolvedVars >= prevU)
                    break;
                prevU = env.unresolvedVars;
            }
        }
        await this.showProgress("genJS");
        //throw "test break";
        const buf = new IndentBuffer_1.IndentBuffer({ fixLazyLength: 6 });
        buf.traceIndex = {};
        await this.genJS(ord, {
            codeBuffer: buf,
            traceIndex: buf.traceIndex,
        });
        const s = SourceFiles_1.sourceFiles.add(buf.close(), buf.srcmap /*, buf.traceIndex */);
        if ((0, CompilerTypes_1.isFileDest)(destinations)) {
            const outf = this.getOutputFile();
            await s.saveAs(outf);
        }
        return s;
    }
    genJS(ord, genOptions) {
        // 途中でコンパイルエラーを起こすと。。。
        const env = this.getEnv();
        for (let c of ord) {
            console.log("genJS", c.fullName);
            JSGenerator.genJS(c, env, genOptions);
        }
        return Promise.resolve();
    }
    showProgress(m) {
        console.log("Progress:", m);
    }
    /*setAMDPaths(paths: string[]) {
        this.getEnv().amdPaths=paths;
    }*/
    async renameClassName(o, n) {
        await this.fullCompile();
        const EXT = ".tonyu";
        const env = this.getEnv();
        const changed = [];
        let renamingFile;
        const cls = env.classes; /*ENVC*/
        for (let cln in cls) { /*ENVC*/
            const klass = cls[cln]; /*ENVC*/
            const f = klass.src ? klass.src.tonyu : null;
            const a = klass.annotation;
            let changes = [];
            if (a && f && f.exists()) {
                if (klass.node) { // not exist when loaded from compiledProject
                    if (klass.node.ext) {
                        const spcl = klass.node.ext.superclassName; // {pos, len, text}
                        console.log("SPCl", spcl);
                        if (spcl.text === o) {
                            changes.push({ pos: spcl.pos, len: spcl.len });
                        }
                    }
                    if (klass.node.incl) {
                        const incl = klass.node.incl.includeClassNames; // [{pos, len, text}]
                        console.log("incl", incl);
                        for (let e of incl) {
                            if (e.text === o) {
                                changes.push({ pos: e.pos, len: e.len });
                            }
                        }
                    }
                }
                //console.log("klass.node",klass.node.ext, klass.node.incl );
                if (f.truncExt(EXT) === o) {
                    renamingFile = f;
                }
                console.log("Check", cln);
                for (let id in a) {
                    try {
                        var an = a[id];
                        var si = an.scopeInfo;
                        if (si && si.type == "class") {
                            //console.log("si.type==class",an,si);
                            if (si.name == o) {
                                var pos = an.node.pos;
                                var len = an.node.len;
                                var sub = f.text().substring(pos, pos + len);
                                if (sub == o) {
                                    changes.push({ pos: pos, len: len });
                                    console.log(f.path(), pos, len, f.text().substring(pos - 5, pos + len + 5), "->", n);
                                }
                            }
                        }
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                changes = changes.sort(function (a, b) { return b.pos - a.pos; });
                console.log(f.path(), changes);
                var src = f.text();
                var ssrc = src;
                for (let ch of changes) {
                    src = src.substring(0, ch.pos) + n + src.substring(ch.pos + ch.len);
                }
                if (ssrc != src && !f.isReadOnly()) {
                    console.log("Refact:", f.path(), src);
                    f.text(src);
                    changed.push(f);
                }
            }
            else {
                console.log("No Check", cln);
            }
        }
        if (renamingFile) {
            const renamedFile = renamingFile.sibling(n + EXT);
            renamingFile.moveTo(renamedFile);
            changed.push(renamingFile);
            changed.push(renamedFile);
        }
        return changed;
    }
    serializeAnnotatedNodes() {
        const cls = this.getMyClasses();
        let idseq = 1;
        let map = new Map();
        let objs = {};
        //let rootSrc={};
        //for (let cl of cls) {rootSrc[cl.fullName]={node:cl.node, annotation:cl.annotation};}
        let root = traverse(cls);
        if (root.REF !== 1) {
            throw new Error(root.REF);
        }
        return objs;
        //console.log(JSON.stringify(objs));
        function refobj(id) {
            return { REF: id };
        }
        function isArray(a) {
            return a && typeof a.slice === "function" &&
                typeof a.map === "function" && typeof a.length === "number";
        }
        function isNativeSI(a) {
            return a.type === "native" && a.value;
        }
        function isSFile(path) {
            return path && typeof (path.isSFile) == "function" && path.isSFile();
        }
        function traverse(a) {
            if (a && typeof a === "object") {
                if (map.has(a)) {
                    return refobj(map.get(a));
                }
                let id = idseq++;
                map.set(a, id);
                let res;
                if (isSFile(a)) {
                    res = { isSFile: true, path: a.path() };
                }
                else if (isArray(a)) {
                    res = a.map(traverse);
                }
                else {
                    res = {};
                    let nsi = isNativeSI(a);
                    for (let k of Object.keys(a)) {
                        if (nsi && k === "value")
                            continue;
                        if (k === "toString")
                            continue;
                        res[k] = traverse(a[k]);
                    }
                }
                objs[id] = res;
                return refobj(id);
            }
            else if (typeof a === "function") {
                return { FUNC: a.name };
            }
            else {
                return a;
            }
        }
    }
};

},{"../lib/R":28,"../runtime/TError":37,"../runtime/TonyuRuntime":39,"./CompilerTypes":4,"./IndentBuffer":7,"./JSGenerator":8,"./Semantics":11,"./SourceFiles":12,"./TypeChecker":13,"./tonyu1":24}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMethodType = exports.isMeta = exports.isNativeClass = exports.isArrayType = exports.isMemoryDest = exports.isFileDest = void 0;
function isFileDest(d) {
    return d.file;
}
exports.isFileDest = isFileDest;
function isMemoryDest(d) {
    return d.memory;
}
exports.isMemoryDest = isMemoryDest;
function isArrayType(klass) {
    return klass.element;
}
exports.isArrayType = isArrayType;
function isNativeClass(klass) {
    return klass.class;
}
exports.isNativeClass = isNativeClass;
function isMeta(klass) {
    return klass.decls;
}
exports.isMeta = isMeta;
function isMethodType(klass) {
    return klass.method;
}
exports.isMethodType = isMethodType;

},{}],5:[function(require,module,exports){
"use strict";
// parser.js の補助ライブラリ．式の解析を担当する
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionParser = void 0;
const parser_1 = require("./parser");
//import Parser from "./parser";
const OPTYPE = Symbol("OPTYPE");
function ExpressionParser(context, name = "Expression") {
    function opType(type, prio) {
        return {
            eq(o) { return type == o.type() && prio == o.prio(); },
            type(t) { if (!t)
                return type;
            else
                return t == type; },
            prio() { return prio; },
            toString() { return "[" + type + ":" + prio + "]"; },
        };
    }
    function composite(a) {
        let e = a;
        return {
            add(a) {
                if (!e) {
                    e = a;
                }
                else {
                    e = e.or(a);
                }
            },
            get() {
                return e;
            }
        };
    }
    function typeComposite() {
        const built = composite();
        return {
            reg(type, prio, a) {
                const opt = opType(type, prio);
                built.add(a.assign({ [OPTYPE]: opt }));
            },
            get() { return built.get(); },
            parse(st) {
                return this.get().parse(st);
            }
        };
    }
    function toStrF(...attrs) {
        return function () {
            let buf = "(";
            for (let a of attrs) {
                buf += this[a];
            }
            return buf + ")";
        };
    }
    const prefixOrElement = typeComposite(), postfixOrInfix = typeComposite();
    const element = composite();
    const trifixes = [];
    const $ = {
        element(e) {
            prefixOrElement.reg("element", -1, e);
            element.add(e);
        },
        getElement() { return element.get(); },
        prefix(prio, pre) {
            prefixOrElement.reg("prefix", prio, pre);
        },
        postfix(prio, post) {
            postfixOrInfix.reg("postfix", prio, post);
        },
        infixl(prio, inf) {
            postfixOrInfix.reg("infixl", prio, inf);
        },
        infixr(prio, inf) {
            postfixOrInfix.reg("infixr", prio, inf);
        },
        infix(prio, inf) {
            postfixOrInfix.reg("infix", prio, inf);
        },
        trifixr(prio, tf1, tf2) {
            postfixOrInfix.reg("trifixr", prio, tf1);
            //postfixOrInfix.reg("trifixr2", prio, tf2);
            trifixes[prio] = tf2;
        },
        mkInfix(f) {
            $.mkInfix_def = f;
        },
        mkInfixl(f) {
            $.mkInfixl_def = f;
        },
        mkInfixr(f) {
            $.mkInfixr_def = f;
        },
        mkPrefix(f) {
            $.mkPrefix_def = f;
        },
        mkPostfix(f) {
            $.mkPostfix_def = f;
        },
        mkTrifixr(f) {
            $.mkTrifixr_def = f;
        },
        built: null,
        build() {
            //postfixOrInfix.build();
            //prefixOrElement.build();
            //console.log("BUILT fst ");
            //prefixOrElement.get().dispTbl();
            let built = context.create((st) => parse(0, st)).setName(name).copyFirst(prefixOrElement.get());
            //const fst=prefixOrElement.get()._first;
            //built.dispTbl();
            /*if (fst && !fst[ALL] && context.space==="TOKEN") {
                built=built.firstTokens(Object.keys(fst));
            }*/
            $.built = built;
            return built;
        },
        mkInfix_def(left, op, right) {
            return (0, parser_1.setRange)({ type: "infix", op, left, right, toString: toStrF("left", "op", "right") });
        },
        mkInfixl_def(left, op, right) {
            return (0, parser_1.setRange)({ type: "infixl", op, left, right, toString: toStrF("left", "op", "right") });
        },
        mkInfixr_def(left, op, right) {
            return (0, parser_1.setRange)({ type: "infixr", op, left, right, toString: toStrF("left", "op", "right") });
        },
        mkPrefix_def(op, right) {
            return (0, parser_1.setRange)({ type: "prefix", op, right, toString: toStrF("op", "right") });
        },
        mkPostfix_def(left, op) {
            return (0, parser_1.setRange)({ type: "postfix", left, op, toString: toStrF("left", "op") });
        },
        mkTrifixr_def(left, op1, mid, op2, right) {
            return (0, parser_1.setRange)({ type: "trifixr", left, op1, mid, op2, right, toString: toStrF("left", "op1", "mid", "op2", "right") });
        },
        lazy() {
            return context.create((st) => $.built.parse(st)).setName(name, { type: "lazy", name });
        },
    };
    function dump(st, lbl) {
        /*var s=st.src.str;
        console.log("["+lbl+"] "+s.substring(0,st.pos)+"^"+s.substring(st.pos)+
                " opType="+ getOpType(s)+"  Succ = "+st.isSuccess()+" res="+st.result[0]);*/
        //console.log(lbl,st+"");
    }
    function getOpType(s) {
        return s.result[0][OPTYPE];
    }
    function parse(minPrio, st) {
        let res = st, opt;
        dump(st, " start minprio= " + minPrio);
        st = prefixOrElement.parse(st);
        dump(st, " prefixorelem " + minPrio);
        if (!st.isSuccess()) {
            return st;
        }
        //p2=st.result[0];
        opt = getOpType(st);
        if (opt.type("prefix")) {
            // st = -^elem
            const pre = st.result[0];
            st = parse(opt.prio(), st);
            if (!st.isSuccess()) {
                return st;
            }
            // st: Expr    st.pos = -elem^
            const pex = $.mkPrefix_def(pre, st.result[0]);
            res = st.clone(); //  res:Expr
            res.result = [pex]; // res:prefixExpr  res.pos= -elem^
            if (!getNextPostfixOrInfix(st)) {
                return res;
            }
            // st.next =  -elem+^elem
            st = getNextPostfixOrInfix(st); // st: postfixOrInfix
        }
        else { //elem
            //p=p2;
            res = st.clone(); // res:elemExpr   res =  elem^
            st = postfixOrInfix.parse(st);
            if (!st.isSuccess()) {
                return res;
            }
        }
        // assert st:postfixOrInfix  res:Expr
        while (true) {
            dump(st, "st:pi");
            dump(res, "res:ex");
            opt = getOpType(st);
            if (opt.prio() < minPrio) {
                return setNextPostfixOrInfix(res, st);
            }
            // assert st:postfixOrInfix  res:Expr
            if (opt.type("postfix")) {
                // st:postfix
                const pex = $.mkPostfix_def(res.result[0], st.result[0]);
                res = st.clone();
                res.result = [pex]; // res.pos= expr++^
                dump(st, "185");
                st = postfixOrInfix.parse(st); // st. pos= expr++--^
                if (!st.isSuccess()) {
                    return res;
                }
            }
            else if (opt.type("infixl")) { //x+y+z
                // st: infixl
                var inf = st.result[0];
                st = parse(opt.prio() + 1, st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                const pex = $.mkInfixl_def(res.result[0], inf, st.result[0]);
                res = st.clone();
                res.result = [pex]; //res:infixlExpr
                if (!getNextPostfixOrInfix(st)) {
                    return res;
                }
                st = getNextPostfixOrInfix(st);
            }
            else if (opt.type("infixr")) { //a=^b=c
                // st: infixr
                const inf = st.result[0];
                st = parse(opt.prio(), st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  a=b=c^
                const pex = $.mkInfixr_def(res.result[0], inf, st.result[0]);
                res = st.clone();
                res.result = [pex]; //res:infixrExpr
                if (!getNextPostfixOrInfix(st)) {
                    return res;
                }
                st = getNextPostfixOrInfix(st);
            }
            else if (opt.type("trifixr")) { //left?^mid:right
                // st: trifixr
                var left = res.result[0];
                var inf1 = st.result[0]; // inf1 =  ?
                st = parse(opt.prio() + 1, st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st= expr   st.pos=  left?mid^:right
                var mid = st.result[0];
                st = trifixes[opt.prio()].parse(st);
                // st= :      st.pos= left?mid:^right;
                if (!st.isSuccess()) {
                    return res;
                }
                var inf2 = st.result[0];
                st = parse(opt.prio(), st);
                if (!st.isSuccess()) {
                    return res;
                }
                var right = st.result[0];
                // st=right      st.pos= left?mid:right^;
                const pex = $.mkTrifixr_def(left, inf1, mid, inf2, right);
                res = st.clone();
                res.result = [pex]; //res:infixrExpr
                if (!getNextPostfixOrInfix(st)) {
                    return res;
                }
                st = getNextPostfixOrInfix(st);
            }
            else { // infix
                // st: infixl
                const inf = st.result[0];
                st = parse(opt.prio() + 1, st);
                if (!st.isSuccess()) {
                    return res;
                }
                // st: expr   st.pos=  expr+expr^
                const pex = $.mkInfix_def(res.result[0], inf, st.result[0]);
                res = st.clone();
                res.result = [pex]; //res:infixExpr
                if (!getNextPostfixOrInfix(st)) {
                    return res;
                }
                st = getNextPostfixOrInfix(st);
                if (opt.prio() == getOpType(st).prio()) {
                    res.error = "error"; //success=false;
                    return res;
                }
            }
            // assert st:postfixOrInfix  res:Expr
        }
    }
    const NEXT = Symbol("NEXT");
    function getNextPostfixOrInfix(st) {
        return st.result[0][NEXT];
    }
    function setNextPostfixOrInfix(res, next) {
        res.result[0][NEXT] = next;
        return res;
    }
    return $;
}
exports.ExpressionParser = ExpressionParser;
;

},{"./parser":20}],6:[function(require,module,exports){
"use strict";
//import * as Parser from "./parser";
const parser_1 = require("./parser");
const Grammar = function (context) {
    function trans(name) {
        if (typeof name == "string")
            return get(name);
        return name;
    }
    /*function tap(name) {
        return Parser.create(function (st) {
            console.log("Parsing "+name+" at "+st.pos+"  "+st.src.str.substring(st.pos, st.pos+20).replace(/[\r\n]/g,"\\n"));
            return st;
        });
    }*/
    function comp(o1, o2) {
        return Object.assign(o1, o2);
    }
    function get(name) {
        if (defs[name])
            return defs[name];
        if (lazyDefs[name])
            return lazyDefs[name];
        const res = context.lazy(function () {
            const r = defs[name];
            if (!r)
                throw "grammar named '" + name + "' is undefined";
            return r;
        }).setName("(Lazy of " + name + ")", { type: "lazy", name });
        lazyDefs[name] = res;
        typeInfos.set(res, { name }); //,struct:{type:"lazy",name}});
        return res;
    }
    function chain(parsers, f) {
        const [first, ...rest] = parsers;
        let p = first;
        for (const e of rest) {
            p = f(p, e);
        }
        return p;
    }
    function traverseStruct(st, visited) {
        if (st && st.type === "lazy")
            return st.name;
        if (st && st.type === "retN") {
            return traverse(st.elems[st.index], visited);
        }
        if (st && st.type === "object") {
            const fields = {};
            for (let k in st.fields) {
                fields[k] = st.elems[st.fields[k]];
            }
            return {
                type: "object",
                fields: traverse(fields, visited),
            };
        }
        return traverse(st, visited);
    }
    function traverse(val, visited /*,depth:number*/) {
        //if (depth>10) return "DEPTH";
        if (visited.has(val))
            return "LOOP";
        try {
            visited.add(val);
            if (val instanceof parser_1.Parser) {
                const ti = typeInfos.get(val);
                if (ti)
                    return ti.name;
                const st = val.struct;
                if (st)
                    return traverseStruct(st, visited);
                return val.name;
            }
            if (val instanceof Array) {
                const res = val.map((e) => traverse(e, visited));
                return res;
            }
            if (typeof val === "object") {
                const res = {};
                const keys = Object.keys(val);
                for (const k of keys) {
                    res[k] = traverse(val[k], visited);
                }
                return res;
            }
            return val;
        }
        finally {
            visited.delete(val);
        }
    }
    function buildTypes() {
        for (const k of Object.keys(defs)) {
            const v = defs[k];
            console.log("---", k);
            console.dir(traverseStruct(v.struct, new Set), { depth: null });
        }
        let buf = "";
        function c(n) {
            return n[0].toUpperCase() + n.substring(1);
        }
        function uniq(a) {
            return Array.from(new Set(a));
        }
        function toType(st, type) {
            if (!st)
                return;
            if (st.type === "or") {
                return uniq(st.elems.map(toType)).join("|");
            }
            else if (st.type === "object") {
                return "{\n" +
                    (type ? `  type: "${type}";\n` : "") +
                    Object.keys(st.fields).map((f) => `  ${f}: ${toType(st.fields[f])}`).join(", \n") + "\n}";
            }
            else if (st.type === "opt") {
                return toType(st.elem) + "|null";
            }
            else if (st.type === "rept") {
                return toType(st.elem) + "[]";
            }
            else if (st.type === "primitive") {
                return "Token";
            }
            return c(st + "");
        }
        const cands = [];
        for (const k of Object.keys(defs)) {
            const v = defs[k];
            if (!v.struct)
                continue;
            buf += `export type ${c(k)}=${v.struct.type === "object" ? "NodeBase&" : ""}`;
            buf += toType(traverseStruct(v.struct, new Set), k);
            buf += ";\n";
            if (v.struct.type === "object") {
                buf += `export function is${c(k)}(n:Node):n is ${c(k)} {
   return n && n.type==="${k}";
}
`;
                cands.push(c(k));
            }
        }
        buf += `export type Node=${cands.join("|")};\n`;
        console.log(buf);
    }
    function checkFirstTbl() {
        for (const k of Object.keys(defs)) {
            const v = defs[k];
            console.log("---", k);
            if (v._first) {
                const tbl = v._first;
                for (let f of Object.keys(tbl)) {
                    let p = tbl[f];
                    if (p._lazy)
                        p = p._lazy.resolve();
                    //console.dir({[f]: traverse( /*typeInfos.get*/(p) , new Set)}, {depth:null}  );
                    console.log("  " + f + "=>", p.name);
                }
                if (tbl[parser_1.ALL]) {
                    let p = tbl[parser_1.ALL];
                    if (p._lazy)
                        p = p._lazy.resolve();
                    //console.dir({[f]: traverse( /*typeInfos.get*/(p) , new Set)}, {depth:null}  );
                    console.log("  ALL=>", p.name);
                }
            }
            else {
                console.log("NO FIRST TBL");
            }
        }
    }
    const typeInfos = new WeakMap();
    /*function setTypeInfo(parser, name, fields={}) {
        parser.typeInfo={name, fields};
        return parser;
    }*/
    const defs = {};
    const lazyDefs = {};
    return comp((name) => {
        return {
            alias(parser) {
                defs[name] = parser;
                typeInfos.set(parser, { name }); //, struct:parser.struct});
                return parser;
            },
            ands(..._parsers) {
                const parsers = _parsers.map(trans);
                const p = chain(parsers, (p, e) => p.and(e)).tap(name);
                //p.parsers=parsers;
                defs[name] = p;
                return {
                    ret(...args) {
                        if (args.some((e) => e === "type")) {
                            throw new Error("Cannot use field name 'type' which is reserved.");
                        }
                        /*if (false) {
                            if (args.length==0) return p;
                            const names=[];
                            const fields={};
                            for (var i=0 ; i<args.length ;i++) {
                                names[i]=args[i];
                                if (names[i]) fields[names[i]]=parsers[i];
                            }
                            const res=p.ret(function (...args) {
                                var res={type:name};
                                res[SUBELEMENTS]=[];
                                for (var i=0 ; i<args.length ;i++) {
                                    var e=args[i];
                                    var rg=setRange(e);
                                    addRange(res, rg);
                                    if (names[i]) {
                                        res[names[i]]=e;
                                    }
                                    res[SUBELEMENTS].push(e);
                                }
                                res.toString=function () {
                                    return "("+this.type+")";
                                };
                                return (res);
                            }).setName(name);
                            typeInfos.set(res,{name, struct:res.struct});
                            //setTypeInfo(res,name,fields);
                            defs[name]=res;
                            return  res;
                        }*/
                        const res0 = p.obj(...args).setName(name);
                        const res = res0.assign({
                            type: name,
                            toString: () => `(${name})`,
                        }).setAlias(res0);
                        typeInfos.set(res, { name }); //, struct:res.struct});
                        //setTypeInfo(res,name,fields);
                        defs[name] = res;
                        return res;
                    }
                };
            },
            ors(...parsers) {
                parsers = parsers.map(trans);
                const p = chain(parsers, (p, e) => p.or(e)).setName(name);
                //p.parsers=parsers;
                typeInfos.set(p, { name }); //, struct:{type:"or", elems:parsers}});
                defs[name] = p; //setTypeInfo(p,"or",{});
                return defs[name];
            }
        };
        //return $$;
    }, { defs, get, buildTypes, checkFirstTbl });
    //return $;
};
module.exports = Grammar;

},{"./parser":20}],7:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndentBuffer = void 0;
const StringBuilder_1 = __importDefault(require("../lib/StringBuilder"));
const source_map_1 = __importDefault(require("./source-map"));
const Pos2RC = function (src) {
    var map = [];
    var pos = 0;
    var lastRow = 0;
    src.split("\n").forEach(function (line) {
        map.push(pos);
        pos += line.length + 1;
    });
    map.push(pos);
    return {
        getRC(pos) {
            while (true) {
                if (lastRow < 0) {
                    return { row: 1, col: 1 };
                }
                if (lastRow + 1 >= map.length) {
                    return { row: map.length, col: 1 };
                }
                //A(!( pos<map[lastRow]  &&  map[lastRow]<=pos ));
                //A(!( map[lastRow+1]<=pos  &&  pos<map[lastRow+1] ));
                if (pos < map[lastRow]) {
                    lastRow--;
                }
                else if (map[lastRow + 1] <= pos) {
                    lastRow++;
                }
                else {
                    return { row: lastRow + 1, col: pos - map[lastRow] + 1 };
                }
            }
        }
    };
};
class IndentBuffer {
    constructor(options) {
        this.useLengthPlace = false;
        this.lazyOverflow = false;
        this.traceIndex = {};
        //$.printf=$;
        this.buf = (0, StringBuilder_1.default)();
        this.bufRow = 1;
        this.bufCol = 1;
        this.srcmap = new source_map_1.default.SourceMapGenerator();
        this.indentBuf = "";
        this.indentStr = "  ";
        const $ = this;
        this.options = options || {};
        this.options.fixLazyLength = this.options.fixLazyLength || 6;
        $.dstFile = options.dstFile;
        $.mapFile = options.mapFile;
    }
    get printf() { return this._printf.bind(this); }
    _printf(fmt, ...args) {
        const $ = this;
        //var args=arguments;
        //var fmt=args[0];
        //console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
        let ai = -1;
        function shiftArg(nullable = false) {
            ai++;
            var res = args[ai];
            if (res == null && !nullable) {
                console.log(args);
                throw new Error(ai + "th null param: fmt=" + fmt);
            }
            return res;
        }
        while (true) {
            var i = fmt.indexOf("%");
            if (i < 0) {
                $.print(fmt);
                break;
            }
            $.print(fmt.substring(0, i));
            i++;
            var fstr = fmt.charAt(i);
            if (fstr == "s") {
                var str = shiftArg();
                if (typeof str == "string" || typeof str == "number") { }
                else if (str == null)
                    str = "null";
                else if (str.text) {
                    $.addMapping(str);
                    str = str.text;
                }
                $.print(str);
                i++;
            }
            else if (fstr == "d") {
                var n = shiftArg();
                if (typeof n != "number")
                    throw new Error(n + " is not a number: fmt=" + fmt);
                $.print(n);
                i++;
            }
            else if (fstr == "n") {
                $.ln();
                i++;
            }
            else if (fstr == "{") {
                $.indent();
                i++;
            }
            else if (fstr == "}") {
                $.dedent();
                i++;
            }
            else if (fstr == "%") {
                $.print("%");
                i++;
            }
            else if (fstr == "f") {
                shiftArg()($);
                i++;
            }
            else if (fstr == "l") {
                var lit = shiftArg();
                $.print($.toLiteral(lit));
                i++;
            }
            else if (fstr == "v") {
                var a = shiftArg();
                if (!a)
                    throw new Error("Null %v");
                if (typeof a != "object")
                    throw new Error("nonobject %v:" + a);
                $.addMapping(a);
                $.visit(a);
                i++;
            }
            else if (fstr == "z") {
                var place = shiftArg();
                if ("val" in place) {
                    $.print(place.val);
                    return;
                }
                if (!place.inited) {
                    $.lazy(place);
                }
                place.print();
                //$.print(place.gen);
                i++;
            }
            else if (fstr == "j") {
                var sp_node = shiftArg();
                var sp = sp_node[0];
                var node = sp_node[1];
                var sep = false;
                if (!node || !node.forEach) {
                    console.log(node);
                    throw new Error(node + " is not array. cannot join fmt:" + fmt);
                }
                for (let n of node) {
                    if (sep)
                        $.printf(sp);
                    sep = true;
                    $.visit(n);
                }
                i++;
            }
            else if (fstr == "D") {
                shiftArg(true);
                i++;
            }
            else {
                i += 2;
            }
            fmt = fmt.substring(i);
        }
        if (ai + 1 < args.length)
            throw new Error(`printf: Argument remains ${ai + 1}<${args.length}`);
    }
    visit(n) {
        if (!this.visitor)
            throw new Error("Visitor is not set");
        this.visitor.visit(n);
    }
    addTraceIndex(fname) {
        this.traceIndex[fname] = 1;
    }
    addMapping(token) {
        const $ = this;
        //console.log("Token",token,$.srcFile+"");
        if (!$.srcFile)
            return;
        // token:extend({text:String},{pos:Number}|{row:Number,col:Number})
        var rc;
        if (typeof token.row == "number" && typeof token.col == "number") {
            rc = { row: token.row, col: token.col };
        }
        else if (typeof token.pos == "number") {
            rc = $.srcRCM.getRC(token.pos);
        }
        if (rc) {
            //console.log("Map",{src:{file:$.srcFile+"",row:rc.row,col:rc.col},
            //dst:{row:$.bufRow,col:$.bufCol}  });
            $.srcmap.addMapping({
                generated: {
                    line: $.bufRow,
                    column: $.bufCol
                },
                source: $.srcFile + "",
                original: {
                    line: rc.row,
                    column: rc.col
                }
                //name: "christopher"
            });
        }
    }
    ;
    setSrcFile(f) {
        const $ = this;
        $.srcFile = f;
        $.srcRCM = Pos2RC(f.text());
        $.srcmap.setSourceContent(f.path(), f.text());
    }
    print(v) {
        const $ = this;
        $.buf.append(v);
        var a = (v + "").split("\n");
        a.forEach(function (line, i) {
            if (i < a.length - 1) { // has \n
                $.bufCol += line.length + 1;
                $.bufRow++;
                $.bufCol = 1;
            }
            else {
                $.bufCol += line.length;
            }
        });
    }
    ;
    lazy(place = {}) {
        const $ = this;
        const options = $.options;
        place.length = place.length || options.fixLazyLength;
        place.pad = place.pad || " ";
        place.gen = (function () {
            var r = "";
            for (var i = 0; i < place.length; i++)
                r += place.pad;
            return r;
        })();
        place.puts = [];
        $.useLengthPlace = true;
        place.inited = true;
        //place.src=place.gen;
        place.put = function (val) {
            this.val = val + "";
            if (this.puts) {
                if (this.val.length > this.length) {
                    $.lazyOverflow = true;
                }
                while (this.val.length < this.length) {
                    this.val += this.pad;
                }
                var place = this;
                this.puts.forEach(function (i) {
                    $.buf.replace(i, place.val);
                    /*var pl=$.buf.length;
                    $.buf=$.buf.substring(0,i)+place.val+$.buf.substring(i+place.length);
                    A.eq(pl,$.buf.length);*/
                });
            }
            /*if (this.reg) {
                $.buf=$.buf.replace(this.reg, val);
            }*/
            return this.val;
        };
        place.print = function () {
            if (this.puts)
                this.puts.push($.buf.getLength());
            $.print(this.gen);
        };
        return place;
        //return {put: function () {} };
    }
    ln() {
        const $ = this;
        $.print("\n" + $.indentBuf);
    }
    indent() {
        const $ = this;
        $.indentBuf += $.indentStr;
        $.print("\n" + $.indentBuf);
    }
    dedent() {
        const $ = this;
        var len = $.indentStr.length;
        if (!$.buf.last(len).match(/^\s*$/)) {
            console.log($.buf);
            throw new Error("Non-space truncated ");
        }
        $.buf.truncate(len); //=$.buf.substring(0,$.buf.length-len);
        $.indentBuf = $.indentBuf.substring(0, $.indentBuf.length - len);
    }
    toLiteral(s, quote = "'") {
        if (typeof s !== "string") {
            console.log("no literal ", s);
            throw new Error("toLiteral:" + s + " is not a literal");
        }
        s = s.replace(/\\/g, "\\\\");
        s = s.replace(/\r/g, "\\r");
        s = s.replace(/\n/g, "\\n");
        if (quote == "'")
            s = s.replace(/'/g, "\\'");
        else
            s = s.replace(/"/g, '\\"');
        return quote + s + quote;
    }
    close() {
        const $ = this;
        $.mapStr = $.srcmap.toString();
        if ($.mapFile && $.dstFile) {
            $.mapFile.text($.mapStr);
            $.printf("%n//# sourceMappingURL=%s%n", $.mapFile.relPath($.dstFile.up()));
        }
        const gen = $.buf + "";
        if ($.dstFile) {
            $.dstFile.text(gen);
        }
        return gen;
    }
    ;
}
exports.IndentBuffer = IndentBuffer;
/*
export= function IndentBuffer(options) {
    options=options||{};
    options.fixLazyLength=options.fixLazyLength||6;
    var $:any=function (fmt:string, ...args:any[]) {
        //var args=arguments;
        //var fmt=args[0];
        //console.log(fmt+ " -- "+arguments[0]+" --- "+arguments.length);
        var ai=-1;
        function shiftArg(nullable=false) {
            ai++;
            var res=args[ai];
            if (res==null && !nullable) {
                console.log(args);
                throw new Error(ai+"th null param: fmt="+fmt);
            }
            return res;
        }
        while (true) {
            var i=fmt.indexOf("%");
            if (i<0) {$.print(fmt); break;}
            $.print(fmt.substring(0,i));
            i++;
            var fstr=fmt.charAt(i);
            if (fstr=="s") {
                var str=shiftArg();
                if (typeof str == "string" || typeof str =="number") {}
                else if (str==null) str="null";
                else if (str.text) {
                    $.addMapping(str);
                    str=str.text;
                }
                $.print(str);
                i++;
            } else if (fstr=="d") {
                var n=shiftArg();
                if (typeof n!="number") throw new Error (n+" is not a number: fmt="+fmt);
                $.print(n);
                i++;
            } else if (fstr=="n") {
                $.ln();
                i++;
            } else if (fstr=="{") {
                $.indent();
                i++;
            } else if (fstr=="}") {
                $.dedent();
                i++;
            } else if (fstr=="%") {
                $.print("%");
                i++;
            } else if (fstr=="f") {
                shiftArg()($);
                i++;
            } else if (fstr=="l") {
                var lit=shiftArg();
                $.print($.toLiteral(lit));
                i++;
            } else if (fstr=="v") {
                var a=shiftArg();
                if (!a) throw new Error ("Null %v");
                if (typeof a!="object") throw new Error("nonobject %v:"+a);
                $.addMapping(a);
                $.visitor.visit(a);
                i++;
            } else if (fstr=="z") {
                var place=shiftArg();
                if ("val" in place) {
                    $.print(place.val);
                    return;
                }
                if (!place.inited) {
                    $.lazy(place);
                }
                place.print();
                //$.print(place.gen);
                i++;
            } else if (fstr=="j") {
                var sp_node=shiftArg();
                var sp=sp_node[0];
                var node=sp_node[1];
                var sep=false;
                if (!node || !node.forEach) {
                    console.log(node);
                    throw new Error (node+" is not array. cannot join fmt:"+fmt);
                }
                for (let n of node) {
                    if (sep) $.printf(sp);
                    sep=true;
                    $.visitor.visit(n);
                }
                i++;
            } else if (fstr=="D"){
                shiftArg(true);
                i++;
            } else {
                i+=2;
            }
            fmt=fmt.substring(i);
        }
    };
    $.addTraceIndex=function (fname) {
        if (!this.traceIndex) this.traceIndex={};
        this.traceIndex[fname]=1;
    };
    $.addMapping=function (token) {
        //console.log("Token",token,$.srcFile+"");
        if (!$.srcFile) return ;
        // token:extend({text:String},{pos:Number}|{row:Number,col:Number})
        var rc;
        if (typeof token.row=="number" && typeof token.col=="number") {
            rc={row:token.row, col:token.col};
        } else if (typeof token.pos=="number") {
            rc=$.srcRCM.getRC(token.pos);
        }
        if (rc) {
            //console.log("Map",{src:{file:$.srcFile+"",row:rc.row,col:rc.col},
            //dst:{row:$.bufRow,col:$.bufCol}  });
            $.srcmap.addMapping({
                generated: {
                    line: $.bufRow,
                    column: $.bufCol
                },
                source: $.srcFile+"",
                original: {
                    line: rc.row,
                    column: rc.col
                }
                //name: "christopher"
            });
        }
    };
    $.setSrcFile=function (f) {
        $.srcFile=f;
        $.srcRCM=Pos2RC(f.text());
        $.srcmap.setSourceContent(f.path(),f.text());
    };
    $.print=function (v) {
        $.buf.append(v);
        var a=(v+"").split("\n");
        a.forEach(function (line,i) {
            if (i<a.length-1) {// has \n
                $.bufCol+=line.length+1;
                $.bufRow++;
                $.bufCol=1;
            } else {
                $.bufCol+=line.length;
            }
        });
    };
    $.dstFile=options.dstFile;
    $.mapFile=options.mapFile;
    $.printf=$;
    $.buf=StringBuilder();
    $.bufRow=1;
    $.bufCol=1;
    $.srcmap=new SourceMap.SourceMapGenerator();
    $.lazy=function (place) {
        if (!place) place={};
            place.length=place.length||options.fixLazyLength;
            place.pad=place.pad||" ";
            place.gen=(function () {
                var r="";
                for(var i=0;i<place.length;i++) r+=place.pad;
                return r;
            })();
            place.puts=[];
            $.useLengthPlace=true;

        place.inited=true;
        //place.src=place.gen;
        place.put=function (val) {
            this.val=val+"";
            if (this.puts) {
                if (this.val.length>this.length) {
                    $.lazyOverflow=true;
                }
                while (this.val.length<this.length) {
                    this.val+=this.pad;
                }
                var place=this;
                this.puts.forEach(function (i) {
                    $.buf.replace(i, place.val);

                });
            }

            return this.val;
        };
        place.print=function () {
            if (this.puts) this.puts.push($.buf.getLength());
            $.print(this.gen);
        };
        return place;
        //return {put: function () {} };
    };
    $.ln=function () {
        $.print("\n"+$.indentBuf);
    };
    $.indent=function () {
        $.indentBuf+=$.indentStr;
        $.print("\n"+$.indentBuf);
    };
    $.dedent = function () {
        var len=$.indentStr.length;
        if (!$.buf.last(len).match(/^\s*$/)) {
            console.log($.buf);
            throw new Error ("Non-space truncated ");
        }
        $.buf.truncate(len);//=$.buf.substring(0,$.buf.length-len);
        $.indentBuf=$.indentBuf.substring(0 , $.indentBuf.length-len);
    };
    $.toLiteral= function (s, quote) {
        if (!quote) quote="'";
    if (typeof s!=="string") {
        console.log("no literal ",s);
        throw new Error("toLiteral:"+s+" is not a literal");
    }
        s = s.replace(/\\/g, "\\\\");
        s = s.replace(/\r/g, "\\r");
        s = s.replace(/\n/g, "\\n");
        if (quote=="'") s = s.replace(/'/g, "\\'");
        else s = s.replace(/"/g, '\\"');
        return quote + s + quote;
    };
    $.indentBuf="";
    $.indentStr="  ";
    $.close=function () {
        $.mapStr=$.srcmap.toString();
        if ($.mapFile && $.dstFile) {
            $.mapFile.text($.mapStr);
            $.printf("%n//# sourceMappingURL=%s%n",$.mapFile.relPath($.dstFile.up()));
        }
        const gen=$.buf+"";
        if ($.dstFile) {
            $.dstFile.text(gen);
        }
        return gen;
    };
    return $;
};*/

},{"../lib/StringBuilder":29,"./source-map":22}],8:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genJS = void 0;
const Visitor_1 = require("./Visitor");
const IndentBuffer_1 = require("./IndentBuffer");
const tonyu1_1 = require("./tonyu1");
const OM = __importStar(require("./ObjectMatcher"));
const cu = __importStar(require("./compiler"));
const context_1 = require("./context");
const CompilerTypes_1 = require("./CompilerTypes");
const compiler_1 = require("./compiler");
//export=(cu as any).JSGenerator=(function () {
// TonyuソースファイルをJavascriptに変換する
const TH = "_thread", THIZ = "_this", ARGS = "_arguments", FIBPRE = "fiber$" /*F,RMPC="__pc", LASTPOS="$LASTPOS",CNTV="__cnt",CNTC=100*/; //G
var BINDF = "Tonyu.bindFunc";
var INVOKE_FUNC = "Tonyu.invokeMethod";
var CALL_FUNC = "Tonyu.callFunc";
var CHK_NN = "Tonyu.checkNonNull";
var CLASS_HEAD = "Tonyu.classes.", GLOBAL_HEAD = "Tonyu.globals.";
var GET_THIS = "this"; //"this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this)";
var USE_STRICT = '"use strict";%n';
var ITER2 = "Tonyu.iterator2";
var SUPER = "__superClass";
/*var ScopeTypes={FIELD:"field", METHOD:"method", NATIVE:"native",//B
        LOCAL:"local", THVAR:"threadvar", PARAM:"param", GLOBAL:"global", CLASS:"class"};*/
var ScopeTypes = cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype = cu.getScopeType;
//var newScope=cu.newScope;
//var nc=cu.nullCheck;
//var genSym=cu.genSym;
var annotation3 = cu.annotation;
var getMethod2 = cu.getMethod;
var getDependingClasses = cu.getDependingClasses;
var getParams = cu.getParams;
//-----------
function genJS(klass, env, genOptions) {
    var srcFile = klass.src.tonyu; //file object  //S
    var srcCont = srcFile.text();
    function getSource(node) {
        return cu.getSource(srcCont, node);
    }
    genOptions = genOptions || {};
    // env.codeBuffer is not recommended(if generate in parallel...?)
    const buf = (genOptions.codeBuffer || env.codeBuffer || new IndentBuffer_1.IndentBuffer({ fixLazyLength: 6 }));
    var traceIndex = genOptions.traceIndex || {};
    buf.setSrcFile(srcFile);
    var printf = buf.printf;
    var ctx = (0, context_1.context)();
    var debug = false;
    //var traceTbl=env.traceTbl;
    // method := fiber | function
    const decls = klass.decls;
    const methods = decls.methods;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数の集まり．親クラスの宣言は含まない
    var ST = ScopeTypes;
    var fnSeq = 0;
    var diagnose = env.options.compiler.diagnose;
    var genMod = env.options.compiler.genAMD;
    var doLoopCheck = !env.options.compiler.noLoopCheck;
    function annotation(node, aobj = undefined) {
        return annotation3(klass.annotation, node, aobj);
    }
    function getClassName(klass) {
        if (typeof klass == "string")
            return CLASS_HEAD + (env.aliases[klass] || klass); //CFN  CLASS_HEAD+env.aliases[klass](null check)
        if (klass.builtin)
            return klass.fullName; // CFN klass.fullName
        return CLASS_HEAD + klass.fullName; // CFN  klass.fullName
    }
    function getClassNames(cs) {
        return cs.map(getClassName);
        /*var res=[];
        cs.forEach(function (c) { res.push(getClassName(c)); });
        return res;*/
    }
    function enterV(obj, node) {
        return function (buf) {
            ctx.enter(obj, function () {
                v.visit(node);
            });
        };
    }
    function varAccess(n, si, an) {
        var t = stype(si);
        if (t == ST.THVAR) {
            buf.printf("%s", TH);
        }
        else if (t == ST.FIELD || t == ST.PROP) {
            buf.printf("%s.%s", THIZ, n);
        }
        else if (t == ST.METHOD) {
            if (an && an.noBind) {
                buf.printf("%s.%s", THIZ, n);
            }
            else {
                buf.printf("%s(%s,%s.%s)", BINDF, THIZ, THIZ, n);
            }
        }
        else if (t == ST.CLASS) {
            buf.printf("%s", getClassName(n));
        }
        else if (t == ST.GLOBAL) {
            buf.printf("%s%s", GLOBAL_HEAD, n);
        }
        else if (t == ST.PARAM || t == ST.LOCAL || t == ST.NATIVE || t == ST.MODULE) {
            if ((0, tonyu1_1.isTonyu1)(env.options) && t == ST.NATIVE) {
                buf.printf("%s.%s", THIZ, n);
            }
            else {
                buf.printf("%s", n);
            }
        }
        else {
            console.log("Unknown scope type: ", t);
            throw new Error("Unknown scope type: " + t);
        }
        return si;
    }
    function noSurroundCompoundF(node) {
        return function () {
            noSurroundCompound.apply(this, [node]);
        };
    }
    function noSurroundCompound(node) {
        if (node.type == "compound") {
            buf.printf("%j%n", ["%n", node.stmts]);
        }
        else {
            v.visit(node);
        }
    }
    var THNode = { type: "THNode" }; //G
    const v = buf.visitor = new Visitor_1.Visitor({
        THNode: function (node) {
            buf.printf(TH);
        },
        dummy: function (node) {
            buf.printf("", node);
        },
        literal: function (node) {
            buf.printf("%s", node.text);
        },
        paramDecl: function (node) {
            buf.printf("%v", node.name);
        },
        paramDecls: function (node) {
            buf.printf("(%j)", [", ", node.params]);
        },
        funcDeclHead: function (node) {
            buf.printf("function %v %v", node.name, node.params);
        },
        funcDecl: function (node) {
        },
        "return": function (node) {
            //if (ctx.inTry) throw TError(R("cannotWriteReturnInTryStatement"),srcFile,node.pos);
            if (!ctx.noWait) {
                if (node.value) {
                    var t = annotation(node.value).fiberCall;
                    if (t) {
                        buf.printf(//VDC
                        "return yield* %s.%s%s(%j);%n", //FIBERCALL
                        THIZ, FIBPRE, t.N, [", ", [THNode].concat(t.A)]);
                    }
                    else {
                        buf.printf("return %v;", node.value);
                    }
                }
                else {
                    buf.printf("return %s;", THIZ);
                }
            }
            else {
                if (node.value) {
                    buf.printf("return %v;", node.value);
                }
                else {
                    buf.printf("return %s;", THIZ);
                }
            }
        },
        /*program: function (node) {
            genClass(node.stmts);
        },*/
        number: function (node) {
            buf.printf("%s", node.value);
        },
        reservedConst: function (node) {
            if (node.text == "this") {
                buf.printf("%s", THIZ);
            }
            else if (node.text == "arguments" && ctx.threadAvail) {
                buf.printf("%s", ARGS);
            }
            else if (node.text == TH) {
                buf.printf("%s", (ctx.threadAvail) ? TH : "null");
            }
            else {
                buf.printf("%s", node.text);
            }
        },
        varDecl(node) {
            console.log(node);
            throw new Error("Abolished. use varDecl(just a function) ");
            /*var a=annotation(node);
            var thisForVIM=a.varInMain? THIZ+"." :"";
            if (node.value) {
                const t=(!ctx.noWait) && annotation(node).fiberCall;
                const to=(!ctx.noWait) && annotation(node).otherFiberCall;
                if (t) {
                    buf.printf(//VDC
                        "%s%v=yield* %s.%s%s(%j);%n" ,//FIBERCALL
                        thisForVIM, node.name, THIZ, FIBPRE, t.N, [", ",[THNode].concat(t.A)],
                    );
                } else if (to && to.fiberType) {
                    buf.printf(//VDC
                        "%s%v=yield* %v.%s%s(%j);%n" ,//FIBERCALL
                        thisForVIM, node.name, to.O, FIBPRE, to.N, [", ",[THNode].concat(to.A)],
                    );
                } else {
                    buf.printf("%s%v = %v;%n", thisForVIM, node.name, node.value);
                }
            } else {
                //buf.printf("%v", node.name);
            }*/
        },
        varsDecl: function (node) {
            if ((0, compiler_1.isNonBlockScopeDeclprefix)(node.declPrefix)) {
                const decls = node.decls.filter((n) => n.value);
                if (decls.length > 0) {
                    for (let decl of decls) {
                        varDecl(decl, node);
                    }
                }
            }
            else {
                for (let decl of node.decls) {
                    varDecl(decl, node);
                }
            }
        },
        jsonElem: function (node) {
            if (node.value) {
                buf.printf("%v: %v", node.key, node.value);
            }
            else {
                buf.printf("%v: %f", node.key, function () {
                    /*const si=*/ varAccess(node.key.text, annotation(node).scopeInfo, annotation(node));
                });
            }
        },
        objlit: function (node) {
            buf.printf("{%j}", [",", node.elems]);
        },
        arylit: function (node) {
            buf.printf("[%j]", [",", node.elems]);
        },
        funcExpr: function (node) {
            genFuncExpr(node);
        },
        parenExpr: function (node) {
            buf.printf("(%v)", node.expr);
        },
        varAccess: function (node) {
            var n = node.name.text;
            /*const si=*/ varAccess(n, annotation(node).scopeInfo, annotation(node));
        },
        exprstmt: function (node) {
            //var t:any={};
            const an = annotation(node);
            if (debug)
                console.log(ctx, an);
            const t = (!ctx.noWait ? an.fiberCall : undefined);
            const to = (!ctx.noWait ? an.otherFiberCall : undefined);
            if (t && t.type == "noRet") {
                buf.printf("(yield* %s.%s%s(%j));", //FIBERCALL
                THIZ, FIBPRE, t.N, [", ", [THNode].concat(t.A)]);
                /*} else if (to && to.fiberType && to.type=="noRetOther") {
                    buf.printf(
                            "(yield* %v.%s%s(%j));" ,//FIBERCALL
                                to.O, FIBPRE, to.N,  [", ",[THNode].concat(to.A)],
                    );*/
            }
            else if (t && t.type == "ret") {
                buf.printf(//VDC
                "%v%v(yield* %s.%s%s(%j));", //FIBERCALL
                t.L, t.O, THIZ, FIBPRE, t.N, [", ", [THNode].concat(t.A)]);
                /*} else if (to && to.fiberType && to.type=="retOther") {
                    buf.printf(//VDC
                            "%v%v(yield* %v.%s%s(%j));", //FIBERCALL
                            to.L, to.P, to.O, FIBPRE, to.N, [", ",[THNode].concat(to.A)],
                    );*/
            }
            else if (t && t.type == "noRetSuper") {
                const p = SUPER; //getClassName(klass.superclass);
                buf.printf("(yield* %s.prototype.%s%s.apply( %s, [%j]));", //FIBERCALL
                p, FIBPRE, t.S.name.text, THIZ, [", ", [THNode].concat(t.A)]);
            }
            else if (t && t.type == "retSuper") {
                const p = SUPER; //getClassName(klass.superclass);
                buf.printf("%v%v(yield* %s.prototype.%s%s.apply( %s, [%j]));", //FIBERCALL
                t.L, t.O, p, FIBPRE, t.S.name.text, THIZ, [", ", [THNode].concat(t.A)]);
            }
            else {
                buf.printf("%v;", node.expr);
            }
        },
        infix: function (node) {
            var opn = node.op.text;
            /*if (opn=="=" || opn=="+=" || opn=="-=" || opn=="*=" ||  opn=="/=" || opn=="%=" ) {
                checkLVal(node.left);
            }*/
            if (diagnose) {
                if (opn == "+" || opn == "-" || opn == "*" || opn == "/" || opn == "%") {
                    buf.printf("%s(%v,%l)%v%s(%v,%l)", CHK_NN, node.left, getSource(node.left), node.op, CHK_NN, node.right, getSource(node.right));
                    return;
                }
                if (opn == "+=" || opn == "-=" || opn == "*=" || opn == "/=" || opn == "%=") {
                    buf.printf("%v%v%s(%v,%l)", node.left, node.op, CHK_NN, node.right, getSource(node.right));
                    return;
                }
            }
            if (node.op.type === "is") {
                buf.printf("Tonyu.is(%v,%v)", node.left, node.right);
            }
            else {
                buf.printf("%v%v%v", node.left, node.op, node.right);
            }
        },
        trifixr: function (node) {
            buf.printf("%v%v%v%v%v", node.left, node.op1, node.mid, node.op2, node.right);
        },
        prefix: function (node) {
            if (node.op.text === "__typeof") {
                const a = annotation(node.right);
                //console.log("__typeof",a);
                typeToLiteral(a.resolvedType);
                /*if (a.resolvedType) {
                    const t=a.resolvedType;
                    if (isMethodType(t)) {
                        buf.printf("Tonyu.classMetas[%l].decls.methods.%s",t.method.klass.fullName, t.method.name);
                    } else if (isMeta(t)) {
                        buf.printf("Tonyu.classMetas[%l]",t.fullName);
                    } else if (isNativeClass(t)) {
                        buf.printf(t.class.name);
                    } else {
                        buf.printf("[%v]",t.element);
                    }
                } else {
                    buf.printf("%l","Any");
                }*/
                return;
            }
            else if (node.op.text === "__await") {
                if (ctx.noWait) {
                    buf.printf("%v", node.right);
                }
                else {
                    buf.printf("(yield* %s.await(%v))", TH, node.right);
                }
                return;
            }
            buf.printf("%v %v", node.op, node.right);
        },
        postfix: function (node) {
            var a = annotation(node);
            if (diagnose) {
                if (a.myMethodCall) {
                    const mc = a.myMethodCall;
                    var si = mc.scopeInfo;
                    var st = stype(si);
                    if (st == ST.FIELD || st == ST.PROP || st == ST.METHOD) {
                        buf.printf("%s(%s, %l, [%j], %l )", INVOKE_FUNC, THIZ, mc.name, [",", mc.args], "this");
                    }
                    else {
                        buf.printf("%s(%v, [%j], %l)", CALL_FUNC, node.left, [",", mc.args], getSource(node.left));
                    }
                    return;
                }
                else if (a.othersMethodCall) {
                    var oc = a.othersMethodCall;
                    buf.printf("%s(%v, %l, [%j], %l )", INVOKE_FUNC, oc.target, oc.name, [",", oc.args], getSource(oc.target));
                    return;
                }
                else if (a.memberAccess) {
                    var ma = a.memberAccess;
                    buf.printf("%s(%v,%l).%s", CHK_NN, ma.target, getSource(ma.target), ma.name);
                    return;
                }
            }
            else if (a.myMethodCall) {
                const mc = a.myMethodCall;
                const si = mc.scopeInfo;
                const st = stype(si);
                if (st == ST.METHOD) {
                    buf.printf("%s.%s(%j)", THIZ, mc.name, [",", mc.args]);
                    return;
                }
            }
            buf.printf("%v%v", node.left, node.op);
        },
        "break": function (node) {
            buf.printf("break;%n");
        },
        "continue": function (node) {
            buf.printf("continue;%n");
        },
        "try": function (node) {
            buf.printf("try {%{%f%n%}} ", noSurroundCompoundF(node.stmt));
            for (let c of node.catches) {
                v.visit(c);
            }
        },
        "catch": function (node) {
            buf.printf("catch (%s) {%{%f%n%}}", node.name.text, noSurroundCompoundF(node.stmt));
        },
        "throw": function (node) {
            buf.printf("throw %v;%n", node.ex);
        },
        "switch": function (node) {
            buf.printf("switch (%v) {%{" +
                "%j" +
                (node.defs ? "%n%v" : "%D") +
                "%n%}}", node.value, ["%n", node.cases], node.defs);
        },
        "case": function (node) {
            buf.printf("%}case %v:%{%j", node.value, ["%n", node.stmts]);
        },
        "default": function (node) {
            buf.printf("%}default:%{%j", ["%n", node.stmts]);
        },
        "while": function (node) {
            buf.printf("while (%v) {%{" +
                checkLoopCode() +
                "%f%n" +
                "%}}", node.cond, noSurroundCompoundF(node.loop));
        },
        "do": function (node) {
            buf.printf("do {%{" +
                checkLoopCode() +
                "%f%n" +
                "%}} while (%v);%n", noSurroundCompoundF(node.loop), node.cond);
        },
        "for": function (node) {
            var an = annotation(node);
            if (node.inFor.type == "forin") {
                const inFor = node.inFor;
                const pre = ((0, compiler_1.isBlockScopeDeclprefix)(inFor.isVar) ? inFor.isVar.text + " " : "");
                buf.printf("for (%s[%f] of %s(%v,%s)) {%{" +
                    "%f%n" +
                    "%}}", pre, loopVarsF(inFor.isVar, inFor.vars), ITER2, inFor.set, inFor.vars.length, noSurroundCompoundF(node.loop));
                /*var itn=annotation(node.inFor).iterName;
                buf.printf(
                    "%s=%s(%v,%s);%n"+
                    "while(%s.next()) {%{" +
                    "%f%n"+
                    "%f%n" +
                    "%}}",
                    itn, ITER, inFor.set, inFor.vars.length,
                    itn,
                    getElemF(itn, inFor.isVar, inFor.vars),
                    noSurroundCompoundF(node.loop)
                );
                */
            }
            else {
                const inFor = node.inFor;
                if ((inFor.init.type == "varsDecl" && inFor.init.decls.length == 1) || inFor.init.type == "exprstmt") {
                    buf.printf(
                    //"%v"+
                    "for (%v %v ; %v) {%{" +
                        checkLoopCode() +
                        "%v%n" +
                        "%}}", 
                    /*enterV({noLastPos:true},*/ inFor.init, inFor.cond, inFor.next, node.loop);
                }
                else {
                    buf.printf("%v%n" +
                        "while(%v) {%{" +
                        checkLoopCode() +
                        "%v%n" +
                        "%v;%n" +
                        "%}}", inFor.init, inFor.cond, node.loop, inFor.next);
                }
            }
            function loopVarsF(isVar, vars) {
                return function () {
                    vars.forEach((v, i) => {
                        var an = annotation(v);
                        if (i > 0)
                            buf.printf(", ");
                        varAccess(v.text, an.scopeInfo, an);
                    });
                };
            }
            function getElemF(itn, isVar, vars) {
                return function () {
                    vars.forEach(function (v, i) {
                        var an = annotation(v);
                        varAccess(v.text, an.scopeInfo, an);
                        buf.printf("=%s[%s];%n", itn, i);
                        //buf.printf("%s=%s[%s];%n", v.text, itn, i);
                    });
                };
            }
        },
        "if": function (node) {
            //buf.printf("/*FBR=%s*/",!!annotation(node).fiberCallRequired);
            if (node._else) {
                buf.printf("if (%v) {%{%f%n%}} else {%{%f%n%}}", node.cond, noSurroundCompoundF(node.then), noSurroundCompoundF(node._else));
            }
            else {
                buf.printf("if (%v) {%{%f%n%}}", node.cond, noSurroundCompoundF(node.then));
            }
        },
        ifWait: function (node) {
            if (!ctx.noWait) {
                buf.printf("%v", node.then);
            }
            else {
                if (node._else) {
                    buf.printf("%v", node._else);
                }
            }
        },
        empty: function (node) {
            buf.printf(";%n");
        },
        call: function (node) {
            buf.printf("(%j)", [",", node.args]);
        },
        objlitArg: function (node) {
            buf.printf("%v", node.obj);
        },
        argList: function (node) {
            buf.printf("%j", [",", node.args]);
        },
        newExpr: function (node) {
            var p = node.params;
            if (p) {
                buf.printf("new %v%v", node.klass, p);
            }
            else {
                buf.printf("new %v", node.klass);
            }
        },
        scall: function (node) {
            buf.printf("[%j]", [",", node.args]);
        },
        superExpr: function (node) {
            let name;
            //if (!klass.superclass) throw new Error(klass.fullName+"には親クラスがありません");
            if (node.name) {
                name = node.name.text;
                buf.printf("%s.prototype.%s.apply( %s, %v)", SUPER /*getClassName(klass.superclass)*/, name, THIZ, node.params);
            }
            else {
                buf.printf("%s.apply( %s, %v)", SUPER /*getClassName(klass.superclass)*/, THIZ, node.params);
            }
        },
        arrayElem: function (node) {
            buf.printf("[%v]", node.subscript);
        },
        member: function (node) {
            buf.printf(".%s", node.name);
        },
        symbol: function (node) {
            buf.print(node.text);
        },
        "normalFor": function (node) {
            buf.printf("%v; %v; %v", node.init, node.cond, node.next);
        },
        compound: function (node) {
            buf.printf("{%{%j%n%}}", ["%n", node.stmts]);
        },
        "typeof": function (node) {
            buf.printf("typeof ");
        },
        "instanceof": function (node) {
            buf.printf(" instanceof ");
        },
        "is": function (node) {
            buf.printf(" instanceof ");
        },
        regex: function (node) {
            buf.printf("%s", node.text);
        }
    });
    function typeToLiteral(resolvedType) {
        if (resolvedType) {
            const t = resolvedType;
            if ((0, CompilerTypes_1.isMethodType)(t)) {
                buf.printf("Tonyu.classMetas[%l].decls.methods.%s", t.method.klass.fullName, t.method.name);
            }
            else if ((0, CompilerTypes_1.isMeta)(t)) {
                buf.printf("Tonyu.classMetas[%l]", t.fullName);
            }
            else if ((0, CompilerTypes_1.isNativeClass)(t)) {
                buf.printf(t.class.name);
            }
            else {
                buf.printf("[%f]", () => typeToLiteral(t.element));
            }
        }
        else {
            buf.printf("%l", "Any");
        }
    }
    function varDecl(node, parent) {
        var a = annotation(node);
        var thisForVIM = a.varInMain ? THIZ + "." : "";
        var pa = annotation(parent);
        const pre = ((0, compiler_1.isNonBlockScopeDeclprefix)(parent.declPrefix) || pa.varInMain ? "" : parent.declPrefix + " ");
        if (node.value) {
            const t = (!ctx.noWait) && annotation(node).fiberCall;
            const to = (!ctx.noWait) && annotation(node).otherFiberCall;
            if (t) {
                buf.printf(//VDC
                "%s%s%v=yield* %s.%s%s(%j);%n", //FIBERCALL
                pre, thisForVIM, node.name, THIZ, FIBPRE, t.N, [", ", [THNode].concat(t.A)]);
            }
            else if (to && to.fiberType) {
                buf.printf(//VDC
                "%s%s%v=yield* %v.%s%s(%j);%n", //FIBERCALL
                pre, thisForVIM, node.name, to.O, FIBPRE, to.N, [", ", [THNode].concat(to.A)]);
            }
            else {
                buf.printf("%s%s%v = %v;%n", pre, thisForVIM, node.name, node.value);
            }
        }
        else {
            if (pre) {
                buf.printf("%s%v;", pre, node.name);
            }
        }
    }
    var opTokens = ["++", "--", "!==", "===", "+=", "-=", "*=", "/=",
        "%=", ">=", "<=",
        "!=", "==", ">>>", ">>", "<<", "&&", "||", ">", "<", "+", "?", "=", "*",
        "%", "/", "^", "~", "\\", ":", ";", ",", "!", "&", "|", "-", "delete"];
    opTokens.forEach(function (opt) {
        v.funcs[opt] = function (node) {
            buf.printf("%s", opt);
        };
    });
    //v.debug=debug;
    v.def = function (node) {
        console.log("Err node=");
        console.log(node);
        throw new Error(node.type + " is not defined in visitor:compiler2");
    };
    //v.cnt=0;
    function genSource() {
        ctx.enter({}, function () {
            if (genMod) {
                printf("define(function (require) {%{");
                var reqs = { Tonyu: 1 };
                for (var mod in klass.decls.amds) {
                    reqs[mod] = 1;
                }
                if (klass.superclass) {
                    const mod = klass.superclass.shortName;
                    reqs[mod] = 1;
                }
                (klass.includes || []).forEach(function (klass) {
                    var mod = klass.shortName;
                    reqs[mod] = 1;
                });
                for (let mod in klass.decls.softRefClasses) {
                    reqs[mod] = 1;
                }
                for (let mod in reqs) {
                    printf("var %s=require('%s');%n", mod, mod);
                }
            }
            printf((genMod ? "return " : "") + "Tonyu.klass.define({%{");
            printf("fullName: %l,%n", klass.fullName);
            printf("shortName: %l,%n", klass.shortName);
            printf("namespace: %l,%n", klass.namespace);
            if (klass.superclass)
                printf("superclass: %s,%n", getClassName(klass.superclass));
            printf("includes: [%s],%n", getClassNames(klass.includes).join(","));
            printf("methods: function (%s) {%{", SUPER);
            printf("return {%{");
            const procMethod = (name) => {
                if (debug)
                    console.log("method1", name);
                const method = methods[name];
                if (!method.params) {
                    console.log("MYSTERY2", method.params, methods, klass, env);
                }
                ctx.enter({ noWait: true, threadAvail: false }, function () {
                    genFunc(method);
                });
                if (debug)
                    console.log("method2", name);
                if (!method.nowait) {
                    ctx.enter({ noWait: false, threadAvail: true }, function () {
                        genFiber(method);
                    });
                }
                if (debug)
                    console.log("method3", name);
            };
            for (var name in methods)
                procMethod(name);
            printf("__dummy: false%n");
            printf("%}};%n");
            printf("%}},%n");
            printf("decls: %s%n", JSON.stringify(cu.digestDecls(klass)));
            printf("%}});");
            if (genMod)
                printf("%n%}});");
            printf("%n");
            //printf("%}});%n");
        });
        //printf("Tonyu.klass.addMeta(%s,%s);%n",
        //        getClassName(klass),JSON.stringify(digestMeta(klass)));
        //if (env.options.compiler.asModule) {
        //    printf("//%}});");
        //}
    }
    function getNameOfType(t) {
        if (!t.fullName && !t.class) {
            console.log(t);
            throw new Error("Invalid annotatedType" + t);
        }
        return t.fullName || t.class.name;
    }
    function digestMeta(klass) {
        var res = {
            fullName: klass.fullName,
            namespace: klass.namespace,
            shortName: klass.shortName,
            decls: { methods: {} }
        };
        for (var i in klass.decls.methods) {
            res.decls.methods[i] =
                { nowait: !!klass.decls.methods[i].nowait };
        }
        return res;
    }
    function genFiber(fiber) {
        if (isConstructor(fiber))
            return;
        var stmts = fiber.stmts;
        var noWaitStmts = [], curStmts = noWaitStmts;
        var opt = true;
        //waitStmts=stmts;
        printf("%s%s :function* %s(%j) {%{" +
            USE_STRICT +
            "var %s=%s;%n" +
            "%svar %s=%s;%n" +
            "%f%n" +
            "%f%n" +
            "%}},%n", FIBPRE, fiber.name, genFn("f_" + fiber.name), [",", [THNode].concat(fiber.params)], THIZ, GET_THIS, (fiber.useArgs ? "" : "//"), ARGS, "Tonyu.A(arguments)", genLocalsF(fiber), fbody);
        function fbody() {
            ctx.enter({ method: fiber, noWait: false, threadAvail: true,
                finfo: fiber }, function () {
                stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFunc(func) {
        var fname = isConstructor(func) ? "initialize" : func.name;
        if (!func.params) { //TODO
            console.log("MYSTERY", func.params);
        }
        printf("%s :function %s(%j) {%{" +
            USE_STRICT +
            "var %s=%s;%n" +
            "%f%n" +
            "%f" +
            "%}},%n", fname, genFn(fname), [",", func.params], THIZ, GET_THIS, genLocalsF(func), fbody);
        function fbody() {
            ctx.enter({ method: func, finfo: func,
                /*scope: func.scope*/ 
            }, function () {
                func.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genFuncExpr(node) {
        var finfo = annotation(node).funcInfo; // annotateSubFuncExpr(node);
        buf.printf("(function %s(%j) {%{" +
            "%f%n" +
            "%f" +
            "%}})", finfo.name, [",", finfo.params], genLocalsF(finfo), fbody);
        function fbody() {
            ctx.enter({ noWait: true, threadAvail: false,
                finfo: finfo, /*scope: finfo.scope*/ }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function checkLoopCode() {
        if (!doLoopCheck)
            return "";
        if (ctx.noWait) {
            return "Tonyu.checkLoop();%n";
        }
        else {
            return "yield null;%n";
        }
    }
    function genFn(/*pos:number ,*/ name) {
        if (!name)
            name = (fnSeq++) + "";
        let n = ("_trc_" + klass.shortName + "_" + name);
        traceIndex[n] = 1;
        return n;
        //        return ("_trc_func_"+traceTbl.add(klass,pos )+"_"+(fnSeq++));//  Math.random()).replace(/\./g,"");
    }
    function genSubFunc(node) {
        var finfo = annotation(node).funcInfo; // annotateSubFuncExpr(node);
        buf.printf("function %s(%j) {%{" +
            "%f%n" +
            "%f" +
            "%}}", finfo.name, [",", finfo.params], genLocalsF(finfo), fbody);
        function fbody() {
            ctx.enter({ noWait: true, threadAvail: false,
                finfo: finfo, /*scope: finfo.scope*/ }, function () {
                node.body.stmts.forEach(function (stmt) {
                    printf("%v%n", stmt);
                });
            });
        }
    }
    function genLocalsF(finfo) {
        return f;
        function f() {
            ctx.enter({ /*scope:finfo.scope*/}, function () {
                for (let i in finfo.locals.varDecls) {
                    buf.printf("var %s;%n", i);
                }
                for (let i in finfo.locals.subFuncDecls) {
                    genSubFunc(finfo.locals.subFuncDecls[i]);
                }
            });
        }
    }
    function isConstructor(f) {
        return OM.match(f, { ftype: "constructor" }) || OM.match(f, { name: "new" });
    }
    genSource(); //G
    if (genMod) {
        klass.src.js = klass.src.tonyu.up().rel(klass.src.tonyu.truncExt() + ".js");
        klass.src.js.text(buf.buf);
    }
    else {
        klass.src.js = buf.buf; //G
    }
    delete klass.jsNotUpToDate;
    cu.packAnnotation(klass.annotation);
    if (debug) {
        console.log("method4", buf.buf);
        //throw "ERR";
    }
    //var bufres=buf.close();
    klass.src.map = buf.mapStr;
    return buf; //res;
} //B
exports.genJS = genJS;
//return {genJS:genJS};
//})();

},{"./CompilerTypes":4,"./IndentBuffer":7,"./ObjectMatcher":10,"./Visitor":14,"./compiler":15,"./context":16,"./tonyu1":24}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjlit = exports.isJsonElem = exports.isFuncExpr = exports.isFuncExprHead = exports.isEmpty = exports.isIfWait = exports.isNativeDecl = exports.isFuncDecl = exports.isFuncDeclHead = exports.isSetterDecl = exports.isParamDecls = exports.isParamDecl = exports.isVarsDecl = exports.isVarDecl = exports.isTypeDecl = exports.isNamedTypeExpr = exports.isArrayTypeExpr = exports.isThrow = exports.isTry = exports.isCatch = exports.isFinally = exports.isContinue = exports.isBreak = exports.isSwitch = exports.isDefault = exports.isCase = exports.isDo = exports.isWhile = exports.isFor = exports.isNormalFor = exports.isForin = exports.isIf = exports.isReturn = exports.isCompound = exports.isExprstmt = exports.isSuperExpr = exports.isNewExpr = exports.isScall = exports.isCall = exports.isObjlitArg = exports.isFuncExprArg = exports.isVarAccess = exports.isParenExpr = exports.isMember = exports.isArgList = exports.isArrayElem = exports.isTrifix = exports.isInfix = exports.isPostfix = exports.isPrefix = void 0;
exports.isProgram = exports.isIncludes = exports.isExtends = exports.isArylit = void 0;
function isPrefix(n) {
    return n.type == "prefix";
}
exports.isPrefix = isPrefix;
function isPostfix(n) {
    return n.type == "postfix";
}
exports.isPostfix = isPostfix;
function isInfix(n) {
    return n.type == "infix";
}
exports.isInfix = isInfix;
function isTrifix(n) {
    return n.type == "trifix";
}
exports.isTrifix = isTrifix;
function isArrayElem(n) {
    return n && n.type === "arrayElem";
}
exports.isArrayElem = isArrayElem;
function isArgList(n) {
    return n && n.type === "argList";
}
exports.isArgList = isArgList;
function isMember(n) {
    return n && n.type === "member";
}
exports.isMember = isMember;
function isParenExpr(n) {
    return n && n.type === "parenExpr";
}
exports.isParenExpr = isParenExpr;
function isVarAccess(n) {
    return n && n.type === "varAccess";
}
exports.isVarAccess = isVarAccess;
function isFuncExprArg(n) {
    return n && n.type === "funcExprArg";
}
exports.isFuncExprArg = isFuncExprArg;
function isObjlitArg(n) {
    return n && n.type === "objlitArg";
}
exports.isObjlitArg = isObjlitArg;
function isCall(n) {
    return n && n.type === "call";
}
exports.isCall = isCall;
function isScall(n) {
    return n && n.type === "scall";
}
exports.isScall = isScall;
function isNewExpr(n) {
    return n && n.type === "newExpr";
}
exports.isNewExpr = isNewExpr;
function isSuperExpr(n) {
    return n && n.type === "superExpr";
}
exports.isSuperExpr = isSuperExpr;
function isExprstmt(n) {
    return n && n.type === "exprstmt";
}
exports.isExprstmt = isExprstmt;
function isCompound(n) {
    return n && n.type === "compound";
}
exports.isCompound = isCompound;
function isReturn(n) {
    return n && n.type === "return";
}
exports.isReturn = isReturn;
function isIf(n) {
    return n && n.type === "if";
}
exports.isIf = isIf;
function isForin(n) {
    return n && n.type === "forin";
}
exports.isForin = isForin;
function isNormalFor(n) {
    return n && n.type === "normalFor";
}
exports.isNormalFor = isNormalFor;
function isFor(n) {
    return n && n.type === "for";
}
exports.isFor = isFor;
function isWhile(n) {
    return n && n.type === "while";
}
exports.isWhile = isWhile;
function isDo(n) {
    return n && n.type === "do";
}
exports.isDo = isDo;
function isCase(n) {
    return n && n.type === "case";
}
exports.isCase = isCase;
function isDefault(n) {
    return n && n.type === "default";
}
exports.isDefault = isDefault;
function isSwitch(n) {
    return n && n.type === "switch";
}
exports.isSwitch = isSwitch;
function isBreak(n) {
    return n && n.type === "break";
}
exports.isBreak = isBreak;
function isContinue(n) {
    return n && n.type === "continue";
}
exports.isContinue = isContinue;
function isFinally(n) {
    return n && n.type === "finally";
}
exports.isFinally = isFinally;
function isCatch(n) {
    return n && n.type === "catch";
}
exports.isCatch = isCatch;
function isTry(n) {
    return n && n.type === "try";
}
exports.isTry = isTry;
function isThrow(n) {
    return n && n.type === "throw";
}
exports.isThrow = isThrow;
function isArrayTypeExpr(n) {
    return n && n.type === "arrayTypeExpr";
}
exports.isArrayTypeExpr = isArrayTypeExpr;
function isNamedTypeExpr(n) {
    return n && n.type === "namedTypeExpr";
}
exports.isNamedTypeExpr = isNamedTypeExpr;
function isTypeDecl(n) {
    return n && n.type === "typeDecl";
}
exports.isTypeDecl = isTypeDecl;
function isVarDecl(n) {
    return n && n.type === "varDecl";
}
exports.isVarDecl = isVarDecl;
function isVarsDecl(n) {
    return n && n.type === "varsDecl";
}
exports.isVarsDecl = isVarsDecl;
function isParamDecl(n) {
    return n && n.type === "paramDecl";
}
exports.isParamDecl = isParamDecl;
function isParamDecls(n) {
    return n && n.type === "paramDecls";
}
exports.isParamDecls = isParamDecls;
function isSetterDecl(n) {
    return n && n.type === "setterDecl";
}
exports.isSetterDecl = isSetterDecl;
function isFuncDeclHead(n) {
    return n && n.type === "funcDeclHead";
}
exports.isFuncDeclHead = isFuncDeclHead;
function isFuncDecl(n) {
    return n && n.type === "funcDecl";
}
exports.isFuncDecl = isFuncDecl;
function isNativeDecl(n) {
    return n && n.type === "nativeDecl";
}
exports.isNativeDecl = isNativeDecl;
function isIfWait(n) {
    return n && n.type === "ifWait";
}
exports.isIfWait = isIfWait;
function isEmpty(n) {
    return n && n.type === "empty";
}
exports.isEmpty = isEmpty;
function isFuncExprHead(n) {
    return n && n.type === "funcExprHead";
}
exports.isFuncExprHead = isFuncExprHead;
function isFuncExpr(n) {
    return n && n.type === "funcExpr";
}
exports.isFuncExpr = isFuncExpr;
function isJsonElem(n) {
    return n && n.type === "jsonElem";
}
exports.isJsonElem = isJsonElem;
function isObjlit(n) {
    return n && n.type === "objlit";
}
exports.isObjlit = isObjlit;
function isArylit(n) {
    return n && n.type === "arylit";
}
exports.isArylit = isArylit;
function isExtends(n) {
    return n && n.type === "extends";
}
exports.isExtends = isExtends;
function isIncludes(n) {
    return n && n.type === "includes";
}
exports.isIncludes = isIncludes;
function isProgram(n) {
    return n && n.type === "program";
}
exports.isProgram = isProgram;

},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.match = exports.isVar = exports.Z = exports.Y = exports.X = exports.W = exports.V = exports.U = exports.T = exports.S = exports.R = exports.Q = exports.P = exports.O = exports.N = exports.M = exports.L = exports.K = exports.J = exports.I = exports.H = exports.G = exports.F = exports.E = exports.D = exports.C = exports.B = exports.A = exports.v = void 0;
//var OM:any={};
const VAR = Symbol("$var"); //,THIZ="$this";
function v(name, cond = {}) {
    const res = function (cond2) {
        const cond3 = Object.assign({}, cond);
        Object.assign(cond3, cond2);
        return v(name, cond3);
    };
    res.vname = name;
    res.cond = cond;
    res[VAR] = true;
    //if (cond) res[THIZ]=cond;
    return res;
}
exports.v = v;
function isVariable(a) {
    return a[VAR];
}
//OM.isVar=isVar;
exports.A = v("A");
exports.B = v("B");
exports.C = v("C");
exports.D = v("D");
exports.E = v("E");
exports.F = v("F");
exports.G = v("G");
exports.H = v("H");
exports.I = v("I");
exports.J = v("J");
exports.K = v("K");
exports.L = v("L");
exports.M = v("M");
exports.N = v("N");
exports.O = v("O");
exports.P = v("P");
exports.Q = v("Q");
exports.R = v("R");
exports.S = v("S");
exports.T = v("T");
exports.U = v("U");
exports.V = v("V");
exports.W = v("W");
exports.X = v("X");
exports.Y = v("Y");
exports.Z = v("Z");
/*var names="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (var i =0 ; i<names.length ; i++) {
    var c=names.substring(i,i+1);
    OM[c]=v(c);
}*/
function isVar(o) {
    return o && o[VAR];
}
exports.isVar = isVar;
function match(obj, tmpl) {
    var res = {};
    if (m(obj, tmpl, res))
        return res;
    return null;
}
exports.match = match;
;
function m(obj, tmpl, res) {
    if (obj === tmpl)
        return true;
    else if (obj == null)
        return false;
    else if (isVariable(tmpl)) {
        if (!m(obj, tmpl.cond, res))
            return false;
        res[tmpl.vname] = obj;
        return true;
    }
    else if (typeof obj == "string" && tmpl instanceof RegExp) {
        return obj.match(tmpl);
    }
    else if (typeof tmpl == "function") {
        return tmpl(obj, res);
    }
    else if (typeof tmpl == "object") {
        //if (typeof obj!="object") obj={$this:obj};
        for (var i in tmpl) {
            //if (i==VAR) continue;
            var oe = obj[i]; //(i==THIZ? obj :  obj[i] );
            var te = tmpl[i];
            if (!m(oe, te, res))
                return false;
        }
        /*if (tmpl[VAR]) {
            res[tmpl[VAR]]=obj;
        }*/
        return true;
    }
    return false;
}
//export= OM;

},{}],11:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotate = exports.initClassDecls = exports.parse = void 0;
const TonyuRuntime_1 = __importDefault(require("../runtime/TonyuRuntime"));
const R_1 = __importDefault(require("../lib/R"));
const TError_1 = __importDefault(require("../runtime/TError"));
const root_1 = __importDefault(require("../lib/root"));
const tonyu1_1 = require("./tonyu1");
const ObjectMatcher = require("./ObjectMatcher");
const OM = ObjectMatcher;
const parse_tonyu1_1 = __importDefault(require("./parse_tonyu1"));
const parse_tonyu2_1 = __importDefault(require("./parse_tonyu2"));
const assert_1 = __importDefault(require("../lib/assert"));
const cu = __importStar(require("./compiler"));
const Visitor_1 = require("./Visitor");
const context_1 = require("./context");
const parser_1 = require("./parser");
const NodeTypes_1 = require("./NodeTypes");
const compiler_1 = require("./compiler");
var ScopeTypes = cu.ScopeTypes;
//var genSt=cu.newScopeType;
var stype = cu.getScopeType;
var newScope = cu.newScope;
const SI = cu.ScopeInfos;
//var nc=cu.nullCheck;
var genSym = cu.genSym;
var annotation3 = cu.annotation;
var getMethod2 = cu.getMethod;
var getDependingClasses = cu.getDependingClasses;
var getParams = cu.getParams;
var JSNATIVES = { Array: 1, String: 1, Boolean: 1, Number: 1, Void: 1, Object: 1, RegExp: 1, Error: 1, Date: 1 };
function visitSub(node) {
    var t = this;
    if (!node || typeof node != "object")
        return;
    var es;
    if (node instanceof Array)
        es = node;
    else
        es = node[parser_1.SUBELEMENTS];
    if (!es) {
        es = [];
        for (var i in node) {
            es.push(node[i]);
        }
    }
    es.forEach((e) => t.visit(e));
}
function getSourceFile(klass) {
    return (0, assert_1.default)(klass.src && klass.src.tonyu, "File for " + klass.fullName + " not found.");
}
function parse(klass, options = {}) {
    const s = getSourceFile(klass); //.src.tonyu; //file object
    let node;
    if (klass.node && klass.nodeTimestamp == s.lastUpdate()) {
        node = klass.node;
    }
    if (!node) {
        //console.log("Parse "+s);
        if ((0, tonyu1_1.isTonyu1)(options)) {
            node = parse_tonyu1_1.default.parse(s);
        }
        else {
            node = parse_tonyu2_1.default.parse(s);
        }
        klass.nodeTimestamp = s.lastUpdate();
    }
    return node;
}
exports.parse = parse;
//-----------
function initClassDecls(klass, env) {
    // The main task of initClassDecls is resolve 'dependency', it calls before orderByInheritance
    var s = getSourceFile(klass); //file object
    klass.hasSemanticError = true;
    if (klass.src && klass.src.js) {
        // falsify on generateJS. if some class hasSemanticError, it remains true
        klass.jsNotUpToDate = true;
    }
    const node = parse(klass, env.options);
    var MAIN = { klass, name: "main", stmts: [], isMain: true, nowait: false }; //, klass:klass.fullName};
    // method := fiber | function
    const fields = {}, methods = { main: MAIN }, natives = {}, amds = {}, softRefClasses = {};
    klass.decls = { fields, methods, natives, amds, softRefClasses };
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，AMDモジュール変数
    //   extends/includes以外から参照してれるクラス の集まり．親クラスの宣言は含まない
    klass.node = node;
    function initMethods(program) {
        let spcn = env.options.compiler.defaultSuperClass;
        var pos = 0;
        var t = OM.match(program, { ext: { superclassName: { text: OM.N, pos: OM.P } } });
        if (t) {
            spcn = t.N;
            pos = t.P;
            if (spcn == "null")
                spcn = null;
        }
        klass.includes = [];
        t = OM.match(program, { incl: { includeClassNames: OM.C } });
        if (t) {
            t.C.forEach(function (i) {
                var n = i.text; /*ENVC*/
                var p = i.pos;
                var incc = env.classes[env.aliases[n] || n]; /*ENVC*/ //CFN env.classes[env.aliases[n]]
                if (!incc)
                    throw (0, TError_1.default)((0, R_1.default)("classIsUndefined", n), s, p);
                klass.includes.push(incc);
            });
        }
        if (spcn == "Array") {
            klass.superclass = { shortName: "Array", fullName: "Array", builtin: true };
        }
        else if (spcn) {
            var spc = env.classes[env.aliases[spcn] || spcn]; /*ENVC*/ //CFN env.classes[env.aliases[spcn]]
            if (!spc) {
                throw (0, TError_1.default)((0, R_1.default)("superClassIsUndefined", spcn), s, pos);
            }
            klass.superclass = spc;
        }
        else {
            delete klass.superclass;
        }
        klass.directives = {};
        //--
        function addField(name, node = undefined) {
            node = node || name;
            fields[name + ""] = {
                node: node,
                klass: klass.fullName,
                name: name + "",
                pos: node.pos
            };
        }
        const ctx = (0, context_1.context)();
        var fieldsCollector = new Visitor_1.Visitor({
            varDecl: function (node) {
                addField(node.name, node);
            },
            varsDecl(node) {
                if (ctx.inBlockScope && (0, compiler_1.isBlockScopeDeclprefix)(node.declPrefix))
                    return;
                for (let d of node.decls) {
                    fieldsCollector.visit(d);
                }
            },
            nativeDecl: function (node) {
            },
            funcDecl: function (node) {
            },
            funcExpr: function (node) {
            },
            "catch": function (node) {
            },
            exprstmt: function (node) {
                if (node.expr.type === "literal") {
                    if (node.expr.text.match(/^.field strict.$/)) {
                        klass.directives.field_strict = true;
                    }
                    if (node.expr.text.match(/^.external waitable.$/)) {
                        klass.directives.external_waitable = true;
                    }
                }
            },
            "for": function (node) {
                ctx.enter({ inBlockScope: true }, () => fieldsCollector.def(node));
            },
            compound(node) {
                ctx.enter({ inBlockScope: true }, () => fieldsCollector.def(node));
            },
            "forin": function (node) {
                var isVar = node.isVar;
                if ((0, compiler_1.isNonBlockScopeDeclprefix)(isVar)) {
                    node.vars.forEach((v) => {
                        addField(v);
                    });
                }
            }
        });
        fieldsCollector.def = visitSub;
        fieldsCollector.visit(program.stmts);
        //-- end of fieldsCollector
        program.stmts.forEach(function (stmt) {
            if (stmt.type == "funcDecl") {
                var head = stmt.head;
                var ftype = "function";
                if (head.ftype) {
                    ftype = head.ftype.text;
                    //console.log("head.ftype:",stmt);
                }
                var name = head.name.text;
                var propHead = (head.params ? "" : head.setter ? "__setter__" : "__getter__");
                name = propHead + name;
                methods[name] = {
                    klass,
                    nowait: (!!head.nowait || propHead !== ""),
                    ftype,
                    name,
                    //klass: klass.fullName,
                    head,
                    //pos: head.pos,
                    stmts: stmt.body.stmts,
                    node: stmt
                };
            }
            else if (stmt.type == "nativeDecl") {
                natives[stmt.name.text] = stmt;
            }
            else {
                MAIN.stmts.push(stmt);
            }
        });
    }
    initMethods(node); // node=program
    //delete klass.hasSemanticError;
    // Why delete deleted? because decls.methods.params is still undef
} // of initClassDecls
exports.initClassDecls = initClassDecls;
function annotateSource2(klass, env) {
    // annotateSource2 is call after orderByInheritance
    klass.hasSemanticError = true;
    const srcFile = klass.src.tonyu; //file object  //S
    var srcCont = srcFile.text();
    function getSource(node) {
        return cu.getSource(srcCont, node);
    }
    //var traceTbl=env.traceTbl;
    // method := fiber | function
    const decls = klass.decls;
    const methods = decls.methods;
    // ↑ このクラスが持つフィールド，ファイバ，関数，ネイティブ変数，モジュール変数の集まり．親クラスの宣言は含まない
    var ST = ScopeTypes;
    var topLevelScope = {};
    // ↑ このソースコードのトップレベル変数の種類 ，親クラスの宣言を含む
    //  キー： 変数名   値： ScopeTypesのいずれか
    const ctx = (0, context_1.context)();
    const debug = false;
    const othersMethodCallTmpl = {
        type: "postfix",
        left: {
            type: "postfix",
            left: OM.T,
            op: { type: "member", name: { text: OM.N } }
        },
        op: { type: "call", args: OM.A }
    };
    const memberAccessTmpl = {
        type: "postfix",
        left: OM.T,
        op: { type: "member", name: { text: OM.N } }
    };
    // These has same value but different purposes:
    //  myMethodCallTmpl: avoid using bounded field for normal method(); call
    //  fiberCallTmpl: detect fiber call
    const myMethodCallTmpl = {
        type: "postfix",
        left: { type: "varAccess", name: { text: OM.N } },
        op: { type: "call", args: OM.A }
    };
    const fiberCallTmpl = myMethodCallTmpl;
    const noRetFiberCallTmpl = {
        expr: fiberCallTmpl
    };
    const retFiberCallTmpl = {
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: fiberCallTmpl
        }
    };
    const otherFiberCallTmpl = {
        type: "postfix",
        left: OM.T({
            type: "postfix",
            left: OM.O,
            op: { type: "member", name: { text: OM.N } }
        }),
        op: { type: "call", args: OM.A }
    };
    /*
    const noRetOtherFiberCallTmpl={
        expr: otherFiberCallTmpl
    };
    const retOtherFiberCallTmpl={
        expr: {
            type: "infix",
            op: OM.P,
            left: OM.L,
            right: otherFiberCallTmpl
        }
    };*/
    function external_waitable_enabled() {
        return env.options.compiler.external_waitable || klass.directives.external_waitable;
    }
    const noRetSuperFiberCallTmpl = {
        expr: OM.S({ type: "superExpr", params: { args: OM.A } })
    };
    const retSuperFiberCallTmpl = {
        expr: {
            type: "infix",
            op: OM.O,
            left: OM.L,
            right: OM.S({ type: "superExpr", params: { args: OM.A } })
        }
    };
    klass.annotation = {};
    function annotation(node, aobj = undefined) {
        return annotation3(klass.annotation, node, aobj);
    }
    function initTopLevelScope2(klass) {
        if (klass.builtin)
            return;
        var s = topLevelScope;
        var decls = klass.decls;
        if (!decls) {
            console.log("DECLNUL", klass);
        }
        for (let i in decls.fields) {
            const info = decls.fields[i];
            s[i] = new SI.FIELD(klass, i, info);
            if (info.node) {
                annotation(info.node, { /*fieldInfo: info,*/ scopeInfo: s[i] });
            }
        }
        for (let i in decls.methods) {
            const info = decls.methods[i];
            var r = TonyuRuntime_1.default.klass.propReg.exec(i);
            if (r) {
                const name = r[2];
                let p;
                if (s[name] && s[name].type === ScopeTypes.PROP) {
                    p = s[name];
                }
                else {
                    p = new SI.PROP(klass.fullName, name);
                    s[name] = p;
                }
                if (r[1] === "get") {
                    p.getter = info;
                }
                else if (r[1] === "set") {
                    p.setter = info;
                }
                else {
                    throw new Error(`${r[1]} is neither get or set: ${name}`);
                }
            }
            else {
                s[i] = new SI.METHOD(klass.fullName, i, info);
            }
            if (info.node) {
                annotation(info.node, { funcInfo: info });
            }
        }
    }
    function initTopLevelScope() {
        var s = topLevelScope;
        getDependingClasses(klass).forEach(initTopLevelScope2);
        var decls = klass.decls; // Do not inherit parents' natives
        if (!(0, tonyu1_1.isTonyu1)(env.options)) {
            for (let i in JSNATIVES) {
                s[i] = new SI.NATIVE("native::" + i, { class: root_1.default[i] });
            }
        }
        for (let i in env.aliases) { /*ENVC*/ //CFN  env.classes->env.aliases
            var fullName = env.aliases[i];
            s[i] = new SI.CLASS(i, fullName, env.classes[fullName]);
        }
        for (let i in decls.natives) {
            s[i] = new SI.NATIVE("native::" + i, { class: root_1.default[i] });
        }
    }
    function inheritSuperMethod() {
        var d = getDependingClasses(klass);
        for (var n in klass.decls.methods) {
            var m2 = klass.decls.methods[n];
            for (let k of d) {
                var m = k.decls.methods[n];
                if (m && m.nowait) {
                    m2.nowait = true;
                }
            }
        }
    }
    function getMethod(name) {
        return getMethod2(klass, name);
    }
    function getSuperMethod(name) {
        for (let c of getDependingClasses(klass)) {
            if (c === klass)
                continue;
            const r = getMethod2(c, name);
            if (r)
                return r;
        }
        //return getMethod2(klass,name);
    }
    function isFiberMethod(name) {
        return stype(ctx.scope[name]) == ST.METHOD &&
            !getMethod(name).nowait;
    }
    function checkLVal(node) {
        if ((0, NodeTypes_1.isVarAccess)(node) ||
            (0, NodeTypes_1.isPostfix)(node) && (node.op.type == "member" || node.op.type == "arrayElem")) {
            if (node.type == "varAccess") {
                annotation(node, { noBind: true });
            }
            return true;
        }
        //console.log("LVal",node);
        throw (0, TError_1.default)((0, R_1.default)("invalidLeftValue", getSource(node)), srcFile, node.pos);
    }
    function prohibitGlobalNameOnBlockScopeDecl(v) {
        var isg = v.text.match(/^\$/);
        if (isg)
            throw (0, TError_1.default)((0, R_1.default)("CannotUseGlobalVariableInLetOrConst"), srcFile, v.pos);
    }
    function getScopeInfo(node) {
        const n = node + "";
        const si = ctx.scope[n];
        const t = stype(si);
        if (!t) {
            /*if (env.amdPaths && env.amdPaths[n]) {
                //t=ST.MODULE;
                klass.decls.amds[n]=env.amdPaths[n];
                topLevelScope[n]=new SI.MODULE(n);
                //console.log(n,"is module");
            } else {*/
            var isg = n.match(/^\$/);
            if (env.options.compiler.field_strict || klass.directives.field_strict) {
                if (!isg)
                    throw (0, TError_1.default)((0, R_1.default)("fieldDeclarationRequired", n), srcFile, node.pos);
            }
            if (isg) {
                topLevelScope[n] = new SI.GLOBAL(n);
            }
            else {
                //opt.klass=klass.name;
                const fi = {
                    klass,
                    name: n
                };
                if (!klass.decls.fields[n]) {
                    klass.decls.fields[n] = fi;
                }
                else {
                    Object.assign(klass.decls.fields[n], fi); //si;
                }
                //console.log("Implicit field declaration:", n, klass.decls.fields[n]);
                topLevelScope[n] = new SI.FIELD(klass, n, klass.decls.fields[n]);
            }
            //}
            return topLevelScope[n];
            //var opt:any={name:n};
            /*if (t==ST.FIELD) {
                opt.klass=klass.name;
                klass.decls.fields[n]=klass.decls.fields[n]||{};
                Object.assign(klass.decls.fields[n],{
                    klass:klass.fullName,
                    name:n
                });//si;
            }*/
            //topLevelScope[n]=si;//genSt(t,opt);
        }
        if (t == ST.CLASS) {
            klass.decls.softRefClasses[n] = si;
        }
        return si;
    }
    // locals are only var, not let or const. see collectBlockScopedVardecl
    var localsCollector = new Visitor_1.Visitor({
        varDecl: function (node) {
            if (ctx.isMain) {
                annotation(node, { varInMain: true });
                annotation(node, { declaringClass: klass });
                //console.log("var in main",node.name.text);
            }
            else {
                //if (node.name.text==="nonvar") throw new Error("WHY1!!!");
                ctx.locals.varDecls[node.name.text] = node;
                //console.log("DeclaringFunc of ",node.name.text,ctx.finfo);
                annotation(node, { declaringFunc: ctx.finfo });
            }
        },
        varsDecl(node) {
            if ((0, compiler_1.isBlockScopeDeclprefix)(node.declPrefix))
                return;
            for (let d of node.decls) {
                localsCollector.visit(d);
            }
        },
        funcDecl: function (node) {
            ctx.locals.subFuncDecls[node.head.name.text] = node;
            //initParamsLocals(node);??
        },
        funcExpr: function (node) {
            //initParamsLocals(node);??
        },
        "catch": function (node) {
            ctx.locals.varDecls[node.name.text] = node;
        },
        exprstmt: function (node) {
        },
        "forin": function (node) {
            var isVar = node.isVar;
            node.vars.forEach(function (v) {
                if ((0, compiler_1.isNonBlockScopeDeclprefix)(isVar)) {
                    if (ctx.isMain) {
                        annotation(v, { varInMain: true });
                        annotation(v, { declaringClass: klass });
                    }
                    else {
                        //if (v.text==="nonvar") throw new Error("WHY2!!!");
                        ctx.locals.varDecls[v.text] = v; //node??;
                        annotation(v, { declaringFunc: ctx.finfo });
                    }
                }
            });
            /*var n=`_it_${Object.keys(ctx.locals.varDecls).length}`;//genSym("_it_");
            annotation(node, {iterName:n});
            ctx.locals.varDecls[n]=node;// ??*/
        }
    });
    localsCollector.def = visitSub; //S
    function collectLocals(node) {
        var locals = { varDecls: {}, subFuncDecls: {} };
        ctx.enter({ locals }, function () {
            localsCollector.visit(node);
        });
        return locals;
    }
    function annotateParents(path, data) {
        path.forEach(function (n) {
            annotation(n, data);
        });
    }
    /*function fiberCallRequired(path: TNode[]) {//S
        if (ctx.method) ctx.method.fiberCallRequired=true;
        annotateParents(path, {fiberCallRequired:true} );
    }*/
    var varAccessesAnnotator = new Visitor_1.Visitor({
        varAccess: function (node) {
            var si = getScopeInfo(node.name);
            annotation(node, { scopeInfo: si });
        },
        funcDecl: function (node) {
        },
        funcExpr: function (node) {
            annotateSubFuncExpr(node);
        },
        objlit: function (node) {
            var t = this;
            var dup = {};
            node.elems.forEach(function (e) {
                const kn = (e.key.type == "literal") ?
                    e.key.text.substring(1, e.key.text.length - 1) :
                    e.key.text;
                if (dup.hasOwnProperty(kn)) {
                    throw (0, TError_1.default)((0, R_1.default)("duplicateKeyInObjectLiteral", kn), srcFile, e.pos);
                }
                dup[kn] = 1;
                //console.log("objlit",e.key.text);
                t.visit(e);
            });
        },
        jsonElem: function (node) {
            if (node.value) {
                this.visit(node.value);
            }
            else {
                if (node.key.type == "literal") {
                    throw (0, TError_1.default)((0, R_1.default)("cannotUseStringLiteralAsAShorthandOfObjectValue"), srcFile, node.pos);
                }
                var si = getScopeInfo(node.key);
                annotation(node, { scopeInfo: si });
            }
        },
        "do": function (node) {
            var t = this;
            ctx.enter({ brkable: true, contable: true }, function () {
                t.def(node);
            });
        },
        "switch": function (node) {
            var t = this;
            ctx.enter({ brkable: true }, function () {
                t.def(node);
            });
        },
        "while": function (node) {
            var t = this;
            ctx.enter({ brkable: true, contable: true }, function () {
                t.def(node);
            });
            //fiberCallRequired(this.path);//option
        },
        "for": function (node) {
            var t = this;
            if (node.isToken)
                return;
            ctx.enter({ inBlockScope: true }, () => {
                const ns = newScope(ctx.scope);
                if (node.inFor.type === "normalFor") {
                    collectBlockScopedVardecl([node.inFor.init], ns);
                }
                else {
                    if ((0, compiler_1.isBlockScopeDeclprefix)(node.inFor.isVar)) {
                        for (let v of node.inFor.vars) {
                            prohibitGlobalNameOnBlockScopeDecl(v);
                            ns[v.text] = new SI.LOCAL(ctx.finfo, true);
                        }
                    }
                }
                ctx.enter({ scope: ns, brkable: true, contable: true }, function () {
                    t.def(node);
                });
            });
        },
        "forin": function (node) {
            node.vars.forEach(function (v) {
                var si = getScopeInfo(v);
                annotation(v, { scopeInfo: si });
            });
            this.visit(node.set);
        },
        compound(node) {
            ctx.enter({ inBlockScope: true }, () => {
                const ns = newScope(ctx.scope);
                collectBlockScopedVardecl(node.stmts, ns);
                ctx.enter({ scope: ns }, () => {
                    for (let stmt of node.stmts)
                        this.visit(stmt);
                });
            });
        },
        ifWait: function (node) {
            var TH = "_thread";
            var t = this;
            var ns = newScope(ctx.scope);
            ns[TH] = new SI.THVAR(); //genSt(ST.THVAR);
            ctx.enter({ scope: ns }, function () {
                t.visit(node.then);
            });
            if (node._else) {
                t.visit(node._else);
            }
            //fiberCallRequired(this.path);
        },
        "try": function (node) {
            //ctx.finfo.useTry=true;
            this.def(node);
        },
        "return": function (node) {
            var t;
            if (!ctx.noWait) {
                if (node.value && (t = OM.match(node.value, fiberCallTmpl)) &&
                    isFiberMethod(t.N)) {
                    annotation(node.value, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
                //annotateParents(this.path,{hasReturn:true});
            }
            this.visit(node.value);
        },
        "break": function (node) {
            if (!ctx.brkable)
                throw (0, TError_1.default)((0, R_1.default)("breakShouldBeUsedInIterationOrSwitchStatement"), srcFile, node.pos);
            if (!ctx.noWait)
                annotateParents(this.path, { hasJump: true });
        },
        "continue": function (node) {
            if (!ctx.contable)
                throw (0, TError_1.default)((0, R_1.default)("continueShouldBeUsedInIterationStatement"), srcFile, node.pos);
            if (!ctx.noWait)
                annotateParents(this.path, { hasJump: true });
        },
        "reservedConst": function (node) {
            if (node.text == "arguments") {
                ctx.finfo.useArgs = true;
            }
        },
        postfix: function (node) {
            var t;
            function match(node, tmpl) {
                t = OM.match(node, tmpl);
                return t;
            }
            this.visit(node.left);
            this.visit(node.op);
            if (match(node, myMethodCallTmpl)) {
                const si = annotation(node.left).scopeInfo;
                annotation(node, { myMethodCall: { name: t.N, args: t.A, scopeInfo: si } });
            }
            else if (match(node, othersMethodCallTmpl)) {
                annotation(node, { othersMethodCall: { target: t.T, name: t.N, args: t.A } });
            }
            else if (match(node, memberAccessTmpl)) {
                annotation(node, { memberAccess: { target: t.T, name: t.N } });
            }
        },
        infix: function (node) {
            var opn = node.op.text;
            if (opn == "=" || opn == "+=" || opn == "-=" || opn == "*=" || opn == "/=" || opn == "%=") {
                checkLVal(node.left);
            }
            this.def(node);
        },
        exprstmt: function (node) {
            var t, m;
            if (node.expr.type === "objlit") {
                throw (0, TError_1.default)((0, R_1.default)("cannotUseObjectLiteralAsTheExpressionOfStatement"), srcFile, node.pos);
            }
            const path = this.path.slice();
            /*if (klass.fullName==="user.Main") {
                console.dir(node,{depth:null});
            }*/
            if (!ctx.noWait &&
                (t = OM.match(node, noRetFiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "noRet";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, retFiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "ret";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
                /*} else if (!ctx.noWait && external_waitable_enabled() &&
                        (t=OM.match(node,noRetOtherFiberCallTmpl))) {
                    //console.log("noRetOtherFiberCallTmpl", t);
                    t.type="noRetOther";
                    //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                    annotation(node, {otherFiberCall:t});
                } else if (!ctx.noWait && external_waitable_enabled() &&
                        (t=OM.match(node,retOtherFiberCallTmpl))) {
                    t.type="retOther";
                    //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                    annotation(node, {otherFiberCall:t});*/
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, noRetSuperFiberCallTmpl)) &&
                t.S.name) {
                const m = getSuperMethod(t.S.name.text);
                if (!m)
                    throw new Error((0, R_1.default)("undefinedSuperMethod", t.S.name.text));
                if (!m.nowait) {
                    t.type = "noRetSuper";
                    t.superclass = klass.superclass;
                    annotation(node, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
            }
            else if (!ctx.noWait &&
                (t = OM.match(node, retSuperFiberCallTmpl)) &&
                t.S.name) {
                if (!klass.superclass) {
                    throw new Error((0, R_1.default)("Class {1} has no superclass", klass.shortName));
                }
                m = getSuperMethod(t.S.name.text);
                if (!m)
                    throw new Error((0, R_1.default)("undefinedSuperMethod", t.S.name.text));
                if (!m.nowait) {
                    t.type = "retSuper";
                    t.superclass = klass.superclass;
                    annotation(node, { fiberCall: t });
                    //fiberCallRequired(this.path);
                }
            }
            this.visit(node.expr);
        },
        varDecl: function (node) {
            let t;
            const path = this.path.slice();
            if (!ctx.noWait &&
                (t = OM.match(node.value, fiberCallTmpl)) &&
                isFiberMethod(t.N)) {
                t.type = "varDecl";
                annotation(node, { fiberCall: t });
                //fiberCallRequired(this.path);
            }
            if (!ctx.noWait && external_waitable_enabled() &&
                (t = OM.match(node.value, otherFiberCallTmpl))) {
                t.type = "varDecl";
                //t.fiberCallRequired_lazy=()=>fiberCallRequired(path);
                annotation(node, { otherFiberCall: t });
            }
            this.visit(node.value);
            this.visit(node.typeDecl);
        },
        namedTypeExpr: function (node) {
            resolveNamedType(node);
        },
        arrayTypeExpr(node) {
            //console.log("ARRATYTPEEXPR",node);
            resolveArrayType(node);
        }
    });
    varAccessesAnnotator.def = visitSub; //S
    function resolveType(node) {
        if ((0, NodeTypes_1.isNamedTypeExpr)(node))
            return resolveNamedType(node);
        else if ((0, NodeTypes_1.isArrayTypeExpr)(node))
            return resolveArrayType(node);
    }
    function resolveArrayType(node) {
        const et = resolveType(node.element);
        //console.log("ET",et);
        const rt = { element: et };
        if (rt)
            annotation(node, { resolvedType: rt });
        return rt;
    }
    function resolveNamedType(node) {
        const si = getScopeInfo(node.name);
        const resolvedType = (si instanceof SI.NATIVE) ? si.value :
            (si instanceof SI.CLASS) ? si.info : undefined;
        if (resolvedType) {
            annotation(node, { resolvedType });
        }
        else if (env.options.compiler.typeCheck) {
            console.log("typeNotFound: topLevelScope", topLevelScope, si, env.classes);
            throw (0, TError_1.default)((0, R_1.default)("typeNotFound", node.name), srcFile, node.pos);
        }
        return resolvedType;
    }
    function annotateVarAccesses(node, scope) {
        //const ns=newScope(scope);
        /* ^ this occurs this:
        \f() {
            let x=5;
            \sub() {
                console.log(x);//10??
            }
            sub();
        } x=10;f();
        */
        collectBlockScopedVardecl(node, scope);
        ctx.enter({ scope }, function () {
            varAccessesAnnotator.visit(node);
        });
    }
    function copyLocals(finfo, scope) {
        const locals = finfo.locals;
        for (var i in locals.varDecls) {
            //console.log("LocalVar ",i,"declared by ",finfo);
            var si = new SI.LOCAL(finfo, false);
            scope[i] = si;
            annotation(locals.varDecls[i], { scopeInfo: si });
        }
        for (let i in locals.subFuncDecls) {
            const si = new SI.LOCAL(finfo, false);
            scope[i] = si;
            annotation(locals.subFuncDecls[i], { scopeInfo: si });
        }
    }
    function resolveTypesOfParams(params) {
        return params.map((param, i) => {
            if (param.typeDecl) {
                //console.log("restype",param);
                return resolveType(param.typeDecl.vtype);
            }
            return null;
        });
    }
    function initParamsLocals(f) {
        //console.log("IS_MAIN", f, f.name, f.isMain);
        ctx.enter({ isMain: f.isMain, finfo: f }, function () {
            f.locals = collectLocals(f.stmts);
            f.params = getParams(f);
        });
        //if (!f.params) throw new Error("f.params is not inited");
        f.paramTypes = resolveTypesOfParams(f.params);
        //console.log("F_PARAMTYPES", f.name, f.paramTypes);
    }
    function collectBlockScopedVardecl(stmts, scope) {
        for (let stmt of stmts) {
            if (stmt.type === "varsDecl" && (0, compiler_1.isBlockScopeDeclprefix)(stmt.declPrefix)) {
                const ism = ctx.finfo.isMain;
                //console.log("blockscope",ctx,ism);
                if (ism && !ctx.inBlockScope)
                    annotation(stmt, { varInMain: true });
                for (const d of stmt.decls) {
                    prohibitGlobalNameOnBlockScopeDecl(d.name);
                    if (ism && !ctx.inBlockScope) {
                        annotation(d, { varInMain: true });
                        annotation(d, { declaringClass: klass });
                    }
                    else {
                        const si = new SI.LOCAL(ctx.finfo, true);
                        scope[d.name.text] = si;
                        annotation(d, { declaringFunc: ctx.finfo, scopeInfo: si });
                    }
                }
            }
        }
    }
    function annotateSubFuncExpr(node) {
        var m, ps;
        var body = node.body;
        var name = (node.head.name ? node.head.name.text : "anonymous_" + node.pos);
        m = OM.match(node, { head: { params: { params: OM.P } } });
        if (m) {
            ps = m.P;
        }
        else {
            ps = [];
        }
        var finfo = { klass, name, stmts: body.stmts, nowait: true };
        var ns = newScope(ctx.scope);
        //var locals;
        ctx.enter({ finfo }, function () {
            ps.forEach(function (p) {
                var si = new SI.PARAM(finfo);
                annotation(p, { scopeInfo: si });
                ns[p.name.text] = si;
            });
            finfo.locals = collectLocals(body);
            copyLocals(finfo, ns);
            annotateVarAccesses(body.stmts, ns);
        });
        finfo.scope = ns;
        //finfo.name=name;
        finfo.params = ps;
        //var res={scope:ns, locals:finfo.locals, name:name, params:ps};
        finfo.paramTypes = resolveTypesOfParams(finfo.params);
        //annotation(node,res);
        annotation(node, { funcInfo: finfo });
        annotateSubFuncExprs(finfo.locals, ns);
        return finfo;
    }
    function annotateSubFuncExprs(locals, scope) {
        ctx.enter({ scope }, function () {
            for (var n in locals.subFuncDecls) {
                annotateSubFuncExpr(locals.subFuncDecls[n]);
            }
        });
    }
    function annotateMethodFiber(f) {
        var ns = newScope(ctx.scope);
        f.params.forEach((p, i) => {
            var si = new SI.PARAM(f);
            ns[p.name.text] = si;
            annotation(p, { scopeInfo: si, declaringFunc: f });
        });
        if (f.head && f.head.rtype) {
            const rt = resolveType(f.head.rtype.vtype);
            f.returnType = rt;
            //console.log("Annotated return type ", f, rt);
            //throw new Error("!");
        }
        copyLocals(f, ns);
        ctx.enter({ method: f, finfo: f, noWait: false }, function () {
            annotateVarAccesses(f.stmts, ns);
        });
        f.scope = ns;
        annotateSubFuncExprs(f.locals, ns);
        return ns;
    }
    function annotateSource() {
        ctx.enter({ scope: topLevelScope }, function () {
            for (var name in methods) {
                if (debug)
                    console.log("anon method1", name);
                var method = methods[name];
                initParamsLocals(method); //MAINVAR
                annotateMethodFiber(method);
            }
        });
        (0, compiler_1.packAnnotation)(klass.annotation);
    }
    initTopLevelScope(); //S
    inheritSuperMethod(); //S
    annotateSource();
    delete klass.hasSemanticError;
} //B  end of annotateSource2
exports.annotate = annotateSource2;

},{"../lib/R":28,"../lib/assert":31,"../lib/root":32,"../runtime/TError":37,"../runtime/TonyuRuntime":39,"./NodeTypes":9,"./ObjectMatcher":10,"./Visitor":14,"./compiler":15,"./context":16,"./parse_tonyu1":18,"./parse_tonyu2":19,"./parser":20,"./tonyu1":24}],12:[function(require,module,exports){
"use strict";
//define(function (require,exports,module) {
/*const root=require("root");*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceFiles = exports.SourceFiles = exports.SourceFile = void 0;
const root_1 = __importDefault(require("../lib/root"));
function timeout(t) {
    return new Promise(s => setTimeout(s, t));
}
let vm;
/*global global*/
if (typeof global !== "undefined" && global.require && global.require.name !== "requirejs") {
    vm = global.require("vm");
}
class SourceFile {
    // var text, sourceMap:S.Sourcemap;
    constructor(text, sourceMap) {
        if (typeof text === "object") {
            const params = text;
            sourceMap = params.sourceMap;
            //functions=params.functions;
            text = params.text;
            if (params.url) {
                this.url = params.url;
            }
        }
        this.text = text;
        this.sourceMap = sourceMap && sourceMap.toString();
        //this.functions=functions;
    }
    async saveAs(outf) {
        const mapFile = outf.sibling(outf.name() + ".map");
        let text = this.text;
        //text+="\n//# traceFunctions="+JSON.stringify(this.functions);
        if (this.sourceMap) {
            await mapFile.text(this.sourceMap);
            text += "\n//# sourceMappingURL=" + mapFile.name();
        }
        await outf.text(text);
        //return Promise.resolve();
    }
    exec(options) {
        return new Promise((resolve, reject) => {
            if (root_1.default.window) {
                const document = root_1.default.document;
                let u;
                if (this.url) {
                    u = this.url;
                }
                else {
                    const b = new root_1.default.Blob([this.text], { type: 'text/plain' });
                    u = root_1.default.URL.createObjectURL(b);
                }
                const s = document.createElement("script");
                console.log("load script", u);
                s.setAttribute("src", u);
                s.addEventListener("load", e => {
                    resolve(e);
                });
                this.parent.url2SourceFile[u] = this;
                document.body.appendChild(s);
            }
            else if (options && options.tmpdir) {
                const tmpdir = options.tmpdir;
                const uniqFile = tmpdir.rel(Math.random() + ".js");
                const mapFile = uniqFile.sibling(uniqFile.name() + ".map");
                let text = this.text;
                text += "\n//# sourceMappingURL=" + mapFile.name();
                uniqFile.text(text);
                mapFile.text(this.sourceMap);
                //console.log("EX",uniqFile.exists());
                require(uniqFile.path());
                uniqFile.rm();
                mapFile.rm();
                resolve(void (0));
            }
            else if (root_1.default.importScripts && this.url) {
                root_1.default.importScripts(this.url);
                resolve(void (0));
            }
            else {
                const F = Function;
                const f = (vm ? vm.compileFunction(this.text) : new F(this.text));
                resolve(f());
            }
        });
    }
    export() {
        return { text: this.text, sourceMap: this.sourceMap, functions: this.functions };
    }
}
exports.SourceFile = SourceFile;
class SourceFiles {
    constructor() {
        this.url2SourceFile = {};
    }
    add(text, sourceMap) {
        const sourceFile = new SourceFile(text, sourceMap);
        /*if (sourceFile.functions) for (let k in sourceFile.functions) {
            this.functions[k]=sourceFile;
        }*/
        sourceFile.parent = this;
        return sourceFile;
    }
}
exports.SourceFiles = SourceFiles;
exports.sourceFiles = new SourceFiles();
//});/*--end of define--*/

},{"../lib/root":32}],13:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpr = exports.checkTypeDecl = void 0;
const cu = __importStar(require("./compiler"));
const R_1 = __importDefault(require("../lib/R"));
const context_1 = require("./context");
const NodeTypes_1 = require("./NodeTypes");
//import Grammar from "./Grammar";
const parser_1 = require("./parser");
const Visitor_1 = require("./Visitor");
const CompilerTypes_1 = require("./CompilerTypes");
const TError_1 = __importDefault(require("../runtime/TError"));
//var ex={"[SUBELEMENTS]":1,pos:1,len:1};
const ScopeTypes = cu.ScopeTypes;
//var genSt=cu.newScopeType;
const stype = cu.getScopeType;
const newScope = cu.newScope;
//var nc=cu.nullCheck;
const genSym = cu.genSym;
const annotation3 = cu.annotation;
const getMethod2 = cu.getMethod;
const getDependingClasses = cu.getDependingClasses;
const getParams = cu.getParams;
//const JSNATIVES={Array:1, String:1, Boolean:1, Number:1, Void:1, Object:1,RegExp:1,Error:1};
//var TypeChecker:any={};
function visitSub(node) {
    var t = this;
    if (!node || typeof node != "object")
        return;
    //console.log("TCV",node.type,node);
    var es;
    if (node instanceof Array)
        es = node;
    else
        es = node[parser_1.SUBELEMENTS];
    if (!es) {
        es = [];
        for (var i in node) {
            es.push(node[i]);
        }
    }
    es.forEach(function (e) {
        t.visit(e);
    });
}
function checkTypeDecl(klass, env) {
    function annotation(node, aobj = undefined) {
        return annotation3(klass.annotation, node, aobj);
    }
    var typeDeclVisitor = new Visitor_1.Visitor({
        forin(node) {
            this.visit(node.set);
            const a = annotation(node.set);
            if (a.resolvedType && (0, CompilerTypes_1.isArrayType)(a.resolvedType) &&
                node.isVar && node.isVar.text !== "var") {
                if (node.vars.length == 1) {
                    const sa = annotation(node.vars[0]);
                    sa.scopeInfo.resolvedType = a.resolvedType.element;
                }
                else if (node.vars.length == 2) {
                    const sa = annotation(node.vars[1]);
                    sa.scopeInfo.resolvedType = a.resolvedType.element;
                    const si = annotation(node.vars[0]);
                    si.scopeInfo.resolvedType = { class: Number };
                }
            }
            else {
                this.visit(node.vars);
            }
        },
        varDecl(node) {
            //console.log("TCV","varDecl",node);
            if (node.value)
                this.visit(node.value);
            let rt;
            if (node.value) {
                const a = annotation(node.value);
                if (a.resolvedType) {
                    rt = a.resolvedType;
                    //console.log("Inferred",rt);
                }
            }
            if (node.name && node.typeDecl) {
                const va = annotation(node.typeDecl.vtype);
                rt = va.resolvedType;
            }
            if (rt) {
                const a = annotation(node);
                const si = a.scopeInfo;
                if (si) {
                    si.resolvedType = rt;
                    if (si.type === cu.ScopeTypes.FIELD) {
                        si.info.resolvedType = rt;
                    }
                }
            }
            else {
                env.unresolvedVars++;
            }
        },
        paramDecl(node) {
            if (node.name && node.typeDecl) {
                //console.log("param typeis",node.name+"", node.typeDecl.vtype+"");
                var va = annotation(node.typeDecl.vtype);
                var a = annotation(node);
                var si = a.scopeInfo;
                if (si && va.resolvedType) {
                    //console.log("set param type",node.name+"", node.typeDecl.vtype+"");
                    si.resolvedType = va.resolvedType;
                }
            }
        },
        funcDecl(node) {
            //console.log("Visit funcDecl",node);
            var head = node.head;
            /*const finfo=annotation(node).funcInfo;
            if (finfo && head.rtype) {
                const tanon=annotation(head.rtype);
                console.log("ret type of ",head.name+": ", head.rtype.vtype.name+"", tanon);
                finfo.returnType=tanon.resolvedType;// head.rtype.vtype;
            }*/
            this.visit(head);
            this.visit(node.body);
        },
    });
    typeDeclVisitor.def = visitSub; //S
    typeDeclVisitor.visit(klass.node);
}
exports.checkTypeDecl = checkTypeDecl;
function checkExpr(klass, env) {
    const srcFile = klass.src.tonyu; //file object  //S
    function annotation(node, aobj) {
        return annotation3(klass.annotation, node, aobj);
    }
    var typeAnnotationVisitor = new Visitor_1.Visitor({
        number: function (node) {
            annotation(node, { resolvedType: { class: Number } });
        },
        literal: function (node) {
            annotation(node, { resolvedType: { class: String } });
        },
        postfix: function (node) {
            //var a=annotation(node);
            this.visit(node.left);
            this.visit(node.op);
            if ((0, NodeTypes_1.isMember)(node.op)) {
                //var m=a.memberAccess;
                const a = annotation(node.left);
                var vtype = a.resolvedType; // visitExpr(m.target);
                const name = node.op.name.text;
                if (vtype && (0, CompilerTypes_1.isMeta)(vtype)) {
                    const field = cu.getField(vtype, name);
                    const method = cu.getMethod(vtype, name);
                    const prop = cu.getProperty(vtype, name);
                    if (!field && !method && !prop) {
                        throw (0, TError_1.default)((0, R_1.default)("memberNotFoundInClass", vtype.shortName, name), srcFile, node.op.name.pos);
                    }
                    //console.log("GETF",vtype,m.name,f);
                    // fail if f is not set when strict check
                    if (field && field.resolvedType) {
                        annotation(node, { resolvedType: field.resolvedType });
                    }
                    else if (method) {
                        annotation(node, { resolvedType: { method } });
                    }
                    else if (prop && prop.getter) {
                        annotation(node, { resolvedType: prop.getter.returnType });
                    }
                    else if (prop && prop.setter && prop.setter.paramTypes) {
                        annotation(node, { resolvedType: prop.setter.paramTypes[0] });
                    }
                }
                if (vtype && (0, CompilerTypes_1.isNativeClass)(vtype)) {
                    if (vtype.class.prototype[name]) {
                        //OK (as any)
                    }
                    else {
                        throw (0, TError_1.default)((0, R_1.default)("memberNotFoundInClass", vtype.class.name, name), srcFile, node.op.name.pos);
                    }
                }
            }
            else if ((0, NodeTypes_1.isCall)(node.op)) {
                const leftA = annotation(node.left);
                //console.log("OPCALL1", leftA);
                if (leftA && leftA.resolvedType) {
                    const leftT = leftA.resolvedType;
                    if (!(0, CompilerTypes_1.isMethodType)(leftT)) {
                        throw (0, TError_1.default)((0, R_1.default)("cannotCallNonFunctionType"), srcFile, node.op.pos);
                    }
                    //console.log("OPCALL", leftT);
                    annotation(node, { resolvedType: leftT.method.returnType });
                }
            }
            else if ((0, NodeTypes_1.isArrayElem)(node.op)) {
                const leftA = annotation(node.left);
                if (leftA && leftA.resolvedType && (0, CompilerTypes_1.isArrayType)(leftA.resolvedType)) {
                    const rt = leftA.resolvedType.element;
                    annotation(node, { resolvedType: rt });
                }
            }
        },
        newExpr: function (node) {
            const a = annotation(node.klass);
            if (a.scopeInfo && a.scopeInfo.type === cu.ScopeTypes.CLASS) {
                const rt = a.scopeInfo.info;
                annotation(node, { resolvedType: rt });
            }
        },
        varAccess: function (node) {
            var a = annotation(node);
            var si = a.scopeInfo;
            if (si) {
                if (si.resolvedType) {
                    //console.log("VA typeof",node.name+":",si.resolvedType);
                    annotation(node, { resolvedType: si.resolvedType });
                }
                else if (si.type === ScopeTypes.FIELD) {
                    const fld = klass.decls.fields[node.name + ""];
                    if (!fld) {
                        // because parent field does not contain...
                        //console.log("TC Warning: fld not found",klass,node.name+"");
                        return;
                    }
                    var rtype = fld.resolvedType;
                    if (!rtype) {
                        //console.log("VA resolvedType not found",node.name+":",fld);
                    }
                    else {
                        annotation(node, { resolvedType: rtype });
                        //console.log("VA typeof",node.name+":",rtype);
                    }
                }
                else if (si.type === ScopeTypes.METHOD) {
                    annotation(node, { resolvedType: { method: si.info } });
                }
                else if (si.type === ScopeTypes.PROP) {
                    if (si.getter) {
                        annotation(node, { resolvedType: si.getter.returnType });
                    }
                    else if (si.setter && si.setter.paramTypes) {
                        annotation(node, { resolvedType: si.setter.paramTypes[0] });
                    }
                }
            }
        },
        exprstmt(node) {
            this.visit(node.expr);
            handleOtherFiberCall(node);
        },
        varDecl(node) {
            this.visit(node.name);
            this.visit(node.typeDecl);
            this.visit(node.value);
            handleOtherFiberCall(node);
        },
    });
    function handleOtherFiberCall(node) {
        const a = annotation(node);
        if (a.otherFiberCall) {
            const o = a.otherFiberCall;
            const ta = annotation(o.T);
            if (ta.resolvedType && (0, CompilerTypes_1.isMethodType)(ta.resolvedType) && !ta.resolvedType.method.nowait) {
                //o.fiberCallRequired_lazy();
                o.fiberType = ta.resolvedType;
            }
        }
    }
    const ctx = (0, context_1.context)();
    typeAnnotationVisitor.def = visitSub;
    typeAnnotationVisitor.visit(klass.node);
    function visitExpr(node) {
        typeAnnotationVisitor.visit(node);
        var va = annotation(node);
        return va.resolvedType;
    }
}
exports.checkExpr = checkExpr;
;

},{"../lib/R":28,"../runtime/TError":37,"./CompilerTypes":4,"./NodeTypes":9,"./Visitor":14,"./compiler":15,"./context":16,"./parser":20}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitor = void 0;
class Visitor /*<N extends NT>*/ {
    constructor(funcs /*<N>*/) {
        this.funcs = funcs;
        this.debug = false;
        this.path = [];
    }
    visit(node) {
        const $ = this;
        try {
            $.path.push(node);
            if ($.debug)
                console.log("visit ", node.type, node.pos);
            var v = (node ? this.funcs[node.type] : null);
            if (v)
                return v.call($, node);
            else if ($.def)
                return $.def.call($, node);
        }
        finally {
            $.path.pop();
        }
    }
    replace(node) {
        const $ = this;
        if (!$.def) {
            $.def = function (node) {
                if (typeof node == "object") {
                    for (var i in node) {
                        if (node[i] && typeof node[i] == "object") {
                            node[i] = $.visit(node[i]);
                        }
                    }
                }
                return node;
            };
        }
        return $.visit(node);
    }
    ;
} /*
export function Visitor<N extends NT>(funcs: Funcs<N>) {
    return new VisitorClass(funcs);
    var $:any={funcs:funcs, path:[]};
    $.visit=function (node) {
        try {
            $.path.push(node);
            if ($.debug) console.log("visit ",node.type, node.pos);
            var v=(node ? funcs[node.type] :null);
            if (v) return v.call($, node);
            else if ($.def) return $.def.call($,node);
        } finally {
            $.path.pop();
        }
    };
    $.replace=function (node) {
        if (!$.def) {
            $.def=function (node) {
                if (typeof node=="object"){
                    for (var i in node) {
                        if (node[i] && typeof node[i]=="object") {
                            node[i]=$.visit(node[i]);
                        }
                    }
                }
                return node;
            };
        }
        return $.visit(node);
    };
    return $;*/
exports.Visitor = Visitor;
//};

},{}],15:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = exports.getDependingClasses = exports.getProperty = exports.getMethod = exports.getField = exports.typeDigest2ResolvedType = exports.digestDecls = exports.resolvedType2Digest = exports.getSource = exports.packAnnotation = exports.annotation = exports.genSym = exports.nullCheck = exports.newScope = exports.getScopeType = exports.ScopeInfos = exports.ScopeTypes = exports.isNonBlockScopeDeclprefix = exports.isBlockScopeDeclprefix = void 0;
const TonyuRuntime_1 = __importDefault(require("../runtime/TonyuRuntime"));
const root_1 = __importDefault(require("../lib/root"));
const CompilerTypes_1 = require("./CompilerTypes");
const NONBLOCKSCOPE_DECLPREFIX = "var";
function isBlockScopeDeclprefix(t) {
    return t && t.text !== NONBLOCKSCOPE_DECLPREFIX;
}
exports.isBlockScopeDeclprefix = isBlockScopeDeclprefix;
function isNonBlockScopeDeclprefix(t) {
    return t && t.text === NONBLOCKSCOPE_DECLPREFIX;
}
exports.isNonBlockScopeDeclprefix = isNonBlockScopeDeclprefix;
exports.ScopeTypes = {
    FIELD: "field", METHOD: "method", NATIVE: "native",
    LOCAL: "local", THVAR: "threadvar", PROP: "property",
    PARAM: "param", GLOBAL: "global",
    CLASS: "class", MODULE: "module"
};
var ScopeInfos;
(function (ScopeInfos) {
    class LOCAL {
        constructor(declaringFunc, isBlockScope) {
            this.declaringFunc = declaringFunc;
            this.isBlockScope = isBlockScope;
            this.type = exports.ScopeTypes.LOCAL;
        }
    }
    ScopeInfos.LOCAL = LOCAL;
    class PARAM {
        constructor(declaringFunc) {
            this.declaringFunc = declaringFunc;
            this.type = exports.ScopeTypes.PARAM;
        }
    }
    ScopeInfos.PARAM = PARAM;
    class FIELD {
        constructor(klass, name, info) {
            this.klass = klass;
            this.name = name;
            this.info = info;
            this.type = exports.ScopeTypes.FIELD;
        }
    }
    ScopeInfos.FIELD = FIELD;
    class PROP {
        constructor(klass, name) {
            this.klass = klass;
            this.name = name;
            this.type = exports.ScopeTypes.PROP;
        }
    }
    ScopeInfos.PROP = PROP;
    class METHOD {
        constructor(klass, name, info) {
            this.klass = klass;
            this.name = name;
            this.info = info;
            this.type = exports.ScopeTypes.METHOD;
        }
    }
    ScopeInfos.METHOD = METHOD;
    class THVAR {
        constructor() {
            this.type = exports.ScopeTypes.THVAR;
        }
    }
    ScopeInfos.THVAR = THVAR;
    class NATIVE {
        constructor(name, value) {
            this.name = name;
            this.value = value;
            this.type = exports.ScopeTypes.NATIVE;
        }
    }
    ScopeInfos.NATIVE = NATIVE;
    class CLASS {
        constructor(name, fullName, info) {
            this.name = name;
            this.fullName = fullName;
            this.info = info;
            this.type = exports.ScopeTypes.CLASS;
        }
    }
    ScopeInfos.CLASS = CLASS;
    class GLOBAL {
        constructor(name) {
            this.name = name;
            this.type = exports.ScopeTypes.GLOBAL;
        }
    }
    ScopeInfos.GLOBAL = GLOBAL;
    class MODULE {
        constructor(name) {
            this.name = name;
            this.type = exports.ScopeTypes.MODULE;
        }
    }
    ScopeInfos.MODULE = MODULE;
})(ScopeInfos = exports.ScopeInfos || (exports.ScopeInfos = {}));
;
let nodeIdSeq = 1;
let symSeq = 1; //B
//cu.newScopeType=genSt;
function getScopeType(st) {
    return st ? st.type : null;
}
exports.getScopeType = getScopeType;
//cu.getScopeType=stype;
function newScope(s) {
    const f = function () { };
    f.prototype = s;
    return new f();
}
exports.newScope = newScope;
//cu.newScope=newScope;
function nullCheck(o, mesg) {
    if (!o)
        throw mesg + " is null";
    return o;
}
exports.nullCheck = nullCheck;
//cu.nullCheck=nc;
function genSym(prefix) {
    return prefix + ((symSeq++) + "").replace(/\./g, "");
}
exports.genSym = genSym;
//cu.genSym=genSym;
function annotation(aobjs, node, aobj = undefined) {
    if (!node._id) {
        //if (!aobjs._idseq) aobjs._idseq=0;
        node._id = ++nodeIdSeq;
    }
    let res = aobjs[node._id];
    if (!res)
        res = aobjs[node._id] = { node: node };
    if (res.node !== node) {
        console.log("NOMATCH", res.node, node);
        throw new Error("annotation node not match!");
    }
    if (aobj) {
        for (let i in aobj)
            res[i] = aobj[i];
    }
    return res;
}
exports.annotation = annotation;
function packAnnotation(aobjs) {
    if (!aobjs)
        return;
    function isEmptyAnnotation(a) {
        return a && typeof a === "object" && Object.keys(a).length === 1 && Object.keys(a)[0] === "node";
    }
    for (let k of Object.keys(aobjs)) {
        if (isEmptyAnnotation(aobjs[k]))
            delete aobjs[k];
    }
}
exports.packAnnotation = packAnnotation;
//cu.extend=extend;
/*function extend(res,aobj) {
    for (let i in aobj) res[i]=aobj[i];
    return res;
};*/
//cu.annotation=annotation3;
function getSource(srcCont, node) {
    return srcCont.substring(node.pos, node.pos + node.len);
}
exports.getSource = getSource;
//cu.getSource=getSource;
//cu.getField=getField;
/*export function klass2name(t: AnnotatedType) {
    if (isMethodType(t)) {
        return `${t.method.klass.fullName}.${t.method.name}()`;
    } else if (isMeta(t)) {
        return t.fullName;
    } else if (isNativeClass(t)) {
        return t.class.name;
    } else {
        return `${klass2name(t.element)}[]`;
    }
}*/
function resolvedType2Digest(t) {
    if ((0, CompilerTypes_1.isMethodType)(t)) {
        return `${t.method.klass.fullName}.${t.method.name}()`;
    }
    else if ((0, CompilerTypes_1.isMeta)(t)) {
        return t.fullName;
    }
    else if ((0, CompilerTypes_1.isNativeClass)(t)) {
        return t.class.name;
    }
    else {
        return { element: resolvedType2Digest(t.element) };
    }
}
exports.resolvedType2Digest = resolvedType2Digest;
function digestDecls(klass) {
    //console.log("DIGEST", klass.decls.methods);
    var res = { methods: {}, fields: {} };
    for (let i in klass.decls.methods) {
        const mi = klass.decls.methods[i];
        res.methods[i] = {
            nowait: !!mi.nowait,
            isMain: !!mi.isMain,
        };
        if (mi.paramTypes || mi.returnType) {
            res.methods[i].vtype = {
                params: mi.paramTypes ? mi.paramTypes.map((t) => t ? resolvedType2Digest(t) : null) : null,
                returnValue: mi.returnType ? resolvedType2Digest(mi.returnType) : null,
            };
        }
    }
    for (let i in klass.decls.fields) {
        const src = klass.decls.fields[i];
        const dst = {
            vtype: src.resolvedType ? resolvedType2Digest(src.resolvedType) : src.vtype
        };
        res.fields[i] = dst;
    }
    return res;
}
exports.digestDecls = digestDecls;
function typeDigest2ResolvedType(d) {
    if (typeof d === "string") {
        if (TonyuRuntime_1.default.classMetas[d]) {
            return TonyuRuntime_1.default.classMetas[d];
        }
        else if (root_1.default[d]) {
            return { class: root_1.default[d] };
        }
    }
    else {
        return { element: typeDigest2ResolvedType(d.element) };
    }
}
exports.typeDigest2ResolvedType = typeDigest2ResolvedType;
function getField(klass, name) {
    if (klass instanceof Function)
        return null;
    let res = null;
    for (let k of getDependingClasses(klass)) {
        //console.log("getField", k, name);
        if (res)
            break;
        res = k.decls.fields[name];
    }
    if (res && res.vtype && !res.resolvedType) {
        res.resolvedType = typeDigest2ResolvedType(res.vtype);
    }
    return res;
}
exports.getField = getField;
function getMethod(klass, name) {
    let res = null;
    for (let k of getDependingClasses(klass)) {
        if (res)
            break;
        res = k.decls.methods[name];
    }
    return res;
}
exports.getMethod = getMethod;
function getProperty(klass, name) {
    const getter = getMethod(klass, TonyuRuntime_1.default.klass.property.methodFor("get", name));
    const setter = getMethod(klass, TonyuRuntime_1.default.klass.property.methodFor("set", name));
    if (!getter && !setter)
        return null;
    return { getter, setter };
}
exports.getProperty = getProperty;
//cu.getMethod=getMethod2;
// includes klass itself
function getDependingClasses(klass) {
    const visited = {};
    const res = [];
    function loop(k) {
        if (k.isShim) {
            console.log(klass, "contains shim ", k);
            throw new Error("Contains shim");
        }
        if (visited[k.fullName])
            return;
        visited[k.fullName] = true;
        res.push(k);
        if (k.superclass)
            loop(k.superclass);
        if (k.includes)
            k.includes.forEach(loop);
    }
    loop(klass);
    return res;
}
exports.getDependingClasses = getDependingClasses;
//cu.getDependingClasses=getDependingClasses;
function getParams(method) {
    let res = [];
    if (!method.head)
        return res;
    if (method.head.setter)
        res.push(method.head.setter.value);
    const ps = method.head.params ? method.head.params.params : null;
    if (ps && !ps.forEach)
        throw new Error(method + " is not array ");
    if (ps)
        res = res.concat(ps);
    return res;
}
exports.getParams = getParams;
//cu.getParams=getParams;
//export= cu;

},{"../lib/root":32,"../runtime/TonyuRuntime":39,"./CompilerTypes":4}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.context = exports.RawContext = void 0;
/*export= function context() {
    var c:any={};
    c.ovrFunc=function (from , to) {
        to.parent=from;
        return to;
    };
    c.enter=enter;
    var builtins={};*/
class RawContext {
    constructor() {
        this.value = {};
    }
    clear() {
        const value = this.value;
        for (let k in value) {
            delete value[k];
        }
    }
    enter(newval, act) {
        const sv = {};
        const curval = this.value;
        for (let k in newval) {
            /*if (k[0]==="$") {
                k=k.substring(1);
                sv[k]=c[k];
                c[k]=c.ovrFunc(c[k], val[k]);
            } else {*/
            sv[k] = curval[k];
            curval[k] = newval[k];
            //}
        }
        const res = act(this);
        for (let k in sv) {
            curval[k] = sv[k];
        }
        return res;
    }
}
exports.RawContext = RawContext;
function context() {
    const res = new RawContext();
    res.value = res;
    return res;
}
exports.context = context;

},{}],17:[function(require,module,exports){
"use strict";
module.exports = {
    getNamespace: function () {
        var opt = this.getOptions();
        if (opt.compiler && opt.compiler.namespace)
            return opt.compiler.namespace;
        throw new Error("Namespace is not set");
    },
    async loadDependingClasses() {
        const myNsp = this.getNamespace();
        for (let p of this.getDependingProjects()) {
            if (p.getNamespace() === myNsp)
                continue;
            await p.loadClasses();
        }
    },
    getEXT() { return ".tonyu"; }
    // loadClasses: stub
};

},{}],18:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parserFactory_1 = __importDefault(require("./parserFactory"));
const tonyu1_token_1 = __importDefault(require("./tonyu1_token"));
const Tonyu1Lang = (0, parserFactory_1.default)({ TT: tonyu1_token_1.default });
module.exports = Tonyu1Lang;

},{"./parserFactory":21,"./tonyu1_token":25}],19:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const parserFactory_1 = __importDefault(require("./parserFactory"));
const tonyu2_token_1 = __importDefault(require("./tonyu2_token"));
const Tonyu2Lang = (0, parserFactory_1.default)({ TT: tonyu2_token_1.default });
module.exports = Tonyu2Lang;

},{"./parserFactory":21,"./tonyu2_token":26}],20:[function(require,module,exports){
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
                return s.withError((0, R_1.default)("expected", Object.keys(tbl).join("")));
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
            return s.withError((0, R_1.default)("expected", Object.keys(tbl).join(", ")));
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
                s = s.withError((0, R_1.default)("expected", type));
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

},{"../lib/R":28}],21:[function(require,module,exports){
"use strict";
/*
* Tonyu2 の構文解析を行う．
* TonyuLang.parse(src);
*   - srcを解析して構文木を返す．構文エラーがあれば例外を投げる．
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
//import * as Parser from "./parser";
const TError_1 = __importDefault(require("../runtime/TError"));
const R_1 = __importDefault(require("../lib/R"));
const ExpressionParser2_1 = require("./ExpressionParser2");
const Grammar_1 = __importDefault(require("./Grammar"));
const parser_1 = require("./parser");
module.exports = function PF({ TT }) {
    //var p:any=Parser;
    var $ = {};
    var g = (0, Grammar_1.default)(parser_1.TokensParser.context);
    var G = g.get;
    var tk = parser_1.TokensParser.token;
    function disp(n) { return JSON.stringify(n); }
    var num = tk("number").ret(function (n) {
        n.type = "number";
        if (typeof n.text != "string")
            throw new Error("No text for " + disp(n));
        n.value = (n.text - 0);
        if (isNaN(n.value))
            throw new Error("No value for " + disp(n));
        return n;
    }).setName("numberLiteral");
    var symbol = tk("symbol");
    var symresv = tk("symbol");
    for (var resvk in TT.reserved) {
        var resvp = tk(resvk);
        //console.log(resvk,resvp, resvp instanceof Parser.Parser);
        if (resvp instanceof parser_1.Parser && resvk !== "constructor") {
            /*if (resvk==="constructor") {
                console.log("c");
            }*/
            symresv = symresv.or(resvp);
        }
    }
    var eqq = tk("===");
    var nee = tk("!==");
    var eq = tk("==");
    var ne = tk("!=");
    var ge = tk(">=");
    var le = tk("<=");
    var gt = tk(">");
    var lt = tk("<");
    var andand = tk("&&");
    var oror = tk("||");
    var bitand = tk("&");
    var bitor = tk("|");
    var bitxor = tk("^");
    var shr = tk(">>");
    var shl = tk("<<");
    var ushr = tk(">>>");
    var minus = tk("-"); //.first(space,"-");
    var plus = tk("+"); //.first(space,"+");
    var mul = tk("*");
    var div = tk("/");
    var mod = tk("%");
    var assign = tk("=");
    var literal = tk("literal");
    var regex = tk("regex");
    /*function retF(n) {
        return function () {
            return arguments[n];
        };
    }*/
    function comLastOpt(p) {
        return p.sep0(tk(",")).and(tk(",").opt()).retN(0).setName(`(comLastOpt ${p.name})`, { type: "rept", elem: p });
    }
    var e = (0, ExpressionParser2_1.ExpressionParser)(parser_1.TokensParser.context);
    var explz = e.lazy(); //.firstTokens(ALL);
    var arrayElem = g("arrayElem").ands(tk("["), explz, tk("]")).ret(null, "subscript");
    var argList = g("argList").ands(tk("("), comLastOpt(explz), tk(")")).ret(null, "args");
    var member = g("member").ands(tk("."), symresv).ret(null, "name");
    var parenExpr = g("parenExpr").ands(tk("("), explz, tk(")")).ret(null, "expr");
    var varAccess = g("varAccess").ands(symbol).ret("name");
    var funcExpr_l = G("funcExpr").firstTokens(["function", "\\"]);
    var funcExprArg = g("funcExprArg").ands(funcExpr_l).ret("obj");
    var objlit_l = G("objlit").firstTokens("{");
    var objlitArg = g("objlitArg").ands(objlit_l).ret("obj");
    var objOrFuncArg = g("objOrFuncArg").ors(objlitArg, funcExprArg);
    function genCallBody(argList, oof) {
        var res = [];
        if (argList && !argList.args) {
            throw disp(argList);
        }
        if (argList) {
            var rg = (0, parser_1.getRange)(argList);
            (0, parser_1.addRange)(res, rg);
            argList.args.forEach(function (arg) {
                res.push(arg);
            });
        }
        oof.forEach(function (o) {
            var rg = (0, parser_1.getRange)(o);
            (0, parser_1.addRange)(res, rg);
            res.push(o.obj);
        });
        return res;
    }
    const callBodyWithArgList = argList.and(objOrFuncArg.rep0()).ret(function (a, oof) {
        return genCallBody(a, oof);
    });
    g("callBodyWithArgList").alias(callBodyWithArgList);
    const callBodyWithoutArgList = objOrFuncArg.rep1().ret(function (oof) {
        return genCallBody(null, oof);
    });
    g("callBodyWithoutArgList").alias(callBodyWithoutArgList);
    const callBody = g("callBody").ors(callBodyWithArgList, callBodyWithoutArgList); //or().setName("callBody");
    //var callBodyOld=argList.or(objlitArg);
    var call = g("call").ands(callBody).ret("args");
    var scall = g("scall").ands(callBody).ret("args"); //supercall
    var newExpr = g("newExpr").ands(tk("new"), varAccess, call.opt()).ret(null, "klass", "params");
    var superExpr = g("superExpr").ands(tk("super"), tk(".").and(symbol).retN(1).opt(), scall).ret(null, "name", "params");
    var reservedConst = tk("true").or(tk("false")).
        or(tk("null")).
        or(tk("undefined")).
        or(tk("_thread")).
        or(tk("this")).
        or(tk("arguments")).ret(function (t) {
        t.type = "reservedConst";
        return t;
    }).setName("reservedConst");
    e.element(num);
    e.element(reservedConst);
    e.element(regex);
    e.element(literal);
    e.element(parenExpr);
    e.element(newExpr);
    e.element(superExpr);
    e.element(funcExpr_l);
    e.element(objlit_l);
    e.element(G("arylit").firstTokens("["));
    e.element(varAccess);
    var prio = 0;
    e.infixr(prio, assign);
    e.infixr(prio, tk("+="));
    e.infixr(prio, tk("-="));
    e.infixr(prio, tk("*="));
    e.infixr(prio, tk("/="));
    e.infixr(prio, tk("%="));
    e.infixr(prio, tk("|="));
    e.infixr(prio, tk("&="));
    prio++;
    e.trifixr(prio, tk("?"), tk(":"));
    prio++;
    e.infixl(prio, oror);
    prio++;
    e.infixl(prio, andand);
    prio++;
    e.infixl(prio, bitor);
    prio++;
    e.infixl(prio, bitxor);
    prio++;
    e.infixl(prio, bitand);
    prio++;
    e.infix(prio, tk("instanceof"));
    e.infix(prio, tk("is"));
    //e.infix(prio,tk("in"));
    e.infix(prio, eqq);
    e.infix(prio, nee);
    e.infix(prio, eq);
    e.infix(prio, ne);
    e.infix(prio, ge);
    e.infix(prio, le);
    e.infix(prio, gt);
    e.infix(prio, lt);
    prio++;
    e.infixl(prio, ushr);
    e.infixl(prio, shl);
    e.infixl(prio, shr);
    prio++;
    e.postfix(prio + 3, tk("++"));
    e.postfix(prio + 3, tk("--"));
    e.infixl(prio, minus);
    e.infixl(prio, plus);
    prio++;
    e.infixl(prio, mul);
    e.infixl(prio, div);
    e.infixl(prio, mod);
    prio++;
    e.prefix(prio, tk("typeof"));
    e.prefix(prio, tk("__typeof"));
    e.prefix(prio, tk("__await"));
    e.prefix(prio, tk("delete"));
    e.prefix(prio, tk("++"));
    e.prefix(prio, tk("--"));
    e.prefix(prio, tk("+"));
    e.prefix(prio, tk("-"));
    e.prefix(prio, tk("!"));
    e.prefix(prio, tk("~"));
    prio++;
    //    e.postfix(prio,tk("++"));
    //    e.postfix(prio,tk("--"));
    prio++;
    e.postfix(prio, call);
    e.postfix(prio, member);
    e.postfix(prio, arrayElem);
    function mki(left, op, right) {
        const res = { type: "infix", left, op, right };
        (0, parser_1.setRange)(res);
        res.toString = function () {
            return "(" + left + op + right + ")";
        };
        return res;
    }
    e.mkInfixl(mki);
    e.mkInfixr(mki);
    /*e.mkPostfix(function (p) {
        return {type:"postfix", expr:p};
    });*/
    const expr = e.build(); /*.ret((s:any)=>{
        console.log(s+"");
        return s;
    });*/ //.profile();
    g("elem").alias(e.getElement());
    g("expr").alias(expr);
    //var retF=function (i) { return function (){ return arguments[i];}; };
    const stmt_l = G("stmt"); //.firstTokens(ALL);
    const stmtList = g("stmtList").alias(stmt_l.rep0());
    var exprstmt = g("exprstmt").ands(expr, tk(";")).ret("expr");
    g("compound").ands(tk("{"), stmtList, tk("}")).ret(null, "stmts");
    var elseP = tk("else").and(stmt_l).retN(1);
    var returns = g("return").ands(tk("return"), expr.opt(), tk(";")).ret(null, "value");
    var ifs = g("if").ands(tk("if"), tk("("), expr, tk(")"), stmt_l, elseP.opt()).ret(null, null, "cond", null, "then", "_else");
    /*var trailFor=tk(";").and(expr.opt()).and(tk(";")).and(expr.opt()).ret(function (s, cond, s2, next) {
        return {cond: cond, next:next  };
    });*/
    const declPrefix = tk("var").or(tk("let"));
    var forin = g("forin").ands(declPrefix.opt(), symbol.sep1(tk(","), true), tk("in").or(tk("of")), expr).ret("isVar", "vars", "inof", "set");
    var normalFor = g("normalFor").ands(stmt_l, expr.opt(), tk(";"), expr.opt()).ret("init", "cond", null, "next");
    /*var infor=expr.and(trailFor.opt()).ret(function (a,b) {
        if (b==null) return {type:"forin", expr: a};
        return {type:"normalFor", init:a, cond: b.cond, next:b.next  };
    });*/
    var infor = normalFor.or(forin);
    var fors = g("for").ands(tk("for"), tk("("), infor, tk(")"), "stmt").ret(null, null, "inFor", null, "loop");
    var whiles = g("while").ands(tk("while"), tk("("), expr, tk(")"), "stmt").ret(null, null, "cond", null, "loop");
    var dos = g("do").ands(tk("do"), "stmt", tk("while"), tk("("), expr, tk(")"), tk(";")).ret(null, "loop", null, null, "cond", null, null);
    var cases = g("case").ands(tk("case"), expr, tk(":"), stmtList).ret(null, "value", null, "stmts");
    var defaults = g("default").ands(tk("default"), tk(":"), stmtList).ret(null, null, "stmts");
    var switchs = g("switch").ands(tk("switch"), tk("("), expr, tk(")"), tk("{"), cases.rep1(), defaults.opt(), tk("}")).ret(null, null, "value", null, null, "cases", "defs");
    var breaks = g("break").ands(tk("break"), tk(";")).ret("brk");
    var continues = g("continue").ands(tk("continue"), tk(";")).ret("cont");
    var fins = g("finally").ands(tk("finally"), "stmt").ret(null, "stmt");
    var catchs = g("catch").ands(tk("catch"), tk("("), symbol, tk(")"), "stmt").ret(null, null, "name", null, "stmt");
    var catches = g("catches").ors("catch", "finally");
    var trys = g("try").ands(tk("try"), "stmt", catches.rep1()).ret(null, "stmt", "catches");
    var throwSt = g("throw").ands(tk("throw"), expr, tk(";")).ret(null, "ex");
    const namedTypeExpr = g("namedTypeExpr").ands(symbol).ret("name");
    const tExp = (0, ExpressionParser2_1.ExpressionParser)(parser_1.TokensParser.context);
    tExp.mkPostfix((left, op) => {
        if (op.type === "arrayTypePostfix") {
            //console.log("ARRAYTYPE",left,op);
            return { type: "arrayTypeExpr", element: left };
        }
        if (op.type === "optionalTypePostfix") {
            return left; //TODO
        }
        console.log(left, op);
        throw new Error("Invalid type op type");
    });
    const arrayTypePostfix = g("arrayTypePostfix").ands(tk("["), tk("]")).ret();
    const optionalTypePostfix = g("optionalTypePostfix").ands(tk("?")).ret();
    tExp.postfix(0, arrayTypePostfix);
    tExp.postfix(0, optionalTypePostfix);
    tExp.element(namedTypeExpr);
    const typeExpr = tExp.build();
    var typeDecl = g("typeDecl").ands(tk(":"), typeExpr).ret(null, "vtype");
    var varDecl = g("varDecl").ands(symbol, typeDecl.opt(), tk("=").and(expr).retN(1).opt()).ret("name", "typeDecl", "value");
    var varsDecl = g("varsDecl").ands(declPrefix, varDecl.sep1(tk(","), true), tk(";")).ret("declPrefix", "decls");
    var paramDecl = g("paramDecl").ands(symbol, typeDecl.opt()).ret("name", "typeDecl");
    var paramDecls = g("paramDecls").ands(tk("("), comLastOpt(paramDecl), tk(")")).ret(null, "params");
    var setterDecl = g("setterDecl").ands(tk("="), paramDecl).ret(null, "value");
    g("funcDeclHead").ands(tk("nowait").opt(), tk("function").or(tk("fiber")).or(tk("tk_constructor")).or(tk("\\")).opt(), symbol.or(tk("new")), setterDecl.opt(), paramDecls.opt(), typeDecl.opt() // if opt this it is getter
    ).ret("nowait", "ftype", "name", "setter", "params", "rtype");
    var funcDecl = g("funcDecl").ands("funcDeclHead", "compound").ret("head", "body");
    var nativeDecl = g("nativeDecl").ands(tk("native"), symbol, tk(";")).ret(null, "name");
    var ifwait = g("ifWait").ands(tk("ifwait"), "stmt", elseP.opt()).ret(null, "then", "_else");
    //var useThread=g("useThread").ands(tk("usethread"),symbol,"stmt").ret(null, "threadVarName","stmt");
    var empty = g("empty").ands(tk(";")).ret(null);
    const stmt_built = g("stmt").ors("return", "if", "for", "while", "do", "break", "continue", "switch", "ifWait", "try", "throw", "nativeDecl", "funcDecl", "compound", "exprstmt", "varsDecl", "empty");
    // ------- end of stmts
    g("funcExprHead").ands(tk("function").or(tk("\\")), symbol.opt(), paramDecls.opt()).ret(null, "name", "params");
    var funcExpr = g("funcExpr").ands("funcExprHead", "compound").ret("head", "body");
    var jsonElem = g("jsonElem").ands(symbol.or(literal), tk(":").or(tk("=")).and(expr).retN(1).opt()).ret("key", "value");
    var objlit = g("objlit").ands(tk("{"), comLastOpt(jsonElem), tk("}")).ret(null, "elems");
    var arylit = g("arylit").ands(tk("["), comLastOpt(expr), tk("]")).ret(null, "elems");
    var ext = g("extends").ands(tk("extends"), symbol.or(tk("null")), tk(";")).
        ret(null, "superclassName");
    var incl = g("includes").ands(tk("includes"), symbol.sep1(tk(","), true), tk(";")).
        ret(null, "includeClassNames");
    var program = g("program").
        ands(ext.opt(), incl.opt(), stmt_built.rep0(), parser_1.TokensParser.eof).
        ret("ext", "incl", "stmts");
    //stmt_built.rep0().dispTbl();
    /*for (var i in g.defs) {
        g.defs[i].profile();
    }*/
    $.parse = function (file) {
        let str;
        if (typeof file == "string") {
            str = file;
        }
        else {
            str = file.text();
        }
        str += "\n"; // For end with // comment with no \n
        var tokenRes = TT.parse(str);
        if (!tokenRes.isSuccess()) {
            //return "ERROR\nToken error at "+tokenRes.src.maxPos+"\n"+
            //	str.substring(0,tokenRes.src.maxPos)+"!!HERE!!"+str.substring(tokenRes.src.maxPos);
            throw (0, TError_1.default)((0, R_1.default)("lexicalError") + ": " + tokenRes.error, file, tokenRes.src.maxErrors.pos);
        }
        var tokens = tokenRes.result[0];
        //console.log("Tokens: "+tokens.join(","));
        const global = { backtrackCount: 0 };
        var res = parser_1.TokensParser.parse(program, tokens, global);
        //console.log("POS="+res.src.maxPos);
        if (res.isSuccess()) {
            var node = res.result[0];
            //console.log("backtrackCount: ", global.backtrackCount+"/"+tokens.length);
            //console.log(disp(node));
            return node;
            //var xmlsrc=$.genXML(str, node);
            //return "<program>"+xmlsrc+"</program>";
        }
        const maxErrors = res.src.maxErrors;
        var lt = tokens[maxErrors.pos];
        var mp = (lt ? lt.pos : str.length);
        const len = (lt ? lt.len : 0);
        throw (0, TError_1.default)((0, R_1.default)("parseError") + `: ${maxErrors.errors.join(", ")}`, file, mp, len);
        /*return "ERROR\nSyntax error at "+mp+"\n"+
        str.substring(0,mp)+"!!HERE!!"+str.substring(mp);*/
    };
    /*$.genXML= function (src, node) {
        var x=XMLBuffer(src) ;
        x(node);
        return x.buf;
    };*/
    $.extension = "tonyu";
    //g.buildTypes();
    //g.checkFirstTbl();
    return $;
};

},{"../lib/R":28,"../runtime/TError":37,"./ExpressionParser2":5,"./Grammar":6,"./parser":20}],22:[function(require,module,exports){
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("source-map",[], factory);
	else if(typeof exports === 'object')
		exports["sourceMap"] = factory();
	else
		root["sourceMap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* Copyright 2009-2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE.txt or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/
	exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
	exports.SourceNode = __webpack_require__(10).SourceNode;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var base64VLQ = __webpack_require__(2);
	var util = __webpack_require__(4);
	var ArraySet = __webpack_require__(5).ArraySet;
	var MappingList = __webpack_require__(6).MappingList;

	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) {
		aArgs = {};
		}
		this._file = util.getArg(aArgs, 'file', null);
		this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
		this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}

	SourceMapGenerator.prototype._version = 3;

	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap =
		function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator({
			file: aSourceMapConsumer.file,
			sourceRoot: sourceRoot
		});
		aSourceMapConsumer.eachMapping(function (mapping) {
			var newMapping = {
			generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			}
			};

			if (mapping.source != null) {
			newMapping.source = mapping.source;
			if (sourceRoot != null) {
				newMapping.source = util.relative(sourceRoot, newMapping.source);
			}

			newMapping.original = {
				line: mapping.originalLine,
				column: mapping.originalColumn
			};

			if (mapping.name != null) {
				newMapping.name = mapping.name;
			}
			}

			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			generator.setSourceContent(sourceFile, content);
			}
		});
		return generator;
		};

	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping =
		function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, 'generated');
		var original = util.getArg(aArgs, 'original', null);
		var source = util.getArg(aArgs, 'source', null);
		var name = util.getArg(aArgs, 'name', null);

		if (!this._skipValidation) {
			this._validateMapping(generated, original, source, name);
		}

		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) {
			this._sources.add(source);
			}
		}

		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) {
			this._names.add(name);
			}
		}

		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source: source,
			name: name
		});
		};

	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent =
		function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) {
			source = util.relative(this._sourceRoot, source);
		}

		if (aSourceContent != null) {
			// Add the source content to the _sourcesContents map.
			// Create a new _sourcesContents map if the property is null.
			if (!this._sourcesContents) {
			this._sourcesContents = Object.create(null);
			}
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			// Remove the source file from the _sourcesContents map.
			// If the _sourcesContents map is empty, set the property to null.
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) {
			this._sourcesContents = null;
			}
		}
		};

	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap =
		function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		// If aSourceFile is omitted, we will use the file property of the SourceMap
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) {
			throw new Error(
				'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
				'or the source map\'s "file" property. Both were omitted.'
			);
			}
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		// Make "sourceFile" relative if an absolute Url is passed.
		if (sourceRoot != null) {
			sourceFile = util.relative(sourceRoot, sourceFile);
		}
		// Applying the SourceMap can add and remove items from the sources and
		// the names array.
		var newSources = new ArraySet();
		var newNames = new ArraySet();

		// Find mappings for the "sourceFile"
		this._mappings.unsortedForEach(function (mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
			// Check if it can be mapped by the source map, then update the mapping.
			var original = aSourceMapConsumer.originalPositionFor({
				line: mapping.originalLine,
				column: mapping.originalColumn
			});
			if (original.source != null) {
				// Copy mapping
				mapping.source = original.source;
				if (aSourceMapPath != null) {
				mapping.source = util.join(aSourceMapPath, mapping.source)
				}
				if (sourceRoot != null) {
				mapping.source = util.relative(sourceRoot, mapping.source);
				}
				mapping.originalLine = original.line;
				mapping.originalColumn = original.column;
				if (original.name != null) {
				mapping.name = original.name;
				}
			}
			}

			var source = mapping.source;
			if (source != null && !newSources.has(source)) {
			newSources.add(source);
			}

			var name = mapping.name;
			if (name != null && !newNames.has(name)) {
			newNames.add(name);
			}

		}, this);
		this._sources = newSources;
		this._names = newNames;

		// Copy sourcesContents of applied map.
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aSourceMapPath != null) {
				sourceFile = util.join(aSourceMapPath, sourceFile);
			}
			if (sourceRoot != null) {
				sourceFile = util.relative(sourceRoot, sourceFile);
			}
			this.setSourceContent(sourceFile, content);
			}
		}, this);
		};

	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping =
		function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
													aName) {
		if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
			&& aGenerated.line > 0 && aGenerated.column >= 0
			&& !aOriginal && !aSource && !aName) {
			// Case 1.
			return;
		}
		else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
				&& aOriginal && 'line' in aOriginal && 'column' in aOriginal
				&& aGenerated.line > 0 && aGenerated.column >= 0
				&& aOriginal.line > 0 && aOriginal.column >= 0
				&& aSource) {
			// Cases 2 and 3.
			return;
		}
		else {
			throw new Error('Invalid mapping: ' + JSON.stringify({
			generated: aGenerated,
			source: aSource,
			original: aOriginal,
			name: aName
			}));
		}
		};

	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings =
		function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = '';
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;

		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = ''

			if (mapping.generatedLine !== previousGeneratedLine) {
			previousGeneratedColumn = 0;
			while (mapping.generatedLine !== previousGeneratedLine) {
				next += ';';
				previousGeneratedLine++;
			}
			}
			else {
			if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
				continue;
				}
				next += ',';
			}
			}

			next += base64VLQ.encode(mapping.generatedColumn
									- previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;

			if (mapping.source != null) {
			sourceIdx = this._sources.indexOf(mapping.source);
			next += base64VLQ.encode(sourceIdx - previousSource);
			previousSource = sourceIdx;

			// lines are stored 0-based in SourceMap spec version 3
			next += base64VLQ.encode(mapping.originalLine - 1
										- previousOriginalLine);
			previousOriginalLine = mapping.originalLine - 1;

			next += base64VLQ.encode(mapping.originalColumn
										- previousOriginalColumn);
			previousOriginalColumn = mapping.originalColumn;

			if (mapping.name != null) {
				nameIdx = this._names.indexOf(mapping.name);
				next += base64VLQ.encode(nameIdx - previousName);
				previousName = nameIdx;
			}
			}

			result += next;
		}

		return result;
		};

	SourceMapGenerator.prototype._generateSourcesContent =
		function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function (source) {
			if (!this._sourcesContents) {
			return null;
			}
			if (aSourceRoot != null) {
			source = util.relative(aSourceRoot, source);
			}
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
			? this._sourcesContents[key]
			: null;
		}, this);
		};

	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON =
		function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) {
			map.file = this._file;
		}
		if (this._sourceRoot != null) {
			map.sourceRoot = this._sourceRoot;
		}
		if (this._sourcesContents) {
			map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		}

		return map;
		};

	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString =
		function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
		};

	exports.SourceMapGenerator = SourceMapGenerator;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*
	* Based on the Base 64 VLQ implementation in Closure Compiler:
	* https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
	*
	* Copyright 2011 The Closure Compiler Authors. All rights reserved.
	* Redistribution and use in source and binary forms, with or without
	* modification, are permitted provided that the following conditions are
	* met:
	*
	*  * Redistributions of source code must retain the above copyright
	*    notice, this list of conditions and the following disclaimer.
	*  * Redistributions in binary form must reproduce the above
	*    copyright notice, this list of conditions and the following
	*    disclaimer in the documentation and/or other materials provided
	*    with the distribution.
	*  * Neither the name of Google Inc. nor the names of its
	*    contributors may be used to endorse or promote products derived
	*    from this software without specific prior written permission.
	*
	* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
	* "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
	* LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
	* A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
	* OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
	* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
	* LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
	* DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
	* THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
	* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/

	var base64 = __webpack_require__(3);

	// A single base 64 digit can contain 6 bits of data. For the base 64 variable
	// length quantities we use in the source map spec, the first bit is the sign,
	// the next four bits are the actual value, and the 6th bit is the
	// continuation bit. The continuation bit tells us whether there are more
	// digits in this value following this digit.
	//
	//   Continuation
	//   |    Sign
	//   |    |
	//   V    V
	//   101011

	var VLQ_BASE_SHIFT = 5;

	// binary: 100000
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

	// binary: 011111
	var VLQ_BASE_MASK = VLQ_BASE - 1;

	// binary: 100000
	var VLQ_CONTINUATION_BIT = VLQ_BASE;

	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0
		? ((-aValue) << 1) + 1
		: (aValue << 1) + 0;
	}

	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative
		? -shifted
		: shifted;
	}

	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;

		var vlq = toVLQSigned(aValue);

		do {
		digit = vlq & VLQ_BASE_MASK;
		vlq >>>= VLQ_BASE_SHIFT;
		if (vlq > 0) {
			// There are still more digits in this value, so we must make sure the
			// continuation bit is marked.
			digit |= VLQ_CONTINUATION_BIT;
		}
		encoded += base64.encode(digit);
		} while (vlq > 0);

		return encoded;
	};

	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;

		do {
		if (aIndex >= strLen) {
			throw new Error("Expected more digits in base 64 VLQ value.");
		}

		digit = base64.decode(aStr.charCodeAt(aIndex++));
		if (digit === -1) {
			throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
		}

		continuation = !!(digit & VLQ_CONTINUATION_BIT);
		digit &= VLQ_BASE_MASK;
		result = result + (digit << shift);
		shift += VLQ_BASE_SHIFT;
		} while (continuation);

		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function (number) {
		if (0 <= number && number < intToCharMap.length) {
		return intToCharMap[number];
		}
		throw new TypeError("Must be between 0 and 63: " + number);
	};

	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function (charCode) {
		var bigA = 65;     // 'A'
		var bigZ = 90;     // 'Z'

		var littleA = 97;  // 'a'
		var littleZ = 122; // 'z'

		var zero = 48;     // '0'
		var nine = 57;     // '9'

		var plus = 43;     // '+'
		var slash = 47;    // '/'

		var littleOffset = 26;
		var numberOffset = 52;

		// 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
		if (bigA <= charCode && charCode <= bigZ) {
		return (charCode - bigA);
		}

		// 26 - 51: abcdefghijklmnopqrstuvwxyz
		if (littleA <= charCode && charCode <= littleZ) {
		return (charCode - littleA + littleOffset);
		}

		// 52 - 61: 0123456789
		if (zero <= charCode && charCode <= nine) {
		return (charCode - zero + numberOffset);
		}

		// 62: +
		if (charCode == plus) {
		return 62;
		}

		// 63: /
		if (charCode == slash) {
		return 63;
		}

		// Invalid base64 digit.
		return -1;
	};


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) {
		return aArgs[aName];
		} else if (arguments.length === 3) {
		return aDefaultValue;
		} else {
		throw new Error('"' + aName + '" is a required argument.');
		}
	}
	exports.getArg = getArg;

	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) {
		return null;
		}
		return {
		scheme: match[1],
		auth: match[2],
		host: match[3],
		port: match[4],
		path: match[5]
		};
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
		var url = '';
		if (aParsedUrl.scheme) {
		url += aParsedUrl.scheme + ':';
		}
		url += '//';
		if (aParsedUrl.auth) {
		url += aParsedUrl.auth + '@';
		}
		if (aParsedUrl.host) {
		url += aParsedUrl.host;
		}
		if (aParsedUrl.port) {
		url += ":" + aParsedUrl.port
		}
		if (aParsedUrl.path) {
		url += aParsedUrl.path;
		}
		return url;
	}
	exports.urlGenerate = urlGenerate;

	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consequtive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
		if (!url.path) {
			return aPath;
		}
		path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);

		var parts = path.split(/\/+/);
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
		part = parts[i];
		if (part === '.') {
			parts.splice(i, 1);
		} else if (part === '..') {
			up++;
		} else if (up > 0) {
			if (part === '') {
			// The first part is blank if the path is absolute. Trying to go
			// above the root is a no-op. Therefore we can remove all '..' parts
			// directly after the root.
			parts.splice(i + 1, up);
			up = 0;
			} else {
			parts.splice(i, 2);
			up--;
			}
		}
		}
		path = parts.join('/');

		if (path === '') {
		path = isAbsolute ? '/' : '.';
		}

		if (url) {
		url.path = path;
		return urlGenerate(url);
		}
		return path;
	}
	exports.normalize = normalize;

	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}
		if (aPath === "") {
		aPath = ".";
		}
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) {
		aRoot = aRootUrl.path || '/';
		}

		// `join(foo, '//www.example.org')`
		if (aPathUrl && !aPathUrl.scheme) {
		if (aRootUrl) {
			aPathUrl.scheme = aRootUrl.scheme;
		}
		return urlGenerate(aPathUrl);
		}

		if (aPathUrl || aPath.match(dataUrlRegexp)) {
		return aPath;
		}

		// `join('http://', 'www.example.com')`
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
		aRootUrl.host = aPath;
		return urlGenerate(aRootUrl);
		}

		var joined = aPath.charAt(0) === '/'
		? aPath
		: normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

		if (aRootUrl) {
		aRootUrl.path = joined;
		return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
		return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
	};

	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") {
		aRoot = ".";
		}

		aRoot = aRoot.replace(/\/$/, '');

		// It is possible for the path to be above the root. In this case, simply
		// checking whether the root is a prefix of the path won't work. Instead, we
		// need to remove components from the root one by one, until either we find
		// a prefix that fits, or we run out of components to remove.
		var level = 0;
		while (aPath.indexOf(aRoot + '/') !== 0) {
		var index = aRoot.lastIndexOf("/");
		if (index < 0) {
			return aPath;
		}

		// If the only part of the root that is left is the scheme (i.e. http://,
		// file:///, etc.), one or more slashes (/), or simply nothing at all, we
		// have exhausted all components, so the path is not relative to the root.
		aRoot = aRoot.slice(0, index);
		if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
			return aPath;
		}

		++level;
		}

		// Make sure we add a "../" for each component we removed from the root.
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;

	var supportsNullProto = (function () {
		var obj = Object.create(null);
		return !('__proto__' in obj);
	}());

	function identity (s) {
		return s;
	}

	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) {
		return '$' + aStr;
		}

		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
		if (isProtoString(aStr)) {
		return aStr.slice(1);
		}

		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
		if (!s) {
		return false;
		}

		var length = s.length;

		if (length < 9 /* "__proto__".length */) {
		return false;
		}

		if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
			s.charCodeAt(length - 2) !== 95  /* '_' */ ||
			s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 4) !== 116 /* 't' */ ||
			s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
			s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
			s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
			s.charCodeAt(length - 8) !== 95  /* '_' */ ||
			s.charCodeAt(length - 9) !== 95  /* '_' */) {
		return false;
		}

		for (var i = length - 10; i >= 0; i--) {
		if (s.charCodeAt(i) !== 36 /* '$' */) {
			return false;
		}
		}

		return true;
	}

	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) {
		return cmp;
		}

		cmp = mappingA.source - mappingB.source;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return mappingA.name - mappingB.name;
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) {
		return 0;
		}

		if (aStr1 > aStr2) {
		return 1;
		}

		return -1;
	}

	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) {
		return cmp;
		}

		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) {
		return cmp;
		}

		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var has = Object.prototype.hasOwnProperty;

	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = Object.create(null);
	}

	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) {
		set.add(aArray[i], aAllowDuplicates);
		}
		return set;
	};

	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return Object.getOwnPropertyNames(this._set).length;
	};

	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = util.toSetString(aStr);
		var isDuplicate = has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) {
		this._array.push(aStr);
		}
		if (!isDuplicate) {
		this._set[sStr] = idx;
		}
	};

	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		var sStr = util.toSetString(aStr);
		return has.call(this._set, sStr);
	};

	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		var sStr = util.toSetString(aStr);
		if (has.call(this._set, sStr)) {
		return this._set[sStr];
		}
		throw new Error('"' + aStr + '" is not in the set.');
	};

	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) {
		return this._array[aIdx];
		}
		throw new Error('No element indexed by ' + aIdx);
	};

	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};

	exports.ArraySet = ArraySet;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2014 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);

	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		// Optimized for most common case
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA ||
			util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}

	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		// Serves as infimum
		this._last = {generatedLine: -1, generatedColumn: 0};
	}

	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach =
		function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
		};

	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
		this._last = aMapping;
		this._array.push(aMapping);
		} else {
		this._sorted = false;
		this._array.push(aMapping);
		}
	};

	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
		this._array.sort(util.compareByGeneratedPositionsInflated);
		this._sorted = true;
		}
		return this._array;
	};

	exports.MappingList = MappingList;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var util = __webpack_require__(4);
	var binarySearch = __webpack_require__(8);
	var ArraySet = __webpack_require__(5).ArraySet;
	var base64VLQ = __webpack_require__(2);
	var quickSort = __webpack_require__(9).quickSort;

	function SourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		return sourceMap.sections != null
		? new IndexedSourceMapConsumer(sourceMap)
		: new BasicSourceMapConsumer(sourceMap);
	}

	SourceMapConsumer.fromSourceMap = function(aSourceMap) {
		return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
	}

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	SourceMapConsumer.prototype._version = 3;

	// `__generatedMappings` and `__originalMappings` are arrays that hold the
	// parsed mapping coordinates from the source map's "mappings" attribute. They
	// are lazily instantiated, accessed via the `_generatedMappings` and
	// `_originalMappings` getters respectively, and we only parse the mappings
	// and create these arrays once queried for a source location. We jump through
	// these hoops because there can be many thousands of mappings, and parsing
	// them is expensive, so we only want to do it if we must.
	//
	// Each object in the arrays is of the form:
	//
	//     {
	//       generatedLine: The line number in the generated code,
	//       generatedColumn: The column number in the generated code,
	//       source: The path to the original source file that generated this
	//               chunk of code,
	//       originalLine: The line number in the original source that
	//                     corresponds to this chunk of generated code,
	//       originalColumn: The column number in the original source that
	//                       corresponds to this chunk of generated code,
	//       name: The name of the original symbol which generated this chunk of
	//             code.
	//     }
	//
	// All properties except for `generatedLine` and `generatedColumn` can be
	// `null`.
	//
	// `_generatedMappings` is ordered by the generated positions.
	//
	// `_originalMappings` is ordered by the original positions.

	SourceMapConsumer.prototype.__generatedMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
		get: function () {
		if (!this.__generatedMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__generatedMappings;
		}
	});

	SourceMapConsumer.prototype.__originalMappings = null;
	Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
		get: function () {
		if (!this.__originalMappings) {
			this._parseMappings(this._mappings, this.sourceRoot);
		}

		return this.__originalMappings;
		}
	});

	SourceMapConsumer.prototype._charIsMappingSeparator =
		function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
		var c = aStr.charAt(index);
		return c === ";" || c === ",";
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	SourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		throw new Error("Subclasses must implement _parseMappings");
		};

	SourceMapConsumer.GENERATED_ORDER = 1;
	SourceMapConsumer.ORIGINAL_ORDER = 2;

	SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
	SourceMapConsumer.LEAST_UPPER_BOUND = 2;

	/**
	* Iterate over each mapping between an original source/line/column and a
	* generated line/column in this source map.
	*
	* @param Function aCallback
	*        The function that is called with each mapping.
	* @param Object aContext
	*        Optional. If specified, this object will be the value of `this` every
	*        time that `aCallback` is called.
	* @param aOrder
	*        Either `SourceMapConsumer.GENERATED_ORDER` or
	*        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
	*        iterate over the mappings sorted by the generated file's line/column
	*        order or the original's source/line/column order, respectively. Defaults to
	*        `SourceMapConsumer.GENERATED_ORDER`.
	*/
	SourceMapConsumer.prototype.eachMapping =
		function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
		var context = aContext || null;
		var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

		var mappings;
		switch (order) {
		case SourceMapConsumer.GENERATED_ORDER:
			mappings = this._generatedMappings;
			break;
		case SourceMapConsumer.ORIGINAL_ORDER:
			mappings = this._originalMappings;
			break;
		default:
			throw new Error("Unknown order of iteration.");
		}

		var sourceRoot = this.sourceRoot;
		mappings.map(function (mapping) {
			var source = mapping.source === null ? null : this._sources.at(mapping.source);
			if (source != null && sourceRoot != null) {
			source = util.join(sourceRoot, source);
			}
			return {
			source: source,
			generatedLine: mapping.generatedLine,
			generatedColumn: mapping.generatedColumn,
			originalLine: mapping.originalLine,
			originalColumn: mapping.originalColumn,
			name: mapping.name === null ? null : this._names.at(mapping.name)
			};
		}, this).forEach(aCallback, context);
		};

	/**
	* Returns all generated line and column information for the original source,
	* line, and column provided. If no column is provided, returns all mappings
	* corresponding to a either the line we are searching for or the next
	* closest line that has any mappings. Otherwise, returns all mappings
	* corresponding to the given line and either the column we are searching for
	* or the next closest column that has any offsets.
	*
	* The only argument is an object with the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: Optional. the column number in the original source.
	*
	* and an array of objects is returned, each with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	SourceMapConsumer.prototype.allGeneratedPositionsFor =
		function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
		var line = util.getArg(aArgs, 'line');

		// When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
		// returns the index of the closest mapping less than the needle. By
		// setting needle.originalColumn to 0, we thus find the last mapping for
		// the given line, provided such a mapping exists.
		var needle = {
			source: util.getArg(aArgs, 'source'),
			originalLine: line,
			originalColumn: util.getArg(aArgs, 'column', 0)
		};

		if (this.sourceRoot != null) {
			needle.source = util.relative(this.sourceRoot, needle.source);
		}
		if (!this._sources.has(needle.source)) {
			return [];
		}
		needle.source = this._sources.indexOf(needle.source);

		var mappings = [];

		var index = this._findMapping(needle,
										this._originalMappings,
										"originalLine",
										"originalColumn",
										util.compareByOriginalPositions,
										binarySearch.LEAST_UPPER_BOUND);
		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (aArgs.column === undefined) {
			var originalLine = mapping.originalLine;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we found. Since
			// mappings are sorted, this is guaranteed to find all mappings for
			// the line we found.
			while (mapping && mapping.originalLine === originalLine) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			} else {
			var originalColumn = mapping.originalColumn;

			// Iterate until either we run out of mappings, or we run into
			// a mapping for a different line than the one we were searching for.
			// Since mappings are sorted, this is guaranteed to find all mappings for
			// the line we are searching for.
			while (mapping &&
					mapping.originalLine === line &&
					mapping.originalColumn == originalColumn) {
				mappings.push({
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
				});

				mapping = this._originalMappings[++index];
			}
			}
		}

		return mappings;
		};

	exports.SourceMapConsumer = SourceMapConsumer;

	/**
	* A BasicSourceMapConsumer instance represents a parsed source map which we can
	* query for information about the original file positions by giving it a file
	* position in the generated source.
	*
	* The only parameter is the raw source map (either as a JSON string, or
	* already parsed to an object). According to the spec, source maps have the
	* following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - sources: An array of URLs to the original source files.
	*   - names: An array of identifiers which can be referrenced by individual mappings.
	*   - sourceRoot: Optional. The URL root from which all sources are relative.
	*   - sourcesContent: Optional. An array of contents of the original source files.
	*   - mappings: A string of base64 VLQs which contain the actual mappings.
	*   - file: Optional. The generated file this source map is associated with.
	*
	* Here is an example source map, taken from the source map spec[0]:
	*
	*     {
	*       version : 3,
	*       file: "out.js",
	*       sourceRoot : "",
	*       sources: ["foo.js", "bar.js"],
	*       names: ["src", "maps", "are", "fun"],
	*       mappings: "AA,AB;;ABCDE;"
	*     }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
	*/
	function BasicSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sources = util.getArg(sourceMap, 'sources');
		// Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
		// requires the array) to play nice here.
		var names = util.getArg(sourceMap, 'names', []);
		var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
		var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
		var mappings = util.getArg(sourceMap, 'mappings');
		var file = util.getArg(sourceMap, 'file', null);

		// Once again, Sass deviates from the spec and supplies the version as a
		// string rather than a number, so we use loose equality checking here.
		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		sources = sources
		.map(String)
		// Some source maps produce relative source paths like "./foo.js" instead of
		// "foo.js".  Normalize these first so that future comparisons will succeed.
		// See bugzil.la/1090768.
		.map(util.normalize)
		// Always ensure that absolute sources are internally stored relative to
		// the source root, if the source root is absolute. Not doing this would
		// be particularly problematic when the source root is a prefix of the
		// source (valid, but why??). See github issue #199 and bugzil.la/1188982.
		.map(function (source) {
			return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
			? util.relative(sourceRoot, source)
			: source;
		});

		// Pass `true` below to allow duplicate names and sources. While source maps
		// are intended to be compressed and deduplicated, the TypeScript compiler
		// sometimes generates source maps with duplicates in them. See Github issue
		// #72 and bugzil.la/889492.
		this._names = ArraySet.fromArray(names.map(String), true);
		this._sources = ArraySet.fromArray(sources, true);

		this.sourceRoot = sourceRoot;
		this.sourcesContent = sourcesContent;
		this._mappings = mappings;
		this.file = file;
	}

	BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

	/**
	* Create a BasicSourceMapConsumer from a SourceMapGenerator.
	*
	* @param SourceMapGenerator aSourceMap
	*        The source map that will be consumed.
	* @returns BasicSourceMapConsumer
	*/
	BasicSourceMapConsumer.fromSourceMap =
		function SourceMapConsumer_fromSourceMap(aSourceMap) {
		var smc = Object.create(BasicSourceMapConsumer.prototype);

		var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
		var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
		smc.sourceRoot = aSourceMap._sourceRoot;
		smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
																smc.sourceRoot);
		smc.file = aSourceMap._file;

		// Because we are modifying the entries (by converting string sources and
		// names to indices into the sources and names ArraySets), we have to make
		// a copy of the entry or else bad things happen. Shared mutable state
		// strikes again! See github issue #191.

		var generatedMappings = aSourceMap._mappings.toArray().slice();
		var destGeneratedMappings = smc.__generatedMappings = [];
		var destOriginalMappings = smc.__originalMappings = [];

		for (var i = 0, length = generatedMappings.length; i < length; i++) {
			var srcMapping = generatedMappings[i];
			var destMapping = new Mapping;
			destMapping.generatedLine = srcMapping.generatedLine;
			destMapping.generatedColumn = srcMapping.generatedColumn;

			if (srcMapping.source) {
			destMapping.source = sources.indexOf(srcMapping.source);
			destMapping.originalLine = srcMapping.originalLine;
			destMapping.originalColumn = srcMapping.originalColumn;

			if (srcMapping.name) {
				destMapping.name = names.indexOf(srcMapping.name);
			}

			destOriginalMappings.push(destMapping);
			}

			destGeneratedMappings.push(destMapping);
		}

		quickSort(smc.__originalMappings, util.compareByOriginalPositions);

		return smc;
		};

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	BasicSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
		get: function () {
		return this._sources.toArray().map(function (s) {
			return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
		}, this);
		}
	});

	/**
	* Provide the JIT with a nice shape / hidden class.
	*/
	function Mapping() {
		this.generatedLine = 0;
		this.generatedColumn = 0;
		this.source = null;
		this.originalLine = null;
		this.originalColumn = null;
		this.name = null;
	}

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	BasicSourceMapConsumer.prototype._parseMappings =
		function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		var generatedLine = 1;
		var previousGeneratedColumn = 0;
		var previousOriginalLine = 0;
		var previousOriginalColumn = 0;
		var previousSource = 0;
		var previousName = 0;
		var length = aStr.length;
		var index = 0;
		var cachedSegments = {};
		var temp = {};
		var originalMappings = [];
		var generatedMappings = [];
		var mapping, str, segment, end, value;

		while (index < length) {
			if (aStr.charAt(index) === ';') {
			generatedLine++;
			index++;
			previousGeneratedColumn = 0;
			}
			else if (aStr.charAt(index) === ',') {
			index++;
			}
			else {
			mapping = new Mapping();
			mapping.generatedLine = generatedLine;

			// Because each offset is encoded relative to the previous one,
			// many segments often have the same encoding. We can exploit this
			// fact by caching the parsed variable length fields of each segment,
			// allowing us to avoid a second parse if we encounter the same
			// segment again.
			for (end = index; end < length; end++) {
				if (this._charIsMappingSeparator(aStr, end)) {
				break;
				}
			}
			str = aStr.slice(index, end);

			segment = cachedSegments[str];
			if (segment) {
				index += str.length;
			} else {
				segment = [];
				while (index < end) {
				base64VLQ.decode(aStr, index, temp);
				value = temp.value;
				index = temp.rest;
				segment.push(value);
				}

				if (segment.length === 2) {
				throw new Error('Found a source, but no line and column');
				}

				if (segment.length === 3) {
				throw new Error('Found a source and line, but no column');
				}

				cachedSegments[str] = segment;
			}

			// Generated column.
			mapping.generatedColumn = previousGeneratedColumn + segment[0];
			previousGeneratedColumn = mapping.generatedColumn;

			if (segment.length > 1) {
				// Original source.
				mapping.source = previousSource + segment[1];
				previousSource += segment[1];

				// Original line.
				mapping.originalLine = previousOriginalLine + segment[2];
				previousOriginalLine = mapping.originalLine;
				// Lines are stored 0-based
				mapping.originalLine += 1;

				// Original column.
				mapping.originalColumn = previousOriginalColumn + segment[3];
				previousOriginalColumn = mapping.originalColumn;

				if (segment.length > 4) {
				// Original name.
				mapping.name = previousName + segment[4];
				previousName += segment[4];
				}
			}

			generatedMappings.push(mapping);
			if (typeof mapping.originalLine === 'number') {
				originalMappings.push(mapping);
			}
			}
		}

		quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
		this.__generatedMappings = generatedMappings;

		quickSort(originalMappings, util.compareByOriginalPositions);
		this.__originalMappings = originalMappings;
		};

	/**
	* Find the mapping that best matches the hypothetical "needle" mapping that
	* we are searching for in the given "haystack" of mappings.
	*/
	BasicSourceMapConsumer.prototype._findMapping =
		function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
											aColumnName, aComparator, aBias) {
		// To return the position we are searching for, we must first find the
		// mapping for the given position and then return the opposite position it
		// points to. Because the mappings are sorted, we can use binary search to
		// find the best mapping.

		if (aNeedle[aLineName] <= 0) {
			throw new TypeError('Line must be greater than or equal to 1, got '
								+ aNeedle[aLineName]);
		}
		if (aNeedle[aColumnName] < 0) {
			throw new TypeError('Column must be greater than or equal to 0, got '
								+ aNeedle[aColumnName]);
		}

		return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
		};

	/**
	* Compute the last column for each generated mapping. The last column is
	* inclusive.
	*/
	BasicSourceMapConsumer.prototype.computeColumnSpans =
		function SourceMapConsumer_computeColumnSpans() {
		for (var index = 0; index < this._generatedMappings.length; ++index) {
			var mapping = this._generatedMappings[index];

			// Mappings do not contain a field for the last generated columnt. We
			// can come up with an optimistic estimate, however, by assuming that
			// mappings are contiguous (i.e. given two consecutive mappings, the
			// first mapping ends where the second one starts).
			if (index + 1 < this._generatedMappings.length) {
			var nextMapping = this._generatedMappings[index + 1];

			if (mapping.generatedLine === nextMapping.generatedLine) {
				mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
				continue;
			}
			}

			// The last mapping for each line spans the entire line.
			mapping.lastGeneratedColumn = Infinity;
		}
		};

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	BasicSourceMapConsumer.prototype.originalPositionFor =
		function SourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._generatedMappings,
			"generatedLine",
			"generatedColumn",
			util.compareByGeneratedPositionsDeflated,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._generatedMappings[index];

			if (mapping.generatedLine === needle.generatedLine) {
			var source = util.getArg(mapping, 'source', null);
			if (source !== null) {
				source = this._sources.at(source);
				if (this.sourceRoot != null) {
				source = util.join(this.sourceRoot, source);
				}
			}
			var name = util.getArg(mapping, 'name', null);
			if (name !== null) {
				name = this._names.at(name);
			}
			return {
				source: source,
				line: util.getArg(mapping, 'originalLine', null),
				column: util.getArg(mapping, 'originalColumn', null),
				name: name
			};
			}
		}

		return {
			source: null,
			line: null,
			column: null,
			name: null
		};
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
		function BasicSourceMapConsumer_hasContentsOfAllSources() {
		if (!this.sourcesContent) {
			return false;
		}
		return this.sourcesContent.length >= this._sources.size() &&
			!this.sourcesContent.some(function (sc) { return sc == null; });
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	BasicSourceMapConsumer.prototype.sourceContentFor =
		function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		if (!this.sourcesContent) {
			return null;
		}

		if (this.sourceRoot != null) {
			aSource = util.relative(this.sourceRoot, aSource);
		}

		if (this._sources.has(aSource)) {
			return this.sourcesContent[this._sources.indexOf(aSource)];
		}

		var url;
		if (this.sourceRoot != null
			&& (url = util.urlParse(this.sourceRoot))) {
			// XXX: file:// URIs and absolute paths lead to unexpected behavior for
			// many users. We can help them out when they expect file:// URIs to
			// behave like it would if they were running a local HTTP server. See
			// https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
			var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
			if (url.scheme == "file"
				&& this._sources.has(fileUriAbsPath)) {
			return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
			}

			if ((!url.path || url.path == "/")
				&& this._sources.has("/" + aSource)) {
			return this.sourcesContent[this._sources.indexOf("/" + aSource)];
			}
		}

		// This function is used recursively from
		// IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
		// don't want to throw if we can't find the source - we just want to
		// return null, so we provide a flag to exit gracefully.
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
	*     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	BasicSourceMapConsumer.prototype.generatedPositionFor =
		function SourceMapConsumer_generatedPositionFor(aArgs) {
		var source = util.getArg(aArgs, 'source');
		if (this.sourceRoot != null) {
			source = util.relative(this.sourceRoot, source);
		}
		if (!this._sources.has(source)) {
			return {
			line: null,
			column: null,
			lastColumn: null
			};
		}
		source = this._sources.indexOf(source);

		var needle = {
			source: source,
			originalLine: util.getArg(aArgs, 'line'),
			originalColumn: util.getArg(aArgs, 'column')
		};

		var index = this._findMapping(
			needle,
			this._originalMappings,
			"originalLine",
			"originalColumn",
			util.compareByOriginalPositions,
			util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
		);

		if (index >= 0) {
			var mapping = this._originalMappings[index];

			if (mapping.source === needle.source) {
			return {
				line: util.getArg(mapping, 'generatedLine', null),
				column: util.getArg(mapping, 'generatedColumn', null),
				lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
			};
			}
		}

		return {
			line: null,
			column: null,
			lastColumn: null
		};
		};

	exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

	/**
	* An IndexedSourceMapConsumer instance represents a parsed source map which
	* we can query for information. It differs from BasicSourceMapConsumer in
	* that it takes "indexed" source maps (i.e. ones with a "sections" field) as
	* input.
	*
	* The only parameter is a raw source map (either as a JSON string, or already
	* parsed to an object). According to the spec for indexed source maps, they
	* have the following attributes:
	*
	*   - version: Which version of the source map spec this map is following.
	*   - file: Optional. The generated file this source map is associated with.
	*   - sections: A list of section definitions.
	*
	* Each value under the "sections" field has two fields:
	*   - offset: The offset into the original specified at which this section
	*       begins to apply, defined as an object with a "line" and "column"
	*       field.
	*   - map: A source map definition. This source map could also be indexed,
	*       but doesn't have to be.
	*
	* Instead of the "map" field, it's also possible to have a "url" field
	* specifying a URL to retrieve a source map from, but that's currently
	* unsupported.
	*
	* Here's an example source map, taken from the source map spec[0], but
	* modified to omit a section which uses the "url" field.
	*
	*  {
	*    version : 3,
	*    file: "app.js",
	*    sections: [{
	*      offset: {line:100, column:10},
	*      map: {
	*        version : 3,
	*        file: "section.js",
	*        sources: ["foo.js", "bar.js"],
	*        names: ["src", "maps", "are", "fun"],
	*        mappings: "AAAA,E;;ABCDE;"
	*      }
	*    }],
	*  }
	*
	* [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
	*/
	function IndexedSourceMapConsumer(aSourceMap) {
		var sourceMap = aSourceMap;
		if (typeof aSourceMap === 'string') {
		sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
		}

		var version = util.getArg(sourceMap, 'version');
		var sections = util.getArg(sourceMap, 'sections');

		if (version != this._version) {
		throw new Error('Unsupported version: ' + version);
		}

		this._sources = new ArraySet();
		this._names = new ArraySet();

		var lastOffset = {
		line: -1,
		column: 0
		};
		this._sections = sections.map(function (s) {
		if (s.url) {
			// The url field will require support for asynchronicity.
			// See https://github.com/mozilla/source-map/issues/16
			throw new Error('Support for url field in sections not implemented.');
		}
		var offset = util.getArg(s, 'offset');
		var offsetLine = util.getArg(offset, 'line');
		var offsetColumn = util.getArg(offset, 'column');

		if (offsetLine < lastOffset.line ||
			(offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
			throw new Error('Section offsets must be ordered and non-overlapping.');
		}
		lastOffset = offset;

		return {
			generatedOffset: {
			// The offset fields are 0-based, but we use 1-based indices when
			// encoding/decoding from VLQ.
			generatedLine: offsetLine + 1,
			generatedColumn: offsetColumn + 1
			},
			consumer: new SourceMapConsumer(util.getArg(s, 'map'))
		}
		});
	}

	IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
	IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

	/**
	* The version of the source mapping spec that we are consuming.
	*/
	IndexedSourceMapConsumer.prototype._version = 3;

	/**
	* The list of original sources.
	*/
	Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
		get: function () {
		var sources = [];
		for (var i = 0; i < this._sections.length; i++) {
			for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
			sources.push(this._sections[i].consumer.sources[j]);
			}
		}
		return sources;
		}
	});

	/**
	* Returns the original source, line, and column information for the generated
	* source's line and column positions provided. The only argument is an object
	* with the following properties:
	*
	*   - line: The line number in the generated source.
	*   - column: The column number in the generated source.
	*
	* and an object is returned with the following properties:
	*
	*   - source: The original source file, or null.
	*   - line: The line number in the original source, or null.
	*   - column: The column number in the original source, or null.
	*   - name: The original identifier, or null.
	*/
	IndexedSourceMapConsumer.prototype.originalPositionFor =
		function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
		var needle = {
			generatedLine: util.getArg(aArgs, 'line'),
			generatedColumn: util.getArg(aArgs, 'column')
		};

		// Find the section containing the generated position we're trying to map
		// to an original position.
		var sectionIndex = binarySearch.search(needle, this._sections,
			function(needle, section) {
			var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
			if (cmp) {
				return cmp;
			}

			return (needle.generatedColumn -
					section.generatedOffset.generatedColumn);
			});
		var section = this._sections[sectionIndex];

		if (!section) {
			return {
			source: null,
			line: null,
			column: null,
			name: null
			};
		}

		return section.consumer.originalPositionFor({
			line: needle.generatedLine -
			(section.generatedOffset.generatedLine - 1),
			column: needle.generatedColumn -
			(section.generatedOffset.generatedLine === needle.generatedLine
			? section.generatedOffset.generatedColumn - 1
			: 0),
			bias: aArgs.bias
		});
		};

	/**
	* Return true if we have the source content for every source in the source
	* map, false otherwise.
	*/
	IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
		function IndexedSourceMapConsumer_hasContentsOfAllSources() {
		return this._sections.every(function (s) {
			return s.consumer.hasContentsOfAllSources();
		});
		};

	/**
	* Returns the original source content. The only argument is the url of the
	* original source file. Returns null if no original source content is
	* available.
	*/
	IndexedSourceMapConsumer.prototype.sourceContentFor =
		function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			var content = section.consumer.sourceContentFor(aSource, true);
			if (content) {
			return content;
			}
		}
		if (nullOnMissing) {
			return null;
		}
		else {
			throw new Error('"' + aSource + '" is not in the SourceMap.');
		}
		};

	/**
	* Returns the generated line and column information for the original source,
	* line, and column positions provided. The only argument is an object with
	* the following properties:
	*
	*   - source: The filename of the original source.
	*   - line: The line number in the original source.
	*   - column: The column number in the original source.
	*
	* and an object is returned with the following properties:
	*
	*   - line: The line number in the generated source, or null.
	*   - column: The column number in the generated source, or null.
	*/
	IndexedSourceMapConsumer.prototype.generatedPositionFor =
		function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];

			// Only consider this section if the requested source is in the list of
			// sources of the consumer.
			if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
			continue;
			}
			var generatedPosition = section.consumer.generatedPositionFor(aArgs);
			if (generatedPosition) {
			var ret = {
				line: generatedPosition.line +
				(section.generatedOffset.generatedLine - 1),
				column: generatedPosition.column +
				(section.generatedOffset.generatedLine === generatedPosition.line
				? section.generatedOffset.generatedColumn - 1
				: 0)
			};
			return ret;
			}
		}

		return {
			line: null,
			column: null
		};
		};

	/**
	* Parse the mappings in a string in to a data structure which we can easily
	* query (the ordered arrays in the `this.__generatedMappings` and
	* `this.__originalMappings` properties).
	*/
	IndexedSourceMapConsumer.prototype._parseMappings =
		function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
		this.__generatedMappings = [];
		this.__originalMappings = [];
		for (var i = 0; i < this._sections.length; i++) {
			var section = this._sections[i];
			var sectionMappings = section.consumer._generatedMappings;
			for (var j = 0; j < sectionMappings.length; j++) {
			var mapping = sectionMappings[j];

			var source = section.consumer._sources.at(mapping.source);
			if (section.consumer.sourceRoot !== null) {
				source = util.join(section.consumer.sourceRoot, source);
			}
			this._sources.add(source);
			source = this._sources.indexOf(source);

			var name = section.consumer._names.at(mapping.name);
			this._names.add(name);
			name = this._names.indexOf(name);

			// The mappings coming from the consumer for the section have
			// generated positions relative to the start of the section, so we
			// need to offset them to be relative to the start of the concatenated
			// generated file.
			var adjustedMapping = {
				source: source,
				generatedLine: mapping.generatedLine +
				(section.generatedOffset.generatedLine - 1),
				generatedColumn: mapping.generatedColumn +
				(section.generatedOffset.generatedLine === mapping.generatedLine
				? section.generatedOffset.generatedColumn - 1
				: 0),
				originalLine: mapping.originalLine,
				originalColumn: mapping.originalColumn,
				name: name
			};

			this.__generatedMappings.push(adjustedMapping);
			if (typeof adjustedMapping.originalLine === 'number') {
				this.__originalMappings.push(adjustedMapping);
			}
			}
		}

		quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
		quickSort(this.__originalMappings, util.compareByOriginalPositions);
		};

	exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	* Recursive implementation of binary search.
	*
	* @param aLow Indices here and lower do not contain the needle.
	* @param aHigh Indices here and higher do not contain the needle.
	* @param aNeedle The element being searched for.
	* @param aHaystack The non-empty array being searched.
	* @param aCompare Function which takes two elements and returns -1, 0, or 1.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*/
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
		// This function terminates when one of the following is true:
		//
		//   1. We find the exact element we are looking for.
		//
		//   2. We did not find the exact element, but we can return the index of
		//      the next-closest element.
		//
		//   3. We did not find the exact element, and there is no next-closest
		//      element than the one we are searching for, so we return -1.
		var mid = Math.floor((aHigh - aLow) / 2) + aLow;
		var cmp = aCompare(aNeedle, aHaystack[mid], true);
		if (cmp === 0) {
		// Found the element we are looking for.
		return mid;
		}
		else if (cmp > 0) {
		// Our needle is greater than aHaystack[mid].
		if (aHigh - mid > 1) {
			// The element is in the upper half.
			return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
		}

		// The exact needle element was not found in this haystack. Determine if
		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return aHigh < aHaystack.length ? aHigh : -1;
		} else {
			return mid;
		}
		}
		else {
		// Our needle is less than aHaystack[mid].
		if (mid - aLow > 1) {
			// The element is in the lower half.
			return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
		}

		// we are in termination case (3) or (2) and return the appropriate thing.
		if (aBias == exports.LEAST_UPPER_BOUND) {
			return mid;
		} else {
			return aLow < 0 ? -1 : aLow;
		}
		}
	}

	/**
	* This is an implementation of binary search which will always try and return
	* the index of the closest element if there is no exact hit. This is because
	* mappings between original and generated line/col pairs are single points,
	* and there is an implicit region between each of them, so a miss just means
	* that you aren't on the very start of a region.
	*
	* @param aNeedle The element you are looking for.
	* @param aHaystack The array that is being searched.
	* @param aCompare A function which takes the needle and an element in the
	*     array and returns -1, 0, or 1 depending on whether the needle is less
	*     than, equal to, or greater than the element, respectively.
	* @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	*     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	*     closest element that is smaller than or greater than the one we are
	*     searching for, respectively, if the exact element cannot be found.
	*     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	*/
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
		if (aHaystack.length === 0) {
		return -1;
		}

		var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
									aCompare, aBias || exports.GREATEST_LOWER_BOUND);
		if (index < 0) {
		return -1;
		}

		// We have found either the exact element, or the next-closest element than
		// the one we are searching for. However, there may be more than one such
		// element. Make sure we always return the smallest of these.
		while (index - 1 >= 0) {
		if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
			break;
		}
		--index;
		}

		return index;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	// It turns out that some (most?) JavaScript engines don't self-host
	// `Array.prototype.sort`. This makes sense because C++ will likely remain
	// faster than JS when doing raw CPU-intensive sorting. However, when using a
	// custom comparator function, calling back and forth between the VM's C++ and
	// JIT'd JS is rather slow *and* loses JIT type information, resulting in
	// worse generated code for the comparator function than would be optimal. In
	// fact, when sorting with a comparator, these costs outweigh the benefits of
	// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
	// a ~3500ms mean speed-up in `bench/bench.html`.

	/**
	* Swap the elements indexed by `x` and `y` in the array `ary`.
	*
	* @param {Array} ary
	*        The array.
	* @param {Number} x
	*        The index of the first item.
	* @param {Number} y
	*        The index of the second item.
	*/
	function swap(ary, x, y) {
		var temp = ary[x];
		ary[x] = ary[y];
		ary[y] = temp;
	}

	/**
	* Returns a random integer within the range `low .. high` inclusive.
	*
	* @param {Number} low
	*        The lower bound on the range.
	* @param {Number} high
	*        The upper bound on the range.
	*/
	function randomIntInRange(low, high) {
		return Math.round(low + (Math.random() * (high - low)));
	}

	/**
	* The Quick Sort algorithm.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	* @param {Number} p
	*        Start index of the array
	* @param {Number} r
	*        End index of the array
	*/
	function doQuickSort(ary, comparator, p, r) {
		// If our lower bound is less than our upper bound, we (1) partition the
		// array into two pieces and (2) recurse on each half. If it is not, this is
		// the empty array and our base case.

		if (p < r) {
		// (1) Partitioning.
		//
		// The partitioning chooses a pivot between `p` and `r` and moves all
		// elements that are less than or equal to the pivot to the before it, and
		// all the elements that are greater than it after it. The effect is that
		// once partition is done, the pivot is in the exact place it will be when
		// the array is put in sorted order, and it will not need to be moved
		// again. This runs in O(n) time.

		// Always choose a random pivot so that an input array which is reverse
		// sorted does not cause O(n^2) running time.
		var pivotIndex = randomIntInRange(p, r);
		var i = p - 1;

		swap(ary, pivotIndex, r);
		var pivot = ary[r];

		// Immediately after `j` is incremented in this loop, the following hold
		// true:
		//
		//   * Every element in `ary[p .. i]` is less than or equal to the pivot.
		//
		//   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
		for (var j = p; j < r; j++) {
			if (comparator(ary[j], pivot) <= 0) {
			i += 1;
			swap(ary, i, j);
			}
		}

		swap(ary, i + 1, j);
		var q = i + 1;

		// (2) Recurse on each half.

		doQuickSort(ary, comparator, p, q - 1);
		doQuickSort(ary, comparator, q + 1, r);
		}
	}

	/**
	* Sort the given array in-place with the given comparator function.
	*
	* @param {Array} ary
	*        An array to sort.
	* @param {function} comparator
	*        Function to use to compare two items.
	*/
	exports.quickSort = function (ary, comparator) {
		doQuickSort(ary, comparator, 0, ary.length - 1);
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* -*- Mode: js; js-indent-level: 2; -*- */
	/*
	* Copyright 2011 Mozilla Foundation and contributors
	* Licensed under the New BSD license. See LICENSE or:
	* http://opensource.org/licenses/BSD-3-Clause
	*/

	var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
	var util = __webpack_require__(4);

	// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
	// operating systems these days (capturing the result).
	var REGEX_NEWLINE = /(\r?\n)/;

	// Newline character code for charCodeAt() comparisons
	var NEWLINE_CODE = 10;

	// Private symbol for identifying `SourceNode`s when multiple versions of
	// the source-map library are loaded. This MUST NOT CHANGE across
	// versions!
	var isSourceNode = "$$$isSourceNode$$$";

	/**
	* SourceNodes provide a way to abstract over interpolating/concatenating
	* snippets of generated JavaScript source code while maintaining the line and
	* column information associated with the original source code.
	*
	* @param aLine The original line number.
	* @param aColumn The original column number.
	* @param aSource The original source's filename.
	* @param aChunks Optional. An array of strings which are snippets of
	*        generated JS, or other SourceNodes.
	* @param aName The original identifier.
	*/
	function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
		this.children = [];
		this.sourceContents = {};
		this.line = aLine == null ? null : aLine;
		this.column = aColumn == null ? null : aColumn;
		this.source = aSource == null ? null : aSource;
		this.name = aName == null ? null : aName;
		this[isSourceNode] = true;
		if (aChunks != null) this.add(aChunks);
	}

	/**
	* Creates a SourceNode from generated code and a SourceMapConsumer.
	*
	* @param aGeneratedCode The generated code
	* @param aSourceMapConsumer The SourceMap for the generated code
	* @param aRelativePath Optional. The path that relative sources in the
	*        SourceMapConsumer should be relative to.
	*/
	SourceNode.fromStringWithSourceMap =
		function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
		// The SourceNode we want to fill with the generated code
		// and the SourceMap
		var node = new SourceNode();

		// All even indices of this array are one line of the generated code,
		// while all odd indices are the newlines between two adjacent lines
		// (since `REGEX_NEWLINE` captures its match).
		// Processed fragments are removed from this array, by calling `shiftNextLine`.
		var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
		var shiftNextLine = function() {
			var lineContents = remainingLines.shift();
			// The last line of a file might not have a newline.
			var newLine = remainingLines.shift() || "";
			return lineContents + newLine;
		};

		// We need to remember the position of "remainingLines"
		var lastGeneratedLine = 1, lastGeneratedColumn = 0;

		// The generate SourceNodes we need a code range.
		// To extract it current and last mapping is used.
		// Here we store the last mapping.
		var lastMapping = null;

		aSourceMapConsumer.eachMapping(function (mapping) {
			if (lastMapping !== null) {
			// We add the code from "lastMapping" to "mapping":
			// First check if there is a new line in between.
			if (lastGeneratedLine < mapping.generatedLine) {
				// Associate first line with "lastMapping"
				addMappingWithCode(lastMapping, shiftNextLine());
				lastGeneratedLine++;
				lastGeneratedColumn = 0;
				// The remaining code is added without mapping
			} else {
				// There is no new line in between.
				// Associate the code between "lastGeneratedColumn" and
				// "mapping.generatedColumn" with "lastMapping"
				var nextLine = remainingLines[0];
				var code = nextLine.substr(0, mapping.generatedColumn -
											lastGeneratedColumn);
				remainingLines[0] = nextLine.substr(mapping.generatedColumn -
													lastGeneratedColumn);
				lastGeneratedColumn = mapping.generatedColumn;
				addMappingWithCode(lastMapping, code);
				// No more remaining code, continue
				lastMapping = mapping;
				return;
			}
			}
			// We add the generated code until the first mapping
			// to the SourceNode without any mapping.
			// Each line is added as separate string.
			while (lastGeneratedLine < mapping.generatedLine) {
			node.add(shiftNextLine());
			lastGeneratedLine++;
			}
			if (lastGeneratedColumn < mapping.generatedColumn) {
			var nextLine = remainingLines[0];
			node.add(nextLine.substr(0, mapping.generatedColumn));
			remainingLines[0] = nextLine.substr(mapping.generatedColumn);
			lastGeneratedColumn = mapping.generatedColumn;
			}
			lastMapping = mapping;
		}, this);
		// We have processed all mappings.
		if (remainingLines.length > 0) {
			if (lastMapping) {
			// Associate the remaining code in the current line with "lastMapping"
			addMappingWithCode(lastMapping, shiftNextLine());
			}
			// and add the remaining lines without any mapping
			node.add(remainingLines.join(""));
		}

		// Copy sourcesContent into SourceNode
		aSourceMapConsumer.sources.forEach(function (sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
			if (aRelativePath != null) {
				sourceFile = util.join(aRelativePath, sourceFile);
			}
			node.setSourceContent(sourceFile, content);
			}
		});

		return node;

		function addMappingWithCode(mapping, code) {
			if (mapping === null || mapping.source === undefined) {
			node.add(code);
			} else {
			var source = aRelativePath
				? util.join(aRelativePath, mapping.source)
				: mapping.source;
			node.add(new SourceNode(mapping.originalLine,
									mapping.originalColumn,
									source,
									code,
									mapping.name));
			}
		}
		};

	/**
	* Add a chunk of generated JS to this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.add = function SourceNode_add(aChunk) {
		if (Array.isArray(aChunk)) {
		aChunk.forEach(function (chunk) {
			this.add(chunk);
		}, this);
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		if (aChunk) {
			this.children.push(aChunk);
		}
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Add a chunk of generated JS to the beginning of this source node.
	*
	* @param aChunk A string snippet of generated JS code, another instance of
	*        SourceNode, or an array where each member is one of those things.
	*/
	SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
		if (Array.isArray(aChunk)) {
		for (var i = aChunk.length-1; i >= 0; i--) {
			this.prepend(aChunk[i]);
		}
		}
		else if (aChunk[isSourceNode] || typeof aChunk === "string") {
		this.children.unshift(aChunk);
		}
		else {
		throw new TypeError(
			"Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
		);
		}
		return this;
	};

	/**
	* Walk over the tree of JS snippets in this node and its children. The
	* walking function is called once for each snippet of JS and is passed that
	* snippet and the its original associated source's line/column location.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walk = function SourceNode_walk(aFn) {
		var chunk;
		for (var i = 0, len = this.children.length; i < len; i++) {
		chunk = this.children[i];
		if (chunk[isSourceNode]) {
			chunk.walk(aFn);
		}
		else {
			if (chunk !== '') {
			aFn(chunk, { source: this.source,
						line: this.line,
						column: this.column,
						name: this.name });
			}
		}
		}
	};

	/**
	* Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
	* each of `this.children`.
	*
	* @param aSep The separator.
	*/
	SourceNode.prototype.join = function SourceNode_join(aSep) {
		var newChildren;
		var i;
		var len = this.children.length;
		if (len > 0) {
		newChildren = [];
		for (i = 0; i < len-1; i++) {
			newChildren.push(this.children[i]);
			newChildren.push(aSep);
		}
		newChildren.push(this.children[i]);
		this.children = newChildren;
		}
		return this;
	};

	/**
	* Call String.prototype.replace on the very right-most source snippet. Useful
	* for trimming whitespace from the end of a source node, etc.
	*
	* @param aPattern The pattern to replace.
	* @param aReplacement The thing to replace the pattern with.
	*/
	SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
		var lastChild = this.children[this.children.length - 1];
		if (lastChild[isSourceNode]) {
		lastChild.replaceRight(aPattern, aReplacement);
		}
		else if (typeof lastChild === 'string') {
		this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
		}
		else {
		this.children.push(''.replace(aPattern, aReplacement));
		}
		return this;
	};

	/**
	* Set the source content for a source file. This will be added to the SourceMapGenerator
	* in the sourcesContent field.
	*
	* @param aSourceFile The filename of the source file
	* @param aSourceContent The content of the source file
	*/
	SourceNode.prototype.setSourceContent =
		function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
		this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
		};

	/**
	* Walk over the tree of SourceNodes. The walking function is called for each
	* source file content and is passed the filename and source content.
	*
	* @param aFn The traversal function.
	*/
	SourceNode.prototype.walkSourceContents =
		function SourceNode_walkSourceContents(aFn) {
		for (var i = 0, len = this.children.length; i < len; i++) {
			if (this.children[i][isSourceNode]) {
			this.children[i].walkSourceContents(aFn);
			}
		}

		var sources = Object.keys(this.sourceContents);
		for (var i = 0, len = sources.length; i < len; i++) {
			aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
		}
		};

	/**
	* Return the string representation of this source node. Walks over the tree
	* and concatenates all the various snippets together to one string.
	*/
	SourceNode.prototype.toString = function SourceNode_toString() {
		var str = "";
		this.walk(function (chunk) {
		str += chunk;
		});
		return str;
	};

	/**
	* Returns the string representation of this source node along with a source
	* map.
	*/
	SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
		var generated = {
		code: "",
		line: 1,
		column: 0
		};
		var map = new SourceMapGenerator(aArgs);
		var sourceMappingActive = false;
		var lastOriginalSource = null;
		var lastOriginalLine = null;
		var lastOriginalColumn = null;
		var lastOriginalName = null;
		this.walk(function (chunk, original) {
		generated.code += chunk;
		if (original.source !== null
			&& original.line !== null
			&& original.column !== null) {
			if(lastOriginalSource !== original.source
			|| lastOriginalLine !== original.line
			|| lastOriginalColumn !== original.column
			|| lastOriginalName !== original.name) {
			map.addMapping({
				source: original.source,
				original: {
				line: original.line,
				column: original.column
				},
				generated: {
				line: generated.line,
				column: generated.column
				},
				name: original.name
			});
			}
			lastOriginalSource = original.source;
			lastOriginalLine = original.line;
			lastOriginalColumn = original.column;
			lastOriginalName = original.name;
			sourceMappingActive = true;
		} else if (sourceMappingActive) {
			map.addMapping({
			generated: {
				line: generated.line,
				column: generated.column
			}
			});
			lastOriginalSource = null;
			sourceMappingActive = false;
		}
		for (var idx = 0, length = chunk.length; idx < length; idx++) {
			if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
			generated.line++;
			generated.column = 0;
			// Mappings end at eol
			if (idx + 1 === length) {
				lastOriginalSource = null;
				sourceMappingActive = false;
			} else if (sourceMappingActive) {
				map.addMapping({
				source: original.source,
				original: {
					line: original.line,
					column: original.column
				},
				generated: {
					line: generated.line,
					column: generated.column
				},
				name: original.name
				});
			}
			} else {
			generated.column++;
			}
		}
		});
		this.walkSourceContents(function (sourceFile, sourceContent) {
		map.setSourceContent(sourceFile, sourceContent);
		});

		return { code: generated.code, map: map };
	};

	exports.SourceNode = SourceNode;


/***/ }
/******/ ])
});
;
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenizerFactory = void 0;
const parser_1 = require("./parser");
function tokenizerFactory({ reserved, caseInsensitive }) {
    /*function profileTbl(parser, name) {
        var tbl=parser._first.tbl;
        for (var c in tbl) {
            tbl[c].profile();//(c+" of "+tbl[name);
        }
    }*/
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
    var all = sp.create((st) => {
        var mode = REG;
        var res = [];
        while (true) {
            st = parsers[mode].parse(st);
            if (!st.success)
                break;
            var e = st.result[0];
            mode = posts[e.type];
            //console.log("Token",e, mode);
            res.push(e);
        }
        st = space.parse(st);
        //console.log(st.src.maxPos+"=="+st.src.str.length)
        const src = st.src;
        st = st.clone();
        if (st.pos === src.str.length) {
            st.error = null;
        }
        else {
            st.error = st.src.maxErrors.errors.join(" or ");
        }
        //st.success=st.src.maxPos==src.str.length;
        st.result[0] = res;
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

},{"./parser":20}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTonyu1 = void 0;
function isTonyu1(options) { return options && options.tonyu1; }
exports.isTonyu1 = isTonyu1;

},{}],25:[function(require,module,exports){
"use strict";
const tokenizerFactory_1 = require("./tokenizerFactory");
module.exports = (0, tokenizerFactory_1.tokenizerFactory)({
    caseInsensitive: true,
    reserved: {
        'while': true,
        'switch': true,
        'case': true,
        'default': true,
        'break': true,
        'if': true,
        'is': true,
        'in': true,
        'else': true,
        'null': true,
        'for': true,
        'fork': true,
        'function': true,
        'constructor': true,
        'destructor': true,
        'extends': true,
        'native': true,
        'new': true,
        'return': true,
        'var': true,
    }
});

},{"./tokenizerFactory":23}],26:[function(require,module,exports){
"use strict";
const tokenizerFactory_1 = require("./tokenizerFactory");
module.exports = (0, tokenizerFactory_1.tokenizerFactory)({
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

},{"./tokenizerFactory":23}],27:[function(require,module,exports){
// This is kowareta! because r.js does not generate module name:
//   define("FSLib",[], function () { ...
(function (d,f) {
module.exports=f();
})([],function () {
    var define,requirejs;
	var R={};
	var REQJS="REQJS_";
	var reqjsSeq=0;
	R.def=function (name, reqs,func) {
		var m=R.getModuleInfo(name);
		if (typeof reqs=="function") {
		    func=reqs;
		    reqs=R.reqsFromFunc(func);
    		R.setReqs( m, reqs);
    		m.func=function () {
    		    var module={exports:{}};
    			var res=func(R.doLoad,module,module.exports);
    			return res || module.exports;
    		};
		} else {
    		R.setReqs( m, reqs);
    		m.func=function () {
    			return func.apply(this, R.getObjs(reqs));
    		};
		}
		R.loadIfAvailable(m);
	};
	define=function (name,reqs,func) {
		R.def(name, reqs,func);
	};
	define.amd={};
	requirejs=function (reqs,func) {
		R.def(REQJS+(reqjsSeq++),reqs,func);
	};
	R.setReqs=function (m, reqs) {
		reqs.forEach(function (req) {
			var reqm=R.getModuleInfo(req);
			if (!reqm.loaded) {
				m.reqs[req]=reqm;
				reqm.revReqs[m.name]=m;
			}
		});
	};
	R.getModuleInfo=function (name) {
		var ms=R.modules;
		return ms[name]=ms[name]||{name:name,reqs:{},revReqs:{}};
	};
	R.doLoad=function (name) {
		var m=R.getModuleInfo(name);
		if (m.loaded) return m.obj;
		m.loaded=true;
		var res=m.func();
	    if ( res==null && !name.match(/^REQJS_/)) console.log("Warning: No obj for "+name);
		m.obj=res;
		for (var i in m.revReqs) {
			R.notifyLoaded(m.revReqs[i], m.name);
		}
		return res;
	};
	R.notifyLoaded=function (dependingMod, loadedModuleName) {
	    // depengindMod depends on loadedModule
		delete dependingMod.reqs[loadedModuleName];
		R.loadIfAvailable(dependingMod);
	};
	R.loadIfAvailable=function (m) {
		for (var i in m.reqs) {
			return;
		}
		R.doLoad(m.name);
	};
	R.getObjs=function (ary) {
		var res=[];
		ary.forEach(function (n) {
			var cur=R.doLoad(n);
			res.push(cur);
		});
		return res;
	};
	R.reqsFromFunc=function (f) {
	    var str=f+"";
	    var res=[];
	    str.replace(/require\s*\(\s*["']([^"']+)["']\s*\)/g,function (m,a) {
	       res.push(a);
	    });
	    return res;
	};
	R.modules={};
	//requireSimulator=R;
//----------
define('extend',[],function (){
   return function extend(d,s) {
      for (var i in s) {d[i]=s[i];}
      return d;
   };
});

define('assert',[],function () {
    var Assertion=function(failMesg) {
        this.failMesg=flatten(failMesg || "Assertion failed: ");
    };
    var $a;
    Assertion.prototype={
        _regedType:{},
        registerType: function (name,t) {
            this._regedType[name]=t;
        },
        MODE_STRICT:"strict",
        MODE_DEFENSIVE:"defensive",
        MODE_BOOL:"bool",
        fail:function () {
            var a=$a(arguments);
            var value=a.shift();
            a=flatten(a);
            a=this.failMesg.concat(value).concat(a);//.concat(["(mode:",this._mode,")"]);
            console.log.apply(console,a);
            if (this.isDefensive()) return value;
            if (this.isBool()) return false;
            throw new Error(a.join(" "));
        },
        subAssertion: function () {
            var a=$a(arguments);
            a=flatten(a);
            return new Assertion(this.failMesg.concat(a));
        },
        assert: function (t,failMesg) {
            if (!t) return this.fail(t,failMesg);
            return t;
        },
        eq: function (a,b) {
            if (a!==b) return this.fail(a,"!==",b);
            return this.isBool()?true:a;
        },
        ne: function (a,b) {
            if (a===b) return this.fail(a,"===",b);
            return this.isBool()?true:a;
        },
        isset: function (a, n) {
            if (a==null) return this.fail(a, (n||"")+" is null/undef");
            return this.isBool()?true:a;
        },
        is: function (value,type) {
            var t=type,v=value;
            if (t==null) {
                return this.fail(value, "assert.is: type must be set");
                // return t; Why!!!!???? because is(args,[String,Number])
            }
            if (t._assert_func) {
                t._assert_func.apply(this,[v]);
                return this.isBool()?true:value;
            }
            this.assert(value!=null,[value, "should be ",t]);
            if (t instanceof Array || (typeof global=="object" && typeof global.Array=="function" && t instanceof global.Array) ) {
                if (!value || typeof value.length!="number") {
                    return this.fail(value, "should be array:");
                }
                var self=this;
                for (var i=0 ;i<t.length; i++) {
                    var na=self.subAssertion("failed at ",value,"[",i,"]: ");
                    if (t[i]==null) {
                        console.log("WOW!7", v[i],t[i]);
                    }
                    na.is(v[i],t[i]);
                }
                return this.isBool()?true:value;
            }
            if (t===String || t=="string") {
                this.assert(typeof(v)=="string",[v,"should be a string "]);
                return this.isBool()?true:value;
            }
            if (t===Number || t=="number") {
                this.assert(typeof(v)=="number",[v,"should be a number"]);
                return this.isBool()?true:value;
            }
            if (t===Boolean || t=="boolean") {
                this.assert(typeof(v)=="boolean",[v,"should be a boolean"]);
                return this.isBool()?true:value;
            }
            if (t instanceof RegExp || (typeof global=="object" && typeof global.RegExp=="function" && t instanceof global.RegExp)) {
                this.is(v,String);
                this.assert(t.exec(v),[v,"does not match to",t]);
                return this.isBool()?true:value;
            }
            if (t===Function) {
                this.assert(typeof v=="function",[v,"should be a function"]);
                return this.isBool()?true:value;
            }
            if (typeof t=="function") {
                this.assert((v instanceof t),[v, "should be ",t]);
                return this.isBool()?true:value;
            }
            if (t && typeof t=="object") {
                for (var k in t) {
                    var na=this.subAssertion("failed at ",value,".",k,":");
                    na.is(value[k],t[k]);
                }
                return this.isBool()?true:value;
            }
            if (typeof t=="string") {
                var ty=this._regedType[t];
                if (ty) return this.is(value,ty);
                //console.log("assertion Warning:","unregistered type:", t, "value:",value);
                return this.isBool()?true:value;
            }
            return this.fail(value, "Invaild type: ",t);
        },
        ensureError: function (action, err) {
            try {
                action();
            } catch(e) {
                if(typeof err=="string") {
                    assert(e+""===err,action+" thrown an error "+e+" but expected:"+err);
                }
                console.log("Error thrown successfully: ",e.message);
                return;
            }
            this.fail(action,"should throw an error",err);
        },
        setMode:function (mode) {
            this._mode=mode;
        },
        isDefensive:function () {
            return this._mode===this.MODE_DEFENSIVE;
        },
        isBool:function () {
            return this._mode===this.MODE_BOOL;
        },
        isStrict:function () {
            return !this.isDefensive() && !this.isBool();
        }
    };
    $a=function (args) {
        var a=[];
        for (var i=0; i<args.length ;i++) a.push(args[i]);
        return a;
    };
    var top=new Assertion();
    var assert=function () {
        try {
            return top.assert.apply(top,arguments);
        } catch(e) {
            throw new Error(e.stack);
        }
    };
    ["setMode","isDefensive","is","isset","ne","eq","ensureError"].forEach(function (m) {
        assert[m]=function () {
            try {
                return top[m].apply(top,arguments);
            } catch(e) {
                console.log(e.stack);
                //if (top.isDefensive()) return arguments[0];
                //if (top.isBool()) return false;
                throw new Error(e.message);
            }
        };
    });
    assert.fail=top.fail.bind(top);
    assert.MODE_STRICT=top.MODE_STRICT;
    assert.MODE_DEFENSIVE=top.MODE_DEFENSIVE;
    assert.MODE_BOOL=top.MODE_BOOL;
    assert.f=function (f) {
        return {
            _assert_func: f
        };
    };
    assert.opt=function (t) {
        return assert.f(function (v) {
            return v==null || v instanceof t;
        });
    };
    assert.and=function () {
        var types=$a(arguments);
        assert(types instanceof Array);
        return assert.f(function (value) {
            var t=this;
            for (var i=0; i<types.length; i++) {
                t.is(value,types[i]);
            }
        });
    };
    function flatten(a) {
        if (a instanceof Array) {
            var res=[];
            a.forEach(function (e) {
                res=res.concat(flatten(e));
            });
            return res;
        }
        return [a];
    }
    function isArg(a) {
        return "length" in a && "caller" in a && "callee" in a;
    };
    return assert;
});

define('PathUtil',["assert"],function (assert) {
function endsWith(str,postfix) {
    assert.is(arguments,[String,String]);
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    assert.is(arguments,[String,String]);
    return str.substring(0, prefix.length)===prefix;
}
var driveLetter=/^([a-zA-Z]):/;
// hyphen on protocol -> chrome-extension://....
var url=/^([a-z\-]+):\/\/\/?([^\/]+)\//;
var PathUtil;
var Path=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isPath(s) , [s, " is not a path"]);
});
var Absolute=assert.f(function (s) {
    this.is(s,String);
    this.assert( PathUtil.isAbsolutePath(s) , [s, " is not a absolute path"]);
});
var Relative=assert.f(function (s) {
    this.is(s,String);
    this.assert( !PathUtil.isAbsolutePath(s) , [s, " is not a relative path"]);
});

var Dir=assert.f(function (s) {
    this.is(s,Path);
    this.assert( PathUtil.isDir(s) , [s, " is not a directory path"]);
});
var AbsDir=assert.and(Dir,Absolute);
var File=assert.f(function (s) {
    this.is(s,Path);
    this.assert( !PathUtil.isDir(s) , [s, " is not a file path"]);
});

var SEP="/";
PathUtil={
    Path: Path,Absolute:Absolute, Relative:Relative, Dir:Dir,File:File,
    AbsDir:AbsDir,
    SEP: SEP,
    endsWith: endsWith, startsWith:startsWith,
    isChildOf: function(child, parent) {
        return this.startsWith( this.normalize(child), this.normalize(parent));
    },
    normalize: function (path) {
        return this.fixSep(path,"/").replace(/\/+$/,"/");
    },
    hasDriveLetter: function (path) {
        return driveLetter.exec(path);
    },
    isURL: function (path) {
        var r=url.exec(path);
        if (!r) return;
        return {protocol:r[1], hostPort:r[2], path:SEP+path.substring(r[0].length)  };
    },
    isPath: function (path) {
    	assert.is(arguments,[String]);
		return true;//!path.match(/\/\//);
    },
    isRelativePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) && !PathUtil.isAbsolutePath(path);
    },
    isAbsolutePath: function (path) {
		assert.is(arguments,[String]);
		return PathUtil.isPath(path) &&
		(PathUtil.startsWith(path,SEP) || PathUtil.hasDriveLetter(path) ||  PathUtil.isURL(path));
    },
    isDir: function (path) {
        path=PathUtil.fixSep(path);
		assert.is(arguments,[Path]);
        return endsWith(path,SEP);
    },
    hasBackslashSep:function (path) {
        return path.indexOf("\\")>=0;
    },
    fixSep: function (path,to) {
        to=to||"/";
        assert.is(arguments,[String]);
        return assert.is( path.replace(/[\\\/]/g,to), Path);
    },
    directorify: function (path) {
        //path=PathUtil.fixSep(path);
        if (PathUtil.isDir(path)) return path;
        return assert.is(path+SEP, Dir);
    },
    filify: function (path) {
        //path=PathUtil.fixSep(path);
        if (!PathUtil.isDir(path)) return path;
        return assert.is(path.substring(0,path.length-1),File);
    },
	splitPath: function (path) {
		assert.is(arguments,[Path]);
		var u;
		if (u=this.isURL(path)) {
		    var p=this.splitPath(u.path);
		    p[0]=u.protocol+"://"+u.hostPort;
		    return p;
		}
		path=path.replace(/\/+/g,SEP);
	    var res=path.split(SEP);
        if (res[res.length-1]=="") {
            res[res.length-2]+=SEP;
            res.pop();
        }
        return res;
    },
    name: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.splitPath(path).pop();
    },
    ext: function(path) {
		assert.is(arguments,[String]);
        var n = PathUtil.name(path);
        var r = (/\.[a-zA-Z0-9]+$/).exec(n);
        if (r) return r[0];
        return null;
    },
    truncExt: function(path, ext) {
		assert.is(path,String);
        var name = PathUtil.name(path);
        ext=ext || PathUtil.ext(path);
        assert.is(ext,String);
        return name.substring(0, name.length - ext.length);
    },
    truncSEP: function (path) {
		assert.is(arguments,[Path]);
		if (!PathUtil.isDir(path)) return path;
		return path.substring(0,path.length-1);
    },
    endsWith: function(path, postfix) {
		assert.is(arguments,[String,String]);
        return endsWith(PathUtil.name(path), postfix);
    },
    parent: function(path) {
		assert.is(arguments,[String]);
        return PathUtil.up(path);
    },
    rel: function(path,relPath) {
        if (relPath=="") return path;
		assert.is(arguments,[AbsDir, Relative]);
    	var paths=PathUtil.splitPath(relPath);
        var resPath=path;
        resPath=resPath.replace(/\/$/,"");
        var t=PathUtil;
        paths.forEach(function (n) {
             if (n==".." || n=="../") resPath=t.up(resPath);
             else {
                 resPath=resPath.replace(/\/$/,"");
                 resPath+=SEP+(n=="."||n=="./" ? "": n);
             }
        });
        return resPath;
    },
    relPath: function(path,base) {
		assert.is(arguments,[Absolute,Absolute]);
        if (path.substring(0,base.length)!=base) {
            return "../"+PathUtil.relPath(path, this.up(base));
        }
        return path.substring(base.length);
    },
    up: function(path) {
        //path=PathUtil.fixSep(path);
        if (path==SEP) return null;
        var ps=PathUtil.splitPath(path);
        ps.pop();
        return ps.join(SEP)+SEP;
    }
};
["directorify", "filify", "splitPath", "name", "rel", "relPath", "up"].forEach(function (k) {
    var old=PathUtil[k];
    PathUtil[k]=function () {
        var backslashifyAfter=false;
        var a=Array.prototype.slice.call(arguments).map(function (e) {
            if (PathUtil.hasBackslashSep(e)) {
                backslashifyAfter=true;
                return PathUtil.fixSep(e);
            } else {
                return e;
            }
        });
        var res=old.apply(PathUtil,a);
        if (backslashifyAfter) {
            return PathUtil.fixSep(res,"\\");
        } else {
            return res;
        }
    };
});

PathUtil.isAbsolute=PathUtil.isAbsolutePath;
PathUtil.isRelative=PathUtil.isRelativePath;
if (typeof window=="object") window.PathUtil=PathUtil;
return PathUtil;
});

define('MIMETypes',[], function () {
   return {
      ".png":"image/png",
      ".gif":"image/gif",
      ".jpeg":"image/jpeg",
      ".jpg":"image/jpeg",
      ".ico":"image/icon",
      ".wav":"audio/x-wav",
      ".mp3":"audio/mp3",
      ".ogg":"audio/ogg",
      ".midi":"audio/midi",
      ".mid":"audio/midi",
      ".mzo":"audio/mzo",
      ".txt":"text/plain",
      ".html":"text/html",
      ".htm":"text/html",
      ".css":"text/css",
      ".js":"text/javascript",
      ".json":"text/json",
      ".zip":"application/zip",
      ".swf":"application/x-shockwave-flash",
      ".pdf":"application/pdf",
      ".doc":"application/word",
      ".xls":"application/excel",
      ".ppt":"application/powerpoint",
      '.docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      '.docm':'application/vnd.ms-word.document.macroEnabled.12',
      '.dotx':'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
      '.dotm':'application/vnd.ms-word.template.macroEnabled.12',
      '.xlsx':'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      '.xlsm':'application/vnd.ms-excel.sheet.macroEnabled.12',
      '.xltx':'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
      '.xltm':'application/vnd.ms-excel.template.macroEnabled.12',
      '.xlsb':'application/vnd.ms-excel.sheet.binary.macroEnabled.12',
      '.xlam':'application/vnd.ms-excel.addin.macroEnabled.12',
      '.pptx':'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      '.pptm':'application/vnd.ms-powerpoint.presentation.macroEnabled.12',
      '.potx':'application/vnd.openxmlformats-officedocument.presentationml.template',
      '.potm':'application/vnd.ms-powerpoint.template.macroEnabled.12',
      '.ppsx':'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
      '.ppsm':'application/vnd.ms-powerpoint.slideshow.macroEnabled.12',
      '.ppam':'application/vnd.ms-powerpoint.addin.macroEnabled.12',
      ".tonyu":"text/tonyu",
      ".c":"text/c",
      ".dtl":"text/dolittle"
   };
});

/*global window,self,global*/
define('root',[],function (){
    if (typeof window!=="undefined") return window;
    if (typeof self!=="undefined") return self;
    if (typeof global!=="undefined") return global;
    return (function (){return this;})();
});

define('DeferredUtil',["root"], function (root) {
    //  promise.then(S,F)  and promise.then(S).fail(F) is not same!
    //  ->  when fail on S,  F is executed?
    //   same is promise.then(S).then(same,F)
    var DU;
    var DUBRK=function(r){this.res=r;};
    function same(e){return e;}
    DU={
        isNativePromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise!=="function") && (typeof p.catch==="function") ;
        },
        isJQPromise: function (p) {
            return p && (typeof p.then==="function") &&
            (typeof p.promise==="function") &&(typeof p.fail==="function") ;
        },
        isPromise: function (p) {
            return p && (typeof p.then==="function") &&
            ((typeof p.promise==="function") || (typeof p.catch==="function")) ;
        },
        all: function (a) {
            //var a=Array.prototype.slice.call(arguments);
            return DU.promise(function (succ,fail) {
                var res=[],rest=a.length;
                a.forEach(function (p, i) {
                    DU.resolve(p).then(function (r) {
                        res[i]=r;
                        rest--;
                        if (rest===0) {
                            succ(res);
                        }
                    },fail);
                });
            });
        },
        resolve: function (p) {
            if (DU.config.useJQ && DU.isJQPromise(p)) return p;
            if (!DU.config.useJQ && DU.isNativePromise(p)) return p;
            return DU.promise(function (succ,fail) {
                if (DU.isPromise(p)) {
                    p.then(succ,fail);
                } else {
                    succ(p);
                }
            });
            /*if (DU.isPromise(p)) { // NO! it returns Promise when using JQPromise and vise versa.
                return f;
            }
            if (DU.confing.useJQ) {
                return $.when(p);
            }*/
        },
        throwNowIfRejected: function (p) {
            // If Promise p has already rejected, throws the rejeceted reason immediately.
            var state;
            var err;
            var res=p.then(function (r) {
                if (!state) {
                    state="resolved";
                }
                return r;
            },function (e) {
                if (!state) {
                    state="rejected";
                    err=e;
                } else {
                    return DU.reject(e);
                }
            });
            if (!state) state="notyet";
            if (state==="rejected") throw err;
            return res;
        },
        assertResolved: function (p) {
            var res,resolved;
            p.then(function (r) {
                res=r;
                resolved=true;
            });
            if (!resolved) {
                throw new Error("Promise not resolved");
            }
            return res;
        },
        /*toJQPromise: function (p) {// From native Promise
            if (!p) return $.when(p);
            if ($.isFunction(p.promise)) return p;
            if (!$.isFunction(p.then) || !$.isFunction(p.catch)) return $.when(p);
            var d=new $.Deferred();
            p.then(function (r) {
                d.resolve(r);
            }).catch(function (r) {
                d.reject(r);
            });
            return d.promise();
        },*/
        ensureDefer: function (v) {
            return DU.promise(function (resolve,reject) {
                var isDeferred;
                DU.resolve(v).then(function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            resolve(r);
                        },0);
                    } else {
                        resolve(r);
                    }
                }).then(same,function (r) {
                    if (!isDeferred) {
                        setTimeout(function () {
                            reject(r);
                        },0);
                    } else {
                        reject(r);
                    }
                });
                isDeferred=true;
            });
        },
        directPromise:function (v) {
            return DU.timeout(v,0);
        },
        then: function (f) {
            return DU.directPromise().then(f);
        },
        timeout:function (timeout,value) {
            return DU.promise(function (resolve) {
                setTimeout(function () {resolve(value);},timeout||0);
            });
        },
        funcPromise:function (f) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                try {
                    f(function (v) {
                        d.resolve(v);
                    },function (e) {
                        d.reject(e);
                    });
                }catch(e) {
                    d.reject(e);
                }
                return d.promise();
            } else if (DU.external.Promise) {
                return new DU.external.Promise(function (resolve,reject) {
                    try {
                        f(resolve,reject);
                    }catch(e) {
                        reject(e);
                    }
                });
            } else {
                throw new Error("promise is not found");
            }
        },
        reject: function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                d.reject(e);
                return d.promise();
            } else {
                return new DU.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
        },
        throwPromise:function (e) {
            if (DU.config.useJQ) {
                var d=new $.Deferred();
                setTimeout(function () {
                    d.reject(e);
                }, 0);
                return d.promise();
            } else {
                return new DU.external.Promise(function (s,rej) {
                    rej(e);
                });
            }
        },
        throwF: function (f) {
            return function () {
                try {
                    return f.apply(this,arguments);
                } catch(e) {
                    console.log(e,e.stack);
                    return DU.throwPromise(e);
                }
            };
        },
        each: function (set,f) {
            if (set instanceof Array) {
                return DU.loop(function (i) {
                    if (i>=set.length) return DU.brk();
                    return DU.resolve(f(set[i],i)).then(function () {
                        return i+1;
                    });
                },0);
            } else {
                var objs=[];
                for (var i in set) {
                    objs.push({k:i,v:set[i]});
                }
                return DU.each(objs,function (e) {
                    return f(e.k, e.v);
                });
            }
        },
        loop: function (f,r) {
            try {
                var err;
                while(true) {
                    if (r instanceof DUBRK) return DU.when1(r.res);
                    var deff1=true, deff2=false;
                    // ★ not deffered  ☆  deferred
                    var r1=f(r);
                    var dr=DU.resolve(r1).then(function (r2) {
                        r=r2;
                        deff1=false;
                        if (r instanceof DUBRK) return r.res;
                        if (deff2) return DU.loop(f,r); //☆
                    }).then(same,function (e) {
                        deff1=false;
                        err=e;
                    });
                    if (err) throw err;
                    deff2=true;
                    if (deff1) return dr;//☆
                    //★
                }
            }catch (e) {
                return DU.reject(e);
            }
        },
        brk: function (res) {
            return new DUBRK(res);
        },
        tryLoop: function (f,r) {
            return DU.loop(DU.tr(f),r);
        },
        tryEach: function (s,f) {
            return DU.loop(s,DU.tr(f));
        },
        documentReady:function () {
            return DU.callbackToPromise(function (s) {$(s);});
        },
        requirejs:function (modules) {
            if (!root.requirejs) throw new Error("requirejs is not loaded");
            return DU.callbackToPromise(function (s) {
                root.requirejs(modules,s);
            });
        }
    };
    DU.NOP=function (r) {return r;};
    DU.E=function () {
        console.log("DUE",arguments);
        DU.errorHandler.apply(DU,arguments);
    };
    DU.errorHandler=function (e) {
        console.error.apply(console,arguments);
        alert(e);
    };
    DU.setE=function (f) {
        DU.errorHandler=f;
    };
    DU.begin=DU.try=DU.tr=DU.throwF;
    DU.promise=DU.callbackToPromise=DU.funcPromise;
    DU.when1=DU.resolve;
    DU.config={};
    if (root.$ && root.$.Deferred) {
        DU.config.useJQ=true;
    }
    DU.external={Promise:root.Promise};
    if (!root.DeferredUtil) root.DeferredUtil=DU;
    return DU;
});

define('FSClass',["extend","PathUtil","MIMETypes","assert","DeferredUtil"],
function (extend, P, M,assert,DU){
    var FS=function () {
    };
    var fstypes={};
    FS.addFSType=function (name,fsgen) {
        fstypes[name]=fsgen;
    };
    FS.availFSTypes=function () {
        return fstypes;
    };
    function stub(n) {
        throw new Error (n+" is STUB!");
    }
    extend(FS.prototype, {
        err: function (path, mesg) {
            throw new Error(path+": "+mesg);
        },
        fstype:function () {
            return "Unknown";
        },
        isReadOnly: function (path, options) {// mainly for check ENTIRELY read only
            stub("isReadOnly");
        },
        supportsSync: function () {
            return true;
        },
        resolveFS:function (path, options) {
            assert(this.getRootFS()!==this);
            return this.getRootFS().resolveFS(path);
        },
        mounted: function (rootFS, mountPoint ) {
            //assert.is(arguments,[FS,P.AbsDir]);
            this.rootFS=rootFS;
            this.mountPoint=mountPoint;
        },
        inMyFS:function (path) {
            return !this.mountPoint || P.startsWith(path, this.mountPoint);
        },
        /*dirFromFstab: function (path, options) {
            assert.is(path, P.AbsDir);
            var res=(options||{}).res || [];
            this.fstab().forEach(function (tb) {
                if (P.up( tb.path )==path) res.push(P.name(tb.path));
            });
            return res;
        },*/
        getRootFS: function () {
            return assert( this.rootFS, "rootFS is not set" );
        },
        //-------- end of mouting
        //-------- spec
        getReturnTypes: function (path, options) {
            //{getContent:String|DataURL|ArrayBuffer|OutputStream|Writer
            //   ,opendir:Array|...}
            stub("");
        },
        //-------  for file
        getContent: function (path, options) {
            // options:{type:String|DataURL|ArrayBuffer|OutputStream|Writer}
            // succ : [type],
            stub("getContent");
        },
        size: function (path) {
            var c=this.getContent(path,{type:ArrayBuffer});
            var l=c.toBin().byteLength;
            return l;
        },
        getContentAsync: function (path, options) {
            if (!this.supportsSync()) stub("getContentAsync");
            return DU.resolve(this.getContent.apply(this,arguments));
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        setContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("setContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.setContent(path,content,options));
            });
        },
        appendContent: function (path, content, options) {
            //var nc=this.getContent(path,options).toPlainText()+content.toPlainText();
            //return this.setContent(path, Content.fromPlainText(nc) , options);
            stub("");
        },
        appendContentAsync: function (path, content, options) {
            var t=this;
            if (!t.supportsSync()) stub("appendContentAsync");
            return DU.resolve(content).then(function (content) {
                return DU.resolve(t.appendContent(path,content,options));
            });
        },
        getMetaInfo: function (path, options) {
            stub("");
        },
        setMetaInfo: function (path, info, options) {
            stub("");
        },
        mkdir: function (path, options) {
            stub("mkdir");
        },
        touch: function (path) {
            stub("touch");
        },
        exists: function (path, options) {
            // exists return false if path is existent by follwing symlink
            stub("exists");
        },
        opendir: function (path, options) {
            //ret: [String] || Stream<string> // https://nodejs.org/api/stream.html#stream_class_stream_readable
            stub("opendir");
        },
        opendirAsync: function (path, options) {
            if (!this.supportsSync()) stub("opendirAsync");
            return DU.resolve(this.opendir.apply(this,arguments));
        },
        cp: function(path, dst, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertExist(path);
            options=options||{};
            var srcIsDir=this.isDir(path);
            var dstfs=this.getRootFS().resolveFS(dst);
            var dstIsDir=dstfs.isDir(dst);
            if (!srcIsDir && !dstIsDir) {
                if (this.supportsSync() && dstfs.supportsSync()) {
                    var cont=this.getContent(path);
                    var res=dstfs.setContent(dst,cont);
                    if (options.a) {
                        dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                    }
                    return res;
                } else {
                    return dstfs.setContentAsync(
                            dst,
                            this.getContentAsync(path)
                    ).then(function (res) {
                        if (options.a) {
                            return dstfs.setMetaInfo(dst, this.getMetaInfo(path));
                        }
                        return res;
                    });
                }
            } else {
                throw new Error("only file to file supports");
            }
        },
        mv: function (path,to,options) {
            this.cp(path,to,options);
            return this.rm(path,{r:true});
        },
        rm:function (path, options) {
            stub("");
        },
        link: function (path, to, options) {
            throw new Error("ln "+to+" "+path+" : This FS not support link.");
        },
        getURL: function (path) {
            stub("");
        },
        onAddObserver: function (path) {
        }
    });
    //res=[]; for (var k in a) { res.push(k); } res;
    FS.delegateMethods=function (prototype,  methods) {
        for (var n in methods) {
            (function (n){
                assert.ne(n,"inMyFS");
                prototype[n]=function () {
                    var path=arguments[0];
                    assert.is(path,P.Absolute);
                    var fs=this.resolveFS(path);
                    //console.log(n, f.fs===this  ,f.fs, this);
                    if (fs!==this) {
                        console.log("Invoked for other fs",this.mountPoint, fs.mountPoint)
                        //arguments[0]=f.path;
                        return fs[n].apply(fs, arguments);
                    } else {
                        return methods[n].apply(this, arguments);
                    }
                };
            })(n);
        }
    };
    FS.delegateMethods(FS.prototype, {
        assertWriteable: function (path) {
            if (this.isReadOnly(path)) this.err(path, "read only.");
        },
        getContentType: function (path, options) {
            var e=(P.ext(path)+"").toLowerCase();
            return M[e] || (options||{}).def || "application/octet-stream";
        },
        getBlob: function (path, options) {
            var c=this.getContent(path);
            options=options||{};
            options.blobType=options.blobType||Blob;
            options.binType=options.binType||ArrayBuffer;
            if (c.hasPlainText()) {
                return new options.blobType([c.toPlainText()],this.getContentType(path));
            } else {
                return new options.blobType([c.toBin(options.binType)],this.getContentType(path));
            }
        },
        isText:function (path) {
            var m=this.getContentType(path);
            return P.startsWith( m, "text");
        },
        assertExist: function (path, options) {
            if (!this.exists(path, options)) {
                this.err(path, ": No such "+(P.isDir(path)?"directory":"file"));
            }
        },
        isDir: function (path,options) {
            return P.isDir(path);
        },
        find: function (path, options) {
            assert.is(arguments,[P.Absolute]);
            var ls=this.opendir(path, options);
            var t=this;
            var res=[path];
            ls.forEach(function (e) {
                var ep=P.rel(path, e);
                if (P.isDir(ep)) {
                    var fs=t.resolveFS(ep);
                    res=res.concat(
                            fs.find( ep ,options)
                    );
                } else {
                    res.push( ep );//getPathFromRootFS
                }
            });
            return res;
        },
        resolveLink: function (path) {
            assert.is(path,P.Absolute);
            // returns non-link path
            // ln -s /a/b/ /c/d/
            // resolveLink /a/b/    ->  /a/b/
            // resolveLink /c/d/e/f -> /a/b/e/f
            // resolveLink /c/d/non_existent -> /a/b/non_existent
            // isLink      /c/d/    -> /a/b/
            // isLink      /c/d/e/f -> null
            // ln /testdir/ /ram/files/
            // resolveLink /ram/files/sub/test2.txt -> /testdir/sub/test2.txt
            // path=/ram/files/test.txt
            for (var p=path ; p ; p=P.up(p)) {
                assert(!this.mountPoint || P.startsWith(p, this.mountPoint), p+" is out of mountPoint. path="+path);
                var l=this.isLink(p);  // p=/ram/files/ l=/testdir/
                if (l) {
                    assert(l!=p,"l==p=="+l);
                    //        /testdir/    test.txt
                    var np=P.rel(l,P.relPath(path, p));  //   /testdir/test.txt
                    assert(np!=path,"np==path=="+np);
                    return assert.is(this.getRootFS().resolveFS(np).resolveLink(np),P.Absolute)  ;
                }
                if (this.exists(p)) return path;
            }
            return path;
        },
        isLink: function (path) {
            return null;
        },
        opendirEx: function (path, options) {
            assert.is(path, P.AbsDir);
            var ls=this.opendir(path);
            var t=this;
            var dest={};
            ls.forEach(function (f) {
                var p=P.rel(path,f);
                dest[f]=t.getMetaInfo(p);
            });
            return dest;
        },
        getDirTree: function (path, options) {
            options=options||{};
            var dest=options.dest=options.dest||{};
            options.style=options.style||"flat-absolute";
            options.excludes=options.excludes||[];
            assert.is(options.excludes,Array);
            if (!options.base) {
                options.base=path;
            }
            assert.is(path, P.AbsDir);
            var tr=this.opendirEx(path,options);
            if (options.style=="no-recursive") return tr;
            var t=this;
            for (var f in tr) {
                var meta=tr[f];
                var p=P.rel(path,f);
                var relP=P.relPath(p,options.base);
                switch(options.style) {
                    case "flat-relative":
                    case "hierarchical":
                        if (options.excludes.indexOf(relP)>=0) {
                            continue;
                        }
                        break;
                    case "flat-absolute":
                        if (options.excludes.indexOf(p)>=0) {
                            continue;
                        }
                        break;
                }
                if (t.isDir(p)) {
                    switch(options.style) {
                    case "flat-absolute":
                    case "flat-relative":
                        t.getDirTree(p,options);
                        break;
                    case "hierarchical":
                        options.dest={};
                        dest[f]=t.getDirTree(p,options);
                        break;
                    }
                } else {
                    switch(options.style) {
                    case "flat-absolute":
                        dest[p]=meta;
                        break;
                    case "flat-relative":
                        dest[relP]=meta;
                        break;
                    case "hierarchical":
                        dest[f]=meta;
                        break;
                    }
                }
            }
            return dest;
        }
        /*get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }*/

    });
    return FS;
});

define('Util',[],function () {
function getQueryString(key, default_)
{
   if (default_==null) default_="";
   key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
   var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
   var qs = regex.exec(window.location.href);
   if(qs == null)
    return default_;
   else
    return decodeURLComponentEx(qs[1]);
}
function decodeURLComponentEx(s){
    return decodeURIComponent(s.replace(/\+/g, '%20'));
}
function endsWith(str,postfix) {
    return str.substring(str.length-postfix.length)===postfix;
}
function startsWith(str,prefix) {
    return str.substring(0, prefix.length)===prefix;
}
function privatize(o){
    if (o.__privatized) return o;
    var res={__privatized:true};
    for (var n in o) {
        (function (n) {
            var m=o[n];
            if (n.match(/^_/)) return;
            if (typeof m!="function") return;
            res[n]=function () {
                var r=m.apply(o,arguments);
                return r;
            };
        })(n);
    }
    return res;
}
function extend(d,s) {
    for (var i in (s||{})) {d[i]=s[i];}
    return d;
}
return {
    getQueryString:getQueryString,
    endsWith: endsWith, startsWith: startsWith,
    privatize: privatize,extend:extend
};
});

/*
* FileSaver.js
* A saveAs() FileSaver implementation.
*
* By Eli Grey, http://eligrey.com
*
* License : https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md (MIT)
* source  : http://purl.eligrey.com/github/FileSaver.js
*/
define('FileSaver',[],function (){

// The one and only way of getting global scope in all environments
// https://stackoverflow.com/q/3277182/1008999
var _global = typeof window === 'object' && window.window === window
  ? window : typeof self === 'object' && self.self === self
  ? self : typeof global === 'object' && global.global === global
  ? global
  : this

function bom (blob, opts) {
  if (typeof opts === 'undefined') opts = { autoBom: false }
  else if (typeof opts !== 'object') {
    console.warn('Depricated: Expected third argument to be a object')
    opts = { autoBom: !opts }
  }

  // prepend BOM for UTF-8 XML and text/* types (including HTML)
  // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
  if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
    return new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type })
  }
  return blob
}

function download (url, name, opts) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)
  xhr.responseType = 'blob'
  xhr.onload = function () {
    saveAs(xhr.response, name, opts)
  }
  xhr.onerror = function () {
    console.error('could not download file')
  }
  xhr.send()
}

function corsEnabled (url) {
  var xhr = new XMLHttpRequest()
  // use sync to avoid popup blocker
  xhr.open('HEAD', url, false)
  xhr.send()
  return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
  try {
    node.dispatchEvent(new MouseEvent('click'))
  } catch (e) {
    var evt = document.createEvent('MouseEvents')
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
                          20, false, false, false, false, 0, null)
    node.dispatchEvent(evt)
  }
}

var saveAs = _global.saveAs ||
// probably in some web worker
(typeof window !== 'object' || window !== _global)
  ? function saveAs () { /* noop */ }

// Use download attribute first if possible (#193 Lumia mobile)
: 'download' in HTMLAnchorElement.prototype
? function saveAs (blob, name, opts) {
  var URL = _global.URL || _global.webkitURL
  var a = document.createElement('a')
  name = name || blob.name || 'download'

  a.download = name
  a.rel = 'noopener' // tabnabbing

  // TODO: detect chrome extensions & packaged apps
  // a.target = '_blank'

  if (typeof blob === 'string') {
    // Support regular links
    a.href = blob
    if (a.origin !== location.origin) {
      corsEnabled(a.href)
        ? download(blob, name, opts)
        : click(a, a.target = '_blank')
    } else {
      click(a)
    }
  } else {
    // Support blobs
    a.href = URL.createObjectURL(blob)
    setTimeout(function () { URL.revokeObjectURL(a.href) }, 4E4) // 40s
    setTimeout(function () { click(a) }, 0)
  }
}

// Use msSaveOrOpenBlob as a second approach
: 'msSaveOrOpenBlob' in navigator
? function saveAs (blob, name, opts) {
  name = name || blob.name || 'download'

  if (typeof blob === 'string') {
    if (corsEnabled(blob)) {
      download(blob, name, opts)
    } else {
      var a = document.createElement('a')
      a.href = blob
      a.target = '_blank'
      setTimeout(function () { click(a) })
    }
  } else {
    navigator.msSaveOrOpenBlob(bom(blob, opts), name)
  }
}

// Fallback to using FileReader and a popup
: function saveAs (blob, name, opts, popup) {
  // Open a popup immediately do go around popup blocker
  // Mostly only avalible on user interaction and the fileReader is async so...
  popup = popup || open('', '_blank')
  if (popup) {
    popup.document.title =
    popup.document.body.innerText = 'downloading...'
  }

  if (typeof blob === 'string') return download(blob, name, opts)

  var force = blob.type === 'application/octet-stream'
  var isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari
  var isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent)

  if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
    // Safari doesn't allow downloading of blob urls
    var reader = new FileReader()
    reader.onloadend = function () {
      var url = reader.result
      url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;')
      if (popup) popup.location.href = url
      else location = url
      popup = null // reverse-tabnabbing #460
    }
    reader.readAsDataURL(blob)
  } else {
    var URL = _global.URL || _global.webkitURL
    var url = URL.createObjectURL(blob)
    if (popup) popup.location = url
    else location.href = url
    popup = null // reverse-tabnabbing #460
    setTimeout(function () { URL.revokeObjectURL(url) }, 4E4) // 40s
  }
}

_global.saveAs = saveAs.saveAs = saveAs

if (typeof module !== 'undefined') {
  module.exports = saveAs;
}
return saveAs;
});

define('Content',["assert","Util","FileSaver"],function (assert,Util,saveAs) {
    var Content=function () {};
    var extend=Util.extend;
    // ------ constructor
    Content.plainText=function (s,contentType){
        var b=new Content;
        b.contentType=contentType||"text/plain";
        b.plain=s;
        return b;
    };
    Content.url=function (s) {
        var b=new Content;
        b.url=s;
        return b;
    };
    Content.buffer2ArrayBuffer = function (a) {
        if (Content.isBuffer(a)) {
            var u=new Uint8Array(a);
            var r=u.buffer;
            if (r instanceof ArrayBuffer) return r;
            var ary=Array.prototype.slice.call(u);
            return assert(new Uint8Array(ary).buffer,"n2a: buf is not set");
        }
        return assert(a,"n2a: a is not set");
    };
    Content.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return assert(a,"a2n: a is not set");
    };

    Content.bin=function (bin, contentType) {
        assert(contentType, "contentType should be set");
        var b=new Content;
        if (Content.isNodeBuffer(bin)) {
            b.bufType="node";
            b.nodeBuffer=bin;
        } else if (bin instanceof ArrayBuffer) {
            b.bufType="array2";
            b.arrayBuffer=bin;
        } else if (bin && Content.isBuffer(bin.buffer)) {
            // in node.js v8.9.1 ,
            ///  bin is Buffer, bin.buffer is ArrayBuffer
            //   and bin.buffer is content of different file(memory leak?)
            b.bufType="array1";
            b.arrayBuffer=bin.buffer;
        } else {
            throw new Error(bin+" is not a bin");
        }
        b.contentType=contentType;
        return b;
    };
    Content.looksLikeDataURL=function (text) {
        return text.match(/^data:/);
    };
    Content.download=saveAs;
    // why blob is not here... because blob content requires FileReader (cannot read instantly!)
    //------- methods
    var p=Content.prototype;
    p.toBin = function (binType) {
        binType=binType || (Content.hasNodeBuffer() ? Buffer: ArrayBuffer);
        if (this.nodeBuffer) {
            if (binType===Buffer) {
                return this.nodeBuffer;
            } else {
                return this.arrayBuffer=( Content.buffer2ArrayBuffer(this.nodeBuffer) );
            }
        } else if (this.arrayBuffer) {
            if (binType===ArrayBuffer) {
                return this.arrayBuffer;
            } else {
                return this.nodeBuffer=( Content.arrayBuffer2Buffer(this.arrayBuffer) );
            }
        } else if (this.url) {
            var d=new DataURL(this.url, binType);
            return this.setBuffer(d.buffer);
        } else if (this.plain!=null) {
            return this.setBuffer( Content.str2utf8bytes(this.plain, binType) );
        }
        throw new Error("No data");
    };
    p.setBuffer=function (b) {
        assert(b,"b is not set");
        if (Content.isNodeBuffer(b)) {
            return this.nodeBuffer=b;
        } else {
            return this.arrayBuffer=b;
        }
    };
    p.toArrayBuffer=function () {
        return this.toBin(ArrayBuffer);
    };
    p.toNodeBuffer=function () {
        return this.toBin(Buffer);
    };
    p.toURL=function () {
        if (this.url) {
            return this.url;
        } else {
            if (!this.arrayBuffer && this.plain!=null) {
                this.arrayBuffer=Content.str2utf8bytes(this.plain,ArrayBuffer);
            }
            if (this.arrayBuffer || this.nodeBuffer) {
                var d=new DataURL(this.arrayBuffer || this.nodeBuffer,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.hasPlainText()) {
            return this.plain;
        } else {
            if (this.url && !this.hasBin() ) {
                var d=new DataURL(this.url,ArrayBuffer);
                this.arrayBuffer=d.buffer;
            }
            if (this.hasBin()) {
                return this.plain=Content.utf8bytes2str(
                        this.nodeBuffer || new Uint8Array(this.arrayBuffer)
                );
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.nodeBuffer || this.arrayBuffer;};
    p.hasNodeBuffer= function () {return this.nodeBuffer;};
    p.hasArrayBuffer= function () {return this.arrayBuffer;};
    p.toBlob=function () {
        return new Blob([this.toBin(ArrayBuffer)],{type:this.contentType});
    };
    p.download=function (name) {
        Content.download(this.toBlob(),name);
    };
    //--------Util funcs
    // From http://hakuhin.jp/js/base64.html#BASE64_DECODE_ARRAY_BUFFER
    Content.Base64_To_ArrayBuffer=function (base64,binType){
	    var A=binType||ArrayBuffer;
        base64=base64.replace(/[\n=]/g,"");
        var dic = new Object();
        dic[0x41]= 0; dic[0x42]= 1; dic[0x43]= 2; dic[0x44]= 3; dic[0x45]= 4; dic[0x46]= 5; dic[0x47]= 6; dic[0x48]= 7; dic[0x49]= 8; dic[0x4a]= 9; dic[0x4b]=10; dic[0x4c]=11; dic[0x4d]=12; dic[0x4e]=13; dic[0x4f]=14; dic[0x50]=15;
        dic[0x51]=16; dic[0x52]=17; dic[0x53]=18; dic[0x54]=19; dic[0x55]=20; dic[0x56]=21; dic[0x57]=22; dic[0x58]=23; dic[0x59]=24; dic[0x5a]=25; dic[0x61]=26; dic[0x62]=27; dic[0x63]=28; dic[0x64]=29; dic[0x65]=30; dic[0x66]=31;
        dic[0x67]=32; dic[0x68]=33; dic[0x69]=34; dic[0x6a]=35; dic[0x6b]=36; dic[0x6c]=37; dic[0x6d]=38; dic[0x6e]=39; dic[0x6f]=40; dic[0x70]=41; dic[0x71]=42; dic[0x72]=43; dic[0x73]=44; dic[0x74]=45; dic[0x75]=46; dic[0x76]=47;
        dic[0x77]=48; dic[0x78]=49; dic[0x79]=50; dic[0x7a]=51; dic[0x30]=52; dic[0x31]=53; dic[0x32]=54; dic[0x33]=55; dic[0x34]=56; dic[0x35]=57; dic[0x36]=58; dic[0x37]=59; dic[0x38]=60; dic[0x39]=61; dic[0x2b]=62; dic[0x2f]=63;
        var num = base64.length;
        var n = 0;
        var b = 0;
        var e;

        if(!num) return (new A(0));
        //if(num < 4) return null;
        //if(num % 4) return null;

        // AA     12    1
        // AAA    18    2
        // AAAA   24    3
        // AAAAA  30    3
        // AAAAAA 36    4
        // num*6/8
        e = Math.floor(num / 4 * 3);
        if(base64.charAt(num - 1) == '=') e -= 1;
        if(base64.charAt(num - 2) == '=') e -= 1;

        var ary_buffer = new A( e );
        var ary_u8 = (Content.isNodeBuffer(ary_buffer) ? ary_buffer : new Uint8Array( ary_buffer ));//new Uint8Array( ary_buffer );
        var i = 0;
        var p = 0;
        while(p < e){
            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i));//return null;
            n = (b << 2);
            i ++;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | ((b >> 4) & 0x3);
            n = (b & 0x0f) << 4;
            i ++;
            p ++;
            if(p >= e) break;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | ((b >> 2) & 0xf);
            n = (b & 0x03) << 6;
            i ++;
            p ++;
            if(p >= e) break;

            b = dic[base64.charCodeAt(i)];
            if(b === undefined) fail("Invalid letter: "+base64.charCodeAt(i))
            ary_u8[p] = n | b;
            i ++;
            p ++;
        }
        function fail(m) {
            console.log(m);
            console.log(base64,i);
            throw new Error(m);
        }
        return ary_buffer;
    };

    Content.Base64_From_ArrayBuffer=function (ary_buffer){
        var dic = [
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P',
            'Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f',
            'g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v',
            'w','x','y','z','0','1','2','3','4','5','6','7','8','9','+','/'
        ];
        var base64 = "";
        var ary_u8 = new Uint8Array( ary_buffer );
        var num = ary_u8.length;
        var n = 0;
        var b = 0;

        var i = 0;
        while(i < num){
            b = ary_u8[i];
            base64 += dic[(b >> 2)];
            n = (b & 0x03) << 4;
            i ++;
            if(i >= num) break;

            b = ary_u8[i];
            base64 += dic[n | (b >> 4)];
            n = (b & 0x0f) << 2;
            i ++;
            if(i >= num) break;

            b = ary_u8[i];
            base64 += dic[n | (b >> 6)];
            base64 += dic[(b & 0x3f)];
            i ++;
        }

        var m = num % 3;
        if(m){
            base64 += dic[n];
        }
        if(m == 1){
            base64 += "==";
        }else if(m == 2){
            base64 += "=";
        }
        return base64;
    };

    Content.hasNodeBuffer=function () {
        return typeof Buffer!="undefined";
    };
    Content.isNodeBuffer=function (data) {
        return (Content.hasNodeBuffer() && data instanceof Buffer);
    };
    Content.isBuffer=function (data) {
        return data instanceof ArrayBuffer || Content.isNodeBuffer(data);
    };
    Content.utf8bytes2str=function (bytes) {
        var e=[];
        for (var i=0 ; i<bytes.length ; i++) {
             e.push("%"+("0"+bytes[i].toString(16)).slice(-2));
        }
        //try {
            return decodeURIComponent(e.join(""));
        /*} catch (er) {
            console.log(e.join(""));
            throw er;
        }*/
    };
    Content.str2utf8bytes=function (str, binType) {
        var e=encodeURIComponent(str);
        var r=/^%(..)/;
        var a=[];
        var ad=0;
        for (var i=0 ; i<e.length; i++) {
            var m=r.exec( e.substring(i));
            if (m) {
                a.push(parseInt("0x"+m[1]));
                i+=m[0].length-1;
            } else a.push(e.charCodeAt(i));
        }
        return (typeof Buffer!="undefined" && binType===Buffer ? new Buffer(a) : new Uint8Array(a).buffer);
    };
    //-------- DataURL
    var A=Content.hasNodeBuffer() ? Buffer :ArrayBuffer;
    //var isBuffer=Util.isBuffer;
    var DataURL=function (data, contentType){
      // data: String/Array/ArrayBuffer
      if (typeof data=="string") {
          this.url=data;
          this.binType=contentType || A;
          this.dataURL2bin(data);
      } else if (data && Content.isBuffer(data.buffer)) {
          this.buffer=data.buffer;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else if (Content.isBuffer(data)) {
          this.buffer=data;
          assert.is(contentType,String);
          this.contentType=contentType;
          this.bin2dataURL(this.buffer, this.contentType);
      } else {
          console.log(arguments);
          assert.fail("Invalid args: ",arguments);
      }
   };
   Content.DataURL=DataURL;
   extend(DataURL.prototype,{
      bin2dataURL: function (b, contentType) {
          assert(Content.isBuffer(b));
          assert.is(contentType,String);
  	     var head=this.dataHeader(contentType);
	     var base64=Content.Base64_From_ArrayBuffer(b);
	     assert.is(base64,String);
	     return this.url=head+base64;
	  },
	  dataURL2bin: function (dataURL) {
          assert.is(arguments,[String]);
	      var reg=/^data:([^;]+);base64,/i;
	      var r=reg.exec(dataURL);
	      assert(r, ["malformed dataURL:", dataURL] );
	      this.contentType=r[1];
	      this.buffer=Content.Base64_To_ArrayBuffer(dataURL.substring(r[0].length) , this.binType);
          return assert.is(this.buffer , this.binType);
  	  },
  	  dataHeader: function (ctype) {
	      assert.is(arguments,[String]);
	      return "data:"+ctype+";base64,";
   	  },
   	  toString: function () {return assert.is(this.url,String);}
   });

    return Content;
});

/*global process, global, Buffer, requirejs, require*/
define('NativeFS',["FSClass","assert","PathUtil","extend","Content"],
        function (FS,A,P,extend,Content) {
    var assert=A,fs;
    const requireTries=[
        ()=>require("fs"),()=>requirejs.nodeRequire("fs"),()=>global.require("fs")
    ];
    for (let fsf of requireTries) {
        try {
            fs=fsf();
            fs.existsSync('test.txt');
            process.cwd();// fails here in NW.js Worker( fs is OK, process is absent)
            break;
        } catch(e){fs=null;}
    }
    if (!fs) {
        return function () {
            throw new Error("This system not support native FS");
        };
    }
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    var hasDriveLetter=P.hasDriveLetter(process.cwd());
    NativeFS.available=true;
    var SEP=P.SEP;
    //var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS();
    Pro.toNativePath = function (path) {
        // rootPoint: on NativePath   C:/jail/
        // mountPoint: on VirtualFS   /mnt/natfs/
        if (!this.rootPoint) return path;
        A.is(path, P.Absolute);
        A(this.inMyFS(path),path+" is not fs of "+this);
        //console.log("tonat:MP",P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP)));
        return P.rel( this.rootPoint, P.relPath(path, this.mountPoint || P.SEP));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            var b=new Buffer(new Uint8Array(a));
            return b;
        }
        return a;
    };

    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    NativeFS.prototype.inMyFS=function (path) {
        //console.log("inmyfs",path);
        if (this.mountPoint) {
            return P.startsWith(path, this.mountPoint);
        } else {
//            console.log(path, hasDriveLetter , P.hasDriveLetter(path));
            return !( !!hasDriveLetter ^ !!P.hasDriveLetter(path));
        }
    };
    function E(r){return r;}
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
            E(path,options);
            assert.is(arguments,[String]);
            return {
                getContent: ArrayBuffer, opendir:[String]
            };
        },
        getContent: function (path, options) {
            options=options||{};
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            this.assertExist(path);
            /*if (this.isText(path)) {
                return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
            } else {*/
                return Content.bin( fs.readFileSync(np) , this.getContentType(path));
            //}
        },
        size: function(path) {
            var np=this.toNativePath(path);
            var st=fs.statSync(np);
            return st.size;
        },
        setContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.writeFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.writeFileSync(np, content.toPlainText());
            }
        },
        appendContent: function (path,content) {
            A.is(arguments,[P.Absolute,Content]);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            if (content.hasBin() || !content.hasPlainText() ) {
                fs.appendFileSync(np, content.toNodeBuffer() );
            } else {
                // !hasBin && hasText
                fs.appendFileSync(np, content.toPlainText());
            }
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, options);
            var s=this.stat(path);
            s.lastUpdate=s.mtime.getTime();
            return s;
        },
        setMetaInfo: function(path, info, options) {
            E(path, info, options);
            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            E(path);
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
            options=options||{};
            assert.is(arguments,[P.Absolute]);
            if (this.exists(path)){
                if (this.isDir(path)) {
                    return;
                } else {
                    throw new Error(this+" is a file. not a dir.");
                }
            }
            this.assertWriteable(path);
            var pa=P.up(path);
            if (pa) this.getRootFS().resolveFS(pa).mkdir(pa);
            var np=this.toNativePath(path);
            fs.mkdirSync(np);
            return this.assertExist(np);
        },
        opendir: function (path, options) {
            assert.is(arguments,[String]);
            options=options||{};
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np);
            if (!options.nosep) {
                r=r.map(function (e) {
                    var s=fs.statSync(ts+SEP+e);
                    var ss=s.isDirectory()?SEP:"";
                    return e+ss;
                });
            }
            var res=[]; //this.dirFromFstab(path);
            return assert.is(res.concat(r),Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            options=options||{};
            this.assertExist(path);
            var np=this.toNativePath(path);
            if (this.isDir(path)) {
                return fs.rmdirSync(np);
            } else {
                return fs.unlinkSync(np);
            }
        },
        // mv: is Difficult, should check dst.fs==src.fs
        //     and both have not subFileSystems
        exists: function (path, options) {
            options=options||{};
            var np=this.toNativePath(path);
            return fs.existsSync(np);
        },
        isDir: function (path) {
            if (!this.exists(path)) {
                return P.isDir(path);
            }
            return this.stat(path).isDirectory();
        },
        /*link: function(path, to, options) {
        }//TODO
        isLink:
        */
        touch: function (path) {
            if (!this.exists(path) && this.isDir(path)) {
                this.mkdir(path);
            } else if (this.exists(path) /*&& !this.isDir(path)*/ ) {
                // TODO(setlastupdate)
                fs.utimesSync(path,Date.now()/1000,Date.now()/1000);
            }
        },
        getURL:function (path) {
            return "file:///"+path.replace(/\\/g,"/");
        },
        onAddObserver: function (apath,options) {
            var t=this;
            var rfs=t.getRootFS();
            options=options||{};
            var isDir=this.isDir(apath);
            //console.log("Invoke oao",options);
            var w=fs.watch(apath, options, function (evt,rpath) {
                //console.log(path);
                var fpath=isDir ? P.rel(apath,rpath) : apath;
                var meta;
                if (t.exists(fpath)) {
                    meta=extend({eventType:evt},t.getMetaInfo(fpath));
                } else {
                    meta={eventType:evt};
                }
                rfs.notifyChanged(fpath,meta);
            });
            return {
                remove: function () {
                    w.close();
                }
            };
        }
    });
    return NativeFS;
});

define('LSFS',["FSClass","PathUtil","extend","assert","Util","Content"],
        function(FS,P,extend,assert,Util,Content) {
    var LSFS = function(storage,options) {
        assert(storage," new LSFS fail: no storage");
    	this.storage=storage;
    	this.options=options||{};
    	if (this.options.useDirCache) this.dirCache={};
    };
    var isDir = P.isDir.bind(P);
    var up = P.up.bind(P);
    var endsWith= P.endsWith.bind(P);
    //var getName = P.name.bind(P);
    //var Path=P.Path;
    var Absolute=P.Absolute;
    var SEP= P.SEP;
    function now(){
        return new Date().getTime();
    }
    LSFS.ramDisk=function (options) {
        var s={};
        s[P.SEP]="{}";
        options=options||{};
        if (!("useDirCache" in options)) options.useDirCache=true;
        return new LSFS(s,options);
    };
    FS.addFSType("localStorage",function (path, options) {
        return new LSFS(localStorage,options);
    });
    FS.addFSType("ram",function (path, options) {
        return LSFS.ramDisk(options);
    });

    LSFS.now=now;
    LSFS.prototype=new FS();
    //private methods
    LSFS.prototype.resolveKey=function (path) {
        assert.is(path,P.Absolute);
        if (this.mountPoint) {
            return P.SEP+P.relPath(path,this.mountPoint);//FromMountPoint(path);
        } else {
            return path;
        }
    };
    LSFS.prototype.getItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        return this.storage[key];
    };
    LSFS.prototype.setItem=function (path, value) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        /*if (key.indexOf("..")>=0) {
            console.log(path,key,value);
        }*/
        assert(key.indexOf("..")<0);
        assert(P.startsWith(key,P.SEP));
        this.storage[key]=value;
    };
    LSFS.prototype.removeItem=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        delete this.storage[key];
    };
    LSFS.prototype.itemExists=function (path) {
        assert.is(path,P.Absolute);
        var key=this.resolveKey(path);
        assert(this.storage,"No storage");
        return key in this.storage;
    };
    /*LSFS.prototype.inMyFS=function (path){
        return !this.mountPoint || P.startsWith(path, this.mountPoint);
    };*/
    LSFS.prototype.getDirInfo=function getDirInfo(path) {
        assert.is(arguments,[P.AbsDir]);
        if (path == null) throw new Error("getDir: Null path");
        if (!endsWith(path, SEP)) path += SEP;
        assert(this.inMyFS(path));
        if (this.dirCache && this.dirCache[path]) return this.dirCache[path];
        var dinfo =  {},dinfos;
        try {
            dinfos = this.getItem(path);
            if (dinfos) {
                dinfo = JSON.parse(dinfos);
            }
        } catch (e) {
            console.log("dinfo err : " , path , dinfos);
        }
        if (this.dirCache) this.dirCache[path]=dinfo;
        return dinfo;
    };
    LSFS.prototype.putDirInfo=function putDirInfo(path, dinfo, trashed) {
  	    assert.is(arguments,[P.AbsDir, Object]);
  	    if (!isDir(path)) throw new Error("Not a directory : " + path);
  	    assert(this.inMyFS(path));
  	    if (this.dirCache) this.dirCache[path] = dinfo;
  	    this.setItem(path, JSON.stringify(dinfo));
        var ppath = up(path);
        if (ppath == null) return;
        if (!this.inMyFS(ppath)) {
            //assert(this.getRootFS()!==this);
            //this.getRootFS().resolveFS(ppath).touch(ppath);
            return;
        }
        var pdinfo = this.getDirInfo(ppath);
        this._touch(pdinfo, ppath, P.name(path), trashed);
    };
    LSFS.prototype._touch=function _touch(dinfo, path, name, trashed) {
        // path:path of dinfo
        // trashed: this touch is caused by trashing the file/dir.
        assert.is(arguments,[Object, String, String]);
        assert(this.inMyFS(path));
        var eventType="change";
        if (!dinfo[name]) {
            eventType="create";
            dinfo[name] = {};
            if (trashed) dinfo[name].trashed = true;
        }
        if (!trashed) delete dinfo[name].trashed;
        dinfo[name].lastUpdate = now();
        var meta=extend({eventType:eventType},dinfo[name]);
        this.getRootFS().notifyChanged(P.rel(path,name), meta);
        this.putDirInfo(path, dinfo, trashed);
    };
    LSFS.prototype.removeEntry=function removeEntry(dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            dinfo[name] = {
                lastUpdate: now(),
                trashed: true
            };
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"trash"});
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.removeEntryWithoutTrash=function (dinfo, path, name) { // path:path of dinfo
        assert.is(arguments,[Object, String, String]);
        if (dinfo[name]) {
            delete dinfo[name];
            this.getRootFS().notifyChanged(P.rel(path,name), {eventType:"delete"});
            this.putDirInfo(path, dinfo, true);
        }
    };
    LSFS.prototype.isRAM=function (){
        return this.storage!==localStorage;
    };
    LSFS.prototype.fstype=function () {
        return (this.isRAM() ? "ramDisk" : "localStorage" );
    };
    LSFS.getUsage=function () {
        var using=0;
        for (var i in localStorage) {
            if (typeof localStorage[i]=="string"){
                using+=localStorage[i].length;
            }
        }
        return using;
    };
    LSFS.getCapacity=function () {
        var seq=0;
        var str="a";
        var KEY="___checkls___";
        var using=0;
        var lim=Math.pow(2,25);//32MB?
        try {
            // make 1KB str
            for (var i=0; i<10 ;i++) {
                str+=str;
            }
            for (var i in localStorage) {
                if (i.substring(0,KEY.length)==KEY) delete localStorage[i];
                else if (typeof localStorage[i]=="string"){
                    using+=localStorage[i].length;
                }
            }
            var ru=using;
            while (add()) {
                if (str.length<lim) {
                    str+=str;
                } else break;
            }
            while(str.length>1024) {
                str=str.substring(str.length/2);
                add();
            }
            return {using:ru, max:using};
        } finally {
            for (var i=0; i<seq; i++) {
                 delete localStorage[KEY+i];
            }
        }
        function add() {
            try {
                localStorage[KEY+seq]=str;
                seq++;
                using+=str.length;
                //console.log("Added "+str.length, str.length, using);
                return true;
            } catch(e) {
                delete localStorage[KEY+seq];
                //console.log("Add Fail "+str.length);
                return false;
            }
        }
    };

    // public methods (with resolve fs)
    FS.delegateMethods(LSFS.prototype, {
        isReadOnly: function () {return this.options.readOnly;},
        getReturnTypes: function(path, options) {
            assert.is(arguments,[String]);
            return {
                getContent: String, opendir:[String]
            };
        },
        getContent: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertExist(path); // Do not use this??( because it does not follow symlinks)
            var c;
            var cs=this.getItem(path);
            if (Content.looksLikeDataURL(cs)) {
                c=Content.url(cs);
            } else {
                c=Content.plainText(cs);
            }
            return c;
        },
        setContent: function(path, content, options) {
            assert.is(arguments,[Absolute,Content]);
            this.assertWriteable(path);
            var t=null;
            if (content.hasPlainText()) {
                t=content.toPlainText();
                if (Content.looksLikeDataURL(t)) t=null;
            }
            if (t!=null) {
                this.setItem(path, t);
            } else {
                this.setItem(path, content.toURL());
            }
            this.touch(path);
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, {includeTrashed:true});
            assert.is(arguments,[Absolute]);
            if (path==P.SEP) {
                return {};
            }
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return {};
            }
            var name=P.name(path);
            assert.is(parent,P.AbsDir);
            var pinfo=this.getDirInfo(parent);
            return assert(pinfo[name]);
        },
        setMetaInfo: function(path, info, options) {
            assert.is(arguments,[String,Object]);
            this.assertWriteable(path);
            var parent=assert(P.up(path));
            if (!this.inMyFS(parent)) {
                return;
            }
            var pinfo=this.getDirInfo(parent);
            var name=P.name(path);
            pinfo[name]=info;
            this.putDirInfo(parent, pinfo, pinfo[name].trashed);
        },
        mkdir: function(path, options) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
			this.touch(path);
        },
        opendir: function(path, options) {
            assert.is(arguments,[String]);
            //succ: iterator<string> // next()
            // options: {includeTrashed:Boolean}
            options=options||{};
            var inf=this.getDirInfo(path);
            var res=[]; //this.dirFromFstab(path);
            for (var i in inf) {
                assert(inf[i]);
                if (!inf[i].trashed || options.includeTrashed) res.push(i);
            }
            return assert.is(res,Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            this.assertWriteable(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) {
                throw new Error(path+": cannot remove. It is root of this FS.");
            }
            this.assertExist(path,{includeTrashed:options.noTrash });
            if (P.isDir(path)) {
                var lis=this.opendir(path);
                if (lis.length>0) {
                    this.err(path,"Directory not empty");
                }
                if (options.noTrash) {
                    this.removeItem(path);
                }
            } else {
                this.removeItem(path);
            }
            var pinfo=this.getDirInfo(parent);
            if (options.noTrash) {
                this.removeEntryWithoutTrash(pinfo, parent, P.name(path) );
            } else {
                this.removeEntry(pinfo, parent, P.name(path) );
            }
        },
        exists: function (path,options) {
            assert.is(arguments,[Absolute]);
            options=options||{};
            var name=P.name(path);
            var parent=P.up(path);
            if (parent==null || !this.inMyFS(parent)) return true;
            var pinfo=this.getDirInfo(parent);
            var res=pinfo[name];
            if (res && res.trashed && this.itemExists(path)) {
                if (this.isDir(path)) {

                } else {
                    //assert.fail("Inconsistent "+path+": trashed, but remains in storage");
                }
            }
            if (!res && this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": not exists in metadata, but remains in storage");
            }
            if (res && !res.trashed && !res.link && !this.itemExists(path)) {
                //assert.fail("Inconsistent "+path+": exists in metadata, but not in storage");
            }
            if (res && !options.includeTrashed) {
                res=!res.trashed;
            }
            return !!res;
        },
        link: function(path, to, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            this.assertWriteable(path);
            if (this.exists(path)) this.err(path,"file exists");
            if (P.isDir(path) && !P.isDir(to)) {
                this.err(path," can not link to file "+to);
            }
            if (!P.isDir(path) && P.isDir(to)) {
                this.err(path," can not link to directory "+to);
            }
            var m={};//assert(this.getMetaInfo(path));
            m.link=to;
            m.lastUpdate=now();
            this.setMetaInfo(path, m);
            //console.log(this.getMetaInfo(path));
            //console.log(this.storage);
            //console.log(this.getMetaInfo(P.up(path)));
            assert(this.exists(path));
            assert(this.isLink(path));
        },
        isLink: function (path) {
            assert.is(arguments,[P.Absolute]);
            if (!this.exists(path)) return null;
            var m=assert(this.getMetaInfo(path));
            return m.link;
        },
        touch: function (path) {
            assert.is(arguments,[Absolute]);
            this.assertWriteable(path);
            if (!this.itemExists(path)) {
                if (P.isDir(path)) {
                    if (this.dirCache) this.dirCache[path]={};
                    this.setItem(path,"{}");
                } else {
                    this.setItem(path,"");
                }
            }
            var parent=up(path);
            if (parent!=null) {
                if (this.inMyFS(parent)) {
                    var pinfo=this.getDirInfo(parent);
                    this._touch(pinfo, parent , P.name(path), false);
                } else {
                    assert(this.getRootFS()!==this);
                    this.getRootFS().resolveFS(parent).touch(parent);
                }
            }
        },
        getURL: function (path) {
            return this.getContent(path).toURL();
        },
        opendirEx: function (path,options) {
            assert.is(path,P.AbsDir);
            options=options||{};
            var res={};
            var d=this.getDirInfo(path);
            if (options.includeTrashed) {
                //console.log("INCLTR",d);
                return d;
            }
            for (var k in d) {
                if (d[k].trashed) continue;
                res[k]=d[k];
            }
            return res;
        }
    });
    return LSFS;

});

/**
 *
 * jquery.binarytransport.js
 *
 * @description. jQuery ajax transport for making binary data type requests.
 * @version 1.0
 * @author Henry Algus <henryalgus@gmail.com>
 *
 */

// use this transport for "binary" data type
if (typeof $!=="undefined")
$.ajaxTransport("+binary", function(options, originalOptions, jqXHR){
    // check for conditions and support for blob / arraybuffer response type
    if (window.FormData && ((options.dataType && (options.dataType == 'binary')) || (options.data && ((window.ArrayBuffer && options.data instanceof ArrayBuffer) || (window.Blob && options.data instanceof Blob)))))
    {
        return {
            // create new XMLHttpRequest
            send: function(headers, callback){
                // setup all variables
                var xhr = new XMLHttpRequest(),
                url = options.url,
                type = options.type,
                async = options.async || true,
                // blob or arraybuffer. Default is blob
                dataType = options.responseType || "blob",
                data = options.data || null,
                username = options.username || null,
                password = options.password || null;

                xhr.addEventListener('load', function(){
                    var data = {};
                    data[options.dataType] = xhr.response;
                    // make callback and send data
                    callback(xhr.status, xhr.statusText, data, xhr.getAllResponseHeaders());
                });

                xhr.open(type, url, async, username, password);

                // setup custom headers
                for (var i in headers ) {
                    xhr.setRequestHeader(i, headers[i] );
                }

                xhr.responseType = dataType;
                xhr.send(data);
            },
            abort: function(){
                jqXHR.abort();
            }
        };
    }
});

define("jquery.binarytransport", function(){});

define('WebFS',["FSClass","jquery.binarytransport","DeferredUtil","Content","PathUtil"],
        function (FS,j,DU,Content,P) {
    // FS.mount(location.protocol+"//"+location.host+"/", "web");
    var WebFS=function (){};
    var p=WebFS.prototype=new FS();
    FS.addFSType("web", function () {
        return new WebFS();
    });
    p.fstype=function () {return "Web";};
    p.supportsSync=function () {return false;};
    p.inMyFS=function (path) {
        return P.isURL(path);
    };
    FS.delegateMethods(p, {
        exists: function () {return true;},
        getContentAsync: function (path){
            var t=this;
            return DU.promise(function (succ,err) {
                $.get(path,function (blob) {
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function() {
                        succ(Content.bin(reader.result, t.getContentType(path)));
                    });
                    reader.readAsArrayBuffer(blob);
                },"binary").fail(err);
            });
        },
        /*setContentAsync: function (path){

        },*/
        getURL: function (path) {
            return path;
        }
    });

    return WebFS;

});

define('Env',["assert","PathUtil"],function (A,P) {
    var Env=function (value) {
        this.value=value;
    };
    Env.prototype={
            expand:function (str) {
                A.is(str,String);
                var t=this;
                return str.replace(/\$\{([a-zA-Z0-9_]+)\}/g, function (a,key) {
                    return t.get(key);
                });
            },
            expandPath:function (path) {
                A.is(path,String);
                path=this.expand(path);
                path=path.replace(/\/+/g,"/");
                path=path.replace(/^[a-z][a-z]+:\//, function (r) { return r+"/"; } );
                return A.is(path,P.Path);
            },
            get: function (key) {
                return this.value[key];
            },
            set: function (key, value) {
                this.value[key]=value;
            }
    };
    return Env;
});
define('SFile',["extend","assert","PathUtil","Util","Content","FSClass","FileSaver","DeferredUtil"],
function (extend,A,P,Util,Content,FSClass,saveAs,DU) {

var SFile=function (rootFS, path) {
    A.is(path, P.Absolute);
    this._path=path;
    this.rootFS=rootFS;
    this.fs=rootFS.resolveFS(path);
    if (this.isDir() && !P.isDir(path)) {
        this._path+=P.SEP;
    }
};
SFile.is=function (path) {
    return path && typeof (path.isSFile)=="function" && path.isSFile();
};
/*function getPath(f) {
    if (SFile.is(f)) {
        return f.path();
    } else {
        A.is(f,P.Absolute);
        return f;
    }
}*/
SFile.prototype={
    isSFile: function (){return true;},
    setPolicy: function (p) {
        if (this.policy) throw new Error("policy already set");
        this.policy=p;
        return this._clone();
    },
    getPolicy: function (/*p*/) {
        return this.policy;
    },
    _clone: function (){
        return this._resolve(this.path());
    },
    _resolve: function (path, options) {
        var res;
        options=options||{};
        if (SFile.is(path)) {
            res=path;
        } else {
            A.is(path,P.Absolute);
            var topdir;
            var policy=options.policy || this.policy;
            if (policy && (topdir=policy.topDir)) {
                if (topdir.path) topdir=topdir.path();
                if (!P.startsWith(path, topdir)) {
                    throw new Error(path+": cannot access. Restricted to "+topdir);
                }
            }
            res=new SFile(this.rootFS, path);
            res.policy=policy;
        }
        if (res.policy) {
            return Util.privatize(res);
        } else {
            return res;
        }
    },
    contains: function (file) {
        A(SFile.is(file),file+" shoud be a SFile object.");
        if (!this.isDir()) return false;
        return P.startsWith( file.path(), this.path());
    },
    path: function () {
        return this._path;
    },
    name: function () {
        return P.name(this.path());
    },
    truncExt: function (ext) {
        return P.truncExt(this.path(),ext);
    },
    ext: function () {
        return P.ext(this.path());
    },
    relPath: function (base) {
        // base should be SFile or Path from rootFS
        var bp=(base.path ?
                base.path() :
                base );
        return P.relPath(this.path(), A.is(bp,P.Absolute) );
    },
    up: function () {
        var pathR=this.path();
        var pa=P.up(pathR);
        if (pa==null) return null;
        return this._resolve(pa);
    },
    rel: function (relPath) {
        A.is(relPath, P.Relative);
        this.assertDir();
        var pathR=this.path();
        return this._resolve(P.rel(pathR, relPath));
    },
    sibling: function (n) {
        return this.up().rel(n);
    },
    startsWith: function (pre) {
        return P.startsWith(this.name(),pre);
    },
    endsWith: function (post) {
        return P.endsWith(this.name(),post);
    },
    equals:function (o) {
        return (o && typeof o.path=="function" && o.path()==this.path());
    },
    toString:function (){
        return this.path();
    },
    //Common
    touch: function () {
        return this.act.fs.touch(this.act.path);
    },
    isReadOnly: function () {
        return this.act.fs.isReadOnly(this.act.path);
    },
    isTrashed:function () {
        var m=this.metaInfo();
        if (!m) return false;
        return m.trashed;
    },
    metaInfo: function () {
        if (arguments.length==0) {
            return this.getMetaInfo.apply(this,arguments);
        } else {
            return this.setMetaInfo.apply(this,arguments);
        }
    },
    getMetaInfo: function (options) {
        return this.act.fs.getMetaInfo(this.act.path,options);
    },
    setMetaInfo: function (info, options) {
        return this.act.fs.setMetaInfo(this.act.path,info, options);
    },
    getDirTree: function (options) {
        return this.act.fs.getDirTree(this.act.path, options);
    },
    assertExists: function () {
        A(this.exists(),this.path()+" does not exist.");
    },
    lastUpdate:function () {
        this.assertExists();
        return this.metaInfo().lastUpdate;
    },
    exists: function (options) {
        var args=Array.prototype.slice.call(arguments);
        if (typeof args[0]==="function") {
            var f=args.shift();
            return DU.resolve(this.exists.apply(this,args)).then(f);
        }
        options=options||{};
        var p=this.fs.exists(this.path(),options);
        if (p || options.noFollowLink) {
            return p;
        } else {
            return this.act.fs.exists(this.act.path,{noFollowLink:true});
        }
    },
    rm: function (options) {
        //   ln /test/c /a/b/
        //   rm a/b/c/
        //   rm a/b/c/d
        var t=this;
        options=options||{};
        if (this.isLink()) {
            return DU.resolve(this.fs.rm(this.path(),options));
        }
        /*if (!this.exists({noFollowLink:true})) {
            return this.act.fs.rm(this.act.path, options);
        }*/
        var a;
        if (this.isDir() && (options.recursive||options.r)) {
            a=this.each(function (f) {
                return f.rm(options);
            });
        } else {
            a=DU.resolve();
        }
        return a.then(function () {
            return t.act.fs.rm(t.act.path, options);
        });
        //var pathT=this.path();
        //this.fs.rm(pathT, options);
    },
    removeWithoutTrash: function (options) {
        options=options||{};
        options.noTrash=true;
        this.rm(options);
    },
    isDir: function () {
        return this.act.fs.isDir(this.act.path);
    },
    // File
    text:function (f) {
    	if (typeof f==="function") {
			return this.getText(f);
		}
        if (arguments.length>0) {
            return this.setText(arguments[0]);
        } else {
            return this.getText();
        }
    },
    setText:function (t) {
        A.is(t,String);
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        var ct=this.contentType({def:null});
        //if (this.isText()) {
        if (ct!==null && !ct.match(/^text/) && Content.looksLikeDataURL(t)) {
            // bad knowhow: if this is a binary file apparently, convert to URL
            return DU.throwNowIfRejected(this.setContent(Content.url(t)));
            //return DU.resolve(this.act.fs.setContent(this.act.path, Content.url(t)));
        } else {
            // if use fs.setContentAsync, the error should be handled by .fail
            // setText should throw error immediately (Why? maybe old style of text("foo") did it so...)
            return DU.throwNowIfRejected(this.setContent(Content.plainText(t)));
            //return DU.resolve(this.act.fs.setContent(this.act.path, Content.plainText(t)));
        }
    },
    appendText:function (t) {
        A.is(t,String);
        //if (this.isText()) {
        return this.act.fs.appendContent(this.act.path, Content.plainText(t));
        /*} else {
            throw new Error("append only for text file");
        }*/
    },
    getContent: function (f) {
        if (typeof f=="function") {
            return this.act.fs.getContentAsync(this.act.path).then(f);
        }
        return this.act.fs.getContent(this.act.path);
    },
    setContent: function (c) {
        if (this.isDir()) {
            throw new Error("Cannot write to directory: "+this.path());
        }
        // why setContentAsync? AsyncでもDU.resolveはsyncをサポートしていればsyncでやってくれる...はず，Promiseだと遅延するからだめ．今までJQばっかりだったから問題が起きていなかった．
        // なので，fs2/promise.jsを追加．
        return this.act.fs.setContentAsync(this.act.path,c);
    },

    getText:function (f) {
    	if (typeof f==="function") {
    		//var t=this;
    	    return this.getContent(forceText).then(f);
    	}
        return forceText(this.act.fs.getContent(this.act.path));
        function forceText(c) {
	    	//if (t.isText()) {
            try {
                return c.toPlainText();
            } catch(e) {
    	    	return c.toURL();
    	    }
        }
    },
    getDataURL: function (f) {
        if (typeof f==="function") {
            return this.getContent(function (c) {
                return c.toURL();
            });
        }
        return this.getContent().toURL();
    },
    setDataURL: function (u) {
        return this.setContent(Content.url(u));
    },
    dataURL:function (d) {
        if (typeof d==="string") return this.setDataURL(d);
        if (typeof d==="function") return this.getDataURL(d);
        return this.getDataURL();
    },
    isText: function () {
        return this.act.fs.isText(this.act.path);
    },
    contentType: function (options) {
        return this.act.fs.getContentType(this.act.path,options);
    },
    bytes: function (b) {
        if (Content.isBuffer(b)) return this.setBytes(b);
        return this.getBytes();
    },
    setBytes:function (b) {
        return this.act.fs.setContent(this.act.path, Content.bin(b,this.contentType()));
    },
    getBytes:function (options) {
        options=options||{};
        return this.act.fs.getContent(this.act.path).toBin(options.binType);
    },
    getURL: function () {
        return this.act.fs.getURL(this.act.path);
    },
    lines:function (lines) {
        if (lines instanceof Array) {//WRITE
            return this.text(lines.join("\n"));
        } else if (typeof lines==="function") {//READ async
            return this.text(function (r) {
                return lines(r.replace(/\r/g,"").split("\n"));
            });
        }
        return this.text().replace(/\r/g,"").split("\n");
    },
    obj: function () {
        var file=this;
        if (arguments.length==0) {
            var t=file.text();
            if (!t) return null;
            return JSON.parse(t);
        } else {
            file.text(JSON.stringify(A.is(arguments[0],Object) ));
        }
    },
    copyFrom: function (src, options) {
        return src.copyTo(this,options);
    },
    copyTo: function (dst, options) {
        A(dst && dst.isSFile(),dst+" is not a file");
        var src=this;
        options=options||{};
        var srcIsDir=src.isDir();
        var dstIsDir=dst.isDir();
        if (!srcIsDir && dstIsDir) {
            dst=dst.rel(src.name());
            A(!dst.isDir(), dst+" is a directory.");
            dstIsDir=false;
        }
        if (srcIsDir && !dstIsDir) {
           this.err("Cannot move dir "+src.path()+" to file "+dst.path());
        } else if (!srcIsDir && !dstIsDir) {
            if (options.echo) options.echo(src+" -> "+dst);
            var res=this.act.fs.cp(this.act.path, dst.getResolvedLinkPath(),options);
            res=DU.resolve(res);
            if (options.a) {
                return res.then(function () {
                    return dst.setMetaInfo(src.getMetaInfo());
                });
            }
            return res;
        } else {
            A(srcIsDir && dstIsDir,"Both src and dst should be dir");
            return src.each(function (s) {
                var r;
                var dstf=dst.rel(s.name());
                if (options.progress) {
                    r=options.progress(dstf,{src:s,dst:dstf});
                }
                return DU.resolve(r).then(function () {
                    return dstf.copyFrom(s, options);
                });
            },options);
        }
        //file.text(src.text());
        //if (options.a) file.metaInfo(src.metaInfo());
    },
    moveFrom: function (src, options) {
        var t=this;
        return t.exists(function (ex) {
            return t.copyFrom(src,options).then(function () {
                return src.rm({recursive:true});
            },function (e) {
                // rollback
                if (!ex) return t.exists(function (ex) {
                    if (ex) return t.rm({recursive:true});
                }).then(function () {throw e;});
                throw e;
            });
        });
    },
    moveTo: function (dst, options) {
        return dst.moveFrom(this,options);
    },
    // Dir
    assertDir:function () {
        A.is(this.path(),P.Dir);
        return this;
    },
    each:function (f,options) {
        var dir=this.assertDir();
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls,f);// ls.forEach(f)
        });
    },
    eachrev:function (f,options) {
        var dir=this.assertDir();
        return dir.listFilesAsync(options).then(function (ls) {
            return DU.each(ls.reverse(),f);// ls.forEach(f)
        });
    },
    recursive:function (fun,options) {
        var dir=this.assertDir();
        options=dir.convertOptions(options);
        return dir.each(function (f) {
            if (f.isDir()) return f.recursive(fun,options);
            else return fun(f);
        },options);
    },
    _listFiles:function (options,async) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        //var path=this.path();
        var ord;
        options=dir.convertOptions(options);
        if (!ord) ord=options.order;
        if (async) {
            return this.act.fs.opendirAsync(this.act.path, options).
            then(cvt);
        } else {
            return cvt( this.act.fs.opendir(this.act.path, options));
        }
        function cvt(di) {
            var res=[];
            for (var i=0;i<di.length; i++) {
                var name=di[i];
                //if (!options.includeTrashed && dinfo[i].trashed) continue;
                var f=dir.rel(name);
                if (options.excludesF(f) ) continue;
                res.push(f);
            }
            if (typeof ord=="function" && res.sort) res.sort(ord);
            return res;
        }
    },
    listFilesAsync:function (options) {
        return this._listFiles(options,true);
    },
    listFiles:function (options) {
        return this._listFiles(options,false);
    },
    ls:function (options) {
        A(options==null || typeof options=="object");
        var dir=this.assertDir();
        if (!options) {
            return this.act.fs.opendir(this.act.path, options);
        }
        var res=dir.listFiles(options);
        return res.map(function (f) {
            return f.name();
        });
    },
    convertOptions:function(o) {
        var options=Util.extend({},o);
        /*var dir=*/this.assertDir();
        var pathR=this.path();
        var excludes=options.excludes || {};
        if (typeof excludes==="function") {
            options.excludesF=excludes;
        } else if (typeof excludes==="object") {
            if (excludes instanceof Array) {
                var nex={};
                excludes.forEach(function (e) {
                    if (P.startsWith(e,"/")) {
                        nex[e]=1;
                    } else {
                        nex[pathR+e]=1;
                    }
                });
                excludes=nex;
            }
            options.excludesF=function (f) {
                return excludes[f.path()];
            };
        }
        return A.is(options,{excludesF:Function});
    },
    mkdir: function () {
        return this.touch();
    },
    link: function (to,options) {// % ln to path
        if (this.exists()) throw new Error(this.path()+": exists.");
        return this.act.fs.link(this.act.path,to.path(),options);
    },
    resolveLink:function () {
        return this._resolve(this.act.path);
    },
    isLink: function () {
        return this.fs.isLink(this.path());
    },
    getResolvedLinkPath: function () {
        return this.act.path;
    },
    getFS:function () {
        return this.act.fs;
    },
    observe: function (h) {
        return this.getFS().getRootFS().addObserver(this.path(),h);
    },
    getBlob: function () {
        return new Blob([this.bytes()],{type:this.contentType()});
    },
    setBlob: function (blob) {
        var t=this;
        return DU.promise(function (succ/*,err*/) {
            var reader = new FileReader();
            reader.addEventListener("loadend", function() {
                // reader.result contains the contents of blob as a typed array
                DU.resolve(t.setBytes(reader.result)).then(succ);
            });
            reader.readAsArrayBuffer(blob);
        });
    },
    size: function (f) {
        if (!f) {
            if (!this.isDir()) {
                return this.act.fs.size(this.act.path);
                //return this.getBytes().byteLength;
            } else {
                var sum=0;
                this.each(function (f) {
                    sum+=f.size();
                });
                return sum;
            }
        } else {
            //TODO: async
        }
    },
    download: function () {
        if (this.isDir()) throw new Error(this+": Download dir is not support yet. Use 'zip' instead.");
        saveAs(this.getBlob(),this.name());
    },
    err: function () {
        var a=Array.prototype.slice.call(arguments);
        console.log.apply(console,a);
        throw new Error(a.join(""));
    },
    exportAsObject: function (options) {
        var base=this;
        var data={};
        this.recursive(function (f) {
            data[f.relPath(base)]=f.text();
        },options);
        var req={base:base.path(),data:data};
        return req;
    },
    importFromObject: function (data/*, options*/) {
        if (typeof data==="string") data=JSON.parse(data);
        data=data.data;
        for (var k in data) {
            this.rel(k).text(data[k]);
        }
    },
    watch: function (_1,_2) {
        var options={},handler=function(){};
        if (typeof _1==="object") options=_1;
        if (typeof _2==="object") options=_2;
        if (typeof _1==="function") handler=_1;
        if (typeof _2==="function") handler=_2;
        var rfs=this.getFS().getRootFS();
        //var t=this;
        rfs.addObserver(this.path(),function (path, meta) {
            handler(meta.eventType, rfs.get(path),meta );
        });
    },
    convertResult:function (valueOrPromise) {
        if (this.syncMode===true) return forceSync(valueOrPromise);
        if (this.syncMode===false) return DU.resolve(valueOrPromise);
        return valueOrPromise;
    }
};
function forceSync(promise) {
    var state;
    var err,res;
    var np=DU.resolve(promise).then(function (r) {
        if (!state) {
            state="resolved";
            res=r;
        }
        return r;
    },function (e) {
        if (!state) {
            state="rejected";
            err=e;
        }
        throw e;
    });
    if (!state) return np;
    if (state==="rejected") throw err;
    return res;
}
Object.defineProperty(SFile.prototype,"act",{
    get: function () {
        if (this._act) return this._act;
        this._act={};// path/fs after follwed symlink
        this._act.path=this.fs.resolveLink(this._path);
        this._act.fs=this.rootFS.resolveFS(this._act.path);
        A.is(this._act, {fs:FSClass, path:P.Absolute});
        return this._act;
    }
});

return SFile;
});

define('RootFS',["assert","FSClass","PathUtil","SFile"], function (assert,FS,P,SFile) {
    var RootFS=function (defaultFS){
        assert.is(defaultFS,FS);
        this.mount(null, defaultFS);
    };
    var dst=RootFS.prototype;
    var p={
            err: function (path, mesg) {
                throw new Error(path+": "+mesg);
            },
            // mounting
            fstab: function () {
                return this._fstab=this._fstab||[];//[{fs:this, path:P.SEP}];
            },
            unmount: function (path, options) {
                assert.is(arguments,[P.AbsDir] );
                var t=this.fstab();
                console.log(t);
                for (var i=0; i<t.length; i++) {
                    if (t[i].mountPoint==path) {
                        t.splice(i,1);
                        return true;
                    }
                }
                return false;
            },
            availFSTypes:function (){
                return FS.availFSTypes();
            },
            mount: function (path, fs, options) {
                if (typeof fs=="string") {
                    var fact=assert( FS.availFSTypes()[fs] ,"fstype "+fs+" is undefined.");
                    fs=fact(path, options||{});
                }
                assert.is(fs,FS);
                fs.mounted(this, path);
                this.fstab().unshift(fs);
            },
            resolveFS:function (path, options) {
                assert.is(path,P.Absolute);
                var res;
                this.fstab().forEach(function (fs) {
                    if (res) return;
                    if (fs.inMyFS(path)) {
                        res=fs;
                    }
                });
                if (!res) this.err(path,"Cannot resolve");
                return assert.is(res,FS);
            },
            get: function (path) {
                assert.is(path,P.Absolute);
                return new SFile(this.resolveFS(path), path);
            },
            addObserver: function (_1,_2,_3) {
                this.observers=this.observers||[];
                var options={},path,f;
                if (typeof _1==="string") path=_1;
                if (typeof _2==="string") path=_2;
                if (typeof _3==="string") path=_3;
                if (typeof _1==="object") options=_1;
                if (typeof _2==="object") options=_2;
                if (typeof _3==="object") options=_3;
                if (typeof _1==="function") f=_1;
                if (typeof _2==="function") f=_2;
                if (typeof _3==="function") f=_3;
                assert.is(path,String);
                assert.is(f,Function);
                var fs=this.resolveFS(path);
                var remover=fs.onAddObserver(path,options);
                var observers=this.observers;
                var observer={
                    path:path,
                    handler:f,
                    remove: function () {
                        var i=observers.indexOf(this);
                        observers.splice(i,1);
                        if (remover) remover.remove();
                    }
                };
                this.observers.push(observer);
                return observer;
            },
            notifyChanged: function (path,metaInfo) {
                if (!this.observers) return;
                this.observers.forEach(function (ob) {
                    if (P.isChildOf(path,ob.path)) {
                        ob.handler(path,metaInfo);
                    }
                });
            },
            getRootFS:function () {
                return this;
            }
    };
    for (var i in p) {
        dst[i]=p[i];
    }
    return RootFS;
});

define('zip',["SFile",/*"jszip",*/"FileSaver","Util","DeferredUtil"],
function (SFile,/*JSZip,*/fsv,Util,DU) {
    var zip={};
    zip.setJSZip=function (JSZip) {
        zip.JSZip=JSZip;
        if (!DU.external.Promise) {
            DU.external.Promise=JSZip.external.Promise;
        }
    };
    if (typeof JSZip!=="undefined") zip.setJSZip(JSZip);
    zip.zip=function (dir,dstZip,options) {
        if (!SFile.is(dstZip)) options=dstZip;
        options=options||{};
        var jszip = new zip.JSZip();
        function loop(dst, dir) {
            return dir.each(function (f) {
                var r=DU.resolve();
                if (options.progress) {
                    r=options.progress(f);
                }
                return r.then(function () {
                    if (f.isDir()) {
                        var sf=dst.folder(f.name().replace(/[\/\\]$/,""));
                        return loop(sf, f);
                    } else {
                        return f.getContent(function (c) {
                            dst.file(f.name(),c.toArrayBuffer());
                        });
                    }
                });
            },options);
        }
        return loop(jszip, dir).then(function () {
            return DU.resolve(jszip.generateAsync({
                type:"arraybuffer",
                compression:"DEFLATE"
            }));
        }).then(function (content) {
            //console.log("zip.con",content);
            if (SFile.is(dstZip)) {
                return dstZip.setBytes(content);
            } else {
                saveAs(
                    new Blob([content],{type:"application/zip"}),
                    dir.name().replace(/[\/\\]$/,"")+".zip"
                );
            }
        });
    };
    zip.unzip=function (arrayBuf,destDir,options) {
        var c;
        var status={};
        options=options||{};
        if (SFile.is(arrayBuf)) {
        	c=arrayBuf.getContent();
        	arrayBuf=c.toArrayBuffer();
        }
        if (!options.onCheckFile) {
            options.onCheckFile=function (f) {
                if (options.overwrite) {
                    return f;
                } else {
                    if (f.exists()) {
                        return false;
                    }
                    return f;
                }
            };
        }
        var jszip=new zip.JSZip();
        return DU.resolve(jszip.loadAsync(arrayBuf)).then(function () {
            return DU.each(jszip.files,function (key,zipEntry) {
                //var zipEntry=jszip.files[i];
                var buf,dest;
                return DU.resolve(zipEntry.async("arraybuffer")).then(function (_buf) {
                    buf=_buf;
                    dest=destDir.rel(zipEntry.name);
                    if (options.progress) {
                        return DU.resolve(options.progress(dest));
                    }
                }).then(function () {
                    console.log("Inflating",zipEntry.name);
                    if (dest.isDir()) return;
                    var s={
                        file:dest,
                        status:"uploaded"
                    };
                    status[dest.path()]=s;
                    var c=FS.Content.bin( buf, dest.contentType() );
                    var res=options.onCheckFile(dest,c);
                    if (res===false) {
                        s.status="cancelled";
                        dest=null;
                    }
                    if (SFile.is(res)) {
                        if (dest.path()!==res.path()) s.redirectedTo=res;
                        dest=res;
                    }
                    if (dest) return dest.setContent(c);
                });
            });
        }).then(function () {
            console.log("unzip done",status);
            return status;
        });
    };
    return zip;
});

/*(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';*/
// modified from https://github.com/taylorhakes/promise-polyfill/blob/master/dist/polyfill.js
// if promise resolved immediately, it will run f of then(f)
// P.resolve(5).then(e=>console.log(e)); console.log(3)  ->  show 5 3, while original is 3 5
define('promise',[], function() {

/**
 * @this {Promise}
 */
function finallyConstructor(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      // @ts-ignore
      return constructor.resolve(callback()).then(function() {
        // @ts-ignore
        return constructor.reject(reason);
      });
    }
  );
}

// Store setTimeout reference so promise-polyfill will be unaffected by
// other code modifying setTimeout (like sinon.useFakeTimers())
var setTimeoutFunc = setTimeout;

function isArray(x) {
  return Boolean(x && typeof x.length !== 'undefined');
}

function noop() {}

// Polyfill for Function.prototype.bind
function bind(fn, thisArg) {
  return function() {
    fn.apply(thisArg, arguments);
  };
}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError('Promises must be constructed via new');
  if (typeof fn !== 'function') throw new TypeError('not a function');
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError('A promise cannot be resolved with itself.');
    if (
      newValue &&
      (typeof newValue === 'object' || typeof newValue === 'function')
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === 'function') {
        doResolve(bind(then, newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) return;
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) return;
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) return;
    done = true;
    reject(self, ex);
  }
}

Promise.prototype['catch'] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype['finally'] = finallyConstructor;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.all accepts an array'));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === 'object' || typeof val === 'function')) {
          var then = val.then;
          if (typeof then === 'function') {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === 'object' && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!isArray(arr)) {
      return reject(new TypeError('Promise.race accepts an array'));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = function (fn) {fn();};/*
  // @ts-ignore
  (typeof setImmediate === 'function' &&
    function(fn) {
      // @ts-ignore
      setImmediate(fn);
    }) ||
  function(fn) {
    setTimeoutFunc(fn, 0);
  };
*/

Promise._unhandledRejectionFn = function _unhandledRejectionFn(/*err*/) {
  if (typeof console !== 'undefined' && console) {
    //console.warn('Possible Unhandled Promise Rejection:', err); // eslint-disable-line no-console
  }
};
/** @suppress {undefinedVars} */
/*
var globalNS = (function() {
  // the only reliable means to get the global object is
  // `Function('return this')()`
  // However, this causes CSP violations in Chrome apps.
  if (typeof self !== 'undefined') {
    return self;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  throw new Error('unable to locate global object');
})();

if (!('Promise' in globalNS)) {
  globalNS['Promise'] = Promise;
} else if (!globalNS.Promise.prototype['finally']) {
  globalNS.Promise.prototype['finally'] = finallyConstructor;
}*/
return Promise;
});

define('FS',["FSClass","NativeFS","LSFS", "WebFS", "PathUtil","Env","assert","SFile","RootFS","Content","zip","DeferredUtil","promise"],
        function (FSClass,NativeFS,LSFS,WebFS, P,Env,A,SFile,RootFS,Content,zip,DU,PR) {
    var FS={};
    FS.assert=A;
    FS.Content=Content;
    FS.Class=FSClass;
    FS.DeferredUtil=DU;
    if (!DU.config.useJQ) {
        DU.external.Promise=PR;
    }
    FS.Env=Env;
    FS.LSFS=LSFS;
    FS.NativeFS=NativeFS;
    FS.PathUtil=P;
    FS.RootFS=RootFS;
    FS.SFile=SFile;
    FS.WebFS=WebFS;
    FS.zip=zip;
    //if (zip.JSZip) DU.external.Promise=zip.JSZip.external.Promise;
    if (typeof window=="object") window.FS=FS;
    var rootFS;
    var env=new Env({});
    FS.addFSType=FSClass.addFSType;
    FS.availFSTypes=FSClass.availFSTypes;

    FS.setEnvProvider=function (e) {
        env=e;
    };
    FS.getEnvProvider=function () {
        return env;
    };
    FS.setEnv=function (key, value) {
        if (typeof key=="object") {
            for (var k in key) {
                env.set(k,key[k]);
            }
        }else {
            env.set(key,value);
        }
    };
    FS.getEnv=function (key) {
        if (typeof key=="string") {
            return env.get(key);
        }else {
            return env.value;
        }
    };
    FS.localStorageAvailable=function () {
        try {
            // Fails when Secret mode + iframe in other domain
            return (typeof localStorage==="object");
        } catch(e) {
            return false;
        }
    };
    FS.init=function (fs) {
        if (rootFS) return;
        if (!fs) {
            if (NativeFS.available) {
                fs=new NativeFS();
            } else if (FS.localStorageAvailable()) {
                fs=new LSFS(localStorage);
            } else if (typeof importScripts==="function") {
                // Worker
                /* global self*/
                self.addEventListener("message", function (e) {
                    var data=e.data;
                    if (typeof data==="string") {
                        data=JSON.parse(data);
                    }
                    switch(data.type) {
                    case "upload":
                        FS.get(data.base).importFromObject(data.data);
                        break;
                    case "observe":
                        rootFS.observe(data.path, function (path,meta) {
                            self.postMessage(JSON.stringify({
                                type: "changed",
                                path: path,
                                content: FS.get(path).text(),
                                meta: meta
                            }));
                        });
                        break;
                    }
                });
                fs=LSFS.ramDisk();
            } else {
                fs=LSFS.ramDisk();
            }
        }
        rootFS=new RootFS(fs);
    };
    FS.getRootFS=function () {
        FS.init();
        return rootFS;
    };
    FS.get=function () {
        FS.init();
        return rootFS.get.apply(rootFS,arguments);
    };
    FS.expandPath=function () {
        return env.expandPath.apply(env,arguments);
    };
    FS.resolve=function (path, base) {
        FS.init();
        if (SFile.is(path)) return path;
        path=env.expandPath(path);
        if (base && !P.isAbsolutePath(path)) {
            base=env.expandPath(base);
            return FS.get(base).rel(path);
        }
        return FS.get(path);
    };
    FS.mount=function () {
        FS.init();
        return rootFS.mount.apply(rootFS,arguments);
    };
    FS.unmount=function () {
        FS.init();
        return rootFS.unmount.apply(rootFS,arguments);
    };
    FS.isFile=function (f) {
        return SFile.is(f);
    };
    return FS;
});

//-----------
	var resMod;
	requirejs(["FS"], function (r) {
	  resMod=r;
	});
	if (typeof window!=="undefined" && window.FS===undefined) window.FS=resMod;
	if (typeof module!=="undefined") module=resMod;
	return resMod;
});
//})(window);

},{"fs":1}],28:[function(require,module,exports){
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

},{}],29:[function(require,module,exports){
"use strict";
module.exports = function StringBuilder(bufSize = 1024) {
    const buf = [""];
    function rest(lastIdx) {
        return bufSize - buf[lastIdx].length;
    }
    function validate() {
        for (let i = 0; i < buf.length - 1; i++) {
            if (buf[i].length !== bufSize) {
                console.log(buf);
                throw new Error("NO!");
            }
        }
    }
    function append(content) {
        content = content + "";
        while (content) {
            let lastIdx = buf.length - 1;
            let r = rest(lastIdx);
            if (content.length <= r) {
                buf[lastIdx] += content;
                break;
            }
            else {
                buf[lastIdx] += content.substring(0, r);
                buf.push("");
                content = content.substring(r);
            }
        }
        validate();
    }
    function rowcol(index) {
        const row = Math.floor(index / bufSize);
        const col = index % bufSize;
        return { row, col };
    }
    function replace(index, replacement) {
        replacement = replacement + "";
        if (replacement.length > bufSize) {
            throw new Error("Cannot replace over len=" + bufSize);
        }
        let start = rowcol(index);
        let end = rowcol(index + replacement.length);
        if (start.row === end.row) {
            const line = buf[start.row];
            buf[start.row] = line.substring(0, start.col) + replacement + line.substring(end.col);
        }
        else {
            const line1 = buf[start.row];
            const line2 = buf[end.row];
            const len1 = bufSize - start.col;
            const len2 = replacement.length - len1;
            buf[start.row] = line1.substring(0, start.col) + replacement.substring(0, len1);
            buf[end.row] = replacement.substring(len1) + line2.substring(len2);
        }
        validate();
    }
    function truncate(length) {
        while (true) {
            let lastIdx = buf.length - 1;
            let dec = buf[lastIdx].length - length;
            //console.log(buf,length, lastIdx,dec);
            if (dec >= 0) {
                buf[lastIdx] = buf[lastIdx].substring(0, dec);
                break;
            }
            else {
                buf.pop();
                length = -dec; // <=> l-=bl <=> l=l-bl <=> l=-(bl-l) <=> l=-dec
            }
        }
        validate();
    }
    function getLength() {
        const lastIdx = buf.length - 1;
        return bufSize * lastIdx + buf[lastIdx].length;
    }
    function last(len) {
        if (len > bufSize) {
            throw new Error("Cannot replace over len=" + bufSize);
        }
        const lastIdx = buf.length - 1;
        const deced = buf[lastIdx].length - len;
        if (deced >= 0) {
            return buf[lastIdx].substring(deced);
        }
        else {
            return buf[lastIdx - 1].substring(bufSize + deced) + buf[lastIdx];
        }
    }
    function toString() {
        return buf.join("");
    }
    return { append, replace, truncate, toString, getLength, last };
};

},{}],30:[function(require,module,exports){
"use strict";
var idseq = 1;
var paths = {}, queue = {}, root = self;
root.WorkerService = {
    install: function (path, func) {
        paths[path] = func;
    },
    serv: function (path, func) {
        this.install(path, func);
    },
    ready: function () {
        root.WorkerService.isReady = true;
        self.postMessage({ ready: true });
    },
    reverse: function (path, params) {
        var id = idseq++;
        return new Promise(function (succ, err) {
            queue[id] = function (e) {
                if (e.status == "ok") {
                    succ(e.result);
                }
                else {
                    err(e.error);
                }
            };
            self.postMessage({
                reverse: true,
                id: id,
                path: path,
                params: params
            });
        });
    }
};
self.addEventListener("message", function (e) {
    var d = e.data;
    var id = d.id;
    var context = { id: id };
    if (d.reverse) {
        queue[d.id](d);
        delete queue[d.id];
        return;
    }
    try {
        Promise.resolve(paths[d.path](d.params, context)).then(function (r) {
            self.postMessage({
                id: id, result: r, status: "ok"
            });
        }, sendError);
    }
    catch (ex) {
        sendError(ex);
    }
    function sendError(e) {
        e = Object.assign({ name: e.name, message: e.message, stack: e.stack }, e || {});
        try {
            const j = JSON.stringify(e);
            e = JSON.parse(j);
        }
        catch (je) {
            e = e ? e.message || e + "" : "unknown";
            console.log("WorkerServiceW", je, e);
        }
        self.postMessage({
            id: id, error: e, status: "error"
        });
    }
});
root.WorkerService.install("WorkerService/isReady", function () {
    return root.WorkerService.isReady;
});
if (!root.console) {
    root.console = {
        log: function () {
            root.WorkerService.reverse("console/log", Array.prototype.slice.call(arguments));
        }
    };
}
module.exports = root.WorkerService;
//module.exports=self.WorkerService;

},{}],31:[function(require,module,exports){
"use strict";
const Assertion = function (failMesg = "Assertion failed: ") {
    this.failMesg = flatten(failMesg);
};
var $a;
Assertion.prototype = {
    _regedType: {},
    registerType: function (name, t) {
        this._regedType[name] = t;
    },
    MODE_STRICT: "strict",
    MODE_DEFENSIVE: "defensive",
    MODE_BOOL: "bool",
    fail: function () {
        var a = $a(arguments);
        var value = a.shift();
        a = flatten(a);
        a = this.failMesg.concat(value).concat(a).concat(["mode", this._mode]);
        console.log.apply(console, a);
        if (this.isDefensive())
            return value;
        if (this.isBool())
            return false;
        throw new Error(a.join(" "));
    },
    subAssertion: function () {
        var a = $a(arguments);
        a = flatten(a);
        return new Assertion(this.failMesg.concat(a));
    },
    assert: function (t, failMesg) {
        if (!t)
            return this.fail(t, failMesg);
        return t;
    },
    eq: function (a, b) {
        if (a !== b)
            return this.fail(a, "!==", b);
        return this.isBool() ? true : a;
    },
    ne: function (a, b) {
        if (a === b)
            return this.fail(a, "===", b);
        return this.isBool() ? true : a;
    },
    isset: function (a, n) {
        if (a == null)
            return this.fail(a, (n || "") + " is null/undef");
        return this.isBool() ? true : a;
    },
    is: function (value, type) {
        var t = type, v = value;
        if (t == null) {
            return this.fail(value, "assert.is: type must be set");
            // return t; Why!!!!???? because is(args,[String,Number])
        }
        if (t._assert_func) {
            t._assert_func.apply(this, [v]);
            return this.isBool() ? true : value;
        }
        this.assert(value != null, [value, "should be ", t]);
        if (t instanceof Array || (typeof global == "object" && typeof global.Array == "function" && t instanceof global.Array)) {
            if (!value || typeof value.length != "number") {
                return this.fail(value, "should be array:");
            }
            var self = this;
            for (var i = 0; i < t.length; i++) {
                let na = self.subAssertion("failed at ", value, "[", i, "]: ");
                if (t[i] == null) {
                    console.log("WOW!7", v[i], t[i]);
                }
                na.is(v[i], t[i]);
            }
            return this.isBool() ? true : value;
        }
        if (t === String || t == "string") {
            this.assert(typeof (v) == "string", [v, "should be a string "]);
            return this.isBool() ? true : value;
        }
        if (t === Number || t == "number") {
            this.assert(typeof (v) == "number", [v, "should be a number"]);
            return this.isBool() ? true : value;
        }
        if (t instanceof RegExp || (typeof global == "object" && typeof global.RegExp == "function" && t instanceof global.RegExp)) {
            this.is(v, String);
            this.assert(t.exec(v), [v, "does not match to", t]);
            return this.isBool() ? true : value;
        }
        if (t === Function) {
            this.assert(typeof v == "function", [v, "should be a function"]);
            return this.isBool() ? true : value;
        }
        if (typeof t == "function") {
            this.assert((v instanceof t), [v, "should be ", t]);
            return this.isBool() ? true : value;
        }
        if (t && typeof t == "object") {
            for (var k in t) {
                let na = this.subAssertion("failed at ", value, ".", k, ":");
                na.is(value[k], t[k]);
            }
            return this.isBool() ? true : value;
        }
        if (typeof t == "string") {
            var ty = this._regedType[t];
            if (ty)
                return this.is(value, ty);
            //console.log("assertion Warning:","unregistered type:", t, "value:",value);
            return this.isBool() ? true : value;
        }
        return this.fail(value, "Invaild type: ", t);
    },
    ensureError: function (action, err) {
        try {
            action();
        }
        catch (e) {
            if (typeof err == "string") {
                assert(e + "" === err, action + " thrown an error " + e + " but expected:" + err);
            }
            console.log("Error thrown successfully: ", e.message);
            return;
        }
        this.fail(action, "should throw an error", err);
    },
    setMode: function (mode) {
        this._mode = mode;
    },
    isDefensive: function () {
        return this._mode === this.MODE_DEFENSIVE;
    },
    isBool: function () {
        return this._mode === this.MODE_BOOL;
    },
    isStrict: function () {
        return !this.isDefensive() && !this.isBool();
    }
};
$a = function (args) {
    var a = [];
    for (var i = 0; i < args.length; i++)
        a.push(args[i]);
    return a;
};
var top = new Assertion();
var assert = function () {
    try {
        return top.assert.apply(top, arguments);
    }
    catch (e) {
        throw new Error(e.message);
    }
};
["setMode", "isDefensive", "is", "isset", "ne", "eq", "ensureError"].forEach(function (m) {
    assert[m] = function () {
        try {
            return top[m].apply(top, arguments);
        }
        catch (e) {
            console.log(e.stack);
            //if (top.isDefensive()) return arguments[0];
            //if (top.isBool()) return false;
            throw new Error(e.message);
        }
    };
});
assert.fail = top.fail.bind(top);
assert.MODE_STRICT = top.MODE_STRICT;
assert.MODE_DEFENSIVE = top.MODE_DEFENSIVE;
assert.MODE_BOOL = top.MODE_BOOL;
assert.f = function (f) {
    return {
        _assert_func: f
    };
};
assert.opt = function (t) {
    return assert.f(function (v) {
        return v == null || v instanceof t;
    });
};
assert.and = function () {
    var types = $a(arguments);
    assert(types instanceof Array);
    return assert.f(function (value) {
        var t = this;
        for (var i = 0; i < types.length; i++) {
            t.is(value, types[i]);
        }
    });
};
function flatten(a) {
    if (a instanceof Array) {
        var res = [];
        a.forEach(function (e) {
            res = res.concat(flatten(e));
        });
        return res;
    }
    return [a];
}
function isArg(a) {
    return "length" in a && "caller" in a && "callee" in a;
}
module.exports = assert;

},{}],32:[function(require,module,exports){
"use strict";
const root = (function () {
    if (typeof window !== "undefined")
        return window;
    if (typeof self !== "undefined")
        return self;
    if (typeof global !== "undefined")
        return global;
    return (function () { return this; })();
})();
module.exports = root;

},{}],33:[function(require,module,exports){

    const F=require("./ProjectFactory");
    const root=require("../lib/root");
    const {sourceFiles}=require("../lang/SourceFiles");
    //const A=require("../lib/assert");
    const langMod=require("../lang/langMod");

    F.addType("compiled",params=> {
        if (params.namespace && params.url) return urlBased(params);
        if (params.namespace && params.outputFile) return outputFileBased(params);
        if (params.dir) return dirBased(params);
        console.error("Invalid compiled project", params);
        throw new Error("Invalid compiled project");
    });
    function urlBased(params) {
        const ns=params.namespace;
        const url=params.url;
        const res=F.createCore();
        return res.include(langMod).include({
            getNamespace:function () {return ns;},
            getOutputURL() {
                return url;
            },
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes ns=",ns,"url=",url);
                await this.loadDependingClasses();
                const s=sourceFiles.add({url});
                await s.exec();
                console.log("Loaded compiled classes ns=",ns,"url=",url);
            },
        });
    }
    function dirBased(params) {
        const res=F.createDirBasedCore(params);
        return res.include(langMod).include({
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes params=",params);
                await this.loadDependingClasses();
                const outJS=this.getOutputFile();
                const map=outJS.sibling(outJS.name()+".map");
                const sf=sourceFiles.add({
                    text:outJS.text(),
                    sourceMap:map.exists() && map.text(),
                });
                await sf.exec();
                console.log("Loaded compiled classes params=",params);
            }
        });
    }
    function outputFileBased(params) {
        const ns=params.namespace;
        const outputFile=params.outputFile;
        const res=F.createCore();
        return res.include(langMod).include({
            getNamespace:function () {return ns;},
            getOutputFile() {
                return outputFile;
            },
            loadClasses: async function (ctx) {
                console.log("Loading compiled classes ns=",ns,"outputFile=",outputFile);
                await this.loadDependingClasses();
                const outJS=outputFile;
                const map=outJS.sibling(outJS.name()+".map");
                const sf=sourceFiles.add({
                    text:outJS.text(),
                    sourceMap:map.exists() && map.text(),
                });
                await sf.exec();
                console.log("Loaded compiled classes ns=",ns,"outputFile=",outputFile);
            },
        });
    }
    exports.create=params=>F.create("compiled",params);
    F.addDependencyResolver((prj, spec)=> {
        if (spec.dir && prj.resolve) {
            return F.create("compiled",{dir:prj.resolve(spec.dir)});
        }
        if (spec.namespace && spec.url) {
            return F.create("compiled",spec);
        }
        if (spec.namespace && spec.outputFile && prj.resolve) {
            return F.create("compiled",{
                namespace: spec.namespace,
                outputFile: prj.resolve(spec.outputFile)
            });
        }
    });
//});/*--end of define--*/

},{"../lang/SourceFiles":12,"../lang/langMod":17,"../lib/root":32,"./ProjectFactory":35}],34:[function(require,module,exports){

class NS2DepSpec {
    constructor(hashOrArray) {
        if (isArray(hashOrArray)) {
            this.array=hashOrArray;
        } else {
            this.array=Object.keys(hashOrArray).map(n=>hashOrArray[n]);
        }
    }
    has(ns) {
        return this.array.filter(e=>e.namespace===ns)[0];
    }
    specs() {
        return this.array;
    }
    [Symbol.iterator]() {
        return this.array[Symbol.iterator]();
    }
}
function isArray(o) {
    return (o && typeof o.slice==="function");
}
module.exports=NS2DepSpec;

},{}],35:[function(require,module,exports){
//define(function (require,exports,module) {
    // This factory will be widely used, even BitArrow.


    let Compiler, /*SourceFiles,*/sysMod,run2Mod;
    const  resolvers=[],types={};
    exports.addDependencyResolver=(f)=>{
        //f: (prj, spec) => prj
        resolvers.push(f);
    };
    exports.addType=(n,f)=>{
        types[n]=f;
    };
    exports.fromDependencySpec=function (prj,spec) {
        for (let f of resolvers) {
            const res=f(prj,spec);
            if (res) return res;
        }
        console.error("Invalid dep spec", spec);
        throw new Error("Invalid dep spec", spec);
        /* else if (typeof dprj=="object") {
            return this.create("compiled", {
                namespace:dprj.namespace,
                url: FS.expandPath(dprj.compiledURL)
            });
        }*/
    };
    exports.create=function (type,params) {
        if (!types[type]) throw new Error(`Invalid type ${type}`);
        return types[type](params);
    };
    class ProjectCore {
        getPublishedURL(){}//override in BAProject
        getOptions(opt) {return {};}//stub
        getName() {
            return this.dir.name().replace(/\/$/,"");
        }
        getDependingProjects() {
            var opt=this.getOptions();
            var dp=(opt.compiler && opt.compiler.dependingProjects) || [];
            return dp.map(dprj=>
                ProjectCore.factory.fromDependencySpec(this,dprj)
            );
        }
        include(mod) {
            for (let k of Object.getOwnPropertyNames(mod)) {
                if (typeof mod[k]==="function") this[k]=mod[k];
            }
            return this;
        }
        delegate(obj) {
            if (obj.constructor.prototype) {
                const add=k=>{
                    if (typeof obj[k]==="function") this[k]=(...args)=>obj[k](...args);
                };
                for (let k of Object.getOwnPropertyNames(obj.constructor.prototype)) add(k);
            }
            return this;
        }
    }
    ProjectCore.factory=exports;
    exports.createCore=()=>new ProjectCore();
    const dirBasedMod={
        getDir() {return this.dir;},
        resolve(rdir){// not in compiledProject
            if (rdir instanceof Array) {
                var res=[];
                rdir.forEach(function (e) {
                    res.push(this.resolve(e));
                });
                return res;
            }
            if (typeof rdir=="string") {
                /*global FS*/ //TODO
                if (typeof FS!=="undefined") {
                    return FS.resolve(rdir, this.getDir().path());
                } else {
                    return this.getDir().rel(rdir);
                }
            }
            if (!rdir || !rdir.isDir) throw new Error("Cannot TPR.resolve: "+rdir);
            return rdir;
        },
        getOptions(opt) {
            return this.getOptionsFile().obj();
        },
        getOptionsFile() {// not in compiledProject
            var resFile=this.dir.rel("options.json");
            return resFile;
        },
        setOptions(opt) {// not in compiledProject
            return this.getOptionsFile().obj(opt);
        },
        fixOptions(TPR,opt) {// required in BAProject
            if (!opt.compiler) opt.compiler={};
        },
        getOutputFile(lang) {// not in compiledProject
            var opt=this.getOptions();
            var outF=this.resolve(opt.compiler.outputFile||"js/concat.js");
            if (outF.isDir()) {
                throw new Error("out: directory style not supported");
            }
            return outF;
        },
        removeOutputFile() {// not in compiledProject
            this.getOutputFile().rm();
        },
        path(){return this.dir.path();},// not in compiledProject
        getEXT() {throw new Error("getEXT must be overriden.");},//stub
        sourceFiles() {
            const res={};
            const ext=this.getEXT();
    		this.dir.recursive(collect);
    		function collect(f) {
    			if (f.endsWith(ext)) {
    				var nb=f.truncExt(ext);
    				res[nb]=f;
    			}
    		}
    		return res;
        }
    };
    exports.createDirBasedCore=function (params) {
        const res=this.createCore();
        res.dir=params.dir;
        if (!res.dir.exists()) throw new Error(res.dir.path()+" Does not exist.");
        return res.include(dirBasedMod);
    };
//});/*--end of define--*/

},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTonyuClass = void 0;
function isTonyuClass(v) {
    return typeof v === "function" && v.meta && !v.meta.isShim;
}
exports.isTonyuClass = isTonyuClass;

},{}],37:[function(require,module,exports){
"use strict";
function TError(message, src, pos, len = 0) {
    let rc;
    const extend = (dst, src) => { for (var k in src)
        dst[k] = src[k]; return dst; };
    if (typeof src == "string") {
        rc = TError.calcRowCol(src, pos);
        message += " at " + (rc.row) + ":" + (rc.col);
        return extend(new Error(message), {
            isTError: true,
            src: {
                path: function () { return "/"; },
                name: function () { return "unknown"; },
                text: function () { return src; }
            },
            pos, row: rc.row, col: rc.col, len,
            raise: function () {
                throw this;
            }
        });
    }
    let klass = null;
    if (src && src.src) {
        klass = src;
        src = klass.src.tonyu;
    }
    if (typeof src.name !== "function" || typeof src.text !== "function") {
        throw new Error("src=" + src + " should be file object");
    }
    const s = src.text();
    rc = TError.calcRowCol(s, pos);
    message += " at " + src.name() + ":" + rc.row + ":" + rc.col;
    return extend(new Error(message), {
        isTError: true,
        src, pos, row: rc.row, col: rc.col, len, klass,
        raise: function () {
            throw this;
        }
    });
}
;
TError.calcRowCol = function (text, pos) {
    const lines = text.split("\n");
    let pp = 0, row, col;
    /*
aaa\n
bb\n
cc!cc
pp = 4  7   11
row=2  pp=11  pos=9
lines[row].length=4
    */
    col = 0;
    for (row = 0; row < lines.length; row++) {
        const ppp = pp;
        pp += lines[row].length + 1;
        if (pp > pos) {
            col = pos - ppp;
            break;
        }
    }
    return { row: row + 1, col: col + 1 };
};
module.exports = TError;
//module.exports=TError;

},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IT2 = exports.IT = void 0;
//define(["Klass"], function (Klass) {
//var Klass=require("../lib/Klass");
const SYMIT = typeof Symbol !== "undefined" && Symbol.iterator;
class ArrayValueIterator {
    constructor(set) {
        this.set = set;
        this.i = 0;
    }
    next() {
        if (this.i >= this.set.length)
            return false;
        this[0] = this.set[this.i];
        this.i++;
        return true;
    }
}
class ArrayKeyValueIterator {
    constructor(set) {
        this.set = set;
        this.i = 0;
    }
    next() {
        if (this.i >= this.set.length)
            return false;
        this[0] = this.i;
        this[1] = this.set[this.i];
        this.i++;
        return true;
    }
}
class ObjectKeyIterator {
    constructor(set) {
        this.elems = [];
        for (var k in set) {
            this.elems.push(k);
        }
        this.i = 0;
    }
    next() {
        if (this.i >= this.elems.length)
            return false;
        this[0] = this.elems[this.i];
        this.i++;
        return true;
    }
}
class ObjectKeyValueIterator {
    constructor(set) {
        this.elems = [];
        for (var k in set) {
            this.elems.push([k, set[k]]);
        }
        this.i = 0;
    }
    next() {
        if (this.i >= this.elems.length)
            return false;
        this[0] = this.elems[this.i][0];
        this[1] = this.elems[this.i][1];
        this.i++;
        return true;
    }
}
class NativeIteratorWrapper {
    constructor(it) {
        this.i = 0;
        this.it = it;
    }
    next() {
        const { value, done } = this.it.next();
        if (done)
            return false;
        this[0] = value;
        return true;
    }
}
function IT(set, arity) {
    if (set && typeof set.tonyuIterator === "function") {
        // TODO: the prototype of class having tonyuIterator will iterate infinitively
        return set.tonyuIterator(arity);
    }
    else if (set instanceof Array) {
        if (arity == 1) {
            return new ArrayValueIterator(set);
        }
        else {
            return new ArrayKeyValueIterator(set);
        }
    }
    else if (set && typeof set[SYMIT] === "function") {
        return new NativeIteratorWrapper(set[SYMIT]());
    }
    else if (set instanceof Object) {
        if (arity == 1) {
            return new ObjectKeyIterator(set);
        }
        else {
            return new ObjectKeyValueIterator(set);
        }
    }
    else {
        console.log(set);
        throw new Error(set + " is not iterable");
    }
}
exports.IT = IT;
function IT2(set, arity) {
    const it = IT(set, arity);
    return function* () {
        while (it.next()) {
            const yielded = [];
            for (let i = 0; i < arity; i++) {
                yielded[i] = it[i];
            }
            yield yielded;
        }
    }();
}
exports.IT2 = IT2;
//	module.exports=IT;
//   Tonyu.iterator=IT;
//	return IT;
//});

},{}],39:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const R_1 = __importDefault(require("../lib/R"));
const TonyuIterator_1 = require("./TonyuIterator");
const TonyuThread_1 = require("./TonyuThread");
const root_1 = __importDefault(require("../lib/root"));
const assert_1 = __importDefault(require("../lib/assert"));
const RuntimeTypes_1 = require("./RuntimeTypes");
// old browser support
if (!root_1.default.performance) {
    root_1.default.performance = {};
}
if (!root_1.default.performance.now) {
    root_1.default.performance.now = function now() {
        return Date.now();
    };
}
function thread() {
    var t = new TonyuThread_1.TonyuThread(Tonyu);
    t.handleEx = handleEx;
    return t;
}
function timeout(t) {
    return new Promise(function (s) {
        setTimeout(s, t);
    });
}
/*function animationFrame() {
    return new Promise( function (f) {
        requestAnimationFrame(f);
    });
}*/
const propReg = /^__([gs]et)ter__(.*)$/;
const property = {
    isPropertyMethod(name) {
        return propReg.exec(name);
    },
    methodFor(type, name) {
        return `__${type}ter__${name}`;
    }
};
function handleEx(e) {
    Tonyu.onRuntimeError(e);
}
function addMeta(fn, m) {
    // why use addMeta?
    // because when compiled from source, additional info(src file) is contained.
    // k.meta={...} erases these info
    assert_1.default.is(arguments, [String, Object]);
    return extend(klass.getMeta(fn), m);
}
function getMeta(klass) {
    if ((0, RuntimeTypes_1.isTonyuClass)(klass))
        return klass.meta;
    return klass;
}
var klass = {
    addMeta,
    removeMeta(n) {
        delete classMetas[n];
    },
    removeMetaAll(ns) {
        ns += ".";
        for (let n in classMetas) {
            if (n.substring(0, ns.length) === ns)
                delete classMetas[n];
        }
    },
    getMeta(k) {
        if (typeof k == "function") {
            return k.meta;
        }
        else if (typeof k == "string") {
            var mm = classMetas[k];
            if (!mm)
                classMetas[k] = mm = {};
            return mm;
        }
    },
    ensureNamespace(top, nsp) {
        var keys = nsp.split(".");
        var o = top;
        var i;
        for (i = 0; i < keys.length; i++) {
            var k = keys[i];
            if (!o[k])
                o[k] = {};
            o = o[k];
        }
        return o;
    },
    /*Function.prototype.constructor=function () {
        throw new Error("This method should not be called");
    };*/
    propReg,
    property,
    define(params) {
        // fullName, shortName,namspace, superclass, includes, methods:{name/fiber$name: func}, decls
        var parent = params.superclass;
        var includes = params.includes;
        var fullName = params.fullName;
        var shortName = params.shortName;
        var namespace = params.namespace;
        var methodsF = params.methods;
        var decls = params.decls;
        var nso = klass.ensureNamespace(Tonyu.classes, namespace);
        function addKlassAndNameToDecls(klass) {
            for (let name of Object.keys(decls.fields)) {
                Object.assign(klass.decls.fields[name], { name, klass });
            }
            for (let name of Object.keys(decls.methods)) {
                Object.assign(klass.decls.methods[name], { name, klass });
            }
        }
        //type ShimMeta=Meta & {isShim?:boolean, extenderFullName?:string};
        function chkmeta(m, ctx) {
            ctx = ctx || { path: [] };
            //if (ctx.isShim) return m;
            //ctx.path=ctx.path||[];
            ctx.path.push(m);
            if (m.isShim) {
                console.log("chkmeta::ctx", ctx);
                throw new Error("Shim found " + m.extenderFullName);
            }
            if (m.superclass)
                chkmeta(m.superclass, ctx);
            if (!m.includes) {
                console.log("chkmeta::ctx", ctx);
                throw new Error("includes not found");
            }
            m.includes.forEach(function (mod) {
                chkmeta(mod, ctx);
            });
            ctx.path.pop();
            return m;
        }
        function chkclass(c, ctx) {
            if (!c.prototype.hasOwnProperty("getClassInfo"))
                throw new Error("NO");
            if (!c.meta) {
                console.log("metanotfound", c);
                throw new Error("meta not found");
            }
            chkmeta(c.meta, ctx);
            return c;
        }
        function extender(_parent, ctx) {
            let parent = _parent;
            var isShim = !ctx.init;
            var includesRec = ctx.includesRec;
            if (includesRec[fullName])
                return parent;
            includesRec[fullName] = true;
            //console.log(ctx.initFullName, fullName);//,  includesRec[fullName],JSON.stringify(ctx));
            includes.forEach((m) => {
                parent = m.extendFrom(parent, extend(ctx, { init: false }));
            });
            var methods = typeof methodsF === "function" ? methodsF(parent) : methodsF;
            /*if (typeof Profiler!=="undefined") {
                Profiler.profile(methods, fullName);
            }*/
            var init = methods.initialize;
            delete methods.initialize;
            function exprWithName(name, expr, bindings) {
                const bnames = Object.keys(bindings);
                const f = new Function(...bnames, `const ${name}=${expr}; return ${name};`);
                return f(...bnames.map((k) => bindings[k]));
            }
            const chkT = (obj) => {
                if (!(obj instanceof res))
                    useNew(fullName);
            };
            const superInit = (init ? `init.apply(this,arguments);` :
                parent ? `parent.apply(this,arguments);` : "");
            const res = exprWithName(shortName, `function() {chkT(this);${superInit}}`, { chkT, init, parent });
            res.prototype = bless(parent, { constructor: res });
            if (isShim) {
                res.meta = { isShim: true, extenderFullName: fullName, func: res };
            }
            else {
                res.meta = addMeta(fullName, {
                    fullName, shortName, namespace, decls,
                    superclass: ctx.nonShimParent ? ctx.nonShimParent.meta : null,
                    includesRec,
                    includes: includes.map((c) => c.meta),
                    func: res
                });
            }
            // methods: res's own methods(no superclass/modules)
            //res.methods=methods;
            var prot = res.prototype;
            var props = {};
            //var propReg=klass.propReg;//^__([gs]et)ter__(.*)$/;
            //var k;
            for (let k in methods) {
                if (k.match(/^fiber\$/))
                    continue;
                prot[k] = methods[k];
                var fbk = "fiber$" + k;
                if (methods[fbk]) {
                    prot[fbk] = methods[fbk];
                    prot[fbk].methodInfo = prot[fbk].methodInfo || { name: k, klass: res, fiber: true };
                    prot[k].fiber = prot[fbk];
                }
                if (k !== "__dummy" && !prot[k]) {
                    console.log("WHY!", prot[k], prot, k);
                    throw new Error("WHY!" + k);
                }
                /*if (typeof methods[k]==="boolean") {
                    console.log(methods);
                    throw new Error(`${k} ${methods[k]}`);
                }*/
                if (k !== "__dummy") {
                    prot[k].methodInfo = prot[k].methodInfo || { name: k, klass: res };
                }
                // if profile...
                const r = property.isPropertyMethod(k);
                if (r) {
                    props[r[2]] = 1;
                    // __(r[1]g/setter)__r[2]
                    //props[r[2]]=props[r[2]]||{};
                    //props[r[2]][r[1]]=prot[k];
                }
            }
            prot.isTonyuObject = true;
            //console.log("Prots1",props);
            for (let k of Object.keys(props)) {
                const desc = {};
                for (let type of ["get", "set"]) {
                    const tter = prot[property.methodFor(type, k)];
                    if (tter) {
                        desc[type] = tter;
                    }
                }
                //console.log("Prots2",k, desc);
                Object.defineProperty(prot, k, desc);
            }
            prot.getClassInfo = function () {
                return res.meta;
            };
            if ((0, RuntimeTypes_1.isTonyuClass)(res))
                chkclass(res);
            return res; //chkclass(res,{isShim, init:false, includesRec:{}});
        }
        const res = extender(parent, {
            //isShim: false,
            init: true,
            //initFullName:fullName,
            includesRec: (parent ? extend({}, parent.meta.includesRec) : {}),
            nonShimParent: parent
        });
        addKlassAndNameToDecls(res.meta);
        res.extendFrom = extender;
        //addMeta(fullName, res.meta);
        nso[shortName] = res;
        //outerRes=res;
        //console.log("defined", fullName, Tonyu.classes,Tonyu.ID);
        return chkclass(res); //,{isShim:false, init:false, includesRec:{}});
    },
    /*isSourceChanged(_k:Meta|TonyuClass) {
        const k:Meta=getMeta(_k);
        if (k.src && k.src.tonyu) {
            if (!k.nodeTimestamp) return true;
            return k.src.tonyu.lastUpdate()> k.nodeTimestamp;
        }
        return false;
    },
    shouldCompile(_k:Meta|TonyuClass) {
        const k:Meta=getMeta(_k);
        if (k.hasSemanticError) return true;
        if (klass.isSourceChanged(k)) return true;
        var dks=klass.getDependingClasses(k);
        for (var i=0 ; i<dks.length ;i++) {
            if (klass.shouldCompile(dks[i])) return true;
        }
    },*/
    getDependingClasses(_k) {
        const k = getMeta(_k);
        var res = [];
        if (k.superclass)
            res = [k.superclass];
        if (k.includes)
            res = res.concat(k.includes);
        return res;
    }
};
function bless(klass, val) {
    if (!klass)
        return extend({}, val);
    return extend(Object.create(klass.prototype), val);
    //return extend( new klass() , val);
}
function extend(dst, src) {
    if (src && typeof src == "object") {
        for (var i in src) {
            dst[i] = src[i];
        }
    }
    return dst;
}
//alert("init");
const globals = {};
var classes = {}; // classes.namespace.classname= function
var classMetas = {}; // classes.namespace.classname.meta ( or env.classes / ctx.classes)
function setGlobal(n, v) {
    globals[n] = v;
}
function getGlobal(n) {
    return globals[n];
}
function getClass(n) {
    //CFN: n.split(".")
    var ns = n.split(".");
    var res = classes;
    ns.forEach(function (na) {
        if (!res)
            return;
        res = res[na];
    });
    if (!res && ns.length == 1) {
        var found;
        for (var nn in classes) {
            var nr = classes[nn][n];
            if (nr) {
                if (!res) {
                    res = nr;
                    found = nn + "." + n;
                }
                else
                    throw new Error((0, R_1.default)("ambiguousClassName", nn, n, found));
            }
        }
    }
    return res;
    //if (res instanceof Function) return res;//classes[n];
    //throw new Error(`Not a class: ${n}`);
}
function bindFunc(t, meth) {
    if (typeof meth != "function")
        return meth;
    var res = function () {
        return meth.apply(t, arguments);
    };
    res.methodInfo = Tonyu.extend({ thiz: t }, meth.methodInfo || {});
    if (meth.fiber) {
        res.fiber = function fiber_func() {
            return meth.fiber.apply(t, arguments);
        };
        res.fiber.methodInfo = Tonyu.extend({ thiz: t }, meth.fiber.methodInfo || {});
    }
    return res;
}
function invokeMethod(t, name, args, objName) {
    if (!t)
        throw new Error((0, R_1.default)("cannotInvokeMethod", objName, t, name));
    var f = t[name];
    if (typeof f != "function")
        throw new Error((0, R_1.default)("notAMethod", (objName == "this" ? "" : objName + "."), name, f));
    return f.apply(t, args);
}
function callFunc(f, args, fName) {
    if (typeof f != "function")
        throw new Error((0, R_1.default)("notAFunction", fName));
    return f.apply({}, args);
}
function checkNonNull(v, name) {
    if (v != v || v == null)
        throw new Error((0, R_1.default)("uninitialized", name, v));
    return v;
}
function A(args) {
    var res = [];
    for (var i = 1; i < args.length; i++) {
        res[i - 1] = args[i];
    }
    return res;
}
function useNew(c) {
    throw new Error((0, R_1.default)("newIsRequiredOnInstanciate", c));
}
function not_a_tonyu_object(o) {
    console.log("Not a tonyu object: ", o);
    throw new Error(o + " is not a tonyu object");
}
function hasKey(k, obj) {
    return k in obj;
}
function run(bootClassName) {
    var bootClass = getClass(bootClassName);
    if (!(0, RuntimeTypes_1.isTonyuClass)(bootClass))
        throw new Error((0, R_1.default)("bootClassIsNotFound", bootClassName));
    Tonyu.runMode = true;
    var boot = new bootClass();
    //var th=thread();
    //th.apply(boot,"main");
    var TPR = Tonyu.globals.$currentProject || Tonyu.currentProject;
    if (TPR) {
        //TPR.runningThread=th;
        TPR.runningObj = boot;
    }
    //$LASTPOS=0;
    //th.steps();
}
var lastLoopCheck = root_1.default.performance.now();
var prevCheckLoopCalled;
function checkLoop() {
    var now = root_1.default.performance.now();
    if (now - lastLoopCheck > 1000) {
        resetLoopCheck(10000);
        throw new Error((0, R_1.default)("infiniteLoopDetected"));
    }
    prevCheckLoopCalled = now;
}
function resetLoopCheck(disableTime) {
    lastLoopCheck = root_1.default.performance.now() + (disableTime || 0);
}
function is(obj, klass) {
    if (!obj)
        return false;
    if (!klass)
        return false;
    if (obj instanceof klass)
        return true;
    if (typeof obj.getClassInfo === "function" && (0, RuntimeTypes_1.isTonyuClass)(klass)) {
        return obj.getClassInfo().includesRec[klass.meta.fullName];
    }
    return false;
}
//setInterval(resetLoopCheck,16);
const Tonyu = {
    thread,
    supports_await: true,
    klass, bless, extend, messages: R_1.default,
    globals, classes, classMetas, setGlobal, getGlobal, getClass,
    timeout,
    bindFunc, not_a_tonyu_object, is,
    hasKey, invokeMethod, callFunc, checkNonNull,
    iterator: TonyuIterator_1.IT, iterator2: TonyuIterator_1.IT2, run, checkLoop, resetLoopCheck,
    currentProject: null,
    currentThread: null,
    runMode: false,
    onRuntimeError: (e) => {
        if (root_1.default.alert)
            root_1.default.alert("Error: " + e);
        console.log(e.stack);
        throw e;
    },
    VERSION: 1560828115159,
    A, ID: Math.random()
};
//const TT=TonyuThreadF(Tonyu);
if (root_1.default.Tonyu) {
    console.error("Tonyu called twice!");
    throw new Error("Tonyu called twice!");
}
root_1.default.Tonyu = Tonyu;
module.exports = Tonyu;

},{"../lib/R":28,"../lib/assert":31,"../lib/root":32,"./RuntimeTypes":36,"./TonyuIterator":38,"./TonyuThread":40}],40:[function(require,module,exports){
"use strict";
//	var Klass=require("../lib/Klass");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonyuThread = void 0;
const R_1 = __importDefault(require("../lib/R"));
class KilledError extends Error {
}
//const SYM_Exception=Symbol("exception");
/*type Frame={
    prev?:Frame, func:Function,
};*/
//export= function TonyuThreadF(Tonyu) {
let idSeq = 1;
//try {window.cnts=cnts;}catch(e){}
class TonyuThread {
    constructor(Tonyu) {
        this.Tonyu = Tonyu;
        this.preempted = false;
        this.generator = null;
        this._isDead = false;
        //this._isAlive=true;
        //this.cnt=0;
        this._isWaiting = false;
        this.fSuspended = false;
        //this.tryStack=[];
        this.preemptionTime = Tonyu.globals.$preemptionTime || 5;
        this.onEndHandlers = [];
        this.onTerminateHandlers = [];
        this.id = idSeq++;
        this.age = 0; // inc if object pooled
    }
    isAlive() {
        return !this.isDead();
        //return this.frame!=null && this._isAlive;
    }
    isDead() {
        this._isDead = this._isDead || (!!this.termStatus) ||
            (this._threadGroup && (this._threadGroup.objectPoolAge != this.tGrpObjectPoolAge ||
                this._threadGroup.isDeadThreadGroup()));
        return this._isDead;
    }
    isDeadThreadGroup() {
        return this.isDead();
    }
    killThreadGroup() {
        this.kill();
    }
    setThreadGroup(g) {
        this._threadGroup = g;
        this.tGrpObjectPoolAge = g.objectPoolAge;
        //if (g) g.add(fb);
    }
    isWaiting() {
        return this._isWaiting;
    }
    suspend() {
        this.fSuspended = true;
        //this.cnt=0;
    }
    /*enter(frameFunc: Function) {
        //var n=frameFunc.name;
        //cnts.enterC[n]=(cnts.enterC[n]||0)+1;
        this.frame={prev:this.frame, func:frameFunc};
    }*/
    apply(obj, methodName, args) {
        if (!args)
            args = [];
        let method;
        if (typeof methodName == "string") {
            method = obj["fiber$" + methodName];
            if (!method) {
                throw new Error((0, R_1.default)("undefinedMethod", methodName));
            }
        }
        if (typeof methodName == "function") {
            const fmethod = methodName;
            method = fmethod.fiber;
            if (!method) {
                var n = fmethod.methodInfo ? fmethod.methodInfo.name : fmethod.name;
                throw new Error((0, R_1.default)("notAWaitableMethod", n));
            }
        }
        args = [this].concat(args);
        this.generator = method.apply(obj, args);
        /*var pc=0;
        return this.enter(function (th) {
            switch (pc){
            case 0:
                method.apply(obj,args);
                pc=1;break;
            case 1:
                th.termStatus="success";
                th.notifyEnd(th.retVal);
                args[0].exit();
                pc=2;break;
            }
        });*/
    }
    notifyEnd(r) {
        this.onEndHandlers.forEach(function (e) {
            e(r);
        });
        this.notifyTermination({ status: "success", value: r });
    }
    notifyTermination(tst) {
        this.onTerminateHandlers.forEach((e) => e(tst));
    }
    on(type, f) {
        if (type === "end" || type === "success")
            this.onEndHandlers.push(f);
        if (type === "terminate") {
            this.onTerminateHandlers.push(f);
            if (this.handleEx)
                delete this.handleEx;
        }
    }
    promise() {
        switch (this.termStatus) {
            case "success":
                return Promise.resolve(this.retVal);
            case "exception":
                return Promise.reject(this.lastEx);
            case "killed":
                return Promise.reject(new KilledError(this.termStatus));
            default:
        }
        return new Promise((succ, err) => {
            this.on("terminate", (st) => {
                if (st.status === "success") {
                    succ(st.value);
                }
                else if (st.status === "exception") {
                    err(st.exception);
                }
                else {
                    err(new KilledError(st.status));
                }
            });
        });
    }
    then(succ, err) {
        if (err)
            return this.promise().then(succ, err);
        else
            return this.promise().then(succ);
    }
    fail(err) {
        return this.promise().then(e => e, err);
    }
    /*gotoCatch(e) {
        var fb=this;
        if (fb.tryStack.length==0) {
            fb.termStatus="exception";
            fb.kill();
            if (fb.handleEx) fb.handleEx(e);
            else fb.notifyTermination({status:"exception",exception:e});
            return;
        }
        fb.lastEx=e;
        var s=fb.tryStack.pop();
        while (fb.frame) {
            if (s.frame===fb.frame) {
                fb.catchPC=s.catchPC;
                break;
            } else {
                fb.frame=fb.frame.prev;
            }
        }
    }
    startCatch() {
        var fb=this;
        var e=fb.lastEx;
        fb.lastEx=null;
        return e;
    }
    exit(res) {
        //cnts.exitC++;
        this.frame=(this.frame ? this.frame.prev:null);
        this.retVal=res;
    }
    enterTry(catchPC) {
        var fb=this;
        fb.tryStack.push({frame:fb.frame,catchPC:catchPC});
    }
    exitTry() {
        var fb=this;
        fb.tryStack.pop();
    }*/
    waitEvent(obj, eventSpec) {
        const fb = this;
        fb.suspend();
        if (typeof obj.on !== "function")
            return;
        let h = obj.on(...eventSpec, (...args) => {
            fb.lastEvent = args;
            fb.retVal = args[0];
            h.remove();
            fb.steps();
        });
    }
    /*runAsync(f:Function) {
        var fb=this;
        var succ=function () {
            fb.retVal=arguments;
            fb.steps();
        };
        var err=function () {
            var msg="";
            for (var i=0; i<arguments.length; i++) {
                msg+=arguments[i]+",";
            }
            if (msg.length==0) msg="Async fail";
            var e:any=new Error(msg);
            e.args=arguments;
            fb.gotoCatch(e);
            fb.steps();
        };
        fb.suspend();
        setTimeout(function () {
            f(succ,err);
        },0);
    }*/
    waitFor(j) {
        var fb = this;
        fb._isWaiting = true;
        fb.suspend();
        let p = j;
        if (p instanceof TonyuThread)
            p = p.promise();
        return Promise.resolve(p).then(function (r) {
            fb.retVal = r;
            fb.lastEx = null;
            fb.stepsLoop();
        }).then(e => e, function (e) {
            e = fb.wrapError(e);
            fb.lastEx = e;
            fb.stepsLoop();
        });
    }
    wrapError(e) {
        if (e instanceof Error)
            return e;
        var re = new Error(e);
        re.original = e;
        return re;
    }
    resume(retVal) {
        this.retVal = retVal;
        this.steps();
    }
    steps() {
        const fb = this;
        if (fb.isDead())
            return;
        const sv = this.Tonyu.currentThread;
        this.Tonyu.currentThread = fb;
        const lim = performance.now() + fb.preemptionTime;
        fb.preempted = false;
        fb.fSuspended = false;
        let awaited = null;
        try {
            while (performance.now() < lim && !this.fSuspended) {
                const n = this.generator.next();
                if (n.value) {
                    awaited = n.value;
                    break;
                }
                if (n.done) {
                    this.termStatus = "success";
                    this.notifyEnd(this.retVal);
                    break;
                }
            }
            fb.preempted = (!awaited) && (!this.fSuspended) && this.isAlive();
        }
        catch (e) {
            return this.exception(e);
        }
        finally {
            this.Tonyu.currentThread = sv;
            if (awaited) {
                //console.log("AWAIT!", awaited);
                return this.waitFor(awaited);
            }
        }
        /*
        while (fb.cnt>0 && fb.frame) {
            try {
                //while (new Date().getTime()<lim) {
                while (fb.cnt-->0 && fb.frame) {
                    fb.frame.func(fb);
                }
                fb.preempted= (!fb.fSuspended) && fb.isAlive();
            } catch(e) {
                fb.gotoCatch(e);
            }
        }*/
    }
    exception(e) {
        this.termStatus = "exception";
        this.lastEx = e;
        this.kill();
        if (this.handleEx)
            this.handleEx(e);
        else
            this.notifyTermination({ status: "exception", exception: e });
    }
    stepsLoop() {
        var fb = this;
        fb.steps();
        if (fb.preempted) {
            setTimeout(function () {
                fb.stepsLoop();
            }, 0);
        }
    }
    kill() {
        var fb = this;
        //fb._isAlive=false;
        fb._isDead = true;
        //fb.frame=null;
        if (!fb.termStatus) {
            fb.termStatus = "killed";
            fb.notifyTermination({ status: "killed" });
        }
    }
    /*clearFrame() {
        this.frame=null;
        this.tryStack=[];
    }*/
    *await(p) {
        this.lastEx = null;
        yield p;
        if (this.lastEx)
            throw this.lastEx;
        return this.retVal;
    }
}
exports.TonyuThread = TonyuThread;

},{"../lib/R":28}]},{},[2]);
