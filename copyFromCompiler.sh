SRC=../../workspace/tonyu2-compiler
DST=www

#pre-built(browserified)
cp $SRC/test/fixture/BuilderClient4Sys.js $DST/js/lang/
cp $SRC/test/fixture/BuilderWorker.js $DST/
cp $SRC/test/fixture/Debugger.js $DST/js/runtime/
cp $SRC/test/fixture/TonyuRuntime.js $DST/js/runtime/

# need change define/require part( those are bundled in 4Sys)
#cp $SRC/src/lang/SourceFiles.js $DST/js/lang/
#cp $SRC/src/project/ProjectFactory.js $DST/js/project/
#cp $SRC/src/project/CompiledProject.js $DST/js/project/
