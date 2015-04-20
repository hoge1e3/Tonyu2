Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Emitter=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000019;//user.Emitter:19
    _this.c=0;
    //$LASTPOS=1000024;//user.Emitter:24
    while (true) {
      //$LASTPOS=1000042;//user.Emitter:42
      _this.a=_this.asyncResult();
      //$LASTPOS=1000063;//user.Emitter:63
      setTimeout(_this.a.receiver,1000);
      //$LASTPOS=1000096;//user.Emitter:96
      _this.waitFor(_this.a);
      //$LASTPOS=1000112;//user.Emitter:112
      _this.c++;
      //$LASTPOS=1000121;//user.Emitter:121
      _this.m.sendEvent("hogera",[_this.c]);
      //$LASTPOS=1000152;//user.Emitter:152
      _this.print("HOGERA!"+_this.c);
      
    }
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000019;//user.Emitter:19
    _this.c=0;
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000024;//user.Emitter:24
        case 1:
          //$LASTPOS=1000042;//user.Emitter:42
          _this.a=_this.asyncResult();
          //$LASTPOS=1000063;//user.Emitter:63
          setTimeout(_this.a.receiver,1000);
          //$LASTPOS=1000096;//user.Emitter:96
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=1000112;//user.Emitter:112
          _this.c++;
          //$LASTPOS=1000121;//user.Emitter:121
          _this.m.sendEvent("hogera",[_this.c]);
          //$LASTPOS=1000152;//user.Emitter:152
          _this.print("HOGERA!"+_this.c);
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Emitter,{"fullName":"user.Emitter","namespace":"user","shortName":"Emitter","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;//user.Main:0
    _this.x=0;
    //$LASTPOS=2000005;//user.Main:5
    _this.y=100;
    //$LASTPOS=2000012;//user.Main:12
    new Tonyu.classes.user.Emitter({m: _this});
    //$LASTPOS=2000033;//user.Main:33
    while (true) {
      //$LASTPOS=2000051;//user.Main:51
      _this.x++;
      //$LASTPOS=2000060;//user.Main:60
      _this.update();
      //$LASTPOS=2000074;//user.Main:74
      if (_this.getkey(32)==1) {
        //$LASTPOS=2000103;//user.Main:103
        _this.waitEvent("hogera");
        //$LASTPOS=2000132;//user.Main:132
        _this.print("Recv "+_this.lastEvent[0]);
        
      }
      
    }
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;//user.Main:0
    _this.x=0;
    //$LASTPOS=2000005;//user.Main:5
    _this.y=100;
    //$LASTPOS=2000012;//user.Main:12
    new Tonyu.classes.user.Emitter({m: _this});
    
    _thread.enter(function _trc_func_2000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000033;//user.Main:33
        case 1:
          //$LASTPOS=2000051;//user.Main:51
          _this.x++;
          //$LASTPOS=2000060;//user.Main:60
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=2000074;//user.Main:74
          if (!(_this.getkey(32)==1)) { __pc=4; break; }
          //$LASTPOS=2000103;//user.Main:103
          _this.fiber$waitEvent(_thread, "hogera");
          __pc=3;return;
        case 3:
          
          //$LASTPOS=2000132;//user.Main:132
          _this.print("Recv "+_this.lastEvent[0]);
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
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

