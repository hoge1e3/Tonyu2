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
                exports: "T2MediaLib"
            },
            JSZip: {
                exports:"JSZip"
            },
            Encoding: {
                exports:"Encoding"
            },
            Base64: {
                exports:"Base64"
            }
        },
        "paths": {
            Sync: "fs/sync",
            TT: "lang/tonyu2_token",
            Auth: "fs/auth",
            Encoding:"lib/encoding.min",
            Base64:"lib/base64.min",
            T1Map:"tonyu1/t1map",
            runtime: "runtime/runtime",
            difflib: "lib/difflib",
            diffview: "lib/diffview",
            timbre: "lib/timbre",
            SoundDiag: "runtime/soundDiag",
            T2MediaLib: "lib/T2MediaLib",
            KernelDiffDialog: "ide/KernelDiffDialog",
            searchDialog: "ide/searchDialog",
            DiffDialog: "ide/DiffDialog",
            ScriptTagFS:"fs/ScriptTagFS",
            KeyEventChecker: "lib/KeyEventChecker",
            NewProjectDialog: "ide/NewProjectDialog",
            WebSite: "runtime/WebSite",
            UI:"lib/UI",
            ImageResEditor: "ide/ImageResEditor",
            ResEditor: "ide/ResEditor",
            reqConf: "reqConf",
            //dumpScript: "build/dumpScript",
            buildAll: "build/buildAll",
            runScript: "runtime/runScript",
            copySample: "ide/copySample",
            "Shell": "fs/Shell",
            "ide/wikiEditor": "ide/wikiEditor",
            TextEditor: "ide/TextEditor",
            FileMenu: "fsui/FileMenu",
            ImageList: "graphics/ImageList",
            ImageRect: "graphics/ImageRect",
            ImageDetailEditor: "ide/ImageDetailEditor",
            "disp": "lib/disp",
            "Util": "lib/util",
            "Profiler": "lib/profiler",
            "TextUtil": "lib/TextUtil",
            "ObjectMatcher": "lang/ObjectMatcher",
            "Arrow": "help/Arrow",
            "context": "lang/context",
            "IndentBuffer": "lang/IndentBuffer",
            "ExpressionParser": "lang/ExpressionParser2",
            "Grammar": "lang/Grammar",
            "Parser": "lang/parser",
            "ProjectCompiler": "lang/projectCompiler",
            "TonyuLang": "lang/parse_tonyu2",
            "Visitor": "lang/Visitor",
            "XMLBuffer": "lang/XMLBuffer",
            "Tonyu": "runtime/TonyuLib",
            "Tonyu.Iterator": "runtime/Iterator",
            "Tonyu.Compiler": "lang/compiler",
            "Tonyu.Compiler.JSGenerator": "lang/JSGenerator",
            "Tonyu.Compiler.Semantics": "lang/Semantics",
            "fixIndent": "lang/indent",
            "Tonyu.TraceTbl": "runtime/TraceTbl",
            "Key": "runtime/Key",
            "TextRect": "graphics/TextRect",
            "fukidashi": "graphics/fukidashi",
            "FS": "fs/fs",
            "SFileNW": "fs/SFileNW",
            "Tonyu.Project": "ide/TonyuProject",
            "thumbnail": "ide/thumbnail",
            "showErrorPos": "ide/ErrorPos",
            "TError": "runtime/TError",
            "ide/editor": "ide/editor",
            //"fs/ROMk": "../fs/Tonyu/js/gen/ROM_k",
            //"fs/ROMd": "../fs/Tonyu/js/gen/ROM_d",
            //"fs/ROMs": "../fs/Tonyu/js/gen/ROM_s",
            "fs/ROMk": "gen/ROM_k",
            "fs/ROMd": "gen/ROM_d",
            "fs/ROMs": "gen/ROM_s",
            "ProjectOptionsEditor": "ide/ProjectOptionsEditor",
            "FileList": "fsui/FileList",
            "HttpHelper": "help/HttpHelper",
            "Wiki": "help/wiki",
            "WikiDialog": "help/wikiDialog",
            "wikiFullScreen": "help/wikiFullScreen",
            "wikiExporter": "help/wikiExporter",
            "ace": "lib/ace-noconflict/ace",
            "ide/selProject": "ide/selProject",
            "ide/noviceSelProject": "ide/noviceSelProject",
            "ide/noviceEditor": "ide/noviceEditor",
            PatternParser:"graphics/PatternParser",
            copyToKernel: "fs/copyToKernel",
            JSONCol: "lib/JSONCol",
            genROM: "build/genROM",
            Log:"ide/log",
            StackTrace:"runtime/StackTrace",
            Shell2:"fsui/Shell2",
            syncWithKernel:"fs/syncWithKernel",
            typeCheck:"lang/typeCheck",
            zip: "fs/zip",
            requestFragment: "fs/requestFragment",
            Blob: "fs/blob",
            exportToExe: "social/exportToExe",
            exportToJsdoit: "social/exportToJsdoit",
            exportAsScriptTags: "social/exportAsScriptTags",
            importFromJsdoit: "social/importFromJsdoit",
            importFromTonyu1:"tonyu1/importFromTonyu1",
            forkBlobs: "social/forkBlobs",
            JSZip:"lib/jszip.min",
            plugins:"plugins/plugins",
            exceptionCatcher:"lib/exceptionCatcher",
            Assets:"fs/Assets",
            MainClassDialog:"ide/MainClassDialog",
            "assert":"fs2/assert",
            "Contents":"fs2/Contents",
            "DataURL":"fs2/DataURL",
            "extend":"fs2/extend",
            "FS2":"fs2/FS2",
            "LSFS":"fs2/LSFS",
            "MIMETypes":"fs2/MIMETypes",
            "NativeFS":"fs2/NativeFS",
            "PathUtil":"fs2/PathUtil",
            "SandBoxFile":"fs2/SandBoxFile",
            "SFile":"fs2/SFile",
            "Env":"fs2/Env",
            "compiledProject":"lang/compiledProject",
            "DeferredUtil":"lib/DeferredUtil",
            "NWMenu":"ide/NWMenu",
            "IFrameDialog":"help/IFrameDialog",

            "foo":"bar"
        },
        "baseUrl": "../../js"
};
if (typeof exports!=="undefined") exports.conf=reqConf;
