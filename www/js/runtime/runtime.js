/*global requirejs*/
requirejs(["ImageList","T2MediaLib","Tonyu","UIDiag"],
function (i,t,tn,u) {
    console.log("runtimes loaded",arguments);
    if (!window.T2MediaLib) window.T2MediaLib=t;
});
