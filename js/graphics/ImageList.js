define(["PatternParser","Util","WebSite"], function (PP,Util,WebSite) {
    var cache={};
    function excludeEmpty(resImgs) {
        var r=[];
        resImgs.forEach(function (resImg,i) {
            if (!resImg || resImg.url=="") return;
            r.push(resImg);
        });
        return r;
    }
    var IL;
    IL=function (resImgs, onLoad,options) {
        //  resImgs:[{url: , [pwidth: , pheight:]?  }]
	    if (!options) options={};
        resImgs=excludeEmpty(resImgs);
        var resa=[];
        var cnt=resImgs.length;
        resImgs.forEach(function (resImg,i) {
            console.log("loading", resImg,i);
            var url=resImg.url;
            var urlKey=url;
            if (cache[urlKey]) {
            	proc.apply(cache[urlKey],[]);
            	return;
            }
            url=IL.convURL(url,options.baseDir);
            if (!Util.startsWith(url,"data:")) url+="?" + new Date().getTime();
            var im=$("<img>").attr("src",url);
            im.load(function () {
            	cache[urlKey]=this;
            	proc.apply(this,[]);
            });
            function proc() {
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
            }
        });
    };
    IL.load=IL;
	IL.convURL=function (url, baseDir) {
        if (WebSite.urlAliases[url]) url=WebSite.urlAliases[url];
	    if (Util.startsWith(url,"ls:")) {
	        var rel=url.substring("ls:".length);
	        if (!baseDir) throw "Baesdir not specified";
	        var f=baseDir.rel(rel);
	        if (!f.exists()) throw "ImageList file not found: "+f;
	        url=f.text();
	    }
	    return url;
	};
	window.ImageList=IL;
    return IL;
});