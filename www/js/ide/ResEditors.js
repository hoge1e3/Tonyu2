define(["ResEditor","Klass","OggConverter","WebSite","R"],
function (ResEditor,Klass,OggConverter,WebSite,R) {
    var mediaInfos={
        image:{name:R("image"),exts:["png","gif","jpg"],path:"images/",key:"images",
            extPattern:/\.(png|gif|jpe?g)$/i,contentType:/image\/(png|gif|jpe?g)/,
            newItem:function (name) {
                var r={type:"single"};//pwidth:32,pheight:32};
                if (name) r.name="$pat_"+name;
                return r;
            },
            builtins:WebSite.builtinAssetNames
        },
        sound:{name:R("sound"),exts:["mp3","ogg","mp4","m4a","mid","wav","mzo"],path:"sounds/",key:"sounds",
            extPattern:/\.(mp3|ogg|mp4|m4a|midi?|wav|mzo)$/i,contentType:/((audio\/(mpeg|mp3|ogg|x-m4a|midi?|wav|mzo))|(video\/mp4))/,
            newItem:function (name) {
                var r={};
                if (name) r.name="$se_"+name;
                return r;
            },
            close: function (context) {
                var prj=context.project;
                console.log(context);
                var hasMZO=false,hasMIDI=false;
                context.items.forEach(function (item) {
                    if (item.url.match(/\.mzo/)) hasMZO=true;
                    if (item.url.match(/\.midi?/)) hasMIDI=true;
                });
                if (hasMZO) prj.addPlugin("Mezonet");
                else prj.removePlugin("Mezonet");
                if (hasMIDI) prj.addPlugin("PicoAudio");
                else prj.removePlugin("PicoAudio");

                var rsrcDir=context.resourceDir;
                if (rsrcDir.exists()) {
                    OggConverter.convert(rsrcDir);
                }
            }
        }
    };
    return class {
        constructor(prj) {
            this.prj=prj;
            this.editors={};
            $("body").on("dragover",s).on("dragenter",s).on("drop",this.dropAndOpen.bind(this));
            function s(e) {
                e.stopPropagation();
                e.preventDefault();
            }
        }
        dropAndOpen(e) {
            e.stopPropagation();
            e.preventDefault();
            var eo=e.originalEvent;
            var files = Array.prototype.slice.call(eo.dataTransfer.files);
            console.log("DROP",e,files);
            if (files.length==0) return;
            for (var k in mediaInfos) {
                if (mediaInfos[k].extPattern.exec(files[0].name)) {
                    this.open(k);
                    this.curResEditor.dropAdd(e);
                }
            }
        }
        open(type) {// type "image" / "sound"
            this.editors[type]=this.editors[type]||ResEditor(this.prj,mediaInfos[type]);
            if (this.curResEditor && this.curResEditor!==this.editors[type]) {
                this.curResEditor.close();
            }
            this.curResEditor=this.editors[type];
            this.curResEditor.open();
        }
    };
});
