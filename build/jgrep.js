const FS=require("./FS");
const js=FS.get(process.cwd()).rel("../www/js/");

js.recursive(f=>{
	if (f.ext()!==".js" && f.ext()!==".html") return;
	if (f.path().match(/\bgen\b/)) return;
	if (f.path().match(/\bace-noconflict\b/)) return;
	if (f.name().match(/_concat/)) return;
	if (f.name().match(/\.min\./)) return;
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

