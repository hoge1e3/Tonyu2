Tonyu.klass.define({
  fullName: 'user.Chara1',
  shortName: 'Chara1',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chara1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000000;//user.Chara1:0
      while (true) {
        //$LASTPOS=45000019;//user.Chara1:19
        _this.rotation+=10;
        //$LASTPOS=45000037;//user.Chara1:37
        _this.x+=10;
        //$LASTPOS=45000048;//user.Chara1:48
        Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
        //$LASTPOS=45000102;//user.Chara1:102
        _this.update();
        
      }
    },
    fiber$main :function _trc_Chara1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Chara1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000000;//user.Chara1:0
          case 1:
            //$LASTPOS=45000019;//user.Chara1:19
            _this.rotation+=10;
            //$LASTPOS=45000037;//user.Chara1:37
            _this.x+=10;
            //$LASTPOS=45000048;//user.Chara1:48
            Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
            //$LASTPOS=45000102;//user.Chara1:102
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
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Chara2',
  shortName: 'Chara2',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chara2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000018;//user.Chara2:18
      _this.vy=0;
    },
    fiber$main :function _trc_Chara2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000018;//user.Chara2:18
      _this.vy=0;
      
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
      
      //$LASTPOS=47000000;//user.Main:0
      _this.a=new Tonyu.classes.user.Chara1({x: 50,y: 100,scaleX: 10,scaleY: 10,p: Tonyu.globals.$pat_mapchip+88,zOrder: 0});
      //$LASTPOS=47000191;//user.Main:191
      _this.print(Tonyu.globals.$FrontSprites);
      //$LASTPOS=47000214;//user.Main:214
      new Tonyu.classes.user.Chara2({x: 200,y: 200,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=47000259;//user.Main:259
      new Tonyu.classes.user.Chara2({x: 300,y: 200});
      //$LASTPOS=47000284;//user.Main:284
      new Tonyu.classes.user.Chara2({x: 200,y: 100});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000000;//user.Main:0
      _this.a=new Tonyu.classes.user.Chara1({x: 50,y: 100,scaleX: 10,scaleY: 10,p: Tonyu.globals.$pat_mapchip+88,zOrder: 0});
      //$LASTPOS=47000191;//user.Main:191
      _this.print(Tonyu.globals.$FrontSprites);
      //$LASTPOS=47000214;//user.Main:214
      new Tonyu.classes.user.Chara2({x: 200,y: 200,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=47000259;//user.Main:259
      new Tonyu.classes.user.Chara2({x: 300,y: 200});
      //$LASTPOS=47000284;//user.Main:284
      new Tonyu.classes.user.Chara2({x: 200,y: 100});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
