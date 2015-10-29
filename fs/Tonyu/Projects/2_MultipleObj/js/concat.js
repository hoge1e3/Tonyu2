Tonyu.klass.define({
  fullName: 'user.Bounce',
  shortName: 'Bounce',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Bounce_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000026;//user.Bounce:26
      _this.x=100;
      //$LASTPOS=1000033;//user.Bounce:33
      _this.y=250;
      //$LASTPOS=1000143;//user.Bounce:143
      _this.p=8;
      //$LASTPOS=1000148;//user.Bounce:148
      _this.vy=0;
      //$LASTPOS=1000216;//user.Bounce:216
      while (_this.x<Tonyu.globals.$screenWidth) {
        //$LASTPOS=1000245;//user.Bounce:245
        _this.x+=2;
        //$LASTPOS=1000255;//user.Bounce:255
        _this.y+=_this.vy;
        //$LASTPOS=1000266;//user.Bounce:266
        _this.vy+=1;
        //$LASTPOS=1000312;//user.Bounce:312
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=1000343;//user.Bounce:343
          _this.y=Tonyu.globals.$screenHeight;
          //$LASTPOS=1000368;//user.Bounce:368
          _this.vy=- _this.vy;
          
        }
        //$LASTPOS=1000386;//user.Bounce:386
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bounce_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000026;//user.Bounce:26
      _this.x=100;
      //$LASTPOS=1000033;//user.Bounce:33
      _this.y=250;
      //$LASTPOS=1000143;//user.Bounce:143
      _this.p=8;
      //$LASTPOS=1000148;//user.Bounce:148
      _this.vy=0;
      
      _thread.enter(function _trc_Bounce_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000216;//user.Bounce:216
          case 1:
            if (!(_this.x<Tonyu.globals.$screenWidth)) { __pc=3; break; }
            //$LASTPOS=1000245;//user.Bounce:245
            _this.x+=2;
            //$LASTPOS=1000255;//user.Bounce:255
            _this.y+=_this.vy;
            //$LASTPOS=1000266;//user.Bounce:266
            _this.vy+=1;
            //$LASTPOS=1000312;//user.Bounce:312
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=1000343;//user.Bounce:343
              _this.y=Tonyu.globals.$screenHeight;
              //$LASTPOS=1000368;//user.Bounce:368
              _this.vy=- _this.vy;
              
            }
            //$LASTPOS=1000386;//user.Bounce:386
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
  fullName: 'user.GoRight',
  shortName: 'GoRight',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_GoRight_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000152;//user.GoRight:152
      _this.x=100;
      //$LASTPOS=2000159;//user.GoRight:159
      _this.y=50;
      //$LASTPOS=2000195;//user.GoRight:195
      while (_this.x<Tonyu.globals.$screenWidth) {
        //$LASTPOS=2000225;//user.GoRight:225
        _this.x++;
        //$LASTPOS=2000278;//user.GoRight:278
        _this.update();
        
      }
    },
    fiber$main :function _trc_GoRight_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000152;//user.GoRight:152
      _this.x=100;
      //$LASTPOS=2000159;//user.GoRight:159
      _this.y=50;
      
      _thread.enter(function _trc_GoRight_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000195;//user.GoRight:195
          case 1:
            if (!(_this.x<Tonyu.globals.$screenWidth)) { __pc=3; break; }
            //$LASTPOS=2000225;//user.GoRight:225
            _this.x++;
            //$LASTPOS=2000278;//user.GoRight:278
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
      
      //$LASTPOS=3000056;//user.Main:56
      new Tonyu.classes.user.Bounce;
      //$LASTPOS=3000068;//user.Main:68
      new Tonyu.classes.user.GoRight;
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000056;//user.Main:56
      new Tonyu.classes.user.Bounce;
      //$LASTPOS=3000068;//user.Main:68
      new Tonyu.classes.user.GoRight;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
