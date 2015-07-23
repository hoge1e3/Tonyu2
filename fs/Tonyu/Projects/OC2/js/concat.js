Tonyu.klass.define({
  fullName: 'user.Block',
  shortName: 'Block',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Block_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_Block_f_main(_thread) {
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
      new Tonyu.classes.user.Player({x: 30,y: 100,radius: 10});
      //$LASTPOS=44000040;//user.Main:40
      new Tonyu.classes.user.Block({x: 20,y: 300,scaleX: 5,scaleY: 1,p: 2,isStatic: true,rotation: 10});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.Main:0
      new Tonyu.classes.user.Player({x: 30,y: 100,radius: 10});
      //$LASTPOS=44000040;//user.Main:40
      new Tonyu.classes.user.Block({x: 20,y: 300,scaleX: 5,scaleY: 1,p: 2,isStatic: true,rotation: 10});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_Player_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000020;//user.Player:20
      _this.p=Tonyu.globals.$pat_neko+45;
      //$LASTPOS=45000037;//user.Player:37
      _this.manualRotation=true;
      //$LASTPOS=45000059;//user.Player:59
      while (true) {
        //$LASTPOS=45000077;//user.Player:77
        if (_this.getkey("right")>0) {
          //$LASTPOS=45000099;//user.Player:99
          _this.vx+=0.6;
        }
        //$LASTPOS=45000113;//user.Player:113
        if (_this.getkey("left")>0) {
          //$LASTPOS=45000135;//user.Player:135
          _this.vx-=0.6;
        }
        //$LASTPOS=45000149;//user.Player:149
        if (_this.getkey("space")==1&&_this.contactTo(Tonyu.classes.user.Block)) {
          //$LASTPOS=45000202;//user.Player:202
          _this.vy=- 10;
          
        }
        //$LASTPOS=45000228;//user.Player:228
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000020;//user.Player:20
      _this.p=Tonyu.globals.$pat_neko+45;
      //$LASTPOS=45000037;//user.Player:37
      _this.manualRotation=true;
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000059;//user.Player:59
          case 1:
            //$LASTPOS=45000077;//user.Player:77
            if (_this.getkey("right")>0) {
              //$LASTPOS=45000099;//user.Player:99
              _this.vx+=0.6;
            }
            //$LASTPOS=45000113;//user.Player:113
            if (_this.getkey("left")>0) {
              //$LASTPOS=45000135;//user.Player:135
              _this.vx-=0.6;
            }
            //$LASTPOS=45000149;//user.Player:149
            if (_this.getkey("space")==1&&_this.contactTo(Tonyu.classes.user.Block)) {
              //$LASTPOS=45000202;//user.Player:202
              _this.vy=- 10;
              
            }
            //$LASTPOS=45000228;//user.Player:228
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
