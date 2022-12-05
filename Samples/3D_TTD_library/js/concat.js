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
          _this.cameraMain();
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
          (yield* _this.fiber$cameraMain(_thread));
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
        Tonyu.globals.$Boot.on("beforeMove",(function anonymous_385() {
          
          _this.onBeforeMove();
        }));
        Tonyu.globals.$Boot.on("afterMove",(function anonymous_430() {
          
          _this.onAfterMove();
        }));
      },
      fiber$main :function* _trc_Main_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$onStart(_thread));
        (yield* _this.fiber$onBeforeMove(_thread));
        Tonyu.globals.$Boot.on("beforeMove",(function anonymous_385() {
          
          _this.onBeforeMove();
        }));
        Tonyu.globals.$Boot.on("afterMove",(function anonymous_430() {
          
          _this.onAfterMove();
        }));
        
      },
      onStart :function _trc_Main_onStart() {
        var _this=this;
        
        Tonyu.globals.$printSize=12;
        _this.print("操作:\n←→:向き\n↑↓:前進後進\nA,Z:上下移動\nS,X:上下角\nD,F:傾き\nQ,W:ズーム");
        Tonyu.globals.$TD_Z=new Tonyu.classes.kernel.TD_Z;
        Tonyu.globals.$TD_Z.STARTING();
        Tonyu.globals.$Camera=new Tonyu.classes.user.Camera({x: 0,y: 500,z: 0,xz: 0,yz: 0,xy: 0,gk: 0,k_max: 10,GL: 0,GU: 0,GR: Tonyu.globals.$screenWidth,GD: Tonyu.globals.$screenHeight});
        new Tonyu.classes.user.MyChar({x: - 250,y: - 250,z: 700});
      },
      fiber$onStart :function* _trc_Main_f_onStart(_thread) {
        var _this=this;
        
        Tonyu.globals.$printSize=12;
        _this.print("操作:\n←→:向き\n↑↓:前進後進\nA,Z:上下移動\nS,X:上下角\nD,F:傾き\nQ,W:ズーム");
        Tonyu.globals.$TD_Z=new Tonyu.classes.kernel.TD_Z;
        Tonyu.globals.$TD_Z.STARTING();
        Tonyu.globals.$Camera=new Tonyu.classes.user.Camera({x: 0,y: 500,z: 0,xz: 0,yz: 0,xy: 0,gk: 0,k_max: 10,GL: 0,GU: 0,GR: Tonyu.globals.$screenWidth,GD: Tonyu.globals.$screenHeight});
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
      },
      fiber$onAfterMove :function* _trc_Main_f_onAfterMove(_thread) {
        var _this=this;
        
        Tonyu.globals.$TD_Z.draw3D();
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}},"onStart":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"onBeforeMove":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}},"onAfterMove":{"nowait":false,"isMain":false,"vtype":{"params":[],"returnValue":null}}},"fields":{}}
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
        
        _this.add3D_DX_P(1,150,250,250,3,0,0,255,1);
        _this.add3D_L_P(1,200,200,200,200,200,400,_this.color(255,255,255),0,0);
        _this.add3D_T_P(1,100,100,100,200,200,100,300,100,100,_this.color(255,255,0),0,0);
        _this.add3D_S_P(1,300,200,300,300,300,300,400,300,300,400,200,300,_this.color(0,255,255),0,0);
        _this.p1 = _this.add3D_P(0,0,0);
        
        _this.p2 = _this.add3D_P(0,0,500);
        
        _this.p3 = _this.add3D_P(500,0,500);
        
        _this.p4 = _this.add3D_P(500,0,0);
        
        _this.p5 = _this.add3D_P(0,500,0);
        
        _this.p6 = _this.add3D_P(0,500,500);
        
        _this.p7 = _this.add3D_P(500,500,500);
        
        _this.p8 = _this.add3D_P(500,500,0);
        
        _this.add3D_S(1,_this.p1,_this.p2,_this.p3,_this.p4,_this.color(128,128,128),0,0);
        _this.add3D_S(1,_this.p1,_this.p2,_this.p6,_this.p5,_this.color(64,64,64),0,0);
        _this.add3D_S(1,_this.p4,_this.p3,_this.p7,_this.p8,_this.color(64,64,64),0,0);
        _this.add3D_S(1,_this.p5,_this.p6,_this.p7,_this.p8,_this.color(128,128,128),0,0);
        _this.TD_angleX=250;
        _this.TD_angleY=250;
        _this.TD_angleZ=250;
        while (true) {
          Tonyu.checkLoop();
          _this.update();
          
        }
      },
      fiber$main :function* _trc_MyChar_f_main(_thread) {
        var _this=this;
        
        (yield* _this.fiber$add3D_DX_P(_thread, 1, 150, 250, 250, 3, 0, 0, 255, 1));
        (yield* _this.fiber$add3D_L_P(_thread, 1, 200, 200, 200, 200, 200, 400, _this.color(255,255,255), 0, 0));
        (yield* _this.fiber$add3D_T_P(_thread, 1, 100, 100, 100, 200, 200, 100, 300, 100, 100, _this.color(255,255,0), 0, 0));
        (yield* _this.fiber$add3D_S_P(_thread, 1, 300, 200, 300, 300, 300, 300, 400, 300, 300, 400, 200, 300, _this.color(0,255,255), 0, 0));
        _this.p1=yield* _this.fiber$add3D_P(_thread, 0, 0, 0);
        
        _this.p2=yield* _this.fiber$add3D_P(_thread, 0, 0, 500);
        
        _this.p3=yield* _this.fiber$add3D_P(_thread, 500, 0, 500);
        
        _this.p4=yield* _this.fiber$add3D_P(_thread, 500, 0, 0);
        
        _this.p5=yield* _this.fiber$add3D_P(_thread, 0, 500, 0);
        
        _this.p6=yield* _this.fiber$add3D_P(_thread, 0, 500, 500);
        
        _this.p7=yield* _this.fiber$add3D_P(_thread, 500, 500, 500);
        
        _this.p8=yield* _this.fiber$add3D_P(_thread, 500, 500, 0);
        
        (yield* _this.fiber$add3D_S(_thread, 1, _this.p1, _this.p2, _this.p3, _this.p4, _this.color(128,128,128), 0, 0));
        (yield* _this.fiber$add3D_S(_thread, 1, _this.p1, _this.p2, _this.p6, _this.p5, _this.color(64,64,64), 0, 0));
        (yield* _this.fiber$add3D_S(_thread, 1, _this.p4, _this.p3, _this.p7, _this.p8, _this.color(64,64,64), 0, 0));
        (yield* _this.fiber$add3D_S(_thread, 1, _this.p5, _this.p6, _this.p7, _this.p8, _this.color(128,128,128), 0, 0));
        _this.TD_angleX=250;
        _this.TD_angleY=250;
        _this.TD_angleZ=250;
        while (true) {
          yield null;
          (yield* _this.fiber$update(_thread));
          
        }
        
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false,"isMain":true,"vtype":{"params":[],"returnValue":null}}},"fields":{"p1":{},"p2":{},"p3":{},"p4":{},"p5":{},"p6":{},"p7":{},"p8":{}}}
});

});

//# sourceMappingURL=concat.js.map