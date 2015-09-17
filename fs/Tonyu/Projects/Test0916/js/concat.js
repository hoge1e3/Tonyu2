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
        //$LASTPOS=1000019;//user.Chara1:19
        _this.rotation+=10;
        //$LASTPOS=1000037;//user.Chara1:37
        _this.x++;
        //$LASTPOS=1000065;//user.Chara1:65
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
            //$LASTPOS=1000019;//user.Chara1:19
            _this.rotation+=10;
            //$LASTPOS=1000037;//user.Chara1:37
            _this.x++;
            //$LASTPOS=1000065;//user.Chara1:65
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
      
      //$LASTPOS=2000000;//user.Chara2:0
      _this.x=100;
      //$LASTPOS=2000007;//user.Chara2:7
      _this.y=200;
      //$LASTPOS=2000014;//user.Chara2:14
      _this.vy=0;
      //$LASTPOS=2000020;//user.Chara2:20
      while (true) {
        //$LASTPOS=2000038;//user.Chara2:38
        _this.x++;
        //$LASTPOS=2000047;//user.Chara2:47
        _this.y+=_this.vy;
        //$LASTPOS=2000058;//user.Chara2:58
        _this.vy+=0.1;
        //$LASTPOS=2000071;//user.Chara2:71
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=2000102;//user.Chara2:102
          _this.y=Tonyu.globals.$screenHeight;
          //$LASTPOS=2000127;//user.Chara2:127
          _this.vy=- _this.vy;
          
        }
        //$LASTPOS=2000145;//user.Chara2:145
        _this.update();
        
      }
    },
    fiber$main :function _trc_Chara2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000000;//user.Chara2:0
      _this.x=100;
      //$LASTPOS=2000007;//user.Chara2:7
      _this.y=200;
      //$LASTPOS=2000014;//user.Chara2:14
      _this.vy=0;
      
      _thread.enter(function _trc_Chara2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000020;//user.Chara2:20
          case 1:
            //$LASTPOS=2000038;//user.Chara2:38
            _this.x++;
            //$LASTPOS=2000047;//user.Chara2:47
            _this.y+=_this.vy;
            //$LASTPOS=2000058;//user.Chara2:58
            _this.vy+=0.1;
            //$LASTPOS=2000071;//user.Chara2:71
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=2000102;//user.Chara2:102
              _this.y=Tonyu.globals.$screenHeight;
              //$LASTPOS=2000127;//user.Chara2:127
              _this.vy=- _this.vy;
              
            }
            //$LASTPOS=2000145;//user.Chara2:145
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
      //$LASTPOS=3000084;//user.Main:84
      _this.b=new Tonyu.classes.user.Chara1({x: 100,y: 200,rotation: 45,zOrder: 10});
      //$LASTPOS=3000137;//user.Main:137
      _this.c=new Tonyu.classes.user.Chara1({x: 300,y: 300,alpha: 128,zOrder: 0});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000000;//user.Main:0
      _this.a=new Tonyu.classes.user.Chara1({x: 50,y: 100,scaleX: 10,scaleY: 10,p: Tonyu.globals.$pat_mapchip+88,zOrder: 0});
      //$LASTPOS=3000084;//user.Main:84
      _this.b=new Tonyu.classes.user.Chara1({x: 100,y: 200,rotation: 45,zOrder: 10});
      //$LASTPOS=3000137;//user.Main:137
      _this.c=new Tonyu.classes.user.Chara1({x: 300,y: 300,alpha: 128,zOrder: 0});
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
