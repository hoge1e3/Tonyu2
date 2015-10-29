Tonyu.klass.define({
  fullName: 'user.GoRight',
  shortName: 'GoRight',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GoRight_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000159;//user.GoRight:159
      _this.x=100;
      //$LASTPOS=1000166;//user.GoRight:166
      _this.y=50;
      //$LASTPOS=1000202;//user.GoRight:202
      while (_this.x<Tonyu.globals.$screenWidth) {
        //$LASTPOS=1000232;//user.GoRight:232
        _this.x++;
        //$LASTPOS=1000285;//user.GoRight:285
        _this.update();
        
      }
    },
    fiber$main :function _trc_GoRight_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000159;//user.GoRight:159
      _this.x=100;
      //$LASTPOS=1000166;//user.GoRight:166
      _this.y=50;
      
      _thread.enter(function _trc_GoRight_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000202;//user.GoRight:202
          case 1:
            if (!(_this.x<Tonyu.globals.$screenWidth)) { __pc=3; break; }
            //$LASTPOS=1000232;//user.GoRight:232
            _this.x++;
            //$LASTPOS=1000285;//user.GoRight:285
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
