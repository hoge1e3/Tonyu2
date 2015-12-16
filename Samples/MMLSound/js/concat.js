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
      
      //$LASTPOS=1000000;//user.Main:0
      _this.m=new Tonyu.classes.user.MMLTest;
      //$LASTPOS=1000018;//user.Main:18
      _this.text="Space:SE  S:Stop";
      //$LASTPOS=1000044;//user.Main:44
      _this.x=200;
      //$LASTPOS=1000051;//user.Main:51
      _this.y=200;
      //$LASTPOS=1000059;//user.Main:59
      while (true) {
        //$LASTPOS=1000079;//user.Main:79
        if (_this.getkey(32)==1) {
          //$LASTPOS=1000109;//user.Main:109
          _this.playSE("l16<ceg");
          
        }
        //$LASTPOS=1000140;//user.Main:140
        if (_this.getkey("s")==1) {
          //$LASTPOS=1000171;//user.Main:171
          _this.m.die();
          
        }
        //$LASTPOS=1000192;//user.Main:192
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      _this.m=new Tonyu.classes.user.MMLTest;
      //$LASTPOS=1000018;//user.Main:18
      _this.text="Space:SE  S:Stop";
      //$LASTPOS=1000044;//user.Main:44
      _this.x=200;
      //$LASTPOS=1000051;//user.Main:51
      _this.y=200;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000059;//user.Main:59
          case 1:
            //$LASTPOS=1000079;//user.Main:79
            if (_this.getkey(32)==1) {
              //$LASTPOS=1000109;//user.Main:109
              _this.playSE("l16<ceg");
              
            }
            //$LASTPOS=1000140;//user.Main:140
            if (_this.getkey("s")==1) {
              //$LASTPOS=1000171;//user.Main:171
              _this.m.die();
              
            }
            //$LASTPOS=1000192;//user.Main:192
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
Tonyu.klass.define({
  fullName: 'user.MMLTest',
  shortName: 'MMLTest',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MMLTest_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000000;//user.MMLTest:0
      _this.x=200;
      //$LASTPOS=2000007;//user.MMLTest:7
      _this.y=150;
      //$LASTPOS=2000015;//user.MMLTest:15
      _this.size=40;
      //$LASTPOS=2000025;//user.MMLTest:25
      while (true) {
        //$LASTPOS=2000045;//user.MMLTest:45
        _this.text="oo";
        //$LASTPOS=2000061;//user.MMLTest:61
        _this.play("l8cde4",">l8c4ge");
        //$LASTPOS=2000092;//user.MMLTest:92
        _this.text="^^";
        //$LASTPOS=2000108;//user.MMLTest:108
        _this.play("l8edc4",">l8e4dc");
        
      }
    },
    fiber$main :function _trc_MMLTest_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.MMLTest:0
      _this.x=200;
      //$LASTPOS=2000007;//user.MMLTest:7
      _this.y=150;
      //$LASTPOS=2000015;//user.MMLTest:15
      _this.size=40;
      
      _thread.enter(function _trc_MMLTest_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000025;//user.MMLTest:25
          case 1:
            //$LASTPOS=2000045;//user.MMLTest:45
            _this.text="oo";
            //$LASTPOS=2000061;//user.MMLTest:61
            _this.fiber$play(_thread, "l8cde4", ">l8c4ge");
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000092;//user.MMLTest:92
            _this.text="^^";
            //$LASTPOS=2000108;//user.MMLTest:108
            _this.fiber$play(_thread, "l8edc4", ">l8e4dc");
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
