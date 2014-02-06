define(["Shell","FS","copySample"],function (sh, FS,copySample) {
$(function () {
    copySample();
    var home=FS.get("/Tonyu/");
    var projects=home.rel("Projects/");
    sh.cd(projects);
    var curDir=projects;
    function ls() {
        $("#prjItemList").empty();
        curDir.ls(FS.orderByNumberedName).forEach(function (name) {
            var f=curDir.rel(name);
            $("#fileItem").tmpl({name: name, href:"project.html?dir="+f.path()}).appendTo("#prjItemList");
        });
    }
    $("#newPrj").click(function (){
        var n=prompt("新しいプロジェクトの名前","");
        if (!n) return;
        n+="/";
        var prjDir=projects.rel(n);
        prjDir.mkdir();
        document.location.href="project.html?dir="+prjDir.path();
    });
    ls();
    var w=Wiki($("#wikiViewArea"), FS.get("/Tonyu/doc/"));
    w.show("index");
});
});
