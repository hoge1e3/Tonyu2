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
      //$LASTPOS=1000016;//user.Car:16
      _this.rotation=90;
      //$LASTPOS=1000029;//user.Car:29
      _this.speed=0;
      //$LASTPOS=1000038;//user.Car:38
      while (true) {
        //$LASTPOS=1000056;//user.Car:56
        Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,1/(_this.abs(_this.speed)*0.05+1),- _this.rotation);
        //$LASTPOS=1000115;//user.Car:115
        if (_this.getkey(32)) {
          //$LASTPOS=1000141;//user.Car:141
          _this.speed+=0.3;
          
        }
        //$LASTPOS=1000163;//user.Car:163
        if (_this.getkey("left")) {
          //$LASTPOS=1000183;//user.Car:183
          _this.rotation-=_this.speed/2;
        }
        //$LASTPOS=1000206;//user.Car:206
        if (_this.getkey("right")) {
          //$LASTPOS=1000227;//user.Car:227
          _this.rotation+=_this.speed/2;
        }
        //$LASTPOS=1000250;//user.Car:250
        _this.speed*=0.96;
        //$LASTPOS=1000267;//user.Car:267
        _this.sx=_this.x;
        //$LASTPOS=1000272;//user.Car:272
        _this.sy=_this.y;
        //$LASTPOS=1000282;//user.Car:282
        _this.x+=_this.cos(_this.rotation-90)*_this.speed;
        //$LASTPOS=1000313;//user.Car:313
        _this.y+=_this.sin(_this.rotation-90)*_this.speed;
        //$LASTPOS=1000344;//user.Car:344
        if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>=0) {
          //$LASTPOS=1000380;//user.Car:380
          _this.speed*=- 1;
          //$LASTPOS=1000399;//user.Car:399
          _this.x=_this.sx;
          //$LASTPOS=1000404;//user.Car:404
          _this.y=_this.sy;
          
        }
        //$LASTPOS=1000420;//user.Car:420
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
      //$LASTPOS=1000016;//user.Car:16
      _this.rotation=90;
      //$LASTPOS=1000029;//user.Car:29
      _this.speed=0;
      
      _thread.enter(function _trc_Car_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000038;//user.Car:38
          case 1:
            //$LASTPOS=1000056;//user.Car:56
            Tonyu.globals.$Screen.scrollTo(_this.x,_this.y,1/(_this.abs(_this.speed)*0.05+1),- _this.rotation);
            //$LASTPOS=1000115;//user.Car:115
            if (_this.getkey(32)) {
              //$LASTPOS=1000141;//user.Car:141
              _this.speed+=0.3;
              
            }
            //$LASTPOS=1000163;//user.Car:163
            if (_this.getkey("left")) {
              //$LASTPOS=1000183;//user.Car:183
              _this.rotation-=_this.speed/2;
            }
            //$LASTPOS=1000206;//user.Car:206
            if (_this.getkey("right")) {
              //$LASTPOS=1000227;//user.Car:227
              _this.rotation+=_this.speed/2;
            }
            //$LASTPOS=1000250;//user.Car:250
            _this.speed*=0.96;
            //$LASTPOS=1000267;//user.Car:267
            _this.sx=_this.x;
            //$LASTPOS=1000272;//user.Car:272
            _this.sy=_this.y;
            //$LASTPOS=1000282;//user.Car:282
            _this.x+=_this.cos(_this.rotation-90)*_this.speed;
            //$LASTPOS=1000313;//user.Car:313
            _this.y+=_this.sin(_this.rotation-90)*_this.speed;
            //$LASTPOS=1000344;//user.Car:344
            if (Tonyu.globals.$map.getOnAt(_this.x,_this.y)>=0) {
              //$LASTPOS=1000380;//user.Car:380
              _this.speed*=- 1;
              //$LASTPOS=1000399;//user.Car:399
              _this.x=_this.sx;
              //$LASTPOS=1000404;//user.Car:404
              _this.y=_this.sy;
              
            }
            //$LASTPOS=1000420;//user.Car:420
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
      //$LASTPOS=2000042;//user.Main:42
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000065;//user.Main:65
      Tonyu.globals.$Screen.setBGColor("#444");
      //$LASTPOS=2000093;//user.Main:93
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-100);
      //$LASTPOS=2000145;//user.Main:145
      new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Use  ←, →, Space",size: 30,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=2000218;//user.Main:218
      new Tonyu.classes.user.Car({x: 300,y: 150});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=2000042;//user.Main:42
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=2000065;//user.Main:65
      Tonyu.globals.$Screen.setBGColor("#444");
      //$LASTPOS=2000093;//user.Main:93
      Tonyu.globals.$Screen.setPivot(Tonyu.globals.$screenWidth/2,Tonyu.globals.$screenHeight-100);
      //$LASTPOS=2000145;//user.Main:145
      new Tonyu.classes.kernel.Actor({x: 230,y: 50,text: "Use  ←, →, Space",size: 30,layer: Tonyu.globals.$frontLayer});
      //$LASTPOS=2000218;//user.Main:218
      new Tonyu.classes.user.Car({x: 300,y: 150});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
