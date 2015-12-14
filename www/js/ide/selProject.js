requirejs(["FS","Wiki","Shell","Shell2",
           /*"copySample",*/"NewProjectDialog","UI","Sync","Auth",
           "zip","requestFragment","WebSite","extLink","DeferredUtil"],
  function (FS, Wiki,   sh,sh2,
            /*copySample,  */NPD,           UI, Sync, Auth,
            zip,requestFragment,WebSite,extLink,DU) {
$(function () {

    //copySample();
    //var home=FS.get(WebSite.tonyuHome);
    //var projects=FS.get(WebSite.projects[0]);//home.rel("Projects/");
    $("#prjItemList").empty();
    var prjDirs=WebSite.projects.map(function (e) {return FS.get(e);});
    prjDirs.forEach(ls);
    /*DU.each(prjDirs, function (dir){
        console.log("Each",dir);
        return ls(dir);
    });*/

    sh.cd(FS.get(WebSite.projects[0]));
    //var curDir=projects;
    if (WebSite.isNW) {
        $("#loginGrp").hide();
    }
    function ls(curDir) {
        var prj1dirList=$("<div>");
        $("#prjItemList").append(prj1dirList);
        prj1dirList.append(UI("h2",{"class":"prjDirHeader"},curDir.path()));
        var u=UI("div", {"class":"project"},
                ["a", {href:"javascript:;", on:{click:newDiag}},
                 ["img",{$var:"t",src:"../../images/tonew.png"}],
                 ["div", "新規作成"]
                 ]);
        u.appendTo(prj1dirList);
        function newDiag() {
            NPD.show(curDir, function (prjDir) {
                prjDir.mkdir();
                document.location.href="project.html?dir="+prjDir.path();
            });
        }
        var showAll;
        showAll=UI("div",
                ["div",{style:"height:120px;"}," "],
                ["button",{"class":"showAll",on:{
            click:function () {
                showAll.remove();
                dols(curDir,prj1dirList);
            }
        }},"すべて見る..."]);
        prj1dirList.append(showAll);
        if (!curDir.exists()) curDir.mkdir();
    }
    function dols(curDir,prj1dirList) {
        var d=[];
        curDir.each(function (f) {
            if (!f.isDir()) return;
            var l=f.lastUpdate();
            var r=f.rel("options.json");
            if (r.exists()) {
                l=r.lastUpdate();
            }
            d.push([f,l]);
        });
        d=d.sort(function (a,b) {
            return b[1]-a[1];
        });
        return DU.each(d,function (e) {
            var f=e[0];
            var name=f.name();

            if (!f.isDir()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"project.html?dir="+f.path()},
                     ["img",{$var:"t",src:"../../images/nowprint.png"}],
                     ["div", name]
                     ]);
            u.appendTo(prj1dirList);
            setTimeout(function () {
                var tn=f.rel("images/").rel("icon_thumbnail.png");
                //console.log(tn.path());
                if (tn.exists()) {
                    u.$vars.t.attr("src",tn.getURL());
                }
            },10);
            //$("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
            return DU.timeout(10);
        }).then(function (){
              prj1dirList.append(UI("div",{style:"height:150px;"}," "));
        });
    }
    Auth.currentUser(function (r){
        if (r) {
            $(".while-logged-out").hide();
            $("#login").text(r);
        } else {
            $(".while-logged-in").hide();
        }
    });
    var help=$("<iframe>").attr("src",WebSite.top+"/doc/index.html");
    help.height($(window).height()-$("#navBar").height());
    $("#wikiViewArea").append(help);



    $("#newPrj").click(function (){
    	NPD.show(FS.get(WebSite.projects[0]), function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    SplashScreen.hide();
    /*$("body").on("keydown",function (e) {
        if (e.keyCode==77 && WebSite.devMode) {
            WebSite.mobile=!WebSite.mobile;
            console.log("Mobile mode", WebSite.mobile);
            if (WebSite.mobile) {
                home.rel("mobile.txt").text("true");
            } else {
                home.rel("mobile.txt").rm();
            }
        }
    });*/
    extLink.all();
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
    $($("button.showAll").get(0)).click();
});
});
