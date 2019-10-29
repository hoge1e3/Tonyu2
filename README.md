# Tonyu System 2

Language and IDE for action game development using html5+js.

- Website: https://www.tonyu.jp/ (Japanese)
- Quick start: https://edit.tonyu.jp/ (Japanese)

## Tested browsers:

Windows 7/8/10
  - Chrome 31
  - Firefox 25
  - Internet Explorer 11

## How to build

- The following files should be copied from [tonyu2-compiler](https://github.com/hoge1e3/tonyu2-compiler/), you can use copyFromCompier.sh
  - www/js/lang/BuilderClient4Sys.js
  - www/BuilderWorker.js
  - www/js/runtime/TonyuRuntime.js
- use build/build.bat to generate files www/js/g2/*
  - required node.js packages: `r.js`, `uglify-es`  
