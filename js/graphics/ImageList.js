define(["PatternParser","Util","WebSite"], function (PP,Util,WebSite) {
    function IL(resImgs, onLoad) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loaded", resImg,i);
            var url=resImg.url;
            if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
            if (!Util.startsWith(url,"data")) url+="?" + new Date().getTime();
            var im=$("<img>").attr("src",url);
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
                resa[i].name=resImg.name;
                cnt--;
                if (cnt==0) {
                    var res=[];
                    var names={};
                    resa.forEach(function (a) {
                        names[a.name]=res.length;
                        res=res.concat(a);
                    });
                    res.names=names;
                    onLoad(res);
                }
            });
        });
    }
    return IL;
});