requirejs(["ImageList","PicoAudio","T2MediaLib","Tonyu","UIDiag","SEnv","Tones.wdt"],
function (i,p,t,tn,u,mz,wdt) {
    console.log("runtimes loaded",arguments);
    if (!window.PicoAudio) window.PicoAudio=p;
    if (!window.T2MediaLib) window.T2MediaLib=t;
    if (!window.Mezonet) window.Mezonet=mz;
});
