Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Ball=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000020;
    while (_this.y<450) {
      //$LASTPOS=1000064;
      if (_this.c=_this.contactTo()) {
        //$LASTPOS=1000129;
        if (_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1) {
          //$LASTPOS=1000177;
          _this.applyImpulse(0,- 16);
        }
        
      }
      //$LASTPOS=1000237;
      if (_this.getkey("left")||Tonyu.globals.$pad.getLeft()) {
        //$LASTPOS=1000275;
        _this.applyForce(- 10,0);
      }
      //$LASTPOS=1000298;
      if (_this.getkey("right")||Tonyu.globals.$pad.getRight()) {
        //$LASTPOS=1000337;
        _this.applyForce(10,0);
      }
      //$LASTPOS=1000359;
      _this.update();
      
    }
    //$LASTPOS=1000371;
    new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "GameOver",size: 20});
    //$LASTPOS=1000419;
    _this.updateEx(60);
    //$LASTPOS=1000433;
    _this.loadPage(Tonyu.classes.user.Title);
    //$LASTPOS=1000450;
    _this.die();
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000020;
        case 1:
          if (!(_this.y<450)) { __pc=10; break; }
          //$LASTPOS=1000064;
          if (!(_this.c=_this.contactTo())) { __pc=4; break; }
          //$LASTPOS=1000129;
          if (!(_this.getkey("space")==1||Tonyu.globals.$pad.getButton(0)==1)) { __pc=3; break; }
          //$LASTPOS=1000177;
          _this.fiber$applyImpulse(_thread, 0, - 16);
          __pc=2;return;
        case 2:
          
        case 3:
          
        case 4:
          
          //$LASTPOS=1000237;
          if (!(_this.getkey("left")||Tonyu.globals.$pad.getLeft())) { __pc=6; break; }
          //$LASTPOS=1000275;
          _this.fiber$applyForce(_thread, - 10, 0);
          __pc=5;return;
        case 5:
          
        case 6:
          
          //$LASTPOS=1000298;
          if (!(_this.getkey("right")||Tonyu.globals.$pad.getRight())) { __pc=8; break; }
          //$LASTPOS=1000337;
          _this.fiber$applyForce(_thread, 10, 0);
          __pc=7;return;
        case 7:
          
        case 8:
          
          //$LASTPOS=1000359;
          _this.fiber$update(_thread);
          __pc=9;return;
        case 9:
          
          __pc=1;break;
        case 10:
          
          //$LASTPOS=1000371;
          new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "GameOver",size: 20});
          //$LASTPOS=1000419;
          _this.fiber$updateEx(_thread, 60);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=1000433;
          _this.fiber$loadPage(_thread, Tonyu.classes.user.Title);
          __pc=12;return;
        case 12:
          
          //$LASTPOS=1000450;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Ball,{"fullName":"user.Ball","namespace":"user","shortName":"Ball","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Block=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000020;
    while (_this.y<Tonyu.globals.$screenHeight) {
      //$LASTPOS=2000049;
      _this.update();
      
    }
    //$LASTPOS=2000064;
    _this.die();
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000020;
        case 1:
          if (!(_this.y<Tonyu.globals.$screenHeight)) { __pc=3; break; }
          //$LASTPOS=2000049;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=2000064;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Block,{"fullName":"user.Block","namespace":"user","shortName":"Block","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000114;
    Tonyu.globals.$b=new Tonyu.classes.user.Ball({density: 2,x: 230,y: 300,shape: "circle",p: 12});
    //$LASTPOS=3000198;
    new Tonyu.classes.kernel.BodyActor({x: 230,y: 350,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
    //$LASTPOS=3000275;
    new Tonyu.classes.user.Target;
    //$LASTPOS=3000287;
    Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
    //$LASTPOS=3000302;
    Tonyu.globals.$level=0;
    //$LASTPOS=3000312;
    while (true) {
      //$LASTPOS=3000331;
      new Tonyu.classes.user.Block({x: Tonyu.globals.$b.x,y: 0,p: Tonyu.globals.$pat_floor,scaleX: 1+Tonyu.globals.$level*0.1,rotation: _this.rnd(360)});
      //$LASTPOS=3000414;
      _this.updateEx(60);
      
    }
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000114;
    Tonyu.globals.$b=new Tonyu.classes.user.Ball({density: 2,x: 230,y: 300,shape: "circle",p: 12});
    //$LASTPOS=3000198;
    new Tonyu.classes.kernel.BodyActor({x: 230,y: 350,p: Tonyu.globals.$pat_floor+0,scaleX: 10,scaleY: 1,isStatic: true});
    //$LASTPOS=3000275;
    new Tonyu.classes.user.Target;
    //$LASTPOS=3000287;
    Tonyu.globals.$pad=new Tonyu.classes.kernel.Pad;
    //$LASTPOS=3000302;
    Tonyu.globals.$level=0;
    
    _thread.enter(function _trc_func_3000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=3000312;
        case 1:
          //$LASTPOS=3000331;
          new Tonyu.classes.user.Block({x: Tonyu.globals.$b.x,y: 0,p: Tonyu.globals.$pat_floor,scaleX: 1+Tonyu.globals.$level*0.1,rotation: _this.rnd(360)});
          //$LASTPOS=3000414;
          _this.fiber$updateEx(_thread, 60);
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Target=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000000;
    _this.p=Tonyu.globals.$pat_neko+30;
    //$LASTPOS=4000017;
    _this.put();
    //$LASTPOS=4000024;
    while (true) {
      //$LASTPOS=4000042;
      if (_this.crashTo(Tonyu.classes.user.Ball)) {
        //$LASTPOS=4000071;
        _this.nextLevel();
        
      }
      //$LASTPOS=4000095;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=4000000;
    _this.p=Tonyu.globals.$pat_neko+30;
    
    _thread.enter(function _trc_func_4000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=4000017;
          _this.fiber$put(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=4000024;
        case 2:
          //$LASTPOS=4000042;
          if (!(_this.crashTo(Tonyu.classes.user.Ball))) { __pc=4; break; }
          //$LASTPOS=4000071;
          _this.fiber$nextLevel(_thread);
          __pc=3;return;
        case 3:
          
        case 4:
          
          //$LASTPOS=4000095;
          _this.fiber$update(_thread);
          __pc=5;return;
        case 5:
          
          __pc=2;break;
        case 6:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  nextLevel :function _trc_func_4000108_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000127;
    _this.y=- 1000;
    //$LASTPOS=4000140;
    Tonyu.globals.$level++;
    //$LASTPOS=4000154;
    _this.p++;
    //$LASTPOS=4000163;
    if (_this.p>Tonyu.globals.$pat_neko+39) {
      //$LASTPOS=4000183;
      _this.p=Tonyu.globals.$pat_neko+30;
    }
    //$LASTPOS=4000203;
    _this.updateEx(30);
    //$LASTPOS=4000221;
    _this.put();
  },
  fiber$nextLevel :function _trc_func_4000108_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=4000127;
    _this.y=- 1000;
    //$LASTPOS=4000140;
    Tonyu.globals.$level++;
    //$LASTPOS=4000154;
    _this.p++;
    //$LASTPOS=4000163;
    if (_this.p>Tonyu.globals.$pat_neko+39) {
      //$LASTPOS=4000183;
      _this.p=Tonyu.globals.$pat_neko+30;
    }
    
    _thread.enter(function _trc_func_4000108_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=4000203;
          _this.fiber$updateEx(_thread, 30);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=4000221;
          _this.fiber$put(_thread);
          __pc=2;return;
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  put :function _trc_func_4000230_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=4000243;
    _this.x=_this.rnd(250)+100;
    //$LASTPOS=4000263;
    _this.y=30;
  },
  fiber$put :function _trc_func_4000230_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=4000243;
    _this.x=_this.rnd(250)+100;
    //$LASTPOS=4000263;
    _this.y=30;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Target,{"fullName":"user.Target","namespace":"user","shortName":"Target","decls":{"methods":{"main":{"nowait":false},"nextLevel":{"nowait":false},"put":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Title=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000001;
    Tonyu.globals.$Screen.resize(465,530);
    //$LASTPOS=5000026;
    new Tonyu.classes.kernel.Actor({x: 230,y: 100,text: "Box Climber",size: 50});
    //$LASTPOS=5000077;
    new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "Hit Space or touch",size: 20});
    //$LASTPOS=5000136;
    while (true) {
      //$LASTPOS=5000154;
      if (_this.getkey(32)||Tonyu.globals.$touches[0].touched) {
        //$LASTPOS=5000192;
        _this.loadPage(Tonyu.classes.user.Main);
      }
      //$LASTPOS=5000212;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=5000001;
    Tonyu.globals.$Screen.resize(465,530);
    //$LASTPOS=5000026;
    new Tonyu.classes.kernel.Actor({x: 230,y: 100,text: "Box Climber",size: 50});
    //$LASTPOS=5000077;
    new Tonyu.classes.kernel.Actor({x: 230,y: 200,text: "Hit Space or touch",size: 20});
    
    _thread.enter(function _trc_func_5000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=5000136;
        case 1:
          //$LASTPOS=5000154;
          if (!(_this.getkey(32)||Tonyu.globals.$touches[0].touched)) { __pc=3; break; }
          //$LASTPOS=5000192;
          _this.fiber$loadPage(_thread, Tonyu.classes.user.Main);
          __pc=2;return;
        case 2:
          
        case 3:
          
          //$LASTPOS=5000212;
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
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Title,{"fullName":"user.Title","namespace":"user","shortName":"Title","decls":{"methods":{"main":{"nowait":false}}}});

