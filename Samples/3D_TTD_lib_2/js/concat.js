if(!Tonyu.load)Tonyu.load=(_,f)=>f();
Tonyu.load({"compiler":{"namespace":"user","defaultSuperClass":"kernel.Actor","dependingProjects":[{"namespace":"kernel"}],"noLoopCheck":false,"field_strict":false,"typeCheck":false,"compress":false},"run":{"mainClass":"user.Main","bootClass":"kernel.Boot","globals":{"$defaultFPS":60,"$imageSmoothingDisabled":true,"$soundLoadAndDecode":false}},"plugins":{},"kernelEditable":false,"language":"tonyu","version":1668947437611}, ()=>{
Tonyu.klass.define({
  fullName: 'user.Camera',
  shortName: 'Camera',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TD_CM,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Camera_main() {
        var _this=this;
        
        _this.sp = 5;
        
        _this.spk = 2;
        
        while (true) {
          Tonyu.checkLoop();
          if (_this.getkey(37)) {
            _this.xz-=_this.spk;
          }
          if (_this.getkey(39)) {
            _this.xz+=_this.spk;
          }
          if (_this.getkey(83)) {
            _this.yz-=_this.spk;
          }
          if (_this.getkey(88)) {
            _this.yz+=_this.spk;
          }
          if (_this.getkey(68)) {
            _this.xy-=_this.spk;
          }
          if (_this.getkey(70)) {
            _this.xy+=_this.spk;
          }
          if (_this.getkey(38)) {
            _this.x+=_this.sp*_this.sin(_this.xz);
            _this.z+=_this.sp*_this.cos(_this.xz);
            
          }
          if (_this.getkey(40)) {
            _this.x-=_this.sp*_this.sin(_this.xz);
            _this.z-=_this.sp*_this.cos(_this.xz);
            
          }
          if (_this.getkey(65)) {
            _this.y+=_this.sp;
          }
          if (_this.getkey(90)) {
            _this.y-=_this.sp;
          }
          if (_this.getkey(81)&&_this.gk>0) {
            _this.gk-=20+(_this.gk/20);
          }
          if (_this.getkey(87)&&_this.gk<10000) {
            _this.gk+=20+(_this.gk/20);
          }
          if (_this.gk<0) {
            _this.gk=0;
          } else {
            if (_this.gk>10000) {
              _this.gk=10000;
            }
          }
          _this.update();
          
        }
      },
      fiber$main :function* _trc_Camera_f_main(_thread) {
        var _this=this;
        
        _this.sp = 5;
        
        _this.spk = 2;
        
        while (true) {
          yield null;
          if (_this.getkey(37)) {
            _this.xz-=_this.spk;
          }
          if (_this.getkey(39)) {
            _this.xz+=_this.spk;
          }
          if (_this.getkey(83)) {
            _this.yz-=_this.spk;
          }
          if (_this.getkey(88)) {
            _this.yz+=_this.spk;
          }
          if (_this.getkey(68)) {
            _this.xy-=_this.spk;
          }
          if (_this.getkey(70)) {
            _this.xy+=_this.spk;
          }
          if (_this.getkey(38)) {
            _this.x+=_this.sp*_this.sin(_this.xz);
            _this.z+=_this.sp*_this.cos(_this.xz);
            
          }
          if (_this.getkey(40)) {
            _this.x-=_this.sp*_this.sin(_this.xz);
            _this.z-=_this.sp*_this.cos(_this.xz);
            
          }
          if (_this.getkey(65)) {
            _this.y+=_this.sp;
          }
          if (_this.getkey(90)) {
            _this.y-=_this.sp;
          }
          if (_this.getkey(81)&&_this.gk>0) {
            _this.gk-=20+(_this.gk/20);
          }
          if (_this.getkey(87)&&_this.gk<10000) {
            _this.gk+=20+(_this.gk/20);
          }
          if (_this.gk<0) {
            _this.gk=0;
          } else {
            if (_this.gk>10000) {
              _this.gk=10000;
            }
          }
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"sp":{},"spk":{}}}
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
        
        _this.onStart();
        _this.onBeforeMove();
        _this.evtBeforeMove = Tonyu.globals.$Boot.on("beforeMove",(function anonymous_483() {
          
          _this.onBeforeMove();
        }));
        
        _this.evtAfterMove = Tonyu.globals.$Boot.on("afterMove",(function anonymous_546() {
          
          _this.onAfterMove();
        }));
        
        _this.on("die",(function anonymous_577() {
          
          _this.evtBeforeMove.remove();
          _this.evtAfterMove.remove();
        }));
      },
      fiber$main :function* _trc_Main_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$onStart(_thread));
        (yield* _this.fiber$onBeforeMove(_thread));
        _this.evtBeforeMove = Tonyu.globals.$Boot.on("beforeMove",(function anonymous_483() {
          
          _this.onBeforeMove();
        }));
        
        _this.evtAfterMove = Tonyu.globals.$Boot.on("afterMove",(function anonymous_546() {
          
          _this.onAfterMove();
        }));
        
        _this.on("die",(function anonymous_577() {
          
          _this.evtBeforeMove.remove();
          _this.evtAfterMove.remove();
        }));
        
      },
      onStart :function _trc_Main_onStart() {
        var _this=this;
        
        Tonyu.globals.$printSize=12;
        _this.print("操作:\n←→:向き\n↑↓:前進後進\nA,Z:上下移動\nS,X:上下角\nD,F:傾き\nQ,W:ズーム");
        Tonyu.globals.$TD_Z=new Tonyu.classes.kernel.TD_Z;
        Tonyu.globals.$Camera=new Tonyu.classes.user.Camera({x: 0,y: 0,z: 0,xz: 0,yz: 0,xy: 0,gk: 0,k_max: 10,GL: 0,GU: 0,GR: Tonyu.globals.$screenWidth,GD: Tonyu.globals.$screenHeight});
        new Tonyu.classes.user.MyChar({x: - 250,y: - 250,z: 700});
      },
      fiber$onStart :function* _trc_Main_f_onStart(_thread) {
        var _this=this;
        
        Tonyu.globals.$printSize=12;
        _this.print("操作:\n←→:向き\n↑↓:前進後進\nA,Z:上下移動\nS,X:上下角\nD,F:傾き\nQ,W:ズーム");
        Tonyu.globals.$TD_Z=new Tonyu.classes.kernel.TD_Z;
        Tonyu.globals.$Camera=new Tonyu.classes.user.Camera({x: 0,y: 0,z: 0,xz: 0,yz: 0,xy: 0,gk: 0,k_max: 10,GL: 0,GU: 0,GR: Tonyu.globals.$screenWidth,GD: Tonyu.globals.$screenHeight});
        new Tonyu.classes.user.MyChar({x: - 250,y: - 250,z: 700});
        
      },
      onBeforeMove :function _trc_Main_onBeforeMove() {
        var _this=this;
        
      },
      fiber$onBeforeMove :function* _trc_Main_f_onBeforeMove(_thread) {
        var _this=this;
        
        
      },
      onAfterMove :function _trc_Main_onAfterMove() {
        var _this=this;
        
        Tonyu.globals.$TD_Z.draw3D();
        if (Tonyu.globals.$frameCount%60==0) {
          new Tonyu.classes.user.MyChar({x: - 250+_this.rnd(- 100,100),y: _this.rnd(- 300,300),z: 1500});
          
        }
      },
      fiber$onAfterMove :function* _trc_Main_f_onAfterMove(_thread) {
        var _this=this;
        
        Tonyu.globals.$TD_Z.draw3D();
        if (Tonyu.globals.$frameCount%60==0) {
          new Tonyu.classes.user.MyChar({x: - 250+_this.rnd(- 100,100),y: _this.rnd(- 300,300),z: 1500});
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"onStart":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"onBeforeMove":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"onAfterMove":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}}},"fields":{"evtBeforeMove":{},"evtAfterMove":{}}}
});
Tonyu.klass.define({
  fullName: 'user.MyChar',
  shortName: 'MyChar',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.TD_3D,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_MyChar_main() {
        var _this=this;
        
        _this.addPolygon([200,0,100],[300,0,100],[300,0,200],[200,0,200],{color: "red"});
        _this.addPolygon([200,0,100],[200,0,200],[100,- 50,150],{color: "orange"});
        _this.addPolygon([300,0,100],[300,0,200],[400,- 50,150],{color: "orange"});
        _this.addPolygon([200,0,100],[300,0,100],[250,- 50,30],{color: "gray"});
        _this.addSprite({x: 250,y: 30,z: 150,p: Tonyu.globals.$pat_neko,scaleX: 2});
        _this.setPivot(250,50,150);
        while (true) {
          Tonyu.checkLoop();
          _this.z-=10;
          if (_this.z<0) {
            _this.die();
          }
          _this.update();
          
        }
      },
      fiber$main :function* _trc_MyChar_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$addPolygon(_thread, [200,0,100], [300,0,100], [300,0,200], [200,0,200], {color: "red"}));
        (yield* _this.fiber$addPolygon(_thread, [200,0,100], [200,0,200], [100,- 50,150], {color: "orange"}));
        (yield* _this.fiber$addPolygon(_thread, [300,0,100], [300,0,200], [400,- 50,150], {color: "orange"}));
        (yield* _this.fiber$addPolygon(_thread, [200,0,100], [300,0,100], [250,- 50,30], {color: "gray"}));
        (yield* _this.fiber$addSprite(_thread, {x: 250,y: 30,z: 150,p: Tonyu.globals.$pat_neko,scaleX: 2}));
        (yield* _this.fiber$setPivot(_thread, 250, 50, 150));
        while (true) {
          yield null;
          _this.z-=10;
          if (_this.z<0) {
            _this.die();
          }
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
});

});

//# sourceMappingURL=concat.js.map