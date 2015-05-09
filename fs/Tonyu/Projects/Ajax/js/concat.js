Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      
      try {
        //$LASTPOS=1000021;//user.Main:21
        _this.res=_this.runAsync((function anonymous_34(success,error) {
          
          //$LASTPOS=1000061;//user.Main:61
          $.ajax({url: "http://tonyuexe.appspot.com/",success: success,error: error});
        }));
        //$LASTPOS=1000165;//user.Main:165
        _this.print("Success");
        //$LASTPOS=1000187;//user.Main:187
        _this.print(_this.res[0]);
        
      } catch (e) {
        //$LASTPOS=1000220;//user.Main:220
        _this.print("Error");
        //$LASTPOS=1000240;//user.Main:240
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
            _this.fiber$runAsync(_thread, (function anonymous_34(success,error) {
              
              //$LASTPOS=1000061;//user.Main:61
              $.ajax({url: "http://tonyuexe.appspot.com/",success: success,error: error});
            }));
            __pc=1;return;
          case 1:
            _this.res=_thread.retVal;
            
            //$LASTPOS=1000165;//user.Main:165
            _this.print("Success");
            //$LASTPOS=1000187;//user.Main:187
            _this.print(_this.res[0]);_thread.exitTry();
            __pc=3;break;
          case 2:
            e=_thread.startCatch();
            _thread.exitTry();
            {
              //$LASTPOS=1000220;//user.Main:220
              _this.print("Error");
              //$LASTPOS=1000240;//user.Main:240
              _this.print(e.args[0].statusText);
            }
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
