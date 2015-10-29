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
      
      //$LASTPOS=1000000;//user.Player:0
      _this.x=200;
      //$LASTPOS=1000007;//user.Player:7
      _this.y=200;
      //$LASTPOS=1000014;//user.Player:14
      while (true) {
        //$LASTPOS=1000209;//user.Player:209
        if (_this.getkey("up")) {
          //$LASTPOS=1000227;//user.Player:227
          _this.y-=8;
        }
        //$LASTPOS=1000237;//user.Player:237
        if (_this.getkey("down")) {
          //$LASTPOS=1000257;//user.Player:257
          _this.y+=8;
        }
        //$LASTPOS=1000267;//user.Player:267
        if (_this.getkey("left")) {
          //$LASTPOS=1000287;//user.Player:287
          _this.x-=8;
        }
        //$LASTPOS=1000297;//user.Player:297
        if (_this.getkey("right")) {
          //$LASTPOS=1000318;//user.Player:318
          _this.x+=8;
        }
        //$LASTPOS=1000328;//user.Player:328
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Player:0
      _this.x=200;
      //$LASTPOS=1000007;//user.Player:7
      _this.y=200;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000014;//user.Player:14
          case 1:
            //$LASTPOS=1000209;//user.Player:209
            if (_this.getkey("up")) {
              //$LASTPOS=1000227;//user.Player:227
              _this.y-=8;
            }
            //$LASTPOS=1000237;//user.Player:237
            if (_this.getkey("down")) {
              //$LASTPOS=1000257;//user.Player:257
              _this.y+=8;
            }
            //$LASTPOS=1000267;//user.Player:267
            if (_this.getkey("left")) {
              //$LASTPOS=1000287;//user.Player:287
              _this.x-=8;
            }
            //$LASTPOS=1000297;//user.Player:297
            if (_this.getkey("right")) {
              //$LASTPOS=1000318;//user.Player:318
              _this.x+=8;
            }
            //$LASTPOS=1000328;//user.Player:328
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
