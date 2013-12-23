define(["PatternParser"], function (PP) {
    function IL(resImgs, onLoad) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loaded", resImg,i);
            var im=$("<img>").attr("src",resImg.url+"?" + new Date().getTime());
            im.load(function () {
                var pw,ph;
                if ((pw=resImg.pwidth) && (ph=resImg.pheight)) {
                    var x=0, y=0, w=this.width, h=this.height;
                    var r=[];
                    while (true) {
                        r.push({image:this, x:x,y:y, width:pw, height:ph});
                        x+=pw;
                        if (x+pw>w) {
                            x=0;
                            y+=ph;
                            if (y+ph>h) break;
                        }
                    }
                    resa[i]=r;
                } else {
                    var p=new PP(this);
                    resa[i]=p.parse();
                }
                cnt--;
                if (cnt==0) {
                    var res=[];
                    resa.forEach(function (a) {
                        res=res.concat(a);
                    });
                    onLoad(res);
                }
            });
        });
    }
    return IL;
});