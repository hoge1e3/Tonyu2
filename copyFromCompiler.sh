SRC=../tonyu2-compiler
DST=www

#pre-built(browserified)
cp $SRC/test/fixture/BuilderClient4Sys.js $DST/js/lang/
cp $SRC/test/fixture/BuilderWorker.js $DST/
cp $SRC/test/fixture/TonyuRuntime.js $DST/js/runtime/
