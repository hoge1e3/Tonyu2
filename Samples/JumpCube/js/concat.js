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
      
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Floor',
  shortName: 'Floor',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Floor_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000020;//user.Floor:20
      _this.p=Tonyu.globals.$pat_wood_texture_00005;
    },
    fiber$main :function _trc_Floor_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000020;//user.Floor:20
      _this.p=Tonyu.globals.$pat_wood_texture_00005;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Goal',
  shortName: 'Goal',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Goal_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Goal_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
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
      
      //$LASTPOS=2000017;//user.Main:17
      new Tonyu.classes.user.Goal({x: 50,y: 50,p: Tonyu.globals.$pat_neko+30});
      //$LASTPOS=2000074;//user.Main:74
      new Tonyu.classes.user.Floor({x: 100,y: 140,scaleX: 10,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=2000180;//user.Main:180
      new Tonyu.classes.user.Floor({x: 300,y: 250,scaleX: 10,scaleY: 1,rotation: - 10,isStatic: true});
      //$LASTPOS=2000288;//user.Main:288
      new Tonyu.classes.user.Floor({x: 300,y: 400,scaleX: 20,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=2000398;//user.Main:398
      new Tonyu.classes.user.Player({x: 400,y: 400,shape: "circle"});
      //$LASTPOS=2000457;//user.Main:457
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000476;//user.Main:476
        _this.updateEx(_this.rnd(120)+60);
        //$LASTPOS=2000504;//user.Main:504
        new Tonyu.classes.user.Ball({x: _this.rnd(200),y: 50,shape: "circle",density: 0.1,p: Tonyu.globals.$pat_base+12});
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000017;//user.Main:17
      new Tonyu.classes.user.Goal({x: 50,y: 50,p: Tonyu.globals.$pat_neko+30});
      //$LASTPOS=2000074;//user.Main:74
      new Tonyu.classes.user.Floor({x: 100,y: 140,scaleX: 10,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=2000180;//user.Main:180
      new Tonyu.classes.user.Floor({x: 300,y: 250,scaleX: 10,scaleY: 1,rotation: - 10,isStatic: true});
      //$LASTPOS=2000288;//user.Main:288
      new Tonyu.classes.user.Floor({x: 300,y: 400,scaleX: 20,scaleY: 1,rotation: 10,isStatic: true});
      //$LASTPOS=2000398;//user.Main:398
      new Tonyu.classes.user.Player({x: 400,y: 400,shape: "circle"});
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000457;//user.Main:457
          case 1:
            //$LASTPOS=2000476;//user.Main:476
            _this.fiber$updateEx(_thread, _this.rnd(120)+60);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000504;//user.Main:504
            new Tonyu.classes.user.Ball({x: _this.rnd(200),y: 50,shape: "circle",density: 0.1,p: Tonyu.globals.$pat_base+12});
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
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000022;//user.Player:22
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=3000041;//user.Player:41
        if (_this.getkey("left")) {
          //$LASTPOS=3000072;//user.Player:72
          _this.applyForce(- 5,0);
          
        }
        //$LASTPOS=3000102;//user.Player:102
        if (_this.getkey("right")) {
          //$LASTPOS=3000134;//user.Player:134
          _this.applyForce(5,0);
          
        }
        //$LASTPOS=3000163;//user.Player:163
        if (_this.contactTo(Tonyu.classes.user.Floor)) {
          //$LASTPOS=3000196;//user.Player:196
          if (_this.getkey("space")==1) {
            //$LASTPOS=3000235;//user.Player:235
            _this.applyImpulse(0,- 6);
            
          }
          
        }
        //$LASTPOS=3000301;//user.Player:301
        _this.b=_this.crashTo(Tonyu.classes.user.Ball);
        //$LASTPOS=3000323;//user.Player:323
        if (_this.b) {
          //$LASTPOS=3000341;//user.Player:341
          if (_this.b.x>_this.x) {
            //$LASTPOS=3000367;//user.Player:367
            _this.applyImpulse(- 2);
            
          } else {
            //$LASTPOS=3000416;//user.Player:416
            _this.applyImpulse(2);
            
          }
          
        }
        //$LASTPOS=3000456;//user.Player:456
        _this.g=_this.crashTo(Tonyu.classes.user.Goal);
        //$LASTPOS=3000478;//user.Player:478
        if (_this.g) {
          //$LASTPOS=3000496;//user.Player:496
          _this.g.die();
          //$LASTPOS=3000514;//user.Player:514
          _this.print("Goal!");
          //$LASTPOS=3000539;//user.Player:539
          _this.updateEx(60);
          //$LASTPOS=3000562;//user.Player:562
          _this.loadPage(Tonyu.classes.user.Main);
          
        }
        //$LASTPOS=3000590;//user.Player:590
        if (_this.x<0||_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=3000628;//user.Player:628
          _this.print("Game over");
          //$LASTPOS=3000657;//user.Player:657
          _this.updateEx(60);
          //$LASTPOS=3000680;//user.Player:680
          _this.loadPage(Tonyu.classes.user.Main);
          //$LASTPOS=3000705;//user.Player:705
          _this.die();
          
        }
        //$LASTPOS=3000724;//user.Player:724
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000022;//user.Player:22
          case 1:
            //$LASTPOS=3000041;//user.Player:41
            if (!(_this.getkey("left"))) { __pc=3     ; break; }
            //$LASTPOS=3000072;//user.Player:72
            _this.fiber$applyForce(_thread, - 5, 0);
            __pc=2;return;
          case 2:
            
          case 3     :
            
            //$LASTPOS=3000102;//user.Player:102
            if (!(_this.getkey("right"))) { __pc=5     ; break; }
            //$LASTPOS=3000134;//user.Player:134
            _this.fiber$applyForce(_thread, 5, 0);
            __pc=4;return;
          case 4:
            
          case 5     :
            
            //$LASTPOS=3000163;//user.Player:163
            if (!(_this.contactTo(Tonyu.classes.user.Floor))) { __pc=8     ; break; }
            //$LASTPOS=3000196;//user.Player:196
            if (!(_this.getkey("space")==1)) { __pc=7     ; break; }
            //$LASTPOS=3000235;//user.Player:235
            _this.fiber$applyImpulse(_thread, 0, - 6);
            __pc=6;return;
          case 6:
            
          case 7     :
            
          case 8     :
            
            //$LASTPOS=3000301;//user.Player:301
            _this.b=_this.crashTo(Tonyu.classes.user.Ball);
            //$LASTPOS=3000323;//user.Player:323
            if (!(_this.b)) { __pc=13    ; break; }
            //$LASTPOS=3000341;//user.Player:341
            if (!(_this.b.x>_this.x)) { __pc=10    ; break; }
            //$LASTPOS=3000367;//user.Player:367
            _this.fiber$applyImpulse(_thread, - 2);
            __pc=9;return;
          case 9:
            
            __pc=12    ;break;
          case 10    :
            //$LASTPOS=3000416;//user.Player:416
            _this.fiber$applyImpulse(_thread, 2);
            __pc=11;return;
          case 11:
            
          case 12    :
            
          case 13    :
            
            //$LASTPOS=3000456;//user.Player:456
            _this.g=_this.crashTo(Tonyu.classes.user.Goal);
            //$LASTPOS=3000478;//user.Player:478
            if (!(_this.g)) { __pc=15    ; break; }
            //$LASTPOS=3000496;//user.Player:496
            _this.g.die();
            //$LASTPOS=3000514;//user.Player:514
            _this.print("Goal!");
            //$LASTPOS=3000539;//user.Player:539
            _this.fiber$updateEx(_thread, 60);
            __pc=14;return;
          case 14:
            
            //$LASTPOS=3000562;//user.Player:562
            _this.loadPage(Tonyu.classes.user.Main);
          case 15    :
            
            //$LASTPOS=3000590;//user.Player:590
            if (!(_this.x<0||_this.x>Tonyu.globals.$screenWidth)) { __pc=17    ; break; }
            //$LASTPOS=3000628;//user.Player:628
            _this.print("Game over");
            //$LASTPOS=3000657;//user.Player:657
            _this.fiber$updateEx(_thread, 60);
            __pc=16;return;
          case 16:
            
            //$LASTPOS=3000680;//user.Player:680
            _this.loadPage(Tonyu.classes.user.Main);
            //$LASTPOS=3000705;//user.Player:705
            _this.die();
          case 17    :
            
            //$LASTPOS=3000724;//user.Player:724
            _this.fiber$update(_thread);
            __pc=18;return;
          case 18:
            
            __pc=1;break;
          case 19    :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"b":{},"g":{}}}
});

//# sourceMappingURL=concat.js.map