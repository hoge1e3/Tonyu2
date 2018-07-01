Tonyu.klass.define({
  fullName: 'user.MouseChaser',
  shortName: 'MouseChaser',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_MouseChaser_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.MouseChaser:0
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000019;//user.MouseChaser:19
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=1000035;//user.MouseChaser:35
        _this.y=Tonyu.globals.$mouseY;
        //$LASTPOS=1000051;//user.MouseChaser:51
        _this.update();
        
      }
    },
    fiber$main :function _trc_MouseChaser_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_MouseChaser_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000000;//user.MouseChaser:0
          case 1:
            //$LASTPOS=1000019;//user.MouseChaser:19
            _this.x=Tonyu.globals.$mouseX;
            //$LASTPOS=1000035;//user.MouseChaser:35
            _this.y=Tonyu.globals.$mouseY;
            //$LASTPOS=1000051;//user.MouseChaser:51
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});

//# sourceMappingURL=concat.js.map