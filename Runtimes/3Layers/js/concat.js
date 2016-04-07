Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Ball:0
      _this.x=_this.rnd(465);
      //$LASTPOS=1000012;//user.Ball:12
      _this.y=_this.rnd(465);
      //$LASTPOS=1000024;//user.Ball:24
      _this.d=_this.rnd(360);
      //$LASTPOS=1000036;//user.Ball:36
      _this.vx=_this.cos(_this.d)*5;
      //$LASTPOS=1000049;//user.Ball:49
      _this.vy=_this.sin(_this.d)*5;
      //$LASTPOS=1000062;//user.Ball:62
      while (true) {
        //$LASTPOS=1000080;//user.Ball:80
        _this.x+=_this.vx;
        //$LASTPOS=1000091;//user.Ball:91
        _this.vx+=_this.clamped(_this.x,0,465);
        //$LASTPOS=1000117;//user.Ball:117
        _this.y+=_this.vy;
        //$LASTPOS=1000128;//user.Ball:128
        _this.vy+=_this.clamped(_this.y,0,465);
        //$LASTPOS=1000154;//user.Ball:154
        if (_this.crashTo(Tonyu.classes.user.Ball)) {
          //$LASTPOS=1000183;//user.Ball:183
          _this.d=_this.rnd(360);
          //$LASTPOS=1000203;//user.Ball:203
          _this.vx=_this.cos(_this.d)*5;
          //$LASTPOS=1000224;//user.Ball:224
          _this.vy=_this.sin(_this.d)*5;
          
        }
        //$LASTPOS=1000256;//user.Ball:256
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Ball:0
      _this.x=_this.rnd(465);
      //$LASTPOS=1000012;//user.Ball:12
      _this.y=_this.rnd(465);
      //$LASTPOS=1000024;//user.Ball:24
      _this.d=_this.rnd(360);
      //$LASTPOS=1000036;//user.Ball:36
      _this.vx=_this.cos(_this.d)*5;
      //$LASTPOS=1000049;//user.Ball:49
      _this.vy=_this.sin(_this.d)*5;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000062;//user.Ball:62
          case 1:
            //$LASTPOS=1000080;//user.Ball:80
            _this.x+=_this.vx;
            //$LASTPOS=1000091;//user.Ball:91
            _this.vx+=_this.clamped(_this.x,0,465);
            //$LASTPOS=1000117;//user.Ball:117
            _this.y+=_this.vy;
            //$LASTPOS=1000128;//user.Ball:128
            _this.vy+=_this.clamped(_this.y,0,465);
            //$LASTPOS=1000154;//user.Ball:154
            if (_this.crashTo(Tonyu.classes.user.Ball)) {
              //$LASTPOS=1000183;//user.Ball:183
              _this.d=_this.rnd(360);
              //$LASTPOS=1000203;//user.Ball:203
              _this.vx=_this.cos(_this.d)*5;
              //$LASTPOS=1000224;//user.Ball:224
              _this.vy=_this.sin(_this.d)*5;
              
            }
            //$LASTPOS=1000256;//user.Ball:256
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
      
      //$LASTPOS=2000001;//user.Main:1
      //$LASTPOS=2000006;//user.Main:6
      _this.i=0;for (; _this.i<10 ; _this.i++) {
        {
          //$LASTPOS=2000026;//user.Main:26
          new Tonyu.classes.user.Ball({p: 0,layer: Tonyu.globals.$mainLayer});
          //$LASTPOS=2000062;//user.Main:62
          new Tonyu.classes.user.Ball({p: 2,layer: Tonyu.globals.$frontLayer});
          //$LASTPOS=2000099;//user.Main:99
          new Tonyu.classes.user.Ball({p: 4,layer: Tonyu.globals.$backLayer});
        }
      }
      //$LASTPOS=2000134;//user.Main:134
      _this.print("start"+_this.all(Tonyu.classes.user.Ball).length);
      //$LASTPOS=2000167;//user.Main:167
      Tonyu.globals.$panel.fillRect(_this.rnd(400),_this.rnd(400),10,10);
      //$LASTPOS=2000209;//user.Main:209
      while (true) {
        //$LASTPOS=2000227;//user.Main:227
        _this.update();
        //$LASTPOS=2000241;//user.Main:241
        if (_this.getkey("z")==1) {
          //$LASTPOS=2000263;//user.Main:263
          _this.all().die();
          
        }
        //$LASTPOS=2000282;//user.Main:282
        if (_this.getkey(32)==1) {
          //$LASTPOS=2000301;//user.Main:301
          _this.loadPage(Tonyu.classes.user.Main);
        }
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000001;//user.Main:1
      //$LASTPOS=2000006;//user.Main:6
      _this.i=0;for (; _this.i<10 ; _this.i++) {
        {
          //$LASTPOS=2000026;//user.Main:26
          new Tonyu.classes.user.Ball({p: 0,layer: Tonyu.globals.$mainLayer});
          //$LASTPOS=2000062;//user.Main:62
          new Tonyu.classes.user.Ball({p: 2,layer: Tonyu.globals.$frontLayer});
          //$LASTPOS=2000099;//user.Main:99
          new Tonyu.classes.user.Ball({p: 4,layer: Tonyu.globals.$backLayer});
        }
      }
      //$LASTPOS=2000134;//user.Main:134
      _this.print("start"+_this.all(Tonyu.classes.user.Ball).length);
      //$LASTPOS=2000167;//user.Main:167
      Tonyu.globals.$panel.fillRect(_this.rnd(400),_this.rnd(400),10,10);
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000209;//user.Main:209
          case 1:
            //$LASTPOS=2000227;//user.Main:227
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000241;//user.Main:241
            if (_this.getkey("z")==1) {
              //$LASTPOS=2000263;//user.Main:263
              _this.all().die();
              
            }
            //$LASTPOS=2000282;//user.Main:282
            if (_this.getkey(32)==1) {
              //$LASTPOS=2000301;//user.Main:301
              _this.loadPage(Tonyu.classes.user.Main);
            }
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
