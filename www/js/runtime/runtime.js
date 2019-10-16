/*global requirejs*/
define(["ImageList","T2MediaLib","UIDiag"],
function (ImageList,T2MediaLib,UIDiag) {
    console.log("runtimes loaded",arguments);
    if (!window.T2MediaLib) window.T2MediaLib=T2MediaLib;
    return {ImageList,T2MediaLib,UIDiag};
});
