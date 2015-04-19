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
  initEventMod :function _trc_func_1000034_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000056;//kernel.EventMod:56
    if (_this._eventHandlers) {
      return _this;
    }
    //$LASTPOS=1000088;//kernel.EventMod:88
    _this._eventHandlers={};
    //$LASTPOS=1000111;//kernel.EventMod:111
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseEventMod));
  },
  fiber$initEventMod :function _trc_func_1000034_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000056;//kernel.EventMod:56
    if (_this._eventHandlers) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=1000088;//kernel.EventMod:88
    _this._eventHandlers={};
    
    _thread.enter(function _trc_func_1000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000111;//kernel.EventMod:111
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseEventMod));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseEventMod :function _trc_func_1000143_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_1;
    
    //$LASTPOS=1000168;//kernel.EventMod:168
    _it_1=Tonyu.iterator(_this._eventHandlers,2);
    while(_it_1.next()) {
      k=_it_1[0];
      v=_it_1[1];
      
      //$LASTPOS=1000210;//kernel.EventMod:210
      v.release();
      
    }
  },
  fiber$releaseEventMod :function _trc_func_1000143_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var k;
    var v;
    var _it_1;
    
    //$LASTPOS=1000168;//kernel.EventMod:168
    _it_1=Tonyu.iterator(_this._eventHandlers,2);
    while(_it_1.next()) {
      k=_it_1[0];
      v=_it_1[1];
      
      //$LASTPOS=1000210;//kernel.EventMod:210
      v.release();
      
    }
    
    _thread.retVal=_this;return;
  },
  parseArgs :function _trc_func_1000233_7(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var i;
    
    //$LASTPOS=1000253;//kernel.EventMod:253
    res = {type: a[0],args: []};
    //$LASTPOS=1000287;//kernel.EventMod:287
    //$LASTPOS=1000292;//kernel.EventMod:292
    i = 1;
    while(i<a.length) {
      {
        //$LASTPOS=1000330;//kernel.EventMod:330
        res.args.push(a[i]);
      }
      i++;
    }
    return res;
  },
  fiber$parseArgs :function _trc_func_1000233_8(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var i;
    
    //$LASTPOS=1000253;//kernel.EventMod:253
    res = {type: a[0],args: []};
    //$LASTPOS=1000287;//kernel.EventMod:287
    //$LASTPOS=1000292;//kernel.EventMod:292
    i = 1;
    while(i<a.length) {
      {
        //$LASTPOS=1000330;//kernel.EventMod:330
        res.args.push(a[i]);
      }
      i++;
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  registerEventHandler :function _trc_func_1000380_9(type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000447;//kernel.EventMod:447
    _this.initEventMod();
    //$LASTPOS=1000467;//kernel.EventMod:467
    if (typeof  type=="function") {
      //$LASTPOS=1000506;//kernel.EventMod:506
      obj=obj||new type;
      //$LASTPOS=1000533;//kernel.EventMod:533
      type=obj.getClassInfo().fullName;
      
    } else {
      //$LASTPOS=1000589;//kernel.EventMod:589
      obj=obj||new Tonyu.classes.kernel.EventHandler;
      
    }
    return _this._eventHandlers[type]=obj;
  },
  fiber$registerEventHandler :function _trc_func_1000380_10(_thread,type,obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_1000380_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000447;//kernel.EventMod:447
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000467;//kernel.EventMod:467
          if (typeof  type=="function") {
            //$LASTPOS=1000506;//kernel.EventMod:506
            obj=obj||new type;
            //$LASTPOS=1000533;//kernel.EventMod:533
            type=obj.getClassInfo().fullName;
            
          } else {
            //$LASTPOS=1000589;//kernel.EventMod:589
            obj=obj||new Tonyu.classes.kernel.EventHandler;
            
          }
          _thread.exit(_this._eventHandlers[type]=obj);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getEventHandler :function _trc_func_1000665_12(type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=1000694;//kernel.EventMod:694
    _this.initEventMod();
    //$LASTPOS=1000714;//kernel.EventMod:714
    res = _this._eventHandlers[type]||_this.registerEventHandler(type);
    return res;
  },
  fiber$getEventHandler :function _trc_func_1000665_13(_thread,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    
    _thread.enter(function _trc_func_1000665_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=1000694;//kernel.EventMod:694
          _this.fiber$initEventMod(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=1000714;//kernel.EventMod:714
          res = _this._eventHandlers[type]||_this.registerEventHandler(type);
          _thread.exit(res);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  on :function _trc_func_1000796_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var h;
    
    //$LASTPOS=1000809;//kernel.EventMod:809
    a = _this.parseArgs(arguments);
    //$LASTPOS=1000842;//kernel.EventMod:842
    h = _this.getEventHandler(a.type);
    //$LASTPOS=1000878;//kernel.EventMod:878
    h.addListener.apply(h,a.args);
  },
  fiber$on :function _trc_func_1000796_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var h;
    
    //$LASTPOS=1000809;//kernel.EventMod:809
    a = _this.parseArgs(_arguments);
    //$LASTPOS=1000842;//kernel.EventMod:842
    h = _this.getEventHandler(a.type);
    //$LASTPOS=1000878;//kernel.EventMod:878
    h.addListener.apply(h,a.args);
    
    _thread.retVal=_this;return;
  },
  fireEvent :function _trc_func_1000915_17(type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=1000945;//kernel.EventMod:945
    _this.getEventHandler(type).fire(args);
  },
  fiber$fireEvent :function _trc_func_1000915_18(_thread,type,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=1000945;//kernel.EventMod:945
    _this.getEventHandler(type).fire(args);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventMod,{"fullName":"kernel.EventMod","namespace":"kernel","shortName":"EventMod","decls":{"methods":{"main":{"nowait":false},"initEventMod":{"nowait":false},"releaseEventMod":{"nowait":false},"parseArgs":{"nowait":false},"registerEventHandler":{"nowait":false},"getEventHandler":{"nowait":false},"on":{"nowait":false},"fireEvent":{"nowait":false}}}});

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
    
    //$LASTPOS=2000071;//kernel.InputDevice:71
    _this.listeners=[];
    //$LASTPOS=2000090;//kernel.InputDevice:90
    _this.touchEmu=true;
  },
  handleListeners :function _trc_func_2000109_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var l;
    
    //$LASTPOS=2000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=2000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=2000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=2000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
  },
  fiber$handleListeners :function _trc_func_2000109_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var l;
    
    //$LASTPOS=2000135;//kernel.InputDevice:135
    l = _this.listeners;
    //$LASTPOS=2000157;//kernel.InputDevice:157
    _this.listeners=[];
    //$LASTPOS=2000176;//kernel.InputDevice:176
    while (l.length>0) {
      //$LASTPOS=2000197;//kernel.InputDevice:197
      (l.shift())();
      
    }
    
    _thread.retVal=_this;return;
  },
  addOnetimeListener :function _trc_func_2000218_5(l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=2000247;//kernel.InputDevice:247
    _this.listeners.push(l);
  },
  fiber$addOnetimeListener :function _trc_func_2000218_6(_thread,l) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=2000247;//kernel.InputDevice:247
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
    
    //$LASTPOS=2000300;//kernel.InputDevice:300
    cv = cvj[0];
    //$LASTPOS=2000320;//kernel.InputDevice:320
    Tonyu.globals.$handleMouse=function (e) {
      var p;
      var mp;
      
      //$LASTPOS=2000349;//kernel.InputDevice:349
      p = cvj.offset();
      //$LASTPOS=2000378;//kernel.InputDevice:378
      mp = {x: e.clientX-p.left,y: e.clientY-p.top};
      //$LASTPOS=2000435;//kernel.InputDevice:435
      mp=Tonyu.globals.$Screen.canvas2buf(mp);
      //$LASTPOS=2000471;//kernel.InputDevice:471
      Tonyu.globals.$mouseX=mp.x;
      //$LASTPOS=2000494;//kernel.InputDevice:494
      Tonyu.globals.$mouseY=mp.y;
      //$LASTPOS=2000517;//kernel.InputDevice:517
      if (_this.touchEmu) {
        //$LASTPOS=2000546;//kernel.InputDevice:546
        Tonyu.globals.$touches[0].x=mp.x;
        //$LASTPOS=2000579;//kernel.InputDevice:579
        Tonyu.globals.$touches[0].y=mp.y;
        
      }
      //$LASTPOS=2000619;//kernel.InputDevice:619
      _this.handleListeners();
    };
    //$LASTPOS=2000651;//kernel.InputDevice:651
    Tonyu.globals.$touches=[{},{},{},{},{}];
    //$LASTPOS=2000683;//kernel.InputDevice:683
    Tonyu.globals.$touches.findById=function (id) {
      var j;
      
      //$LASTPOS=2000718;//kernel.InputDevice:718
      //$LASTPOS=2000723;//kernel.InputDevice:723
      j = 0;
      while(j<Tonyu.globals.$touches.length) {
        {
          //$LASTPOS=2000773;//kernel.InputDevice:773
          if (Tonyu.globals.$touches[j].identifier==id) {
            return Tonyu.globals.$touches[j];
            
          }
        }
        j++;
      }
    };
    //$LASTPOS=2000883;//kernel.InputDevice:883
    Tonyu.globals.$handleTouch=function (e) {
      var p;
      var ts;
      var i;
      var src;
      var dst;
      var j;
      
      //$LASTPOS=2000912;//kernel.InputDevice:912
      _this.touchEmu=false;
      //$LASTPOS=2000937;//kernel.InputDevice:937
      p = cvj.offset();
      //$LASTPOS=2000966;//kernel.InputDevice:966
      e.preventDefault();
      //$LASTPOS=2000995;//kernel.InputDevice:995
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=2001043;//kernel.InputDevice:1043
      //$LASTPOS=2001048;//kernel.InputDevice:1048
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=2001093;//kernel.InputDevice:1093
          src = ts[i];
          //$LASTPOS=2001121;//kernel.InputDevice:1121
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=2001177;//kernel.InputDevice:1177
          if (! dst) {
            //$LASTPOS=2001206;//kernel.InputDevice:1206
            //$LASTPOS=2001211;//kernel.InputDevice:1211
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=2001269;//kernel.InputDevice:1269
                if (! Tonyu.globals.$touches[j].touched) {
                  //$LASTPOS=2001322;//kernel.InputDevice:1322
                  dst=Tonyu.globals.$touches[j];
                  //$LASTPOS=2001364;//kernel.InputDevice:1364
                  dst.identifier=src.identifier;
                  break;
                  
                  
                }
              }
              j++;
            }
            
          }
          //$LASTPOS=2001497;//kernel.InputDevice:1497
          if (dst) {
            //$LASTPOS=2001525;//kernel.InputDevice:1525
            _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
            //$LASTPOS=2001586;//kernel.InputDevice:1586
            _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
            //$LASTPOS=2001630;//kernel.InputDevice:1630
            dst.x=_this.mp.x;
            //$LASTPOS=2001659;//kernel.InputDevice:1659
            dst.y=_this.mp.y;
            //$LASTPOS=2001688;//kernel.InputDevice:1688
            if (! dst.touched) {
              //$LASTPOS=2001705;//kernel.InputDevice:1705
              dst.touched=1;
            }
            
          }
        }
        i++;
      }
      //$LASTPOS=2001755;//kernel.InputDevice:1755
      Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
      //$LASTPOS=2001787;//kernel.InputDevice:1787
      Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
      //$LASTPOS=2001819;//kernel.InputDevice:1819
      _this.handleListeners();
    };
    //$LASTPOS=2001851;//kernel.InputDevice:1851
    Tonyu.globals.$handleTouchEnd=function (e) {
      var ts;
      var i;
      var src;
      var dst;
      
      //$LASTPOS=2001883;//kernel.InputDevice:1883
      ts = e.originalEvent.changedTouches;
      //$LASTPOS=2001931;//kernel.InputDevice:1931
      //$LASTPOS=2001936;//kernel.InputDevice:1936
      i = 0;
      while(i<ts.length) {
        {
          //$LASTPOS=2001981;//kernel.InputDevice:1981
          src = ts[i];
          //$LASTPOS=2002009;//kernel.InputDevice:2009
          dst = Tonyu.globals.$touches.findById(src.identifier);
          //$LASTPOS=2002065;//kernel.InputDevice:2065
          if (dst) {
            //$LASTPOS=2002093;//kernel.InputDevice:2093
            dst.touched=0;
            //$LASTPOS=2002125;//kernel.InputDevice:2125
            dst.identifier=- 1;
            
          }
        }
        i++;
      }
      //$LASTPOS=2002179;//kernel.InputDevice:2179
      _this.handleListeners();
    };
    //$LASTPOS=2002211;//kernel.InputDevice:2211
    handleMouse = function (e) {
      
      //$LASTPOS=2002232;//kernel.InputDevice:2232
      Tonyu.globals.$handleMouse(e);
    };
    //$LASTPOS=2002256;//kernel.InputDevice:2256
    handleTouch = function (e) {
      
      //$LASTPOS=2002277;//kernel.InputDevice:2277
      Tonyu.globals.$handleTouch(e);
    };
    //$LASTPOS=2002301;//kernel.InputDevice:2301
    handleTouchEnd = function (e) {
      
      //$LASTPOS=2002325;//kernel.InputDevice:2325
      Tonyu.globals.$handleTouchEnd(e);
    };
    //$LASTPOS=2002352;//kernel.InputDevice:2352
    d = $.data(cv,"events");
    //$LASTPOS=2002384;//kernel.InputDevice:2384
    if (! d) {
      //$LASTPOS=2002403;//kernel.InputDevice:2403
      $.data(cv,"events","true");
      //$LASTPOS=2002440;//kernel.InputDevice:2440
      cvj.mousedown(handleMouse);
      //$LASTPOS=2002477;//kernel.InputDevice:2477
      cvj.mousemove(handleMouse);
      //$LASTPOS=2002514;//kernel.InputDevice:2514
      cvj.on("touchstart",handleTouch);
      //$LASTPOS=2002557;//kernel.InputDevice:2557
      cvj.on("touchmove",handleTouch);
      //$LASTPOS=2002599;//kernel.InputDevice:2599
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
    
    //$LASTPOS=2000300;//kernel.InputDevice:300
    cv = cvj[0];
    
    _thread.enter(function _trc_func_2000270_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=2000320;//kernel.InputDevice:320
          Tonyu.globals.$handleMouse=function (e) {
            var p;
            var mp;
            
            //$LASTPOS=2000349;//kernel.InputDevice:349
            p = cvj.offset();
            //$LASTPOS=2000378;//kernel.InputDevice:378
            mp = {x: e.clientX-p.left,y: e.clientY-p.top};
            //$LASTPOS=2000435;//kernel.InputDevice:435
            mp=Tonyu.globals.$Screen.canvas2buf(mp);
            //$LASTPOS=2000471;//kernel.InputDevice:471
            Tonyu.globals.$mouseX=mp.x;
            //$LASTPOS=2000494;//kernel.InputDevice:494
            Tonyu.globals.$mouseY=mp.y;
            //$LASTPOS=2000517;//kernel.InputDevice:517
            if (_this.touchEmu) {
              //$LASTPOS=2000546;//kernel.InputDevice:546
              Tonyu.globals.$touches[0].x=mp.x;
              //$LASTPOS=2000579;//kernel.InputDevice:579
              Tonyu.globals.$touches[0].y=mp.y;
              
            }
            //$LASTPOS=2000619;//kernel.InputDevice:619
            _this.handleListeners();
          };
          //$LASTPOS=2000651;//kernel.InputDevice:651
          Tonyu.globals.$touches=[{},{},{},{},{}];
          //$LASTPOS=2000683;//kernel.InputDevice:683
          Tonyu.globals.$touches.findById=function (id) {
            var j;
            
            //$LASTPOS=2000718;//kernel.InputDevice:718
            //$LASTPOS=2000723;//kernel.InputDevice:723
            j = 0;
            while(j<Tonyu.globals.$touches.length) {
              {
                //$LASTPOS=2000773;//kernel.InputDevice:773
                if (Tonyu.globals.$touches[j].identifier==id) {
                  return Tonyu.globals.$touches[j];
                  
                }
              }
              j++;
            }
          };
          //$LASTPOS=2000883;//kernel.InputDevice:883
          Tonyu.globals.$handleTouch=function (e) {
            var p;
            var ts;
            var i;
            var src;
            var dst;
            var j;
            
            //$LASTPOS=2000912;//kernel.InputDevice:912
            _this.touchEmu=false;
            //$LASTPOS=2000937;//kernel.InputDevice:937
            p = cvj.offset();
            //$LASTPOS=2000966;//kernel.InputDevice:966
            e.preventDefault();
            //$LASTPOS=2000995;//kernel.InputDevice:995
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=2001043;//kernel.InputDevice:1043
            //$LASTPOS=2001048;//kernel.InputDevice:1048
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=2001093;//kernel.InputDevice:1093
                src = ts[i];
                //$LASTPOS=2001121;//kernel.InputDevice:1121
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=2001177;//kernel.InputDevice:1177
                if (! dst) {
                  //$LASTPOS=2001206;//kernel.InputDevice:1206
                  //$LASTPOS=2001211;//kernel.InputDevice:1211
                  j = 0;
                  while(j<Tonyu.globals.$touches.length) {
                    {
                      //$LASTPOS=2001269;//kernel.InputDevice:1269
                      if (! Tonyu.globals.$touches[j].touched) {
                        //$LASTPOS=2001322;//kernel.InputDevice:1322
                        dst=Tonyu.globals.$touches[j];
                        //$LASTPOS=2001364;//kernel.InputDevice:1364
                        dst.identifier=src.identifier;
                        break;
                        
                        
                      }
                    }
                    j++;
                  }
                  
                }
                //$LASTPOS=2001497;//kernel.InputDevice:1497
                if (dst) {
                  //$LASTPOS=2001525;//kernel.InputDevice:1525
                  _this.mp={x: src.pageX-p.left,y: src.pageY-p.top};
                  //$LASTPOS=2001586;//kernel.InputDevice:1586
                  _this.mp=Tonyu.globals.$Screen.canvas2buf(_this.mp);
                  //$LASTPOS=2001630;//kernel.InputDevice:1630
                  dst.x=_this.mp.x;
                  //$LASTPOS=2001659;//kernel.InputDevice:1659
                  dst.y=_this.mp.y;
                  //$LASTPOS=2001688;//kernel.InputDevice:1688
                  if (! dst.touched) {
                    //$LASTPOS=2001705;//kernel.InputDevice:1705
                    dst.touched=1;
                  }
                  
                }
              }
              i++;
            }
            //$LASTPOS=2001755;//kernel.InputDevice:1755
            Tonyu.globals.$mouseX=Tonyu.globals.$touches[0].x;
            //$LASTPOS=2001787;//kernel.InputDevice:1787
            Tonyu.globals.$mouseY=Tonyu.globals.$touches[0].y;
            //$LASTPOS=2001819;//kernel.InputDevice:1819
            _this.handleListeners();
          };
          //$LASTPOS=2001851;//kernel.InputDevice:1851
          Tonyu.globals.$handleTouchEnd=function (e) {
            var ts;
            var i;
            var src;
            var dst;
            
            //$LASTPOS=2001883;//kernel.InputDevice:1883
            ts = e.originalEvent.changedTouches;
            //$LASTPOS=2001931;//kernel.InputDevice:1931
            //$LASTPOS=2001936;//kernel.InputDevice:1936
            i = 0;
            while(i<ts.length) {
              {
                //$LASTPOS=2001981;//kernel.InputDevice:1981
                src = ts[i];
                //$LASTPOS=2002009;//kernel.InputDevice:2009
                dst = Tonyu.globals.$touches.findById(src.identifier);
                //$LASTPOS=2002065;//kernel.InputDevice:2065
                if (dst) {
                  //$LASTPOS=2002093;//kernel.InputDevice:2093
                  dst.touched=0;
                  //$LASTPOS=2002125;//kernel.InputDevice:2125
                  dst.identifier=- 1;
                  
                }
              }
              i++;
            }
            //$LASTPOS=2002179;//kernel.InputDevice:2179
            _this.handleListeners();
          };
          //$LASTPOS=2002211;//kernel.InputDevice:2211
          handleMouse = function (e) {
            
            //$LASTPOS=2002232;//kernel.InputDevice:2232
            Tonyu.globals.$handleMouse(e);
          };
          //$LASTPOS=2002256;//kernel.InputDevice:2256
          handleTouch = function (e) {
            
            //$LASTPOS=2002277;//kernel.InputDevice:2277
            Tonyu.globals.$handleTouch(e);
          };
          //$LASTPOS=2002301;//kernel.InputDevice:2301
          handleTouchEnd = function (e) {
            
            //$LASTPOS=2002325;//kernel.InputDevice:2325
            Tonyu.globals.$handleTouchEnd(e);
          };
          //$LASTPOS=2002352;//kernel.InputDevice:2352
          d = $.data(cv,"events");
          //$LASTPOS=2002384;//kernel.InputDevice:2384
          if (! d) {
            //$LASTPOS=2002403;//kernel.InputDevice:2403
            $.data(cv,"events","true");
            //$LASTPOS=2002440;//kernel.InputDevice:2440
            cvj.mousedown(handleMouse);
            //$LASTPOS=2002477;//kernel.InputDevice:2477
            cvj.mousemove(handleMouse);
            //$LASTPOS=2002514;//kernel.InputDevice:2514
            cvj.on("touchstart",handleTouch);
            //$LASTPOS=2002557;//kernel.InputDevice:2557
            cvj.on("touchmove",handleTouch);
            //$LASTPOS=2002599;//kernel.InputDevice:2599
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
    var _it_36;
    
    //$LASTPOS=2002664;//kernel.InputDevice:2664
    _it_36=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_36.next()) {
      i=_it_36[0];
      
      //$LASTPOS=2002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=2002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=2002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=2002759;//kernel.InputDevice:2759
        i.touched=1;
      }
      
    }
  },
  fiber$update :function _trc_func_2002647_11(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_36;
    
    //$LASTPOS=2002664;//kernel.InputDevice:2664
    _it_36=Tonyu.iterator(Tonyu.globals.$touches,1);
    while(_it_36.next()) {
      i=_it_36[0];
      
      //$LASTPOS=2002699;//kernel.InputDevice:2699
      if (i.touched>0) {
        //$LASTPOS=2002717;//kernel.InputDevice:2717
        i.touched++;
        
      }
      //$LASTPOS=2002740;//kernel.InputDevice:2740
      if (i.touched==- 1) {
        //$LASTPOS=2002759;//kernel.InputDevice:2759
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
    
    //$LASTPOS=3000416;//kernel.MathMod:416
    c;
    //$LASTPOS=3000428;//kernel.MathMod:428
    a=_this.floor(a);
    //$LASTPOS=3000445;//kernel.MathMod:445
    b=_this.floor(b);
    //$LASTPOS=3000462;//kernel.MathMod:462
    if (a>=b) {
      //$LASTPOS=3000483;//kernel.MathMod:483
      c=(a-b)%360;
      //$LASTPOS=3000507;//kernel.MathMod:507
      if (c>=180) {
        //$LASTPOS=3000519;//kernel.MathMod:519
        c-=360;
      }
      
    } else {
      //$LASTPOS=3000550;//kernel.MathMod:550
      c=- ((b-a)%360);
      //$LASTPOS=3000577;//kernel.MathMod:577
      if (c<- 180) {
        //$LASTPOS=3000589;//kernel.MathMod:589
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
    
    //$LASTPOS=3000698;//kernel.MathMod:698
    if (typeof  dx=="object") {
      //$LASTPOS=3000734;//kernel.MathMod:734
      t = dx;
      //$LASTPOS=3000753;//kernel.MathMod:753
      dx=t.x-_this.x;
      //$LASTPOS=3000762;//kernel.MathMod:762
      dy=t.y-_this.y;
      
    }
    return _this.sqrt(dx*dx+dy*dy);
  },
  trunc :function _trc_func_3000814_12(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=3000838;//kernel.MathMod:838
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
    
    //$LASTPOS=3000975;//kernel.MathMod:975
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
Tonyu.classes.kernel.T2Mod=Tonyu.klass([],{
  main :function _trc_func_5000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_5000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  bvec :function _trc_func_5000015_2(tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    
    //$LASTPOS=5000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    return new b2Vec2(tx/_this.scale,ty/_this.scale);
  },
  fiber$bvec :function _trc_func_5000015_3(_thread,tx,ty) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    
    //$LASTPOS=5000034;//kernel.T2Mod:34
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    _thread.retVal=new b2Vec2(tx/_this.scale,ty/_this.scale);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Mod,{"fullName":"kernel.T2Mod","namespace":"kernel","shortName":"T2Mod","decls":{"methods":{"main":{"nowait":false},"bvec":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.TextRectMod=Tonyu.klass([],{
  main :function _trc_func_6000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_6000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  drawTextRect :function _trc_func_6000017_2(ctx,text,x,topY,h,align,type) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var met;
    var res;
    var t;
    
    //$LASTPOS=6000090;//kernel.TextRectMod:90
    if (! align) {
      //$LASTPOS=6000102;//kernel.TextRectMod:102
      align="center";
    }
    //$LASTPOS=6000123;//kernel.TextRectMod:123
    ctx.textBaseline="top";
    //$LASTPOS=6000152;//kernel.TextRectMod:152
    _this.setFontSize(ctx,h);
    //$LASTPOS=6000178;//kernel.TextRectMod:178
    met = ctx.measureText(text);
    //$LASTPOS=6000214;//kernel.TextRectMod:214
    res = {y: topY,w: met.width,h: h};
    //$LASTPOS=6000256;//kernel.TextRectMod:256
    t = align.substring(0,1).toLowerCase();
    //$LASTPOS=6000303;//kernel.TextRectMod:303
    if (t=="l") {
      //$LASTPOS=6000315;//kernel.TextRectMod:315
      res.x=x;
    } else {
      //$LASTPOS=6000334;//kernel.TextRectMod:334
      if (t=="r") {
        //$LASTPOS=6000346;//kernel.TextRectMod:346
        res.x=x-met.width;
      } else {
        //$LASTPOS=6000375;//kernel.TextRectMod:375
        if (t=="c") {
          //$LASTPOS=6000387;//kernel.TextRectMod:387
          res.x=x-met.width/2;
        }
      }
    }
    //$LASTPOS=6000413;//kernel.TextRectMod:413
    if (type=="fill") {
      //$LASTPOS=6000431;//kernel.TextRectMod:431
      ctx.fillText(text,res.x,topY);
    }
    //$LASTPOS=6000468;//kernel.TextRectMod:468
    if (type=="stroke") {
      //$LASTPOS=6000488;//kernel.TextRectMod:488
      ctx.strokeText(text,res.x,topY);
    }
    return res;
  },
  setFontSize :function _trc_func_6000543_3(ctx,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var post;
    
    //$LASTPOS=6000586;//kernel.TextRectMod:586
    post = ctx.font.replace(/^[0-9\.]+/,"");
    //$LASTPOS=6000634;//kernel.TextRectMod:634
    ctx.font=sz+post;
  },
  fukidashi :function _trc_func_6000658_4(ctx,text,x,y,sz) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var align;
    var theight;
    var margin;
    var r;
    var fs;
    
    //$LASTPOS=6000712;//kernel.TextRectMod:712
    align = "c";
    //$LASTPOS=6000732;//kernel.TextRectMod:732
    theight = 20;
    //$LASTPOS=6000753;//kernel.TextRectMod:753
    margin = 5;
    //$LASTPOS=6000772;//kernel.TextRectMod:772
    r = _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align);
    //$LASTPOS=6000842;//kernel.TextRectMod:842
    ctx.beginPath();
    //$LASTPOS=6000864;//kernel.TextRectMod:864
    ctx.moveTo(x,y);
    //$LASTPOS=6000888;//kernel.TextRectMod:888
    ctx.lineTo(x+margin,y-theight);
    //$LASTPOS=6000927;//kernel.TextRectMod:927
    ctx.lineTo(x+r.w/2+margin,y-theight);
    //$LASTPOS=6000972;//kernel.TextRectMod:972
    ctx.lineTo(x+r.w/2+margin,y-theight-r.h-margin*2);
    //$LASTPOS=6001030;//kernel.TextRectMod:1030
    ctx.lineTo(x-r.w/2-margin,y-theight-r.h-margin*2);
    //$LASTPOS=6001088;//kernel.TextRectMod:1088
    ctx.lineTo(x-r.w/2-margin,y-theight);
    //$LASTPOS=6001133;//kernel.TextRectMod:1133
    ctx.lineTo(x-margin,y-theight);
    //$LASTPOS=6001172;//kernel.TextRectMod:1172
    ctx.closePath();
    //$LASTPOS=6001194;//kernel.TextRectMod:1194
    ctx.fill();
    //$LASTPOS=6001211;//kernel.TextRectMod:1211
    ctx.stroke();
    //$LASTPOS=6001236;//kernel.TextRectMod:1236
    fs = ctx.fillStyle;
    //$LASTPOS=6001263;//kernel.TextRectMod:1263
    ctx.fillStyle=ctx.strokeStyle;
    //$LASTPOS=6001299;//kernel.TextRectMod:1299
    _this.drawTextRect(ctx,text,x,y-theight-margin-sz,sz,align,"fill");
    //$LASTPOS=6001372;//kernel.TextRectMod:1372
    ctx.fillStyle=fs;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextRectMod,{"fullName":"kernel.TextRectMod","namespace":"kernel","shortName":"TextRectMod","decls":{"methods":{"main":{"nowait":false},"drawTextRect":{"nowait":true},"setFontSize":{"nowait":true},"fukidashi":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Scheduler=Tonyu.klass([],{
  main :function _trc_func_7000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_7000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Scheduler,{"fullName":"kernel.Scheduler","namespace":"kernel","shortName":"Scheduler","decls":{"methods":{"main":{"nowait":false}}}});

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
    
    //$LASTPOS=8000052;//kernel.TObject:52
    if (typeof  options=="object") {
      //$LASTPOS=8000082;//kernel.TObject:82
      _this.extend(options);
    }
    //$LASTPOS=8000104;//kernel.TObject:104
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
    
    //$LASTPOS=9000049;//kernel.TQuery:49
    _this.length=0;
  },
  tonyuIterator :function _trc_func_9000061_3(arity) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=9000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=9000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=9000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=9000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=9000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=9000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=9000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=9000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=9000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=9000468;//kernel.TQuery:468
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
    
    //$LASTPOS=9000089;//kernel.TQuery:89
    res = {};
    //$LASTPOS=9000105;//kernel.TQuery:105
    res.i=0;
    //$LASTPOS=9000118;//kernel.TQuery:118
    if (arity==1) {
      //$LASTPOS=9000142;//kernel.TQuery:142
      res.next=function () {
        
        //$LASTPOS=9000177;//kernel.TQuery:177
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000227;//kernel.TQuery:227
        res[0]=_this[res.i];
        //$LASTPOS=9000259;//kernel.TQuery:259
        res.i++;
        return true;
      };
      
    } else {
      //$LASTPOS=9000325;//kernel.TQuery:325
      res.next=function () {
        
        //$LASTPOS=9000360;//kernel.TQuery:360
        if (res.i>=_this.length) {
          return false;
        }
        //$LASTPOS=9000410;//kernel.TQuery:410
        res[0]=res.i;
        //$LASTPOS=9000436;//kernel.TQuery:436
        res[1]=_this[res.i];
        //$LASTPOS=9000468;//kernel.TQuery:468
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
    var _it_52;
    
    //$LASTPOS=9000551;//kernel.TQuery:551
    values;
    //$LASTPOS=9000567;//kernel.TQuery:567
    if (_this.length==0) {
      return _this;
    }
    //$LASTPOS=9000594;//kernel.TQuery:594
    if (arguments.length==1&&typeof  arguments[0]=="string") {
      return _this[0][arguments[0]];
      
    }
    //$LASTPOS=9000702;//kernel.TQuery:702
    if (arguments.length>=2) {
      //$LASTPOS=9000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=9000756;//kernel.TQuery:756
      //$LASTPOS=9000761;//kernel.TQuery:761
      i = 0;
      while(i<arguments.length-1) {
        {
          //$LASTPOS=9000813;//kernel.TQuery:813
          values[arguments[i]]=arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=9000881;//kernel.TQuery:881
      values=arguments[0];
      
    }
    //$LASTPOS=9000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=9000934;//kernel.TQuery:934
      _it_52=Tonyu.iterator(_this,1);
      while(_it_52.next()) {
        e=_it_52[0];
        
        //$LASTPOS=9000968;//kernel.TQuery:968
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
    var _it_52;
    
    //$LASTPOS=9000551;//kernel.TQuery:551
    values;
    //$LASTPOS=9000567;//kernel.TQuery:567
    if (_this.length==0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=9000594;//kernel.TQuery:594
    if (_arguments.length==1&&typeof  _arguments[0]=="string") {
      _thread.retVal=_this[0][_arguments[0]];return;
      
      
    }
    //$LASTPOS=9000702;//kernel.TQuery:702
    if (_arguments.length>=2) {
      //$LASTPOS=9000737;//kernel.TQuery:737
      values={};
      //$LASTPOS=9000756;//kernel.TQuery:756
      //$LASTPOS=9000761;//kernel.TQuery:761
      i = 0;
      while(i<_arguments.length-1) {
        {
          //$LASTPOS=9000813;//kernel.TQuery:813
          values[_arguments[i]]=_arguments[i+1];
        }
        i+=2;
      }
      
    } else {
      //$LASTPOS=9000881;//kernel.TQuery:881
      values=_arguments[0];
      
    }
    //$LASTPOS=9000912;//kernel.TQuery:912
    if (values) {
      //$LASTPOS=9000934;//kernel.TQuery:934
      _it_52=Tonyu.iterator(_this,1);
      while(_it_52.next()) {
        e=_it_52[0];
        
        //$LASTPOS=9000968;//kernel.TQuery:968
        e.extend(values);
        
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  genKeyfunc :function _trc_func_9001005_7(key) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9001028;//kernel.TQuery:1028
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
    
    //$LASTPOS=9001028;//kernel.TQuery:1028
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
    var _it_58;
    var v;
    
    //$LASTPOS=9001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001210;//kernel.TQuery:1210
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=9001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=9001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=9001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=9001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=9001365;//kernel.TQuery:1365
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
    var _it_58;
    var v;
    
    //$LASTPOS=9001154;//kernel.TQuery:1154
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001181;//kernel.TQuery:1181
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001210;//kernel.TQuery:1210
    _it_58=Tonyu.iterator(_this,1);
    while(_it_58.next()) {
      o=_it_58[0];
      
      //$LASTPOS=9001240;//kernel.TQuery:1240
      v = f(o);
      //$LASTPOS=9001260;//kernel.TQuery:1260
      if (res==null||v>=res) {
        //$LASTPOS=9001299;//kernel.TQuery:1299
        if (v>res) {
          //$LASTPOS=9001310;//kernel.TQuery:1310
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001339;//kernel.TQuery:1339
        reso.push(o);
        //$LASTPOS=9001365;//kernel.TQuery:1365
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
    var _it_65;
    var v;
    
    //$LASTPOS=9001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001480;//kernel.TQuery:1480
    _it_65=Tonyu.iterator(_this,1);
    while(_it_65.next()) {
      o=_it_65[0];
      
      //$LASTPOS=9001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=9001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=9001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=9001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=9001635;//kernel.TQuery:1635
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
    var _it_65;
    var v;
    
    //$LASTPOS=9001424;//kernel.TQuery:1424
    f = _this.genKeyfunc(key);
    //$LASTPOS=9001451;//kernel.TQuery:1451
    res;reso = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9001480;//kernel.TQuery:1480
    _it_65=Tonyu.iterator(_this,1);
    while(_it_65.next()) {
      o=_it_65[0];
      
      //$LASTPOS=9001510;//kernel.TQuery:1510
      v = f(o);
      //$LASTPOS=9001530;//kernel.TQuery:1530
      if (res==null||v<=res) {
        //$LASTPOS=9001569;//kernel.TQuery:1569
        if (v<res) {
          //$LASTPOS=9001580;//kernel.TQuery:1580
          reso=new Tonyu.classes.kernel.TQuery;
        }
        //$LASTPOS=9001609;//kernel.TQuery:1609
        reso.push(o);
        //$LASTPOS=9001635;//kernel.TQuery:1635
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
    
    //$LASTPOS=9001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=9001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=9001813;//kernel.TQuery:1813
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
    
    //$LASTPOS=9001782;//kernel.TQuery:1782
    if (typeof  x=="object") {
      //$LASTPOS=9001807;//kernel.TQuery:1807
      y=x.y;
      //$LASTPOS=9001813;//kernel.TQuery:1813
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
    
    //$LASTPOS=9001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=9001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=9002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=9002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=9002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=9002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=9002052;//kernel.TQuery:2052
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
    
    //$LASTPOS=9001958;//kernel.TQuery:1958
    x;y;
    //$LASTPOS=9001971;//kernel.TQuery:1971
    if (typeof  xo=="object") {
      //$LASTPOS=9002006;//kernel.TQuery:2006
      x=xo.x;
      //$LASTPOS=9002013;//kernel.TQuery:2013
      y=xo.y;
      //$LASTPOS=9002020;//kernel.TQuery:2020
      d=yd;
      
    } else {
      //$LASTPOS=9002047;//kernel.TQuery:2047
      x=xo;
      //$LASTPOS=9002052;//kernel.TQuery:2052
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
    var _it_76;
    var v;
    
    //$LASTPOS=9002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=9002250;//kernel.TQuery:2250
    _it_76=Tonyu.iterator(_this,1);
    while(_it_76.next()) {
      o=_it_76[0];
      
      //$LASTPOS=9002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=9002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=9002324;//kernel.TQuery:2324
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
    var _it_76;
    var v;
    
    //$LASTPOS=9002210;//kernel.TQuery:2210
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002237;//kernel.TQuery:2237
    res;
    //$LASTPOS=9002250;//kernel.TQuery:2250
    _it_76=Tonyu.iterator(_this,1);
    while(_it_76.next()) {
      o=_it_76[0];
      
      //$LASTPOS=9002280;//kernel.TQuery:2280
      v = f(o);
      //$LASTPOS=9002300;//kernel.TQuery:2300
      if (res==null||v>res) {
        //$LASTPOS=9002324;//kernel.TQuery:2324
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
    var _it_82;
    var v;
    
    //$LASTPOS=9002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=9002411;//kernel.TQuery:2411
    _it_82=Tonyu.iterator(_this,1);
    while(_it_82.next()) {
      o=_it_82[0];
      
      //$LASTPOS=9002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=9002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=9002485;//kernel.TQuery:2485
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
    var _it_82;
    var v;
    
    //$LASTPOS=9002371;//kernel.TQuery:2371
    f = _this.genKeyfunc(key);
    //$LASTPOS=9002398;//kernel.TQuery:2398
    res;
    //$LASTPOS=9002411;//kernel.TQuery:2411
    _it_82=Tonyu.iterator(_this,1);
    while(_it_82.next()) {
      o=_it_82[0];
      
      //$LASTPOS=9002441;//kernel.TQuery:2441
      v = f(o);
      //$LASTPOS=9002461;//kernel.TQuery:2461
      if (res==null||v<res) {
        //$LASTPOS=9002485;//kernel.TQuery:2485
        res=v;
      }
      
    }
    _thread.retVal=res;return;
    
    
    _thread.retVal=_this;return;
  },
  push :function _trc_func_9002516_29(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=9002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=9002551;//kernel.TQuery:2551
    _this.length++;
  },
  fiber$push :function _trc_func_9002516_30(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=9002531;//kernel.TQuery:2531
    _this[_this.length]=e;
    //$LASTPOS=9002551;//kernel.TQuery:2551
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
    var _it_88;
    
    //$LASTPOS=9002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9002626;//kernel.TQuery:2626
    _it_88=Tonyu.iterator(_this,1);
    while(_it_88.next()) {
      o=_it_88[0];
      
      //$LASTPOS=9002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=9002666;//kernel.TQuery:2666
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
    var _it_88;
    
    //$LASTPOS=9002603;//kernel.TQuery:2603
    no = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=9002626;//kernel.TQuery:2626
    _it_88=Tonyu.iterator(_this,1);
    while(_it_88.next()) {
      o=_it_88[0];
      
      //$LASTPOS=9002656;//kernel.TQuery:2656
      if (f(o)) {
        //$LASTPOS=9002666;//kernel.TQuery:2666
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
    var _it_92;
    var f;
    
    //$LASTPOS=9002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=9002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=9002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=9002764;//kernel.TQuery:2764
    _it_92=Tonyu.iterator(_this,1);
    while(_it_92.next()) {
      o=_it_92[0];
      
      //$LASTPOS=9002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=9002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=9002857;//kernel.TQuery:2857
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
    var _it_92;
    var f;
    
    //$LASTPOS=9002727;//kernel.TQuery:2727
    res;
    //$LASTPOS=9002740;//kernel.TQuery:2740
    if (! args) {
      //$LASTPOS=9002751;//kernel.TQuery:2751
      args=[];
    }
    //$LASTPOS=9002764;//kernel.TQuery:2764
    _it_92=Tonyu.iterator(_this,1);
    while(_it_92.next()) {
      o=_it_92[0];
      
      //$LASTPOS=9002794;//kernel.TQuery:2794
      f = o[name];
      //$LASTPOS=9002817;//kernel.TQuery:2817
      if (typeof  f=="function") {
        //$LASTPOS=9002857;//kernel.TQuery:2857
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
    
    //$LASTPOS=9003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=9003071;//kernel.TQuery:3071
    if (a.length==0) {
      return false;
    }
    //$LASTPOS=9003106;//kernel.TQuery:3106
    a.apply("die");
    return true;
  },
  fiber$die :function _trc_func_9003039_40(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    
    //$LASTPOS=9003052;//kernel.TQuery:3052
    a = _this.alive();
    //$LASTPOS=9003071;//kernel.TQuery:3071
    if (a.length==0) {
      _thread.retVal=false;return;
      
    }
    //$LASTPOS=9003106;//kernel.TQuery:3106
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
    
    //$LASTPOS=10000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=10000036;//kernel.WaveTable:36
    _this.env={};
    //$LASTPOS=10000313;//kernel.WaveTable:313
    if (typeof  T!=="undefined") {
      //$LASTPOS=10000392;//kernel.WaveTable:392
      _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
      //$LASTPOS=10000460;//kernel.WaveTable:460
      _this.setEnv(0,_this.env);
      //$LASTPOS=10000480;//kernel.WaveTable:480
      _this.setWav(0,T("pulse"));
      
    }
  },
  fiber$main :function _trc_func_10000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000028;//kernel.WaveTable:28
    _this.wav={};
    //$LASTPOS=10000036;//kernel.WaveTable:36
    _this.env={};
    
    _thread.enter(function _trc_func_10000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=10000313;//kernel.WaveTable:313
          if (!(typeof  T!=="undefined")) { __pc=3; break; }
          //$LASTPOS=10000392;//kernel.WaveTable:392
          _this.env=T("env",{table: [1,[0.6,50],[0,100]],releaseNode: 2});
          //$LASTPOS=10000460;//kernel.WaveTable:460
          _this.fiber$setEnv(_thread, 0, _this.env);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=10000480;//kernel.WaveTable:480
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
    
    //$LASTPOS=10000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
  },
  fiber$setWav :function _trc_func_10000044_4(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000070;//kernel.WaveTable:70
    _this.wav[num]=synth;
    
    _thread.retVal=_this;return;
  },
  setEnv :function _trc_func_10000088_5(num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=10000114;//kernel.WaveTable:114
    _this.env[num]=synth;
  },
  fiber$setEnv :function _trc_func_10000088_6(_thread,num,synth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=10000114;//kernel.WaveTable:114
    _this.env[num]=synth;
    
    _thread.retVal=_this;return;
  },
  get :function _trc_func_10000132_7(w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var synth;
    
    //$LASTPOS=10000148;//kernel.WaveTable:148
    synth = T("OscGen",{osc: _this.wav[w],env: _this.env[e],mul: 0.25});
    return synth;
  },
  fiber$get :function _trc_func_10000132_8(_thread,w,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var synth;
    
    //$LASTPOS=10000148;//kernel.WaveTable:148
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
Tonyu.classes.kernel.BaseActor=Tonyu.klass([Tonyu.classes.kernel.MathMod,Tonyu.classes.kernel.EventMod,Tonyu.classes.kernel.TextRectMod],{
  main :function _trc_func_11000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_11000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_11000143_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=11000162;//kernel.BaseActor:162
    if (Tonyu.runMode) {
      //$LASTPOS=11000192;//kernel.BaseActor:192
      thg = _this.currentThreadGroup();
      //$LASTPOS=11000231;//kernel.BaseActor:231
      if (thg) {
        //$LASTPOS=11000240;//kernel.BaseActor:240
        _this._th=thg.addObj(_this);
      }
      
    }
    //$LASTPOS=11000274;//kernel.BaseActor:274
    if (typeof  x=="object") {
      //$LASTPOS=11000298;//kernel.BaseActor:298
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=11000330;//kernel.BaseActor:330
      if (typeof  x=="number") {
        //$LASTPOS=11000365;//kernel.BaseActor:365
        _this.x=x;
        //$LASTPOS=11000384;//kernel.BaseActor:384
        _this.y=y;
        //$LASTPOS=11000403;//kernel.BaseActor:403
        _this.p=p;
        
      }
    }
    //$LASTPOS=11000425;//kernel.BaseActor:425
    if (_this.scaleX==null) {
      //$LASTPOS=11000443;//kernel.BaseActor:443
      _this.scaleX=1;
    }
    //$LASTPOS=11000458;//kernel.BaseActor:458
    if (_this.rotation==null) {
      //$LASTPOS=11000478;//kernel.BaseActor:478
      _this.rotation=0;
    }
    //$LASTPOS=11000495;//kernel.BaseActor:495
    if (_this.rotate==null) {
      //$LASTPOS=11000513;//kernel.BaseActor:513
      _this.rotate=0;
    }
    //$LASTPOS=11000528;//kernel.BaseActor:528
    if (_this.alpha==null) {
      //$LASTPOS=11000545;//kernel.BaseActor:545
      _this.alpha=255;
    }
    //$LASTPOS=11000561;//kernel.BaseActor:561
    if (_this.zOrder==null) {
      //$LASTPOS=11000579;//kernel.BaseActor:579
      _this.zOrder=0;
    }
    //$LASTPOS=11000594;//kernel.BaseActor:594
    if (_this.age==null) {
      //$LASTPOS=11000609;//kernel.BaseActor:609
      _this.age=0;
    }
    //$LASTPOS=11000621;//kernel.BaseActor:621
    if (_this.anim!=null&&typeof  _this.anim=="object") {
      //$LASTPOS=11000672;//kernel.BaseActor:672
      _this.animMode=true;
      //$LASTPOS=11000696;//kernel.BaseActor:696
      _this.animFrame=0;
      
    } else {
      //$LASTPOS=11000730;//kernel.BaseActor:730
      _this.animMode=false;
      
    }
    //$LASTPOS=11000758;//kernel.BaseActor:758
    if (_this.animFps==null) {
      //$LASTPOS=11000777;//kernel.BaseActor:777
      _this.animFps=1;
    }
  },
  extend :function _trc_func_11000792_3(obj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.extend(_this,obj);
  },
  print :function _trc_func_11000856_4(pt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11000881;//kernel.BaseActor:881
    console.log.apply(console,arguments);
    //$LASTPOS=11000924;//kernel.BaseActor:924
    if (Tonyu.globals.$consolePanel) {
      //$LASTPOS=11000952;//kernel.BaseActor:952
      Tonyu.globals.$consolePanel.scroll(0,20);
      //$LASTPOS=11000989;//kernel.BaseActor:989
      Tonyu.globals.$consolePanel.setFillStyle("white");
      //$LASTPOS=11001035;//kernel.BaseActor:1035
      Tonyu.globals.$consolePanel.fillText(pt,0,Tonyu.globals.$consolePrintY,20,"left");
      
    }
  },
  setAnimFps :function _trc_func_11001103_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001131;//kernel.BaseActor:1131
    _this.animFps=f;
    //$LASTPOS=11001152;//kernel.BaseActor:1152
    _this.animFrame=0;
    //$LASTPOS=11001175;//kernel.BaseActor:1175
    _this.animMode=true;
  },
  startAnim :function _trc_func_11001199_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001225;//kernel.BaseActor:1225
    _this.animMode=true;
  },
  stopAnim :function _trc_func_11001249_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001274;//kernel.BaseActor:1274
    _this.animMode=false;
  },
  update :function _trc_func_11001299_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11001316;//kernel.BaseActor:1316
    _this.onUpdate();
    //$LASTPOS=11001333;//kernel.BaseActor:1333
    if (null) {
      //$LASTPOS=11001356;//kernel.BaseActor:1356
      null.suspend();
      
    }
  },
  fiber$update :function _trc_func_11001299_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11001316;//kernel.BaseActor:1316
    _this.onUpdate();
    //$LASTPOS=11001333;//kernel.BaseActor:1333
    if (_thread) {
      //$LASTPOS=11001356;//kernel.BaseActor:1356
      _thread.suspend();
      
    }
    
    _thread.retVal=_this;return;
  },
  onUpdate :function _trc_func_11001386_10() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  updateEx :function _trc_func_11001413_11(updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var updateCount;
    
    //$LASTPOS=11001438;//kernel.BaseActor:1438
    //$LASTPOS=11001442;//kernel.BaseActor:1442
    updateCount = 0;
    while(updateCount<updateT) {
      {
        //$LASTPOS=11001505;//kernel.BaseActor:1505
        _this.update();
      }
      updateCount++;
    }
  },
  fiber$updateEx :function _trc_func_11001413_12(_thread,updateT) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var updateCount;
    
    
    _thread.enter(function _trc_func_11001413_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11001438;//kernel.BaseActor:1438
          //$LASTPOS=11001442;//kernel.BaseActor:1442
          updateCount = 0;;
        case 1:
          if (!(updateCount<updateT)) { __pc=3; break; }
          //$LASTPOS=11001505;//kernel.BaseActor:1505
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
  getkey :function _trc_func_11001526_14(k) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$Keys.getkey(k);
  },
  hitTo :function _trc_func_11001579_15(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.crashTo(t);
  },
  all :function _trc_func_11001626_16(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=11001648;//kernel.BaseActor:1648
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=11001673;//kernel.BaseActor:1673
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      
      //$LASTPOS=11001714;//kernel.BaseActor:1714
      if (s===_this) {
        return _this;
      }
      //$LASTPOS=11001745;//kernel.BaseActor:1745
      if (! c||s instanceof c) {
        //$LASTPOS=11001786;//kernel.BaseActor:1786
        res.push(s);
        
      }
    });
    return res;
  },
  allCrash :function _trc_func_11001866_17(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var sp;
    var t1;
    
    //$LASTPOS=11001893;//kernel.BaseActor:1893
    res = new Tonyu.classes.kernel.TQuery;
    //$LASTPOS=11001918;//kernel.BaseActor:1918
    sp = _this;
    //$LASTPOS=11001955;//kernel.BaseActor:1955
    t1 = _this.getCrashRect();
    //$LASTPOS=11001983;//kernel.BaseActor:1983
    if (! t1) {
      return res;
    }
    //$LASTPOS=11002009;//kernel.BaseActor:2009
    Tonyu.globals.$Sprites.sprites.forEach(function (s) {
      var t2;
      
      //$LASTPOS=11002050;//kernel.BaseActor:2050
      t2;
      //$LASTPOS=11002067;//kernel.BaseActor:2067
      if (s!==_this&&! s.excludeFromAll&&s instanceof t&&(t2=s.getCrashRect())&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height) {
        //$LASTPOS=11002293;//kernel.BaseActor:2293
        res.push(s);
        
      }
    });
    return res;
  },
  crashTo :function _trc_func_11002347_18(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11002373;//kernel.BaseActor:2373
    if (! t) {
      return false;
    }
    //$LASTPOS=11002400;//kernel.BaseActor:2400
    if (typeof  t=="function") {
      return _this.allCrash(t)[0];
      
    }
    return _this.crashTo1(t);
  },
  crashTo1 :function _trc_func_11002496_19(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var t1;
    var t2;
    
    //$LASTPOS=11002523;//kernel.BaseActor:2523
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=11002651;//kernel.BaseActor:2651
    t1 = _this.getCrashRect();
    //$LASTPOS=11002679;//kernel.BaseActor:2679
    t2 = t.getCrashRect();
    return t1&&t2&&Math.abs(t1.x-t2.x)*2<t1.width+t2.width&&Math.abs(t1.y-t2.y)*2<t1.height+t2.height;
  },
  getCrashRect :function _trc_func_11002961_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var actWidth;
    var actHeight;
    
    //$LASTPOS=11002991;//kernel.BaseActor:2991
    actWidth = _this.width*_this.scaleX;actHeight;
    //$LASTPOS=11003034;//kernel.BaseActor:3034
    if (typeof  _this.scaleY==="undefined") {
      //$LASTPOS=11003076;//kernel.BaseActor:3076
      actHeight=_this.height*_this.scaleX;
      
    } else {
      //$LASTPOS=11003122;//kernel.BaseActor:3122
      actHeight=_this.height*_this.scaleY;
      
    }
    return typeof  _this.x=="number"&&typeof  _this.y=="number"&&typeof  _this.width=="number"&&typeof  _this.height=="number"&&{x: _this.x,y: _this.y,width: actWidth,height: actHeight};
  },
  within :function _trc_func_11003326_21(t,distance) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003359;//kernel.BaseActor:3359
    if (! t||t._isDead) {
      return false;
    }
    //$LASTPOS=11003398;//kernel.BaseActor:3398
    if (Math.sqrt(Math.abs(_this.x-t.x)*Math.abs(_this.x-t.x)+Math.abs(_this.y-t.y)*Math.abs(_this.y-t.y))<distance) {
      return true;
      
    }
    return false;
  },
  watchHit :function _trc_func_11003540_22(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003583;//kernel.BaseActor:3583
    Tonyu.globals.$Sprites.watchHit(typeA,typeB,function (a,b) {
      
      //$LASTPOS=11003634;//kernel.BaseActor:3634
      onHit.apply(_this,[a,b]);
    });
  },
  currentThreadGroup :function _trc_func_11003672_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.globals.$currentThreadGroup;
  },
  die :function _trc_func_11003740_24() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11003761;//kernel.BaseActor:3761
    if (_this._th) {
      //$LASTPOS=11003781;//kernel.BaseActor:3781
      _this._th.kill();
      
    }
    //$LASTPOS=11003805;//kernel.BaseActor:3805
    _this.hide();
    //$LASTPOS=11003818;//kernel.BaseActor:3818
    _this.fireEvent("die");
    //$LASTPOS=11003841;//kernel.BaseActor:3841
    _this._isDead=true;
  },
  hide :function _trc_func_11003859_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004020;//kernel.BaseActor:4020
    if (_this.layer&&typeof  _this.layer.remove=="function") {
      //$LASTPOS=11004075;//kernel.BaseActor:4075
      _this.layer.remove(_this);
      
    } else {
      //$LASTPOS=11004116;//kernel.BaseActor:4116
      Tonyu.globals.$Sprites.remove(_this);
      
    }
  },
  show :function _trc_func_11004150_26(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004177;//kernel.BaseActor:4177
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=11004229;//kernel.BaseActor:4229
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=11004267;//kernel.BaseActor:4267
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=11004299;//kernel.BaseActor:4299
    if (x!=null) {
      //$LASTPOS=11004312;//kernel.BaseActor:4312
      _this.x=x;
    }
    //$LASTPOS=11004327;//kernel.BaseActor:4327
    if (y!=null) {
      //$LASTPOS=11004340;//kernel.BaseActor:4340
      _this.y=y;
    }
    //$LASTPOS=11004355;//kernel.BaseActor:4355
    if (p!=null) {
      //$LASTPOS=11004368;//kernel.BaseActor:4368
      _this.p=p;
    }
  },
  detectShape :function _trc_func_11004384_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004413;//kernel.BaseActor:4413
    if (typeof  _this.p!="number") {
      //$LASTPOS=11004448;//kernel.BaseActor:4448
      if (_this.text!=null) {
        return _this;
      }
      //$LASTPOS=11004481;//kernel.BaseActor:4481
      _this.p=0;
      
    }
    //$LASTPOS=11004498;//kernel.BaseActor:4498
    _this.p=Math.floor(_this.p);
    //$LASTPOS=11004520;//kernel.BaseActor:4520
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[_this.p];
    //$LASTPOS=11004558;//kernel.BaseActor:4558
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=11004582;//kernel.BaseActor:4582
    _this.width=_this.pImg.width;
    //$LASTPOS=11004605;//kernel.BaseActor:4605
    _this.height=_this.pImg.height;
  },
  waitFor :function _trc_func_11004629_28(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004648;//kernel.BaseActor:4648
    if (null) {
      //$LASTPOS=11004672;//kernel.BaseActor:4672
      null.waitFor(f);
      
    }
  },
  fiber$waitFor :function _trc_func_11004629_29(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11004648;//kernel.BaseActor:4648
    if (_thread) {
      //$LASTPOS=11004672;//kernel.BaseActor:4672
      _thread.waitFor(f);
      
    }
    
    _thread.retVal=_this;return;
  },
  isDead :function _trc_func_11004720_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._isDead;
  },
  animation :function _trc_func_11004766_31() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11004792;//kernel.BaseActor:4792
    _this.age++;
    //$LASTPOS=11004804;//kernel.BaseActor:4804
    if (_this.animMode&&_this.age%_this.animFps==0) {
      //$LASTPOS=11004845;//kernel.BaseActor:4845
      _this.p=_this.anim[_this.animFrame%_this.anim.length];
      //$LASTPOS=11004885;//kernel.BaseActor:4885
      _this.animFrame++;
      
    }
  },
  draw :function _trc_func_11004909_32(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=11004934;//kernel.BaseActor:4934
    if (_this.x==null||_this.y==null||_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=11004987;//kernel.BaseActor:4987
    _this.detectShape();
    //$LASTPOS=11005007;//kernel.BaseActor:5007
    if (_this.pImg) {
      //$LASTPOS=11005028;//kernel.BaseActor:5028
      ctx.save();
      //$LASTPOS=11005049;//kernel.BaseActor:5049
      ctx.translate(_this.x,_this.y);
      //$LASTPOS=11005193;//kernel.BaseActor:5193
      _this.animation();
      //$LASTPOS=11005215;//kernel.BaseActor:5215
      if (_this.rotation!=0) {
        //$LASTPOS=11005250;//kernel.BaseActor:5250
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=11005318;//kernel.BaseActor:5318
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=11005375;//kernel.BaseActor:5375
      if (typeof  _this.scaleY==="undefined") {
        //$LASTPOS=11005427;//kernel.BaseActor:5427
        ctx.scale(_this.scaleX,_this.scaleX);
        
      } else {
        //$LASTPOS=11005492;//kernel.BaseActor:5492
        ctx.scale(_this.scaleX,_this.scaleY);
        
      }
      //$LASTPOS=11005548;//kernel.BaseActor:5548
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=11005589;//kernel.BaseActor:5589
      ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=11005721;//kernel.BaseActor:5721
      ctx.restore();
      
    } else {
      //$LASTPOS=11005748;//kernel.BaseActor:5748
      if (_this.text!==null&&_this.text!==undefined) {
        //$LASTPOS=11005796;//kernel.BaseActor:5796
        if (! _this.size) {
          //$LASTPOS=11005807;//kernel.BaseActor:5807
          _this.size=15;
        }
        //$LASTPOS=11005825;//kernel.BaseActor:5825
        if (! _this.align) {
          //$LASTPOS=11005837;//kernel.BaseActor:5837
          _this.align="center";
        }
        //$LASTPOS=11005862;//kernel.BaseActor:5862
        if (! _this.fillStyle) {
          //$LASTPOS=11005878;//kernel.BaseActor:5878
          _this.fillStyle="white";
        }
        //$LASTPOS=11005906;//kernel.BaseActor:5906
        ctx.fillStyle=_this.fillStyle;
        //$LASTPOS=11005940;//kernel.BaseActor:5940
        ctx.globalAlpha=_this.alpha/255;
        //$LASTPOS=11005981;//kernel.BaseActor:5981
        rect = _this.drawTextRect(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
        //$LASTPOS=11006052;//kernel.BaseActor:6052
        _this.width=rect.w;
        //$LASTPOS=11006075;//kernel.BaseActor:6075
        _this.height=rect.h;
        
      }
    }
    //$LASTPOS=11006102;//kernel.BaseActor:6102
    if (_this._fukidashi) {
      //$LASTPOS=11006129;//kernel.BaseActor:6129
      if (_this._fukidashi.c>0) {
        //$LASTPOS=11006164;//kernel.BaseActor:6164
        _this._fukidashi.c--;
        //$LASTPOS=11006193;//kernel.BaseActor:6193
        ctx.fillStyle="white";
        //$LASTPOS=11006229;//kernel.BaseActor:6229
        ctx.strokeStyle="black";
        //$LASTPOS=11006267;//kernel.BaseActor:6267
        _this.fukidashi(ctx,_this._fukidashi.text,_this.x,_this.y-_this.height/2-10,_this._fukidashi.size);
        
      }
      
    }
  },
  asyncResult :function _trc_func_11006373_33() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Tonyu.asyncResult();
  },
  screenOut :function _trc_func_11006436_34(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=11006489;//kernel.BaseActor:6489
    if (! a) {
      //$LASTPOS=11006497;//kernel.BaseActor:6497
      a=0;
    }
    //$LASTPOS=11006507;//kernel.BaseActor:6507
    r = 0;
    //$LASTPOS=11006521;//kernel.BaseActor:6521
    viewX = 0;viewY = 0;
    //$LASTPOS=11006547;//kernel.BaseActor:6547
    if (_this.x<viewX+a) {
      //$LASTPOS=11006576;//kernel.BaseActor:6576
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=11006595;//kernel.BaseActor:6595
    if (_this.y<viewY+a) {
      //$LASTPOS=11006624;//kernel.BaseActor:6624
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=11006643;//kernel.BaseActor:6643
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=11006672;//kernel.BaseActor:6672
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=11006707;//kernel.BaseActor:6707
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=11006736;//kernel.BaseActor:6736
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    return r;
  },
  fiber$screenOut :function _trc_func_11006436_35(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var viewX;
    var viewY;
    
    //$LASTPOS=11006489;//kernel.BaseActor:6489
    if (! a) {
      //$LASTPOS=11006497;//kernel.BaseActor:6497
      a=0;
    }
    //$LASTPOS=11006507;//kernel.BaseActor:6507
    r = 0;
    //$LASTPOS=11006521;//kernel.BaseActor:6521
    viewX = 0;viewY = 0;
    //$LASTPOS=11006547;//kernel.BaseActor:6547
    if (_this.x<viewX+a) {
      //$LASTPOS=11006576;//kernel.BaseActor:6576
      r+=viewX+a-_this.x;
    }
    //$LASTPOS=11006595;//kernel.BaseActor:6595
    if (_this.y<viewY+a) {
      //$LASTPOS=11006624;//kernel.BaseActor:6624
      r+=viewY+a-_this.y;
    }
    //$LASTPOS=11006643;//kernel.BaseActor:6643
    if (_this.x>Tonyu.globals.$screenWidth+viewX-a) {
      //$LASTPOS=11006672;//kernel.BaseActor:6672
      r+=_this.x-(Tonyu.globals.$screenWidth+viewX-a);
    }
    //$LASTPOS=11006707;//kernel.BaseActor:6707
    if (_this.y>Tonyu.globals.$screenHeight+viewY-a) {
      //$LASTPOS=11006736;//kernel.BaseActor:6736
      r+=_this.y-(Tonyu.globals.$screenHeight+viewY-a);
    }
    _thread.retVal=r;return;
    
    
    _thread.retVal=_this;return;
  },
  file :function _trc_func_11006785_36(path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var d;
    var files;
    
    //$LASTPOS=11006804;//kernel.BaseActor:6804
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=11006846;//kernel.BaseActor:6846
    files = d.rel("files/");
    return FS.get(files.rel(path),{topDir: d});
  },
  fiber$file :function _trc_func_11006785_37(_thread,path) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var d;
    var files;
    
    //$LASTPOS=11006804;//kernel.BaseActor:6804
    d = Tonyu.currentProject.getDir();
    //$LASTPOS=11006846;//kernel.BaseActor:6846
    files = d.rel("files/");
    _thread.retVal=FS.get(files.rel(path),{topDir: d});return;
    
    
    _thread.retVal=_this;return;
  },
  waitInputDevice :function _trc_func_11006925_38(fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11006953;//kernel.BaseActor:6953
    if (fl!==false) {
      //$LASTPOS=11006980;//kernel.BaseActor:6980
      if (! _this.origTG) {
        
        
      }
      //$LASTPOS=11007132;//kernel.BaseActor:7132
      _this.a=_this.asyncResult();
      //$LASTPOS=11007158;//kernel.BaseActor:7158
      Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
      //$LASTPOS=11007212;//kernel.BaseActor:7212
      _this.waitFor(_this.a);
      
    } else {
      //$LASTPOS=11007247;//kernel.BaseActor:7247
      if (_this.origTG) {
        
        
      }
      
    }
  },
  fiber$waitInputDevice :function _trc_func_11006925_39(_thread,fl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_11006925_40(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=11006953;//kernel.BaseActor:6953
          if (!(fl!==false)) { __pc=3; break; }
          //$LASTPOS=11006980;//kernel.BaseActor:6980
          if (!(! _this.origTG)) { __pc=1; break; }
          {
            //$LASTPOS=11007034;//kernel.BaseActor:7034
            _this.origTG=_thread.group;
            //$LASTPOS=11007073;//kernel.BaseActor:7073
            _thread.setGroup(null);
          }
        case 1:
          
          //$LASTPOS=11007132;//kernel.BaseActor:7132
          _this.a=_this.asyncResult();
          //$LASTPOS=11007158;//kernel.BaseActor:7158
          Tonyu.globals.$InputDevice.addOnetimeListener(_this.a.receiver);
          //$LASTPOS=11007212;//kernel.BaseActor:7212
          _this.fiber$waitFor(_thread, _this.a);
          __pc=2;return;
        case 2:
          
          __pc=5;break;
        case 3:
          //$LASTPOS=11007247;//kernel.BaseActor:7247
          if (!(_this.origTG)) { __pc=4; break; }
          {
            //$LASTPOS=11007300;//kernel.BaseActor:7300
            _thread.setGroup(_this.origTG);
            //$LASTPOS=11007343;//kernel.BaseActor:7343
            _this.origTG=null;
          }
        case 4:
          
        case 5:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  redrawScreen :function _trc_func_11007393_41() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11007416;//kernel.BaseActor:7416
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=11007452;//kernel.BaseActor:7452
    Tonyu.globals.$Screen.draw();
  },
  fiber$redrawScreen :function _trc_func_11007393_42(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11007416;//kernel.BaseActor:7416
    Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
    //$LASTPOS=11007452;//kernel.BaseActor:7452
    Tonyu.globals.$Screen.draw();
    
    _thread.retVal=_this;return;
  },
  color :function _trc_func_11007493_43(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_11007493_44(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_11007555_45(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=11007591;//kernel.BaseActor:7591
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=11007616;//kernel.BaseActor:7616
    if (! size) {
      //$LASTPOS=11007627;//kernel.BaseActor:7627
      size=15;
    }
    //$LASTPOS=11007641;//kernel.BaseActor:7641
    if (! col) {
      //$LASTPOS=11007651;//kernel.BaseActor:7651
      col="cyan";
    }
    //$LASTPOS=11007668;//kernel.BaseActor:7668
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007722;//kernel.BaseActor:7722
    if (tp.length>0) {
      //$LASTPOS=11007750;//kernel.BaseActor:7750
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=11007829;//kernel.BaseActor:7829
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_11007555_46(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=11007591;//kernel.BaseActor:7591
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=11007616;//kernel.BaseActor:7616
    if (! size) {
      //$LASTPOS=11007627;//kernel.BaseActor:7627
      size=15;
    }
    //$LASTPOS=11007641;//kernel.BaseActor:7641
    if (! col) {
      //$LASTPOS=11007651;//kernel.BaseActor:7651
      col="cyan";
    }
    //$LASTPOS=11007668;//kernel.BaseActor:7668
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007722;//kernel.BaseActor:7722
    if (tp.length>0) {
      //$LASTPOS=11007750;//kernel.BaseActor:7750
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=11007829;//kernel.BaseActor:7829
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_11007882_47(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=11007914;//kernel.BaseActor:7914
    if (! col) {
      //$LASTPOS=11007924;//kernel.BaseActor:7924
      col="white";
    }
    //$LASTPOS=11007942;//kernel.BaseActor:7942
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007996;//kernel.BaseActor:7996
    if (tp.length>0) {
      //$LASTPOS=11008024;//kernel.BaseActor:8024
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=11008089;//kernel.BaseActor:8089
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_11007882_48(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=11007914;//kernel.BaseActor:7914
    if (! col) {
      //$LASTPOS=11007924;//kernel.BaseActor:7924
      col="white";
    }
    //$LASTPOS=11007942;//kernel.BaseActor:7942
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=11007996;//kernel.BaseActor:7996
    if (tp.length>0) {
      //$LASTPOS=11008024;//kernel.BaseActor:8024
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col,hidden: false});
      
    } else {
      //$LASTPOS=11008089;//kernel.BaseActor:8089
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  loadPage :function _trc_func_11008127_49(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11008153;//kernel.BaseActor:8153
    _this.all().die();
    //$LASTPOS=11008171;//kernel.BaseActor:8171
    new page(arg);
    //$LASTPOS=11008191;//kernel.BaseActor:8191
    _this.die();
  },
  fiber$loadPage :function _trc_func_11008127_50(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11008153;//kernel.BaseActor:8153
    _this.all().die();
    //$LASTPOS=11008171;//kernel.BaseActor:8171
    new page(arg);
    //$LASTPOS=11008191;//kernel.BaseActor:8191
    _this.die();
    
    _thread.retVal=_this;return;
  },
  setVisible :function _trc_func_11008204_51(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=11008226;//kernel.BaseActor:8226
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_11008204_52(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=11008226;//kernel.BaseActor:8226
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BaseActor,{"fullName":"kernel.BaseActor","namespace":"kernel","shortName":"BaseActor","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"extend":{"nowait":true},"print":{"nowait":true},"setAnimFps":{"nowait":true},"startAnim":{"nowait":true},"stopAnim":{"nowait":true},"update":{"nowait":false},"onUpdate":{"nowait":true},"updateEx":{"nowait":false},"getkey":{"nowait":true},"hitTo":{"nowait":true},"all":{"nowait":true},"allCrash":{"nowait":true},"crashTo":{"nowait":true},"crashTo1":{"nowait":true},"getCrashRect":{"nowait":true},"within":{"nowait":true},"watchHit":{"nowait":true},"currentThreadGroup":{"nowait":true},"die":{"nowait":true},"hide":{"nowait":true},"show":{"nowait":true},"detectShape":{"nowait":true},"waitFor":{"nowait":false},"isDead":{"nowait":true},"animation":{"nowait":true},"draw":{"nowait":true},"asyncResult":{"nowait":true},"screenOut":{"nowait":false},"file":{"nowait":false},"waitInputDevice":{"nowait":false},"redrawScreen":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"loadPage":{"nowait":false},"setVisible":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.EventHandler=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_12000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000020;//kernel.EventHandler:20
    _this.listeners=[];
  },
  fiber$main :function _trc_func_12000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000020;//kernel.EventHandler:20
    _this.listeners=[];
    
    _thread.retVal=_this;return;
  },
  addListener :function _trc_func_12000037_2(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    return {remove: function () {
      
      //$LASTPOS=12000125;//kernel.EventHandler:125
      _this.removeListener(f);
    }};
  },
  fiber$addListener :function _trc_func_12000037_3(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000060;//kernel.EventHandler:60
    _this.listeners.push(f);
    
    _thread.enter(function _trc_func_12000037_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          _thread.exit({remove: function () {
            
            //$LASTPOS=12000125;//kernel.EventHandler:125
            _this.removeListener(f);
          }});return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  removeListener :function _trc_func_12000167_5(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=12000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=12000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
  },
  fiber$removeListener :function _trc_func_12000167_6(_thread,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=12000193;//kernel.EventHandler:193
    i = _this.listeners.indexOf(f);
    //$LASTPOS=12000226;//kernel.EventHandler:226
    _this.listeners.splice(i,1);
    
    _thread.retVal=_this;return;
  },
  fire :function _trc_func_12000253_7(args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var h;
    var _it_129;
    
    //$LASTPOS=12000272;//kernel.EventHandler:272
    if (_this.released) {
      return _this;
    }
    //$LASTPOS=12000299;//kernel.EventHandler:299
    _it_129=Tonyu.iterator(_this.listeners,1);
    while(_it_129.next()) {
      h=_it_129[0];
      
      //$LASTPOS=12000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
  },
  fiber$fire :function _trc_func_12000253_8(_thread,args) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var h;
    var _it_129;
    
    //$LASTPOS=12000272;//kernel.EventHandler:272
    if (_this.released) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=12000299;//kernel.EventHandler:299
    _it_129=Tonyu.iterator(_this.listeners,1);
    while(_it_129.next()) {
      h=_it_129[0];
      
      //$LASTPOS=12000335;//kernel.EventHandler:335
      h.apply(_this,args);
      
    }
    
    _thread.retVal=_this;return;
  },
  release :function _trc_func_12000366_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=12000384;//kernel.EventHandler:384
    _this.released=true;
  },
  fiber$release :function _trc_func_12000366_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=12000384;//kernel.EventHandler:384
    _this.released=true;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.EventHandler,{"fullName":"kernel.EventHandler","namespace":"kernel","shortName":"EventHandler","decls":{"methods":{"main":{"nowait":false},"addListener":{"nowait":false},"removeListener":{"nowait":false},"fire":{"nowait":false},"release":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Keys=Tonyu.klass(Tonyu.classes.kernel.TObject,[],{
  main :function _trc_func_13000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    
    //$LASTPOS=13000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=13000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=13000212;//kernel.Keys:212
    //$LASTPOS=13000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=13000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=13000297;//kernel.Keys:297
    //$LASTPOS=13000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=13000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=13000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=13000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=13000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=13000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=13000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=13000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=13000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=13000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=13000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=13000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=13000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=13000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=13000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=13000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
  },
  fiber$main :function _trc_func_13000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    
    //$LASTPOS=13000084;//kernel.Keys:84
    _this.stats={};
    //$LASTPOS=13000094;//kernel.Keys:94
    _this.codes={left: 37,up: 38,right: 39,down: 40,space: 32,enter: 13,shift: 16,ctrl: 17,alt: 18,mouseleft: 1};
    //$LASTPOS=13000212;//kernel.Keys:212
    //$LASTPOS=13000217;//kernel.Keys:217
    i = 65;
    while(i<65+26) {
      {
        //$LASTPOS=13000248;//kernel.Keys:248
        _this.codes[String.fromCharCode(i).toLowerCase()]=i;
      }
      i++;
    }
    //$LASTPOS=13000297;//kernel.Keys:297
    //$LASTPOS=13000302;//kernel.Keys:302
    i = 48;
    while(i<58) {
      {
        //$LASTPOS=13000330;//kernel.Keys:330
        _this.codes[String.fromCharCode(i)]=i;
      }
      i++;
    }
    //$LASTPOS=13000365;//kernel.Keys:365
    if (! $.data(document,"key_event")) {
      //$LASTPOS=13000406;//kernel.Keys:406
      $.data(document,"key_event",true);
      //$LASTPOS=13000445;//kernel.Keys:445
      $(document).keydown(function (e) {
        
        //$LASTPOS=13000471;//kernel.Keys:471
        Tonyu.globals.$Keys.keydown(e);
      });
      //$LASTPOS=13000495;//kernel.Keys:495
      $(document).keyup(function (e) {
        
        //$LASTPOS=13000519;//kernel.Keys:519
        Tonyu.globals.$Keys.keyup(e);
      });
      //$LASTPOS=13000541;//kernel.Keys:541
      $(document).mousedown(function (e) {
        
        //$LASTPOS=13000578;//kernel.Keys:578
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=13000619;//kernel.Keys:619
          Tonyu.globals.$touches[0].touched=1;
          
        }
        //$LASTPOS=13000660;//kernel.Keys:660
        Tonyu.globals.$Keys.keydown({keyCode: 1});
      });
      //$LASTPOS=13000697;//kernel.Keys:697
      $(document).mouseup(function (e) {
        
        //$LASTPOS=13000732;//kernel.Keys:732
        if (Tonyu.globals.$InputDevice.touchEmu) {
          //$LASTPOS=13000773;//kernel.Keys:773
          Tonyu.globals.$touches[0].touched=0;
          
        }
        //$LASTPOS=13000814;//kernel.Keys:814
        Tonyu.globals.$Keys.keyup({keyCode: 1});
      });
      
    }
    
    _thread.retVal=_this;return;
  },
  getkey :function _trc_func_13000847_2(code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=13000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=13000954;//kernel.Keys:954
    if (! code) {
      return 0;
    }
    //$LASTPOS=13000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      return 0;
    }
    //$LASTPOS=13001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=13001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    return _this.stats[code];
  },
  fiber$getkey :function _trc_func_13000847_3(_thread,code) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13000875;//kernel.Keys:875
    if (typeof  code=="string") {
      //$LASTPOS=13000912;//kernel.Keys:912
      code=_this.codes[code.toLowerCase()];
      
    }
    //$LASTPOS=13000954;//kernel.Keys:954
    if (! code) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=13000979;//kernel.Keys:979
    if (_this.stats[code]==- 1) {
      _thread.retVal=0;return;
      
    }
    //$LASTPOS=13001014;//kernel.Keys:1014
    if (! _this.stats[code]) {
      //$LASTPOS=13001032;//kernel.Keys:1032
      _this.stats[code]=0;
    }
    _thread.retVal=_this.stats[code];return;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_13001073_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var _it_137;
    
    //$LASTPOS=13001097;//kernel.Keys:1097
    _it_137=Tonyu.iterator(_this.stats,1);
    while(_it_137.next()) {
      i=_it_137[0];
      
      //$LASTPOS=13001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=13001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=13001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=13001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
  },
  fiber$update :function _trc_func_13001073_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var _it_137;
    
    //$LASTPOS=13001097;//kernel.Keys:1097
    _it_137=Tonyu.iterator(_this.stats,1);
    while(_it_137.next()) {
      i=_it_137[0];
      
      //$LASTPOS=13001128;//kernel.Keys:1128
      if (_this.stats[i]>0) {
        //$LASTPOS=13001145;//kernel.Keys:1145
        _this.stats[i]++;
        
      }
      //$LASTPOS=13001166;//kernel.Keys:1166
      if (_this.stats[i]==- 1) {
        //$LASTPOS=13001184;//kernel.Keys:1184
        _this.stats[i]=1;
      }
      
    }
    
    _thread.retVal=_this;return;
  },
  keydown :function _trc_func_13001204_6(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var s;
    
    //$LASTPOS=13001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=13001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=13001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=13001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keydown :function _trc_func_13001204_7(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var s;
    
    //$LASTPOS=13001222;//kernel.Keys:1222
    s = _this.stats[e.keyCode];
    //$LASTPOS=13001250;//kernel.Keys:1250
    if (! s) {
      //$LASTPOS=13001268;//kernel.Keys:1268
      _this.stats[e.keyCode]=1;
      
    }
    //$LASTPOS=13001298;//kernel.Keys:1298
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  keyup :function _trc_func_13001332_8(e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=13001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=13001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
  },
  fiber$keyup :function _trc_func_13001332_9(_thread,e) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=13001348;//kernel.Keys:1348
    _this.stats[e.keyCode]=0;
    //$LASTPOS=13001372;//kernel.Keys:1372
    Tonyu.globals.$InputDevice.handleListeners();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Keys,{"fullName":"kernel.Keys","namespace":"kernel","shortName":"Keys","decls":{"methods":{"main":{"nowait":false},"getkey":{"nowait":false},"update":{"nowait":false},"keydown":{"nowait":false},"keyup":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MML=Tonyu.klass(Tonyu.classes.kernel.TObject,[Tonyu.classes.kernel.MathMod],{
  main :function _trc_func_14000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000050;//kernel.MML:50
    _this.mmlBuf=[];
  },
  fiber$main :function _trc_func_14000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000050;//kernel.MML:50
    _this.mmlBuf=[];
    
    _thread.retVal=_this;return;
  },
  play :function _trc_func_14000062_2(mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    //$LASTPOS=14000105;//kernel.MML:105
    if (! _this.isPlaying()) {
      //$LASTPOS=14000134;//kernel.MML:134
      _this.playNext();
      
    }
  },
  fiber$play :function _trc_func_14000062_3(_thread,mmls) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000081;//kernel.MML:81
    _this.mmlBuf.push(mmls);
    
    _thread.enter(function _trc_func_14000062_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=14000105;//kernel.MML:105
          if (!(! _this.isPlaying())) { __pc=2; break; }
          //$LASTPOS=14000134;//kernel.MML:134
          _this.fiber$playNext(_thread);
          __pc=1;return;
        case 1:
          
        case 2:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playNext :function _trc_func_14000157_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    
    //$LASTPOS=14000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=14000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=14000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=14000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=14000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=14000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=14000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=14000415;//kernel.MML:415
      _this.cTimeBase=0;
      return _this;
      
    }
    //$LASTPOS=14000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=14000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=14000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=14000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=14000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
  },
  fiber$playNext :function _trc_func_14000157_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mml;
    
    //$LASTPOS=14000220;//kernel.MML:220
    if (_this.cTimeBase==null) {
      //$LASTPOS=14000241;//kernel.MML:241
      _this.cTimeBase=0;
    }
    //$LASTPOS=14000259;//kernel.MML:259
    if (_this.m) {
      //$LASTPOS=14000277;//kernel.MML:277
      _this.cTimeBase+=_this.m.currentTime;
      
    }
    //$LASTPOS=14000348;//kernel.MML:348
    mml = _this.mmlBuf.shift();
    //$LASTPOS=14000377;//kernel.MML:377
    if (! mml) {
      //$LASTPOS=14000398;//kernel.MML:398
      _this.m=null;
      //$LASTPOS=14000415;//kernel.MML:415
      _this.cTimeBase=0;
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=14000457;//kernel.MML:457
    _this.mwav=Tonyu.globals.$WaveTable.get(0,0).play();
    //$LASTPOS=14000495;//kernel.MML:495
    _this.m=T("mml",{mml: mml},_this.mwav);
    //$LASTPOS=14000525;//kernel.MML:525
    _this.m.on("ended",Tonyu.bindFunc(_this,_this.playNext));
    //$LASTPOS=14000555;//kernel.MML:555
    _this.m.start();
    //$LASTPOS=14000571;//kernel.MML:571
    Tonyu.globals.$MMLS[_this.id()]=_this;
    
    _thread.retVal=_this;return;
  },
  id :function _trc_func_14000593_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=14000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    return _this._id;
  },
  fiber$id :function _trc_func_14000593_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000606;//kernel.MML:606
    if (! _this._id) {
      //$LASTPOS=14000616;//kernel.MML:616
      _this._id=_this.rnd()+"";
    }
    _thread.retVal=_this._id;return;
    
    
    _thread.retVal=_this;return;
  },
  bufferCount :function _trc_func_14000651_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.mmlBuf.length;
  },
  fiber$bufferCount :function _trc_func_14000651_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.mmlBuf.length;return;
    
    
    _thread.retVal=_this;return;
  },
  isPlaying :function _trc_func_14000699_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.m;
  },
  fiber$isPlaying :function _trc_func_14000699_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.m;return;
    
    
    _thread.retVal=_this;return;
  },
  currentTime :function _trc_func_14000733_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000755;//kernel.MML:755
    if (_this.m) {
      return _this.m.currentTime+_this.cTimeBase;
    }
    return - 1;
  },
  fiber$currentTime :function _trc_func_14000733_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000755;//kernel.MML:755
    if (_this.m) {
      _thread.retVal=_this.m.currentTime+_this.cTimeBase;return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_14000814_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=14000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=14000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=14000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=14000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=14000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=14000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=14000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=14000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=14001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
  },
  fiber$stop :function _trc_func_14000814_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=14000829;//kernel.MML:829
    if (_this.m) {
      //$LASTPOS=14000847;//kernel.MML:847
      if (_this.mwav) {
        //$LASTPOS=14000872;//kernel.MML:872
        _this.mwav.pause();
        //$LASTPOS=14000899;//kernel.MML:899
        _this.mwav.stop();
        
      }
      //$LASTPOS=14000932;//kernel.MML:932
      _this.m.pause();
      //$LASTPOS=14000952;//kernel.MML:952
      _this.m.stop();
      //$LASTPOS=14000971;//kernel.MML:971
      _this.m=null;
      //$LASTPOS=14000988;//kernel.MML:988
      _this.mmlBuf=[];
      //$LASTPOS=14001056;//kernel.MML:1056
      delete Tonyu.globals.$MMLS[_this.id()];
      
    }
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.MML,{"fullName":"kernel.MML","namespace":"kernel","shortName":"MML","decls":{"methods":{"main":{"nowait":false},"play":{"nowait":false},"playNext":{"nowait":false},"id":{"nowait":false},"bufferCount":{"nowait":false},"isPlaying":{"nowait":false},"currentTime":{"nowait":false},"stop":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.NoviceActor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_15000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_15000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  sleep :function _trc_func_15000034_2(n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=15000057;//kernel.NoviceActor:57
      n=1;
    }
    //$LASTPOS=15000066;//kernel.NoviceActor:66
    //$LASTPOS=15000070;//kernel.NoviceActor:70
    n;
    while(n>0) {
      //$LASTPOS=15000081;//kernel.NoviceActor:81
      _this.update();
      n--;
    }
  },
  fiber$sleep :function _trc_func_15000034_3(_thread,n) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000050;//kernel.NoviceActor:50
    if (! n) {
      //$LASTPOS=15000057;//kernel.NoviceActor:57
      n=1;
    }
    
    _thread.enter(function _trc_func_15000034_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000066;//kernel.NoviceActor:66
          //$LASTPOS=15000070;//kernel.NoviceActor:70
          n;;
        case 1:
          if (!(n>0)) { __pc=3; break; }
          //$LASTPOS=15000081;//kernel.NoviceActor:81
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
  initSprite :function _trc_func_15000093_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=15000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=15000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
  },
  fiber$initSprite :function _trc_func_15000093_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000113;//kernel.NoviceActor:113
    if (! _this._sprite) {
      //$LASTPOS=15000137;//kernel.NoviceActor:137
      _this._sprite=new Tonyu.classes.kernel.BaseActor({owner: _this});
      //$LASTPOS=15000207;//kernel.NoviceActor:207
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.retVal=_this;return;
  },
  say :function _trc_func_15000235_7(text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=15000268;//kernel.NoviceActor:268
      size=15;
    }
    //$LASTPOS=15000281;//kernel.NoviceActor:281
    _this.initSprite();
    //$LASTPOS=15000299;//kernel.NoviceActor:299
    _this._sprite._fukidashi={text: text,size: size,c: 30};
  },
  fiber$say :function _trc_func_15000235_8(_thread,text,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=15000257;//kernel.NoviceActor:257
    if (! size) {
      //$LASTPOS=15000268;//kernel.NoviceActor:268
      size=15;
    }
    
    _thread.enter(function _trc_func_15000235_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000281;//kernel.NoviceActor:281
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=15000299;//kernel.NoviceActor:299
          _this._sprite._fukidashi={text: text,size: size,c: 30};
          _thread.exit(_this);return;
        }
      }
    });
  },
  sprite :function _trc_func_15000350_10(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000371;//kernel.NoviceActor:371
    _this.go(x,y,p);
  },
  fiber$sprite :function _trc_func_15000350_11(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_15000350_12(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000371;//kernel.NoviceActor:371
          _this.fiber$go(_thread, x, y, p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  show :function _trc_func_15000384_13(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000403;//kernel.NoviceActor:403
    _this.go(x,y,p);
  },
  draw :function _trc_func_15000416_14(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000440;//kernel.NoviceActor:440
    _this._sprite.draw(ctx);
  },
  getCrashRect :function _trc_func_15000461_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._sprite.getCrashRect();
  },
  go :function _trc_func_15000516_16(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000533;//kernel.NoviceActor:533
    _this.initSprite();
    //$LASTPOS=15000551;//kernel.NoviceActor:551
    _this._sprite.x=x;
    //$LASTPOS=15000568;//kernel.NoviceActor:568
    _this._sprite.y=y;
    //$LASTPOS=15000585;//kernel.NoviceActor:585
    if (p!=null) {
      //$LASTPOS=15000598;//kernel.NoviceActor:598
      _this._sprite.p=p;
    }
  },
  fiber$go :function _trc_func_15000516_17(_thread,x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_15000516_18(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000533;//kernel.NoviceActor:533
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=15000551;//kernel.NoviceActor:551
          _this._sprite.x=x;
          //$LASTPOS=15000568;//kernel.NoviceActor:568
          _this._sprite.y=y;
          //$LASTPOS=15000585;//kernel.NoviceActor:585
          if (p!=null) {
            //$LASTPOS=15000598;//kernel.NoviceActor:598
            _this._sprite.p=p;
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  change :function _trc_func_15000629_19(p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=15000646;//kernel.NoviceActor:646
    _this.initSprite();
    //$LASTPOS=15000664;//kernel.NoviceActor:664
    _this._sprite.p=p;
  },
  fiber$change :function _trc_func_15000629_20(_thread,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_15000629_21(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=15000646;//kernel.NoviceActor:646
          _this.fiber$initSprite(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=15000664;//kernel.NoviceActor:664
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
Tonyu.classes.kernel.ParallelMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_16000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_16000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  parallel :function _trc_func_16000037_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var args;
    var i;
    var name;
    var thg;
    var th;
    
    //$LASTPOS=16000064;//kernel.ParallelMod:64
    args = [];
    //$LASTPOS=16000083;//kernel.ParallelMod:83
    //$LASTPOS=16000088;//kernel.ParallelMod:88
    i = 1;
    while(i<arguments.length) {
      {
        //$LASTPOS=16000134;//kernel.ParallelMod:134
        args.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=16000173;//kernel.ParallelMod:173
    name = arguments[0];
    //$LASTPOS=16000212;//kernel.ParallelMod:212
    thg = Tonyu.globals.$currentThreadGroup;
    //$LASTPOS=16000247;//kernel.ParallelMod:247
    th;
    //$LASTPOS=16000261;//kernel.ParallelMod:261
    if (thg) {
      //$LASTPOS=16000270;//kernel.ParallelMod:270
      th=thg.addObj(_this,name,args);
    }
    //$LASTPOS=16000309;//kernel.ParallelMod:309
    _this.on("die",function () {
      
      //$LASTPOS=16000321;//kernel.ParallelMod:321
      th.kill();
    });
    return th;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ParallelMod,{"fullName":"kernel.ParallelMod","namespace":"kernel","shortName":"ParallelMod","decls":{"methods":{"main":{"nowait":false},"parallel":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlayMod=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[],{
  main :function _trc_func_17000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_17000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initMML :function _trc_func_17000020_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=17000045;//kernel.PlayMod:45
    if (_this.mmlInited) {
      return _this;
    }
    //$LASTPOS=17000073;//kernel.PlayMod:73
    _this.mmlInited=true;
    //$LASTPOS=17000094;//kernel.PlayMod:94
    Tonyu.globals.$currentProject.requestPlugin("timbre");
    //$LASTPOS=17000140;//kernel.PlayMod:140
    if (! Tonyu.globals.$MMLS) {
      //$LASTPOS=17000162;//kernel.PlayMod:162
      Tonyu.globals.$MMLS={};
      //$LASTPOS=17000180;//kernel.PlayMod:180
      Tonyu.globals.$WaveTable=new Tonyu.classes.kernel.WaveTable;
      //$LASTPOS=17000214;//kernel.PlayMod:214
      Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseMML));
      
    }
    //$LASTPOS=17000256;//kernel.PlayMod:256
    _this.on("die",function () {
      
      //$LASTPOS=17000272;//kernel.PlayMod:272
      _this.play().stop();
    });
  },
  releaseMML :function _trc_func_17000294_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var k;
    var v;
    var _it_147;
    
    //$LASTPOS=17000322;//kernel.PlayMod:322
    if (Tonyu.globals.$MMLS) {
      //$LASTPOS=17000343;//kernel.PlayMod:343
      _it_147=Tonyu.iterator(Tonyu.globals.$MMLS,2);
      while(_it_147.next()) {
        k=_it_147[0];
        v=_it_147[1];
        
        //$LASTPOS=17000379;//kernel.PlayMod:379
        v.stop();
        
      }
      //$LASTPOS=17000407;//kernel.PlayMod:407
      Tonyu.globals.$MMLS=null;
      
    }
    //$LASTPOS=17000432;//kernel.PlayMod:432
    if (Tonyu.globals.$WaveTable) {
      //$LASTPOS=17000458;//kernel.PlayMod:458
      Tonyu.globals.$WaveTable.stop();
      //$LASTPOS=17000485;//kernel.PlayMod:485
      Tonyu.globals.$WaveTable=null;
      
    }
  },
  play :function _trc_func_17000513_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mmls;
    var i;
    
    //$LASTPOS=17000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=17000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=17000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=17000574;//kernel.PlayMod:574
    if (_this.isDead()||arguments.length==0) {
      return _this._mml;
    }
    //$LASTPOS=17000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=17000647;//kernel.PlayMod:647
    //$LASTPOS=17000652;//kernel.PlayMod:652
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=17000697;//kernel.PlayMod:697
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=17000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    //$LASTPOS=17000756;//kernel.PlayMod:756
    while (_this._mml.bufferCount()>2) {
      //$LASTPOS=17000796;//kernel.PlayMod:796
      _this.update();
      
    }
    return _this._mml;
  },
  fiber$play :function _trc_func_17000513_5(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var mmls;
    var i;
    
    //$LASTPOS=17000528;//kernel.PlayMod:528
    _this.initMML();
    //$LASTPOS=17000544;//kernel.PlayMod:544
    if (! _this._mml) {
      //$LASTPOS=17000555;//kernel.PlayMod:555
      _this._mml=new Tonyu.classes.kernel.MML;
    }
    //$LASTPOS=17000574;//kernel.PlayMod:574
    if (_this.isDead()||_arguments.length==0) {
      _thread.retVal=_this._mml;return;
      
    }
    //$LASTPOS=17000629;//kernel.PlayMod:629
    mmls = [];
    //$LASTPOS=17000647;//kernel.PlayMod:647
    //$LASTPOS=17000652;//kernel.PlayMod:652
    i = 0;
    while(i<_arguments.length) {
      {
        //$LASTPOS=17000697;//kernel.PlayMod:697
        mmls.push(_arguments[i]);
      }
      i++;
    }
    //$LASTPOS=17000734;//kernel.PlayMod:734
    _this._mml.play(mmls);
    
    _thread.enter(function _trc_func_17000513_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=17000756;//kernel.PlayMod:756
        case 1:
          if (!(_this._mml.bufferCount()>2)) { __pc=3; break; }
          //$LASTPOS=17000796;//kernel.PlayMod:796
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
  playSE :function _trc_func_17000835_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var mml;
    var mmls;
    var i;
    
    //$LASTPOS=17000859;//kernel.PlayMod:859
    _this.initMML();
    //$LASTPOS=17000875;//kernel.PlayMod:875
    mml = new Tonyu.classes.kernel.MML;
    //$LASTPOS=17000897;//kernel.PlayMod:897
    mmls = [];
    //$LASTPOS=17000915;//kernel.PlayMod:915
    //$LASTPOS=17000920;//kernel.PlayMod:920
    i = 0;
    while(i<arguments.length) {
      {
        //$LASTPOS=17000965;//kernel.PlayMod:965
        mmls.push(arguments[i]);
      }
      i++;
    }
    //$LASTPOS=17001002;//kernel.PlayMod:1002
    mml.play(mmls);
    return mml;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlayMod,{"fullName":"kernel.PlayMod","namespace":"kernel","shortName":"PlayMod","decls":{"methods":{"main":{"nowait":false},"initMML":{"nowait":true},"releaseMML":{"nowait":true},"play":{"nowait":false},"playSE":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Actor=Tonyu.klass(Tonyu.classes.kernel.BaseActor,[Tonyu.classes.kernel.PlayMod,Tonyu.classes.kernel.ParallelMod],{
  main :function _trc_func_18000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_18000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_18000086_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000105;//kernel.Actor:105
    Tonyu.classes.kernel.BaseActor.apply( _this, [x,y,p]);
    //$LASTPOS=18000124;//kernel.Actor:124
    if (Tonyu.runMode) {
      //$LASTPOS=18000143;//kernel.Actor:143
      _this.initSprite();
    }
  },
  initSprite :function _trc_func_18000161_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=18000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=18000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=18000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=18000304;//kernel.Actor:304
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_18000161_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=18000182;//kernel.Actor:182
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=18000234;//kernel.Actor:234
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=18000272;//kernel.Actor:272
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_18000161_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=18000304;//kernel.Actor:304
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_18000320_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onAppear :function _trc_func_18000320_7(_thread) {
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
  main :function _trc_func_19000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_19000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  getWorld :function _trc_func_19000046_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      return Tonyu.globals.$t2World;
    }
    //$LASTPOS=19000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    return Tonyu.globals.$t2World;
  },
  fiber$getWorld :function _trc_func_19000046_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19000064;//kernel.BodyActor:64
    if (Tonyu.globals.$t2World) {
      _thread.retVal=Tonyu.globals.$t2World;return;
      
    }
    //$LASTPOS=19000099;//kernel.BodyActor:99
    Tonyu.globals.$t2World=new Tonyu.classes.kernel.T2World;
    _thread.retVal=Tonyu.globals.$t2World;return;
    
    
    _thread.retVal=_this;return;
  },
  onAppear :function _trc_func_19000144_4() {
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
    
    //$LASTPOS=19000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=19000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=19000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=19000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=19000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=19000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=19000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=19000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=19000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=19000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=19000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=19000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=19000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=19000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=19000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=19000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=19000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=19000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=19000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=19001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=19001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=19001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=19001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=19001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=19001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=19001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=19001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=19001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=19001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=19001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=19001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=19001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=19001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=19001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
  },
  fiber$onAppear :function _trc_func_19000144_5(_thread) {
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
    
    //$LASTPOS=19000162;//kernel.BodyActor:162
    _this.world=_this.getWorld().world;
    //$LASTPOS=19000190;//kernel.BodyActor:190
    _this.scale=_this.getWorld().scale;
    //$LASTPOS=19000218;//kernel.BodyActor:218
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19000261;//kernel.BodyActor:261
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    //$LASTPOS=19000307;//kernel.BodyActor:307
    b2Body = Box2D.Dynamics.b2Body;
    //$LASTPOS=19000347;//kernel.BodyActor:347
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    //$LASTPOS=19000399;//kernel.BodyActor:399
    b2Fixture = Box2D.Dynamics.b2Fixture;
    //$LASTPOS=19000445;//kernel.BodyActor:445
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    //$LASTPOS=19000509;//kernel.BodyActor:509
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    //$LASTPOS=19000576;//kernel.BodyActor:576
    fixDef = new b2FixtureDef;
    //$LASTPOS=19000611;//kernel.BodyActor:611
    fixDef.density=_this.density||1;
    //$LASTPOS=19000648;//kernel.BodyActor:648
    fixDef.friction=_this.friction||0.5;
    //$LASTPOS=19000687;//kernel.BodyActor:687
    fixDef.restitution=_this.restitution||0.2;
    //$LASTPOS=19000737;//kernel.BodyActor:737
    bodyDef = new b2BodyDef;
    //$LASTPOS=19000770;//kernel.BodyActor:770
    bodyDef.type=_this.isStatic?b2Body.b2_staticBody:b2Body.b2_dynamicBody;
    //$LASTPOS=19000855;//kernel.BodyActor:855
    bodyDef.position.x=_this.x/_this.scale;
    //$LASTPOS=19000890;//kernel.BodyActor:890
    bodyDef.position.y=_this.y/_this.scale;
    //$LASTPOS=19000925;//kernel.BodyActor:925
    _this.shape=_this.shape||(_this.radius?"circle":"box");
    //$LASTPOS=19000973;//kernel.BodyActor:973
    w = _this.width;h = _this.height;
    //$LASTPOS=19000999;//kernel.BodyActor:999
    if (! w) {
      //$LASTPOS=19001017;//kernel.BodyActor:1017
      _this.detectShape();
      //$LASTPOS=19001040;//kernel.BodyActor:1040
      w=_this.width*(_this.scaleX||1);
      //$LASTPOS=19001069;//kernel.BodyActor:1069
      h=_this.height*(_this.scaleY||_this.scaleX||1);
      
    }
    //$LASTPOS=19001109;//kernel.BodyActor:1109
    if (_this.shape=="box") {
      //$LASTPOS=19001137;//kernel.BodyActor:1137
      if (! h) {
        //$LASTPOS=19001145;//kernel.BodyActor:1145
        h=w;
      }
      //$LASTPOS=19001158;//kernel.BodyActor:1158
      fixDef.shape=new b2PolygonShape;
      //$LASTPOS=19001201;//kernel.BodyActor:1201
      fixDef.shape.SetAsOrientedBox(w/2/_this.scale,h/2/_this.scale,new b2Vec2(0,0),0);
      
    } else {
      //$LASTPOS=19001302;//kernel.BodyActor:1302
      _this.radius=_this.radius||w/2||16;
      //$LASTPOS=19001338;//kernel.BodyActor:1338
      fixDef.shape=new b2CircleShape(_this.radius/_this.scale);
      //$LASTPOS=19001412;//kernel.BodyActor:1412
      _this.width=_this.height=_this.radius*2;
      
    }
    //$LASTPOS=19001446;//kernel.BodyActor:1446
    _this.body=_this.world.CreateBody(bodyDef);
    //$LASTPOS=19001482;//kernel.BodyActor:1482
    _this.body.CreateFixture(fixDef);
    //$LASTPOS=19001514;//kernel.BodyActor:1514
    _this.body.SetUserData(_this);
    //$LASTPOS=19001542;//kernel.BodyActor:1542
    _this.body.SetAngle(_this.rad(_this.rotation));
    
    _thread.retVal=_this;return;
  },
  allContact :function _trc_func_19001574_6(klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=19001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=19001615;//kernel.BodyActor:1615
    //$LASTPOS=19001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=19001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=19001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=19001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=19001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=19001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=19001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=19001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=19002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=19002080;//kernel.BodyActor:2080
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
  fiber$allContact :function _trc_func_19001574_7(_thread,klass) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    var c;
    var a;
    var b;
    
    //$LASTPOS=19001599;//kernel.BodyActor:1599
    res = [];
    //$LASTPOS=19001615;//kernel.BodyActor:1615
    //$LASTPOS=19001620;//kernel.BodyActor:1620
    c = _this.world.GetContactList();
    while(c) {
      {
        //$LASTPOS=19001676;//kernel.BodyActor:1676
        if (c.IsTouching()) {
          //$LASTPOS=19001710;//kernel.BodyActor:1710
          a = c.GetFixtureA().GetBody().GetUserData();
          //$LASTPOS=19001769;//kernel.BodyActor:1769
          b = c.GetFixtureB().GetBody().GetUserData();
          //$LASTPOS=19001828;//kernel.BodyActor:1828
          if (a===_this) {
            //$LASTPOS=19001860;//kernel.BodyActor:1860
            if (! klass||b===klass||b instanceof klass) {
              //$LASTPOS=19001929;//kernel.BodyActor:1929
              res.push(b);
              
            }
            
          } else {
            //$LASTPOS=19001979;//kernel.BodyActor:1979
            if (b===_this) {
              //$LASTPOS=19002011;//kernel.BodyActor:2011
              if (! klass||a===klass||a instanceof klass) {
                //$LASTPOS=19002080;//kernel.BodyActor:2080
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
  applyForce :function _trc_func_19002159_8(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=19002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=19002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyForce :function _trc_func_19002159_9(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002190;//kernel.BodyActor:2190
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002233;//kernel.BodyActor:2233
    scale = _this.getWorld().scale;
    //$LASTPOS=19002265;//kernel.BodyActor:2265
    fps = 60;
    //$LASTPOS=19002281;//kernel.BodyActor:2281
    _this.body.ApplyForce(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyImpulse :function _trc_func_19002339_10(fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=19002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=19002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
  },
  fiber$applyImpulse :function _trc_func_19002339_11(_thread,fx,fy,px,py) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2Vec2;
    var scale;
    var fps;
    
    //$LASTPOS=19002372;//kernel.BodyActor:2372
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=19002415;//kernel.BodyActor:2415
    scale = _this.getWorld().scale;
    //$LASTPOS=19002447;//kernel.BodyActor:2447
    fps = 60;
    //$LASTPOS=19002463;//kernel.BodyActor:2463
    _this.body.ApplyImpulse(new b2Vec2(fx,fy),_this.body.GetPosition());
    
    _thread.retVal=_this;return;
  },
  applyTorque :function _trc_func_19002524_12(a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
  },
  fiber$applyTorque :function _trc_func_19002524_13(_thread,a) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=19002546;//kernel.BodyActor:2546
    _this.body.ApplyTorque(a);
    
    _thread.retVal=_this;return;
  },
  moveBy :function _trc_func_19002569_14(dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var pos;
    
    //$LASTPOS=19002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=19002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=19002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=19002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
  },
  fiber$moveBy :function _trc_func_19002569_15(_thread,dx,dy) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var pos;
    
    //$LASTPOS=19002590;//kernel.BodyActor:2590
    pos = _this.body.GetPosition();
    //$LASTPOS=19002622;//kernel.BodyActor:2622
    pos.x+=dx/_this.scale;
    //$LASTPOS=19002643;//kernel.BodyActor:2643
    pos.y+=dy/_this.scale;
    //$LASTPOS=19002664;//kernel.BodyActor:2664
    _this.body.SetPosition(pos);
    
    _thread.retVal=_this;return;
  },
  contactTo :function _trc_func_19002689_16(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.allContact(t)[0];
  },
  fiber$contactTo :function _trc_func_19002689_17(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.allContact(t)[0];return;
    
    
    _thread.retVal=_this;return;
  },
  die :function _trc_func_19002736_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=19002749;//kernel.BodyActor:2749
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    //$LASTPOS=19002766;//kernel.BodyActor:2766
    _this.world.DestroyBody(_this.body);
  },
  updatePos :function _trc_func_19002793_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var scale;
    var pos;
    
    //$LASTPOS=19002812;//kernel.BodyActor:2812
    if (! _this.body) {
      return _this;
    }
    //$LASTPOS=19002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=19002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=19002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=19002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=19002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
  },
  fiber$updatePos :function _trc_func_19002793_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var scale;
    var pos;
    
    //$LASTPOS=19002812;//kernel.BodyActor:2812
    if (! _this.body) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=19002835;//kernel.BodyActor:2835
    scale = _this.getWorld().scale;
    //$LASTPOS=19002867;//kernel.BodyActor:2867
    pos = _this.body.GetPosition();
    //$LASTPOS=19002899;//kernel.BodyActor:2899
    _this.x=pos.x*scale;
    //$LASTPOS=19002918;//kernel.BodyActor:2918
    _this.y=pos.y*scale;
    //$LASTPOS=19002937;//kernel.BodyActor:2937
    _this.rotation=_this.deg(_this.body.GetAngle());
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.BodyActor,{"fullName":"kernel.BodyActor","namespace":"kernel","shortName":"BodyActor","decls":{"methods":{"main":{"nowait":false},"getWorld":{"nowait":false},"onAppear":{"nowait":false},"allContact":{"nowait":false},"applyForce":{"nowait":false},"applyImpulse":{"nowait":false},"applyTorque":{"nowait":false},"moveBy":{"nowait":false},"contactTo":{"nowait":false},"die":{"nowait":true},"updatePos":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Map=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_20000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_20000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_20000041_2(param) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var j;
    var i;
    
    //$LASTPOS=20000060;//kernel.Map:60
    _this.sx=0;
    //$LASTPOS=20000071;//kernel.Map:71
    _this.sy=0;
    //$LASTPOS=20000082;//kernel.Map:82
    Tonyu.classes.kernel.Actor.apply( _this, [param]);
    //$LASTPOS=20000101;//kernel.Map:101
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=20000173;//kernel.Map:173
    _this.mapObj=true;
    //$LASTPOS=20000191;//kernel.Map:191
    _this.mapTable=[];
    //$LASTPOS=20000211;//kernel.Map:211
    _this.mapOnTable=[];
    //$LASTPOS=20000233;//kernel.Map:233
    //$LASTPOS=20000237;//kernel.Map:237
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=20000266;//kernel.Map:266
        _this.rows=[];
        //$LASTPOS=20000286;//kernel.Map:286
        //$LASTPOS=20000290;//kernel.Map:290
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=20000323;//kernel.Map:323
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=20000358;//kernel.Map:358
        _this.mapTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=20000391;//kernel.Map:391
    //$LASTPOS=20000395;//kernel.Map:395
    j = 0;
    while(j<_this.row) {
      {
        //$LASTPOS=20000424;//kernel.Map:424
        _this.rows=[];
        //$LASTPOS=20000444;//kernel.Map:444
        //$LASTPOS=20000448;//kernel.Map:448
        i = 0;
        while(i<_this.col) {
          {
            //$LASTPOS=20000481;//kernel.Map:481
            _this.rows.push(- 1);
          }
          i++;
        }
        //$LASTPOS=20000516;//kernel.Map:516
        _this.mapOnTable.push(_this.rows);
      }
      j++;
    }
    //$LASTPOS=20000616;//kernel.Map:616
    _this.initMap();
  },
  initMap :function _trc_func_20000631_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=20000648;//kernel.Map:648
    if (! _this.mapData) {
      return _this;
    }
    //$LASTPOS=20000674;//kernel.Map:674
    //$LASTPOS=20000678;//kernel.Map:678
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=20000707;//kernel.Map:707
        //$LASTPOS=20000711;//kernel.Map:711
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=20000744;//kernel.Map:744
            _this.set(j,i,_this.mapData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=20000791;//kernel.Map:791
    if (! _this.mapOnData) {
      return _this;
    }
    //$LASTPOS=20000819;//kernel.Map:819
    //$LASTPOS=20000823;//kernel.Map:823
    i = 0;
    while(i<_this.row) {
      {
        //$LASTPOS=20000852;//kernel.Map:852
        //$LASTPOS=20000856;//kernel.Map:856
        j = 0;
        while(j<_this.col) {
          {
            //$LASTPOS=20000889;//kernel.Map:889
            _this.setOn(j,i,_this.mapOnData[i][j]);
          }
          j++;
        }
      }
      i++;
    }
  },
  fiber$initMap :function _trc_func_20000631_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=20000648;//kernel.Map:648
    if (! _this.mapData) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_20000631_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20000674;//kernel.Map:674
          //$LASTPOS=20000678;//kernel.Map:678
          i = 0;;
        case 1:
          if (!(i<_this.row)) { __pc=5; break; }
          //$LASTPOS=20000707;//kernel.Map:707
          //$LASTPOS=20000711;//kernel.Map:711
          j = 0;;
        case 2:
          if (!(j<_this.col)) { __pc=4; break; }
          //$LASTPOS=20000744;//kernel.Map:744
          _this.fiber$set(_thread, j, i, _this.mapData[i][j]);
          __pc=3;return;
        case 3:
          
          j++;
          __pc=2;break;
        case 4:
          
          i++;
          __pc=1;break;
        case 5:
          
          //$LASTPOS=20000791;//kernel.Map:791
          if (!(! _this.mapOnData)) { __pc=6; break; }
          _thread.exit(_this);return;
        case 6:
          
          //$LASTPOS=20000819;//kernel.Map:819
          //$LASTPOS=20000823;//kernel.Map:823
          i = 0;;
        case 7:
          if (!(i<_this.row)) { __pc=11; break; }
          //$LASTPOS=20000852;//kernel.Map:852
          //$LASTPOS=20000856;//kernel.Map:856
          j = 0;;
        case 8:
          if (!(j<_this.col)) { __pc=10; break; }
          //$LASTPOS=20000889;//kernel.Map:889
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
  load :function _trc_func_20000939_6(dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=20001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=20001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=20001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=20001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=20001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=20001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=20001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=20001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=20001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=20001296;//kernel.Map:1296
    _this.initMap();
  },
  fiber$load :function _trc_func_20000939_7(_thread,dataFile) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20000961;//kernel.Map:961
    _this.baseData=_this.file("../maps/").rel(dataFile).obj();
    //$LASTPOS=20001013;//kernel.Map:1013
    if (! _this.baseData) {
      //$LASTPOS=20001027;//kernel.Map:1027
      _this.baseData=_this.file(dataFile).obj();
    }
    //$LASTPOS=20001063;//kernel.Map:1063
    _this.mapTable=_this.baseData[0];
    //$LASTPOS=20001090;//kernel.Map:1090
    _this.mapData=_this.mapTable;
    //$LASTPOS=20001113;//kernel.Map:1113
    _this.row=_this.mapTable.length;
    //$LASTPOS=20001139;//kernel.Map:1139
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=20001168;//kernel.Map:1168
    _this.mapOnTable=_this.baseData[1];
    //$LASTPOS=20001197;//kernel.Map:1197
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=20001224;//kernel.Map:1224
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    
    _thread.enter(function _trc_func_20000939_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20001296;//kernel.Map:1296
          _this.fiber$initMap(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  set :function _trc_func_20001311_9(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=20001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=20001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=20001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=20001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      return _this;
      
    }
    //$LASTPOS=20001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=20001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001933;//kernel.Map:1933
    _this.ctx.restore();
  },
  fiber$set :function _trc_func_20001311_10(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001339;//kernel.Map:1339
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=20001407;//kernel.Map:1407
    _this.mapTable[setRow][setCol]=p;
    //$LASTPOS=20001478;//kernel.Map:1478
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20001512;//kernel.Map:1512
    p=Math.floor(p);
    //$LASTPOS=20001534;//kernel.Map:1534
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20001572;//kernel.Map:1572
    if (! _this.pImg) {
      //$LASTPOS=20001594;//kernel.Map:1594
      _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
      _thread.retVal=_this;return;
      
      
    }
    //$LASTPOS=20001695;//kernel.Map:1695
    _this.ctx.clearRect(setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001772;//kernel.Map:1772
    _this.ctx.save();
    //$LASTPOS=20001789;//kernel.Map:1789
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20001933;//kernel.Map:1933
    _this.ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setOn :function _trc_func_20001952_11(setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      return _this;
    }
    //$LASTPOS=20002050;//kernel.Map:2050
    _this.set(setCol,setRow,_this.mapTable[setRow][setCol]);
    //$LASTPOS=20002100;//kernel.Map:2100
    _this.mapOnTable[setRow][setCol]=p;
    //$LASTPOS=20002135;//kernel.Map:2135
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=20002169;//kernel.Map:2169
    p=Math.floor(p);
    //$LASTPOS=20002191;//kernel.Map:2191
    _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
    //$LASTPOS=20002229;//kernel.Map:2229
    if (! _this.pImg) {
      return _this;
    }
    //$LASTPOS=20002253;//kernel.Map:2253
    _this.ctx.save();
    //$LASTPOS=20002270;//kernel.Map:2270
    _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
    //$LASTPOS=20002414;//kernel.Map:2414
    _this.ctx.restore();
  },
  fiber$setOn :function _trc_func_20001952_12(_thread,setCol,setRow,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20001982;//kernel.Map:1982
    if (setCol>=_this.col||setRow>=_this.row||setCol<0||setRow<0) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_20001952_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002050;//kernel.Map:2050
          _this.fiber$set(_thread, setCol, setRow, _this.mapTable[setRow][setCol]);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=20002100;//kernel.Map:2100
          _this.mapOnTable[setRow][setCol]=p;
          //$LASTPOS=20002135;//kernel.Map:2135
          _this.ctx=_this.buf[0].getContext("2d");
          //$LASTPOS=20002169;//kernel.Map:2169
          p=Math.floor(p);
          //$LASTPOS=20002191;//kernel.Map:2191
          _this.pImg=Tonyu.globals.$Sprites.getImageList()[p];
          //$LASTPOS=20002229;//kernel.Map:2229
          if (!(! _this.pImg)) { __pc=2; break; }
          _thread.exit(_this);return;
        case 2:
          
          //$LASTPOS=20002253;//kernel.Map:2253
          _this.ctx.save();
          //$LASTPOS=20002270;//kernel.Map:2270
          _this.ctx.drawImage(_this.pImg.image,_this.pImg.x,_this.pImg.y,_this.pImg.width,_this.pImg.height,setCol*_this.chipWidth,setRow*_this.chipHeight,_this.chipWidth,_this.chipHeight);
          //$LASTPOS=20002414;//kernel.Map:2414
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  setOnAt :function _trc_func_20002433_14(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002461;//kernel.Map:2461
    _this.setOn(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setOnAt :function _trc_func_20002433_15(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_20002433_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002461;//kernel.Map:2461
          _this.fiber$setOn(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  setAt :function _trc_func_20002530_17(setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002556;//kernel.Map:2556
    _this.set(Math.floor(setX/_this.chipWidth),Math.floor(setY/_this.chipHeight),p);
  },
  fiber$setAt :function _trc_func_20002530_18(_thread,setX,setY,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_20002530_19(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=20002556;//kernel.Map:2556
          _this.fiber$set(_thread, Math.floor(setX/_this.chipWidth), Math.floor(setY/_this.chipHeight), p);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  get :function _trc_func_20002623_20(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$get :function _trc_func_20002623_21(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20002649;//kernel.Map:2649
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getAt :function _trc_func_20002757_22(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getAt :function _trc_func_20002757_23(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.get(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  getOn :function _trc_func_20002853_24(getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      return _this.mapOnTable[getRow][getCol];
    }
    return - 1;
  },
  fiber$getOn :function _trc_func_20002853_25(_thread,getCol,getRow) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20002881;//kernel.Map:2881
    if (getCol<_this.col&&getRow<_this.row&&getCol>=0&&getRow>=0) {
      _thread.retVal=_this.mapOnTable[getRow][getCol];return;
      
    }
    _thread.retVal=- 1;return;
    
    
    _thread.retVal=_this;return;
  },
  getOnAt :function _trc_func_20002991_26(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));
  },
  fiber$getOnAt :function _trc_func_20002991_27(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.getOn(Math.floor(getX/_this.chipWidth),Math.floor(getY/_this.chipHeight));return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_20003091_28(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=20003142;//kernel.Map:3142
    _this.sy=- scrollY;
  },
  fiber$scrollTo :function _trc_func_20003091_29(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=20003124;//kernel.Map:3124
    _this.sx=- scrollX;
    //$LASTPOS=20003142;//kernel.Map:3142
    _this.sy=- scrollY;
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_20003159_30(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=20003177;//kernel.Map:3177
    _this.pImg=_this.buf[0];
    //$LASTPOS=20003195;//kernel.Map:3195
    ctx.save();
    //$LASTPOS=20003212;//kernel.Map:3212
    ctx.drawImage(_this.pImg,0,0,_this.col*_this.chipWidth,_this.row*_this.chipHeight,_this.sx,_this.sy,_this.col*_this.chipWidth,_this.row*_this.chipHeight);
    //$LASTPOS=20003324;//kernel.Map:3324
    ctx.restore();
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Map,{"fullName":"kernel.Map","namespace":"kernel","shortName":"Map","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initMap":{"nowait":false},"load":{"nowait":false},"set":{"nowait":false},"setOn":{"nowait":false},"setOnAt":{"nowait":false},"setAt":{"nowait":false},"get":{"nowait":false},"getAt":{"nowait":false},"getOn":{"nowait":false},"getOnAt":{"nowait":false},"scrollTo":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.MapEditor=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_21000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var j;
    
    //$LASTPOS=21000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=21000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    //$LASTPOS=21000079;//kernel.MapEditor:79
    while (true) {
      //$LASTPOS=21000097;//kernel.MapEditor:97
      if (_this.getkey("y")>0) {
        //$LASTPOS=21000125;//kernel.MapEditor:125
        _this.loadMode=true;
        break;
        
        
      }
      //$LASTPOS=21000168;//kernel.MapEditor:168
      if (_this.getkey("n")>0) {
        //$LASTPOS=21000196;//kernel.MapEditor:196
        _this.loadMode=false;
        break;
        
        
      }
      //$LASTPOS=21000240;//kernel.MapEditor:240
      _this.update();
      
    }
    //$LASTPOS=21000254;//kernel.MapEditor:254
    if (_this.loadMode) {
      //$LASTPOS=21000273;//kernel.MapEditor:273
      _this.fileName=prompt("Input json file (*.json)","map.json");
      //$LASTPOS=21000334;//kernel.MapEditor:334
      if (_this.fileName) {
        //$LASTPOS=21000357;//kernel.MapEditor:357
        _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
        
      }
      //$LASTPOS=21000413;//kernel.MapEditor:413
      if (_this.mapDataFile.obj()) {
        //$LASTPOS=21000445;//kernel.MapEditor:445
        _this.baseData=_this.mapDataFile.obj();
        
      } else {
        //$LASTPOS=21000494;//kernel.MapEditor:494
        _this.mapDataFile=_this.file(_this.fileName);
        //$LASTPOS=21000531;//kernel.MapEditor:531
        if (_this.mapDataFile.obj()) {
          //$LASTPOS=21000567;//kernel.MapEditor:567
          _this.baseData=_this.mapDataFile.obj();
          
        }
        
      }
      //$LASTPOS=21000618;//kernel.MapEditor:618
      if (_this.baseData==undefined) {
        //$LASTPOS=21000652;//kernel.MapEditor:652
        _this.print("Load failed");
        //$LASTPOS=21000683;//kernel.MapEditor:683
        _this.loadMode=false;
        
      } else {
        //$LASTPOS=21000710;//kernel.MapEditor:710
        if (_this.baseData[0]&&_this.baseData[1]) {
          //$LASTPOS=21000751;//kernel.MapEditor:751
          _this.mapData=_this.baseData[0];
          //$LASTPOS=21000781;//kernel.MapEditor:781
          _this.mapOnData=_this.baseData[1];
          
        }
      }
      
    }
    //$LASTPOS=21000815;//kernel.MapEditor:815
    _this.update();
    //$LASTPOS=21001093;//kernel.MapEditor:1093
    if (! _this.loadMode) {
      //$LASTPOS=21001113;//kernel.MapEditor:1113
      _this.row=prompt("input row");
      //$LASTPOS=21001143;//kernel.MapEditor:1143
      _this.update();
      //$LASTPOS=21001158;//kernel.MapEditor:1158
      _this.col=prompt("input col");
      //$LASTPOS=21001188;//kernel.MapEditor:1188
      _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
      //$LASTPOS=21001238;//kernel.MapEditor:1238
      _this.panel.x=_this.panel.width/2+10;
      //$LASTPOS=21001269;//kernel.MapEditor:1269
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=21001298;//kernel.MapEditor:1298
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=21001331;//kernel.MapEditor:1331
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      //$LASTPOS=21001382;//kernel.MapEditor:1382
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
      
    } else {
      //$LASTPOS=21001445;//kernel.MapEditor:1445
      if (! _this.mapOnData) {
        //$LASTPOS=21001470;//kernel.MapEditor:1470
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
        
      } else {
        //$LASTPOS=21001582;//kernel.MapEditor:1582
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
        
      }
      //$LASTPOS=21001695;//kernel.MapEditor:1695
      _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
      //$LASTPOS=21001766;//kernel.MapEditor:1766
      _this.panel.x=_this.panel.width/2;
      //$LASTPOS=21001794;//kernel.MapEditor:1794
      _this.panel.y=_this.panel.height/2;
      //$LASTPOS=21001823;//kernel.MapEditor:1823
      _this.panel.setFillStyle("cyan");
      //$LASTPOS=21001856;//kernel.MapEditor:1856
      _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
      
    }
    //$LASTPOS=21001906;//kernel.MapEditor:1906
    Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
    //$LASTPOS=21001961;//kernel.MapEditor:1961
    _this.counter=0;
    //$LASTPOS=21001973;//kernel.MapEditor:1973
    //$LASTPOS=21001977;//kernel.MapEditor:1977
    i = 0;
    while(i<16) {
      {
        //$LASTPOS=21002001;//kernel.MapEditor:2001
        //$LASTPOS=21002005;//kernel.MapEditor:2005
        j = 0;
        while(j<8) {
          {
            //$LASTPOS=21002032;//kernel.MapEditor:2032
            Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
            //$LASTPOS=21002076;//kernel.MapEditor:2076
            _this.counter++;
          }
          j++;
        }
      }
      i++;
    }
    //$LASTPOS=21002098;//kernel.MapEditor:2098
    _this.mode="get";
    //$LASTPOS=21002111;//kernel.MapEditor:2111
    _this.prevMode="set";
    //$LASTPOS=21002128;//kernel.MapEditor:2128
    _this.mapp=0;
    //$LASTPOS=21002137;//kernel.MapEditor:2137
    _this.mx=0;
    //$LASTPOS=21002144;//kernel.MapEditor:2144
    _this.my=0;
    //$LASTPOS=21002151;//kernel.MapEditor:2151
    _this.chipX=0;
    //$LASTPOS=21002161;//kernel.MapEditor:2161
    _this.chipY=0;
    //$LASTPOS=21002171;//kernel.MapEditor:2171
    _this.x=Tonyu.globals.$screenWidth-16;
    //$LASTPOS=21002191;//kernel.MapEditor:2191
    _this.y=Tonyu.globals.$screenHeight-16;
    //$LASTPOS=21002212;//kernel.MapEditor:2212
    while (true) {
      //$LASTPOS=21002230;//kernel.MapEditor:2230
      _this.p=_this.mapp;
      //$LASTPOS=21002243;//kernel.MapEditor:2243
      if (_this.getkey("e")==1) {
        //$LASTPOS=21002272;//kernel.MapEditor:2272
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=21002306;//kernel.MapEditor:2306
        _this.mode="erase";
        //$LASTPOS=21002329;//kernel.MapEditor:2329
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=21002362;//kernel.MapEditor:2362
      if (_this.getkey("s")==1) {
        //$LASTPOS=21002391;//kernel.MapEditor:2391
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=21002425;//kernel.MapEditor:2425
        if (_this.mode=="set") {
          //$LASTPOS=21002455;//kernel.MapEditor:2455
          _this.mode="setOn";
          
        } else {
          //$LASTPOS=21002498;//kernel.MapEditor:2498
          _this.mode="set";
          
        }
        //$LASTPOS=21002530;//kernel.MapEditor:2530
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=21002563;//kernel.MapEditor:2563
      if (_this.getkey("o")==1) {
        //$LASTPOS=21002592;//kernel.MapEditor:2592
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=21002626;//kernel.MapEditor:2626
        _this.mode="setOn";
        
      }
      //$LASTPOS=21002652;//kernel.MapEditor:2652
      if (_this.getkey("g")==1) {
        //$LASTPOS=21002681;//kernel.MapEditor:2681
        if (_this.mode!="get") {
          //$LASTPOS=21002711;//kernel.MapEditor:2711
          _this.prevMode=_this.mode;
          //$LASTPOS=21002739;//kernel.MapEditor:2739
          Tonyu.globals.$mp.scrollTo(0,0);
          //$LASTPOS=21002771;//kernel.MapEditor:2771
          _this.mode="get";
          //$LASTPOS=21002796;//kernel.MapEditor:2796
          _this.chipX=0;
          //$LASTPOS=21002818;//kernel.MapEditor:2818
          _this.chipY=0;
          
        } else {
          //$LASTPOS=21002856;//kernel.MapEditor:2856
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=21002894;//kernel.MapEditor:2894
          _this.mode=_this.prevMode;
          
        }
        //$LASTPOS=21002929;//kernel.MapEditor:2929
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=21002962;//kernel.MapEditor:2962
      if (_this.getkey("p")==1) {
        //$LASTPOS=21003006;//kernel.MapEditor:3006
        _this.saveFileName=prompt("input json file(*.json)","map.json");
        //$LASTPOS=21003495;//kernel.MapEditor:3495
        _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
        //$LASTPOS=21003553;//kernel.MapEditor:3553
        _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
        //$LASTPOS=21003668;//kernel.MapEditor:3668
        _this.saveDataFile.obj(_this.data);
        //$LASTPOS=21003701;//kernel.MapEditor:3701
        _this.print(_this.saveFileName+" Saved");
        
      }
      //$LASTPOS=21003793;//kernel.MapEditor:3793
      if (_this.getkey("c")==1) {
        //$LASTPOS=21003822;//kernel.MapEditor:3822
        Tonyu.globals.$mp.scrollTo(1000,1000);
        //$LASTPOS=21003856;//kernel.MapEditor:3856
        _this.mode="spuit";
        //$LASTPOS=21003879;//kernel.MapEditor:3879
        _this.print(_this.mode+" mode");
        
      }
      //$LASTPOS=21003912;//kernel.MapEditor:3912
      if (_this.mode!="get") {
        //$LASTPOS=21003938;//kernel.MapEditor:3938
        if (_this.getkey("left")>0) {
          //$LASTPOS=21003959;//kernel.MapEditor:3959
          _this.mx=_this.mx+8;
        }
        //$LASTPOS=21003977;//kernel.MapEditor:3977
        if (_this.getkey("right")>0) {
          //$LASTPOS=21003999;//kernel.MapEditor:3999
          _this.mx=_this.mx-8;
        }
        //$LASTPOS=21004017;//kernel.MapEditor:4017
        if (_this.getkey("up")>0) {
          //$LASTPOS=21004036;//kernel.MapEditor:4036
          _this.my=_this.my+8;
        }
        //$LASTPOS=21004054;//kernel.MapEditor:4054
        if (_this.getkey("down")>0) {
          //$LASTPOS=21004075;//kernel.MapEditor:4075
          _this.my=_this.my-8;
        }
        //$LASTPOS=21004093;//kernel.MapEditor:4093
        Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
        
      } else {
        //$LASTPOS=21004136;//kernel.MapEditor:4136
        if (_this.getkey("left")>0) {
          //$LASTPOS=21004157;//kernel.MapEditor:4157
          _this.chipX=_this.chipX+8;
        }
        //$LASTPOS=21004181;//kernel.MapEditor:4181
        if (_this.getkey("right")>0) {
          //$LASTPOS=21004203;//kernel.MapEditor:4203
          _this.chipX=_this.chipX-8;
        }
        //$LASTPOS=21004227;//kernel.MapEditor:4227
        if (_this.getkey("up")>0) {
          //$LASTPOS=21004246;//kernel.MapEditor:4246
          _this.chipY=_this.chipY+8;
        }
        //$LASTPOS=21004270;//kernel.MapEditor:4270
        if (_this.getkey("down")>0) {
          //$LASTPOS=21004291;//kernel.MapEditor:4291
          _this.chipY=_this.chipY-8;
        }
        //$LASTPOS=21004315;//kernel.MapEditor:4315
        Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
        
      }
      //$LASTPOS=21004354;//kernel.MapEditor:4354
      _this.panel.x=_this.panel.width/2-_this.mx;
      //$LASTPOS=21004385;//kernel.MapEditor:4385
      _this.panel.y=_this.panel.height/2-_this.my;
      //$LASTPOS=21004417;//kernel.MapEditor:4417
      if (_this.mode=="set"&&_this.getkey(1)>0) {
        //$LASTPOS=21004458;//kernel.MapEditor:4458
        Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
        //$LASTPOS=21004507;//kernel.MapEditor:4507
        Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
        
      } else {
        //$LASTPOS=21004558;//kernel.MapEditor:4558
        if (_this.mode=="erase"&&_this.getkey(1)>0) {
          //$LASTPOS=21004601;//kernel.MapEditor:4601
          Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          
        } else {
          //$LASTPOS=21004650;//kernel.MapEditor:4650
          if (_this.mode=="get"&&_this.getkey(1)>0) {
            //$LASTPOS=21004691;//kernel.MapEditor:4691
            _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
            //$LASTPOS=21004745;//kernel.MapEditor:4745
            _this.mode=_this.prevMode;
            //$LASTPOS=21004769;//kernel.MapEditor:4769
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=21004803;//kernel.MapEditor:4803
            _this.print(_this.mode+" mode");
            //$LASTPOS=21004833;//kernel.MapEditor:4833
            _this.updateEx(10);
            
          } else {
            //$LASTPOS=21004858;//kernel.MapEditor:4858
            if (_this.mode=="setOn"&&_this.getkey(1)>0) {
              //$LASTPOS=21004901;//kernel.MapEditor:4901
              Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
              
            } else {
              //$LASTPOS=21004954;//kernel.MapEditor:4954
              if (_this.mode=="spuit"&&_this.getkey(1)>0) {
                //$LASTPOS=21004997;//kernel.MapEditor:4997
                _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
                //$LASTPOS=21005046;//kernel.MapEditor:5046
                _this.mode="set";
                //$LASTPOS=21005067;//kernel.MapEditor:5067
                _this.print(_this.mode+" mode");
                //$LASTPOS=21005097;//kernel.MapEditor:5097
                _this.updateEx(10);
                
              }
            }
          }
        }
      }
      //$LASTPOS=21005123;//kernel.MapEditor:5123
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_21000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var j;
    
    //$LASTPOS=21000032;//kernel.MapEditor:32
    _this.loadMode=false;
    //$LASTPOS=21000049;//kernel.MapEditor:49
    _this.print("Load Data?: Y or N");
    
    _thread.enter(function _trc_func_21000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=21000079;//kernel.MapEditor:79
        case 1:
          //$LASTPOS=21000097;//kernel.MapEditor:97
          if (!(_this.getkey("y")>0)) { __pc=2; break; }
          //$LASTPOS=21000125;//kernel.MapEditor:125
          _this.loadMode=true;
          __pc=5; break;
          
        case 2:
          
          //$LASTPOS=21000168;//kernel.MapEditor:168
          if (!(_this.getkey("n")>0)) { __pc=3; break; }
          //$LASTPOS=21000196;//kernel.MapEditor:196
          _this.loadMode=false;
          __pc=5; break;
          
        case 3:
          
          //$LASTPOS=21000240;//kernel.MapEditor:240
          _this.fiber$update(_thread);
          __pc=4;return;
        case 4:
          
          __pc=1;break;
        case 5:
          
          //$LASTPOS=21000254;//kernel.MapEditor:254
          if (!(_this.loadMode)) { __pc=9; break; }
          //$LASTPOS=21000273;//kernel.MapEditor:273
          _this.fileName=prompt("Input json file (*.json)","map.json");
          //$LASTPOS=21000334;//kernel.MapEditor:334
          if (_this.fileName) {
            //$LASTPOS=21000357;//kernel.MapEditor:357
            _this.mapDataFile=_this.file("../maps/").rel(_this.fileName);
            
          }
          //$LASTPOS=21000413;//kernel.MapEditor:413
          if (!(_this.mapDataFile.obj())) { __pc=6; break; }
          {
            //$LASTPOS=21000445;//kernel.MapEditor:445
            _this.baseData=_this.mapDataFile.obj();
          }
          __pc=8;break;
        case 6:
          //$LASTPOS=21000494;//kernel.MapEditor:494
          _this.fiber$file(_thread, _this.fileName);
          __pc=7;return;
        case 7:
          _this.mapDataFile=_thread.retVal;
          
          //$LASTPOS=21000531;//kernel.MapEditor:531
          if (_this.mapDataFile.obj()) {
            //$LASTPOS=21000567;//kernel.MapEditor:567
            _this.baseData=_this.mapDataFile.obj();
            
          }
        case 8:
          
          //$LASTPOS=21000618;//kernel.MapEditor:618
          if (_this.baseData==undefined) {
            //$LASTPOS=21000652;//kernel.MapEditor:652
            _this.print("Load failed");
            //$LASTPOS=21000683;//kernel.MapEditor:683
            _this.loadMode=false;
            
          } else {
            //$LASTPOS=21000710;//kernel.MapEditor:710
            if (_this.baseData[0]&&_this.baseData[1]) {
              //$LASTPOS=21000751;//kernel.MapEditor:751
              _this.mapData=_this.baseData[0];
              //$LASTPOS=21000781;//kernel.MapEditor:781
              _this.mapOnData=_this.baseData[1];
              
            }
          }
        case 9:
          
          //$LASTPOS=21000815;//kernel.MapEditor:815
          _this.fiber$update(_thread);
          __pc=10;return;
        case 10:
          
          //$LASTPOS=21001093;//kernel.MapEditor:1093
          if (!(! _this.loadMode)) { __pc=12; break; }
          //$LASTPOS=21001113;//kernel.MapEditor:1113
          _this.row=prompt("input row");
          //$LASTPOS=21001143;//kernel.MapEditor:1143
          _this.fiber$update(_thread);
          __pc=11;return;
        case 11:
          
          //$LASTPOS=21001158;//kernel.MapEditor:1158
          _this.col=prompt("input col");
          //$LASTPOS=21001188;//kernel.MapEditor:1188
          _this.panel=new Tonyu.classes.kernel.Panel({width: _this.col*32,height: _this.row*32});
          //$LASTPOS=21001238;//kernel.MapEditor:1238
          _this.panel.x=_this.panel.width/2+10;
          //$LASTPOS=21001269;//kernel.MapEditor:1269
          _this.panel.y=_this.panel.height/2;
          //$LASTPOS=21001298;//kernel.MapEditor:1298
          _this.panel.setFillStyle("cyan");
          //$LASTPOS=21001331;//kernel.MapEditor:1331
          _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          //$LASTPOS=21001382;//kernel.MapEditor:1382
          Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.row,col: _this.col,chipWidth: 32,chipHeight: 32});
          __pc=13;break;
        case 12:
          {
            //$LASTPOS=21001445;//kernel.MapEditor:1445
            if (! _this.mapOnData) {
              //$LASTPOS=21001470;//kernel.MapEditor:1470
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData});
              
            } else {
              //$LASTPOS=21001582;//kernel.MapEditor:1582
              Tonyu.globals.$map=new Tonyu.classes.kernel.Map({row: _this.mapData.length,col: _this.mapData[0].length,chipWidth: 32,chipHeight: 32,mapData: _this.mapData,mapOnData: _this.mapOnData});
              
            }
            //$LASTPOS=21001695;//kernel.MapEditor:1695
            _this.panel=new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$map.col*32,height: Tonyu.globals.$map.row*32,zOrder: 100});
            //$LASTPOS=21001766;//kernel.MapEditor:1766
            _this.panel.x=_this.panel.width/2;
            //$LASTPOS=21001794;//kernel.MapEditor:1794
            _this.panel.y=_this.panel.height/2;
            //$LASTPOS=21001823;//kernel.MapEditor:1823
            _this.panel.setFillStyle("cyan");
            //$LASTPOS=21001856;//kernel.MapEditor:1856
            _this.panel.fillRect(0,0,_this.panel.width,_this.panel.height);
          }
        case 13:
          
          //$LASTPOS=21001906;//kernel.MapEditor:1906
          Tonyu.globals.$mp=new Tonyu.classes.kernel.Map({row: 16,col: 8,chipWidth: 32,chipHeight: 32});
          //$LASTPOS=21001961;//kernel.MapEditor:1961
          _this.counter=0;
          //$LASTPOS=21001973;//kernel.MapEditor:1973
          //$LASTPOS=21001977;//kernel.MapEditor:1977
          i = 0;
          while(i<16) {
            {
              //$LASTPOS=21002001;//kernel.MapEditor:2001
              //$LASTPOS=21002005;//kernel.MapEditor:2005
              j = 0;
              while(j<8) {
                {
                  //$LASTPOS=21002032;//kernel.MapEditor:2032
                  Tonyu.globals.$mp.set(j,i,Tonyu.globals.$pat_mapchip+_this.counter);
                  //$LASTPOS=21002076;//kernel.MapEditor:2076
                  _this.counter++;
                }
                j++;
              }
            }
            i++;
          }
          //$LASTPOS=21002098;//kernel.MapEditor:2098
          _this.mode="get";
          //$LASTPOS=21002111;//kernel.MapEditor:2111
          _this.prevMode="set";
          //$LASTPOS=21002128;//kernel.MapEditor:2128
          _this.mapp=0;
          //$LASTPOS=21002137;//kernel.MapEditor:2137
          _this.mx=0;
          //$LASTPOS=21002144;//kernel.MapEditor:2144
          _this.my=0;
          //$LASTPOS=21002151;//kernel.MapEditor:2151
          _this.chipX=0;
          //$LASTPOS=21002161;//kernel.MapEditor:2161
          _this.chipY=0;
          //$LASTPOS=21002171;//kernel.MapEditor:2171
          _this.x=Tonyu.globals.$screenWidth-16;
          //$LASTPOS=21002191;//kernel.MapEditor:2191
          _this.y=Tonyu.globals.$screenHeight-16;
          //$LASTPOS=21002212;//kernel.MapEditor:2212
        case 14:
          //$LASTPOS=21002230;//kernel.MapEditor:2230
          _this.p=_this.mapp;
          //$LASTPOS=21002243;//kernel.MapEditor:2243
          if (_this.getkey("e")==1) {
            //$LASTPOS=21002272;//kernel.MapEditor:2272
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=21002306;//kernel.MapEditor:2306
            _this.mode="erase";
            //$LASTPOS=21002329;//kernel.MapEditor:2329
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=21002362;//kernel.MapEditor:2362
          if (_this.getkey("s")==1) {
            //$LASTPOS=21002391;//kernel.MapEditor:2391
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=21002425;//kernel.MapEditor:2425
            if (_this.mode=="set") {
              //$LASTPOS=21002455;//kernel.MapEditor:2455
              _this.mode="setOn";
              
            } else {
              //$LASTPOS=21002498;//kernel.MapEditor:2498
              _this.mode="set";
              
            }
            //$LASTPOS=21002530;//kernel.MapEditor:2530
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=21002563;//kernel.MapEditor:2563
          if (_this.getkey("o")==1) {
            //$LASTPOS=21002592;//kernel.MapEditor:2592
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=21002626;//kernel.MapEditor:2626
            _this.mode="setOn";
            
          }
          //$LASTPOS=21002652;//kernel.MapEditor:2652
          if (_this.getkey("g")==1) {
            //$LASTPOS=21002681;//kernel.MapEditor:2681
            if (_this.mode!="get") {
              //$LASTPOS=21002711;//kernel.MapEditor:2711
              _this.prevMode=_this.mode;
              //$LASTPOS=21002739;//kernel.MapEditor:2739
              Tonyu.globals.$mp.scrollTo(0,0);
              //$LASTPOS=21002771;//kernel.MapEditor:2771
              _this.mode="get";
              //$LASTPOS=21002796;//kernel.MapEditor:2796
              _this.chipX=0;
              //$LASTPOS=21002818;//kernel.MapEditor:2818
              _this.chipY=0;
              
            } else {
              //$LASTPOS=21002856;//kernel.MapEditor:2856
              Tonyu.globals.$mp.scrollTo(1000,1000);
              //$LASTPOS=21002894;//kernel.MapEditor:2894
              _this.mode=_this.prevMode;
              
            }
            //$LASTPOS=21002929;//kernel.MapEditor:2929
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=21002962;//kernel.MapEditor:2962
          if (_this.getkey("p")==1) {
            //$LASTPOS=21003006;//kernel.MapEditor:3006
            _this.saveFileName=prompt("input json file(*.json)","map.json");
            //$LASTPOS=21003495;//kernel.MapEditor:3495
            _this.saveDataFile=_this.file("../maps/").rel(_this.saveFileName);
            //$LASTPOS=21003553;//kernel.MapEditor:3553
            _this.data=[Tonyu.globals.$map.mapTable,Tonyu.globals.$map.mapOnTable];
            //$LASTPOS=21003668;//kernel.MapEditor:3668
            _this.saveDataFile.obj(_this.data);
            //$LASTPOS=21003701;//kernel.MapEditor:3701
            _this.print(_this.saveFileName+" Saved");
            
          }
          //$LASTPOS=21003793;//kernel.MapEditor:3793
          if (_this.getkey("c")==1) {
            //$LASTPOS=21003822;//kernel.MapEditor:3822
            Tonyu.globals.$mp.scrollTo(1000,1000);
            //$LASTPOS=21003856;//kernel.MapEditor:3856
            _this.mode="spuit";
            //$LASTPOS=21003879;//kernel.MapEditor:3879
            _this.print(_this.mode+" mode");
            
          }
          //$LASTPOS=21003912;//kernel.MapEditor:3912
          if (_this.mode!="get") {
            //$LASTPOS=21003938;//kernel.MapEditor:3938
            if (_this.getkey("left")>0) {
              //$LASTPOS=21003959;//kernel.MapEditor:3959
              _this.mx=_this.mx+8;
            }
            //$LASTPOS=21003977;//kernel.MapEditor:3977
            if (_this.getkey("right")>0) {
              //$LASTPOS=21003999;//kernel.MapEditor:3999
              _this.mx=_this.mx-8;
            }
            //$LASTPOS=21004017;//kernel.MapEditor:4017
            if (_this.getkey("up")>0) {
              //$LASTPOS=21004036;//kernel.MapEditor:4036
              _this.my=_this.my+8;
            }
            //$LASTPOS=21004054;//kernel.MapEditor:4054
            if (_this.getkey("down")>0) {
              //$LASTPOS=21004075;//kernel.MapEditor:4075
              _this.my=_this.my-8;
            }
            //$LASTPOS=21004093;//kernel.MapEditor:4093
            Tonyu.globals.$map.scrollTo(_this.mx,_this.my);
            
          } else {
            //$LASTPOS=21004136;//kernel.MapEditor:4136
            if (_this.getkey("left")>0) {
              //$LASTPOS=21004157;//kernel.MapEditor:4157
              _this.chipX=_this.chipX+8;
            }
            //$LASTPOS=21004181;//kernel.MapEditor:4181
            if (_this.getkey("right")>0) {
              //$LASTPOS=21004203;//kernel.MapEditor:4203
              _this.chipX=_this.chipX-8;
            }
            //$LASTPOS=21004227;//kernel.MapEditor:4227
            if (_this.getkey("up")>0) {
              //$LASTPOS=21004246;//kernel.MapEditor:4246
              _this.chipY=_this.chipY+8;
            }
            //$LASTPOS=21004270;//kernel.MapEditor:4270
            if (_this.getkey("down")>0) {
              //$LASTPOS=21004291;//kernel.MapEditor:4291
              _this.chipY=_this.chipY-8;
            }
            //$LASTPOS=21004315;//kernel.MapEditor:4315
            Tonyu.globals.$mp.scrollTo(_this.chipX,_this.chipY);
            
          }
          //$LASTPOS=21004354;//kernel.MapEditor:4354
          _this.panel.x=_this.panel.width/2-_this.mx;
          //$LASTPOS=21004385;//kernel.MapEditor:4385
          _this.panel.y=_this.panel.height/2-_this.my;
          //$LASTPOS=21004417;//kernel.MapEditor:4417
          if (!(_this.mode=="set"&&_this.getkey(1)>0)) { __pc=15; break; }
          {
            //$LASTPOS=21004458;//kernel.MapEditor:4458
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
            //$LASTPOS=21004507;//kernel.MapEditor:4507
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=25;break;
        case 15:
          //$LASTPOS=21004558;//kernel.MapEditor:4558
          if (!(_this.mode=="erase"&&_this.getkey(1)>0)) { __pc=16; break; }
          {
            //$LASTPOS=21004601;//kernel.MapEditor:4601
            Tonyu.globals.$map.setAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,- 1);
          }
          __pc=24;break;
        case 16:
          //$LASTPOS=21004650;//kernel.MapEditor:4650
          if (!(_this.mode=="get"&&_this.getkey(1)>0)) { __pc=18; break; }
          //$LASTPOS=21004691;//kernel.MapEditor:4691
          _this.mapp=Tonyu.globals.$mp.getAt(Tonyu.globals.$mouseX+_this.chipX,Tonyu.globals.$mouseY+_this.chipY);
          //$LASTPOS=21004745;//kernel.MapEditor:4745
          _this.mode=_this.prevMode;
          //$LASTPOS=21004769;//kernel.MapEditor:4769
          Tonyu.globals.$mp.scrollTo(1000,1000);
          //$LASTPOS=21004803;//kernel.MapEditor:4803
          _this.print(_this.mode+" mode");
          //$LASTPOS=21004833;//kernel.MapEditor:4833
          _this.fiber$updateEx(_thread, 10);
          __pc=17;return;
        case 17:
          
          __pc=23;break;
        case 18:
          //$LASTPOS=21004858;//kernel.MapEditor:4858
          if (!(_this.mode=="setOn"&&_this.getkey(1)>0)) { __pc=19; break; }
          {
            //$LASTPOS=21004901;//kernel.MapEditor:4901
            Tonyu.globals.$map.setOnAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my,_this.mapp);
          }
          __pc=22;break;
        case 19:
          //$LASTPOS=21004954;//kernel.MapEditor:4954
          if (!(_this.mode=="spuit"&&_this.getkey(1)>0)) { __pc=21; break; }
          //$LASTPOS=21004997;//kernel.MapEditor:4997
          _this.mapp=Tonyu.globals.$map.getAt(Tonyu.globals.$mouseX+_this.mx,Tonyu.globals.$mouseY+_this.my);
          //$LASTPOS=21005046;//kernel.MapEditor:5046
          _this.mode="set";
          //$LASTPOS=21005067;//kernel.MapEditor:5067
          _this.print(_this.mode+" mode");
          //$LASTPOS=21005097;//kernel.MapEditor:5097
          _this.fiber$updateEx(_thread, 10);
          __pc=20;return;
        case 20:
          
        case 21:
          
        case 22:
          
        case 23:
          
        case 24:
          
        case 25:
          
          //$LASTPOS=21005123;//kernel.MapEditor:5123
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
  main :function _trc_func_22000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    //$LASTPOS=22003465;//kernel.Pad:3465
    while (true) {
      //$LASTPOS=22003484;//kernel.Pad:3484
      _this.padUpdate();
      //$LASTPOS=22003502;//kernel.Pad:3502
      _this.update();
      
    }
  },
  fiber$main :function _trc_func_22000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=22001202;//kernel.Pad:1202
    _this.APAD_DIAG_SIZE=96;
    
    _thread.enter(function _trc_func_22000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=22003465;//kernel.Pad:3465
        case 1:
          //$LASTPOS=22003484;//kernel.Pad:3484
          _this.fiber$padUpdate(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=22003502;//kernel.Pad:3502
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
  initialize :function _trc_func_22000016_3(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22000033;//kernel.Pad:33
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=22000050;//kernel.Pad:50
    _this.padImageP=Tonyu.globals.$pat_inputPad;
    //$LASTPOS=22000082;//kernel.Pad:82
    _this.jujiKey=new Tonyu.classes.kernel.Actor({x: 96+1,y: Tonyu.globals.$screenHeight-96-1,p: _this.padImageP+0,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000183;//kernel.Pad:183
    _this.no1Key=new Tonyu.classes.kernel.Actor({x: Tonyu.globals.$screenWidth-96,y: Tonyu.globals.$screenHeight-96,p: _this.padImageP+1,zOrder: - 9,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000292;//kernel.Pad:292
    _this.jujiKey.show();
    //$LASTPOS=22000313;//kernel.Pad:313
    _this.no1Key.show();
    //$LASTPOS=22000339;//kernel.Pad:339
    _this.jujiKeyPushU=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y-60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000446;//kernel.Pad:446
    _this.jujiKeyPushL=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x-60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000553;//kernel.Pad:553
    _this.jujiKeyPushR=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x+60,y: _this.jujiKey.y,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000660;//kernel.Pad:660
    _this.jujiKeyPushD=new Tonyu.classes.kernel.Actor({x: _this.jujiKey.x,y: _this.jujiKey.y+60,p: _this.padImageP+2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000767;//kernel.Pad:767
    _this.jujiKeyPush1=new Tonyu.classes.kernel.Actor({x: _this.no1Key.x,y: _this.no1Key.y,p: _this.padImageP+2,scaleX: 2,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=22000879;//kernel.Pad:879
    _this.jujiKeyPushU.hide();
    //$LASTPOS=22000905;//kernel.Pad:905
    _this.jujiKeyPushL.hide();
    //$LASTPOS=22000931;//kernel.Pad:931
    _this.jujiKeyPushR.hide();
    //$LASTPOS=22000957;//kernel.Pad:957
    _this.jujiKeyPushD.hide();
    //$LASTPOS=22000983;//kernel.Pad:983
    _this.jujiKeyPush1.hide();
  },
  die :function _trc_func_22001008_4() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=22001021;//kernel.Pad:1021
    _this.jujiKey.die();
    //$LASTPOS=22001041;//kernel.Pad:1041
    _this.no1Key.die();
    //$LASTPOS=22001060;//kernel.Pad:1060
    _this.jujiKeyPushU.die();
    //$LASTPOS=22001085;//kernel.Pad:1085
    _this.jujiKeyPushL.die();
    //$LASTPOS=22001110;//kernel.Pad:1110
    _this.jujiKeyPushR.die();
    //$LASTPOS=22001135;//kernel.Pad:1135
    _this.jujiKeyPushD.die();
    //$LASTPOS=22001160;//kernel.Pad:1160
    _this.jujiKeyPush1.die();
    //$LASTPOS=22001185;//kernel.Pad:1185
    Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
  },
  padUpdate :function _trc_func_22001224_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var i;
    var t;
    
    //$LASTPOS=22001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=22001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=22001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=22001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=22001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=22001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=22001383;//kernel.Pad:1383
    //$LASTPOS=22001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=22001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=22001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=22001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=22001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=22001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=22001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=22001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=22001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=22001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=22001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=22001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=22002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=22002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=22002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=22002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=22002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=22002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=22002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=22002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=22002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=22002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=22002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=22002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=22002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=22002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=22002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=22002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=22002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=22002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=22002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=22002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=22002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=22002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=22002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=22002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=22002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=22002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=22002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=22002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=22002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=22002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=22002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=22002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=22002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
  },
  fiber$padUpdate :function _trc_func_22001224_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var i;
    var t;
    
    //$LASTPOS=22001258;//kernel.Pad:1258
    _this.keyPushL=0;
    //$LASTPOS=22001277;//kernel.Pad:1277
    _this.keyPushR=0;
    //$LASTPOS=22001296;//kernel.Pad:1296
    _this.keyPushU=0;
    //$LASTPOS=22001315;//kernel.Pad:1315
    _this.keyPushD=0;
    //$LASTPOS=22001334;//kernel.Pad:1334
    _this.keyPush1=0;
    //$LASTPOS=22001359;//kernel.Pad:1359
    _this.padKeyNotapCnt++;
    //$LASTPOS=22001383;//kernel.Pad:1383
    //$LASTPOS=22001388;//kernel.Pad:1388
    i = 0;
    while(i<5) {
      {
        //$LASTPOS=22001436;//kernel.Pad:1436
        t = Tonyu.globals.$touches[i];
        //$LASTPOS=22001466;//kernel.Pad:1466
        if (t.touched) {
          //$LASTPOS=22001496;//kernel.Pad:1496
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32-64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=22001593;//kernel.Pad:1593
            _this.keyPushU=1;
          }
          //$LASTPOS=22001620;//kernel.Pad:1620
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-_this.APAD_DIAG_SIZE/2,_this.jujiKey.y-32+64,64+_this.APAD_DIAG_SIZE,64)) {
            //$LASTPOS=22001717;//kernel.Pad:1717
            _this.keyPushD=1;
          }
          //$LASTPOS=22001744;//kernel.Pad:1744
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32-64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=22001841;//kernel.Pad:1841
            _this.keyPushL=1;
          }
          //$LASTPOS=22001868;//kernel.Pad:1868
          if (_this.isOnRectWH(t.x,t.y,_this.jujiKey.x-32+64,_this.jujiKey.y-32-_this.APAD_DIAG_SIZE/2,64,64+_this.APAD_DIAG_SIZE)) {
            //$LASTPOS=22001965;//kernel.Pad:1965
            _this.keyPushR=1;
          }
          //$LASTPOS=22001992;//kernel.Pad:1992
          if (_this.isOnRectWH(t.x,t.y,_this.no1Key.x-64,_this.no1Key.y-64,128,128)) {
            //$LASTPOS=22002054;//kernel.Pad:2054
            _this.keyPush1=1;
          }
          //$LASTPOS=22002081;//kernel.Pad:2081
          _this.padKeySW=1;
          //$LASTPOS=22002108;//kernel.Pad:2108
          _this.padKeyNotapCnt=0;
          
        }
      }
      i++;
    }
    //$LASTPOS=22002173;//kernel.Pad:2173
    if (_this.keyPushL) {
      //$LASTPOS=22002187;//kernel.Pad:2187
      _this.keyCntL++;
    } else {
      //$LASTPOS=22002204;//kernel.Pad:2204
      _this.keyCntL=0;
    }
    //$LASTPOS=22002222;//kernel.Pad:2222
    if (_this.keyPushR) {
      //$LASTPOS=22002236;//kernel.Pad:2236
      _this.keyCntR++;
    } else {
      //$LASTPOS=22002253;//kernel.Pad:2253
      _this.keyCntR=0;
    }
    //$LASTPOS=22002271;//kernel.Pad:2271
    if (_this.keyPushU) {
      //$LASTPOS=22002285;//kernel.Pad:2285
      _this.keyCntU++;
    } else {
      //$LASTPOS=22002302;//kernel.Pad:2302
      _this.keyCntU=0;
    }
    //$LASTPOS=22002320;//kernel.Pad:2320
    if (_this.keyPushD) {
      //$LASTPOS=22002334;//kernel.Pad:2334
      _this.keyCntD++;
    } else {
      //$LASTPOS=22002351;//kernel.Pad:2351
      _this.keyCntD=0;
    }
    //$LASTPOS=22002369;//kernel.Pad:2369
    if (_this.keyPush1) {
      //$LASTPOS=22002383;//kernel.Pad:2383
      _this.keyCnt1++;
    } else {
      //$LASTPOS=22002400;//kernel.Pad:2400
      _this.keyCnt1=0;
    }
    //$LASTPOS=22002435;//kernel.Pad:2435
    if (_this.keyPushL) {
      //$LASTPOS=22002449;//kernel.Pad:2449
      _this.jujiKeyPushL.show();
    } else {
      //$LASTPOS=22002475;//kernel.Pad:2475
      _this.jujiKeyPushL.hide();
    }
    //$LASTPOS=22002501;//kernel.Pad:2501
    if (_this.keyPushR) {
      //$LASTPOS=22002515;//kernel.Pad:2515
      _this.jujiKeyPushR.show();
    } else {
      //$LASTPOS=22002541;//kernel.Pad:2541
      _this.jujiKeyPushR.hide();
    }
    //$LASTPOS=22002567;//kernel.Pad:2567
    if (_this.keyPushU) {
      //$LASTPOS=22002581;//kernel.Pad:2581
      _this.jujiKeyPushU.show();
    } else {
      //$LASTPOS=22002607;//kernel.Pad:2607
      _this.jujiKeyPushU.hide();
    }
    //$LASTPOS=22002633;//kernel.Pad:2633
    if (_this.keyPushD) {
      //$LASTPOS=22002647;//kernel.Pad:2647
      _this.jujiKeyPushD.show();
    } else {
      //$LASTPOS=22002673;//kernel.Pad:2673
      _this.jujiKeyPushD.hide();
    }
    //$LASTPOS=22002699;//kernel.Pad:2699
    if (_this.keyPush1) {
      //$LASTPOS=22002713;//kernel.Pad:2713
      _this.jujiKeyPush1.show();
    } else {
      //$LASTPOS=22002739;//kernel.Pad:2739
      _this.jujiKeyPush1.hide();
    }
    
    _thread.retVal=_this;return;
  },
  getPadUp :function _trc_func_22002772_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getPadUp :function _trc_func_22002772_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadDown :function _trc_func_22002808_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getPadDown :function _trc_func_22002808_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadLeft :function _trc_func_22002844_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getPadLeft :function _trc_func_22002844_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadRight :function _trc_func_22002880_13() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getPadRight :function _trc_func_22002880_14(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getPadButton :function _trc_func_22002916_15(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=22002940;//kernel.Pad:2940
    value;
    //$LASTPOS=22002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=22002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getPadButton :function _trc_func_22002916_16(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=22002940;//kernel.Pad:2940
    value;
    //$LASTPOS=22002956;//kernel.Pad:2956
    if (i==0) {
      //$LASTPOS=22002968;//kernel.Pad:2968
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  getUp :function _trc_func_22003010_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntU;
  },
  fiber$getUp :function _trc_func_22003010_18(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntU;return;
    
    
    _thread.retVal=_this;return;
  },
  getDown :function _trc_func_22003043_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntD;
  },
  fiber$getDown :function _trc_func_22003043_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntD;return;
    
    
    _thread.retVal=_this;return;
  },
  getLeft :function _trc_func_22003076_21() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntL;
  },
  fiber$getLeft :function _trc_func_22003076_22(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntL;return;
    
    
    _thread.retVal=_this;return;
  },
  getRight :function _trc_func_22003109_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.keyCntR;
  },
  fiber$getRight :function _trc_func_22003109_24(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.keyCntR;return;
    
    
    _thread.retVal=_this;return;
  },
  getButton :function _trc_func_22003142_25(i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var value;
    
    //$LASTPOS=22003163;//kernel.Pad:3163
    value;
    //$LASTPOS=22003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=22003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    return value;
  },
  fiber$getButton :function _trc_func_22003142_26(_thread,i) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var value;
    
    //$LASTPOS=22003163;//kernel.Pad:3163
    value;
    //$LASTPOS=22003179;//kernel.Pad:3179
    if (i==0) {
      //$LASTPOS=22003191;//kernel.Pad:3191
      value=_this.keyCnt1;
    }
    _thread.retVal=value;return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRect :function _trc_func_22003243_27(mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx2&&ry<=my&&my<ry2);
  },
  fiber$isOnRect :function _trc_func_22003243_28(_thread,mx,my,rx,ry,rx2,ry2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=(rx<=mx&&mx<rx2&&ry<=my&&my<ry2);return;
    
    
    _thread.retVal=_this;return;
  },
  isOnRectWH :function _trc_func_22003357_29(mx,my,rx,ry,rw,rh) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return (rx<=mx&&mx<rx+rw&&ry<=my&&my<ry+rh);
  },
  fiber$isOnRectWH :function _trc_func_22003357_30(_thread,mx,my,rx,ry,rw,rh) {
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
  main :function _trc_func_23000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_23000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_23000056_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000072;//kernel.Panel:72
    Tonyu.classes.kernel.Actor.apply( _this, [opt]);
    //$LASTPOS=23000089;//kernel.Panel:89
    _this.width=_this.width;
    //$LASTPOS=23000112;//kernel.Panel:112
    _this.height=_this.height;
    //$LASTPOS=23000137;//kernel.Panel:137
    if (_this.align==null) {
      //$LASTPOS=23000153;//kernel.Panel:153
      _this.align="center";
    }
    //$LASTPOS=23000174;//kernel.Panel:174
    if (_this.alpha==null) {
      //$LASTPOS=23000190;//kernel.Panel:190
      _this.alpha=255;
    }
    //$LASTPOS=23000206;//kernel.Panel:206
    if (_this._drawn==null) {
      //$LASTPOS=23000223;//kernel.Panel:223
      _this._drawn=false;
    }
    //$LASTPOS=23000242;//kernel.Panel:242
    _this.buf=$("<canvas>").attr({width: _this.width,height: _this.height});
  },
  setPanel :function _trc_func_23000284_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=23000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=23000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
  },
  fiber$setPanel :function _trc_func_23000284_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000314;//kernel.Panel:314
    _this.width=width;
    //$LASTPOS=23000337;//kernel.Panel:337
    _this.height=height;
    //$LASTPOS=23000362;//kernel.Panel:362
    _this.buf=$("<canvas>").attr({width: width,height: height});
    
    _thread.retVal=_this;return;
  },
  resize :function _trc_func_23000404_5(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000432;//kernel.Panel:432
    _this.setPanel(width,height);
  },
  fiber$resize :function _trc_func_23000404_6(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23000404_7(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000432;//kernel.Panel:432
          _this.fiber$setPanel(_thread, width, height);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  getContext :function _trc_func_23000460_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000480;//kernel.Panel:480
    _this._drawn=true;
    return _this.buf[0].getContext("2d");
  },
  fiber$getContext :function _trc_func_23000460_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000480;//kernel.Panel:480
    _this._drawn=true;
    _thread.retVal=_this.buf[0].getContext("2d");return;
    
    
    _thread.retVal=_this;return;
  },
  setFillStyle :function _trc_func_23000534_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000561;//kernel.Panel:561
    _this.fillStyle=color;
  },
  fiber$setFillStyle :function _trc_func_23000534_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=23000561;//kernel.Panel:561
    _this.fillStyle=color;
    
    _thread.retVal=_this;return;
  },
  fillRect :function _trc_func_23000587_12(x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000629;//kernel.Panel:629
    _this.ctx=_this.getContext();
    //$LASTPOS=23000652;//kernel.Panel:652
    _this.ctx.save();
    //$LASTPOS=23000719;//kernel.Panel:719
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=23000749;//kernel.Panel:749
    _this.ctx.fillRect(x,y,rectWidth,rectHeight);
    //$LASTPOS=23000794;//kernel.Panel:794
    _this.ctx.restore();
  },
  fiber$fillRect :function _trc_func_23000587_13(_thread,x,y,rectWidth,rectHeight) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23000587_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000629;//kernel.Panel:629
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=23000652;//kernel.Panel:652
          _this.ctx.save();
          //$LASTPOS=23000719;//kernel.Panel:719
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=23000749;//kernel.Panel:749
          _this.ctx.fillRect(x,y,rectWidth,rectHeight);
          //$LASTPOS=23000794;//kernel.Panel:794
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  fillText :function _trc_func_23000813_15(text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23000850;//kernel.Panel:850
    _this.ctx=_this.getContext();
    //$LASTPOS=23000873;//kernel.Panel:873
    _this.ctx.save();
    //$LASTPOS=23000940;//kernel.Panel:940
    _this.ctx.textAlign=align;
    //$LASTPOS=23000968;//kernel.Panel:968
    _this.ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=23000998;//kernel.Panel:998
    _this.ctx.font=size+"px 'Courier New'";
    //$LASTPOS=23001037;//kernel.Panel:1037
    _this.ctx.fillText(text,x,y);
    //$LASTPOS=23001066;//kernel.Panel:1066
    _this.ctx.restore();
  },
  fiber$fillText :function _trc_func_23000813_16(_thread,text,x,y,size,align) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23000813_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23000850;//kernel.Panel:850
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=23000873;//kernel.Panel:873
          _this.ctx.save();
          //$LASTPOS=23000940;//kernel.Panel:940
          _this.ctx.textAlign=align;
          //$LASTPOS=23000968;//kernel.Panel:968
          _this.ctx.fillStyle=_this.fillStyle;
          //$LASTPOS=23000998;//kernel.Panel:998
          _this.ctx.font=size+"px 'Courier New'";
          //$LASTPOS=23001037;//kernel.Panel:1037
          _this.ctx.fillText(text,x,y);
          //$LASTPOS=23001066;//kernel.Panel:1066
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  clearRect :function _trc_func_23001085_18(clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001131;//kernel.Panel:1131
    _this.ctx=_this.getContext();
    //$LASTPOS=23001154;//kernel.Panel:1154
    _this.ctx.save();
    //$LASTPOS=23001171;//kernel.Panel:1171
    _this.ctx.clearRect(clearX,clearY,clearW,clearH);
    //$LASTPOS=23001220;//kernel.Panel:1220
    _this.ctx.restore();
  },
  fiber$clearRect :function _trc_func_23001085_19(_thread,clearX,clearY,clearW,clearH) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23001085_20(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23001131;//kernel.Panel:1131
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=23001154;//kernel.Panel:1154
          _this.ctx.save();
          //$LASTPOS=23001171;//kernel.Panel:1171
          _this.ctx.clearRect(clearX,clearY,clearW,clearH);
          //$LASTPOS=23001220;//kernel.Panel:1220
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  getPixel :function _trc_func_23001239_21(getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001266;//kernel.Panel:1266
    if (typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY)) {
      //$LASTPOS=23001365;//kernel.Panel:1365
      _this.ctx=_this.getContext();
      //$LASTPOS=23001392;//kernel.Panel:1392
      _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
      //$LASTPOS=23001444;//kernel.Panel:1444
      _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
      
    } else {
      //$LASTPOS=23001584;//kernel.Panel:1584
      _this.colordata=[0,0,0,0];
      
    }
    return (_this.colordata);
  },
  fiber$getPixel :function _trc_func_23001239_22(_thread,getX,getY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23001239_23(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23001266;//kernel.Panel:1266
          if (!(typeof  getX=="number"&&! isNaN(getX)&&typeof  getY=="number"&&! isNaN(getY))) { __pc=2; break; }
          //$LASTPOS=23001365;//kernel.Panel:1365
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=23001392;//kernel.Panel:1392
          _this.imagedata=_this.ctx.getImageData(getX,getY,1,1);
          //$LASTPOS=23001444;//kernel.Panel:1444
          _this.colordata=[_this.imagedata.data[0],_this.imagedata.data[1],_this.imagedata.data[2],_this.imagedata.data[3]];
          __pc=3;break;
        case 2:
          {
            //$LASTPOS=23001584;//kernel.Panel:1584
            _this.colordata=[0,0,0,0];
          }
        case 3:
          
          _thread.exit((_this.colordata));return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  scroll :function _trc_func_23001640_24(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001671;//kernel.Panel:1671
    _this.ctx=_this.getContext();
    //$LASTPOS=23001694;//kernel.Panel:1694
    _this.ctx.save();
    //$LASTPOS=23001711;//kernel.Panel:1711
    _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
    //$LASTPOS=23001772;//kernel.Panel:1772
    _this.clearRect(0,0,_this.width,_this.height);
    //$LASTPOS=23001806;//kernel.Panel:1806
    _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
    //$LASTPOS=23001858;//kernel.Panel:1858
    _this.ctx.restore();
  },
  fiber$scroll :function _trc_func_23001640_25(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_23001640_26(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=23001671;//kernel.Panel:1671
          _this.fiber$getContext(_thread);
          __pc=1;return;
        case 1:
          _this.ctx=_thread.retVal;
          
          //$LASTPOS=23001694;//kernel.Panel:1694
          _this.ctx.save();
          //$LASTPOS=23001711;//kernel.Panel:1711
          _this.imagedata=_this.ctx.getImageData(0,0,_this.width,_this.height);
          //$LASTPOS=23001772;//kernel.Panel:1772
          _this.fiber$clearRect(_thread, 0, 0, _this.width, _this.height);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=23001806;//kernel.Panel:1806
          _this.ctx.putImageData(_this.imagedata,- scrollX,- scrollY);
          //$LASTPOS=23001858;//kernel.Panel:1858
          _this.ctx.restore();
          _thread.exit(_this);return;
        }
      }
    });
  },
  draw :function _trc_func_23001877_27(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=23001894;//kernel.Panel:1894
    if (_this._drawn) {
      //$LASTPOS=23001915;//kernel.Panel:1915
      _this.pImg=_this.buf[0];
      //$LASTPOS=23001937;//kernel.Panel:1937
      ctx.save();
      //$LASTPOS=23001958;//kernel.Panel:1958
      if (_this.align=="left") {
        //$LASTPOS=23001990;//kernel.Panel:1990
        ctx.translate(_this.x+_this.width/2,_this.y+_this.height/2);
        
      } else {
        //$LASTPOS=23002042;//kernel.Panel:2042
        if (_this.align=="center") {
          //$LASTPOS=23002076;//kernel.Panel:2076
          ctx.translate(_this.x,_this.y);
          
        } else {
          //$LASTPOS=23002111;//kernel.Panel:2111
          if (_this.align=="right") {
            //$LASTPOS=23002144;//kernel.Panel:2144
            ctx.translate(_this.x-_this.width/2,_this.y-_this.height/2);
            
          }
        }
      }
      //$LASTPOS=23002201;//kernel.Panel:2201
      if (_this.rotation!=0) {
        //$LASTPOS=23002236;//kernel.Panel:2236
        ctx.rotate(_this.rotation/180*Math.PI);
        
      } else {
        //$LASTPOS=23002304;//kernel.Panel:2304
        ctx.rotate(_this.rotate/180*Math.PI);
        
      }
      //$LASTPOS=23002361;//kernel.Panel:2361
      ctx.globalAlpha=_this.alpha/255;
      //$LASTPOS=23002402;//kernel.Panel:2402
      ctx.drawImage(_this.pImg,0,0,_this.width,_this.height,- _this.width/2,- _this.height/2,_this.width,_this.height);
      //$LASTPOS=23002506;//kernel.Panel:2506
      ctx.restore();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Panel,{"fullName":"kernel.Panel","namespace":"kernel","shortName":"Panel","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"setPanel":{"nowait":false},"resize":{"nowait":false},"getContext":{"nowait":false},"setFillStyle":{"nowait":false},"fillRect":{"nowait":false},"fillText":{"nowait":false},"clearRect":{"nowait":false},"getPixel":{"nowait":false},"scroll":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.PlainChar=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_24000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_24000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_24000047_2(x,y,p) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var thg;
    
    //$LASTPOS=24000066;//kernel.PlainChar:66
    if (Tonyu.runMode) {
      //$LASTPOS=24000096;//kernel.PlainChar:96
      thg = _this.currentThreadGroup();
      //$LASTPOS=24000135;//kernel.PlainChar:135
      if (thg) {
        //$LASTPOS=24000144;//kernel.PlainChar:144
        _this._th=thg.addObj(_this,"tMain");
      }
      //$LASTPOS=24000183;//kernel.PlainChar:183
      _this.initSprite();
      
    }
    //$LASTPOS=24000209;//kernel.PlainChar:209
    if (typeof  x=="object") {
      //$LASTPOS=24000233;//kernel.PlainChar:233
      Tonyu.extend(_this,x);
    } else {
      //$LASTPOS=24000266;//kernel.PlainChar:266
      if (typeof  x=="number") {
        //$LASTPOS=24000301;//kernel.PlainChar:301
        _this.x=x;
        //$LASTPOS=24000320;//kernel.PlainChar:320
        _this.y=y;
        //$LASTPOS=24000339;//kernel.PlainChar:339
        _this.p=p;
        
      }
    }
  },
  draw :function _trc_func_24000360_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000376;//kernel.PlainChar:376
    _this.onDraw();
    //$LASTPOS=24000391;//kernel.PlainChar:391
    if (_this._isInvisible) {
      return _this;
    }
    //$LASTPOS=24000422;//kernel.PlainChar:422
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
  },
  setVisible :function _trc_func_24000441_4(v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000463;//kernel.PlainChar:463
    _this._isInvisible=! v;
  },
  fiber$setVisible :function _trc_func_24000441_5(_thread,v) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000463;//kernel.PlainChar:463
    _this._isInvisible=! v;
    
    _thread.retVal=_this;return;
  },
  onDraw :function _trc_func_24000484_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$onDraw :function _trc_func_24000484_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  update :function _trc_func_24000506_8() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000523;//kernel.PlainChar:523
    _this.onUpdate();
    //$LASTPOS=24000540;//kernel.PlainChar:540
    Tonyu.classes.kernel.Actor.prototype.update.apply( _this, []);
  },
  fiber$update :function _trc_func_24000506_9(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000523;//kernel.PlainChar:523
    _this.onUpdate();
    
    _thread.enter(function _trc_func_24000506_10(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000540;//kernel.PlainChar:540
          Tonyu.classes.kernel.Actor.prototype.fiber$update.apply( _this, [_thread]);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onUpdate :function _trc_func_24000560_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  initSprite :function _trc_func_24000584_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000605;//kernel.PlainChar:605
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=24000657;//kernel.PlainChar:657
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=24000695;//kernel.PlainChar:695
      Tonyu.globals.$Sprites.add(_this);
      
    }
    //$LASTPOS=24000727;//kernel.PlainChar:727
    _this.onAppear();
  },
  fiber$initSprite :function _trc_func_24000584_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24000605;//kernel.PlainChar:605
    if (_this.layer&&typeof  _this.layer.add=="function") {
      //$LASTPOS=24000657;//kernel.PlainChar:657
      _this.layer.add(_this);
      
    } else {
      //$LASTPOS=24000695;//kernel.PlainChar:695
      Tonyu.globals.$Sprites.add(_this);
      
    }
    
    _thread.enter(function _trc_func_24000584_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000727;//kernel.PlainChar:727
          _this.fiber$onAppear(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  tMain :function _trc_func_24000743_15() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24000759;//kernel.PlainChar:759
    _this.main();
    //$LASTPOS=24000772;//kernel.PlainChar:772
    _this.die();
  },
  fiber$tMain :function _trc_func_24000743_16(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_24000743_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=24000759;//kernel.PlainChar:759
          _this.fiber$main(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=24000772;//kernel.PlainChar:772
          _this.die();
          _thread.exit(_this);return;
        }
      }
    });
  },
  color :function _trc_func_24000783_18(r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return "rgb("+[r,g,b].join(",")+")";
  },
  fiber$color :function _trc_func_24000783_19(_thread,r,g,b) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal="rgb("+[r,g,b].join(",")+")";return;
    
    
    _thread.retVal=_this;return;
  },
  drawText :function _trc_func_24000845_20(x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=24000881;//kernel.PlainChar:881
    if (Tonyu.globals.$debug) {
      return _this;
    }
    //$LASTPOS=24000906;//kernel.PlainChar:906
    if (! size) {
      //$LASTPOS=24000917;//kernel.PlainChar:917
      size=15;
    }
    //$LASTPOS=24000931;//kernel.PlainChar:931
    if (! col) {
      //$LASTPOS=24000941;//kernel.PlainChar:941
      col="cyan";
    }
    //$LASTPOS=24000958;//kernel.PlainChar:958
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=24001012;//kernel.PlainChar:1012
    if (tp.length>0) {
      //$LASTPOS=24001040;//kernel.PlainChar:1040
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=24001119;//kernel.PlainChar:1119
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
  },
  fiber$drawText :function _trc_func_24000845_21(_thread,x,y,text,col,size) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=24000881;//kernel.PlainChar:881
    if (Tonyu.globals.$debug) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=24000906;//kernel.PlainChar:906
    if (! size) {
      //$LASTPOS=24000917;//kernel.PlainChar:917
      size=15;
    }
    //$LASTPOS=24000931;//kernel.PlainChar:931
    if (! col) {
      //$LASTPOS=24000941;//kernel.PlainChar:941
      col="cyan";
    }
    //$LASTPOS=24000958;//kernel.PlainChar:958
    tp = _this.all(Tonyu.classes.kernel.T1Text).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=24001012;//kernel.PlainChar:1012
    if (tp.length>0) {
      //$LASTPOS=24001040;//kernel.PlainChar:1040
      tp[0].extend({x: x,y: y,text: text,fillStyle: col,size: size,hidden: false});
      
    } else {
      //$LASTPOS=24001119;//kernel.PlainChar:1119
      new Tonyu.classes.kernel.T1Text({x: x,y: y,text: text,fillStyle: col,size: size});
      
    }
    
    _thread.retVal=_this;return;
  },
  drawLine :function _trc_func_24001174_22(x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var tp;
    
    //$LASTPOS=24001206;//kernel.PlainChar:1206
    if (! col) {
      //$LASTPOS=24001216;//kernel.PlainChar:1216
      col="white";
    }
    //$LASTPOS=24001234;//kernel.PlainChar:1234
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=24001288;//kernel.PlainChar:1288
    if (tp.length>0) {
      //$LASTPOS=24001316;//kernel.PlainChar:1316
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=24001367;//kernel.PlainChar:1367
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
  },
  fiber$drawLine :function _trc_func_24001174_23(_thread,x,y,tx,ty,col) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var tp;
    
    //$LASTPOS=24001206;//kernel.PlainChar:1206
    if (! col) {
      //$LASTPOS=24001216;//kernel.PlainChar:1216
      col="white";
    }
    //$LASTPOS=24001234;//kernel.PlainChar:1234
    tp = _this.all(Tonyu.classes.kernel.T1Line).find(function (t) {
      
      return t.hidden;
    });
    //$LASTPOS=24001288;//kernel.PlainChar:1288
    if (tp.length>0) {
      //$LASTPOS=24001316;//kernel.PlainChar:1316
      tp[0].extend({x: x,y: y,tx: tx,ty: ty,col: col});
      
    } else {
      //$LASTPOS=24001367;//kernel.PlainChar:1367
      new Tonyu.classes.kernel.T1Line({x: x,y: y,tx: tx,ty: ty,col: col});
      
    }
    
    _thread.retVal=_this;return;
  },
  appear :function _trc_func_24001407_24(t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return t;
  },
  fiber$appear :function _trc_func_24001407_25(_thread,t) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=t;return;
    
    
    _thread.retVal=_this;return;
  },
  trunc :function _trc_func_24001439_26(f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return Math.trunc(f);
  },
  loadPage :function _trc_func_24001482_27(page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=24001508;//kernel.PlainChar:1508
    _this.all().die();
    //$LASTPOS=24001526;//kernel.PlainChar:1526
    new page(arg);
    //$LASTPOS=24001546;//kernel.PlainChar:1546
    _this.die();
  },
  fiber$loadPage :function _trc_func_24001482_28(_thread,page,arg) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=24001508;//kernel.PlainChar:1508
    _this.all().die();
    //$LASTPOS=24001526;//kernel.PlainChar:1526
    new page(arg);
    //$LASTPOS=24001546;//kernel.PlainChar:1546
    _this.die();
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.PlainChar,{"fullName":"kernel.PlainChar","namespace":"kernel","shortName":"PlainChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true},"setVisible":{"nowait":false},"onDraw":{"nowait":false},"update":{"nowait":false},"onUpdate":{"nowait":true},"initSprite":{"nowait":false},"tMain":{"nowait":false},"color":{"nowait":false},"drawText":{"nowait":false},"drawLine":{"nowait":false},"appear":{"nowait":false},"trunc":{"nowait":true},"loadPage":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.ScaledCanvas=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_25000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_25000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_25000077_2(opt) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000095;//kernel.ScaledCanvas:95
    _this.extend(opt);
    //$LASTPOS=25000142;//kernel.ScaledCanvas:142
    _this.resize(_this.width,_this.height);
    //$LASTPOS=25000170;//kernel.ScaledCanvas:170
    _this.cw=_this.canvas.width();
    //$LASTPOS=25000194;//kernel.ScaledCanvas:194
    _this.ch=_this.canvas.height();
    //$LASTPOS=25000219;//kernel.ScaledCanvas:219
    _this.cctx=_this.canvas[0].getContext("2d");
    //$LASTPOS=25000257;//kernel.ScaledCanvas:257
    _this.color="rgb(20,80,180)";
    //$LASTPOS=25000291;//kernel.ScaledCanvas:291
    _this.sx=0;
    //$LASTPOS=25000302;//kernel.ScaledCanvas:302
    _this.sy=0;
    //$LASTPOS=25000313;//kernel.ScaledCanvas:313
    _this.isDrawGrid=Tonyu.globals.$Sprites.isDrawGrid;
  },
  resize :function _trc_func_25000349_3(width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=25000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=25000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=25000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=25000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=25000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=25000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=25000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
  },
  fiber$resize :function _trc_func_25000349_4(_thread,width,height) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25000378;//kernel.ScaledCanvas:378
    _this.width=width;
    //$LASTPOS=25000401;//kernel.ScaledCanvas:401
    _this.height=height;
    //$LASTPOS=25000426;//kernel.ScaledCanvas:426
    _this.buf=$("<canvas>").attr({width: width,height: height});
    //$LASTPOS=25000469;//kernel.ScaledCanvas:469
    _this.ctx=_this.buf[0].getContext("2d");
    //$LASTPOS=25000505;//kernel.ScaledCanvas:505
    Tonyu.globals.$screenWidth=width;
    //$LASTPOS=25000530;//kernel.ScaledCanvas:530
    Tonyu.globals.$screenHeight=height;
    //$LASTPOS=25000557;//kernel.ScaledCanvas:557
    if (Tonyu.globals.$panel) {
      //$LASTPOS=25000578;//kernel.ScaledCanvas:578
      Tonyu.globals.$panel.setPanel(Tonyu.globals.$screenWidth,Tonyu.globals.$screenHeight);
      
    }
    
    _thread.retVal=_this;return;
  },
  shouldDraw1x1 :function _trc_func_25000634_5(srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var larger;
    var smaller;
    
    //$LASTPOS=25000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=25000733;//kernel.ScaledCanvas:733
    smaller = 5;
    return srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;
  },
  fiber$shouldDraw1x1 :function _trc_func_25000634_6(_thread,srcw,srch,dstw,dsth) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var larger;
    var smaller;
    
    //$LASTPOS=25000712;//kernel.ScaledCanvas:712
    larger = 200;
    //$LASTPOS=25000733;//kernel.ScaledCanvas:733
    smaller = 5;
    _thread.retVal=srcw-smaller<=dstw&&dstw<=srcw+larger&&srch-smaller<=dsth&&dsth<=srch+larger;return;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_25000853_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=25000868;//kernel.ScaledCanvas:868
    _this.cw=_this.canvas.width();
    //$LASTPOS=25000892;//kernel.ScaledCanvas:892
    _this.ch=_this.canvas.height();
    //$LASTPOS=25000917;//kernel.ScaledCanvas:917
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=25000961;//kernel.ScaledCanvas:961
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=25001005;//kernel.ScaledCanvas:1005
    if (calch>_this.ch) {
      //$LASTPOS=25001019;//kernel.ScaledCanvas:1019
      calch=_this.ch;
    }
    //$LASTPOS=25001034;//kernel.ScaledCanvas:1034
    if (calcw>_this.cw) {
      //$LASTPOS=25001048;//kernel.ScaledCanvas:1048
      calcw=_this.cw;
    }
    //$LASTPOS=25001063;//kernel.ScaledCanvas:1063
    _this.cctx.clearRect(0,0,_this.cw,_this.ch);
    //$LASTPOS=25001095;//kernel.ScaledCanvas:1095
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=25001151;//kernel.ScaledCanvas:1151
      calcw=_this.width;
      //$LASTPOS=25001163;//kernel.ScaledCanvas:1163
      calch=_this.height;
      
    }
    //$LASTPOS=25001189;//kernel.ScaledCanvas:1189
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=25001232;//kernel.ScaledCanvas:1232
    marginh = Math.floor((_this.ch-calch)/2);
    //$LASTPOS=25001275;//kernel.ScaledCanvas:1275
    _this.cctx.drawImage(_this.buf[0],0,0,_this.width,_this.height,marginw,marginh,calcw,calch);
  },
  canvas2buf :function _trc_func_25001364_8(point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=25001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=25001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=25001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=25001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=25001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=25001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=25001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=25001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=25001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=25001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=25001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    return {x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};
  },
  fiber$canvas2buf :function _trc_func_25001364_9(_thread,point) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var calcw;
    var calch;
    var marginw;
    var marginh;
    
    //$LASTPOS=25001390;//kernel.ScaledCanvas:1390
    calcw = _this.ch/_this.height*_this.width;
    //$LASTPOS=25001434;//kernel.ScaledCanvas:1434
    calch = _this.cw/_this.width*_this.height;
    //$LASTPOS=25001478;//kernel.ScaledCanvas:1478
    if (calch>_this.ch) {
      //$LASTPOS=25001492;//kernel.ScaledCanvas:1492
      calch=_this.ch;
    }
    //$LASTPOS=25001507;//kernel.ScaledCanvas:1507
    if (calcw>_this.cw) {
      //$LASTPOS=25001521;//kernel.ScaledCanvas:1521
      calcw=_this.cw;
    }
    //$LASTPOS=25001536;//kernel.ScaledCanvas:1536
    if (_this.shouldDraw1x1(_this.width,_this.height,calcw,calch)) {
      //$LASTPOS=25001592;//kernel.ScaledCanvas:1592
      calcw=_this.width;
      //$LASTPOS=25001604;//kernel.ScaledCanvas:1604
      calch=_this.height;
      
    }
    //$LASTPOS=25001630;//kernel.ScaledCanvas:1630
    marginw = Math.floor((_this.cw-calcw)/2);
    //$LASTPOS=25001673;//kernel.ScaledCanvas:1673
    marginh = Math.floor((_this.ch-calch)/2);
    _thread.retVal={x: (point.x-marginw)/calcw*_this.width,y: (point.y-marginh)/calch*_this.height};return;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_25001810_10(color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25001835;//kernel.ScaledCanvas:1835
    _this.color=color;
  },
  fiber$setBGColor :function _trc_func_25001810_11(_thread,color) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25001835;//kernel.ScaledCanvas:1835
    _this.color=color;
    
    _thread.retVal=_this;return;
  },
  fillCanvas :function _trc_func_25001857_12(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    
    //$LASTPOS=25001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=25001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=25001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=25001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=25001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=25002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=25002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=25002068;//kernel.ScaledCanvas:2068
    ctx.restore();
  },
  fiber$fillCanvas :function _trc_func_25001857_13(_thread,cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    
    //$LASTPOS=25001879;//kernel.ScaledCanvas:1879
    ctx = cv.getContext("2d");
    //$LASTPOS=25001913;//kernel.ScaledCanvas:1913
    ctx.save();
    //$LASTPOS=25001930;//kernel.ScaledCanvas:1930
    ctx.fillStyle=Tonyu.globals.$Screen.color;
    //$LASTPOS=25001964;//kernel.ScaledCanvas:1964
    ctx.fillStyle=Tonyu.bindFunc(_this,_this.color);
    //$LASTPOS=25001990;//kernel.ScaledCanvas:1990
    ctx.fillRect(0,0,cv.width,cv.height);
    //$LASTPOS=25002033;//kernel.ScaledCanvas:2033
    if (_this.isDrawGrid) {
      //$LASTPOS=25002049;//kernel.ScaledCanvas:2049
      _this.drawGrid(cv);
    }
    //$LASTPOS=25002068;//kernel.ScaledCanvas:2068
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_25002087_14(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=25002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
  },
  fiber$scrollTo :function _trc_func_25002087_15(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=25002412;//kernel.ScaledCanvas:2412
    Tonyu.globals.$Sprites.scrollTo(scrollX,scrollY);
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.ScaledCanvas,{"fullName":"kernel.ScaledCanvas","namespace":"kernel","shortName":"ScaledCanvas","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"resize":{"nowait":false},"shouldDraw1x1":{"nowait":false},"draw":{"nowait":true},"canvas2buf":{"nowait":false},"setBGColor":{"nowait":false},"fillCanvas":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SecretChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_26000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_26000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_26000022_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SecretChar,{"fullName":"kernel.SecretChar","namespace":"kernel","shortName":"SecretChar","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.SpriteChar=Tonyu.klass(Tonyu.classes.kernel.PlainChar,[],{
  main :function _trc_func_27000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_27000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_27000022_2(x,y,p,f) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000043;//kernel.SpriteChar:43
    Tonyu.classes.kernel.PlainChar.apply( _this, [x,y,p]);
    //$LASTPOS=27000062;//kernel.SpriteChar:62
    _this.f=f;
    //$LASTPOS=27000077;//kernel.SpriteChar:77
    if (! _this.x) {
      //$LASTPOS=27000090;//kernel.SpriteChar:90
      _this.x=0;
    }
    //$LASTPOS=27000105;//kernel.SpriteChar:105
    if (! _this.y) {
      //$LASTPOS=27000118;//kernel.SpriteChar:118
      _this.y=0;
    }
    //$LASTPOS=27000133;//kernel.SpriteChar:133
    if (! _this.p) {
      //$LASTPOS=27000146;//kernel.SpriteChar:146
      _this.p=0;
    }
  },
  draw :function _trc_func_27000160_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=27000176;//kernel.SpriteChar:176
    if (_this.f) {
      //$LASTPOS=27000194;//kernel.SpriteChar:194
      if (! _this.scaleY) {
        //$LASTPOS=27000207;//kernel.SpriteChar:207
        _this.scaleY=_this.scaleX;
      }
      //$LASTPOS=27000231;//kernel.SpriteChar:231
      _this.scaleX*=- 1;
      
    }
    //$LASTPOS=27000255;//kernel.SpriteChar:255
    Tonyu.classes.kernel.PlainChar.prototype.draw.apply( _this, [c]);
    //$LASTPOS=27000275;//kernel.SpriteChar:275
    if (_this.f) {
      //$LASTPOS=27000282;//kernel.SpriteChar:282
      _this.scaleX*=- 1;
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.SpriteChar,{"fullName":"kernel.SpriteChar","namespace":"kernel","shortName":"SpriteChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Sprites=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_28000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_28000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_28000031_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000045;//kernel.Sprites:45
    _this.sprites=[];
    //$LASTPOS=28000062;//kernel.Sprites:62
    _this.imageList=[];
    //$LASTPOS=28000081;//kernel.Sprites:81
    _this.hitWatchers=[];
    //$LASTPOS=28000102;//kernel.Sprites:102
    _this.isDrawGrid=Tonyu.noviceMode;
    //$LASTPOS=28000136;//kernel.Sprites:136
    _this.sx=0;
    //$LASTPOS=28000147;//kernel.Sprites:147
    _this.sy=0;
    //$LASTPOS=28000158;//kernel.Sprites:158
    _this.objId=0;
  },
  add :function _trc_func_28000171_3(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      return _this;
    }
    //$LASTPOS=28000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=28000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=28000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=28000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=28000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    return s;
  },
  fiber$add :function _trc_func_28000171_4(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28000194;//kernel.Sprites:194
    if (s.__addedToSprites) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=28000231;//kernel.Sprites:231
    _this.sprites.push(s);
    //$LASTPOS=28000253;//kernel.Sprites:253
    if (s.__genId==null) {
      //$LASTPOS=28000283;//kernel.Sprites:283
      s.__genId=_this.objId;
      //$LASTPOS=28000309;//kernel.Sprites:309
      _this.objId++;
      
    }
    //$LASTPOS=28000330;//kernel.Sprites:330
    s.__addedToSprites=_this;
    _thread.retVal=s;return;
    
    
    _thread.retVal=_this;return;
  },
  remove :function _trc_func_28000374_5(s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var idx;
    
    //$LASTPOS=28000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=28000433;//kernel.Sprites:433
    if (idx<0) {
      return _this;
    }
    //$LASTPOS=28000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=28000485;//kernel.Sprites:485
    delete s.__addedToSprites;
  },
  fiber$remove :function _trc_func_28000374_6(_thread,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var idx;
    
    //$LASTPOS=28000400;//kernel.Sprites:400
    idx = _this.sprites.indexOf(s);
    //$LASTPOS=28000433;//kernel.Sprites:433
    if (idx<0) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=28000457;//kernel.Sprites:457
    _this.sprites.splice(idx,1);
    //$LASTPOS=28000485;//kernel.Sprites:485
    delete s.__addedToSprites;
    
    _thread.retVal=_this;return;
  },
  clear :function _trc_func_28000516_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
  },
  fiber$clear :function _trc_func_28000516_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28000534;//kernel.Sprites:534
    _this.sprites.splice(0,_this.sprites.length);
    
    _thread.retVal=_this;return;
  },
  compOrder :function _trc_func_28000570_9(obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var val1;
    var val2;
    
    //$LASTPOS=28000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=28000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=28000661;//kernel.Sprites:661
    if (val1>val2) {
      return - 1;
      
    } else {
      //$LASTPOS=28000707;//kernel.Sprites:707
      if (val1<val2) {
        return 1;
        
      } else {
        //$LASTPOS=28000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=28000777;//kernel.Sprites:777
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
  fiber$compOrder :function _trc_func_28000570_10(_thread,obj1,obj2) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var val1;
    var val2;
    
    //$LASTPOS=28000607;//kernel.Sprites:607
    val1 = obj1.zOrder;
    //$LASTPOS=28000634;//kernel.Sprites:634
    val2 = obj2.zOrder;
    //$LASTPOS=28000661;//kernel.Sprites:661
    if (val1>val2) {
      _thread.retVal=- 1;return;
      
      
    } else {
      //$LASTPOS=28000707;//kernel.Sprites:707
      if (val1<val2) {
        _thread.retVal=1;return;
        
        
      } else {
        //$LASTPOS=28000752;//kernel.Sprites:752
        if (val1==val2) {
          //$LASTPOS=28000777;//kernel.Sprites:777
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
  draw :function _trc_func_28000912_11(cv) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var orderArray;
    
    //$LASTPOS=28000937;//kernel.Sprites:937
    ctx = cv.getContext("2d");
    //$LASTPOS=28000971;//kernel.Sprites:971
    ctx.save();
    //$LASTPOS=28001116;//kernel.Sprites:1116
    orderArray = [];
    //$LASTPOS=28001140;//kernel.Sprites:1140
    orderArray=orderArray.concat(_this.sprites);
    //$LASTPOS=28001184;//kernel.Sprites:1184
    orderArray.sort(Tonyu.bindFunc(_this,_this.compOrder));
    //$LASTPOS=28001217;//kernel.Sprites:1217
    ctx.translate(- _this.sx,- _this.sy);
    //$LASTPOS=28001246;//kernel.Sprites:1246
    orderArray.forEach(function (s) {
      
      //$LASTPOS=28001280;//kernel.Sprites:1280
      s.draw(ctx);
    });
    //$LASTPOS=28001307;//kernel.Sprites:1307
    ctx.restore();
  },
  checkHit :function _trc_func_28001326_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=28001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=28001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=28001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=28001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=28001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=28001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=28001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=28001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=28001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
  },
  fiber$checkHit :function _trc_func_28001326_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28001353;//kernel.Sprites:1353
    _this.hitWatchers.forEach(function (w) {
      
      //$LASTPOS=28001397;//kernel.Sprites:1397
      _this.sprites.forEach(function (a) {
        var a_owner;
        
        //$LASTPOS=28001485;//kernel.Sprites:1485
        a_owner = a;
        //$LASTPOS=28001527;//kernel.Sprites:1527
        if (! (a_owner instanceof w.A)) {
          return _this;
        }
        //$LASTPOS=28001580;//kernel.Sprites:1580
        _this.sprites.forEach(function (b) {
          var b_owner;
          
          //$LASTPOS=28001628;//kernel.Sprites:1628
          b_owner = b;
          //$LASTPOS=28001674;//kernel.Sprites:1674
          if (a===b) {
            return _this;
          }
          //$LASTPOS=28001710;//kernel.Sprites:1710
          if (! (b_owner instanceof w.B)) {
            return _this;
          }
          //$LASTPOS=28001815;//kernel.Sprites:1815
          if (a.crashTo1(b)) {
            //$LASTPOS=28001918;//kernel.Sprites:1918
            w.h(a_owner,b_owner);
            
          }
        });
      });
    });
    
    _thread.retVal=_this;return;
  },
  watchHit :function _trc_func_28002002_14(typeA,typeB,onHit) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var p;
    
    //$LASTPOS=28002048;//kernel.Sprites:2048
    p = {A: typeA,B: typeB,h: onHit};
    //$LASTPOS=28002112;//kernel.Sprites:2112
    _this.hitWatchers.push(p);
  },
  drawGrid :function _trc_func_28002137_15(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var ctx;
    var i;
    
    //$LASTPOS=28002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=28002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=28002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=28002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=28002284;//kernel.Sprites:2284
    //$LASTPOS=28002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=28002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=28002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=28002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=28002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=28002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=28002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=28002518;//kernel.Sprites:2518
    //$LASTPOS=28002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=28002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=28002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=28002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=28002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=28002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=28002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=28002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=28002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=28002807;//kernel.Sprites:2807
    //$LASTPOS=28002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=28002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=28002889;//kernel.Sprites:2889
    //$LASTPOS=28002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=28002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=28002972;//kernel.Sprites:2972
    ctx.restore();
  },
  fiber$drawGrid :function _trc_func_28002137_16(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var ctx;
    var i;
    
    //$LASTPOS=28002165;//kernel.Sprites:2165
    ctx = c.getContext("2d");
    //$LASTPOS=28002198;//kernel.Sprites:2198
    ctx.textBaseline="top";
    //$LASTPOS=28002227;//kernel.Sprites:2227
    ctx.save();
    //$LASTPOS=28002244;//kernel.Sprites:2244
    ctx.strokeStyle="rgb(40,100,200)";
    //$LASTPOS=28002284;//kernel.Sprites:2284
    //$LASTPOS=28002289;//kernel.Sprites:2289
    i = 0;
    while(i<c.width) {
      {
        //$LASTPOS=28002329;//kernel.Sprites:2329
        ctx.beginPath();
        //$LASTPOS=28002355;//kernel.Sprites:2355
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=28002401;//kernel.Sprites:2401
        ctx.moveTo(i,0);
        //$LASTPOS=28002427;//kernel.Sprites:2427
        ctx.lineTo(i,c.height);
        //$LASTPOS=28002460;//kernel.Sprites:2460
        ctx.closePath();
        //$LASTPOS=28002486;//kernel.Sprites:2486
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=28002518;//kernel.Sprites:2518
    //$LASTPOS=28002523;//kernel.Sprites:2523
    i = 0;
    while(i<c.height) {
      {
        //$LASTPOS=28002564;//kernel.Sprites:2564
        ctx.beginPath();
        //$LASTPOS=28002590;//kernel.Sprites:2590
        ctx.lineWidth=(i%100==0?4:1);
        //$LASTPOS=28002636;//kernel.Sprites:2636
        ctx.moveTo(0,i);
        //$LASTPOS=28002662;//kernel.Sprites:2662
        ctx.lineTo(c.width,i);
        //$LASTPOS=28002694;//kernel.Sprites:2694
        ctx.closePath();
        //$LASTPOS=28002720;//kernel.Sprites:2720
        ctx.stroke();
      }
      i+=10;
    }
    //$LASTPOS=28002746;//kernel.Sprites:2746
    ctx.fillStyle="white";
    //$LASTPOS=28002774;//kernel.Sprites:2774
    ctx.font="15px monospaced";
    //$LASTPOS=28002807;//kernel.Sprites:2807
    //$LASTPOS=28002812;//kernel.Sprites:2812
    i = 100;
    while(i<c.width) {
      {
        //$LASTPOS=28002855;//kernel.Sprites:2855
        ctx.fillText(i,i,0);
      }
      i+=100;
    }
    //$LASTPOS=28002889;//kernel.Sprites:2889
    //$LASTPOS=28002894;//kernel.Sprites:2894
    i = 100;
    while(i<c.height) {
      {
        //$LASTPOS=28002938;//kernel.Sprites:2938
        ctx.fillText(i,0,i);
      }
      i+=100;
    }
    //$LASTPOS=28002972;//kernel.Sprites:2972
    ctx.restore();
    
    _thread.retVal=_this;return;
  },
  setImageList :function _trc_func_28002991_17(il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28003024;//kernel.Sprites:3024
    _this.imageList=il;
  },
  fiber$setImageList :function _trc_func_28002991_18(_thread,il) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28003024;//kernel.Sprites:3024
    _this.imageList=il;
    
    _thread.retVal=_this;return;
  },
  getImageList :function _trc_func_28003042_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.imageList;
  },
  fiber$getImageList :function _trc_func_28003042_20(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=_this.imageList;return;
    
    
    _thread.retVal=_this;return;
  },
  scrollTo :function _trc_func_28003095_21(scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=28003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=28003153;//kernel.Sprites:3153
    _this.sy=scrollY;
  },
  fiber$scrollTo :function _trc_func_28003095_22(_thread,scrollX,scrollY) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=28003136;//kernel.Sprites:3136
    _this.sx=scrollX;
    //$LASTPOS=28003153;//kernel.Sprites:3153
    _this.sy=scrollY;
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Sprites,{"fullName":"kernel.Sprites","namespace":"kernel","shortName":"Sprites","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"add":{"nowait":false},"remove":{"nowait":false},"clear":{"nowait":false},"compOrder":{"nowait":false},"draw":{"nowait":true},"checkHit":{"nowait":false},"watchHit":{"nowait":true},"drawGrid":{"nowait":false},"setImageList":{"nowait":false},"getImageList":{"nowait":false},"scrollTo":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Line=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_29000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_29000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_29000016_2(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=29000034;//kernel.T1Line:34
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=29000065;//kernel.T1Line:65
    ctx.strokeStyle=_this.col;
    //$LASTPOS=29000091;//kernel.T1Line:91
    ctx.beginPath();
    //$LASTPOS=29000113;//kernel.T1Line:113
    ctx.moveTo(_this.x,_this.y);
    //$LASTPOS=29000135;//kernel.T1Line:135
    ctx.lineTo(_this.tx,_this.ty);
    //$LASTPOS=29000159;//kernel.T1Line:159
    ctx.stroke();
    //$LASTPOS=29000178;//kernel.T1Line:178
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Line,{"fullName":"kernel.T1Line","namespace":"kernel","shortName":"T1Line","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T1Map=Tonyu.klass(Tonyu.classes.kernel.Map,[],{
  main :function _trc_func_30000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_30000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  setBGColor :function _trc_func_30000042_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=30000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
  },
  fiber$setBGColor :function _trc_func_30000042_3(_thread,c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=30000064;//kernel.T1Map:64
    Tonyu.globals.$Screen.setBGColor(c);
    
    _thread.retVal=_this;return;
  },
  load :function _trc_func_30000091_4(fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var f;
    var o;
    
    //$LASTPOS=30000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=30000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=30000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=30000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=30000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    //$LASTPOS=30000616;//kernel.T1Map:616
    _this.mapTable=_this.conv(_this.baseData[0],o.pTable);
    //$LASTPOS=30000658;//kernel.T1Map:658
    _this.mapData=_this.mapTable;
    //$LASTPOS=30000681;//kernel.T1Map:681
    _this.row=_this.mapTable.length;
    //$LASTPOS=30000707;//kernel.T1Map:707
    _this.col=_this.mapTable[0].length;
    //$LASTPOS=30000736;//kernel.T1Map:736
    _this.mapOnTable=_this.conv(_this.baseData[1],o.pTable);
    //$LASTPOS=30000780;//kernel.T1Map:780
    _this.mapOnData=_this.mapOnTable;
    //$LASTPOS=30000813;//kernel.T1Map:813
    _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
    //$LASTPOS=30000885;//kernel.T1Map:885
    _this.initMap();
  },
  fiber$load :function _trc_func_30000091_5(_thread,fileName) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var f;
    var o;
    
    //$LASTPOS=30000469;//kernel.T1Map:469
    f = _this.file("../maps/").rel(fileName);
    //$LASTPOS=30000512;//kernel.T1Map:512
    o = f.obj();
    //$LASTPOS=30000532;//kernel.T1Map:532
    _this.chipWidth=o.chipWidth;
    //$LASTPOS=30000560;//kernel.T1Map:560
    _this.chipHeight=o.chipHeight;
    //$LASTPOS=30000590;//kernel.T1Map:590
    _this.baseData=o.baseData;
    
    _thread.enter(function _trc_func_30000091_6(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=30000616;//kernel.T1Map:616
          _this.fiber$conv(_thread, _this.baseData[0], o.pTable);
          __pc=1;return;
        case 1:
          _this.mapTable=_thread.retVal;
          
          //$LASTPOS=30000658;//kernel.T1Map:658
          _this.mapData=_this.mapTable;
          //$LASTPOS=30000681;//kernel.T1Map:681
          _this.row=_this.mapTable.length;
          //$LASTPOS=30000707;//kernel.T1Map:707
          _this.col=_this.mapTable[0].length;
          //$LASTPOS=30000736;//kernel.T1Map:736
          _this.fiber$conv(_thread, _this.baseData[1], o.pTable);
          __pc=2;return;
        case 2:
          _this.mapOnTable=_thread.retVal;
          
          //$LASTPOS=30000780;//kernel.T1Map:780
          _this.mapOnData=_this.mapOnTable;
          //$LASTPOS=30000813;//kernel.T1Map:813
          _this.buf=$("<canvas>").attr({width: _this.col*_this.chipWidth,height: _this.row*_this.chipHeight});
          //$LASTPOS=30000885;//kernel.T1Map:885
          _this.fiber$initMap(_thread);
          __pc=3;return;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  conv :function _trc_func_30000903_7(mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var res;
    
    //$LASTPOS=30000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=30000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=30000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=30000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=30001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=30001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=30001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=30001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=30001165;//kernel.T1Map:1165
          rrow.push(dat[1]);
        }
      });
    });
    return res;
  },
  fiber$conv :function _trc_func_30000903_8(_thread,mat,tbl) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var res;
    
    //$LASTPOS=30000926;//kernel.T1Map:926
    res = [];
    //$LASTPOS=30000943;//kernel.T1Map:943
    mat.forEach(function (row) {
      var rrow;
      
      //$LASTPOS=30000973;//kernel.T1Map:973
      rrow = [];
      //$LASTPOS=30000995;//kernel.T1Map:995
      res.push(rrow);
      //$LASTPOS=30001020;//kernel.T1Map:1020
      row.forEach(function (dat) {
        var t;
        
        //$LASTPOS=30001067;//kernel.T1Map:1067
        t = tbl[dat[0]];
        //$LASTPOS=30001099;//kernel.T1Map:1099
        if (t) {
          //$LASTPOS=30001106;//kernel.T1Map:1106
          rrow.push(Tonyu.globals[t.name]+dat[1]);
        } else {
          //$LASTPOS=30001165;//kernel.T1Map:1165
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
  main :function _trc_func_31000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_31000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initGlobals :function _trc_func_31000022_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=31000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=31000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    //$LASTPOS=31000103;//kernel.T1Page:103
    Tonyu.globals.$clBlack=_this.color(0,0,0);
    //$LASTPOS=31000131;//kernel.T1Page:131
    Tonyu.globals.$clRed=_this.color(255,0,0);
    //$LASTPOS=31000159;//kernel.T1Page:159
    Tonyu.globals.$clGreen=_this.color(0,255,0);
    //$LASTPOS=31000189;//kernel.T1Page:189
    Tonyu.globals.$clYellow=_this.color(255,255,0);
    //$LASTPOS=31000222;//kernel.T1Page:222
    Tonyu.globals.$clBlue=_this.color(0,0,255);
    //$LASTPOS=31000251;//kernel.T1Page:251
    Tonyu.globals.$clPink=_this.color(255,0,255);
    //$LASTPOS=31000282;//kernel.T1Page:282
    Tonyu.globals.$clAqua=_this.color(0,255,255);
    //$LASTPOS=31000313;//kernel.T1Page:313
    Tonyu.globals.$clWhite=_this.color(255,255,255);
    //$LASTPOS=31000347;//kernel.T1Page:347
    Tonyu.globals.$mplayer=new Tonyu.classes.kernel.MediaPlayer;
  },
  fiber$initGlobals :function _trc_func_31000022_3(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=31000044;//kernel.T1Page:44
    Tonyu.globals.$chars=Tonyu.globals.$Sprites.sprites;
    //$LASTPOS=31000074;//kernel.T1Page:74
    Tonyu.globals.$Boot.setFrameRate(60);
    
    _thread.enter(function _trc_func_31000022_4(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=31000103;//kernel.T1Page:103
          _this.fiber$color(_thread, 0, 0, 0);
          __pc=1;return;
        case 1:
          Tonyu.globals.$clBlack=_thread.retVal;
          
          //$LASTPOS=31000131;//kernel.T1Page:131
          _this.fiber$color(_thread, 255, 0, 0);
          __pc=2;return;
        case 2:
          Tonyu.globals.$clRed=_thread.retVal;
          
          //$LASTPOS=31000159;//kernel.T1Page:159
          _this.fiber$color(_thread, 0, 255, 0);
          __pc=3;return;
        case 3:
          Tonyu.globals.$clGreen=_thread.retVal;
          
          //$LASTPOS=31000189;//kernel.T1Page:189
          _this.fiber$color(_thread, 255, 255, 0);
          __pc=4;return;
        case 4:
          Tonyu.globals.$clYellow=_thread.retVal;
          
          //$LASTPOS=31000222;//kernel.T1Page:222
          _this.fiber$color(_thread, 0, 0, 255);
          __pc=5;return;
        case 5:
          Tonyu.globals.$clBlue=_thread.retVal;
          
          //$LASTPOS=31000251;//kernel.T1Page:251
          _this.fiber$color(_thread, 255, 0, 255);
          __pc=6;return;
        case 6:
          Tonyu.globals.$clPink=_thread.retVal;
          
          //$LASTPOS=31000282;//kernel.T1Page:282
          _this.fiber$color(_thread, 0, 255, 255);
          __pc=7;return;
        case 7:
          Tonyu.globals.$clAqua=_thread.retVal;
          
          //$LASTPOS=31000313;//kernel.T1Page:313
          _this.fiber$color(_thread, 255, 255, 255);
          __pc=8;return;
        case 8:
          Tonyu.globals.$clWhite=_thread.retVal;
          
          //$LASTPOS=31000347;//kernel.T1Page:347
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
  main :function _trc_func_32000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_32000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  draw :function _trc_func_32000016_2(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=32000032;//kernel.T1Text:32
    if (_this.hidden) {
      return _this;
    }
    //$LASTPOS=32000057;//kernel.T1Text:57
    c.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=32000097;//kernel.T1Text:97
    Tonyu.classes.kernel.Actor.prototype.draw.apply( _this, [c]);
    //$LASTPOS=32000117;//kernel.T1Text:117
    _this.hidden=true;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T1Text,{"fullName":"kernel.T1Text","namespace":"kernel","shortName":"T1Text","decls":{"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2Body=Tonyu.klass(Tonyu.classes.kernel.BodyActor,[],{
  main :function _trc_func_33000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_33000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2Body,{"fullName":"kernel.T2Body","namespace":"kernel","shortName":"T2Body","decls":{"methods":{"main":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2MediaPlayer=Tonyu.klass(Tonyu.classes.kernel.Actor,[],{
  main :function _trc_func_34000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_34000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_34000055_2() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000069;//kernel.T2MediaPlayer:69
    _this.initT2MediaPlayer();
  },
  initT2MediaPlayer :function _trc_func_34000096_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      return _this;
    }
    //$LASTPOS=34000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=34000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=34000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
  },
  fiber$initT2MediaPlayer :function _trc_func_34000096_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34000124;//kernel.T2MediaPlayer:124
    if (T2MediaLib.inited) {
      _thread.retVal=_this;return;
      
    }
    //$LASTPOS=34000160;//kernel.T2MediaPlayer:160
    T2MediaLib.init();
    //$LASTPOS=34000184;//kernel.T2MediaPlayer:184
    T2MediaLib.inited=true;
    //$LASTPOS=34000213;//kernel.T2MediaPlayer:213
    _this.bgmPlayerMax=T2MediaLib.bgmPlayerMax;
    
    _thread.retVal=_this;return;
  },
  clearSEData :function _trc_func_34000259_5() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=34000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
  },
  fiber$clearSEData :function _trc_func_34000259_6(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34000281;//kernel.T2MediaPlayer:281
    T2MediaLib.allStopBGM();
    //$LASTPOS=34000311;//kernel.T2MediaPlayer:311
    T2MediaLib.allClearData();
    
    _thread.retVal=_this;return;
  },
  clearBGMData :function _trc_func_34000344_7() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000367;//kernel.T2MediaPlayer:367
    _this.clearSEData();
  },
  fiber$clearBGMData :function _trc_func_34000344_8(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_34000344_9(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34000367;//kernel.T2MediaPlayer:367
          _this.fiber$clearSEData(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  deleteSEData :function _trc_func_34000388_10(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
  },
  fiber$deleteSEData :function _trc_func_34000388_11(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34000414;//kernel.T2MediaPlayer:414
    T2MediaLib.clearData(idx);
    
    _thread.retVal=_this;return;
  },
  loadSE :function _trc_func_34000457_12(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    var cnt;
    
    //$LASTPOS=34000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=34000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=34000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    //$LASTPOS=34000616;//kernel.T2MediaPlayer:616
    while (data==null) {
      //$LASTPOS=34000648;//kernel.T2MediaPlayer:648
      _this.update();
      //$LASTPOS=34000667;//kernel.T2MediaPlayer:667
      data=T2MediaLib.getSEData(idx);
      //$LASTPOS=34000710;//kernel.T2MediaPlayer:710
      cnt++;
      
    }
    return data;
  },
  fiber$loadSE :function _trc_func_34000457_13(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    var cnt;
    
    //$LASTPOS=34000498;//kernel.T2MediaPlayer:498
    T2MediaLib.loadSE(idx,src);
    //$LASTPOS=34000557;//kernel.T2MediaPlayer:557
    data = T2MediaLib.getSEData(idx);
    //$LASTPOS=34000600;//kernel.T2MediaPlayer:600
    cnt = 0;
    
    _thread.enter(function _trc_func_34000457_14(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34000616;//kernel.T2MediaPlayer:616
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=34000648;//kernel.T2MediaPlayer:648
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=34000667;//kernel.T2MediaPlayer:667
          data=T2MediaLib.getSEData(idx);
          //$LASTPOS=34000710;//kernel.T2MediaPlayer:710
          cnt++;
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  loadFromProject :function _trc_func_34000852_15(prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var r;
    var s;
    var _it_229;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=34000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=34000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      return _this;
    }
    //$LASTPOS=34000945;//kernel.T2MediaPlayer:945
    _it_229=Tonyu.iterator(r.sounds,1);
    while(_it_229.next()) {
      s=_it_229[0];
      
      //$LASTPOS=34000981;//kernel.T2MediaPlayer:981
      name = s.name;url = s.url;
      //$LASTPOS=34001019;//kernel.T2MediaPlayer:1019
      ls = /^ls:(.*)/.exec(url);
      //$LASTPOS=34001058;//kernel.T2MediaPlayer:1058
      if (ls) {
        //$LASTPOS=34001081;//kernel.T2MediaPlayer:1081
        f = prj.getDir().rel(ls[1]);
        //$LASTPOS=34001125;//kernel.T2MediaPlayer:1125
        if (f.exists()) {
          //$LASTPOS=34001160;//kernel.T2MediaPlayer:1160
          url=f.text();
          //$LASTPOS=34001191;//kernel.T2MediaPlayer:1191
          Tonyu.globals.$lastURL=url;
          
        }
        
      }
      //$LASTPOS=34001242;//kernel.T2MediaPlayer:1242
      Tonyu.setGlobal(name,name);
      //$LASTPOS=34001281;//kernel.T2MediaPlayer:1281
      _this.print("Loading Sound: "+name);
      //$LASTPOS=34001322;//kernel.T2MediaPlayer:1322
      _this.loadSE(name,url);
      
    }
  },
  fiber$loadFromProject :function _trc_func_34000852_16(_thread,prj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var r;
    var s;
    var _it_229;
    var name;
    var url;
    var ls;
    var f;
    
    //$LASTPOS=34000881;//kernel.T2MediaPlayer:881
    r = prj.getResource();
    //$LASTPOS=34000911;//kernel.T2MediaPlayer:911
    if (! r||! r.sounds) {
      _thread.retVal=_this;return;
      
    }
    
    _thread.enter(function _trc_func_34000852_17(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34000945;//kernel.T2MediaPlayer:945
          _it_229=Tonyu.iterator(r.sounds,1);
        case 1:
          if (!(_it_229.next())) { __pc=3; break; }
          s=_it_229[0];
          
          //$LASTPOS=34000981;//kernel.T2MediaPlayer:981
          name = s.name;url = s.url;
          //$LASTPOS=34001019;//kernel.T2MediaPlayer:1019
          ls = /^ls:(.*)/.exec(url);
          //$LASTPOS=34001058;//kernel.T2MediaPlayer:1058
          if (ls) {
            //$LASTPOS=34001081;//kernel.T2MediaPlayer:1081
            f = prj.getDir().rel(ls[1]);
            //$LASTPOS=34001125;//kernel.T2MediaPlayer:1125
            if (f.exists()) {
              //$LASTPOS=34001160;//kernel.T2MediaPlayer:1160
              url=f.text();
              //$LASTPOS=34001191;//kernel.T2MediaPlayer:1191
              Tonyu.globals.$lastURL=url;
              
            }
            
          }
          //$LASTPOS=34001242;//kernel.T2MediaPlayer:1242
          Tonyu.setGlobal(name,name);
          //$LASTPOS=34001281;//kernel.T2MediaPlayer:1281
          _this.print("Loading Sound: "+name);
          //$LASTPOS=34001322;//kernel.T2MediaPlayer:1322
          _this.fiber$loadSE(_thread, name, url);
          __pc=2;return;
        case 2:
          
          __pc=1;break;
        case 3:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  playSE :function _trc_func_34001402_18(idx,vol,rate,offset,loop,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34001503;//kernel.T2MediaPlayer:1503
    if (vol==null) {
      //$LASTPOS=34001520;//kernel.T2MediaPlayer:1520
      vol=128;
    }
    //$LASTPOS=34001609;//kernel.T2MediaPlayer:1609
    if (vol<0) {
      //$LASTPOS=34001629;//kernel.T2MediaPlayer:1629
      vol=0;
    } else {
      //$LASTPOS=34001650;//kernel.T2MediaPlayer:1650
      if (vol>128) {
        //$LASTPOS=34001665;//kernel.T2MediaPlayer:1665
        vol=128;
      }
    }
    return T2MediaLib.playSE(idx,vol/128,rate,offset,loop,loopStart,loopEnd);
  },
  stopSE :function _trc_func_34001769_19(sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopSE(sourceObj);
  },
  fiber$stopSE :function _trc_func_34001769_20(_thread,sourceObj) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopSE(sourceObj);return;
    
    
    _thread.retVal=_this;return;
  },
  getSEData :function _trc_func_34001838_21(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getSEData(idx);
  },
  fiber$getSEData :function _trc_func_34001838_22(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getSEData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  loadBGM :function _trc_func_34001914_23(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var data;
    
    //$LASTPOS=34001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=34002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    //$LASTPOS=34002060;//kernel.T2MediaPlayer:2060
    while (data==null) {
      //$LASTPOS=34002092;//kernel.T2MediaPlayer:2092
      _this.update();
      //$LASTPOS=34002111;//kernel.T2MediaPlayer:2111
      data=T2MediaLib.getBGMData(idx);
      
    }
    return data;
  },
  fiber$loadBGM :function _trc_func_34001914_24(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var data;
    
    //$LASTPOS=34001956;//kernel.T2MediaPlayer:1956
    T2MediaLib.loadBGM(idx,src);
    //$LASTPOS=34002016;//kernel.T2MediaPlayer:2016
    data = T2MediaLib.getBGMData(idx);
    
    _thread.enter(function _trc_func_34001914_25(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34002060;//kernel.T2MediaPlayer:2060
        case 1:
          if (!(data==null)) { __pc=3; break; }
          //$LASTPOS=34002092;//kernel.T2MediaPlayer:2092
          _this.fiber$update(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=34002111;//kernel.T2MediaPlayer:2111
          data=T2MediaLib.getBGMData(idx);
          __pc=1;break;
        case 3:
          
          _thread.exit(data);return;
          _thread.exit(_this);return;
        }
      }
    });
  },
  playBGM :function _trc_func_34002177_26(idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=34002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=34002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=34002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    return T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGM :function _trc_func_34002177_27(_thread,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34002232;//kernel.T2MediaPlayer:2232
    if (loop===null) {
      //$LASTPOS=34002251;//kernel.T2MediaPlayer:2251
      loop=false;
    }
    //$LASTPOS=34002270;//kernel.T2MediaPlayer:2270
    if (offset===null) {
      //$LASTPOS=34002291;//kernel.T2MediaPlayer:2291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(0,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGM :function _trc_func_34002383_28() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(0);
  },
  fiber$stopBGM :function _trc_func_34002383_29(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGM :function _trc_func_34002437_30() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(0);
  },
  fiber$pauseBGM :function _trc_func_34002437_31(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGM :function _trc_func_34002493_32() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(0);
  },
  fiber$resumeBGM :function _trc_func_34002493_33(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(0);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolume :function _trc_func_34002551_34(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=34002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=34002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=34002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=34002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(0,vol);
  },
  fiber$setBGMVolume :function _trc_func_34002551_35(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34002577;//kernel.T2MediaPlayer:2577
    vol=vol/128;
    //$LASTPOS=34002672;//kernel.T2MediaPlayer:2672
    if (vol>1) {
      //$LASTPOS=34002692;//kernel.T2MediaPlayer:2692
      vol=1;
    } else {
      //$LASTPOS=34002713;//kernel.T2MediaPlayer:2713
      if (vol<0) {
        //$LASTPOS=34002728;//kernel.T2MediaPlayer:2728
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(0,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempo :function _trc_func_34002790_36(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(0,tempo);
  },
  fiber$setBGMTempo :function _trc_func_34002790_37(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(0,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTime :function _trc_func_34002948_38() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(0);
  },
  fiber$getBGMCurrentTime :function _trc_func_34002948_39(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLength :function _trc_func_34003022_40() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(0);
  },
  fiber$getBGMLength :function _trc_func_34003022_41(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(0);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMData :function _trc_func_34003086_42(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMData(idx);
  },
  fiber$getBGMData :function _trc_func_34003086_43(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  playBGMID :function _trc_func_34003171_44(id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=34003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=34003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=34003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    return T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);
  },
  fiber$playBGMID :function _trc_func_34003171_45(_thread,id,idx,loop,offset,loopStart,loopEnd) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34003232;//kernel.T2MediaPlayer:3232
    if (loop===null) {
      //$LASTPOS=34003251;//kernel.T2MediaPlayer:3251
      loop=false;
    }
    //$LASTPOS=34003270;//kernel.T2MediaPlayer:3270
    if (offset===null) {
      //$LASTPOS=34003291;//kernel.T2MediaPlayer:3291
      offset=0;
    }
    _thread.retVal=T2MediaLib.playBGM(id,idx,loop,offset,loopStart,loopEnd);return;
    
    
    _thread.retVal=_this;return;
  },
  stopBGMID :function _trc_func_34003384_46(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopBGM(id);
  },
  fiber$stopBGMID :function _trc_func_34003384_47(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  pauseBGMID :function _trc_func_34003443_48(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseBGM(id);
  },
  fiber$pauseBGMID :function _trc_func_34003443_49(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  resumeBGMID :function _trc_func_34003504_50(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeBGM(id);
  },
  fiber$resumeBGMID :function _trc_func_34003504_51(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeBGM(id);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMVolumeID :function _trc_func_34003567_52(id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=34003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=34003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=34003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=34003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    return T2MediaLib.setBGMVolume(id,vol);
  },
  fiber$setBGMVolumeID :function _trc_func_34003567_53(_thread,id,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34003599;//kernel.T2MediaPlayer:3599
    vol=vol/128;
    //$LASTPOS=34003694;//kernel.T2MediaPlayer:3694
    if (vol>1) {
      //$LASTPOS=34003714;//kernel.T2MediaPlayer:3714
      vol=1;
    } else {
      //$LASTPOS=34003735;//kernel.T2MediaPlayer:3735
      if (vol<0) {
        //$LASTPOS=34003750;//kernel.T2MediaPlayer:3750
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setBGMVolume(id,vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setBGMTempoID :function _trc_func_34003813_54(id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setBGMTempo(id,tempo);
  },
  fiber$setBGMTempoID :function _trc_func_34003813_55(_thread,id,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setBGMTempo(id,tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMCurrentTimeID :function _trc_func_34003978_56(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMCurrentTime(id);
  },
  fiber$getBGMCurrentTimeID :function _trc_func_34003978_57(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMCurrentTime(id);return;
    
    
    _thread.retVal=_this;return;
  },
  getBGMLengthID :function _trc_func_34004057_58(id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMLength(id);
  },
  fiber$getBGMLengthID :function _trc_func_34004057_59(_thread,id) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMLength(id);return;
    
    
    _thread.retVal=_this;return;
  },
  sizeBGMID :function _trc_func_34004126_60() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getBGMPlayerMax();
  },
  fiber$sizeBGMID :function _trc_func_34004126_61(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getBGMPlayerMax();return;
    
    
    _thread.retVal=_this;return;
  },
  allStopBGM :function _trc_func_34004189_62() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
  },
  fiber$allStopBGM :function _trc_func_34004189_63(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34004210;//kernel.T2MediaPlayer:4210
    T2MediaLib.allStopBGM();
    
    _thread.retVal=_this;return;
  },
  loadAudio :function _trc_func_34004245_64(idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    //$LASTPOS=34004351;//kernel.T2MediaPlayer:4351
    while (T2MediaLib.getAudioData(idx)==null) {
      //$LASTPOS=34004396;//kernel.T2MediaPlayer:4396
      _this.update();
    }
  },
  fiber$loadAudio :function _trc_func_34004245_65(_thread,idx,src) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34004289;//kernel.T2MediaPlayer:4289
    T2MediaLib.loadAudio(idx,src);
    
    _thread.enter(function _trc_func_34004245_66(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=34004351;//kernel.T2MediaPlayer:4351
        case 1:
          if (!(T2MediaLib.getAudioData(idx)==null)) { __pc=3; break; }
          //$LASTPOS=34004396;//kernel.T2MediaPlayer:4396
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
  playAudio :function _trc_func_34004412_67(idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=34004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=34004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=34004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    return T2MediaLib.playAudio(idx,loop,startTime);
  },
  fiber$playAudio :function _trc_func_34004412_68(_thread,idx,loop,startTime) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34004452;//kernel.T2MediaPlayer:4452
    if (loop===null) {
      //$LASTPOS=34004471;//kernel.T2MediaPlayer:4471
      loop=false;
    }
    //$LASTPOS=34004490;//kernel.T2MediaPlayer:4490
    if (startTime===null) {
      //$LASTPOS=34004514;//kernel.T2MediaPlayer:4514
      startTime=0;
    }
    _thread.retVal=T2MediaLib.playAudio(idx,loop,startTime);return;
    
    
    _thread.retVal=_this;return;
  },
  stopAudio :function _trc_func_34004591_69() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.stopAudio();
  },
  fiber$stopAudio :function _trc_func_34004591_70(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.stopAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  pauseAudio :function _trc_func_34004648_71() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.pauseAudio();
  },
  fiber$pauseAudio :function _trc_func_34004648_72(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.pauseAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  resumeAudio :function _trc_func_34004707_73() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.resumeAudio();
  },
  fiber$resumeAudio :function _trc_func_34004707_74(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.resumeAudio();return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioVolume :function _trc_func_34004768_75(vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=34004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=34004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=34004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=34004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    return T2MediaLib.setAudioVolume(vol);
  },
  fiber$setAudioVolume :function _trc_func_34004768_76(_thread,vol) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34004796;//kernel.T2MediaPlayer:4796
    vol=vol/128;
    //$LASTPOS=34004818;//kernel.T2MediaPlayer:4818
    if (vol>1) {
      //$LASTPOS=34004838;//kernel.T2MediaPlayer:4838
      vol=1;
    } else {
      //$LASTPOS=34004859;//kernel.T2MediaPlayer:4859
      if (vol<0) {
        //$LASTPOS=34004874;//kernel.T2MediaPlayer:4874
        vol=0;
      }
    }
    _thread.retVal=T2MediaLib.setAudioVolume(vol);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioTempo :function _trc_func_34004935_77(tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=34004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=34004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=34005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=34005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    return T2MediaLib.setAudioTempo(tempo);
  },
  fiber$setAudioTempo :function _trc_func_34004935_78(_thread,tempo) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=34004964;//kernel.T2MediaPlayer:4964
    if (tempo>4) {
      //$LASTPOS=34004986;//kernel.T2MediaPlayer:4986
      tempo=4;
    } else {
      //$LASTPOS=34005009;//kernel.T2MediaPlayer:5009
      if (tempo<0.5) {
        //$LASTPOS=34005026;//kernel.T2MediaPlayer:5026
        tempo=0.5;
      }
    }
    _thread.retVal=T2MediaLib.setAudioTempo(tempo);return;
    
    
    _thread.retVal=_this;return;
  },
  setAudioPosition :function _trc_func_34005090_79(time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.setAudioPosition(time);
  },
  fiber$setAudioPosition :function _trc_func_34005090_80(_thread,time) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.setAudioPosition(time);return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioCurrentTime :function _trc_func_34005169_81() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioCurrentTime();
  },
  fiber$getAudioCurrentTime :function _trc_func_34005169_82(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioCurrentTime();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioLength :function _trc_func_34005246_83() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioLength();
  },
  fiber$getAudioLength :function _trc_func_34005246_84(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioLength();return;
    
    
    _thread.retVal=_this;return;
  },
  getAudioData :function _trc_func_34005313_85(idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return T2MediaLib.getAudioData(idx);
  },
  fiber$getAudioData :function _trc_func_34005313_86(_thread,idx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    _thread.retVal=T2MediaLib.getAudioData(idx);return;
    
    
    _thread.retVal=_this;return;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.T2MediaPlayer,{"fullName":"kernel.T2MediaPlayer","namespace":"kernel","shortName":"T2MediaPlayer","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"initT2MediaPlayer":{"nowait":false},"clearSEData":{"nowait":false},"clearBGMData":{"nowait":false},"deleteSEData":{"nowait":false},"loadSE":{"nowait":false},"loadFromProject":{"nowait":false},"playSE":{"nowait":true},"stopSE":{"nowait":false},"getSEData":{"nowait":false},"loadBGM":{"nowait":false},"playBGM":{"nowait":false},"stopBGM":{"nowait":false},"pauseBGM":{"nowait":false},"resumeBGM":{"nowait":false},"setBGMVolume":{"nowait":false},"setBGMTempo":{"nowait":false},"getBGMCurrentTime":{"nowait":false},"getBGMLength":{"nowait":false},"getBGMData":{"nowait":false},"playBGMID":{"nowait":false},"stopBGMID":{"nowait":false},"pauseBGMID":{"nowait":false},"resumeBGMID":{"nowait":false},"setBGMVolumeID":{"nowait":false},"setBGMTempoID":{"nowait":false},"getBGMCurrentTimeID":{"nowait":false},"getBGMLengthID":{"nowait":false},"sizeBGMID":{"nowait":false},"allStopBGM":{"nowait":false},"loadAudio":{"nowait":false},"playAudio":{"nowait":false},"stopAudio":{"nowait":false},"pauseAudio":{"nowait":false},"resumeAudio":{"nowait":false},"setAudioVolume":{"nowait":false},"setAudioTempo":{"nowait":false},"setAudioPosition":{"nowait":false},"getAudioCurrentTime":{"nowait":false},"getAudioLength":{"nowait":false},"getAudioData":{"nowait":false}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.T2World=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2Mod],{
  main :function _trc_func_35000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000150;//kernel.T2World:150
    _this.loop();
  },
  fiber$main :function _trc_func_35000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_35000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000150;//kernel.T2World:150
          _this.fiber$loop(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  onAppear :function _trc_func_35000067_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    //$LASTPOS=35000133;//kernel.T2World:133
    _this.initWorld();
  },
  fiber$onAppear :function _trc_func_35000067_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=35000086;//kernel.T2World:86
    Tonyu.globals.$currentProject.requestPlugin("box2d");
    
    _thread.enter(function _trc_func_35000067_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000133;//kernel.T2World:133
          _this.fiber$initWorld(_thread);
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initWorld :function _trc_func_35000163_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=35000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=35000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=35000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=35000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=35000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=35000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=35000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=35000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    //$LASTPOS=35000533;//kernel.T2World:533
    _this.on("die",Tonyu.bindFunc(_this,_this.releaseWorld));
  },
  fiber$initWorld :function _trc_func_35000163_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b2World;
    var b2Vec2;
    
    //$LASTPOS=35000183;//kernel.T2World:183
    _this.gravity=_this.gravity||9.8;
    //$LASTPOS=35000212;//kernel.T2World:212
    _this.gravityX=_this.gravityX||0;
    //$LASTPOS=35000241;//kernel.T2World:241
    b2World = Box2D.Dynamics.b2World;
    //$LASTPOS=35000284;//kernel.T2World:284
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    //$LASTPOS=35000328;//kernel.T2World:328
    _this.scale=_this.scale||32;
    //$LASTPOS=35000352;//kernel.T2World:352
    _this.world=new b2World(new b2Vec2(_this.gravityX,_this.gravity),true);
    //$LASTPOS=35000477;//kernel.T2World:477
    Tonyu.globals.$t2World=_this;
    //$LASTPOS=35000497;//kernel.T2World:497
    Tonyu.globals.$Boot.on("stop",Tonyu.bindFunc(_this,_this.releaseWorld));
    
    _thread.enter(function _trc_func_35000163_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000533;//kernel.T2World:533
          _this.fiber$on(_thread, "die", Tonyu.bindFunc(_this,_this.releaseWorld));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  releaseWorld :function _trc_func_35000561_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=35000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
  },
  fiber$releaseWorld :function _trc_func_35000561_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=35000584;//kernel.T2World:584
    if (Tonyu.globals.$t2World===_this) {
      //$LASTPOS=35000605;//kernel.T2World:605
      Tonyu.globals.$t2World=null;
    }
    
    _thread.retVal=_this;return;
  },
  loop :function _trc_func_35000626_11() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=35000641;//kernel.T2World:641
    while (true) {
      //$LASTPOS=35000664;//kernel.T2World:664
      _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
      //$LASTPOS=35000831;//kernel.T2World:831
      _this.world.DrawDebugData();
      //$LASTPOS=35000863;//kernel.T2World:863
      _this.world.ClearForces();
      //$LASTPOS=35000893;//kernel.T2World:893
      _this.updatePos();
      //$LASTPOS=35000915;//kernel.T2World:915
      _this.update();
      
    }
  },
  fiber$loop :function _trc_func_35000626_12(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_35000626_13(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=35000641;//kernel.T2World:641
        case 1:
          //$LASTPOS=35000664;//kernel.T2World:664
          _this.world.Step(1/Tonyu.globals.$Boot.getFrameRate(),10,10);
          //$LASTPOS=35000831;//kernel.T2World:831
          _this.world.DrawDebugData();
          //$LASTPOS=35000863;//kernel.T2World:863
          _this.world.ClearForces();
          //$LASTPOS=35000893;//kernel.T2World:893
          _this.fiber$updatePos(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=35000915;//kernel.T2World:915
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
  updatePos :function _trc_func_35000936_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var b;
    var d;
    
    //$LASTPOS=35000956;//kernel.T2World:956
    //$LASTPOS=35000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=35001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=35001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=35001053;//kernel.T2World:1053
          d.updatePos();
        }
      }
      b=b.GetNext();
    }
  },
  fiber$updatePos :function _trc_func_35000936_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var b;
    var d;
    
    //$LASTPOS=35000956;//kernel.T2World:956
    //$LASTPOS=35000961;//kernel.T2World:961
    b = _this.world.GetBodyList();
    while(b) {
      {
        //$LASTPOS=35001015;//kernel.T2World:1015
        d = b.GetUserData();
        //$LASTPOS=35001047;//kernel.T2World:1047
        if (d) {
          //$LASTPOS=35001053;//kernel.T2World:1053
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
  main :function _trc_func_36000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_36000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_36000040_2(xx,yy,t,c,s) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=36000065;//kernel.TextChar:65
    Tonyu.classes.kernel.PlainChar.apply( _this, [xx,yy]);
    //$LASTPOS=36000084;//kernel.TextChar:84
    _this.text="";
    //$LASTPOS=36000098;//kernel.TextChar:98
    _this.col=Tonyu.globals.$clWhite;
    //$LASTPOS=36000117;//kernel.TextChar:117
    _this.size=20;
    //$LASTPOS=36000131;//kernel.TextChar:131
    if (! _this.x) {
      //$LASTPOS=36000144;//kernel.TextChar:144
      _this.x=0;
    }
    //$LASTPOS=36000159;//kernel.TextChar:159
    if (! _this.y) {
      //$LASTPOS=36000172;//kernel.TextChar:172
      _this.y=0;
    }
    //$LASTPOS=36000187;//kernel.TextChar:187
    if (t) {
      //$LASTPOS=36000194;//kernel.TextChar:194
      _this.text=t;
    }
    //$LASTPOS=36000207;//kernel.TextChar:207
    if (c) {
      //$LASTPOS=36000214;//kernel.TextChar:214
      _this.fillStyle=c;
    }
    //$LASTPOS=36000232;//kernel.TextChar:232
    if (s) {
      //$LASTPOS=36000239;//kernel.TextChar:239
      _this.size=s;
    }
  },
  draw :function _trc_func_36000251_3(ctx) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var rect;
    
    //$LASTPOS=36000269;//kernel.TextChar:269
    if (! _this.size) {
      //$LASTPOS=36000280;//kernel.TextChar:280
      _this.size=15;
    }
    //$LASTPOS=36000294;//kernel.TextChar:294
    if (! _this.align) {
      //$LASTPOS=36000306;//kernel.TextChar:306
      _this.align="left";
    }
    //$LASTPOS=36000325;//kernel.TextChar:325
    if (! _this.fillStyle) {
      //$LASTPOS=36000341;//kernel.TextChar:341
      _this.fillStyle="white";
    }
    //$LASTPOS=36000365;//kernel.TextChar:365
    ctx.fillStyle=_this.fillStyle;
    //$LASTPOS=36000395;//kernel.TextChar:395
    ctx.globalAlpha=_this.alpha/255;
    //$LASTPOS=36000432;//kernel.TextChar:432
    ctx.font=_this.size+"px 'ＭＳ Ｐゴシック'";
    //$LASTPOS=36000468;//kernel.TextChar:468
    rect = TextRect.draw(ctx,_this.text,_this.x,_this.y,_this.size,_this.align,"fill");
    //$LASTPOS=36000536;//kernel.TextChar:536
    _this.width=rect.w;
    //$LASTPOS=36000555;//kernel.TextChar:555
    _this.height=rect.h;
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.TextChar,{"fullName":"kernel.TextChar","namespace":"kernel","shortName":"TextChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.Boot=Tonyu.klass(Tonyu.classes.kernel.Actor,[Tonyu.classes.kernel.T2MediaPlayer],{
  main :function _trc_func_37000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001664;//kernel.Boot:1664
    _this.initSounds();
    //$LASTPOS=37001679;//kernel.Boot:1679
    _this.initSprites();
    //$LASTPOS=37001695;//kernel.Boot:1695
    Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
    //$LASTPOS=37001726;//kernel.Boot:1726
    Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
    //$LASTPOS=37001763;//kernel.Boot:1763
    _this.initThread();
    //$LASTPOS=37001780;//kernel.Boot:1780
    Tonyu.globals.$pat_fruits=30;
    //$LASTPOS=37001797;//kernel.Boot:1797
    Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
    //$LASTPOS=37001814;//kernel.Boot:1814
    Tonyu.globals.$Math=Math;
    //$LASTPOS=37001827;//kernel.Boot:1827
    Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=37001937;//kernel.Boot:1937
    Tonyu.globals.$consolePrintY=465-15;
    //$LASTPOS=37001961;//kernel.Boot:1961
    Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
    //$LASTPOS=37002101;//kernel.Boot:2101
    if (typeof  SplashScreen!="undefined") {
      //$LASTPOS=37002139;//kernel.Boot:2139
      SplashScreen.hide();
    }
    //$LASTPOS=37002161;//kernel.Boot:2161
    _this.initFPSParams();
    //$LASTPOS=37002181;//kernel.Boot:2181
    while (true) {
      //$LASTPOS=37002201;//kernel.Boot:2201
      _this.thg.steps();
      //$LASTPOS=37002219;//kernel.Boot:2219
      Tonyu.globals.$Keys.update();
      //$LASTPOS=37002240;//kernel.Boot:2240
      Tonyu.globals.$InputDevice.update();
      //$LASTPOS=37002268;//kernel.Boot:2268
      Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
      //$LASTPOS=37002301;//kernel.Boot:2301
      Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
      //$LASTPOS=37002338;//kernel.Boot:2338
      _this.doDraw=_this.now()<_this.deadLine;
      //$LASTPOS=37002366;//kernel.Boot:2366
      if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
        //$LASTPOS=37002420;//kernel.Boot:2420
        _this.doDraw=true;
        //$LASTPOS=37002442;//kernel.Boot:2442
        _this.resetDeadLine();
        
      }
      //$LASTPOS=37002471;//kernel.Boot:2471
      if (_this.doDraw) {
        //$LASTPOS=37002514;//kernel.Boot:2514
        Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002559;//kernel.Boot:2559
        Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002599;//kernel.Boot:2599
        Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
        //$LASTPOS=37002644;//kernel.Boot:2644
        Tonyu.globals.$Screen.draw();
        //$LASTPOS=37002669;//kernel.Boot:2669
        _this.fps_fpsCnt++;
        //$LASTPOS=37002693;//kernel.Boot:2693
        _this.frameSkipped=0;
        
      } else {
        //$LASTPOS=37002732;//kernel.Boot:2732
        _this.frameSkipped++;
        
      }
      //$LASTPOS=37002760;//kernel.Boot:2760
      Tonyu.globals.$Sprites.checkHit();
      //$LASTPOS=37002786;//kernel.Boot:2786
      _this.fps_rpsCnt++;
      //$LASTPOS=37002806;//kernel.Boot:2806
      _this.measureFps();
      //$LASTPOS=37002825;//kernel.Boot:2825
      _this.waitFrame();
      //$LASTPOS=37002852;//kernel.Boot:2852
      while (_this.paused) {
        //$LASTPOS=37002877;//kernel.Boot:2877
        _this.waitFor(Tonyu.timeout(1));
        //$LASTPOS=37002913;//kernel.Boot:2913
        if (! _this.paused) {
          //$LASTPOS=37002926;//kernel.Boot:2926
          _this.resetDeadLine();
        }
        
      }
      
    }
  },
  fiber$main :function _trc_func_37000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37000000_2(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001664;//kernel.Boot:1664
          _this.fiber$initSounds(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37001679;//kernel.Boot:1679
          _this.fiber$initSprites(_thread);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37001695;//kernel.Boot:1695
          Tonyu.globals.$InputDevice=new Tonyu.classes.kernel.InputDevice;
          //$LASTPOS=37001726;//kernel.Boot:1726
          Tonyu.globals.$InputDevice.initCanvasEvents(_this.cvj);
          //$LASTPOS=37001763;//kernel.Boot:1763
          _this.fiber$initThread(_thread);
          __pc=3;return;
        case 3:
          
          //$LASTPOS=37001780;//kernel.Boot:1780
          Tonyu.globals.$pat_fruits=30;
          //$LASTPOS=37001797;//kernel.Boot:1797
          Tonyu.globals.$Keys=new Tonyu.classes.kernel.Keys;
          //$LASTPOS=37001814;//kernel.Boot:1814
          Tonyu.globals.$Math=Math;
          //$LASTPOS=37001827;//kernel.Boot:1827
          Tonyu.globals.$consolePanel=new Tonyu.classes.kernel.Panel({align: "center",x: 465/2,y: 465/2,width: 465,height: 465,zOrder: - 10,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=37001937;//kernel.Boot:1937
          Tonyu.globals.$consolePrintY=465-15;
          //$LASTPOS=37001961;//kernel.Boot:1961
          Tonyu.globals.$panel=new Tonyu.classes.kernel.Panel({align: "center",x: Tonyu.globals.$screenWidth/2,y: Tonyu.globals.$screenHeight/2,width: Tonyu.globals.$screenWidth,height: Tonyu.globals.$screenHeight,zOrder: - 1,layer: Tonyu.globals.$FrontSprites});
          //$LASTPOS=37002101;//kernel.Boot:2101
          if (typeof  SplashScreen!="undefined") {
            //$LASTPOS=37002139;//kernel.Boot:2139
            SplashScreen.hide();
          }
          //$LASTPOS=37002161;//kernel.Boot:2161
          _this.initFPSParams();
          //$LASTPOS=37002181;//kernel.Boot:2181
        case 4:
          //$LASTPOS=37002201;//kernel.Boot:2201
          _this.thg.steps();
          //$LASTPOS=37002219;//kernel.Boot:2219
          Tonyu.globals.$Keys.update();
          //$LASTPOS=37002240;//kernel.Boot:2240
          Tonyu.globals.$InputDevice.update();
          //$LASTPOS=37002268;//kernel.Boot:2268
          Tonyu.globals.$screenWidth=Tonyu.globals.$Screen.width;
          //$LASTPOS=37002301;//kernel.Boot:2301
          Tonyu.globals.$screenHeight=Tonyu.globals.$Screen.height;
          //$LASTPOS=37002338;//kernel.Boot:2338
          _this.doDraw=_this.now()<_this.deadLine;
          //$LASTPOS=37002366;//kernel.Boot:2366
          if (! _this.doDraw&&_this.frameSkipped>=_this.maxFrameSkip) {
            //$LASTPOS=37002420;//kernel.Boot:2420
            _this.doDraw=true;
            //$LASTPOS=37002442;//kernel.Boot:2442
            _this.resetDeadLine();
            
          }
          //$LASTPOS=37002471;//kernel.Boot:2471
          if (_this.doDraw) {
            //$LASTPOS=37002514;//kernel.Boot:2514
            Tonyu.globals.$Screen.fillCanvas(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002559;//kernel.Boot:2559
            Tonyu.globals.$Sprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002599;//kernel.Boot:2599
            Tonyu.globals.$FrontSprites.draw(Tonyu.globals.$Screen.buf[0]);
            //$LASTPOS=37002644;//kernel.Boot:2644
            Tonyu.globals.$Screen.draw();
            //$LASTPOS=37002669;//kernel.Boot:2669
            _this.fps_fpsCnt++;
            //$LASTPOS=37002693;//kernel.Boot:2693
            _this.frameSkipped=0;
            
          } else {
            //$LASTPOS=37002732;//kernel.Boot:2732
            _this.frameSkipped++;
            
          }
          //$LASTPOS=37002760;//kernel.Boot:2760
          Tonyu.globals.$Sprites.checkHit();
          //$LASTPOS=37002786;//kernel.Boot:2786
          _this.fps_rpsCnt++;
          //$LASTPOS=37002806;//kernel.Boot:2806
          _this.measureFps();
          //$LASTPOS=37002825;//kernel.Boot:2825
          _this.fiber$waitFrame(_thread);
          __pc=5;return;
        case 5:
          
          //$LASTPOS=37002852;//kernel.Boot:2852
        case 6:
          if (!(_this.paused)) { __pc=8; break; }
          //$LASTPOS=37002877;//kernel.Boot:2877
          _this.fiber$waitFor(_thread, Tonyu.timeout(1));
          __pc=7;return;
        case 7:
          
          //$LASTPOS=37002913;//kernel.Boot:2913
          if (! _this.paused) {
            //$LASTPOS=37002926;//kernel.Boot:2926
            _this.resetDeadLine();
          }
          __pc=6;break;
        case 8:
          
          __pc=4;break;
        case 9:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  update :function _trc_func_37000187_3() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37000204;//kernel.Boot:204
    _this.waitFor(Tonyu.timeout(50));
  },
  fiber$update :function _trc_func_37000187_4(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37000187_5(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000204;//kernel.Boot:204
          _this.fiber$waitFor(_thread, Tonyu.timeout(50));
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSprites :function _trc_func_37000263_6() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_243;
    
    //$LASTPOS=37000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=37000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=37000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    //$LASTPOS=37000454;//kernel.Boot:454
    _this.waitFor(a);
    //$LASTPOS=37000471;//kernel.Boot:471
    _this.print("Loading pats..");
    //$LASTPOS=37000502;//kernel.Boot:502
    rs = Tonyu.globals.$currentProject.getResource();
    //$LASTPOS=37000545;//kernel.Boot:545
    a=_this.asyncResult();
    //$LASTPOS=37000567;//kernel.Boot:567
    ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
    //$LASTPOS=37000652;//kernel.Boot:652
    _this.waitFor(a);
    //$LASTPOS=37000669;//kernel.Boot:669
    r = a[0];
    //$LASTPOS=37000686;//kernel.Boot:686
    Tonyu.globals.$Sprites.setImageList(r);
    //$LASTPOS=37000717;//kernel.Boot:717
    _it_243=Tonyu.iterator(r.names,2);
    while(_it_243.next()) {
      name=_it_243[0];
      val=_it_243[1];
      
      //$LASTPOS=37000758;//kernel.Boot:758
      Tonyu.setGlobal(name,val);
      
    }
    //$LASTPOS=37000798;//kernel.Boot:798
    _this.print("Loading pats done.");
    //$LASTPOS=37000833;//kernel.Boot:833
    _this.cvj=$("canvas");
    //$LASTPOS=37000855;//kernel.Boot:855
    if (Tonyu.noviceMode) {
      //$LASTPOS=37000888;//kernel.Boot:888
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
      
    } else {
      //$LASTPOS=37000972;//kernel.Boot:972
      Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
      
    }
  },
  fiber$initSprites :function _trc_func_37000263_7(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var a;
    var rs;
    var r;
    var name;
    var val;
    var _it_243;
    
    //$LASTPOS=37000285;//kernel.Boot:285
    Tonyu.globals.$Sprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000314;//kernel.Boot:314
    Tonyu.globals.$FrontSprites=new Tonyu.classes.kernel.Sprites();
    //$LASTPOS=37000348;//kernel.Boot:348
    _this.print("Loading plugins..");
    //$LASTPOS=37000382;//kernel.Boot:382
    a = _this.asyncResult();
    //$LASTPOS=37000408;//kernel.Boot:408
    Tonyu.globals.$currentProject.loadPlugins(a.receiver);
    
    _thread.enter(function _trc_func_37000263_8(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37000454;//kernel.Boot:454
          _this.fiber$waitFor(_thread, a);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37000471;//kernel.Boot:471
          _this.print("Loading pats..");
          //$LASTPOS=37000502;//kernel.Boot:502
          rs = Tonyu.globals.$currentProject.getResource();
          //$LASTPOS=37000545;//kernel.Boot:545
          a=_this.asyncResult();
          //$LASTPOS=37000567;//kernel.Boot:567
          ImageList.load(rs.images,a.receiver,{baseDir: Tonyu.globals.$currentProject.getDir()});
          //$LASTPOS=37000652;//kernel.Boot:652
          _this.fiber$waitFor(_thread, a);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37000669;//kernel.Boot:669
          r = a[0];
          //$LASTPOS=37000686;//kernel.Boot:686
          Tonyu.globals.$Sprites.setImageList(r);
          //$LASTPOS=37000717;//kernel.Boot:717
          _it_243=Tonyu.iterator(r.names,2);
          while(_it_243.next()) {
            name=_it_243[0];
            val=_it_243[1];
            
            //$LASTPOS=37000758;//kernel.Boot:758
            Tonyu.setGlobal(name,val);
            
          }
          //$LASTPOS=37000798;//kernel.Boot:798
          _this.print("Loading pats done.");
          //$LASTPOS=37000833;//kernel.Boot:833
          _this.cvj=$("canvas");
          //$LASTPOS=37000855;//kernel.Boot:855
          if (Tonyu.noviceMode) {
            //$LASTPOS=37000888;//kernel.Boot:888
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 600,height: 300});
            
          } else {
            //$LASTPOS=37000972;//kernel.Boot:972
            Tonyu.globals.$Screen=new Tonyu.classes.kernel.ScaledCanvas({canvas: _this.cvj,width: 465,height: 465});
            
          }
          _thread.exit(_this);return;
        }
      }
    });
  },
  initSounds :function _trc_func_37001044_9() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    //$LASTPOS=37001099;//kernel.Boot:1099
    _this.initT2MediaPlayer();
    //$LASTPOS=37001125;//kernel.Boot:1125
    _this.loadFromProject(Tonyu.globals.$currentProject);
    //$LASTPOS=37001164;//kernel.Boot:1164
    _this.print("Loading sounds done.");
  },
  fiber$initSounds :function _trc_func_37001044_10(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    //$LASTPOS=37001065;//kernel.Boot:1065
    _this.print("Loading sounds...");
    
    _thread.enter(function _trc_func_37001044_11(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001099;//kernel.Boot:1099
          _this.fiber$initT2MediaPlayer(_thread);
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37001125;//kernel.Boot:1125
          _this.fiber$loadFromProject(_thread, Tonyu.globals.$currentProject);
          __pc=2;return;
        case 2:
          
          //$LASTPOS=37001164;//kernel.Boot:1164
          _this.print("Loading sounds done.");
          _thread.exit(_this);return;
        }
      }
    });
  },
  initThread :function _trc_func_37001204_12() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var o;
    var mainClassName;
    
    //$LASTPOS=37001225;//kernel.Boot:1225
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=37001272;//kernel.Boot:1272
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=37001318;//kernel.Boot:1318
    mainClassName = o.run.mainClass;
    //$LASTPOS=37001358;//kernel.Boot:1358
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=37001399;//kernel.Boot:1399
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=37001445;//kernel.Boot:1445
    if (! _this.mainClass) {
      //$LASTPOS=37001472;//kernel.Boot:1472
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=37001550;//kernel.Boot:1550
    Tonyu.runMode=true;
    //$LASTPOS=37001575;//kernel.Boot:1575
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=37001605;//kernel.Boot:1605
    new _this.mainClass();
  },
  fiber$initThread :function _trc_func_37001204_13(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var o;
    var mainClassName;
    
    //$LASTPOS=37001225;//kernel.Boot:1225
    Tonyu.globals.$mainThreadGroup=_this.thg=Tonyu.threadGroup();
    //$LASTPOS=37001272;//kernel.Boot:1272
    o = Tonyu.currentProject.getOptions();
    //$LASTPOS=37001318;//kernel.Boot:1318
    mainClassName = o.run.mainClass;
    //$LASTPOS=37001358;//kernel.Boot:1358
    _this.print("MainClass= "+mainClassName);
    //$LASTPOS=37001399;//kernel.Boot:1399
    _this.mainClass=Tonyu.getClass(mainClassName);
    //$LASTPOS=37001445;//kernel.Boot:1445
    if (! _this.mainClass) {
      //$LASTPOS=37001472;//kernel.Boot:1472
      TError(mainClassName+" というクラスはありません","不明",0).raise();
      
    }
    //$LASTPOS=37001550;//kernel.Boot:1550
    Tonyu.runMode=true;
    //$LASTPOS=37001575;//kernel.Boot:1575
    Tonyu.globals.$currentThreadGroup=_this.thg;
    //$LASTPOS=37001605;//kernel.Boot:1605
    new _this.mainClass();
    
    _thread.retVal=_this;return;
  },
  stop :function _trc_func_37001626_14() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37001641;//kernel.Boot:1641
    _this.fireEvent("stop");
  },
  fiber$stop :function _trc_func_37001626_15(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.enter(function _trc_func_37001626_16(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37001641;//kernel.Boot:1641
          _this.fiber$fireEvent(_thread, "stop");
          __pc=1;return;
        case 1:
          
          _thread.exit(_this);return;
        }
      }
    });
  },
  initFPSParams :function _trc_func_37002956_17() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003006;//kernel.Boot:3006
    _this._fps=30;
    //$LASTPOS=37003022;//kernel.Boot:3022
    _this.maxframeSkip=5;
    //$LASTPOS=37003072;//kernel.Boot:3072
    _this.frameCnt=0;
    //$LASTPOS=37003091;//kernel.Boot:3091
    _this.resetDeadLine();
    //$LASTPOS=37003113;//kernel.Boot:3113
    Tonyu.globals.$Boot=_this;
    //$LASTPOS=37003132;//kernel.Boot:3132
    _this.lastMeasured=_this.now();
    //$LASTPOS=37003157;//kernel.Boot:3157
    _this.fps_fps=_this.fps_rps=_this.fps_fpsCnt=_this.fps_rpsCnt=0;
  },
  now :function _trc_func_37003202_18() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return new Date().getTime();
  },
  resetDeadLine :function _trc_func_37003256_19() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003287;//kernel.Boot:3287
    _this.deadLine=_this.now()+1000/_this._fps;
    //$LASTPOS=37003318;//kernel.Boot:3318
    _this.frameSkipped=0;
  },
  waitFrame :function _trc_func_37003342_20() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    var wt;
    
    //$LASTPOS=37003362;//kernel.Boot:3362
    wt = _this.deadLine-_this.now();
    //$LASTPOS=37003390;//kernel.Boot:3390
    if (wt<1) {
      //$LASTPOS=37003411;//kernel.Boot:3411
      if (wt<- 1000) {
        //$LASTPOS=37003425;//kernel.Boot:3425
        _this.resetDeadLine();
      }
      //$LASTPOS=37003451;//kernel.Boot:3451
      wt=1;
      
    }
    //$LASTPOS=37003469;//kernel.Boot:3469
    wt=_this.floor(wt);
    //$LASTPOS=37003488;//kernel.Boot:3488
    _this.waitFor(Tonyu.timeout(wt));
    //$LASTPOS=37003521;//kernel.Boot:3521
    _this.deadLine+=1000/_this._fps;
  },
  fiber$waitFrame :function _trc_func_37003342_21(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    var wt;
    
    //$LASTPOS=37003362;//kernel.Boot:3362
    wt = _this.deadLine-_this.now();
    //$LASTPOS=37003390;//kernel.Boot:3390
    if (wt<1) {
      //$LASTPOS=37003411;//kernel.Boot:3411
      if (wt<- 1000) {
        //$LASTPOS=37003425;//kernel.Boot:3425
        _this.resetDeadLine();
      }
      //$LASTPOS=37003451;//kernel.Boot:3451
      wt=1;
      
    }
    //$LASTPOS=37003469;//kernel.Boot:3469
    wt=_this.floor(wt);
    
    _thread.enter(function _trc_func_37003342_22(_thread) {
      if (_thread.lastEx) __pc=_thread.catchPC;
      for(var __cnt=100 ; __cnt--;) {
        switch (__pc) {
        case 0:
          //$LASTPOS=37003488;//kernel.Boot:3488
          _this.fiber$waitFor(_thread, Tonyu.timeout(wt));
          __pc=1;return;
        case 1:
          
          //$LASTPOS=37003521;//kernel.Boot:3521
          _this.deadLine+=1000/_this._fps;
          _thread.exit(_this);return;
        }
      }
    });
  },
  getFrameRate :function _trc_func_37003548_23() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this._fps;
  },
  setFrameRate :function _trc_func_37003634_24(fps,maxFrameSkip) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37003681;//kernel.Boot:3681
    _this._fps=fps;
    //$LASTPOS=37003698;//kernel.Boot:3698
    if (typeof  maxFrameSkip!="number") {
      //$LASTPOS=37003733;//kernel.Boot:3733
      maxFrameSkip=5;
    }
    //$LASTPOS=37003754;//kernel.Boot:3754
    _this.maxFrameSkip=maxFrameSkip;
    //$LASTPOS=37003793;//kernel.Boot:3793
    _this.resetDeadLine();
  },
  getMeasuredFps :function _trc_func_37003843_25() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_fps;
  },
  getMeasuredRps :function _trc_func_37003922_26() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    return _this.fps_rps;
  },
  measureFps :function _trc_func_37003976_27() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=37004004;//kernel.Boot:4004
    if (_this.now()>_this.lastMeasured+1000) {
      //$LASTPOS=37004044;//kernel.Boot:4044
      _this.fps_fps=_this.fps_fpsCnt;
      //$LASTPOS=37004073;//kernel.Boot:4073
      _this.fps_rps=_this.fps_rpsCnt;
      //$LASTPOS=37004102;//kernel.Boot:4102
      _this.fps_fpsCnt=0;
      //$LASTPOS=37004125;//kernel.Boot:4125
      _this.fps_rpsCnt=0;
      //$LASTPOS=37004148;//kernel.Boot:4148
      _this.lastMeasured=_this.now();
      
    }
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.Boot,{"fullName":"kernel.Boot","namespace":"kernel","shortName":"Boot","decls":{"methods":{"main":{"nowait":false},"update":{"nowait":false},"initSprites":{"nowait":false},"initSounds":{"nowait":false},"initThread":{"nowait":false},"stop":{"nowait":false},"initFPSParams":{"nowait":true},"now":{"nowait":true},"resetDeadLine":{"nowait":true},"waitFrame":{"nowait":false},"getFrameRate":{"nowait":true},"setFrameRate":{"nowait":true},"getMeasuredFps":{"nowait":true},"getMeasuredRps":{"nowait":true},"measureFps":{"nowait":true}}}});

Tonyu.klass.ensureNamespace(Tonyu.classes,'kernel');
Tonyu.classes.kernel.DxChar=Tonyu.klass(Tonyu.classes.kernel.SpriteChar,[],{
  main :function _trc_func_38000000_0() {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
  },
  fiber$main :function _trc_func_38000000_1(_thread) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    //var _arguments=Tonyu.A(arguments);
    var __pc=0;
    
    
    _thread.retVal=_this;return;
  },
  initialize :function _trc_func_38000023_2(xx,yy,pp,ff,sz,rt,al) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000057;//kernel.DxChar:57
    Tonyu.classes.kernel.SpriteChar.apply( _this, [xx,yy,pp,ff]);
    //$LASTPOS=38000082;//kernel.DxChar:82
    _this.scaleX=1;
    //$LASTPOS=38000097;//kernel.DxChar:97
    if (sz) {
      //$LASTPOS=38000105;//kernel.DxChar:105
      _this.scaleX=sz;
    }
    //$LASTPOS=38000121;//kernel.DxChar:121
    _this.angle=0;
    //$LASTPOS=38000135;//kernel.DxChar:135
    if (rt) {
      //$LASTPOS=38000143;//kernel.DxChar:143
      _this.angle=rt;
    }
    //$LASTPOS=38000158;//kernel.DxChar:158
    _this.alpha=255;
    //$LASTPOS=38000174;//kernel.DxChar:174
    if (al) {
      //$LASTPOS=38000182;//kernel.DxChar:182
      _this.alpha=al;
    }
  },
  draw :function _trc_func_38000196_3(c) {
    var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
    
    //$LASTPOS=38000212;//kernel.DxChar:212
    _this.rotation=_this.angle;
    //$LASTPOS=38000233;//kernel.DxChar:233
    Tonyu.classes.kernel.SpriteChar.prototype.draw.apply( _this, [c]);
  },
  __dummy: false
});
Tonyu.klass.addMeta(Tonyu.classes.kernel.DxChar,{"fullName":"kernel.DxChar","namespace":"kernel","shortName":"DxChar","decls":{"methods":{"main":{"nowait":false},"new":{"nowait":false},"draw":{"nowait":true}}}});

