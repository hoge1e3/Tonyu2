define(["WebSite"],function (WebSite) {
    var auth={};
    auth.currentUser=function (onend) {
        //TODO: urlchange!
        $.ajax({type:"get",url:WebSite.controller+"?Login/curStatus",data:{withCsrfToken:true},
            success:function (res) {
                console.log("auth.currentUser",res);
                res=JSON.parse(res);
                var u=res.user;
                if (u=="null") u=null;
                console.log("user", u, "csrfToken",res.csrfToken);
                onend(u,res.csrfToken);
            }
        });
    };
    auth.assertLogin=function (options) {
        auth.currentUser(function (user,csrfToken) {
            if (user) {
                return options.success(user,csrfToken);
            }
            window.onLoggedIn=options.success;
            //TODO: urlchange!
            options.showLoginLink(WebSite.serverTop+"/login");
        });
    };
    auth.getBAInfo=async function (prjDir) {
        const unSlash=(s)=>s.replace(/\/$/,"");
        if (WebSite.serverType==="BA") {
            let info=await $.get(WebSite.controller+"?BAURL/show");
            let pdir=await $.get(WebSite.controller+"?Login/getPublishedDir", {project: prjDir.name() });
            WebSite.pubURLOfPrj=unSlash(info.BA_PUB_URL_IN_TOP||info.BA_PUB_URL)+"/"+pdir;
            WebSite.pubDirOfPrj="/pub/"+pdir;
            WebSite.pubURLOfPrj_service=unSlash(info.BA_PUB_URL)+"/"+pdir;
            WebSite.baRuntime_service=unSlash(info.BA_SERVICE_URL)+"/runtime/";
            console.log( WebSite.pubURLOfPrj, info, pdir);
        }
    };
    window.Auth=auth;
    return auth;
});