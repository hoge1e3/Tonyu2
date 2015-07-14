define(["FS","WebSite"], function (FS,WebSite) {
    var Log={};
    Log.curFile=function () {
        var d=new Date();
        var y=d.getFullYear();
        var m=d.getMonth()+1;
        var da=d.getDate();
        return FS.get("/var/log/").rel(y+"/").rel(m+"/").rel(y+"-"+m+"-"+da+".log");
    };
    if (!WebSite.logging && !WebSite.isNW) {
        var varlog=FS.get("/var/log/");
        if (varlog.exists()) varlog.removeWithoutTrash();
    }
    Log.append=function (line) {
        if (!WebSite.logging) return;
        if (WebSite.isNW) return;
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