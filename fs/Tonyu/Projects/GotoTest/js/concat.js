Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000000;//user.Main:0
      _this.x=_this.y=200;
      //$LASTPOS=41000009;//user.Main:9
      _this.parallel("ctrl");
      //$LASTPOS=41000027;//user.Main:27
      _this.updateEx(300);
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000000;//user.Main:0
      _this.x=_this.y=200;
      //$LASTPOS=41000009;//user.Main:9
      _this.parallel("ctrl");
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000027;//user.Main:27
            _this.fiber$updateEx(_thread, 300);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    up :function _trc_Main_up() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000063;//user.Main:63
      //$LASTPOS=41000068;//user.Main:68
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=41000093;//user.Main:93
          _this.y--;
          //$LASTPOS=41000106;//user.Main:106
          _this.update();
        }
        _this.i++;
      }
    },
    fiber$up :function _trc_Main_f_up(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_up(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000063;//user.Main:63
            //$LASTPOS=41000068;//user.Main:68
            _this.i=0;;
          case 1:
            if (!(_this.i<20)) { __pc=3; break; }
            //$LASTPOS=41000093;//user.Main:93
            _this.y--;
            //$LASTPOS=41000106;//user.Main:106
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            _this.i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    down :function _trc_Main_down() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000162;//user.Main:162
      //$LASTPOS=41000167;//user.Main:167
      _this.i=0;
      while(_this.i<20) {
        {
          //$LASTPOS=41000192;//user.Main:192
          _this.y++;
          //$LASTPOS=41000205;//user.Main:205
          _this.update();
        }
        _this.i++;
      }
    },
    fiber$down :function _trc_Main_f_down(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_down(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000162;//user.Main:162
            //$LASTPOS=41000167;//user.Main:167
            _this.i=0;;
          case 1:
            if (!(_this.i<20)) { __pc=3; break; }
            //$LASTPOS=41000192;//user.Main:192
            _this.y++;
            //$LASTPOS=41000205;//user.Main:205
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            _this.i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    goto :function _trc_Main_goto(n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000261;//user.Main:261
      _this._th.clearFrame();
      //$LASTPOS=41000283;//user.Main:283
      _this._th.apply(_this,n,[]);
    },
    fiber$goto :function _trc_Main_f_goto(_thread,n) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000261;//user.Main:261
      _this._th.clearFrame();
      //$LASTPOS=41000283;//user.Main:283
      _this._th.apply(_this,n,[]);
      
      _thread.retVal=_this;return;
    },
    ctrl :function _trc_Main_ctrl() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000323;//user.Main:323
      while (true) {
        //$LASTPOS=41000345;//user.Main:345
        if (_this.getkey("down")) {
          //$LASTPOS=41000365;//user.Main:365
          _this.goto("down");
        }
        //$LASTPOS=41000387;//user.Main:387
        if (_this.getkey("up")) {
          //$LASTPOS=41000405;//user.Main:405
          _this.goto("up");
        }
        //$LASTPOS=41000425;//user.Main:425
        _this.update();
        
      }
    },
    fiber$ctrl :function _trc_Main_f_ctrl(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_ctrl(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000323;//user.Main:323
          case 1:
            //$LASTPOS=41000345;//user.Main:345
            if (!(_this.getkey("down"))) { __pc=3; break; }
            //$LASTPOS=41000365;//user.Main:365
            _this.fiber$goto(_thread, "down");
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=41000387;//user.Main:387
            if (!(_this.getkey("up"))) { __pc=5; break; }
            //$LASTPOS=41000405;//user.Main:405
            _this.fiber$goto(_thread, "up");
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=41000425;//user.Main:425
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=1;break;
          case 7:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"up":{"nowait":false},"down":{"nowait":false},"goto":{"nowait":false},"ctrl":{"nowait":false}}}
});
