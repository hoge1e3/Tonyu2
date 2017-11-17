//"var reqConf="+JSON.stringify( getReq.genConf({base:"http://localhost:3002/js/", baseUrl:"js"})+";"
var reqConf={
        "shim": {
            TextEditor: {
                exports: "TextEditor"
            },
            difflib: {
                exports: "difflib"
            },
            diffview: {
                exports: "diffview"
            },
            timbre: {
                exports: "T"
            },
            "disp": {
                "deps": ["IndentBuffer"],
                "exports": "disp"
            },
            "Util": {
                "exports": "Util"
            },
            "Profiler": {
                "exports": "Profiler"
            },
            "TextUtil": {
                "exports": "TextUtil"
            },
            "Arrow": {
                "exports": "Arrow"
            },
            "fixIndent": {
                "deps": ["TonyuLang", "Visitor", "Grammar"],
                "exports": "fixIndent"
            },
            "Key": {
                "exports": "Key"
            },
            /*"TextRect": {
                "exports": "TextRect"
            },
            "fukidashi": {
                "deps": ["TextRect"],
                "exports": "fukidashi"
            },*/
            "TError": {
                "exports": "TError"
            },
            "fs/ROMk": {
                "deps": ["FS","WebSite"]
            },
            "fs/ROMd": {
                "deps": ["FS","WebSite"]
            },
            "fs/ROMs": {
                "deps": ["FS","WebSite"]
            },
            "FileList": {
                "deps": ["FS"],
                "exports": "FileList"
            },
            "HttpHelper": {
                "exports": "HttpHelper"
            },
            "ace": {
                "exports": "ace"
            },
            "fs/import": {
                deps: ["FS"]
            },
            "fs/export": {
                deps: ["Shell","FS"]
            },
            T2MediaLib: {
                deps: ["PicoAudio"],
                exports: "T2MediaLib"
            },
            PicoAudio: {
                exports: "PicoAudio"
            },
            JSZip: {
                exports:"JSZip"
            },
            Encoding: {
                exports:"Encoding"
            },
            Base64: {
                exports:"Base64"
            },
            FileSaver: {
                exports:"saveAs"
            }
        },
        "paths": {
            "tonyu.kernel": "../Kernel/js/concat.js",
            "buildAll": "build/buildAll",
            "genROM": "build/genROM",
            "Assets": "fs/Assets",
            "SFileNW": "fs/SFileNW",
            "ScriptTagFS": "fs/ScriptTagFS",
            "Shell": "fs/Shell",
            "Auth": "fs/auth",
            "Blob": "fs/blob",
            "copyToKernel": "fs/copyToKernel",
            "FS": "fs/FS",
            //"FS": "fs/fs2stub",
            "requestFragment": "fs/requestFragment",
            "Sync": "fs/sync",
            "syncWithKernel": "fs/syncWithKernel",
            "zip": "fs2/zip",
            "Content": "fs2/Content",
            "DataURL": "fs2/DataURL",
            "Env": "fs2/Env",
            "FS2": "fs2/FS2",
            "LSFS": "fs2/LSFS",
            "MIMETypes": "fs2/MIMETypes",
            "NativeFS": "fs2/NativeFS",
            "PathUtil": "fs2/PathUtil",
            "RootFS": "fs2/RootFS",
            "SFile": "fs2/SFile",
            "WebFS": "fs2/WebFS",
            "assert": "fs2/assert",
            "extend": "fs2/extend",
            "FileList": "fsui/FileList",
            "FileMenu": "fsui/FileMenu",
            "Shell2": "fsui/Shell2",
            "fs/ROMd": "gen/ROM_d",
            "fs/ROMk": "gen/ROM_k",
            "fs/ROMs": "gen/ROM_s",
            "ImageList": "graphics/ImageList",
            "ImageRect": "graphics/ImageRect",
            "PatternParser": "graphics/PatternParser",
            "TextRect": "graphics/TextRect",
            "fukidashi": "graphics/fukidashi",
            "Arrow": "help/Arrow",
            "HttpHelper": "help/HttpHelper",
            "IFrameDialog": "help/IFrameDialog",
            "Wiki": "help/wiki",
            "WikiDialog": "help/wikiDialog",
            "wikiExporter": "help/wikiExporter",
            "wikiFullScreen": "help/wikiFullScreen",
            "DiffDialog": "ide/DiffDialog",
            "showErrorPos": "ide/ErrorPos",
            "ImageDetailEditor": "ide/ImageDetailEditor",
            "ImageResEditor": "ide/ImageResEditor",
            "KernelDiffDialog": "ide/KernelDiffDialog",
            "MainClassDialog": "ide/MainClassDialog",
            "NWMenu": "ide/NWMenu",
            "NewProjectDialog": "ide/NewProjectDialog",
            "OggConverter": "ide/OggConverter",
            "ProjectOptionsEditor": "ide/ProjectOptionsEditor",
            "ResEditor": "ide/ResEditor",
            "TextEditor": "ide/TextEditor",
            "Tonyu.Project": "ide/TonyuProject",
            "compiledTonyuProject": "ide/compiledTonyuProject",
            "copySample": "ide/copySample",
            "ide/editor": "ide/editor",
            "Log": "ide/log",
            "ide/noviceEditor": "ide/noviceEditor",
            "ide/noviceSelProject": "ide/noviceSelProject",
            "searchDialog": "ide/searchDialog",
            "ide/selProject": "ide/selProject",
            "thumbnail": "ide/thumbnail",
            "ide/wikiEditor": "ide/wikiEditor",
            "ExpressionParser": "lang/ExpressionParser2",
            "Grammar": "lang/Grammar",
            "IndentBuffer": "lang/IndentBuffer",
            "Tonyu.Compiler.JSGenerator": "lang/JSGenerator",
            "ObjectMatcher": "lang/ObjectMatcher",
            "Tonyu.Compiler.Semantics": "lang/Semantics",
            "TypeChecker": "lang/TypeChecker",
            "Visitor": "lang/Visitor",
            "XMLBuffer": "lang/XMLBuffer",
            "compiledProject": "lang/compiledProject",
            "Tonyu.Compiler": "lang/compiler",
            "context": "lang/context",
            "fixIndent": "lang/indent",
            "TonyuLang": "lang/parse_tonyu2",
            "Parser": "lang/parser",
            "ProjectCompiler": "lang/projectCompiler",
            "source-map": "lang/source-map",
            "TT": "lang/tonyu2_token",
            "Class": "lib/Class",
            "DeferredUtil": "lib/DeferredUtil",
            "FileSaver": "lib/FileSaver.min",
            "JSONCol": "lib/JSONCol",
            "KeyEventChecker": "lib/KeyEventChecker",
            "Klass": "lib/Klass",
            "PicoAudio": "lib/PicoAudio",
            "T2MediaLib": "lib/T2MediaLib",
            "TextUtil": "lib/TextUtil",
            "ace": "lib/ace-noconflict/ace",
            "Base64": "lib/base64.min",
            "difflib": "lib/difflib",
            "diffview": "lib/diffview",
            "disp": "lib/disp",
            "Encoding": "lib/encoding.min",
            "exceptionCatcher": "lib/exceptionCatcher",
            "jquery.binarytransport": "lib/jquery.binarytransport",
            "JSZip": "lib/jszip",
            "Profiler": "lib/profiler",
            "timbre": "lib/timbre",
            "Util": "lib/util",
            "mkrun": "mkrun/mkrun",
            "mkrunDiag": "mkrun/mkrunDiag",
            "plugins": "plugins/plugins",
            "reqConf": "reqConf",
            "Key": "runtime/Key",
            "StackTrace": "runtime/StackTrace",
            "TError": "runtime/TError",
            "Tonyu.Iterator": "runtime/TonyuIterator",
            "Tonyu": "runtime/TonyuLib",
            "Tonyu.Thread": "runtime/TonyuThread",
            "Tonyu.TraceTbl": "runtime/TraceTbl",
            "WebSite": "runtime/WebSite",
            "runScript": "runtime/runScript",
            "runScript2": "runtime/runScript2",
            "runtime": "runtime/runtime",
            "SoundDiag": "runtime/soundDiag",
            "exportAsScriptTags": "social/exportAsScriptTags",
            "exportToExe": "social/exportToExe",
            "exportToJsdoit": "social/exportToJsdoit",
            "forkBlobs": "social/forkBlobs",
            "importFromJsdoit": "social/importFromJsdoit",
            "importFromTonyu1": "tonyu1/importFromTonyu1",
            "T1Map": "tonyu1/t1map",
            "DiagAdjuster": "ui/DiagAdjuster",
            "UI": "ui/UI",
            "UIDiag": "ui/UIDiag",
            "extLink": "ui/extLink",
            "foo":"bar"
        },
        "baseUrl": "../../js"
};
if (typeof exports!=="undefined") exports.conf=reqConf;
function sortReqConf() {
    var paths=reqConf.paths;
    var ary=[];
    for (var k in paths) {
        ary.push({key:k,val:paths[k]});
    }
    ary.sort(function (a,b) {
        return a.val>b.val?1:a.val<b.val?-1:0;
    });
    console.log(ary);
    var buf="";
    ary.forEach(function (e) {
        buf+='"'+e.key+'": "'+e.val+'",\n';
    });
    console.log(buf);
}
