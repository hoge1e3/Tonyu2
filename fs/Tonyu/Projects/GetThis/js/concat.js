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
      
      //$LASTPOS=1000018;//user.Main:18
      _this.getit=(function anonymous_24() {
        
        return _this.window;
      });
      //$LASTPOS=1000059;//user.Main:59
      _this.doit=(function anonymous_64() {
        var s;
        
        //$LASTPOS=1000075;//user.Main:75
        s = _this["getit"];
        return s();
      });
      //$LASTPOS=1000257;//user.Main:257
      _this.window=3;
      //$LASTPOS=1000268;//user.Main:268
      _this.print(_this.doit());
      //$LASTPOS=1000286;//user.Main:286
      _this.f=new Function("window");
      //$LASTPOS=1000313;//user.Main:313
      _this.print(_this.f());
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      "use strict";
      var _this=this;
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000018;//user.Main:18
      _this.getit=(function anonymous_24() {
        
        return _this.window;
      });
      //$LASTPOS=1000059;//user.Main:59
      _this.doit=(function anonymous_64() {
        var s;
        
        //$LASTPOS=1000075;//user.Main:75
        s = _this["getit"];
        return s();
      });
      //$LASTPOS=1000257;//user.Main:257
      _this.window=3;
      //$LASTPOS=1000268;//user.Main:268
      _this.print(_this.doit());
      //$LASTPOS=1000286;//user.Main:286
      _this.f=new Function("window");
      //$LASTPOS=1000313;//user.Main:313
      _this.print(_this.f());
      
      _thread.retVal=_this;return;
    },
    __getter__myProp :function _trc_Main___getter__myProp() {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000135;//user.Main:135
      _this.print("Get myProp="+_this._myp);
      return _this._myp;
    },
    __setter__myProp :function _trc_Main___setter__myProp(value) {
      "use strict";
      var _this=this;
      
      //$LASTPOS=1000205;//user.Main:205
      _this.print("Set myProp to "+value);
      //$LASTPOS=1000241;//user.Main:241
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
