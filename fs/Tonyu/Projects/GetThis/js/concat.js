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
      
      //$LASTPOS=1000017;//user.Main:17
      _this.getit=(function anonymous_23() {
        
        return _this.window;
      });
      //$LASTPOS=1000054;//user.Main:54
      _this.doit=(function anonymous_59() {
        var s;
        
        //$LASTPOS=1000069;//user.Main:69
        s = _this["getit"];
        return s();
      });
      //$LASTPOS=1000239;//user.Main:239
      _this.window=3;
      //$LASTPOS=1000249;//user.Main:249
      _this.print(_this.doit());
      //$LASTPOS=1000266;//user.Main:266
      _this.f=new Function("window");
      //$LASTPOS=1000292;//user.Main:292
      _this.print(_this.f());
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000017;//user.Main:17
      _this.getit=(function anonymous_23() {
        
        return _this.window;
      });
      //$LASTPOS=1000054;//user.Main:54
      _this.doit=(function anonymous_59() {
        var s;
        
        //$LASTPOS=1000069;//user.Main:69
        s = _this["getit"];
        return s();
      });
      //$LASTPOS=1000239;//user.Main:239
      _this.window=3;
      //$LASTPOS=1000249;//user.Main:249
      _this.print(_this.doit());
      //$LASTPOS=1000266;//user.Main:266
      _this.f=new Function("window");
      //$LASTPOS=1000292;//user.Main:292
      _this.print(_this.f());
      
      _thread.retVal=_this;return;
    },
    __getter__myProp :function _trc_Main___getter__myProp() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000124;//user.Main:124
      _this.print("Get myProp="+_this._myp);
      return _this._myp;
    },
    __setter__myProp :function _trc_Main___setter__myProp(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000190;//user.Main:190
      _this.print("Set myProp to "+value);
      //$LASTPOS=1000225;//user.Main:225
      _this._myp=value;
    },
    __getter__ge :function _trc_Main___getter__ge() {
      "use strict";
      var _this=this;
      
      return 3;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"__getter__myProp":{"nowait":true},"__setter__myProp":{"nowait":true},"__getter__ge":{"nowait":true}}}
});
