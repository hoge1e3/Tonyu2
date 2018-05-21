define(["GIFEncoder","WorkerLib"],function (GIFEncoder,WL) {
    var g;
    WL.install("GIFWriter/new",function (params) {
        // params  delay, repeat
        g=new GIFEncoder();
        g.setDelay(params.delay);
        g.setRepeat(params.repeat);
    });
    WL.install("GIFWriter/addFrame",function (params) {
        // params:   image: width, height, data
        g.addFrame(JSON.parse(params.image),true);
    });
    WL.install("GIFWriter/finish",function (params) {
        var binary_gif = g.stream().bin;
        return binary_gif;
    });
});
