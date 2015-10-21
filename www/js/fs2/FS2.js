define(["extend","PathUtil","MIMETypes","assert","SFile"],function (extend, P, M,assert,SFile){
    var FS=function () {
    };
    function stub(n) {
        throw new Error (n+" is STUB!");
    }
    extend(FS.prototype, {
        err: function (path, mesg) {
            throw new Error(path+": "+mesg);
        },
        // mounting
        fstab: function () {
            return this._fstab=this._fstab||[{fs:this, path:P.SEP}];
        },
        resolveFS:function (path, options) {
            assert.is(path,P.Absolute);
            var res;
            this.fstab().forEach(function (tb) {
                if (res) return;
                if (P.startsWith(path, tb.path)) {
                    res=tb.fs;
                }
            });
            if (!res) this.err(path,"Cannot resolve");
            return assert.is(res,FS);
        },
        isReadOnly: function (path, options) {// mainly for check ENTIRELY read only
            stub("isReadOnly");
        },
        mounted: function (parentFS, mountPoint ) {
            assert.is(arguments,[FS,P.AbsDir]);
            this.parentFS=parentFS;
            this.mountPoint=mountPoint;
        },
        relFromMountPoint: function (path) {
            assert.is(path, P.Absolute);
            if (this.parentFS) {
                assert.is(this.mountPoint, P.AbsDir);
                return P.relPath(path, this.mountPoint);
            } else {
                return P.relPath(path, P.SEP);
            }
        },
        dirFromFstab: function (path, options) {
            assert.is(path, P.AbsDir);
            var res=(options||{}).res || [];
            this.fstab().forEach(function (tb) {
                if (P.up( tb.path )==path) res.push(P.name(tb.path));
            });
            return res;
        },
        getRootFS: function () {
            var res;
            for (var r=this;r;r=r.parentFS){res=r;}
            return assert.is(res,FS);
        },
        //-------- end of mouting
        //-------- spec
        getReturnTypes: function (path, options) {
            //{getContent:String|DataURL|ArrayBuffer|OutputStream|Writer
            //   ,opendir:Array|...}
            stub("");
        },
        //-------  for file
        getContent: function (path, options) {
            // options:{type:String|DataURL|ArrayBuffer|OutputStream|Writer}
            // succ : [type],
            stub("");
        },
        setContent: function (path, content, options) {
            // content: String|ArrayBuffer|InputStream|Reader
            stub("");
        },
        getMetaInfo: function (path, options) {
            stub("");
        },
        setMetaInfo: function (path, info, options) {
            stub("");
        },
        mkdir: function (path, options) {
            stub("mkdir");
        },
        touch: function (path) {
            stub("touch");
        },
        exists: function (path, options) {
            // exists return false if path is existent by follwing symlink
            stub("exists");
        },
        opendir: function (path, options) {
            //ret: [String] || Stream<string> // https://nodejs.org/api/stream.html#stream_class_stream_readable
            stub("opendir");
        },
        cp: function(path, dst, options) {
            assert.is(arguments,[P.Absolute,P.Absolute]);
            options=options||{};
            var srcIsDir=this.isDir(path);
            var dstIsDir=this.resolveFS(dst).isDir(dst);
            if (!srcIsDir && !dstIsDir) {
                var src=this.getContent(path,{type:String}); // TODO
                var res=this.resolveFS(dst).setContent(dst,src);
                if (options.a) {
                    //console.log("-a", this.getMetaInfo(path));
                    this.setMetaInfo(dst, this.getMetaInfo(path));
                }
                return res;
            } else {
                throw "only file to file supports";
            }
        },
        mv: function (path,to,options) {
            this.cp(path,to,options);
            return this.rm(path,{r:true});
        },
        rm:function (path, options) {
            stub("");
        },
        link: function (path, to, options) {
            throw new Error("This FS not support link.");
        },
        getURL: function (path) {
            stub("");
        }
    });
    //res=[]; for (var k in a) { res.push(k); } res;
    FS.delegateMethods=function (prototype,  methods) {
        for (var n in methods) {
            (function (n){
                prototype[n]=function () {
                    var path=arguments[0];
                    assert.is(path,P.Absolute);
                    var fs=this.resolveFS(path);
                    //console.log(n, f.fs===this  ,f.fs, this);
                    if (fs!==this) {
                        //arguments[0]=f.path;
                        return fs[n].apply(fs, arguments);
                    } else {
                        return methods[n].apply(this, arguments);
                    }
                };
            })(n);
        }
    };
    FS.delegateMethods(FS.prototype, {
        assertWriteable: function (path) {
            if (this.isReadOnly(path)) this.err(path, "read only.");
        },
        mount: function (path, fs, options) {
            assert.is(arguments,[P.AbsDir, FS] );
            if (this.exists(path)) {
                throw new Error(path+": Directory exists");
            }
            var parent=P.up(path);
            if (parent==null) throw new Error("Cannot mount on root");
            if (!this.exists(parent)) {
                throw new Error(path+": Parent Directory not exist");
            }
            fs.mounted(this, path);
            this.fstab().unshift({path:path, fs:fs});
        },
        getContentType: function (path, options) {
            var e=P.ext(path);
            return M[e] || (options||{}).def || "application/octet-stream";
        },
        isText:function (path) {
            var m=this.getContentType(path);
            return P.startsWith( m, "text");
        },
        assertExist: function (path, options) {
            if (!this.exists(path, options)) {
                this.err(path, ": No such "+(P.isDir(path)?"directory":"file"));
            }
        },
        isDir: function (path,options) {
            return P.isDir(path);
        },
        find: function (path, options) {
            assert.is(arguments,[P.Absolute]);
            var ls=this.opendir(path, options);
            var t=this;
            var res=[path];
            ls.forEach(function (e) {
                var ep=P.rel(path, e);
                if (P.isDir(ep)) {
                    var fs=t.resolveFS(ep);
                    res=res.concat(
                            fs.find( ep ,options)
                    );
                } else {
                    res.push( ep );//getPathFromRootFS
                }
            });
            return res;
        },
        resolveLink: function (path) {
            assert.is(path,P.Absolute);
            // returns non-link path
            // ln -s /a/b/ /c/d/
            // resolveLink /a/b/    ->  /a/b/
            // resolveLink /c/d/e/f -> /a/b/e/f
            // resolveLink /c/d/non_existent -> /a/b/non_existent
            // isLink      /c/d/    -> /a/b/
            // isLink      /c/d/e/f -> null
            // ln /testdir/ /ram/files/
            // resolveLink /ram/files/sub/test2.txt -> /testdir/sub/test2.txt
            if (this.exists(path)) return path;
            // path=/ram/files/test.txt
            for (var p=path ; p ; p=P.up(p)) {
                assert(!this.mountPoint || P.startsWith(p, this.mountPoint), p+" is out of mountPoint. path="+path);
                var l=this.isLink(p);  // p=/ram/files/ l=/testdir/
                if (l) {
                    //        /testdir/    test.txt
                    var np=P.rel(l,P.relPath(path, p));  //   /testdir/test.txt
                    return assert.is(this.resolveFS(np).resolveLink(np),P.Absolute)  ;
                }
                if (this.exists(p)) return path;
            }
            return path;
        },
        isLink: function (path) {
            return null;
        },
        get: function (path) {
            assert.eq(this.resolveFS(path), this);
            return new SFile(this, path);
            //var r=this.resolveFS(path);
            //return new SFile(r.fs, r.path);
        }
    });
    return FS;
});
