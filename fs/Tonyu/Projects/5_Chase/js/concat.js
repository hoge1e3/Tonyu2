Tonyu.klass.define({
  fullName: 'user.Chaser',
  shortName: 'Chaser',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chaser_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000062;//user.Chaser:62
      while (true) {
        //$LASTPOS=1000081;//user.Chaser:81
        if (_this.x<Tonyu.globals.$player.x) {
          //$LASTPOS=1000098;//user.Chaser:98
          _this.x+=2;
        }
        //$LASTPOS=1000108;//user.Chaser:108
        if (_this.x>Tonyu.globals.$player.x) {
          //$LASTPOS=1000125;//user.Chaser:125
          _this.x-=2;
        }
        //$LASTPOS=1000135;//user.Chaser:135
        if (_this.y<Tonyu.globals.$player.y) {
          //$LASTPOS=1000152;//user.Chaser:152
          _this.y+=2;
        }
        //$LASTPOS=1000162;//user.Chaser:162
        if (_this.y>Tonyu.globals.$player.y) {
          //$LASTPOS=1000179;//user.Chaser:179
          _this.y-=2;
        }
        //$LASTPOS=1000235;//user.Chaser:235
        if (_this.crashTo(Tonyu.globals.$player)) {
          //$LASTPOS=1000334;//user.Chaser:334
          Tonyu.globals.$player.die();
          
        }
        //$LASTPOS=1000359;//user.Chaser:359
        _this.update();
        
      }
    },
    fiber$main :function _trc_Chaser_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Chaser_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000062;//user.Chaser:62
          case 1:
            //$LASTPOS=1000081;//user.Chaser:81
            if (_this.x<Tonyu.globals.$player.x) {
              //$LASTPOS=1000098;//user.Chaser:98
              _this.x+=2;
            }
            //$LASTPOS=1000108;//user.Chaser:108
            if (_this.x>Tonyu.globals.$player.x) {
              //$LASTPOS=1000125;//user.Chaser:125
              _this.x-=2;
            }
            //$LASTPOS=1000135;//user.Chaser:135
            if (_this.y<Tonyu.globals.$player.y) {
              //$LASTPOS=1000152;//user.Chaser:152
              _this.y+=2;
            }
            //$LASTPOS=1000162;//user.Chaser:162
            if (_this.y>Tonyu.globals.$player.y) {
              //$LASTPOS=1000179;//user.Chaser:179
              _this.y-=2;
            }
            //$LASTPOS=1000235;//user.Chaser:235
            if (_this.crashTo(Tonyu.globals.$player)) {
              //$LASTPOS=1000334;//user.Chaser:334
              Tonyu.globals.$player.die();
              
            }
            //$LASTPOS=1000359;//user.Chaser:359
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
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000055;//user.Main:55
      Tonyu.globals.$player=new Tonyu.classes.user.Player;
      //$LASTPOS=2000075;//user.Main:75
      new Tonyu.classes.user.Chaser({x: 20,y: 20,p: 5});
      //$LASTPOS=2000102;//user.Main:102
      new Tonyu.classes.user.Chaser({x: 300,y: 250,p: 5});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000055;//user.Main:55
      Tonyu.globals.$player=new Tonyu.classes.user.Player;
      //$LASTPOS=2000075;//user.Main:75
      new Tonyu.classes.user.Chaser({x: 20,y: 20,p: 5});
      //$LASTPOS=2000102;//user.Main:102
      new Tonyu.classes.user.Chaser({x: 300,y: 250,p: 5});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000017;//user.Player:17
      _this.x=200;
      //$LASTPOS=3000024;//user.Player:24
      _this.y=200;
      //$LASTPOS=3000031;//user.Player:31
      while (true) {
        //$LASTPOS=3000226;//user.Player:226
        if (_this.getkey("up")) {
          //$LASTPOS=3000244;//user.Player:244
          _this.y-=8;
        }
        //$LASTPOS=3000254;//user.Player:254
        if (_this.getkey("down")) {
          //$LASTPOS=3000274;//user.Player:274
          _this.y+=8;
        }
        //$LASTPOS=3000284;//user.Player:284
        if (_this.getkey("left")) {
          //$LASTPOS=3000304;//user.Player:304
          _this.x-=8;
        }
        //$LASTPOS=3000314;//user.Player:314
        if (_this.getkey("right")) {
          //$LASTPOS=3000335;//user.Player:335
          _this.x+=8;
        }
        //$LASTPOS=3000345;//user.Player:345
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000017;//user.Player:17
      _this.x=200;
      //$LASTPOS=3000024;//user.Player:24
      _this.y=200;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000031;//user.Player:31
          case 1:
            //$LASTPOS=3000226;//user.Player:226
            if (_this.getkey("up")) {
              //$LASTPOS=3000244;//user.Player:244
              _this.y-=8;
            }
            //$LASTPOS=3000254;//user.Player:254
            if (_this.getkey("down")) {
              //$LASTPOS=3000274;//user.Player:274
              _this.y+=8;
            }
            //$LASTPOS=3000284;//user.Player:284
            if (_this.getkey("left")) {
              //$LASTPOS=3000304;//user.Player:304
              _this.x-=8;
            }
            //$LASTPOS=3000314;//user.Player:314
            if (_this.getkey("right")) {
              //$LASTPOS=3000335;//user.Player:335
              _this.x+=8;
            }
            //$LASTPOS=3000345;//user.Player:345
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
