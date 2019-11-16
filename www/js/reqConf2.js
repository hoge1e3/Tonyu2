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
            "deps": ["IndentBuffer"]
            //"exports": "disp"
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
        "Key": {
            "exports": "Key"
        },
        /*"TError": {
            "exports": "TError"
        },*/
        "fs/ROMk": {
            "deps": ["FS","WebSite"]
        },
        "fs/ROMd": {
            "deps": ["FS","WebSite"]
        },
        "fs/ROMs": {
            "deps": ["FS","WebSite"]
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
        Tonyu:{
            exports:"Tonyu"
        },
        T2MediaLib: {
            //deps: ["PicoAudio"],
            exports: "T2MediaLib"
        },
        PicoAudio: {
            exports: "PicoAudio"
        },
        GIFEncoder: {
            deps: ["LZWEncoder","NeuQuant"],
            exports: "GIFEncoder"
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
        GIF: {
            exports:"GIF"
        },
        promise: {
            export:"Promise"
        },
        FileSaver: {
            exports:"saveAs"
        },
        /*BuilderClient4Sys: {
            exports:"TonyuBuilderClient"
        },*/
        /*Debugger: {
            exports: "Debugger"
        }*/
    },
    // filepath - modulename(1 for same as filename)
    "revpaths": {
        "Kernel": {
            "js": {
                "concat.js": "tonyu.kernel"
            }
        },
        "js": {
            "build": {
                "buildAll": 1,
                "genROM": 1
            },
            "fs": {
                "Assets": 1,
                "SFileNW": 1,
                "ScriptTagFS": 1,
                "Shell": 1,
                "auth": "Auth",
                "blob": "Blob",
                "copyToKernel": 1,
                "FS": 1,
                "requestFragment": 1,
                "sync": "Sync",
                "syncWithKernel": 1,
                "DragDrop": 1
            },
            "fs2": {
                "zip": 1,
                "Content": 1,
                "DataURL": 1,
                "Env": 1,
                "FS2": 1,
                "LSFS": 1,
                "MIMETypes": 1,
                "NativeFS": 1,
                "PathUtil": 1,
                "RootFS": 1,
                "SFile": 1,
                "WebFS": 1,
                "assert": 1,
                "extend": 1,
                "DeferredUtil": 1
            },
            "fsui": {
                "FileList": 1,
                "FileMenu": 1,
                "Shell2": 1
            },
            "g2": {
                "selProject_concat.min": "selProject_concat",
                "editor_concat.min": "editor_concat",
                "SysDebugger_concat.min": "SysDebugger_concat"
            },
            "graphics": {
                "ImageList": 1,
                "ImageRect": 1,
                "PatternParser": 1,
                "TextRect": 1,
                "fukidashi": 1,
                "gif": {
                    "GIFEncoder": 1,
                    "LZWEncoder": 1,
                    "NeuQuant": 1
                },
                "gif2": {
                    "gif-concat": "GIF"
                }
            },
            "worker": {
                "GIFWorker": 1
            },
            "help": {
                "Arrow": 1,
                "HttpHelper": 1,
                "IFrameDialog": 1,
                "wiki": "Wiki",
                "wikiDialog": "WikiDialog",
                "wikiExporter": 1,
                "wikiFullScreen": 1
            },
            dialogs:{Dialogs:1},
            "ide": {
                RealtimeErrorMarker:1,
                EditorPopupMarker:1,
                kernelChecker:1,
                "ErrorDialog":1,
                "RunDialog": 1,
                "DiffDialog": 1,
                "ProjectItem": 1,
                "ErrorPos": "showErrorPos",
                "ImageDetailEditor": 1,
                "ImageResEditor": 1,
                "KernelDiffDialog": 1,
                "MainClassDialog": 1,
                "NWMenu": 1,
                "NewProjectDialog": 1,
                "GlobalDialog": 1,
                "ExportHTMLDialog": 1,
                "ImportHTMLDialog": 1,
                "OggConverter": 1,
                "ProjectOptionsEditor": 1,
                "ResEditor": 1,
                "ResEditors": 1,
                "TextEditor": 1,
                "TonyuProject": "Tonyu.Project",
                "compiledTonyuProject": 1,
                "copySample": 1,
                "editor": 1,//"ide/editor",
                "log": "Log",
                "noviceEditor": "ide/noviceEditor",
                "noviceSelProject": "ide/noviceSelProject",
                "searchDialog": 1,
                "selProject": 1,//"selProject",
                "thumbnail": 1,
                "wikiEditor": "ide/wikiEditor",
                sysMod:1,
                optionFixer:1,
                DebugDialog: 1,
            },
            "lang": {
                "ExpressionParser2": "ExpressionParser",
                "Grammar": 1,
                "IndentBuffer": 1,
                //"JSGenerator": "Tonyu.Compiler.JSGenerator",
                "ObjectMatcher": 1,
                //"Semantics": "Tonyu.Compiler.Semantics",
                "TypeChecker": 1,
                "Visitor": 1,
                "XMLBuffer": 1,
                "IndentFixer": 1,
                //"compiledProject": 1,
                //"compiler": "Tonyu.Compiler",
                "context": 1,
                "fixIndent": 1,
                "parse_tonyu2": "TonyuLang",
                "parser": 1,
                //"projectCompiler": "ProjectCompiler",
                "source-map": 1,
                "tonyu2_token": 1,
                //"langMod": 1,
                "BuilderClient":1,
                "BuilderClient4Sys":1,
                "SourceFiles":1,
                "stacktrace.min":"stacktrace",
                "StackDecoder":1,
            },
            "lib": {
                "miniJSLoader":1,
                "Class": 1,
                "FileSaver.min": "FileSaver",
                "JSONCol": 1,
                "KeyEventChecker": 1,
                "Klass": 1,
                //"PicoAudio.min": "PicoAudio",
                "SEnv": 1,
                "Tones.wdt": 1,
                "T2MediaLib": 1,
                "TextUtil": 1,
                "ace-noconflict": {
                    "ace": 1
                },
                "base64.min": "Base64",
                "difflib": 1,
                "diffview": 1,
                "disp": 1,
                "encoding.min": "Encoding",
                "exceptionCatcher": 1,
                "jquery.binarytransport": 1,
                "jszip": "JSZip",
                "profiler": "Profiler",
                "promise": 1,
                "WorkerLib": 1,
                "timbre": 1,
                "root": 1,
                WorkerServiceB: 1,
                "util": "Util"
            },
            project: {
                "CompiledProject": 1,
                "IDEProject":1 ,
                "ProjectFactory": 1,
                "Run3Project":1
            },
            "mkrun": {
                "mkrun": 1,
                "mkrunDiag": 1
            },
            "plugins": {
                "plugins": 1
            },
            "reqConf": 1,
            "runtime": {
                //"DebuggerCore": 1,
                "Debugger": 1,
                "SysDebugger": 1,
                "Key": 1,
                "StackTrace": 1,
                "TError": 1,
                "TonyuIterator": "Tonyu.Iterator",
                "TonyuRuntime": "Tonyu",
                "TonyuThread": "Tonyu.Thread",
                "TraceTbl": "Tonyu.TraceTbl",
                "WebSite": 1,
                "Platform": 1,
                "runScript": 1,
                "runScript2": 1,
                "runScript3": 1,
                "runScript_common": 1,
                "runtime": 1,
                "soundDiag": "SoundDiag",
                "workerLoader": 1
            },
            "social": {
                splashElement:1,
                "exportAsScriptTags": 1,
                "exportToExe": 1,
                "exportToJsdoit": 1,
                "forkBlobs": 1,
                "ZipImporter": 1,
                "importFromJsdoit": 1
            },
            "tonyu1": {
                "importFromTonyu1": 1,
                "t1map": "T1Map"
            },
            "ui": {
                "DiagAdjuster": 1,
                "UI": 1,
                "UIDiag": 1,
                "extLink": 1
            },
            "bar": "foo"
        }
    }
};
(function () {
    reqConf.paths={}
    function genPaths(tree, path) {
        for (var k in tree) {
            var v=tree[k];
            if (typeof v==="object") {
                genPaths(v,path+"/"+k);
            } else {
                var modName=v===1?k:v;
                reqConf.paths[modName]=(path+"/"+k).replace(/^\//,"");
            }
        }
    }
    genPaths(reqConf.revpaths,"");
    delete reqConf.revpaths;
    //console.log(reqConf);
    if (typeof exports!=="undefined") exports.conf=reqConf;
})();
