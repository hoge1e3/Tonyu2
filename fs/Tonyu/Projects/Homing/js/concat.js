Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Main_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000000;//user.Main:0
    Tonyu.globals.$Player=new Tonyu.classes.user.Player({x: 200,y: 200});
    //$LASTPOS=37000033;//user.Main:33
    while (true) {
      //$LASTPOS=37000051;//user.Main:51
      new Tonyu.classes.user.Missle({x: _this.rnd(400),y: 0});
      //$LASTPOS=37000083;//user.Main:83
      _this.updateEx(30);
      //$LASTPOS=37000101;//user.Main:101
      _this.print(_this.all(Tonyu.classes.kernel.T1Line).length);
      
    }
  },
  fiber$main :function _trc_Main_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37000000;//user.Main:0
    Tonyu.globals.$Player=new Tonyu.classes.user.Player({x: 200,y: 200});
    
    _thread.enter(function _trc_Main_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000033;//user.Main:33
        case 1:
          //$LASTPOS=37000051;//user.Main:51
          new Tonyu.classes.user.Missle({x: _this.rnd(400),y: 0});
          //$LASTPOS=37000083;//user.Main:83
          _this.fiber$updateEx(_thread, 30);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37000101;//user.Main:101
          _this.print(_this.all(Tonyu.classes.kernel.T1Line).length);
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Missle=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Missle_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    var _it_252;
    
    //$LASTPOS=38000000;//user.Missle:0
    _this.trace=[];
    //$LASTPOS=38000010;//user.Missle:10
    _this.rotation=0;
    //$LASTPOS=38000022;//user.Missle:22
    while (true) {
      //$LASTPOS=38000040;//user.Missle:40
      _this.d=_this.atan2(Tonyu.globals.$Player.y-_this.y,Tonyu.globals.$Player.x-_this.x);
      //$LASTPOS=38000079;//user.Missle:79
      _this.a=_this.angleDiff(_this.rotation,_this.d);
      //$LASTPOS=38000108;//user.Missle:108
      if (_this.a<0) {
        //$LASTPOS=38000117;//user.Missle:117
        _this.rotation+=5;
      } else {
        //$LASTPOS=38000135;//user.Missle:135
        _this.rotation-=5;
      }
      //$LASTPOS=38000152;//user.Missle:152
      _this.x+=_this.cos(_this.rotation)*5;
      //$LASTPOS=38000176;//user.Missle:176
      _this.y+=_this.sin(_this.rotation)*5;
      //$LASTPOS=38000200;//user.Missle:200
      _this.trace.push({x: _this.x,y: _this.y});
      //$LASTPOS=38000221;//user.Missle:221
      if (_this.trace.length>10) {
        //$LASTPOS=38000242;//user.Missle:242
        _this.trace.shift();
      }
      //$LASTPOS=38000296;//user.Missle:296
      _it_252=Tonyu.iterator(_this.trace,1);
      while(_it_252.next()) {
        t=_it_252[0];
        
        //$LASTPOS=38000323;//user.Missle:323
        _this.drawLine(_this.px,_this.py,t.x,t.y,"white");
        //$LASTPOS=38000408;//user.Missle:408
        _this.px=t.x;
        //$LASTPOS=38000415;//user.Missle:415
        _this.py=t.y;
        
      }
      //$LASTPOS=38000433;//user.Missle:433
      _this.update();
      
    }
  },
  fiber$main :function _trc_Missle_f_main(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var t;
    var _it_252;
    
    //$LASTPOS=38000000;//user.Missle:0
    _this.trace=[];
    //$LASTPOS=38000010;//user.Missle:10
    _this.rotation=0;
    
    _thread.enter(function _trc_Missle_ent_main(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=38000022;//user.Missle:22
        case 1:
          //$LASTPOS=38000040;//user.Missle:40
          _this.d=_this.atan2(Tonyu.globals.$Player.y-_this.y,Tonyu.globals.$Player.x-_this.x);
          //$LASTPOS=38000079;//user.Missle:79
          _this.a=_this.angleDiff(_this.rotation,_this.d);
          //$LASTPOS=38000108;//user.Missle:108
          if (_this.a<0) {
            //$LASTPOS=38000117;//user.Missle:117
            _this.rotation+=5;
          } else {
            //$LASTPOS=38000135;//user.Missle:135
            _this.rotation-=5;
          }
          //$LASTPOS=38000152;//user.Missle:152
          _this.x+=_this.cos(_this.rotation)*5;
          //$LASTPOS=38000176;//user.Missle:176
          _this.y+=_this.sin(_this.rotation)*5;
          //$LASTPOS=38000200;//user.Missle:200
          _this.trace.push({x: _this.x,y: _this.y});
          //$LASTPOS=38000221;//user.Missle:221
          if (_this.trace.length>10) {
            //$LASTPOS=38000242;//user.Missle:242
            _this.trace.shift();
          }
          //$LASTPOS=38000296;//user.Missle:296
          _it_252=Tonyu.iterator(_this.trace,1);
        case 2:
          if (!(_it_252.next())) { __pc=4; break; }
          t=_it_252[0];
          
          //$LASTPOS=38000323;//user.Missle:323
          _this.fiber$drawLine(_thread, _this.px, _this.py, t.x, t.y, "white");
          __pc=3;return;
        case 3:
          
          //$LASTPOS=38000408;//user.Missle:408
          _this.px=t.x;
          //$LASTPOS=38000415;//user.Missle:415
          _this.py=t.y;
          __pc=2;break;
        case 4:
          
          //$LASTPOS=38000433;//user.Missle:433
          _this.fiber$update(_thread);
          __pc=5;return;
        case 5:
          
          __pc=1;break;
        case 6:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Missle,{"fullName":"user.Missle","namespace":"user","shortName":"Missle","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Player=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_Player_main() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000001;//user.Player:1
    while (true) {
      //$LASTPOS=39000019;//user.Player:19
      _this.x=Tonyu.globals.$mouseX;
      //$LASTPOS=39000029;//user.Player:29
      _this.y=Tonyu.globals.$mouseY;
      //$LASTPOS=39000073;//user.Player:73
      if (_this.crashTo(Tonyu.classes.user.Missle)) {
        //$LASTPOS=39000094;//user.Player:94
        _this.all(Tonyu.classes.user.Missle).die();
      }
      //$LASTPOS=39000117;//user.Player:117
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
          //$LASTPOS=39000001;//user.Player:1
        case 1:
          //$LASTPOS=39000019;//user.Player:19
          _this.x=Tonyu.globals.$mouseX;
          //$LASTPOS=39000029;//user.Player:29
          _this.y=Tonyu.globals.$mouseY;
          //$LASTPOS=39000073;//user.Player:73
          if (_this.crashTo(Tonyu.classes.user.Missle)) {
            //$LASTPOS=39000094;//user.Player:94
            _this.all(Tonyu.classes.user.Missle).die();
          }
          //$LASTPOS=39000117;//user.Player:117
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
});
Tonyu.klass.addMeta(Tonyu.classes.user.Player,{"fullName":"user.Player","namespace":"user","shortName":"Player","decls":{"methods":{"main":{"nowait":false}}}});

