define(["ResEditor","Klass"], function (ResEditor,Klass) {
    var mediaInfos={
        image:{name:"画像",exts:["png","gif","jpg"],path:"images/",key:"images",
            extPattern:/\.(png|gif|jpe?g)$/i,contentType:/image\/(png|gif|jpe?g)/,
            newItem:function (name) {
                var r={type:"single"};//pwidth:32,pheight:32};
                if (name) r.name="$pat_"+name;
                return r;
            }
        },
        sound:{name:"音声",exts:["mp3","ogg","mp4","m4a","mid","wav","mzo"],path:"sounds/",key:"sounds",
            extPattern:/\.(mp3|ogg|mp4|m4a|midi?|wav|mzo)$/i,contentType:/((audio\/(mp3|ogg|x-m4a|midi?|wav|mzo))|(video\/mp4))/,
            newItem:function (name) {
                var r={};
                if (name) r.name="$se_"+name;
                return r;
            }
        }
    };
    return Klass.define({
        $: function (prj) {
            this.prj=prj;
            this.editors={};
            $("body").on("dragover",s).on("dragenter",s).on("drop",this.dropAndOpen.bind(this));
            function s(e) {
                e.stopPropagation();
                e.preventDefault();
            }
        },
        dropAndOpen: function (e) {
            e.stopPropagation();
            e.preventDefault();
            var eo=e.originalEvent;
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            if (files.length==0) return;
            for (var k in mediaInfos) {
                if (mediaInfos[k].contentType.exec(files[0].type)) {
                    this.open(k);
                    this.curResEditor.dropAdd(e);
                }
            }
        },
        open: function (type) {// type "image" / "sound"
            this.editors[type]=this.editors[type]||ResEditor(this.prj,mediaInfos[type]);
            if (this.curResEditor && this.curResEditor!==this.editors[type]) {
                this.curResEditor.close();
            }
            this.curResEditor=this.editors[type];
            this.curResEditor.open();
        }
    });
});
