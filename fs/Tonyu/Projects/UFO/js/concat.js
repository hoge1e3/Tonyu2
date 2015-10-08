Tonyu.klass.define({
  fullName: 'user.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
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
  },
  decls: {"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Page_index',
  shortName: 'Page_index',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.T1Page,
  includes: [],
  methods: {
    main :function _trc_Page_index_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000016;//user.Page_index:16
      _this.initGlobals();
      //$LASTPOS=45000031;//user.Page_index:31
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=45000049;//user.Page_index:49
      Tonyu.globals.$screenHeight=376;
      //$LASTPOS=45000068;//user.Page_index:68
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=45000112;//user.Page_index:112
      Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
      //$LASTPOS=45000164;//user.Page_index:164
      Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
      //$LASTPOS=45000213;//user.Page_index:213
      Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
      //$LASTPOS=45000262;//user.Page_index:262
      Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
      //$LASTPOS=45000312;//user.Page_index:312
      Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
      //$LASTPOS=45000371;//user.Page_index:371
      Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
      //$LASTPOS=45000430;//user.Page_index:430
      Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
      //$LASTPOS=45000489;//user.Page_index:489
      Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
      //$LASTPOS=45000532;//user.Page_index:532
      Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
      //$LASTPOS=45000575;//user.Page_index:575
      Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
      //$LASTPOS=45000617;//user.Page_index:617
      Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
      //$LASTPOS=45000685;//user.Page_index:685
      Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
      //$LASTPOS=45000714;//user.Page_index:714
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
            //$LASTPOS=45000016;//user.Page_index:16
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45000031;//user.Page_index:31
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=45000049;//user.Page_index:49
            Tonyu.globals.$screenHeight=376;
            //$LASTPOS=45000068;//user.Page_index:68
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=45000112;//user.Page_index:112
            Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
            //$LASTPOS=45000164;//user.Page_index:164
            Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
            //$LASTPOS=45000213;//user.Page_index:213
            Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
            //$LASTPOS=45000262;//user.Page_index:262
            Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
            //$LASTPOS=45000312;//user.Page_index:312
            Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
            //$LASTPOS=45000371;//user.Page_index:371
            Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
            //$LASTPOS=45000430;//user.Page_index:430
            Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
            //$LASTPOS=45000489;//user.Page_index:489
            Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
            //$LASTPOS=45000532;//user.Page_index:532
            Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({p: 0,x: 382,y: 31});
            //$LASTPOS=45000575;//user.Page_index:575
            Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
            //$LASTPOS=45000617;//user.Page_index:617
            Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
            //$LASTPOS=45000685;//user.Page_index:685
            Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
            //$LASTPOS=45000714;//user.Page_index:714
            Tonyu.globals.$map.load("index.map");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TBomb',
  shortName: 'TBomb',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TBomb_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000023;//user.TBomb:23
      while (1) {
        //$LASTPOS=46000040;//user.TBomb:40
        _this.t=0;
        //$LASTPOS=46000078;//user.TBomb:78
        while (_this.t==0) {
          //$LASTPOS=46000101;//user.TBomb:101
          if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
            //$LASTPOS=46000125;//user.TBomb:125
            _this.t=1;
          }
          //$LASTPOS=46000139;//user.TBomb:139
          _this.update();
          
        }
        //$LASTPOS=46000161;//user.TBomb:161
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
        //$LASTPOS=46000199;//user.TBomb:199
        _this.tok=100;
        //$LASTPOS=46000236;//user.TBomb:236
        while (_this.y>- 150) {
          //$LASTPOS=46000261;//user.TBomb:261
          _this.y=_this.y-10;
          //$LASTPOS=46000304;//user.TBomb:304
          if (_this.getkey(37)) {
            //$LASTPOS=46000320;//user.TBomb:320
            if (_this.x>10) {
              //$LASTPOS=46000330;//user.TBomb:330
              _this.x=_this.x-2;
            }
          }
          //$LASTPOS=46000346;//user.TBomb:346
          if (_this.getkey(39)) {
            //$LASTPOS=46000362;//user.TBomb:362
            if (_this.x<500) {
              //$LASTPOS=46000373;//user.TBomb:373
              _this.x=_this.x+2;
            }
          }
          //$LASTPOS=46000389;//user.TBomb:389
          _this.update();
          
        }
        //$LASTPOS=46000443;//user.TBomb:443
        _this.x=_this.rnd()*300+100;
        //$LASTPOS=46000465;//user.TBomb:465
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
            //$LASTPOS=46000023;//user.TBomb:23
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=46000040;//user.TBomb:40
            _this.t=0;
            //$LASTPOS=46000078;//user.TBomb:78
          case 2:
            if (!(_this.t==0)) { __pc=4; break; }
            //$LASTPOS=46000101;//user.TBomb:101
            if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
              //$LASTPOS=46000125;//user.TBomb:125
              _this.t=1;
            }
            //$LASTPOS=46000139;//user.TBomb:139
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=46000161;//user.TBomb:161
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
            //$LASTPOS=46000199;//user.TBomb:199
            _this.tok=100;
            //$LASTPOS=46000236;//user.TBomb:236
          case 5:
            if (!(_this.y>- 150)) { __pc=7; break; }
            //$LASTPOS=46000261;//user.TBomb:261
            _this.y=_this.y-10;
            //$LASTPOS=46000304;//user.TBomb:304
            if (_this.getkey(37)) {
              //$LASTPOS=46000320;//user.TBomb:320
              if (_this.x>10) {
                //$LASTPOS=46000330;//user.TBomb:330
                _this.x=_this.x-2;
              }
            }
            //$LASTPOS=46000346;//user.TBomb:346
            if (_this.getkey(39)) {
              //$LASTPOS=46000362;//user.TBomb:362
              if (_this.x<500) {
                //$LASTPOS=46000373;//user.TBomb:373
                _this.x=_this.x+2;
              }
            }
            //$LASTPOS=46000389;//user.TBomb:389
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=46000443;//user.TBomb:443
            _this.x=_this.rnd()*300+100;
            //$LASTPOS=46000465;//user.TBomb:465
            _this.y=360;
            __pc=1;break;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Teki',
  shortName: 'Teki',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_Teki_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47000504;//user.Teki:504
      _this.vx=_this.vy=0;
      //$LASTPOS=47000514;//user.Teki:514
      _this.tx=_this.x;
      //$LASTPOS=47000519;//user.Teki:519
      _this.ty=_this.y;
      //$LASTPOS=47000526;//user.Teki:526
      while (1) {
        //$LASTPOS=47000542;//user.Teki:542
        _this.c=0;
        //$LASTPOS=47000588;//user.Teki:588
        if (_this.tx>_this.x) {
          //$LASTPOS=47000598;//user.Teki:598
          _this.vx=2;
        }
        //$LASTPOS=47000609;//user.Teki:609
        if (_this.ty>_this.y) {
          //$LASTPOS=47000619;//user.Teki:619
          _this.vy=2;
        }
        //$LASTPOS=47000630;//user.Teki:630
        if (_this.tx<_this.x) {
          //$LASTPOS=47000640;//user.Teki:640
          _this.vx=- 2;
        }
        //$LASTPOS=47000652;//user.Teki:652
        if (_this.ty<_this.y) {
          //$LASTPOS=47000662;//user.Teki:662
          _this.vy=- 2;
        }
        //$LASTPOS=47000688;//user.Teki:688
        _this.w=_this.rnd()*10;
        //$LASTPOS=47000705;//user.Teki:705
        while (_this.c<_this.w) {
          //$LASTPOS=47000726;//user.Teki:726
          _this.x=_this.x+_this.vx;
          //$LASTPOS=47000743;//user.Teki:743
          _this.y=_this.y+_this.vy;
          //$LASTPOS=47000760;//user.Teki:760
          _this.update();
          //$LASTPOS=47000779;//user.Teki:779
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=47000798;//user.Teki:798
        _this.c=0;
        //$LASTPOS=47000808;//user.Teki:808
        _this.p=_this.p+1;
        //$LASTPOS=47000845;//user.Teki:845
        if (_this.rnd()*20<1) {
          //$LASTPOS=47000872;//user.Teki:872
          _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
          //$LASTPOS=47000903;//user.Teki:903
          _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
          
        }
        //$LASTPOS=47000957;//user.Teki:957
        _this.w=_this.rnd()*20+10;
        //$LASTPOS=47000977;//user.Teki:977
        while (_this.c<_this.w) {
          //$LASTPOS=47001000;//user.Teki:1000
          _this.update();
          //$LASTPOS=47001019;//user.Teki:1019
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=47001038;//user.Teki:1038
        _this.p=_this.p-1;
        
      }
    },
    fiber$main :function _trc_Teki_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000504;//user.Teki:504
      _this.vx=_this.vy=0;
      //$LASTPOS=47000514;//user.Teki:514
      _this.tx=_this.x;
      //$LASTPOS=47000519;//user.Teki:519
      _this.ty=_this.y;
      
      _thread.enter(function _trc_Teki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000526;//user.Teki:526
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=47000542;//user.Teki:542
            _this.c=0;
            //$LASTPOS=47000588;//user.Teki:588
            if (_this.tx>_this.x) {
              //$LASTPOS=47000598;//user.Teki:598
              _this.vx=2;
            }
            //$LASTPOS=47000609;//user.Teki:609
            if (_this.ty>_this.y) {
              //$LASTPOS=47000619;//user.Teki:619
              _this.vy=2;
            }
            //$LASTPOS=47000630;//user.Teki:630
            if (_this.tx<_this.x) {
              //$LASTPOS=47000640;//user.Teki:640
              _this.vx=- 2;
            }
            //$LASTPOS=47000652;//user.Teki:652
            if (_this.ty<_this.y) {
              //$LASTPOS=47000662;//user.Teki:662
              _this.vy=- 2;
            }
            //$LASTPOS=47000688;//user.Teki:688
            _this.w=_this.rnd()*10;
            //$LASTPOS=47000705;//user.Teki:705
          case 2:
            if (!(_this.c<_this.w)) { __pc=4; break; }
            //$LASTPOS=47000726;//user.Teki:726
            _this.x=_this.x+_this.vx;
            //$LASTPOS=47000743;//user.Teki:743
            _this.y=_this.y+_this.vy;
            //$LASTPOS=47000760;//user.Teki:760
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=47000779;//user.Teki:779
            _this.c=_this.c+1;
            __pc=2;break;
          case 4:
            
            //$LASTPOS=47000798;//user.Teki:798
            _this.c=0;
            //$LASTPOS=47000808;//user.Teki:808
            _this.p=_this.p+1;
            //$LASTPOS=47000845;//user.Teki:845
            if (_this.rnd()*20<1) {
              //$LASTPOS=47000872;//user.Teki:872
              _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
              //$LASTPOS=47000903;//user.Teki:903
              _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
              
            }
            //$LASTPOS=47000957;//user.Teki:957
            _this.w=_this.rnd()*20+10;
            //$LASTPOS=47000977;//user.Teki:977
          case 5:
            if (!(_this.c<_this.w)) { __pc=7; break; }
            //$LASTPOS=47001000;//user.Teki:1000
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=47001019;//user.Teki:1019
            _this.c=_this.c+1;
            __pc=5;break;
          case 7:
            
            //$LASTPOS=47001038;//user.Teki:1038
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
      
      //$LASTPOS=47000052;//user.Teki:52
      nto;
      //$LASTPOS=47000091;//user.Teki:91
      if (_this.crashTo(Tonyu.globals.$Jiki)) {
        //$LASTPOS=47000123;//user.Teki:123
        Tonyu.globals.$Jiki.dying=1;
        
      }
      //$LASTPOS=47000150;//user.Teki:150
      if (Tonyu.globals.$bomb.t==1) {
        //$LASTPOS=47000210;//user.Teki:210
        if (_this.crashTo(Tonyu.globals.$bomb)) {
          //$LASTPOS=47000246;//user.Teki:246
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pon);
          //$LASTPOS=47000307;//user.Teki:307
          nto=new Tonyu.classes.user.TTok(_this.x,_this.y,0,0);
          //$LASTPOS=47000343;//user.Teki:343
          nto.sc=Tonyu.globals.$bomb.tok;
          //$LASTPOS=47000374;//user.Teki:374
          _this.appear(nto);
          //$LASTPOS=47000435;//user.Teki:435
          Tonyu.globals.$bomb.tok=Tonyu.globals.$bomb.tok+100;
          //$LASTPOS=47000473;//user.Teki:473
          _this.die();
          
        }
        
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onUpdate":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.TJiki',
  shortName: 'TJiki',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TJiki_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=48000023;//user.TJiki:23
      _this.an=0;
      //$LASTPOS=48000046;//user.TJiki:46
      while (1) {
        //$LASTPOS=48000062;//user.TJiki:62
        _this.dying=0;
        //$LASTPOS=48000100;//user.TJiki:100
        while (! _this.dying) {
          //$LASTPOS=48000143;//user.TJiki:143
          if (_this.getkey(37)&&_this.x>10) {
            //$LASTPOS=48000167;//user.TJiki:167
            _this.x=_this.x-1;
          }
          //$LASTPOS=48000200;//user.TJiki:200
          if (_this.getkey(39)&&_this.x<500) {
            //$LASTPOS=48000225;//user.TJiki:225
            _this.x=_this.x+1;
          }
          //$LASTPOS=48000257;//user.TJiki:257
          if (_this.getkey(40)) {
            //$LASTPOS=48000273;//user.TJiki:273
            _this.y=_this.y+2;
          }
          //$LASTPOS=48000309;//user.TJiki:309
          _this.y=_this.y+1;
          //$LASTPOS=48000374;//user.TJiki:374
          _this.an+=0.05;
          //$LASTPOS=48000383;//user.TJiki:383
          if (_this.an>=4) {
            //$LASTPOS=48000394;//user.TJiki:394
            _this.an=0;
          }
          //$LASTPOS=48000484;//user.TJiki:484
          if (_this.trunc(_this.an)==0) {
            //$LASTPOS=48000517;//user.TJiki:517
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=48000544;//user.TJiki:544
            _this.f=0;
            
          }
          //$LASTPOS=48000570;//user.TJiki:570
          if (_this.trunc(_this.an)==1) {
            //$LASTPOS=48000603;//user.TJiki:603
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=48000630;//user.TJiki:630
            _this.f=0;
            
          }
          //$LASTPOS=48000655;//user.TJiki:655
          if (_this.trunc(_this.an)==2) {
            //$LASTPOS=48000688;//user.TJiki:688
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=48000715;//user.TJiki:715
            _this.f=1;
            
          }
          //$LASTPOS=48000740;//user.TJiki:740
          if (_this.trunc(_this.an)==3) {
            //$LASTPOS=48000773;//user.TJiki:773
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=48000800;//user.TJiki:800
            _this.f=0;
            
          }
          //$LASTPOS=48000825;//user.TJiki:825
          _this.update();
          
        }
        //$LASTPOS=48000936;//user.TJiki:936
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
        //$LASTPOS=48000965;//user.TJiki:965
        while (_this.dying) {
          //$LASTPOS=48000990;//user.TJiki:990
          _this.y=_this.y+4;
          //$LASTPOS=48001006;//user.TJiki:1006
          _this.update();
          
        }
        
      }
    },
    fiber$main :function _trc_TJiki_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48000023;//user.TJiki:23
      _this.an=0;
      
      _thread.enter(function _trc_TJiki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48000046;//user.TJiki:46
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=48000062;//user.TJiki:62
            _this.dying=0;
            //$LASTPOS=48000100;//user.TJiki:100
          case 2:
            if (!(! _this.dying)) { __pc=4; break; }
            //$LASTPOS=48000143;//user.TJiki:143
            if (_this.getkey(37)&&_this.x>10) {
              //$LASTPOS=48000167;//user.TJiki:167
              _this.x=_this.x-1;
            }
            //$LASTPOS=48000200;//user.TJiki:200
            if (_this.getkey(39)&&_this.x<500) {
              //$LASTPOS=48000225;//user.TJiki:225
              _this.x=_this.x+1;
            }
            //$LASTPOS=48000257;//user.TJiki:257
            if (_this.getkey(40)) {
              //$LASTPOS=48000273;//user.TJiki:273
              _this.y=_this.y+2;
            }
            //$LASTPOS=48000309;//user.TJiki:309
            _this.y=_this.y+1;
            //$LASTPOS=48000374;//user.TJiki:374
            _this.an+=0.05;
            //$LASTPOS=48000383;//user.TJiki:383
            if (_this.an>=4) {
              //$LASTPOS=48000394;//user.TJiki:394
              _this.an=0;
            }
            //$LASTPOS=48000484;//user.TJiki:484
            if (_this.trunc(_this.an)==0) {
              //$LASTPOS=48000517;//user.TJiki:517
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=48000544;//user.TJiki:544
              _this.f=0;
              
            }
            //$LASTPOS=48000570;//user.TJiki:570
            if (_this.trunc(_this.an)==1) {
              //$LASTPOS=48000603;//user.TJiki:603
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=48000630;//user.TJiki:630
              _this.f=0;
              
            }
            //$LASTPOS=48000655;//user.TJiki:655
            if (_this.trunc(_this.an)==2) {
              //$LASTPOS=48000688;//user.TJiki:688
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=48000715;//user.TJiki:715
              _this.f=1;
              
            }
            //$LASTPOS=48000740;//user.TJiki:740
            if (_this.trunc(_this.an)==3) {
              //$LASTPOS=48000773;//user.TJiki:773
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=48000800;//user.TJiki:800
              _this.f=0;
              
            }
            //$LASTPOS=48000825;//user.TJiki:825
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=48000936;//user.TJiki:936
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
            //$LASTPOS=48000965;//user.TJiki:965
          case 5:
            if (!(_this.dying)) { __pc=7; break; }
            //$LASTPOS=48000990;//user.TJiki:990
            _this.y=_this.y+4;
            //$LASTPOS=48001006;//user.TJiki:1006
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
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TLeft',
  shortName: 'TLeft',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TLeft_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=49000095;//user.TLeft:95
      while (1) {
        //$LASTPOS=49000110;//user.TLeft:110
        _this.update();
        //$LASTPOS=49000125;//user.TLeft:125
        if (Tonyu.globals.$Left<_this.aleft) {
          //$LASTPOS=49000142;//user.TLeft:142
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
            //$LASTPOS=49000095;//user.TLeft:95
          case 1:
            if (!(1)) { __pc=5; break; }
            //$LASTPOS=49000110;//user.TLeft:110
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49000125;//user.TLeft:125
            if (!(Tonyu.globals.$Left<_this.aleft)) { __pc=4; break; }
            //$LASTPOS=49000142;//user.TLeft:142
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
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TRocket',
  shortName: 'TRocket',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TRocket_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=50000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=50000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=50000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=50000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=50000128;//user.TRocket:128
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      //$LASTPOS=50000182;//user.TRocket:182
      while (Tonyu.globals.$Left>=0) {
        //$LASTPOS=50000206;//user.TRocket:206
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
        //$LASTPOS=50000269;//user.TRocket:269
        while (_this.getkey(32)==0) {
          //$LASTPOS=50000302;//user.TRocket:302
          _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
          //$LASTPOS=50000368;//user.TRocket:368
          Tonyu.globals.$Jiki.y=- 50;
          //$LASTPOS=50000436;//user.TRocket:436
          if (_this.x>Tonyu.globals.$screenWidth/2) {
            //$LASTPOS=50000458;//user.TRocket:458
            _this.vx=_this.vx-1;
          } else {
            //$LASTPOS=50000481;//user.TRocket:481
            _this.vx=_this.vx+1;
          }
          //$LASTPOS=50000499;//user.TRocket:499
          _this.x=_this.x+_this.vx;
          //$LASTPOS=50000516;//user.TRocket:516
          _this.update();
          //$LASTPOS=50000535;//user.TRocket:535
          _this.f=(_this.vx<0);
          
        }
        //$LASTPOS=50000583;//user.TRocket:583
        Tonyu.globals.$Jiki.x=_this.x;
        //$LASTPOS=50000599;//user.TRocket:599
        Tonyu.globals.$Jiki.y=_this.y;
        //$LASTPOS=50000616;//user.TRocket:616
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
        //$LASTPOS=50000668;//user.TRocket:668
        while (Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight) {
          //$LASTPOS=50000699;//user.TRocket:699
          _this.update();
          
        }
        //$LASTPOS=50000715;//user.TRocket:715
        if (Tonyu.globals.$Jiki.dying) {
          //$LASTPOS=50000772;//user.TRocket:772
          Tonyu.globals.$Left=Tonyu.globals.$Left-1;
          //$LASTPOS=50000824;//user.TRocket:824
          Tonyu.globals.$Jiki.dying=0;
          
        } else {
          //$LASTPOS=50000912;//user.TRocket:912
          _this.appear(new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
          //$LASTPOS=50001018;//user.TRocket:1018
          _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
          //$LASTPOS=50001089;//user.TRocket:1089
          _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
          //$LASTPOS=50001181;//user.TRocket:1181
          _this.appear(_this.nto);
          
        }
        
      }
      //$LASTPOS=50001219;//user.TRocket:1219
      while (1) {
        //$LASTPOS=50001235;//user.TRocket:1235
        _this.y=_this.y+10;
        //$LASTPOS=50001264;//user.TRocket:1264
        _this.drawText(221,166,"Game Over",_this.rnd()*65536,20);
        //$LASTPOS=50001315;//user.TRocket:1315
        _this.drawText(221,190,"Replay F9 ",_this.rnd()*65536,20);
        //$LASTPOS=50001367;//user.TRocket:1367
        _this.update();
        
      }
    },
    fiber$main :function _trc_TRocket_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=50000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=50000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=50000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=50000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=50000128;//user.TRocket:128
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      
      _thread.enter(function _trc_TRocket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=50000182;//user.TRocket:182
          case 1:
            if (!(Tonyu.globals.$Left>=0)) { __pc=12; break; }
            //$LASTPOS=50000206;//user.TRocket:206
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
            //$LASTPOS=50000269;//user.TRocket:269
          case 2:
            if (!(_this.getkey(32)==0)) { __pc=4; break; }
            //$LASTPOS=50000302;//user.TRocket:302
            _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
            //$LASTPOS=50000368;//user.TRocket:368
            Tonyu.globals.$Jiki.y=- 50;
            //$LASTPOS=50000436;//user.TRocket:436
            if (_this.x>Tonyu.globals.$screenWidth/2) {
              //$LASTPOS=50000458;//user.TRocket:458
              _this.vx=_this.vx-1;
            } else {
              //$LASTPOS=50000481;//user.TRocket:481
              _this.vx=_this.vx+1;
            }
            //$LASTPOS=50000499;//user.TRocket:499
            _this.x=_this.x+_this.vx;
            //$LASTPOS=50000516;//user.TRocket:516
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=50000535;//user.TRocket:535
            _this.f=(_this.vx<0);
            __pc=2;break;
          case 4:
            
            //$LASTPOS=50000583;//user.TRocket:583
            Tonyu.globals.$Jiki.x=_this.x;
            //$LASTPOS=50000599;//user.TRocket:599
            Tonyu.globals.$Jiki.y=_this.y;
            //$LASTPOS=50000616;//user.TRocket:616
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
            //$LASTPOS=50000668;//user.TRocket:668
          case 5:
            if (!(Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight)) { __pc=7; break; }
            //$LASTPOS=50000699;//user.TRocket:699
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=50000715;//user.TRocket:715
            if (!(Tonyu.globals.$Jiki.dying)) { __pc=8; break; }
            {
              //$LASTPOS=50000772;//user.TRocket:772
              Tonyu.globals.$Left=Tonyu.globals.$Left-1;
              //$LASTPOS=50000824;//user.TRocket:824
              Tonyu.globals.$Jiki.dying=0;
            }
            __pc=11;break;
          case 8:
            //$LASTPOS=50000912;//user.TRocket:912
            _this.fiber$appear(_thread, new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
            __pc=9;return;
          case 9:
            
            //$LASTPOS=50001018;//user.TRocket:1018
            _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
            //$LASTPOS=50001089;//user.TRocket:1089
            _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
            //$LASTPOS=50001181;//user.TRocket:1181
            _this.fiber$appear(_thread, _this.nto);
            __pc=10;return;
          case 10:
            
          case 11:
            
            __pc=1;break;
          case 12:
            
            //$LASTPOS=50001219;//user.TRocket:1219
          case 13:
            if (!(1)) { __pc=15; break; }
            //$LASTPOS=50001235;//user.TRocket:1235
            _this.y=_this.y+10;
            //$LASTPOS=50001264;//user.TRocket:1264
            _this.drawText(221,166,"Game Over",_this.rnd()*65536,20);
            //$LASTPOS=50001315;//user.TRocket:1315
            _this.drawText(221,190,"Replay F9 ",_this.rnd()*65536,20);
            //$LASTPOS=50001367;//user.TRocket:1367
            _this.fiber$update(_thread);
            __pc=14;return;
          case 14:
            
            __pc=13;break;
          case 15:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TTok',
  shortName: 'TTok',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TextChar,
  includes: [],
  methods: {
    main :function _trc_TTok_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=51000040;//user.TTok:40
      _this.size=10;
      //$LASTPOS=51000072;//user.TTok:72
      while (_this.y>_this.ey) {
        //$LASTPOS=51000092;//user.TTok:92
        _this.update();
        //$LASTPOS=51000107;//user.TTok:107
        _this.y=_this.y-1;
        //$LASTPOS=51000119;//user.TTok:119
        _this.text=_this.sc;
        
      }
      //$LASTPOS=51000152;//user.TTok:152
      while (_this.sc>=10) {
        //$LASTPOS=51000174;//user.TTok:174
        _this.text=_this.sc;
        //$LASTPOS=51000188;//user.TTok:188
        _this.update();
        //$LASTPOS=51000203;//user.TTok:203
        _this.sc=_this.sc-10;
        //$LASTPOS=51000218;//user.TTok:218
        Tonyu.globals.$score=Tonyu.globals.$score+10;
        
      }
      //$LASTPOS=51000240;//user.TTok:240
      Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
    },
    fiber$main :function _trc_TTok_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=51000040;//user.TTok:40
      _this.size=10;
      
      _thread.enter(function _trc_TTok_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000072;//user.TTok:72
          case 1:
            if (!(_this.y>_this.ey)) { __pc=3; break; }
            //$LASTPOS=51000092;//user.TTok:92
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=51000107;//user.TTok:107
            _this.y=_this.y-1;
            //$LASTPOS=51000119;//user.TTok:119
            _this.text=_this.sc;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=51000152;//user.TTok:152
          case 4:
            if (!(_this.sc>=10)) { __pc=6; break; }
            //$LASTPOS=51000174;//user.TTok:174
            _this.text=_this.sc;
            //$LASTPOS=51000188;//user.TTok:188
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=51000203;//user.TTok:203
            _this.sc=_this.sc-10;
            //$LASTPOS=51000218;//user.TTok:218
            Tonyu.globals.$score=Tonyu.globals.$score+10;
            __pc=4;break;
          case 6:
            
            //$LASTPOS=51000240;//user.TTok:240
            Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TTokSum',
  shortName: 'TTokSum',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.SpriteChar,
  includes: [],
  methods: {
    main :function _trc_TTokSum_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=52000107;//user.TTokSum:107
      while (1) {
        //$LASTPOS=52000124;//user.TTokSum:124
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
            //$LASTPOS=52000107;//user.TTokSum:107
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=52000124;//user.TTokSum:124
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
      
      //$LASTPOS=52000047;//user.TTokSum:47
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
      //$LASTPOS=52000067;//user.TTokSum:67
      _this.drawText(_this.x,_this.y,Tonyu.globals.$score,255*256,20);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
