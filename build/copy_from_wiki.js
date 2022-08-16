const fs = require("fs");

const src = "../Tonyu2.wiki/html";
const dist = "www/doc";

const dirs=fs.readdirSync(src);
console.log(dirs);
for (const f of dirs) {
    if (!f.match(/\.html/)) continue;
    //console.log(f);
    console.log(`${src}/${f}`, `${dist}/${f}`);
    fs.copyFileSync(`${src}/${f}`, `${dist}/${f}`);
}