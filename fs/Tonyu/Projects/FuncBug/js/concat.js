Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000001;//user.Main:1
      _this.print(3);
      //$LASTPOS=1000011;//user.Main:11
      (function anonymous_11() {
        
        //$LASTPOS=1000018;//user.Main:18
        _this.print(_this.x);
      });
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000001;//user.Main:1
      _this.print(3);
      //$LASTPOS=1000011;//user.Main:11
      (function anonymous_11() {
        
        //$LASTPOS=1000018;//user.Main:18
        _this.print(_this.x);
      });
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
