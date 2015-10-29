Tonyu.klass.define({
  fullName: 'user.DX',
  shortName: 'DX',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_DX_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000001;//user.DX:1
      while (true) {
        //$LASTPOS=1000020;//user.DX:20
        _this.rotate++;
        //$LASTPOS=1000034;//user.DX:34
        _this.update();
        
      }
    },
    fiber$main :function _trc_DX_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_DX_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000001;//user.DX:1
          case 1:
            //$LASTPOS=1000020;//user.DX:20
            _this.rotate++;
            //$LASTPOS=1000034;//user.DX:34
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
      
      //$LASTPOS=2000079;//user.Main:79
      new Tonyu.classes.user.DX({x: 150,y: 200,p: 2,scaleX: 2});
      //$LASTPOS=2000116;//user.Main:116
      new Tonyu.classes.user.DX({x: 50,y: 200,p: 5,scaleX: 2,scaleY: 1});
      //$LASTPOS=2000162;//user.Main:162
      new Tonyu.classes.user.DX({x: 200,y: 150,p: 3,alpha: 128,rotate: 90});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000079;//user.Main:79
      new Tonyu.classes.user.DX({x: 150,y: 200,p: 2,scaleX: 2});
      //$LASTPOS=2000116;//user.Main:116
      new Tonyu.classes.user.DX({x: 50,y: 200,p: 5,scaleX: 2,scaleY: 1});
      //$LASTPOS=2000162;//user.Main:162
      new Tonyu.classes.user.DX({x: 200,y: 150,p: 3,alpha: 128,rotate: 90});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
