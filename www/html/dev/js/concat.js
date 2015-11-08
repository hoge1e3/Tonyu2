Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000018;//user.Ball:18
      while (true) {
        //$LASTPOS=1000038;//user.Ball:38
        _this.y+=1;
        //$LASTPOS=1000049;//user.Ball:49
        _this.rotation++;
        //$LASTPOS=1000066;//user.Ball:66
        _this.update();
        //$LASTPOS=1000081;//user.Ball:81
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=1000102;//user.Ball:102
          _this.y=0;
        }
        
      }
      //$LASTPOS=1000111;//user.Ball:111
      _this.die();
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000018;//user.Ball:18
          case 1:
            //$LASTPOS=1000038;//user.Ball:38
            _this.y+=1;
            //$LASTPOS=1000049;//user.Ball:49
            _this.rotation++;
            //$LASTPOS=1000066;//user.Ball:66
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=1000081;//user.Ball:81
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=1000102;//user.Ball:102
              _this.y=0;
            }
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000111;//user.Ball:111
            _this.die();
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
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000469;//user.Main:469
      Tonyu.globals.$Boot.useRAF=true;
      //$LASTPOS=2000489;//user.Main:489
      Tonyu.globals.$Boot.setFrameRate(30,4);
      //$LASTPOS=2000516;//user.Main:516
      _this.t=0;
      //$LASTPOS=2000522;//user.Main:522
      while (true) {
        //$LASTPOS=2000541;//user.Main:541
        if (_this.t%5==0||_this.getkey(32)) {
          //$LASTPOS=2000664;//user.Main:664
          new Tonyu.classes.user.Ball({x: _this.rnd(Tonyu.globals.$screenWidth),y: 0,p: Tonyu.globals.$pat_balls+_this.rnd(16)});
          
        }
        //$LASTPOS=2000733;//user.Main:733
        _this.t++;
        //$LASTPOS=2000743;//user.Main:743
        _this.print(Tonyu.globals.$Boot.rafCntDebug);
        //$LASTPOS=2000774;//user.Main:774
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000469;//user.Main:469
      Tonyu.globals.$Boot.useRAF=true;
      //$LASTPOS=2000489;//user.Main:489
      Tonyu.globals.$Boot.setFrameRate(30,4);
      //$LASTPOS=2000516;//user.Main:516
      _this.t=0;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000522;//user.Main:522
          case 1:
            //$LASTPOS=2000541;//user.Main:541
            if (_this.t%5==0||_this.getkey(32)) {
              //$LASTPOS=2000664;//user.Main:664
              new Tonyu.classes.user.Ball({x: _this.rnd(Tonyu.globals.$screenWidth),y: 0,p: Tonyu.globals.$pat_balls+_this.rnd(16)});
              
            }
            //$LASTPOS=2000733;//user.Main:733
            _this.t++;
            //$LASTPOS=2000743;//user.Main:743
            _this.print(Tonyu.globals.$Boot.rafCntDebug);
            //$LASTPOS=2000774;//user.Main:774
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
