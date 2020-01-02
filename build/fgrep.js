const FS=require("./FS");
const js=FS.get(process.cwd()).rel("../www/js/");

const exclude={"R.js":1,"TonyuRuntime.js":1,
"ErrorPos.js":1,
"ImageResEditor.js":1,"KernelDiffDialog.js":1,"noviceEditor.js":1,
"importFromJsdoit.js":1,"importFromTonyu1.js":1,"exportToExe.js":1,
"wiki.js":1,"wikiExporter.js":1,"DiffDialog.js":1,"noviceSelProject.js":1,
"auth.js":1,"syncProjects.js":1,"forkBlobs.js":1,"FS.js":1,"SFileNW.js":1,
"sync2.js":1, "sync.js":1, "syncWithKernel.js":1,"copyToKernel.js":1,"BuilderClient4Sys.js":1,
"timbre.js":1};
const lines={};
js.recursive(f=>{
	if (f.ext()!==".js" && f.ext()!==".html") return;
	if (f.path().match(/\bgen\b/)) return;
	if (f.path().match(/\bace-noconflict\b/)) return;
	if (f.name().match(/_concat/)) return;
	if (f.name().match(/\.min\./)) return;
	if (f.path().match(/fs2raw/)) return;
	if (f.name().match(/jquery/)) return;
	if (exclude[f.name()]) return;
	let ln=1;
	for (let line of f.lines()) {
	   const key=f.relPath(js)+":"+ln;
	   hasSFileMethodInvocation(line,key);//) console.log(key+"●"+line);
	   ln++;
	}
});
for (var k in lines) {
    console.log(`----${k}----`);
    if (k==="constructor") continue;
    for (line of lines[k] ) {
        console.log(line);
    }
}

function isSFileMethod(n) {
	return FS.SFile.prototype[n];
}
function hasSFileMethodInvocation(str,key) {
    const p=/\.\s*(\w+)\s*\(/g;
    while (m=p.exec(str.replace(/\/\/.*$/,""))) {
       const name=m[1];
       if (isSFileMethod(name) && name!=="hasOwnProperty" && name!=="toString" ) {
           lines[name]=lines[name]||[];
           lines[name].push(key+"●"+str);
       }
    }
}
