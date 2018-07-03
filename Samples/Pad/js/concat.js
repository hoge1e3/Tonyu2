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
      _this.pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=1000014;//user.Main:14
      _this.x=20;
      //$LASTPOS=1000019;//user.Main:19
      _this.y=20;
      //$LASTPOS=1000026;//user.Main:26
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000045;//user.Main:45
        if (_this.pad.getUp()) {
          //$LASTPOS=1000062;//user.Main:62
          _this.y-=_this.spd;
        }
        //$LASTPOS=1000075;//user.Main:75
        if (_this.pad.getDown()) {
          //$LASTPOS=1000094;//user.Main:94
          _this.y+=_this.spd;
        }
        //$LASTPOS=1000107;//user.Main:107
        if (_this.pad.getLeft()) {
          //$LASTPOS=1000126;//user.Main:126
          _this.x-=_this.spd;
        }
        //$LASTPOS=1000139;//user.Main:139
        if (_this.pad.getRight()) {
          //$LASTPOS=1000159;//user.Main:159
          _this.x+=_this.spd;
        }
        //$LASTPOS=1000172;//user.Main:172
        if (_this.pad.getButton(0)) {
          //$LASTPOS=1000205;//user.Main:205
          _this.spd=4;
          //$LASTPOS=1000212;//user.Main:212
          _this.p=4;
          
        } else {
          //$LASTPOS=1000240;//user.Main:240
          _this.spd=2;
          //$LASTPOS=1000247;//user.Main:247
          _this.p=0;
          
        }
        //$LASTPOS=1000264;//user.Main:264
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      _this.pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=1000014;//user.Main:14
      _this.x=20;
      //$LASTPOS=1000019;//user.Main:19
      _this.y=20;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000026;//user.Main:26
          case 1:
            //$LASTPOS=1000045;//user.Main:45
            if (_this.pad.getUp()) {
              //$LASTPOS=1000062;//user.Main:62
              _this.y-=_this.spd;
            }
            //$LASTPOS=1000075;//user.Main:75
            if (_this.pad.getDown()) {
              //$LASTPOS=1000094;//user.Main:94
              _this.y+=_this.spd;
            }
            //$LASTPOS=1000107;//user.Main:107
            if (_this.pad.getLeft()) {
              //$LASTPOS=1000126;//user.Main:126
              _this.x-=_this.spd;
            }
            //$LASTPOS=1000139;//user.Main:139
            if (_this.pad.getRight()) {
              //$LASTPOS=1000159;//user.Main:159
              _this.x+=_this.spd;
            }
            //$LASTPOS=1000172;//user.Main:172
            if (_this.pad.getButton(0)) {
              //$LASTPOS=1000205;//user.Main:205
              _this.spd=4;
              //$LASTPOS=1000212;//user.Main:212
              _this.p=4;
              
            } else {
              //$LASTPOS=1000240;//user.Main:240
              _this.spd=2;
              //$LASTPOS=1000247;//user.Main:247
              _this.p=0;
              
            }
            //$LASTPOS=1000264;//user.Main:264
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"pad":{},"spd":{}}}
});

//# sourceMappingURL=concat.js.map