Tonyu.klass.define({
  fullName: 'user.Chara1',
  shortName: 'Chara1',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chara1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000000;//user.Chara1:0
      while (true) {
        //$LASTPOS=1000020;//user.Chara1:20
        _this.rotation+=10;
        //$LASTPOS=1000039;//user.Chara1:39
        _this.x+=10;
        //$LASTPOS=1000051;//user.Chara1:51
        Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
        //$LASTPOS=1000107;//user.Chara1:107
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
            //$LASTPOS=1000000;//user.Chara1:0
          case 1:
            //$LASTPOS=1000020;//user.Chara1:20
            _this.rotation+=10;
            //$LASTPOS=1000039;//user.Chara1:39
            _this.x+=10;
            //$LASTPOS=1000051;//user.Chara1:51
            Tonyu.globals.$Screen.scrollTo(_this.x-200,_this.y-200);
            //$LASTPOS=1000107;//user.Chara1:107
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
      
      //$LASTPOS=2000020;//user.Chara2:20
      _this.vy=0;
    },
    fiber$main :function _trc_Chara2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000020;//user.Chara2:20
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
      
      //$LASTPOS=3000000;//user.Main:0
      _this.a=new Tonyu.classes.user.Chara1({x: 50,y: 100,scaleX: 10,scaleY: 10,p: Tonyu.globals.$pat_mapchip+88,zOrder: 0});
      //$LASTPOS=3000198;//user.Main:198
      _this.print(Tonyu.globals.$FrontSprites);
      //$LASTPOS=3000222;//user.Main:222
      new Tonyu.classes.user.Chara2({x: 200,y: 200,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=3000268;//user.Main:268
      new Tonyu.classes.user.Chara2({x: 300,y: 200});
      //$LASTPOS=3000294;//user.Main:294
      new Tonyu.classes.user.Chara2({x: 200,y: 100});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Main:0
      _this.a=new Tonyu.classes.user.Chara1({x: 50,y: 100,scaleX: 10,scaleY: 10,p: Tonyu.globals.$pat_mapchip+88,zOrder: 0});
      //$LASTPOS=3000198;//user.Main:198
      _this.print(Tonyu.globals.$FrontSprites);
      //$LASTPOS=3000222;//user.Main:222
      new Tonyu.classes.user.Chara2({x: 200,y: 200,layer: Tonyu.globals.$FrontSprites});
      //$LASTPOS=3000268;//user.Main:268
      new Tonyu.classes.user.Chara2({x: 300,y: 200});
      //$LASTPOS=3000294;//user.Main:294
      new Tonyu.classes.user.Chara2({x: 200,y: 100});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
