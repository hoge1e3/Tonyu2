Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_MediaPlayer_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_MediaPlayer_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  play :function _trc_MediaPlayer_play() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$play :function _trc_MediaPlayer_f_play(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_MediaPlayer_stop() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  playSE :function _trc_MediaPlayer_playSE() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  setDelay :function _trc_MediaPlayer_setDelay() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setVolume :function _trc_MediaPlayer_setVolume() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.MediaPlayer,{"fullName":"user.MediaPlayer","namespace":"user","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Page_index=Tonyu.klass(Tonyu.classes.kernel.T1Page,[],{
  main :function _trc_Page_index_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36000016;//user.Page_index:16
    _this.initGlobals();
    //$LASTPOS=36000031;//user.Page_index:31
    Tonyu.globals.$screenWidth=560;
    //$LASTPOS=36000049;//user.Page_index:49
    Tonyu.globals.$screenHeight=376;
    //$LASTPOS=36000068;//user.Page_index:68
    Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
    //$LASTPOS=36000112;//user.Page_index:112
    Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
    //$LASTPOS=36000164;//user.Page_index:164
    Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
    //$LASTPOS=36000213;//user.Page_index:213
    Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
    //$LASTPOS=36000262;//user.Page_index:262
    Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
    //$LASTPOS=36000312;//user.Page_index:312
    Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
    //$LASTPOS=36000371;//user.Page_index:371
    Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
    //$LASTPOS=36000430;//user.Page_index:430
    Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
    //$LASTPOS=36000489;//user.Page_index:489
    Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
    //$LASTPOS=36000532;//user.Page_index:532
    Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
    //$LASTPOS=36000575;//user.Page_index:575
    Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
    //$LASTPOS=36000617;//user.Page_index:617
    Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
    //$LASTPOS=36000685;//user.Page_index:685
    Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
    //$LASTPOS=36000714;//user.Page_index:714
    Tonyu.globals.$map.load("index.map");
  },
  fiber$main :function _trc_Page_index_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_Page_index_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=36000016;//user.Page_index:16
          _this.fiber$initGlobals(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=36000031;//user.Page_index:31
          Tonyu.globals.$screenWidth=560;
          //$LASTPOS=36000049;//user.Page_index:49
          Tonyu.globals.$screenHeight=376;
          //$LASTPOS=36000068;//user.Page_index:68
          Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
          //$LASTPOS=36000112;//user.Page_index:112
          Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
          //$LASTPOS=36000164;//user.Page_index:164
          Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
          //$LASTPOS=36000213;//user.Page_index:213
          Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
          //$LASTPOS=36000262;//user.Page_index:262
          Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
          //$LASTPOS=36000312;//user.Page_index:312
          Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
          //$LASTPOS=36000371;//user.Page_index:371
          Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
          //$LASTPOS=36000430;//user.Page_index:430
          Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
          //$LASTPOS=36000489;//user.Page_index:489
          Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
          //$LASTPOS=36000532;//user.Page_index:532
          Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
          //$LASTPOS=36000575;//user.Page_index:575
          Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
          //$LASTPOS=36000617;//user.Page_index:617
          Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
          //$LASTPOS=36000685;//user.Page_index:685
          Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
          //$LASTPOS=36000714;//user.Page_index:714
          Tonyu.globals.$map.load("index.map");
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Page_index,{"fullName":"user.Page_index","namespace":"user","shortName":"Page_index","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TBomb=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_TBomb_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000023;//user.TBomb:23
    while (1) {
      //$LASTPOS=37000040;//user.TBomb:40
      _this.t=0;
      //$LASTPOS=37000078;//user.TBomb:78
      while (_this.t==0) {
        //$LASTPOS=37000101;//user.TBomb:101
        if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
          //$LASTPOS=37000125;//user.TBomb:125
          _this.t=1;
        }
        //$LASTPOS=37000139;//user.TBomb:139
        _this.update();
        
      }
      //$LASTPOS=37000161;//user.TBomb:161
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
      //$LASTPOS=37000199;//user.TBomb:199
      _this.tok=100;
      //$LASTPOS=37000236;//user.TBomb:236
      while (_this.y>- 150) {
        //$LASTPOS=37000261;//user.TBomb:261
        _this.y=_this.y-10;
        //$LASTPOS=37000304;//user.TBomb:304
        if (_this.getkey(37)) {
          //$LASTPOS=37000320;//user.TBomb:320
          if (_this.x>10) {
            //$LASTPOS=37000330;//user.TBomb:330
            _this.x=_this.x-2;
          }
        }
        //$LASTPOS=37000346;//user.TBomb:346
        if (_this.getkey(39)) {
          //$LASTPOS=37000362;//user.TBomb:362
          if (_this.x<500) {
            //$LASTPOS=37000373;//user.TBomb:373
            _this.x=_this.x+2;
          }
        }
        //$LASTPOS=37000389;//user.TBomb:389
        _this.update();
        
      }
      //$LASTPOS=37000443;//user.TBomb:443
      _this.x=_this.rnd()*300+100;
      //$LASTPOS=37000465;//user.TBomb:465
      _this.y=360;
      
    }
  },
  fiber$main :function _trc_TBomb_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_TBomb_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000023;//user.TBomb:23
        case 1:
          if (!(1)) { __pc=8; break; }
          //$LASTPOS=37000040;//user.TBomb:40
          _this.t=0;
          //$LASTPOS=37000078;//user.TBomb:78
        case 2:
          if (!(_this.t==0)) { __pc=4; break; }
          //$LASTPOS=37000101;//user.TBomb:101
          if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
            //$LASTPOS=37000125;//user.TBomb:125
            _this.t=1;
          }
          //$LASTPOS=37000139;//user.TBomb:139
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=37000161;//user.TBomb:161
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
          //$LASTPOS=37000199;//user.TBomb:199
          _this.tok=100;
          //$LASTPOS=37000236;//user.TBomb:236
        case 5:
          if (!(_this.y>- 150)) { __pc=7; break; }
          //$LASTPOS=37000261;//user.TBomb:261
          _this.y=_this.y-10;
          //$LASTPOS=37000304;//user.TBomb:304
          if (_this.getkey(37)) {
            //$LASTPOS=37000320;//user.TBomb:320
            if (_this.x>10) {
              //$LASTPOS=37000330;//user.TBomb:330
              _this.x=_this.x-2;
            }
          }
          //$LASTPOS=37000346;//user.TBomb:346
          if (_this.getkey(39)) {
            //$LASTPOS=37000362;//user.TBomb:362
            if (_this.x<500) {
              //$LASTPOS=37000373;//user.TBomb:373
              _this.x=_this.x+2;
            }
          }
          //$LASTPOS=37000389;//user.TBomb:389
          _this.fiber$update(_thread);
          __pc=6;return;
        case 6:
          
          __pc=5;break;
        case 7:
          
          //$LASTPOS=37000443;//user.TBomb:443
          _this.x=_this.rnd()*300+100;
          //$LASTPOS=37000465;//user.TBomb:465
          _this.y=360;
          __pc=1;break;
        case 8:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TBomb,{"fullName":"user.TBomb","namespace":"user","shortName":"TBomb","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Teki=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_Teki_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000504;//user.Teki:504
    _this.vx=_this.vy=0;
    //$LASTPOS=38000514;//user.Teki:514
    _this.tx=_this.x;
    //$LASTPOS=38000519;//user.Teki:519
    _this.ty=_this.y;
    //$LASTPOS=38000526;//user.Teki:526
    while (1) {
      //$LASTPOS=38000542;//user.Teki:542
      _this.c=0;
      //$LASTPOS=38000588;//user.Teki:588
      if (_this.tx>_this.x) {
        //$LASTPOS=38000598;//user.Teki:598
        _this.vx=2;
      }
      //$LASTPOS=38000609;//user.Teki:609
      if (_this.ty>_this.y) {
        //$LASTPOS=38000619;//user.Teki:619
        _this.vy=2;
      }
      //$LASTPOS=38000630;//user.Teki:630
      if (_this.tx<_this.x) {
        //$LASTPOS=38000640;//user.Teki:640
        _this.vx=- 2;
      }
      //$LASTPOS=38000652;//user.Teki:652
      if (_this.ty<_this.y) {
        //$LASTPOS=38000662;//user.Teki:662
        _this.vy=- 2;
      }
      //$LASTPOS=38000688;//user.Teki:688
      _this.w=_this.rnd()*10;
      //$LASTPOS=38000705;//user.Teki:705
      while (_this.c<_this.w) {
        //$LASTPOS=38000726;//user.Teki:726
        _this.x=_this.x+_this.vx;
        //$LASTPOS=38000743;//user.Teki:743
        _this.y=_this.y+_this.vy;
        //$LASTPOS=38000760;//user.Teki:760
        _this.update();
        //$LASTPOS=38000779;//user.Teki:779
        _this.c=_this.c+1;
        
      }
      //$LASTPOS=38000798;//user.Teki:798
      _this.c=0;
      //$LASTPOS=38000808;//user.Teki:808
      _this.p=_this.p+1;
      //$LASTPOS=38000845;//user.Teki:845
      if (_this.rnd()*20<1) {
        //$LASTPOS=38000872;//user.Teki:872
        _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
        //$LASTPOS=38000903;//user.Teki:903
        _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
        
      }
      //$LASTPOS=38000957;//user.Teki:957
      _this.w=_this.rnd()*20+10;
      //$LASTPOS=38000977;//user.Teki:977
      while (_this.c<_this.w) {
        //$LASTPOS=38001000;//user.Teki:1000
        _this.update();
        //$LASTPOS=38001019;//user.Teki:1019
        _this.c=_this.c+1;
        
      }
      //$LASTPOS=38001038;//user.Teki:1038
      _this.p=_this.p-1;
      
    }
  },
  fiber$main :function _trc_Teki_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=38000504;//user.Teki:504
    _this.vx=_this.vy=0;
    //$LASTPOS=38000514;//user.Teki:514
    _this.tx=_this.x;
    //$LASTPOS=38000519;//user.Teki:519
    _this.ty=_this.y;
    
    _thread.enter(function _trc_Teki_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=38000526;//user.Teki:526
        case 1:
          if (!(1)) { __pc=8; break; }
          //$LASTPOS=38000542;//user.Teki:542
          _this.c=0;
          //$LASTPOS=38000588;//user.Teki:588
          if (_this.tx>_this.x) {
            //$LASTPOS=38000598;//user.Teki:598
            _this.vx=2;
          }
          //$LASTPOS=38000609;//user.Teki:609
          if (_this.ty>_this.y) {
            //$LASTPOS=38000619;//user.Teki:619
            _this.vy=2;
          }
          //$LASTPOS=38000630;//user.Teki:630
          if (_this.tx<_this.x) {
            //$LASTPOS=38000640;//user.Teki:640
            _this.vx=- 2;
          }
          //$LASTPOS=38000652;//user.Teki:652
          if (_this.ty<_this.y) {
            //$LASTPOS=38000662;//user.Teki:662
            _this.vy=- 2;
          }
          //$LASTPOS=38000688;//user.Teki:688
          _this.w=_this.rnd()*10;
          //$LASTPOS=38000705;//user.Teki:705
        case 2:
          if (!(_this.c<_this.w)) { __pc=4; break; }
          //$LASTPOS=38000726;//user.Teki:726
          _this.x=_this.x+_this.vx;
          //$LASTPOS=38000743;//user.Teki:743
          _this.y=_this.y+_this.vy;
          //$LASTPOS=38000760;//user.Teki:760
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=38000779;//user.Teki:779
          _this.c=_this.c+1;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=38000798;//user.Teki:798
          _this.c=0;
          //$LASTPOS=38000808;//user.Teki:808
          _this.p=_this.p+1;
          //$LASTPOS=38000845;//user.Teki:845
          if (_this.rnd()*20<1) {
            //$LASTPOS=38000872;//user.Teki:872
            _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
            //$LASTPOS=38000903;//user.Teki:903
            _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
            
          }
          //$LASTPOS=38000957;//user.Teki:957
          _this.w=_this.rnd()*20+10;
          //$LASTPOS=38000977;//user.Teki:977
        case 5:
          if (!(_this.c<_this.w)) { __pc=7; break; }
          //$LASTPOS=38001000;//user.Teki:1000
          _this.fiber$update(_thread);
          __pc=6;return;
        case 6:
          
          //$LASTPOS=38001019;//user.Teki:1019
          _this.c=_this.c+1;
          __pc=5;break;
        case 7:
          
          //$LASTPOS=38001038;//user.Teki:1038
          _this.p=_this.p-1;
          __pc=1;break;
        case 8:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_Teki_onUpdate() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var nto;
    
    //$LASTPOS=38000052;//user.Teki:52
    nto;
    //$LASTPOS=38000091;//user.Teki:91
    if (_this.crashTo(Tonyu.globals.$Jiki)) {
      //$LASTPOS=38000123;//user.Teki:123
      Tonyu.globals.$Jiki.dying=1;
      
    }
    //$LASTPOS=38000150;//user.Teki:150
    if (Tonyu.globals.$bomb.t==1) {
      //$LASTPOS=38000210;//user.Teki:210
      if (_this.crashTo(Tonyu.globals.$bomb)) {
        //$LASTPOS=38000246;//user.Teki:246
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pon);
        //$LASTPOS=38000307;//user.Teki:307
        nto=new Tonyu.classes.user.TTok(_this.x,_this.y,0,0);
        //$LASTPOS=38000343;//user.Teki:343
        nto.sc=Tonyu.globals.$bomb.tok;
        //$LASTPOS=38000374;//user.Teki:374
        _this.appear(nto);
        //$LASTPOS=38000435;//user.Teki:435
        Tonyu.globals.$bomb.tok=Tonyu.globals.$bomb.tok+100;
        //$LASTPOS=38000473;//user.Teki:473
        _this.die();
        
      }
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Teki,{"fullName":"user.Teki","namespace":"user","shortName":"Teki","decls":{"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TJiki=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_TJiki_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000023;//user.TJiki:23
    _this.an=0;
    //$LASTPOS=39000048;//user.TJiki:48
    while (1) {
      //$LASTPOS=39000064;//user.TJiki:64
      _this.dying=0;
      //$LASTPOS=39000102;//user.TJiki:102
      while (! _this.dying) {
        //$LASTPOS=39000145;//user.TJiki:145
        if (_this.getkey(37)&&_this.x>10) {
          //$LASTPOS=39000169;//user.TJiki:169
          _this.x=_this.x-1;
        }
        //$LASTPOS=39000202;//user.TJiki:202
        if (_this.getkey(39)&&_this.x<500) {
          //$LASTPOS=39000227;//user.TJiki:227
          _this.x=_this.x+1;
        }
        //$LASTPOS=39000259;//user.TJiki:259
        if (_this.getkey(40)) {
          //$LASTPOS=39000275;//user.TJiki:275
          _this.y=_this.y+2;
        }
        //$LASTPOS=39000311;//user.TJiki:311
        _this.y=_this.y+1;
        //$LASTPOS=39000376;//user.TJiki:376
        _this.an+=0.05;
        //$LASTPOS=39000385;//user.TJiki:385
        if (_this.an>=4) {
          //$LASTPOS=39000396;//user.TJiki:396
          _this.an=0;
        }
        //$LASTPOS=39000486;//user.TJiki:486
        if (_this.trunc(_this.an)==0) {
          //$LASTPOS=39000519;//user.TJiki:519
          _this.p=Tonyu.globals.$pat_ufo+1;
          //$LASTPOS=39000546;//user.TJiki:546
          _this.f=0;
          
        }
        //$LASTPOS=39000572;//user.TJiki:572
        if (_this.trunc(_this.an)==1) {
          //$LASTPOS=39000605;//user.TJiki:605
          _this.p=Tonyu.globals.$pat_ufo+2;
          //$LASTPOS=39000632;//user.TJiki:632
          _this.f=0;
          
        }
        //$LASTPOS=39000657;//user.TJiki:657
        if (_this.trunc(_this.an)==2) {
          //$LASTPOS=39000690;//user.TJiki:690
          _this.p=Tonyu.globals.$pat_ufo+1;
          //$LASTPOS=39000717;//user.TJiki:717
          _this.f=1;
          
        }
        //$LASTPOS=39000742;//user.TJiki:742
        if (_this.trunc(_this.an)==3) {
          //$LASTPOS=39000775;//user.TJiki:775
          _this.p=Tonyu.globals.$pat_ufo+2;
          //$LASTPOS=39000802;//user.TJiki:802
          _this.f=0;
          
        }
        //$LASTPOS=39000837;//user.TJiki:837
        _this.update();
        
      }
      //$LASTPOS=39000938;//user.TJiki:938
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
      //$LASTPOS=39000967;//user.TJiki:967
      while (_this.dying) {
        //$LASTPOS=39000992;//user.TJiki:992
        _this.y=_this.y+4;
        //$LASTPOS=39001008;//user.TJiki:1008
        _this.update();
        
      }
      
    }
  },
  fiber$main :function _trc_TJiki_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=39000023;//user.TJiki:23
    _this.an=0;
    
    _thread.enter(function _trc_TJiki_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=39000048;//user.TJiki:48
        case 1:
          if (!(1)) { __pc=8; break; }
          //$LASTPOS=39000064;//user.TJiki:64
          _this.dying=0;
          //$LASTPOS=39000102;//user.TJiki:102
        case 2:
          if (!(! _this.dying)) { __pc=4; break; }
          //$LASTPOS=39000145;//user.TJiki:145
          if (_this.getkey(37)&&_this.x>10) {
            //$LASTPOS=39000169;//user.TJiki:169
            _this.x=_this.x-1;
          }
          //$LASTPOS=39000202;//user.TJiki:202
          if (_this.getkey(39)&&_this.x<500) {
            //$LASTPOS=39000227;//user.TJiki:227
            _this.x=_this.x+1;
          }
          //$LASTPOS=39000259;//user.TJiki:259
          if (_this.getkey(40)) {
            //$LASTPOS=39000275;//user.TJiki:275
            _this.y=_this.y+2;
          }
          //$LASTPOS=39000311;//user.TJiki:311
          _this.y=_this.y+1;
          //$LASTPOS=39000376;//user.TJiki:376
          _this.an+=0.05;
          //$LASTPOS=39000385;//user.TJiki:385
          if (_this.an>=4) {
            //$LASTPOS=39000396;//user.TJiki:396
            _this.an=0;
          }
          //$LASTPOS=39000486;//user.TJiki:486
          if (_this.trunc(_this.an)==0) {
            //$LASTPOS=39000519;//user.TJiki:519
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=39000546;//user.TJiki:546
            _this.f=0;
            
          }
          //$LASTPOS=39000572;//user.TJiki:572
          if (_this.trunc(_this.an)==1) {
            //$LASTPOS=39000605;//user.TJiki:605
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=39000632;//user.TJiki:632
            _this.f=0;
            
          }
          //$LASTPOS=39000657;//user.TJiki:657
          if (_this.trunc(_this.an)==2) {
            //$LASTPOS=39000690;//user.TJiki:690
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=39000717;//user.TJiki:717
            _this.f=1;
            
          }
          //$LASTPOS=39000742;//user.TJiki:742
          if (_this.trunc(_this.an)==3) {
            //$LASTPOS=39000775;//user.TJiki:775
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=39000802;//user.TJiki:802
            _this.f=0;
            
          }
          //$LASTPOS=39000837;//user.TJiki:837
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          //$LASTPOS=39000938;//user.TJiki:938
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
          //$LASTPOS=39000967;//user.TJiki:967
        case 5:
          if (!(_this.dying)) { __pc=7; break; }
          //$LASTPOS=39000992;//user.TJiki:992
          _this.y=_this.y+4;
          //$LASTPOS=39001008;//user.TJiki:1008
          _this.fiber$update(_thread);
          __pc=6;return;
        case 6:
          
          __pc=5;break;
        case 7:
          
          __pc=1;break;
        case 8:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TJiki,{"fullName":"user.TJiki","namespace":"user","shortName":"TJiki","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TLeft=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_TLeft_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=40000095;//user.TLeft:95
    while (1) {
      //$LASTPOS=40000110;//user.TLeft:110
      _this.update();
      //$LASTPOS=40000125;//user.TLeft:125
      if (Tonyu.globals.$Left<_this.aleft) {
        //$LASTPOS=40000142;//user.TLeft:142
        _this.setVisible(0);
      }
      
    }
  },
  fiber$main :function _trc_TLeft_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_TLeft_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=40000095;//user.TLeft:95
        case 1:
          if (!(1)) { __pc=5; break; }
          //$LASTPOS=40000110;//user.TLeft:110
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=40000125;//user.TLeft:125
          if (!(Tonyu.globals.$Left<_this.aleft)) { __pc=4; break; }
          //$LASTPOS=40000142;//user.TLeft:142
          _this.fiber$setVisible(_thread, 0);
          __pc=3;return;
        case 3:
          
        case 4:
          
          __pc=1;break;
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TLeft,{"fullName":"user.TLeft","namespace":"user","shortName":"TLeft","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TRocket=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_TRocket_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=41000023;//user.TRocket:23
    Tonyu.globals.$score=0;
    //$LASTPOS=41000044;//user.TRocket:44
    Tonyu.globals.$Left=3;
    //$LASTPOS=41000064;//user.TRocket:64
    _this.vx=0;
    //$LASTPOS=41000087;//user.TRocket:87
    Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
    //$LASTPOS=41000117;//user.TRocket:117
    Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
    //$LASTPOS=41000171;//user.TRocket:171
    while (Tonyu.globals.$Left>=0) {
      //$LASTPOS=41000195;//user.TRocket:195
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
      //$LASTPOS=41000258;//user.TRocket:258
      while (_this.getkey(32)==0) {
        //$LASTPOS=41000291;//user.TRocket:291
        _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
        //$LASTPOS=41000357;//user.TRocket:357
        Tonyu.globals.$Jiki.y=- 50;
        //$LASTPOS=41000425;//user.TRocket:425
        if (_this.x>Tonyu.globals.$screenWidth/2) {
          //$LASTPOS=41000447;//user.TRocket:447
          _this.vx=_this.vx-1;
        } else {
          //$LASTPOS=41000470;//user.TRocket:470
          _this.vx=_this.vx+1;
        }
        //$LASTPOS=41000488;//user.TRocket:488
        _this.x=_this.x+_this.vx;
        //$LASTPOS=41000505;//user.TRocket:505
        _this.update();
        //$LASTPOS=41000524;//user.TRocket:524
        _this.f=(_this.vx<0);
        
      }
      //$LASTPOS=41000572;//user.TRocket:572
      Tonyu.globals.$Jiki.x=_this.x;
      //$LASTPOS=41000588;//user.TRocket:588
      Tonyu.globals.$Jiki.y=_this.y;
      //$LASTPOS=41000605;//user.TRocket:605
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
      //$LASTPOS=41000657;//user.TRocket:657
      while (Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight) {
        //$LASTPOS=41000688;//user.TRocket:688
        _this.update();
        
      }
      //$LASTPOS=41000704;//user.TRocket:704
      if (Tonyu.globals.$Jiki.dying) {
        //$LASTPOS=41000761;//user.TRocket:761
        Tonyu.globals.$Left=Tonyu.globals.$Left-1;
        //$LASTPOS=41000813;//user.TRocket:813
        Tonyu.globals.$Jiki.dying=0;
        
      } else {
        //$LASTPOS=41000901;//user.TRocket:901
        _this.appear(new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
        //$LASTPOS=41001007;//user.TRocket:1007
        _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
        //$LASTPOS=41001078;//user.TRocket:1078
        _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
        //$LASTPOS=41001170;//user.TRocket:1170
        _this.appear(_this.nto);
        
      }
      
    }
    //$LASTPOS=41001208;//user.TRocket:1208
    while (1) {
      //$LASTPOS=41001224;//user.TRocket:1224
      _this.y=_this.y+10;
      //$LASTPOS=41001253;//user.TRocket:1253
      _this.drawText(221,166,"Game Over",_this.rnd()*65536,20);
      //$LASTPOS=41001304;//user.TRocket:1304
      _this.drawText(221,190,"Replay F9 ",_this.rnd()*65536,20);
      //$LASTPOS=41001356;//user.TRocket:1356
      _this.update();
      
    }
  },
  fiber$main :function _trc_TRocket_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=41000023;//user.TRocket:23
    Tonyu.globals.$score=0;
    //$LASTPOS=41000044;//user.TRocket:44
    Tonyu.globals.$Left=3;
    //$LASTPOS=41000064;//user.TRocket:64
    _this.vx=0;
    //$LASTPOS=41000087;//user.TRocket:87
    Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
    //$LASTPOS=41000117;//user.TRocket:117
    Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
    
    _thread.enter(function _trc_TRocket_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=41000171;//user.TRocket:171
        case 1:
          if (!(Tonyu.globals.$Left>=0)) { __pc=13; break; }
          //$LASTPOS=41000195;//user.TRocket:195
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
          //$LASTPOS=41000258;//user.TRocket:258
        case 2:
          if (!(_this.getkey(32)==0)) { __pc=5; break; }
          //$LASTPOS=41000291;//user.TRocket:291
          _this.fiber$drawText(_thread, 153, 173, "Push Space key", _this.color(30,150,220), 20);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=41000357;//user.TRocket:357
          Tonyu.globals.$Jiki.y=- 50;
          //$LASTPOS=41000425;//user.TRocket:425
          if (_this.x>Tonyu.globals.$screenWidth/2) {
            //$LASTPOS=41000447;//user.TRocket:447
            _this.vx=_this.vx-1;
          } else {
            //$LASTPOS=41000470;//user.TRocket:470
            _this.vx=_this.vx+1;
          }
          //$LASTPOS=41000488;//user.TRocket:488
          _this.x=_this.x+_this.vx;
          //$LASTPOS=41000505;//user.TRocket:505
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          //$LASTPOS=41000524;//user.TRocket:524
          _this.f=(_this.vx<0);
          __pc=2;break;
        case 5:
          
          //$LASTPOS=41000572;//user.TRocket:572
          Tonyu.globals.$Jiki.x=_this.x;
          //$LASTPOS=41000588;//user.TRocket:588
          Tonyu.globals.$Jiki.y=_this.y;
          //$LASTPOS=41000605;//user.TRocket:605
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
          //$LASTPOS=41000657;//user.TRocket:657
        case 6:
          if (!(Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight)) { __pc=8; break; }
          //$LASTPOS=41000688;//user.TRocket:688
          _this.fiber$update(_thread);
          __pc=7;return;
        case 7:
          
          __pc=6;break;
        case 8:
          
          //$LASTPOS=41000704;//user.TRocket:704
          if (!(Tonyu.globals.$Jiki.dying)) { __pc=9; break; }
          {
            //$LASTPOS=41000761;//user.TRocket:761
            Tonyu.globals.$Left=Tonyu.globals.$Left-1;
            //$LASTPOS=41000813;//user.TRocket:813
            Tonyu.globals.$Jiki.dying=0;
          }
          __pc=12;break;
        case 9:
          //$LASTPOS=41000901;//user.TRocket:901
          _this.fiber$appear(_thread, new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
          __pc=10;return;
        case 10:
          
          //$LASTPOS=41001007;//user.TRocket:1007
          _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
          //$LASTPOS=41001078;//user.TRocket:1078
          _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
          //$LASTPOS=41001170;//user.TRocket:1170
          _this.fiber$appear(_thread, _this.nto);
          __pc=11;return;
        case 11:
          
        case 12:
          
          __pc=1;break;
        case 13:
          
          //$LASTPOS=41001208;//user.TRocket:1208
        case 14:
          if (!(1)) { __pc=18; break; }
          //$LASTPOS=41001224;//user.TRocket:1224
          _this.y=_this.y+10;
          //$LASTPOS=41001253;//user.TRocket:1253
          _this.fiber$drawText(_thread, 221, 166, "Game Over", _this.rnd()*65536, 20);
          __pc=15;return;
        case 15:
          
          //$LASTPOS=41001304;//user.TRocket:1304
          _this.fiber$drawText(_thread, 221, 190, "Replay F9 ", _this.rnd()*65536, 20);
          __pc=16;return;
        case 16:
          
          //$LASTPOS=41001356;//user.TRocket:1356
          _this.fiber$update(_thread);
          __pc=17;return;
        case 17:
          
          __pc=14;break;
        case 18:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TRocket,{"fullName":"user.TRocket","namespace":"user","shortName":"TRocket","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TTok=Tonyu.klass(Tonyu.classes.kernel.TextChar,[],{
  main :function _trc_TTok_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000030;//user.TTok:30
    _this.ey=_this.y-50;
    //$LASTPOS=42000040;//user.TTok:40
    _this.size=10;
    //$LASTPOS=42000072;//user.TTok:72
    while (_this.y>_this.ey) {
      //$LASTPOS=42000092;//user.TTok:92
      _this.update();
      //$LASTPOS=42000107;//user.TTok:107
      _this.y=_this.y-1;
      //$LASTPOS=42000119;//user.TTok:119
      _this.text=_this.sc;
      
    }
    //$LASTPOS=42000152;//user.TTok:152
    while (_this.sc>=10) {
      //$LASTPOS=42000174;//user.TTok:174
      _this.text=_this.sc;
      //$LASTPOS=42000188;//user.TTok:188
      _this.update();
      //$LASTPOS=42000203;//user.TTok:203
      _this.sc=_this.sc-10;
      //$LASTPOS=42000218;//user.TTok:218
      Tonyu.globals.$score=Tonyu.globals.$score+10;
      
    }
    //$LASTPOS=42000240;//user.TTok:240
    Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
  },
  fiber$main :function _trc_TTok_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=42000030;//user.TTok:30
    _this.ey=_this.y-50;
    //$LASTPOS=42000040;//user.TTok:40
    _this.size=10;
    
    _thread.enter(function _trc_TTok_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=42000072;//user.TTok:72
        case 1:
          if (!(_this.y>_this.ey)) { __pc=3; break; }
          //$LASTPOS=42000092;//user.TTok:92
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=42000107;//user.TTok:107
          _this.y=_this.y-1;
          //$LASTPOS=42000119;//user.TTok:119
          _this.text=_this.sc;
          __pc=1;break;
        case 3:
          
          //$LASTPOS=42000152;//user.TTok:152
        case 4:
          if (!(_this.sc>=10)) { __pc=6; break; }
          //$LASTPOS=42000174;//user.TTok:174
          _this.text=_this.sc;
          //$LASTPOS=42000188;//user.TTok:188
          _this.fiber$update(_thread);
          __pc=5;return;
        case 5:
          
          //$LASTPOS=42000203;//user.TTok:203
          _this.sc=_this.sc-10;
          //$LASTPOS=42000218;//user.TTok:218
          Tonyu.globals.$score=Tonyu.globals.$score+10;
          __pc=4;break;
        case 6:
          
          //$LASTPOS=42000240;//user.TTok:240
          Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TTok,{"fullName":"user.TTok","namespace":"user","shortName":"TTok","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.TTokSum=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_TTokSum_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000107;//user.TTokSum:107
    while (1) {
      //$LASTPOS=43000124;//user.TTokSum:124
      _this.update();
      
    }
  },
  fiber$main :function _trc_TTokSum_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_TTokSum_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=43000107;//user.TTokSum:107
        case 1:
          if (!(1)) { __pc=3; break; }
          //$LASTPOS=43000124;//user.TTokSum:124
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
  draw :function _trc_TTokSum_draw(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000047;//user.TTokSum:47
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=43000067;//user.TTokSum:67
    _this.drawText(_this.x,_this.y,Tonyu.globals.$score,255*256,20);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.TTokSum,{"fullName":"user.TTokSum","namespace":"user","shortName":"TTokSum","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

