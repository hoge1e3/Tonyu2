define(["FS","WebSite","Shell"], function (FS,WebSite,sh) {
    var Log={};
    var logHome=WebSite.logdir ? FS.resolve("${logdir}") : null;
    var doLog=logHome && logHome.exists();
    Log.todayDir=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return logHome.rel(y+"/").rel(m+"/").rel(da+"/");
    };
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return Log.todayDir().rel(y+"-"+m+"-"+da+".log");
    };
    Log.curProject=function () {
        var d=new Date();
        var h=d.getHours();
        var m=d.getMinutes();
        var s=d.getSeconds();
        return Log.todayDir().rel("Project/").rel(digit(h,2)+"_"+digit(m,2)+"_"+digit(s,2)+"/");
    };
    function digit(n,zs) {
        n="00000000000000"+n;
        return n.substring(n.length-zs);
    }
    Log.dumpProject=function (dir) {
        if (!doLog) return;
        var out=Log.curProject();
        sh.cp(dir, out);
        Log.append("Dumped project to "+out.path());
    };
    if (!WebSite.logging && !WebSite.isNW) {
        var varlog=FS.get("/var/log/");
        if (varlog.exists() && varlog.fs.storage===localStorage) {
            varlog.removeWithoutTrash({r:true});
        }
    }
    Log.append=function (line) {
        if (!doLog) return;
        //if (WebSite.isNW) return;
        var f=Log.curFile();
        //console.log(Log, "append "+f);
        var t=(f.exists()?f.text():"");
        f.text(t+line+"\n");
    };
    function mul(con) {
        return con.replace(/\n/g,"\n|");
    }
    Log.d=function (tag,con) {
        Log.append(new Date()+": ["+tag+"]"+mul(con));
    };
    Log.e=function (tag,con) {
        Log.append(new Date()+": ERROR["+tag+"]"+mul(con));
    };
    return Log;
});