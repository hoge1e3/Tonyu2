Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000022;//user.Ball:22
      while (_this.y<450) {
        Tonyu.checkLoop();
        //$LASTPOS=1000068;//user.Ball:68
        if (_this.c=_this.contactTo()) {
          //$LASTPOS=1000135;//user.Ball:135
          if (_this.getkey("space")==1) {
            //$LASTPOS=1000159;//user.Ball:159
            _this.applyImpulse(0,- 5);
          }
          
        }
        //$LASTPOS=1000221;//user.Ball:221
        if (_this.getkey("left")) {
          //$LASTPOS=1000241;//user.Ball:241
          _this.applyForce(- 5,0);
        }
        //$LASTPOS=1000264;//user.Ball:264
        if (_this.getkey("right")) {
          //$LASTPOS=1000285;//user.Ball:285
          _this.applyForce(5,0);
        }
        //$LASTPOS=1000307;//user.Ball:307
        _this.update();
        
      }
      //$LASTPOS=1000321;//user.Ball:321
      _this.die();
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000022;//user.Ball:22
          case 1:
            if (!(_this.y<450)) { __pc=10    ; break; }
            //$LASTPOS=1000068;//user.Ball:68
            if (!(_this.c=_this.contactTo())) { __pc=4     ; break; }
            //$LASTPOS=1000135;//user.Ball:135
            if (!(_this.getkey("space")==1)) { __pc=3     ; break; }
            //$LASTPOS=1000159;//user.Ball:159
            _this.fiber$applyImpulse(_thread, 0, - 5);
            __pc=2;return;
          case 2:
            
          case 3     :
            
          case 4     :
            
            //$LASTPOS=1000221;//user.Ball:221
            if (!(_this.getkey("left"))) { __pc=6     ; break; }
            //$LASTPOS=1000241;//user.Ball:241
            _this.fiber$applyForce(_thread, - 5, 0);
            __pc=5;return;
          case 5:
            
          case 6     :
            
            //$LASTPOS=1000264;//user.Ball:264
            if (!(_this.getkey("right"))) { __pc=8     ; break; }
            //$LASTPOS=1000285;//user.Ball:285
            _this.fiber$applyForce(_thread, 5, 0);
            __pc=7;return;
          case 7:
            
          case 8     :
            
            //$LASTPOS=1000307;//user.Ball:307
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10    :
            
            //$LASTPOS=1000321;//user.Ball:321
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"c":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Block',
  shortName: 'Block',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Block_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000020;//user.Block:20
      while (! _this.screenOut()) {
        Tonyu.checkLoop();
        //$LASTPOS=2000047;//user.Block:47
        _this.update();
        
      }
      //$LASTPOS=2000064;//user.Block:64
      _this.die();
    },
    fiber$main :function _trc_Block_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Block_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000020;//user.Block:20
          case 1:
            if (!(! _this.screenOut())) { __pc=3     ; break; }
            //$LASTPOS=2000047;//user.Block:47
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=2000064;//user.Block:64
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=3000062;//user.Main:62
      _this.print("Use ← → and Space");
      //$LASTPOS=3000122;//user.Main:122
      new Tonyu.classes.user.Ball({x: 100,y: 50,shape: "circle",p: 12});
      //$LASTPOS=3000194;//user.Main:194
      new Tonyu.classes.kernel.T2Body({x: 230,y: 400,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
      //$LASTPOS=3000272;//user.Main:272
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=3000292;//user.Main:292
        new Tonyu.classes.user.Block({x: _this.rnd()*400,y: 0,p: Tonyu.globals.$pat_floor,scaleX: 3,scaleY: 1,rotation: _this.rnd(360)});
        //$LASTPOS=3000380;//user.Main:380
        _this.updateEx(120);
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000062;//user.Main:62
      _this.print("Use ← → and Space");
      //$LASTPOS=3000122;//user.Main:122
      new Tonyu.classes.user.Ball({x: 100,y: 50,shape: "circle",p: 12});
      //$LASTPOS=3000194;//user.Main:194
      new Tonyu.classes.kernel.T2Body({x: 230,y: 400,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000272;//user.Main:272
          case 1:
            //$LASTPOS=3000292;//user.Main:292
            new Tonyu.classes.user.Block({x: _this.rnd()*400,y: 0,p: Tonyu.globals.$pat_floor,scaleX: 3,scaleY: 1,rotation: _this.rnd(360)});
            //$LASTPOS=3000380;//user.Main:380
            _this.fiber$updateEx(_thread, 120);
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