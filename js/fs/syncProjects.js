requirejs(["Sync", "UI","Util", "Auth"],function (Sync,UI,Util,Auth) {
    $(function () {
        //var user=Util.getQueryString("user");
        Auth.currentUser(function (user) {
            if (!user) document.location.href="../../edit/login";
            else {
                $("#status").text(user+"のファイルを同期中...");
                Sync.sync(FS.get("/Tonyu/Projects/"), FS.get("/home/"+user+"/"), {v:true,onend:onend});
            }
        });
    });
	function onend(res) {
		console.log(res);
		$("#status").append(res.msg);
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