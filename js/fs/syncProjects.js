requirejs(["Sync", "UI"],function (Sync,UI) {
	$(function () {
		Sync.sync(FS.get("/Tonyu/Projects/"),{v:true,onend:onend});

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