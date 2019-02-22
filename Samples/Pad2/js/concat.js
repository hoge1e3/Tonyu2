Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        "use strict";
        var _this=this;
        
        //$LASTPOS=1000233;//user.Main:233
        _this.pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4});
        //$LASTPOS=1001864;//user.Main:1864
        _this.x=240;
        //$LASTPOS=1001870;//user.Main:1870
        _this.y=150;
        //$LASTPOS=1001880;//user.Main:1880
        while (true) {
          Tonyu.checkLoop();
          //$LASTPOS=1001916;//user.Main:1916
          if (_this.pad.getButton(0)) {
            //$LASTPOS=1001957;//user.Main:1957
            _this.p=Tonyu.globals.$pat_base+4;
            //$LASTPOS=1001981;//user.Main:1981
            _this.spd=5;
            //$LASTPOS=1001997;//user.Main:1997
            _this.pad.alpha-=50;
            
          } else {
            //$LASTPOS=1002037;//user.Main:2037
            _this.p=Tonyu.globals.$pat_base;
            //$LASTPOS=1002059;//user.Main:2059
            _this.spd=3;
            
          }
          //$LASTPOS=1002078;//user.Main:2078
          if (_this.pad.getButton(1)) {
            //$LASTPOS=1002100;//user.Main:2100
            _this.rotation=20;
          } else {
            //$LASTPOS=1002118;//user.Main:2118
            _this.rotation=0;
          }
          //$LASTPOS=1002143;//user.Main:2143
          if (_this.pad.getButton(2)) {
            //$LASTPOS=1002165;//user.Main:2165
            _this.alpha=128;
          } else {
            //$LASTPOS=1002181;//user.Main:2181
            _this.alpha=255;
          }
          //$LASTPOS=1002205;//user.Main:2205
          if (_this.pad.getButton(3)) {
            //$LASTPOS=1002227;//user.Main:2227
            _this.scaleX=2;
          } else {
            //$LASTPOS=1002242;//user.Main:2242
            _this.scaleX=1;
          }
          //$LASTPOS=1002265;//user.Main:2265
          if (_this.pad.getRight()) {
            //$LASTPOS=1002285;//user.Main:2285
            _this.x+=_this.spd;
          }
          //$LASTPOS=1002305;//user.Main:2305
          if (_this.pad.getLeft()) {
            //$LASTPOS=1002324;//user.Main:2324
            _this.x-=_this.spd;
          }
          //$LASTPOS=1002344;//user.Main:2344
          if (_this.pad.getUp()) {
            //$LASTPOS=1002361;//user.Main:2361
            _this.y-=_this.spd;
          }
          //$LASTPOS=1002381;//user.Main:2381
          if (_this.pad.getDown()) {
            //$LASTPOS=1002400;//user.Main:2400
            _this.y+=_this.spd;
          }
          //$LASTPOS=1002439;//user.Main:2439
          _this.x=_this.clamp(_this.x,16,Tonyu.globals.$screenWidth-16);
          //$LASTPOS=1002475;//user.Main:2475
          _this.y=_this.clamp(_this.y,16,Tonyu.globals.$screenHeight-16);
          //$LASTPOS=1002690;//user.Main:2690
          _this.update();
          
        }
      },
      fiber$main :function _trc_Main_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        //$LASTPOS=1000233;//user.Main:233
        _this.pad=new Tonyu.classes.kernel.Pad({buttonCnt: 4});
        //$LASTPOS=1001864;//user.Main:1864
        _this.x=240;
        //$LASTPOS=1001870;//user.Main:1870
        _this.y=150;
        
        _thread.enter(function _trc_Main_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              //$LASTPOS=1001880;//user.Main:1880
            case 1:
              //$LASTPOS=1001916;//user.Main:1916
              if (_this.pad.getButton(0)) {
                //$LASTPOS=1001957;//user.Main:1957
                _this.p=Tonyu.globals.$pat_base+4;
                //$LASTPOS=1001981;//user.Main:1981
                _this.spd=5;
                //$LASTPOS=1001997;//user.Main:1997
                _this.pad.alpha-=50;
                
              } else {
                //$LASTPOS=1002037;//user.Main:2037
                _this.p=Tonyu.globals.$pat_base;
                //$LASTPOS=1002059;//user.Main:2059
                _this.spd=3;
                
              }
              //$LASTPOS=1002078;//user.Main:2078
              if (_this.pad.getButton(1)) {
                //$LASTPOS=1002100;//user.Main:2100
                _this.rotation=20;
              } else {
                //$LASTPOS=1002118;//user.Main:2118
                _this.rotation=0;
              }
              //$LASTPOS=1002143;//user.Main:2143
              if (_this.pad.getButton(2)) {
                //$LASTPOS=1002165;//user.Main:2165
                _this.alpha=128;
              } else {
                //$LASTPOS=1002181;//user.Main:2181
                _this.alpha=255;
              }
              //$LASTPOS=1002205;//user.Main:2205
              if (_this.pad.getButton(3)) {
                //$LASTPOS=1002227;//user.Main:2227
                _this.scaleX=2;
              } else {
                //$LASTPOS=1002242;//user.Main:2242
                _this.scaleX=1;
              }
              //$LASTPOS=1002265;//user.Main:2265
              if (_this.pad.getRight()) {
                //$LASTPOS=1002285;//user.Main:2285
                _this.x+=_this.spd;
              }
              //$LASTPOS=1002305;//user.Main:2305
              if (_this.pad.getLeft()) {
                //$LASTPOS=1002324;//user.Main:2324
                _this.x-=_this.spd;
              }
              //$LASTPOS=1002344;//user.Main:2344
              if (_this.pad.getUp()) {
                //$LASTPOS=1002361;//user.Main:2361
                _this.y-=_this.spd;
              }
              //$LASTPOS=1002381;//user.Main:2381
              if (_this.pad.getDown()) {
                //$LASTPOS=1002400;//user.Main:2400
                _this.y+=_this.spd;
              }
              //$LASTPOS=1002439;//user.Main:2439
              _this.x=_this.clamp(_this.x,16,Tonyu.globals.$screenWidth-16);
              //$LASTPOS=1002475;//user.Main:2475
              _this.y=_this.clamp(_this.y,16,Tonyu.globals.$screenHeight-16);
              //$LASTPOS=1002690;//user.Main:2690
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
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"pad":{},"spd":{}}}
});

//# sourceMappingURL=concat.js.map