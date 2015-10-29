define(["FS","WebSite"], function (FS,WebSite) {
    var C={};
    var spawn;//=require("child_process").spawn;
    if (WebSite.isNW) {spawn=require("child_process").spawn;}
    C.convert=function (dir) {
        if (!WebSite.isNW) return;
        var ffmpeg=FS.get(WebSite.ffmpeg);
        if (!ffmpeg.exists()) return;
        dir.each(function (src) {
            if (src.endsWith(".mp3")) {
                var dst=src.up().rel(src.truncExt(".mp3")+".ogg");
                if (!dst.exists()) {
                    console.log("running",ffmpeg.path(),"-i",src.path(),dst.path());
                    var proc=spawn(ffmpeg.path(),["-i",src.path(),dst.path()]);
                    proc.stdin.end();
                }
            }
        });
    };
    return C;
});