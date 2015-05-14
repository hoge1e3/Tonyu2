Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000001;//user.Main:1
      _this.s=new Tonyu.classes.user.SeeSaw({x: 200,y: 200,scaleX: 10,scaleY: 1});
      //$LASTPOS=40000112;//user.Main:112
      new Tonyu.classes.kernel.BodyActor({x: 200,y: 3});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=40000001;//user.Main:1
      _this.s=new Tonyu.classes.user.SeeSaw({x: 200,y: 200,scaleX: 10,scaleY: 1});
      //$LASTPOS=40000112;//user.Main:112
      new Tonyu.classes.kernel.BodyActor({x: 200,y: 3});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.SeeSaw',
  shortName: 'SeeSaw',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.BodyActor,
  includes: [],
  methods: {
    main :function _trc_SeeSaw_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000021;//user.SeeSaw:21
      _this.addRevoluteJoint({x: 300,y: 200,lowerAngle: - 30,upperAngle: 30});
      //$LASTPOS=41000082;//user.SeeSaw:82
      while (true) {
        //$LASTPOS=41000100;//user.SeeSaw:100
        if (_this.getkey(32)) {
          //$LASTPOS=41000115;//user.SeeSaw:115
          _this.applyImpulse(0,- 30);
        }
        //$LASTPOS=41000140;//user.SeeSaw:140
        _this.update();
        
      }
    },
    fiber$main :function _trc_SeeSaw_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_SeeSaw_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000021;//user.SeeSaw:21
            _this.fiber$addRevoluteJoint(_thread, {x: 300,y: 200,lowerAngle: - 30,upperAngle: 30});
            __pc=1;return;
          case 1:
            
            //$LASTPOS=41000082;//user.SeeSaw:82
          case 2:
            //$LASTPOS=41000100;//user.SeeSaw:100
            if (!(_this.getkey(32))) { __pc=4; break; }
            //$LASTPOS=41000115;//user.SeeSaw:115
            _this.fiber$applyImpulse(_thread, 0, - 30);
            __pc=3;return;
          case 3:
            
          case 4:
            
            //$LASTPOS=41000140;//user.SeeSaw:140
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=2;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
