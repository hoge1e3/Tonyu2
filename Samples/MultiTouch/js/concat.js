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
      new Tonyu.classes.user.Touch({index: 0});
      //$LASTPOS=1000044;//user.Main:44
      new Tonyu.classes.user.Touch({index: 1});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Main:0
      new Tonyu.classes.user.Touch({index: 0});
      //$LASTPOS=1000044;//user.Main:44
      new Tonyu.classes.user.Touch({index: 1});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Touch',
  shortName: 'Touch',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Touch_main() {
      "use strict";
      var _this=this;
      var t;
      
      //$LASTPOS=2000000;//user.Touch:0
      _this.size=30;
      //$LASTPOS=2000010;//user.Touch:10
      while (true) {
        //$LASTPOS=2000094;//user.Touch:94
        t = Tonyu.globals.$touches[_this.index];
        //$LASTPOS=2000122;//user.Touch:122
        if (t.touched) {
          //$LASTPOS=2000169;//user.Touch:169
          _this.x=t.x;
          //$LASTPOS=2000185;//user.Touch:185
          _this.y=t.y;
          //$LASTPOS=2000201;//user.Touch:201
          _this.text="touch #"+_this.index;
          
        } else {
          //$LASTPOS=2000245;//user.Touch:245
          _this.text="Not touched";
          
        }
        //$LASTPOS=2000277;//user.Touch:277
        _this.update();
        
      }
    },
    fiber$main :function _trc_Touch_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      //$LASTPOS=2000000;//user.Touch:0
      _this.size=30;
      
      _thread.enter(function _trc_Touch_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000010;//user.Touch:10
          case 1:
            //$LASTPOS=2000094;//user.Touch:94
            t = Tonyu.globals.$touches[_this.index];
            //$LASTPOS=2000122;//user.Touch:122
            if (t.touched) {
              //$LASTPOS=2000169;//user.Touch:169
              _this.x=t.x;
              //$LASTPOS=2000185;//user.Touch:185
              _this.y=t.y;
              //$LASTPOS=2000201;//user.Touch:201
              _this.text="touch #"+_this.index;
              
            } else {
              //$LASTPOS=2000245;//user.Touch:245
              _this.text="Not touched";
              
            }
            //$LASTPOS=2000277;//user.Touch:277
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
