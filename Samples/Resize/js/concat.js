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
      //$LASTPOS=1000022;//user.Bounce:22
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      //$LASTPOS=1000045;//user.Bounce:45
      _this.vx=_this.spd();
      //$LASTPOS=1000056;//user.Bounce:56
      _this.vy=_this.spd();
      //$LASTPOS=1000067;//user.Bounce:67
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000087;//user.Bounce:87
        _this.x+=_this.vx;
        //$LASTPOS=1000099;//user.Bounce:99
        _this.y+=_this.vy;
        //$LASTPOS=1000111;//user.Bounce:111
        if (_this.x<0) {
          //$LASTPOS=1000131;//user.Bounce:131
          _this.x=0;
          //$LASTPOS=1000145;//user.Bounce:145
          _this.vx=_this.spd();
          
        }
        //$LASTPOS=1000167;//user.Bounce:167
        if (_this.y<0) {
          //$LASTPOS=1000187;//user.Bounce:187
          _this.y=0;
          //$LASTPOS=1000201;//user.Bounce:201
          _this.vy=_this.spd();
          
        }
        //$LASTPOS=1000223;//user.Bounce:223
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=1000254;//user.Bounce:254
          _this.x=Tonyu.globals.$screenWidth;
          //$LASTPOS=1000279;//user.Bounce:279
          _this.vx=- _this.spd();
          
        }
        //$LASTPOS=1000302;//user.Bounce:302
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=1000334;//user.Bounce:334
          _this.y=Tonyu.globals.$screenHeight;
          //$LASTPOS=1000360;//user.Bounce:360
          _this.vy=- _this.spd();
          
        }
        //$LASTPOS=1000383;//user.Bounce:383
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
      //$LASTPOS=1000022;//user.Bounce:22
      _this.y=_this.rnd(Tonyu.globals.$screenHeight);
      
      _thread.enter(function _trc_Bounce_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000045;//user.Bounce:45
            _this.fiber$spd(_thread);
            __pc=1;return;
          case 1:
            _this.vx=_thread.retVal;
            
            //$LASTPOS=1000056;//user.Bounce:56
            _this.fiber$spd(_thread);
            __pc=2;return;
          case 2:
            _this.vy=_thread.retVal;
            
            //$LASTPOS=1000067;//user.Bounce:67
          case 3:
            //$LASTPOS=1000087;//user.Bounce:87
            _this.x+=_this.vx;
            //$LASTPOS=1000099;//user.Bounce:99
            _this.y+=_this.vy;
            //$LASTPOS=1000111;//user.Bounce:111
            if (!(_this.x<0)) { __pc=5     ; break; }
            //$LASTPOS=1000131;//user.Bounce:131
            _this.x=0;
            //$LASTPOS=1000145;//user.Bounce:145
            _this.fiber$spd(_thread);
            __pc=4;return;
          case 4:
            _this.vx=_thread.retVal;
            
          case 5     :
            
            //$LASTPOS=1000167;//user.Bounce:167
            if (!(_this.y<0)) { __pc=7     ; break; }
            //$LASTPOS=1000187;//user.Bounce:187
            _this.y=0;
            //$LASTPOS=1000201;//user.Bounce:201
            _this.fiber$spd(_thread);
            __pc=6;return;
          case 6:
            _this.vy=_thread.retVal;
            
          case 7     :
            
            //$LASTPOS=1000223;//user.Bounce:223
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=1000254;//user.Bounce:254
              _this.x=Tonyu.globals.$screenWidth;
              //$LASTPOS=1000279;//user.Bounce:279
              _this.vx=- _this.spd();
              
            }
            //$LASTPOS=1000302;//user.Bounce:302
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=1000334;//user.Bounce:334
              _this.y=Tonyu.globals.$screenHeight;
              //$LASTPOS=1000360;//user.Bounce:360
              _this.vy=- _this.spd();
              
            }
            //$LASTPOS=1000383;//user.Bounce:383
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            __pc=3;break;
          case 9     :
            
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
  decls: {"methods":{"main":{"nowait":false},"spd":{"nowait":false}},"fields":{"vx":{},"vy":{}}}
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
      _this.i=0;for (; _this.i<20 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=2000028;//user.Main:28
          new Tonyu.classes.user.Bounce();
        }
      }
      //$LASTPOS=2000046;//user.Main:46
      _this.text="↑ Portrait   → Landscape";
      //$LASTPOS=2000080;//user.Main:80
      _this.size=20;
      //$LASTPOS=2000090;//user.Main:90
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000110;//user.Main:110
        _this.x=Tonyu.globals.$screenWidth/2;
        //$LASTPOS=2000133;//user.Main:133
        _this.y=Tonyu.globals.$screenHeight/2;
        //$LASTPOS=2000157;//user.Main:157
        if (_this.getkey("right")==1) {
          //$LASTPOS=2000221;//user.Main:221
          Tonyu.globals.$Screen.resize(400,300);
          //$LASTPOS=2000255;//user.Main:255
          _this.print("Landscape");
          
        }
        //$LASTPOS=2000287;//user.Main:287
        if (_this.getkey("up")==1) {
          //$LASTPOS=2000348;//user.Main:348
          Tonyu.globals.$Screen.resize(300,400);
          //$LASTPOS=2000382;//user.Main:382
          _this.print("Portrait");
          
        }
        //$LASTPOS=2000413;//user.Main:413
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
      _this.i=0;for (; _this.i<20 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=2000028;//user.Main:28
          new Tonyu.classes.user.Bounce();
        }
      }
      //$LASTPOS=2000046;//user.Main:46
      _this.text="↑ Portrait   → Landscape";
      //$LASTPOS=2000080;//user.Main:80
      _this.size=20;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000090;//user.Main:90
          case 1:
            //$LASTPOS=2000110;//user.Main:110
            _this.x=Tonyu.globals.$screenWidth/2;
            //$LASTPOS=2000133;//user.Main:133
            _this.y=Tonyu.globals.$screenHeight/2;
            //$LASTPOS=2000157;//user.Main:157
            if (_this.getkey("right")==1) {
              //$LASTPOS=2000221;//user.Main:221
              Tonyu.globals.$Screen.resize(400,300);
              //$LASTPOS=2000255;//user.Main:255
              _this.print("Landscape");
              
            }
            //$LASTPOS=2000287;//user.Main:287
            if (_this.getkey("up")==1) {
              //$LASTPOS=2000348;//user.Main:348
              Tonyu.globals.$Screen.resize(300,400);
              //$LASTPOS=2000382;//user.Main:382
              _this.print("Portrait");
              
            }
            //$LASTPOS=2000413;//user.Main:413
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"i":{}}}
});

//# sourceMappingURL=concat.js.map