const fs = require("fs");

const src = "../tonyu2-compiler/";
const dist = "www/";
const paths = [
    {src:src+"test/fixture/BuilderClient4Sys.js", dist:dist+"js/lang/BuilderClient4Sys.js"},
    {src:src+"test/fixture/BuilderWorker.js", dist:dist+"BuilderWorker.js"},
    {src:src+"test/fixture/TonyuRuntime.js", dist:dist+"js/runtime/TonyuRuntime.js"}
];

for (const p of paths) {
    console.log(p.src, p.dist);
    fs.copyFileSync(p.src, p.dist);
}