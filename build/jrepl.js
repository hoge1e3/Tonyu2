const FS=require("./FS");
const cwd=FS.get(process.cwd());
const js=cwd.rel("../www/js/");

const mbsB=cwd.rel("mbs.txt");
const mbsA=cwd.rel("mbs-after.txt");

const mbss={};
const R=[];
for (let line of mbsB.lines()) {
   const keys=line.split("●");
   mbss[keys[0]]={
      mbsB:keys[1]
   };
}
for (let line of mbsA.lines()) {
   const keys=line.split("●");
   mbss[keys[0]].mbsA=keys[1];
}

js.recursive(f=>{
	if (f.ext()!==".js" && f.ext()!==".html") return;
	if (f.path().match(/\bgen\b/)) return;
	if (f.path().match(/\bace-noconflict\b/)) return;
	if (f.name().match(/_concat/)) return;
	if (f.name().match(/\.min\./)) return;
	let ln=1;
	for (let line of f.lines()) {
	   if (ismb(line.replace(/\/\/.*/,""))) {
	      const key=f.relPath(js)+":"+ln;
	      const mbe=mbss[key];
	      if (line!==mbe.mbsB) {
	         console.log(key, mbe);
	         throw new Error("NO match");
	      }
	      if (mbe.mbsA!==mbe.mbsB) {
		      //console.log(key,mbe);
		      const replaced=parseCMD(line, mbe.mbsA);
		      console.log(key);
		      console.log("Befor", line);
		      console.log("After", replaced);
	      }//console.log(+"●"+line);
	   }
	   ln++;
	}
});
console.log(R.join(",\n"));
function parseCMD(line, cmd) {
   cmd.replace(/@@([^@]+)@@([^@]+)@@/g, (_,b,a) => {
//   console.log("R",b,a);
       line=line.replace(b,`R("${a}")`);
       R.push(`"${a}": ${b}`);
   });
   return line;
} 
function ismb(str) {
    for (let i=0;i<str.length;i++) {
        if (str.charCodeAt(i)>=128)return true;
    }
    return false;
}

