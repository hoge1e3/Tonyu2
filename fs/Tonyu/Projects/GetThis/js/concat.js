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
      
      //$LASTPOS=1000081;//user.Main:81
      _this.doit();
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000081;//user.Main:81
            _this.fiber$doit(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    getit :function _trc_Main_getit() {
      "use strict";
      var _this=this;
      
      return _this.window;
    },
    fiber$getit :function _trc_Main_f_getit(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=_this.window;return;
      
      
      _thread.retVal=_this;return;
    },
    doit :function _trc_Main_doit() {
      "use strict";
      var _this=this;
      var s;
      
      //$LASTPOS=1000049;//user.Main:49
      s = _this["getit"];
      //$LASTPOS=1000074;//user.Main:74
      s();
    },
    fiber$doit :function _trc_Main_f_doit(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      
      //$LASTPOS=1000049;//user.Main:49
      s = _this["getit"];
      //$LASTPOS=1000074;//user.Main:74
      s();
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getit":{"nowait":false},"doit":{"nowait":false}}}
});
