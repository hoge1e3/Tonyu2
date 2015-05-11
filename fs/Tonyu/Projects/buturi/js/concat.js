Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Floor',
  shortName: 'Floor',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Floor_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Floor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Goal',
  shortName: 'Goal',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Goal_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Goal_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000016;//user.Main:16
      new Tonyu.classes.user.Goal({x: 50,y: 50,p: Tonyu.globals.$pat_neko+30});
      //$LASTPOS=40000068;//user.Main:68
      new Tonyu.classes.user.Floor({x: 100,y: 140,scaleX: 10,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=40000167;//user.Main:167
      new Tonyu.classes.user.Floor({x: 300,y: 250,scaleX: 10,scaleY: 1,rotation: - 10,isStatic: true});
      //$LASTPOS=40000268;//user.Main:268
      new Tonyu.classes.user.Floor({x: 300,y: 400,scaleX: 20,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=40000369;//user.Main:369
      new Tonyu.classes.user.Player({x: 400,y: 400,shape: "circle"});
      //$LASTPOS=40000423;//user.Main:423
      while (true) {
        //$LASTPOS=40000441;//user.Main:441
        _this.updateEx(_this.rnd(60)+60);
        //$LASTPOS=40000467;//user.Main:467
        new Tonyu.classes.user.Ball({x: _this.rnd(200),y: 50,shape: "circle",density: 0.1,p: Tonyu.globals.$pat_base+12});
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000016;//user.Main:16
      new Tonyu.classes.user.Goal({x: 50,y: 50,p: Tonyu.globals.$pat_neko+30});
      //$LASTPOS=40000068;//user.Main:68
      new Tonyu.classes.user.Floor({x: 100,y: 140,scaleX: 10,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=40000167;//user.Main:167
      new Tonyu.classes.user.Floor({x: 300,y: 250,scaleX: 10,scaleY: 1,rotation: - 10,isStatic: true});
      //$LASTPOS=40000268;//user.Main:268
      new Tonyu.classes.user.Floor({x: 300,y: 400,scaleX: 20,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=40000369;//user.Main:369
      new Tonyu.classes.user.Player({x: 400,y: 400,shape: "circle"});
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000423;//user.Main:423
          case 1:
            //$LASTPOS=40000441;//user.Main:441
            _this.fiber$updateEx(_thread, _this.rnd(60)+60);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40000467;//user.Main:467
            new Tonyu.classes.user.Ball({x: _this.rnd(200),y: 50,shape: "circle",density: 0.1,p: Tonyu.globals.$pat_base+12});
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
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000020;//user.Player:20
      while (true) {
        //$LASTPOS=41000038;//user.Player:38
        if (_this.getkey("left")) {
          //$LASTPOS=41000068;//user.Player:68
          _this.applyForce(- 5,0);
          
        }
        //$LASTPOS=41000096;//user.Player:96
        if (_this.getkey("right")) {
          //$LASTPOS=41000127;//user.Player:127
          _this.applyForce(5,0);
          
        }
        //$LASTPOS=41000154;//user.Player:154
        if (_this.contactTo(Tonyu.classes.user.Floor)) {
          //$LASTPOS=41000186;//user.Player:186
          if (_this.getkey("space")==1) {
            //$LASTPOS=41000224;//user.Player:224
            _this.applyImpulse(0,- 6);
            
          }
          
        }
        //$LASTPOS=41000286;//user.Player:286
        _this.b=_this.crashTo(Tonyu.classes.user.Ball);
        //$LASTPOS=41000307;//user.Player:307
        if (_this.b) {
          //$LASTPOS=41000324;//user.Player:324
          if (_this.b.x>_this.x) {
            //$LASTPOS=41000349;//user.Player:349
            _this.applyImpulse(- 2);
            
          } else {
            //$LASTPOS=41000396;//user.Player:396
            _this.applyImpulse(2);
            
          }
          
        }
        //$LASTPOS=41000433;//user.Player:433
        if (_this.crashTo(Tonyu.classes.user.Goal)) {
          //$LASTPOS=41000462;//user.Player:462
          _this.print("Goal!");
          
        }
        //$LASTPOS=41000488;//user.Player:488
        if (_this.x<0||_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=41000525;//user.Player:525
          _this.print("Game over");
          //$LASTPOS=41000553;//user.Player:553
          _this.die();
          
        }
        //$LASTPOS=41000570;//user.Player:570
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000020;//user.Player:20
          case 1:
            //$LASTPOS=41000038;//user.Player:38
            if (!(_this.getkey("left"))) { __pc=3; break; }
            //$LASTPOS=41000068;//user.Player:68
            _this.fiber$applyForce(_thread, - 5, 0);
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=41000096;//user.Player:96
            if (!(_this.getkey("right"))) { __pc=5; break; }
            //$LASTPOS=41000127;//user.Player:127
            _this.fiber$applyForce(_thread, 5, 0);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=41000154;//user.Player:154
            if (!(_this.contactTo(Tonyu.classes.user.Floor))) { __pc=8; break; }
            //$LASTPOS=41000186;//user.Player:186
            if (!(_this.getkey("space")==1)) { __pc=7; break; }
            //$LASTPOS=41000224;//user.Player:224
            _this.fiber$applyImpulse(_thread, 0, - 6);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
            //$LASTPOS=41000286;//user.Player:286
            _this.b=_this.crashTo(Tonyu.classes.user.Ball);
            //$LASTPOS=41000307;//user.Player:307
            if (!(_this.b)) { __pc=13; break; }
            //$LASTPOS=41000324;//user.Player:324
            if (!(_this.b.x>_this.x)) { __pc=10; break; }
            //$LASTPOS=41000349;//user.Player:349
            _this.fiber$applyImpulse(_thread, - 2);
            __pc=9;return;
          case 9:
            
            __pc=12;break;
          case 10:
            //$LASTPOS=41000396;//user.Player:396
            _this.fiber$applyImpulse(_thread, 2);
            __pc=11;return;
          case 11:
            
          case 12:
            
          case 13:
            
            //$LASTPOS=41000433;//user.Player:433
            if (_this.crashTo(Tonyu.classes.user.Goal)) {
              //$LASTPOS=41000462;//user.Player:462
              _this.print("Goal!");
              
            }
            //$LASTPOS=41000488;//user.Player:488
            if (_this.x<0||_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=41000525;//user.Player:525
              _this.print("Game over");
              //$LASTPOS=41000553;//user.Player:553
              _this.die();
              
            }
            //$LASTPOS=41000570;//user.Player:570
            _this.fiber$update(_thread);
            __pc=14;return;
          case 14:
            
            __pc=1;break;
          case 15:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
