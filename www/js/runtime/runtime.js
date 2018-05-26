requirejs(["ImageList","PicoAudio","T2MediaLib","Tonyu","UIDiag"],
function (i,p,t,tn,u) {
    console.log("runtimes loaded",arguments);
    if (!window.PicoAudio) window.PicoAudio=p;
    if (!window.T2MediaLib) window.T2MediaLib=t;
});
