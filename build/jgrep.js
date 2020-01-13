const FS=require("./SoyFS");
const js=FS.get(process.cwd()).rel("../www/js/");

const exclude={"R.js":1,"TonyuRuntime.js":1,
"ErrorPos.js":1,
"ImageResEditor.js":1,"KernelDiffDialog.js":1,"noviceEditor.js":1,
"importFromJsdoit.js":1,"importFromTonyu1.js":1,"exportToExe.js":1,
"wiki.js":1,"wikiExporter.js":1,"DiffDialog.js":1,"noviceSelProject.js":1,
"auth.js":1,"syncProjects.js":1,"forkBlobs.js":1};

js.recursive(f=>{
	if (f.ext()!==".js" && f.ext()!==".html") return;
	if (f.path().match(/\bgen\b/)) return;
	if (f.path().match(/\bace-noconflict\b/)) return;
	if (f.name().match(/_concat/)) return;
	if (f.name().match(/\.min\./)) return;
	if (exclude[f.name()]) return;
	let ln=1;
	for (let line of f.lines()) {
	   if (ismb(line.replace(/\/\/.*/,""))) console.log(f.relPath(js)+":"+ln+"●"+line);
	   ln++;
	}
});
function ismb(str) {
    for (let i=0;i<str.length;i++) {
        if (str.charCodeAt(i)>=128)return true;
    }
    return false;
}
