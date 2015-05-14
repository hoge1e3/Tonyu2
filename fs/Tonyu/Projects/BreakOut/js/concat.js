Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000020;//user.Ball:20
      _this.applyImpulse(0.2,0.2);
      //$LASTPOS=40000043;//user.Ball:43
      _this.miss=0;
      //$LASTPOS=40000051;//user.Ball:51
      while (true) {
        //$LASTPOS=40000161;//user.Ball:161
        if (_this.contactTo(Tonyu.classes.user.Yuka)) {
          //$LASTPOS=40000192;//user.Ball:192
          _this.miss++;
          //$LASTPOS=40000208;//user.Ball:208
          _this.print(_this.miss);
          
        }
        //$LASTPOS=40000231;//user.Ball:231
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000020;//user.Ball:20
            _this.fiber$applyImpulse(_thread, 0.2, 0.2);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=40000043;//user.Ball:43
            _this.miss=0;
            //$LASTPOS=40000051;//user.Ball:51
          case 2:
            //$LASTPOS=40000161;//user.Ball:161
            if (_this.contactTo(Tonyu.classes.user.Yuka)) {
              //$LASTPOS=40000192;//user.Ball:192
              _this.miss++;
              //$LASTPOS=40000208;//user.Ball:208
              _this.print(_this.miss);
              
            }
            //$LASTPOS=40000231;//user.Ball:231
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
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
  fullName: 'user.Bar',
  shortName: 'Bar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Bar_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000020;//user.Bar:20
      while (true) {
        //$LASTPOS=41000039;//user.Bar:39
        if (_this.getkey("left")) {
          //$LASTPOS=41000069;//user.Bar:69
          _this.applyForce(- 40,0);
          
        }
        //$LASTPOS=41000106;//user.Bar:106
        if (_this.getkey("right")) {
          //$LASTPOS=41000137;//user.Bar:137
          _this.applyForce(40,0);
          
        }
        //$LASTPOS=41000165;//user.Bar:165
        if (_this.getkey("up")) {
          //$LASTPOS=41000193;//user.Bar:193
          _this.applyImpulse(0,- 2);
          
        }
        //$LASTPOS=41000223;//user.Bar:223
        if (_this.getkey("down")) {
          //$LASTPOS=41000253;//user.Bar:253
          _this.applyImpulse(0,2);
          
        }
        //$LASTPOS=41000282;//user.Bar:282
        _this.update();
        
      }
    },
    fiber$main :function _trc_Bar_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Bar_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000020;//user.Bar:20
          case 1:
            //$LASTPOS=41000039;//user.Bar:39
            if (!(_this.getkey("left"))) { __pc=3; break; }
            //$LASTPOS=41000069;//user.Bar:69
            _this.fiber$applyForce(_thread, - 40, 0);
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=41000106;//user.Bar:106
            if (!(_this.getkey("right"))) { __pc=5; break; }
            //$LASTPOS=41000137;//user.Bar:137
            _this.fiber$applyForce(_thread, 40, 0);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=41000165;//user.Bar:165
            if (!(_this.getkey("up"))) { __pc=7; break; }
            //$LASTPOS=41000193;//user.Bar:193
            _this.fiber$applyImpulse(_thread, 0, - 2);
            __pc=6;return;
          case 6:
            
          case 7:
            
            //$LASTPOS=41000223;//user.Bar:223
            if (!(_this.getkey("down"))) { __pc=9; break; }
            //$LASTPOS=41000253;//user.Bar:253
            _this.fiber$applyImpulse(_thread, 0, 2);
            __pc=8;return;
          case 8:
            
          case 9:
            
            //$LASTPOS=41000282;//user.Bar:282
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            __pc=1;break;
          case 11:
            
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000020;//user.Block:20
      while (true) {
        //$LASTPOS=42000039;//user.Block:39
        if (_this.contactTo(Tonyu.classes.user.Ball)) {
          //$LASTPOS=42000070;//user.Block:70
          _this.die();
          
        }
        //$LASTPOS=42000090;//user.Block:90
        _this.update();
        
      }
    },
    fiber$main :function _trc_Block_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Block_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000020;//user.Block:20
          case 1:
            //$LASTPOS=42000039;//user.Block:39
            if (_this.contactTo(Tonyu.classes.user.Ball)) {
              //$LASTPOS=42000070;//user.Block:70
              _this.die();
              
            }
            //$LASTPOS=42000090;//user.Block:90
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
    onAppear :function _trc_Block_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000120;//user.Block:120
      _this.isStatic=true;
      //$LASTPOS=42000139;//user.Block:139
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Block_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000120;//user.Block:120
      _this.isStatic=true;
      
      _thread.enter(function _trc_Block_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000139;//user.Block:139
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
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Kabe',
  shortName: 'Kabe',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Kabe_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Kabe_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Kabe_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=43000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=43000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=43000096;//user.Kabe:96
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Kabe_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=43000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=43000076;//user.Kabe:76
      _this.restitution=1;
      
      _thread.enter(function _trc_Kabe_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000096;//user.Kabe:96
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
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}}}
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
      
      //$LASTPOS=44000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=44000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=44000098;//user.Main:98
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0});
      //$LASTPOS=44000190;//user.Main:190
      //$LASTPOS=44000195;//user.Main:195
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=44000215;//user.Main:215
          //$LASTPOS=44000220;//user.Main:220
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=44000245;//user.Main:245
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=44000294;//user.Main:294
      new Tonyu.classes.user.Yuka({x: 200,y: 420,scaleX: 20,scaleY: 1,isStatic: true,friction: 0,restitution: 0});
      //$LASTPOS=44000391;//user.Main:391
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=44000443;//user.Main:443
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=44000497;//user.Main:497
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=44000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=44000098;//user.Main:98
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0});
      //$LASTPOS=44000190;//user.Main:190
      //$LASTPOS=44000195;//user.Main:195
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=44000215;//user.Main:215
          //$LASTPOS=44000220;//user.Main:220
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=44000245;//user.Main:245
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=44000294;//user.Main:294
      new Tonyu.classes.user.Yuka({x: 200,y: 420,scaleX: 20,scaleY: 1,isStatic: true,friction: 0,restitution: 0});
      //$LASTPOS=44000391;//user.Main:391
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=44000443;//user.Main:443
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=44000497;//user.Main:497
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Yuka',
  shortName: 'Yuka',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Yuka_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Yuka_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
