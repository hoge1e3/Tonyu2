define(["FS","Shell",/*"requestFragment",*/"WebSite","SFile","assert"],
        function (FS,sh,/*rf,*/WebSite,SFile,A) {
    var Sync={};
    sh.sync=function () {
        // sync options:o      local=remote=cwd
        // sync dir:s|file options:o local=remote=dir
        // sync local:s|file remote:s|file options:o
        var local,remote,options,onend=function(){};
        var i=0;
        if (typeof arguments[i]=="string" || SFile.is(arguments[i])) {
            local=sh.resolve(arguments[i], true);
            i++;
            if (typeof arguments[i]=="string" || SFile.is(arguments[i])) {
                remote=sh.resolve(arguments[i], false);
                i++;
            }
        }
        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
        if (!local) remote=local=sh.cwd;
        if (!remote) remote=local;
        sh.echo("sync args=",local,remote,options);
        return Sync.sync(local,remote,options);
    };
    Sync.NOT_LOGGED_IN="Not logged in.";
    Sync.sync=function () {
        // sync dir:file options:o local=remote=dir
        // sync local:file remote:file options:o
        var local,remote,options;
        var i=0;
        if (SFile.is(arguments[i])) {
            local=arguments[i];
            i++;
            if (SFile.is(arguments[i])) {
                remote=arguments[i];
                i++;
            }
        }
        if (typeof arguments[i]=="object") { options=arguments[i]; i++;}
        if (!local) throw "Sync.sync: Local dir must be specified as file object";
        if (!remote) remote=local;
        if (!options) options={};
        if (options.test) options.v=1;
        var uploads={},downloads=[],visited={};
        function status(name, param) {
            sh.echo("Status: "+name+" param:",param);
            if (options.onstatus) {
                options.onstatus(name, param);
            }
        }
        function onError() {
            if (options.onerror) {
                options.onerror.apply(this, arguments);
            }
        }
        var req={base:remote.path(),excludes:JSON.stringify(options.excludes)};
        status("getDirInfo", req);
        return $.ajax({
            type:"get",
            url:A(WebSite.url.getDirInfo),
            data:req
        }).then(function n1(info) {
            //info=JSON.parse(info);
            var d;
            if (options.v) sh.echo("getDirInfo",info);
            if (info.NOT_LOGGED_IN) {
                d = new $.Deferred;
                setTimeout(function(){
                  d.reject(Sync.NOT_LOGGED_IN);
                }, 0);
                return d.promise();
            }
            var base=local;//FS.get(info.base);
            var data=info.data;
            for (var rel in data) {
                var file=base.rel(rel);
                var lcm=file.exists({includeTrashed:true}) ? file.metaInfo() : null;
                var rmm=data[rel];
                cmp(file,rel,lcm,rmm);
            }
            local.recursive(function (file) {
                var lcm=file.metaInfo();
                var rel=file.relPath(local);
                var rmm=data[rel];
                cmp(file,rel,lcm,rmm);
            },{includeTrashed:true, excludes:options.excludes});
            if (options.v) {
                sh.echo("uploads:",uploads);
                sh.echo("downloads:",downloads);
            }
            var req={base:remote.path(),paths:JSON.stringify(downloads)};
            status("getFiles", req);
            return $.ajax({
                type:"post",
                url:A(WebSite.url.getFiles),
                data:req
            });
        }).then(function n2(dlData) {
            sh.echo("dlData=",dlData);
            //dlData=JSON.parse(dlData);
            if (options.v) sh.echo("dlData:",dlData);
            var base=local;//FS.get(dlData.base);
            if (options.test) return;
            for (var rel in dlData.data) {
                var dlf=base.rel(rel);
                var d=dlData.data[rel];
                //if (options.v) sh.echo(dlf.path(), d);
                if (d.trashed) {
                    if (dlf.exists()) dlf.rm();
                } else {
                    dlf.text(d.text);
                }
                delete d.text;
                dlf.metaInfo(d);
            }
            var req={base:remote.path(),data:JSON.stringify(uploads)};
            req.pathInfo=A(WebSite.url.putFiles);
            status("putFiles", req);
            return $.ajax({  // TODO:requestFragment
                type:"post",
                url:req.pathInfo,
                data:req
            });
        }).then(function n3(res){
            if (options.v) sh.echo("putFiles res=",res);
            var upds=[];
            for (var i in uploads) upds.push(i);
            return res={msg:res,uploads:upds,downloads: downloads};
        });
        function cmp(f,rel,lcm,rmm) {
            if (options.v) console.log("compare",f.path(), rel,lcm,rmm);
            if (visited[rel]) return ;
            visited[rel]=1;
            if (rmm && (!lcm || lcm.lastUpdate<rmm.lastUpdate-5000)) {
                downloads.push(rel);
                if (options.v)
                    sh.echo((!lcm?"New ":"")+
                            "mtime(l-r) "+( (lcm?lcm.lastUpdate:0)-rmm.lastUpdate)+
                            " Download "+f+
                            " trash="+!!rmm.trashed);
            } else if (lcm && (!rmm || lcm.lastUpdate>rmm.lastUpdate+5000)) {
                var o={};
                if (f.exists()) o.text=f.text();
                var m=f.metaInfo();
                for (var i in m) o[i]=m[i];
                uploads[rel]=o;
                if (options.v)
                    sh.echo((!rmm?"New":"")+
                            "mtime(l-r) "+(lcm.lastUpdate-(rmm?rmm.lastUpdate:0))+
                            " Upload "+f+
                            " trash="+!!lcm.trashed);
            }

        }
    };
    sh.rsh=function () {
        var a=[];
        for (var i=0; i<arguments.length; i++) a[i]=arguments[i];
        return $.ajax({
            url:A(WebSite.url.rsh),
            data:{args:JSON.stringify(a)},
        });
    };
    return Sync;
});
