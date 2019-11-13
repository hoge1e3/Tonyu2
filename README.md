# Tonyu System 2

Language and IDE for action game development using html5+js.

- Website: https://www.tonyu.jp/ (Japanese)
- Quick start: https://edit.tonyu.jp/ (Japanese)

## Tested browsers:

Windows 7/8/10
  - Chrome 31
  - Firefox 25
  - Internet Explorer 11(runtime only)

## How to build

- The following files should be copied from [tonyu2-compiler](https://github.com/hoge1e3/tonyu2-compiler/), you can use copyFromCompier.sh
  - www/js/lang/BuilderClient4Sys.js
  - www/BuilderWorker.js
  - www/js/runtime/TonyuRuntime.js
- use build/build.bat to generate files www/js/g2/*
  - required node.js packages: `r.js`, `uglify-es`  
- To compile www/Kernel/js/concat.js, use [tonyu2-compiler](https://github.com/hoge1e3/tonyu2-compiler/), by following commands
~~~
cd /path/to/tonyu2-compiler/
node index.js /path/to/Tonyu2/www/Kernel/
~~~
- To run as a native application, download nw.js and add follwing files in /path/to/Tonyu2/
~~~
d3dcompiler_47.dll
ffmpeg.dll
icudtl.dat
libEGL.dll
libGLESv2.dll
locales/*
natives_blob.bin
node.dll
nw.dll
nw_100_percent.pak
nw_200_percent.pak
nw_elf.dll
resources.pak
v8_context_snapshot.bin 
nw.exe -> rename as Tonyu2.exe, change icon by resouce editors
~~~
