# Tonyu System 2

Language and IDE for action game development using html5+js.

- Website: https://www.tonyu.jp/ (Japanese)
- Quick start: https://edit.tonyu.jp/ (You can switch language English/Japanese at right-top links)

## Tested browsers:

Windows 7/8/10
  - Chrome 81
  - Firefox 72
  - Edge 44

## How to build(full build, including compiler build)

- Clone [tonyu2-compiler](https://github.com/hoge1e3/tonyu2-compiler/) repository to the same directory.
  - ex.  `/some/folder/Tonyu2` and `/some/folder/tonyu2-compiler`
- Run the following node.js command.
~~~
cd tonyu2-compiler
npm install
cd ../Tonyu2
npm install
npm run build
~~~
- If you want to build again, just `npm run build`

## How to host Tonyu2 IDE on your Web server
(Currently the build is tested only in windows)
~~~
npm install
npm run build:g2
~~~
and copy www folder to your Web server.

## How to run your project as a native application

- Download [nw.js](https://nwjs.io/) and add following files in /path/to/Tonyu2/
- you can use `npm run runtime` (Windows 64bit)
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
