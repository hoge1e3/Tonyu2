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
      
      //$LASTPOS=54000022;//user.Ball:22
      while (_this.y<450) {
        //$LASTPOS=54000068;//user.Ball:68
        if (_this.c=_this.contactTo()) {
          //$LASTPOS=54000135;//user.Ball:135
          if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
            //$LASTPOS=54000183;//user.Ball:183
            _this.applyImpulse(0,- 16);
          }
          
        }
        //$LASTPOS=54000246;//user.Ball:246
        if (_this.getkey("left")||Tonyu.globals.$pad.getLeft()) {
          //$LASTPOS=54000284;//user.Ball:284
          _this.applyForce(- 10,0);
        }
        //$LASTPOS=54000308;//user.Ball:308
        if (_this.getkey("right")||Tonyu.globals.$pad.getRight()) {
          //$LASTPOS=54000347;//user.Ball:347
          _this.applyForce(10,0);
        }
        //$LASTPOS=54000370;//user.Ball:370
        _this.update();
        
      }
      //$LASTPOS=54000384;//user.Ball:384
      new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "GameOver",size: 20});
      //$LASTPOS=54000433;//user.Ball:433
      _this.updateEx(60);
      //$LASTPOS=54000448;//user.Ball:448
      _this.loadPage(Tonyu.classes.user.Title);
      //$LASTPOS=54000466;//user.Ball:466
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
            //$LASTPOS=54000022;//user.Ball:22
          case 1:
            if (!(_this.y<450)) { __pc=10; break; }
            //$LASTPOS=54000068;//user.Ball:68
            if (!(_this.c=_this.contactTo())) { __pc=4; break; }
            //$LASTPOS=54000135;//user.Ball:135
            if (!(_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1)) { __pc=3; break; }
            //$LASTPOS=54000183;//user.Ball:183
            _this.fiber$applyImpulse(_thread, 0, - 16);
            __pc=2;return;
          case 2:
            
          case 3:
            
          case 4:
            
            //$LASTPOS=54000246;//user.Ball:246
            if (!(_this.getkey("left")||Tonyu.globals.$pad.getLeft())) { __pc=6; break; }
            //$LASTPOS=54000284;//user.Ball:284
            _this.fiber$applyForce(_thread, - 10, 0);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=54000308;//user.Ball:308
            if (!(_this.getkey("right")||Tonyu.globals.$pad.getRight())) { __pc=8; break; }
            //$LASTPOS=54000347;//user.Ball:347
            _this.fiber$applyForce(_thread, 10, 0);
            __pc=7;return;
          case 7:
            
          case 8:
            
            //$LASTPOS=54000370;//user.Ball:370
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10:
            
            //$LASTPOS=54000384;//user.Ball:384
            new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "GameOver",size: 20});
            //$LASTPOS=54000433;//user.Ball:433
            _this.fiber$updateEx(_thread, 60);
            __pc=11;return;
          case 11:
            
            //$LASTPOS=54000448;//user.Ball:448
            _this.loadPage(Tonyu.classes.user.Title);
            //$LASTPOS=54000466;//user.Ball:466
            _this.die();
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
  fullName: 'user.Block',
  shortName: 'Block',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Block_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=55000022;//user.Block:22
      _this.y=0;
      //$LASTPOS=55000028;//user.Block:28
      _this.p=Tonyu.globals.$pat_floor;
      //$LASTPOS=55000043;//user.Block:43
      _this.scaleX=1+Tonyu.globals.$level*0.1;
      //$LASTPOS=55000065;//user.Block:65
      _this.rotation=_this.rnd(360);
      //$LASTPOS=55000085;//user.Block:85
      _this.on("screenOut",0,Tonyu.bindFunc(_this,_this.die));
    },
    fiber$main :function _trc_Block_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=55000022;//user.Block:22
      _this.y=0;
      //$LASTPOS=55000028;//user.Block:28
      _this.p=Tonyu.globals.$pat_floor;
      //$LASTPOS=55000043;//user.Block:43
      _this.scaleX=1+Tonyu.globals.$level*0.1;
      //$LASTPOS=55000065;//user.Block:65
      _this.rotation=_this.rnd(360);
      //$LASTPOS=55000085;//user.Block:85
      _this.on("screenOut",0,Tonyu.bindFunc(_this,_this.die));
      
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
      "use strict";
      var _this=this;
      
      //$LASTPOS=56000119;//user.Main:119
      Tonyu.globals.$b=new Tonyu.classes.user.Ball({density: 2,x: 230,y: 300,shape: "circle",p: 12});
      //$LASTPOS=56000205;//user.Main:205
      new Tonyu.classes.kernel.BodyActor({x: 230,y: 350,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
      //$LASTPOS=56000284;//user.Main:284
      new Tonyu.classes.user.Target;
      //$LASTPOS=56000297;//user.Main:297
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=56000314;//user.Main:314
      Tonyu.globals.$level=0;
      //$LASTPOS=56000325;//user.Main:325
      while (true) {
        //$LASTPOS=56000345;//user.Main:345
        new Tonyu.classes.user.Block({x: Tonyu.globals.$b.x});
        //$LASTPOS=56000435;//user.Main:435
        _this.updateEx(60);
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56000119;//user.Main:119
      Tonyu.globals.$b=new Tonyu.classes.user.Ball({density: 2,x: 230,y: 300,shape: "circle",p: 12});
      //$LASTPOS=56000205;//user.Main:205
      new Tonyu.classes.kernel.BodyActor({x: 230,y: 350,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
      //$LASTPOS=56000284;//user.Main:284
      new Tonyu.classes.user.Target;
      //$LASTPOS=56000297;//user.Main:297
      Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
      //$LASTPOS=56000314;//user.Main:314
      Tonyu.globals.$level=0;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56000325;//user.Main:325
          case 1:
            //$LASTPOS=56000345;//user.Main:345
            new Tonyu.classes.user.Block({x: Tonyu.globals.$b.x});
            //$LASTPOS=56000435;//user.Main:435
            _this.fiber$updateEx(_thread, 60);
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
  fullName: 'user.Target',
  shortName: 'Target',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Target_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000000;//user.Target:0
      _this.p=Tonyu.globals.$pat_neko+30;
      //$LASTPOS=57000019;//user.Target:19
      _this.put();
      //$LASTPOS=57000027;//user.Target:27
      while (true) {
        //$LASTPOS=57000046;//user.Target:46
        if (_this.crashTo(Tonyu.classes.user.Ball)) {
          //$LASTPOS=57000076;//user.Target:76
          _this.nextLevel();
          
        }
        //$LASTPOS=57000102;//user.Target:102
        _this.update();
        
      }
    },
    fiber$main :function _trc_Target_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000000;//user.Target:0
      _this.p=Tonyu.globals.$pat_neko+30;
      
      _thread.enter(function _trc_Target_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000019;//user.Target:19
            _this.fiber$put(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57000027;//user.Target:27
          case 2:
            //$LASTPOS=57000046;//user.Target:46
            if (!(_this.crashTo(Tonyu.classes.user.Ball))) { __pc=4; break; }
            //$LASTPOS=57000076;//user.Target:76
            _this.fiber$nextLevel(_thread);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=57000102;//user.Target:102
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    nextLevel :function _trc_Target_nextLevel() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000138;//user.Target:138
      _this.y=- 1000;
      //$LASTPOS=57000152;//user.Target:152
      Tonyu.globals.$level++;
      //$LASTPOS=57000167;//user.Target:167
      _this.p++;
      //$LASTPOS=57000177;//user.Target:177
      if (_this.p>Tonyu.globals.$pat_neko+39) {
        //$LASTPOS=57000197;//user.Target:197
        _this.p=Tonyu.globals.$pat_neko+30;
      }
      //$LASTPOS=57000218;//user.Target:218
      _this.updateEx(30);
      //$LASTPOS=57000237;//user.Target:237
      _this.put();
    },
    fiber$nextLevel :function _trc_Target_f_nextLevel(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000138;//user.Target:138
      _this.y=- 1000;
      //$LASTPOS=57000152;//user.Target:152
      Tonyu.globals.$level++;
      //$LASTPOS=57000167;//user.Target:167
      _this.p++;
      //$LASTPOS=57000177;//user.Target:177
      if (_this.p>Tonyu.globals.$pat_neko+39) {
        //$LASTPOS=57000197;//user.Target:197
        _this.p=Tonyu.globals.$pat_neko+30;
      }
      
      _thread.enter(function _trc_Target_ent_nextLevel(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000218;//user.Target:218
            _this.fiber$updateEx(_thread, 30);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=57000237;//user.Target:237
            _this.fiber$put(_thread);
            __pc=2;return;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    put :function _trc_Target_put() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=57000262;//user.Target:262
      _this.x=_this.rnd(250)+100;
      //$LASTPOS=57000283;//user.Target:283
      _this.y=30;
    },
    fiber$put :function _trc_Target_f_put(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000262;//user.Target:262
      _this.x=_this.rnd(250)+100;
      //$LASTPOS=57000283;//user.Target:283
      _this.y=30;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"nextLevel":{"nowait":false},"put":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Title',
  shortName: 'Title',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Title_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=58000001;//user.Title:1
      Tonyu.globals.$Screen.resize(465,530);
      //$LASTPOS=58000026;//user.Title:26
      new Tonyu.classes.kernel.Actor({x: 230,y: 100,text: "Box Climber",size: 50});
      //$LASTPOS=58000077;//user.Title:77
      new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "Hit Space or touch",size: 20});
      //$LASTPOS=58000136;//user.Title:136
      while (true) {
        //$LASTPOS=58000154;//user.Title:154
        if (_this.getkey(32)||Tonyu.globals.$touches[0].touched) {
          //$LASTPOS=58000192;//user.Title:192
          _this.loadPage(Tonyu.classes.user.Main);
        }
        //$LASTPOS=58000212;//user.Title:212
        _this.update();
        
      }
    },
    fiber$main :function _trc_Title_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=58000001;//user.Title:1
      Tonyu.globals.$Screen.resize(465,530);
      //$LASTPOS=58000026;//user.Title:26
      new Tonyu.classes.kernel.Actor({x: 230,y: 100,text: "Box Climber",size: 50});
      //$LASTPOS=58000077;//user.Title:77
      new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "Hit Space or touch",size: 20});
      
      _thread.enter(function _trc_Title_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=58000136;//user.Title:136
          case 1:
            //$LASTPOS=58000154;//user.Title:154
            if (_this.getkey(32)||Tonyu.globals.$touches[0].touched) {
              //$LASTPOS=58000192;//user.Title:192
              _this.loadPage(Tonyu.classes.user.Main);
            }
            //$LASTPOS=58000212;//user.Title:212
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
