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
        function getLocalDirInfo() {
            var res={};
            local.recursive(function (file) {
                var lcm=file.metaInfo();
                res[file.relPath(local)]=lcm;
            },{excludes:options.excludes});
            return res;
        }
        function unionKeys() {
            var keys={};
            for (var i=0 ; i<arguments.length ;i++) {
                for (var key in arguments[i]) {keys[key]=1;}
            }
            return keys;
        }
        function getDelta(before,after) {
            //console.log("getDelta",before,after);
            var keys=unionKeys(before,after);
            var res={};
            for (var key in keys) {
                var inb=(key in before),ina=(key in after);
                //console.log("Compare", before[key], after[key], ina, inb);
                if (inb && !ina) {
                    // DELETED
                    res[key]={lastUpdate:-1, trashed:true};
                } else if (!inb && ina) {
                    // CREATEDED
                    res[key]={lastUpdate:after[key].lastUpdate, created:true};
                } else if (before[key].lastUpdate != after[key].lastUpdate) {
                    // MODIFIED
                    res[key]={
                            lastUpdate: after[key].lastUpdate,
                            modified:true
                    };
                    //console.log("Added", key, before[key].lastUpdate , after[key].lastUpdate)
                }
            }
            return res;
        }
        function getDeltaDelta(local,remote) {
            var keys=unionKeys(local,remote);
            var res={local:{}, remote:{} };
            for (var key in keys) {
                var inl=(key in local),inr=(key in remote);
                if (inl && !inr) {
                    res.local[key]=local[key];
                } else if (!inl && inr) {
                    res.remote[key]=remote[key];
                } else if (local[key].lastUpdate > remote[key].lastUpdate) {
                    res.local[key]=local[key];
                } else {
                    res.remote[key]=remote[key];
                }
            }
            return res;
        }
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
        var syncInfoDir=local.rel(".sync/");
        options.excludes=options.excludes||[];
        options.excludes=options.excludes.concat(syncInfoDir.name());
        var localDirInfoFile=syncInfoDir.rel("local.json");
        var remoteDirInfoFile=syncInfoDir.rel("remote.json");
        var lastLocalDirInfo=localDirInfoFile.exists()?localDirInfoFile.obj():{};
        var lastRemoteDirInfo=remoteDirInfoFile.exists()?remoteDirInfoFile.obj():{};
        var curLocalDirInfo=getLocalDirInfo();
        var localDelta=getDelta(lastLocalDirInfo, curLocalDirInfo);
        if (options.v) sh.echo("localDelta",localDelta);
        var uploads={},downloads=[],visited={};
        var user;
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
        }).then(function n1(curRemoteDirInfo) {
            var d;
            if (options.v) sh.echo("getDirInfo",curRemoteDirInfo);
            if (curRemoteDirInfo.NOT_LOGGED_IN) {
                d = new $.Deferred;
                setTimeout(function(){
                  d.reject(Sync.NOT_LOGGED_IN);
                }, 0);
                return d.promise();
            }
            user=curRemoteDirInfo.user;
            var base=local;//FS.get(curRemoteDirInfo.base);
            var remoteDelta=getDelta(lastRemoteDirInfo, curRemoteDirInfo.data);
            if (options.v) sh.echo("remoteDelta",remoteDelta);
            var dd=getDeltaDelta(localDelta,remoteDelta);
            var o,f,m;
            for (var key in dd.local) {
                 f=local.rel(key);
                 o={};
                 if (f.exists()) o.text=f.text();
                 m=dd.local[key];
                 for (var i in m) o[i]=m[i];
                 uploads[key]=o;
                 if (options.v)
                        sh.echo("Upload",key,m);
            }
            for (var key in dd.remote) {
                downloads.push(key);
                if (options.v)
                    sh.echo("Download",key,dd.remote[key]);
            }
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
            var newRemoteDirInfo=res.data;
            if (options.v) sh.echo("putFiles res=",res);
            var newLocalDirInfo=getLocalDirInfo();
            localDirInfoFile.obj(newLocalDirInfo);
            remoteDirInfoFile.obj(newRemoteDirInfo);

            var upds=[];
            for (var i in uploads) upds.push(i);
            return res={msg:res,uploads:upds,downloads: downloads,user:user};
        });
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
