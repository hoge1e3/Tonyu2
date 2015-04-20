Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Ball=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000003;//user.Ball:3
    while (_this.y<Tonyu.globals.$screenHeight&&! Tonyu.globals.$gov) {
      //$LASTPOS=1000041;//user.Ball:41
      _this.y+=Tonyu.globals.$spd;
      //$LASTPOS=1000076;//user.Ball:76
      _this.ok=_this.check();
      //$LASTPOS=1000092;//user.Ball:92
      if (_this.crash()) {
        //$LASTPOS=1000117;//user.Ball:117
        if (_this.ok) {
          //$LASTPOS=1000139;//user.Ball:139
          if (Tonyu.globals.$sound) {
            //$LASTPOS=1000151;//user.Ball:151
            _this.playSE("l64o4v10gfev5dc>g v3fedc");
          }
          //$LASTPOS=1000199;//user.Ball:199
          Tonyu.globals.$combo.inc();
          //$LASTPOS=1000225;//user.Ball:225
          Tonyu.globals.$score.inc();
          //$LASTPOS=1000251;//user.Ball:251
          Tonyu.globals.$level.get();
          
        } else {
          //$LASTPOS=1000294;//user.Ball:294
          if (Tonyu.globals.$sound) {
            //$LASTPOS=1000306;//user.Ball:306
            _this.playSE("l16 o3 b-b-4");
          }
          //$LASTPOS=1000342;//user.Ball:342
          new Tonyu.classes.user.Batu({x: _this.x,y: _this.y,text: "x"});
          //$LASTPOS=1000378;//user.Ball:378
          Tonyu.globals.$combo.count=0;
          
        }
        //$LASTPOS=1000412;//user.Ball:412
        Tonyu.globals.$prev=_this.p;
        //$LASTPOS=1000429;//user.Ball:429
        _this.dieEffect();
        
      }
      //$LASTPOS=1000452;//user.Ball:452
      _this.update();
      
    }
    //$LASTPOS=1000464;//user.Ball:464
    Tonyu.globals.$gov=true;
    //$LASTPOS=1000475;//user.Ball:475
    _this.dieEffect();
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000003;//user.Ball:3
        case 1:
          if (!(_this.y<Tonyu.globals.$screenHeight&&! Tonyu.globals.$gov)) { __pc=6; break; }
          //$LASTPOS=1000041;//user.Ball:41
          _this.y+=Tonyu.globals.$spd;
          //$LASTPOS=1000076;//user.Ball:76
          _this.fiber$check(_thread);
          __pc=2;return;
        case 2:
          _this.ok=_thread.retVal;
          
          //$LASTPOS=1000092;//user.Ball:92
          if (!(_this.crash())) { __pc=4; break; }
          //$LASTPOS=1000117;//user.Ball:117
          if (_this.ok) {
            //$LASTPOS=1000139;//user.Ball:139
            if (Tonyu.globals.$sound) {
              //$LASTPOS=1000151;//user.Ball:151
              _this.playSE("l64o4v10gfev5dc>g v3fedc");
            }
            //$LASTPOS=1000199;//user.Ball:199
            Tonyu.globals.$combo.inc();
            //$LASTPOS=1000225;//user.Ball:225
            Tonyu.globals.$score.inc();
            //$LASTPOS=1000251;//user.Ball:251
            Tonyu.globals.$level.get();
            
          } else {
            //$LASTPOS=1000294;//user.Ball:294
            if (Tonyu.globals.$sound) {
              //$LASTPOS=1000306;//user.Ball:306
              _this.playSE("l16 o3 b-b-4");
            }
            //$LASTPOS=1000342;//user.Ball:342
            new Tonyu.classes.user.Batu({x: _this.x,y: _this.y,text: "x"});
            //$LASTPOS=1000378;//user.Ball:378
            Tonyu.globals.$combo.count=0;
            
          }
          //$LASTPOS=1000412;//user.Ball:412
          Tonyu.globals.$prev=_this.p;
          //$LASTPOS=1000429;//user.Ball:429
          _this.fiber$dieEffect(_thread);
          __pc=3;return;
        case 3:
          
        case 4:
          
          //$LASTPOS=1000452;//user.Ball:452
          _this.fiber$update(_thread);
          __pc=5;return;
        case 5:
          
          __pc=1;break;
        case 6:
          
          //$LASTPOS=1000464;//user.Ball:464
          Tonyu.globals.$gov=true;
          //$LASTPOS=1000475;//user.Ball:475
          _this.fiber$dieEffect(_thread);
          __pc=7;return;
        case 7:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  dist2 :function _trc_func_1000489_3(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return x*x+y*y;
  },
  fiber$dist2 :function _trc_func_1000489_4(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=x*x+y*y;return;
    
    
    _thread.retVal=_this;return;
  },
  dieEffect :function _trc_func_1000526_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000545;//user.Ball:545
    while (true) {
      //$LASTPOS=1000568;//user.Ball:568
      _this.scaleX+=0.1;
      //$LASTPOS=1000589;//user.Ball:589
      _this.alpha-=20;
      //$LASTPOS=1000608;//user.Ball:608
      _this.rotate+=20;
      //$LASTPOS=1000628;//user.Ball:628
      if (_this.alpha<=0) {
        break;
        
      }
      //$LASTPOS=1000657;//user.Ball:657
      _this.update();
      
    }
    //$LASTPOS=1000677;//user.Ball:677
    _this.die();
  },
  fiber$dieEffect :function _trc_func_1000526_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000526_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000545;//user.Ball:545
        case 1:
          //$LASTPOS=1000568;//user.Ball:568
          _this.scaleX+=0.1;
          //$LASTPOS=1000589;//user.Ball:589
          _this.alpha-=20;
          //$LASTPOS=1000608;//user.Ball:608
          _this.rotate+=20;
          //$LASTPOS=1000628;//user.Ball:628
          if (!(_this.alpha<=0)) { __pc=2; break; }
          __pc=4; break;
          
        case 2:
          
          //$LASTPOS=1000657;//user.Ball:657
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=1;break;
        case 4:
          
          //$LASTPOS=1000677;//user.Ball:677
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getCol :function _trc_func_1000687_8(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pp;
    var c;
    var r;
    
    //$LASTPOS=1000704;//user.Ball:704
    pp = p-Tonyu.globals.$pat_balls;
    //$LASTPOS=1000729;//user.Ball:729
    c = pp%5;
    //$LASTPOS=1000745;//user.Ball:745
    r = (pp-c)/5;
    return {c: c,r: r};
  },
  fiber$getCol :function _trc_func_1000687_9(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pp;
    var c;
    var r;
    
    //$LASTPOS=1000704;//user.Ball:704
    pp = p-Tonyu.globals.$pat_balls;
    //$LASTPOS=1000729;//user.Ball:729
    c = pp%5;
    //$LASTPOS=1000745;//user.Ball:745
    r = (pp-c)/5;
    _thread.retVal={c: c,r: r};return;
    
    
    _thread.retVal=_this;return;
  },
  check :function _trc_func_1000785_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p1;
    var p2;
    
    //$LASTPOS=1000799;//user.Ball:799
    if (! Tonyu.globals.$prev) {
      return true;
    }
    //$LASTPOS=1000828;//user.Ball:828
    p1 = _this.getCol(Tonyu.globals.$prev);
    //$LASTPOS=1000854;//user.Ball:854
    p2 = _this.getCol(_this.p);
    return p1.c==p2.c||p1.c==p2.r||p1.r==p2.c||p1.r==p2.r;
  },
  fiber$check :function _trc_func_1000785_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var p1;
    var p2;
    
    //$LASTPOS=1000799;//user.Ball:799
    if (! Tonyu.globals.$prev) {
      _thread.retVal=true;return;
      
    }
    //$LASTPOS=1000828;//user.Ball:828
    p1 = _this.getCol(Tonyu.globals.$prev);
    //$LASTPOS=1000854;//user.Ball:854
    p2 = _this.getCol(_this.p);
    _thread.retVal=p1.c==p2.c||p1.c==p2.r||p1.r==p2.c||p1.r==p2.r;return;
    
    
    _thread.retVal=_this;return;
  },
  crash :function _trc_func_1000940_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    var r;
    
    //$LASTPOS=1000955;//user.Ball:955
    if (Tonyu.globals.$useTouch&&! Tonyu.globals.$touches[0].touched) {
      return false;
    }
    //$LASTPOS=1001012;//user.Ball:1012
    s = _this.ok?800:400;
    //$LASTPOS=1001034;//user.Ball:1034
    if (_this.dist2(Tonyu.globals.$mouseX-_this.x,Tonyu.globals.$mouseY-_this.y)<s) {
      return true;
    }
    //$LASTPOS=1001086;//user.Ball:1086
    if (Tonyu.globals.$trace.length<2) {
      return false;
    }
    //$LASTPOS=1001125;//user.Ball:1125
    r = _this.distPointLine(Tonyu.globals.$trace[0].x,Tonyu.globals.$trace[0].y,Tonyu.globals.$trace[1].x,Tonyu.globals.$trace[1].y,_this.x,_this.y);
    return r.k>=0&&r.k<=1&&r.d<s;
  },
  fiber$crash :function _trc_func_1000940_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    var r;
    
    //$LASTPOS=1000955;//user.Ball:955
    if (Tonyu.globals.$useTouch&&! Tonyu.globals.$touches[0].touched) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=1001012;//user.Ball:1012
    s = _this.ok?800:400;
    //$LASTPOS=1001034;//user.Ball:1034
    if (_this.dist2(Tonyu.globals.$mouseX-_this.x,Tonyu.globals.$mouseY-_this.y)<s) {
      _thread.retVal=true;return;
      
    }
    //$LASTPOS=1001086;//user.Ball:1086
    if (Tonyu.globals.$trace.length<2) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=1001125;//user.Ball:1125
    r = _this.distPointLine(Tonyu.globals.$trace[0].x,Tonyu.globals.$trace[0].y,Tonyu.globals.$trace[1].x,Tonyu.globals.$trace[1].y,_this.x,_this.y);
    _thread.retVal=r.k>=0&&r.k<=1&&r.d<s;return;
    
    
    _thread.retVal=_this;return;
  },
  distPointLine :function _trc_func_1001245_14(ax,ay,bx,by,cx,cy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var hx;
    var hy;
    var d;
    
    //$LASTPOS=1001355;//user.Ball:1355
    cx-=ax;
    //$LASTPOS=1001367;//user.Ball:1367
    cy-=ay;
    //$LASTPOS=1001379;//user.Ball:1379
    bx-=ax;
    //$LASTPOS=1001391;//user.Ball:1391
    by-=ay;
    //$LASTPOS=1001531;//user.Ball:1531
    k = (cx*bx+cy*by)/(bx*bx+by*by);
    //$LASTPOS=1001586;//user.Ball:1586
    hx = k*bx;
    //$LASTPOS=1001607;//user.Ball:1607
    hy = k*by;
    //$LASTPOS=1001628;//user.Ball:1628
    d = (cx-hx)*(cx-hx)+(cy-hy)*(cy-hy);
    return {k: k,d: d};
  },
  fiber$distPointLine :function _trc_func_1001245_15(_thread,ax,ay,bx,by,cx,cy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var k;
    var hx;
    var hy;
    var d;
    
    //$LASTPOS=1001355;//user.Ball:1355
    cx-=ax;
    //$LASTPOS=1001367;//user.Ball:1367
    cy-=ay;
    //$LASTPOS=1001379;//user.Ball:1379
    bx-=ax;
    //$LASTPOS=1001391;//user.Ball:1391
    by-=ay;
    //$LASTPOS=1001531;//user.Ball:1531
    k = (cx*bx+cy*by)/(bx*bx+by*by);
    //$LASTPOS=1001586;//user.Ball:1586
    hx = k*bx;
    //$LASTPOS=1001607;//user.Ball:1607
    hy = k*by;
    //$LASTPOS=1001628;//user.Ball:1628
    d = (cx-hx)*(cx-hx)+(cy-hy)*(cy-hy);
    _thread.retVal={k: k,d: d};return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Ball,{"fullName":"user.Ball","namespace":"user","shortName":"Ball","decls":{"methods":{"main":{"nowait":false},"dist2":{"nowait":false},"dieEffect":{"nowait":false},"getCol":{"nowait":false},"check":{"nowait":false},"crash":{"nowait":false},"distPointLine":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Batu=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;//user.Batu:0
    _this.text="X";
    //$LASTPOS=2000010;//user.Batu:10
    _this.fillStyle="red";
    //$LASTPOS=2000027;//user.Batu:27
    _this.size=10;
    //$LASTPOS=2000036;//user.Batu:36
    _this.tx=_this.all(Tonyu.classes.user.Batu).length*30+30;
    //$LASTPOS=2000063;//user.Batu:63
    _this.ty=Tonyu.globals.$screenHeight-50;
    //$LASTPOS=2000084;//user.Batu:84
    while (_this.size<50) {
      //$LASTPOS=2000106;//user.Batu:106
      _this.size+=5;
      //$LASTPOS=2000119;//user.Batu:119
      _this.update();
      
    }
    //$LASTPOS=2000131;//user.Batu:131
    //$LASTPOS=2000136;//user.Batu:136
    _this.i=0;
    while(_this.i<32) {
      {
        //$LASTPOS=2000159;//user.Batu:159
        _this.y+=(_this.ty-_this.y)/5;
        //$LASTPOS=2000176;//user.Batu:176
        _this.x+=(_this.tx-_this.x)/5;
        //$LASTPOS=2000193;//user.Batu:193
        _this.update();
      }
      _this.i++;
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;//user.Batu:0
    _this.text="X";
    //$LASTPOS=2000010;//user.Batu:10
    _this.fillStyle="red";
    //$LASTPOS=2000027;//user.Batu:27
    _this.size=10;
    //$LASTPOS=2000036;//user.Batu:36
    _this.tx=_this.all(Tonyu.classes.user.Batu).length*30+30;
    //$LASTPOS=2000063;//user.Batu:63
    _this.ty=Tonyu.globals.$screenHeight-50;
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000084;//user.Batu:84
        case 1:
          if (!(_this.size<50)) { __pc=3; break; }
          //$LASTPOS=2000106;//user.Batu:106
          _this.size+=5;
          //$LASTPOS=2000119;//user.Batu:119
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=2000131;//user.Batu:131
          //$LASTPOS=2000136;//user.Batu:136
          _this.i=0;;
        case 4:
          if (!(_this.i<32)) { __pc=6; break; }
          //$LASTPOS=2000159;//user.Batu:159
          _this.y+=(_this.ty-_this.y)/5;
          //$LASTPOS=2000176;//user.Batu:176
          _this.x+=(_this.tx-_this.x)/5;
          //$LASTPOS=2000193;//user.Batu:193
          _this.fiber$update(_thread);
          __pc=5;return;
        case 5:
          
          _this.i++;
          __pc=4;break;
        case 6:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Batu,{"fullName":"user.Batu","namespace":"user","shortName":"Batu","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Button=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000001;//user.Button:1
    _this.padding=10;
    //$LASTPOS=3000013;//user.Button:13
    _this.bwidth=Tonyu.globals.$screenWidth*0.8;
    //$LASTPOS=3000038;//user.Button:38
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=3000056;//user.Button:56
    _this.clicked=0;
    //$LASTPOS=3000067;//user.Button:67
    while (true) {
      //$LASTPOS=3000086;//user.Button:86
      if (_this.clicked>0) {
        //$LASTPOS=3000111;//user.Button:111
        _this.clicked++;
        //$LASTPOS=3000130;//user.Button:130
        if (_this.clicked>25) {
          //$LASTPOS=3000146;//user.Button:146
          _this.clicked=0;
        }
        
      }
      //$LASTPOS=3000167;//user.Button:167
      _this.r=_this.getCrashRect();
      //$LASTPOS=3000189;//user.Button:189
      _this.mouseClicked=_this.getkey(1)==1;
      //$LASTPOS=3000220;//user.Button:220
      _this.touched=! _this.ptouch&&Tonyu.globals.$touches[0].touched;
      //$LASTPOS=3000265;//user.Button:265
      _this.ptouch=Tonyu.globals.$touches[0].touched;
      //$LASTPOS=3000297;//user.Button:297
      if ((_this.mouseClicked||_this.touched)&&Tonyu.globals.$mouseX>_this.r.x-_this.r.width/2&&Tonyu.globals.$mouseX<_this.r.x+_this.r.width/2&&Tonyu.globals.$mouseY>_this.r.y-_this.r.height/2&&Tonyu.globals.$mouseY<_this.r.y+_this.r.height/2) {
        //$LASTPOS=3000449;//user.Button:449
        _this.clickedBy=_this.mouseClicked?"mouse":"touch";
        //$LASTPOS=3000498;//user.Button:498
        _this.clicked=1;
        
      }
      //$LASTPOS=3000523;//user.Button:523
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000001;//user.Button:1
    _this.padding=10;
    //$LASTPOS=3000013;//user.Button:13
    _this.bwidth=Tonyu.globals.$screenWidth*0.8;
    //$LASTPOS=3000038;//user.Button:38
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=3000056;//user.Button:56
    _this.clicked=0;
    
    _thread.enter(function _trc_func_3000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=3000067;//user.Button:67
        case 1:
          //$LASTPOS=3000086;//user.Button:86
          if (_this.clicked>0) {
            //$LASTPOS=3000111;//user.Button:111
            _this.clicked++;
            //$LASTPOS=3000130;//user.Button:130
            if (_this.clicked>25) {
              //$LASTPOS=3000146;//user.Button:146
              _this.clicked=0;
            }
            
          }
          //$LASTPOS=3000167;//user.Button:167
          _this.r=_this.getCrashRect();
          //$LASTPOS=3000189;//user.Button:189
          _this.mouseClicked=_this.getkey(1)==1;
          //$LASTPOS=3000220;//user.Button:220
          _this.touched=! _this.ptouch&&Tonyu.globals.$touches[0].touched;
          //$LASTPOS=3000265;//user.Button:265
          _this.ptouch=Tonyu.globals.$touches[0].touched;
          //$LASTPOS=3000297;//user.Button:297
          if ((_this.mouseClicked||_this.touched)&&Tonyu.globals.$mouseX>_this.r.x-_this.r.width/2&&Tonyu.globals.$mouseX<_this.r.x+_this.r.width/2&&Tonyu.globals.$mouseY>_this.r.y-_this.r.height/2&&Tonyu.globals.$mouseY<_this.r.y+_this.r.height/2) {
            //$LASTPOS=3000449;//user.Button:449
            _this.clickedBy=_this.mouseClicked?"mouse":"touch";
            //$LASTPOS=3000498;//user.Button:498
            _this.clicked=1;
            
          }
          //$LASTPOS=3000523;//user.Button:523
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_3000535_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000550;//user.Button:550
    c.fillStyle="rgb("+(_this.clicked?255-_this.clicked*10:0)+",200,0)";
    //$LASTPOS=3000614;//user.Button:614
    c.fillRect(_this.x-_this.bwidth/2,_this.y-_this.padding,_this.bwidth,_this.height+_this.padding*2);
    //$LASTPOS=3000681;//user.Button:681
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  getCrashRect :function _trc_func_3000698_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return {x: _this.x,y: _this.y-_this.padding+_this.height/2,width: _this.bwidth+_this.padding*2,height: _this.height+_this.padding*2};
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Button,{"fullName":"user.Button","namespace":"user","shortName":"Button","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true},"getCrashRect":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Combo=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000002;//user.Combo:2
    _this.y=50;
    //$LASTPOS=4000008;//user.Combo:8
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=4000027;//user.Combo:27
    _this.count=0;
    //$LASTPOS=4000036;//user.Combo:36
    _this.cdec=0;
    //$LASTPOS=4000044;//user.Combo:44
    while (true) {
      //$LASTPOS=4000063;//user.Combo:63
      if (_this.count==0||(_this.cdec<10&&_this.cdec%2==1)) {
        //$LASTPOS=4000103;//user.Combo:103
        _this.text=" ";
      } else {
        //$LASTPOS=4000122;//user.Combo:122
        _this.text=_this.count+" Combo";
      }
      //$LASTPOS=4000147;//user.Combo:147
      if (_this.cdec>0) {
        //$LASTPOS=4000169;//user.Combo:169
        _this.cdec--;
        //$LASTPOS=4000185;//user.Combo:185
        if (_this.cdec==0) {
          //$LASTPOS=4000198;//user.Combo:198
          _this.count=0;
        }
        
      }
      //$LASTPOS=4000217;//user.Combo:217
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=4000002;//user.Combo:2
    _this.y=50;
    //$LASTPOS=4000008;//user.Combo:8
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=4000027;//user.Combo:27
    _this.count=0;
    //$LASTPOS=4000036;//user.Combo:36
    _this.cdec=0;
    
    _thread.enter(function _trc_func_4000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=4000044;//user.Combo:44
        case 1:
          //$LASTPOS=4000063;//user.Combo:63
          if (_this.count==0||(_this.cdec<10&&_this.cdec%2==1)) {
            //$LASTPOS=4000103;//user.Combo:103
            _this.text=" ";
          } else {
            //$LASTPOS=4000122;//user.Combo:122
            _this.text=_this.count+" Combo";
          }
          //$LASTPOS=4000147;//user.Combo:147
          if (_this.cdec>0) {
            //$LASTPOS=4000169;//user.Combo:169
            _this.cdec--;
            //$LASTPOS=4000185;//user.Combo:185
            if (_this.cdec==0) {
              //$LASTPOS=4000198;//user.Combo:198
              _this.count=0;
            }
            
          }
          //$LASTPOS=4000217;//user.Combo:217
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  inc :function _trc_func_4000230_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000243;//user.Combo:243
    _this.count++;
    //$LASTPOS=4000256;//user.Combo:256
    _this.cdec=50;
  },
  fiber$inc :function _trc_func_4000230_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=4000243;//user.Combo:243
    _this.count++;
    //$LASTPOS=4000256;//user.Combo:256
    _this.cdec=50;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Combo,{"fullName":"user.Combo","namespace":"user","shortName":"Combo","decls":{"methods":{"main":{"nowait":false},"inc":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Level=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000000;//user.Level:0
    _this.y=40;
    //$LASTPOS=5000006;//user.Level:6
    _this.x=Tonyu.globals.$screenWidth/4*3;
    //$LASTPOS=5000026;//user.Level:26
    _this.exp=0;
    //$LASTPOS=5000033;//user.Level:33
    _this.val=0;
    //$LASTPOS=5000040;//user.Level:40
    _this.size=20;
    //$LASTPOS=5000050;//user.Level:50
    while (true) {
      //$LASTPOS=5000069;//user.Level:69
      _this.text="Level "+_this.val;
      //$LASTPOS=5000092;//user.Level:92
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5000000;//user.Level:0
    _this.y=40;
    //$LASTPOS=5000006;//user.Level:6
    _this.x=Tonyu.globals.$screenWidth/4*3;
    //$LASTPOS=5000026;//user.Level:26
    _this.exp=0;
    //$LASTPOS=5000033;//user.Level:33
    _this.val=0;
    //$LASTPOS=5000040;//user.Level:40
    _this.size=20;
    
    _thread.enter(function _trc_func_5000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=5000050;//user.Level:50
        case 1:
          //$LASTPOS=5000069;//user.Level:69
          _this.text="Level "+_this.val;
          //$LASTPOS=5000092;//user.Level:92
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  genP :function _trc_func_5000104_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var c1;
    var c2;
    
    //$LASTPOS=5000117;//user.Level:117
    c1;c2;
    //$LASTPOS=5000132;//user.Level:132
    while (true) {
      //$LASTPOS=5000155;//user.Level:155
      if (_this.val<40) {
        //$LASTPOS=5000181;//user.Level:181
        c1=_this.rnd(4);
        //$LASTPOS=5000192;//user.Level:192
        c2=_this.rnd(4);
        
      } else {
        //$LASTPOS=5000232;//user.Level:232
        c1=_this.rnd(5);
        //$LASTPOS=5000243;//user.Level:243
        c2=_this.rnd(5);
        
      }
      //$LASTPOS=5000272;//user.Level:272
      if (_this.val>80||_this.val%40>=20||c1!=c2) {
        break;
        
      }
      
    }
    return Tonyu.globals.$pat_balls+c1*5+c2;
  },
  fiber$genP :function _trc_func_5000104_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var c1;
    var c2;
    
    //$LASTPOS=5000117;//user.Level:117
    c1;c2;
    //$LASTPOS=5000132;//user.Level:132
    while (true) {
      //$LASTPOS=5000155;//user.Level:155
      if (_this.val<40) {
        //$LASTPOS=5000181;//user.Level:181
        c1=_this.rnd(4);
        //$LASTPOS=5000192;//user.Level:192
        c2=_this.rnd(4);
        
      } else {
        //$LASTPOS=5000232;//user.Level:232
        c1=_this.rnd(5);
        //$LASTPOS=5000243;//user.Level:243
        c2=_this.rnd(5);
        
      }
      //$LASTPOS=5000272;//user.Level:272
      if (_this.val>80||_this.val%40>=20||c1!=c2) {
        break;
        
      }
      
    }
    _thread.retVal=Tonyu.globals.$pat_balls+c1*5+c2;return;
    
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_5000356_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000369;//user.Level:369
    _this.exp++;
    //$LASTPOS=5000380;//user.Level:380
    if (_this.exp>=10) {
      //$LASTPOS=5000403;//user.Level:403
      _this.exp=0;
      //$LASTPOS=5000418;//user.Level:418
      _this.val++;
      
    }
  },
  fiber$get :function _trc_func_5000356_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5000369;//user.Level:369
    _this.exp++;
    //$LASTPOS=5000380;//user.Level:380
    if (_this.exp>=10) {
      //$LASTPOS=5000403;//user.Level:403
      _this.exp=0;
      //$LASTPOS=5000418;//user.Level:418
      _this.val++;
      
    }
    
    _thread.retVal=_this;return;
  },
  speed :function _trc_func_5000433_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return ((_this.val%10)+_this.val*0.1)*0.1+0.1;
  },
  fiber$speed :function _trc_func_5000433_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=((_this.val%10)+_this.val*0.1)*0.1+0.1;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Level,{"fullName":"user.Level","namespace":"user","shortName":"Level","decls":{"methods":{"main":{"nowait":false},"genP":{"nowait":false},"get":{"nowait":false},"speed":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000001;//user.Main:1
    Tonyu.globals.$sound=false;
    //$LASTPOS=6000015;//user.Main:15
    while (true) {
      //$LASTPOS=6000034;//user.Main:34
      _this.size=30;
      //$LASTPOS=6000047;//user.Main:47
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=6000070;//user.Main:70
      _this.y=Tonyu.globals.$screenHeight/4;
      //$LASTPOS=6000093;//user.Main:93
      _this.text="いろ色文字もじ Tiny";
      //$LASTPOS=6000118;//user.Main:118
      _this.sb=new Tonyu.classes.user.Button({y: 200,text: "",size: 30});
      //$LASTPOS=6000161;//user.Main:161
      _this.st=new Tonyu.classes.user.Button({y: 300,text: "Start",size: 30});
      //$LASTPOS=6000209;//user.Main:209
      _this.update();
      //$LASTPOS=6000252;//user.Main:252
      while (_this.st.clicked==0) {
        //$LASTPOS=6000284;//user.Main:284
        if (_this.sb.clicked==1) {
          //$LASTPOS=6000317;//user.Main:317
          Tonyu.globals.$sound=! Tonyu.globals.$sound;
          //$LASTPOS=6000345;//user.Main:345
          if (Tonyu.globals.$sound) {
            //$LASTPOS=6000357;//user.Main:357
            _this.playSE("l8o5cg");
          }
          
        }
        //$LASTPOS=6000393;//user.Main:393
        _this.sb.text="Sound "+(Tonyu.globals.$sound?"on":"off");
        //$LASTPOS=6000439;//user.Main:439
        _this.update();
        
      }
      //$LASTPOS=6000459;//user.Main:459
      Tonyu.globals.$useTouch=_this.st.clickedBy=="touch";
      //$LASTPOS=6000496;//user.Main:496
      //$LASTPOS=6000501;//user.Main:501
      _this.i=0;
      while(_this.i<30) {
        {
          //$LASTPOS=6000527;//user.Main:527
          _this.text=(_this.i%2==0?"":"Game Start");
          //$LASTPOS=6000567;//user.Main:567
          _this.update();
        }
        _this.i++;
      }
      //$LASTPOS=6000587;//user.Main:587
      _this.text="";
      //$LASTPOS=6000600;//user.Main:600
      _this.all().die();
      //$LASTPOS=6000618;//user.Main:618
      Tonyu.globals.$level=new Tonyu.classes.user.Level;
      //$LASTPOS=6000640;//user.Main:640
      Tonyu.globals.$spd=1;
      //$LASTPOS=6000652;//user.Main:652
      Tonyu.globals.$gov=false;
      //$LASTPOS=6000668;//user.Main:668
      Tonyu.globals.$prev=null;
      //$LASTPOS=6000684;//user.Main:684
      Tonyu.globals.$trace=[];
      //$LASTPOS=6000699;//user.Main:699
      _this.tick=32;
      //$LASTPOS=6000712;//user.Main:712
      Tonyu.globals.$score=new Tonyu.classes.user.Score;
      //$LASTPOS=6000734;//user.Main:734
      new Tonyu.classes.user.MayGet({x: 200,y: 260,t: - 1});
      //$LASTPOS=6000770;//user.Main:770
      new Tonyu.classes.user.MayGet({x: 100,y: 300,t: 0});
      //$LASTPOS=6000805;//user.Main:805
      new Tonyu.classes.user.MayGet({x: 100,y: 360,t: 1});
      //$LASTPOS=6000840;//user.Main:840
      new Tonyu.classes.user.MayGet({x: 320,y: 300,t: 2});
      //$LASTPOS=6000875;//user.Main:875
      new Tonyu.classes.user.MayGet({x: 320,y: 360,t: 3});
      //$LASTPOS=6000910;//user.Main:910
      Tonyu.globals.$combo=new Tonyu.classes.user.Combo;
      //$LASTPOS=6000949;//user.Main:949
      Tonyu.globals.$spd=0.1;
      //$LASTPOS=6000963;//user.Main:963
      _this.update();
      //$LASTPOS=6000977;//user.Main:977
      while (! Tonyu.globals.$gov) {
        //$LASTPOS=6001000;//user.Main:1000
        _this.bs=_this.all(Tonyu.classes.user.Ball);
        //$LASTPOS=6001022;//user.Main:1022
        if (_this.bs.length==0||_this.tick>32) {
          //$LASTPOS=6001065;//user.Main:1065
          new Tonyu.classes.user.Ball({p: Tonyu.globals.$level.genP(),x: _this.rnd(Tonyu.globals.$screenWidth-64)+32,y: 0});
          //$LASTPOS=6001134;//user.Main:1134
          _this.tick-=32;
          
        }
        //$LASTPOS=6001162;//user.Main:1162
        if (_this.bs.max("y")<Tonyu.globals.$screenHeight-200) {
          //$LASTPOS=6001211;//user.Main:1211
          Tonyu.globals.$spd=10;
          
        } else {
          //$LASTPOS=6001249;//user.Main:1249
          Tonyu.globals.$spd=Tonyu.globals.$level.speed();
          
        }
        //$LASTPOS=6001288;//user.Main:1288
        _this.tick+=Tonyu.globals.$spd;
        //$LASTPOS=6001308;//user.Main:1308
        if (_this.all(Tonyu.classes.user.Batu).length>=3) {
          //$LASTPOS=6001333;//user.Main:1333
          Tonyu.globals.$gov=true;
        }
        //$LASTPOS=6001352;//user.Main:1352
        Tonyu.globals.$trace.push({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY});
        //$LASTPOS=6001394;//user.Main:1394
        if (Tonyu.globals.$trace.length>=3) {
          //$LASTPOS=6001416;//user.Main:1416
          Tonyu.globals.$trace.shift();
        }
        //$LASTPOS=6001440;//user.Main:1440
        if (Tonyu.globals.$useTouch&&! Tonyu.globals.$touches[0].touched) {
          //$LASTPOS=6001479;//user.Main:1479
          Tonyu.globals.$trace=[];
        }
        //$LASTPOS=6001498;//user.Main:1498
        _this.update();
        
      }
      //$LASTPOS=6001518;//user.Main:1518
      if (Tonyu.globals.$sound) {
        //$LASTPOS=6001530;//user.Main:1530
        _this.play("o4l16v15av10>av5>a");
      }
      //$LASTPOS=6001562;//user.Main:1562
      _this.text="Game Over";
      //$LASTPOS=6001585;//user.Main:1585
      //$LASTPOS=6001590;//user.Main:1590
      _this.i=0;
      while(_this.i<60) {
        {
          //$LASTPOS=6001616;//user.Main:1616
          _this.update();
        }
        _this.i++;
      }
      
    }
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=6000001;//user.Main:1
    Tonyu.globals.$sound=false;
    
    _thread.enter(function _trc_func_6000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=6000015;//user.Main:15
        case 1:
          //$LASTPOS=6000034;//user.Main:34
          _this.size=30;
          //$LASTPOS=6000047;//user.Main:47
          _this.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=6000070;//user.Main:70
          _this.y=Tonyu.globals.$screenHeight/4;
          //$LASTPOS=6000093;//user.Main:93
          _this.text="いろ色文字もじ Tiny";
          //$LASTPOS=6000118;//user.Main:118
          _this.sb=new Tonyu.classes.user.Button({y: 200,text: "",size: 30});
          //$LASTPOS=6000161;//user.Main:161
          _this.st=new Tonyu.classes.user.Button({y: 300,text: "Start",size: 30});
          //$LASTPOS=6000209;//user.Main:209
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=6000252;//user.Main:252
        case 3:
          if (!(_this.st.clicked==0)) { __pc=5; break; }
          //$LASTPOS=6000284;//user.Main:284
          if (_this.sb.clicked==1) {
            //$LASTPOS=6000317;//user.Main:317
            Tonyu.globals.$sound=! Tonyu.globals.$sound;
            //$LASTPOS=6000345;//user.Main:345
            if (Tonyu.globals.$sound) {
              //$LASTPOS=6000357;//user.Main:357
              _this.playSE("l8o5cg");
            }
            
          }
          //$LASTPOS=6000393;//user.Main:393
          _this.sb.text="Sound "+(Tonyu.globals.$sound?"on":"off");
          //$LASTPOS=6000439;//user.Main:439
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=3;break;
        case 5:
          
          //$LASTPOS=6000459;//user.Main:459
          Tonyu.globals.$useTouch=_this.st.clickedBy=="touch";
          //$LASTPOS=6000496;//user.Main:496
          //$LASTPOS=6000501;//user.Main:501
          _this.i=0;;
        case 6:
          if (!(_this.i<30)) { __pc=8; break; }
          //$LASTPOS=6000527;//user.Main:527
          _this.text=(_this.i%2==0?"":"Game Start");
          //$LASTPOS=6000567;//user.Main:567
          _this.fiber$update(_thread);
          __pc=7;return;
        case 7:
          
          _this.i++;
          __pc=6;break;
        case 8:
          
          //$LASTPOS=6000587;//user.Main:587
          _this.text="";
          //$LASTPOS=6000600;//user.Main:600
          _this.all().die();
          //$LASTPOS=6000618;//user.Main:618
          Tonyu.globals.$level=new Tonyu.classes.user.Level;
          //$LASTPOS=6000640;//user.Main:640
          Tonyu.globals.$spd=1;
          //$LASTPOS=6000652;//user.Main:652
          Tonyu.globals.$gov=false;
          //$LASTPOS=6000668;//user.Main:668
          Tonyu.globals.$prev=null;
          //$LASTPOS=6000684;//user.Main:684
          Tonyu.globals.$trace=[];
          //$LASTPOS=6000699;//user.Main:699
          _this.tick=32;
          //$LASTPOS=6000712;//user.Main:712
          Tonyu.globals.$score=new Tonyu.classes.user.Score;
          //$LASTPOS=6000734;//user.Main:734
          new Tonyu.classes.user.MayGet({x: 200,y: 260,t: - 1});
          //$LASTPOS=6000770;//user.Main:770
          new Tonyu.classes.user.MayGet({x: 100,y: 300,t: 0});
          //$LASTPOS=6000805;//user.Main:805
          new Tonyu.classes.user.MayGet({x: 100,y: 360,t: 1});
          //$LASTPOS=6000840;//user.Main:840
          new Tonyu.classes.user.MayGet({x: 320,y: 300,t: 2});
          //$LASTPOS=6000875;//user.Main:875
          new Tonyu.classes.user.MayGet({x: 320,y: 360,t: 3});
          //$LASTPOS=6000910;//user.Main:910
          Tonyu.globals.$combo=new Tonyu.classes.user.Combo;
          //$LASTPOS=6000949;//user.Main:949
          Tonyu.globals.$spd=0.1;
          //$LASTPOS=6000963;//user.Main:963
          _this.fiber$update(_thread);
          __pc=9;return;
        case 9:
          
          //$LASTPOS=6000977;//user.Main:977
        case 10:
          if (!(! Tonyu.globals.$gov)) { __pc=12; break; }
          //$LASTPOS=6001000;//user.Main:1000
          _this.bs=_this.all(Tonyu.classes.user.Ball);
          //$LASTPOS=6001022;//user.Main:1022
          if (_this.bs.length==0||_this.tick>32) {
            //$LASTPOS=6001065;//user.Main:1065
            new Tonyu.classes.user.Ball({p: Tonyu.globals.$level.genP(),x: _this.rnd(Tonyu.globals.$screenWidth-64)+32,y: 0});
            //$LASTPOS=6001134;//user.Main:1134
            _this.tick-=32;
            
          }
          //$LASTPOS=6001162;//user.Main:1162
          if (_this.bs.max("y")<Tonyu.globals.$screenHeight-200) {
            //$LASTPOS=6001211;//user.Main:1211
            Tonyu.globals.$spd=10;
            
          } else {
            //$LASTPOS=6001249;//user.Main:1249
            Tonyu.globals.$spd=Tonyu.globals.$level.speed();
            
          }
          //$LASTPOS=6001288;//user.Main:1288
          _this.tick+=Tonyu.globals.$spd;
          //$LASTPOS=6001308;//user.Main:1308
          if (_this.all(Tonyu.classes.user.Batu).length>=3) {
            //$LASTPOS=6001333;//user.Main:1333
            Tonyu.globals.$gov=true;
          }
          //$LASTPOS=6001352;//user.Main:1352
          Tonyu.globals.$trace.push({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY});
          //$LASTPOS=6001394;//user.Main:1394
          if (Tonyu.globals.$trace.length>=3) {
            //$LASTPOS=6001416;//user.Main:1416
            Tonyu.globals.$trace.shift();
          }
          //$LASTPOS=6001440;//user.Main:1440
          if (Tonyu.globals.$useTouch&&! Tonyu.globals.$touches[0].touched) {
            //$LASTPOS=6001479;//user.Main:1479
            Tonyu.globals.$trace=[];
          }
          //$LASTPOS=6001498;//user.Main:1498
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          __pc=10;break;
        case 12:
          
          //$LASTPOS=6001518;//user.Main:1518
          if (!(Tonyu.globals.$sound)) { __pc=14; break; }
          //$LASTPOS=6001530;//user.Main:1530
          _this.fiber$play(_thread, "o4l16v15av10>av5>a");
          __pc=13;return;
        case 13:
          
        case 14:
          
          //$LASTPOS=6001562;//user.Main:1562
          _this.text="Game Over";
          //$LASTPOS=6001585;//user.Main:1585
          //$LASTPOS=6001590;//user.Main:1590
          _this.i=0;;
        case 15:
          if (!(_this.i<60)) { __pc=17; break; }
          //$LASTPOS=6001616;//user.Main:1616
          _this.fiber$update(_thread);
          __pc=16;return;
        case 16:
          
          _this.i++;
          __pc=15;break;
        case 17:
          
          __pc=1;break;
        case 18:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MayGet=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000001;//user.MayGet:1
    _this.text=" ";
    //$LASTPOS=7000011;//user.MayGet:11
    _this.col=["青","赤","黄","緑","紫"];
    //$LASTPOS=7000038;//user.MayGet:38
    while (true) {
      //$LASTPOS=7000057;//user.MayGet:57
      if (_this.t==- 1) {
        //$LASTPOS=7000078;//user.MayGet:78
        if (Tonyu.globals.$prev) {
          //$LASTPOS=7000089;//user.MayGet:89
          _this.text="取っていいボール：";
        } else {
          //$LASTPOS=7000120;//user.MayGet:120
          _this.text="どれか1つボールを取る";
        }
        
      }
      //$LASTPOS=7000150;//user.MayGet:150
      if (Tonyu.globals.$prev) {
        //$LASTPOS=7000171;//user.MayGet:171
        _this.pp=Tonyu.globals.$prev-Tonyu.globals.$pat_balls;
        //$LASTPOS=7000200;//user.MayGet:200
        _this.pc=_this.pp%5;
        //$LASTPOS=7000217;//user.MayGet:217
        _this.pr=(_this.pp-_this.pc)/5;
        //$LASTPOS=7000239;//user.MayGet:239
        if (_this.t==0) {
          //$LASTPOS=7000263;//user.MayGet:263
          _this.text="文字の色が"+_this.col[_this.pc]+"色のボール";
          
        } else {
          //$LASTPOS=7000308;//user.MayGet:308
          if (_this.t==1) {
            //$LASTPOS=7000332;//user.MayGet:332
            _this.text="文字の色が"+_this.col[_this.pr]+"色のボール";
            
          } else {
            //$LASTPOS=7000377;//user.MayGet:377
            if (_this.t==2) {
              //$LASTPOS=7000401;//user.MayGet:401
              _this.text="「"+_this.col[_this.pr]+"」という文字が書かれたボール";
              
            } else {
              //$LASTPOS=7000451;//user.MayGet:451
              if (_this.t==3) {
                //$LASTPOS=7000475;//user.MayGet:475
                _this.text="「"+_this.col[_this.pc]+"」という文字が書かれたボール";
                
              }
            }
          }
        }
        //$LASTPOS=7000528;//user.MayGet:528
        if (Tonyu.globals.$combo.count>3||Tonyu.globals.$gov) {
          //$LASTPOS=7000556;//user.MayGet:556
          _this.text=" ";
        }
        
      }
      //$LASTPOS=7000576;//user.MayGet:576
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7000001;//user.MayGet:1
    _this.text=" ";
    //$LASTPOS=7000011;//user.MayGet:11
    _this.col=["青","赤","黄","緑","紫"];
    
    _thread.enter(function _trc_func_7000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=7000038;//user.MayGet:38
        case 1:
          //$LASTPOS=7000057;//user.MayGet:57
          if (_this.t==- 1) {
            //$LASTPOS=7000078;//user.MayGet:78
            if (Tonyu.globals.$prev) {
              //$LASTPOS=7000089;//user.MayGet:89
              _this.text="取っていいボール：";
            } else {
              //$LASTPOS=7000120;//user.MayGet:120
              _this.text="どれか1つボールを取る";
            }
            
          }
          //$LASTPOS=7000150;//user.MayGet:150
          if (Tonyu.globals.$prev) {
            //$LASTPOS=7000171;//user.MayGet:171
            _this.pp=Tonyu.globals.$prev-Tonyu.globals.$pat_balls;
            //$LASTPOS=7000200;//user.MayGet:200
            _this.pc=_this.pp%5;
            //$LASTPOS=7000217;//user.MayGet:217
            _this.pr=(_this.pp-_this.pc)/5;
            //$LASTPOS=7000239;//user.MayGet:239
            if (_this.t==0) {
              //$LASTPOS=7000263;//user.MayGet:263
              _this.text="文字の色が"+_this.col[_this.pc]+"色のボール";
              
            } else {
              //$LASTPOS=7000308;//user.MayGet:308
              if (_this.t==1) {
                //$LASTPOS=7000332;//user.MayGet:332
                _this.text="文字の色が"+_this.col[_this.pr]+"色のボール";
                
              } else {
                //$LASTPOS=7000377;//user.MayGet:377
                if (_this.t==2) {
                  //$LASTPOS=7000401;//user.MayGet:401
                  _this.text="「"+_this.col[_this.pr]+"」という文字が書かれたボール";
                  
                } else {
                  //$LASTPOS=7000451;//user.MayGet:451
                  if (_this.t==3) {
                    //$LASTPOS=7000475;//user.MayGet:475
                    _this.text="「"+_this.col[_this.pc]+"」という文字が書かれたボール";
                    
                  }
                }
              }
            }
            //$LASTPOS=7000528;//user.MayGet:528
            if (Tonyu.globals.$combo.count>3||Tonyu.globals.$gov) {
              //$LASTPOS=7000556;//user.MayGet:556
              _this.text=" ";
            }
            
          }
          //$LASTPOS=7000576;//user.MayGet:576
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.MayGet,{"fullName":"user.MayGet","namespace":"user","shortName":"MayGet","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Score=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_8000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000000;//user.Score:0
    _this.y=40;
    //$LASTPOS=8000006;//user.Score:6
    _this.x=Tonyu.globals.$screenWidth/4*1;
    //$LASTPOS=8000026;//user.Score:26
    _this.val=0;
    //$LASTPOS=8000033;//user.Score:33
    _this.size=20;
    //$LASTPOS=8000042;//user.Score:42
    while (true) {
      //$LASTPOS=8000061;//user.Score:61
      _this.text="Score: "+_this.val;
      //$LASTPOS=8000085;//user.Score:85
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_8000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8000000;//user.Score:0
    _this.y=40;
    //$LASTPOS=8000006;//user.Score:6
    _this.x=Tonyu.globals.$screenWidth/4*1;
    //$LASTPOS=8000026;//user.Score:26
    _this.val=0;
    //$LASTPOS=8000033;//user.Score:33
    _this.size=20;
    
    _thread.enter(function _trc_func_8000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8000042;//user.Score:42
        case 1:
          //$LASTPOS=8000061;//user.Score:61
          _this.text="Score: "+_this.val;
          //$LASTPOS=8000085;//user.Score:85
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  inc :function _trc_func_8000098_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000111;//user.Score:111
    _this.val+=Tonyu.globals.$combo.count*10;
  },
  fiber$inc :function _trc_func_8000098_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8000111;//user.Score:111
    _this.val+=Tonyu.globals.$combo.count*10;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Score,{"fullName":"user.Score","namespace":"user","shortName":"Score","decls":{"methods":{"main":{"nowait":false},"inc":{"nowait":false}}}});

