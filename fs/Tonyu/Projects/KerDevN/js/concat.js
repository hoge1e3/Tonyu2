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
Tonyu.classes.kernel.TextRectMod=Tonyu.klass([],{
  main :function _trc_func_4000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_4000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  drawTextRect :function _trc_func_4000017_2(ctx,text,x,topY,h,align,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var met;
    var res;
    var t;
    
    //$LASTPOS=4000090;
    if (! align) {
      //$LASTPOS=4000102;
      align="center";
    }
    //$LASTPOS=4000123;
    ctx.textBaseline="top";
    //$LASTPOS=4000152;
    _this.setFontSize(ctx,h);
    //$LASTPOS=4000178;
    met = ctx.measureText(text);
    //$LASTPOS=4000214;
    res = {y: topY,w: met.width,h: h};
    //$LASTPOS=4000256;
    t = align.substring(0,1).toLowerCase();
    //$LASTPOS=4000303;
    if (t=="l") {
      //$LASTPOS=4000315;
      res.x=x;
    } else {
      //$LASTPOS=4000334;
      if (t=="r") {
        //$LASTPOS=4000346;
        res.x=x-met.width;
      } else {
        //$LASTPOS=4000375;
        if (t=="c") {
          //$LASTPOS=4000387;
          res.x=x-met.width/2;
        }
      }
    }
    //$LASTPOS=4000413;
    if (type=="fill") {
      //$LASTPOS=4000431;
      ctx.fillText(text,res.x,topY);
    }
    //$LASTPOS=4000468;
    if (type=="stroke") {
      //$LASTPOS=4000488;
      ctx.strokeText(text,res.x,topY);
    }
    return res;
  },
  setFontSize :function _trc_func_4000543_3(ctx,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var post;
    
    //$LASTPOS=4000586;
    post = ctx.font.replace(/^[0-9\.]+/,"");
    //$LASTPOS=4000634;
    ctx.font=sz+post;
  },
  fukidashi :function _trc_func_4000658_4(ctx,text,x,y,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var align;
    var theight;
    var margin;
    var r;
    var fs;
    
    //$LASTPOS=4000712;
    align = "c";
    //$LASTPOS=4000732;
    theight = 20;
    //$LASTPOS=4000753;
    margin = 5;
    //$LASTPOS=4000772;
    r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
    //$LASTPOS=4000842;
    ctx.beginPath();
    //$LASTPOS=4000864;
    ctx.moveTo(x,y);
    //$LASTPOS=4000888;
    ctx.lineTo(x+margin,y-theight);
    //$LASTPOS=4000927;
    ctx.lineTo(x+r.w/2+margin,y-theight);
    //$LASTPOS=4000972;
    ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
    //$LASTPOS=4001030;
    ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
    //$LASTPOS=4001088;
    ctx.lineTo(x-r.w/2-margin,y-theight);
    //$LASTPOS=4001133;
    ctx.lineTo(x-margin,y-theight);
    //$LASTPOS=4001172;
    ctx.closePath();
    //$LASTPOS=4001194;
    ctx.fill();
    //$LASTPOS=4001211;
    ctx.stroke();
    //$LASTPOS=4001236;
    fs = ctx.fillStyle;
    //$LASTPOS=4001263;
    ctx.fillStyle=ctx.strokeStyle;
    //$LASTPOS=4001299;
    _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
    //$LASTPOS=4001372;
    ctx.fillStyle=fs;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TObject=Tonyu.klass([],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_5000030_2(options) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=5000052;
    if (typeof  options=="object") {
      //$LASTPOS=5000082;
      _this.extend(options);
    }
    //$LASTPOS=5000104;
    _this.main();
  },
  extend :function _trc_func_5000121_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TObject,{"fullName":"kernel.TObject","namespace":"kernel","shortName":"TObject","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TQuery=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_6000035_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6000049;
    _this.length=0;
  },
  tonyuIterator :function _trc_func_6000061_3(arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=6000089;
    res = {};
    //$LASTPOS=6000105;
    res.i=0;
    //$LASTPOS=6000118;
    if (arity==1) {
      //$LASTPOS=6000142;
      res.next=function () {
        
        //$LASTPOS=6000177;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=6000227;
        res[0]=_this[res.i];
        //$LASTPOS=6000259;
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=6000325;
      res.next=function () {
        
        //$LASTPOS=6000360;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=6000410;
        res[0]=res.i;
        //$LASTPOS=6000436;
        res[1]=_this[res.i];
        //$LASTPOS=6000468;
        res.i++;
        return true;
      };
      
    }
    return res;
  },
  fiber$tonyuIterator :function _trc_func_6000061_4(_thread,arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=6000089;
    res = {};
    //$LASTPOS=6000105;
    res.i=0;
    //$LASTPOS=6000118;
    if (arity==1) {
      //$LASTPOS=6000142;
      res.next=function () {
        
        //$LASTPOS=6000177;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=6000227;
        res[0]=_this[res.i];
        //$LASTPOS=6000259;
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=6000325;
      res.next=function () {
        
        //$LASTPOS=6000360;
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=6000410;
        res[0]=res.i;
        //$LASTPOS=6000436;
        res[1]=_this[res.i];
        //$LASTPOS=6000468;
        res.i++;
        return true;
      };
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  attr :function _trc_func_6000537_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var values;
    var i;
    var e;
    var _it_45;
    
    //$LASTPOS=6000551;
    values;
    //$LASTPOS=6000567;
    if (_this.length==0) {
      return _this;
    }
    //$LASTPOS=6000594;
    if (arguments.length==1&&typeof  arguments[0]=="string") {
      return _this[0][arguments[0]];
      
    }
    //$LASTPOS=6000702;
    if (arguments.length>=2) {
      //$LASTPOS=6000737;
      values={};
      //$LASTPOS=6000756;
      //$LASTPOS=6000761;
      i = 0;
      while(i<arguments.length-1) {
        {
          //$LASTPOS=6000813;
          values[arguments[i]]=arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=6000881;
      values=arguments[0];
      
    }
    //$LASTPOS=6000912;
    if (values) {
      //$LASTPOS=6000934;
      _it_45=Tonyu.iterator(_this,1);
      while(_it_45.next()) {
        e=_it_45[0];
        
        //$LASTPOS=6000968;
        e.extend(values);
        
      }
      
    }
  },
  fiber$attr :function _trc_func_6000537_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var values;
    var i;
    var e;
    var _it_45;
    
    //$LASTPOS=6000551;
    values;
    //$LASTPOS=6000567;
    if (_this.length==0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=6000594;
    if (_arguments.length==1&&typeof  _arguments[0]=="string") {
      _thread.retVal=_this[0][_arguments[0]];return;
      
      
    }
    //$LASTPOS=6000702;
    if (_arguments.length>=2) {
      //$LASTPOS=6000737;
      values={};
      //$LASTPOS=6000756;
      //$LASTPOS=6000761;
      i = 0;
      while(i<_arguments.length-1) {
        {
          //$LASTPOS=6000813;
          values[_arguments[i]]=_arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=6000881;
      values=_arguments[0];
      
    }
    //$LASTPOS=6000912;
    if (values) {
      //$LASTPOS=6000934;
      _it_45=Tonyu.iterator(_this,1);
      while(_it_45.next()) {
        e=_it_45[0];
        
        //$LASTPOS=6000968;
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_func_6001005_7(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6001028;
    if (typeof  key!="function") {
      return function (o) {
        
        return o[key];
      };
      
    } else {
      return key;
      
    }
  },
  fiber$genKeyfunc :function _trc_func_6001005_8(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=6001028;
    if (typeof  key!="function") {
      _thread.retVal=function (o) {
        
        return o[key];
      };return;
      
      
    } else {
      _thread.retVal=key;return;
      
      
    }
    
    _thread.retVal=_this;return;
  },
  maxs :function _trc_func_6001137_9(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_51;
    var v;
    
    //$LASTPOS=6001154;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6001181;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6001210;
    _it_51=Tonyu.iterator(_this,1);
    while(_it_51.next()) {
      o=_it_51[0];
      
      //$LASTPOS=6001240;
      v = f(o);
      //$LASTPOS=6001260;
      if (res==null||v>=res) {
        //$LASTPOS=6001299;
        if (v>res) {
          //$LASTPOS=6001310;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=6001339;
        reso.push(o);
        //$LASTPOS=6001365;
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$maxs :function _trc_func_6001137_10(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_51;
    var v;
    
    //$LASTPOS=6001154;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6001181;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6001210;
    _it_51=Tonyu.iterator(_this,1);
    while(_it_51.next()) {
      o=_it_51[0];
      
      //$LASTPOS=6001240;
      v = f(o);
      //$LASTPOS=6001260;
      if (res==null||v>=res) {
        //$LASTPOS=6001299;
        if (v>res) {
          //$LASTPOS=6001310;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=6001339;
        reso.push(o);
        //$LASTPOS=6001365;
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  mins :function _trc_func_6001407_11(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var reso;
    var o;
    var _it_58;
    var v;
    
    //$LASTPOS=6001424;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6001451;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6001480;
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=6001510;
      v = f(o);
      //$LASTPOS=6001530;
      if (res==null||v<=res) {
        //$LASTPOS=6001569;
        if (v<res) {
          //$LASTPOS=6001580;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=6001609;
        reso.push(o);
        //$LASTPOS=6001635;
        res=v;
        
      }
      
    }
    return reso;
  },
  fiber$mins :function _trc_func_6001407_12(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var reso;
    var o;
    var _it_58;
    var v;
    
    //$LASTPOS=6001424;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6001451;
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6001480;
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=6001510;
      v = f(o);
      //$LASTPOS=6001530;
      if (res==null||v<=res) {
        //$LASTPOS=6001569;
        if (v<res) {
          //$LASTPOS=6001580;
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=6001609;
        reso.push(o);
        //$LASTPOS=6001635;
        res=v;
        
      }
      
    }
    _thread.retVal=reso;return;
    
    
    _thread.retVal=_this;return;
  },
  minObj :function _trc_func_6001677_13(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mins(key)[0];
  },
  fiber$minObj :function _trc_func_6001677_14(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mins(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  maxObj :function _trc_func_6001719_15(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.maxs(key)[0];
  },
  fiber$maxObj :function _trc_func_6001719_16(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.maxs(key)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  nearests :function _trc_func_6001761_17(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6001782;
    if (typeof  x=="object") {
      //$LASTPOS=6001807;
      y=x.y;
      //$LASTPOS=6001813;
      x=x.x;
      
    }
    return _this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });
  },
  fiber$nearests :function _trc_func_6001761_18(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=6001782;
    if (typeof  x=="object") {
      //$LASTPOS=6001807;
      y=x.y;
      //$LASTPOS=6001813;
      x=x.x;
      
    }
    _thread.retVal=_this.mins(function (o) {
      
      return _this.dist(o.x-x,o.y-y);
    });return;
    
    
    _thread.retVal=_this;return;
  },
  nearest :function _trc_func_6001887_19(x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.nearests(x,y)[0];
  },
  fiber$nearest :function _trc_func_6001887_20(_thread,x,y) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.nearests(x,y)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  withins :function _trc_func_6001934_21(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var x;
    var y;
    
    //$LASTPOS=6001958;
    x;y;
    //$LASTPOS=6001971;
    if (typeof  xo=="object") {
      //$LASTPOS=6002006;
      x=xo.x;
      //$LASTPOS=6002013;
      y=xo.y;
      //$LASTPOS=6002020;
      d=yd;
      
    } else {
      //$LASTPOS=6002047;
      x=xo;
      //$LASTPOS=6002052;
      y=yd;
      
    }
    return _this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });
  },
  fiber$withins :function _trc_func_6001934_22(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var x;
    var y;
    
    //$LASTPOS=6001958;
    x;y;
    //$LASTPOS=6001971;
    if (typeof  xo=="object") {
      //$LASTPOS=6002006;
      x=xo.x;
      //$LASTPOS=6002013;
      y=xo.y;
      //$LASTPOS=6002020;
      d=yd;
      
    } else {
      //$LASTPOS=6002047;
      x=xo;
      //$LASTPOS=6002052;
      y=yd;
      
    }
    _thread.retVal=_this.find(function (o) {
      
      return _this.dist(o.x-x,o.y-y)<=d;
    });return;
    
    
    _thread.retVal=_this;return;
  },
  within :function _trc_func_6002133_23(xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.withins(xo,yd,d).nearest();
  },
  fiber$within :function _trc_func_6002133_24(_thread,xo,yd,d) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.withins(xo,yd,d).nearest();return;
    
    
    _thread.retVal=_this;return;
  },
  max :function _trc_func_6002194_25(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_69;
    var v;
    
    //$LASTPOS=6002210;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6002237;
    res;
    //$LASTPOS=6002250;
    _it_69=Tonyu.iterator(_this,1);
    while(_it_69.next()) {
      o=_it_69[0];
      
      //$LASTPOS=6002280;
      v = f(o);
      //$LASTPOS=6002300;
      if (res==null||v>res) {
        //$LASTPOS=6002324;
        res=v;
      }
      
    }
    return res;
  },
  fiber$max :function _trc_func_6002194_26(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_69;
    var v;
    
    //$LASTPOS=6002210;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6002237;
    res;
    //$LASTPOS=6002250;
    _it_69=Tonyu.iterator(_this,1);
    while(_it_69.next()) {
      o=_it_69[0];
      
      //$LASTPOS=6002280;
      v = f(o);
      //$LASTPOS=6002300;
      if (res==null||v>res) {
        //$LASTPOS=6002324;
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  min :function _trc_func_6002355_27(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var res;
    var o;
    var _it_75;
    var v;
    
    //$LASTPOS=6002371;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6002398;
    res;
    //$LASTPOS=6002411;
    _it_75=Tonyu.iterator(_this,1);
    while(_it_75.next()) {
      o=_it_75[0];
      
      //$LASTPOS=6002441;
      v = f(o);
      //$LASTPOS=6002461;
      if (res==null||v<res) {
        //$LASTPOS=6002485;
        res=v;
      }
      
    }
    return res;
  },
  fiber$min :function _trc_func_6002355_28(_thread,key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var res;
    var o;
    var _it_75;
    var v;
    
    //$LASTPOS=6002371;
    f = _this.genKeyfunc(key);
    //$LASTPOS=6002398;
    res;
    //$LASTPOS=6002411;
    _it_75=Tonyu.iterator(_this,1);
    while(_it_75.next()) {
      o=_it_75[0];
      
      //$LASTPOS=6002441;
      v = f(o);
      //$LASTPOS=6002461;
      if (res==null||v<res) {
        //$LASTPOS=6002485;
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  push :function _trc_func_6002516_29(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=6002531;
    _this[_this.length]=e;
    //$LASTPOS=6002551;
    _this.length++;
  },
  fiber$push :function _trc_func_6002516_30(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=6002531;
    _this[_this.length]=e;
    //$LASTPOS=6002551;
    _this.length++;
    
    _thread.retVal=_this;return;
  },
  size :function _trc_func_6002563_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.length;
  },
  fiber$size :function _trc_func_6002563_32(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.length;return;
    
    
    _thread.retVal=_this;return;
  },
  find :function _trc_func_6002588_33(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var no;
    var o;
    var _it_81;
    
    //$LASTPOS=6002603;
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6002626;
    _it_81=Tonyu.iterator(_this,1);
    while(_it_81.next()) {
      o=_it_81[0];
      
      //$LASTPOS=6002656;
      if (f(o)) {
        //$LASTPOS=6002666;
        no.push(o);
      }
      
    }
    return no;
  },
  fiber$find :function _trc_func_6002588_34(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var no;
    var o;
    var _it_81;
    
    //$LASTPOS=6002603;
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=6002626;
    _it_81=Tonyu.iterator(_this,1);
    while(_it_81.next()) {
      o=_it_81[0];
      
      //$LASTPOS=6002656;
      if (f(o)) {
        //$LASTPOS=6002666;
        no.push(o);
      }
      
    }
    _thread.retVal=no;return;
    
    
    _thread.retVal=_this;return;
  },
  apply :function _trc_func_6002702_35(name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var o;
    var _it_85;
    var f;
    
    //$LASTPOS=6002727;
    res;
    //$LASTPOS=6002740;
    if (! args) {
      //$LASTPOS=6002751;
      args=[];
    }
    //$LASTPOS=6002764;
    _it_85=Tonyu.iterator(_this,1);
    while(_it_85.next()) {
      o=_it_85[0];
      
      //$LASTPOS=6002794;
      f = o[name];
      //$LASTPOS=6002817;
      if (typeof  f=="function") {
        //$LASTPOS=6002857;
        res=f.apply(o,args);
        
      }
      
    }
    return res;
  },
  fiber$apply :function _trc_func_6002702_36(_thread,name,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var o;
    var _it_85;
    var f;
    
    //$LASTPOS=6002727;
    res;
    //$LASTPOS=6002740;
    if (! args) {
      //$LASTPOS=6002751;
      args=[];
    }
    //$LASTPOS=6002764;
    _it_85=Tonyu.iterator(_this,1);
    while(_it_85.next()) {
      o=_it_85[0];
      
      //$LASTPOS=6002794;
      f = o[name];
      //$LASTPOS=6002817;
      if (typeof  f=="function") {
        //$LASTPOS=6002857;
        res=f.apply(o,args);
        
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  alive :function _trc_func_6002968_37() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return ! o.isDead();
    });
  },
  fiber$alive :function _trc_func_6002968_38(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.find(function (o) {
      
      return ! o.isDead();
    });return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_6003039_39() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    
    //$LASTPOS=6003052;
    a = _this.alive();
    //$LASTPOS=6003071;
    if (a.length==0) {
      return false;
    }
    //$LASTPOS=6003106;
    a.apply("die");
    return true;
  },
  fiber$die :function _trc_func_6003039_40(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    
    //$LASTPOS=6003052;
    a = _this.alive();
    //$LASTPOS=6003071;
    if (a.length==0) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=6003106;
    a.apply("die");
    _thread.retVal=true;return;
    
    
    _thread.retVal=_this;return;
  },
  klass :function _trc_func_6003142_41(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.find(function (o) {
      
      return o instanceof k;
    });
  },
  fiber$klass :function _trc_func_6003142_42(_thread,k) {
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
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000028;
    _this.wav={};
    //$LASTPOS=7000036;
    _this.env={};
    //$LASTPOS=7000313;
    if (typeof  T!=="undefined") {
      //$LASTPOS=7000392;
      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
      //$LASTPOS=7000460;
      _this.setEnv(0,_this.env);
      //$LASTPOS=7000480;
      _this.setWav(0,T("pulse"));
      
    }
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7000028;
    _this.wav={};
    //$LASTPOS=7000036;
    _this.env={};
    
    _thread.enter(function _trc_func_7000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=7000313;
          if (!(typeof  T!=="undefined")) { __pc=3; break; }
          //$LASTPOS=7000392;
          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
          //$LASTPOS=7000460;
          _this.fiber$setEnv(_thread, 0, _this.env);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=7000480;
          _this.fiber$setWav(_thread, 0, T("pulse"));
          __pc=2;return;
        case 2:
          
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setWav :function _trc_func_7000044_3(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000070;
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_func_7000044_4(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7000070;
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_func_7000088_5(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=7000114;
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_func_7000088_6(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=7000114;
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_7000132_7(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=7000148;
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_func_7000132_8(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=7000148;
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    _thread.retVal=synth;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_7000226_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_7000226_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.WaveTable,{"fullName":"kernel.WaveTable","namespace":"kernel","shortName":"WaveTable","decls":{"methods":{"main":{"nowait":false},"setWav":{"nowait":false},"setEnv":{"nowait":false},"get":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod],{
  main :function _trc_func_8000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_8000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_8000143_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=8000162;
    if (Tonyu.runMode) {
      //$LASTPOS=8000192;
      thg = _this.currentThreadGroup();
      //$LASTPOS=8000231;
      if (thg) {
        //$LASTPOS=8000240;
        _this._th=thg.addObj(_this);
      }
      
    }
    //$LASTPOS=8000274;
    if (typeof  x=="object") {
      //$LASTPOS=8000298;
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=8000331;
      if (typeof  x=="number") {
        //$LASTPOS=8000366;
        _this.x=x;
        //$LASTPOS=8000385;
        _this.y=y;
        //$LASTPOS=8000404;
        _this.p=p;
        
      }
    }
    //$LASTPOS=8000426;
    if (_this.scaleX==null) {
      //$LASTPOS=8000444;
      _this.scaleX=1;
    }
    //$LASTPOS=8000459;
    if (_this.rotation==null) {
      //$LASTPOS=8000479;
      _this.rotation=0;
    }
    //$LASTPOS=8000496;
    if (_this.rotate==null) {
      //$LASTPOS=8000514;
      _this.rotate=0;
    }
    //$LASTPOS=8000529;
    if (_this.alpha==null) {
      //$LASTPOS=8000546;
      _this.alpha=255;
    }
    //$LASTPOS=8000562;
    if (_this.zOrder==null) {
      //$LASTPOS=8000580;
      _this.zOrder=0;
    }
    //$LASTPOS=8000595;
    if (_this.age==null) {
      //$LASTPOS=8000610;
      _this.age=0;
    }
    //$LASTPOS=8000622;
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=8000673;
      _this.animMode=true;
      //$LASTPOS=8000697;
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=8000731;
      _this.animMode=false;
      
    }
    //$LASTPOS=8000759;
    if (_this.animFps==null) {
      //$LASTPOS=8000778;
      _this.animFps=1;
    }
  },
  extend :function _trc_func_8000793_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_func_8000857_4(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8000882;
    console.log.apply(console,arguments);
    //$LASTPOS=8000925;
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=8000953;
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=8000990;
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=8001036;
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_func_8001104_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001132;
    _this.animFps=f;
    //$LASTPOS=8001153;
    _this.animFrame=0;
    //$LASTPOS=8001176;
    _this.animMode=true;
  },
  startAnim :function _trc_func_8001200_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001226;
    _this.animMode=true;
  },
  stopAnim :function _trc_func_8001250_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001275;
    _this.animMode=false;
  },
  update :function _trc_func_8001300_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8001317;
    _this.onUpdate();
    //$LASTPOS=8001334;
    if (null) {
      //$LASTPOS=8001357;
      null.suspend();
      
    }
  },
  fiber$update :function _trc_func_8001300_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8001317;
    _this.onUpdate();
    //$LASTPOS=8001334;
    if (_thread) {
      //$LASTPOS=8001357;
      _thread.suspend();
      
    }
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_8001387_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  updateEx :function _trc_func_8001418_11(updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var updateCount;
    
    //$LASTPOS=8001443;
    //$LASTPOS=8001447;
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=8001510;
        _this.update();
      }
      updateCount++;
    }
  },
  fiber$updateEx :function _trc_func_8001418_12(_thread,updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var updateCount;
    
    
    _thread.enter(function _trc_func_8001418_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8001443;
          //$LASTPOS=8001447;
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=8001510;
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
  getkey :function _trc_func_8001531_14(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Keys.getkey(k);
  },
  hitTo :function _trc_func_8001584_15(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.crashTo(t);
  },
  all :function _trc_func_8001631_16(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=8001653;
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=8001678;
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=8001719;
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=8001750;
      if (! c||s instanceof c) {
        //$LASTPOS=8001791;
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_func_8001871_17(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=8001898;
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=8001923;
    sp = _this;
    //$LASTPOS=8001960;
    t1 = _this.getCrashRect();
    //$LASTPOS=8001988;
    if (! t1) {
      return res;
    }
    //$LASTPOS=8002014;
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=8002055;
      t2;
      //$LASTPOS=8002072;
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=8002300;
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_func_8002358_18(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8002384;
    if (! t) {
      return false;
    }
    //$LASTPOS=8002411;
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_func_8002507_19(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=8002534;
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=8002662;
    t1 = _this.getCrashRect();
    //$LASTPOS=8002690;
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_func_8002973_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=8003003;
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=8003046;
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=8003088;
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=8003134;
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_func_8003339_21(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003372;
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=8003411;
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_func_8003553_22(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003596;
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=8003647;
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_func_8003685_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$currentThreadGroup;
  },
  die :function _trc_func_8003754_24() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8003775;
    if (_this._th) {
      //$LASTPOS=8003795;
      _this._th.kill();
      
    }
    //$LASTPOS=8003819;
    _this.hide();
    //$LASTPOS=8003832;
    _this.fireEvent("die");
    //$LASTPOS=8003855;
    _this._isDead=true;
  },
  hide :function _trc_func_8003873_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004034;
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=8004089;
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=8004130;
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_func_8004164_26(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004191;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=8004243;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=8004281;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=8004313;
    if (x!=null) {
      //$LASTPOS=8004326;
      _this.x=x;
    }
    //$LASTPOS=8004341;
    if (y!=null) {
      //$LASTPOS=8004354;
      _this.y=y;
    }
    //$LASTPOS=8004369;
    if (p!=null) {
      //$LASTPOS=8004382;
      _this.p=p;
    }
  },
  detectShape :function _trc_func_8004398_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004427;
    if (typeof  _this.p!="number") {
      //$LASTPOS=8004462;
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=8004495;
      _this.p=0;
      
    }
    //$LASTPOS=8004512;
    _this.p=Math.floor(_this.p);
    //$LASTPOS=8004534;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=8004572;
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=8004596;
    _this.width=_this.pImg.width;
    //$LASTPOS=8004619;
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_func_8004643_28(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    
    //$LASTPOS=8004712;
    _this.update();
  },
  fiber$waitFor :function _trc_func_8004643_29(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_8004643_30(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          {
            //$LASTPOS=8004680;
            _thread.waitFor(f);
          }
          //$LASTPOS=8004712;
          _this.fiber$update(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  isDead :function _trc_func_8004726_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._isDead;
  },
  animation :function _trc_func_8004772_32() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8004798;
    _this.age++;
    //$LASTPOS=8004810;
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=8004851;
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=8004891;
      _this.animFrame++;
      
    }
  },
  draw :function _trc_func_8004915_33(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=8004940;
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=8004993;
    _this.detectShape();
    //$LASTPOS=8005013;
    if (_this.pImg) {
      //$LASTPOS=8005034;
      ctx.save();
      //$LASTPOS=8005055;
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=8005199;
      _this.animation();
      //$LASTPOS=8005221;
      if (_this.rotation!=0) {
        //$LASTPOS=8005256;
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=8005324;
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=8005381;
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=8005433;
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=8005498;
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=8005554;
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=8005595;
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=8005727;
      ctx.restore();
      
    } else {
      //$LASTPOS=8005754;
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=8005802;
        if (! _this.size) {
          //$LASTPOS=8005813;
          _this.size=15;
        }
        //$LASTPOS=8005831;
        if (! _this.align) {
          //$LASTPOS=8005843;
          _this.align="center";
        }
        //$LASTPOS=8005868;
        if (! _this.fillStyle) {
          //$LASTPOS=8005884;
          _this.fillStyle="white";
        }
        //$LASTPOS=8005912;
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=8005946;
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=8005987;
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=8006058;
        _this.width=rect.w;
        //$LASTPOS=8006081;
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=8006108;
    if (_this._fukidashi) {
      //$LASTPOS=8006135;
      if (_this._fukidashi.c>0) {
        //$LASTPOS=8006170;
        _this._fukidashi.c--;
        //$LASTPOS=8006199;
        ctx.fillStyle="white";
        //$LASTPOS=8006235;
        ctx.strokeStyle="black";
        //$LASTPOS=8006273;
        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
        
      }
      
    }
  },
  asyncResult :function _trc_func_8006380_34() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.asyncResult();
  },
  screenOut :function _trc_func_8006443_35(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=8006496;
    if (! a) {
      //$LASTPOS=8006504;
      a=0;
    }
    //$LASTPOS=8006514;
    r = 0;
    //$LASTPOS=8006528;
    viewX = 0;viewY = 0;
    //$LASTPOS=8006554;
    if (_this.x<viewX+a) {
      //$LASTPOS=8006583;
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=8006602;
    if (_this.y<viewY+a) {
      //$LASTPOS=8006631;
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=8006650;
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=8006679;
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=8006714;
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=8006743;
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    return r;
  },
  fiber$screenOut :function _trc_func_8006443_36(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=8006496;
    if (! a) {
      //$LASTPOS=8006504;
      a=0;
    }
    //$LASTPOS=8006514;
    r = 0;
    //$LASTPOS=8006528;
    viewX = 0;viewY = 0;
    //$LASTPOS=8006554;
    if (_this.x<viewX+a) {
      //$LASTPOS=8006583;
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=8006602;
    if (_this.y<viewY+a) {
      //$LASTPOS=8006631;
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=8006650;
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=8006679;
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=8006714;
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=8006743;
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_func_8006792_37(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=8006811;
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=8006853;
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_func_8006792_38(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=8006811;
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=8006853;
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_func_8006932_39(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8006960;
    if (fl!==false) {
      //$LASTPOS=8006987;
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=8007139;
      _this.a=_this.asyncResult();
      //$LASTPOS=8007165;
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=8007219;
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=8007254;
      if (_this.origTG) {
        
        
      }
      
    }
  },
  fiber$waitInputDevice :function _trc_func_8006932_40(_thread,fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_8006932_41(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=8006960;
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=8006987;
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=8007041;
            _this.origTG=_thread.group;
            //$LASTPOS=8007080;
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=8007139;
          _this.a=_this.asyncResult();
          //$LASTPOS=8007165;
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=8007219;
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=8007254;
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=8007307;
            _thread.setGroup(_this.origTG);
            //$LASTPOS=8007350;
            _this.origTG=null;
          }
        case 4:
          
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  redrawScreen :function _trc_func_8007400_42() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8007423;
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=8007459;
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_func_8007400_43(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8007423;
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=8007459;
    Tonyu.globals.$Screen.draw();
    
    _thread.retVal=_this;return;
  },
  color :function _trc_func_8007500_44(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_8007500_45(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_8007562_46(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=8007598;
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=8007623;
    if (! size) {
      //$LASTPOS=8007634;
      size=15;
    }
    //$LASTPOS=8007648;
    if (! col) {
      //$LASTPOS=8007658;
      col="cyan";
    }
    //$LASTPOS=8007675;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8007729;
    if (tp.length>0) {
      //$LASTPOS=8007757;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=8007836;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_8007562_47(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=8007598;
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=8007623;
    if (! size) {
      //$LASTPOS=8007634;
      size=15;
    }
    //$LASTPOS=8007648;
    if (! col) {
      //$LASTPOS=8007658;
      col="cyan";
    }
    //$LASTPOS=8007675;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8007729;
    if (tp.length>0) {
      //$LASTPOS=8007757;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=8007836;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_8007891_48(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=8007923;
    if (! col) {
      //$LASTPOS=8007933;
      col="white";
    }
    //$LASTPOS=8007951;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8008005;
    if (tp.length>0) {
      //$LASTPOS=8008033;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=8008098;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_8007891_49(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=8007923;
    if (! col) {
      //$LASTPOS=8007933;
      col="white";
    }
    //$LASTPOS=8007951;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=8008005;
    if (tp.length>0) {
      //$LASTPOS=8008033;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=8008098;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  loadPage :function _trc_func_8008138_50(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8008164;
    _this.all().die();
    //$LASTPOS=8008182;
    new page(arg);
    //$LASTPOS=8008202;
    _this.die();
  },
  fiber$loadPage :function _trc_func_8008138_51(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8008164;
    _this.all().die();
    //$LASTPOS=8008182;
    new page(arg);
    //$LASTPOS=8008202;
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_func_8008215_52(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=8008237;
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_8008215_53(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=8008237;
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Keys=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_9000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=9000084;
    _this.stats={};
    //$LASTPOS=9000094;
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=9000212;
    //$LASTPOS=9000217;
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=9000248;
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=9000297;
    //$LASTPOS=9000302;
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=9000330;
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=9000365;
    if (! $.data(document,"key_event")) {
      //$LASTPOS=9000406;
      $.data(document,"key_event",true);
      //$LASTPOS=9000445;
      $(document).keydown(function (e) {
        
        //$LASTPOS=9000471;
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=9000495;
      $(document).keyup(function (e) {
        
        //$LASTPOS=9000519;
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=9000541;
      $(document).mousedown(function (e) {
        
        //$LASTPOS=9000578;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000619;
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=9000660;
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=9000697;
      $(document).mouseup(function (e) {
        
        //$LASTPOS=9000732;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000773;
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=9000814;
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
  },
  fiber$main :function _trc_func_9000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=9000084;
    _this.stats={};
    //$LASTPOS=9000094;
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=9000212;
    //$LASTPOS=9000217;
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=9000248;
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=9000297;
    //$LASTPOS=9000302;
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=9000330;
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=9000365;
    if (! $.data(document,"key_event")) {
      //$LASTPOS=9000406;
      $.data(document,"key_event",true);
      //$LASTPOS=9000445;
      $(document).keydown(function (e) {
        
        //$LASTPOS=9000471;
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=9000495;
      $(document).keyup(function (e) {
        
        //$LASTPOS=9000519;
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=9000541;
      $(document).mousedown(function (e) {
        
        //$LASTPOS=9000578;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000619;
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=9000660;
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=9000697;
      $(document).mouseup(function (e) {
        
        //$LASTPOS=9000732;
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=9000773;
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=9000814;
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
    
    _thread.retVal=_this;return;
  },
  getkey :function _trc_func_9000847_2(code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9000875;
    if (typeof  code=="string") {
      //$LASTPOS=9000912;
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=9000954;
    if (! code) {
      return 0;
    }
    //$LASTPOS=9000979;
    if (_this.stats[code]==- 1) {
      return 0;
    }
    //$LASTPOS=9001014;
    if (! _this.stats[code]) {
      //$LASTPOS=9001032;
      _this.stats[code]=0;
    }
    return _this.stats[code];
  },
  fiber$getkey :function _trc_func_9000847_3(_thread,code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9000875;
    if (typeof  code=="string") {
      //$LASTPOS=9000912;
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=9000954;
    if (! code) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=9000979;
    if (_this.stats[code]==- 1) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=9001014;
    if (! _this.stats[code]) {
      //$LASTPOS=9001032;
      _this.stats[code]=0;
    }
    _thread.retVal=_this.stats[code];return;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_9001073_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_127;
    
    //$LASTPOS=9001097;
    _it_127=Tonyu.iterator(_this.stats,1);
    while(_it_127.next()) {
      i=_it_127[0];
      
      //$LASTPOS=9001128;
      if (_this.stats[i]>0) {
        //$LASTPOS=9001145;
        _this.stats[i]++;
        
      }
      //$LASTPOS=9001166;
      if (_this.stats[i]==- 1) {
        //$LASTPOS=9001184;
        _this.stats[i]=1;
      }
      
    }
  },
  fiber$update :function _trc_func_9001073_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_127;
    
    //$LASTPOS=9001097;
    _it_127=Tonyu.iterator(_this.stats,1);
    while(_it_127.next()) {
      i=_it_127[0];
      
      //$LASTPOS=9001128;
      if (_this.stats[i]>0) {
        //$LASTPOS=9001145;
        _this.stats[i]++;
        
      }
      //$LASTPOS=9001166;
      if (_this.stats[i]==- 1) {
        //$LASTPOS=9001184;
        _this.stats[i]=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  keydown :function _trc_func_9001204_6(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    
    //$LASTPOS=9001222;
    s = _this.stats[e.keyCode];
    //$LASTPOS=9001250;
    if (! s) {
      //$LASTPOS=9001268;
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=9001298;
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keydown :function _trc_func_9001204_7(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    
    //$LASTPOS=9001222;
    s = _this.stats[e.keyCode];
    //$LASTPOS=9001250;
    if (! s) {
      //$LASTPOS=9001268;
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=9001298;
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  keyup :function _trc_func_9001332_8(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001348;
    _this.stats[e.keyCode]=0;
    //$LASTPOS=9001372;
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_func_9001332_9(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9001348;
    _this.stats[e.keyCode]=0;
    //$LASTPOS=9001372;
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MML=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_10000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000050;
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_func_10000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000050;
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_10000062_2(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000081;
    _this.mmlBuf.push(mmls);
    //$LASTPOS=10000105;
    if (! _this.isPlaying()) {
      //$LASTPOS=10000134;
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_func_10000062_3(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000081;
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_func_10000062_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000105;
          if (!(! _this.isPlaying())) { __pc=2; break; }
          //$LASTPOS=10000134;
          _this.fiber$playNext(_thread);
          __pc=1;return;
        case 1:
          
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playNext :function _trc_func_10000157_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    
    //$LASTPOS=10000220;
    if (_this.cTimeBase==null) {
      //$LASTPOS=10000241;
      _this.cTimeBase=0;
    }
    //$LASTPOS=10000259;
    if (_this.m) {
      //$LASTPOS=10000277;
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=10000348;
    mml = _this.mmlBuf.shift();
    //$LASTPOS=10000377;
    if (! mml) {
      //$LASTPOS=10000398;
      _this.m=null;
      //$LASTPOS=10000415;
      _this.cTimeBase=0;
      return _this;
      
    }
    //$LASTPOS=10000457;
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=10000495;
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=10000525;
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=10000555;
    _this.m.start();
    //$LASTPOS=10000571;
    Tonyu.globals.$MMLS[_this.id()]=_this;
  },
  fiber$playNext :function _trc_func_10000157_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mml;
    
    //$LASTPOS=10000220;
    if (_this.cTimeBase==null) {
      //$LASTPOS=10000241;
      _this.cTimeBase=0;
    }
    //$LASTPOS=10000259;
    if (_this.m) {
      //$LASTPOS=10000277;
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=10000348;
    mml = _this.mmlBuf.shift();
    //$LASTPOS=10000377;
    if (! mml) {
      //$LASTPOS=10000398;
      _this.m=null;
      //$LASTPOS=10000415;
      _this.cTimeBase=0;
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=10000457;
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=10000495;
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=10000525;
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=10000555;
    _this.m.start();
    //$LASTPOS=10000571;
    Tonyu.globals.$MMLS[_this.id()]=_this;
    
    _thread.retVal=_this;return;
  },
  id :function _trc_func_10000593_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000606;
    if (! _this._id) {
      //$LASTPOS=10000616;
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_func_10000593_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000606;
    if (! _this._id) {
      //$LASTPOS=10000616;
      _this._id=_this.rnd()+"";
    }
    _thread.retVal=_this._id;return;
    
    
    _thread.retVal=_this;return;
  },
  bufferCount :function _trc_func_10000651_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mmlBuf.length;
  },
  fiber$bufferCount :function _trc_func_10000651_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mmlBuf.length;return;
    
    
    _thread.retVal=_this;return;
  },
  isPlaying :function _trc_func_10000699_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.m;
  },
  fiber$isPlaying :function _trc_func_10000699_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.m;return;
    
    
    _thread.retVal=_this;return;
  },
  currentTime :function _trc_func_10000733_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000755;
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_func_10000733_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000755;
    if (_this.m) {
      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_10000814_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000829;
    if (_this.m) {
      //$LASTPOS=10000847;
      if (_this.mwav) {
        //$LASTPOS=10000872;
        _this.mwav.pause();
        //$LASTPOS=10000899;
        _this.mwav.stop();
        
      }
      //$LASTPOS=10000932;
      _this.m.pause();
      //$LASTPOS=10000952;
      _this.m.stop();
      //$LASTPOS=10000971;
      _this.m=null;
      //$LASTPOS=10000988;
      _this.mmlBuf=[];
      //$LASTPOS=10001056;
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
  },
  fiber$stop :function _trc_func_10000814_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000829;
    if (_this.m) {
      //$LASTPOS=10000847;
      if (_this.mwav) {
        //$LASTPOS=10000872;
        _this.mwav.pause();
        //$LASTPOS=10000899;
        _this.mwav.stop();
        
      }
      //$LASTPOS=10000932;
      _this.m.pause();
      //$LASTPOS=10000952;
      _this.m.stop();
      //$LASTPOS=10000971;
      _this.m=null;
      //$LASTPOS=10000988;
      _this.mmlBuf=[];
      //$LASTPOS=10001056;
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_11000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_11000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sleep :function _trc_func_11000034_2(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000050;
    if (! n) {
      //$LASTPOS=11000057;
      n=1;
    }
    //$LASTPOS=11000066;
    //$LASTPOS=11000070;
    n;
    while(n>0) {
      //$LASTPOS=11000081;
      _this.update();
      n--;
    }
  },
  fiber$sleep :function _trc_func_11000034_3(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000050;
    if (! n) {
      //$LASTPOS=11000057;
      n=1;
    }
    
    _thread.enter(function _trc_func_11000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000066;
          //$LASTPOS=11000070;
          n;;
        case 1:
          if (!(n>0)) { __pc=3; break; }
          //$LASTPOS=11000081;
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
  initSprite :function _trc_func_11000093_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000113;
    if (! _this._sprite) {
      //$LASTPOS=11000137;
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=11000207;
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_func_11000093_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000113;
    if (! _this._sprite) {
      //$LASTPOS=11000137;
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=11000207;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.retVal=_this;return;
  },
  say :function _trc_func_11000235_7(text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000257;
    if (! size) {
      //$LASTPOS=11000268;
      size=15;
    }
    //$LASTPOS=11000281;
    _this.initSprite();
    //$LASTPOS=11000299;
    _this._sprite._fukidashi={text: text,size: size,c: 30};
  },
  fiber$say :function _trc_func_11000235_8(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11000257;
    if (! size) {
      //$LASTPOS=11000268;
      size=15;
    }
    
    _thread.enter(function _trc_func_11000235_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000281;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=11000299;
          _this._sprite._fukidashi={text: text,size: size,c: 30};
          _thread.exit(_this);return;
        }
      }
    });
  },
  sprite :function _trc_func_11000350_10(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000371;
    _this.go(x,y,p);
  },
  fiber$sprite :function _trc_func_11000350_11(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11000350_12(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000371;
          _this.fiber$go(_thread, x, y, p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  show :function _trc_func_11000384_13(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000403;
    _this.go(x,y,p);
  },
  draw :function _trc_func_11000416_14(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000440;
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_func_11000461_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_func_11000516_16(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000533;
    _this.initSprite();
    //$LASTPOS=11000551;
    _this._sprite.x=x;
    //$LASTPOS=11000568;
    _this._sprite.y=y;
    //$LASTPOS=11000585;
    if (p!=null) {
      //$LASTPOS=11000598;
      _this._sprite.p=p;
    }
  },
  fiber$go :function _trc_func_11000516_17(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11000516_18(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000533;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=11000551;
          _this._sprite.x=x;
          //$LASTPOS=11000568;
          _this._sprite.y=y;
          //$LASTPOS=11000585;
          if (p!=null) {
            //$LASTPOS=11000598;
            _this._sprite.p=p;
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  change :function _trc_func_11000629_19(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000646;
    _this.initSprite();
    //$LASTPOS=11000664;
    _this._sprite.p=p;
  },
  fiber$change :function _trc_func_11000629_20(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11000629_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11000646;
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=11000664;
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
  main :function _trc_func_12000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_12000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initMML :function _trc_func_12000020_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000045;
    if (_this.mmlInited) {
      return _this;
    }
    //$LASTPOS=12000073;
    _this.mmlInited=true;
    //$LASTPOS=12000094;
    Tonyu.globals.$currentProject.requestPlugin("timbre");
    //$LASTPOS=12000140;
    if (! Tonyu.globals.$MMLS) {
      //$LASTPOS=12000162;
      Tonyu.globals.$MMLS={};
      //$LASTPOS=12000180;
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=12000214;
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
      
    }
    //$LASTPOS=12000256;
    _this.on("die",function () {
      
      //$LASTPOS=12000272;
      _this.play().stop();
    });
  },
  releaseMML :function _trc_func_12000294_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_132;
    
    //$LASTPOS=12000322;
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=12000343;
      _it_132=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_132.next()) {
        k=_it_132[0];
        v=_it_132[1];
        
        //$LASTPOS=12000379;
        v.stop();
        
      }
      //$LASTPOS=12000407;
      Tonyu.globals.$MMLS=null;
      
    }
    //$LASTPOS=12000432;
    if (Tonyu.globals.$WaveTable) {
      //$LASTPOS=12000458;
      Tonyu.globals.$WaveTable.stop();
      //$LASTPOS=12000485;
      Tonyu.globals.$WaveTable=null;
      
    }
  },
  play :function _trc_func_12000513_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mmls;
    var i;
    
    //$LASTPOS=12000528;
    _this.initMML();
    //$LASTPOS=12000544;
    if (! _this._mml) {
      //$LASTPOS=12000555;
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=12000574;
    if (_this.isDead()||arguments.length==0) {
      return _this._mml;
    }
    //$LASTPOS=12000629;
    mmls = [];
    //$LASTPOS=12000647;
    //$LASTPOS=12000652;
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=12000697;
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12000734;
    _this._mml.play(mmls);
    //$LASTPOS=12000756;
    while (_this._mml.bufferCount()>2) {
      //$LASTPOS=12000796;
      _this.update();
      
    }
    return _this._mml;
  },
  fiber$play :function _trc_func_12000513_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mmls;
    var i;
    
    //$LASTPOS=12000528;
    _this.initMML();
    //$LASTPOS=12000544;
    if (! _this._mml) {
      //$LASTPOS=12000555;
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=12000574;
    if (_this.isDead()||_arguments.length==0) {
      _thread.retVal=_this._mml;return;
      
    }
    //$LASTPOS=12000629;
    mmls = [];
    //$LASTPOS=12000647;
    //$LASTPOS=12000652;
    i = 0;
    while(i<_arguments.length) {
      {
        //$LASTPOS=12000697;
        mmls.push(_arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12000734;
    _this._mml.play(mmls);
    
    _thread.enter(function _trc_func_12000513_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=12000756;
        case 1:
          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
          //$LASTPOS=12000796;
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
  playSE :function _trc_func_12000835_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    var mmls;
    var i;
    
    //$LASTPOS=12000859;
    _this.initMML();
    //$LASTPOS=12000875;
    mml = new Tonyu.classes.kernel.MML;
    //$LASTPOS=12000897;
    mmls = [];
    //$LASTPOS=12000915;
    //$LASTPOS=12000920;
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=12000965;
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=12001002;
    mml.play(mmls);
    return mml;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NObjTest=Tonyu.klass(Tonyu.classes.kernel.NoviceActor,[],{
  main :function _trc_func_13000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000092;
    _this.x=100;
    //$LASTPOS=13000099;
    _this.y=100;
    //$LASTPOS=13000106;
    _this.vy=0;
    //$LASTPOS=13000111;
    _this.vx=0;
    //$LASTPOS=13000117;
    _this.t=new Tonyu.classes.kernel.NObjTest2({x: 200,y: 50});
    //$LASTPOS=13000148;
    _this.watchHit(Tonyu.classes.kernel.NObjTest,Tonyu.classes.kernel.NObjTest2,Tonyu.bindFunc(_this,_this.onH));
    //$LASTPOS=13000184;
    while (true) {
      //$LASTPOS=13000203;
      if (_this.getkey("left")) {
        //$LASTPOS=13000223;
        _this.vx=- 2;
      }
      //$LASTPOS=13000234;
      if (_this.getkey("Right")) {
        //$LASTPOS=13000255;
        _this.vx=2;
      }
      //$LASTPOS=13000265;
      if (_this.getkey("up")==1) {
        //$LASTPOS=13000286;
        _this.vy=- 2;
      }
      //$LASTPOS=13000297;
      _this.y+=_this.vy;
      //$LASTPOS=13000308;
      _this.vy+=0.1;
      //$LASTPOS=13000321;
      _this.move({vx: _this.vx,vy: _this.vy});
      //$LASTPOS=13000367;
      _this.go(_this.x,_this.y);
      //$LASTPOS=13000380;
      _this.sleep();
      
    }
  },
  fiber$main :function _trc_func_13000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000092;
    _this.x=100;
    //$LASTPOS=13000099;
    _this.y=100;
    //$LASTPOS=13000106;
    _this.vy=0;
    //$LASTPOS=13000111;
    _this.vx=0;
    //$LASTPOS=13000117;
    _this.t=new Tonyu.classes.kernel.NObjTest2({x: 200,y: 50});
    //$LASTPOS=13000148;
    _this.watchHit(Tonyu.classes.kernel.NObjTest,Tonyu.classes.kernel.NObjTest2,Tonyu.bindFunc(_this,_this.onH));
    
    _thread.enter(function _trc_func_13000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=13000184;
        case 1:
          //$LASTPOS=13000203;
          if (_this.getkey("left")) {
            //$LASTPOS=13000223;
            _this.vx=- 2;
          }
          //$LASTPOS=13000234;
          if (_this.getkey("Right")) {
            //$LASTPOS=13000255;
            _this.vx=2;
          }
          //$LASTPOS=13000265;
          if (_this.getkey("up")==1) {
            //$LASTPOS=13000286;
            _this.vy=- 2;
          }
          //$LASTPOS=13000297;
          _this.y+=_this.vy;
          //$LASTPOS=13000308;
          _this.vy+=0.1;
          //$LASTPOS=13000321;
          _this.fiber$move(_thread, {vx: _this.vx,vy: _this.vy});
          __pc=2;return;
        case 2:
          
          //$LASTPOS=13000367;
          _this.fiber$go(_thread, _this.x, _this.y);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=13000380;
          _this.fiber$sleep(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  move :function _trc_func_13000052_3(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000067;
    _this.x+=p.vx;
    //$LASTPOS=13000080;
    _this.y+=p.vy;
  },
  fiber$move :function _trc_func_13000052_4(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000067;
    _this.x+=p.vx;
    //$LASTPOS=13000080;
    _this.y+=p.vy;
    
    _thread.retVal=_this;return;
  },
  onH :function _trc_func_13000441_5(a,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000457;
    b.hide();
    //$LASTPOS=13000471;
    a.say("あたっ！");
    //$LASTPOS=13000490;
    a.vy=5;
  },
  fiber$onH :function _trc_func_13000441_6(_thread,a,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000457;
    b.hide();
    //$LASTPOS=13000471;
    a.say("あたっ！");
    //$LASTPOS=13000490;
    a.vy=5;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.NObjTest,{"fullName":"kernel.NObjTest","namespace":"kernel","shortName":"NObjTest","decls":{"methods":{"main":{"nowait":false},"move":{"nowait":false},"onH":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NObjTest2=Tonyu.klass(Tonyu.classes.kernel.NoviceActor,[],{
  main :function _trc_func_14000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000022;
    _this.change(10);
    //$LASTPOS=14000034;
    _this.go(_this.x,_this.y);
  },
  fiber$main :function _trc_func_14000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_14000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000022;
          _this.fiber$change(_thread, 10);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=14000034;
          _this.fiber$go(_thread, _this.x, _this.y);
          __pc=2;return;
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.NObjTest2,{"fullName":"kernel.NObjTest2","namespace":"kernel","shortName":"NObjTest2","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod],{
  main :function _trc_func_15000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_15000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_15000073_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000092;
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=15000111;
    if (Tonyu.runMode) {
      //$LASTPOS=15000130;
      _this.initSprite();
    }
  },
  initSprite :function _trc_func_15000148_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000169;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=15000221;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=15000259;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=15000291;
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_15000148_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000169;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=15000221;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=15000259;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_15000148_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000291;
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_15000307_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onAppear :function _trc_func_15000307_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Actor,{"fullName":"kernel.Actor","namespace":"kernel","shortName":"Actor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initSprite":{"nowait":false},"onAppear":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_16000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16001406;
    _this.initSprites();
    //$LASTPOS=16001422;
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=16001453;
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=16001490;
    _this.initThread();
    //$LASTPOS=16001507;
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=16001524;
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=16001541;
    Tonyu.globals.$Math=Math;
    //$LASTPOS=16001554;
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=16001664;
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=16001688;
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=16001828;
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=16001866;
      SplashScreen.hide();
    }
    //$LASTPOS=16001888;
    _this.initFPSParams();
    //$LASTPOS=16001908;
    while (true) {
      //$LASTPOS=16001928;
      _this.thg.steps();
      //$LASTPOS=16001946;
      Tonyu.globals.$Keys.update();
      //$LASTPOS=16001967;
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=16001995;
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=16002028;
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=16002069;
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=16002097;
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=16002151;
        _this.doDraw=true;
        //$LASTPOS=16002173;
        _this.resetDeadLine();
        
      }
      //$LASTPOS=16002202;
      if (_this.doDraw) {
        //$LASTPOS=16002245;
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=16002290;
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=16002330;
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=16002375;
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=16002400;
        _this.fps_fpsCnt++;
        //$LASTPOS=16002424;
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=16002463;
        _this.frameSkipped++;
        
      }
      //$LASTPOS=16002491;
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=16002517;
      _this.fps_rpsCnt++;
      //$LASTPOS=16002537;
      _this.measureFps();
      //$LASTPOS=16002556;
      _this.waitFrame();
      //$LASTPOS=16002583;
      while (_this.paused) {
        //$LASTPOS=16002608;
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=16002645;
        if (! _this.paused) {
          //$LASTPOS=16002658;
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_func_16000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_16000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16001406;
          _this.fiber$initSprites(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=16001422;
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=16001453;
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=16001490;
          _this.fiber$initThread(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=16001507;
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=16001524;
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=16001541;
          Tonyu.globals.$Math=Math;
          //$LASTPOS=16001554;
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=16001664;
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=16001688;
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=16001828;
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=16001866;
            SplashScreen.hide();
          }
          //$LASTPOS=16001888;
          _this.initFPSParams();
          //$LASTPOS=16001908;
        case 3:
          //$LASTPOS=16001928;
          _this.thg.steps();
          //$LASTPOS=16001946;
          Tonyu.globals.$Keys.update();
          //$LASTPOS=16001967;
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=16001995;
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=16002028;
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=16002069;
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=16002097;
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=16002151;
            _this.doDraw=true;
            //$LASTPOS=16002173;
            _this.resetDeadLine();
            
          }
          //$LASTPOS=16002202;
          if (_this.doDraw) {
            //$LASTPOS=16002245;
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=16002290;
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=16002330;
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=16002375;
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=16002400;
            _this.fps_fpsCnt++;
            //$LASTPOS=16002424;
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=16002463;
            _this.frameSkipped++;
            
          }
          //$LASTPOS=16002491;
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=16002517;
          _this.fps_rpsCnt++;
          //$LASTPOS=16002537;
          _this.measureFps();
          //$LASTPOS=16002556;
          _this.fiber$waitFrame(_thread);
          __pc=4;return;
        case 4:
          
          //$LASTPOS=16002583;
        case 5:
          if (!(_this.paused)) { __pc=7; break; }
          //$LASTPOS=16002608;
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=6;return;
        case 6:
          
          //$LASTPOS=16002645;
          if (! _this.paused) {
            //$LASTPOS=16002658;
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
  initSprites :function _trc_func_16000160_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_141;
    
    //$LASTPOS=16000182;
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=16000211;
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=16000245;
    _this.print("Loading plugins..");
    //$LASTPOS=16000279;
    a = _this.asyncResult();
    //$LASTPOS=16000305;
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=16000351;
    _this.waitFor(a);
    //$LASTPOS=16000368;
    _this.print("Loading pats..");
    //$LASTPOS=16000399;
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=16000442;
    a=_this.asyncResult();
    //$LASTPOS=16000464;
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=16000549;
    _this.waitFor(a);
    //$LASTPOS=16000566;
    r = a[0];
    //$LASTPOS=16000583;
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=16000614;
    _it_141=Tonyu.iterator(r.names,2);
    while(_it_141.next()) {
      name=_it_141[0];
      val=_it_141[1];
      
      //$LASTPOS=16000655;
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=16000695;
    _this.print("Loading pats done.");
    //$LASTPOS=16000730;
    _this.cvj=$("canvas");
    //$LASTPOS=16000752;
    if (Tonyu.noviceMode) {
      //$LASTPOS=16000785;
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=16000869;
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
      
    }
  },
  fiber$initSprites :function _trc_func_16000160_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_141;
    
    //$LASTPOS=16000182;
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=16000211;
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=16000245;
    _this.print("Loading plugins..");
    //$LASTPOS=16000279;
    a = _this.asyncResult();
    //$LASTPOS=16000305;
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_func_16000160_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16000351;
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=16000368;
          _this.print("Loading pats..");
          //$LASTPOS=16000399;
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=16000442;
          a=_this.asyncResult();
          //$LASTPOS=16000464;
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=16000549;
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=16000566;
          r = a[0];
          //$LASTPOS=16000583;
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=16000614;
          _it_141=Tonyu.iterator(r.names,2);
          while(_it_141.next()) {
            name=_it_141[0];
            val=_it_141[1];
            
            //$LASTPOS=16000655;
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=16000695;
          _this.print("Loading pats done.");
          //$LASTPOS=16000730;
          _this.cvj=$("canvas");
          //$LASTPOS=16000752;
          if (Tonyu.noviceMode) {
            //$LASTPOS=16000785;
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=16000869;
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_func_16000945_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=16000966;
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=16001013;
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=16001059;
    mainClassName = o.run.mainClass;
    //$LASTPOS=16001099;
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=16001140;
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=16001186;
    if (! _this.mainClass) {
      //$LASTPOS=16001213;
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=16001292;
    Tonyu.runMode=true;
    //$LASTPOS=16001317;
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=16001347;
    new _this.mainClass();
  },
  fiber$initThread :function _trc_func_16000945_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=16000966;
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=16001013;
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=16001059;
    mainClassName = o.run.mainClass;
    //$LASTPOS=16001099;
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=16001140;
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=16001186;
    if (! _this.mainClass) {
      //$LASTPOS=16001213;
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=16001292;
    Tonyu.runMode=true;
    //$LASTPOS=16001317;
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=16001347;
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_16001368_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16001383;
    _this.fireEvent("stop");
  },
  fiber$stop :function _trc_func_16001368_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_16001368_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16001383;
          _this.fiber$fireEvent(_thread, "stop");
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_func_16002688_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16002738;
    _this._fps=30;
    //$LASTPOS=16002754;
    _this.maxframeSkip=5;
    //$LASTPOS=16002804;
    _this.frameCnt=0;
    //$LASTPOS=16002823;
    _this.resetDeadLine();
    //$LASTPOS=16002845;
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=16002864;
    _this.lastMeasured=_this.now();
    //$LASTPOS=16002889;
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_func_16002934_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_func_16002988_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16003019;
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=16003050;
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_func_16003074_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=16003094;
    wt = _this.deadLine-_this.now();
    //$LASTPOS=16003122;
    if (wt<1) {
      //$LASTPOS=16003143;
      if (wt<- 1000) {
        //$LASTPOS=16003157;
        _this.resetDeadLine();
      }
      //$LASTPOS=16003183;
      wt=1;
      
    }
    //$LASTPOS=16003201;
    wt=_this.floor(wt);
    //$LASTPOS=16003220;
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=16003253;
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_func_16003074_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=16003094;
    wt = _this.deadLine-_this.now();
    //$LASTPOS=16003122;
    if (wt<1) {
      //$LASTPOS=16003143;
      if (wt<- 1000) {
        //$LASTPOS=16003157;
        _this.resetDeadLine();
      }
      //$LASTPOS=16003183;
      wt=1;
      
    }
    //$LASTPOS=16003201;
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_func_16003074_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=16003220;
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=16003253;
          _this.deadLine+=1000/_this._fps;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getFrameRate :function _trc_func_16003280_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._fps;
  },
  setFrameRate :function _trc_func_16003366_18(fps,maxFrameSkip) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16003413;
    _this._fps=fps;
    //$LASTPOS=16003430;
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=16003465;
      maxFrameSkip=5;
    }
    //$LASTPOS=16003486;
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=16003525;
    _this.resetDeadLine();
  },
  getMeasuredFps :function _trc_func_16003575_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_fps;
  },
  getMeasuredRps :function _trc_func_16003654_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_rps;
  },
  measureFps :function _trc_func_16003708_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=16003736;
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=16003776;
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=16003805;
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=16003834;
      _this.fps_fpsCnt=0;
      //$LASTPOS=16003857;
      _this.fps_rpsCnt=0;
      //$LASTPOS=16003880;
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"initSprites":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_17000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_17000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_17000041_2(param) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    
    //$LASTPOS=17000060;
    _this.sx=0;
    //$LASTPOS=17000071;
    _this.sy=0;
    //$LASTPOS=17000082;
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=17000101;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=17000173;
    _this.mapObj=true;
    //$LASTPOS=17000191;
    _this.mapTable=[];
    //$LASTPOS=17000211;
    _this.mapOnTable=[];
    //$LASTPOS=17000233;
    //$LASTPOS=17000237;
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=17000266;
        _this.rows=[];
        //$LASTPOS=17000286;
        //$LASTPOS=17000290;
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=17000323;
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=17000358;
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=17000391;
    //$LASTPOS=17000395;
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=17000424;
        _this.rows=[];
        //$LASTPOS=17000444;
        //$LASTPOS=17000448;
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=17000481;
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=17000516;
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=17000616;
    _this.initMap();
  },
  initMap :function _trc_func_17000631_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=17000648;
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=17000674;
    //$LASTPOS=17000678;
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=17000707;
        //$LASTPOS=17000711;
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=17000744;
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=17000791;
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=17000819;
    //$LASTPOS=17000823;
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=17000852;
        //$LASTPOS=17000856;
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=17000889;
            _this.setOn(j,i,_this.mapOnData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
  },
  fiber$initMap :function _trc_func_17000631_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=17000648;
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_17000631_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17000674;
          //$LASTPOS=17000678;
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=17000707;
          //$LASTPOS=17000711;
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=17000744;
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=17000791;
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=17000819;
          //$LASTPOS=17000823;
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=17000852;
          //$LASTPOS=17000856;
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=17000889;
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
  load :function _trc_func_17000939_6(dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000961;
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=17001013;
    if (! _this.baseData) {
      //$LASTPOS=17001027;
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=17001063;
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=17001090;
    _this.mapData=_this.mapTable;
    //$LASTPOS=17001113;
    _this.row=_this.mapTable.length;
    //$LASTPOS=17001139;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=17001168;
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=17001197;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=17001224;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=17001296;
    _this.initMap();
  },
  fiber$load :function _trc_func_17000939_7(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17000961;
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=17001013;
    if (! _this.baseData) {
      //$LASTPOS=17001027;
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=17001063;
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=17001090;
    _this.mapData=_this.mapTable;
    //$LASTPOS=17001113;
    _this.row=_this.mapTable.length;
    //$LASTPOS=17001139;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=17001168;
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=17001197;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=17001224;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_func_17000939_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17001296;
          _this.fiber$initMap(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  set :function _trc_func_17001311_9(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17001339;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=17001407;
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=17001478;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17001512;
    p=Math.floor(p);
    //$LASTPOS=17001534;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17001572;
    if (! _this.pImg) {
      //$LASTPOS=17001594;
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=17001695;
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001772;
    _this.ctx.save();
    //$LASTPOS=17001789;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001933;
    _this.ctx.restore();
  },
  fiber$set :function _trc_func_17001311_10(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17001339;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=17001407;
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=17001478;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17001512;
    p=Math.floor(p);
    //$LASTPOS=17001534;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17001572;
    if (! _this.pImg) {
      //$LASTPOS=17001594;
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=17001695;
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001772;
    _this.ctx.save();
    //$LASTPOS=17001789;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17001933;
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_func_17001952_11(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17001982;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=17002050;
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=17002100;
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=17002135;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=17002169;
    p=Math.floor(p);
    //$LASTPOS=17002191;
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=17002229;
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=17002253;
    _this.ctx.save();
    //$LASTPOS=17002270;
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=17002414;
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_func_17001952_12(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17001982;
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_17001952_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002050;
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=17002100;
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=17002135;
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=17002169;
          p=Math.floor(p);
          //$LASTPOS=17002191;
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=17002229;
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=17002253;
          _this.ctx.save();
          //$LASTPOS=17002270;
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=17002414;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_func_17002433_14(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002461;
    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setOnAt :function _trc_func_17002433_15(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_17002433_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002461;
          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setAt :function _trc_func_17002530_17(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002556;
    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setAt :function _trc_func_17002530_18(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_17002530_19(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17002556;
          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  get :function _trc_func_17002623_20(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002649;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_func_17002623_21(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17002649;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getAt :function _trc_func_17002757_22(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getAt :function _trc_func_17002757_23(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  getOn :function _trc_func_17002853_24(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17002881;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_func_17002853_25(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17002881;
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapOnTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getOnAt :function _trc_func_17002991_26(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getOnAt :function _trc_func_17002991_27(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_17003091_28(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17003124;
    _this.sx=- scrollX;
    //$LASTPOS=17003142;
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_func_17003091_29(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=17003124;
    _this.sx=- scrollX;
    //$LASTPOS=17003142;
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_17003159_30(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17003177;
    _this.pImg=_this.buf[0];
    //$LASTPOS=17003195;
    ctx.save();
    //$LASTPOS=17003212;
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=17003324;
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_18000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=18000032;
    _this.loadMode=false;
    //$LASTPOS=18000049;
    _this.print("Load Data?: Y or N");
    //$LASTPOS=18000079;
    while (true) {
      //$LASTPOS=18000097;
      if (_this.getkey("y")>0) {
        //$LASTPOS=18000125;
        _this.loadMode=true;
        break;
        
        
      }
      //$LASTPOS=18000168;
      if (_this.getkey("n")>0) {
        //$LASTPOS=18000196;
        _this.loadMode=false;
        break;
        
        
      }
      //$LASTPOS=18000240;
      _this.update();
      
    }
    //$LASTPOS=18000254;
    if (_this.loadMode) {
      //$LASTPOS=18000273;
      _this.fileName=prompt("Input json file (*.json)","map.json");
      //$LASTPOS=18000334;
      if (_this.fileName) {
        //$LASTPOS=18000357;
        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
        
      }
      //$LASTPOS=18000413;
      if (_this.mapDataFile.obj()) {
        //$LASTPOS=18000445;
        _this.baseData=_this.mapDataFile.obj();
        
      } else {
        //$LASTPOS=18000494;
        _this.mapDataFile=_this.file(_this.fileName);
        //$LASTPOS=18000531;
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=18000567;
          _this.baseData=_this.mapDataFile.obj();
          
        }
        
      }
      //$LASTPOS=18000618;
      if (_this.baseData==undefined) {
        //$LASTPOS=18000652;
        _this.print("Load failed");
        //$LASTPOS=18000683;
        _this.loadMode=false;
        
      } else {
        //$LASTPOS=18000710;
        if (_this.baseData[0]&&_this.baseData[1]) {
          //$LASTPOS=18000751;
          _this.mapData=_this.baseData[0];
          //$LASTPOS=18000781;
          _this.mapOnData=_this.baseData[1];
          
        }
      }
      
    }
    //$LASTPOS=18000815;
    _this.update();
    //$LASTPOS=18001093;
    if (! _this.loadMode) {
      //$LASTPOS=18001113;
      _this.row=prompt("input row");
      //$LASTPOS=18001143;
      _this.update();
      //$LASTPOS=18001158;
      _this.col=prompt("input col");
      //$LASTPOS=18001188;
      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
      //$LASTPOS=18001238;
      _this.panel.x=_this.panel.width/2+10;
      //$LASTPOS=18001269;
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=18001298;
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=18001331;
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=18001382;
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
      
    } else {
      //$LASTPOS=18001445;
      if (! _this.mapOnData) {
        //$LASTPOS=18001470;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
        
      } else {
        //$LASTPOS=18001582;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
        
      }
      //$LASTPOS=18001695;
      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
      //$LASTPOS=18001766;
      _this.panel.x=_this.panel.width/2;
      //$LASTPOS=18001794;
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=18001823;
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=18001856;
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      
    }
    //$LASTPOS=18001906;
    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
    //$LASTPOS=18001961;
    _this.counter=0;
    //$LASTPOS=18001973;
    //$LASTPOS=18001977;
    i = 0;
    while(i<16) {
      {
        //$LASTPOS=18002001;
        //$LASTPOS=18002005;
        j = 0;
        while(j<8) {
          {
            //$LASTPOS=18002032;
            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
            //$LASTPOS=18002076;
            _this.counter++;
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=18002098;
    _this.mode="get";
    //$LASTPOS=18002111;
    _this.prevMode="set";
    //$LASTPOS=18002128;
    _this.mapp=0;
    //$LASTPOS=18002137;
    _this.mx=0;
    //$LASTPOS=18002144;
    _this.my=0;
    //$LASTPOS=18002151;
    _this.chipX=0;
    //$LASTPOS=18002161;
    _this.chipY=0;
    //$LASTPOS=18002171;
    _this.x=Tonyu.globals.$screenWidth-16;
    //$LASTPOS=18002191;
    _this.y=Tonyu.globals.$screenHeight-16;
    //$LASTPOS=18002212;
    while (true) {
      //$LASTPOS=18002230;
      _this.p=_this.mapp;
      //$LASTPOS=18002243;
      if (_this.getkey("e")==1) {
        //$LASTPOS=18002272;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=18002306;
        _this.mode="erase";
        //$LASTPOS=18002329;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=18002362;
      if (_this.getkey("s")==1) {
        //$LASTPOS=18002391;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=18002425;
        if (_this.mode=="set") {
          //$LASTPOS=18002455;
          _this.mode="setOn";
          
        } else {
          //$LASTPOS=18002498;
          _this.mode="set";
          
        }
        //$LASTPOS=18002530;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=18002563;
      if (_this.getkey("o")==1) {
        //$LASTPOS=18002592;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=18002626;
        _this.mode="setOn";
        
      }
      //$LASTPOS=18002652;
      if (_this.getkey("g")==1) {
        //$LASTPOS=18002681;
        if (_this.mode!="get") {
          //$LASTPOS=18002711;
          _this.prevMode=_this.mode;
          //$LASTPOS=18002739;
          Tonyu.globals.$mp.scrollTo(0,0);
          //$LASTPOS=18002771;
          _this.mode="get";
          //$LASTPOS=18002796;
          _this.chipX=0;
          //$LASTPOS=18002818;
          _this.chipY=0;
          
        } else {
          //$LASTPOS=18002856;
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=18002894;
          _this.mode=_this.prevMode;
          
        }
        //$LASTPOS=18002929;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=18002962;
      if (_this.getkey("p")==1) {
        //$LASTPOS=18003006;
        _this.saveFileName=prompt("input json file(*.json)","map.json");
        //$LASTPOS=18003495;
        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
        //$LASTPOS=18003553;
        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
        //$LASTPOS=18003668;
        _this.saveDataFile.obj(_this.data);
        //$LASTPOS=18003701;
        _this.print(_this.saveFileName+" Saved");
        
      }
      //$LASTPOS=18003793;
      if (_this.getkey("c")==1) {
        //$LASTPOS=18003822;
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=18003856;
        _this.mode="spuit";
        //$LASTPOS=18003879;
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=18003912;
      if (_this.mode!="get") {
        //$LASTPOS=18003938;
        if (_this.getkey("left")>0) {
          //$LASTPOS=18003959;
          _this.mx=_this.mx+8;
        }
        //$LASTPOS=18003977;
        if (_this.getkey("right")>0) {
          //$LASTPOS=18003999;
          _this.mx=_this.mx-8;
        }
        //$LASTPOS=18004017;
        if (_this.getkey("up")>0) {
          //$LASTPOS=18004036;
          _this.my=_this.my+8;
        }
        //$LASTPOS=18004054;
        if (_this.getkey("down")>0) {
          //$LASTPOS=18004075;
          _this.my=_this.my-8;
        }
        //$LASTPOS=18004093;
        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
        
      } else {
        //$LASTPOS=18004136;
        if (_this.getkey("left")>0) {
          //$LASTPOS=18004157;
          _this.chipX=_this.chipX+8;
        }
        //$LASTPOS=18004181;
        if (_this.getkey("right")>0) {
          //$LASTPOS=18004203;
          _this.chipX=_this.chipX-8;
        }
        //$LASTPOS=18004227;
        if (_this.getkey("up")>0) {
          //$LASTPOS=18004246;
          _this.chipY=_this.chipY+8;
        }
        //$LASTPOS=18004270;
        if (_this.getkey("down")>0) {
          //$LASTPOS=18004291;
          _this.chipY=_this.chipY-8;
        }
        //$LASTPOS=18004315;
        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
        
      }
      //$LASTPOS=18004354;
      _this.panel.x=_this.panel.width/2-_this.mx;
      //$LASTPOS=18004385;
      _this.panel.y=_this.panel.height/2-_this.my;
      //$LASTPOS=18004417;
      if (_this.mode=="set"&&_this.getkey(1)>0) {
        //$LASTPOS=18004458;
        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
        //$LASTPOS=18004507;
        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
        
      } else {
        //$LASTPOS=18004558;
        if (_this.mode=="erase"&&_this.getkey(1)>0) {
          //$LASTPOS=18004601;
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=18004650;
          if (_this.mode=="get"&&_this.getkey(1)>0) {
            //$LASTPOS=18004691;
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=18004745;
            _this.mode=_this.prevMode;
            //$LASTPOS=18004769;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=18004803;
            _this.print(_this.mode+" mode");
            //$LASTPOS=18004833;
            _this.updateEx(10);
            
          } else {
            //$LASTPOS=18004858;
            if (_this.mode=="setOn"&&_this.getkey(1)>0) {
              //$LASTPOS=18004901;
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=18004954;
              if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                //$LASTPOS=18004997;
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=18005046;
                _this.mode="set";
                //$LASTPOS=18005067;
                _this.print(_this.mode+" mode");
                //$LASTPOS=18005097;
                _this.updateEx(10);
                
              }
            }
          }
        }
      }
      //$LASTPOS=18005123;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_18000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=18000032;
    _this.loadMode=false;
    //$LASTPOS=18000049;
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_func_18000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000079;
        case 1:
          //$LASTPOS=18000097;
          if (!(_this.getkey("y")>0)) { __pc=2; break; }
          //$LASTPOS=18000125;
          _this.loadMode=true;
          __pc=5; break;
          
        case 2:
          
          //$LASTPOS=18000168;
          if (!(_this.getkey("n")>0)) { __pc=3; break; }
          //$LASTPOS=18000196;
          _this.loadMode=false;
          __pc=5; break;
          
        case 3:
          
          //$LASTPOS=18000240;
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          //$LASTPOS=18000254;
          if (!(_this.loadMode)) { __pc=9; break; }
          //$LASTPOS=18000273;
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=18000334;
          if (_this.fileName) {
            //$LASTPOS=18000357;
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=18000413;
          if (!(_this.mapDataFile.obj())) { __pc=6; break; }
          {
            //$LASTPOS=18000445;
            _this.baseData=_this.mapDataFile.obj();
          }
          __pc=8;break;
        case 6:
          //$LASTPOS=18000494;
          _this.fiber$file(_thread, _this.fileName);
          __pc=7;return;
        case 7:
          _this.mapDataFile=_thread.retVal;
          
          //$LASTPOS=18000531;
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=18000567;
            _this.baseData=_this.mapDataFile.obj();
            
          }
        case 8:
          
          //$LASTPOS=18000618;
          if (_this.baseData==undefined) {
            //$LASTPOS=18000652;
            _this.print("Load failed");
            //$LASTPOS=18000683;
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=18000710;
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=18000751;
              _this.mapData=_this.baseData[0];
              //$LASTPOS=18000781;
              _this.mapOnData=_this.baseData[1];
              
            }
          }
        case 9:
          
          //$LASTPOS=18000815;
          _this.fiber$update(_thread);
          __pc=10;return;
        case 10:
          
          //$LASTPOS=18001093;
          if (!(! _this.loadMode)) { __pc=12; break; }
          //$LASTPOS=18001113;
          _this.row=prompt("input row");
          //$LASTPOS=18001143;
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=18001158;
          _this.col=prompt("input col");
          //$LASTPOS=18001188;
          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
          //$LASTPOS=18001238;
          _this.panel.x=_this.panel.width/2+10;
          //$LASTPOS=18001269;
          _this.panel.y=_this.panel.height/2;
          //$LASTPOS=18001298;
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=18001331;
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=18001382;
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
          __pc=13;break;
        case 12:
          {
            //$LASTPOS=18001445;
            if (! _this.mapOnData) {
              //$LASTPOS=18001470;
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
              
            } else {
              //$LASTPOS=18001582;
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
              
            }
            //$LASTPOS=18001695;
            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
            //$LASTPOS=18001766;
            _this.panel.x=_this.panel.width/2;
            //$LASTPOS=18001794;
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=18001823;
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=18001856;
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          }
        case 13:
          
          //$LASTPOS=18001906;
          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
          //$LASTPOS=18001961;
          _this.counter=0;
          //$LASTPOS=18001973;
          //$LASTPOS=18001977;
          i = 0;
          while(i<16) {
            {
              //$LASTPOS=18002001;
              //$LASTPOS=18002005;
              j = 0;
              while(j<8) {
                {
                  //$LASTPOS=18002032;
                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                  //$LASTPOS=18002076;
                  _this.counter++;
                }
                j++;
              }
            }
            i++;
          }
          //$LASTPOS=18002098;
          _this.mode="get";
          //$LASTPOS=18002111;
          _this.prevMode="set";
          //$LASTPOS=18002128;
          _this.mapp=0;
          //$LASTPOS=18002137;
          _this.mx=0;
          //$LASTPOS=18002144;
          _this.my=0;
          //$LASTPOS=18002151;
          _this.chipX=0;
          //$LASTPOS=18002161;
          _this.chipY=0;
          //$LASTPOS=18002171;
          _this.x=Tonyu.globals.$screenWidth-16;
          //$LASTPOS=18002191;
          _this.y=Tonyu.globals.$screenHeight-16;
          //$LASTPOS=18002212;
        case 14:
          //$LASTPOS=18002230;
          _this.p=_this.mapp;
          //$LASTPOS=18002243;
          if (_this.getkey("e")==1) {
            //$LASTPOS=18002272;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=18002306;
            _this.mode="erase";
            //$LASTPOS=18002329;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=18002362;
          if (_this.getkey("s")==1) {
            //$LASTPOS=18002391;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=18002425;
            if (_this.mode=="set") {
              //$LASTPOS=18002455;
              _this.mode="setOn";
              
            } else {
              //$LASTPOS=18002498;
              _this.mode="set";
              
            }
            //$LASTPOS=18002530;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=18002563;
          if (_this.getkey("o")==1) {
            //$LASTPOS=18002592;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=18002626;
            _this.mode="setOn";
            
          }
          //$LASTPOS=18002652;
          if (_this.getkey("g")==1) {
            //$LASTPOS=18002681;
            if (_this.mode!="get") {
              //$LASTPOS=18002711;
              _this.prevMode=_this.mode;
              //$LASTPOS=18002739;
              Tonyu.globals.$mp.scrollTo(0,0);
              //$LASTPOS=18002771;
              _this.mode="get";
              //$LASTPOS=18002796;
              _this.chipX=0;
              //$LASTPOS=18002818;
              _this.chipY=0;
              
            } else {
              //$LASTPOS=18002856;
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=18002894;
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=18002929;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=18002962;
          if (_this.getkey("p")==1) {
            //$LASTPOS=18003006;
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            //$LASTPOS=18003495;
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=18003553;
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
            //$LASTPOS=18003668;
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=18003701;
            _this.print(_this.saveFileName+" Saved");
            
          }
          //$LASTPOS=18003793;
          if (_this.getkey("c")==1) {
            //$LASTPOS=18003822;
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=18003856;
            _this.mode="spuit";
            //$LASTPOS=18003879;
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=18003912;
          if (_this.mode!="get") {
            //$LASTPOS=18003938;
            if (_this.getkey("left")>0) {
              //$LASTPOS=18003959;
              _this.mx=_this.mx+8;
            }
            //$LASTPOS=18003977;
            if (_this.getkey("right")>0) {
              //$LASTPOS=18003999;
              _this.mx=_this.mx-8;
            }
            //$LASTPOS=18004017;
            if (_this.getkey("up")>0) {
              //$LASTPOS=18004036;
              _this.my=_this.my+8;
            }
            //$LASTPOS=18004054;
            if (_this.getkey("down")>0) {
              //$LASTPOS=18004075;
              _this.my=_this.my-8;
            }
            //$LASTPOS=18004093;
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            
          } else {
            //$LASTPOS=18004136;
            if (_this.getkey("left")>0) {
              //$LASTPOS=18004157;
              _this.chipX=_this.chipX+8;
            }
            //$LASTPOS=18004181;
            if (_this.getkey("right")>0) {
              //$LASTPOS=18004203;
              _this.chipX=_this.chipX-8;
            }
            //$LASTPOS=18004227;
            if (_this.getkey("up")>0) {
              //$LASTPOS=18004246;
              _this.chipY=_this.chipY+8;
            }
            //$LASTPOS=18004270;
            if (_this.getkey("down")>0) {
              //$LASTPOS=18004291;
              _this.chipY=_this.chipY-8;
            }
            //$LASTPOS=18004315;
            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
            
          }
          //$LASTPOS=18004354;
          _this.panel.x=_this.panel.width/2-_this.mx;
          //$LASTPOS=18004385;
          _this.panel.y=_this.panel.height/2-_this.my;
          //$LASTPOS=18004417;
          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
          {
            //$LASTPOS=18004458;
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=18004507;
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=25;break;
        case 15:
          //$LASTPOS=18004558;
          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
          {
            //$LASTPOS=18004601;
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=24;break;
        case 16:
          //$LASTPOS=18004650;
          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
          //$LASTPOS=18004691;
          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
          //$LASTPOS=18004745;
          _this.mode=_this.prevMode;
          //$LASTPOS=18004769;
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=18004803;
          _this.print(_this.mode+" mode");
          //$LASTPOS=18004833;
          _this.fiber$updateEx(_thread, 10);
          __pc=17;return;
        case 17:
          
          __pc=23;break;
        case 18:
          //$LASTPOS=18004858;
          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
          {
            //$LASTPOS=18004901;
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          }
          __pc=22;break;
        case 19:
          //$LASTPOS=18004954;
          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
          //$LASTPOS=18004997;
          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
          //$LASTPOS=18005046;
          _this.mode="set";
          //$LASTPOS=18005067;
          _this.print(_this.mode+" mode");
          //$LASTPOS=18005097;
          _this.fiber$updateEx(_thread, 10);
          __pc=20;return;
        case 20:
          
        case 21:
          
        case 22:
          
        case 23:
          
        case 24:
          
        case 25:
          
          //$LASTPOS=18005123;
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
Tonyu.classes.kernel.MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_19000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_19000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_19000002_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$play :function _trc_func_19000002_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_19000022_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$stop :function _trc_func_19000022_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  playSE :function _trc_func_19000042_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  setDelay :function _trc_func_19000064_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setDelay :function _trc_func_19000064_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setVolume :function _trc_func_19000087_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$setVolume :function _trc_func_19000087_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MediaPlayer,{"fullName":"kernel.MediaPlayer","namespace":"kernel","shortName":"MediaPlayer","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"stop":{"nowait":false},"playSE":{"nowait":true},"setDelay":{"nowait":false},"setVolume":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Pad=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_20000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001202;
    _this.APAD_DIAG_SIZE=96;
    //$LASTPOS=20003465;
    while (true) {
      //$LASTPOS=20003484;
      _this.padUpdate();
      //$LASTPOS=20003502;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_20000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001202;
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_func_20000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20003465;
        case 1:
          //$LASTPOS=20003484;
          _this.fiber$padUpdate(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=20003502;
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
  initialize :function _trc_func_20000016_3(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000033;
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=20000050;
    _this.padImageP=Tonyu.globals.$pat_inputPad;
    //$LASTPOS=20000082;
    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000183;
    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000292;
    _this.jujiKey.show();
    //$LASTPOS=20000313;
    _this.no1Key.show();
    //$LASTPOS=20000339;
    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000446;
    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000553;
    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000660;
    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000767;
    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=20000879;
    _this.jujiKeyPushU.hide();
    //$LASTPOS=20000905;
    _this.jujiKeyPushL.hide();
    //$LASTPOS=20000931;
    _this.jujiKeyPushR.hide();
    //$LASTPOS=20000957;
    _this.jujiKeyPushD.hide();
    //$LASTPOS=20000983;
    _this.jujiKeyPush1.hide();
  },
  die :function _trc_func_20001008_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001021;
    _this.jujiKey.die();
    //$LASTPOS=20001041;
    _this.no1Key.die();
    //$LASTPOS=20001060;
    _this.jujiKeyPushU.die();
    //$LASTPOS=20001085;
    _this.jujiKeyPushL.die();
    //$LASTPOS=20001110;
    _this.jujiKeyPushR.die();
    //$LASTPOS=20001135;
    _this.jujiKeyPushD.die();
    //$LASTPOS=20001160;
    _this.jujiKeyPush1.die();
    //$LASTPOS=20001185;
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  padUpdate :function _trc_func_20001224_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var t;
    
    //$LASTPOS=20001258;
    _this.keyPushL=0;
    //$LASTPOS=20001277;
    _this.keyPushR=0;
    //$LASTPOS=20001296;
    _this.keyPushU=0;
    //$LASTPOS=20001315;
    _this.keyPushD=0;
    //$LASTPOS=20001334;
    _this.keyPush1=0;
    //$LASTPOS=20001359;
    _this.padKeyNotapCnt++;
    //$LASTPOS=20001383;
    //$LASTPOS=20001388;
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=20001436;
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=20001466;
        if (t.touched) {
          //$LASTPOS=20001496;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=20001593;
            _this.keyPushU=1;
          }
          //$LASTPOS=20001620;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=20001717;
            _this.keyPushD=1;
          }
          //$LASTPOS=20001744;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=20001841;
            _this.keyPushL=1;
          }
          //$LASTPOS=20001868;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=20001965;
            _this.keyPushR=1;
          }
          //$LASTPOS=20001992;
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=20002054;
            _this.keyPush1=1;
          }
          //$LASTPOS=20002081;
          _this.padKeySW=1;
          //$LASTPOS=20002108;
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=20002173;
    if (_this.keyPushL) {
      //$LASTPOS=20002187;
      _this.keyCntL++;
    } else {
      //$LASTPOS=20002204;
      _this.keyCntL=0;
    }
    //$LASTPOS=20002222;
    if (_this.keyPushR) {
      //$LASTPOS=20002236;
      _this.keyCntR++;
    } else {
      //$LASTPOS=20002253;
      _this.keyCntR=0;
    }
    //$LASTPOS=20002271;
    if (_this.keyPushU) {
      //$LASTPOS=20002285;
      _this.keyCntU++;
    } else {
      //$LASTPOS=20002302;
      _this.keyCntU=0;
    }
    //$LASTPOS=20002320;
    if (_this.keyPushD) {
      //$LASTPOS=20002334;
      _this.keyCntD++;
    } else {
      //$LASTPOS=20002351;
      _this.keyCntD=0;
    }
    //$LASTPOS=20002369;
    if (_this.keyPush1) {
      //$LASTPOS=20002383;
      _this.keyCnt1++;
    } else {
      //$LASTPOS=20002400;
      _this.keyCnt1=0;
    }
    //$LASTPOS=20002435;
    if (_this.keyPushL) {
      //$LASTPOS=20002449;
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=20002475;
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=20002501;
    if (_this.keyPushR) {
      //$LASTPOS=20002515;
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=20002541;
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=20002567;
    if (_this.keyPushU) {
      //$LASTPOS=20002581;
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=20002607;
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=20002633;
    if (_this.keyPushD) {
      //$LASTPOS=20002647;
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=20002673;
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=20002699;
    if (_this.keyPush1) {
      //$LASTPOS=20002713;
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=20002739;
      _this.jujiKeyPush1.hide();
    }
  },
  fiber$padUpdate :function _trc_func_20001224_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var t;
    
    //$LASTPOS=20001258;
    _this.keyPushL=0;
    //$LASTPOS=20001277;
    _this.keyPushR=0;
    //$LASTPOS=20001296;
    _this.keyPushU=0;
    //$LASTPOS=20001315;
    _this.keyPushD=0;
    //$LASTPOS=20001334;
    _this.keyPush1=0;
    //$LASTPOS=20001359;
    _this.padKeyNotapCnt++;
    //$LASTPOS=20001383;
    //$LASTPOS=20001388;
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=20001436;
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=20001466;
        if (t.touched) {
          //$LASTPOS=20001496;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=20001593;
            _this.keyPushU=1;
          }
          //$LASTPOS=20001620;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=20001717;
            _this.keyPushD=1;
          }
          //$LASTPOS=20001744;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=20001841;
            _this.keyPushL=1;
          }
          //$LASTPOS=20001868;
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=20001965;
            _this.keyPushR=1;
          }
          //$LASTPOS=20001992;
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=20002054;
            _this.keyPush1=1;
          }
          //$LASTPOS=20002081;
          _this.padKeySW=1;
          //$LASTPOS=20002108;
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=20002173;
    if (_this.keyPushL) {
      //$LASTPOS=20002187;
      _this.keyCntL++;
    } else {
      //$LASTPOS=20002204;
      _this.keyCntL=0;
    }
    //$LASTPOS=20002222;
    if (_this.keyPushR) {
      //$LASTPOS=20002236;
      _this.keyCntR++;
    } else {
      //$LASTPOS=20002253;
      _this.keyCntR=0;
    }
    //$LASTPOS=20002271;
    if (_this.keyPushU) {
      //$LASTPOS=20002285;
      _this.keyCntU++;
    } else {
      //$LASTPOS=20002302;
      _this.keyCntU=0;
    }
    //$LASTPOS=20002320;
    if (_this.keyPushD) {
      //$LASTPOS=20002334;
      _this.keyCntD++;
    } else {
      //$LASTPOS=20002351;
      _this.keyCntD=0;
    }
    //$LASTPOS=20002369;
    if (_this.keyPush1) {
      //$LASTPOS=20002383;
      _this.keyCnt1++;
    } else {
      //$LASTPOS=20002400;
      _this.keyCnt1=0;
    }
    //$LASTPOS=20002435;
    if (_this.keyPushL) {
      //$LASTPOS=20002449;
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=20002475;
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=20002501;
    if (_this.keyPushR) {
      //$LASTPOS=20002515;
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=20002541;
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=20002567;
    if (_this.keyPushU) {
      //$LASTPOS=20002581;
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=20002607;
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=20002633;
    if (_this.keyPushD) {
      //$LASTPOS=20002647;
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=20002673;
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=20002699;
    if (_this.keyPush1) {
      //$LASTPOS=20002713;
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=20002739;
      _this.jujiKeyPush1.hide();
    }
    
    _thread.retVal=_this;return;
  },
  getPadUp :function _trc_func_20002772_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getPadUp :function _trc_func_20002772_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadDown :function _trc_func_20002808_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getPadDown :function _trc_func_20002808_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadLeft :function _trc_func_20002844_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getPadLeft :function _trc_func_20002844_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadRight :function _trc_func_20002880_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getPadRight :function _trc_func_20002880_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadButton :function _trc_func_20002916_15(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=20002940;
    value;
    //$LASTPOS=20002956;
    if (i==0) {
      //$LASTPOS=20002968;
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_func_20002916_16(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=20002940;
    value;
    //$LASTPOS=20002956;
    if (i==0) {
      //$LASTPOS=20002968;
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  getUp :function _trc_func_20003010_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getUp :function _trc_func_20003010_18(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getDown :function _trc_func_20003043_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getDown :function _trc_func_20003043_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getLeft :function _trc_func_20003076_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getLeft :function _trc_func_20003076_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getRight :function _trc_func_20003109_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getRight :function _trc_func_20003109_24(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getButton :function _trc_func_20003142_25(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=20003163;
    value;
    //$LASTPOS=20003179;
    if (i==0) {
      //$LASTPOS=20003191;
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_func_20003142_26(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=20003163;
    value;
    //$LASTPOS=20003179;
    if (i==0) {
      //$LASTPOS=20003191;
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRect :function _trc_func_20003243_27(mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
  },
  fiber$isOnRect :function _trc_func_20003243_28(_thread,mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRectWH :function _trc_func_20003357_29(mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
  },
  fiber$isOnRectWH :function _trc_func_20003357_30(_thread,mx,my,rx,ry,rw,rh) {
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
  main :function _trc_func_21000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_21000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_21000056_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000072;
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=21000089;
    _this.width=_this.width;
    //$LASTPOS=21000112;
    _this.height=_this.height;
    //$LASTPOS=21000137;
    if (_this.align==null) {
      //$LASTPOS=21000153;
      _this.align="center";
    }
    //$LASTPOS=21000174;
    if (_this.alpha==null) {
      //$LASTPOS=21000190;
      _this.alpha=255;
    }
    //$LASTPOS=21000206;
    if (_this._drawn==null) {
      //$LASTPOS=21000223;
      _this._drawn=false;
    }
    //$LASTPOS=21000242;
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_func_21000284_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000314;
    _this.width=width;
    //$LASTPOS=21000337;
    _this.height=height;
    //$LASTPOS=21000362;
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_func_21000284_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000314;
    _this.width=width;
    //$LASTPOS=21000337;
    _this.height=height;
    //$LASTPOS=21000362;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_func_21000404_5(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000432;
    _this.setPanel(width,height);
  },
  fiber$resize :function _trc_func_21000404_6(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000404_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000432;
          _this.fiber$setPanel(_thread, width, height);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getContext :function _trc_func_21000460_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000480;
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_func_21000460_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000480;
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_func_21000534_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000561;
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_func_21000534_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=21000561;
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_func_21000587_12(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000629;
    _this.ctx=_this.getContext();
    //$LASTPOS=21000652;
    _this.ctx.save();
    //$LASTPOS=21000719;
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=21000749;
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=21000794;
    _this.ctx.restore();
  },
  fiber$fillRect :function _trc_func_21000587_13(_thread,x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000587_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000629;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21000652;
          _this.ctx.save();
          //$LASTPOS=21000719;
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=21000749;
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=21000794;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_func_21000813_15(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21000850;
    _this.ctx=_this.getContext();
    //$LASTPOS=21000873;
    _this.ctx.save();
    //$LASTPOS=21000940;
    _this.ctx.textAlign=align;
    //$LASTPOS=21000968;
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=21000998;
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=21001037;
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=21001066;
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_func_21000813_16(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21000813_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000850;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21000873;
          _this.ctx.save();
          //$LASTPOS=21000940;
          _this.ctx.textAlign=align;
          //$LASTPOS=21000968;
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=21000998;
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=21001037;
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=21001066;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_func_21001085_18(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001131;
    _this.ctx=_this.getContext();
    //$LASTPOS=21001154;
    _this.ctx.save();
    //$LASTPOS=21001171;
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=21001220;
    _this.ctx.restore();
  },
  fiber$clearRect :function _trc_func_21001085_19(_thread,clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001085_20(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001131;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001154;
          _this.ctx.save();
          //$LASTPOS=21001171;
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=21001220;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_func_21001239_21(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001266;
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=21001365;
      _this.ctx=_this.getContext();
      //$LASTPOS=21001392;
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=21001444;
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=21001584;
      _this.colordata=[0,0,0,0];
      
    }
    return (_this.colordata);
  },
  fiber$getPixel :function _trc_func_21001239_22(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001239_23(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001266;
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=21001365;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001392;
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=21001444;
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=21001584;
            _this.colordata=[0,0,0,0];
          }
        case 3:
          
          _thread.exit((_this.colordata));return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  scroll :function _trc_func_21001640_24(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001671;
    _this.ctx=_this.getContext();
    //$LASTPOS=21001694;
    _this.ctx.save();
    //$LASTPOS=21001711;
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=21001772;
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=21001806;
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=21001858;
    _this.ctx.restore();
  },
  fiber$scroll :function _trc_func_21001640_25(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_21001640_26(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21001671;
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=21001694;
          _this.ctx.save();
          //$LASTPOS=21001711;
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=21001772;
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=21001806;
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=21001858;
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_21001877_27(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=21001894;
    if (_this._drawn) {
      //$LASTPOS=21001915;
      _this.pImg=_this.buf[0];
      //$LASTPOS=21001937;
      ctx.save();
      //$LASTPOS=21001958;
      if (_this.align=="left") {
        //$LASTPOS=21001990;
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=21002042;
        if (_this.align=="center") {
          //$LASTPOS=21002076;
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=21002111;
          if (_this.align=="right") {
            //$LASTPOS=21002144;
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=21002201;
      if (_this.rotation!=0) {
        //$LASTPOS=21002236;
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=21002304;
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=21002361;
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=21002402;
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=21002506;
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_22000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_22000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_22000047_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=22000066;
    if (Tonyu.runMode) {
      //$LASTPOS=22000096;
      thg = _this.currentThreadGroup();
      //$LASTPOS=22000135;
      if (thg) {
        //$LASTPOS=22000144;
        _this._th=thg.addObj(_this,"tMain");
      }
      //$LASTPOS=22000183;
      _this.initSprite();
      
    }
    //$LASTPOS=22000209;
    if (typeof  x=="object") {
      //$LASTPOS=22000233;
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=22000266;
      if (typeof  x=="number") {
        //$LASTPOS=22000301;
        _this.x=x;
        //$LASTPOS=22000320;
        _this.y=y;
        //$LASTPOS=22000339;
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_func_22000360_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000376;
    _this.onDraw();
    //$LASTPOS=22000391;
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=22000422;
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_func_22000441_4(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000463;
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_22000441_5(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000463;
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  onDraw :function _trc_func_22000484_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onDraw :function _trc_func_22000484_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_22000506_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000523;
    _this.onUpdate();
    //$LASTPOS=22000540;
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_func_22000506_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000523;
    _this.onUpdate();
    
    _thread.enter(function _trc_func_22000506_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000540;
          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_func_22000560_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  initSprite :function _trc_func_22000584_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000605;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=22000657;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=22000695;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=22000727;
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_22000584_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22000605;
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=22000657;
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=22000695;
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_22000584_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000727;
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  tMain :function _trc_func_22000743_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000759;
    _this.main();
    //$LASTPOS=22000772;
    _this.die();
  },
  fiber$tMain :function _trc_func_22000743_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_22000743_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22000759;
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=22000772;
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  color :function _trc_func_22000783_18(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_22000783_19(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_22000845_20(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=22000881;
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=22000906;
    if (! size) {
      //$LASTPOS=22000917;
      size=15;
    }
    //$LASTPOS=22000931;
    if (! col) {
      //$LASTPOS=22000941;
      col="cyan";
    }
    //$LASTPOS=22000958;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=22001012;
    if (tp.length>0) {
      //$LASTPOS=22001040;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=22001119;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_22000845_21(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=22000881;
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=22000906;
    if (! size) {
      //$LASTPOS=22000917;
      size=15;
    }
    //$LASTPOS=22000931;
    if (! col) {
      //$LASTPOS=22000941;
      col="cyan";
    }
    //$LASTPOS=22000958;
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=22001012;
    if (tp.length>0) {
      //$LASTPOS=22001040;
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=22001119;
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_22001174_22(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=22001206;
    if (! col) {
      //$LASTPOS=22001216;
      col="white";
    }
    //$LASTPOS=22001234;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=22001288;
    if (tp.length>0) {
      //$LASTPOS=22001316;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=22001367;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_22001174_23(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=22001206;
    if (! col) {
      //$LASTPOS=22001216;
      col="white";
    }
    //$LASTPOS=22001234;
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=22001288;
    if (tp.length>0) {
      //$LASTPOS=22001316;
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=22001367;
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  appear :function _trc_func_22001407_24(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return t;
  },
  fiber$appear :function _trc_func_22001407_25(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=t;return;
    
    
    _thread.retVal=_this;return;
  },
  trunc :function _trc_func_22001439_26(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.trunc(f);
  },
  loadPage :function _trc_func_22001482_27(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001508;
    _this.all().die();
    //$LASTPOS=22001526;
    new page(arg);
    //$LASTPOS=22001546;
    _this.die();
  },
  fiber$loadPage :function _trc_func_22001482_28(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22001508;
    _this.all().die();
    //$LASTPOS=22001526;
    new page(arg);
    //$LASTPOS=22001546;
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_23000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_23000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_23000077_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000095;
    _this.extend(opt);
    //$LASTPOS=23000142;
    _this.resize(_this.width,_this.height);
    //$LASTPOS=23000170;
    _this.cw=_this.canvas.width();
    //$LASTPOS=23000194;
    _this.ch=_this.canvas.height();
    //$LASTPOS=23000219;
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=23000257;
    _this.color="rgb(20,80,180)";
    //$LASTPOS=23000291;
    _this.sx=0;
    //$LASTPOS=23000302;
    _this.sy=0;
    //$LASTPOS=23000313;
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_func_23000349_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000378;
    _this.width=width;
    //$LASTPOS=23000401;
    _this.height=height;
    //$LASTPOS=23000426;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=23000469;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=23000505;
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=23000530;
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=23000557;
    if (Tonyu.globals.$panel) {
      //$LASTPOS=23000578;
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_func_23000349_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000378;
    _this.width=width;
    //$LASTPOS=23000401;
    _this.height=height;
    //$LASTPOS=23000426;
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=23000469;
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=23000505;
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=23000530;
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=23000557;
    if (Tonyu.globals.$panel) {
      //$LASTPOS=23000578;
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_func_23000634_5(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=23000712;
    larger = 200;
    //$LASTPOS=23000733;
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_func_23000634_6(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=23000712;
    larger = 200;
    //$LASTPOS=23000733;
    smaller = 5;
    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_23000853_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=23000868;
    _this.cw=_this.canvas.width();
    //$LASTPOS=23000892;
    _this.ch=_this.canvas.height();
    //$LASTPOS=23000917;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=23000961;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=23001005;
    if (calch>_this.ch) {
      //$LASTPOS=23001019;
      calch=_this.ch;
    }
    //$LASTPOS=23001034;
    if (calcw>_this.cw) {
      //$LASTPOS=23001048;
      calcw=_this.cw;
    }
    //$LASTPOS=23001063;
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=23001095;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=23001151;
      calcw=_this.width;
      //$LASTPOS=23001163;
      calch=_this.height;
      
    }
    //$LASTPOS=23001189;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=23001232;
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=23001275;
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_func_23001364_8(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=23001390;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=23001434;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=23001478;
    if (calch>_this.ch) {
      //$LASTPOS=23001492;
      calch=_this.ch;
    }
    //$LASTPOS=23001507;
    if (calcw>_this.cw) {
      //$LASTPOS=23001521;
      calcw=_this.cw;
    }
    //$LASTPOS=23001536;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=23001592;
      calcw=_this.width;
      //$LASTPOS=23001604;
      calch=_this.height;
      
    }
    //$LASTPOS=23001630;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=23001673;
    marginh = Math.floor((_this.ch-calch)/2);
    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
  },
  fiber$canvas2buf :function _trc_func_23001364_9(_thread,point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=23001390;
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=23001434;
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=23001478;
    if (calch>_this.ch) {
      //$LASTPOS=23001492;
      calch=_this.ch;
    }
    //$LASTPOS=23001507;
    if (calcw>_this.cw) {
      //$LASTPOS=23001521;
      calcw=_this.cw;
    }
    //$LASTPOS=23001536;
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=23001592;
      calcw=_this.width;
      //$LASTPOS=23001604;
      calch=_this.height;
      
    }
    //$LASTPOS=23001630;
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=23001673;
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_23001810_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001835;
    _this.color=color;
  },
  fiber$setBGColor :function _trc_func_23001810_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23001835;
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_func_23001857_12(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=23001879;
    ctx = cv.getContext("2d");
    //$LASTPOS=23001913;
    ctx.save();
    //$LASTPOS=23001930;
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=23001964;
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=23001990;
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=23002033;
    if (_this.isDrawGrid) {
      //$LASTPOS=23002049;
      _this.drawGrid(cv);
    }
    //$LASTPOS=23002068;
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_func_23001857_13(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=23001879;
    ctx = cv.getContext("2d");
    //$LASTPOS=23001913;
    ctx.save();
    //$LASTPOS=23001930;
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=23001964;
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=23001990;
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=23002033;
    if (_this.isDrawGrid) {
      //$LASTPOS=23002049;
      _this.drawGrid(cv);
    }
    //$LASTPOS=23002068;
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_23002087_14(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23002412;
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_func_23002087_15(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23002412;
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_24000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_24000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_24000022_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_25000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_25000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_25000022_2(x,y,p,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000043;
    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
    //$LASTPOS=25000062;
    _this.f=f;
    //$LASTPOS=25000077;
    if (! _this.x) {
      //$LASTPOS=25000090;
      _this.x=0;
    }
    //$LASTPOS=25000105;
    if (! _this.y) {
      //$LASTPOS=25000118;
      _this.y=0;
    }
    //$LASTPOS=25000133;
    if (! _this.p) {
      //$LASTPOS=25000146;
      _this.p=0;
    }
  },
  draw :function _trc_func_25000160_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000176;
    if (_this.f) {
      //$LASTPOS=25000194;
      if (! _this.scaleY) {
        //$LASTPOS=25000207;
        _this.scaleY=_this.scaleX;
      }
      //$LASTPOS=25000231;
      _this.scaleX*=- 1;
      
    }
    //$LASTPOS=25000255;
    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=25000275;
    if (_this.f) {
      //$LASTPOS=25000282;
      _this.scaleX*=- 1;
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_26000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_26000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_26000031_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000045;
    _this.sprites=[];
    //$LASTPOS=26000062;
    _this.imageList=[];
    //$LASTPOS=26000081;
    _this.hitWatchers=[];
    //$LASTPOS=26000102;
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=26000136;
    _this.sx=0;
    //$LASTPOS=26000147;
    _this.sy=0;
    //$LASTPOS=26000158;
    _this.objId=0;
  },
  add :function _trc_func_26000171_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000194;
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=26000231;
    _this.sprites.push(s);
    //$LASTPOS=26000253;
    if (s.__genId==null) {
      //$LASTPOS=26000283;
      s.__genId=_this.objId;
      //$LASTPOS=26000309;
      _this.objId++;
      
    }
    //$LASTPOS=26000330;
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_func_26000171_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000194;
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=26000231;
    _this.sprites.push(s);
    //$LASTPOS=26000253;
    if (s.__genId==null) {
      //$LASTPOS=26000283;
      s.__genId=_this.objId;
      //$LASTPOS=26000309;
      _this.objId++;
      
    }
    //$LASTPOS=26000330;
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_func_26000374_5(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=26000400;
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=26000433;
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=26000457;
    _this.sprites.splice(idx,1);
    //$LASTPOS=26000485;
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_func_26000374_6(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=26000400;
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=26000433;
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=26000457;
    _this.sprites.splice(idx,1);
    //$LASTPOS=26000485;
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_func_26000516_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26000534;
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_func_26000516_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26000534;
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_func_26000570_9(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=26000607;
    val1 = obj1.zOrder;
    //$LASTPOS=26000634;
    val2 = obj2.zOrder;
    //$LASTPOS=26000661;
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=26000707;
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=26000752;
        if (val1==val2) {
          //$LASTPOS=26000777;
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
  fiber$compOrder :function _trc_func_26000570_10(_thread,obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var val1;
    var val2;
    
    //$LASTPOS=26000607;
    val1 = obj1.zOrder;
    //$LASTPOS=26000634;
    val2 = obj2.zOrder;
    //$LASTPOS=26000661;
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=26000707;
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=26000752;
        if (val1==val2) {
          //$LASTPOS=26000777;
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
  draw :function _trc_func_26000912_11(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var orderArray;
    
    //$LASTPOS=26000937;
    ctx = cv.getContext("2d");
    //$LASTPOS=26000971;
    ctx.save();
    //$LASTPOS=26001116;
    orderArray = [];
    //$LASTPOS=26001140;
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=26001184;
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=26001217;
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=26001246;
    orderArray.forEach(function (s) {
      
      //$LASTPOS=26001280;
      s.draw(ctx);
    });
    //$LASTPOS=26001307;
    ctx.restore();
  },
  checkHit :function _trc_func_26001326_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26001353;
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=26001397;
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=26001485;
        a_owner = a;
        //$LASTPOS=26001527;
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=26001580;
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=26001628;
          b_owner = b;
          //$LASTPOS=26001674;
          if (a===b) {
            return _this;
          }
          //$LASTPOS=26001710;
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=26001815;
          if (a.crashTo1(b)) {
            //$LASTPOS=26001918;
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_func_26001326_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26001353;
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=26001397;
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=26001485;
        a_owner = a;
        //$LASTPOS=26001527;
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=26001580;
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=26001628;
          b_owner = b;
          //$LASTPOS=26001674;
          if (a===b) {
            return _this;
          }
          //$LASTPOS=26001710;
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=26001815;
          if (a.crashTo1(b)) {
            //$LASTPOS=26001918;
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_func_26002002_14(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=26002048;
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=26002112;
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_func_26002137_15(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=26002165;
    ctx = c.getContext("2d");
    //$LASTPOS=26002198;
    ctx.textBaseline="top";
    //$LASTPOS=26002227;
    ctx.save();
    //$LASTPOS=26002244;
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=26002284;
    //$LASTPOS=26002289;
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=26002329;
        ctx.beginPath();
        //$LASTPOS=26002355;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=26002401;
        ctx.moveTo(i,0);
        //$LASTPOS=26002427;
        ctx.lineTo(i,c.height);
        //$LASTPOS=26002460;
        ctx.closePath();
        //$LASTPOS=26002486;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=26002518;
    //$LASTPOS=26002523;
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=26002564;
        ctx.beginPath();
        //$LASTPOS=26002590;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=26002636;
        ctx.moveTo(0,i);
        //$LASTPOS=26002662;
        ctx.lineTo(c.width,i);
        //$LASTPOS=26002694;
        ctx.closePath();
        //$LASTPOS=26002720;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=26002746;
    ctx.fillStyle="white";
    //$LASTPOS=26002774;
    ctx.font="15px monospaced";
    //$LASTPOS=26002807;
    //$LASTPOS=26002812;
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=26002855;
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=26002889;
    //$LASTPOS=26002894;
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=26002938;
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=26002972;
    ctx.restore();
  },
  fiber$drawGrid :function _trc_func_26002137_16(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=26002165;
    ctx = c.getContext("2d");
    //$LASTPOS=26002198;
    ctx.textBaseline="top";
    //$LASTPOS=26002227;
    ctx.save();
    //$LASTPOS=26002244;
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=26002284;
    //$LASTPOS=26002289;
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=26002329;
        ctx.beginPath();
        //$LASTPOS=26002355;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=26002401;
        ctx.moveTo(i,0);
        //$LASTPOS=26002427;
        ctx.lineTo(i,c.height);
        //$LASTPOS=26002460;
        ctx.closePath();
        //$LASTPOS=26002486;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=26002518;
    //$LASTPOS=26002523;
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=26002564;
        ctx.beginPath();
        //$LASTPOS=26002590;
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=26002636;
        ctx.moveTo(0,i);
        //$LASTPOS=26002662;
        ctx.lineTo(c.width,i);
        //$LASTPOS=26002694;
        ctx.closePath();
        //$LASTPOS=26002720;
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=26002746;
    ctx.fillStyle="white";
    //$LASTPOS=26002774;
    ctx.font="15px monospaced";
    //$LASTPOS=26002807;
    //$LASTPOS=26002812;
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=26002855;
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=26002889;
    //$LASTPOS=26002894;
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=26002938;
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=26002972;
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_func_26002991_17(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26003024;
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_func_26002991_18(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26003024;
    _this.imageList=il;
    
    _thread.retVal=_this;return;
  },
  getImageList :function _trc_func_26003042_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.imageList;
  },
  fiber$getImageList :function _trc_func_26003042_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.imageList;return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_26003095_21(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=26003136;
    _this.sx=scrollX;
    //$LASTPOS=26003153;
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_func_26003095_22(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=26003136;
    _this.sx=scrollX;
    //$LASTPOS=26003153;
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_27000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_27000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_27000016_2(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000034;
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=27000065;
    ctx.strokeStyle=_this.col;
    //$LASTPOS=27000091;
    ctx.beginPath();
    //$LASTPOS=27000113;
    ctx.moveTo(_this.x,_this.y);
    //$LASTPOS=27000135;
    ctx.lineTo(_this.tx,_this.ty);
    //$LASTPOS=27000159;
    ctx.stroke();
    //$LASTPOS=27000178;
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{
  main :function _trc_func_28000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_28000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_28000042_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000064;
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_func_28000042_3(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28000064;
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_func_28000091_4(fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var o;
    
    //$LASTPOS=28000469;
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=28000512;
    o = f.obj();
    //$LASTPOS=28000532;
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=28000560;
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=28000590;
    _this.baseData=o.baseData;
    //$LASTPOS=28000616;
    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
    //$LASTPOS=28000658;
    _this.mapData=_this.mapTable;
    //$LASTPOS=28000681;
    _this.row=_this.mapTable.length;
    //$LASTPOS=28000707;
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=28000736;
    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
    //$LASTPOS=28000780;
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=28000813;
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=28000885;
    _this.initMap();
  },
  fiber$load :function _trc_func_28000091_5(_thread,fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var o;
    
    //$LASTPOS=28000469;
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=28000512;
    o = f.obj();
    //$LASTPOS=28000532;
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=28000560;
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=28000590;
    _this.baseData=o.baseData;
    
    _thread.enter(function _trc_func_28000091_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=28000616;
          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
          __pc=1;return;
        case 1:
          _this.mapTable=_thread.retVal;
          
          //$LASTPOS=28000658;
          _this.mapData=_this.mapTable;
          //$LASTPOS=28000681;
          _this.row=_this.mapTable.length;
          //$LASTPOS=28000707;
          _this.col=_this.mapTable[0].length;
          //$LASTPOS=28000736;
          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
          __pc=2;return;
        case 2:
          _this.mapOnTable=_thread.retVal;
          
          //$LASTPOS=28000780;
          _this.mapOnData=_this.mapOnTable;
          //$LASTPOS=28000813;
          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
          //$LASTPOS=28000885;
          _this.fiber$initMap(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  conv :function _trc_func_28000903_7(mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=28000926;
    res = [];
    //$LASTPOS=28000943;
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=28000973;
      rrow = [];
      //$LASTPOS=28000995;
      res.push(rrow);
      //$LASTPOS=28001020;
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=28001067;
        t = tbl[dat[0]];
        //$LASTPOS=28001099;
        if (t) {
          //$LASTPOS=28001106;
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=28001165;
          rrow.push(dat[1]);
        }
      });
    });
    return res;
  },
  fiber$conv :function _trc_func_28000903_8(_thread,mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=28000926;
    res = [];
    //$LASTPOS=28000943;
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=28000973;
      rrow = [];
      //$LASTPOS=28000995;
      res.push(rrow);
      //$LASTPOS=28001020;
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=28001067;
        t = tbl[dat[0]];
        //$LASTPOS=28001099;
        if (t) {
          //$LASTPOS=28001106;
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=28001165;
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
  main :function _trc_func_29000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_29000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initGlobals :function _trc_func_29000022_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000044;
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=29000074;
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=29000103;
    Tonyu.globals.$clBlack=_this.color(0,0,0);
    //$LASTPOS=29000131;
    Tonyu.globals.$clRed=_this.color(255,0,0);
    //$LASTPOS=29000159;
    Tonyu.globals.$clGreen=_this.color(0,255,0);
    //$LASTPOS=29000189;
    Tonyu.globals.$clYellow=_this.color(255,255,0);
    //$LASTPOS=29000222;
    Tonyu.globals.$clBlue=_this.color(0,0,255);
    //$LASTPOS=29000251;
    Tonyu.globals.$clPink=_this.color(255,0,255);
    //$LASTPOS=29000282;
    Tonyu.globals.$clAqua=_this.color(0,255,255);
    //$LASTPOS=29000313;
    Tonyu.globals.$clWhite=_this.color(255,255,255);
    //$LASTPOS=29000347;
    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
  },
  fiber$initGlobals :function _trc_func_29000022_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=29000044;
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=29000074;
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_func_29000022_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=29000103;
          _this.fiber$color(_thread, 0, 0, 0);
          __pc=1;return;
        case 1:
          Tonyu.globals.$clBlack=_thread.retVal;
          
          //$LASTPOS=29000131;
          _this.fiber$color(_thread, 255, 0, 0);
          __pc=2;return;
        case 2:
          Tonyu.globals.$clRed=_thread.retVal;
          
          //$LASTPOS=29000159;
          _this.fiber$color(_thread, 0, 255, 0);
          __pc=3;return;
        case 3:
          Tonyu.globals.$clGreen=_thread.retVal;
          
          //$LASTPOS=29000189;
          _this.fiber$color(_thread, 255, 255, 0);
          __pc=4;return;
        case 4:
          Tonyu.globals.$clYellow=_thread.retVal;
          
          //$LASTPOS=29000222;
          _this.fiber$color(_thread, 0, 0, 255);
          __pc=5;return;
        case 5:
          Tonyu.globals.$clBlue=_thread.retVal;
          
          //$LASTPOS=29000251;
          _this.fiber$color(_thread, 255, 0, 255);
          __pc=6;return;
        case 6:
          Tonyu.globals.$clPink=_thread.retVal;
          
          //$LASTPOS=29000282;
          _this.fiber$color(_thread, 0, 255, 255);
          __pc=7;return;
        case 7:
          Tonyu.globals.$clAqua=_thread.retVal;
          
          //$LASTPOS=29000313;
          _this.fiber$color(_thread, 255, 255, 255);
          __pc=8;return;
        case 8:
          Tonyu.globals.$clWhite=_thread.retVal;
          
          //$LASTPOS=29000347;
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
  main :function _trc_func_30000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_30000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_30000016_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=30000032;
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=30000057;
    c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=30000097;
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=30000117;
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Mod=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_31000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_31000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  bvec :function _trc_func_31000015_2(tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    
    //$LASTPOS=31000034;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_func_31000015_3(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=31000034;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_32000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000150;
    _this.loop();
  },
  fiber$main :function _trc_func_32000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_32000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=32000150;
          _this.fiber$loop(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_32000067_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000086;
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=32000133;
    _this.initWorld();
  },
  fiber$onAppear :function _trc_func_32000067_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=32000086;
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_func_32000067_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=32000133;
          _this.fiber$initWorld(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initWorld :function _trc_func_32000163_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=32000183;
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=32000212;
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=32000241;
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=32000284;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=32000328;
    _this.scale=_this.scale||32;
    //$LASTPOS=32000352;
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=32000477;
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=32000497;
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=32000533;
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_func_32000163_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=32000183;
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=32000212;
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=32000241;
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=32000284;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=32000328;
    _this.scale=_this.scale||32;
    //$LASTPOS=32000352;
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=32000477;
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=32000497;
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.enter(function _trc_func_32000163_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=32000533;
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseWorld :function _trc_func_32000561_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000584;
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=32000605;
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_func_32000561_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=32000584;
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=32000605;
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_func_32000626_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000641;
    while (true) {
      //$LASTPOS=32000664;
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=32000831;
      _this.world.DrawDebugData();
      //$LASTPOS=32000863;
      _this.world.ClearForces();
      //$LASTPOS=32000893;
      _this.updatePos();
      //$LASTPOS=32000915;
      _this.update();
      
    }
  },
  fiber$loop :function _trc_func_32000626_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_32000626_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=32000641;
        case 1:
          //$LASTPOS=32000664;
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=32000831;
          _this.world.DrawDebugData();
          //$LASTPOS=32000863;
          _this.world.ClearForces();
          //$LASTPOS=32000893;
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=32000915;
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
  updatePos :function _trc_func_32000936_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=32000956;
    //$LASTPOS=32000961;
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=32001015;
        d = b.GetUserData();
        //$LASTPOS=32001047;
        if (d) {
          //$LASTPOS=32001053;
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
  },
  fiber$updatePos :function _trc_func_32000936_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b;
    var d;
    
    //$LASTPOS=32000956;
    //$LASTPOS=32000961;
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=32001015;
        d = b.GetUserData();
        //$LASTPOS=32001047;
        if (d) {
          //$LASTPOS=32001053;
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
  main :function _trc_func_33000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_33000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_33000040_2(xx,yy,t,c,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=33000065;
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=33000084;
    _this.text="";
    //$LASTPOS=33000098;
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=33000117;
    _this.size=20;
    //$LASTPOS=33000131;
    if (! _this.x) {
      //$LASTPOS=33000144;
      _this.x=0;
    }
    //$LASTPOS=33000159;
    if (! _this.y) {
      //$LASTPOS=33000172;
      _this.y=0;
    }
    //$LASTPOS=33000187;
    if (t) {
      //$LASTPOS=33000194;
      _this.text=t;
    }
    //$LASTPOS=33000207;
    if (c) {
      //$LASTPOS=33000214;
      _this.fillStyle=c;
    }
    //$LASTPOS=33000232;
    if (s) {
      //$LASTPOS=33000239;
      _this.size=s;
    }
  },
  draw :function _trc_func_33000251_3(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=33000269;
    if (! _this.size) {
      //$LASTPOS=33000280;
      _this.size=15;
    }
    //$LASTPOS=33000294;
    if (! _this.align) {
      //$LASTPOS=33000306;
      _this.align="left";
    }
    //$LASTPOS=33000325;
    if (! _this.fillStyle) {
      //$LASTPOS=33000341;
      _this.fillStyle="white";
    }
    //$LASTPOS=33000365;
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=33000395;
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=33000432;
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=33000468;
    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=33000536;
    _this.width=rect.w;
    //$LASTPOS=33000555;
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.AcTest=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_34000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000022;
    _this.scaleX=2;
    //$LASTPOS=34000032;
    _this.scaleY=3;
    //$LASTPOS=34000055;
    if (! _this.vx) {
      //$LASTPOS=34000064;
      _this.vx=0;
    }
    //$LASTPOS=34000070;
    if (! _this.vy) {
      //$LASTPOS=34000079;
      _this.vy=0;
    }
    //$LASTPOS=34000085;
    while (true) {
      //$LASTPOS=34000104;
      _this.x+=_this.vx;
      //$LASTPOS=34000115;
      _this.y+=_this.vy;
      //$LASTPOS=34000126;
      _this.c=_this.crashTo(Tonyu.classes.kernel.AcTest);
      //$LASTPOS=34000149;
      if (_this.c) {
        //$LASTPOS=34000166;
        if (_this.x>_this.c.x) {
          //$LASTPOS=34000212;
          _this.vx=0;
          //$LASTPOS=34000230;
          _this.c.vx=0;
          
        } else {
          //$LASTPOS=34000311;
          _this.vx=0;
          //$LASTPOS=34000329;
          _this.c.vx=0;
          
        }
        //$LASTPOS=34000377;
        _this.vy=0;
        //$LASTPOS=34000391;
        _this.c.vy=0;
        //$LASTPOS=34000407;
        _this.print("Hit!!");
        
      }
      //$LASTPOS=34000433;
      _this.update();
      
    }
    //$LASTPOS=34000445;
    _this.isDead();
  },
  fiber$main :function _trc_func_34000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34000022;
    _this.scaleX=2;
    //$LASTPOS=34000032;
    _this.scaleY=3;
    //$LASTPOS=34000055;
    if (! _this.vx) {
      //$LASTPOS=34000064;
      _this.vx=0;
    }
    //$LASTPOS=34000070;
    if (! _this.vy) {
      //$LASTPOS=34000079;
      _this.vy=0;
    }
    
    _thread.enter(function _trc_func_34000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34000085;
        case 1:
          //$LASTPOS=34000104;
          _this.x+=_this.vx;
          //$LASTPOS=34000115;
          _this.y+=_this.vy;
          //$LASTPOS=34000126;
          _this.c=_this.crashTo(Tonyu.classes.kernel.AcTest);
          //$LASTPOS=34000149;
          if (_this.c) {
            //$LASTPOS=34000166;
            if (_this.x>_this.c.x) {
              //$LASTPOS=34000212;
              _this.vx=0;
              //$LASTPOS=34000230;
              _this.c.vx=0;
              
            } else {
              //$LASTPOS=34000311;
              _this.vx=0;
              //$LASTPOS=34000329;
              _this.c.vx=0;
              
            }
            //$LASTPOS=34000377;
            _this.vy=0;
            //$LASTPOS=34000391;
            _this.c.vy=0;
            //$LASTPOS=34000407;
            _this.print("Hit!!");
            
          }
          //$LASTPOS=34000433;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          //$LASTPOS=34000445;
          _this.isDead();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.AcTest,{"fullName":"kernel.AcTest","namespace":"kernel","shortName":"AcTest","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.AcTestM=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_35000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000029;
    Tonyu.globals.$Screen.resize(800,600);
    //$LASTPOS=35000054;
    _this.at1=new Tonyu.classes.kernel.AcTest({x: 10,y: 100,vx: 5,vy: 0,p: 0});
    //$LASTPOS=35000100;
    _this.at2=new Tonyu.classes.kernel.AcTest({x: 320,y: 300,vx: - 5,vy: - 5,p: 10});
    //$LASTPOS=35000150;
    _this.t=new Tonyu.classes.kernel.AcTest(50,150);
    //$LASTPOS=35000172;
    _this.at1.alpha=100;
    //$LASTPOS=35000227;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 100,row: 20});
    //$LASTPOS=35000291;
    Tonyu.globals.$map.set(6,6,1);
    //$LASTPOS=35000308;
    Tonyu.globals.$map.set(1,1,1);
    //$LASTPOS=35000325;
    Tonyu.globals.$map.set(2,2,1);
    //$LASTPOS=35000342;
    Tonyu.globals.$map.set(3,3,1);
    //$LASTPOS=35000359;
    Tonyu.globals.$map.set(4,4,1);
    //$LASTPOS=35000376;
    Tonyu.globals.$map.set(5,5,1);
    //$LASTPOS=35000558;
    _this.fillStyle="yellow";
    //$LASTPOS=35000578;
    //$LASTPOS=35000583;
    _this.i=0;
    while(_this.i<3000) {
      {
        //$LASTPOS=35000607;
        _this.size=40;
        //$LASTPOS=35000620;
        _this.text="スコア："+_this.at1.x+" "+_this.at2.x;
        //$LASTPOS=35000699;
        _this.x=Tonyu.globals.$mouseX;
        //$LASTPOS=35000714;
        _this.y=Tonyu.globals.$mouseY;
        //$LASTPOS=35000729;
        _this.t.x=Tonyu.globals.$touches[1].x;
        //$LASTPOS=35000752;
        _this.t.y=Tonyu.globals.$touches[1].y;
        //$LASTPOS=35000775;
        if (_this.i==50) {
          //$LASTPOS=35000786;
          _this.hide();
        }
        //$LASTPOS=35000798;
        if (_this.i==60) {
          //$LASTPOS=35000809;
          _this.show();
        }
        //$LASTPOS=35000868;
        _this.update();
      }
      _this.i++;
    }
  },
  fiber$main :function _trc_func_35000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=35000029;
    Tonyu.globals.$Screen.resize(800,600);
    //$LASTPOS=35000054;
    _this.at1=new Tonyu.classes.kernel.AcTest({x: 10,y: 100,vx: 5,vy: 0,p: 0});
    //$LASTPOS=35000100;
    _this.at2=new Tonyu.classes.kernel.AcTest({x: 320,y: 300,vx: - 5,vy: - 5,p: 10});
    //$LASTPOS=35000150;
    _this.t=new Tonyu.classes.kernel.AcTest(50,150);
    //$LASTPOS=35000172;
    _this.at1.alpha=100;
    //$LASTPOS=35000227;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 100,row: 20});
    //$LASTPOS=35000291;
    Tonyu.globals.$map.set(6,6,1);
    //$LASTPOS=35000308;
    Tonyu.globals.$map.set(1,1,1);
    //$LASTPOS=35000325;
    Tonyu.globals.$map.set(2,2,1);
    //$LASTPOS=35000342;
    Tonyu.globals.$map.set(3,3,1);
    //$LASTPOS=35000359;
    Tonyu.globals.$map.set(4,4,1);
    //$LASTPOS=35000376;
    Tonyu.globals.$map.set(5,5,1);
    //$LASTPOS=35000558;
    _this.fillStyle="yellow";
    
    _thread.enter(function _trc_func_35000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000578;
          //$LASTPOS=35000583;
          _this.i=0;;
        case 1:
          if (!(_this.i<3000)) { __pc=3; break; }
          //$LASTPOS=35000607;
          _this.size=40;
          //$LASTPOS=35000620;
          _this.text="スコア："+_this.at1.x+" "+_this.at2.x;
          //$LASTPOS=35000699;
          _this.x=Tonyu.globals.$mouseX;
          //$LASTPOS=35000714;
          _this.y=Tonyu.globals.$mouseY;
          //$LASTPOS=35000729;
          _this.t.x=Tonyu.globals.$touches[1].x;
          //$LASTPOS=35000752;
          _this.t.y=Tonyu.globals.$touches[1].y;
          //$LASTPOS=35000775;
          if (_this.i==50) {
            //$LASTPOS=35000786;
            _this.hide();
          }
          //$LASTPOS=35000798;
          if (_this.i==60) {
            //$LASTPOS=35000809;
            _this.show();
          }
          //$LASTPOS=35000868;
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          _this.i++;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.AcTestM,{"fullName":"kernel.AcTestM","namespace":"kernel","shortName":"AcTestM","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.AltBoot=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_36000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36000000;
    //$LASTPOS=36000005;
    _this.i=0;
    while(_this.i<5) {
      {
        //$LASTPOS=36000027;
        _this.print(_this.i);
      }
      _this.i++;
    }
  },
  fiber$main :function _trc_func_36000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=36000000;
    //$LASTPOS=36000005;
    _this.i=0;
    while(_this.i<5) {
      {
        //$LASTPOS=36000027;
        _this.print(_this.i);
      }
      _this.i++;
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.AltBoot,{"fullName":"kernel.AltBoot","namespace":"kernel","shortName":"AltBoot","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Ball=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_37000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000013;
    _this.x=0;
    //$LASTPOS=37000018;
    _this.y=200;
    //$LASTPOS=37000043;
    _this.p=21;
    //$LASTPOS=37000049;
    _this.vx=2;
    //$LASTPOS=37000055;
    _this.vy=1;
    //$LASTPOS=37000061;
    while (true) {
      //$LASTPOS=37000078;
      _this.x+=_this.vx;
      //$LASTPOS=37000089;
      _this.y+=_this.vy;
      //$LASTPOS=37000100;
      if (_this.x>Tonyu.globals.$screenWidth||_this.x<=0) {
        //$LASTPOS=37000127;
        _this.vx=_this.vx*- 1;
      }
      //$LASTPOS=37000141;
      if (_this.y>Tonyu.globals.$screenHeight||_this.y<=0) {
        //$LASTPOS=37000169;
        _this.vy=_this.vy*- 1;
      }
      //$LASTPOS=37000183;
      if (_this.vx>0&&Tonyu.globals.$map.getAt(_this.x+16-Tonyu.globals.$map.sx,_this.y)!=- 1) {
        //$LASTPOS=37000235;
        _this.vx=_this.vx*- 1;
        //$LASTPOS=37000253;
        Tonyu.globals.$map.set(Math.floor((_this.x+16-Tonyu.globals.$map.sx)/32),Math.floor(_this.y/32),- 1);
        
      }
      //$LASTPOS=37000329;
      if (_this.vx<0&&Tonyu.globals.$map.getAt(_this.x-16-Tonyu.globals.$map.sx,_this.y)!=- 1) {
        //$LASTPOS=37000381;
        _this.vx=_this.vx*- 1;
        //$LASTPOS=37000399;
        Tonyu.globals.$map.set(Math.floor((_this.x-16-Tonyu.globals.$map.sx)/32),Math.floor(_this.y/32),- 1);
        
      }
      //$LASTPOS=37000470;
      if (_this.vy>0&&Tonyu.globals.$map.getAt(_this.x-Tonyu.globals.$map.sx,_this.y+16)!=- 1) {
        //$LASTPOS=37000522;
        _this.vy=_this.vy*- 1;
        //$LASTPOS=37000540;
        Tonyu.globals.$map.set(Math.floor((_this.x-Tonyu.globals.$map.sx)/32),Math.floor((_this.y+16)/32),- 1);
        
      }
      //$LASTPOS=37000618;
      if (_this.vy<0&&Tonyu.globals.$map.getAt(_this.x-Tonyu.globals.$map.sx,_this.y-16)!=- 1) {
        //$LASTPOS=37000670;
        _this.vy=_this.vy*- 1;
        //$LASTPOS=37000688;
        Tonyu.globals.$map.set(Math.floor((_this.x-Tonyu.globals.$map.sx)/32),Math.floor((_this.y-16)/32),- 1);
        
      }
      //$LASTPOS=37000761;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_37000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37000013;
    _this.x=0;
    //$LASTPOS=37000018;
    _this.y=200;
    //$LASTPOS=37000043;
    _this.p=21;
    //$LASTPOS=37000049;
    _this.vx=2;
    //$LASTPOS=37000055;
    _this.vy=1;
    
    _thread.enter(function _trc_func_37000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000061;
        case 1:
          //$LASTPOS=37000078;
          _this.x+=_this.vx;
          //$LASTPOS=37000089;
          _this.y+=_this.vy;
          //$LASTPOS=37000100;
          if (_this.x>Tonyu.globals.$screenWidth||_this.x<=0) {
            //$LASTPOS=37000127;
            _this.vx=_this.vx*- 1;
          }
          //$LASTPOS=37000141;
          if (_this.y>Tonyu.globals.$screenHeight||_this.y<=0) {
            //$LASTPOS=37000169;
            _this.vy=_this.vy*- 1;
          }
          //$LASTPOS=37000183;
          if (_this.vx>0&&Tonyu.globals.$map.getAt(_this.x+16-Tonyu.globals.$map.sx,_this.y)!=- 1) {
            //$LASTPOS=37000235;
            _this.vx=_this.vx*- 1;
            //$LASTPOS=37000253;
            Tonyu.globals.$map.set(Math.floor((_this.x+16-Tonyu.globals.$map.sx)/32),Math.floor(_this.y/32),- 1);
            
          }
          //$LASTPOS=37000329;
          if (_this.vx<0&&Tonyu.globals.$map.getAt(_this.x-16-Tonyu.globals.$map.sx,_this.y)!=- 1) {
            //$LASTPOS=37000381;
            _this.vx=_this.vx*- 1;
            //$LASTPOS=37000399;
            Tonyu.globals.$map.set(Math.floor((_this.x-16-Tonyu.globals.$map.sx)/32),Math.floor(_this.y/32),- 1);
            
          }
          //$LASTPOS=37000470;
          if (_this.vy>0&&Tonyu.globals.$map.getAt(_this.x-Tonyu.globals.$map.sx,_this.y+16)!=- 1) {
            //$LASTPOS=37000522;
            _this.vy=_this.vy*- 1;
            //$LASTPOS=37000540;
            Tonyu.globals.$map.set(Math.floor((_this.x-Tonyu.globals.$map.sx)/32),Math.floor((_this.y+16)/32),- 1);
            
          }
          //$LASTPOS=37000618;
          if (_this.vy<0&&Tonyu.globals.$map.getAt(_this.x-Tonyu.globals.$map.sx,_this.y-16)!=- 1) {
            //$LASTPOS=37000670;
            _this.vy=_this.vy*- 1;
            //$LASTPOS=37000688;
            Tonyu.globals.$map.set(Math.floor((_this.x-Tonyu.globals.$map.sx)/32),Math.floor((_this.y-16)/32),- 1);
            
          }
          //$LASTPOS=37000761;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Ball,{"fullName":"kernel.Ball","namespace":"kernel","shortName":"Ball","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Bar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_38000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000013;
    _this.x=220;
    //$LASTPOS=38000020;
    _this.y=350;
    //$LASTPOS=38000027;
    _this.p=0;
    //$LASTPOS=38000032;
    _this.scaleX=1;
    //$LASTPOS=38000042;
    _this.scaleY=0.1;
    //$LASTPOS=38000055;
    while (true) {
      //$LASTPOS=38000072;
      if (_this.crashTo(Tonyu.globals.$ball)&&Tonyu.globals.$ball.vy>0) {
        //$LASTPOS=38000114;
        Tonyu.globals.$ball.vy=Tonyu.globals.$ball.vy*- 1;
        //$LASTPOS=38000144;
        Tonyu.globals.$ball.vx=(Tonyu.globals.$ball.x-_this.x)/2;
        
      }
      //$LASTPOS=38000178;
      if (Tonyu.globals.$pad.padRight>1) {
        //$LASTPOS=38000207;
        _this.x+=5;
        
      }
      //$LASTPOS=38000223;
      if (Tonyu.globals.$pad.padLeft>1) {
        //$LASTPOS=38000251;
        _this.x-=5;
        
      }
      //$LASTPOS=38000267;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_38000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=38000013;
    _this.x=220;
    //$LASTPOS=38000020;
    _this.y=350;
    //$LASTPOS=38000027;
    _this.p=0;
    //$LASTPOS=38000032;
    _this.scaleX=1;
    //$LASTPOS=38000042;
    _this.scaleY=0.1;
    
    _thread.enter(function _trc_func_38000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=38000055;
        case 1:
          //$LASTPOS=38000072;
          if (_this.crashTo(Tonyu.globals.$ball)&&Tonyu.globals.$ball.vy>0) {
            //$LASTPOS=38000114;
            Tonyu.globals.$ball.vy=Tonyu.globals.$ball.vy*- 1;
            //$LASTPOS=38000144;
            Tonyu.globals.$ball.vx=(Tonyu.globals.$ball.x-_this.x)/2;
            
          }
          //$LASTPOS=38000178;
          if (Tonyu.globals.$pad.padRight>1) {
            //$LASTPOS=38000207;
            _this.x+=5;
            
          }
          //$LASTPOS=38000223;
          if (Tonyu.globals.$pad.padLeft>1) {
            //$LASTPOS=38000251;
            _this.x-=5;
            
          }
          //$LASTPOS=38000267;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Bar,{"fullName":"kernel.Bar","namespace":"kernel","shortName":"Bar","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Bounce=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_39000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=39000000;
    _this.x=_this.rnd(Tonyu.globals.$Screen.width);
    //$LASTPOS=39000022;
    _this.y=_this.rnd(Tonyu.globals.$Screen.height);
    //$LASTPOS=39000045;
    _this.vx=_this.spd();
    //$LASTPOS=39000055;
    _this.vy=_this.spd();
    //$LASTPOS=39000065;
    _this.scaleX=1.5;
    //$LASTPOS=39000077;
    _this.scaleY=2;
    //$LASTPOS=39000116;
    _this.alpha=255;
    //$LASTPOS=39000127;
    while (true) {
      //$LASTPOS=39000146;
      _this.rotation+=1;
      //$LASTPOS=39000163;
      _this.rotate-=1;
      //$LASTPOS=39000178;
      _this.x+=_this.vx;
      //$LASTPOS=39000189;
      _this.y+=_this.vy;
      //$LASTPOS=39000200;
      if (_this.x<0) {
        //$LASTPOS=39000219;
        _this.x=0;
        //$LASTPOS=39000232;
        _this.vx=_this.spd();
        
      }
      //$LASTPOS=39000252;
      if (_this.y<0) {
        //$LASTPOS=39000271;
        _this.y=0;
        //$LASTPOS=39000284;
        _this.vy=_this.spd();
        
      }
      //$LASTPOS=39000304;
      if (_this.x>Tonyu.globals.$screenWidth) {
        //$LASTPOS=39000334;
        _this.x=Tonyu.globals.$screenWidth;
        //$LASTPOS=39000358;
        _this.vx=- _this.spd();
        
      }
      //$LASTPOS=39000379;
      if (_this.y>Tonyu.globals.$screenHeight) {
        //$LASTPOS=39000410;
        _this.y=Tonyu.globals.$screenHeight;
        //$LASTPOS=39000435;
        _this.vy=- _this.spd();
        
      }
      //$LASTPOS=39000476;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_39000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=39000000;
    _this.x=_this.rnd(Tonyu.globals.$Screen.width);
    //$LASTPOS=39000022;
    _this.y=_this.rnd(Tonyu.globals.$Screen.height);
    
    _thread.enter(function _trc_func_39000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=39000045;
          _this.fiber$spd(_thread);
          __pc=1;return;
        case 1:
          _this.vx=_thread.retVal;
          
          //$LASTPOS=39000055;
          _this.fiber$spd(_thread);
          __pc=2;return;
        case 2:
          _this.vy=_thread.retVal;
          
          //$LASTPOS=39000065;
          _this.scaleX=1.5;
          //$LASTPOS=39000077;
          _this.scaleY=2;
          //$LASTPOS=39000116;
          _this.alpha=255;
          //$LASTPOS=39000127;
        case 3:
          //$LASTPOS=39000146;
          _this.rotation+=1;
          //$LASTPOS=39000163;
          _this.rotate-=1;
          //$LASTPOS=39000178;
          _this.x+=_this.vx;
          //$LASTPOS=39000189;
          _this.y+=_this.vy;
          //$LASTPOS=39000200;
          if (!(_this.x<0)) { __pc=5; break; }
          //$LASTPOS=39000219;
          _this.x=0;
          //$LASTPOS=39000232;
          _this.fiber$spd(_thread);
          __pc=4;return;
        case 4:
          _this.vx=_thread.retVal;
          
        case 5:
          
          //$LASTPOS=39000252;
          if (!(_this.y<0)) { __pc=7; break; }
          //$LASTPOS=39000271;
          _this.y=0;
          //$LASTPOS=39000284;
          _this.fiber$spd(_thread);
          __pc=6;return;
        case 6:
          _this.vy=_thread.retVal;
          
        case 7:
          
          //$LASTPOS=39000304;
          if (_this.x>Tonyu.globals.$screenWidth) {
            //$LASTPOS=39000334;
            _this.x=Tonyu.globals.$screenWidth;
            //$LASTPOS=39000358;
            _this.vx=- _this.spd();
            
          }
          //$LASTPOS=39000379;
          if (_this.y>Tonyu.globals.$screenHeight) {
            //$LASTPOS=39000410;
            _this.y=Tonyu.globals.$screenHeight;
            //$LASTPOS=39000435;
            _this.vy=- _this.spd();
            
          }
          //$LASTPOS=39000476;
          _this.fiber$update(_thread);
          __pc=8;return;
        case 8:
          
          __pc=3;break;
        case 9:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  spd :function _trc_func_39000488_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.rnd()*10;
  },
  fiber$spd :function _trc_func_39000488_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.rnd()*10;return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Bounce,{"fullName":"kernel.Bounce","namespace":"kernel","shortName":"Bounce","decls":{"methods":{"main":{"nowait":false},"spd":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Label=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_40000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_40000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Label,{"fullName":"kernel.Label","namespace":"kernel","shortName":"Label","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_41000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    var dir;
    
    //$LASTPOS=41000000;
    Tonyu.globals.$Screen.resize(448,400);
    //$LASTPOS=41000025;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 30,row: 30});
    //$LASTPOS=41000081;
    _this.mapp=3;
    //$LASTPOS=41000136;
    _this.score=0;
    //$LASTPOS=41000145;
    _this.label=new Tonyu.classes.kernel.Label({x: 100,y: 200,text: _this.score,size: 30,zOrder: - 1});
    //$LASTPOS=41000204;
    _this.panel=new Tonyu.classes.kernel.Panel();
    //$LASTPOS=41000224;
    _this.panel.setPanel(200,200);
    //$LASTPOS=41000249;
    _this.panel.setFillStyle("rgb(200,100,50");
    //$LASTPOS=41000287;
    _this.pw=200;
    //$LASTPOS=41000295;
    _this.ph=200;
    //$LASTPOS=41000303;
    _this.panel.zOrder=10;
    //$LASTPOS=41000320;
    _this.panel.x=50;
    //$LASTPOS=41000332;
    _this.panel.y=250;
    //$LASTPOS=41000345;
    _this.panel.vx=2;
    //$LASTPOS=41000357;
    _this.panel.vy=2;
    //$LASTPOS=41000369;
    //$LASTPOS=41000373;
    j = 1;
    while(j<7) {
      {
        //$LASTPOS=41000395;
        //$LASTPOS=41000399;
        i = 2;
        while(i<28) {
          {
            //$LASTPOS=41000426;
            Tonyu.globals.$map.set(i,j,_this.mapp);
          }
          i++;
        }
        //$LASTPOS=41000456;
        _this.mapp++;
      }
      j++;
    }
    //$LASTPOS=41000466;
    Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball();
    //$LASTPOS=41000484;
    new Tonyu.classes.kernel.Bar();
    //$LASTPOS=41000495;
    i = 0;
    //$LASTPOS=41000504;
    dir = 1;
    //$LASTPOS=41000515;
    while (true) {
      //$LASTPOS=41000532;
      Tonyu.globals.$Screen.scrollTo(- 1,0);
      //$LASTPOS=41000587;
      _this.panel.rotation++;
      //$LASTPOS=41000609;
      _this.panel.clearRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=41000660;
      _this.panel.fillRect(0,0,_this.pw,_this.ph);
      //$LASTPOS=41000741;
      if (_this.panel.x>Tonyu.globals.$screenWidth) {
        //$LASTPOS=41000766;
        _this.panel.vx=- 2;
      }
      //$LASTPOS=41000783;
      if (_this.panel.x<0) {
        //$LASTPOS=41000797;
        _this.panel.vx=2;
      }
      //$LASTPOS=41000813;
      if (_this.panel.y>Tonyu.globals.$screenHeight) {
        //$LASTPOS=41000839;
        _this.panel.vy=- 2;
      }
      //$LASTPOS=41000856;
      if (_this.panel.y<0) {
        //$LASTPOS=41000870;
        _this.panel.vy=2;
      }
      //$LASTPOS=41001337;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_41000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var j;
    var i;
    var dir;
    
    //$LASTPOS=41000000;
    Tonyu.globals.$Screen.resize(448,400);
    //$LASTPOS=41000025;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 30,row: 30});
    //$LASTPOS=41000081;
    _this.mapp=3;
    //$LASTPOS=41000136;
    _this.score=0;
    //$LASTPOS=41000145;
    _this.label=new Tonyu.classes.kernel.Label({x: 100,y: 200,text: _this.score,size: 30,zOrder: - 1});
    //$LASTPOS=41000204;
    _this.panel=new Tonyu.classes.kernel.Panel();
    //$LASTPOS=41000224;
    _this.panel.setPanel(200,200);
    //$LASTPOS=41000249;
    _this.panel.setFillStyle("rgb(200,100,50");
    //$LASTPOS=41000287;
    _this.pw=200;
    //$LASTPOS=41000295;
    _this.ph=200;
    //$LASTPOS=41000303;
    _this.panel.zOrder=10;
    //$LASTPOS=41000320;
    _this.panel.x=50;
    //$LASTPOS=41000332;
    _this.panel.y=250;
    //$LASTPOS=41000345;
    _this.panel.vx=2;
    //$LASTPOS=41000357;
    _this.panel.vy=2;
    //$LASTPOS=41000369;
    //$LASTPOS=41000373;
    j = 1;
    while(j<7) {
      {
        //$LASTPOS=41000395;
        //$LASTPOS=41000399;
        i = 2;
        while(i<28) {
          {
            //$LASTPOS=41000426;
            Tonyu.globals.$map.set(i,j,_this.mapp);
          }
          i++;
        }
        //$LASTPOS=41000456;
        _this.mapp++;
      }
      j++;
    }
    //$LASTPOS=41000466;
    Tonyu.globals.$ball=new Tonyu.classes.kernel.Ball();
    //$LASTPOS=41000484;
    new Tonyu.classes.kernel.Bar();
    //$LASTPOS=41000495;
    i = 0;
    //$LASTPOS=41000504;
    dir = 1;
    
    _thread.enter(function _trc_func_41000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=41000515;
        case 1:
          //$LASTPOS=41000532;
          Tonyu.globals.$Screen.scrollTo(- 1,0);
          //$LASTPOS=41000587;
          _this.panel.rotation++;
          //$LASTPOS=41000609;
          _this.panel.clearRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=41000660;
          _this.panel.fillRect(0,0,_this.pw,_this.ph);
          //$LASTPOS=41000741;
          if (_this.panel.x>Tonyu.globals.$screenWidth) {
            //$LASTPOS=41000766;
            _this.panel.vx=- 2;
          }
          //$LASTPOS=41000783;
          if (_this.panel.x<0) {
            //$LASTPOS=41000797;
            _this.panel.vx=2;
          }
          //$LASTPOS=41000813;
          if (_this.panel.y>Tonyu.globals.$screenHeight) {
            //$LASTPOS=41000839;
            _this.panel.vy=- 2;
          }
          //$LASTPOS=41000856;
          if (_this.panel.y<0) {
            //$LASTPOS=41000870;
            _this.panel.vy=2;
          }
          //$LASTPOS=41001337;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main,{"fullName":"kernel.Main","namespace":"kernel","shortName":"Main","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main0121=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_42000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=42000000;
    _this.val=10.5;
    //$LASTPOS=42000011;
    _this.t1=new Tonyu.classes.kernel.Actor({x: 100,y: 200,text: "trunc:",size: 30,align: "left"});
    //$LASTPOS=42000074;
    _this.t2=new Tonyu.classes.kernel.Actor({x: 250,y: 200,text: "floor:",size: 30,align: "left"});
    //$LASTPOS=42000137;
    _this.t3=new Tonyu.classes.kernel.Actor({x: 175,y: 100,text: "val:",size: 30,align: "left"});
    //$LASTPOS=42000198;
    while (true) {
      //$LASTPOS=42000216;
      _this.val-=0.1;
      //$LASTPOS=42000231;
      _this.t3.text="val:"+_this.val;
      //$LASTPOS=42000256;
      _this.t1.text="trunc(val):"+_this.trunc(_this.val);
      //$LASTPOS=42000295;
      _this.t2.text="floor(val):"+_this.floor(_this.val);
      //$LASTPOS=42000334;
      if (_this.getkey("up")==1) {
        //$LASTPOS=42000354;
        _this.val+=0.5;
      }
      //$LASTPOS=42000369;
      if (_this.getkey("down")==1) {
        //$LASTPOS=42000391;
        _this.val-=0.5;
      }
      //$LASTPOS=42000406;
      _this.print(_this.rnd(100));
      //$LASTPOS=42000428;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_42000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=42000000;
    _this.val=10.5;
    //$LASTPOS=42000011;
    _this.t1=new Tonyu.classes.kernel.Actor({x: 100,y: 200,text: "trunc:",size: 30,align: "left"});
    //$LASTPOS=42000074;
    _this.t2=new Tonyu.classes.kernel.Actor({x: 250,y: 200,text: "floor:",size: 30,align: "left"});
    //$LASTPOS=42000137;
    _this.t3=new Tonyu.classes.kernel.Actor({x: 175,y: 100,text: "val:",size: 30,align: "left"});
    
    _thread.enter(function _trc_func_42000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=42000198;
        case 1:
          //$LASTPOS=42000216;
          _this.val-=0.1;
          //$LASTPOS=42000231;
          _this.t3.text="val:"+_this.val;
          //$LASTPOS=42000256;
          _this.t1.text="trunc(val):"+_this.trunc(_this.val);
          //$LASTPOS=42000295;
          _this.t2.text="floor(val):"+_this.floor(_this.val);
          //$LASTPOS=42000334;
          if (_this.getkey("up")==1) {
            //$LASTPOS=42000354;
            _this.val+=0.5;
          }
          //$LASTPOS=42000369;
          if (_this.getkey("down")==1) {
            //$LASTPOS=42000391;
            _this.val-=0.5;
          }
          //$LASTPOS=42000406;
          _this.print(_this.rnd(100));
          //$LASTPOS=42000428;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main0121,{"fullName":"kernel.Main0121","namespace":"kernel","shortName":"Main0121","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main0330=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_43000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=43000000;
    _this.x=10;
    //$LASTPOS=43000005;
    _this.y=100;
    //$LASTPOS=43000013;
    _this.text="test!";
  },
  fiber$main :function _trc_func_43000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=43000000;
    _this.x=10;
    //$LASTPOS=43000005;
    _this.y=100;
    //$LASTPOS=43000013;
    _this.text="test!";
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main0330,{"fullName":"kernel.Main0330","namespace":"kernel","shortName":"Main0330","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main1023=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_44000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=44000000;
    //$LASTPOS=44000004;
    i = 0;
    while(i<10) {
      {
        //$LASTPOS=44000028;
        new Tonyu.classes.kernel.Actor({x: _this.rnd(Tonyu.globals.$screenWidth),y: _this.rnd(Tonyu.globals.$screenHeight),p: 0});
      }
      i++;
    }
    //$LASTPOS=44000089;
    _this.label=new Tonyu.classes.kernel.Actor({x: 300,y: 200,text: "スコア",layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=44000151;
    _this.pad=new Tonyu.classes.kernel.Pad({layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=44000186;
    _this.s=0;
    //$LASTPOS=44000192;
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=44000211;
    _this.y=Tonyu.globals.$screenHeight/2;
    //$LASTPOS=44000231;
    _this.p=2;
    //$LASTPOS=44000237;
    _this.sx=0;
    //$LASTPOS=44000244;
    _this.sy=0;
    //$LASTPOS=44000251;
    Tonyu.globals.$panel.setFillStyle("cyan");
    //$LASTPOS=44000281;
    _this.w=0;
    //$LASTPOS=44000285;
    _this.h=0;
    //$LASTPOS=44000291;
    Tonyu.globals.$panel.fillText("test",200,200,30,"center");
    //$LASTPOS=44000337;
    while (true) {
      //$LASTPOS=44000355;
      _this.w++;
      //$LASTPOS=44000365;
      _this.h++;
      //$LASTPOS=44000375;
      _this.print(_this.pad.getPadUp());
      //$LASTPOS=44000403;
      Tonyu.globals.$panel.fillRect(0,0,_this.w,_this.h);
      //$LASTPOS=44000434;
      if (_this.w==30) {
        //$LASTPOS=44000454;
        Tonyu.globals.$Screen.resize(500,500);
        //$LASTPOS=44000488;
        _this.pad.die();
        //$LASTPOS=44000508;
        _this.pad=new Tonyu.classes.kernel.Pad({layer: Tonyu.globals.$FrontSprites});
        
      }
      //$LASTPOS=44000578;
      if (_this.pad.left>0) {
        //$LASTPOS=44000603;
        _this.sx--;
        //$LASTPOS=44000618;
        _this.x--;
        
      }
      //$LASTPOS=44000635;
      if (_this.pad.right>0) {
        //$LASTPOS=44000661;
        _this.sx++;
        //$LASTPOS=44000676;
        _this.x++;
        
      }
      //$LASTPOS=44000693;
      if (_this.pad.up>0) {
        //$LASTPOS=44000716;
        _this.sy--;
        //$LASTPOS=44000731;
        _this.y--;
        
      }
      //$LASTPOS=44000748;
      if (_this.pad.down>0) {
        //$LASTPOS=44000773;
        _this.sy++;
        //$LASTPOS=44000788;
        _this.y++;
        
      }
      //$LASTPOS=44000805;
      if (_this.pad.button>0) {
        //$LASTPOS=44000832;
        _this.all().die();
        
      }
      //$LASTPOS=44000857;
      Tonyu.globals.$Screen.scrollTo(_this.sx,_this.sy);
      //$LASTPOS=44000904;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_44000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=44000000;
    //$LASTPOS=44000004;
    i = 0;
    while(i<10) {
      {
        //$LASTPOS=44000028;
        new Tonyu.classes.kernel.Actor({x: _this.rnd(Tonyu.globals.$screenWidth),y: _this.rnd(Tonyu.globals.$screenHeight),p: 0});
      }
      i++;
    }
    //$LASTPOS=44000089;
    _this.label=new Tonyu.classes.kernel.Actor({x: 300,y: 200,text: "スコア",layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=44000151;
    _this.pad=new Tonyu.classes.kernel.Pad({layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=44000186;
    _this.s=0;
    //$LASTPOS=44000192;
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=44000211;
    _this.y=Tonyu.globals.$screenHeight/2;
    //$LASTPOS=44000231;
    _this.p=2;
    //$LASTPOS=44000237;
    _this.sx=0;
    //$LASTPOS=44000244;
    _this.sy=0;
    //$LASTPOS=44000251;
    Tonyu.globals.$panel.setFillStyle("cyan");
    //$LASTPOS=44000281;
    _this.w=0;
    //$LASTPOS=44000285;
    _this.h=0;
    //$LASTPOS=44000291;
    Tonyu.globals.$panel.fillText("test",200,200,30,"center");
    
    _thread.enter(function _trc_func_44000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=44000337;
        case 1:
          //$LASTPOS=44000355;
          _this.w++;
          //$LASTPOS=44000365;
          _this.h++;
          //$LASTPOS=44000375;
          _this.print(_this.pad.getPadUp());
          //$LASTPOS=44000403;
          Tonyu.globals.$panel.fillRect(0,0,_this.w,_this.h);
          //$LASTPOS=44000434;
          if (_this.w==30) {
            //$LASTPOS=44000454;
            Tonyu.globals.$Screen.resize(500,500);
            //$LASTPOS=44000488;
            _this.pad.die();
            //$LASTPOS=44000508;
            _this.pad=new Tonyu.classes.kernel.Pad({layer: Tonyu.globals.$FrontSprites});
            
          }
          //$LASTPOS=44000578;
          if (_this.pad.left>0) {
            //$LASTPOS=44000603;
            _this.sx--;
            //$LASTPOS=44000618;
            _this.x--;
            
          }
          //$LASTPOS=44000635;
          if (_this.pad.right>0) {
            //$LASTPOS=44000661;
            _this.sx++;
            //$LASTPOS=44000676;
            _this.x++;
            
          }
          //$LASTPOS=44000693;
          if (_this.pad.up>0) {
            //$LASTPOS=44000716;
            _this.sy--;
            //$LASTPOS=44000731;
            _this.y--;
            
          }
          //$LASTPOS=44000748;
          if (_this.pad.down>0) {
            //$LASTPOS=44000773;
            _this.sy++;
            //$LASTPOS=44000788;
            _this.y++;
            
          }
          //$LASTPOS=44000805;
          if (_this.pad.button>0) {
            //$LASTPOS=44000832;
            _this.all().die();
            
          }
          //$LASTPOS=44000857;
          Tonyu.globals.$Screen.scrollTo(_this.sx,_this.sy);
          //$LASTPOS=44000904;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main1023,{"fullName":"kernel.Main1023","namespace":"kernel","shortName":"Main1023","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Main2=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_45000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=45000000;
    _this.map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=45000042;
    _this.map.load("map.json");
    //$LASTPOS=45000067;
    _this.x=10;
    //$LASTPOS=45000074;
    _this.y=400;
    //$LASTPOS=45000082;
    _this.p=0;
    //$LASTPOS=45000088;
    _this.zOrder=- 1;
    //$LASTPOS=45000100;
    _this.i=0;
    //$LASTPOS=45000106;
    _this.print(_this.map.getOnAt(Tonyu.globals.$mouseX,Tonyu.globals.$mouseY));
    //$LASTPOS=45000144;
    while (true) {
      //$LASTPOS=45000162;
      _this.x=Tonyu.globals.$mouseX+_this.i;
      //$LASTPOS=45000180;
      _this.y=Tonyu.globals.$mouseY;
      //$LASTPOS=45000196;
      if (_this.map.getOnAt(_this.x,_this.y)==170) {
        //$LASTPOS=45000232;
        _this.map.setOnAt(_this.x,_this.y,- 1);
        
      }
      //$LASTPOS=45000265;
      Tonyu.globals.$Screen.scrollTo(_this.i,0);
      //$LASTPOS=45000293;
      _this.i++;
      //$LASTPOS=45000303;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_45000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=45000000;
    _this.map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=45000042;
    _this.map.load("map.json");
    //$LASTPOS=45000067;
    _this.x=10;
    //$LASTPOS=45000074;
    _this.y=400;
    //$LASTPOS=45000082;
    _this.p=0;
    //$LASTPOS=45000088;
    _this.zOrder=- 1;
    //$LASTPOS=45000100;
    _this.i=0;
    //$LASTPOS=45000106;
    _this.print(_this.map.getOnAt(Tonyu.globals.$mouseX,Tonyu.globals.$mouseY));
    
    _thread.enter(function _trc_func_45000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=45000144;
        case 1:
          //$LASTPOS=45000162;
          _this.x=Tonyu.globals.$mouseX+_this.i;
          //$LASTPOS=45000180;
          _this.y=Tonyu.globals.$mouseY;
          //$LASTPOS=45000196;
          if (_this.map.getOnAt(_this.x,_this.y)==170) {
            //$LASTPOS=45000232;
            _this.map.setOnAt(_this.x,_this.y,- 1);
            
          }
          //$LASTPOS=45000265;
          Tonyu.globals.$Screen.scrollTo(_this.i,0);
          //$LASTPOS=45000293;
          _this.i++;
          //$LASTPOS=45000303;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.Main2,{"fullName":"kernel.Main2","namespace":"kernel","shortName":"Main2","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapLoad=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_46000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=46000000;
    _this.map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=46000041;
    _this.map.load("map.json");
  },
  fiber$main :function _trc_func_46000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=46000000;
    _this.map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
    //$LASTPOS=46000041;
    _this.map.load("map.json");
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MapLoad,{"fullName":"kernel.MapLoad","namespace":"kernel","shortName":"MapLoad","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapTest=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_47000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=47000017;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 50,row: 20});
    //$LASTPOS=47000099;
    Tonyu.globals.$map.setAt(32,32,1);
    //$LASTPOS=47000120;
    Tonyu.globals.$map.setAt(32,64,2);
    //$LASTPOS=47000141;
    Tonyu.globals.$map.setAt(66,32,3);
    //$LASTPOS=47000162;
    Tonyu.globals.$map.setAt(64,70,4);
    //$LASTPOS=47000223;
    Tonyu.globals.$map.setAt(0,32,2);
    //$LASTPOS=47000243;
    _this.print(Tonyu.globals.$map.get(0,0));
    //$LASTPOS=47000265;
    _this.print(Tonyu.globals.$map.get(1,1));
    //$LASTPOS=47000287;
    _this.print(Tonyu.globals.$map.get(1,2));
    //$LASTPOS=47000309;
    _this.print(Tonyu.globals.$map.get(2,1));
    //$LASTPOS=47000331;
    _this.print(Tonyu.globals.$map.get(2,2));
  },
  fiber$main :function _trc_func_47000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=47000017;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 50,row: 20});
    //$LASTPOS=47000099;
    Tonyu.globals.$map.setAt(32,32,1);
    //$LASTPOS=47000120;
    Tonyu.globals.$map.setAt(32,64,2);
    //$LASTPOS=47000141;
    Tonyu.globals.$map.setAt(66,32,3);
    //$LASTPOS=47000162;
    Tonyu.globals.$map.setAt(64,70,4);
    //$LASTPOS=47000223;
    Tonyu.globals.$map.setAt(0,32,2);
    //$LASTPOS=47000243;
    _this.print(Tonyu.globals.$map.get(0,0));
    //$LASTPOS=47000265;
    _this.print(Tonyu.globals.$map.get(1,1));
    //$LASTPOS=47000287;
    _this.print(Tonyu.globals.$map.get(1,2));
    //$LASTPOS=47000309;
    _this.print(Tonyu.globals.$map.get(2,1));
    //$LASTPOS=47000331;
    _this.print(Tonyu.globals.$map.get(2,2));
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MapTest,{"fullName":"kernel.MapTest","namespace":"kernel","shortName":"MapTest","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapTest2nd=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_48000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=48000017;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 50,row: 20});
    //$LASTPOS=48000080;
    _this.m=[];
    //$LASTPOS=48000086;
    _this.m[0]=Tonyu.globals.$pat_map1;
    //$LASTPOS=48000102;
    _this.m[1]=Tonyu.globals.$pat_map2;
    //$LASTPOS=48000118;
    _this.m[2]=0;
    //$LASTPOS=48000126;
    _this.m[3]=1;
    //$LASTPOS=48000134;
    _this.i=0;
    //$LASTPOS=48000312;
    new Tonyu.classes.kernel.Bounce();
    //$LASTPOS=48000326;
    while (true) {
      //$LASTPOS=48000364;
      Tonyu.globals.$map.set(1,1,_this.m[_this.i%4]);
      //$LASTPOS=48000390;
      Tonyu.globals.$map.setAt(32,64,_this.m[(_this.i+1)%4]);
      //$LASTPOS=48000424;
      Tonyu.globals.$map.setAt(64,64,_this.m[(_this.i+2)%4]);
      //$LASTPOS=48000458;
      Tonyu.globals.$map.setAt(64,32,_this.m[(_this.i+3)%4]);
      //$LASTPOS=48000492;
      _this.updateEx(30);
      //$LASTPOS=48000510;
      _this.i++;
      
    }
  },
  fiber$main :function _trc_func_48000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=48000017;
    Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32,col: 50,row: 20});
    //$LASTPOS=48000080;
    _this.m=[];
    //$LASTPOS=48000086;
    _this.m[0]=Tonyu.globals.$pat_map1;
    //$LASTPOS=48000102;
    _this.m[1]=Tonyu.globals.$pat_map2;
    //$LASTPOS=48000118;
    _this.m[2]=0;
    //$LASTPOS=48000126;
    _this.m[3]=1;
    //$LASTPOS=48000134;
    _this.i=0;
    //$LASTPOS=48000312;
    new Tonyu.classes.kernel.Bounce();
    
    _thread.enter(function _trc_func_48000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=48000326;
        case 1:
          //$LASTPOS=48000364;
          Tonyu.globals.$map.set(1,1,_this.m[_this.i%4]);
          //$LASTPOS=48000390;
          Tonyu.globals.$map.setAt(32,64,_this.m[(_this.i+1)%4]);
          //$LASTPOS=48000424;
          Tonyu.globals.$map.setAt(64,64,_this.m[(_this.i+2)%4]);
          //$LASTPOS=48000458;
          Tonyu.globals.$map.setAt(64,32,_this.m[(_this.i+3)%4]);
          //$LASTPOS=48000492;
          _this.fiber$updateEx(_thread, 30);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=48000510;
          _this.i++;
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MapTest2nd,{"fullName":"kernel.MapTest2nd","namespace":"kernel","shortName":"MapTest2nd","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PanelTest=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_49000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=49000001;
    _this.setPanel(200,100);
    //$LASTPOS=49000020;
    _this.panel.fillRect(0,0,200,200);
    //$LASTPOS=49000050;
    while (true) {
      //$LASTPOS=49000068;
      _this.x++;
      //$LASTPOS=49000077;
      _this.rotataion++;
      //$LASTPOS=49000094;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_49000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=49000001;
    _this.setPanel(200,100);
    //$LASTPOS=49000020;
    _this.panel.fillRect(0,0,200,200);
    
    _thread.enter(function _trc_func_49000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=49000050;
        case 1:
          //$LASTPOS=49000068;
          _this.x++;
          //$LASTPOS=49000077;
          _this.rotataion++;
          //$LASTPOS=49000094;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.PanelTest,{"fullName":"kernel.PanelTest","namespace":"kernel","shortName":"PanelTest","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SetBGCTest=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_50000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=50000000;
    //$LASTPOS=50000005;
    _this.i=0;
    while(_this.i<20) {
      {
        //$LASTPOS=50000027;
        new Tonyu.classes.kernel.Bounce();
      }
      _this.i++;
    }
    //$LASTPOS=50000043;
    _this.text="↑ Portrait   → Landscape";
    //$LASTPOS=50000076;
    _this.size=20;
    //$LASTPOS=50000085;
    Tonyu.globals.$Screen.setBGColor("rgb(200,50,80)");
    //$LASTPOS=50000123;
    while (true) {
      //$LASTPOS=50000142;
      _this.x=Tonyu.globals.$screenWidth/2;
      //$LASTPOS=50000164;
      _this.y=Tonyu.globals.$screenHeight/2;
      //$LASTPOS=50000187;
      if (_this.getkey("right")==1) {
        //$LASTPOS=50000249;
        Tonyu.globals.$Screen.resize(400,300);
        //$LASTPOS=50000282;
        Tonyu.globals.$Screen.setBGColor("rgb(0,50,80)");
        
      }
      //$LASTPOS=50000328;
      if (_this.getkey("up")==1) {
        //$LASTPOS=50000387;
        Tonyu.globals.$Screen.resize(300,400);
        //$LASTPOS=50000420;
        Tonyu.globals.$Screen.setBGColor("rgb(200,50,80)");
        
      }
      //$LASTPOS=50000468;
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_50000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=50000000;
    //$LASTPOS=50000005;
    _this.i=0;
    while(_this.i<20) {
      {
        //$LASTPOS=50000027;
        new Tonyu.classes.kernel.Bounce();
      }
      _this.i++;
    }
    //$LASTPOS=50000043;
    _this.text="↑ Portrait   → Landscape";
    //$LASTPOS=50000076;
    _this.size=20;
    //$LASTPOS=50000085;
    Tonyu.globals.$Screen.setBGColor("rgb(200,50,80)");
    
    _thread.enter(function _trc_func_50000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=50000123;
        case 1:
          //$LASTPOS=50000142;
          _this.x=Tonyu.globals.$screenWidth/2;
          //$LASTPOS=50000164;
          _this.y=Tonyu.globals.$screenHeight/2;
          //$LASTPOS=50000187;
          if (_this.getkey("right")==1) {
            //$LASTPOS=50000249;
            Tonyu.globals.$Screen.resize(400,300);
            //$LASTPOS=50000282;
            Tonyu.globals.$Screen.setBGColor("rgb(0,50,80)");
            
          }
          //$LASTPOS=50000328;
          if (_this.getkey("up")==1) {
            //$LASTPOS=50000387;
            Tonyu.globals.$Screen.resize(300,400);
            //$LASTPOS=50000420;
            Tonyu.globals.$Screen.setBGColor("rgb(200,50,80)");
            
          }
          //$LASTPOS=50000468;
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
Tonyu.klass.addMeta(Tonyu.classes.kernel.SetBGCTest,{"fullName":"kernel.SetBGCTest","namespace":"kernel","shortName":"SetBGCTest","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TouchedTestMain=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_51000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=51000000;
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=51000019;
    _this.y=20;
    //$LASTPOS=51000026;
    _this.anim=[Tonyu.globals.$pat_neko+0,Tonyu.globals.$pat_neko+1,Tonyu.globals.$pat_neko+0,Tonyu.globals.$pat_neko+2];
    //$LASTPOS=51000083;
    _this.setAnimFps(5);
    //$LASTPOS=51000099;
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=51000124;
    _this.p=_this.anim[0];
    //$LASTPOS=51000136;
    new Tonyu.classes.kernel.Actor({x: 50,y: 20,anim: [0,1,2,3],animFps: 15});
    //$LASTPOS=51000185;
    new Tonyu.classes.kernel.Actor({x: 200,y: 30,anim: [12,13,14,15]});
    //$LASTPOS=51000228;
    //$LASTPOS=51000232;
    i = 0;
    while(i<10) {
      {
        //$LASTPOS=51000256;
        new Tonyu.classes.kernel.Actor({x: 10+i*10,y: 30+i*10,p: i});
      }
      i++;
    }
    //$LASTPOS=51000296;
    while (true) {
      //$LASTPOS=51000314;
      _this.drawText(_this.x-50,_this.y,"drawText","white",20);
      //$LASTPOS=51000359;
      if (_this.y%20==0) {
        //$LASTPOS=51000381;
        new Tonyu.classes.kernel.Actor({x: _this.x+30,y: _this.y,p: 0});
        
      }
      //$LASTPOS=51000418;
      if (Tonyu.globals.$touches[0].touched==1) {
        //$LASTPOS=51000445;
        _this.x+=10;
      }
      //$LASTPOS=51000457;
      _this.y++;
      //$LASTPOS=51000467;
      if (_this.y==100) {
        //$LASTPOS=51000478;
        _this.stopAnim();
      }
      //$LASTPOS=51000495;
      if (_this.y==200) {
        //$LASTPOS=51000506;
        _this.startAnim();
      }
      //$LASTPOS=51000548;
      _this.update();
      
    }
    //$LASTPOS=51000562;
    _this.stopAnim();
  },
  fiber$main :function _trc_func_51000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=51000000;
    _this.x=Tonyu.globals.$screenWidth/2;
    //$LASTPOS=51000019;
    _this.y=20;
    //$LASTPOS=51000026;
    _this.anim=[Tonyu.globals.$pat_neko+0,Tonyu.globals.$pat_neko+1,Tonyu.globals.$pat_neko+0,Tonyu.globals.$pat_neko+2];
    //$LASTPOS=51000083;
    _this.setAnimFps(5);
    //$LASTPOS=51000099;
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=51000124;
    _this.p=_this.anim[0];
    //$LASTPOS=51000136;
    new Tonyu.classes.kernel.Actor({x: 50,y: 20,anim: [0,1,2,3],animFps: 15});
    //$LASTPOS=51000185;
    new Tonyu.classes.kernel.Actor({x: 200,y: 30,anim: [12,13,14,15]});
    //$LASTPOS=51000228;
    //$LASTPOS=51000232;
    i = 0;
    while(i<10) {
      {
        //$LASTPOS=51000256;
        new Tonyu.classes.kernel.Actor({x: 10+i*10,y: 30+i*10,p: i});
      }
      i++;
    }
    
    _thread.enter(function _trc_func_51000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=51000296;
        case 1:
          //$LASTPOS=51000314;
          _this.fiber$drawText(_thread, _this.x-50, _this.y, "drawText", "white", 20);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=51000359;
          if (_this.y%20==0) {
            //$LASTPOS=51000381;
            new Tonyu.classes.kernel.Actor({x: _this.x+30,y: _this.y,p: 0});
            
          }
          //$LASTPOS=51000418;
          if (Tonyu.globals.$touches[0].touched==1) {
            //$LASTPOS=51000445;
            _this.x+=10;
          }
          //$LASTPOS=51000457;
          _this.y++;
          //$LASTPOS=51000467;
          if (_this.y==100) {
            //$LASTPOS=51000478;
            _this.stopAnim();
          }
          //$LASTPOS=51000495;
          if (_this.y==200) {
            //$LASTPOS=51000506;
            _this.startAnim();
          }
          //$LASTPOS=51000548;
          _this.fiber$update(_thread);
          __pc=3;return;
        case 3:
          
          __pc=1;break;
        case 4:
          
          //$LASTPOS=51000562;
          _this.stopAnim();
          _thread.exit(_this);return;
        }
      }
    });
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TouchedTestMain,{"fullName":"kernel.TouchedTestMain","namespace":"kernel","shortName":"TouchedTestMain","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.BodyActor=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_52000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_52000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getWorld :function _trc_func_52000046_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=52000064;
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=52000099;
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_func_52000046_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=52000064;
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=52000099;
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_52000144_4() {
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
    
    //$LASTPOS=52000162;
    _this.world=_this.getWorld().world;
    //$LASTPOS=52000190;
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=52000218;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52000261;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=52000307;
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=52000347;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=52000399;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=52000445;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=52000509;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=52000576;
    fixDef = new b2FixtureDef;
    //$LASTPOS=52000611;
    fixDef.density=_this.density||1;
    //$LASTPOS=52000648;
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=52000687;
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=52000737;
    bodyDef = new b2BodyDef;
    //$LASTPOS=52000770;
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=52000855;
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=52000890;
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=52000925;
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=52000973;
    w = _this.width;h = _this.height;
    //$LASTPOS=52000999;
    if (! w) {
      //$LASTPOS=52001017;
      _this.detectShape();
      //$LASTPOS=52001040;
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=52001069;
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=52001109;
    if (_this.shape=="box") {
      //$LASTPOS=52001137;
      if (! h) {
        //$LASTPOS=52001145;
        h=w;
      }
      //$LASTPOS=52001158;
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=52001201;
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=52001302;
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=52001338;
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=52001412;
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=52001446;
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=52001482;
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=52001514;
    _this.body.SetUserData(_this);
    //$LASTPOS=52001542;
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_func_52000144_5(_thread) {
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
    
    //$LASTPOS=52000162;
    _this.world=_this.getWorld().world;
    //$LASTPOS=52000190;
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=52000218;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52000261;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=52000307;
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=52000347;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=52000399;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=52000445;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=52000509;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=52000576;
    fixDef = new b2FixtureDef;
    //$LASTPOS=52000611;
    fixDef.density=_this.density||1;
    //$LASTPOS=52000648;
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=52000687;
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=52000737;
    bodyDef = new b2BodyDef;
    //$LASTPOS=52000770;
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=52000855;
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=52000890;
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=52000925;
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=52000973;
    w = _this.width;h = _this.height;
    //$LASTPOS=52000999;
    if (! w) {
      //$LASTPOS=52001017;
      _this.detectShape();
      //$LASTPOS=52001040;
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=52001069;
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=52001109;
    if (_this.shape=="box") {
      //$LASTPOS=52001137;
      if (! h) {
        //$LASTPOS=52001145;
        h=w;
      }
      //$LASTPOS=52001158;
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=52001201;
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=52001302;
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=52001338;
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=52001412;
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=52001446;
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=52001482;
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=52001514;
    _this.body.SetUserData(_this);
    //$LASTPOS=52001542;
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_func_52001574_6(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=52001599;
    res = [];
    //$LASTPOS=52001615;
    //$LASTPOS=52001620;
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=52001676;
        if (c.IsTouching()) {
          //$LASTPOS=52001710;
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=52001769;
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=52001828;
          if (a===_this) {
            //$LASTPOS=52001860;
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=52001929;
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=52001979;
            if (b===_this) {
              //$LASTPOS=52002011;
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=52002080;
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
  fiber$allContact :function _trc_func_52001574_7(_thread,klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=52001599;
    res = [];
    //$LASTPOS=52001615;
    //$LASTPOS=52001620;
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=52001676;
        if (c.IsTouching()) {
          //$LASTPOS=52001710;
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=52001769;
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=52001828;
          if (a===_this) {
            //$LASTPOS=52001860;
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=52001929;
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=52001979;
            if (b===_this) {
              //$LASTPOS=52002011;
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=52002080;
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
  applyForce :function _trc_func_52002159_8(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=52002190;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52002233;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002265;
    fps = 60;
    //$LASTPOS=52002281;
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_func_52002159_9(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=52002190;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52002233;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002265;
    fps = 60;
    //$LASTPOS=52002281;
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_func_52002339_10(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=52002372;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52002415;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002447;
    fps = 60;
    //$LASTPOS=52002463;
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_func_52002339_11(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=52002372;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=52002415;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002447;
    fps = 60;
    //$LASTPOS=52002463;
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_func_52002524_12(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=52002546;
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_func_52002524_13(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=52002546;
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_func_52002569_14(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=52002590;
    pos = _this.body.GetPosition();
    //$LASTPOS=52002622;
    pos.x+=dx/_this.scale;
    //$LASTPOS=52002643;
    pos.y+=dy/_this.scale;
    //$LASTPOS=52002664;
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_func_52002569_15(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=52002590;
    pos = _this.body.GetPosition();
    //$LASTPOS=52002622;
    pos.x+=dx/_this.scale;
    //$LASTPOS=52002643;
    pos.y+=dy/_this.scale;
    //$LASTPOS=52002664;
    _this.body.SetPosition(pos);
    
    _thread.retVal=_this;return;
  },
  contactTo :function _trc_func_52002689_16(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.allContact(t)[0];
  },
  fiber$contactTo :function _trc_func_52002689_17(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.allContact(t)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_52002736_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=52002749;
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=52002766;
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_func_52002793_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=52002812;
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=52002835;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002867;
    pos = _this.body.GetPosition();
    //$LASTPOS=52002899;
    _this.x=pos.x*scale;
    //$LASTPOS=52002918;
    _this.y=pos.y*scale;
    //$LASTPOS=52002937;
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_func_52002793_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=52002812;
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=52002835;
    scale = _this.getWorld().scale;
    //$LASTPOS=52002867;
    pos = _this.body.GetPosition();
    //$LASTPOS=52002899;
    _this.x=pos.x*scale;
    //$LASTPOS=52002918;
    _this.y=pos.y*scale;
    //$LASTPOS=52002937;
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_53000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_53000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_53000023_2(xx,yy,pp,ff,sz,rt,al) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=53000057;
    Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
    //$LASTPOS=53000082;
    _this.scaleX=1;
    //$LASTPOS=53000097;
    if (sz) {
      //$LASTPOS=53000105;
      _this.scaleX=sz;
    }
    //$LASTPOS=53000121;
    _this.angle=0;
    //$LASTPOS=53000135;
    if (rt) {
      //$LASTPOS=53000143;
      _this.angle=rt;
    }
    //$LASTPOS=53000158;
    _this.alpha=255;
    //$LASTPOS=53000174;
    if (al) {
      //$LASTPOS=53000182;
      _this.alpha=al;
    }
  },
  draw :function _trc_func_53000196_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=53000212;
    _this.rotation=_this.angle;
    //$LASTPOS=53000233;
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_54000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_54000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

