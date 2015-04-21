Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Emitter=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Emitter_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36000019;//user.Emitter:19
    _this.c=0;
    //$LASTPOS=36000024;//user.Emitter:24
    while (true) {
      //$LASTPOS=36000042;//user.Emitter:42
      _this.a=_this.asyncResult();
      //$LASTPOS=36000063;//user.Emitter:63
      setTimeout(_this.a.receiver,1000);
      //$LASTPOS=36000096;//user.Emitter:96
      _this.waitFor(_this.a);
      //$LASTPOS=36000112;//user.Emitter:112
      _this.c++;
      //$LASTPOS=36000121;//user.Emitter:121
      _this.m.sendEvent("hogera",_this.c);
      //$LASTPOS=36000150;//user.Emitter:150
      _this.print("HOGERA!"+_this.c);
      
    }
  },
  fiber$main :function _trc_Emitter_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=36000019;//user.Emitter:19
    _this.c=0;
    
    _thread.enter(function _trc_Emitter_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=36000024;//user.Emitter:24
        case 1:
          //$LASTPOS=36000042;//user.Emitter:42
          _this.a=_this.asyncResult();
          //$LASTPOS=36000063;//user.Emitter:63
          setTimeout(_this.a.receiver,1000);
          //$LASTPOS=36000096;//user.Emitter:96
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=36000112;//user.Emitter:112
          _this.c++;
          //$LASTPOS=36000121;//user.Emitter:121
          _this.m.sendEvent("hogera",_this.c);
          //$LASTPOS=36000150;//user.Emitter:150
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
  main :function _trc_Main_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000000;//user.Main:0
    _this.x=0;
    //$LASTPOS=37000005;//user.Main:5
    _this.y=100;
    //$LASTPOS=37000012;//user.Main:12
    new Tonyu.classes.user.Emitter({m: _this});
    //$LASTPOS=37000033;//user.Main:33
    while (true) {
      //$LASTPOS=37000051;//user.Main:51
      _this.x++;
      //$LASTPOS=37000060;//user.Main:60
      _this.update();
      //$LASTPOS=37000074;//user.Main:74
      if (_this.getkey(32)==1) {
        //$LASTPOS=37000103;//user.Main:103
        _this.r=_this.waitEvent("hogera");
        //$LASTPOS=37000134;//user.Main:134
        _this.print("Recv: "+_this.r);
        
      }
      
    }
  },
  fiber$main :function _trc_Main_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37000000;//user.Main:0
    _this.x=0;
    //$LASTPOS=37000005;//user.Main:5
    _this.y=100;
    //$LASTPOS=37000012;//user.Main:12
    new Tonyu.classes.user.Emitter({m: _this});
    
    _thread.enter(function _trc_Main_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000033;//user.Main:33
        case 1:
          //$LASTPOS=37000051;//user.Main:51
          _this.x++;
          //$LASTPOS=37000060;//user.Main:60
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37000074;//user.Main:74
          if (!(_this.getkey(32)==1)) { __pc=4; break; }
          //$LASTPOS=37000103;//user.Main:103
          _this.fiber$waitEvent(_thread, "hogera");
          __pc=3;return;
        case 3:
          _this.r=_thread.retVal;
          
          //$LASTPOS=37000134;//user.Main:134
          _this.print("Recv: "+_this.r);
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

