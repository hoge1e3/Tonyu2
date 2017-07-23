define(["FS","WebSite"], function (FS,WebSite) {
    var C={};
    var spawn;//=require("child_process").spawn;
    if (WebSite.isNW) {spawn=require("child_process").spawn;}
    C.convert=function (dir) {
        if (!WebSite.isNW) return;
        var ffmpeg=FS.get(WebSite.ffmpeg);
        if (!ffmpeg.exists()) return;
        console.log("Convert ogg->mp3 ",dir.path());
        dir.each(function (src) {
            if (src.endsWith(".mp3") || src.endsWith(".mp4") || src.endsWith(".m4a")) {
                var ext;
                if (src.endsWith(".mp3")) ext=".mp3";
                if (src.endsWith(".mp4")) ext=".mp4";
                if (src.endsWith(".m4a")) ext=".m4a";
                var dst=src.up().rel(src.truncExt(ext)+".ogg");
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
