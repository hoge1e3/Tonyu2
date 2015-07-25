Tonyu.klass.define({
  fullName: 'user.Effect',
  shortName: 'Effect',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Effect_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000001;//user.Effect:1
      _this.p=5;
      //$LASTPOS=44000006;//user.Effect:6
      _this.scaleX=0.3;
      //$LASTPOS=44000018;//user.Effect:18
      _this.updateEx(10);
      //$LASTPOS=44000032;//user.Effect:32
      _this.die();
    },
    fiber$main :function _trc_Effect_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000001;//user.Effect:1
      _this.p=5;
      //$LASTPOS=44000006;//user.Effect:6
      _this.scaleX=0.3;
      
      _thread.enter(function _trc_Effect_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000018;//user.Effect:18
            _this.fiber$updateEx(_thread, 10);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=44000032;//user.Effect:32
            _this.die();
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
      
      //$LASTPOS=45000001;//user.Main:1
      new Tonyu.classes.user.Player({x: 210,y: 100});
      //$LASTPOS=45000026;//user.Main:26
      new Tonyu.classes.user.SeeSaw({x: 200,y: 300,scaleX: 10,scaleY: 1,rotation: 10});
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000001;//user.Main:1
      new Tonyu.classes.user.Player({x: 210,y: 100});
      //$LASTPOS=45000026;//user.Main:26
      new Tonyu.classes.user.SeeSaw({x: 200,y: 300,scaleX: 10,scaleY: 1,rotation: 10});
      
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
      
      //$LASTPOS=46000097;//user.Player:97
      while (true) {
        //$LASTPOS=46000115;//user.Player:115
        _this.pt=_this.contactPoint(Tonyu.classes.user.SeeSaw);
        //$LASTPOS=46000144;//user.Player:144
        if (_this.pt) {
          //$LASTPOS=46000192;//user.Player:192
          new Tonyu.classes.user.Effect({x: _this.pt.x,y: _this.pt.y});
          //$LASTPOS=46000228;//user.Player:228
          if (_this.getkey(32)==1) {
            //$LASTPOS=46000261;//user.Player:261
            _this.vx+=(_this.x-_this.pt.x)*0.5;
            //$LASTPOS=46000291;//user.Player:291
            _this.vy+=(_this.y-_this.pt.y)*0.5;
            
          }
          //$LASTPOS=46000327;//user.Player:327
          if (_this.getkey("left")) {
            //$LASTPOS=46000361;//user.Player:361
            _this.vx+=(_this.y-_this.pt.y)*0.05;
            //$LASTPOS=46000392;//user.Player:392
            _this.vy+=(_this.x-_this.pt.x)*0.05;
            
          }
          //$LASTPOS=46000429;//user.Player:429
          if (_this.getkey("right")) {
            //$LASTPOS=46000464;//user.Player:464
            _this.vx-=(_this.y-_this.pt.y)*0.05;
            //$LASTPOS=46000495;//user.Player:495
            _this.vy-=(_this.x-_this.pt.x)*0.05;
            
          }
          
        } else {
          //$LASTPOS=46000545;//user.Player:545
          if (_this.getkey("left")) {
            //$LASTPOS=46000579;//user.Player:579
            _this.vx-=0.1;
            
          }
          //$LASTPOS=46000606;//user.Player:606
          if (_this.getkey("right")) {
            //$LASTPOS=46000641;//user.Player:641
            _this.vx+=0.1;
            
          }
          
        }
        //$LASTPOS=46000670;//user.Player:670
        _this.update();
        
      }
    },
    fiber$main :function _trc_Player_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Player_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000097;//user.Player:97
          case 1:
            //$LASTPOS=46000115;//user.Player:115
            _this.fiber$contactPoint(_thread, Tonyu.classes.user.SeeSaw);
            __pc=2;return;
          case 2:
            _this.pt=_thread.retVal;
            
            //$LASTPOS=46000144;//user.Player:144
            if (_this.pt) {
              //$LASTPOS=46000192;//user.Player:192
              new Tonyu.classes.user.Effect({x: _this.pt.x,y: _this.pt.y});
              //$LASTPOS=46000228;//user.Player:228
              if (_this.getkey(32)==1) {
                //$LASTPOS=46000261;//user.Player:261
                _this.vx+=(_this.x-_this.pt.x)*0.5;
                //$LASTPOS=46000291;//user.Player:291
                _this.vy+=(_this.y-_this.pt.y)*0.5;
                
              }
              //$LASTPOS=46000327;//user.Player:327
              if (_this.getkey("left")) {
                //$LASTPOS=46000361;//user.Player:361
                _this.vx+=(_this.y-_this.pt.y)*0.05;
                //$LASTPOS=46000392;//user.Player:392
                _this.vy+=(_this.x-_this.pt.x)*0.05;
                
              }
              //$LASTPOS=46000429;//user.Player:429
              if (_this.getkey("right")) {
                //$LASTPOS=46000464;//user.Player:464
                _this.vx-=(_this.y-_this.pt.y)*0.05;
                //$LASTPOS=46000495;//user.Player:495
                _this.vy-=(_this.x-_this.pt.x)*0.05;
                
              }
              
            } else {
              //$LASTPOS=46000545;//user.Player:545
              if (_this.getkey("left")) {
                //$LASTPOS=46000579;//user.Player:579
                _this.vx-=0.1;
                
              }
              //$LASTPOS=46000606;//user.Player:606
              if (_this.getkey("right")) {
                //$LASTPOS=46000641;//user.Player:641
                _this.vx+=0.1;
                
              }
              
            }
            //$LASTPOS=46000670;//user.Player:670
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    onAppear :function _trc_Player_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000038;//user.Player:38
      _this.restitution=0;
      //$LASTPOS=46000057;//user.Player:57
      _this.shape="circle";
      //$LASTPOS=46000077;//user.Player:77
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_Player_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000038;//user.Player:38
      _this.restitution=0;
      //$LASTPOS=46000057;//user.Player:57
      _this.shape="circle";
      
      _thread.enter(function _trc_Player_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000077;//user.Player:77
            Tonyu.classes.kernel.BodyActor.prototype.fiber$onAppear.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}}}
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
      
      //$LASTPOS=47000094;//user.SeeSaw:94
      _this.t=0;
      //$LASTPOS=47000099;//user.SeeSaw:99
      while (true) {
        //$LASTPOS=47000117;//user.SeeSaw:117
        _this.rotation=_this.sin(_this.t)*30;
        //$LASTPOS=47000141;//user.SeeSaw:141
        _this.t+=1;
        //$LASTPOS=47000151;//user.SeeSaw:151
        _this.update();
        
      }
    },
    fiber$main :function _trc_SeeSaw_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000094;//user.SeeSaw:94
      _this.t=0;
      
      _thread.enter(function _trc_SeeSaw_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000099;//user.SeeSaw:99
          case 1:
            //$LASTPOS=47000117;//user.SeeSaw:117
            _this.rotation=_this.sin(_this.t)*30;
            //$LASTPOS=47000141;//user.SeeSaw:141
            _this.t+=1;
            //$LASTPOS=47000151;//user.SeeSaw:151
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
    onAppear :function _trc_SeeSaw_onAppear() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=47000036;//user.SeeSaw:36
      _this.isStatic=true;
      //$LASTPOS=47000055;//user.SeeSaw:55
      _this.restitution=0;
      //$LASTPOS=47000074;//user.SeeSaw:74
      Tonyu.classes.kernel.BodyActor.prototype.onAppear.apply( _this, []);
    },
    fiber$onAppear :function _trc_SeeSaw_f_onAppear(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=47000036;//user.SeeSaw:36
      _this.isStatic=true;
      //$LASTPOS=47000055;//user.SeeSaw:55
      _this.restitution=0;
      
      _thread.enter(function _trc_SeeSaw_ent_onAppear(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000074;//user.SeeSaw:74
            Tonyu.classes.kernel.BodyActor.prototype.fiber$onAppear.apply( _this, [_thread]);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false}}}
});
