define(["WebSite"],function (WebSite) {
    var FR={};
    var THRESH=1000*500;
    FR.ajax=function (options) {
        var d=options.data;
        if (typeof d!="object") throw "Data should be object: "+d;
        d=JSON.stringify(d);
        if (WebSite.serverType!="GAE" || d.length<THRESH) return $.ajax(options);
        var frags=[];
        var cnt=0;
        var id=Math.random();
        while (d.length>0) {
            frags.push(d.substring(0,THRESH));
            d=d.substring(THRESH);

        }
        var len=frags.length;
        var sent=0;
        var waitTime=1000;
        frags.forEach(function (frag,i) {
            $.ajax({type:"post",url:WebSite.top+"edit/sendFragment",data:{
                id:id, seq:i, len:len, content:frag
            },success: function (res) {
                console.log("sendFrag",res,i);//,frag);
                sent++;
                if (sent>=len) setTimeout(runFrag,waitTime);
            }, error: options.error
            });
        });
        function runFrag() {
            $.ajax({type:"post",url:WebSite.top+"edit/runFragments",data:{
                id:id},
                success: function (res) {
                    //console.log("runFrag res1=",res,arguments.length);
                    if (typeof res=="string") {
                        if (res.match(/^notCompleted:([\-\d]+)\/([\-\d]+)$/)) {
                            console.log("notcomp",res);
                            waitTime*=2;
                            setTimeout(runFrag,waitTime);
                            return;
                        }
                    }
                    options.success(res);
                },
                error: options.error,
                complete: options.complete
            });
        }

    };

    return FR;
});