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
      _this.m=new Tonyu.classes.user.Protted;
      //$LASTPOS=1000016;//user.Main:16
      _this.m.a=10;
      //$LASTPOS=1000050;//user.Main:50
      _this.m.myProp=50;
      //$LASTPOS=1000064;//user.Main:64
      _this.m2=new Tonyu.classes.user.Protted;
      //$LASTPOS=1000080;//user.Main:80
      _this.m2.a=20;
      //$LASTPOS=1000089;//user.Main:89
      _this.m2.myProp=20;
      //$LASTPOS=1000156;//user.Main:156
      _this.print(_this.m.myProp+_this.m2.myProp);
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000001;//user.Main:1
      _this.m=new Tonyu.classes.user.Protted;
      //$LASTPOS=1000016;//user.Main:16
      _this.m.a=10;
      //$LASTPOS=1000050;//user.Main:50
      _this.m.myProp=50;
      //$LASTPOS=1000064;//user.Main:64
      _this.m2=new Tonyu.classes.user.Protted;
      //$LASTPOS=1000080;//user.Main:80
      _this.m2.a=20;
      //$LASTPOS=1000089;//user.Main:89
      _this.m2.myProp=20;
      //$LASTPOS=1000156;//user.Main:156
      _this.print(_this.m.myProp+_this.m2.myProp);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Protted',
  shortName: 'Protted',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Protted_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Protted_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    getA :function _trc_Protted_getA() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000029;//user.Protted:29
      _this.print("a="+_this._a);
      return _this._a;
    },
    fiber$getA :function _trc_Protted_f_getA(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000029;//user.Protted:29
      _this.print("a="+_this._a);
      _thread.retVal=_this._a;return;
      
      
      _thread.retVal=_this;return;
    },
    setA :function _trc_Protted_setA(v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000077;//user.Protted:77
      _this.print("a="+_this._a+"->"+v);
      //$LASTPOS=2000104;//user.Protted:104
      _this._a=v;
    },
    fiber$setA :function _trc_Protted_f_setA(_thread,v) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000077;//user.Protted:77
      _this.print("a="+_this._a+"->"+v);
      //$LASTPOS=2000104;//user.Protted:104
      _this._a=v;
      
      _thread.retVal=_this;return;
    },
    __setter__myProp :function _trc_Protted___setter__myProp(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000130;//user.Protted:130
      _this.print("set "+p);
      //$LASTPOS=2000151;//user.Protted:151
      _this._p=p;
    },
    __getter__myProp :function _trc_Protted___getter__myProp() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000173;//user.Protted:173
      _this.print("get "+_this._p);
      return _this._p;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"getA":{"nowait":false},"setA":{"nowait":false},"__setter__myProp":{"nowait":true},"__getter__myProp":{"nowait":true}}}
});
