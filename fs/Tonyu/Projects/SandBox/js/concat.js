Tonyu.klass.define({
  fullName: 'user.A',
  shortName: 'A',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_A_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_A_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.B',
  shortName: 'B',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_B_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_B_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000000;//user.Main:0
      new Tonyu.classes.user.A({x: 3});
      //$LASTPOS=44000012;//user.Main:12
      new Tonyu.classes.user.A({x: 4});
      //$LASTPOS=44000024;//user.Main:24
      new Tonyu.classes.user.B({x: 5});
      //$LASTPOS=44000036;//user.Main:36
      new Tonyu.classes.user.B({x: 6});
      //$LASTPOS=44000049;//user.Main:49
      _this.print(_this.all(Tonyu.classes.user.A).max("x"));
      //$LASTPOS=44000073;//user.Main:73
      _this.print(_this.all(Tonyu.classes.user.B).max("x"));
      //$LASTPOS=44000097;//user.Main:97
      _this.print(_this.all().max("x"));
      //$LASTPOS=44000120;//user.Main:120
      _this.print(_this.all().find1((function anonymous_137(e) {
        
        return e.x==3;
      })).x);
      //$LASTPOS=44000162;//user.Main:162
      _this.print(_this.all(_this.c).max("x"));
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.Main:0
      new Tonyu.classes.user.A({x: 3});
      //$LASTPOS=44000012;//user.Main:12
      new Tonyu.classes.user.A({x: 4});
      //$LASTPOS=44000024;//user.Main:24
      new Tonyu.classes.user.B({x: 5});
      //$LASTPOS=44000036;//user.Main:36
      new Tonyu.classes.user.B({x: 6});
      //$LASTPOS=44000049;//user.Main:49
      _this.print(_this.all(Tonyu.classes.user.A).max("x"));
      //$LASTPOS=44000073;//user.Main:73
      _this.print(_this.all(Tonyu.classes.user.B).max("x"));
      //$LASTPOS=44000097;//user.Main:97
      _this.print(_this.all().max("x"));
      //$LASTPOS=44000120;//user.Main:120
      _this.print(_this.all().find1((function anonymous_137(e) {
        
        return e.x==3;
      })).x);
      //$LASTPOS=44000162;//user.Main:162
      _this.print(_this.all(_this.c).max("x"));
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
