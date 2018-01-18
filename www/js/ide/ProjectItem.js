define(["Klass","UI","FS"],function (Klass,UI,FS) {
var HNOP="javascript:;";
return ProjectItem=Klass.define({
    $this:"t",$singleton:"s",
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
            ["a", {href:url},
                 ["img",{$var:"t",src:"../../images/nowprint.png"}]],
            ["div",
                ["a", {href:url,"class":"projectName"},name],
                t.prjSubmenu()
            ]
        );
    },
    prjSubmenu:function prjSubmenu(t) {
        var f=t.projectDir;
        return ["span",{class:"dropdown"},
            ["button",{
                //href:HNOP,
                class:"submenu prjMenuButton",
                on:{click:t.$bind.openSubmenu},"data-path":f.path() }," "],
            ["span",{class:"dropdown-content"},
                ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.rename}},"名前変更"],
                ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.download}},"ZIPダウンロード"],
                ["a",{href:HNOP,class:"submenu",on:{click:t.$bind.remove}},"削除"]
            ]
        ];
    },
    remove: function (t) {
        UI("div",t.projectDir+"内のファイルをすべて削除しますか？").dialog();
        //t.projectDir.rm({r:1});
    },
    rename: function (t) {
        var np=prompt("新しいプロジェクトの名前を入れてください",
        t.name);
        if (!np || np=="") return;
        np=FS.PathUtil.truncSEP(np);
        var npd=t.projectDir.sibling(np+"/");
        var link=t.u.find(".projectName");
        return npd.exists(function (e) {
            if (e) {
                alert(np+" はすでに存在します");
                return;
            }
            link.attr("href",HNOP).text("Wait...");
            return t.projectDir.moveTo(npd).then(function () {
                t.projectDir=npd;
                t.name=npd;
                link.attr("href",t.url).text(np);
                ProjectItem.closeSubmenu();
            });
        });
    },
    openSubmenu: function openSubmenu(t) {
        ProjectItem.addMenuHandler();
        ProjectItem.closeSubmenu();
        ProjectItem.showingSubMenu=t.u.find(".dropdown-content");
        ProjectItem.showingSubMenu.addClass("show");
    },
    static$closeSubmenu: function (s) {
        if (s.showingSubMenu) {
            s.showingSubMenu.removeClass("show");
            s.showingSubMenu=null;
        }
    },
    static$addMenuHandler: function (s) {
        if (s.menuHandlerAdded) return;
        s.menuHandlerAdded=true;
        $('html').click(function(e) {
            if(!$(e.target).hasClass('submenu')) {
                s.closeSubmenu();
            }
        });
    }
});// of klass
});
