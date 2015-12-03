define(["FS2","assert","PathUtil","extend","MIMETypes","DataURL"],
        function (FS,A,P,extend,MIME,DataURL) {
    var available=(typeof process=="object" && process.__node_webkit);
    if (!available) {
        return function () {
            throw new Error("This system not suppert native FS");
        };
    }
    var assert=A;
    var fs=require("fs");
    var NativeFS=function (rootPoint) {
        if (rootPoint) {
            A.is(rootPoint, P.AbsDir);
            this.rootPoint=rootPoint;
        }
    };
    NativeFS.available=true;
    var SEP=P.SEP;
    var json=JSON; // JSON changes when page changes, if this is node module, JSON is original JSON
    var Pro=NativeFS.prototype=new FS;
    Pro.toNativePath = function (path) {
        if (!this.rootPoint) return path;
        A.is(path, P.Absolute);
        return P.rel( this.rootPoint, this.relFromMountPoint(path));
    };
    Pro.arrayBuffer2Buffer= function (a) {
        if (a instanceof ArrayBuffer) {
            return new Buffer(new Uint8Array(a));
        }
        return a;
    };

    /*Pro.isText=function (path) {
        var e=P.ext(path);
        var m=MIME[e];
        return P.startsWith( m, "text");
    };*/
    FS.addFSType("NativeFS",function (path, options) {
            return new NativeFS(options.r);
    });
    NativeFS.prototype.fstype=function () {
        return "Native"+(this.rootPoint?"("+this.rootPoint+")":"");
    };
    FS.delegateMethods(NativeFS.prototype, {
        getReturnTypes: function(path, options) {
            assert.is(arguments,[String]);
            return {
                getContent: ArrayBuffer, opendir:[String]
            };
        },
        getContent: function (path, options) {
            options=options||{};
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            var t=options.type;
            this.assertExist(path);
            if (this.isText(path)) {
                /* GCT
                 * return Content.plainText( fs.readFileSync(np, {encoding:"utf8"}) );
                 */
                if (t===String) {
                    return A.isset(fs.readFileSync(np, {encoding:"utf8"}),path);
                } else {
                    return A.isset(fs.readFileSync(np),path);
                    //TODOvar bin=fs.readFileSync(np);
                    //throw new Error("TODO: handling bin file "+path);
                }
            } else {
                /* GCT
                 * return Content.bin( fs.readFileSync(np) );
                 */
                if (t===String) {
                    var bin=fs.readFileSync(np);
                    var d=new DataURL(bin, this.getContentType(path) );
                    return A.isset(d.url,path);
                } else {
                    return A.isset(fs.readFileSync(np),path);
                }
            }
        },
        setContent: function (path,content) {
            // GCT
            content=this.arrayBuffer2Buffer(content);
            A.is(path,P.Absolute);
            var pa=P.up(path);
            if (pa) this.getRootFS().mkdir(pa);
            var np=this.toNativePath(path);
            var cs=typeof content=="string";

            if (this.isText(path)) {
                fs.writeFileSync(np, content)
                /*if (cs) return fs.writeFileSync(np, content);
                else {
                    return fs.writeFileSync(np, content);
                    //throw new Error("TODO");
                }*/
            } else {
//                console.log("NatFS", cs, content);
                if (!cs) return fs.writeFileSync(np, content);
                else {
                    var d=new DataURL(content);
                    //console.log(d.buffer);
                    return fs.writeFileSync(np, d.buffer);
                }
            }
        },
        getMetaInfo: function(path, options) {
            this.assertExist(path, options);
            var s=this.stat(path);
            s.lastUpdate=s.mtime.getTime();
            return s;
        },
        setMetaInfo: function(path, info, options) {

            //options.lastUpdate

            //TODO:
        },
        isReadOnly: function (path) {
            // TODO:
            return false;
        },
        stat: function (path) {
            A.is(path,P.Absolute);
            var np=this.toNativePath(path);
            return fs.statSync(np);
        },
        mkdir: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            if (this.exists(path)){
                if (this.isDir(path)) {
                    return;
                } else {
                    throw new Error(this+" is a file. not a dir.");
                }
            }
            this.assertWriteable(path);
            var pa=P.up(path);
            if (pa) this.getRootFS().mkdir(pa);
            var np=this.toNativePath(path);
            return fs.mkdirSync(np);
        },
        opendir: function (path, options) {
            assert.is(arguments,[String]);
            var np=this.toNativePath(path);
            var ts=P.truncSEP(np);
            var r=fs.readdirSync(np).map(function (e) {
                var s=fs.statSync(ts+SEP+e);
                var ss=s.isDirectory()?SEP:"";
                return e+ss;
            });
            var res=this.dirFromFstab(path);
            return assert.is(res.concat(r),Array);
        },
        rm: function(path, options) {
            assert.is(arguments,[P.Absolute]);
            options=options||{};
            this.assertExist(path);
            var np=this.toNativePath(path);
            if (this.isDir(path)) {
                return fs.rmdirSync(np);
            } else {
                return fs.unlinkSync(np);
            }
        },
        exists: function (path, options) {
            var np=this.toNativePath(path);
            return fs.existsSync(np);
        },
        isDir: function (path) {
            if (!this.exists(path)) {
                return P.isDir(path);
            }
            return this.stat(path).isDirectory();
        },
        /*link: function(path, to, options) {
        }//TODO
        isLink:
        */
        touch: function (path) {
            if (!this.exists(path) && this.isDir(path)) {
                this.mkdir(path);
            } else if (this.exists(path) && !this.isDir(path) ) {
                // TODO(setlastupdate)
            }
        },
        getURL:function (path) {
            return "file:///"+path.replace(/\\/g,"/");
        }
    });
    return NativeFS;
});