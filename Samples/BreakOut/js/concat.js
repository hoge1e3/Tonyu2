if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false,"dependingProjects":[{"namespace":"kernel"}],"namespace":"user"},"run":{"mainClass":"Main","bootClass":"kernel.Boot","globals":{"$defaultFPS":60,"$imageSmoothingDisabled":true}},"kernelEditable":false,"plugins":{"box2d":1},"language":"tonyu"}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Ball',
  shortName: 'Ball',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Ball_main() {
        var _this=this;
        
        _this.miss=0;
        while (true) {
          Tonyu.checkLoop();
          if (_this.contactTo(Tonyu.classes.user.Yuka)) {
            _this.miss++;
            _this.print(_this.miss);
            
          }
          if (_this.y>500) {
            _this.loadPage(Tonyu.classes.user.Main);
            
          }
          _this.update();
          
        }
      },
      fiber$main :function* _trc_Ball_f_main(_thread) {
        var _this=this;
        
        _this.miss=0;
        while (true) {
          yield null;
          if (_this.contactTo(Tonyu.classes.user.Yuka)) {
            _this.miss++;
            _this.print(_this.miss);
            
          }
          if (_this.y>500) {
            (yield* _this.fiber$loadPage(_thread, Tonyu.classes.user.Main));
            
          }
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"miss":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Bar',
  shortName: 'Bar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Bar_main() {
        var _this=this;
        
        while (true) {
          Tonyu.checkLoop();
          if (_this.getkey("left")) {
            _this.vx=- 3;
            
          } else {
            if (_this.getkey("right")) {
              _this.vx=3;
              
            } else {
              _this.vx=0;
              
            }
          }
          if (_this.getkey("up")) {
            _this.vy=- 3;
            
          } else {
            if (_this.getkey("down")) {
              _this.vy=3;
              
            } else {
              _this.vy=0;
              
            }
          }
          _this.rotation=_this.vrotation=0;
          _this.update();
          
        }
      },
      fiber$main :function* _trc_Bar_f_main(_thread) {
        var _this=this;
        
        while (true) {
          yield null;
          if (_this.getkey("left")) {
            _this.vx=- 3;
            
          } else {
            if (_this.getkey("right")) {
              _this.vx=3;
              
            } else {
              _this.vx=0;
              
            }
          }
          if (_this.getkey("up")) {
            _this.vy=- 3;
            
          } else {
            if (_this.getkey("down")) {
              _this.vy=3;
              
            } else {
              _this.vy=0;
              
            }
          }
          _this.rotation=_this.vrotation=0;
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Block',
  shortName: 'Block',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Block_main() {
        var _this=this;
        
        while (true) {
          Tonyu.checkLoop();
          if (_this.contactTo(Tonyu.classes.user.Ball)) {
            _this.die();
            
          }
          _this.update();
          
        }
      },
      fiber$main :function* _trc_Block_f_main(_thread) {
        var _this=this;
        
        while (true) {
          yield null;
          if (_this.contactTo(Tonyu.classes.user.Ball)) {
            _this.die();
            
          }
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      onAppear :function _trc_Block_onAppear() {
        var _this=this;
        
        _this.isStatic=true;
        _this.restitution=0;
        __superClass.prototype.onAppear.apply( _this, []);
      },
      fiber$onAppear :function* _trc_Block_f_onAppear(_thread) {
        var _this=this;
        
        _this.isStatic=true;
        _this.restitution=0;
        (yield* __superClass.prototype.fiber$onAppear.apply( _this, [_thread]));
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"onAppear":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Kabe',
  shortName: 'Kabe',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Kabe_main() {
        var _this=this;
        
      },
      fiber$main :function* _trc_Kabe_f_main(_thread) {
        var _this=this;
        
        
      },
      onAppear :function _trc_Kabe_onAppear() {
        var _this=this;
        
        _this.isStatic=true;
        _this.friction=0;
        _this.restitution=1;
        _this.p=Tonyu.globals.$pat_wood_texture_00005;
        __superClass.prototype.onAppear.apply( _this, []);
      },
      fiber$onAppear :function* _trc_Kabe_f_onAppear(_thread) {
        var _this=this;
        
        _this.isStatic=true;
        _this.friction=0;
        _this.restitution=1;
        _this.p=Tonyu.globals.$pat_wood_texture_00005;
        (yield* __superClass.prototype.fiber$onAppear.apply( _this, [_thread]));
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"onAppear":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        var _this=this;
        
        new Tonyu.classes.kernel.T2World({gravity: 0});
        new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
        new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 1,vy: 2});
        for (_this.i=0; _this.i<3 ; _this.i++) {
          Tonyu.checkLoop();
          {
            for (_this.j=0; _this.j<6 ; _this.j++) {
              Tonyu.checkLoop();
              {
                new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 2+_this.i});
              }
            }
          }
        }
        new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
        new Tonyu.classes.user.Kabe({x: 8,y: 200,scaleX: 0.5,scaleY: 20});
        new Tonyu.classes.user.Kabe({x: 460,y: 200,scaleX: 0.5,scaleY: 20});
        while (_this.all(Tonyu.classes.user.Block).length>0) {
          Tonyu.checkLoop();
          _this.update();
          
        }
        _this.updateEx(30);
        _this.loadPage(Tonyu.classes.user.Main);
      },
      fiber$main :function* _trc_Main_f_main(_thread) {
        var _this=this;
        
        new Tonyu.classes.kernel.T2World({gravity: 0});
        new Tonyu.classes.user.Bar({x: 200,y: 400,scaleX: 2,scaleY: 1,restitution: 1,friction: 0.5});
        new Tonyu.classes.user.Ball({x: 200,y: 300,shape: "circle",p: 12,restitution: 1,density: 0.1,friction: 0,vx: 1,vy: 2});
        for (_this.i=0; _this.i<3 ; _this.i++) {
          yield null;
          {
            for (_this.j=0; _this.j<6 ; _this.j++) {
              yield null;
              {
                new Tonyu.classes.user.Block({x: 100+_this.j*50,y: 100+_this.i*50,p: 2+_this.i});
              }
            }
          }
        }
        new Tonyu.classes.user.Kabe({x: 200,y: 0,scaleX: 20,scaleY: 1});
        new Tonyu.classes.user.Kabe({x: 8,y: 200,scaleX: 0.5,scaleY: 20});
        new Tonyu.classes.user.Kabe({x: 460,y: 200,scaleX: 0.5,scaleY: 20});
        while (_this.all(Tonyu.classes.user.Block).length>0) {
          yield null;
          (yield* _this.fiber$update(_thread));
          
        }
        (yield* _this.fiber$updateEx(_thread, 30));
        (yield* _this.fiber$loadPage(_thread, Tonyu.classes.user.Main));
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"i":{},"j":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Yuka',
  shortName: 'Yuka',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Yuka_main() {
        var _this=this;
        
      },
      fiber$main :function* _trc_Yuka_f_main(_thread) {
        var _this=this;
        
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});

});

//# sourceMappingURL=concat.js.map