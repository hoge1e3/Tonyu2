Tonyu.klass.define({
  fullName: 'user.Test2',
  shortName: 'Test2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Test2_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Test2:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000044;//user.Test2:44
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=1000068;//user.Test2:68
      Tonyu.globals.$map.zOrder=1000;
      //$LASTPOS=1000087;//user.Test2:87
      _this.x=20;
      //$LASTPOS=1000092;//user.Test2:92
      _this.y=20;
      //$LASTPOS=1000101;//user.Test2:101
      while (true) {
        //$LASTPOS=1000120;//user.Test2:120
        _this.x+=2;
        //$LASTPOS=1000131;//user.Test2:131
        _this.y++;
        //$LASTPOS=1000141;//user.Test2:141
        Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
        //$LASTPOS=1000221;//user.Test2:221
        _this.update();
        
      }
      //$LASTPOS=1000235;//user.Test2:235
      _this.a=6601;
    },
    fiber$main :function _trc_Test2_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Test2:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=1000044;//user.Test2:44
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=1000068;//user.Test2:68
      Tonyu.globals.$map.zOrder=1000;
      //$LASTPOS=1000087;//user.Test2:87
      _this.x=20;
      //$LASTPOS=1000092;//user.Test2:92
      _this.y=20;
      
      _thread.enter(function _trc_Test2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000101;//user.Test2:101
          case 1:
            //$LASTPOS=1000120;//user.Test2:120
            _this.x+=2;
            //$LASTPOS=1000131;//user.Test2:131
            _this.y++;
            //$LASTPOS=1000141;//user.Test2:141
            Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
            //$LASTPOS=1000221;//user.Test2:221
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=1000235;//user.Test2:235
            _this.a=6601;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
