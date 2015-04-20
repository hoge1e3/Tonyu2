Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Teki=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000021;//user.Teki:21
    while (_this.x<200) {
      //$LASTPOS=1000040;//user.Teki:40
      _this.x++;
      //$LASTPOS=1000049;//user.Teki:49
      _this.update();
      
    }
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
          //$LASTPOS=1000021;//user.Teki:21
        case 1:
          if (!(_this.x<200)) { __pc=3; break; }
          //$LASTPOS=1000040;//user.Teki:40
          _this.x++;
          //$LASTPOS=1000049;//user.Teki:49
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.Teki,{"fullName":"user.Teki","namespace":"user","shortName":"Teki","decls":{"methods":{"main":{"nowait":false}}}});

