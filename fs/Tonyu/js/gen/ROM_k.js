(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{".desktop":1397119075000,"Actor.tonyu":1397119075000,"BaseActor.tonyu":1397119075000,"Boot.tonyu":1397119075000,"Keys.tonyu":1397119075000,"Map.tonyu":1397636169000,"MathMod.tonyu":1397119075000,"MML.tonyu":1397119075000,"NoviceActor.tonyu":1397119075000,"ScaledCanvas.tonyu":1397119075000,"Sprites.tonyu":1397119075000,"TObject.tonyu":1397119075000,"TQuery.tonyu":1397119075000,"WaveTable.tonyu":1397119075000}',
      '.desktop': '{"runMenuOrd":["AcTestM","NObjTest","SETest","MMLTest","KeyTest","NObjTest2","AcTest","NoviceActor","Actor","Boot","AltBoot","Keys","TObject","WaveTable","MML","BaseActor","TQuery","ScaledCanvas","MathMod"]}',
      'Actor.tonyu': 
        'extends BaseActor;\r\n'+
        'native Sprites;\r\n'+
        'native Tonyu;\r\n'+
        '\r\n'+
        '\\new(x,y,p) {\r\n'+
        '    super(x,y,p);\r\n'+
        '    if (Tonyu.runMode) initSprite();\r\n'+
        '}\r\n'+
        '\\initSprite() {\r\n'+
        '    /*if (!_sprite) {\r\n'+
        '        _sprite=Sprites.add{owner:this};\r\n'+
        '    }*/\r\n'+
        '    $Sprites.add(this);\r\n'+
        '}\r\n'+
        '\r\n'+
        '/*\r\n'+
        '\\update() {\r\n'+
        '    super.update();\r\n'+
        '    if (_sprite) {\r\n'+
        '        _sprite.x=x;\r\n'+
        '        _sprite.y=y;\r\n'+
        '        _sprite.p=p;\r\n'+
        '    }\r\n'+
        '}*/'
      ,
      'BaseActor.tonyu': 
        'extends null;\r\n'+
        'includes MathMod;\r\n'+
        'native Tonyu;\r\n'+
        'native Key;\r\n'+
        'native console;\r\n'+
        'native Math;\r\n'+
        'native fukidashi;\r\n'+
        'native TextRect;\r\n'+
        '\r\n'+
        '\\new(x,y,p) {\r\n'+
        '    if (Tonyu.runMode) {\r\n'+
        '        var thg=currentThreadGroup();\r\n'+
        '        if (thg) _th=thg.addObj(this);\r\n'+
        '    }\r\n'+
        '    if (typeof x=="object") Tonyu.extend(this,x); \r\n'+
        '    else if (typeof x=="number") {\r\n'+
        '        this.x=x;\r\n'+
        '        this.y=y;\r\n'+
        '        this.p=p;\r\n'+
        '    }\r\n'+
        '    if (scaleX==null) scaleX=1;\r\n'+
        '    if (rotate==null) rotate=0;\r\n'+
        '    if (alpha==null) alpha=255;\r\n'+
        '}\r\n'+
        'nowait \\extend(obj) {\r\n'+
        '    return Tonyu.extend(this,obj);\r\n'+
        '}\r\n'+
        '\r\n'+
        'nowait \\print() {\r\n'+
        '    console.log.apply(console,arguments);\r\n'+
        '}\r\n'+
        '\\update() {\r\n'+
        '    ifwait {\r\n'+
        '        _thread.suspend();\r\n'+
        '    }\r\n'+
        '}\r\n'+
        'nowait \\getkey(k) {\r\n'+
        '    return $Keys.getkey(k);\r\n'+
        '}\r\n'+
        'nowait \\hitTo(t) {\r\n'+
        '    return crashTo(t);\r\n'+
        '}\r\n'+
        'nowait \\all(c) {\r\n'+
        '    var res=new TQuery;\r\n'+
        '    $Sprites.sprites.forEach \\(s) {\r\n'+
        '        if (s===this) return;\r\n'+
        '        if (!c || s instanceof c) {\r\n'+
        '            res.push(s);\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    return res;// new TQuery{objects:res};\r\n'+
        '}\r\n'+
        'nowait \\allCrash(t) {\r\n'+
        '    var res=new TQuery;\r\n'+
        '    var sp=this; //_sprite || this;\r\n'+
        '    var t1=getCrashRect();\r\n'+
        '    if (!t1) return res;\r\n'+
        '    $Sprites.sprites.forEach(\\(s) {\r\n'+
        '        var t2;\r\n'+
        '        if (s!==this && \r\n'+
        '        s instanceof t && \r\n'+
        '        (t2=s.getCrashRect()) &&\r\n'+
        '        Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\r\n'+
        '        Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {\r\n'+
        '            res.push(s);    \r\n'+
        '        }\r\n'+
        '    });\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        'nowait \\crashTo(t) {\r\n'+
        '    if (!t) return false;\r\n'+
        '    if (typeof t=="function") {\r\n'+
        '        return allCrash(t)[0];\r\n'+
        '    }\r\n'+
        '    return crashTo1(t);\r\n'+
        '}\r\n'+
        'nowait \\crashTo1(t) {\r\n'+
        '    if (!t || t._isDead) return false;\r\n'+
        '/*if (_sprite && t._sprite) {\r\n'+
        '        return _sprite.crashTo(t._sprite);\r\n'+
        '}*/\r\n'+
        '    var t1=getCrashRect();\r\n'+
        '    var t2=t.getCrashRect();\r\n'+
        '    return \r\n'+
        '    //    t1.x!=null && t1.y!=null && t1.width && t1.height &&\r\n'+
        '    //    t2.x!=null && t2.y!=null && t2.width && t2.height &&\r\n'+
        '    t1 && t2 &&\r\n'+
        '    Math.abs(t1.x-t2.x)*2<t1.width+t2.width &&\r\n'+
        '    Math.abs(t1.y-t2.y)*2<t1.height+t2.height;\r\n'+
        '}\r\n'+
        'nowait \\getCrashRect() {\r\n'+
        '    var actWidth=width*scaleX, actHeight;\r\n'+
        '    if(typeof scaleY==="undefined"){\r\n'+
        '        actHeight=height*scaleX;\r\n'+
        '    }else{\r\n'+
        '        actHeight=height*scaleY;\r\n'+
        '    }\r\n'+
        '    return typeof x=="number" &&\r\n'+
        '    typeof y=="number" &&\r\n'+
        '    typeof width=="number" &&\r\n'+
        '    typeof height=="number" && \r\n'+
        '    {x,y,width:actWidth,height:actHeight};\r\n'+
        '}\r\n'+
        'nowait \\watchHit(typeA,typeB,onHit) {\r\n'+
        '    $Sprites.watchHit(typeA , typeB, \\(a,b) {\r\n'+
        '        onHit.apply(this,[a,b]);\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'nowait \\currentThreadGroup() {\r\n'+
        '    return $currentThreadGroup; \r\n'+
        '}\r\n'+
        'nowait \\die() {\r\n'+
        '    if (_th) {\r\n'+
        '        _th.kill();\r\n'+
        '    }\r\n'+
        '    hide();\r\n'+
        '    play().stop();\r\n'+
        '    _isDead=true;\r\n'+
        '}\r\n'+
        'nowait \\hide() {\r\n'+
        '/*if (_sprite) {\r\n'+
        '        $Sprites.remove(_sprite);\r\n'+
        '        _sprite=null;\r\n'+
        '} else {*/\r\n'+
        '    $Sprites.remove(this);\r\n'+
        '//}\r\n'+
        '}\r\n'+
        'nowait \\show(x,y,p) {\r\n'+
        '    $Sprites.add(this);\r\n'+
        '    if (x!=null) this.x=x;\r\n'+
        '    if (y!=null) this.y=y;\r\n'+
        '    if (p!=null) this.p=p;\r\n'+
        '}\r\n'+
        '\r\n'+
        'nowait \\rnd(r) {\r\n'+
        '    if (typeof r=="number") {\r\n'+
        '        return Math.floor(Math.random()*r);\r\n'+
        '    }\r\n'+
        '    return Math.random();\r\n'+
        '}\r\n'+
        'nowait \\detectShape() {\r\n'+
        '    if (typeof p!="number") {\r\n'+
        '        if (text!=null) return;\r\n'+
        '        p=0;\r\n'+
        '    }\r\n'+
        '    p=Math.floor(p);\r\n'+
        '    pImg=$Sprites.getImageList()[p];\r\n'+
        '    if (!pImg) return;\r\n'+
        '    width=pImg.width;\r\n'+
        '    height=pImg.height;\r\n'+
        '}\r\n'+
        '\\waitFor(f) {\r\n'+
        '    ifwait {\r\n'+
        '        _thread.waitFor(f);\r\n'+
        '    }\r\n'+
        '    update();\r\n'+
        '}\r\n'+
        'nowait \\isDead() {\r\n'+
        '    return _isDead;\r\n'+
        '}\r\n'+
        'nowait \\draw(ctx) {\r\n'+
        '    if (x==null || y==null) return;\r\n'+
        '    detectShape();\r\n'+
        '    if (pImg) {\r\n'+
        '        ctx.save();\r\n'+
        '        ctx.translate(x,y);\r\n'+
        '        ctx.rotate(this.rotate/180*Math.PI);\r\n'+
        '        if(typeof this.scaleY==="undefined") {\r\n'+
        '            ctx.scale(this.scaleX,this.scaleX);\r\n'+
        '        }else{\r\n'+
        '            ctx.scale(this.scaleX,this.scaleY);\r\n'+
        '        }\r\n'+
        '        ctx.globalAlpha=this.alpha/255;\r\n'+
        '        ctx.drawImage(\r\n'+
        '        pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '        -width/2, -height/2, width, height);\r\n'+
        '        ctx.restore();\r\n'+
        '    } else if (text) {\r\n'+
        '        if (!size) size=15;\r\n'+
        '        if (!align) align="center";\r\n'+
        '        if (!fillStyle) fillStyle="white";\r\n'+
        '        ctx.fillStyle=fillStyle;\r\n'+
        '        var rect=TextRect.draw(ctx, text, x, y, size, align , "fill");\r\n'+
        '        width=rect.w;\r\n'+
        '        height=rect.h;\r\n'+
        '    }\r\n'+
        '    if (_fukidashi) {\r\n'+
        '        if (_fukidashi.c>0) {\r\n'+
        '            _fukidashi.c--;\r\n'+
        '            ctx.fillStyle="white";\r\n'+
        '            ctx.strokeStyle="black";\r\n'+
        '            fukidashi ( ctx , _fukidashi.text, \r\n'+
        '            x, y-height/2-10, _fukidashi.size);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '}\r\n'+
        'nowait \\asyncResult() {\r\n'+
        '    return Tonyu.asyncResult();\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\screenOut(a) {\r\n'+
        '//オブジェクトが画面外に出たかどうかを判定します。\r\n'+
        '    if (!a) a=0;\r\n'+
        '    var r=0;\r\n'+
        '    var viewX=0,viewY=0;\r\n'+
        '    if (x<viewX+a)               r+=viewX+a-x;\r\n'+
        '    if (y<viewY+a)               r+=viewY+a-y;\r\n'+
        '    if (x>$screenWidth +viewX-a) r+=x-($screenWidth +viewX-a);\r\n'+
        '    if (y>$screenHeight+viewY-a) r+=y-($screenHeight+viewY-a);\r\n'+
        '    return r;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\play() {\r\n'+
        '    if (!_mml) _mml=new MML;\r\n'+
        '    if (isDead() || arguments.length==0) return _mml;\r\n'+
        '    var mmls=[];\r\n'+
        '    for (var i=0; i<arguments.length; i++) {\r\n'+
        '        mmls.push(arguments[i]);\r\n'+
        '    }\r\n'+
        '    _mml.play(mmls);\r\n'+
        '    while (_mml.bufferCount()>2) {\r\n'+
        '        update();\r\n'+
        '    }\r\n'+
        '    return _mml;\r\n'+
        '}\r\n'+
        'nowait \\playSE() {\r\n'+
        '    var mml=new MML;\r\n'+
        '    var mmls=[];\r\n'+
        '    for (var i=0; i<arguments.length; i++) {\r\n'+
        '        mmls.push(arguments[i]);\r\n'+
        '    }\r\n'+
        '    mml.play(mmls);\r\n'+
        '    return mml;\r\n'+
        '}'
      ,
      'Boot.tonyu': 
        'native $;\r\n'+
        'native TError;\r\n'+
        'native $LASTPOS;\r\n'+
        'native Key;\r\n'+
        'native Date;\r\n'+
        'native ImageList;\r\n'+
        'native Tonyu;\r\n'+
        'native SplashScreen;\r\n'+
        '\r\n'+
        '\\initSprites() {\r\n'+
        '    $Sprites=new Sprites();\r\n'+
        '    print ("Loading pats..");\r\n'+
        '    var rs=$currentProject.getResource();\r\n'+
        '    var a=asyncResult();\r\n'+
        '    ImageList( rs.images, a.receiver);\r\n'+
        '    waitFor(a);\r\n'+
        '    var r=a[0];\r\n'+
        '    $Sprites.setImageList(r);\r\n'+
        '    for (var name,val in r.names) {\r\n'+
        '        Tonyu.setGlobal(name, val);\r\n'+
        '    }\r\n'+
        '    print ("Loading pats done.");\r\n'+
        '    cvj=$("canvas");\r\n'+
        '    if (Tonyu.noviceMode) {\r\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:600, height:300};\r\n'+
        '    } else {\r\n'+
        '        $Screen=new ScaledCanvas{canvas:cvj, width:465, height:465};\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\initCanvasEvents() {\r\n'+
        '    cv=cvj[0];\r\n'+
        '    $handleMouse=\\(e) {\r\n'+
        '        var p=cvj.offset();\r\n'+
        '        var mp={x:e.clientX-p.left, y:e.clientY-p.top};\r\n'+
        '        mp=$Screen.canvas2buf(mp);\r\n'+
        '        $mouseX=mp.x;//e.clientX-p.left;\r\n'+
        '        $mouseY=mp.y;//e.clientY-p.top;\r\n'+
        '    };\r\n'+
        '    $touches=[{},{},{},{},{}];\r\n'+
        '    $touches.findById=\\(id) {\r\n'+
        '        for (var j=0 ; j<$touches.length ; j++) {\r\n'+
        '            if ($touches[j].identifier==id) {\r\n'+
        '                return $touches[j];\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    $handleTouch=\\(e) {\r\n'+
        '        var p=cvj.offset();\r\n'+
        '        e.preventDefault();\r\n'+
        '        var ts=e.originalEvent.changedTouches;\r\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\r\n'+
        '            var src=ts[i];\r\n'+
        '            var dst=$touches.findById(src.identifier);\r\n'+
        '            if (!dst) {\r\n'+
        '                for (var j=0 ; j<$touches.length ; j++) {\r\n'+
        '                    if (!$touches[j].touched) {\r\n'+
        '                        dst=$touches[j];\r\n'+
        '                        dst.identifier=src.identifier;\r\n'+
        '                        break;\r\n'+
        '                    }\r\n'+
        '                }\r\n'+
        '            }\r\n'+
        '            if (dst) {\r\n'+
        '                mp={x:src.pageX-p.left, y:src.pageY-p.top};\r\n'+
        '                mp=$Screen.canvas2buf(mp);\r\n'+
        '                dst.x=mp.x;//src.pageX-p.left;\r\n'+
        '                dst.y=mp.y;//src.pageY-p.top;\r\n'+
        '                dst.touched=true;\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '        $mouseX=$touches[0].x;\r\n'+
        '        $mouseY=$touches[0].y;\r\n'+
        '    };\r\n'+
        '    $handleTouchEnd=\\(e) {\r\n'+
        '        var ts=e.originalEvent.changedTouches;\r\n'+
        '        for (var i =0 ; i<ts.length ; i++) {\r\n'+
        '            var src=ts[i];\r\n'+
        '            var dst=$touches.findById(src.identifier);\r\n'+
        '            if (dst) {\r\n'+
        '                dst.touched=false;\r\n'+
        '                dst.identifier=-1;\r\n'+
        '            }\r\n'+
        '        }\r\n'+
        '    };\r\n'+
        '    var handleMouse=\\(e){$handleMouse(e);};\r\n'+
        '    var handleTouch=\\(e){$handleTouch(e);};\r\n'+
        '    var handleTouchEnd=\\(e){$handleTouchEnd(e);};\r\n'+
        '    var d=$.data(cv,"events");\r\n'+
        '    if (!d) {\r\n'+
        '        $.data(cv,"events","true");\r\n'+
        '        cvj.mousedown(handleMouse);\r\n'+
        '        cvj.mousemove(handleMouse);\r\n'+
        '        cvj.on("touchstart",handleTouch);\r\n'+
        '        cvj.on("touchmove",handleTouch);\r\n'+
        '        cvj.on("touchend",handleTouchEnd);\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\initThread() {\r\n'+
        '    thg=Tonyu.threadGroup();\r\n'+
        '    var o=Tonyu.currentProject.getOptions();\r\n'+
        '    var mainClassName=o.run.mainClass;\r\n'+
        '    print("MainClass= "+mainClassName);\r\n'+
        '    mainClass=Tonyu.getClass(mainClassName);\r\n'+
        '    if (!mainClass) {\r\n'+
        '        TError( mainClassName+" というクラスはありません", \r\n'+
        '        "不明" ,0).raise();\r\n'+
        '    }\r\n'+
        '    Tonyu.runMode=true;\r\n'+
        '    $currentThreadGroup=thg;\r\n'+
        '    new mainClass();\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    //print("STOP!!");\r\n'+
        '    for (var k,v in $MMLS) {\r\n'+
        '        v.stop();\r\n'+
        '    }\r\n'+
        '    $WaveTable.stop();\r\n'+
        '}\r\n'+
        'initSprites();\r\n'+
        'initCanvasEvents();\r\n'+
        'initThread();\r\n'+
        '\r\n'+
        '$pat_fruits=30;\r\n'+
        '$Keys=new Keys;\r\n'+
        '$MMLS={};\r\n'+
        '$WaveTable=new WaveTable;\r\n'+
        'if (typeof SplashScreen!="undefined") SplashScreen.hide();\r\n'+
        'while (true) {\r\n'+
        '    ti=new Date().getTime();\r\n'+
        '    thg.steps();\r\n'+
        '    $Keys.update();\r\n'+
        '    $screenWidth=$Screen.width;\r\n'+
        '    $screenHeight=$Screen.height;\r\n'+
        '    $Sprites.draw($Screen.buf[0]);\r\n'+
        '    $Screen.draw();\r\n'+
        '    $Sprites.checkHit();\r\n'+
        '    wt=33-(new Date().getTime()-ti);\r\n'+
        '    if (wt<0) wt=0;\r\n'+
        '    waitFor(Tonyu.timeout(wt));\r\n'+
        '}'
      ,
      'Keys.tonyu': 
        'extends TObject;\r\n'+
        'native String;\r\n'+
        'native $;\r\n'+
        'native document;\r\n'+
        '//\\new () {this.main();}\r\n'+
        'stats={};\r\n'+
        'codes={\r\n'+
        '    left: 37 , up:38 , right: 39, down:40, space:32, enter:13,\r\n'+
        '    shift:16, ctrl:17, alt:18, mouseleft: 1\r\n'+
        '};\r\n'+
        'for (var i=65 ; i<65+26; i++) {\r\n'+
        '    codes[String.fromCharCode(i).toLowerCase()]=i;\r\n'+
        '}\r\n'+
        'for (var i=48 ; i<58; i++) {\r\n'+
        '    codes[String.fromCharCode(i)]=i;\r\n'+
        '}\r\n'+
        'if (!$.data(document,"key_event")) {\r\n'+
        '    $.data(document,"key_event",true);\r\n'+
        '    $(document).keydown \\(e) {$Keys.keydown(e);};\r\n'+
        '    $(document).keyup \\(e) {$Keys.keyup(e);};\r\n'+
        '    $(document).mousedown \\(e) {\r\n'+
        '        $Keys.keydown{keyCode:1};\r\n'+
        '    };\r\n'+
        '    $(document).mouseup \\(e) {\r\n'+
        '        $Keys.keyup{keyCode:1};\r\n'+
        '    };\r\n'+
        '}\r\n'+
        'function getkey(code) {\r\n'+
        '    if (typeof code=="string") {\r\n'+
        '        code=codes[code.toLowerCase()];\r\n'+
        '    }\r\n'+
        '    if (!code) return 0;\r\n'+
        '    if (stats[code]==-1) return 0;\r\n'+
        '    if (!stats[code]) stats[code]=0;\r\n'+
        '    return stats[code];\r\n'+
        '}\r\n'+
        'function update() {\r\n'+
        '    for (var i in stats) {\r\n'+
        '        if (stats[i]>0) {stats[i]++;}\r\n'+
        '        if (stats[i]==-1) stats[i]=1;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\keydown(e) {\r\n'+
        '    var s=stats[e.keyCode];\r\n'+
        '    if (!s) {\r\n'+
        '        stats[e.keyCode]=-1;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\keyup(e) {\r\n'+
        '    stats[e.keyCode]=0;\r\n'+
        '}'
      ,
      'Map.tonyu': 
        'native Math;\r\n'+
        'native $;\r\n'+
        '\\new (param){\r\n'+
        '    sx=0;\r\n'+
        '    sy=0;\r\n'+
        '    super(param);\r\n'+
        '    buf=$("<canvas>").attr{width:col*chipWidth,height:row*chipHeight};\r\n'+
        '    mapTable = [];\r\n'+
        '    for(var j=0;j<row;j++){\r\n'+
        '        rows = [];\r\n'+
        '        for(var i=0;i<col;i++){\r\n'+
        '            rows.push(-1);\r\n'+
        '        }\r\n'+
        '        mapTable.push(rows);\r\n'+
        '    }\r\n'+
        '/*for(var i=0;i<col;i++){\r\n'+
        '        mapTable[i]=[];\r\n'+
        '}*/\r\n'+
        '    \r\n'+
        '}\r\n'+
        '\r\n'+
        '\\set(setCol,setRow,p){\r\n'+
        '    if(setCol>col || setRow>row || setCol<0 || setRow<0) return;\r\n'+
        '    mapTable[setRow][setCol]=p;\r\n'+
        '    ctx=buf[0].getContext("2d");\r\n'+
        '    p=Math.floor(p);\r\n'+
        '    pImg=$Sprites.getImageList()[p];\r\n'+
        '    if (!pImg) {\r\n'+
        '        ctx.clearRect(setCol*chipWidth,setRow*chipHeight,chipWidth,chipHeight);\r\n'+
        '        return;\r\n'+
        '    }\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.drawImage(\r\n'+
        '    pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '    setCol*chipWidth, setRow*chipHeight, chipWidth, chipHeight);\r\n'+
        '    ctx.restore();\r\n'+
        '}\r\n'+
        '\\get(getCol,getRow){\r\n'+
        '    if(getCol>col || getRow>row || getCol<0 || getRow<0) return;\r\n'+
        '    return mapTable[getRow][getCol];\r\n'+
        '}\r\n'+
        '\\getAt(getX,getY){\r\n'+
        '    return get(Math.floor(getX/chipWidth),Math.floor(getY/chipHeight));\r\n'+
        '}\r\n'+
        '\\scrollTo(scrollX,scrollY){\r\n'+
        '    sx=scrollX;\r\n'+
        '    sy=scrollY;\r\n'+
        '}\r\n'+
        '\\draw(ctx) {\r\n'+
        '    pImg=buf[0];\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.drawImage(\r\n'+
        '    pImg, 0, 0,col*chipWidth, row*chipHeight,\r\n'+
        '    sx, sy, col*chipWidth, row*chipHeight);\r\n'+
        '    ctx.restore();\r\n'+
        '    /*for(var i=0;i<row;i++){\r\n'+
        '        for(var j=0;j<col;j++){\r\n'+
        '            p=Math.floor(get(j,i));\r\n'+
        '            pImg=$Sprites.getImageList()[p];\r\n'+
        '            if (!pImg) return;\r\n'+
        '            ctx.save();\r\n'+
        '            ctx.drawImage(\r\n'+
        '            pImg.image, pImg.x, pImg.y, pImg.width, pImg.height,\r\n'+
        '            j*chipWidth, i*chipHeight, chipWidth, chipHeight);\r\n'+
        '            ctx.restore();\r\n'+
        '            if($screenWidth<j*chipWidth) break;\r\n'+
        '        }\r\n'+
        '        if($screenHeight<i*chipHeight) break;\r\n'+
        '    }*/\r\n'+
        '}\r\n'
      ,
      'MathMod.tonyu': 
        'extends null;\r\n'+
        'native Math;\r\n'+
        '\r\n'+
        '\\sin(d) {\r\n'+
        '    return Math.sin(rad(d));\r\n'+
        '}\r\n'+
        '\\cos(d) {\r\n'+
        '    return Math.cos(rad(d));\r\n'+
        '}\r\n'+
        '\\rad(d) {\r\n'+
        '    return d/180*Math.PI;\r\n'+
        '}\r\n'+
        '\\deg(d) {\r\n'+
        '    return d/Math.PI*180;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\abs(v) {\r\n'+
        '    return Math.abs(v);\r\n'+
        '}\r\n'+
        '\\atan2(x,y) {\r\n'+
        '    return deg(Math.atan2(x,y));\r\n'+
        '}\r\n'+
        '\\floor(x) {\r\n'+
        '    return Math.floor(x);\r\n'+
        '}\r\n'+
        '\\angleDiff(a,b) {\r\n'+
        '    var c;\r\n'+
        '    a=floor(a);\r\n'+
        '    b=floor(b);\r\n'+
        '    if (a>=b) {\r\n'+
        '        c=(a-b) % 360;\r\n'+
        '        if (c>=180) c-=360;\r\n'+
        '    } else {\r\n'+
        '        c=-((b-a) % 360);\r\n'+
        '        if (c<-180) c+=360;\r\n'+
        '    }\r\n'+
        '    return c;\r\n'+
        '}\r\n'+
        '\\sqrt(t) {\r\n'+
        '    return Math.sqrt(t);\r\n'+
        '}\r\n'+
        '\\dist(dx,dy) {\r\n'+
        '    if (typeof dx=="object") {\r\n'+
        '        var t=dx;\r\n'+
        '        dx=t.x-x;dy=t.y-y;\r\n'+
        '    }\r\n'+
        '    return sqrt(dx*dx+dy*dy);\r\n'+
        '}'
      ,
      'MML.tonyu': 
        'extends TObject;\r\n'+
        'native T;\r\n'+
        '\r\n'+
        'mmlBuf=[];\r\n'+
        '\\play(mmls) {\r\n'+
        '    mmlBuf.push(mmls);\r\n'+
        '    if (!isPlaying()) {\r\n'+
        '        playNext();\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\playNext() {\r\n'+
        '    //print("play!", id(), bufferCount());\r\n'+
        '    var mml=mmlBuf.shift();\r\n'+
        '    if (!mml) {\r\n'+
        '        m=null;\r\n'+
        '        return;\r\n'+
        '    }\r\n'+
        '    mwav=$WaveTable.get(0,0).play();\r\n'+
        '    m=T("mml", {mml}, mwav);\r\n'+
        '    m.on("ended", playNext);\r\n'+
        '    m.start();\r\n'+
        '    $MMLS[id()]=this;\r\n'+
        '}\r\n'+
        '\\id() {\r\n'+
        '    if (!_id) _id=rnd()+"";\r\n'+
        '    return _id;\r\n'+
        '}\r\n'+
        '\\bufferCount() {\r\n'+
        '    return mmlBuf.length;\r\n'+
        '}\r\n'+
        '\\isPlaying() {\r\n'+
        '    return m;\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    if (m) {\r\n'+
        '        if (mwav) {\r\n'+
        '            mwav.pause();\r\n'+
        '            mwav.stop();\r\n'+
        '        }\r\n'+
        '        m.pause();\r\n'+
        '        m.stop();\r\n'+
        '        m=null;\r\n'+
        '        mmlBuf=[];\r\n'+
        '        //print("stop!", id(), bufferCount());\r\n'+
        '        delete $MMLS[id()];\r\n'+
        '    }\r\n'+
        '}\r\n'
      ,
      'NoviceActor.tonyu': 
        'extends BaseActor;\r\n'+
        'native Tonyu;\r\n'+
        '\r\n'+
        '\\sleep(n) {\r\n'+
        '    if(!n) n=1;\r\n'+
        '    for(n;n>0;n--) update();\r\n'+
        '}\r\n'+
        '\\initSprite() {\r\n'+
        '    if (!_sprite) {\r\n'+
        '        _sprite=new BaseActor{owner:this};// Sprites.add{owner:this};\r\n'+
        '        $Sprites.add(this);\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\say(text,size) {\r\n'+
        '    if (!size) size=15;\r\n'+
        '    initSprite();\r\n'+
        '    _sprite._fukidashi={text:text, size:size, c:30};\r\n'+
        '}\r\n'+
        '\\sprite(x,y,p) {\r\n'+
        '    go(x,y,p);\r\n'+
        '}\r\n'+
        '\\show(x,y,p) {\r\n'+
        '    go(x,y,p);\r\n'+
        '}\r\n'+
        'nowait \\draw(ctx) {\r\n'+
        '    _sprite.draw(ctx);\r\n'+
        '}\r\n'+
        '\\getCrashRect() {\r\n'+
        '    return _sprite.getCrashRect();\r\n'+
        '}\r\n'+
        '\\go(x,y,p) {\r\n'+
        '    initSprite();\r\n'+
        '    _sprite.x=x;\r\n'+
        '    _sprite.y=y;\r\n'+
        '    if (p!=null) _sprite.p=p;\r\n'+
        '    //update();\r\n'+
        '}\r\n'+
        '\\change(p) {\r\n'+
        '    initSprite();\r\n'+
        '    _sprite.p=p;\r\n'+
        '}'
      ,
      'ScaledCanvas.tonyu': 
        'native $;\r\n'+
        'native Math;\r\n'+
        '\r\n'+
        '// canvas:phisical  buf: logical\r\n'+
        '\\new (opt) {\r\n'+
        '    extend(opt);\r\n'+
        '    // canvas/ width,height\r\n'+
        '    resize(width, height);\r\n'+
        '    cw=canvas.width();\r\n'+
        '    ch=canvas.height();\r\n'+
        '    cctx=canvas[0].getContext("2d");\r\n'+
        '    this.color="rgb(20,80,180)";\r\n'+
        '}\r\n'+
        '\\resize(width,height) {\r\n'+
        '    this.width=width;\r\n'+
        '    this.height=height;\r\n'+
        '    buf=$("<canvas>").attr{width,height};\r\n'+
        '    ctx=buf[0].getContext("2d");  \r\n'+
        '    $screenWidth=width;\r\n'+
        '    $screenHeight=height;\r\n'+
        '}\r\n'+
        '\\shouldDraw1x1(srcw,srch,dstw,dsth) {\r\n'+
        '    // srcw=465 -> dstw=460...665\r\n'+
        '    var larger=200;\r\n'+
        '    var smaller=5;\r\n'+
        '    return srcw-smaller<=dstw && dstw<=srcw+larger &&\r\n'+
        '    srch-smaller<=dsth && dsth<=srch+larger;\r\n'+
        '}\r\n'+
        '\\draw() {\r\n'+
        '    cw=canvas.width();\r\n'+
        '    ch=canvas.height();\r\n'+
        '    var calcw=ch/height*width; // calch=ch\r\n'+
        '    var calch=cw/width*height; // calcw=cw\r\n'+
        '    if (calch>ch) calch=ch;\r\n'+
        '    if (calcw>cw) calcw=cw;\r\n'+
        '    cctx.clearRect(0,0,cw,ch);\r\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\r\n'+
        '        calcw=width;calch=height;\r\n'+
        '    }\r\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\r\n'+
        '    var marginh=Math.floor((ch-calch)/2);\r\n'+
        '    cctx.drawImage(buf[0],\r\n'+
        '    0,0,width, height, \r\n'+
        '    marginw,marginh,calcw, calch );\r\n'+
        '}\r\n'+
        '\\canvas2buf(point) {\r\n'+
        '    var calcw=ch/height*width; // calch=ch\r\n'+
        '    var calch=cw/width*height; // calcw=cw\r\n'+
        '    if (calch>ch) calch=ch;\r\n'+
        '    if (calcw>cw) calcw=cw;\r\n'+
        '    if (shouldDraw1x1(width,height,calcw,calch)) {\r\n'+
        '        calcw=width;calch=height;\r\n'+
        '    }\r\n'+
        '    var marginw=Math.floor((cw-calcw)/2);\r\n'+
        '    var marginh=Math.floor((ch-calch)/2);\r\n'+
        '\r\n'+
        '    return {x: (point.x-marginw)/calcw*width, \r\n'+
        '    y: (point.y-marginh)/calch*height};\r\n'+
        '}\r\n'+
        '\\setBGColor(color){\r\n'+
        '    this.color=color;\r\n'+
        '}'
      ,
      'Sprites.tonyu': 
        'native Tonyu;\r\n'+
        '\\new() {\r\n'+
        '    sprites=[];\r\n'+
        '    imageList=[];\r\n'+
        '    hitWatchers=[];\r\n'+
        '    isDrawGrid=Tonyu.noviceMode;\r\n'+
        '}\r\n'+
        'function add(s) {\r\n'+
        '    if (s.__addedToSprites) return;\r\n'+
        '    sprites.push(s);\r\n'+
        '    s.__addedToSprites=this;\r\n'+
        '    return s;\r\n'+
        '}\r\n'+
        'function remove(s) {\r\n'+
        '    var idx=sprites.indexOf(s);\r\n'+
        '    if (idx<0) return;\r\n'+
        '    sprites.splice(idx,1);\r\n'+
        '    delete s.__addedToSprites;\r\n'+
        '}\r\n'+
        'function clear() {sprites.splice(0,sprites.length);}\r\n'+
        'function draw(cv) {\r\n'+
        '    var ctx=cv.getContext("2d");\r\n'+
        '    ctx.fillStyle=$Screen.color;\r\n'+
        '    ctx.fillRect(0,0,cv.width,cv.height);\r\n'+
        '    if (isDrawGrid) drawGrid(cv);\r\n'+
        '    sprites.forEach(\\(sprite) {\r\n'+
        '        sprite.draw(ctx);\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'function checkHit() {\r\n'+
        '    hitWatchers.forEach(function (w) {\r\n'+
        '        sprites.forEach(function (a) {\r\n'+
        '                //console.log("a:",  a.owner);\r\n'+
        '            var a_owner=a;//a.owner|| a;\r\n'+
        '            if (! (a_owner instanceof w.A)) return;\r\n'+
        '            sprites.forEach(function (b) {\r\n'+
        '                var b_owner=b;//b.owner|| b;\r\n'+
        '                if (a===b) return;\r\n'+
        '                if (! (b_owner instanceof w.B)) return;\r\n'+
        '                //console.log("b:",  b.owner);\r\n'+
        '                if (a.crashTo1(b)) {\r\n'+
        '                    //console.log("hit", a.owner, b.owner);\r\n'+
        '                    w.h(a_owner,b_owner);\r\n'+
        '                }\r\n'+
        '            });\r\n'+
        '        });\r\n'+
        '    });\r\n'+
        '}\r\n'+
        'function watchHit(typeA, typeB, onHit) {\r\n'+
        '    var p={A: typeA, B:typeB, h:onHit};\r\n'+
        '    //console.log(p);\r\n'+
        '    hitWatchers.push(p);\r\n'+
        '}\r\n'+
        'function drawGrid(c) {\r\n'+
        '    var ctx=c.getContext("2d");\r\n'+
        '    ctx.textBaseline="top";\r\n'+
        '    ctx.save();\r\n'+
        '    ctx.strokeStyle="rgb(40,100,200)";\r\n'+
        '    for (var i=0 ; i<c.width ; i+=10) {\r\n'+
        '        ctx.beginPath();\r\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n'+
        '        ctx.moveTo(i,0);\r\n'+
        '        ctx.lineTo(i,c.height);\r\n'+
        '        ctx.closePath();\r\n'+
        '        ctx.stroke();\r\n'+
        '    }\r\n'+
        '\r\n'+
        '    for (var i=0 ; i<c.height ; i+=10) {\r\n'+
        '        ctx.beginPath();\r\n'+
        '        ctx.lineWidth=(i % 100 ==0 ? 4 : 1);\r\n'+
        '        ctx.moveTo(0,i);\r\n'+
        '        ctx.lineTo(c.width,i);\r\n'+
        '        ctx.closePath();\r\n'+
        '        ctx.stroke();\r\n'+
        '    }\r\n'+
        '    ctx.fillStyle="white";\r\n'+
        '    ctx.font="15px monospaced";\r\n'+
        '    for (var i=100 ; i<c.width ; i+=100) {\r\n'+
        '        ctx.fillText(i, i,0);\r\n'+
        '    }\r\n'+
        '    for (var i=100 ; i<c.height ; i+=100) {\r\n'+
        '        ctx.fillText(i, 0,i);\r\n'+
        '    }\r\n'+
        '    ctx.restore();\r\n'+
        '}\r\n'+
        'function setImageList(il) {\r\n'+
        '    imageList=il;\r\n'+
        '}\r\n'+
        'function getImageList() {\r\n'+
        '    return imageList;\r\n'+
        '}'
      ,
      'TObject.tonyu': 
        'native Tonyu;\r\n'+
        '\\new (options) {\r\n'+
        '    if (typeof options=="object") extend(options);\r\n'+
        '    this.main();\r\n'+
        '}\r\n'+
        'nowait \\extend(obj) {\r\n'+
        '    return Tonyu.extend(this,obj);\r\n'+
        '}'
      ,
      'TQuery.tonyu': 
        'extends TObject;\r\n'+
        '\\new () {\r\n'+
        '    length=0;\r\n'+
        '}\r\n'+
        '\\tonyuIterator(arity) {\r\n'+
        '    var res={};\r\n'+
        '    res.i=0;\r\n'+
        '    if (arity==1) {\r\n'+
        '        res.next=function () {\r\n'+
        '            if (res.i>=this.length) return false;\r\n'+
        '            res[0]=this[res.i];\r\n'+
        '            res.i++;\r\n'+
        '            return true;\r\n'+
        '        };\r\n'+
        '    } else {\r\n'+
        '        res.next=function () {\r\n'+
        '            if (res.i>=this.length) return false;\r\n'+
        '            res[0]=res.i;\r\n'+
        '            res[1]=this[res.i];\r\n'+
        '            res.i++;\r\n'+
        '            return true;\r\n'+
        '        };\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\attr() {\r\n'+
        '    var values;\r\n'+
        '    if (length==0) return;\r\n'+
        '    if (arguments.length==1 && typeof arguments[0]=="string") {\r\n'+
        '        return this[0][arguments[0]];\r\n'+
        '    }\r\n'+
        '    if (arguments.length>=2) {\r\n'+
        '        values={};\r\n'+
        '        for (var i=0 ; i<arguments.length-1 ;i+=2) {\r\n'+
        '            values[arguments[i]]=arguments[i+1];\r\n'+
        '        }\r\n'+
        '    } else {\r\n'+
        '        values=arguments[0];\r\n'+
        '    }\r\n'+
        '    if (values) {\r\n'+
        '        for (var e in this) {\r\n'+
        '            e.extend( values);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\genKeyfunc(key) {\r\n'+
        '    if (typeof key!="function") {\r\n'+
        '        return \\(o) {return o[key];};\r\n'+
        '    } else {\r\n'+
        '        return key;\r\n'+
        '    }\r\n'+
        '}\r\n'+
        '\\max(key) {\r\n'+
        '    var f=genKeyfunc(key);\r\n'+
        '    var res;\r\n'+
        '    for (var o in this) {\r\n'+
        '        var v=f(o);\r\n'+
        '        if (res==null || v>res) res=v;\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\min(key) {\r\n'+
        '    var f=genKeyfunc(key);\r\n'+
        '    var res;\r\n'+
        '    for (var o in this) {\r\n'+
        '        var v=f(o);\r\n'+
        '        if (res==null || v<res) res=v;\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '\\push(e) {\r\n'+
        '    this[length]=e;\r\n'+
        '    length++;\r\n'+
        '}\r\n'+
        '\\size() {return length;}\r\n'+
        '\\find(f) {\r\n'+
        '    var no=new TQuery;\r\n'+
        '    for (var o in this) {\r\n'+
        '        if (f(o)) no.push(o);\r\n'+
        '    }\r\n'+
        '    return no;\r\n'+
        '} \r\n'+
        '\\apply(name, args) {\r\n'+
        '    var res;\r\n'+
        '    if (!args) args=[];\r\n'+
        '    for (var o in this) {\r\n'+
        '        var f=o[name];\r\n'+
        '        if (typeof f=="function") {\r\n'+
        '            res=f.apply(o, args);\r\n'+
        '        }\r\n'+
        '    }\r\n'+
        '    return res;\r\n'+
        '}\r\n'+
        '// \\alive => find \\(o) => !o.isDead()  //  (in future)\r\n'+
        '\\alive() {\r\n'+
        '    return find \\(o) {\r\n'+
        '        return !o.isDead();\r\n'+
        '    };\r\n'+
        '}\r\n'+
        '\\die() {\r\n'+
        '    var a=alive();\r\n'+
        '    if (a.length==0) return false;\r\n'+
        '    a.apply("die");\r\n'+
        '    return true;\r\n'+
        '}\r\n'+
        '\r\n'+
        '\\klass(k) {\r\n'+
        '    return find \\(o) { return o instanceof k; };\r\n'+
        '}'
      ,
      'WaveTable.tonyu': 
        'extends TObject;\r\n'+
        'native T;\r\n'+
        '\r\n'+
        'wav={};\r\n'+
        'env={};\r\n'+
        '\\setWav(num, synth) {\r\n'+
        '    wav[num]=synth;\r\n'+
        '}\r\n'+
        '\\setEnv(num, synth) {\r\n'+
        '    env[num]=synth;\r\n'+
        '}\r\n'+
        '\\get(w,e) {\r\n'+
        '    var synth=T("OscGen") {osc:wav[w], env:env[e], mul:0.25};\r\n'+
        '    return synth;\r\n'+
        '}\r\n'+
        '\\stop() {\r\n'+
        '    /*for (var k,v in tbl) {\r\n'+
        '        v.pause();\r\n'+
        '        v.stop();\r\n'+
        '    }*/\r\n'+
        '}\r\n'+
        '\r\n'+
        'if (typeof T!=="undefined") {\r\n'+
        '    //env=T("adsr", {a:0,d:200,s:0.5,r:10});\r\n'+
        '    env = T("env",{table:[1, [0.6, 50], [0, 100]], releaseNode:2});\r\n'+
        '    setEnv(0, env);\r\n'+
        '    setWav(0, T("pulse"));\r\n'+
        '    //    synth=T("OscGen") {wave:"pulse", env, mul:0.25};\r\n'+
        '    //set(0,synth);    \r\n'+
        '}\r\n'
      
    }
  };
  if (WebSite.devMode) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();