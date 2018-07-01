Tonyu.klass.define({
  fullName: 'user.Car',
  shortName: 'Car',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Car_main() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000000;//user.Car:0
      _this.p=Tonyu.globals.$pat_neko+45;
      //$LASTPOS=1000017;//user.Car:17
      _this.rotation=90;
      //$LASTPOS=1000031;//user.Car:31
      _this.speed=0;
      //$LASTPOS=1000041;//user.Car:41
      while (true) {
        Tonyu.checkLoop();
        //$LASTPOS=1000060;//user.Car:60
        Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,1/(_this.abs(_this.speed)*0.1+1),- _this.rotation);
        //$LASTPOS=1000119;//user.Car:119
        if (_this.getkey(32)) {
          //$LASTPOS=1000146;//user.Car:146
          _this.speed+=0.15;
          
        }
        //$LASTPOS=1000171;//user.Car:171
        if (_this.getkey("left")) {
          //$LASTPOS=1000191;//user.Car:191
          _this.rotation-=_this.speed/2;
        }
        //$LASTPOS=1000215;//user.Car:215
        if (_this.getkey("right")) {
          //$LASTPOS=1000236;//user.Car:236
          _this.rotation+=_this.speed/2;
        }
        //$LASTPOS=1000260;//user.Car:260
        _this.speed*=0.96;
        //$LASTPOS=1000278;//user.Car:278
        _this.sx=_this.x;
        //$LASTPOS=1000283;//user.Car:283
        _this.sy=_this.y;
        //$LASTPOS=1000294;//user.Car:294
        _this.x+=_this.cos(_this.rotation-90)*_this.speed;
        //$LASTPOS=1000326;//user.Car:326
        _this.y+=_this.sin(_this.rotation-90)*_this.speed;
        //$LASTPOS=1000358;//user.Car:358
        if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>=0) {
          //$LASTPOS=1000395;//user.Car:395
          _this.speed*=- 1;
          //$LASTPOS=1000415;//user.Car:415
          _this.x=_this.sx;
          //$LASTPOS=1000420;//user.Car:420
          _this.y=_this.sy;
          
        }
        //$LASTPOS=1000438;//user.Car:438
        _this.update();
        
      }
    },
    fiber$main :function _trc_Car_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.Car:0
      _this.p=Tonyu.globals.$pat_neko+45;
      //$LASTPOS=1000017;//user.Car:17
      _this.rotation=90;
      //$LASTPOS=1000031;//user.Car:31
      _this.speed=0;
      
      _thread.enter(function _trc_Car_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000041;//user.Car:41
          case 1:
            //$LASTPOS=1000060;//user.Car:60
            Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,1/(_this.abs(_this.speed)*0.1+1),- _this.rotation);
            //$LASTPOS=1000119;//user.Car:119
            if (_this.getkey(32)) {
              //$LASTPOS=1000146;//user.Car:146
              _this.speed+=0.15;
              
            }
            //$LASTPOS=1000171;//user.Car:171
            if (_this.getkey("left")) {
              //$LASTPOS=1000191;//user.Car:191
              _this.rotation-=_this.speed/2;
            }
            //$LASTPOS=1000215;//user.Car:215
            if (_this.getkey("right")) {
              //$LASTPOS=1000236;//user.Car:236
              _this.rotation+=_this.speed/2;
            }
            //$LASTPOS=1000260;//user.Car:260
            _this.speed*=0.96;
            //$LASTPOS=1000278;//user.Car:278
            _this.sx=_this.x;
            //$LASTPOS=1000283;//user.Car:283
            _this.sy=_this.y;
            //$LASTPOS=1000294;//user.Car:294
            _this.x+=_this.cos(_this.rotation-90)*_this.speed;
            //$LASTPOS=1000326;//user.Car:326
            _this.y+=_this.sin(_this.rotation-90)*_this.speed;
            //$LASTPOS=1000358;//user.Car:358
            if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>=0) {
              //$LASTPOS=1000395;//user.Car:395
              _this.speed*=- 1;
              //$LASTPOS=1000415;//user.Car:415
              _this.x=_this.sx;
              //$LASTPOS=1000420;//user.Car:420
              _this.y=_this.sy;
              
            }
            //$LASTPOS=1000438;//user.Car:438
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
  decls: {"methods":{"main":{"nowait":false}},"fields":{"speed":{},"sx":{},"sy":{}}}
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
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=2000043;//user.Main:43
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000067;//user.Main:67
      Tonyu.globals.$Screen.setBGColor("#444");
      //$LASTPOS=2000096;//user.Main:96
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-100);
      //$LASTPOS=2000149;//user.Main:149
      new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Use  ←, →, Space",size: 30,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=2000223;//user.Main:223
      new Tonyu.classes.user.Car({x: 300,y: 150});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=2000043;//user.Main:43
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000067;//user.Main:67
      Tonyu.globals.$Screen.setBGColor("#444");
      //$LASTPOS=2000096;//user.Main:96
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-100);
      //$LASTPOS=2000149;//user.Main:149
      new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Use  ←, →, Space",size: 30,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=2000223;//user.Main:223
      new Tonyu.classes.user.Car({x: 300,y: 150});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{}}
});

//# sourceMappingURL=concat.js.map