Tonyu.klass.define({
  fullName: 'user.FPS',
  shortName: 'FPS',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_FPS_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000000;//user.FPS:0
      _this.x=200;
      //$LASTPOS=1000007;//user.FPS:7
      _this.y=100;
      //$LASTPOS=1000014;//user.FPS:14
      while (true) {
        //$LASTPOS=1000033;//user.FPS:33
        _this.text=_this.all().length+"actors / "+Tonyu.globals.$Boot.getMeasuredFps()+"fps / "+Tonyu.globals.$Boot.getMeasuredRps()+"rps"+" maxFRS="+Tonyu.globals.$Boot.maxFrameSkip;
        //$LASTPOS=1000164;//user.FPS:164
        _this.update();
        
      }
    },
    fiber$main :function _trc_FPS_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000000;//user.FPS:0
      _this.x=200;
      //$LASTPOS=1000007;//user.FPS:7
      _this.y=100;
      
      _thread.enter(function _trc_FPS_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000014;//user.FPS:14
          case 1:
            //$LASTPOS=1000033;//user.FPS:33
            _this.text=_this.all().length+"actors / "+Tonyu.globals.$Boot.getMeasuredFps()+"fps / "+Tonyu.globals.$Boot.getMeasuredRps()+"rps"+" maxFRS="+Tonyu.globals.$Boot.maxFrameSkip;
            //$LASTPOS=1000164;//user.FPS:164
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
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=2000024;//user.Main:24
      new Tonyu.classes.user.FPS;
      //$LASTPOS=2000033;//user.Main:33
      //$LASTPOS=2000038;//user.Main:38
      _this.i=0;
      while(_this.i<30) {
        //$LASTPOS=2000054;//user.Main:54
        new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
        _this.i++;
      }
      //$LASTPOS=2000113;//user.Main:113
      while (true) {
        //$LASTPOS=2000131;//user.Main:131
        _this.updateEx(30);
        //$LASTPOS=2000149;//user.Main:149
        if (Tonyu.globals.$Boot.getMeasuredFps()<55) {
          //$LASTPOS=2000190;//user.Main:190
          _this.t=_this.all(Tonyu.classes.user.Tama)[0];
          //$LASTPOS=2000214;//user.Main:214
          if (_this.t) {
            //$LASTPOS=2000221;//user.Main:221
            _this.t.die();
          }
          
        } else {
          //$LASTPOS=2000251;//user.Main:251
          new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
          
        }
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Main:0
      Tonyu.globals.$Boot.setFrameRate(60);
      //$LASTPOS=2000024;//user.Main:24
      new Tonyu.classes.user.FPS;
      //$LASTPOS=2000033;//user.Main:33
      //$LASTPOS=2000038;//user.Main:38
      _this.i=0;
      while(_this.i<30) {
        //$LASTPOS=2000054;//user.Main:54
        new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
        _this.i++;
      }
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000113;//user.Main:113
          case 1:
            //$LASTPOS=2000131;//user.Main:131
            _this.fiber$updateEx(_thread, 30);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000149;//user.Main:149
            if (Tonyu.globals.$Boot.getMeasuredFps()<55) {
              //$LASTPOS=2000190;//user.Main:190
              _this.t=_this.all(Tonyu.classes.user.Tama)[0];
              //$LASTPOS=2000214;//user.Main:214
              if (_this.t) {
                //$LASTPOS=2000221;//user.Main:221
                _this.t.die();
              }
              
            } else {
              //$LASTPOS=2000251;//user.Main:251
              new Tonyu.classes.user.Tama({x: _this.rnd(400),y: _this.rnd(400),vx: _this.rnd()*2-1,vy: _this.rnd()*2-1});
              
            }
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
  fullName: 'user.Tama',
  shortName: 'Tama',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Tama_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=3000001;//user.Tama:1
      while (true) {
        //$LASTPOS=3000019;//user.Tama:19
        _this.x+=_this.vx;
        //$LASTPOS=3000030;//user.Tama:30
        _this.y+=_this.vy;
        //$LASTPOS=3000041;//user.Tama:41
        _this.rotation++;
        //$LASTPOS=3000057;//user.Tama:57
        if (_this.t=_this.crashTo(Tonyu.classes.user.Tama)) {
          //$LASTPOS=3000088;//user.Tama:88
          _this.vx+=(_this.x-_this.t.x)/40;
          //$LASTPOS=3000112;//user.Tama:112
          _this.vy+=(_this.y-_this.t.y)/40;
          
        }
        //$LASTPOS=3000138;//user.Tama:138
        _this.vy+=0.1;
        //$LASTPOS=3000151;//user.Tama:151
        _this.c=_this.clamped(_this.x,0,Tonyu.globals.$screenWidth);
        //$LASTPOS=3000180;//user.Tama:180
        if (_this.c) {
          //$LASTPOS=3000187;//user.Tama:187
          _this.vx=_this.abs(_this.vx)*_this.sgn(_this.c)*0.8;
        }
        //$LASTPOS=3000214;//user.Tama:214
        _this.c=_this.clamped(_this.y,0,Tonyu.globals.$screenHeight);
        //$LASTPOS=3000244;//user.Tama:244
        if (_this.c) {
          //$LASTPOS=3000251;//user.Tama:251
          _this.vy=_this.abs(_this.vy)*_this.sgn(_this.c)*0.8;
        }
        //$LASTPOS=3000278;//user.Tama:278
        _this.update();
        
      }
    },
    fiber$main :function _trc_Tama_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Tama_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000001;//user.Tama:1
          case 1:
            //$LASTPOS=3000019;//user.Tama:19
            _this.x+=_this.vx;
            //$LASTPOS=3000030;//user.Tama:30
            _this.y+=_this.vy;
            //$LASTPOS=3000041;//user.Tama:41
            _this.rotation++;
            //$LASTPOS=3000057;//user.Tama:57
            if (_this.t=_this.crashTo(Tonyu.classes.user.Tama)) {
              //$LASTPOS=3000088;//user.Tama:88
              _this.vx+=(_this.x-_this.t.x)/40;
              //$LASTPOS=3000112;//user.Tama:112
              _this.vy+=(_this.y-_this.t.y)/40;
              
            }
            //$LASTPOS=3000138;//user.Tama:138
            _this.vy+=0.1;
            //$LASTPOS=3000151;//user.Tama:151
            _this.fiber$clamped(_thread, _this.x, 0, Tonyu.globals.$screenWidth);
            __pc=2;return;
          case 2:
            _this.c=_thread.retVal;
            
            //$LASTPOS=3000180;//user.Tama:180
            if (_this.c) {
              //$LASTPOS=3000187;//user.Tama:187
              _this.vx=_this.abs(_this.vx)*_this.sgn(_this.c)*0.8;
            }
            //$LASTPOS=3000214;//user.Tama:214
            _this.fiber$clamped(_thread, _this.y, 0, Tonyu.globals.$screenHeight);
            __pc=3;return;
          case 3:
            _this.c=_thread.retVal;
            
            //$LASTPOS=3000244;//user.Tama:244
            if (_this.c) {
              //$LASTPOS=3000251;//user.Tama:251
              _this.vy=_this.abs(_this.vy)*_this.sgn(_this.c)*0.8;
            }
            //$LASTPOS=3000278;//user.Tama:278
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    clamped :function _trc_Tama_clamped(x,min,max) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return x<min?min-x:x>max?max-x:0;
    },
    fiber$clamped :function _trc_Tama_f_clamped(_thread,x,min,max) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=x<min?min-x:x>max?max-x:0;return;
      
      
      _thread.retVal=_this;return;
    },
    sgn :function _trc_Tama_sgn(s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return s<0?- 1:s>0?1:0;
    },
    fiber$sgn :function _trc_Tama_f_sgn(_thread,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=s<0?- 1:s>0?1:0;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"clamped":{"nowait":false},"sgn":{"nowait":false}}}
});
