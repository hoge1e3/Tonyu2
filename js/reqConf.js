//"var reqConf="+JSON.stringify( getReq.genConf({base:"http://localhost:3002/js/", baseUrl:"js"})+";"
var reqConf={
        "shim": {
            "ide/wikiEditor": {
                 deps: ["Wiki","TextEditor","FileList","FileMenu","FS","TextUtil"]
            },
            TextEditor: {
                exports: "TextEditor"
            },
            FileMenu: {
                exports: "FileMenu"
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
            "ObjectMatcher": {
                "exports": "ObjectMatcher"
            },
            "Arrow": {
                "exports": "Arrow"
            },
            "context": {
                "exports": "context"
            },
            "IndentBuffer": {
                "exports": "IndentBuffer"
            },
            "ExpressionParser": {
                "deps": ["Parser"],
                "exports": "ExpressionParser"
            },
            "Grammar": {
                "deps": ["Parser"],
                "exports": "Grammar"
            },
            "Parser": {
                "deps": ["disp"],
                "exports": "Parser"
            },
            "TonyuLang": {
                "deps": ["Grammar", "XMLBuffer", "IndentBuffer", "disp", "Parser", "ExpressionParser", "TError"],
                "exports": "TonyuLang"
            },
            "Visitor": {
                "exports": "Visitor"
            },
            "XMLBuffer": {
                "deps": ["Parser"],
                "exports": "XMLBuffer"
            },
            "Tonyu": {
                "exports": "Tonyu"
            },
            "Tonyu.Compiler": {
                "deps": ["Tonyu", "TonyuLang", "ObjectMatcher", "TError", "IndentBuffer", "context", "Visitor"],
                "exports": "Tonyu.Compiler"
            },
            "fixIndent": {
                "deps": ["TonyuLang", "Visitor", "Grammar"],
                "exports": "fixIndent"
            },
            "Tonyu.TraceTbl": {
                "deps": ["Tonyu", "FS", "TError"],
                "exports": "Tonyu.TraceTbl"
            },
            "Sprites": {
                "deps": ["fukidashi", "Tonyu"],
                "exports": "Sprites"
            },
            "Key": {
                "exports": "Key"
            },
            "TextRect": {
                "exports": "TextRect"
            },
            "fukidashi": {
                "deps": ["TextRect"],
                "exports": "fukidashi"
            },
            "FS": {
                "exports": "FS"
            },
            "Tonyu.Project": {
                "deps": ["Tonyu", "Tonyu.Compiler", "TError", "FS", "Sprites", "Key", "Tonyu.TraceTbl"],
                "exports": "Tonyu.Project"
            },
            "showErrorPos": {
                "exports": "showErrorPos"
            },
            "TError": {
                "exports": "TError"
            },
            "ide/editor": {
                "deps": ["fs/ROM","ace", "Util", "Tonyu", "FS", "FileList", "showErrorPos", "fixIndent", "Wiki", "Tonyu.Project"]
            },
            "fs/ROM": {
                "deps": ["FS"]
            },
            "FileList": {
                "deps": ["FS"],
                "exports": "FileList"
            },
            "HttpHelper": {
                "exports": "HttpHelper"
            },
            "Wiki": {
                "deps": ["HttpHelper", "Arrow", "Util"],
                "exports": "Wiki"
            },
            "ace": {
                "exports": "ace"
            },
            "fs/import": {
                deps: ["FS"]
            },
            "fs/export": {
                deps: ["FS"]
            },
            "ide/selProject": {
                deps: ["fs/ROM", "FS","Wiki"]
            }
        },
        "paths": {
            "ide/wikiEditor": "ide/wikiEditor",
            TextEditor: "ide/TextEditor",
            FileMenu: "fs/FileMenu",
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
            "TonyuLang": "lang/parse_tonyu2",
            "Visitor": "lang/Visitor",
            "XMLBuffer": "lang/XMLBuffer",
            "Tonyu": "runtime/TonyuLib",
            "Tonyu.Compiler": "lang/compiler2",
            "fixIndent": "lang/indent",
            "Tonyu.TraceTbl": "runtime/TraceTbl",
            "Sprites": "runtime/Sprites",
            "Key": "runtime/Key",
            "TextRect": "runtime/TextRect",
            "fukidashi": "runtime/fukidashi",
            "FS": "fs/fs",
            "Tonyu.Project": "ide/TonyuProject",
            "showErrorPos": "ide/ErrorPos",
            "TError": "ide/TError",
            "ide/editor": "ide/editor",
            "fs/ROM": "fs/ROM",
            "FileList": "fs/FileList",
            "HttpHelper": "help/HttpHelper",
            "Wiki": "help/wiki",
            "ace": "lib/ace-noconflict/ace"
        },
        "baseUrl": "js"
};