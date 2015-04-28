Tonyu.klass.define({
  fullName: 'user.Char',
  shortName: 'Char',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Char_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000000;//user.Char:0
      _this.x=30;
      //$LASTPOS=1000005;//user.Char:5
      _this.y=300;
      //$LASTPOS=1000012;//user.Char:12
      while (_this.x<300) {
        //$LASTPOS=1000031;//user.Char:31
        _this.x++;
        //$LASTPOS=1000040;//user.Char:40
        _this.update();
        
      }
    },
    fiber$main :function _trc_Char_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Char:0
      _this.x=30;
      //$LASTPOS=1000005;//user.Char:5
      _this.y=300;
      
      _thread.enter(function _trc_Char_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000012;//user.Char:12
          case 1:
            if (!(_this.x<300)) { __pc=3; break; }
            //$LASTPOS=1000031;//user.Char:31
            _this.x++;
            //$LASTPOS=1000040;//user.Char:40
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
    jump :function _trc_Char_jump(vy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var by;
      
      //$LASTPOS=1000068;//user.Char:68
      if (_this.jumping) {
        return _this;
      }
      //$LASTPOS=1000093;//user.Char:93
      _this.jumping=true;
      //$LASTPOS=1000111;//user.Char:111
      by = _this.y;
      //$LASTPOS=1000125;//user.Char:125
      while (_this.y<=by) {
        //$LASTPOS=1000148;//user.Char:148
        _this.y+=vy;
        //$LASTPOS=1000163;//user.Char:163
        vy++;
        //$LASTPOS=1000177;//user.Char:177
        _this.update();
        
      }
      //$LASTPOS=1000197;//user.Char:197
      _this.jumping=false;
    },
    fiber$jump :function _trc_Char_f_jump(_thread,vy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var by;
      
      //$LASTPOS=1000068;//user.Char:68
      if (_this.jumping) {
        _thread.retVal=_this;return;
        
      }
      //$LASTPOS=1000093;//user.Char:93
      _this.jumping=true;
      //$LASTPOS=1000111;//user.Char:111
      by = _this.y;
      
      _thread.enter(function _trc_Char_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000125;//user.Char:125
          case 1:
            if (!(_this.y<=by)) { __pc=3; break; }
            //$LASTPOS=1000148;//user.Char:148
            _this.y+=vy;
            //$LASTPOS=1000163;//user.Char:163
            vy++;
            //$LASTPOS=1000177;//user.Char:177
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000197;//user.Char:197
            _this.jumping=false;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"jump":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000001;//user.Main:1
      _this.c=new Tonyu.classes.user.Char;
      //$LASTPOS=2000013;//user.Main:13
      _this.c.on("fuga","jump");
      //$LASTPOS=2000035;//user.Main:35
      while (true) {
        //$LASTPOS=2000053;//user.Main:53
        if (_this.getkey(32)==1) {
          //$LASTPOS=2000082;//user.Main:82
          _this.c.sendEvent("fuga",- _this.rnd(15)-5);
          
        }
        //$LASTPOS=2000124;//user.Main:124
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000001;//user.Main:1
      _this.c=new Tonyu.classes.user.Char;
      //$LASTPOS=2000013;//user.Main:13
      _this.c.on("fuga","jump");
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000035;//user.Main:35
          case 1:
            //$LASTPOS=2000053;//user.Main:53
            if (_this.getkey(32)==1) {
              //$LASTPOS=2000082;//user.Main:82
              _this.c.sendEvent("fuga",- _this.rnd(15)-5);
              
            }
            //$LASTPOS=2000124;//user.Main:124
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
    jump :function _trc_Main_jump() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000151;//user.Main:151
      _this.print("Uso jump!");
      //$LASTPOS=2000175;//user.Main:175
      _this.updateEx(30);
      //$LASTPOS=2000193;//user.Main:193
      _this.print("Uso jumped!");
    },
    fiber$jump :function _trc_Main_f_jump(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000151;//user.Main:151
      _this.print("Uso jump!");
      
      _thread.enter(function _trc_Main_ent_jump(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000175;//user.Main:175
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=2000193;//user.Main:193
            _this.print("Uso jumped!");
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"jump":{"nowait":false}}}
});
