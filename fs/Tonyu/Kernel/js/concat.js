Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventMod=Tonyu.klass([],{
  main :function _trc_func_1000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_1000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getEventHandlers :function _trc_func_1000017_2(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000048;
    if (! _this._handlers) {
      //$LASTPOS=1000064;
      _this._handlers={};
    }
    //$LASTPOS=1000083;
    if (! _this._handlers[type]) {
      //$LASTPOS=1000105;
      _this._handlers[type]=[];
    }
    return _this._handlers[type];
  },
  fiber$getEventHandlers :function _trc_func_1000017_3(_thread,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000048;
    if (! _this._handlers) {
      //$LASTPOS=1000064;
      _this._handlers={};
    }
    //$LASTPOS=1000083;
    if (! _this._handlers[type]) {
      //$LASTPOS=1000105;
      _this._handlers[type]=[];
    }
    _thread.retVal=_this._handlers[type];return;
    
    
    _thread.retVal=_this;return;
  },
  on :function _trc_func_1000158_4(type,handler) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000184;
    _this.getEventHandlers(type).push(handler);
  },
  fiber$on :function _trc_func_1000158_5(_thread,type,handler) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000184;
    _this.getEventHandlers(type).push(handler);
    
    _thread.retVal=_this;return;
  },
  fireEvent :function _trc_func_1000228_6(type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    var _it_1;
    
    //$LASTPOS=1000257;
    if (! args) {
      //$LASTPOS=1000268;
      args=[];
    }
    //$LASTPOS=1000282;
    _it_1=Tonyu.iterator(_this.getEventHandlers(type),1);
    while(_it_1.next()) {
      h=_it_1[0];
      
      //$LASTPOS=1000331;
      h.apply(_this,args);
      
    }
  },
  fiber$fireEvent :function _trc_func_1000228_7(_thread,type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var h;
    var _it_1;
    
    //$LASTPOS=1000257;
    if (! args) {
      //$LASTPOS=1000268;
      args=[];
    }
    //$LASTPOS=1000282;
    _it_1=Tonyu.iterator(_this.getEventHandlers(type),1);
    while(_it_1.next()) {
      h=_it_1[0];
      
      //$LASTPOS=1000331;
      h.apply(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"getEventHandlers":{"nowait":false},"on":{"nowait":false},"fireEvent":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.InputDevice=Tonyu.klass([],{
  main :function _trc_func_2000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_2000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_2000057_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000071;
    _this.listeners=[];
    //$LASTPOS=2000090;
    _this.touchEmu=true;
  },
  handleListeners :function _trc_func_2000109_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var l;
    
    //$LASTPOS=2000135;
    l = _this.listeners;
    //$LASTPOS=2000157;
    _this.listeners=[];
    //$LASTPOS=2000176;
    while (l.length>0) {
      //$LASTPOS=2000197;
      (l.shift())();
      
    }
  },
  fiber$handleListeners :function _trc_func_2000109_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var l;
    
    //$LASTPOS=2000135;
    l = _this.listeners;
    //$LASTPOS=2000157;
    _this.listeners=[];
    //$LASTPOS=2000176;
    while (l.length>0) {
      //$LASTPOS=2000197;
      (l.shift())();
      
    }
    
    _thread.retVal=_this;return;
  },
  addOnetimeListener :function _trc_func_2000218_5(l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000247;
    _this.listeners.push(l);
  },
  fiber$addOnetimeListener :function _trc_func_2000218_6(_thread,l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000247;
    _this.listeners.push(l);
    
    _thread.retVal=_this;return;
  },
  initCanvasEvents :function _trc_func_2000270_7(cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=2000300;
    cv = cvj[0];
    //$LASTPOS=2000320;
    Tonyu.globals.$handleMouse=function (e) {
      var p;
      var mp;
      
      //$LASTPOS=2000349;
      p = cvj.offset();
      //$LASTPOS=2000378;
      mp = {x: e.clientX-p.left,y: e.clientY-p.top};
      //$LASTPOS=2000435;
      mp=Tonyu.globals.$Screen.canvas2buf(mp);
      //$LASTPOS=2000471;
      Tonyu.globals.$mouseX=mp.x;
      //$LASTPOS=2000494;
      Tonyu.globals.$mouseY=mp.y;
      //$LASTPOS=2000517;
      if (_this.touchEmu) {
        //$LASTPOS=2000546;
        Tonyu.globals.$touches[0].x=mp.x;
        //$LASTPOS=2000579;
        Tonyu.globals.$touches[0].y=mp.y;
        
      }
      //$LASTPOS=2000619;
      _this.handleListeners();
    };
    //$LASTPOS=2000651;
    Tonyu.globals.$touches=[{},{},{},{},{}];
    //$LASTPOS=2000683;
    Tonyu.globals.$touches.findById=function (id) {
      var j;
      
      //$LASTPOS=2000718;
      //$LASTPOS=2000723;
      j = 0;
      while(j<Tonyu.globals.$touches.length) {
        {
          //$LASTPOS=2000773;
          if (Tonyu.globals.$touches[j].identifier==id) {
            return Tonyu.globals.$touches[j];
            
          }
        }
        j++;
      }
    };
    //$LASTPOS=2000883;
    Tonyu.globals.$handleTouch=function (e) {
      var p;
      var ts;
      var i;
      var src;
      var dst;
      var j;
      
      //$LASTPOS=2000912;
      _this.touchEmu=false;
      //$LASTPOS=2000937;
      p = cvj.offset();
      //$LASTPOS=2000966;
      e.preventDefault();
      //$LASTPOS=2000995;
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=2001043;
      //$LASTPOS=2001048;
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=2001093;
          src = ts[i];
          //$LASTPOS=2001121;
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=2001177;
          if (! dst) {
            //$LASTPOS=2001206;
            //$LASTPOS=2001211;
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=2001269;
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=2001322;
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=2001364;
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
              j++;
            }
            
          }
          //$LASTPOS=2001497;
          if (dst) {
            //$LASTPOS=2001525;
            _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
            //$LASTPOS=2001586;
            _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
            //$LASTPOS=2001630;
            dst.x=_this.mp.x;
            //$LASTPOS=2001659;
            dst.y=_this.mp.y;
            //$LASTPOS=2001688;
            if (! dst.touched) {
              //$LASTPOS=2001705;
              dst.touched=1;
            }
            
          }
        }
        i++;
      }
      //$LASTPOS=2001755;
      Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
      //$LASTPOS=2001787;
      Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
      //$LASTPOS=2001819;
      _this.handleListeners();
    };
    //$LASTPOS=2001851;
    Tonyu.globals.$handleTouchEnd=function (e) {
      var ts;
      var i;
      var src;
      var dst;
      
      //$LASTPOS=2001883;
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=2001931;
      //$LASTPOS=2001936;
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=2001981;
          src = ts[i];
          //$LASTPOS=2002009;
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=2002065;
          if (dst) {
            //$LASTPOS=2002093;
            dst.touched=0;
            //$LASTPOS=2002125;
            dst.identifier=- 1;
            
          }
        }
        i++;
      }
      //$LASTPOS=2002179;
      _this.handleListeners();
    };
    //$LASTPOS=2002211;
    handleMouse = function (e) {
      
      //$LASTPOS=2002232;
      Tonyu.globals.$handleMouse(e);
    };
    //$LASTPOS=2002256;
    handleTouch = function (e) {
      
      //$LASTPOS=2002277;
      Tonyu.globals.$handleTouch(e);
    };
    //$LASTPOS=2002301;
    handleTouchEnd = function (e) {
      
      //$LASTPOS=2002325;
      Tonyu.globals.$handleTouchEnd(e);
    };
    //$LASTPOS=2002352;
    d = $.data(cv,"events");
    //$LASTPOS=2002384;
    if (! d) {
      //$LASTPOS=2002403;
      $.data(cv,"events","true");
      //$LASTPOS=2002440;
      cvj.mousedown(handleMouse);
      //$LASTPOS=2002477;
      cvj.mousemove(handleMouse);
      //$LASTPOS=2002514;
      cvj.on("touchstart",handleTouch);
      //$LASTPOS=2002557;
      cvj.on("touchmove",handleTouch);
      //$LASTPOS=2002599;
      cvj.on("touchend",handleTouchEnd);
      
    }
  },
  fiber$initCanvasEvents :function _trc_func_2000270_8(_thread,cvj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var cv;
    var handleMouse;
    var handleTouch;
    var handleTouchEnd;
    var d;
    
    //$LASTPOS=2000300;
    cv = cvj[0];
    
    _thread.enter(function _trc_func_2000270_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000320;
          Tonyu.globals.$handleMouse=function (e) {
            var p;
            var mp;
            
            //$LASTPOS=2000349;
            p = cvj.offset();
            //$LASTPOS=2000378;
            mp = {x: e.clientX-p.left,y: e.clientY-p.top};
            //$LASTPOS=2000435;
            mp=Tonyu.globals.$Screen.canvas2buf(mp);
            //$LASTPOS=2000471;
            Tonyu.globals.$mouseX=mp.x;
            //$LASTPOS=2000494;
            Tonyu.globals.$mouseY=mp.y;
            //$LASTPOS=2000517;
            if (_this.touchEmu) {
              //$LASTPOS=2000546;
              Tonyu.globals.$touches[0].x=mp.x;
              //$LASTPOS=2000579;
              Tonyu.globals.$touches[0].y=mp.y;
              
            }
            //$LASTPOS=2000619;
            _this.handleListeners();
          };
          //$LASTPOS=2000651;
          Tonyu.globals.$touches=[{},{},{},{},{}];
          //$LASTPOS=2000683;
          Tonyu.globals.$touches.findById=function (id) {
            var j;
            
            //$LASTPOS=2000718;
            //$LASTPOS=2000723;
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=2000773;
                if (Tonyu.globals.$touches[j].identifier==id) {
                  return Tonyu.globals.$touches[j];
                  
                }
              }
              j++;
            }
          };
          //$LASTPOS=2000883;
          Tonyu.globals.$handleTouch=function (e) {
            var p;
            var ts;
            var i;
            var src;
            var dst;
            var j;
            
            //$LASTPOS=2000912;
            _this.touchEmu=false;
            //$LASTPOS=2000937;
            p = cvj.offset();
            //$LASTPOS=2000966;
            e.preventDefault();
            //$LASTPOS=2000995;
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=2001043;
            //$LASTPOS=2001048;
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=2001093;
                src = ts[i];
                //$LASTPOS=2001121;
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=2001177;
                if (! dst) {
                  //$LASTPOS=2001206;
                  //$LASTPOS=2001211;
                  j = 0;
                  while(j<Tonyu.globals.$touches.length) {
                    {
                      //$LASTPOS=2001269;
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=2001322;
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=2001364;
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                    j++;
                  }
                  
                }
                //$LASTPOS=2001497;
                if (dst) {
                  //$LASTPOS=2001525;
                  _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                  //$LASTPOS=2001586;
                  _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                  //$LASTPOS=2001630;
                  dst.x=_this.mp.x;
                  //$LASTPOS=2001659;
                  dst.y=_this.mp.y;
                  //$LASTPOS=2001688;
                  if (! dst.touched) {
                    //$LASTPOS=2001705;
                    dst.touched=1;
                  }
                  
                }
              }
              i++;
            }
            //$LASTPOS=2001755;
            Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
            //$LASTPOS=2001787;
            Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
            //$LASTPOS=2001819;
            _this.handleListeners();
          };
          //$LASTPOS=2001851;
          Tonyu.globals.$handleTouchEnd=function (e) {
            var ts;
            var i;
            var src;
            var dst;
            
            //$LASTPOS=2001883;
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=2001931;
            //$LASTPOS=2001936;
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=2001981;
                src = ts[i];
                //$LASTPOS=2002009;
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=2002065;
                if (dst) {
                  //$LASTPOS=2002093;
                  dst.touched=0;
                  //$LASTPOS=2002125;
                  dst.identifier=- 1;
                  
                }
              }
              i++;
            }
            //$LASTPOS=2002179;
            _this.handleListeners();
          };
          //$LASTPOS=2002211;
          handleMouse = function (e) {
            
            //$LASTPOS=2002232;
            Tonyu.globals.$handleMouse(e);
          };
          //$LASTPOS=2002256;
          handleTouch = function (e) {
            
            //$LASTPOS=2002277;
            Tonyu.globals.$handleTouch(e);
          };
          //$LASTPOS=2002301;
          handleTouchEnd = function (e) {
            
            //$LASTPOS=2002325;
            Tonyu.globals.$handleTouchEnd(e);
          };
          //$LASTPOS=2002352;
          d = $.data(cv,"events");
          //$LASTPOS=2002384;
          if (! d) {
            //$LASTPOS=2002403;
            $.data(cv,"events","true");
            //$LASTPOS=2002440;
            cvj.mousedown(handleMouse);
            //$LASTPOS=2002477;
            cvj.mousemove(handleMouse);
            //$LASTPOS=2002514;
            cvj.on("touchstart",handleTouch);
            //$LASTPOS=2002557;
            cvj.on("touchmove",handleTouch);
            //$LASTPOS=2002599;
            cvj.on("touchend",handleTouchEnd);
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  update :function _trc_func_2002647_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_30;
    
    //$LASTPOS=2002664;
    _it_30=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_30.next()) {
      i=_it_30[0];
      
      //$LASTPOS=2002699;
      if (i.touched>0) {
        //$LASTPOS=2002717;
        i.touched++;
        
      }
      //$LASTPOS=2002740;
      if (i.touched==- 1) {
        //$LASTPOS=2002759;
        i.touched=1;
      }
      
    }
  },
  fiber$update :function _trc_func_2002647_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_30;
    
    //$LASTPOS=2002664;
    _it_30=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_30.next()) {
      i=_it_30[0];
      
      //$LASTPOS=2002699;
      if (i.touched>0) {
        //$LASTPOS=2002717;
        i.touched++;
        
      }
      //$LASTPOS=2002740;
      if (i.touched==- 1) {
        //$LASTPOS=2002759;
        i.touched=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.InputDevice,{"fullName":"kernel.InputDevice","namespace":"kernel","shortName":"InputDevice","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"handleListeners":{"nowait":false},"addOnetimeListener":{"nowait":false},"initCanvasEvents":{"nowait":false},"update":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MathMod=Tonyu.klass([],{
  main :function _trc_func_3000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_3000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sin :function _trc_func_3000031_2(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.sin(_this.rad(d));
  },
  cos :function _trc_func_3000082_3(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.cos(_this.rad(d));
  },
  rad :function _trc_func_3000133_4(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return d/180*Math.PI;
  },
  deg :function _trc_func_3000181_5(d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return d/Math.PI*180;
  },
  abs :function _trc_func_3000231_6(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.abs(v);
  },
  atan2 :function _trc_func_3000277_7(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.deg(Math.atan2(x,y));
  },
  floor :function _trc_func_3000336_8(x) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.floor(x);
  },
  angleDiff :function _trc_func_3000386_9(a,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var c;
    
    //$LASTPOS=3000416;
    c;
    //$LASTPOS=3000428;
    a=_this.floor(a);
    //$LASTPOS=3000445;
    b=_this.floor(b);
    //$LASTPOS=3000462;
    if (a>=b) {
      //$LASTPOS=3000483;
      c=(a-b)%360;
      //$LASTPOS=3000507;
      if (c>=180) {
        //$LASTPOS=3000519;
        c-=360;
      }
      
    } else {
      //$LASTPOS=3000550;
      c=- ((b-a)%360);
      //$LASTPOS=3000577;
      if (c<- 180) {
        //$LASTPOS=3000589;
        c+=360;
      }
      
    }
    return c;
  },
  sqrt :function _trc_func_3000623_10(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.sqrt(t);
  },
  dist :function _trc_func_3000671_11(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t;
    
    //$LASTPOS=3000698;
    if (typeof  dx=="object") {
      //$LASTPOS=3000734;
      t = dx;
      //$LASTPOS=3000753;
      dx=t.x-_this.x;
      //$LASTPOS=3000762;
      dy=t.y-_this.y;
      
    }
    return _this.sqrt(dx*dx+dy*dy);
  },
  trunc :function _trc_func_3000814_12(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000838;
    if (f>=0) {
      return Math.floor(f);
    } else {
      return Math.ceil(f);
    }
  },
  ceil :function _trc_func_3000904_13(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.ceil(f);
  },
  rnd :function _trc_func_3000953_14(r) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000975;
    if (typeof  r=="number") {
      return Math.floor(Math.random()*r);
      
    }
    return Math.random();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MathMod,{"fullName":"kernel.MathMod","namespace":"kernel","shortName":"MathMod","decls":{"methods":{"main":{"nowait":false},"sin":{"nowait":true},"cos":{"nowait":true},"rad":{"nowait":true},"deg":{"nowait":true},"abs":{"nowait":true},"atan2":{"nowait":true},"floor":{"nowait":true},"angleDiff":{"nowait":true},"sqrt":{"nowait":true},"dist":{"nowait":true},"trunc":{"nowait":true},"ceil":{"nowait":true},"rnd":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MediaPlayer=Tonyu.klass([],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_4000002_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$play :function _trc_func_4000002_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_4000022_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_4000022_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  playSE :function _trc_func_4000042_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$playSE :function _trc_func_4000042_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setDelay :function _trc_func_4000064_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setDelay :function _trc_func_4000064_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setVolume :function _trc_func_4000087_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setVolume :function _trc_func_4000087_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":false},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ParallelMod=Tonyu.klass([],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  parallel :function _trc_func_5000015_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var args;
    var i;
    var name;
    var thg;
    var th;
    
    //$LASTPOS=5000042;
    args = [];
    //$LASTPOS=5000061;
    //$LASTPOS=5000066;
    i = 1;
    while(i<arguments.length) {
      {
        //$LASTPOS=5000112;
        args.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=5000151;
    name = arguments[0];
    //$LASTPOS=5000190;
    thg = Tonyu.globals.$currentThreadGroup;
    //$LASTPOS=5000225;
    th;
    //$LASTPOS=5000239;
    if (thg) {
      //$LASTPOS=5000248;
      th=thg.addObj(_this,name,args);
    }
    //$LASTPOS=5000287;
    _this.on("die",function () {
      
      //$LASTPOS=5000299;
      th.kill();
    });
    return th;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Mod=Tonyu.klass([],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  bvec :function _trc_func_6000015_2(tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    
    //$LASTPOS=6000034;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_func_6000015_3(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=6000034;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextRectMod=Tonyu.klass([],{
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  drawTextRect :function _trc_func_7000017_2(ctx,text,x,topY,h,align,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var met;
    var res;
    var t;
    
    //$LASTPOS=7000090;
    if (! align) {
      //$LASTPOS=7000102;
      align="center";
    }
    //$LASTPOS=7000123;
    ctx.textBaseline="top";
    //$LASTPOS=7000152;
    _this.setFontSize(ctx,h);
    //$LASTPOS=7000178;
    met = ctx.measureText(text);
    //$LASTPOS=7000214;
    res = {y: topY,w: met.width,h: h};
    //$LASTPOS=7000256;
    t = align.substring(0,1).toLowerCase();
    //$LASTPOS=7000303;
    if (t=="l") {
      //$LASTPOS=7000315;
      res.x=x;
    } else {
      //$LASTPOS=7000334;
      if (t=="r") {
        //$LASTPOS=7000346;
        res.x=x-met.width;
      } else {
        //$LASTPOS=7000375;
        if (t=="c") {
          //$LASTPOS=7000387;
          res.x=x-met.width/2;
        }
      }
    }
    //$LASTPOS=7000413;
    if (type=="fill") {
      //$LASTPOS=7000431;
      ctx.fillText(text,res.x,topY);
    }
    //$LASTPOS=7000468;
    if (type=="stroke") {
      //$LASTPOS=7000488;
      ctx.strokeText(text,res.x,topY);
    }
    return res;
  },
  setFontSize :function _trc_func_7000543_3(ctx,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var post;
    
    //$LASTPOS=7000586;
    post = ctx.font.replace(/^[0-9\.]+/,"");
    //$LASTPOS=7000634;
    ctx.font=sz+post;
  },
  fukidashi :function _trc_func_7000658_4(ctx,text,x,y,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var align;
    var theight;
    var margin;
    var r;
    var fs;
    
    //$LASTPOS=7000712;
    align = "c";
    //$LASTPOS=7000732;
    theight = 20;
    //$LASTPOS=7000753;
    margin = 5;
    //$LASTPOS=7000772;
    r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
    //$LASTPOS=7000842;
    ctx.beginPath();
    //$LASTPOS=7000864;
    ctx.moveTo(x,y);
    //$LASTPOS=7000888;
    ctx.lineTo(x+margin,y-theight);
    //$LASTPOS=7000927;
    ctx.lineTo(x+r.w/2+margin,y-theight);
    //$LASTPOS=7000972;
    ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
    //$LASTPOS=7001030;
    ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
    //$LASTPOS=7001088;
    ctx.lineTo(x-r.w/2-margin,y-theight);
    //$LASTPOS=7001133;
    ctx.lineTo(x-margin,y-theight);
    //$LASTPOS=7001172;
    ctx.closePath();
    //$LASTPOS=7001194;
    ctx.fill();
    //$LASTPOS=7001211;
    ctx.stroke();
    //$LASTPOS=7001236;
    fs = ctx.fillStyle;
    //$LASTPOS=7001263;
    ctx.fillStyle=ctx.strokeStyle;
    //$LASTPOS=7001299;
    _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
    //$LASTPOS=7001372;
    ctx.fillStyle=fs;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TObject=Tonyu.klass([],{
  main :function _trc_func_8000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_8000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_8000030_2(options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000052;
    if (typeof  options=="object") {
      //$LASTPOS=8000082;
      _this.extend(options);
    }
    //$LASTPOS=8000104;
    _this.main();
  },
  extend :function _trc_func_8000121_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_9000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_9000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_9000035_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000049;
    _this.length=0;
  },
  tonyuIterator :function _trc_func_9000061_3(arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=9000089;
    res = {};
    //$LASTPOS=9000105;
    res.i=0;
    //$LASTPOS=9000118;
    if (arity==1) {
      //$LASTPOS=9000142;
      res.next=function () {
        
        //$LASTPOS=9000177;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000227;
        res[0]=_this[res.i];
        //$LASTPOS=9000259;
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=9000325;
      res.next=function () {
        
        //$LASTPOS=9000360;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000410;
        res[0]=res.i;
        //$LASTPOS=9000436;
        res[1]=_this[res.i];
        //$LASTPOS=9000468;
        res.i++;
        return true;
      };
      
    }
    return res;
  },
  fiber$tonyuIterator :function _trc_func_9000061_4(_thread,arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=9000089;
    res = {};
    //$LASTPOS=9000105;
    res.i=0;
    //$LASTPOS=9000118;
    if (arity==1) {
      //$LASTPOS=9000142;
      res.next=function () {
        
        //$LASTPOS=9000177;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000227;
        res[0]=_this[res.i];
        //$LASTPOS=9000259;
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=9000325;
      res.next=function () {
        
        //$LASTPOS=9000360;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000410;
        res[0]=res.i;
        //$LASTPOS=9000436;
        res[1]=_this[res.i];
        //$LASTPOS=9000468;
        res.i++;
        return true;
      };
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  attr :function _trc_func_9000537_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var values;
    var i;
    var e;
    var _it_51;
    
    //$LASTPOS=9000551;
    values;
    //$LASTPOS=9000567;
    if (_this.length==0) {
      return _this;
    }
    //$LASTPOS=9000594;
    if (arguments.length==1&&typeof  arguments[0]=="string") {
      return _this[0][arguments[0]];
      
    }
    //$LASTPOS=9000702;
    if (arguments.length>=2) {
      //$LASTPOS=9000737;
      values={};
      //$LASTPOS=9000756;
      //$LASTPOS=9000761;
      i = 0;
      while(i<arguments.length-1) {
        {
          //$LASTPOS=9000813;
          values[arguments[i]]=arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=9000881;
      values=arguments[0];
      
    }
    //$LASTPOS=9000912;
    if (values) {
      //$LASTPOS=9000934;
      _it_51=Tonyu.iterator(_this,1);
      while(_it_51.next()) {
        e=_it_51[0];
        
        //$LASTPOS=9000968;
        e.extend(values);
        
      }
      
    }
  },
  fiber$attr :function _trc_func_9000537_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var values;
    var i;
    var e;
    var _it_51;
    
    //$LASTPOS=9000551;
    values;
    //$LASTPOS=9000567;
    if (_this.length==0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=9000594;
    if (_arguments.length==1&&typeof  _arguments[0]=="string") {
      _thread.retVal=_this[0][_arguments[0]];return;
      
      
    }
    //$LASTPOS=9000702;
    if (_arguments.length>=2) {
      //$LASTPOS=9000737;
      values={};
      //$LASTPOS=9000756;
      //$LASTPOS=9000761;
      i = 0;
      while(i<_arguments.length-1) {
        {
          //$LASTPOS=9000813;
          values[_arguments[i]]=_arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=9000881;
      values=_arguments[0];
      
    }
    //$LASTPOS=9000912;
    if (values) {
      //$LASTPOS=9000934;
      _it_51=Tonyu.iterator(_this,1);
      while(_it_51.next()) {
        e=_it_51[0];
        
        //$LASTPOS=9000968;
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_func_9001005_7(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001028;
    if (typeof  key!="function") {
      return function (o) {
        
        return o[key];
      };
      
    } else {
      return key;
      
    }
  },
  fiber$genKeyfunc :function _trc_func_9001005_8(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9001028;
    if (typeof  key!="function") {
      _thread.retVal=function (o) {
        
        return o[key];
      };return;
      
      
    } else {
      _thread.retVal=key;return;
      
      
    }
    
    _thread.retVal=_this;return;
  },
  maxs :function _trc_func_9001137_9(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_57;
    var v;
    
    //$LASTPOS=9001154;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001181;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001210;
    _it_57=Tonyu.iterator(_this,1);
    while(_it_57.next()) {
      o=_it_57[0];
      
      //$LASTPOS=9001240;
      v = f(o);
      //$LASTPOS=9001260;
      if (res==null||v>=res) {
        //$LASTPOS=9001299;
        if (v>res) {
          //$LASTPOS=9001310;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001339;
        reso.push(o);
        //$LASTPOS=9001365;
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$maxs :function _trc_func_9001137_10(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_57;
    var v;
    
    //$LASTPOS=9001154;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001181;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001210;
    _it_57=Tonyu.iterator(_this,1);
    while(_it_57.next()) {
      o=_it_57[0];
      
      //$LASTPOS=9001240;
      v = f(o);
      //$LASTPOS=9001260;
      if (res==null||v>=res) {
        //$LASTPOS=9001299;
        if (v>res) {
          //$LASTPOS=9001310;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001339;
        reso.push(o);
        //$LASTPOS=9001365;
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  mins :function _trc_func_9001407_11(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_64;
    var v;
    
    //$LASTPOS=9001424;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001451;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001480;
    _it_64=Tonyu.iterator(_this,1);
    while(_it_64.next()) {
      o=_it_64[0];
      
      //$LASTPOS=9001510;
      v = f(o);
      //$LASTPOS=9001530;
      if (res==null||v<=res) {
        //$LASTPOS=9001569;
        if (v<res) {
          //$LASTPOS=9001580;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001609;
        reso.push(o);
        //$LASTPOS=9001635;
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$mins :function _trc_func_9001407_12(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_64;
    var v;
    
    //$LASTPOS=9001424;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001451;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001480;
    _it_64=Tonyu.iterator(_this,1);
    while(_it_64.next()) {
      o=_it_64[0];
      
      //$LASTPOS=9001510;
      v = f(o);
      //$LASTPOS=9001530;
      if (res==null||v<=res) {
        //$LASTPOS=9001569;
        if (v<res) {
          //$LASTPOS=9001580;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001609;
        reso.push(o);
        //$LASTPOS=9001635;
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  minObj :function _trc_func_9001677_13(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mins(key)[0];
  },
  fiber$minObj :function _trc_func_9001677_14(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mins(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  maxObj :function _trc_func_9001719_15(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.maxs(key)[0];
  },
  fiber$maxObj :function _trc_func_9001719_16(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.maxs(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  nearests :function _trc_func_9001761_17(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001782;
    if (typeof  x=="object") {
      //$LASTPOS=9001807;
      y=x.y;
      //$LASTPOS=9001813;
      x=x.x;
      
    }
    return _this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });
  },
  fiber$nearests :function _trc_func_9001761_18(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9001782;
    if (typeof  x=="object") {
      //$LASTPOS=9001807;
      y=x.y;
      //$LASTPOS=9001813;
      x=x.x;
      
    }
    _thread.retVal=_this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });return;
    
    
    _thread.retVal=_this;return;
  },
  nearest :function _trc_func_9001887_19(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.nearests(x,y)[0];
  },
  fiber$nearest :function _trc_func_9001887_20(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.nearests(x,y)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  withins :function _trc_func_9001934_21(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var x;
    var y;
    
    //$LASTPOS=9001958;
    x;y;
    //$LASTPOS=9001971;
    if (typeof  xo=="object") {
      //$LASTPOS=9002006;
      x=xo.x;
      //$LASTPOS=9002013;
      y=xo.y;
      //$LASTPOS=9002020;
      d=yd;
      
    } else {
      //$LASTPOS=9002047;
      x=xo;
      //$LASTPOS=9002052;
      y=yd;
      
    }
    return _this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });
  },
  fiber$withins :function _trc_func_9001934_22(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var x;
    var y;
    
    //$LASTPOS=9001958;
    x;y;
    //$LASTPOS=9001971;
    if (typeof  xo=="object") {
      //$LASTPOS=9002006;
      x=xo.x;
      //$LASTPOS=9002013;
      y=xo.y;
      //$LASTPOS=9002020;
      d=yd;
      
    } else {
      //$LASTPOS=9002047;
      x=xo;
      //$LASTPOS=9002052;
      y=yd;
      
    }
    _thread.retVal=_this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  within :function _trc_func_9002133_23(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.withins(xo,yd,d).nearest();
  },
  fiber$within :function _trc_func_9002133_24(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.withins(xo,yd,d).nearest();return;
    
    
    _thread.retVal=_this;return;
  },
  max :function _trc_func_9002194_25(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_75;
    var v;
    
    //$LASTPOS=9002210;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002237;
    res;
    //$LASTPOS=9002250;
    _it_75=Tonyu.iterator(_this,1);
    while(_it_75.next()) {
      o=_it_75[0];
      
      //$LASTPOS=9002280;
      v = f(o);
      //$LASTPOS=9002300;
      if (res==null||v>res) {
        //$LASTPOS=9002324;
        res=v;
      }
      
    }
    return res;
  },
  fiber$max :function _trc_func_9002194_26(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_75;
    var v;
    
    //$LASTPOS=9002210;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002237;
    res;
    //$LASTPOS=9002250;
    _it_75=Tonyu.iterator(_this,1);
    while(_it_75.next()) {
      o=_it_75[0];
      
      //$LASTPOS=9002280;
      v = f(o);
      //$LASTPOS=9002300;
      if (res==null||v>res) {
        //$LASTPOS=9002324;
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  min :function _trc_func_9002355_27(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_81;
    var v;
    
    //$LASTPOS=9002371;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002398;
    res;
    //$LASTPOS=9002411;
    _it_81=Tonyu.iterator(_this,1);
    while(_it_81.next()) {
      o=_it_81[0];
      
      //$LASTPOS=9002441;
      v = f(o);
      //$LASTPOS=9002461;
      if (res==null||v<res) {
        //$LASTPOS=9002485;
        res=v;
      }
      
    }
    return res;
  },
  fiber$min :function _trc_func_9002355_28(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_81;
    var v;
    
    //$LASTPOS=9002371;
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002398;
    res;
    //$LASTPOS=9002411;
    _it_81=Tonyu.iterator(_this,1);
    while(_it_81.next()) {
      o=_it_81[0];
      
      //$LASTPOS=9002441;
      v = f(o);
      //$LASTPOS=9002461;
      if (res==null||v<res) {
        //$LASTPOS=9002485;
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  push :function _trc_func_9002516_29(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9002531;
    _this[_this.length]=e;
    //$LASTPOS=9002551;
    _this.length++;
  },
  fiber$push :function _trc_func_9002516_30(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9002531;
    _this[_this.length]=e;
    //$LASTPOS=9002551;
    _this.length++;
    
    _thread.retVal=_this;return;
  },
  size :function _trc_func_9002563_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.length;
  },
  fiber$size :function _trc_func_9002563_32(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.length;return;
    
    
    _thread.retVal=_this;return;
  },
  find :function _trc_func_9002588_33(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var no;
    var o;
    var _it_87;
    
    //$LASTPOS=9002603;
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9002626;
    _it_87=Tonyu.iterator(_this,1);
    while(_it_87.next()) {
      o=_it_87[0];
      
      //$LASTPOS=9002656;
      if (f(o)) {
        //$LASTPOS=9002666;
        no.push(o);
      }
      
    }
    return no;
  },
  fiber$find :function _trc_func_9002588_34(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var no;
    var o;
    var _it_87;
    
    //$LASTPOS=9002603;
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9002626;
    _it_87=Tonyu.iterator(_this,1);
    while(_it_87.next()) {
      o=_it_87[0];
      
      //$LASTPOS=9002656;
      if (f(o)) {
        //$LASTPOS=9002666;
        no.push(o);
      }
      
    }
    _thread.retVal=no;return;
    
    
    _thread.retVal=_this;return;
  },
  apply :function _trc_func_9002702_35(name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var o;
    var _it_91;
    var f;
    
    //$LASTPOS=9002727;
    res;
    //$LASTPOS=9002740;
    if (! args) {
      //$LASTPOS=9002751;
      args=[];
    }
    //$LASTPOS=9002764;
    _it_91=Tonyu.iterator(_this,1);
    while(_it_91.next()) {
      o=_it_91[0];
      
      //$LASTPOS=9002794;
      f = o[name];
      //$LASTPOS=9002817;
      if (typeof  f=="function") {
        //$LASTPOS=9002857;
        res=f.apply(o,args);
        
      }
      
    }
    return res;
  },
  fiber$apply :function _trc_func_9002702_36(_thread,name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var o;
    var _it_91;
    var f;
    
    //$LASTPOS=9002727;
    res;
    //$LASTPOS=9002740;
    if (! args) {
      //$LASTPOS=9002751;
      args=[];
    }
    //$LASTPOS=9002764;
    _it_91=Tonyu.iterator(_this,1);
    while(_it_91.next()) {
      o=_it_91[0];
      
      //$LASTPOS=9002794;
      f = o[name];
      //$LASTPOS=9002817;
      if (typeof  f=="function") {
        //$LASTPOS=9002857;
        res=f.apply(o,args);
        
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  alive :function _trc_func_9002968_37() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return ! o.isDead();
    });
  },
  fiber$alive :function _trc_func_9002968_38(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return ! o.isDead();
    });return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_9003039_39() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    
    //$LASTPOS=9003052;
    a = _this.alive();
    //$LASTPOS=9003071;
    if (a.length==0) {
      return false;
    }
    //$LASTPOS=9003106;
    a.apply("die");
    return true;
  },
  fiber$die :function _trc_func_9003039_40(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    
    //$LASTPOS=9003052;
    a = _this.alive();
    //$LASTPOS=9003071;
    if (a.length==0) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=9003106;
    a.apply("die");
    _thread.retVal=true;return;
    
    
    _thread.retVal=_this;return;
  },
  klass :function _trc_func_9003142_41(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return o instanceof k;
    });
  },
  fiber$klass :function _trc_func_9003142_42(_thread,k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return o instanceof k;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TQuery,{"fullName":"kernel.TQuery","namespace":"kernel","shortName":"TQuery","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"tonyuIterator":{"nowait":false},"attr":{"nowait":false},"genKeyfunc":{"nowait":false},"maxs":{"nowait":false},"mins":{"nowait":false},"minObj":{"nowait":false},"maxObj":{"nowait":false},"nearests":{"nowait":false},"nearest":{"nowait":false},"withins":{"nowait":false},"within":{"nowait":false},"max":{"nowait":false},"min":{"nowait":false},"push":{"nowait":false},"size":{"nowait":false},"find":{"nowait":false},"apply":{"nowait":false},"alive":{"nowait":false},"die":{"nowait":false},"klass":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.WaveTable=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_10000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000028;
    _this.wav={};
    //$LASTPOS=10000036;
    _this.env={};
    //$LASTPOS=10000313;
    if (typeof  T!=="undefined") {
      //$LASTPOS=10000392;
      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
      //$LASTPOS=10000460;
      _this.setEnv(0,_this.env);
      //$LASTPOS=10000480;
      _this.setWav(0,T("pulse"));
      
    }
  },
  fiber$main :function _trc_func_10000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000028;
    _this.wav={};
    //$LASTPOS=10000036;
    _this.env={};
    
    _thread.enter(function _trc_func_10000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000313;
          if (!(typeof  T!=="undefined")) { __pc=3; break; }
          //$LASTPOS=10000392;
          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
          //$LASTPOS=10000460;
          _this.fiber$setEnv(_thread, 0, _this.env);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=10000480;
          _this.fiber$setWav(_thread, 0, T("pulse"));
          __pc=2;return;
        case 2:
          
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setWav :function _trc_func_10000044_3(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000070;
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_func_10000044_4(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000070;
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_func_10000088_5(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000114;
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_func_10000088_6(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000114;
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_10000132_7(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=10000148;
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_func_10000132_8(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=10000148;
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    _thread.retVal=synth;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_10000226_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_10000226_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.WaveTable,{"fullName":"kernel.WaveTable","namespace":"kernel","shortName":"WaveTable","decls":{"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod,Tonyu.classes.kernel.ParallelMod],{
  main :function _trc_func_11000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_11000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_11000155_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=11000174;
    if (Tonyu.runMode) {
      //$LASTPOS=11000204;
      thg = _this.currentThreadGroup();
      //$LASTPOS=11000243;
      if (thg) {
        //$LASTPOS=11000252;
        _this._th=thg.addObj(_this);
      }
      
    }
    //$LASTPOS=11000286;
    if (typeof  x=="object") {
      //$LASTPOS=11000310;
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=11000343;
      if (typeof  x=="number") {
        //$LASTPOS=11000378;
        _this.x=x;
        //$LASTPOS=11000397;
        _this.y=y;
        //$LASTPOS=11000416;
        _this.p=p;
        
      }
    }
    //$LASTPOS=11000438;
    if (_this.scaleX==null) {
      //$LASTPOS=11000456;
      _this.scaleX=1;
    }
    //$LASTPOS=11000471;
    if (_this.rotation==null) {
      //$LASTPOS=11000491;
      _this.rotation=0;
    }
    //$LASTPOS=11000508;
    if (_this.rotate==null) {
      //$LASTPOS=11000526;
      _this.rotate=0;
    }
    //$LASTPOS=11000541;
    if (_this.alpha==null) {
      //$LASTPOS=11000558;
      _this.alpha=255;
    }
    //$LASTPOS=11000574;
    if (_this.zOrder==null) {
      //$LASTPOS=11000592;
      _this.zOrder=0;
    }
    //$LASTPOS=11000607;
    if (_this.age==null) {
      //$LASTPOS=11000622;
      _this.age=0;
    }
    //$LASTPOS=11000634;
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=11000685;
      _this.animMode=true;
      //$LASTPOS=11000709;
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=11000743;
      _this.animMode=false;
      
    }
    //$LASTPOS=11000771;
    if (_this.animFps==null) {
      //$LASTPOS=11000790;
      _this.animFps=1;
    }
  },
  extend :function _trc_func_11000805_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_func_11000869_4(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000894;
    console.log.apply(console,arguments);
    //$LASTPOS=11000937;
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=11000965;
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=11001002;
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=11001048;
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_func_11001116_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001144;
    _this.animFps=f;
    //$LASTPOS=11001165;
    _this.animFrame=0;
    //$LASTPOS=11001188;
    _this.animMode=true;
  },
  startAnim :function _trc_func_11001212_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001238;
    _this.animMode=true;
  },
  stopAnim :function _trc_func_11001262_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001287;
    _this.animMode=false;
  },
  update :function _trc_func_11001312_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001329;
    _this.onUpdate();
    //$LASTPOS=11001346;
    if (null) {
      //$LASTPOS=11001369;
      null.suspend();
      
    }
  },
  fiber$update :function _trc_func_11001312_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11001329;
    _this.onUpdate();
    //$LASTPOS=11001346;
    if (_thread) {
      //$LASTPOS=11001369;
      _thread.suspend();
      
    }
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_11001399_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  updateEx :function _trc_func_11001430_11(updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var updateCount;
    
    //$LASTPOS=11001455;
    //$LASTPOS=11001459;
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=11001522;
        _this.update();
      }
      updateCount++;
    }
  },
  fiber$updateEx :function _trc_func_11001430_12(_thread,updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var updateCount;
    
    
    _thread.enter(function _trc_func_11001430_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11001455;
          //$LASTPOS=11001459;
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=11001522;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          updateCount++;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getkey :function _trc_func_11001543_14(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Keys.getkey(k);
  },
  hitTo :function _trc_func_11001596_15(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.crashTo(t);
  },
  all :function _trc_func_11001643_16(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=11001665;
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=11001690;
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=11001731;
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=11001762;
      if (! c||s instanceof c) {
        //$LASTPOS=11001803;
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_func_11001883_17(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=11001910;
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=11001935;
    sp = _this;
    //$LASTPOS=11001972;
    t1 = _this.getCrashRect();
    //$LASTPOS=11002000;
    if (! t1) {
      return res;
    }
    //$LASTPOS=11002026;
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=11002067;
      t2;
      //$LASTPOS=11002084;
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=11002312;
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_func_11002370_18(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11002396;
    if (! t) {
      return false;
    }
    //$LASTPOS=11002423;
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_func_11002519_19(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=11002546;
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=11002674;
    t1 = _this.getCrashRect();
    //$LASTPOS=11002702;
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_func_11002985_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=11003015;
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=11003058;
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=11003100;
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=11003146;
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_func_11003351_21(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003384;
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=11003423;
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_func_11003565_22(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003608;
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=11003659;
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_func_11003697_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$currentThreadGroup;
  },
  die :function _trc_func_11003766_24() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003787;
    if (_this._th) {
      //$LASTPOS=11003807;
      _this._th.kill();
      
    }
    //$LASTPOS=11003831;
    _this.hide();
    //$LASTPOS=11003844;
    _this.fireEvent("die");
    //$LASTPOS=11003867;
    _this._isDead=true;
  },
  hide :function _trc_func_11003885_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004046;
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=11004101;
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=11004142;
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_func_11004176_26(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004203;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=11004255;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=11004293;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=11004325;
    if (x!=null) {
      //$LASTPOS=11004338;
      _this.x=x;
    }
    //$LASTPOS=11004353;
    if (y!=null) {
      //$LASTPOS=11004366;
      _this.y=y;
    }
    //$LASTPOS=11004381;
    if (p!=null) {
      //$LASTPOS=11004394;
      _this.p=p;
    }
  },
  detectShape :function _trc_func_11004410_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004439;
    if (typeof  _this.p!="number") {
      //$LASTPOS=11004474;
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=11004507;
      _this.p=0;
      
    }
    //$LASTPOS=11004524;
    _this.p=Math.floor(_this.p);
    //$LASTPOS=11004546;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=11004584;
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=11004608;
    _this.width=_this.pImg.width;
    //$LASTPOS=11004631;
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_func_11004655_28(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    
    //$LASTPOS=11004724;
    _this.update();
  },
  fiber$waitFor :function _trc_func_11004655_29(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11004655_30(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          {
            //$LASTPOS=11004692;
            _thread.waitFor(f);
          }
          //$LASTPOS=11004724;
          _this.fiber$update(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  isDead :function _trc_func_11004738_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._isDead;
  },
  animation :function _trc_func_11004784_32() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004810;
    _this.age++;
    //$LASTPOS=11004822;
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=11004863;
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=11004903;
      _this.animFrame++;
      
    }
  },
  draw :function _trc_func_11004927_33(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=11004952;
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=11005005;
    _this.detectShape();
    //$LASTPOS=11005025;
    if (_this.pImg) {
      //$LASTPOS=11005046;
      ctx.save();
      //$LASTPOS=11005067;
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=11005211;
      _this.animation();
      //$LASTPOS=11005233;
      if (_this.rotation!=0) {
        //$LASTPOS=11005268;
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=11005336;
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=11005393;
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=11005445;
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=11005510;
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=11005566;
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=11005607;
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=11005739;
      ctx.restore();
      
    } else {
      //$LASTPOS=11005766;
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=11005814;
        if (! _this.size) {
          //$LASTPOS=11005825;
          _this.size=15;
        }
        //$LASTPOS=11005843;
        if (! _this.align) {
          //$LASTPOS=11005855;
          _this.align="center";
        }
        //$LASTPOS=11005880;
        if (! _this.fillStyle) {
          //$LASTPOS=11005896;
          _this.fillStyle="white";
        }
        //$LASTPOS=11005924;
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=11005958;
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=11005999;
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=11006070;
        _this.width=rect.w;
        //$LASTPOS=11006093;
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=11006120;
    if (_this._fukidashi) {
      //$LASTPOS=11006147;
      if (_this._fukidashi.c>0) {
        //$LASTPOS=11006182;
        _this._fukidashi.c--;
        //$LASTPOS=11006211;
        ctx.fillStyle="white";
        //$LASTPOS=11006247;
        ctx.strokeStyle="black";
        //$LASTPOS=11006285;
        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
        
      }
      
    }
  },
  asyncResult :function _trc_func_11006392_34() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.asyncResult();
  },
  screenOut :function _trc_func_11006455_35(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=11006508;
    if (! a) {
      //$LASTPOS=11006516;
      a=0;
    }
    //$LASTPOS=11006526;
    r = 0;
    //$LASTPOS=11006540;
    viewX = 0;viewY = 0;
    //$LASTPOS=11006566;
    if (_this.x<viewX+a) {
      //$LASTPOS=11006595;
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=11006614;
    if (_this.y<viewY+a) {
      //$LASTPOS=11006643;
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=11006662;
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=11006691;
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=11006726;
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=11006755;
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    return r;
  },
  fiber$screenOut :function _trc_func_11006455_36(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=11006508;
    if (! a) {
      //$LASTPOS=11006516;
      a=0;
    }
    //$LASTPOS=11006526;
    r = 0;
    //$LASTPOS=11006540;
    viewX = 0;viewY = 0;
    //$LASTPOS=11006566;
    if (_this.x<viewX+a) {
      //$LASTPOS=11006595;
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=11006614;
    if (_this.y<viewY+a) {
      //$LASTPOS=11006643;
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=11006662;
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=11006691;
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=11006726;
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=11006755;
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_func_11006804_37(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=11006823;
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=11006865;
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_func_11006804_38(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=11006823;
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=11006865;
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_func_11006944_39(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11006972;
    if (fl!==false) {
      //$LASTPOS=11006999;
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=11007151;
      _this.a=_this.asyncResult();
      //$LASTPOS=11007177;
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=11007231;
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=11007266;
      if (_this.origTG) {
        
        
      }
      
    }
  },
  fiber$waitInputDevice :function _trc_func_11006944_40(_thread,fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11006944_41(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11006972;
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=11006999;
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=11007053;
            _this.origTG=_thread.group;
            //$LASTPOS=11007092;
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=11007151;
          _this.a=_this.asyncResult();
          //$LASTPOS=11007177;
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=11007231;
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=11007266;
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=11007319;
            _thread.setGroup(_this.origTG);
            //$LASTPOS=11007362;
            _this.origTG=null;
          }
        case 4:
          
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  redrawScreen :function _trc_func_11007412_42() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11007435;
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=11007471;
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_func_11007412_43(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11007435;
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=11007471;
    Tonyu.globals.$Screen.draw();
    
    _thread.retVal=_this;return;
  },
  color :function _trc_func_11007512_44(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_11007512_45(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_11007574_46(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=11007610;
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=11007635;
    if (! size) {
      //$LASTPOS=11007646;
      size=15;
    }
    //$LASTPOS=11007660;
    if (! col) {
      //$LASTPOS=11007670;
      col="cyan";
    }
    //$LASTPOS=11007687;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007741;
    if (tp.length>0) {
      //$LASTPOS=11007769;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=11007848;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_11007574_47(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=11007610;
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=11007635;
    if (! size) {
      //$LASTPOS=11007646;
      size=15;
    }
    //$LASTPOS=11007660;
    if (! col) {
      //$LASTPOS=11007670;
      col="cyan";
    }
    //$LASTPOS=11007687;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007741;
    if (tp.length>0) {
      //$LASTPOS=11007769;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=11007848;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_11007903_48(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=11007935;
    if (! col) {
      //$LASTPOS=11007945;
      col="white";
    }
    //$LASTPOS=11007963;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11008017;
    if (tp.length>0) {
      //$LASTPOS=11008045;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=11008110;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_11007903_49(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=11007935;
    if (! col) {
      //$LASTPOS=11007945;
      col="white";
    }
    //$LASTPOS=11007963;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11008017;
    if (tp.length>0) {
      //$LASTPOS=11008045;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=11008110;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  loadPage :function _trc_func_11008150_50(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11008176;
    _this.all().die();
    //$LASTPOS=11008194;
    new page(arg);
    //$LASTPOS=11008214;
    _this.die();
  },
  fiber$loadPage :function _trc_func_11008150_51(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11008176;
    _this.all().die();
    //$LASTPOS=11008194;
    new page(arg);
    //$LASTPOS=11008214;
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_func_11008227_52(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11008249;
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_11008227_53(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11008249;
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Keys=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_12000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=12000084;
    _this.stats={};
    //$LASTPOS=12000094;
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=12000212;
    //$LASTPOS=12000217;
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=12000248;
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=12000297;
    //$LASTPOS=12000302;
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=12000330;
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=12000365;
    if (! $.data(document,"key_event")) {
      //$LASTPOS=12000406;
      $.data(document,"key_event",true);
      //$LASTPOS=12000445;
      $(document).keydown(function (e) {
        
        //$LASTPOS=12000471;
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=12000495;
      $(document).keyup(function (e) {
        
        //$LASTPOS=12000519;
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=12000541;
      $(document).mousedown(function (e) {
        
        //$LASTPOS=12000578;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=12000619;
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=12000660;
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=12000697;
      $(document).mouseup(function (e) {
        
        //$LASTPOS=12000732;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=12000773;
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=12000814;
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
  },
  fiber$main :function _trc_func_12000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=12000084;
    _this.stats={};
    //$LASTPOS=12000094;
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=12000212;
    //$LASTPOS=12000217;
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=12000248;
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=12000297;
    //$LASTPOS=12000302;
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=12000330;
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=12000365;
    if (! $.data(document,"key_event")) {
      //$LASTPOS=12000406;
      $.data(document,"key_event",true);
      //$LASTPOS=12000445;
      $(document).keydown(function (e) {
        
        //$LASTPOS=12000471;
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=12000495;
      $(document).keyup(function (e) {
        
        //$LASTPOS=12000519;
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=12000541;
      $(document).mousedown(function (e) {
        
        //$LASTPOS=12000578;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=12000619;
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=12000660;
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=12000697;
      $(document).mouseup(function (e) {
        
        //$LASTPOS=12000732;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=12000773;
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=12000814;
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
    
    _thread.retVal=_this;return;
  },
  getkey :function _trc_func_12000847_2(code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000875;
    if (typeof  code=="string") {
      //$LASTPOS=12000912;
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=12000954;
    if (! code) {
      return 0;
    }
    //$LASTPOS=12000979;
    if (_this.stats[code]==- 1) {
      return 0;
    }
    //$LASTPOS=12001014;
    if (! _this.stats[code]) {
      //$LASTPOS=12001032;
      _this.stats[code]=0;
    }
    return _this.stats[code];
  },
  fiber$getkey :function _trc_func_12000847_3(_thread,code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000875;
    if (typeof  code=="string") {
      //$LASTPOS=12000912;
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=12000954;
    if (! code) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=12000979;
    if (_this.stats[code]==- 1) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=12001014;
    if (! _this.stats[code]) {
      //$LASTPOS=12001032;
      _this.stats[code]=0;
    }
    _thread.retVal=_this.stats[code];return;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_12001073_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_133;
    
    //$LASTPOS=12001097;
    _it_133=Tonyu.iterator(_this.stats,1);
    while(_it_133.next()) {
      i=_it_133[0];
      
      //$LASTPOS=12001128;
      if (_this.stats[i]>0) {
        //$LASTPOS=12001145;
        _this.stats[i]++;
        
      }
      //$LASTPOS=12001166;
      if (_this.stats[i]==- 1) {
        //$LASTPOS=12001184;
        _this.stats[i]=1;
      }
      
    }
  },
  fiber$update :function _trc_func_12001073_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_133;
    
    //$LASTPOS=12001097;
    _it_133=Tonyu.iterator(_this.stats,1);
    while(_it_133.next()) {
      i=_it_133[0];
      
      //$LASTPOS=12001128;
      if (_this.stats[i]>0) {
        //$LASTPOS=12001145;
        _this.stats[i]++;
        
      }
      //$LASTPOS=12001166;
      if (_this.stats[i]==- 1) {
        //$LASTPOS=12001184;
        _this.stats[i]=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  keydown :function _trc_func_12001204_6(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    
    //$LASTPOS=12001222;
    s = _this.stats[e.keyCode];
    //$LASTPOS=12001250;
    if (! s) {
      //$LASTPOS=12001268;
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=12001298;
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keydown :function _trc_func_12001204_7(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    
    //$LASTPOS=12001222;
    s = _this.stats[e.keyCode];
    //$LASTPOS=12001250;
    if (! s) {
      //$LASTPOS=12001268;
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=12001298;
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  keyup :function _trc_func_12001332_8(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12001348;
    _this.stats[e.keyCode]=0;
    //$LASTPOS=12001372;
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_func_12001332_9(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12001348;
    _this.stats[e.keyCode]=0;
    //$LASTPOS=12001372;
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MML=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_13000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000050;
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_func_13000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000050;
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_13000062_2(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000081;
    _this.mmlBuf.push(mmls);
    //$LASTPOS=13000105;
    if (! _this.isPlaying()) {
      //$LASTPOS=13000134;
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_func_13000062_3(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000081;
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_func_13000062_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=13000105;
          if (!(! _this.isPlaying())) { __pc=2; break; }
          //$LASTPOS=13000134;
          _this.fiber$playNext(_thread);
          __pc=1;return;
        case 1:
          
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playNext :function _trc_func_13000157_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    
    //$LASTPOS=13000220;
    if (_this.cTimeBase==null) {
      //$LASTPOS=13000241;
      _this.cTimeBase=0;
    }
    //$LASTPOS=13000259;
    if (_this.m) {
      //$LASTPOS=13000277;
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=13000348;
    mml = _this.mmlBuf.shift();
    //$LASTPOS=13000377;
    if (! mml) {
      //$LASTPOS=13000398;
      _this.m=null;
      //$LASTPOS=13000415;
      _this.cTimeBase=0;
      return _this;
      
    }
    //$LASTPOS=13000457;
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=13000495;
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=13000525;
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=13000555;
    _this.m.start();
    //$LASTPOS=13000571;
    Tonyu.globals.$MMLS[_this.id()]=_this;
  },
  fiber$playNext :function _trc_func_13000157_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mml;
    
    //$LASTPOS=13000220;
    if (_this.cTimeBase==null) {
      //$LASTPOS=13000241;
      _this.cTimeBase=0;
    }
    //$LASTPOS=13000259;
    if (_this.m) {
      //$LASTPOS=13000277;
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=13000348;
    mml = _this.mmlBuf.shift();
    //$LASTPOS=13000377;
    if (! mml) {
      //$LASTPOS=13000398;
      _this.m=null;
      //$LASTPOS=13000415;
      _this.cTimeBase=0;
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=13000457;
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=13000495;
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=13000525;
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=13000555;
    _this.m.start();
    //$LASTPOS=13000571;
    Tonyu.globals.$MMLS[_this.id()]=_this;
    
    _thread.retVal=_this;return;
  },
  id :function _trc_func_13000593_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000606;
    if (! _this._id) {
      //$LASTPOS=13000616;
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_func_13000593_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000606;
    if (! _this._id) {
      //$LASTPOS=13000616;
      _this._id=_this.rnd()+"";
    }
    _thread.retVal=_this._id;return;
    
    
    _thread.retVal=_this;return;
  },
  bufferCount :function _trc_func_13000651_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mmlBuf.length;
  },
  fiber$bufferCount :function _trc_func_13000651_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mmlBuf.length;return;
    
    
    _thread.retVal=_this;return;
  },
  isPlaying :function _trc_func_13000699_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.m;
  },
  fiber$isPlaying :function _trc_func_13000699_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.m;return;
    
    
    _thread.retVal=_this;return;
  },
  currentTime :function _trc_func_13000733_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000755;
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_func_13000733_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000755;
    if (_this.m) {
      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_13000814_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000829;
    if (_this.m) {
      //$LASTPOS=13000847;
      if (_this.mwav) {
        //$LASTPOS=13000872;
        _this.mwav.pause();
        //$LASTPOS=13000899;
        _this.mwav.stop();
        
      }
      //$LASTPOS=13000932;
      _this.m.pause();
      //$LASTPOS=13000952;
      _this.m.stop();
      //$LASTPOS=13000971;
      _this.m=null;
      //$LASTPOS=13000988;
      _this.mmlBuf=[];
      //$LASTPOS=13001056;
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
  },
  fiber$stop :function _trc_func_13000814_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000829;
    if (_this.m) {
      //$LASTPOS=13000847;
      if (_this.mwav) {
        //$LASTPOS=13000872;
        _this.mwav.pause();
        //$LASTPOS=13000899;
        _this.mwav.stop();
        
      }
      //$LASTPOS=13000932;
      _this.m.pause();
      //$LASTPOS=13000952;
      _this.m.stop();
      //$LASTPOS=13000971;
      _this.m=null;
      //$LASTPOS=13000988;
      _this.mmlBuf=[];
      //$LASTPOS=13001056;
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_14000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_14000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sleep :function _trc_func_14000034_2(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000050;
    if (! n) {
      //$LASTPOS=14000057;
      n=1;
    }
    //$LASTPOS=14000066;
    //$LASTPOS=14000070;
    n;
    while(n>0) {
      //$LASTPOS=14000081;
      _this.update();
      n--;
    }
  },
  fiber$sleep :function _trc_func_14000034_3(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000050;
    if (! n) {
      //$LASTPOS=14000057;
      n=1;
    }
    
    _thread.enter(function _trc_func_14000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000066;
          //$LASTPOS=14000070;
          n;;
        case 1:
          if (!(n>0)) { __pc=3; break; }
          //$LASTPOS=14000081;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          n--;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSprite :function _trc_func_14000093_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000113;
    if (! _this._sprite) {
      //$LASTPOS=14000137;
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=14000207;
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_func_14000093_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000113;
    if (! _this._sprite) {
      //$LASTPOS=14000137;
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=14000207;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.retVal=_this;return;
  },
  say :function _trc_func_14000235_7(text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000257;
    if (! size) {
      //$LASTPOS=14000268;
      size=15;
    }
    //$LASTPOS=14000281;
    _this.initSprite();
    //$LASTPOS=14000299;
    _this._sprite._fukidashi={text: text,size: size,c: 30};
  },
  fiber$say :function _trc_func_14000235_8(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000257;
    if (! size) {
      //$LASTPOS=14000268;
      size=15;
    }
    
    _thread.enter(function _trc_func_14000235_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000281;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=14000299;
          _this._sprite._fukidashi={text: text,size: size,c: 30};
          _thread.exit(_this);return;
        }
      }
    });
  },
  sprite :function _trc_func_14000350_10(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000371;
    _this.go(x,y,p);
  },
  fiber$sprite :function _trc_func_14000350_11(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_14000350_12(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000371;
          _this.fiber$go(_thread, x, y, p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  show :function _trc_func_14000384_13(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000403;
    _this.go(x,y,p);
  },
  draw :function _trc_func_14000416_14(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000440;
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_func_14000461_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_func_14000516_16(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000533;
    _this.initSprite();
    //$LASTPOS=14000551;
    _this._sprite.x=x;
    //$LASTPOS=14000568;
    _this._sprite.y=y;
    //$LASTPOS=14000585;
    if (p!=null) {
      //$LASTPOS=14000598;
      _this._sprite.p=p;
    }
  },
  fiber$go :function _trc_func_14000516_17(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_14000516_18(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000533;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=14000551;
          _this._sprite.x=x;
          //$LASTPOS=14000568;
          _this._sprite.y=y;
          //$LASTPOS=14000585;
          if (p!=null) {
            //$LASTPOS=14000598;
            _this._sprite.p=p;
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  change :function _trc_func_14000629_19(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000646;
    _this.initSprite();
    //$LASTPOS=14000664;
    _this._sprite.p=p;
  },
  fiber$change :function _trc_func_14000629_20(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_14000629_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000646;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=14000664;
          _this._sprite.p=p;
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.NoviceActor,{"fullName":"kernel.NoviceActor","namespace":"kernel","shortName":"NoviceActor","decls":{"methods":{"main":{"nowait":false},"sleep":{"nowait":false},"initSprite":{"nowait":false},"say":{"nowait":false},"sprite":{"nowait":false},"show":{"nowait":true},"draw":{"nowait":true},"getCrashRect":{"nowait":true},"go":{"nowait":false},"change":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlayMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_15000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_15000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initMML :function _trc_func_15000020_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000045;
    if (_this.mmlInited) {
      return _this;
    }
    //$LASTPOS=15000073;
    _this.mmlInited=true;
    //$LASTPOS=15000094;
    Tonyu.globals.$currentProject.requestPlugin("timbre");
    //$LASTPOS=15000140;
    if (! Tonyu.globals.$MMLS) {
      //$LASTPOS=15000162;
      Tonyu.globals.$MMLS={};
      //$LASTPOS=15000180;
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=15000214;
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
      
    }
    //$LASTPOS=15000256;
    _this.on("die",function () {
      
      //$LASTPOS=15000272;
      _this.play().stop();
    });
  },
  releaseMML :function _trc_func_15000294_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_138;
    
    //$LASTPOS=15000322;
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=15000343;
      _it_138=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_138.next()) {
        k=_it_138[0];
        v=_it_138[1];
        
        //$LASTPOS=15000379;
        v.stop();
        
      }
      //$LASTPOS=15000407;
      Tonyu.globals.$MMLS=null;
      
    }
    //$LASTPOS=15000432;
    if (Tonyu.globals.$WaveTable) {
      //$LASTPOS=15000458;
      Tonyu.globals.$WaveTable.stop();
      //$LASTPOS=15000485;
      Tonyu.globals.$WaveTable=null;
      
    }
  },
  play :function _trc_func_15000513_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mmls;
    var i;
    
    //$LASTPOS=15000528;
    _this.initMML();
    //$LASTPOS=15000544;
    if (! _this._mml) {
      //$LASTPOS=15000555;
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=15000574;
    if (_this.isDead()||arguments.length==0) {
      return _this._mml;
    }
    //$LASTPOS=15000629;
    mmls = [];
    //$LASTPOS=15000647;
    //$LASTPOS=15000652;
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=15000697;
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=15000734;
    _this._mml.play(mmls);
    //$LASTPOS=15000756;
    while (_this._mml.bufferCount()>2) {
      //$LASTPOS=15000796;
      _this.update();
      
    }
    return _this._mml;
  },
  fiber$play :function _trc_func_15000513_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mmls;
    var i;
    
    //$LASTPOS=15000528;
    _this.initMML();
    //$LASTPOS=15000544;
    if (! _this._mml) {
      //$LASTPOS=15000555;
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=15000574;
    if (_this.isDead()||_arguments.length==0) {
      _thread.retVal=_this._mml;return;
      
    }
    //$LASTPOS=15000629;
    mmls = [];
    //$LASTPOS=15000647;
    //$LASTPOS=15000652;
    i = 0;
    while(i<_arguments.length) {
      {
        //$LASTPOS=15000697;
        mmls.push(_arguments[i]);
      }
      i++;
    }
    //$LASTPOS=15000734;
    _this._mml.play(mmls);
    
    _thread.enter(function _trc_func_15000513_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000756;
        case 1:
          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
          //$LASTPOS=15000796;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this._mml);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  playSE :function _trc_func_15000835_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    var mmls;
    var i;
    
    //$LASTPOS=15000859;
    _this.initMML();
    //$LASTPOS=15000875;
    mml = new Tonyu.classes.kernel.MML;
    //$LASTPOS=15000897;
    mmls = [];
    //$LASTPOS=15000915;
    //$LASTPOS=15000920;
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=15000965;
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=15001002;
    mml.play(mmls);
    return mml;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod],{
  main :function _trc_func_16000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_16000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_16000073_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16000092;
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=16000111;
    if (Tonyu.runMode) {
      //$LASTPOS=16000130;
      _this.initSprite();
    }
  },
  initSprite :function _trc_func_16000148_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16000169;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=16000221;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=16000259;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=16000291;
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_16000148_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=16000169;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=16000221;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=16000259;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_16000148_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16000291;
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_16000307_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onAppear :function _trc_func_16000307_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BodyActor=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_17000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_17000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getWorld :function _trc_func_17000046_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000064;
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=17000099;
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_func_17000046_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000064;
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=17000099;
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_17000144_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var b2BodyDef;
    var b2Body;
    var b2FixtureDef;
    var b2Fixture;
    var b2PolygonShape;
    var b2CircleShape;
    var fixDef;
    var bodyDef;
    var w;
    var h;
    
    //$LASTPOS=17000162;
    _this.world=_this.getWorld().world;
    //$LASTPOS=17000190;
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=17000218;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17000261;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=17000307;
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=17000347;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=17000399;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=17000445;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=17000509;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=17000576;
    fixDef = new b2FixtureDef;
    //$LASTPOS=17000611;
    fixDef.density=_this.density||1;
    //$LASTPOS=17000648;
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=17000687;
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=17000737;
    bodyDef = new b2BodyDef;
    //$LASTPOS=17000770;
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=17000855;
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=17000890;
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=17000925;
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=17000973;
    w = _this.width;h = _this.height;
    //$LASTPOS=17000999;
    if (! w) {
      //$LASTPOS=17001017;
      _this.detectShape();
      //$LASTPOS=17001040;
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=17001069;
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=17001109;
    if (_this.shape=="box") {
      //$LASTPOS=17001137;
      if (! h) {
        //$LASTPOS=17001145;
        h=w;
      }
      //$LASTPOS=17001158;
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=17001201;
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=17001302;
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=17001338;
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=17001412;
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=17001446;
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=17001482;
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=17001514;
    _this.body.SetUserData(_this);
    //$LASTPOS=17001542;
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_func_17000144_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var b2BodyDef;
    var b2Body;
    var b2FixtureDef;
    var b2Fixture;
    var b2PolygonShape;
    var b2CircleShape;
    var fixDef;
    var bodyDef;
    var w;
    var h;
    
    //$LASTPOS=17000162;
    _this.world=_this.getWorld().world;
    //$LASTPOS=17000190;
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=17000218;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17000261;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=17000307;
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=17000347;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=17000399;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=17000445;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=17000509;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=17000576;
    fixDef = new b2FixtureDef;
    //$LASTPOS=17000611;
    fixDef.density=_this.density||1;
    //$LASTPOS=17000648;
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=17000687;
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=17000737;
    bodyDef = new b2BodyDef;
    //$LASTPOS=17000770;
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=17000855;
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=17000890;
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=17000925;
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=17000973;
    w = _this.width;h = _this.height;
    //$LASTPOS=17000999;
    if (! w) {
      //$LASTPOS=17001017;
      _this.detectShape();
      //$LASTPOS=17001040;
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=17001069;
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=17001109;
    if (_this.shape=="box") {
      //$LASTPOS=17001137;
      if (! h) {
        //$LASTPOS=17001145;
        h=w;
      }
      //$LASTPOS=17001158;
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=17001201;
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=17001302;
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=17001338;
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=17001412;
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=17001446;
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=17001482;
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=17001514;
    _this.body.SetUserData(_this);
    //$LASTPOS=17001542;
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_func_17001574_6(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=17001599;
    res = [];
    //$LASTPOS=17001615;
    //$LASTPOS=17001620;
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=17001676;
        if (c.IsTouching()) {
          //$LASTPOS=17001710;
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=17001769;
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=17001828;
          if (a===_this) {
            //$LASTPOS=17001860;
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=17001929;
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=17001979;
            if (b===_this) {
              //$LASTPOS=17002011;
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=17002080;
                res.push(a);
                
              }
              
            }
          }
          
        }
      }
      c=c.GetNext();
    }
    return res;
  },
  fiber$allContact :function _trc_func_17001574_7(_thread,klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=17001599;
    res = [];
    //$LASTPOS=17001615;
    //$LASTPOS=17001620;
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=17001676;
        if (c.IsTouching()) {
          //$LASTPOS=17001710;
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=17001769;
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=17001828;
          if (a===_this) {
            //$LASTPOS=17001860;
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=17001929;
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=17001979;
            if (b===_this) {
              //$LASTPOS=17002011;
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=17002080;
                res.push(a);
                
              }
              
            }
          }
          
        }
      }
      c=c.GetNext();
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  applyForce :function _trc_func_17002159_8(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=17002190;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17002233;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002265;
    fps = 60;
    //$LASTPOS=17002281;
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_func_17002159_9(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=17002190;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17002233;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002265;
    fps = 60;
    //$LASTPOS=17002281;
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_func_17002339_10(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=17002372;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17002415;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002447;
    fps = 60;
    //$LASTPOS=17002463;
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_func_17002339_11(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=17002372;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=17002415;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002447;
    fps = 60;
    //$LASTPOS=17002463;
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_func_17002524_12(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002546;
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_func_17002524_13(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17002546;
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_func_17002569_14(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=17002590;
    pos = _this.body.GetPosition();
    //$LASTPOS=17002622;
    pos.x+=dx/_this.scale;
    //$LASTPOS=17002643;
    pos.y+=dy/_this.scale;
    //$LASTPOS=17002664;
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_func_17002569_15(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=17002590;
    pos = _this.body.GetPosition();
    //$LASTPOS=17002622;
    pos.x+=dx/_this.scale;
    //$LASTPOS=17002643;
    pos.y+=dy/_this.scale;
    //$LASTPOS=17002664;
    _this.body.SetPosition(pos);
    
    _thread.retVal=_this;return;
  },
  contactTo :function _trc_func_17002689_16(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.allContact(t)[0];
  },
  fiber$contactTo :function _trc_func_17002689_17(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.allContact(t)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_17002736_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002749;
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=17002766;
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_func_17002793_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=17002812;
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=17002835;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002867;
    pos = _this.body.GetPosition();
    //$LASTPOS=17002899;
    _this.x=pos.x*scale;
    //$LASTPOS=17002918;
    _this.y=pos.y*scale;
    //$LASTPOS=17002937;
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_func_17002793_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=17002812;
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=17002835;
    scale = _this.getWorld().scale;
    //$LASTPOS=17002867;
    pos = _this.body.GetPosition();
    //$LASTPOS=17002899;
    _this.x=pos.x*scale;
    //$LASTPOS=17002918;
    _this.y=pos.y*scale;
    //$LASTPOS=17002937;
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_18000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001406;
    _this.initSprites();
    //$LASTPOS=18001422;
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=18001453;
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=18001490;
    _this.initThread();
    //$LASTPOS=18001507;
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=18001524;
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=18001541;
    Tonyu.globals.$Math=Math;
    //$LASTPOS=18001554;
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=18001664;
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=18001688;
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=18001828;
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=18001866;
      SplashScreen.hide();
    }
    //$LASTPOS=18001888;
    _this.initFPSParams();
    //$LASTPOS=18001908;
    while (true) {
      //$LASTPOS=18001928;
      _this.thg.steps();
      //$LASTPOS=18001946;
      Tonyu.globals.$Keys.update();
      //$LASTPOS=18001967;
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=18001995;
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=18002028;
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=18002069;
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=18002097;
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=18002151;
        _this.doDraw=true;
        //$LASTPOS=18002173;
        _this.resetDeadLine();
        
      }
      //$LASTPOS=18002202;
      if (_this.doDraw) {
        //$LASTPOS=18002245;
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=18002290;
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=18002330;
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=18002375;
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=18002400;
        _this.fps_fpsCnt++;
        //$LASTPOS=18002424;
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=18002463;
        _this.frameSkipped++;
        
      }
      //$LASTPOS=18002491;
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=18002517;
      _this.fps_rpsCnt++;
      //$LASTPOS=18002537;
      _this.measureFps();
      //$LASTPOS=18002556;
      _this.waitFrame();
      //$LASTPOS=18002583;
      while (_this.paused) {
        //$LASTPOS=18002608;
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=18002645;
        if (! _this.paused) {
          //$LASTPOS=18002658;
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_func_18000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18001406;
          _this.fiber$initSprites(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=18001422;
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=18001453;
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=18001490;
          _this.fiber$initThread(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=18001507;
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=18001524;
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=18001541;
          Tonyu.globals.$Math=Math;
          //$LASTPOS=18001554;
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=18001664;
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=18001688;
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=18001828;
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=18001866;
            SplashScreen.hide();
          }
          //$LASTPOS=18001888;
          _this.initFPSParams();
          //$LASTPOS=18001908;
        case 3:
          //$LASTPOS=18001928;
          _this.thg.steps();
          //$LASTPOS=18001946;
          Tonyu.globals.$Keys.update();
          //$LASTPOS=18001967;
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=18001995;
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=18002028;
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=18002069;
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=18002097;
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=18002151;
            _this.doDraw=true;
            //$LASTPOS=18002173;
            _this.resetDeadLine();
            
          }
          //$LASTPOS=18002202;
          if (_this.doDraw) {
            //$LASTPOS=18002245;
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=18002290;
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=18002330;
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=18002375;
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=18002400;
            _this.fps_fpsCnt++;
            //$LASTPOS=18002424;
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=18002463;
            _this.frameSkipped++;
            
          }
          //$LASTPOS=18002491;
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=18002517;
          _this.fps_rpsCnt++;
          //$LASTPOS=18002537;
          _this.measureFps();
          //$LASTPOS=18002556;
          _this.fiber$waitFrame(_thread);
          __pc=4;return;
        case 4:
          
          //$LASTPOS=18002583;
        case 5:
          if (!(_this.paused)) { __pc=7; break; }
          //$LASTPOS=18002608;
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=6;return;
        case 6:
          
          //$LASTPOS=18002645;
          if (! _this.paused) {
            //$LASTPOS=18002658;
            _this.resetDeadLine();
          }
          __pc=5;break;
        case 7:
          
          __pc=3;break;
        case 8:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSprites :function _trc_func_18000160_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_171;
    
    //$LASTPOS=18000182;
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=18000211;
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=18000245;
    _this.print("Loading plugins..");
    //$LASTPOS=18000279;
    a = _this.asyncResult();
    //$LASTPOS=18000305;
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=18000351;
    _this.waitFor(a);
    //$LASTPOS=18000368;
    _this.print("Loading pats..");
    //$LASTPOS=18000399;
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=18000442;
    a=_this.asyncResult();
    //$LASTPOS=18000464;
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=18000549;
    _this.waitFor(a);
    //$LASTPOS=18000566;
    r = a[0];
    //$LASTPOS=18000583;
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=18000614;
    _it_171=Tonyu.iterator(r.names,2);
    while(_it_171.next()) {
      name=_it_171[0];
      val=_it_171[1];
      
      //$LASTPOS=18000655;
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=18000695;
    _this.print("Loading pats done.");
    //$LASTPOS=18000730;
    _this.cvj=$("canvas");
    //$LASTPOS=18000752;
    if (Tonyu.noviceMode) {
      //$LASTPOS=18000785;
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=18000869;
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
      
    }
  },
  fiber$initSprites :function _trc_func_18000160_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_171;
    
    //$LASTPOS=18000182;
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=18000211;
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=18000245;
    _this.print("Loading plugins..");
    //$LASTPOS=18000279;
    a = _this.asyncResult();
    //$LASTPOS=18000305;
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_func_18000160_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000351;
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=18000368;
          _this.print("Loading pats..");
          //$LASTPOS=18000399;
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=18000442;
          a=_this.asyncResult();
          //$LASTPOS=18000464;
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=18000549;
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=18000566;
          r = a[0];
          //$LASTPOS=18000583;
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=18000614;
          _it_171=Tonyu.iterator(r.names,2);
          while(_it_171.next()) {
            name=_it_171[0];
            val=_it_171[1];
            
            //$LASTPOS=18000655;
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=18000695;
          _this.print("Loading pats done.");
          //$LASTPOS=18000730;
          _this.cvj=$("canvas");
          //$LASTPOS=18000752;
          if (Tonyu.noviceMode) {
            //$LASTPOS=18000785;
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=18000869;
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_func_18000945_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=18000966;
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=18001013;
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=18001059;
    mainClassName = o.run.mainClass;
    //$LASTPOS=18001099;
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=18001140;
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=18001186;
    if (! _this.mainClass) {
      //$LASTPOS=18001213;
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=18001292;
    Tonyu.runMode=true;
    //$LASTPOS=18001317;
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=18001347;
    new _this.mainClass();
  },
  fiber$initThread :function _trc_func_18000945_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=18000966;
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=18001013;
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=18001059;
    mainClassName = o.run.mainClass;
    //$LASTPOS=18001099;
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=18001140;
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=18001186;
    if (! _this.mainClass) {
      //$LASTPOS=18001213;
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=18001292;
    Tonyu.runMode=true;
    //$LASTPOS=18001317;
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=18001347;
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_18001368_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18001383;
    _this.fireEvent("stop");
  },
  fiber$stop :function _trc_func_18001368_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_18001368_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18001383;
          _this.fiber$fireEvent(_thread, "stop");
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_func_18002688_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18002738;
    _this._fps=30;
    //$LASTPOS=18002754;
    _this.maxframeSkip=5;
    //$LASTPOS=18002804;
    _this.frameCnt=0;
    //$LASTPOS=18002823;
    _this.resetDeadLine();
    //$LASTPOS=18002845;
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=18002864;
    _this.lastMeasured=_this.now();
    //$LASTPOS=18002889;
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_func_18002934_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_func_18002988_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18003019;
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=18003050;
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_func_18003074_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=18003094;
    wt = _this.deadLine-_this.now();
    //$LASTPOS=18003122;
    if (wt<1) {
      //$LASTPOS=18003143;
      if (wt<- 1000) {
        //$LASTPOS=18003157;
        _this.resetDeadLine();
      }
      //$LASTPOS=18003183;
      wt=1;
      
    }
    //$LASTPOS=18003201;
    wt=_this.floor(wt);
    //$LASTPOS=18003220;
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=18003253;
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_func_18003074_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=18003094;
    wt = _this.deadLine-_this.now();
    //$LASTPOS=18003122;
    if (wt<1) {
      //$LASTPOS=18003143;
      if (wt<- 1000) {
        //$LASTPOS=18003157;
        _this.resetDeadLine();
      }
      //$LASTPOS=18003183;
      wt=1;
      
    }
    //$LASTPOS=18003201;
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_func_18003074_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18003220;
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=18003253;
          _this.deadLine+=1000/_this._fps;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getFrameRate :function _trc_func_18003280_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._fps;
  },
  setFrameRate :function _trc_func_18003366_18(fps,maxFrameSkip) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18003413;
    _this._fps=fps;
    //$LASTPOS=18003430;
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=18003465;
      maxFrameSkip=5;
    }
    //$LASTPOS=18003486;
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=18003525;
    _this.resetDeadLine();
  },
  getMeasuredFps :function _trc_func_18003575_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_fps;
  },
  getMeasuredRps :function _trc_func_18003654_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_rps;
  },
  measureFps :function _trc_func_18003708_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18003736;
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=18003776;
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=18003805;
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=18003834;
      _this.fps_fpsCnt=0;
      //$LASTPOS=18003857;
      _this.fps_rpsCnt=0;
      //$LASTPOS=18003880;
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"initSprites":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_19000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_19000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_19000041_2(param) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    
    //$LASTPOS=19000060;
    _this.sx=0;
    //$LASTPOS=19000071;
    _this.sy=0;
    //$LASTPOS=19000082;
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=19000101;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=19000173;
    _this.mapObj=true;
    //$LASTPOS=19000191;
    _this.mapTable=[];
    //$LASTPOS=19000211;
    _this.mapOnTable=[];
    //$LASTPOS=19000233;
    //$LASTPOS=19000237;
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=19000266;
        _this.rows=[];
        //$LASTPOS=19000286;
        //$LASTPOS=19000290;
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=19000323;
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=19000358;
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=19000391;
    //$LASTPOS=19000395;
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=19000424;
        _this.rows=[];
        //$LASTPOS=19000444;
        //$LASTPOS=19000448;
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=19000481;
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=19000516;
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=19000616;
    _this.initMap();
  },
  initMap :function _trc_func_19000631_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=19000648;
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=19000674;
    //$LASTPOS=19000678;
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=19000707;
        //$LASTPOS=19000711;
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=19000744;
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=19000791;
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=19000819;
    //$LASTPOS=19000823;
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=19000852;
        //$LASTPOS=19000856;
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=19000889;
            _this.setOn(j,i,_this.mapOnData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
  },
  fiber$initMap :function _trc_func_19000631_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=19000648;
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_19000631_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19000674;
          //$LASTPOS=19000678;
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=19000707;
          //$LASTPOS=19000711;
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=19000744;
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=19000791;
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=19000819;
          //$LASTPOS=19000823;
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=19000852;
          //$LASTPOS=19000856;
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=19000889;
          _this.fiber$setOn(_thread, j, i, _this.mapOnData[i][j]);
          __pc=9;return;
        case 9:
          
          j++;
          __pc=8;break;
        case 10:
          
          i++;
          __pc=7;break;
        case 11:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  load :function _trc_func_19000939_6(dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19000961;
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=19001013;
    if (! _this.baseData) {
      //$LASTPOS=19001027;
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=19001063;
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=19001090;
    _this.mapData=_this.mapTable;
    //$LASTPOS=19001113;
    _this.row=_this.mapTable.length;
    //$LASTPOS=19001139;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=19001168;
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=19001197;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=19001224;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=19001296;
    _this.initMap();
  },
  fiber$load :function _trc_func_19000939_7(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19000961;
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=19001013;
    if (! _this.baseData) {
      //$LASTPOS=19001027;
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=19001063;
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=19001090;
    _this.mapData=_this.mapTable;
    //$LASTPOS=19001113;
    _this.row=_this.mapTable.length;
    //$LASTPOS=19001139;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=19001168;
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=19001197;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=19001224;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_func_19000939_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19001296;
          _this.fiber$initMap(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  set :function _trc_func_19001311_9(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19001339;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=19001407;
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=19001478;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19001512;
    p=Math.floor(p);
    //$LASTPOS=19001534;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19001572;
    if (! _this.pImg) {
      //$LASTPOS=19001594;
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=19001695;
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001772;
    _this.ctx.save();
    //$LASTPOS=19001789;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001933;
    _this.ctx.restore();
  },
  fiber$set :function _trc_func_19001311_10(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19001339;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=19001407;
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=19001478;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19001512;
    p=Math.floor(p);
    //$LASTPOS=19001534;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19001572;
    if (! _this.pImg) {
      //$LASTPOS=19001594;
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=19001695;
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001772;
    _this.ctx.save();
    //$LASTPOS=19001789;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19001933;
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_func_19001952_11(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19001982;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=19002050;
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=19002100;
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=19002135;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=19002169;
    p=Math.floor(p);
    //$LASTPOS=19002191;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=19002229;
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=19002253;
    _this.ctx.save();
    //$LASTPOS=19002270;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=19002414;
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_func_19001952_12(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19001982;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_19001952_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19002050;
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=19002100;
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=19002135;
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=19002169;
          p=Math.floor(p);
          //$LASTPOS=19002191;
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=19002229;
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=19002253;
          _this.ctx.save();
          //$LASTPOS=19002270;
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=19002414;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_func_19002433_14(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002461;
    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setOnAt :function _trc_func_19002433_15(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_19002433_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19002461;
          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setAt :function _trc_func_19002530_17(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002556;
    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setAt :function _trc_func_19002530_18(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_19002530_19(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=19002556;
          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  get :function _trc_func_19002623_20(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002649;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_func_19002623_21(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002649;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getAt :function _trc_func_19002757_22(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getAt :function _trc_func_19002757_23(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  getOn :function _trc_func_19002853_24(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002881;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_func_19002853_25(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002881;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapOnTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getOnAt :function _trc_func_19002991_26(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getOnAt :function _trc_func_19002991_27(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_19003091_28(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19003124;
    _this.sx=- scrollX;
    //$LASTPOS=19003142;
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_func_19003091_29(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19003124;
    _this.sx=- scrollX;
    //$LASTPOS=19003142;
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_19003159_30(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19003177;
    _this.pImg=_this.buf[0];
    //$LASTPOS=19003195;
    ctx.save();
    //$LASTPOS=19003212;
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=19003324;
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_20000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=20000032;
    _this.loadMode=false;
    //$LASTPOS=20000049;
    _this.print("Load Data?: Y or N");
    //$LASTPOS=20000079;
    while (true) {
      //$LASTPOS=20000097;
      if (_this.getkey("y")>0) {
        //$LASTPOS=20000125;
        _this.loadMode=true;
        break;
        
        
      }
      //$LASTPOS=20000168;
      if (_this.getkey("n")>0) {
        //$LASTPOS=20000196;
        _this.loadMode=false;
        break;
        
        
      }
      //$LASTPOS=20000240;
      _this.update();
      
    }
    //$LASTPOS=20000254;
    if (_this.loadMode) {
      //$LASTPOS=20000273;
      _this.fileName=prompt("Input json file (*.json)","map.json");
      //$LASTPOS=20000334;
      if (_this.fileName) {
        //$LASTPOS=20000357;
        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
        
      }
      //$LASTPOS=20000413;
      if (_this.mapDataFile.obj()) {
        //$LASTPOS=20000445;
        _this.baseData=_this.mapDataFile.obj();
        
      } else {
        //$LASTPOS=20000494;
        _this.mapDataFile=_this.file(_this.fileName);
        //$LASTPOS=20000531;
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=20000567;
          _this.baseData=_this.mapDataFile.obj();
          
        }
        
      }
      //$LASTPOS=20000618;
      if (_this.baseData==undefined) {
        //$LASTPOS=20000652;
        _this.print("Load failed");
        //$LASTPOS=20000683;
        _this.loadMode=false;
        
      } else {
        //$LASTPOS=20000710;
        if (_this.baseData[0]&&_this.baseData[1]) {
          //$LASTPOS=20000751;
          _this.mapData=_this.baseData[0];
          //$LASTPOS=20000781;
          _this.mapOnData=_this.baseData[1];
          
        }
      }
      
    }
    //$LASTPOS=20000815;
    _this.update();
    //$LASTPOS=20001093;
    if (! _this.loadMode) {
      //$LASTPOS=20001113;
      _this.row=prompt("input row");
      //$LASTPOS=20001143;
      _this.update();
      //$LASTPOS=20001158;
      _this.col=prompt("input col");
      //$LASTPOS=20001188;
      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
      //$LASTPOS=20001238;
      _this.panel.x=_this.panel.width/2+10;
      //$LASTPOS=20001269;
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=20001298;
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=20001331;
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=20001382;
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
      
    } else {
      //$LASTPOS=20001445;
      if (! _this.mapOnData) {
        //$LASTPOS=20001470;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
        
      } else {
        //$LASTPOS=20001582;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
        
      }
      //$LASTPOS=20001695;
      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
      //$LASTPOS=20001766;
      _this.panel.x=_this.panel.width/2;
      //$LASTPOS=20001794;
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=20001823;
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=20001856;
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      
    }
    //$LASTPOS=20001906;
    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
    //$LASTPOS=20001961;
    _this.counter=0;
    //$LASTPOS=20001973;
    //$LASTPOS=20001977;
    i = 0;
    while(i<16) {
      {
        //$LASTPOS=20002001;
        //$LASTPOS=20002005;
        j = 0;
        while(j<8) {
          {
            //$LASTPOS=20002032;
            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
            //$LASTPOS=20002076;
            _this.counter++;
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=20002098;
    _this.mode="get";
    //$LASTPOS=20002111;
    _this.prevMode="set";
    //$LASTPOS=20002128;
    _this.mapp=0;
    //$LASTPOS=20002137;
    _this.mx=0;
    //$LASTPOS=20002144;
    _this.my=0;
    //$LASTPOS=20002151;
    _this.chipX=0;
    //$LASTPOS=20002161;
    _this.chipY=0;
    //$LASTPOS=20002171;
    _this.x=Tonyu.globals.$screenWidth-16;
    //$LASTPOS=20002191;
    _this.y=Tonyu.globals.$screenHeight-16;
    //$LASTPOS=20002212;
    while (true) {
      //$LASTPOS=20002230;
      _this.p=_this.mapp;
      //$LASTPOS=20002243;
      if (_this.getkey("e")==1) {
        //$LASTPOS=20002272;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=20002306;
        _this.mode="erase";
        //$LASTPOS=20002329;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=20002362;
      if (_this.getkey("s")==1) {
        //$LASTPOS=20002391;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=20002425;
        if (_this.mode=="set") {
          //$LASTPOS=20002455;
          _this.mode="setOn";
          
        } else {
          //$LASTPOS=20002498;
          _this.mode="set";
          
        }
        //$LASTPOS=20002530;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=20002563;
      if (_this.getkey("o")==1) {
        //$LASTPOS=20002592;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=20002626;
        _this.mode="setOn";
        
      }
      //$LASTPOS=20002652;
      if (_this.getkey("g")==1) {
        //$LASTPOS=20002681;
        if (_this.mode!="get") {
          //$LASTPOS=20002711;
          _this.prevMode=_this.mode;
          //$LASTPOS=20002739;
          Tonyu.globals.$mp.scrollTo(0,0);
          //$LASTPOS=20002771;
          _this.mode="get";
          //$LASTPOS=20002796;
          _this.chipX=0;
          //$LASTPOS=20002818;
          _this.chipY=0;
          
        } else {
          //$LASTPOS=20002856;
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=20002894;
          _this.mode=_this.prevMode;
          
        }
        //$LASTPOS=20002929;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=20002962;
      if (_this.getkey("p")==1) {
        //$LASTPOS=20003006;
        _this.saveFileName=prompt("input json file(*.json)","map.json");
        //$LASTPOS=20003495;
        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
        //$LASTPOS=20003553;
        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
        //$LASTPOS=20003668;
        _this.saveDataFile.obj(_this.data);
        //$LASTPOS=20003701;
        _this.print(_this.saveFileName+" Saved");
        
      }
      //$LASTPOS=20003793;
      if (_this.getkey("c")==1) {
        //$LASTPOS=20003822;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=20003856;
        _this.mode="spuit";
        //$LASTPOS=20003879;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=20003912;
      if (_this.mode!="get") {
        //$LASTPOS=20003938;
        if (_this.getkey("left")>0) {
          //$LASTPOS=20003959;
          _this.mx=_this.mx+8;
        }
        //$LASTPOS=20003977;
        if (_this.getkey("right")>0) {
          //$LASTPOS=20003999;
          _this.mx=_this.mx-8;
        }
        //$LASTPOS=20004017;
        if (_this.getkey("up")>0) {
          //$LASTPOS=20004036;
          _this.my=_this.my+8;
        }
        //$LASTPOS=20004054;
        if (_this.getkey("down")>0) {
          //$LASTPOS=20004075;
          _this.my=_this.my-8;
        }
        //$LASTPOS=20004093;
        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
        
      } else {
        //$LASTPOS=20004136;
        if (_this.getkey("left")>0) {
          //$LASTPOS=20004157;
          _this.chipX=_this.chipX+8;
        }
        //$LASTPOS=20004181;
        if (_this.getkey("right")>0) {
          //$LASTPOS=20004203;
          _this.chipX=_this.chipX-8;
        }
        //$LASTPOS=20004227;
        if (_this.getkey("up")>0) {
          //$LASTPOS=20004246;
          _this.chipY=_this.chipY+8;
        }
        //$LASTPOS=20004270;
        if (_this.getkey("down")>0) {
          //$LASTPOS=20004291;
          _this.chipY=_this.chipY-8;
        }
        //$LASTPOS=20004315;
        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
        
      }
      //$LASTPOS=20004354;
      _this.panel.x=_this.panel.width/2-_this.mx;
      //$LASTPOS=20004385;
      _this.panel.y=_this.panel.height/2-_this.my;
      //$LASTPOS=20004417;
      if (_this.mode=="set"&&_this.getkey(1)>0) {
        //$LASTPOS=20004458;
        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
        //$LASTPOS=20004507;
        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
        
      } else {
        //$LASTPOS=20004558;
        if (_this.mode=="erase"&&_this.getkey(1)>0) {
          //$LASTPOS=20004601;
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=20004650;
          if (_this.mode=="get"&&_this.getkey(1)>0) {
            //$LASTPOS=20004691;
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=20004745;
            _this.mode=_this.prevMode;
            //$LASTPOS=20004769;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=20004803;
            _this.print(_this.mode+" mode");
            //$LASTPOS=20004833;
            _this.updateEx(10);
            
          } else {
            //$LASTPOS=20004858;
            if (_this.mode=="setOn"&&_this.getkey(1)>0) {
              //$LASTPOS=20004901;
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=20004954;
              if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                //$LASTPOS=20004997;
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=20005046;
                _this.mode="set";
                //$LASTPOS=20005067;
                _this.print(_this.mode+" mode");
                //$LASTPOS=20005097;
                _this.updateEx(10);
                
              }
            }
          }
        }
      }
      //$LASTPOS=20005123;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_20000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=20000032;
    _this.loadMode=false;
    //$LASTPOS=20000049;
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_func_20000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20000079;
        case 1:
          //$LASTPOS=20000097;
          if (!(_this.getkey("y")>0)) { __pc=2; break; }
          //$LASTPOS=20000125;
          _this.loadMode=true;
          __pc=5; break;
          
        case 2:
          
          //$LASTPOS=20000168;
          if (!(_this.getkey("n")>0)) { __pc=3; break; }
          //$LASTPOS=20000196;
          _this.loadMode=false;
          __pc=5; break;
          
        case 3:
          
          //$LASTPOS=20000240;
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          //$LASTPOS=20000254;
          if (!(_this.loadMode)) { __pc=9; break; }
          //$LASTPOS=20000273;
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=20000334;
          if (_this.fileName) {
            //$LASTPOS=20000357;
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=20000413;
          if (!(_this.mapDataFile.obj())) { __pc=6; break; }
          {
            //$LASTPOS=20000445;
            _this.baseData=_this.mapDataFile.obj();
          }
          __pc=8;break;
        case 6:
          //$LASTPOS=20000494;
          _this.fiber$file(_thread, _this.fileName);
          __pc=7;return;
        case 7:
          _this.mapDataFile=_thread.retVal;
          
          //$LASTPOS=20000531;
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=20000567;
            _this.baseData=_this.mapDataFile.obj();
            
          }
        case 8:
          
          //$LASTPOS=20000618;
          if (_this.baseData==undefined) {
            //$LASTPOS=20000652;
            _this.print("Load failed");
            //$LASTPOS=20000683;
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=20000710;
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=20000751;
              _this.mapData=_this.baseData[0];
              //$LASTPOS=20000781;
              _this.mapOnData=_this.baseData[1];
              
            }
          }
        case 9:
          
          //$LASTPOS=20000815;
          _this.fiber$update(_thread);
          __pc=10;return;
        case 10:
          
          //$LASTPOS=20001093;
          if (!(! _this.loadMode)) { __pc=12; break; }
          //$LASTPOS=20001113;
          _this.row=prompt("input row");
          //$LASTPOS=20001143;
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=20001158;
          _this.col=prompt("input col");
          //$LASTPOS=20001188;
          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
          //$LASTPOS=20001238;
          _this.panel.x=_this.panel.width/2+10;
          //$LASTPOS=20001269;
          _this.panel.y=_this.panel.height/2;
          //$LASTPOS=20001298;
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=20001331;
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=20001382;
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
          __pc=13;break;
        case 12:
          {
            //$LASTPOS=20001445;
            if (! _this.mapOnData) {
              //$LASTPOS=20001470;
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
              
            } else {
              //$LASTPOS=20001582;
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
              
            }
            //$LASTPOS=20001695;
            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
            //$LASTPOS=20001766;
            _this.panel.x=_this.panel.width/2;
            //$LASTPOS=20001794;
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=20001823;
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=20001856;
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          }
        case 13:
          
          //$LASTPOS=20001906;
          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
          //$LASTPOS=20001961;
          _this.counter=0;
          //$LASTPOS=20001973;
          //$LASTPOS=20001977;
          i = 0;
          while(i<16) {
            {
              //$LASTPOS=20002001;
              //$LASTPOS=20002005;
              j = 0;
              while(j<8) {
                {
                  //$LASTPOS=20002032;
                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                  //$LASTPOS=20002076;
                  _this.counter++;
                }
                j++;
              }
            }
            i++;
          }
          //$LASTPOS=20002098;
          _this.mode="get";
          //$LASTPOS=20002111;
          _this.prevMode="set";
          //$LASTPOS=20002128;
          _this.mapp=0;
          //$LASTPOS=20002137;
          _this.mx=0;
          //$LASTPOS=20002144;
          _this.my=0;
          //$LASTPOS=20002151;
          _this.chipX=0;
          //$LASTPOS=20002161;
          _this.chipY=0;
          //$LASTPOS=20002171;
          _this.x=Tonyu.globals.$screenWidth-16;
          //$LASTPOS=20002191;
          _this.y=Tonyu.globals.$screenHeight-16;
          //$LASTPOS=20002212;
        case 14:
          //$LASTPOS=20002230;
          _this.p=_this.mapp;
          //$LASTPOS=20002243;
          if (_this.getkey("e")==1) {
            //$LASTPOS=20002272;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=20002306;
            _this.mode="erase";
            //$LASTPOS=20002329;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=20002362;
          if (_this.getkey("s")==1) {
            //$LASTPOS=20002391;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=20002425;
            if (_this.mode=="set") {
              //$LASTPOS=20002455;
              _this.mode="setOn";
              
            } else {
              //$LASTPOS=20002498;
              _this.mode="set";
              
            }
            //$LASTPOS=20002530;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=20002563;
          if (_this.getkey("o")==1) {
            //$LASTPOS=20002592;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=20002626;
            _this.mode="setOn";
            
          }
          //$LASTPOS=20002652;
          if (_this.getkey("g")==1) {
            //$LASTPOS=20002681;
            if (_this.mode!="get") {
              //$LASTPOS=20002711;
              _this.prevMode=_this.mode;
              //$LASTPOS=20002739;
              Tonyu.globals.$mp.scrollTo(0,0);
              //$LASTPOS=20002771;
              _this.mode="get";
              //$LASTPOS=20002796;
              _this.chipX=0;
              //$LASTPOS=20002818;
              _this.chipY=0;
              
            } else {
              //$LASTPOS=20002856;
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=20002894;
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=20002929;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=20002962;
          if (_this.getkey("p")==1) {
            //$LASTPOS=20003006;
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            //$LASTPOS=20003495;
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=20003553;
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
            //$LASTPOS=20003668;
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=20003701;
            _this.print(_this.saveFileName+" Saved");
            
          }
          //$LASTPOS=20003793;
          if (_this.getkey("c")==1) {
            //$LASTPOS=20003822;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=20003856;
            _this.mode="spuit";
            //$LASTPOS=20003879;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=20003912;
          if (_this.mode!="get") {
            //$LASTPOS=20003938;
            if (_this.getkey("left")>0) {
              //$LASTPOS=20003959;
              _this.mx=_this.mx+8;
            }
            //$LASTPOS=20003977;
            if (_this.getkey("right")>0) {
              //$LASTPOS=20003999;
              _this.mx=_this.mx-8;
            }
            //$LASTPOS=20004017;
            if (_this.getkey("up")>0) {
              //$LASTPOS=20004036;
              _this.my=_this.my+8;
            }
            //$LASTPOS=20004054;
            if (_this.getkey("down")>0) {
              //$LASTPOS=20004075;
              _this.my=_this.my-8;
            }
            //$LASTPOS=20004093;
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            
          } else {
            //$LASTPOS=20004136;
            if (_this.getkey("left")>0) {
              //$LASTPOS=20004157;
              _this.chipX=_this.chipX+8;
            }
            //$LASTPOS=20004181;
            if (_this.getkey("right")>0) {
              //$LASTPOS=20004203;
              _this.chipX=_this.chipX-8;
            }
            //$LASTPOS=20004227;
            if (_this.getkey("up")>0) {
              //$LASTPOS=20004246;
              _this.chipY=_this.chipY+8;
            }
            //$LASTPOS=20004270;
            if (_this.getkey("down")>0) {
              //$LASTPOS=20004291;
              _this.chipY=_this.chipY-8;
            }
            //$LASTPOS=20004315;
            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
            
          }
          //$LASTPOS=20004354;
          _this.panel.x=_this.panel.width/2-_this.mx;
          //$LASTPOS=20004385;
          _this.panel.y=_this.panel.height/2-_this.my;
          //$LASTPOS=20004417;
          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
          {
            //$LASTPOS=20004458;
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=20004507;
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=25;break;
        case 15:
          //$LASTPOS=20004558;
          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
          {
            //$LASTPOS=20004601;
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=24;break;
        case 16:
          //$LASTPOS=20004650;
          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
          //$LASTPOS=20004691;
          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
          //$LASTPOS=20004745;
          _this.mode=_this.prevMode;
          //$LASTPOS=20004769;
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=20004803;
          _this.print(_this.mode+" mode");
          //$LASTPOS=20004833;
          _this.fiber$updateEx(_thread, 10);
          __pc=17;return;
        case 17:
          
          __pc=23;break;
        case 18:
          //$LASTPOS=20004858;
          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
          {
            //$LASTPOS=20004901;
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          }
          __pc=22;break;
        case 19:
          //$LASTPOS=20004954;
          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
          //$LASTPOS=20004997;
          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
          //$LASTPOS=20005046;
          _this.mode="set";
          //$LASTPOS=20005067;
          _this.print(_this.mode+" mode");
          //$LASTPOS=20005097;
          _this.fiber$updateEx(_thread, 10);
          __pc=20;return;
        case 20:
          
        case 21:
          
        case 22:
          
        case 23:
          
        case 24:
          
        case 25:
          
          //$LASTPOS=20005123;
          _this.fiber$update(_thread);
          __pc=26;return;
        case 26:
          
          __pc=14;break;
        case 27:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MapEditor,{"fullName":"kernel.MapEditor","namespace":"kernel","shortName":"MapEditor","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Pad=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_21000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001202;
    _this.APAD_DIAG_SIZE=96;
    //$LASTPOS=21003465;
    while (true) {
      //$LASTPOS=21003484;
      _this.padUpdate();
      //$LASTPOS=21003502;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_21000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21001202;
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_func_21000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21003465;
        case 1:
          //$LASTPOS=21003484;
          _this.fiber$padUpdate(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=21003502;
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
  initialize :function _trc_func_21000016_3(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000033;
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=21000050;
    _this.padImageP=Tonyu.globals.$pat_inputPad;
    //$LASTPOS=21000082;
    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000183;
    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000292;
    _this.jujiKey.show();
    //$LASTPOS=21000313;
    _this.no1Key.show();
    //$LASTPOS=21000339;
    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000446;
    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000553;
    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000660;
    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000767;
    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=21000879;
    _this.jujiKeyPushU.hide();
    //$LASTPOS=21000905;
    _this.jujiKeyPushL.hide();
    //$LASTPOS=21000931;
    _this.jujiKeyPushR.hide();
    //$LASTPOS=21000957;
    _this.jujiKeyPushD.hide();
    //$LASTPOS=21000983;
    _this.jujiKeyPush1.hide();
  },
  die :function _trc_func_21001008_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001021;
    _this.jujiKey.die();
    //$LASTPOS=21001041;
    _this.no1Key.die();
    //$LASTPOS=21001060;
    _this.jujiKeyPushU.die();
    //$LASTPOS=21001085;
    _this.jujiKeyPushL.die();
    //$LASTPOS=21001110;
    _this.jujiKeyPushR.die();
    //$LASTPOS=21001135;
    _this.jujiKeyPushD.die();
    //$LASTPOS=21001160;
    _this.jujiKeyPush1.die();
    //$LASTPOS=21001185;
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  padUpdate :function _trc_func_21001224_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var t;
    
    //$LASTPOS=21001258;
    _this.keyPushL=0;
    //$LASTPOS=21001277;
    _this.keyPushR=0;
    //$LASTPOS=21001296;
    _this.keyPushU=0;
    //$LASTPOS=21001315;
    _this.keyPushD=0;
    //$LASTPOS=21001334;
    _this.keyPush1=0;
    //$LASTPOS=21001359;
    _this.padKeyNotapCnt++;
    //$LASTPOS=21001383;
    //$LASTPOS=21001388;
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=21001436;
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=21001466;
        if (t.touched) {
          //$LASTPOS=21001496;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=21001593;
            _this.keyPushU=1;
          }
          //$LASTPOS=21001620;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=21001717;
            _this.keyPushD=1;
          }
          //$LASTPOS=21001744;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=21001841;
            _this.keyPushL=1;
          }
          //$LASTPOS=21001868;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=21001965;
            _this.keyPushR=1;
          }
          //$LASTPOS=21001992;
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=21002054;
            _this.keyPush1=1;
          }
          //$LASTPOS=21002081;
          _this.padKeySW=1;
          //$LASTPOS=21002108;
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=21002173;
    if (_this.keyPushL) {
      //$LASTPOS=21002187;
      _this.keyCntL++;
    } else {
      //$LASTPOS=21002204;
      _this.keyCntL=0;
    }
    //$LASTPOS=21002222;
    if (_this.keyPushR) {
      //$LASTPOS=21002236;
      _this.keyCntR++;
    } else {
      //$LASTPOS=21002253;
      _this.keyCntR=0;
    }
    //$LASTPOS=21002271;
    if (_this.keyPushU) {
      //$LASTPOS=21002285;
      _this.keyCntU++;
    } else {
      //$LASTPOS=21002302;
      _this.keyCntU=0;
    }
    //$LASTPOS=21002320;
    if (_this.keyPushD) {
      //$LASTPOS=21002334;
      _this.keyCntD++;
    } else {
      //$LASTPOS=21002351;
      _this.keyCntD=0;
    }
    //$LASTPOS=21002369;
    if (_this.keyPush1) {
      //$LASTPOS=21002383;
      _this.keyCnt1++;
    } else {
      //$LASTPOS=21002400;
      _this.keyCnt1=0;
    }
    //$LASTPOS=21002435;
    if (_this.keyPushL) {
      //$LASTPOS=21002449;
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=21002475;
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=21002501;
    if (_this.keyPushR) {
      //$LASTPOS=21002515;
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=21002541;
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=21002567;
    if (_this.keyPushU) {
      //$LASTPOS=21002581;
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=21002607;
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=21002633;
    if (_this.keyPushD) {
      //$LASTPOS=21002647;
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=21002673;
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=21002699;
    if (_this.keyPush1) {
      //$LASTPOS=21002713;
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=21002739;
      _this.jujiKeyPush1.hide();
    }
  },
  fiber$padUpdate :function _trc_func_21001224_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var t;
    
    //$LASTPOS=21001258;
    _this.keyPushL=0;
    //$LASTPOS=21001277;
    _this.keyPushR=0;
    //$LASTPOS=21001296;
    _this.keyPushU=0;
    //$LASTPOS=21001315;
    _this.keyPushD=0;
    //$LASTPOS=21001334;
    _this.keyPush1=0;
    //$LASTPOS=21001359;
    _this.padKeyNotapCnt++;
    //$LASTPOS=21001383;
    //$LASTPOS=21001388;
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=21001436;
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=21001466;
        if (t.touched) {
          //$LASTPOS=21001496;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=21001593;
            _this.keyPushU=1;
          }
          //$LASTPOS=21001620;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=21001717;
            _this.keyPushD=1;
          }
          //$LASTPOS=21001744;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=21001841;
            _this.keyPushL=1;
          }
          //$LASTPOS=21001868;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=21001965;
            _this.keyPushR=1;
          }
          //$LASTPOS=21001992;
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=21002054;
            _this.keyPush1=1;
          }
          //$LASTPOS=21002081;
          _this.padKeySW=1;
          //$LASTPOS=21002108;
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=21002173;
    if (_this.keyPushL) {
      //$LASTPOS=21002187;
      _this.keyCntL++;
    } else {
      //$LASTPOS=21002204;
      _this.keyCntL=0;
    }
    //$LASTPOS=21002222;
    if (_this.keyPushR) {
      //$LASTPOS=21002236;
      _this.keyCntR++;
    } else {
      //$LASTPOS=21002253;
      _this.keyCntR=0;
    }
    //$LASTPOS=21002271;
    if (_this.keyPushU) {
      //$LASTPOS=21002285;
      _this.keyCntU++;
    } else {
      //$LASTPOS=21002302;
      _this.keyCntU=0;
    }
    //$LASTPOS=21002320;
    if (_this.keyPushD) {
      //$LASTPOS=21002334;
      _this.keyCntD++;
    } else {
      //$LASTPOS=21002351;
      _this.keyCntD=0;
    }
    //$LASTPOS=21002369;
    if (_this.keyPush1) {
      //$LASTPOS=21002383;
      _this.keyCnt1++;
    } else {
      //$LASTPOS=21002400;
      _this.keyCnt1=0;
    }
    //$LASTPOS=21002435;
    if (_this.keyPushL) {
      //$LASTPOS=21002449;
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=21002475;
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=21002501;
    if (_this.keyPushR) {
      //$LASTPOS=21002515;
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=21002541;
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=21002567;
    if (_this.keyPushU) {
      //$LASTPOS=21002581;
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=21002607;
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=21002633;
    if (_this.keyPushD) {
      //$LASTPOS=21002647;
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=21002673;
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=21002699;
    if (_this.keyPush1) {
      //$LASTPOS=21002713;
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=21002739;
      _this.jujiKeyPush1.hide();
    }
    
    _thread.retVal=_this;return;
  },
  getPadUp :function _trc_func_21002772_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getPadUp :function _trc_func_21002772_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadDown :function _trc_func_21002808_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getPadDown :function _trc_func_21002808_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadLeft :function _trc_func_21002844_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getPadLeft :function _trc_func_21002844_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadRight :function _trc_func_21002880_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getPadRight :function _trc_func_21002880_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadButton :function _trc_func_21002916_15(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=21002940;
    value;
    //$LASTPOS=21002956;
    if (i==0) {
      //$LASTPOS=21002968;
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_func_21002916_16(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=21002940;
    value;
    //$LASTPOS=21002956;
    if (i==0) {
      //$LASTPOS=21002968;
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  getUp :function _trc_func_21003010_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getUp :function _trc_func_21003010_18(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getDown :function _trc_func_21003043_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getDown :function _trc_func_21003043_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getLeft :function _trc_func_21003076_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getLeft :function _trc_func_21003076_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getRight :function _trc_func_21003109_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getRight :function _trc_func_21003109_24(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getButton :function _trc_func_21003142_25(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=21003163;
    value;
    //$LASTPOS=21003179;
    if (i==0) {
      //$LASTPOS=21003191;
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_func_21003142_26(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=21003163;
    value;
    //$LASTPOS=21003179;
    if (i==0) {
      //$LASTPOS=21003191;
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRect :function _trc_func_21003243_27(mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
  },
  fiber$isOnRect :function _trc_func_21003243_28(_thread,mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRectWH :function _trc_func_21003357_29(mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
  },
  fiber$isOnRectWH :function _trc_func_21003357_30(_thread,mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Pad,{"fullName":"kernel.Pad","namespace":"kernel","shortName":"Pad","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"die":{"nowait":true},"padUpdate":{"nowait":false},"getPadUp":{"nowait":false},"getPadDown":{"nowait":false},"getPadLeft":{"nowait":false},"getPadRight":{"nowait":false},"getPadButton":{"nowait":false},"getUp":{"nowait":false},"getDown":{"nowait":false},"getLeft":{"nowait":false},"getRight":{"nowait":false},"getButton":{"nowait":false},"isOnRect":{"nowait":false},"isOnRectWH":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Panel=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_22000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_22000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_22000056_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000072;
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=22000089;
    _this.width=_this.width;
    //$LASTPOS=22000112;
    _this.height=_this.height;
    //$LASTPOS=22000137;
    if (_this.align==null) {
      //$LASTPOS=22000153;
      _this.align="center";
    }
    //$LASTPOS=22000174;
    if (_this.alpha==null) {
      //$LASTPOS=22000190;
      _this.alpha=255;
    }
    //$LASTPOS=22000206;
    if (_this._drawn==null) {
      //$LASTPOS=22000223;
      _this._drawn=false;
    }
    //$LASTPOS=22000242;
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_func_22000284_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000314;
    _this.width=width;
    //$LASTPOS=22000337;
    _this.height=height;
    //$LASTPOS=22000362;
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_func_22000284_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000314;
    _this.width=width;
    //$LASTPOS=22000337;
    _this.height=height;
    //$LASTPOS=22000362;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_func_22000404_5(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000432;
    _this.setPanel(width,height);
  },
  fiber$resize :function _trc_func_22000404_6(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000404_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000432;
          _this.fiber$setPanel(_thread, width, height);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getContext :function _trc_func_22000460_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000480;
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_func_22000460_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000480;
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_func_22000534_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000561;
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_func_22000534_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000561;
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_func_22000587_12(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000629;
    _this.ctx=_this.getContext();
    //$LASTPOS=22000652;
    _this.ctx.save();
    //$LASTPOS=22000719;
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=22000749;
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=22000794;
    _this.ctx.restore();
  },
  fiber$fillRect :function _trc_func_22000587_13(_thread,x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000587_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000629;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=22000652;
          _this.ctx.save();
          //$LASTPOS=22000719;
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=22000749;
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=22000794;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_func_22000813_15(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000850;
    _this.ctx=_this.getContext();
    //$LASTPOS=22000873;
    _this.ctx.save();
    //$LASTPOS=22000940;
    _this.ctx.textAlign=align;
    //$LASTPOS=22000968;
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=22000998;
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=22001037;
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=22001066;
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_func_22000813_16(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000813_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000850;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=22000873;
          _this.ctx.save();
          //$LASTPOS=22000940;
          _this.ctx.textAlign=align;
          //$LASTPOS=22000968;
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=22000998;
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=22001037;
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=22001066;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_func_22001085_18(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001131;
    _this.ctx=_this.getContext();
    //$LASTPOS=22001154;
    _this.ctx.save();
    //$LASTPOS=22001171;
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=22001220;
    _this.ctx.restore();
  },
  fiber$clearRect :function _trc_func_22001085_19(_thread,clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22001085_20(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22001131;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=22001154;
          _this.ctx.save();
          //$LASTPOS=22001171;
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=22001220;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_func_22001239_21(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001266;
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=22001365;
      _this.ctx=_this.getContext();
      //$LASTPOS=22001392;
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=22001444;
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=22001584;
      _this.colordata=[0,0,0,0];
      
    }
    return (_this.colordata);
  },
  fiber$getPixel :function _trc_func_22001239_22(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22001239_23(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22001266;
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=22001365;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=22001392;
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=22001444;
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=22001584;
            _this.colordata=[0,0,0,0];
          }
        case 3:
          
          _thread.exit((_this.colordata));return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  scroll :function _trc_func_22001640_24(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001671;
    _this.ctx=_this.getContext();
    //$LASTPOS=22001694;
    _this.ctx.save();
    //$LASTPOS=22001711;
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=22001772;
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=22001806;
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=22001858;
    _this.ctx.restore();
  },
  fiber$scroll :function _trc_func_22001640_25(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22001640_26(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22001671;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=22001694;
          _this.ctx.save();
          //$LASTPOS=22001711;
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=22001772;
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=22001806;
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=22001858;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_22001877_27(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001894;
    if (_this._drawn) {
      //$LASTPOS=22001915;
      _this.pImg=_this.buf[0];
      //$LASTPOS=22001937;
      ctx.save();
      //$LASTPOS=22001958;
      if (_this.align=="left") {
        //$LASTPOS=22001990;
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=22002042;
        if (_this.align=="center") {
          //$LASTPOS=22002076;
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=22002111;
          if (_this.align=="right") {
            //$LASTPOS=22002144;
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=22002201;
      if (_this.rotation!=0) {
        //$LASTPOS=22002236;
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=22002304;
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=22002361;
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=22002402;
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=22002506;
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_23000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_23000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_23000047_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=23000066;
    if (Tonyu.runMode) {
      //$LASTPOS=23000096;
      thg = _this.currentThreadGroup();
      //$LASTPOS=23000135;
      if (thg) {
        //$LASTPOS=23000144;
        _this._th=thg.addObj(_this,"tMain");
      }
      //$LASTPOS=23000183;
      _this.initSprite();
      
    }
    //$LASTPOS=23000209;
    if (typeof  x=="object") {
      //$LASTPOS=23000233;
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=23000266;
      if (typeof  x=="number") {
        //$LASTPOS=23000301;
        _this.x=x;
        //$LASTPOS=23000320;
        _this.y=y;
        //$LASTPOS=23000339;
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_func_23000360_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000376;
    _this.onDraw();
    //$LASTPOS=23000391;
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=23000422;
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_func_23000441_4(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000463;
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_23000441_5(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000463;
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  onDraw :function _trc_func_23000484_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onDraw :function _trc_func_23000484_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_23000506_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000523;
    _this.onUpdate();
    //$LASTPOS=23000540;
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_func_23000506_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000523;
    _this.onUpdate();
    
    _thread.enter(function _trc_func_23000506_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000540;
          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_func_23000560_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  initSprite :function _trc_func_23000584_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000605;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=23000657;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=23000695;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=23000727;
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_23000584_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000605;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=23000657;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=23000695;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_23000584_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000727;
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  tMain :function _trc_func_23000743_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000759;
    _this.main();
    //$LASTPOS=23000772;
    _this.die();
  },
  fiber$tMain :function _trc_func_23000743_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23000743_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000759;
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=23000772;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  color :function _trc_func_23000783_18(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_23000783_19(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_23000845_20(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=23000881;
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=23000906;
    if (! size) {
      //$LASTPOS=23000917;
      size=15;
    }
    //$LASTPOS=23000931;
    if (! col) {
      //$LASTPOS=23000941;
      col="cyan";
    }
    //$LASTPOS=23000958;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=23001012;
    if (tp.length>0) {
      //$LASTPOS=23001040;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=23001119;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_23000845_21(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=23000881;
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=23000906;
    if (! size) {
      //$LASTPOS=23000917;
      size=15;
    }
    //$LASTPOS=23000931;
    if (! col) {
      //$LASTPOS=23000941;
      col="cyan";
    }
    //$LASTPOS=23000958;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=23001012;
    if (tp.length>0) {
      //$LASTPOS=23001040;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=23001119;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_23001174_22(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=23001206;
    if (! col) {
      //$LASTPOS=23001216;
      col="white";
    }
    //$LASTPOS=23001234;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=23001288;
    if (tp.length>0) {
      //$LASTPOS=23001316;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=23001367;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_23001174_23(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=23001206;
    if (! col) {
      //$LASTPOS=23001216;
      col="white";
    }
    //$LASTPOS=23001234;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=23001288;
    if (tp.length>0) {
      //$LASTPOS=23001316;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=23001367;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  appear :function _trc_func_23001407_24(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return t;
  },
  fiber$appear :function _trc_func_23001407_25(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=t;return;
    
    
    _thread.retVal=_this;return;
  },
  trunc :function _trc_func_23001439_26(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.trunc(f);
  },
  loadPage :function _trc_func_23001482_27(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001508;
    _this.all().die();
    //$LASTPOS=23001526;
    new page(arg);
    //$LASTPOS=23001546;
    _this.die();
  },
  fiber$loadPage :function _trc_func_23001482_28(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23001508;
    _this.all().die();
    //$LASTPOS=23001526;
    new page(arg);
    //$LASTPOS=23001546;
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_24000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_24000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_24000077_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000095;
    _this.extend(opt);
    //$LASTPOS=24000142;
    _this.resize(_this.width,_this.height);
    //$LASTPOS=24000170;
    _this.cw=_this.canvas.width();
    //$LASTPOS=24000194;
    _this.ch=_this.canvas.height();
    //$LASTPOS=24000219;
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=24000257;
    _this.color="rgb(20,80,180)";
    //$LASTPOS=24000291;
    _this.sx=0;
    //$LASTPOS=24000302;
    _this.sy=0;
    //$LASTPOS=24000313;
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_func_24000349_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000378;
    _this.width=width;
    //$LASTPOS=24000401;
    _this.height=height;
    //$LASTPOS=24000426;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=24000469;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=24000505;
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=24000530;
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=24000557;
    if (Tonyu.globals.$panel) {
      //$LASTPOS=24000578;
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_func_24000349_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000378;
    _this.width=width;
    //$LASTPOS=24000401;
    _this.height=height;
    //$LASTPOS=24000426;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=24000469;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=24000505;
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=24000530;
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=24000557;
    if (Tonyu.globals.$panel) {
      //$LASTPOS=24000578;
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_func_24000634_5(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=24000712;
    larger = 200;
    //$LASTPOS=24000733;
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_func_24000634_6(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=24000712;
    larger = 200;
    //$LASTPOS=24000733;
    smaller = 5;
    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_24000853_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=24000868;
    _this.cw=_this.canvas.width();
    //$LASTPOS=24000892;
    _this.ch=_this.canvas.height();
    //$LASTPOS=24000917;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=24000961;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=24001005;
    if (calch>_this.ch) {
      //$LASTPOS=24001019;
      calch=_this.ch;
    }
    //$LASTPOS=24001034;
    if (calcw>_this.cw) {
      //$LASTPOS=24001048;
      calcw=_this.cw;
    }
    //$LASTPOS=24001063;
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=24001095;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=24001151;
      calcw=_this.width;
      //$LASTPOS=24001163;
      calch=_this.height;
      
    }
    //$LASTPOS=24001189;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=24001232;
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=24001275;
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_func_24001364_8(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=24001390;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=24001434;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=24001478;
    if (calch>_this.ch) {
      //$LASTPOS=24001492;
      calch=_this.ch;
    }
    //$LASTPOS=24001507;
    if (calcw>_this.cw) {
      //$LASTPOS=24001521;
      calcw=_this.cw;
    }
    //$LASTPOS=24001536;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=24001592;
      calcw=_this.width;
      //$LASTPOS=24001604;
      calch=_this.height;
      
    }
    //$LASTPOS=24001630;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=24001673;
    marginh = Math.floor((_this.ch-calch)/2);
    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
  },
  fiber$canvas2buf :function _trc_func_24001364_9(_thread,point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=24001390;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=24001434;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=24001478;
    if (calch>_this.ch) {
      //$LASTPOS=24001492;
      calch=_this.ch;
    }
    //$LASTPOS=24001507;
    if (calcw>_this.cw) {
      //$LASTPOS=24001521;
      calcw=_this.cw;
    }
    //$LASTPOS=24001536;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=24001592;
      calcw=_this.width;
      //$LASTPOS=24001604;
      calch=_this.height;
      
    }
    //$LASTPOS=24001630;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=24001673;
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_24001810_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24001835;
    _this.color=color;
  },
  fiber$setBGColor :function _trc_func_24001810_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24001835;
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_func_24001857_12(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=24001879;
    ctx = cv.getContext("2d");
    //$LASTPOS=24001913;
    ctx.save();
    //$LASTPOS=24001930;
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=24001964;
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=24001990;
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=24002033;
    if (_this.isDrawGrid) {
      //$LASTPOS=24002049;
      _this.drawGrid(cv);
    }
    //$LASTPOS=24002068;
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_func_24001857_13(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=24001879;
    ctx = cv.getContext("2d");
    //$LASTPOS=24001913;
    ctx.save();
    //$LASTPOS=24001930;
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=24001964;
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=24001990;
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=24002033;
    if (_this.isDrawGrid) {
      //$LASTPOS=24002049;
      _this.drawGrid(cv);
    }
    //$LASTPOS=24002068;
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_24002087_14(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24002412;
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_func_24002087_15(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24002412;
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_25000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_25000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_25000022_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_26000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_26000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_26000022_2(x,y,p,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000043;
    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
    //$LASTPOS=26000062;
    _this.f=f;
    //$LASTPOS=26000077;
    if (! _this.x) {
      //$LASTPOS=26000090;
      _this.x=0;
    }
    //$LASTPOS=26000105;
    if (! _this.y) {
      //$LASTPOS=26000118;
      _this.y=0;
    }
    //$LASTPOS=26000133;
    if (! _this.p) {
      //$LASTPOS=26000146;
      _this.p=0;
    }
  },
  draw :function _trc_func_26000160_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000176;
    if (_this.f) {
      //$LASTPOS=26000194;
      if (! _this.scaleY) {
        //$LASTPOS=26000207;
        _this.scaleY=_this.scaleX;
      }
      //$LASTPOS=26000231;
      _this.scaleX*=- 1;
      
    }
    //$LASTPOS=26000255;
    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=26000275;
    if (_this.f) {
      //$LASTPOS=26000282;
      _this.scaleX*=- 1;
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_27000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_27000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_27000031_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000045;
    _this.sprites=[];
    //$LASTPOS=27000062;
    _this.imageList=[];
    //$LASTPOS=27000081;
    _this.hitWatchers=[];
    //$LASTPOS=27000102;
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=27000136;
    _this.sx=0;
    //$LASTPOS=27000147;
    _this.sy=0;
    //$LASTPOS=27000158;
    _this.objId=0;
  },
  add :function _trc_func_27000171_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000194;
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=27000231;
    _this.sprites.push(s);
    //$LASTPOS=27000253;
    if (s.__genId==null) {
      //$LASTPOS=27000283;
      s.__genId=_this.objId;
      //$LASTPOS=27000309;
      _this.objId++;
      
    }
    //$LASTPOS=27000330;
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_func_27000171_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27000194;
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=27000231;
    _this.sprites.push(s);
    //$LASTPOS=27000253;
    if (s.__genId==null) {
      //$LASTPOS=27000283;
      s.__genId=_this.objId;
      //$LASTPOS=27000309;
      _this.objId++;
      
    }
    //$LASTPOS=27000330;
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_func_27000374_5(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=27000400;
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=27000433;
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=27000457;
    _this.sprites.splice(idx,1);
    //$LASTPOS=27000485;
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_func_27000374_6(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=27000400;
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=27000433;
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=27000457;
    _this.sprites.splice(idx,1);
    //$LASTPOS=27000485;
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_func_27000516_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000534;
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_func_27000516_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27000534;
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_func_27000570_9(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=27000607;
    val1 = obj1.zOrder;
    //$LASTPOS=27000634;
    val2 = obj2.zOrder;
    //$LASTPOS=27000661;
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=27000707;
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=27000752;
        if (val1==val2) {
          //$LASTPOS=27000777;
          if (obj1.__genId>obj2.__genId) {
            return 1;
            
          } else {
            return - 1;
            
          }
          return 0;
          
        }
      }
    }
  },
  fiber$compOrder :function _trc_func_27000570_10(_thread,obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var val1;
    var val2;
    
    //$LASTPOS=27000607;
    val1 = obj1.zOrder;
    //$LASTPOS=27000634;
    val2 = obj2.zOrder;
    //$LASTPOS=27000661;
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=27000707;
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=27000752;
        if (val1==val2) {
          //$LASTPOS=27000777;
          if (obj1.__genId>obj2.__genId) {
            _thread.retVal=1;return;
            
            
          } else {
            _thread.retVal=- 1;return;
            
            
          }
          _thread.retVal=0;return;
          
          
        }
      }
    }
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_27000912_11(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var orderArray;
    
    //$LASTPOS=27000937;
    ctx = cv.getContext("2d");
    //$LASTPOS=27000971;
    ctx.save();
    //$LASTPOS=27001116;
    orderArray = [];
    //$LASTPOS=27001140;
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=27001184;
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=27001217;
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=27001246;
    orderArray.forEach(function (s) {
      
      //$LASTPOS=27001280;
      s.draw(ctx);
    });
    //$LASTPOS=27001307;
    ctx.restore();
  },
  checkHit :function _trc_func_27001326_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27001353;
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=27001397;
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=27001485;
        a_owner = a;
        //$LASTPOS=27001527;
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=27001580;
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=27001628;
          b_owner = b;
          //$LASTPOS=27001674;
          if (a===b) {
            return _this;
          }
          //$LASTPOS=27001710;
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=27001815;
          if (a.crashTo1(b)) {
            //$LASTPOS=27001918;
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_func_27001326_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27001353;
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=27001397;
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=27001485;
        a_owner = a;
        //$LASTPOS=27001527;
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=27001580;
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=27001628;
          b_owner = b;
          //$LASTPOS=27001674;
          if (a===b) {
            return _this;
          }
          //$LASTPOS=27001710;
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=27001815;
          if (a.crashTo1(b)) {
            //$LASTPOS=27001918;
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_func_27002002_14(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=27002048;
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=27002112;
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_func_27002137_15(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=27002165;
    ctx = c.getContext("2d");
    //$LASTPOS=27002198;
    ctx.textBaseline="top";
    //$LASTPOS=27002227;
    ctx.save();
    //$LASTPOS=27002244;
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=27002284;
    //$LASTPOS=27002289;
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=27002329;
        ctx.beginPath();
        //$LASTPOS=27002355;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=27002401;
        ctx.moveTo(i,0);
        //$LASTPOS=27002427;
        ctx.lineTo(i,c.height);
        //$LASTPOS=27002460;
        ctx.closePath();
        //$LASTPOS=27002486;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=27002518;
    //$LASTPOS=27002523;
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=27002564;
        ctx.beginPath();
        //$LASTPOS=27002590;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=27002636;
        ctx.moveTo(0,i);
        //$LASTPOS=27002662;
        ctx.lineTo(c.width,i);
        //$LASTPOS=27002694;
        ctx.closePath();
        //$LASTPOS=27002720;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=27002746;
    ctx.fillStyle="white";
    //$LASTPOS=27002774;
    ctx.font="15px monospaced";
    //$LASTPOS=27002807;
    //$LASTPOS=27002812;
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=27002855;
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=27002889;
    //$LASTPOS=27002894;
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=27002938;
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=27002972;
    ctx.restore();
  },
  fiber$drawGrid :function _trc_func_27002137_16(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=27002165;
    ctx = c.getContext("2d");
    //$LASTPOS=27002198;
    ctx.textBaseline="top";
    //$LASTPOS=27002227;
    ctx.save();
    //$LASTPOS=27002244;
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=27002284;
    //$LASTPOS=27002289;
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=27002329;
        ctx.beginPath();
        //$LASTPOS=27002355;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=27002401;
        ctx.moveTo(i,0);
        //$LASTPOS=27002427;
        ctx.lineTo(i,c.height);
        //$LASTPOS=27002460;
        ctx.closePath();
        //$LASTPOS=27002486;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=27002518;
    //$LASTPOS=27002523;
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=27002564;
        ctx.beginPath();
        //$LASTPOS=27002590;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=27002636;
        ctx.moveTo(0,i);
        //$LASTPOS=27002662;
        ctx.lineTo(c.width,i);
        //$LASTPOS=27002694;
        ctx.closePath();
        //$LASTPOS=27002720;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=27002746;
    ctx.fillStyle="white";
    //$LASTPOS=27002774;
    ctx.font="15px monospaced";
    //$LASTPOS=27002807;
    //$LASTPOS=27002812;
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=27002855;
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=27002889;
    //$LASTPOS=27002894;
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=27002938;
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=27002972;
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_func_27002991_17(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27003024;
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_func_27002991_18(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27003024;
    _this.imageList=il;
    
    _thread.retVal=_this;return;
  },
  getImageList :function _trc_func_27003042_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.imageList;
  },
  fiber$getImageList :function _trc_func_27003042_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.imageList;return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_27003095_21(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27003136;
    _this.sx=scrollX;
    //$LASTPOS=27003153;
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_func_27003095_22(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=27003136;
    _this.sx=scrollX;
    //$LASTPOS=27003153;
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_28000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_28000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_28000016_2(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000034;
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=28000065;
    ctx.strokeStyle=_this.col;
    //$LASTPOS=28000091;
    ctx.beginPath();
    //$LASTPOS=28000113;
    ctx.moveTo(_this.x,_this.y);
    //$LASTPOS=28000135;
    ctx.lineTo(_this.tx,_this.ty);
    //$LASTPOS=28000159;
    ctx.stroke();
    //$LASTPOS=28000178;
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{
  main :function _trc_func_29000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_29000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_29000042_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000064;
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_func_29000042_3(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=29000064;
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_func_29000091_4(fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var o;
    
    //$LASTPOS=29000469;
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=29000512;
    o = f.obj();
    //$LASTPOS=29000532;
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=29000560;
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=29000590;
    _this.baseData=o.baseData;
    //$LASTPOS=29000616;
    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
    //$LASTPOS=29000658;
    _this.mapData=_this.mapTable;
    //$LASTPOS=29000681;
    _this.row=_this.mapTable.length;
    //$LASTPOS=29000707;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=29000736;
    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
    //$LASTPOS=29000780;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=29000813;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=29000885;
    _this.initMap();
  },
  fiber$load :function _trc_func_29000091_5(_thread,fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var o;
    
    //$LASTPOS=29000469;
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=29000512;
    o = f.obj();
    //$LASTPOS=29000532;
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=29000560;
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=29000590;
    _this.baseData=o.baseData;
    
    _thread.enter(function _trc_func_29000091_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=29000616;
          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
          __pc=1;return;
        case 1:
          _this.mapTable=_thread.retVal;
          
          //$LASTPOS=29000658;
          _this.mapData=_this.mapTable;
          //$LASTPOS=29000681;
          _this.row=_this.mapTable.length;
          //$LASTPOS=29000707;
          _this.col=_this.mapTable[0].length;
          //$LASTPOS=29000736;
          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
          __pc=2;return;
        case 2:
          _this.mapOnTable=_thread.retVal;
          
          //$LASTPOS=29000780;
          _this.mapOnData=_this.mapOnTable;
          //$LASTPOS=29000813;
          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
          //$LASTPOS=29000885;
          _this.fiber$initMap(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  conv :function _trc_func_29000903_7(mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=29000926;
    res = [];
    //$LASTPOS=29000943;
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=29000973;
      rrow = [];
      //$LASTPOS=29000995;
      res.push(rrow);
      //$LASTPOS=29001020;
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=29001067;
        t = tbl[dat[0]];
        //$LASTPOS=29001099;
        if (t) {
          //$LASTPOS=29001106;
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=29001165;
          rrow.push(dat[1]);
        }
      });
    });
    return res;
  },
  fiber$conv :function _trc_func_29000903_8(_thread,mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=29000926;
    res = [];
    //$LASTPOS=29000943;
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=29000973;
      rrow = [];
      //$LASTPOS=29000995;
      res.push(rrow);
      //$LASTPOS=29001020;
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=29001067;
        t = tbl[dat[0]];
        //$LASTPOS=29001099;
        if (t) {
          //$LASTPOS=29001106;
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=29001165;
          rrow.push(dat[1]);
        }
      });
    });
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Map,{"fullName":"kernel.T1Map","namespace":"kernel","shortName":"T1Map","decls":{"methods":{"main":{"nowait":false},"setBGColor":{"nowait":false},"load":{"nowait":false},"conv":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Page=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_30000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_30000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initGlobals :function _trc_func_30000022_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=30000044;
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=30000074;
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=30000103;
    Tonyu.globals.$clBlack=_this.color(0,0,0);
    //$LASTPOS=30000131;
    Tonyu.globals.$clRed=_this.color(255,0,0);
    //$LASTPOS=30000159;
    Tonyu.globals.$clGreen=_this.color(0,255,0);
    //$LASTPOS=30000189;
    Tonyu.globals.$clYellow=_this.color(255,255,0);
    //$LASTPOS=30000222;
    Tonyu.globals.$clBlue=_this.color(0,0,255);
    //$LASTPOS=30000251;
    Tonyu.globals.$clPink=_this.color(255,0,255);
    //$LASTPOS=30000282;
    Tonyu.globals.$clAqua=_this.color(0,255,255);
    //$LASTPOS=30000313;
    Tonyu.globals.$clWhite=_this.color(255,255,255);
    //$LASTPOS=30000347;
    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
  },
  fiber$initGlobals :function _trc_func_30000022_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=30000044;
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=30000074;
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_func_30000022_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=30000103;
          _this.fiber$color(_thread, 0, 0, 0);
          __pc=1;return;
        case 1:
          Tonyu.globals.$clBlack=_thread.retVal;
          
          //$LASTPOS=30000131;
          _this.fiber$color(_thread, 255, 0, 0);
          __pc=2;return;
        case 2:
          Tonyu.globals.$clRed=_thread.retVal;
          
          //$LASTPOS=30000159;
          _this.fiber$color(_thread, 0, 255, 0);
          __pc=3;return;
        case 3:
          Tonyu.globals.$clGreen=_thread.retVal;
          
          //$LASTPOS=30000189;
          _this.fiber$color(_thread, 255, 255, 0);
          __pc=4;return;
        case 4:
          Tonyu.globals.$clYellow=_thread.retVal;
          
          //$LASTPOS=30000222;
          _this.fiber$color(_thread, 0, 0, 255);
          __pc=5;return;
        case 5:
          Tonyu.globals.$clBlue=_thread.retVal;
          
          //$LASTPOS=30000251;
          _this.fiber$color(_thread, 255, 0, 255);
          __pc=6;return;
        case 6:
          Tonyu.globals.$clPink=_thread.retVal;
          
          //$LASTPOS=30000282;
          _this.fiber$color(_thread, 0, 255, 255);
          __pc=7;return;
        case 7:
          Tonyu.globals.$clAqua=_thread.retVal;
          
          //$LASTPOS=30000313;
          _this.fiber$color(_thread, 255, 255, 255);
          __pc=8;return;
        case 8:
          Tonyu.globals.$clWhite=_thread.retVal;
          
          //$LASTPOS=30000347;
          Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Page,{"fullName":"kernel.T1Page","namespace":"kernel","shortName":"T1Page","decls":{"methods":{"main":{"nowait":false},"initGlobals":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Text=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_31000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_31000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_31000016_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=31000032;
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=31000057;
    c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=31000097;
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=31000117;
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_32000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_32000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_33000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000150;
    _this.loop();
  },
  fiber$main :function _trc_func_33000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_33000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=33000150;
          _this.fiber$loop(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_33000067_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000086;
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=33000133;
    _this.initWorld();
  },
  fiber$onAppear :function _trc_func_33000067_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=33000086;
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_func_33000067_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=33000133;
          _this.fiber$initWorld(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initWorld :function _trc_func_33000163_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=33000183;
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=33000212;
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=33000241;
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=33000284;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=33000328;
    _this.scale=_this.scale||32;
    //$LASTPOS=33000352;
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=33000477;
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=33000497;
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=33000533;
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_func_33000163_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=33000183;
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=33000212;
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=33000241;
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=33000284;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=33000328;
    _this.scale=_this.scale||32;
    //$LASTPOS=33000352;
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=33000477;
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=33000497;
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.enter(function _trc_func_33000163_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=33000533;
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseWorld :function _trc_func_33000561_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000584;
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=33000605;
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_func_33000561_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=33000584;
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=33000605;
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_func_33000626_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000641;
    while (true) {
      //$LASTPOS=33000664;
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=33000831;
      _this.world.DrawDebugData();
      //$LASTPOS=33000863;
      _this.world.ClearForces();
      //$LASTPOS=33000893;
      _this.updatePos();
      //$LASTPOS=33000915;
      _this.update();
      
    }
  },
  fiber$loop :function _trc_func_33000626_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_33000626_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=33000641;
        case 1:
          //$LASTPOS=33000664;
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=33000831;
          _this.world.DrawDebugData();
          //$LASTPOS=33000863;
          _this.world.ClearForces();
          //$LASTPOS=33000893;
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=33000915;
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
  updatePos :function _trc_func_33000936_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=33000956;
    //$LASTPOS=33000961;
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=33001015;
        d = b.GetUserData();
        //$LASTPOS=33001047;
        if (d) {
          //$LASTPOS=33001053;
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
  },
  fiber$updatePos :function _trc_func_33000936_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b;
    var d;
    
    //$LASTPOS=33000956;
    //$LASTPOS=33000961;
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=33001015;
        d = b.GetUserData();
        //$LASTPOS=33001047;
        if (d) {
          //$LASTPOS=33001053;
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2World,{"fullName":"kernel.T2World","namespace":"kernel","shortName":"T2World","decls":{"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"initWorld":{"nowait":false},"releaseWorld":{"nowait":false},"loop":{"nowait":false},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_34000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_34000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_34000040_2(xx,yy,t,c,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000065;
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=34000084;
    _this.text="";
    //$LASTPOS=34000098;
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=34000117;
    _this.size=20;
    //$LASTPOS=34000131;
    if (! _this.x) {
      //$LASTPOS=34000144;
      _this.x=0;
    }
    //$LASTPOS=34000159;
    if (! _this.y) {
      //$LASTPOS=34000172;
      _this.y=0;
    }
    //$LASTPOS=34000187;
    if (t) {
      //$LASTPOS=34000194;
      _this.text=t;
    }
    //$LASTPOS=34000207;
    if (c) {
      //$LASTPOS=34000214;
      _this.fillStyle=c;
    }
    //$LASTPOS=34000232;
    if (s) {
      //$LASTPOS=34000239;
      _this.size=s;
    }
  },
  draw :function _trc_func_34000251_3(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=34000269;
    if (! _this.size) {
      //$LASTPOS=34000280;
      _this.size=15;
    }
    //$LASTPOS=34000294;
    if (! _this.align) {
      //$LASTPOS=34000306;
      _this.align="left";
    }
    //$LASTPOS=34000325;
    if (! _this.fillStyle) {
      //$LASTPOS=34000341;
      _this.fillStyle="white";
    }
    //$LASTPOS=34000365;
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=34000395;
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=34000432;
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=34000468;
    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=34000536;
    _this.width=rect.w;
    //$LASTPOS=34000555;
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_35000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_35000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_35000023_2(xx,yy,pp,ff,sz,rt,al) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000057;
    Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
    //$LASTPOS=35000082;
    _this.scaleX=1;
    //$LASTPOS=35000097;
    if (sz) {
      //$LASTPOS=35000105;
      _this.scaleX=sz;
    }
    //$LASTPOS=35000121;
    _this.angle=0;
    //$LASTPOS=35000135;
    if (rt) {
      //$LASTPOS=35000143;
      _this.angle=rt;
    }
    //$LASTPOS=35000158;
    _this.alpha=255;
    //$LASTPOS=35000174;
    if (al) {
      //$LASTPOS=35000182;
      _this.alpha=al;
    }
  },
  draw :function _trc_func_35000196_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000212;
    _this.rotation=_this.angle;
    //$LASTPOS=35000233;
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

