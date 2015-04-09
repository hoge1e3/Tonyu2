Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.A=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  a :function _trc_func_1000001_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000012;
    _this.print("A");
    //$LASTPOS=1000023;
    _this.updateEx(30);
    //$LASTPOS=1000036;
    _this.print("A");
  },
  fiber$a :function _trc_func_1000001_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000012;
    _this.print("A");
    
    _thread.enter(function _trc_func_1000001_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000023;
          _this.fiber$updateEx(_thread, 30);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000036;
          _this.print("A");
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.A,{"fullName":"user.A","namespace":"user","shortName":"A","decls":{"methods":{"main":{"nowait":false},"a":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.B=Tonyu.klass(Tonyu.classes.user.A,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  b :function _trc_func_2000012_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000023;
    _this.print("B");
    //$LASTPOS=2000034;
    _this.updateEx(30);
    //$LASTPOS=2000047;
    _this.print("B");
  },
  fiber$b :function _trc_func_2000012_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000023;
    _this.print("B");
    
    _thread.enter(function _trc_func_2000012_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000034;
          _this.fiber$updateEx(_thread, 30);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=2000047;
          _this.print("B");
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.B,{"fullName":"user.B","namespace":"user","shortName":"B","decls":{"methods":{"main":{"nowait":false},"b":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.C=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.user.B],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000013;
    _this.a();
    //$LASTPOS=3000018;
    _this.b();
    //$LASTPOS=3000031;
    _this.print(_this.getClassInfo().fullName);
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_3000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=3000013;
          _this.fiber$a(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=3000018;
          _this.fiber$b(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=3000031;
          _this.print(_this.getClassInfo().fullName);
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.C,{"fullName":"user.C","namespace":"user","shortName":"C","decls":{"methods":{"main":{"nowait":false}}}});

