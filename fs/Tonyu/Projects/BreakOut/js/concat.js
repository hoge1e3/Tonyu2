Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Ball_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000058;//user.Ball:58
      _this.miss=0;
      //$LASTPOS=1000066;//user.Ball:66
      while (true) {
        //$LASTPOS=1000193;//user.Ball:193
        if (_this.contactTo(Tonyu.classes.user.Yuka)) {
          //$LASTPOS=1000224;//user.Ball:224
          _this.miss++;
          //$LASTPOS=1000240;//user.Ball:240
          _this.print(_this.miss);
          
        }
        //$LASTPOS=1000263;//user.Ball:263
        if (_this.y>400) {
          //$LASTPOS=1000284;//user.Ball:284
          _this.vy-=0.5;
          
        }
        //$LASTPOS=1000303;//user.Ball:303
        _this.update();
        
      }
    },
    fiber$main :function _trc_Ball_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000058;//user.Ball:58
      _this.miss=0;
      
      _thread.enter(function _trc_Ball_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000066;//user.Ball:66
          case 1:
            //$LASTPOS=1000193;//user.Ball:193
            if (_this.contactTo(Tonyu.classes.user.Yuka)) {
              //$LASTPOS=1000224;//user.Ball:224
              _this.miss++;
              //$LASTPOS=1000240;//user.Ball:240
              _this.print(_this.miss);
              
            }
            //$LASTPOS=1000263;//user.Ball:263
            if (_this.y>400) {
              //$LASTPOS=1000284;//user.Ball:284
              _this.vy-=0.5;
              
            }
            //$LASTPOS=1000303;//user.Ball:303
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
      
      //$LASTPOS=2000020;//user.Bar:20
      while (true) {
        //$LASTPOS=2000039;//user.Bar:39
        if (_this.getkey("left")) {
          //$LASTPOS=2000069;//user.Bar:69
          _this.vx=- 5;
          
        } else {
          //$LASTPOS=2000110;//user.Bar:110
          if (_this.getkey("right")) {
            //$LASTPOS=2000141;//user.Bar:141
            _this.vx=5;
            
          } else {
            //$LASTPOS=2000190;//user.Bar:190
            _this.vx=0;
            
          }
        }
        //$LASTPOS=2000222;//user.Bar:222
        if (_this.getkey("up")) {
          //$LASTPOS=2000250;//user.Bar:250
          _this.vy=- 5;
          
        } else {
          //$LASTPOS=2000291;//user.Bar:291
          if (_this.getkey("down")) {
            //$LASTPOS=2000321;//user.Bar:321
            _this.vy=5;
            
          } else {
            //$LASTPOS=2000348;//user.Bar:348
            _this.vy=0;
            
          }
        }
        //$LASTPOS=2000563;//user.Bar:563
        _this.rotation=_this.vrotation=0;
        //$LASTPOS=2000589;//user.Bar:589
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
            //$LASTPOS=2000020;//user.Bar:20
          case 1:
            //$LASTPOS=2000039;//user.Bar:39
            if (_this.getkey("left")) {
              //$LASTPOS=2000069;//user.Bar:69
              _this.vx=- 5;
              
            } else {
              //$LASTPOS=2000110;//user.Bar:110
              if (_this.getkey("right")) {
                //$LASTPOS=2000141;//user.Bar:141
                _this.vx=5;
                
              } else {
                //$LASTPOS=2000190;//user.Bar:190
                _this.vx=0;
                
              }
            }
            //$LASTPOS=2000222;//user.Bar:222
            if (_this.getkey("up")) {
              //$LASTPOS=2000250;//user.Bar:250
              _this.vy=- 5;
              
            } else {
              //$LASTPOS=2000291;//user.Bar:291
              if (_this.getkey("down")) {
                //$LASTPOS=2000321;//user.Bar:321
                _this.vy=5;
                
              } else {
                //$LASTPOS=2000348;//user.Bar:348
                _this.vy=0;
                
              }
            }
            //$LASTPOS=2000563;//user.Bar:563
            _this.rotation=_this.vrotation=0;
            //$LASTPOS=2000589;//user.Bar:589
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
  fullName: 'user.Block',
  shortName: 'Block',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Block_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000020;//user.Block:20
      while (true) {
        //$LASTPOS=3000039;//user.Block:39
        if (_this.contactTo(Tonyu.classes.user.Ball)) {
          //$LASTPOS=3000070;//user.Block:70
          _this.die();
          
        }
        //$LASTPOS=3000090;//user.Block:90
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
            //$LASTPOS=3000020;//user.Block:20
          case 1:
            //$LASTPOS=3000039;//user.Block:39
            if (_this.contactTo(Tonyu.classes.user.Ball)) {
              //$LASTPOS=3000070;//user.Block:70
              _this.die();
              
            }
            //$LASTPOS=3000090;//user.Block:90
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
      
      //$LASTPOS=3000120;//user.Block:120
      _this.isStatic=true;
      //$LASTPOS=3000139;//user.Block:139
      _this.restitution=0;
      //$LASTPOS=3000158;//user.Block:158
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Block_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000120;//user.Block:120
      _this.isStatic=true;
      //$LASTPOS=3000139;//user.Block:139
      _this.restitution=0;
      
      _thread.enter(function _trc_Block_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000158;//user.Block:158
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
  fullName: 'user.Body',
  shortName: 'Body',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Body_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Body_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    onAppear :function _trc_Body_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000041;//user.Body:41
      _this.x=20;
      //$LASTPOS=4000052;//user.Body:52
      _this.y=30;
      //$LASTPOS=4000063;//user.Body:63
      _this.vx=2;
      //$LASTPOS=4000068;//user.Body:68
      _this.vy=0;
      //$LASTPOS=4000079;//user.Body:79
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Body_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000041;//user.Body:41
      _this.x=20;
      //$LASTPOS=4000052;//user.Body:52
      _this.y=30;
      //$LASTPOS=4000063;//user.Body:63
      _this.vx=2;
      //$LASTPOS=4000068;//user.Body:68
      _this.vy=0;
      
      _thread.enter(function _trc_Body_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000079;//user.Body:79
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
      
      //$LASTPOS=5000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=5000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=5000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=5000096;//user.Kabe:96
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Kabe_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=5000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=5000076;//user.Kabe:76
      _this.restitution=1;
      
      _thread.enter(function _trc_Kabe_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000096;//user.Kabe:96
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
      
      //$LASTPOS=6000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=6000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=6000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=6000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=6000221;//user.Main:221
      new Tonyu.classes.user.Body;
      //$LASTPOS=6000232;//user.Main:232
      //$LASTPOS=6000237;//user.Main:237
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=6000257;//user.Main:257
          //$LASTPOS=6000262;//user.Main:262
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=6000287;//user.Main:287
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=6000437;//user.Main:437
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=6000489;//user.Main:489
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=6000543;//user.Main:543
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=6000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=6000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=6000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=6000221;//user.Main:221
      new Tonyu.classes.user.Body;
      //$LASTPOS=6000232;//user.Main:232
      //$LASTPOS=6000237;//user.Main:237
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=6000257;//user.Main:257
          //$LASTPOS=6000262;//user.Main:262
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=6000287;//user.Main:287
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=6000437;//user.Main:437
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=6000489;//user.Main:489
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=6000543;//user.Main:543
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Norm',
  shortName: 'Norm',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Norm_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=7000001;//user.Norm:1
      while (true) {
        //$LASTPOS=7000019;//user.Norm:19
        _this.x+=2;
        //$LASTPOS=7000029;//user.Norm:29
        _this.update();
        
      }
    },
    fiber$main :function _trc_Norm_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Norm_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000001;//user.Norm:1
          case 1:
            //$LASTPOS=7000019;//user.Norm:19
            _this.x+=2;
            //$LASTPOS=7000029;//user.Norm:29
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
