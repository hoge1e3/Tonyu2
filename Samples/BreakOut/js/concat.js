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
      
      //$LASTPOS=1000062;//user.Ball:62
      _this.miss=0;
      //$LASTPOS=1000071;//user.Ball:71
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000204;//user.Ball:204
        if (_this.contactTo(Tonyu.classes.user.Yuka)) {
          //$LASTPOS=1000236;//user.Ball:236
          _this.miss++;
          //$LASTPOS=1000253;//user.Ball:253
          _this.print(_this.miss);
          
        }
        //$LASTPOS=1000278;//user.Ball:278
        if (_this.y>500) {
          //$LASTPOS=1000300;//user.Ball:300
          _this.loadPage(Tonyu.classes.user.Main);
          
        }
        //$LASTPOS=1000328;//user.Ball:328
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000062;//user.Ball:62
      _this.miss=0;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000071;//user.Ball:71
          case 1:
            //$LASTPOS=1000204;//user.Ball:204
            if (_this.contactTo(Tonyu.classes.user.Yuka)) {
              //$LASTPOS=1000236;//user.Ball:236
              _this.miss++;
              //$LASTPOS=1000253;//user.Ball:253
              _this.print(_this.miss);
              
            }
            //$LASTPOS=1000278;//user.Ball:278
            if (_this.y>500) {
              //$LASTPOS=1000300;//user.Ball:300
              _this.loadPage(Tonyu.classes.user.Main);
              
            }
            //$LASTPOS=1000328;//user.Ball:328
            _this.fiber$update(_thread);
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"miss":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Bar',
  shortName: 'Bar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Bar_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=2000022;//user.Bar:22
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=2000042;//user.Bar:42
        if (_this.getkey("left")) {
          //$LASTPOS=2000073;//user.Bar:73
          _this.vx=- 3;
          
        } else {
          //$LASTPOS=2000100;//user.Bar:100
          if (_this.getkey("right")) {
            //$LASTPOS=2000132;//user.Bar:132
            _this.vx=3;
            
          } else {
            //$LASTPOS=2000167;//user.Bar:167
            _this.vx=0;
            
          }
        }
        //$LASTPOS=2000202;//user.Bar:202
        if (_this.getkey("up")) {
          //$LASTPOS=2000231;//user.Bar:231
          _this.vy=- 3;
          
        } else {
          //$LASTPOS=2000255;//user.Bar:255
          if (_this.getkey("down")) {
            //$LASTPOS=2000286;//user.Bar:286
            _this.vy=3;
            
          } else {
            //$LASTPOS=2000315;//user.Bar:315
            _this.vy=0;
            
          }
        }
        //$LASTPOS=2000333;//user.Bar:333
        _this.rotation=_this.vrotation=0;
        //$LASTPOS=2000360;//user.Bar:360
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bar_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Bar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000022;//user.Bar:22
          case 1:
            //$LASTPOS=2000042;//user.Bar:42
            if (_this.getkey("left")) {
              //$LASTPOS=2000073;//user.Bar:73
              _this.vx=- 3;
              
            } else {
              //$LASTPOS=2000100;//user.Bar:100
              if (_this.getkey("right")) {
                //$LASTPOS=2000132;//user.Bar:132
                _this.vx=3;
                
              } else {
                //$LASTPOS=2000167;//user.Bar:167
                _this.vx=0;
                
              }
            }
            //$LASTPOS=2000202;//user.Bar:202
            if (_this.getkey("up")) {
              //$LASTPOS=2000231;//user.Bar:231
              _this.vy=- 3;
              
            } else {
              //$LASTPOS=2000255;//user.Bar:255
              if (_this.getkey("down")) {
                //$LASTPOS=2000286;//user.Bar:286
                _this.vy=3;
                
              } else {
                //$LASTPOS=2000315;//user.Bar:315
                _this.vy=0;
                
              }
            }
            //$LASTPOS=2000333;//user.Bar:333
            _this.rotation=_this.vrotation=0;
            //$LASTPOS=2000360;//user.Bar:360
            _this.fiber$update(_thread);
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
      
      //$LASTPOS=3000022;//user.Block:22
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=3000042;//user.Block:42
        if (_this.contactTo(Tonyu.classes.user.Ball)) {
          //$LASTPOS=3000074;//user.Block:74
          _this.die();
          
        }
        //$LASTPOS=3000096;//user.Block:96
        _this.update();
        
      }
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
            //$LASTPOS=3000022;//user.Block:22
          case 1:
            //$LASTPOS=3000042;//user.Block:42
            if (_this.contactTo(Tonyu.classes.user.Ball)) {
              //$LASTPOS=3000074;//user.Block:74
              _this.die();
              
            }
            //$LASTPOS=3000096;//user.Block:96
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Block_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=3000129;//user.Block:129
      _this.isStatic=true;
      //$LASTPOS=3000149;//user.Block:149
      _this.restitution=0;
      //$LASTPOS=3000169;//user.Block:169
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Block_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000129;//user.Block:129
      _this.isStatic=true;
      //$LASTPOS=3000149;//user.Block:149
      _this.restitution=0;
      
      _thread.enter(function _trc_Block_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000169;//user.Block:169
            Tonyu.classes.kernel.BodyActor.prototype.fiber$onAppear.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Kabe',
  shortName: 'Kabe',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Kabe_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Kabe_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Kabe_onAppear() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=4000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=4000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=4000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=4000096;//user.Kabe:96
      _this.p=Tonyu.globals.$pat_wood_texture_00005;
      //$LASTPOS=4000128;//user.Kabe:128
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Kabe_f_onAppear(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=4000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=4000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=4000096;//user.Kabe:96
      _this.p=Tonyu.globals.$pat_wood_texture_00005;
      
      _thread.enter(function _trc_Kabe_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000128;//user.Kabe:128
            Tonyu.classes.kernel.BodyActor.prototype.fiber$onAppear.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}},"fields":{}}
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
      
      //$LASTPOS=5000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=5000025;//user.Main:25
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=5000101;//user.Main:101
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 1,vy: 2});
      //$LASTPOS=5000208;//user.Main:208
      //$LASTPOS=5000213;//user.Main:213
      _this.i=0;for (; _this.i<3 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=5000234;//user.Main:234
          //$LASTPOS=5000239;//user.Main:239
          _this.j=0;for (; _this.j<6 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=5000265;//user.Main:265
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 2+_this.i});
            }
          }
        }
      }
      //$LASTPOS=5000320;//user.Main:320
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=5000377;//user.Main:377
      new Tonyu.classes.user.Kabe({x: 8,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=5000434;//user.Main:434
      new Tonyu.classes.user.Kabe({x: 460,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=5000495;//user.Main:495
      while (_this.all(Tonyu.classes.user.Block).length>0) {
        Tonyu.checkLoop();
        //$LASTPOS=5000529;//user.Main:529
        _this.update();
        
      }
      //$LASTPOS=5000543;//user.Main:543
      _this.updateEx(30);
      //$LASTPOS=5000558;//user.Main:558
      _this.loadPage(Tonyu.classes.user.Main);
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=5000025;//user.Main:25
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=5000101;//user.Main:101
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 1,vy: 2});
      //$LASTPOS=5000208;//user.Main:208
      //$LASTPOS=5000213;//user.Main:213
      _this.i=0;for (; _this.i<3 ; _this.i++) {
        Tonyu.checkLoop();
        {
          //$LASTPOS=5000234;//user.Main:234
          //$LASTPOS=5000239;//user.Main:239
          _this.j=0;for (; _this.j<6 ; _this.j++) {
            Tonyu.checkLoop();
            {
              //$LASTPOS=5000265;//user.Main:265
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 2+_this.i});
            }
          }
        }
      }
      //$LASTPOS=5000320;//user.Main:320
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=5000377;//user.Main:377
      new Tonyu.classes.user.Kabe({x: 8,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=5000434;//user.Main:434
      new Tonyu.classes.user.Kabe({x: 460,y: 200,scaleX: 0.5,scaleY: 20});
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000495;//user.Main:495
          case 1:
            if (!(_this.all(Tonyu.classes.user.Block).length>0)) { __pc=3     ; break; }
            //$LASTPOS=5000529;//user.Main:529
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3     :
            
            //$LASTPOS=5000543;//user.Main:543
            _this.fiber$updateEx(_thread, 30);
            __pc=4;return;
          case 4:
            
            //$LASTPOS=5000558;//user.Main:558
            _this.loadPage(Tonyu.classes.user.Main);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"i":{},"j":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Yuka',
  shortName: 'Yuka',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Yuka_main() {
      "use strict";
      var _this=this;
      
    },
    fiber$main :function _trc_Yuka_f_main(_thread) {
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

//# sourceMappingURL=concat.js.map