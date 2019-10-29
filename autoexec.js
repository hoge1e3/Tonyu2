/*global require, process, atom*/
const FS=require("../tonyu2-compiler/src/lib/FS");
const dirs=atom.project.getDirectories();
console.log(dirs);
if (!dirs[0]) return;
const projectRootPath=dirs[0].path;
const projectRoot=FS.get(projectRootPath);

//console.log(projectRoot.rel("TODO.txt").text());

const src=projectRoot.rel("../tonyu2-compiler");
const fixture=src.rel("test/fixture/");
const www=projectRoot.rel("www/");
sync(fixture.rel("BuilderClient4Sys.js"), www.rel("js/lang/"));
sync(fixture.rel("BuilderWorker.js"), www);
//sync(fixture.rel("Debugger.js"), www.rel("js/runtime/"));
sync(fixture.rel("TonyuRuntime.js"), www.rel("js/runtime/"));

function sync(from,to) {
    to=to.rel(from.name());
    const header="";
    function same() {
        return to.text()===header+from.text();
    }
    function copy() {
        console.log("Copy", from.path(), to.path());
        to.text(header+from.text());
    }
    function copyIfNotSame() {
        if (!same()) {
            copy();
        }
    }
    copyIfNotSame();
    from.watch(copyIfNotSame);
}
