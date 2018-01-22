define(["Klass","UI","FS","DeferredUtil","WebSite"],
function (Klass,UI,FS,DU,WebSite) {
    var HNOP="javascript:;";
    var S;
    ProjectItem=S=Klass.define({
//----METHODS
$this:"t",
$:function (t,projectDir,prjList) {
    var f=projectDir;
    var name=FS.PathUtil.truncSEP(f.name());
    t.prjList=prjList;
    t.projectDir=projectDir;
    t.name=name;
    var u=t.dom(f);
    t.u=u;
    u.appendTo(t.prjList);
    setTimeout(function () {
        var tn=f.rel("images/").rel("icon_thumbnail.png");
        if (tn.exists()) {
            u.$vars.t.attr("src",tn.getURL());
        }
    },10);
},
hide: function (t) {
    if (t.u) t.u.hide();
},
show: function (t) {
    if (t.u) t.u.show();
},
url: {
    get: function (t) {
        var f=t.projectDir;
        return "project.html?dir="+f.path();
    }
},
dom: function (t) {
    var url=t.url;
    var name=t.name;
    return UI("div", {"class":"project existentproject"},
        ["a", {href:url,"class":"projectLink"},
             ["img",{$var:"t",src:"../../images/nowprint.png"}]],
        ["div",
            ["a", {href:url,"class":"projectLink projectName"},name],
            t.submenuExpr()
        ]
    );
},
submenuExpr:function submenuExpr(t) {
    var f=t.projectDir;
    return ["span",{class:"dropdown"},
        ["button",{
            //href:HNOP,
            class:"submenu prjMenuButton",
            on:{click:t.$bind.openSubmenu},"data-path":f.path() }," "],
        ["span",{class:"dropdown-content"},
            ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.rename}},"名前変更"],
            ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.download}},"ZIPダウンロード"],
            ["a",{href:HNOP,class:"submenu nwmenu",on:{click:t.$bind.openFolder}},"フォルダを開く"],
            ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.remove}},"削除"]
        ]
    ];
},
download: function (t) {
    S.closeSubmenu();
    return FS.zip.zip(t.projectDir).catch(DU.E);
},
remove: function (t) {
    S.closeSubmenu();
    if (!t.rmd) t.rmd=UI("div",{title:"プロジェクトの削除"},
        ["div","プロジェクト",t.name,"を削除しますか？"],
        ["div",
            ["input",{$var:"dl",type:"checkbox",checked:true}],
            ["label",{for:"dl"},"削除前にZIPでダウンロードする"]
        ],
        ["div",
            ["button",{on:{click:doRemove}},"はい"],
            ["button",{on:{click:cancel}},"いいえ"]
        ]
    );
    t.rmd.$vars.dl.prop("checked",true);
    t.rmd.dialog();
    function doRemove() {
        var dl=t.rmd.$vars.dl.prop("checked");
        return (dl?t.download():DU.resolve()).then(function () {
            t.projectDir.rm({r:1});
            t.u.remove();
            t.rmd.dialog("close");
        }).catch(DU.E);
    }
    function cancel() {
        t.rmd.dialog("close");
    }
    //t.projectDir.rm({r:1});
},
rename: function (t) {
    S.closeSubmenu();
    var np=prompt("新しいプロジェクトの名前を入れてください",
    t.name);
    if (!np || np=="") return;
    np=FS.PathUtil.truncSEP(np);
    var npd=t.projectDir.sibling(np+"/");
    return npd.exists(function (e) {
        if (e) {
            alert(np+" はすでに存在します");
            return;
        }
        //link.attr("href",HNOP).text("Wait...");
        return t.projectDir.moveTo(npd).then(function () {
            t.projectDir=npd;
            t.name=npd;
            t.u.find(".projectName").text(np);
            t.u.find(".projectLink").attr("href",t.url);
            //console.log("Renamed",t.url);
            S.closeSubmenu();
        }).catch(DU.E);
    });
},
openFolder: function (t){
    var gui = require("nw.gui");//(global.nwDispatcher||global.nw).requireNwGui();
    var SEP = process.execPath;
    gui.Shell.showItemInFolder(t.projectDir.path().replace(/\//g,require("path").sep));
    S.closeSubmenu();
},
openSubmenu: function openSubmenu(t) {
    S.addMenuHandler();
    S.closeSubmenu();
    S.showingSubMenu=t.u.find(".dropdown-content");
    S.showingSubMenu.addClass("show");
    if (!WebSite.isNW) S.showingSubMenu.find(".nwmenu").hide();
},
static$closeSubmenu: function () {
    if (S.showingSubMenu) {
        S.showingSubMenu.removeClass("show");
        S.showingSubMenu=null;
    }
},
static$addMenuHandler: function () {
    if (S.menuHandlerAdded) return;
    S.menuHandlerAdded=true;
    $('html').click(function(e) {
        if(!$(e.target).hasClass('submenu')) {
            S.closeSubmenu();
        }
    });
}
//----END OF METHODS
    });// end of klass
    return S;
});
