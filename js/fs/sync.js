define(["FS","Shell"],function (FS,sh) {
    var Sync={};
    sh.sync=function (options) {
	Sync.sync(sh.cwd,options);
    };
    Sync.sync=function (dir,options,onend) {
	if (!onend && typeof options=="function") { onend=options; options={};}
	if (!onend && options.onend) onend=options.onend;
	if (!options) options={};
	if (options.test) options.v=1;
	n0();
	var uploads={},downloads=[],visited={};
	function n0() {
	    $.get("../../edit/getDirInfo",{base:dir.path()},n1);
	}
	function n1(info) {
	    info=JSON.parse(info);
	    if (options.v) console.log("getDirInfo",info);
	    var base=FS.get(info.base);
	    var data=info.data;
	    for (var rel in data) {
		var file=base.rel(rel);
		var lcm=file.metaInfo();
		var rmm=data[rel];
		cmp(file,rel,lcm,rmm);
	    }
	    dir.recursive(function (file) {
		var lcm=file.metaInfo();
		var rel=file.relPath(dir);
		var rmm=data[rel];
		cmp(file,rel,lcm,rmm);
	    },{includeTrashed:true});
	    if (options.v) {
		console.log("uploads:",uploads);
		console.log("downloads:",downloads);
	    }
	    $.post("../../edit/File2LSSync",
		   {base:info.base,paths:JSON.stringify(downloads)},n2);
	}
	function n2(dlData) {
		console.log("dlData=",dlData);
	    dlData=JSON.parse(dlData);
	    if (options.v) console.log("dlData:",dlData);
	    var base=FS.get(dlData.base);
	    if (options.test) return;
	    for (var rel in dlData.data) {
		var dlf=base.rel(rel);
		var d=dlData.data[rel];
		//if (options.v) console.log(dlf.path(), d);
		if (d.trashed) {
		    if (dlf.exists()) dlf.rm();
		} else {
		    dlf.text(d.text);
		}
		delete d.text;
		dlf.metaInfo(d);
	    }
	    $.post("../../edit/LS2FileSync",
		   {base:dlData.base,data:JSON.stringify(uploads)},n3);
    	}
	function n3(res){
	    if (options.v) console.log(res);
	    var upds=[];
	    for (var i in uploads) upds.push(i);
	    res={msg:res,uploads:upds,downloads: downloads};
	    if (typeof onend=="function") onend(res);
	}
	function cmp(f,rel,lcm,rmm) {
	    if (visited[rel]) return ;
	    visited[rel]=1;
	    if (rmm && (!lcm || lcm.lastUpdate<rmm.lastUpdate)) {
		downloads.push(rel);
		if (options.v)
		    console.log((!lcm?"New":"")+
			    "Download "+f+
			    " trash="+!!rmm.trashed);
	    } else if (lcm && (!rmm || lcm.lastUpdate>rmm.lastUpdate)) {
		var o={text:f.text()};
		var m=f.metaInfo();
		for (var i in m) o[i]=m[i];
		uploads[rel]=o;
		if (options.v)
		    console.log((!rmm?"New":"")+
			    "Upload "+f+
			    " trash="+!!lcm.trashed);
	    }

	}
    };
    return Sync;
});
