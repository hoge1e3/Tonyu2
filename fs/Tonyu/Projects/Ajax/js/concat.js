Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Main_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var e;
    
    try {
      //$LASTPOS=1000021;//user.Main:21
      _this.res=_this.runAsync(function (success,error) {
        
        //$LASTPOS=1000061;//user.Main:61
        $.ajax({url: "http://tonyuexe.appspot.com/hoge",success: success,error: error});
      });
      //$LASTPOS=1000169;//user.Main:169
      _this.print("Success");
      //$LASTPOS=1000191;//user.Main:191
      _this.print(_this.res[0]);
      
    } catch (e) {
      //$LASTPOS=1000224;//user.Main:224
      _this.print("Error");
      //$LASTPOS=1000244;//user.Main:244
      _this.print(e.args[0].statusText);
      
    }
  },
  fiber$main :function _trc_Main_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var e;
    
    
    _thread.enter(function _trc_Main_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          _thread.enterTry(2);
          //$LASTPOS=1000021;//user.Main:21
          _this.fiber$runAsync(_thread, function (success,error) {
            
            //$LASTPOS=1000061;//user.Main:61
            $.ajax({url: "http://tonyuexe.appspot.com/hoge",success: success,error: error});
          });
          __pc=1;return;
        case 1:
          _this.res=_thread.retVal;
          
          //$LASTPOS=1000169;//user.Main:169
          _this.print("Success");
          //$LASTPOS=1000191;//user.Main:191
          _this.print(_this.res[0]);_thread.exitTry();
          __pc=3;break;
        case 2:
          e=_thread.startCatch();
          _thread.exitTry();
          {
            //$LASTPOS=1000224;//user.Main:224
            _this.print("Error");
            //$LASTPOS=1000244;//user.Main:244
            _this.print(e.args[0].statusText);
          }
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

