define([], function () {
    var loc=document.location.href;
    if (loc.match(/jsrun\.it/)) {
        return {
            urlAliases: {
                "images/base.png":"http://jsrun.it/assets/6/F/y/3/6Fy3B.png",
                "images/Sample.png":"http://jsrun.it/assets/s/V/S/l/sVSlZ.png",
                "images/neko.png":"http://jsrun.it/assets/j/D/9/q/jD9qQ.png"
            }
        };
    }
    return {
        urlAliases: {}
    };
});