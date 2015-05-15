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
        if (_this.y>400) {
          //$LASTPOS=40000284;//user.Ball:284
          _this.vy-=0.5;
          
        }
        //$LASTPOS=40000303;//user.Ball:303
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
            if (_this.y>400) {
              //$LASTPOS=40000284;//user.Ball:284
              _this.vy-=0.5;
              
            }
            //$LASTPOS=40000303;//user.Ball:303
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
        //$LASTPOS=41000222;//user.Bar:222
        if (_this.getkey("up")) {
          //$LASTPOS=41000250;//user.Bar:250
          _this.vy=- 5;
          
        } else {
          //$LASTPOS=41000291;//user.Bar:291
          if (_this.getkey("down")) {
            //$LASTPOS=41000321;//user.Bar:321
            _this.vy=5;
            
          } else {
            //$LASTPOS=41000348;//user.Bar:348
            _this.vy=0;
            
          }
        }
        //$LASTPOS=41000563;//user.Bar:563
        _this.rotation=_this.vrotation=0;
        //$LASTPOS=41000589;//user.Bar:589
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
            //$LASTPOS=41000222;//user.Bar:222
            if (_this.getkey("up")) {
              //$LASTPOS=41000250;//user.Bar:250
              _this.vy=- 5;
              
            } else {
              //$LASTPOS=41000291;//user.Bar:291
              if (_this.getkey("down")) {
                //$LASTPOS=41000321;//user.Bar:321
                _this.vy=5;
                
              } else {
                //$LASTPOS=41000348;//user.Bar:348
                _this.vy=0;
                
              }
            }
            //$LASTPOS=41000563;//user.Bar:563
            _this.rotation=_this.vrotation=0;
            //$LASTPOS=41000589;//user.Bar:589
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
      
      //$LASTPOS=43000041;//user.Body:41
      _this.x=20;
      //$LASTPOS=43000052;//user.Body:52
      _this.y=30;
      //$LASTPOS=43000063;//user.Body:63
      _this.vx=2;
      //$LASTPOS=43000068;//user.Body:68
      _this.vy=0;
      //$LASTPOS=43000079;//user.Body:79
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Body_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000041;//user.Body:41
      _this.x=20;
      //$LASTPOS=43000052;//user.Body:52
      _this.y=30;
      //$LASTPOS=43000063;//user.Body:63
      _this.vx=2;
      //$LASTPOS=43000068;//user.Body:68
      _this.vy=0;
      
      _thread.enter(function _trc_Body_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=43000079;//user.Body:79
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
      
      //$LASTPOS=44000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=44000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=44000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=44000096;//user.Kabe:96
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Kabe_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=44000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=44000076;//user.Kabe:76
      _this.restitution=1;
      
      _thread.enter(function _trc_Kabe_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000096;//user.Kabe:96
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
      
      //$LASTPOS=45000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=45000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=45000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=45000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=45000221;//user.Main:221
      new Tonyu.classes.user.Body;
      //$LASTPOS=45000232;//user.Main:232
      //$LASTPOS=45000237;//user.Main:237
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=45000257;//user.Main:257
          //$LASTPOS=45000262;//user.Main:262
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=45000287;//user.Main:287
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=45000437;//user.Main:437
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=45000489;//user.Main:489
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=45000543;//user.Main:543
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=45000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=45000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=45000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=45000221;//user.Main:221
      new Tonyu.classes.user.Body;
      //$LASTPOS=45000232;//user.Main:232
      //$LASTPOS=45000237;//user.Main:237
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=45000257;//user.Main:257
          //$LASTPOS=45000262;//user.Main:262
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=45000287;//user.Main:287
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=45000437;//user.Main:437
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=45000489;//user.Main:489
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=45000543;//user.Main:543
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
      
      //$LASTPOS=46000001;//user.Norm:1
      while (true) {
        //$LASTPOS=46000019;//user.Norm:19
        _this.x+=2;
        //$LASTPOS=46000029;//user.Norm:29
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
            //$LASTPOS=46000001;//user.Norm:1
          case 1:
            //$LASTPOS=46000019;//user.Norm:19
            _this.x+=2;
            //$LASTPOS=46000029;//user.Norm:29
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
