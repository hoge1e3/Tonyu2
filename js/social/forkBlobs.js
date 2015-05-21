define(["Tonyu.Project","Auth","FS","UI","WebSite"],function (TPR,Auth,FS,UI,WebSite) {
    return function(srcUser, srcProject, dstProjectDir, options/*:{success:Function, placeHolder:JQ}*/) {
        var home=FS.get(WebSite.tonyuHome);
        var kernelDir=home.rel("Kernel/");
        var prj=TPR(dstProjectDir,kernelDir);
        var bl=prj.getBlobInfos();
        if (bl.length==0) return options.success();
        Auth.assertLogin({
            showLoginLink:function (url) {
                options.placeHolder.empty().append(
                        UI("div","Forkを完了させるためには，ログインが必要です：",
                           ["a",{href:url,target:"login",style:"color: blue;"},"ログインする"])
                );
            },
            success: function(user) {
                prj.convertBlobInfos(user);
                $.ajax({
                    type:"GET",
                    url:"/edit/forkBlobs",
                    data:{
                        srcUser:srcUser, srcProject: srcProject,
                        dstUser:user, dstProject:prj.getName()},
                    success: options.success,
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(textStatus);
                        throw errorThrown;
                    }
                });
            }
        });
    };
})