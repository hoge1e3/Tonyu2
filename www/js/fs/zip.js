define(["FS","Shell","Util"/*"JSZip","FileSaver"*/],function (FS,sh,Util/*,JSZip,fileSaver*/) {
    if (typeof JSZip=="undefined") return {};
    var zip={};
    zip.zip=function (base,options) {
        var zip = new JSZip();
        function loop(dst, dir) {
            dir.each(function (f) {
                if (f.isDir()) {
                    var sf=dst.folder(f.name());
                    loop(sf, f);
                } else {
                    if (f.isText()) {
                        dst.file(f.name(),f.text());
                    } else {
                        dst.file(f.name(),f.getBytes({binType:ArrayBuffer}));
                    }
                }
            });
        }
        loop(zip, base);
        //zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        return zip.generateAsync({type:"blob"});
    };
    if (typeof saveAs!="undefined") {
        zip.dlzip=function (dir) {
            return zip.zip(dir).then(function (content) {
                return saveAs(content, dir.name().replace(/\/$/,"")+".zip");
            });
        };
        sh.dlzip=function (dir) {
            dir=sh.resolve(dir||".");
            return zip.dlzip(dir);
            //var content=zip.zip(dir);
            //saveAs(content, dir.name().replace(/\//g,"")+".zip");
        };
    }
    // same as SFileNW.js
    var binMap={".png": "image/png", ".jpg":"image/jpg", ".gif": "image/gif", ".jpeg":"image/jpg",
            ".mp3":"audio/mp3", ".ogg":"audio/ogg", ".mp4":"video/mp4", ".m4a":"audio/x-m4a", ".mid":"audio/mid", ".midi":"audio/mid", ".wav":"audio/wav"};
    zip.unzip=function (arrayBuf,destDir) {
        return JSZip.loadAsync(arrayBuf).then(function (zip) {
            for (var i in zip.files) {
                var zipEntry=zip.files[i];
                var dest=destDir.rel(zipEntry.name);
                for (var ext in binMap) {
                    var text;
                    if (dest.endsWith(ext)) {
                        var ct=binMap[ext];
                        text="data:"+ct+";base64,"+Util.Base64_From_ArrayBuffer(zipEntry.asArrayBuffer());
                    } else {
                        text=zipEntry.asText();
                    }
                    dest.text(text);
                }
                console.log(zipEntry.name);
            }
        });//new JSZip(arrayBuf);
    };
    return zip;
});
