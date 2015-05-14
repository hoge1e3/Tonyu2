Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000058;//user.Ball:58
      _this.miss=0;
      //$LASTPOS=40000066;//user.Ball:66
      while (true) {
        //$LASTPOS=40000193;//user.Ball:193
        if (_this.contactTo(Tonyu.classes.user.Yuka)) {
          //$LASTPOS=40000224;//user.Ball:224
          _this.miss++;
          //$LASTPOS=40000240;//user.Ball:240
          _this.print(_this.miss);
          
        }
        //$LASTPOS=40000263;//user.Ball:263
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000058;//user.Ball:58
      _this.miss=0;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000066;//user.Ball:66
          case 1:
            //$LASTPOS=40000193;//user.Ball:193
            if (_this.contactTo(Tonyu.classes.user.Yuka)) {
              //$LASTPOS=40000224;//user.Ball:224
              _this.miss++;
              //$LASTPOS=40000240;//user.Ball:240
              _this.print(_this.miss);
              
            }
            //$LASTPOS=40000263;//user.Ball:263
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
          _this.vx=- 5;
          
        } else {
          //$LASTPOS=41000110;//user.Bar:110
          if (_this.getkey("right")) {
            //$LASTPOS=41000141;//user.Bar:141
            _this.vx=5;
            
          } else {
            //$LASTPOS=41000190;//user.Bar:190
            _this.vx=0;
            
          }
        }
        //$LASTPOS=41000206;//user.Bar:206
        if (_this.getkey("up")) {
          //$LASTPOS=41000234;//user.Bar:234
          _this.vy=- 2;
          
        } else {
          //$LASTPOS=41000275;//user.Bar:275
          if (_this.getkey("down")) {
            //$LASTPOS=41000305;//user.Bar:305
            _this.vy=2;
            
          } else {
            //$LASTPOS=41000354;//user.Bar:354
            _this.vy=0;
            
          }
        }
        //$LASTPOS=41000370;//user.Bar:370
        if (_this.rotation<0) {
          //$LASTPOS=41000396;//user.Bar:396
          _this.applyTorque(1);
          
        }
        //$LASTPOS=41000422;//user.Bar:422
        if (_this.rotation>0) {
          //$LASTPOS=41000448;//user.Bar:448
          _this.applyTorque(- 1);
          
        }
        //$LASTPOS=41000475;//user.Bar:475
        _this.rotation=_this.rotation*0.7;
        //$LASTPOS=41000502;//user.Bar:502
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
            if (_this.getkey("left")) {
              //$LASTPOS=41000069;//user.Bar:69
              _this.vx=- 5;
              
            } else {
              //$LASTPOS=41000110;//user.Bar:110
              if (_this.getkey("right")) {
                //$LASTPOS=41000141;//user.Bar:141
                _this.vx=5;
                
              } else {
                //$LASTPOS=41000190;//user.Bar:190
                _this.vx=0;
                
              }
            }
            //$LASTPOS=41000206;//user.Bar:206
            if (_this.getkey("up")) {
              //$LASTPOS=41000234;//user.Bar:234
              _this.vy=- 2;
              
            } else {
              //$LASTPOS=41000275;//user.Bar:275
              if (_this.getkey("down")) {
                //$LASTPOS=41000305;//user.Bar:305
                _this.vy=2;
                
              } else {
                //$LASTPOS=41000354;//user.Bar:354
                _this.vy=0;
                
              }
            }
            //$LASTPOS=41000370;//user.Bar:370
            if (!(_this.rotation<0)) { __pc=3; break; }
            //$LASTPOS=41000396;//user.Bar:396
            _this.fiber$applyTorque(_thread, 1);
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=41000422;//user.Bar:422
            if (!(_this.rotation>0)) { __pc=5; break; }
            //$LASTPOS=41000448;//user.Bar:448
            _this.fiber$applyTorque(_thread, - 1);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=41000475;//user.Bar:475
            _this.rotation=_this.rotation*0.7;
            //$LASTPOS=41000502;//user.Bar:502
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=1;break;
          case 7:
            
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
      _this.restitution=0;
      //$LASTPOS=42000158;//user.Block:158
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Block_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000120;//user.Block:120
      _this.isStatic=true;
      //$LASTPOS=42000139;//user.Block:139
      _this.restitution=0;
      
      _thread.enter(function _trc_Block_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000158;//user.Block:158
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
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=44000201;//user.Main:201
      //$LASTPOS=44000206;//user.Main:206
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=44000226;//user.Main:226
          //$LASTPOS=44000231;//user.Main:231
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=44000256;//user.Main:256
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=44000406;//user.Main:406
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=44000458;//user.Main:458
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=44000512;//user.Main:512
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
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=44000201;//user.Main:201
      //$LASTPOS=44000206;//user.Main:206
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=44000226;//user.Main:226
          //$LASTPOS=44000231;//user.Main:231
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=44000256;//user.Main:256
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=44000406;//user.Main:406
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=44000458;//user.Main:458
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=44000512;//user.Main:512
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
