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
      
      //$LASTPOS=45000000;//user.Main:0
      new Tonyu.classes.user.Touch({index: 0});
      //$LASTPOS=45000043;//user.Main:43
      new Tonyu.classes.user.Touch({index: 1});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000000;//user.Main:0
      new Tonyu.classes.user.Touch({index: 0});
      //$LASTPOS=45000043;//user.Main:43
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
      
      //$LASTPOS=46000000;//user.Touch:0
      _this.size=30;
      //$LASTPOS=46000009;//user.Touch:9
      while (true) {
        //$LASTPOS=46000090;//user.Touch:90
        t = Tonyu.globals.$touches[_this.index];
        //$LASTPOS=46000117;//user.Touch:117
        if (t.touched) {
          //$LASTPOS=46000163;//user.Touch:163
          _this.x=t.x;
          //$LASTPOS=46000178;//user.Touch:178
          _this.y=t.y;
          //$LASTPOS=46000193;//user.Touch:193
          _this.text="touch #"+_this.index;
          
        } else {
          //$LASTPOS=46000235;//user.Touch:235
          _this.text="Not touched";
          
        }
        //$LASTPOS=46000265;//user.Touch:265
        _this.update();
        
      }
    },
    fiber$main :function _trc_Touch_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      //$LASTPOS=46000000;//user.Touch:0
      _this.size=30;
      
      _thread.enter(function _trc_Touch_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000009;//user.Touch:9
          case 1:
            //$LASTPOS=46000090;//user.Touch:90
            t = Tonyu.globals.$touches[_this.index];
            //$LASTPOS=46000117;//user.Touch:117
            if (t.touched) {
              //$LASTPOS=46000163;//user.Touch:163
              _this.x=t.x;
              //$LASTPOS=46000178;//user.Touch:178
              _this.y=t.y;
              //$LASTPOS=46000193;//user.Touch:193
              _this.text="touch #"+_this.index;
              
            } else {
              //$LASTPOS=46000235;//user.Touch:235
              _this.text="Not touched";
              
            }
            //$LASTPOS=46000265;//user.Touch:265
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
