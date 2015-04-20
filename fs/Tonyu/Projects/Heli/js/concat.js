Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Heli=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000000;//user.Heli:0
    _this.p=Tonyu.globals.$pat_heli;
    //$LASTPOS=1000013;//user.Heli:13
    _this.l=new Tonyu.classes.user.Rotor({t: 0});
    //$LASTPOS=1000031;//user.Heli:31
    _this.r=new Tonyu.classes.user.Rotor({t: 1});
    //$LASTPOS=1000049;//user.Heli:49
    _this.update();
    //$LASTPOS=1000059;//user.Heli:59
    _this.vx=0;
    //$LASTPOS=1000064;//user.Heli:64
    _this.vy=0;
    //$LASTPOS=1000070;//user.Heli:70
    while (true) {
      //$LASTPOS=1000088;//user.Heli:88
      _this.la=- 135+_this.rotation;
      //$LASTPOS=1000110;//user.Heli:110
      _this.l.x=_this.x+_this.cos(_this.la)*30;
      //$LASTPOS=1000132;//user.Heli:132
      _this.l.y=_this.y+_this.sin(_this.la)*30;
      //$LASTPOS=1000154;//user.Heli:154
      _this.l.rotation=_this.rotation;
      //$LASTPOS=1000179;//user.Heli:179
      _this.ra=- 45+_this.rotation;
      //$LASTPOS=1000200;//user.Heli:200
      _this.r.x=_this.x+_this.cos(_this.ra)*30;
      //$LASTPOS=1000222;//user.Heli:222
      _this.r.y=_this.y+_this.sin(_this.ra)*30;
      //$LASTPOS=1000244;//user.Heli:244
      _this.r.rotation=_this.rotation;
      //$LASTPOS=1000269;//user.Heli:269
      _this.pow=(_this.l.pow+_this.r.pow)*0.001;
      //$LASTPOS=1000298;//user.Heli:298
      _this.vx+=_this.cos(_this.rotation-90)*_this.pow;
      //$LASTPOS=1000328;//user.Heli:328
      _this.vy+=_this.sin(_this.rotation-90)*_this.pow;
      //$LASTPOS=1000358;//user.Heli:358
      _this.vy+=0.1;
      //$LASTPOS=1000371;//user.Heli:371
      _this.x+=_this.vx;
      //$LASTPOS=1000382;//user.Heli:382
      _this.y+=_this.vy;
      //$LASTPOS=1000393;//user.Heli:393
      _this.rotation+=(_this.l.pow-_this.r.pow)*0.01;
      //$LASTPOS=1000427;//user.Heli:427
      if (_this.y>Tonyu.globals.$screenHeight) {
        //$LASTPOS=1000458;//user.Heli:458
        _this.die();
        
      }
      //$LASTPOS=1000475;//user.Heli:475
      if (Tonyu.globals.$map.getAt(_this.x,_this.y+16)>0) {
        //$LASTPOS=1000511;//user.Heli:511
        _this.vy=- _this.abs(_this.vy)/2-0.1;
        
      }
      //$LASTPOS=1000540;//user.Heli:540
      if (Tonyu.globals.$map.getAt(_this.x,_this.y)>0) {
        //$LASTPOS=1000573;//user.Heli:573
        _this.die();
        
      }
      //$LASTPOS=1000590;//user.Heli:590
      if (_this.x<0) {
        //$LASTPOS=1000601;//user.Heli:601
        _this.x=0;
        //$LASTPOS=1000605;//user.Heli:605
        _this.vx=0;
        
      }
      //$LASTPOS=1000616;//user.Heli:616
      if (_this.x>128*32) {
        //$LASTPOS=1000631;//user.Heli:631
        _this.x=128*32;
        //$LASTPOS=1000640;//user.Heli:640
        _this.vx=0;
        
      }
      //$LASTPOS=1000651;//user.Heli:651
      _this.rotation*=0.99;
      //$LASTPOS=1000671;//user.Heli:671
      Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2+_this.vx*30,- 16);
      //$LASTPOS=1000721;//user.Heli:721
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000000;//user.Heli:0
    _this.p=Tonyu.globals.$pat_heli;
    //$LASTPOS=1000013;//user.Heli:13
    _this.l=new Tonyu.classes.user.Rotor({t: 0});
    //$LASTPOS=1000031;//user.Heli:31
    _this.r=new Tonyu.classes.user.Rotor({t: 1});
    
    _thread.enter(function _trc_func_1000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000049;//user.Heli:49
          _this.fiber$update(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000059;//user.Heli:59
          _this.vx=0;
          //$LASTPOS=1000064;//user.Heli:64
          _this.vy=0;
          //$LASTPOS=1000070;//user.Heli:70
        case 2:
          //$LASTPOS=1000088;//user.Heli:88
          _this.la=- 135+_this.rotation;
          //$LASTPOS=1000110;//user.Heli:110
          _this.l.x=_this.x+_this.cos(_this.la)*30;
          //$LASTPOS=1000132;//user.Heli:132
          _this.l.y=_this.y+_this.sin(_this.la)*30;
          //$LASTPOS=1000154;//user.Heli:154
          _this.l.rotation=_this.rotation;
          //$LASTPOS=1000179;//user.Heli:179
          _this.ra=- 45+_this.rotation;
          //$LASTPOS=1000200;//user.Heli:200
          _this.r.x=_this.x+_this.cos(_this.ra)*30;
          //$LASTPOS=1000222;//user.Heli:222
          _this.r.y=_this.y+_this.sin(_this.ra)*30;
          //$LASTPOS=1000244;//user.Heli:244
          _this.r.rotation=_this.rotation;
          //$LASTPOS=1000269;//user.Heli:269
          _this.pow=(_this.l.pow+_this.r.pow)*0.001;
          //$LASTPOS=1000298;//user.Heli:298
          _this.vx+=_this.cos(_this.rotation-90)*_this.pow;
          //$LASTPOS=1000328;//user.Heli:328
          _this.vy+=_this.sin(_this.rotation-90)*_this.pow;
          //$LASTPOS=1000358;//user.Heli:358
          _this.vy+=0.1;
          //$LASTPOS=1000371;//user.Heli:371
          _this.x+=_this.vx;
          //$LASTPOS=1000382;//user.Heli:382
          _this.y+=_this.vy;
          //$LASTPOS=1000393;//user.Heli:393
          _this.rotation+=(_this.l.pow-_this.r.pow)*0.01;
          //$LASTPOS=1000427;//user.Heli:427
          if (_this.y>Tonyu.globals.$screenHeight) {
            //$LASTPOS=1000458;//user.Heli:458
            _this.die();
            
          }
          //$LASTPOS=1000475;//user.Heli:475
          if (Tonyu.globals.$map.getAt(_this.x,_this.y+16)>0) {
            //$LASTPOS=1000511;//user.Heli:511
            _this.vy=- _this.abs(_this.vy)/2-0.1;
            
          }
          //$LASTPOS=1000540;//user.Heli:540
          if (Tonyu.globals.$map.getAt(_this.x,_this.y)>0) {
            //$LASTPOS=1000573;//user.Heli:573
            _this.die();
            
          }
          //$LASTPOS=1000590;//user.Heli:590
          if (_this.x<0) {
            //$LASTPOS=1000601;//user.Heli:601
            _this.x=0;
            //$LASTPOS=1000605;//user.Heli:605
            _this.vx=0;
            
          }
          //$LASTPOS=1000616;//user.Heli:616
          if (_this.x>128*32) {
            //$LASTPOS=1000631;//user.Heli:631
            _this.x=128*32;
            //$LASTPOS=1000640;//user.Heli:640
            _this.vx=0;
            
          }
          //$LASTPOS=1000651;//user.Heli:651
          _this.rotation*=0.99;
          //$LASTPOS=1000671;//user.Heli:671
          Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2+_this.vx*30,- 16);
          //$LASTPOS=1000721;//user.Heli:721
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=2;break;
        case 4:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  die :function _trc_func_1000733_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000746;//user.Heli:746
    _this.l.die();
    //$LASTPOS=1000759;//user.Heli:759
    _this.r.die();
    //$LASTPOS=1000772;//user.Heli:772
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Heli,{"fullName":"user.Heli","namespace":"user","shortName":"Heli","decls":{"methods":{"main":{"nowait":false},"die":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000000;//user.Main:0
    new Tonyu.classes.user.Heli({x: 200,y: 400});
    //$LASTPOS=2000023;//user.Main:23
    Tonyu.globals.$Screen.setBGColor("skyblue");
    //$LASTPOS=2000054;//user.Main:54
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=2000097;//user.Main:97
    Tonyu.globals.$map.load("map.json");
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000000;//user.Main:0
    new Tonyu.classes.user.Heli({x: 200,y: 400});
    //$LASTPOS=2000023;//user.Main:23
    Tonyu.globals.$Screen.setBGColor("skyblue");
    //$LASTPOS=2000054;//user.Main:54
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=2000097;//user.Main:97
    Tonyu.globals.$map.load("map.json");
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Main,{"fullName":"user.Main","namespace":"user","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'user');
Tonyu.classes.user.Rotor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000000;//user.Rotor:0
    _this.p=Tonyu.globals.$pat_heli+1;
    //$LASTPOS=3000016;//user.Rotor:16
    _this.d=0;
    //$LASTPOS=3000021;//user.Rotor:21
    _this.pow=0;
    //$LASTPOS=3000028;//user.Rotor:28
    while (true) {
      //$LASTPOS=3000046;//user.Rotor:46
      _this.scaleX=1-(_this.floor(_this.d)%2)*2;
      //$LASTPOS=3000075;//user.Rotor:75
      _this.d+=_this.pow/100;
      //$LASTPOS=3000091;//user.Rotor:91
      _this.scaleY=0.5;
      //$LASTPOS=3000107;//user.Rotor:107
      if (_this.findTouch()) {
        //$LASTPOS=3000134;//user.Rotor:134
        if (_this.px!=null) {
          //$LASTPOS=3000163;//user.Rotor:163
          _this.pow+=_this.dist(_this.px-_this.found.x,_this.py-_this.found.y);
          
        }
        //$LASTPOS=3000215;//user.Rotor:215
        _this.px=_this.found.x;
        //$LASTPOS=3000235;//user.Rotor:235
        _this.py=_this.found.y;
        
      } else {
        //$LASTPOS=3000268;//user.Rotor:268
        _this.px=null;
        
      }
      //$LASTPOS=3000287;//user.Rotor:287
      _this.pow*=0.9;
      //$LASTPOS=3000301;//user.Rotor:301
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000000;//user.Rotor:0
    _this.p=Tonyu.globals.$pat_heli+1;
    //$LASTPOS=3000016;//user.Rotor:16
    _this.d=0;
    //$LASTPOS=3000021;//user.Rotor:21
    _this.pow=0;
    
    _thread.enter(function _trc_func_3000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=3000028;//user.Rotor:28
        case 1:
          //$LASTPOS=3000046;//user.Rotor:46
          _this.scaleX=1-(_this.floor(_this.d)%2)*2;
          //$LASTPOS=3000075;//user.Rotor:75
          _this.d+=_this.pow/100;
          //$LASTPOS=3000091;//user.Rotor:91
          _this.scaleY=0.5;
          //$LASTPOS=3000107;//user.Rotor:107
          if (_this.findTouch()) {
            //$LASTPOS=3000134;//user.Rotor:134
            if (_this.px!=null) {
              //$LASTPOS=3000163;//user.Rotor:163
              _this.pow+=_this.dist(_this.px-_this.found.x,_this.py-_this.found.y);
              
            }
            //$LASTPOS=3000215;//user.Rotor:215
            _this.px=_this.found.x;
            //$LASTPOS=3000235;//user.Rotor:235
            _this.py=_this.found.y;
            
          } else {
            //$LASTPOS=3000268;//user.Rotor:268
            _this.px=null;
            
          }
          //$LASTPOS=3000287;//user.Rotor:287
          _this.pow*=0.9;
          //$LASTPOS=3000301;//user.Rotor:301
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
  findTouch :function _trc_func_3000314_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000333;//user.Rotor:333
    _this.found=null;
    //$LASTPOS=3000349;//user.Rotor:349
    Tonyu.globals.$touches.forEach(function (to) {
      
      //$LASTPOS=3000382;//user.Rotor:382
      if (_this.t==0&&to.touched&&to.x<Tonyu.globals.$screenWidth/2) {
        //$LASTPOS=3000443;//user.Rotor:443
        _this.found=to;
        
      }
      //$LASTPOS=3000471;//user.Rotor:471
      if (_this.t==1&&to.touched&&to.x>Tonyu.globals.$screenWidth/2) {
        //$LASTPOS=3000532;//user.Rotor:532
        _this.found=to;
        
      }
    });
    return _this.found;
  },
  fiber$findTouch :function _trc_func_3000314_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=3000333;//user.Rotor:333
    _this.found=null;
    //$LASTPOS=3000349;//user.Rotor:349
    Tonyu.globals.$touches.forEach(function (to) {
      
      //$LASTPOS=3000382;//user.Rotor:382
      if (_this.t==0&&to.touched&&to.x<Tonyu.globals.$screenWidth/2) {
        //$LASTPOS=3000443;//user.Rotor:443
        _this.found=to;
        
      }
      //$LASTPOS=3000471;//user.Rotor:471
      if (_this.t==1&&to.touched&&to.x>Tonyu.globals.$screenWidth/2) {
        //$LASTPOS=3000532;//user.Rotor:532
        _this.found=to;
        
      }
    });
    _thread.retVal=_this.found;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.user.Rotor,{"fullName":"user.Rotor","namespace":"user","shortName":"Rotor","decls":{"methods":{"main":{"nowait":false},"findTouch":{"nowait":false}}}});

