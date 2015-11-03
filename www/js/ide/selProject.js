requirejs(["FS","Wiki","Shell","Shell2",
           /*"copySample",*/"NewProjectDialog","UI","Sync","Auth","zip","requestFragment","WebSite"],
  function (FS, Wiki,   sh,sh2,
            /*copySample,  */NPD,           UI, Sync, Auth,zip,requestFragment,WebSite) {
$(function () {

    //copySample();
    var home=FS.get(WebSite.tonyuHome);
    var projects=home.rel("Projects/");
    if (!projects.exists()) projects.mkdir();
    sh.cd(projects);
    var curDir=projects;
    if (WebSite.isNW) {
        $("#loginGrp").hide();
    }
    function ls() {
        $("#prjItemList").empty();
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
        d.forEach(function (e) {
            var f=e[0];
            var name=f.name();

            if (!f.isDir()) return;
            var u=UI("div", {"class":"project"},
                    ["a", {href:"project.html?dir="+f.path()},
                     ["img",{$var:"t",src:"../../images/nowprint.png"}],
                     ["div", name]
                     ]);
            u.appendTo("#prjItemList");
            setTimeout(function () {
                var tn=f.rel("images/").rel("icon_thumbnail.png");
                //console.log(tn.path());
                if (tn.exists()) {
                    u.$vars.t.attr("src",tn.getURL());
                }
            },10);
            //$("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
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
    /*var w=Wiki($("#wikiViewArea"), home.rel("doc/"));
    var syncDoc=false;
    if (WebSite.devMode) {
        Sync.sync(home,{v:1});
    } else if (WebSite.disableROM["ROM_d.js"]) {
        syncDoc=true;
        Sync.sync(home.rel("doc/"),{v:1, excludes:[home.rel("doc/html/").path()],
            onend:function () {
            if (home.rel("doc/index.txt").exists()) {
                w.show("index");
            }
        }});
    }
    if (!syncDoc) w.show("index");*/
    var help=$("<iframe>").attr("src",WebSite.top+"/doc/index.html");
    help.height($(window).height()-$("#navBar").height());
    $("#wikiViewArea").append(help);



    $("#newPrj").click(function (){
    	NPD.show(projects, function (prjDir) {
            prjDir.mkdir();
            document.location.href="project.html?dir="+prjDir.path();
    	});
    });
    ls();
    SplashScreen.hide();
    $("body").on("keydown",function (e) {
        if (e.keyCode==77 && WebSite.devMode) {
            WebSite.mobile=!WebSite.mobile;
            console.log("Mobile mode", WebSite.mobile);
            if (WebSite.mobile) {
                home.rel("mobile.txt").text("true");
            } else {
                home.rel("mobile.txt").rm();
            }
            /*$("a").each(function () {
                var t=$(this);
                var hr=t.attr("href");
                if (hr) t.attr("href", hr.replace("project.html","m.html"));
            });*/

        }
    });
    sh.wikiEditor=function () {document.location.href="wikiEditor.html";};
});
});
