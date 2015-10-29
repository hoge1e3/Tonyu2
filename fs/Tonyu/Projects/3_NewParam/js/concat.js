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
      
      //$LASTPOS=1000075;//user.Bounce:75
      _this.vy=0;
      //$LASTPOS=1000143;//user.Bounce:143
      while (_this.x<Tonyu.globals.$screenWidth) {
        //$LASTPOS=1000172;//user.Bounce:172
        _this.x+=2;
        //$LASTPOS=1000182;//user.Bounce:182
        _this.y+=_this.vy;
        //$LASTPOS=1000193;//user.Bounce:193
        _this.vy+=1;
        //$LASTPOS=1000239;//user.Bounce:239
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=1000270;//user.Bounce:270
          _this.y=Tonyu.globals.$screenHeight;
          //$LASTPOS=1000295;//user.Bounce:295
          _this.vy=- _this.vy;
          
        }
        //$LASTPOS=1000313;//user.Bounce:313
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bounce_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000075;//user.Bounce:75
      _this.vy=0;
      
      _thread.enter(function _trc_Bounce_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000143;//user.Bounce:143
          case 1:
            if (!(_this.x<Tonyu.globals.$screenWidth)) { __pc=3; break; }
            //$LASTPOS=1000172;//user.Bounce:172
            _this.x+=2;
            //$LASTPOS=1000182;//user.Bounce:182
            _this.y+=_this.vy;
            //$LASTPOS=1000193;//user.Bounce:193
            _this.vy+=1;
            //$LASTPOS=1000239;//user.Bounce:239
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=1000270;//user.Bounce:270
              _this.y=Tonyu.globals.$screenHeight;
              //$LASTPOS=1000295;//user.Bounce:295
              _this.vy=- _this.vy;
              
            }
            //$LASTPOS=1000313;//user.Bounce:313
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
      
      //$LASTPOS=2000104;//user.GoRight:104
      while (_this.x<Tonyu.globals.$screenWidth) {
        //$LASTPOS=2000134;//user.GoRight:134
        _this.x++;
        //$LASTPOS=2000187;//user.GoRight:187
        _this.update();
        
      }
    },
    fiber$main :function _trc_GoRight_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_GoRight_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000104;//user.GoRight:104
          case 1:
            if (!(_this.x<Tonyu.globals.$screenWidth)) { __pc=3; break; }
            //$LASTPOS=2000134;//user.GoRight:134
            _this.x++;
            //$LASTPOS=2000187;//user.GoRight:187
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
      
      //$LASTPOS=3000080;//user.Main:80
      new Tonyu.classes.user.Bounce({x: 100,y: 220,p: 12});
      //$LASTPOS=3000111;//user.Main:111
      new Tonyu.classes.user.Bounce({x: 200,y: 120,p: 15});
      //$LASTPOS=3000142;//user.Main:142
      new Tonyu.classes.user.GoRight({x: 50,y: 80,p: 4});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000080;//user.Main:80
      new Tonyu.classes.user.Bounce({x: 100,y: 220,p: 12});
      //$LASTPOS=3000111;//user.Main:111
      new Tonyu.classes.user.Bounce({x: 200,y: 120,p: 15});
      //$LASTPOS=3000142;//user.Main:142
      new Tonyu.classes.user.GoRight({x: 50,y: 80,p: 4});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
