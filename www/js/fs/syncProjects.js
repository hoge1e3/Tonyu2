requirejs(["Sync", "UI","Util", "Auth","WebSite"],function (Sync,UI,Util,Auth,WebSite) {
    $(function () {
        var home=FS.get(WebSite.tonyuHome);

        //var user=Util.getQueryString("user");
        Auth.currentUser(function (user) {
            //TODO: urlchange!
            if (!user) document.location.href=WebSite.serverTop+"/login";
            else {
                $("#head").text(user+"のファイルを同期中");
                Sync.sync(home.rel("Projects/"), FS.get("/home/"+user+"/"), {
                    excludes:["1_Animation/",
                              "2_MultipleObj/",
                              "3_NewParam/",
                              "4_getkey/",
                              "5_Chase/",
                              "6_Shot/",
                              "7_Text/",
                              "8_Patterns/",
                              "9_Mouse/",
                              "10_MultiTouch/",
                              "11_Resize/",
                              "12_Sound/",
                              "13_DX/",
                              "14_File/",
                              "15_Box2D/",
                              "16_Sound2/"],
                              v:true,onend:onend, onstatus: onstatus,onerror:onerror});
            }
        });
        $("#skipButton").click(function () {
            $("#skip").empty().append(UI(
                    "div",
                    ["div","同期をスキップするにはOKを押してください．"],
                    ["div","※ブラウザ側とサーバ側のファイルに違いが残っている可能性があります "],
                    ["button", {on:{click:function () {
                        document.location.href="index.html";
                    }}}, "OK"]
            ));
        });
    });
    var step=1;
    var msgs={getDirInfo:"サーバ側のファイルの情報を取得中...", File2LSSync:"サーバからファイルをダウンロード中...",
            LS2FileSync:"ブラウザのファイルをアップロード中..."}
    function onstatus(name) {
        $("#status").text("Step "+step+"/3: "+msgs[name]);
        step++;
    }
    function onerror(xml,text,thrown) {
        $("#res").text("エラー："+text+": "+thrown);
    }
    function onend(res) {
        console.log(res);
        $("#skip").empty();
        $("#status").text(res.msg);
        $("#res").append(UI(
                "div",
                ["div",["a",{href:"index.html"},"Homeへ"]],
                ["h2","ダウンロードされたファイル"],
                dls(),
                ["h2","アップロードされたファイル"],
                ups()
        ));
        function dls() {
            if (res.downloads.length==0) return "ダウンロードされたファイルはありません";
            var r=["ul"];
            res.downloads.forEach(function (n) {
                r.push(["li",n]);
            });
            return r;
        }
        function ups() {
            if (res.uploads.length==0) return "アップロードされたファイルはありません";
            var r=["ul"];
            res.uploads.forEach(function (n) {
                r.push(["li",n]);
            });
            return r;
        }
    }
});