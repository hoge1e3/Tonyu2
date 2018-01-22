requirejs(["FS","Wiki","Shell","Shell2",
           /*"copySample",*/"NewProjectDialog","UI","Sync","Auth",
           "zip","requestFragment","WebSite","extLink","DeferredUtil",
       "ZipImporter","ProjectItem"],
  function (FS, Wiki,   sh,sh2,
            /*copySample,  */NPD,           UI, Sync, Auth,
            zip,requestFragment,WebSite,extLink,DU,
        ZipImporter,ProjectItem) {
$(function () {
    var HNOP="javascript:;";
    //copySample();
    //var home=FS.get(WebSite.tonyuHome);
    //var projects=FS.get(WebSite.projects[0]);//home.rel("Projects/");
    $("#prjItemList").empty();
    var search, prevKW="",kw="";
    $("#prjItemList").append(search=UI("div",
            ["input",{$var:"kw",placeholder:"Search..",value:kw}]));
    setInterval(function () {
        kw=search.$vars.kw.val().toLowerCase();
        if (kw!=prevKW) {
            $(".project").each(function () {
                var p=$(this);
                var nd=p.find(".projectName");
                if (kw=="" || nd[0] && nd.text().toLowerCase().indexOf(kw)>=0 ) {
                    p.show();
                } else{
                    p.hide();
                }
            });
            prevKW=kw;
        }
    },1000);
    var prjDirs=WebSite.projects.map(function (e) {return FS.get(e);});
    prjDirs.forEach(ls);
    if (WebSite.isNW) {
        $("#loginGrp").hide();
    }
    function ls(curDir,i) {
        if (!curDir.exists()) {
            if (i==0) {
                curDir.mkdir();
                //console.log(curDir.path(), curDir.exists());
            } else return;
        }
        var prj1dirList=$("<section>");
        $("#prjItemList").append(prj1dirList);
        prj1dirList.append(UI("h2",{"class":"prjDirHeader"},curDir.path()));
        var u=UI("div", {"class":"project newprj"},
            ["a", {href:HNOP, on:{click:newDiag}},
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
        showAll=UI("div",{"style":"display: inline-block;"},
                //["div",{style:"height:120px;"}," "],
                ["button",{"class":"showAll",on:{
            click:function () {
                showAll.remove();
                dols(curDir,prj1dirList);
            }
        }},"すべて見る..."]);
        prj1dirList.append(showAll);
        //$("#prjItemList").append(UI("div",["h2",{"class":"prjDirHeader"},"----"]));
    }
    function dols(curDir,prj1dirList) {
        new ZipImporter(curDir,prj1dirList,{
            onComplete: refresh
        });
        function refresh() {
            prj1dirList.find(".existentproject").remove();
            dols2(curDir,prj1dirList);
        }
        return dols2(curDir,prj1dirList);
    }
    function dols2(curDir,prj1dirList) {
        var d=[];
        curDir.each(function (f) {
            if (!f.isDir()) return;
            var l=f.lastUpdate();
            /*var r=f.rel("options.json");
            if (r.exists()) {
                l=r.lastUpdate();
            }*/
            d.push([f,l]);
        });
        d=d.sort(function (a,b) {
            return b[1]-a[1];
        });
        return DU.each(d,function (e) {
            var f=e[0];
            if (!f.isDir()) return;
            var it=new ProjectItem(f,prj1dirList);
            if (kw!="" && it.name.toLowerCase().indexOf(kw)<0) it.hide();
            return DU.timeout(10);
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

    sh.cd(FS.get(WebSite.projects[0]));
    extLink.all();
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
    $($("button.showAll").get(0)).click();
});
});
