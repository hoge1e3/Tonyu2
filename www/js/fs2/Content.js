define(["DataURL","Util","assert"],function (DataURL,Util,assert) {
    var Content=function () {};
    function isBuffer(data) {
        return data instanceof ArrayBuffer ||
        (typeof Buffer!="undefined" && data instanceof Buffer);
    }
    Content.plainText=function (s,contentType){
        var b=new Content;
        b.contentType=contentType||"text/plain";
        b.plain=s;
        return b;
    };
    Content.url=function (s) {
        var b=new Content;
        b.url=s;
        return b;
    };
    Content.bin=function (bin, contentType) {
        assert(contentType, "contentType should be set");
        var b=new Content;
        if (bin && isBuffer(bin.buffer)) {
            b.bin=bin.buffer;
        } else if (isBuffer(bin)) {
            b.bin=bin;
        } else if (bin instanceof Array) {
            b.bin=new Uint8Array(bin).buffer;
        } else {
            throw new Error(bin+" is not a buffer");
        }
        b.contentType=contentType;
        return b;
    };

    var p=Content.prototype;
    p.toUint8Array=function () {
        return new Uint8Array(this.toArrayBuffer());
    };
    p.toArrayBuffer=function () {
        if (this.bin) {
            return this.bin;
        } else if (this.url) {
            var d=new DataURL(this.url);
            return this.bin=d.buffer;
        } else if (this.plain!=null) {
            return this.bin=Util.str2utf8bytes(this.plain).buffer;
        }
        throw new Error("No data");
    };
    p.toURL=function () {
        if (this.url) {
            return this.url;
        } else {
            if (!this.bin && this.plain!=null) {
                this.bin=Util.str2utf8bytes(this.plain);
            }
            if (this.bin) {
                var d=new DataURL(this.bin,this.contentType);
                return this.url=d.url;
            }
        }
        throw new Error("No data");
    };
    p.toPlainText=function () {
        if (this.plain!=null) {
            return this.plain;
        } else {
            if (this.url && !this.bin) {
                var d=new DataURL(this.url);
                this.bin=d.buffer;
            }
            if (this.bin) {
                return this.plain=Util.utf8bytes2str(new Uint8Array(this.bin));
            }
        }
        throw new Error("No data");
    };
    p.hasURL=function (){return this.url;};
    p.hasPlainText=function (){return this.plain!=null;};
    p.hasBin=function (){return this.bin;};

    return Content;
});
/*
requirejs(["Content"], function (C) {
   var s="てすとabc";
   var c1=C.plainText(s);
   test(c1,[s]);

   function test(c,path) {
       var p=c.toPlainText();
       var u=c.toURL();
       var b=c.toArrayBuffer();
       var a=c.toUint8Array();
       console.log(path,"->",p,u,a);
       var c1=C.plainText(p);
       var c2=C.url(u);
       var c3=C.bin(b,"text/plain");
       var c4=C.bin(a,"text/plain");
       if (path.length<2) {
           test(c1, path.concat([p]));
           test(c2, path.concat([u]));
           test(c3, path.concat([b]));
           test(c4, path.concat([a]));
       }

   }

});
*/