if (!localStorage.norom) {
    FS.mountROM(
{
  "base": "/Tonyu/Kernel/",
  "data": {
    "": "{\".desktop\":{\"lastUpdate\":1392705873190},\"NoviceActor.tonyu\":{\"lastUpdate\":1392705873191},\"BaseActor.tonyu\":{\"lastUpdate\":1392705873192},\"Actor.tonyu\":{\"lastUpdate\":1392705873193},\"Boot.tonyu\":{\"lastUpdate\":1392705873193},\"Sprites.tonyu\":{\"lastUpdate\":1392705873194},\"ScaledCanvas.tonyu\":{\"lastUpdate\":1392705873194}}",
    ".desktop": "{\"runMenuOrd\":[\"AcTestM\",\"NObjTest\",\"NObjTest2\",\"AcTest\",\"NoviceActor\",\"BaseActor\",\"Actor\",\"Boot\",\"Sprites\",\"AltBoot\",\"ScaledCanvas\"]}",
    "NoviceActor.tonyu": "extends BaseActor;\nnative Tonyu;\n\n\\sleep(n) {\n    if(!n) n=1;\n    for(n;n>0;n--) update();\n}\n\\initSprite() {\n    if (!_sprite) {\n        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\n        $Sprites.add(this);\n    }\n}\n\\say(text,size) {\n    if (!size) size=15;\n    initSprite();\n    _sprite._fukidashi={text:text, size:size, c:30};\n}\n\\sprite(x,y,p) {\n    go(x,y,p);\n}\n\\show(x,y,p) {\n    go(x,y,p);\n}\nnowait \\draw(ctx) {\n    _sprite.draw(ctx);\n}\n\\getCrashRect() {\n    return _sprite.getCrashRect();\n}\n\\go(x,y,p) {\n    initSprite();\n    _sprite.x=x;\n    _sprite.y=y;\n    if (p!=null) _sprite.p=p;\n    //update();\n}\n\\change(p) {\n    initSprite();\n    _sprite.p=p;\n}",
    "BaseActor.tonyu": "extends null;\nnative Tonyu;\nnative Key;\nnative console;\nnative Math;\nnative fukidashi;\nnative TextRect;\n\n\\new(x,y,p) {\n    if (Tonyu.runMode) {\n        var thg=currentThreadGroup();\n        if (thg) _th=thg.addObj(this);\n    }\n    if (typeof x==\"object\") Tonyu.extend(this, x);\n    else if (typeof x==\"number\") {\n        this.x=x;\n        this.y=y;\n        this.p=p;\n    }\n}\nnowait \\extend(obj) {\n    return Tonyu.extend(this,obj);\n}\n\nnowait \\print() {\n    console.log.apply(console,arguments);\n}\n\\update() {\n    ifwait {\n        _thread.suspend();\n    }\n}\nnowait \\getkey(k) {\n    return Key.getkey(k);\n}\nnowait \\hitTo(t) {\n    return crashTo(t);\n}\nnowait \\allCrash(t) {\n    var res=[];\n    var sp=this; //_sprite || this;\n    var t1=getCrashRect();\n    $Sprites.sprites.forEach(\\(s) {\n        var t2=s.getCrashRect();\n        if (s!==this && \n        s instanceof t && \n        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\n            res.push(s);    \n        }\n    });\n    return res;\n}\nnowait \\crashTo(t) {\n    if (!t) return false;\n    if (typeof t==\"function\") {\n        return allCrash(t)[0];\n    }\n    return crashTo1(t);\n}\nnowait \\crashTo1(t) {\n    if (!t || t._isDead) return false;\n/*if (_sprite && t._sprite) {\n        return _sprite.crashTo(t._sprite);\n}*/\n    var t1=getCrashRect();\n    var t2=t.getCrashRect();\n    return (\n    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\n    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\n    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\n    Math.abs(t1.y-t2.y)*2<t1.height+t2.height);\n}\nnowait \\getCrashRect() {\n    return {x,y,width,height};\n}\nnowait \\watchHit(typeA,typeB,onHit) {\n    $Sprites.watchHit(typeA , typeB, \\(a,b) {\n        onHit.apply(this,[a,b]);\n    });\n}\nnowait \\currentThreadGroup() {\n    return $currentThreadGroup; //Tonyu.currentThread.group;\n}\nnowait \\die() {\n    if (_th) {\n        _th.kill();\n    }\n    hide();\n    _isDead=true;\n}\nnowait \\hide() {\n/*if (_sprite) {\n        $Sprites.remove(_sprite);\n        _sprite=null;\n} else {*/\n    $Sprites.remove(this);\n//}\n}\nnowait \\show(x,y,p) {\n    $Sprites.add(this);\n    if (x!=null) this.x=x;\n    if (y!=null) this.y=y;\n    if (p!=null) this.p=p;\n}\n\nnowait \\rnd(r) {\n    if (typeof r==\"number\") {\n        return Math.floor(Math.random()*r);\n    }\n    return Math.random();\n}\nnowait \\detectShape() {\n    if (typeof p!=\"number\") {\n        if (text) return;\n        p=0;\n    }\n    p=Math.floor(p);\n    pImg=$Sprites.getImageList()[p];\n    if (!pImg) return;\n    width=pImg.width;\n    height=pImg.height;\n}\n\\waitFor(f) {\n    ifwait {\n        _thread.waitFor(f);\n    }\n    update();\n}\nnowait \\isDead() {\n    return _isDead;\n}\nnowait \\draw(ctx) {\n    if (x==null || y==null) return;\n    detectShape();\n    if (pImg) {\n        ctx.drawImage(\n        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\n        x-width/2, y-height/2, width, height);\n    } else if (text) {\n        if (!size) size=15;\n        if (!align) align=\"center\";\n        if (!fillStyle) fillStyle=\"white\";\n        ctx.fillStyle=fillStyle;\n        var rect=TextRect.draw(ctx, text, x, y, size, align , \"fill\");\n        width=rect.w;\n        height=rect.h;\n    }\n    if (_fukidashi) {\n        if (_fukidashi.c>0) {\n            _fukidashi.c--;\n            ctx.fillStyle=\"white\";\n            ctx.strokeStyle=\"black\";\n            fukidashi ( ctx , _fukidashi.text, \n            x, y-height/2-10, _fukidashi.size);\n        }\n    }\n}\nnowait \\asyncResult() {\n    return Tonyu.asyncResult();\n}",
    "Actor.tonyu": "extends BaseActor;\nnative Sprites;\nnative Tonyu;\n\n\\new(x,y,p) {\n    super(x,y,p);\n    if (Tonyu.runMode) initSprite();\n}\n\\initSprite() {\n    /*if (!_sprite) {\n        _sprite=Sprites.add{owner:this};\n    }*/\n    $Sprites.add(this);\n}\n\n/*\n\\update() {\n    super.update();\n    if (_sprite) {\n        _sprite.x=x;\n        _sprite.y=y;\n        _sprite.p=p;\n    }\n}*/",
    "Boot.tonyu": "native $;\nnative TError;\nnative $LASTPOS;\nnative Key;\nnative Date;\nnative ImageList;\nnative Tonyu;\n\n\\initSprites() {\n    $Sprites=new Sprites();\n    print (\"Loading pats..\");\n    var rs=$currentProject.getResource();\n    var a=asyncResult();\n    ImageList( rs.images, a.receiver);\n    waitFor(a);\n    var r=a[0];\n    $Sprites.setImageList(r);\n    for (var name,val in r.names) {\n        Tonyu.setGlobal(name, val);\n    }\n    print (\"Loading pats done.\");\n    cvj=$(\"canvas\");\n    if (Tonyu.noviceMode) {\n        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\n    } else {\n        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\n    }\n}\n\\initCanvasEvents() {\n    cv=cvj[0];\n    $handleMouse=\\(e) {\n        var p=cvj.offset();\n        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\n        mp=$Screen.canvas2buf(mp);\n        $mouseX=mp.x;//e.clientX-p.left;\n        $mouseY=mp.y;//e.clientY-p.top;\n    };\n    $touches=[{},{},{},{},{}];\n    $touches.findById=\\(id) {\n        for (var j=0 ; j<$touches.length ; j++) {\n            if ($touches[j].identifier==id) {\n                return $touches[j];\n            }\n        }\n    };\n    $handleTouch=\\(e) {\n        var p=cvj.offset();\n        e.preventDefault();\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (!dst) {\n                for (var j=0 ; j<$touches.length ; j++) {\n                    if (!$touches[j].touched) {\n                        dst=$touches[j];\n                        dst.identifier=src.identifier;\n                        break;\n                    }\n                }\n            }\n            if (dst) {\n                mp={x:src.pageX-p.left, y:src.pageY-p.top};\n                mp=$Screen.canvas2buf(mp);\n                dst.x=mp.x;//src.pageX-p.left;\n                dst.y=mp.y;//src.pageY-p.top;\n                dst.touched=true;\n            }\n        }\n        $mouseX=$touches[0].x;\n        $mouseY=$touches[0].y;\n    };\n    $handleTouchEnd=\\(e) {\n        var ts=e.originalEvent.changedTouches;\n        for (var i =0 ; i<ts.length ; i++) {\n            var src=ts[i];\n            var dst=$touches.findById(src.identifier);\n            if (dst) {\n                dst.touched=false;\n                dst.identifier=-1;\n            }\n        }\n    };\n    var handleMouse=\\(e){$handleMouse(e);};\n    var handleTouch=\\(e){$handleTouch(e);};\n    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\n    var d=$.data(cv,\"events\");\n    if (!d) {\n        $.data(cv,\"events\",\"true\");\n        cvj.mousedown(handleMouse);\n        cvj.mousemove(handleMouse);\n        cvj.on(\"touchstart\",handleTouch);\n        cvj.on(\"touchmove\",handleTouch);\n        cvj.on(\"touchend\",handleTouchEnd);\n    }\n}\n\n\\initThread() {\n    thg=Tonyu.threadGroup();\n    var o=Tonyu.currentProject.getOptions();\n    var mainClassName=o.run.mainClass;\n    print(\"MainClass= \"+mainClassName);\n    mainClass=Tonyu.getClass(mainClassName);\n    if (!mainClass) {\n        TError( mainClassName+\" というクラスはありません\", \n        \"不明\" ,0).raise();\n    }\n    Tonyu.runMode=true;\n    $currentThreadGroup=thg;\n    new mainClass();\n}\n\ninitSprites();\ninitCanvasEvents();\ninitThread();\n$screenWidth=cv.width;\n$screenHeight=cv.height;\n$pat_fruits=30;\nwhile (true) {\n    ti=new Date().getTime();\n    thg.steps();\n    Key.update();\n    $screenWidth=$Screen.width;\n    $screenHeight=$Screen.height;\n    $Sprites.draw($Screen.buf[0]);\n    $Screen.draw();\n    $Sprites.checkHit();\n    wt=33-(new Date().getTime()-ti);\n    if (wt<0) wt=0;\n    waitFor(Tonyu.timeout(wt));\n}",
    "Sprites.tonyu": "native Tonyu;\n\\new() {\n    sprites=[];\n    imageList=[];\n    hitWatchers=[];\n    isDrawGrid=Tonyu.noviceMode;\n}\nfunction add(s) {\n    if (s.__addedToSprites) return;\n    sprites.push(s);\n    s.__addedToSprites=this;\n    return s;\n}\nfunction remove(s) {\n    sprites.splice(sprites.indexOf(s),1);\n    delete s.__addedToSprites;\n}\nfunction clear() {sprites.splice(0,sprites.length);}\nfunction draw(cv) {\n    var ctx=cv.getContext(\"2d\");\n    ctx.fillStyle=\"rgb(20,80,180)\";\n    ctx.fillRect(0,0,cv.width,cv.height);\n    if (isDrawGrid) drawGrid(cv);\n    sprites.forEach(\\(sprite) {\n        sprite.draw(ctx);\n    });\n}\nfunction checkHit() {\n    hitWatchers.forEach(function (w) {\n        sprites.forEach(function (a) {\n                //console.log(\"a:\",  a.owner);\n            var a_owner=a;//a.owner|| a;\n            if (! (a_owner instanceof w.A)) return;\n            sprites.forEach(function (b) {\n                var b_owner=b;//b.owner|| b;\n                if (a===b) return;\n                if (! (b_owner instanceof w.B)) return;\n                //console.log(\"b:\",  b.owner);\n                if (a.crashTo1(b)) {\n                    //console.log(\"hit\", a.owner, b.owner);\n                    w.h(a_owner,b_owner);\n                }\n            });\n        });\n    });\n}\nfunction watchHit(typeA, typeB, onHit) {\n    var p={A: typeA, B:typeB, h:onHit};\n    //console.log(p);\n    hitWatchers.push(p);\n}\nfunction drawGrid(c) {\n    var ctx=c.getContext(\"2d\");\n    ctx.textBaseline=\"top\";\n    ctx.save();\n    ctx.strokeStyle=\"rgb(40,100,200)\";\n    for (var i=0 ; i<c.width ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(i,0);\n        ctx.lineTo(i,c.height);\n        ctx.closePath();\n        ctx.stroke();\n    }\n\n    for (var i=0 ; i<c.height ; i+=10) {\n        ctx.beginPath();\n        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\n        ctx.moveTo(0,i);\n        ctx.lineTo(c.width,i);\n        ctx.closePath();\n        ctx.stroke();\n    }\n    ctx.fillStyle=\"white\";\n    ctx.font=\"15px monospaced\";\n    for (var i=100 ; i<c.width ; i+=100) {\n        ctx.fillText(i, i,0);\n    }\n    for (var i=100 ; i<c.height ; i+=100) {\n        ctx.fillText(i, 0,i);\n    }\n    ctx.restore();\n}\nfunction setImageList(il) {\n    imageList=il;\n}\nfunction getImageList() {\n    return imageList;\n}",
    "ScaledCanvas.tonyu": "native $;\n\n// canvas:phisical  buf: logical\n\\new (opt) {\n    extend(opt);\n    // canvas/ width,height\n    resize(width, height);\n    cw=canvas.width();\n    ch=canvas.height();\n    cctx=canvas[0].getContext(\"2d\");\n}\n\\resize(width,height) {\n    this.width=width;\n    this.height=height;\n    buf=$(\"<canvas>\").attr{width,height};\n    ctx=buf[0].getContext(\"2d\");  \n}\n\\draw() {\n    cw=canvas.width();\n    ch=canvas.height();\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    cctx.clearRect(0,0,cw,ch);\n    cctx.drawImage(buf[0],\n    0,0,width, height, \n    0,0,calcw, calch );\n}\n\\canvas2buf(point) {\n    var calcw=ch/height*width; // calch=ch\n    var calch=cw/width*height; // calcw=cw\n    if (calch>ch) calch=ch;\n    if (calcw>cw) calcw=cw;\n    return {x: point.x/calcw*width, y: point.y/calch*height};\n}"
  }
}
    );
}