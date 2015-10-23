Tonyu.klass.define({
  fullName: 'user.MediaPlayer',
  shortName: 'MediaPlayer',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MediaPlayer_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_MediaPlayer_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    play :function _trc_MediaPlayer_play() {
      "use strict";
      var _this=this;
      
    },
    fiber$play :function _trc_MediaPlayer_f_play(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    stop :function _trc_MediaPlayer_stop() {
      "use strict";
      var _this=this;
      
    },
    fiber$stop :function _trc_MediaPlayer_f_stop(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    playSE :function _trc_MediaPlayer_playSE() {
      "use strict";
      var _this=this;
      
    },
    setDelay :function _trc_MediaPlayer_setDelay() {
      "use strict";
      var _this=this;
      
    },
    fiber$setDelay :function _trc_MediaPlayer_f_setDelay(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    setVolume :function _trc_MediaPlayer_setVolume() {
      "use strict";
      var _this=this;
      
    },
    fiber$setVolume :function _trc_MediaPlayer_f_setVolume(_thread) {
      "use strict";
      var _this=this;
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000017;//user.Page_index:17
      _this.initGlobals();
      //$LASTPOS=1000033;//user.Page_index:33
      Tonyu.globals.$screenWidth=560;
      //$LASTPOS=1000052;//user.Page_index:52
      Tonyu.globals.$screenHeight=376;
      //$LASTPOS=1000072;//user.Page_index:72
      Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      //$LASTPOS=1000117;//user.Page_index:117
      Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
      //$LASTPOS=1000170;//user.Page_index:170
      Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
      //$LASTPOS=1000220;//user.Page_index:220
      Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
      //$LASTPOS=1000270;//user.Page_index:270
      Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
      //$LASTPOS=1000321;//user.Page_index:321
      Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
      //$LASTPOS=1000381;//user.Page_index:381
      Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
      //$LASTPOS=1000441;//user.Page_index:441
      Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
      //$LASTPOS=1000501;//user.Page_index:501
      Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
      //$LASTPOS=1000545;//user.Page_index:545
      Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({x: 382,y: 31});
      //$LASTPOS=1000583;//user.Page_index:583
      Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
      //$LASTPOS=1000626;//user.Page_index:626
      Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
      //$LASTPOS=1000695;//user.Page_index:695
      Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
      //$LASTPOS=1000725;//user.Page_index:725
      Tonyu.globals.$map.load("index.map");
    },
    fiber$main :function _trc_Page_index_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Page_index_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000017;//user.Page_index:17
            _this.fiber$initGlobals(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=1000033;//user.Page_index:33
            Tonyu.globals.$screenWidth=560;
            //$LASTPOS=1000052;//user.Page_index:52
            Tonyu.globals.$screenHeight=376;
            //$LASTPOS=1000072;//user.Page_index:72
            Tonyu.globals.$Screen.resize(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
            //$LASTPOS=1000117;//user.Page_index:117
            Tonyu.globals.$rocket=new Tonyu.classes.user.TRocket({p: Tonyu.globals.$pat_ufo+0,x: 134,y: 53});
            //$LASTPOS=1000170;//user.Page_index:170
            Tonyu.globals.$Jiki=new Tonyu.classes.user.TJiki({p: Tonyu.globals.$pat_ufo+1,x: 278,y: 357});
            //$LASTPOS=1000220;//user.Page_index:220
            Tonyu.globals.$Teki2=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 501,y: 202});
            //$LASTPOS=1000270;//user.Page_index:270
            Tonyu.globals.$_teki3=new Tonyu.classes.user.Teki({p: Tonyu.globals.$pat_ufo+3,x: 278,y: 228});
            //$LASTPOS=1000321;//user.Page_index:321
            Tonyu.globals.$Left1=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 3,x: 507,y: 27});
            //$LASTPOS=1000381;//user.Page_index:381
            Tonyu.globals.$Left2=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 2,x: 479,y: 27});
            //$LASTPOS=1000441;//user.Page_index:441
            Tonyu.globals.$Left3=new Tonyu.classes.user.TLeft({p: Tonyu.globals.$pat_ufo+1,aleft: 1,x: 451,y: 26});
            //$LASTPOS=1000501;//user.Page_index:501
            Tonyu.globals.$Tok=new Tonyu.classes.user.TTok({p: 0,sc: 0,x: 48,y: 20});
            //$LASTPOS=1000545;//user.Page_index:545
            Tonyu.globals.$TokSum=new Tonyu.classes.user.TTokSum({x: 382,y: 31});
            //$LASTPOS=1000583;//user.Page_index:583
            Tonyu.globals.$Teki10=new Tonyu.classes.user.Teki({p: 35,x: 123,y: 161});
            //$LASTPOS=1000626;//user.Page_index:626
            Tonyu.globals.$bomb=new Tonyu.classes.user.TBomb({p: Tonyu.globals.$pat_ufo+5,t: 0,x: 160.515609741211,y: 360});
            //$LASTPOS=1000695;//user.Page_index:695
            Tonyu.globals.$map=new Tonyu.classes.kernel.T1Map({zOrder: 1000});
            //$LASTPOS=1000725;//user.Page_index:725
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000023;//user.TBomb:23
      while (1) {
        //$LASTPOS=2000040;//user.TBomb:40
        _this.t=0;
        //$LASTPOS=2000078;//user.TBomb:78
        while (_this.t==0) {
          //$LASTPOS=2000101;//user.TBomb:101
          if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
            //$LASTPOS=2000125;//user.TBomb:125
            _this.t=1;
          }
          //$LASTPOS=2000139;//user.TBomb:139
          _this.update();
          
        }
        //$LASTPOS=2000161;//user.TBomb:161
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
        //$LASTPOS=2000199;//user.TBomb:199
        _this.tok=100;
        //$LASTPOS=2000236;//user.TBomb:236
        while (_this.y>- 150) {
          //$LASTPOS=2000261;//user.TBomb:261
          _this.y=_this.y-10;
          //$LASTPOS=2000304;//user.TBomb:304
          if (_this.getkey(37)) {
            //$LASTPOS=2000320;//user.TBomb:320
            if (_this.x>10) {
              //$LASTPOS=2000330;//user.TBomb:330
              _this.x=_this.x-2;
            }
          }
          //$LASTPOS=2000346;//user.TBomb:346
          if (_this.getkey(39)) {
            //$LASTPOS=2000362;//user.TBomb:362
            if (_this.x<500) {
              //$LASTPOS=2000373;//user.TBomb:373
              _this.x=_this.x+2;
            }
          }
          //$LASTPOS=2000389;//user.TBomb:389
          _this.update();
          
        }
        //$LASTPOS=2000443;//user.TBomb:443
        _this.x=_this.rnd()*300+100;
        //$LASTPOS=2000465;//user.TBomb:465
        _this.y=360;
        
      }
    },
    fiber$main :function _trc_TBomb_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TBomb_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000023;//user.TBomb:23
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=2000040;//user.TBomb:40
            _this.t=0;
            //$LASTPOS=2000078;//user.TBomb:78
          case 2:
            if (!(_this.t==0)) { __pc=4; break; }
            //$LASTPOS=2000101;//user.TBomb:101
            if (_this.crashTo(Tonyu.globals.$Jiki,0,0)) {
              //$LASTPOS=2000125;//user.TBomb:125
              _this.t=1;
            }
            //$LASTPOS=2000139;//user.TBomb:139
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=2000161;//user.TBomb:161
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_launch);
            //$LASTPOS=2000199;//user.TBomb:199
            _this.tok=100;
            //$LASTPOS=2000236;//user.TBomb:236
          case 5:
            if (!(_this.y>- 150)) { __pc=7; break; }
            //$LASTPOS=2000261;//user.TBomb:261
            _this.y=_this.y-10;
            //$LASTPOS=2000304;//user.TBomb:304
            if (_this.getkey(37)) {
              //$LASTPOS=2000320;//user.TBomb:320
              if (_this.x>10) {
                //$LASTPOS=2000330;//user.TBomb:330
                _this.x=_this.x-2;
              }
            }
            //$LASTPOS=2000346;//user.TBomb:346
            if (_this.getkey(39)) {
              //$LASTPOS=2000362;//user.TBomb:362
              if (_this.x<500) {
                //$LASTPOS=2000373;//user.TBomb:373
                _this.x=_this.x+2;
              }
            }
            //$LASTPOS=2000389;//user.TBomb:389
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=2000443;//user.TBomb:443
            _this.x=_this.rnd()*300+100;
            //$LASTPOS=2000465;//user.TBomb:465
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000504;//user.Teki:504
      _this.vx=_this.vy=0;
      //$LASTPOS=3000514;//user.Teki:514
      _this.tx=_this.x;
      //$LASTPOS=3000519;//user.Teki:519
      _this.ty=_this.y;
      //$LASTPOS=3000526;//user.Teki:526
      while (1) {
        //$LASTPOS=3000542;//user.Teki:542
        _this.c=0;
        //$LASTPOS=3000588;//user.Teki:588
        if (_this.tx>_this.x) {
          //$LASTPOS=3000598;//user.Teki:598
          _this.vx=2;
        }
        //$LASTPOS=3000609;//user.Teki:609
        if (_this.ty>_this.y) {
          //$LASTPOS=3000619;//user.Teki:619
          _this.vy=2;
        }
        //$LASTPOS=3000630;//user.Teki:630
        if (_this.tx<_this.x) {
          //$LASTPOS=3000640;//user.Teki:640
          _this.vx=- 2;
        }
        //$LASTPOS=3000652;//user.Teki:652
        if (_this.ty<_this.y) {
          //$LASTPOS=3000662;//user.Teki:662
          _this.vy=- 2;
        }
        //$LASTPOS=3000688;//user.Teki:688
        _this.w=_this.rnd()*10;
        //$LASTPOS=3000705;//user.Teki:705
        while (_this.c<_this.w) {
          //$LASTPOS=3000726;//user.Teki:726
          _this.x=_this.x+_this.vx;
          //$LASTPOS=3000743;//user.Teki:743
          _this.y=_this.y+_this.vy;
          //$LASTPOS=3000760;//user.Teki:760
          _this.update();
          //$LASTPOS=3000779;//user.Teki:779
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=3000798;//user.Teki:798
        _this.c=0;
        //$LASTPOS=3000808;//user.Teki:808
        _this.p=_this.p+1;
        //$LASTPOS=3000845;//user.Teki:845
        if (_this.rnd()*20<1) {
          //$LASTPOS=3000872;//user.Teki:872
          _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
          //$LASTPOS=3000903;//user.Teki:903
          _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
          
        }
        //$LASTPOS=3000957;//user.Teki:957
        _this.w=_this.rnd()*20+10;
        //$LASTPOS=3000977;//user.Teki:977
        while (_this.c<_this.w) {
          //$LASTPOS=3001000;//user.Teki:1000
          _this.update();
          //$LASTPOS=3001019;//user.Teki:1019
          _this.c=_this.c+1;
          
        }
        //$LASTPOS=3001038;//user.Teki:1038
        _this.p=_this.p-1;
        
      }
    },
    fiber$main :function _trc_Teki_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000504;//user.Teki:504
      _this.vx=_this.vy=0;
      //$LASTPOS=3000514;//user.Teki:514
      _this.tx=_this.x;
      //$LASTPOS=3000519;//user.Teki:519
      _this.ty=_this.y;
      
      _thread.enter(function _trc_Teki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000526;//user.Teki:526
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=3000542;//user.Teki:542
            _this.c=0;
            //$LASTPOS=3000588;//user.Teki:588
            if (_this.tx>_this.x) {
              //$LASTPOS=3000598;//user.Teki:598
              _this.vx=2;
            }
            //$LASTPOS=3000609;//user.Teki:609
            if (_this.ty>_this.y) {
              //$LASTPOS=3000619;//user.Teki:619
              _this.vy=2;
            }
            //$LASTPOS=3000630;//user.Teki:630
            if (_this.tx<_this.x) {
              //$LASTPOS=3000640;//user.Teki:640
              _this.vx=- 2;
            }
            //$LASTPOS=3000652;//user.Teki:652
            if (_this.ty<_this.y) {
              //$LASTPOS=3000662;//user.Teki:662
              _this.vy=- 2;
            }
            //$LASTPOS=3000688;//user.Teki:688
            _this.w=_this.rnd()*10;
            //$LASTPOS=3000705;//user.Teki:705
          case 2:
            if (!(_this.c<_this.w)) { __pc=4; break; }
            //$LASTPOS=3000726;//user.Teki:726
            _this.x=_this.x+_this.vx;
            //$LASTPOS=3000743;//user.Teki:743
            _this.y=_this.y+_this.vy;
            //$LASTPOS=3000760;//user.Teki:760
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=3000779;//user.Teki:779
            _this.c=_this.c+1;
            __pc=2;break;
          case 4:
            
            //$LASTPOS=3000798;//user.Teki:798
            _this.c=0;
            //$LASTPOS=3000808;//user.Teki:808
            _this.p=_this.p+1;
            //$LASTPOS=3000845;//user.Teki:845
            if (_this.rnd()*20<1) {
              //$LASTPOS=3000872;//user.Teki:872
              _this.tx=_this.rnd(Tonyu.globals.$screenWidth);
              //$LASTPOS=3000903;//user.Teki:903
              _this.ty=_this.rnd(Tonyu.globals.$screenHeight-50)+50;
              
            }
            //$LASTPOS=3000957;//user.Teki:957
            _this.w=_this.rnd()*20+10;
            //$LASTPOS=3000977;//user.Teki:977
          case 5:
            if (!(_this.c<_this.w)) { __pc=7; break; }
            //$LASTPOS=3001000;//user.Teki:1000
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=3001019;//user.Teki:1019
            _this.c=_this.c+1;
            __pc=5;break;
          case 7:
            
            //$LASTPOS=3001038;//user.Teki:1038
            _this.p=_this.p-1;
            __pc=1;break;
          case 8:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onUpdate :function _trc_Teki_onUpdate() {
      "use strict";
      var _this=this;
      var nto;
      
      //$LASTPOS=3000052;//user.Teki:52
      nto;
      //$LASTPOS=3000091;//user.Teki:91
      if (_this.crashTo(Tonyu.globals.$Jiki)) {
        //$LASTPOS=3000123;//user.Teki:123
        Tonyu.globals.$Jiki.dying=1;
        
      }
      //$LASTPOS=3000150;//user.Teki:150
      if (Tonyu.globals.$bomb.t==1) {
        //$LASTPOS=3000210;//user.Teki:210
        if (_this.crashTo(Tonyu.globals.$bomb)) {
          //$LASTPOS=3000246;//user.Teki:246
          Tonyu.globals.$mplayer.play(Tonyu.globals.$se_pon);
          //$LASTPOS=3000307;//user.Teki:307
          nto=new Tonyu.classes.user.TTok(_this.x,_this.y,0,0);
          //$LASTPOS=3000343;//user.Teki:343
          nto.sc=Tonyu.globals.$bomb.tok;
          //$LASTPOS=3000374;//user.Teki:374
          _this.appear(nto);
          //$LASTPOS=3000435;//user.Teki:435
          Tonyu.globals.$bomb.tok=Tonyu.globals.$bomb.tok+100;
          //$LASTPOS=3000473;//user.Teki:473
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000023;//user.TJiki:23
      _this.an=0;
      //$LASTPOS=4000046;//user.TJiki:46
      while (1) {
        //$LASTPOS=4000062;//user.TJiki:62
        _this.dying=0;
        //$LASTPOS=4000100;//user.TJiki:100
        while (! _this.dying) {
          //$LASTPOS=4000143;//user.TJiki:143
          if (_this.getkey(37)&&_this.x>10) {
            //$LASTPOS=4000167;//user.TJiki:167
            _this.x=_this.x-1;
          }
          //$LASTPOS=4000200;//user.TJiki:200
          if (_this.getkey(39)&&_this.x<500) {
            //$LASTPOS=4000225;//user.TJiki:225
            _this.x=_this.x+1;
          }
          //$LASTPOS=4000257;//user.TJiki:257
          if (_this.getkey(40)) {
            //$LASTPOS=4000273;//user.TJiki:273
            _this.y=_this.y+2;
          }
          //$LASTPOS=4000309;//user.TJiki:309
          _this.y=_this.y+1;
          //$LASTPOS=4000374;//user.TJiki:374
          _this.an+=0.05;
          //$LASTPOS=4000383;//user.TJiki:383
          if (_this.an>=4) {
            //$LASTPOS=4000394;//user.TJiki:394
            _this.an=0;
          }
          //$LASTPOS=4000484;//user.TJiki:484
          if (_this.trunc(_this.an)==0) {
            //$LASTPOS=4000517;//user.TJiki:517
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=4000544;//user.TJiki:544
            _this.f=0;
            
          }
          //$LASTPOS=4000570;//user.TJiki:570
          if (_this.trunc(_this.an)==1) {
            //$LASTPOS=4000603;//user.TJiki:603
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=4000630;//user.TJiki:630
            _this.f=0;
            
          }
          //$LASTPOS=4000655;//user.TJiki:655
          if (_this.trunc(_this.an)==2) {
            //$LASTPOS=4000688;//user.TJiki:688
            _this.p=Tonyu.globals.$pat_ufo+1;
            //$LASTPOS=4000715;//user.TJiki:715
            _this.f=1;
            
          }
          //$LASTPOS=4000740;//user.TJiki:740
          if (_this.trunc(_this.an)==3) {
            //$LASTPOS=4000773;//user.TJiki:773
            _this.p=Tonyu.globals.$pat_ufo+2;
            //$LASTPOS=4000800;//user.TJiki:800
            _this.f=0;
            
          }
          //$LASTPOS=4000825;//user.TJiki:825
          _this.update();
          
        }
        //$LASTPOS=4000936;//user.TJiki:936
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
        //$LASTPOS=4000965;//user.TJiki:965
        while (_this.dying) {
          //$LASTPOS=4000990;//user.TJiki:990
          _this.y=_this.y+4;
          //$LASTPOS=4001006;//user.TJiki:1006
          _this.update();
          
        }
        
      }
    },
    fiber$main :function _trc_TJiki_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000023;//user.TJiki:23
      _this.an=0;
      
      _thread.enter(function _trc_TJiki_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000046;//user.TJiki:46
          case 1:
            if (!(1)) { __pc=8; break; }
            //$LASTPOS=4000062;//user.TJiki:62
            _this.dying=0;
            //$LASTPOS=4000100;//user.TJiki:100
          case 2:
            if (!(! _this.dying)) { __pc=4; break; }
            //$LASTPOS=4000143;//user.TJiki:143
            if (_this.getkey(37)&&_this.x>10) {
              //$LASTPOS=4000167;//user.TJiki:167
              _this.x=_this.x-1;
            }
            //$LASTPOS=4000200;//user.TJiki:200
            if (_this.getkey(39)&&_this.x<500) {
              //$LASTPOS=4000225;//user.TJiki:225
              _this.x=_this.x+1;
            }
            //$LASTPOS=4000257;//user.TJiki:257
            if (_this.getkey(40)) {
              //$LASTPOS=4000273;//user.TJiki:273
              _this.y=_this.y+2;
            }
            //$LASTPOS=4000309;//user.TJiki:309
            _this.y=_this.y+1;
            //$LASTPOS=4000374;//user.TJiki:374
            _this.an+=0.05;
            //$LASTPOS=4000383;//user.TJiki:383
            if (_this.an>=4) {
              //$LASTPOS=4000394;//user.TJiki:394
              _this.an=0;
            }
            //$LASTPOS=4000484;//user.TJiki:484
            if (_this.trunc(_this.an)==0) {
              //$LASTPOS=4000517;//user.TJiki:517
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=4000544;//user.TJiki:544
              _this.f=0;
              
            }
            //$LASTPOS=4000570;//user.TJiki:570
            if (_this.trunc(_this.an)==1) {
              //$LASTPOS=4000603;//user.TJiki:603
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=4000630;//user.TJiki:630
              _this.f=0;
              
            }
            //$LASTPOS=4000655;//user.TJiki:655
            if (_this.trunc(_this.an)==2) {
              //$LASTPOS=4000688;//user.TJiki:688
              _this.p=Tonyu.globals.$pat_ufo+1;
              //$LASTPOS=4000715;//user.TJiki:715
              _this.f=1;
              
            }
            //$LASTPOS=4000740;//user.TJiki:740
            if (_this.trunc(_this.an)==3) {
              //$LASTPOS=4000773;//user.TJiki:773
              _this.p=Tonyu.globals.$pat_ufo+2;
              //$LASTPOS=4000800;//user.TJiki:800
              _this.f=0;
              
            }
            //$LASTPOS=4000825;//user.TJiki:825
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=4000936;//user.TJiki:936
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_die);
            //$LASTPOS=4000965;//user.TJiki:965
          case 5:
            if (!(_this.dying)) { __pc=7; break; }
            //$LASTPOS=4000990;//user.TJiki:990
            _this.y=_this.y+4;
            //$LASTPOS=4001006;//user.TJiki:1006
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=5000095;//user.TLeft:95
      while (1) {
        //$LASTPOS=5000110;//user.TLeft:110
        _this.update();
        //$LASTPOS=5000125;//user.TLeft:125
        if (Tonyu.globals.$Left<_this.aleft) {
          //$LASTPOS=5000142;//user.TLeft:142
          _this.setVisible(0);
        }
        
      }
    },
    fiber$main :function _trc_TLeft_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TLeft_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000095;//user.TLeft:95
          case 1:
            if (!(1)) { __pc=5; break; }
            //$LASTPOS=5000110;//user.TLeft:110
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=5000125;//user.TLeft:125
            if (!(Tonyu.globals.$Left<_this.aleft)) { __pc=4; break; }
            //$LASTPOS=5000142;//user.TLeft:142
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=6000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=6000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=6000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=6000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=6000128;//user.TRocket:128
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      //$LASTPOS=6000182;//user.TRocket:182
      while (Tonyu.globals.$Left>=0) {
        //$LASTPOS=6000206;//user.TRocket:206
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
        //$LASTPOS=6000269;//user.TRocket:269
        while (_this.getkey(32)==0) {
          //$LASTPOS=6000302;//user.TRocket:302
          _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
          //$LASTPOS=6000368;//user.TRocket:368
          Tonyu.globals.$Jiki.y=- 50;
          //$LASTPOS=6000436;//user.TRocket:436
          if (_this.x>Tonyu.globals.$screenWidth/2) {
            //$LASTPOS=6000458;//user.TRocket:458
            _this.vx=_this.vx-1;
          } else {
            //$LASTPOS=6000481;//user.TRocket:481
            _this.vx=_this.vx+1;
          }
          //$LASTPOS=6000499;//user.TRocket:499
          _this.x=_this.x+_this.vx;
          //$LASTPOS=6000516;//user.TRocket:516
          _this.update();
          //$LASTPOS=6000535;//user.TRocket:535
          _this.f=(_this.vx<0);
          
        }
        //$LASTPOS=6000583;//user.TRocket:583
        Tonyu.globals.$Jiki.x=_this.x;
        //$LASTPOS=6000599;//user.TRocket:599
        Tonyu.globals.$Jiki.y=_this.y;
        //$LASTPOS=6000616;//user.TRocket:616
        Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
        //$LASTPOS=6000668;//user.TRocket:668
        while (Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight) {
          //$LASTPOS=6000699;//user.TRocket:699
          _this.update();
          
        }
        //$LASTPOS=6000715;//user.TRocket:715
        if (Tonyu.globals.$Jiki.dying) {
          //$LASTPOS=6000772;//user.TRocket:772
          Tonyu.globals.$Left=Tonyu.globals.$Left-1;
          //$LASTPOS=6000824;//user.TRocket:824
          Tonyu.globals.$Jiki.dying=0;
          
        } else {
          //$LASTPOS=6000912;//user.TRocket:912
          _this.appear(new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
          //$LASTPOS=6001018;//user.TRocket:1018
          _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
          //$LASTPOS=6001089;//user.TRocket:1089
          _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
          //$LASTPOS=6001181;//user.TRocket:1181
          _this.appear(_this.nto);
          
        }
        
      }
      //$LASTPOS=6001219;//user.TRocket:1219
      while (1) {
        //$LASTPOS=6001235;//user.TRocket:1235
        _this.y=_this.y+10;
        //$LASTPOS=6001264;//user.TRocket:1264
        _this.drawText(221,166,"Game Over",_this.rnd()*65536,20);
        //$LASTPOS=6001315;//user.TRocket:1315
        _this.drawText(221,190,"Replay F9 ",_this.rnd()*65536,20);
        //$LASTPOS=6001367;//user.TRocket:1367
        _this.update();
        
      }
    },
    fiber$main :function _trc_TRocket_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000023;//user.TRocket:23
      Tonyu.globals.$score=0;
      //$LASTPOS=6000044;//user.TRocket:44
      Tonyu.globals.$Left=3;
      //$LASTPOS=6000064;//user.TRocket:64
      _this.vx=0;
      //$LASTPOS=6000087;//user.TRocket:87
      Tonyu.globals.$map.setBGColor(Tonyu.globals.$clBlack);
      //$LASTPOS=6000128;//user.TRocket:128
      Tonyu.globals.$mplayer.play(Tonyu.globals.$se_bgm);
      
      _thread.enter(function _trc_TRocket_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000182;//user.TRocket:182
          case 1:
            if (!(Tonyu.globals.$Left>=0)) { __pc=12; break; }
            //$LASTPOS=6000206;//user.TRocket:206
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_rocket);
            //$LASTPOS=6000269;//user.TRocket:269
          case 2:
            if (!(_this.getkey(32)==0)) { __pc=4; break; }
            //$LASTPOS=6000302;//user.TRocket:302
            _this.drawText(153,173,"Push Space key",_this.color(30,150,220),20);
            //$LASTPOS=6000368;//user.TRocket:368
            Tonyu.globals.$Jiki.y=- 50;
            //$LASTPOS=6000436;//user.TRocket:436
            if (_this.x>Tonyu.globals.$screenWidth/2) {
              //$LASTPOS=6000458;//user.TRocket:458
              _this.vx=_this.vx-1;
            } else {
              //$LASTPOS=6000481;//user.TRocket:481
              _this.vx=_this.vx+1;
            }
            //$LASTPOS=6000499;//user.TRocket:499
            _this.x=_this.x+_this.vx;
            //$LASTPOS=6000516;//user.TRocket:516
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=6000535;//user.TRocket:535
            _this.f=(_this.vx<0);
            __pc=2;break;
          case 4:
            
            //$LASTPOS=6000583;//user.TRocket:583
            Tonyu.globals.$Jiki.x=_this.x;
            //$LASTPOS=6000599;//user.TRocket:599
            Tonyu.globals.$Jiki.y=_this.y;
            //$LASTPOS=6000616;//user.TRocket:616
            Tonyu.globals.$mplayer.play(Tonyu.globals.$se_go);
            //$LASTPOS=6000668;//user.TRocket:668
          case 5:
            if (!(Tonyu.globals.$Jiki.y<Tonyu.globals.$screenHeight)) { __pc=7; break; }
            //$LASTPOS=6000699;//user.TRocket:699
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=5;break;
          case 7:
            
            //$LASTPOS=6000715;//user.TRocket:715
            if (!(Tonyu.globals.$Jiki.dying)) { __pc=8; break; }
            {
              //$LASTPOS=6000772;//user.TRocket:772
              Tonyu.globals.$Left=Tonyu.globals.$Left-1;
              //$LASTPOS=6000824;//user.TRocket:824
              Tonyu.globals.$Jiki.dying=0;
            }
            __pc=11;break;
          case 8:
            //$LASTPOS=6000912;//user.TRocket:912
            _this.fiber$appear(_thread, new Tonyu.classes.user.Teki(Tonyu.globals.$Jiki.x,_this.rnd(Tonyu.globals.$screenHeight-100)+100,Tonyu.globals.$pat_ufo+3,0));
            __pc=9;return;
          case 9:
            
            //$LASTPOS=6001018;//user.TRocket:1018
            _this.nto=new Tonyu.classes.user.TTok(Tonyu.globals.$Jiki.x,Tonyu.globals.$Jiki.y,0,0);
            //$LASTPOS=6001089;//user.TRocket:1089
            _this.nto.sc=Tonyu.globals.$screenWidth/2-_this.abs(Tonyu.globals.$Jiki.x-Tonyu.globals.$screenWidth/2)+50;
            //$LASTPOS=6001181;//user.TRocket:1181
            _this.fiber$appear(_thread, _this.nto);
            __pc=10;return;
          case 10:
            
          case 11:
            
            __pc=1;break;
          case 12:
            
            //$LASTPOS=6001219;//user.TRocket:1219
          case 13:
            if (!(1)) { __pc=15; break; }
            //$LASTPOS=6001235;//user.TRocket:1235
            _this.y=_this.y+10;
            //$LASTPOS=6001264;//user.TRocket:1264
            _this.drawText(221,166,"Game Over",_this.rnd()*65536,20);
            //$LASTPOS=6001315;//user.TRocket:1315
            _this.drawText(221,190,"Replay F9 ",_this.rnd()*65536,20);
            //$LASTPOS=6001367;//user.TRocket:1367
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=7000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=7000040;//user.TTok:40
      _this.size=10;
      //$LASTPOS=7000072;//user.TTok:72
      while (_this.y>_this.ey) {
        //$LASTPOS=7000092;//user.TTok:92
        _this.update();
        //$LASTPOS=7000107;//user.TTok:107
        _this.y=_this.y-1;
        //$LASTPOS=7000119;//user.TTok:119
        _this.text=_this.sc;
        
      }
      //$LASTPOS=7000152;//user.TTok:152
      while (_this.sc>=10) {
        //$LASTPOS=7000174;//user.TTok:174
        _this.text=_this.sc;
        //$LASTPOS=7000188;//user.TTok:188
        _this.update();
        //$LASTPOS=7000203;//user.TTok:203
        _this.sc=_this.sc-10;
        //$LASTPOS=7000218;//user.TTok:218
        Tonyu.globals.$score=Tonyu.globals.$score+10;
        
      }
      //$LASTPOS=7000240;//user.TTok:240
      Tonyu.globals.$score=Tonyu.globals.$score+_this.sc;
    },
    fiber$main :function _trc_TTok_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000030;//user.TTok:30
      _this.ey=_this.y-50;
      //$LASTPOS=7000040;//user.TTok:40
      _this.size=10;
      
      _thread.enter(function _trc_TTok_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000072;//user.TTok:72
          case 1:
            if (!(_this.y>_this.ey)) { __pc=3; break; }
            //$LASTPOS=7000092;//user.TTok:92
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=7000107;//user.TTok:107
            _this.y=_this.y-1;
            //$LASTPOS=7000119;//user.TTok:119
            _this.text=_this.sc;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=7000152;//user.TTok:152
          case 4:
            if (!(_this.sc>=10)) { __pc=6; break; }
            //$LASTPOS=7000174;//user.TTok:174
            _this.text=_this.sc;
            //$LASTPOS=7000188;//user.TTok:188
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=7000203;//user.TTok:203
            _this.sc=_this.sc-10;
            //$LASTPOS=7000218;//user.TTok:218
            Tonyu.globals.$score=Tonyu.globals.$score+10;
            __pc=4;break;
          case 6:
            
            //$LASTPOS=7000240;//user.TTok:240
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000068;//user.TTokSum:68
      while (1) {
        //$LASTPOS=8000085;//user.TTokSum:85
        _this.update();
        //$LASTPOS=8000100;//user.TTokSum:100
        _this.drawText(_this.x,_this.y,Tonyu.globals.$score,_this.color(255,255,255),20);
        
      }
    },
    fiber$main :function _trc_TTokSum_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_TTokSum_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000068;//user.TTokSum:68
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=8000085;//user.TTokSum:85
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=8000100;//user.TTokSum:100
            _this.drawText(_this.x,_this.y,Tonyu.globals.$score,_this.color(255,255,255),20);
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_TTokSum_draw(c) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=8000047;//user.TTokSum:47
      Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
