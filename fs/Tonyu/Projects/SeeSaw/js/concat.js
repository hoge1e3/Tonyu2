Tonyu.klass.define({
  fullName: 'user.Floor',
  shortName: 'Floor',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Floor_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000193;//user.Floor:193
      _this.parallel("roll");
      //$LASTPOS=40000211;//user.Floor:211
      //$LASTPOS=40000215;//user.Floor:215
      _this.i=0;
      while(_this.i<10) {
        {
          //$LASTPOS=40000235;//user.Floor:235
          _this.updateEx(10);
          //$LASTPOS=40000253;//user.Floor:253
          new Tonyu.classes.user.Neko({x: _this.rnd(300),y: 0});
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_Floor_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000193;//user.Floor:193
      _this.parallel("roll");
      
      _thread.enter(function _trc_Floor_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000211;//user.Floor:211
            //$LASTPOS=40000215;//user.Floor:215
            _this.i=0;;
          case 1:
            if (!(_this.i<10)) { __pc=3; break; }
            //$LASTPOS=40000235;//user.Floor:235
            _this.fiber$updateEx(_thread, 10);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=40000253;//user.Floor:253
            new Tonyu.classes.user.Neko({x: _this.rnd(300),y: 0});
            _this.i++;
            __pc=1;break;
          case 3:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Floor_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000038;//user.Floor:38
      _this.isStatic=true;
      //$LASTPOS=40000057;//user.Floor:57
      _this.x=250;
      //$LASTPOS=40000063;//user.Floor:63
      _this.y=300;
      //$LASTPOS=40000069;//user.Floor:69
      _this.scaleX=10;
      //$LASTPOS=40000079;//user.Floor:79
      _this.scaleY=1;
      //$LASTPOS=40000088;//user.Floor:88
      _this.p=5;
      //$LASTPOS=40000097;//user.Floor:97
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Floor_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000038;//user.Floor:38
      _this.isStatic=true;
      //$LASTPOS=40000057;//user.Floor:57
      _this.x=250;
      //$LASTPOS=40000063;//user.Floor:63
      _this.y=300;
      //$LASTPOS=40000069;//user.Floor:69
      _this.scaleX=10;
      //$LASTPOS=40000079;//user.Floor:79
      _this.scaleY=1;
      //$LASTPOS=40000088;//user.Floor:88
      _this.p=5;
      
      _thread.enter(function _trc_Floor_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000097;//user.Floor:97
            Tonyu.classes.kernel.BodyActor.prototype.fiber$onAppear.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    roll :function _trc_Floor_roll() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var t;
      
      //$LASTPOS=40000295;//user.Floor:295
      t = 0;
      //$LASTPOS=40000308;//user.Floor:308
      while (true) {
        //$LASTPOS=40000330;//user.Floor:330
        _this.rotation=Tonyu.globals.$mouseX;
        //$LASTPOS=40000368;//user.Floor:368
        t++;
        //$LASTPOS=40000381;//user.Floor:381
        _this.update();
        
      }
    },
    fiber$roll :function _trc_Floor_f_roll(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var t;
      
      //$LASTPOS=40000295;//user.Floor:295
      t = 0;
      
      _thread.enter(function _trc_Floor_ent_roll(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000308;//user.Floor:308
          case 1:
            //$LASTPOS=40000330;//user.Floor:330
            _this.rotation=Tonyu.globals.$mouseX;
            //$LASTPOS=40000368;//user.Floor:368
            t++;
            //$LASTPOS=40000381;//user.Floor:381
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
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"roll":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Neko',
  shortName: 'Neko',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Neko_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000133;//user.Neko:133
      _this.a=0;
      //$LASTPOS=41000138;//user.Neko:138
      while (true) {
        //$LASTPOS=41000156;//user.Neko:156
        if (_this.abs(_this.x-_this.px)>1) {
          //$LASTPOS=41000183;//user.Neko:183
          _this.scaleY=1;
          //$LASTPOS=41000201;//user.Neko:201
          if (_this.x>_this.px) {
            //$LASTPOS=41000211;//user.Neko:211
            _this.scaleX=1;
          } else {
            //$LASTPOS=41000226;//user.Neko:226
            _this.scaleX=- 1;
          }
          //$LASTPOS=41000245;//user.Neko:245
          _this.p=_this.floor(Tonyu.globals.$pat_neko+3+_this.a);
          //$LASTPOS=41000277;//user.Neko:277
          _this.a+=_this.abs(_this.x-_this.px)*0.1;
          //$LASTPOS=41000303;//user.Neko:303
          if (_this.a>2) {
            //$LASTPOS=41000312;//user.Neko:312
            _this.a=0;
          }
          
        } else {
          //$LASTPOS=41000338;//user.Neko:338
          _this.p=Tonyu.globals.$pat_neko;
          
        }
        //$LASTPOS=41000361;//user.Neko:361
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=41000393;//user.Neko:393
          _this.applyForce(- 1,0);
          //$LASTPOS=41000419;//user.Neko:419
          _this.moveBy(200-_this.x,- Tonyu.globals.$screenHeight);
          
        }
        //$LASTPOS=41000459;//user.Neko:459
        if (_this.x<0) {
          //$LASTPOS=41000468;//user.Neko:468
          _this.applyImpulse(1,0);
        }
        //$LASTPOS=41000491;//user.Neko:491
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=41000511;//user.Neko:511
          _this.applyImpulse(- 1,0);
        }
        //$LASTPOS=41000535;//user.Neko:535
        _this.px=_this.x;
        //$LASTPOS=41000545;//user.Neko:545
        _this.update();
        
      }
    },
    fiber$main :function _trc_Neko_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000133;//user.Neko:133
      _this.a=0;
      
      _thread.enter(function _trc_Neko_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000138;//user.Neko:138
          case 1:
            //$LASTPOS=41000156;//user.Neko:156
            if (_this.abs(_this.x-_this.px)>1) {
              //$LASTPOS=41000183;//user.Neko:183
              _this.scaleY=1;
              //$LASTPOS=41000201;//user.Neko:201
              if (_this.x>_this.px) {
                //$LASTPOS=41000211;//user.Neko:211
                _this.scaleX=1;
              } else {
                //$LASTPOS=41000226;//user.Neko:226
                _this.scaleX=- 1;
              }
              //$LASTPOS=41000245;//user.Neko:245
              _this.p=_this.floor(Tonyu.globals.$pat_neko+3+_this.a);
              //$LASTPOS=41000277;//user.Neko:277
              _this.a+=_this.abs(_this.x-_this.px)*0.1;
              //$LASTPOS=41000303;//user.Neko:303
              if (_this.a>2) {
                //$LASTPOS=41000312;//user.Neko:312
                _this.a=0;
              }
              
            } else {
              //$LASTPOS=41000338;//user.Neko:338
              _this.p=Tonyu.globals.$pat_neko;
              
            }
            //$LASTPOS=41000361;//user.Neko:361
            if (!(_this.y>Tonyu.globals.$screenHeight)) { __pc=4; break; }
            //$LASTPOS=41000393;//user.Neko:393
            _this.fiber$applyForce(_thread, - 1, 0);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=41000419;//user.Neko:419
            _this.fiber$moveBy(_thread, 200-_this.x, - Tonyu.globals.$screenHeight);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=41000459;//user.Neko:459
            if (!(_this.x<0)) { __pc=6; break; }
            //$LASTPOS=41000468;//user.Neko:468
            _this.fiber$applyImpulse(_thread, 1, 0);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=41000491;//user.Neko:491
            if (!(_this.x>Tonyu.globals.$screenWidth)) { __pc=8; break; }
            //$LASTPOS=41000511;//user.Neko:511
            _this.fiber$applyImpulse(_thread, - 1, 0);
            __pc=7;return;
          case 7:
            
          case 8:
            
            //$LASTPOS=41000535;//user.Neko:535
            _this.px=_this.x;
            //$LASTPOS=41000545;//user.Neko:545
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Neko_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000038;//user.Neko:38
      _this.extend({shape: "circle",p: Tonyu.globals.$pat_neko,manualRotation: true,radius: 8});
      //$LASTPOS=41000112;//user.Neko:112
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Neko_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000038;//user.Neko:38
      _this.extend({shape: "circle",p: Tonyu.globals.$pat_neko,manualRotation: true,radius: 8});
      
      _thread.enter(function _trc_Neko_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000112;//user.Neko:112
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
