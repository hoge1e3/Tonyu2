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
      //$LASTPOS=1000013;//user.Main:13
      _this.x=20;
      //$LASTPOS=1000018;//user.Main:18
      _this.y=20;
      //$LASTPOS=1000024;//user.Main:24
      while (true) {
        //$LASTPOS=1000042;//user.Main:42
        if (_this.pad.getUp()) {
          //$LASTPOS=1000059;//user.Main:59
          _this.y-=_this.spd;
        }
        //$LASTPOS=1000071;//user.Main:71
        if (_this.pad.getDown()) {
          //$LASTPOS=1000090;//user.Main:90
          _this.y+=_this.spd;
        }
        //$LASTPOS=1000102;//user.Main:102
        if (_this.pad.getLeft()) {
          //$LASTPOS=1000121;//user.Main:121
          _this.x-=_this.spd;
        }
        //$LASTPOS=1000133;//user.Main:133
        if (_this.pad.getRight()) {
          //$LASTPOS=1000153;//user.Main:153
          _this.x+=_this.spd;
        }
        //$LASTPOS=1000165;//user.Main:165
        if (_this.pad.getButton(0)) {
          //$LASTPOS=1000197;//user.Main:197
          _this.spd=8;
          //$LASTPOS=1000204;//user.Main:204
          _this.p=4;
          
        } else {
          //$LASTPOS=1000230;//user.Main:230
          _this.spd=3;
          //$LASTPOS=1000237;//user.Main:237
          _this.p=0;
          
        }
        //$LASTPOS=1000252;//user.Main:252
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
      //$LASTPOS=1000013;//user.Main:13
      _this.x=20;
      //$LASTPOS=1000018;//user.Main:18
      _this.y=20;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000024;//user.Main:24
          case 1:
            //$LASTPOS=1000042;//user.Main:42
            if (_this.pad.getUp()) {
              //$LASTPOS=1000059;//user.Main:59
              _this.y-=_this.spd;
            }
            //$LASTPOS=1000071;//user.Main:71
            if (_this.pad.getDown()) {
              //$LASTPOS=1000090;//user.Main:90
              _this.y+=_this.spd;
            }
            //$LASTPOS=1000102;//user.Main:102
            if (_this.pad.getLeft()) {
              //$LASTPOS=1000121;//user.Main:121
              _this.x-=_this.spd;
            }
            //$LASTPOS=1000133;//user.Main:133
            if (_this.pad.getRight()) {
              //$LASTPOS=1000153;//user.Main:153
              _this.x+=_this.spd;
            }
            //$LASTPOS=1000165;//user.Main:165
            if (_this.pad.getButton(0)) {
              //$LASTPOS=1000197;//user.Main:197
              _this.spd=8;
              //$LASTPOS=1000204;//user.Main:204
              _this.p=4;
              
            } else {
              //$LASTPOS=1000230;//user.Main:230
              _this.spd=3;
              //$LASTPOS=1000237;//user.Main:237
              _this.p=0;
              
            }
            //$LASTPOS=1000252;//user.Main:252
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
