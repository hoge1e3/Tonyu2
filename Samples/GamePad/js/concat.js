Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Main_main() {
        "use strict";
        var _this=this;
        
        Tonyu.globals.$Screen.resize(640,480);
        _this.i = 0;
        for (; _this.i<16 ; _this.i++) {
          Tonyu.checkLoop();
          {
            new Tonyu.classes.user.Player({playerNo: _this.i,x: (_this.i%4+1)/5*Tonyu.globals.$screenWidth,y: (_this.trunc(_this.i/4)+1)/5*Tonyu.globals.$screenHeight,p: Tonyu.globals.$pat_base+_this.i});
          }
        }
        _this.x=0;
        _this.y=0;
        _this.align="left";
        while (true) {
          Tonyu.checkLoop();
          if (Tonyu.globals.$GamePad.available) {
            _this.text="padsCount : "+Tonyu.globals.$GamePad.padsCount();
            
          } else {
            _this.text="このデバイス・ブラウザはGamepad APIに対応していません";
            
          }
          _this.update();
          
        }
      },
      fiber$main :function _trc_Main_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        Tonyu.globals.$Screen.resize(640,480);
        _this.i = 0;
        for (; _this.i<16 ; _this.i++) {
          Tonyu.checkLoop();
          {
            new Tonyu.classes.user.Player({playerNo: _this.i,x: (_this.i%4+1)/5*Tonyu.globals.$screenWidth,y: (_this.trunc(_this.i/4)+1)/5*Tonyu.globals.$screenHeight,p: Tonyu.globals.$pat_base+_this.i});
          }
        }
        _this.x=0;
        _this.y=0;
        _this.align="left";
        
        _thread.enter(function _trc_Main_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
            case 1:
              if (Tonyu.globals.$GamePad.available) {
                _this.text="padsCount : "+Tonyu.globals.$GamePad.padsCount();
                
              } else {
                _this.text="このデバイス・ブラウザはGamepad APIに対応していません";
                
              }
              _this.fiber$update(_thread);
              __pc=2;return;
            case 2:
              
              __pc=1;break;
            case 3     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"i":{}}}
});
Tonyu.klass.define({
  fullName: 'user.Player',
  shortName: 'Player',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Player_main() {
        "use strict";
        var _this=this;
        
        _this.alpha=0;
        _this.NEUTRAL_AXIS=0.15;
        _this.gamePad=Tonyu.globals.$GamePad.get(_this.playerNo);
        _this.analogMode=true;
        while (true) {
          Tonyu.checkLoop();
          _this.scaleX=1;
          _this.scaleY=1;
          _this.connected=_this.gamePad.isConnected();
          if (_this.connected) {
            if (_this.gamePad.getButton(0)) {
              _this.scaleX=1.5;
              _this.scaleY=1.5;
              
            }
            if (_this.gamePad.getButton(1)) {
              _this.alpha=127;
            }
            if (_this.gamePad.getButton(2)) {
              _this.analogMode=true;
            }
            if (_this.gamePad.getButton(3)) {
              _this.analogMode=false;
            }
            _this.rotation-=5*_this.gamePad.getButtonValue(6);
            _this.rotation+=5*_this.gamePad.getButtonValue(7);
            if (_this.analogMode) {
              _this.vx=_this.gamePad.getAxis(0);
              _this.vy=_this.gamePad.getAxis(1);
              if (_this.dist(_this.vx,_this.vy)>=_this.NEUTRAL_AXIS) {
                _this.ang = _this.atanxy(_this.vx,_this.vy);
                
                _this.maxvx = _this.cos(_this.ang);
                
                _this.maxvy = _this.sin(_this.ang);
                
                _this.vx=_this.clamp(_this.vx,- _this.maxvx,_this.maxvx);
                _this.vy=_this.clamp(_this.vy,- _this.maxvy,_this.maxvy);
                _this.x+=_this.vx*3;
                _this.y+=_this.vy*3;
                
              }
              
            } else {
              if (_this.gamePad.getLeft()||_this.gamePad.getButton(14)) {
                _this.x-=3;
              }
              if (_this.gamePad.getRight()||_this.gamePad.getButton(15)) {
                _this.x+=3;
              }
              if (_this.gamePad.getUp()||_this.gamePad.getButton(12)) {
                _this.y-=3;
              }
              if (_this.gamePad.getDown()||_this.gamePad.getButton(13)) {
                _this.y+=3;
              }
              
            }
            _this.x=_this.clamp(_this.x,16,Tonyu.globals.$screenWidth-16);
            _this.y=_this.clamp(_this.y,16,Tonyu.globals.$screenHeight-16);
            _this.alpha+=5;
            
          } else {
            _this.alpha-=1/2;
            
          }
          _this.alpha=_this.clamp(_this.alpha,50,255);
          _this.drawStatus();
          _this.update();
          
        }
      },
      fiber$main :function _trc_Player_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.alpha=0;
        _this.NEUTRAL_AXIS=0.15;
        _this.gamePad=Tonyu.globals.$GamePad.get(_this.playerNo);
        _this.analogMode=true;
        
        _thread.enter(function _trc_Player_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
            case 1:
              _this.scaleX=1;
              _this.scaleY=1;
              _this.connected=_this.gamePad.isConnected();
              if (_this.connected) {
                if (_this.gamePad.getButton(0)) {
                  _this.scaleX=1.5;
                  _this.scaleY=1.5;
                  
                }
                if (_this.gamePad.getButton(1)) {
                  _this.alpha=127;
                }
                if (_this.gamePad.getButton(2)) {
                  _this.analogMode=true;
                }
                if (_this.gamePad.getButton(3)) {
                  _this.analogMode=false;
                }
                _this.rotation-=5*_this.gamePad.getButtonValue(6);
                _this.rotation+=5*_this.gamePad.getButtonValue(7);
                if (_this.analogMode) {
                  _this.vx=_this.gamePad.getAxis(0);
                  _this.vy=_this.gamePad.getAxis(1);
                  if (_this.dist(_this.vx,_this.vy)>=_this.NEUTRAL_AXIS) {
                    _this.ang = _this.atanxy(_this.vx,_this.vy);
                    
                    _this.maxvx = _this.cos(_this.ang);
                    
                    _this.maxvy = _this.sin(_this.ang);
                    
                    _this.vx=_this.clamp(_this.vx,- _this.maxvx,_this.maxvx);
                    _this.vy=_this.clamp(_this.vy,- _this.maxvy,_this.maxvy);
                    _this.x+=_this.vx*3;
                    _this.y+=_this.vy*3;
                    
                  }
                  
                } else {
                  if (_this.gamePad.getLeft()||_this.gamePad.getButton(14)) {
                    _this.x-=3;
                  }
                  if (_this.gamePad.getRight()||_this.gamePad.getButton(15)) {
                    _this.x+=3;
                  }
                  if (_this.gamePad.getUp()||_this.gamePad.getButton(12)) {
                    _this.y-=3;
                  }
                  if (_this.gamePad.getDown()||_this.gamePad.getButton(13)) {
                    _this.y+=3;
                  }
                  
                }
                _this.x=_this.clamp(_this.x,16,Tonyu.globals.$screenWidth-16);
                _this.y=_this.clamp(_this.y,16,Tonyu.globals.$screenHeight-16);
                _this.alpha+=5;
                
              } else {
                _this.alpha-=1/2;
                
              }
              _this.alpha=_this.clamp(_this.alpha,50,255);
              _this.fiber$drawStatus(_thread);
              __pc=2;return;
            case 2:
              
              _this.fiber$update(_thread);
              __pc=3;return;
            case 3:
              
              __pc=1;break;
            case 4     :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      drawStatus :function _trc_Player_drawStatus() {
        "use strict";
        var _this=this;
        var tx;
        var ty;
        var tSize;
        var tColor;
        var textA;
        var i;
        var b;
        var v;
        var a;
        
        if (_this.alpha<=50) {
          return _this;
        }
        tx = _this.x-30;
        
        ty = _this.y-40;
        
        tSize = 12;
        
        tColor = "white";
        
        textA = _this.analogMode?"(アナログ移動)":"(デジタル移動)";
        
        _this.drawText(tx,ty,(_this.playerNo+1)+"P "+textA,tColor,tSize);
        ty+=60;
        _this.drawText(tx,ty,"id :"+_this.gamePad.getPadId(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"mapping :"+_this.gamePad.getMapping(),tColor,tSize);
        ty+=tSize;
        _this.buttonCnt=_this.gamePad.getButtonCount();
        i = 0;
        for (; i<_this.buttonCnt ; i++) {
          Tonyu.checkLoop();
          {
            b = _this.gamePad.getButton(i);
            
            v = _this.gamePad.getButtonValue(i);
            
            _this.drawText(tx,ty,"b["+i+"]:"+b+" v:"+v,tColor,tSize);
            ty+=tSize;
          }
        }
        _this.axisCnt=_this.gamePad.getAxisCount();
        i = 0;
        for (; i<_this.axisCnt ; i++) {
          Tonyu.checkLoop();
          {
            a = _this.gamePad.getAxis(i);
            
            _this.drawText(tx,ty,"a["+i+"]:"+a,tColor,tSize);
            ty+=tSize;
          }
        }
        _this.drawText(tx,ty,"left :"+_this.gamePad.getLeft(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"right:"+_this.gamePad.getRight(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"up   :"+_this.gamePad.getUp(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"down :"+_this.gamePad.getDown(),tColor,tSize);
      },
      fiber$drawStatus :function _trc_Player_f_drawStatus(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var tx;
        var ty;
        var tSize;
        var tColor;
        var textA;
        var i;
        var b;
        var v;
        var a;
        
        if (_this.alpha<=50) {
          _thread.retVal=_this;return;
          
        }
        tx = _this.x-30;
        
        ty = _this.y-40;
        
        tSize = 12;
        
        tColor = "white";
        
        textA = _this.analogMode?"(アナログ移動)":"(デジタル移動)";
        
        _this.drawText(tx,ty,(_this.playerNo+1)+"P "+textA,tColor,tSize);
        ty+=60;
        _this.drawText(tx,ty,"id :"+_this.gamePad.getPadId(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"mapping :"+_this.gamePad.getMapping(),tColor,tSize);
        ty+=tSize;
        _this.buttonCnt=_this.gamePad.getButtonCount();
        i = 0;
        for (; i<_this.buttonCnt ; i++) {
          Tonyu.checkLoop();
          {
            b = _this.gamePad.getButton(i);
            
            v = _this.gamePad.getButtonValue(i);
            
            _this.drawText(tx,ty,"b["+i+"]:"+b+" v:"+v,tColor,tSize);
            ty+=tSize;
          }
        }
        _this.axisCnt=_this.gamePad.getAxisCount();
        i = 0;
        for (; i<_this.axisCnt ; i++) {
          Tonyu.checkLoop();
          {
            a = _this.gamePad.getAxis(i);
            
            _this.drawText(tx,ty,"a["+i+"]:"+a,tColor,tSize);
            ty+=tSize;
          }
        }
        _this.drawText(tx,ty,"left :"+_this.gamePad.getLeft(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"right:"+_this.gamePad.getRight(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"up   :"+_this.gamePad.getUp(),tColor,tSize);
        ty+=tSize;
        _this.drawText(tx,ty,"down :"+_this.gamePad.getDown(),tColor,tSize);
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"drawStatus":{"nowait":false}},"fields":{"ang":{},"maxvx":{},"maxvy":{},"NEUTRAL_AXIS":{},"gamePad":{},"playerNo":{},"analogMode":{},"connected":{},"vx":{},"vy":{},"buttonCnt":{},"axisCnt":{}}}
});

//# sourceMappingURL=concat.js.map