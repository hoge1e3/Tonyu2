requirejs(["ImageList","PicoAudio","T2MediaLib","Tonyu","UIDiag"],
function (i,p,t,tn,u) {
    if (!window.PicoAudio &&
    typeof PicoAudio!=="undefined") window.PicoAudio=PicoAudio;
    if (!window.T2MediaLib &&
    typeof T2MediaLib!=="undefined") window.T2MediaLib=T2MediaLib;
});
