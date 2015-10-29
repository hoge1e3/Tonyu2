Tonyu.klass.define({
  fullName: 'user.Bounce',
  shortName: 'Bounce',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bounce_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Bounce:0
      _this.x=_this.rnd(Tonyu.globals.$screenWidth);
      //$LASTPOS=1000021;//user.Bounce:21
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      //$LASTPOS=1000043;//user.Bounce:43
      _this.vx=_this.spd();
      //$LASTPOS=1000053;//user.Bounce:53
      _this.vy=_this.spd();
      //$LASTPOS=1000063;//user.Bounce:63
      while (true) {
        //$LASTPOS=1000082;//user.Bounce:82
        _this.x+=_this.vx;
        //$LASTPOS=1000093;//user.Bounce:93
        _this.y+=_this.vy;
        //$LASTPOS=1000104;//user.Bounce:104
        if (_this.x<0) {
          //$LASTPOS=1000123;//user.Bounce:123
          _this.x=0;
          //$LASTPOS=1000136;//user.Bounce:136
          _this.vx=_this.spd();
          
        }
        //$LASTPOS=1000156;//user.Bounce:156
        if (_this.y<0) {
          //$LASTPOS=1000175;//user.Bounce:175
          _this.y=0;
          //$LASTPOS=1000188;//user.Bounce:188
          _this.vy=_this.spd();
          
        }
        //$LASTPOS=1000208;//user.Bounce:208
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=1000238;//user.Bounce:238
          _this.x=Tonyu.globals.$screenWidth;
          //$LASTPOS=1000262;//user.Bounce:262
          _this.vx=- _this.spd();
          
        }
        //$LASTPOS=1000283;//user.Bounce:283
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=1000314;//user.Bounce:314
          _this.y=Tonyu.globals.$screenHeight;
          //$LASTPOS=1000339;//user.Bounce:339
          _this.vy=- _this.spd();
          
        }
        //$LASTPOS=1000360;//user.Bounce:360
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bounce_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Bounce:0
      _this.x=_this.rnd(Tonyu.globals.$screenWidth);
      //$LASTPOS=1000021;//user.Bounce:21
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      
      _thread.enter(function _trc_Bounce_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000043;//user.Bounce:43
            _this.fiber$spd(_thread);
            __pc=1;return;
          case 1:
            _this.vx=_thread.retVal;
            
            //$LASTPOS=1000053;//user.Bounce:53
            _this.fiber$spd(_thread);
            __pc=2;return;
          case 2:
            _this.vy=_thread.retVal;
            
            //$LASTPOS=1000063;//user.Bounce:63
          case 3:
            //$LASTPOS=1000082;//user.Bounce:82
            _this.x+=_this.vx;
            //$LASTPOS=1000093;//user.Bounce:93
            _this.y+=_this.vy;
            //$LASTPOS=1000104;//user.Bounce:104
            if (!(_this.x<0)) { __pc=5; break; }
            //$LASTPOS=1000123;//user.Bounce:123
            _this.x=0;
            //$LASTPOS=1000136;//user.Bounce:136
            _this.fiber$spd(_thread);
            __pc=4;return;
          case 4:
            _this.vx=_thread.retVal;
            
          case 5:
            
            //$LASTPOS=1000156;//user.Bounce:156
            if (!(_this.y<0)) { __pc=7; break; }
            //$LASTPOS=1000175;//user.Bounce:175
            _this.y=0;
            //$LASTPOS=1000188;//user.Bounce:188
            _this.fiber$spd(_thread);
            __pc=6;return;
          case 6:
            _this.vy=_thread.retVal;
            
          case 7:
            
            //$LASTPOS=1000208;//user.Bounce:208
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=1000238;//user.Bounce:238
              _this.x=Tonyu.globals.$screenWidth;
              //$LASTPOS=1000262;//user.Bounce:262
              _this.vx=- _this.spd();
              
            }
            //$LASTPOS=1000283;//user.Bounce:283
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=1000314;//user.Bounce:314
              _this.y=Tonyu.globals.$screenHeight;
              //$LASTPOS=1000339;//user.Bounce:339
              _this.vy=- _this.spd();
              
            }
            //$LASTPOS=1000360;//user.Bounce:360
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=3;break;
          case 9:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    spd :function _trc_Bounce_spd() {
      "use strict";
      var _this=this;
      
      return _this.rnd()*10;
    },
    fiber$spd :function _trc_Bounce_f_spd(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.rnd()*10;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"spd":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000000;//user.Main:0
      //$LASTPOS=2000005;//user.Main:5
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=2000027;//user.Main:27
          new Tonyu.classes.user.Bounce();
        }
        _this.i++;
      }
      //$LASTPOS=2000043;//user.Main:43
      _this.text="↑ Portrait   → Landscape";
      //$LASTPOS=2000076;//user.Main:76
      _this.size=20;
      //$LASTPOS=2000085;//user.Main:85
      while (true) {
        //$LASTPOS=2000104;//user.Main:104
        _this.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=2000126;//user.Main:126
        _this.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=2000149;//user.Main:149
        if (_this.getkey("right")==1) {
          //$LASTPOS=2000211;//user.Main:211
          Tonyu.globals.$Screen.resize(400,300);
          
        }
        //$LASTPOS=2000246;//user.Main:246
        if (_this.getkey("up")==1) {
          //$LASTPOS=2000305;//user.Main:305
          Tonyu.globals.$Screen.resize(300,400);
          
        }
        //$LASTPOS=2000340;//user.Main:340
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Main:0
      //$LASTPOS=2000005;//user.Main:5
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=2000027;//user.Main:27
          new Tonyu.classes.user.Bounce();
        }
        _this.i++;
      }
      //$LASTPOS=2000043;//user.Main:43
      _this.text="↑ Portrait   → Landscape";
      //$LASTPOS=2000076;//user.Main:76
      _this.size=20;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000085;//user.Main:85
          case 1:
            //$LASTPOS=2000104;//user.Main:104
            _this.x=Tonyu.globals.$screenWidth/2;
            //$LASTPOS=2000126;//user.Main:126
            _this.y=Tonyu.globals.$screenHeight/2;
            //$LASTPOS=2000149;//user.Main:149
            if (_this.getkey("right")==1) {
              //$LASTPOS=2000211;//user.Main:211
              Tonyu.globals.$Screen.resize(400,300);
              
            }
            //$LASTPOS=2000246;//user.Main:246
            if (_this.getkey("up")==1) {
              //$LASTPOS=2000305;//user.Main:305
              Tonyu.globals.$Screen.resize(300,400);
              
            }
            //$LASTPOS=2000340;//user.Main:340
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
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
