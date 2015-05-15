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
          _this.vx-=1;
          
        } else {
          //$LASTPOS=2000110;//user.Bar:110
          if (_this.getkey("right")) {
            //$LASTPOS=2000141;//user.Bar:141
            _this.vx+=1;
            
          }
        }
        //$LASTPOS=2000180;//user.Bar:180
        _this.vx*=0.95;
        //$LASTPOS=2000194;//user.Bar:194
        if (_this.getkey("up")) {
          //$LASTPOS=2000222;//user.Bar:222
          _this.vy=- 5;
          
        } else {
          //$LASTPOS=2000263;//user.Bar:263
          if (_this.getkey("down")) {
            //$LASTPOS=2000293;//user.Bar:293
            _this.vy=5;
            
          }
        }
        //$LASTPOS=2000309;//user.Bar:309
        if (_this.y<390) {
          //$LASTPOS=2000320;//user.Bar:320
          _this.vy+=1;
        }
        //$LASTPOS=2000331;//user.Bar:331
        if (_this.y>410) {
          //$LASTPOS=2000343;//user.Bar:343
          _this.vy-=1;
          
        }
        //$LASTPOS=2000355;//user.Bar:355
        _this.vy*=0.95;
        //$LASTPOS=2000369;//user.Bar:369
        if (_this.rotation<- 10) {
          //$LASTPOS=2000397;//user.Bar:397
          _this.vrotation=1;
          
        }
        //$LASTPOS=2000420;//user.Bar:420
        if (_this.rotation>10) {
          //$LASTPOS=2000447;//user.Bar:447
          _this.vrotation=- 1;
          
        }
        //$LASTPOS=2000471;//user.Bar:471
        _this.rotation=_this.rotation*0.7;
        //$LASTPOS=2000498;//user.Bar:498
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
              _this.vx-=1;
              
            } else {
              //$LASTPOS=2000110;//user.Bar:110
              if (_this.getkey("right")) {
                //$LASTPOS=2000141;//user.Bar:141
                _this.vx+=1;
                
              }
            }
            //$LASTPOS=2000180;//user.Bar:180
            _this.vx*=0.95;
            //$LASTPOS=2000194;//user.Bar:194
            if (_this.getkey("up")) {
              //$LASTPOS=2000222;//user.Bar:222
              _this.vy=- 5;
              
            } else {
              //$LASTPOS=2000263;//user.Bar:263
              if (_this.getkey("down")) {
                //$LASTPOS=2000293;//user.Bar:293
                _this.vy=5;
                
              }
            }
            //$LASTPOS=2000309;//user.Bar:309
            if (_this.y<390) {
              //$LASTPOS=2000320;//user.Bar:320
              _this.vy+=1;
            }
            //$LASTPOS=2000331;//user.Bar:331
            if (_this.y>410) {
              //$LASTPOS=2000343;//user.Bar:343
              _this.vy-=1;
              
            }
            //$LASTPOS=2000355;//user.Bar:355
            _this.vy*=0.95;
            //$LASTPOS=2000369;//user.Bar:369
            if (_this.rotation<- 10) {
              //$LASTPOS=2000397;//user.Bar:397
              _this.vrotation=1;
              
            }
            //$LASTPOS=2000420;//user.Bar:420
            if (_this.rotation>10) {
              //$LASTPOS=2000447;//user.Bar:447
              _this.vrotation=- 1;
              
            }
            //$LASTPOS=2000471;//user.Bar:471
            _this.rotation=_this.rotation*0.7;
            //$LASTPOS=2000498;//user.Bar:498
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
      
      //$LASTPOS=4000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=4000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=4000076;//user.Kabe:76
      _this.restitution=1;
      //$LASTPOS=4000096;//user.Kabe:96
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Kabe_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000039;//user.Kabe:39
      _this.isStatic=true;
      //$LASTPOS=4000059;//user.Kabe:59
      _this.friction=0;
      //$LASTPOS=4000076;//user.Kabe:76
      _this.restitution=1;
      
      _thread.enter(function _trc_Kabe_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=4000096;//user.Kabe:96
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
      
      //$LASTPOS=5000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=5000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=5000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=5000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=5000223;//user.Main:223
      //$LASTPOS=5000228;//user.Main:228
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=5000248;//user.Main:248
          //$LASTPOS=5000253;//user.Main:253
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=5000278;//user.Main:278
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=5000428;//user.Main:428
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=5000480;//user.Main:480
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=5000534;//user.Main:534
      new Tonyu.classes.user.Kabe({x: 420,y: 200,scaleX: 0.5,scaleY: 20});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.Main:0
      new Tonyu.classes.kernel.T2World({gravity: 0});
      //$LASTPOS=5000024;//user.Main:24
      new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
      //$LASTPOS=5000097;//user.Main:97
      new Tonyu.classes.user.Norm({x: 200,y: 300});
      //$LASTPOS=5000120;//user.Main:120
      new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 2,vy: 4});
      //$LASTPOS=5000223;//user.Main:223
      //$LASTPOS=5000228;//user.Main:228
      _this.i=0;
      while(_this.i<3) {
        {
          //$LASTPOS=5000248;//user.Main:248
          //$LASTPOS=5000253;//user.Main:253
          _this.j=0;
          while(_this.j<6) {
            {
              //$LASTPOS=5000278;//user.Main:278
              new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 5});
            }
            _this.j++;
          }
        }
        _this.i++;
      }
      //$LASTPOS=5000428;//user.Main:428
      new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
      //$LASTPOS=5000480;//user.Main:480
      new Tonyu.classes.user.Kabe({x: 20,y: 200,scaleX: 0.5,scaleY: 20});
      //$LASTPOS=5000534;//user.Main:534
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
      
      //$LASTPOS=6000001;//user.Norm:1
      while (true) {
        //$LASTPOS=6000019;//user.Norm:19
        _this.x+=2;
        //$LASTPOS=6000029;//user.Norm:29
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
            //$LASTPOS=6000001;//user.Norm:1
          case 1:
            //$LASTPOS=6000019;//user.Norm:19
            _this.x+=2;
            //$LASTPOS=6000029;//user.Norm:29
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
