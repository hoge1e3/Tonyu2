Tonyu.klass.define({
  fullName: 'mapEditor2.Cursor',
  shortName: 'Cursor',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Cursor_main() {
        "use strict";
        var _this=this;
        
        
        
        
      },
      fiber$main :function _trc_Cursor_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        
        
        
        _thread.retVal=_this;return;
      },
      onAppear :function _trc_Cursor_onAppear() {
        "use strict";
        var _this=this;
        
        _this.undos=[];
      },
      fiber$onAppear :function _trc_Cursor_f_onAppear(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.undos=[];
        
        _thread.retVal=_this;return;
      },
      draw :function _trc_Cursor_draw(ctx) {
        "use strict";
        var _this=this;
        var w;
        var h;
        
        ctx.beginPath();
        ctx.strokeStyle="white";
        if (_this.dx==null) {
          _this.dx=_this.x;
        }
        if (_this.dy==null) {
          _this.dy=_this.y;
        }
        w = Tonyu.globals.$map.chipWidth;
        h = Tonyu.globals.$map.chipHeight;
        
        ctx.moveTo(_this.x*w,_this.y*h);
        ctx.lineTo((_this.dx+1)*w-1,_this.y*h);
        ctx.lineTo((_this.dx+1)*w-1,(_this.dy+1)*h-1);
        ctx.lineTo(_this.x*w,(_this.dy+1)*h-1);
        ctx.closePath();
        ctx.stroke();
      },
      move :function _trc_Cursor_move(dx,dy) {
        "use strict";
        var _this=this;
        
        _this.x+=dx;
        _this.y+=dy;
        _this.x=_this.clamp(_this.x,0,_this.min(250,Tonyu.globals.$map.col+30));
        _this.y=_this.clamp(_this.y,0,_this.min(250,Tonyu.globals.$map.row+30));
        dx=_this.x;
        dy=_this.y;
      },
      fiber$move :function _trc_Cursor_f_move(_thread,dx,dy) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x+=dx;
        _this.y+=dy;
        _this.x=_this.clamp(_this.x,0,_this.min(250,Tonyu.globals.$map.col+30));
        _this.y=_this.clamp(_this.y,0,_this.min(250,Tonyu.globals.$map.row+30));
        dx=_this.x;
        dy=_this.y;
        
        _thread.retVal=_this;return;
      },
      moveTo :function _trc_Cursor_moveTo(xx,yy) {
        "use strict";
        var _this=this;
        
        if (_this.x==xx&&_this.y==yy) {
          return false;
        }
        _this.x=xx;
        _this.y=yy;
        _this.dx=_this.x;
        _this.dy=_this.y;
        return true;
      },
      fiber$moveTo :function _trc_Cursor_f_moveTo(_thread,xx,yy) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (_this.x==xx&&_this.y==yy) {
          _thread.retVal=false;return;
          
        }
        _this.x=xx;
        _this.y=yy;
        _this.dx=_this.x;
        _this.dy=_this.y;
        _thread.retVal=true;return;
        
        
        _thread.retVal=_this;return;
      },
      clearUndos :function _trc_Cursor_clearUndos() {
        "use strict";
        var _this=this;
        
        _this.undos=[];
      },
      fiber$clearUndos :function _trc_Cursor_f_clearUndos(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.undos=[];
        
        _thread.retVal=_this;return;
      },
      rollbacker :function _trc_Cursor_rollbacker() {
        "use strict";
        var _this=this;
        var c;
        
        c = _this.undos.length;
        
        return {rollback: (function anonymous_795() {
          
          while (_this.undos.length>c) {
            _this.undo();
            
          }
        })};
      },
      fiber$rollbacker :function _trc_Cursor_f_rollbacker(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var c;
        
        c = _this.undos.length;
        
        
        _thread.enter(function _trc_Cursor_ent_rollbacker(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _thread.exit({rollback: (function anonymous_795() {
                
                while (_this.undos.length>c) {
                  _this.undo();
                  
                }
              })});return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      __getter__curLayerName :function _trc_Cursor___getter__curLayerName() {
        "use strict";
        var _this=this;
        
        return _this.curLayer.name;
      },
      __getter__curLayer :function _trc_Cursor___getter__curLayer() {
        "use strict";
        var _this=this;
        
        return _this.curP.curL;
      },
      undo :function _trc_Cursor_undo() {
        "use strict";
        var _this=this;
        var u;
        
        u = _this.undos.pop();
        
        if (! u) {
          return _this;
        }
        Tonyu.globals.$map.chip(u.x,u.y,u.layer.name).p=u.was;
      },
      fiber$undo :function _trc_Cursor_f_undo(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var u;
        
        u = _this.undos.pop();
        
        if (! u) {
          _thread.retVal=_this;return;
          
        }
        Tonyu.globals.$map.chip(u.x,u.y,u.layer.name).p=u.was;
        
        _thread.retVal=_this;return;
      },
      put :function _trc_Cursor_put(curP) {
        "use strict";
        var _this=this;
        var chip;
        var was;
        
        chip = Tonyu.globals.$map.chip(_this.x,_this.y,_this.curLayerName);
        
        was = chip.p;
        
        chip.p=curP.p;
        _this.undos.push({x: _this.x,y: _this.y,was: was,layer: _this.curLayer});
        Tonyu.globals.$editor.modified();
      },
      fiber$put :function _trc_Cursor_f_put(_thread,curP) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var chip;
        var was;
        
        chip = Tonyu.globals.$map.chip(_this.x,_this.y,_this.curLayerName);
        
        was = chip.p;
        
        chip.p=curP.p;
        _this.undos.push({x: _this.x,y: _this.y,was: was,layer: _this.curLayer});
        Tonyu.globals.$editor.modified();
        
        _thread.retVal=_this;return;
      },
      pick :function _trc_Cursor_pick(curP) {
        "use strict";
        var _this=this;
        var chip;
        
        chip = Tonyu.globals.$map.chip(_this.x,_this.y,_this.curLayerName);
        
        curP.set(chip.p);
        return true;
      },
      fiber$pick :function _trc_Cursor_f_pick(_thread,curP) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var chip;
        
        chip = Tonyu.globals.$map.chip(_this.x,_this.y,_this.curLayerName);
        
        curP.set(chip.p);
        _thread.retVal=true;return;
        
        
        _thread.retVal=_this;return;
      },
      sel :function _trc_Cursor_sel(dx,dy) {
        "use strict";
        var _this=this;
        
        if (dx==_this.x&&dy==_this.y) {
          return false;
        }
        if (dx>_this.x) {
          _this.dx=dx;
          
        } else {
          _this.dx=_this.x;
          _this.x=dx;
          
        }
        if (dy>_this.y) {
          _this.dy=dy;
          
        } else {
          _this.dy=_this.y;
          _this.y=dy;
          
        }
        return true;
      },
      fiber$sel :function _trc_Cursor_f_sel(_thread,dx,dy) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        if (dx==_this.x&&dy==_this.y) {
          _thread.retVal=false;return;
          
        }
        if (dx>_this.x) {
          _this.dx=dx;
          
        } else {
          _this.dx=_this.x;
          _this.x=dx;
          
        }
        if (dy>_this.y) {
          _this.dy=dy;
          
        } else {
          _this.dy=_this.y;
          _this.y=dy;
          
        }
        _thread.retVal=true;return;
        
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"onAppear":{"nowait":false},"draw":{"nowait":true},"move":{"nowait":false},"moveTo":{"nowait":false},"clearUndos":{"nowait":false},"rollbacker":{"nowait":false},"__getter__curLayerName":{"nowait":true},"__getter__curLayer":{"nowait":true},"undo":{"nowait":false},"put":{"nowait":false},"pick":{"nowait":false},"sel":{"nowait":false}},"fields":{"dx":{},"dy":{},"undos":{},"curP":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.DstCur',
  shortName: 'DstCur',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_DstCur_main() {
        "use strict";
        var _this=this;
        
        
      },
      fiber$main :function _trc_DstCur_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        
        _thread.retVal=_this;return;
      },
      draw :function _trc_DstCur_draw(ctx) {
        "use strict";
        var _this=this;
        
        ctx.beginPath();
        ctx.strokeStyle="red";
        ctx.moveTo(_this.x*32,_this.y*32);
        ctx.lineTo((_this.x+_this.col)*32-1,_this.y*32);
        ctx.lineTo((_this.x+_this.col)*32-1,(_this.y+_this.row)*32-1);
        ctx.lineTo(_this.x*32,(_this.y+_this.row)*32-1);
        ctx.closePath();
        ctx.stroke();
      },
      setFrom :function _trc_DstCur_setFrom(cur) {
        "use strict";
        var _this=this;
        
        _this.x=cur.x;
        _this.y=cur.y;
        _this.col=cur.dx-cur.x+1;
        _this.row=cur.dy-cur.y+1;
      },
      fiber$setFrom :function _trc_DstCur_f_setFrom(_thread,cur) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.x=cur.x;
        _this.y=cur.y;
        _this.col=cur.dx-cur.x+1;
        _this.row=cur.dy-cur.y+1;
        
        _thread.retVal=_this;return;
      },
      doCopy :function _trc_DstCur_doCopy(cur) {
        "use strict";
        var _this=this;
        var a;
        var i;
        var j;
        var p;
        
        a = [];
        
        i = 0;
        for (; i<_this.row ; i++) {
          {
            j = 0;
            for (; j<_this.col ; j++) {
              {
                p = Tonyu.globals.$map.get(cur.x+j,cur.y+i);
                
                a.push(p);
                p = Tonyu.globals.$map.getOn(cur.x+j,cur.y+i);
                
                a.push(p);
              }
            }
          }
        }
        i = 0;
        for (; i<_this.row ; i++) {
          {
            j = 0;
            for (; j<_this.col ; j++) {
              {
                Tonyu.globals.$map.set(_this.x+j,_this.y+i,a.shift());
                Tonyu.globals.$map.setOn(_this.x+j,_this.y+i,a.shift());
              }
            }
          }
        }
      },
      fiber$doCopy :function _trc_DstCur_f_doCopy(_thread,cur) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var a;
        var i;
        var j;
        var p;
        
        a = [];
        
        i = 0;
        for (; i<_this.row ; i++) {
          {
            j = 0;
            for (; j<_this.col ; j++) {
              {
                p = Tonyu.globals.$map.get(cur.x+j,cur.y+i);
                
                a.push(p);
                p = Tonyu.globals.$map.getOn(cur.x+j,cur.y+i);
                
                a.push(p);
              }
            }
          }
        }
        i = 0;
        for (; i<_this.row ; i++) {
          {
            j = 0;
            for (; j<_this.col ; j++) {
              {
                Tonyu.globals.$map.set(_this.x+j,_this.y+i,a.shift());
                Tonyu.globals.$map.setOn(_this.x+j,_this.y+i,a.shift());
              }
            }
          }
        }
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true},"setFrom":{"nowait":false},"doCopy":{"nowait":false}},"fields":{"row":{},"col":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.Edit',
  shortName: 'Edit',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_Edit_main() {
        "use strict";
        var _this=this;
        
        
        _this.config = _this.config||Tonyu.globals.$editorConfig;
        
        Tonyu.globals.$editor=_this;
        _this.mapFile=_this.mapFile||Tonyu.globals.$lastFile;
        Tonyu.globals.$lastFile=_this.mapFile;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map2;
        if (_this.mapFile.exists()) {
          Tonyu.globals.$map.load(_this.mapFile);
          
        }
        _this.expandLayers(Tonyu.globals.$map);
        Tonyu.globals.$map.expand="right bottom";
        _this.bw = 50;
        
        _this.h = Tonyu.globals.$screenHeight;
        
        _this.w = Tonyu.globals.$screenWidth;
        
        _this.bhide = 1000;
        
        new Tonyu.classes.kernel.Button({left: _this.bw*0.5-_this.bhide,top: _this.h-_this.bw*3,width: _this.bw,text: "↑",key: "up",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
        new Tonyu.classes.kernel.Button({left: _this.bw*0.5-_this.bhide,top: _this.h-_this.bw*1,width: _this.bw,text: "↓",key: "down",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
        new Tonyu.classes.kernel.Button({left: _this.bw*0-_this.bhide,top: _this.h-_this.bw*2,width: _this.bw,text: "←",key: "left",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
        new Tonyu.classes.kernel.Button({left: _this.bw*1-_this.bhide,top: _this.h-_this.bw*2,width: _this.bw,text: "→",key: "right",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
        _this.putB = new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*3,left: _this.bw*3-_this.bhide,width: 100,text: "Put",key: "space",onClick: Tonyu.bindFunc(_this,_this.put)});
        
        new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*3,left: _this.bw*5-_this.bhide,width: 100,text: "Pick",key: "z",onClick: Tonyu.bindFunc(_this,_this.pick)});
        if (_this.config.mainPage) {
          new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.bw*1,width: 100,text: "Play",key: "p",onClick: Tonyu.bindFunc(_this,_this.play)});
          
        }
        new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.bw*4,width: 100,text: "Exit",key: "e",onClick: Tonyu.bindFunc(_this,_this.back)});
        new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.w-100,width: 100,text: "Undo",key: "u",onClick: (function anonymous_1352() {
          
          _this.c.undo();
        })});
        if (_this.config.showHelp) {
          new Tonyu.classes.kernel.Label({x: 10,y: _this.h-_this.bw*3,text: "Left Click: Put\n"+"Right Click: Pick\n"+"Right Click x2: Change Layer\n"+"Right Click+drag: Copy Mode\n"+"wasd or Multi tap: Scroll",align: "left",size: 20});
          
        }
        _this.menuPanelHeight = _this.bw*(1+_this.config.layers.length);
        
        _this.sx = _this.w/2;
        _this.sy = _this.h/2;
        _this.zoom = 1;
        
        Tonyu.globals.$Screen.setPivot(_this.sx,_this.sy);
        Tonyu.globals.$Screen.scrollTo(_this.sx,_this.sy);
        _this.plw = Tonyu.globals.$Math.max.apply(Tonyu.globals.$Math,_this.config.layers.map((function anonymous_1997(l) {
          
          return l.pats.length;
        })));
        
        _this.curP = new Tonyu.classes.mapEditor2.PatList({config: _this.config,x: _this.w-_this.plw*32,y: _this.h-_this.menuPanelHeight});
        
        _this.c = new Tonyu.classes.mapEditor2.Cursor({x: 0,y: 0,curP: _this.curP});
        
        _this.on("keyDown","c",(function anonymous_2142() {
          
          _this.curP.shift(1);
        }));
        _this.on("keyDown","x",(function anonymous_2191() {
          
          _this.curP.shift(- 1);
        }));
        _this.on("keyDown","q",(function anonymous_2241() {
          
          _this.curP.changeLayer();
        }));
        _this.on("keyDown","d",(function anonymous_2289() {
          
          _this.scrollTo(_this.sx+32,_this.sy,_this.zoom);
        }));
        _this.on("keyDown","a",(function anonymous_2342() {
          
          _this.scrollTo(_this.sx-32,_this.sy,_this.zoom);
        }));
        _this.on("keyDown","s",(function anonymous_2395() {
          
          _this.scrollTo(_this.sx,_this.sy+32,_this.zoom);
        }));
        _this.on("keyDown","w",(function anonymous_2448() {
          
          _this.scrollTo(_this.sx,_this.sy-32,_this.zoom);
        }));
        
        _this.mmove = Tonyu.globals.$InputDevice.on("mouseMove",(function anonymous_2714(e) {
          var cv;
          
          if (_this.dstCur) {
            e.layer=Tonyu.globals.$frontLayer;
            cv = Tonyu.globals.$Screen.convert(e,Tonyu.globals.$mainLayer);
            
            _this.dstCur.x=_this.floor(cv.x/32);
            _this.dstCur.y=_this.floor(cv.y/32);
            
          }
        }));
        
        _this.on("die",(function anonymous_2930() {
          
          _this.mmove.remove();
        }));
        _this.menuPanel = new Tonyu.classes.kernel.Panel({width: _this.w,height: _this.menuPanelHeight,x: _this.w/2,y: _this.h-_this.menuPanelHeight/2,alpha: 180,zOrder: 100,layer: Tonyu.globals.$frontLayer});
        
        _this.menuPanel.fillStyle="gray";
        _this.menuPanel.fillRect(0,0,_this.menuPanel.width,_this.menuPanel.height);
        _this.mapToucher = new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$screenWidth,height: _this.h-_this.menuPanel.height,layer: Tonyu.globals.$frontLayer});
        
        
        _this.mapToucher.on("touch",(function anonymous_3371(e) {
          var f;
          var s;
          var moved;
          
          f = e.finger;
          
          f.layer=Tonyu.globals.$mainLayer;
          if (_this.singleTouchState) {
            if (! _this.multiTouchState) {
              _this.singleTouchState.rollback();
              _this.multiTouchState={finger1: _this.singleTouchState.finger,finger2: f};
              _this.procMulti(_this.multiTouchState);
              
            }
            return _this;
            
          } else {
            s = {rollbacker: _this.c.rollbacker(),finger: f,rollback: (function anonymous_3889() {
              
              s.rollbacker.rollback();
              s.endEvent.remove();
              if (s.moveEvent) {
                s.moveEvent.remove();
              }
            }),endEvent: f.on("end",(function anonymous_4078() {
              
              _this.singleTouchState=null;
            }))};
            
            _this.singleTouchState=s;
            
          }
          if (e.byMouse==2) {
            moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
            
            if (! moved) {
              _this.curP.changeLayer();
              
            }
            _this.pick();
            f.on("move",(function anonymous_4441(e) {
              var moved;
              
              moved = _this.c.sel(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
              
              if (! moved) {
                return _this;
              }
              if (! _this.dstCur) {
                _this.dstCur=new Tonyu.classes.mapEditor2.DstCur;
              }
              _this.dstCur.setFrom(_this.c);
            }));
            
          } else {
            if (_this.dstCur) {
              _this.dstCur.doCopy(_this.c);
              _this.dstCur.die();
              _this.dstCur=null;
              moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
              
              
            } else {
              moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
              
              _this.put();
              _this.singleTouchState.moveEvent=f.on("move",(function anonymous_5032(e) {
                var moved;
                
                moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                
                if (moved) {
                  _this.put();
                }
              }));
              
            }
            
          }
        }));
      },
      fiber$main :function _trc_Edit_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _this.config = _this.config||Tonyu.globals.$editorConfig;
        
        Tonyu.globals.$editor=_this;
        _this.mapFile=_this.mapFile||Tonyu.globals.$lastFile;
        Tonyu.globals.$lastFile=_this.mapFile;
        Tonyu.globals.$map=new Tonyu.classes.kernel.Map2;
        if (_this.mapFile.exists()) {
          Tonyu.globals.$map.load(_this.mapFile);
          
        }
        
        _thread.enter(function _trc_Edit_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$expandLayers(_thread, Tonyu.globals.$map);
              __pc=1;return;
            case 1:
              
              Tonyu.globals.$map.expand="right bottom";
              _this.bw = 50;
              
              _this.h = Tonyu.globals.$screenHeight;
              
              _this.w = Tonyu.globals.$screenWidth;
              
              _this.bhide = 1000;
              
              new Tonyu.classes.kernel.Button({left: _this.bw*0.5-_this.bhide,top: _this.h-_this.bw*3,width: _this.bw,text: "↑",key: "up",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
              new Tonyu.classes.kernel.Button({left: _this.bw*0.5-_this.bhide,top: _this.h-_this.bw*1,width: _this.bw,text: "↓",key: "down",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
              new Tonyu.classes.kernel.Button({left: _this.bw*0-_this.bhide,top: _this.h-_this.bw*2,width: _this.bw,text: "←",key: "left",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
              new Tonyu.classes.kernel.Button({left: _this.bw*1-_this.bhide,top: _this.h-_this.bw*2,width: _this.bw,text: "→",key: "right",onClick: Tonyu.bindFunc(_this,_this.moveC),autoRepeat: 30});
              _this.putB = new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*3,left: _this.bw*3-_this.bhide,width: 100,text: "Put",key: "space",onClick: Tonyu.bindFunc(_this,_this.put)});
              
              new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*3,left: _this.bw*5-_this.bhide,width: 100,text: "Pick",key: "z",onClick: Tonyu.bindFunc(_this,_this.pick)});
              if (_this.config.mainPage) {
                new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.bw*1,width: 100,text: "Play",key: "p",onClick: Tonyu.bindFunc(_this,_this.play)});
                
              }
              new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.bw*4,width: 100,text: "Exit",key: "e",onClick: Tonyu.bindFunc(_this,_this.back)});
              new Tonyu.classes.kernel.Button({top: _this.h-_this.bw*1,left: _this.w-100,width: 100,text: "Undo",key: "u",onClick: (function anonymous_1352() {
                
                _this.c.undo();
              })});
              if (_this.config.showHelp) {
                new Tonyu.classes.kernel.Label({x: 10,y: _this.h-_this.bw*3,text: "Left Click: Put\n"+"Right Click: Pick\n"+"Right Click x2: Change Layer\n"+"Right Click+drag: Copy Mode\n"+"wasd or Multi tap: Scroll",align: "left",size: 20});
                
              }
              _this.menuPanelHeight = _this.bw*(1+_this.config.layers.length);
              
              _this.sx = _this.w/2;
              _this.sy = _this.h/2;
              _this.zoom = 1;
              
              Tonyu.globals.$Screen.setPivot(_this.sx,_this.sy);
              Tonyu.globals.$Screen.scrollTo(_this.sx,_this.sy);
              _this.plw = Tonyu.globals.$Math.max.apply(Tonyu.globals.$Math,_this.config.layers.map((function anonymous_1997(l) {
                
                return l.pats.length;
              })));
              
              _this.curP = new Tonyu.classes.mapEditor2.PatList({config: _this.config,x: _this.w-_this.plw*32,y: _this.h-_this.menuPanelHeight});
              
              _this.c = new Tonyu.classes.mapEditor2.Cursor({x: 0,y: 0,curP: _this.curP});
              
              _this.on("keyDown","c",(function anonymous_2142() {
                
                _this.curP.shift(1);
              }));
              _this.on("keyDown","x",(function anonymous_2191() {
                
                _this.curP.shift(- 1);
              }));
              _this.on("keyDown","q",(function anonymous_2241() {
                
                _this.curP.changeLayer();
              }));
              _this.on("keyDown","d",(function anonymous_2289() {
                
                _this.scrollTo(_this.sx+32,_this.sy,_this.zoom);
              }));
              _this.on("keyDown","a",(function anonymous_2342() {
                
                _this.scrollTo(_this.sx-32,_this.sy,_this.zoom);
              }));
              _this.on("keyDown","s",(function anonymous_2395() {
                
                _this.scrollTo(_this.sx,_this.sy+32,_this.zoom);
              }));
              _this.on("keyDown","w",(function anonymous_2448() {
                
                _this.scrollTo(_this.sx,_this.sy-32,_this.zoom);
              }));
              
              _this.mmove = Tonyu.globals.$InputDevice.on("mouseMove",(function anonymous_2714(e) {
                var cv;
                
                if (_this.dstCur) {
                  e.layer=Tonyu.globals.$frontLayer;
                  cv = Tonyu.globals.$Screen.convert(e,Tonyu.globals.$mainLayer);
                  
                  _this.dstCur.x=_this.floor(cv.x/32);
                  _this.dstCur.y=_this.floor(cv.y/32);
                  
                }
              }));
              
              _this.on("die",(function anonymous_2930() {
                
                _this.mmove.remove();
              }));
              _this.menuPanel = new Tonyu.classes.kernel.Panel({width: _this.w,height: _this.menuPanelHeight,x: _this.w/2,y: _this.h-_this.menuPanelHeight/2,alpha: 180,zOrder: 100,layer: Tonyu.globals.$frontLayer});
              
              _this.menuPanel.fillStyle="gray";
              _this.menuPanel.fillRect(0,0,_this.menuPanel.width,_this.menuPanel.height);
              _this.mapToucher = new Tonyu.classes.kernel.Panel({width: Tonyu.globals.$screenWidth,height: _this.h-_this.menuPanel.height,layer: Tonyu.globals.$frontLayer});
              
              
              _this.mapToucher.on("touch",(function anonymous_3371(e) {
                var f;
                var s;
                var moved;
                
                f = e.finger;
                
                f.layer=Tonyu.globals.$mainLayer;
                if (_this.singleTouchState) {
                  if (! _this.multiTouchState) {
                    _this.singleTouchState.rollback();
                    _this.multiTouchState={finger1: _this.singleTouchState.finger,finger2: f};
                    _this.procMulti(_this.multiTouchState);
                    
                  }
                  return _this;
                  
                } else {
                  s = {rollbacker: _this.c.rollbacker(),finger: f,rollback: (function anonymous_3889() {
                    
                    s.rollbacker.rollback();
                    s.endEvent.remove();
                    if (s.moveEvent) {
                      s.moveEvent.remove();
                    }
                  }),endEvent: f.on("end",(function anonymous_4078() {
                    
                    _this.singleTouchState=null;
                  }))};
                  
                  _this.singleTouchState=s;
                  
                }
                if (e.byMouse==2) {
                  moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                  
                  if (! moved) {
                    _this.curP.changeLayer();
                    
                  }
                  _this.pick();
                  f.on("move",(function anonymous_4441(e) {
                    var moved;
                    
                    moved = _this.c.sel(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                    
                    if (! moved) {
                      return _this;
                    }
                    if (! _this.dstCur) {
                      _this.dstCur=new Tonyu.classes.mapEditor2.DstCur;
                    }
                    _this.dstCur.setFrom(_this.c);
                  }));
                  
                } else {
                  if (_this.dstCur) {
                    _this.dstCur.doCopy(_this.c);
                    _this.dstCur.die();
                    _this.dstCur=null;
                    moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                    
                    
                  } else {
                    moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                    
                    _this.put();
                    _this.singleTouchState.moveEvent=f.on("move",(function anonymous_5032(e) {
                      var moved;
                      
                      moved = _this.c.moveTo(_this.floor(e.finger.x/32),_this.floor(e.finger.y/32));
                      
                      if (moved) {
                        _this.put();
                      }
                    }));
                    
                  }
                  
                }
              }));
              _thread.exit(_this);return;
            }
          }
        });
      },
      expandLayers :function _trc_Edit_expandLayers(map) {
        "use strict";
        var _this=this;
        var c;
        var ls;
        var i;
        
        c = map.chipLayers;
        
        ls = _this.config.layers;
        
        i = 0;
        for (; i<ls.length ; i++) {
          {
            if (i<c.length) {
              c[i].name=ls[i].name;
            } else {
              map.addChipLayer(ls[i].name);
            }
          }
        }
      },
      fiber$expandLayers :function _trc_Edit_f_expandLayers(_thread,map) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var c;
        var ls;
        var i;
        
        c = map.chipLayers;
        
        ls = _this.config.layers;
        
        i = 0;
        for (; i<ls.length ; i++) {
          {
            if (i<c.length) {
              c[i].name=ls[i].name;
            } else {
              map.addChipLayer(ls[i].name);
            }
          }
        }
        
        _thread.retVal=_this;return;
      },
      scrollTo :function _trc_Edit_scrollTo(sx,sy,zoom) {
        "use strict";
        var _this=this;
        
        sx=_this.clamp(sx,0,240*32-_this.w/2);
        sy=_this.clamp(sy,0,240*32-_this.h/2);
        zoom=_this.clamp(zoom,0.1,5);
        Tonyu.globals.$Screen.scrollTo(sx,sy,zoom);
        _this.extend({sx: sx,sy: sy,zoom: zoom});
      },
      fiber$scrollTo :function _trc_Edit_f_scrollTo(_thread,sx,sy,zoom) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        sx=_this.clamp(sx,0,240*32-_this.w/2);
        sy=_this.clamp(sy,0,240*32-_this.h/2);
        zoom=_this.clamp(zoom,0.1,5);
        Tonyu.globals.$Screen.scrollTo(sx,sy,zoom);
        _this.extend({sx: sx,sy: sy,zoom: zoom});
        
        _thread.retVal=_this;return;
      },
      procMulti :function _trc_Edit_procMulti(m) {
        "use strict";
        var _this=this;
        var f1;
        var f2;
        var ox;
        var oy;
        var ssx;
        var ssy;
        var od;
        var sz;
        var h;
        function mv() {
          var nx;
          var ny;
          var d;
          
          nx = (f1.x+f2.x)/2;
          
          ny = (f1.y+f2.y)/2;
          
          d = _this.dist(f1.x-f2.x,f1.y-f2.y);
          
          _this.scrollTo(ssx-(nx-ox)/_this.zoom,ssy-(ny-oy)/_this.zoom,sz*(d/od));
        }function ed() {
          var e;
          var _it_40;
          
          _it_40=Tonyu.iterator(h,1);
          while(_it_40.next()) {
            e=_it_40[0];
            
            e.remove();
          }
          _this.singleTouchState=_this.multiTouchState=null;
        }
        f1 = m.finger1;
        
        f2 = m.finger2;
        
        f1.layer=Tonyu.globals.$frontLayer;
        f2.layer=Tonyu.globals.$frontLayer;
        ox = (f1.x+f2.x)/2;
        
        oy = (f1.y+f2.y)/2;
        
        ssx = _this.sx;
        ssy = _this.sy;
        
        od = _this.dist(f1.x-f2.x,f1.y-f2.y);
        
        sz = _this.zoom;
        
        h = [f1.on("move",mv),f2.on("move",mv),f1.on("end",ed),f2.on("end",ed)];
        
        
        
      },
      fiber$procMulti :function _trc_Edit_f_procMulti(_thread,m) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var f1;
        var f2;
        var ox;
        var oy;
        var ssx;
        var ssy;
        var od;
        var sz;
        var h;
        function mv() {
          var nx;
          var ny;
          var d;
          
          nx = (f1.x+f2.x)/2;
          
          ny = (f1.y+f2.y)/2;
          
          d = _this.dist(f1.x-f2.x,f1.y-f2.y);
          
          _this.scrollTo(ssx-(nx-ox)/_this.zoom,ssy-(ny-oy)/_this.zoom,sz*(d/od));
        }function ed() {
          var e;
          var _it_40;
          
          _it_40=Tonyu.iterator(h,1);
          while(_it_40.next()) {
            e=_it_40[0];
            
            e.remove();
          }
          _this.singleTouchState=_this.multiTouchState=null;
        }
        f1 = m.finger1;
        
        f2 = m.finger2;
        
        f1.layer=Tonyu.globals.$frontLayer;
        f2.layer=Tonyu.globals.$frontLayer;
        ox = (f1.x+f2.x)/2;
        
        oy = (f1.y+f2.y)/2;
        
        ssx = _this.sx;
        ssy = _this.sy;
        
        od = _this.dist(f1.x-f2.x,f1.y-f2.y);
        
        sz = _this.zoom;
        
        h = [f1.on("move",mv),f2.on("move",mv),f1.on("end",ed),f2.on("end",ed)];
        
        
        
        
        _thread.retVal=_this;return;
      },
      moveC :function _trc_Edit_moveC(b) {
        "use strict";
        var _this=this;
        
        switch (b.key) {
        case "up":
          _this.c.move(0,- 1);
          if (_this.putB.clicked) {
            _this.put();
          }
          break;
          
        case "down":
          _this.c.move(0,1);
          if (_this.putB.clicked) {
            _this.put();
          }
          break;
          
        case "left":
          _this.c.move(- 1,0);
          if (_this.putB.clicked) {
            _this.put();
          }
          break;
          
        case "right":
          _this.c.move(1,0);
          if (_this.putB.clicked) {
            _this.put();
          }
          break;
          
        }
      },
      fiber$moveC :function _trc_Edit_f_moveC(_thread,b) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Edit_ent_moveC(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              switch (b.key) {
              case "up":
                __pc=1     ;break;
              case "down":
                __pc=4     ;break;
              case "left":
                __pc=7     ;break;
              case "right":
                __pc=10    ;break;
              default:
                __pc=13    ;break;
                
              }
              break;
            case 1     :
              _this.c.move(0,- 1);
              if (!(_this.putB.clicked)) { __pc=3     ; break; }
              _this.fiber$put(_thread);
              __pc=2;return;
            case 2:
              
            case 3     :
              
              __pc=13    ; break;
              
            case 4     :
              _this.c.move(0,1);
              if (!(_this.putB.clicked)) { __pc=6     ; break; }
              _this.fiber$put(_thread);
              __pc=5;return;
            case 5:
              
            case 6     :
              
              __pc=13    ; break;
              
            case 7     :
              _this.c.move(- 1,0);
              if (!(_this.putB.clicked)) { __pc=9     ; break; }
              _this.fiber$put(_thread);
              __pc=8;return;
            case 8:
              
            case 9     :
              
              __pc=13    ; break;
              
            case 10    :
              _this.c.move(1,0);
              if (!(_this.putB.clicked)) { __pc=12    ; break; }
              _this.fiber$put(_thread);
              __pc=11;return;
            case 11:
              
            case 12    :
              
              __pc=13    ; break;
              
              case 13    :
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      put :function _trc_Edit_put() {
        "use strict";
        var _this=this;
        
        _this.c.put(_this.curP);
      },
      fiber$put :function _trc_Edit_f_put(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.c.put(_this.curP);
        
        _thread.retVal=_this;return;
      },
      pick :function _trc_Edit_pick() {
        "use strict";
        var _this=this;
        
        _this.c.pick(_this.curP);
      },
      fiber$pick :function _trc_Edit_f_pick(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.c.pick(_this.curP);
        
        _thread.retVal=_this;return;
      },
      save :function _trc_Edit_save() {
        "use strict";
        var _this=this;
        
        Tonyu.globals.$map.save(_this.mapFile);
      },
      fiber$save :function _trc_Edit_f_save(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        Tonyu.globals.$map.save(_this.mapFile);
        
        _thread.retVal=_this;return;
      },
      play :function _trc_Edit_play() {
        "use strict";
        var _this=this;
        
        _this.save();
        _this.loadPage(_this.config.mainPage,{mapFile: _this.mapFile});
      },
      fiber$play :function _trc_Edit_f_play(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Edit_ent_play(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$save(_thread);
              __pc=1;return;
            case 1:
              
              _this.fiber$loadPage(_thread, _this.config.mainPage, {mapFile: _this.mapFile});
              __pc=2;return;
            case 2:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      back :function _trc_Edit_back() {
        "use strict";
        var _this=this;
        
        _this.save();
        _this.loadPage(Tonyu.classes.mapEditor2.MapFiles,{config: _this.config});
      },
      fiber$back :function _trc_Edit_f_back(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.enter(function _trc_Edit_ent_back(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$save(_thread);
              __pc=1;return;
            case 1:
              
              _this.fiber$loadPage(_thread, Tonyu.classes.mapEditor2.MapFiles, {config: _this.config});
              __pc=2;return;
            case 2:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      modified :function _trc_Edit_modified() {
        "use strict";
        var _this=this;
        
      },
      fiber$modified :function _trc_Edit_f_modified(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"expandLayers":{"nowait":false},"scrollTo":{"nowait":false},"procMulti":{"nowait":false},"moveC":{"nowait":false},"put":{"nowait":false},"pick":{"nowait":false},"save":{"nowait":false},"play":{"nowait":false},"back":{"nowait":false},"modified":{"nowait":false}},"fields":{"mapFile":{},"config":{},"bw":{},"h":{},"w":{},"bhide":{},"putB":{},"menuPanelHeight":{},"sx":{},"sy":{},"zoom":{},"plw":{},"curP":{},"c":{},"dstCur":{},"mmove":{},"menuPanel":{},"mapToucher":{},"singleTouchState":{},"multiTouchState":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.MapFiles',
  shortName: 'MapFiles',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_MapFiles_main() {
        "use strict";
        var _this=this;
        var _it_43;
        
        _this.config = _this.config||Tonyu.globals.$editorConfig;
        
        _this.mapEXT = ".json";
        
        _this.mapDir = _this.config.mapDir;
        
        if (! _this.mapDir.exists()) {
          _this.mapDir.mkdir();
        }
        Tonyu.globals.$InputBox.useNative=true;
        Tonyu.globals.$Screen.resize(600,800);
        Tonyu.globals.$Screen.setPivot(0,0);
        Tonyu.globals.$Screen.scrollTo(0,0);
        Tonyu.globals.$sound.stopBGM();
        _this.y=20;
        _this.pitch = 50;
        
        _it_43=Tonyu.iterator(_this.mapDir.listFiles(),1);
        while(_it_43.next()) {
          _this.mf=_it_43[0];
          
          if (_this.mf.ext()!==".json") {
            return _this;
          }
          _this.item(_this.mf,_this.y);
          _this.y+=_this.pitch;
          
        }
        _this.newItem(_this.y);
        _this.y+=_this.pitch;
        _this.backItem(_this.y);
      },
      fiber$main :function _trc_MapFiles_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var _it_43;
        
        _this.config = _this.config||Tonyu.globals.$editorConfig;
        
        _this.mapEXT = ".json";
        
        _this.mapDir = _this.config.mapDir;
        
        if (! _this.mapDir.exists()) {
          _this.mapDir.mkdir();
        }
        Tonyu.globals.$InputBox.useNative=true;
        Tonyu.globals.$Screen.resize(600,800);
        Tonyu.globals.$Screen.setPivot(0,0);
        Tonyu.globals.$Screen.scrollTo(0,0);
        Tonyu.globals.$sound.stopBGM();
        _this.y=20;
        _this.pitch = 50;
        
        
        _thread.enter(function _trc_MapFiles_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _it_43=Tonyu.iterator(_this.mapDir.listFiles(),1);
            case 1:
              if (!(_it_43.next())) { __pc=4     ; break; }
              _this.mf=_it_43[0];
              
              if (!(_this.mf.ext()!==".json")) { __pc=2     ; break; }
              _thread.exit(_this);return;
            case 2     :
              
              _this.fiber$item(_thread, _this.mf, _this.y);
              __pc=3;return;
            case 3:
              
              _this.y+=_this.pitch;
              __pc=1;break;
            case 4     :
              
              _this.fiber$newItem(_thread, _this.y);
              __pc=5;return;
            case 5:
              
              _this.y+=_this.pitch;
              _this.fiber$backItem(_thread, _this.y);
              __pc=6;return;
            case 6:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      newItem :function _trc_MapFiles_newItem(y) {
        "use strict";
        var _this=this;
        var b;
        
        b = new Tonyu.classes.kernel.Button({left: 10,top: y,width: 100,padding: 2,height: _this.pitch*0.7,text: "New.."});
        
        b.on("touch",(function anonymous_556() {
          var name;
          
          name = _this.uniqFile(_this.mapDir,"map",_this.mapEXT).truncExt();
          
          name=Tonyu.globals.$InputBox.prompt("New File Name",name);
          if (name) {
            name=name.replace(/\.json$/,"");
            name=name+".json";
            _this.loadPage(Tonyu.classes.mapEditor2.Edit,{config: _this.config,mapFile: _this.mapDir.rel(name)});
            
          }
        }));
      },
      fiber$newItem :function _trc_MapFiles_f_newItem(_thread,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var b;
        
        b = new Tonyu.classes.kernel.Button({left: 10,top: y,width: 100,padding: 2,height: _this.pitch*0.7,text: "New.."});
        
        
        _thread.enter(function _trc_MapFiles_ent_newItem(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              b.on("touch",(function anonymous_556() {
                var name;
                
                name = _this.uniqFile(_this.mapDir,"map",_this.mapEXT).truncExt();
                
                name=Tonyu.globals.$InputBox.prompt("New File Name",name);
                if (name) {
                  name=name.replace(/\.json$/,"");
                  name=name+".json";
                  _this.loadPage(Tonyu.classes.mapEditor2.Edit,{config: _this.config,mapFile: _this.mapDir.rel(name)});
                  
                }
              }));
              _thread.exit(_this);return;
            }
          }
        });
      },
      backItem :function _trc_MapFiles_backItem(y) {
        "use strict";
        var _this=this;
        var b;
        
        if (! _this.config.titlePage) {
          return _this;
        }
        b = new Tonyu.classes.kernel.Button({left: 10,top: y,width: 100,padding: 2,height: _this.pitch*0.7,text: "Title"});
        
        b.on("touch",(function anonymous_1041() {
          
          _this.loadPage(_this.config.titlePage);
        }));
      },
      fiber$backItem :function _trc_MapFiles_f_backItem(_thread,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var b;
        
        if (! _this.config.titlePage) {
          _thread.retVal=_this;return;
          
        }
        b = new Tonyu.classes.kernel.Button({left: 10,top: y,width: 100,padding: 2,height: _this.pitch*0.7,text: "Title"});
        
        
        _thread.enter(function _trc_MapFiles_ent_backItem(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              b.on("touch",(function anonymous_1041() {
                
                _this.loadPage(_this.config.titlePage);
              }));
              _thread.exit(_this);return;
            }
          }
        });
      },
      item :function _trc_MapFiles_item(file,y) {
        "use strict";
        var _this=this;
        var name;
        var b;
        var xx;
        
        name = file.truncExt();
        
        new Tonyu.classes.kernel.Actor({text: name,align: "left",x: 10,y: y,size: 30});
        
        xx = 400;
        
        b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Edit"});
        b.on("touch",(function anonymous_1335() {
          
          _this.loadPage(Tonyu.classes.mapEditor2.Edit,{config: _this.config,mapFile: file});
        }));
        xx-=100;
        if (_this.config.mainPage) {
          b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Play"});
          b.on("touch",(function anonymous_1557() {
            
            _this.loadPage(_this.config.mainPage,{mapFile: file});
          }));
          
        }
        xx-=100;
        b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Copy"});
        b.on("touch",(function anonymous_1761() {
          var nname;
          
          name=_this.uniqFile(file.up(),file.truncExt(),_this.mapEXT).truncExt();
          nname = Tonyu.globals.$InputBox.prompt("New File Name",name);
          
          if (nname&&name!==nname) {
            file.copyTo(file.sibling(nname+_this.mapEXT));
            _this.loadPage(Tonyu.classes.mapEditor2.MapFiles,{config: _this.config});
            
          }
        }));
        xx-=100;
        b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Del",fillStyle: "#f88"});
        b.on("touch",(function anonymous_2230() {
          var r;
          
          r = Tonyu.globals.$InputBox.confirm("Delete "+name+"?");
          
          if (r) {
            file.rm();
            _this.loadPage(Tonyu.classes.mapEditor2.MapFiles,{config: _this.config});
            
          }
        }));
      },
      fiber$item :function _trc_MapFiles_f_item(_thread,file,y) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var name;
        var b;
        var xx;
        
        name = file.truncExt();
        
        new Tonyu.classes.kernel.Actor({text: name,align: "left",x: 10,y: y,size: 30});
        
        xx = 400;
        
        b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Edit"});
        
        _thread.enter(function _trc_MapFiles_ent_item(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              b.on("touch",(function anonymous_1335() {
                
                _this.loadPage(Tonyu.classes.mapEditor2.Edit,{config: _this.config,mapFile: file});
              }));
              xx-=100;
              if (!(_this.config.mainPage)) { __pc=1     ; break; }
              b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Play"});
              b.on("touch",(function anonymous_1557() {
                
                _this.loadPage(_this.config.mainPage,{mapFile: file});
              }));
            case 1     :
              
              xx-=100;
              b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Copy"});
              b.on("touch",(function anonymous_1761() {
                var nname;
                
                name=_this.uniqFile(file.up(),file.truncExt(),_this.mapEXT).truncExt();
                nname = Tonyu.globals.$InputBox.prompt("New File Name",name);
                
                if (nname&&name!==nname) {
                  file.copyTo(file.sibling(nname+_this.mapEXT));
                  _this.loadPage(Tonyu.classes.mapEditor2.MapFiles,{config: _this.config});
                  
                }
              }));
              xx-=100;
              b=new Tonyu.classes.kernel.Button({left: Tonyu.globals.$screenWidth-xx,top: y,width: 100,padding: 2,height: _this.pitch*0.8,text: "Del",fillStyle: "#f88"});
              b.on("touch",(function anonymous_2230() {
                var r;
                
                r = Tonyu.globals.$InputBox.confirm("Delete "+name+"?");
                
                if (r) {
                  file.rm();
                  _this.loadPage(Tonyu.classes.mapEditor2.MapFiles,{config: _this.config});
                  
                }
              }));
              _thread.exit(_this);return;
            }
          }
        });
      },
      uniqFile :function _trc_MapFiles_uniqFile(dir,name,ext) {
        "use strict";
        var _this=this;
        var res;
        var i;
        var j;
        
        name=name.replace(/\d*$/,"");
        res = dir.rel(name+ext);
        
        i = 1;
        
        j = 0;
        for (; j<100 ; j++) {
          {
            res=dir.rel(name+i+ext);
            if (! res.exists()) {
              break;
              
            }
            i++;
          }
        }
        return res;
      },
      fiber$uniqFile :function _trc_MapFiles_f_uniqFile(_thread,dir,name,ext) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var res;
        var i;
        var j;
        
        name=name.replace(/\d*$/,"");
        res = dir.rel(name+ext);
        
        i = 1;
        
        j = 0;
        for (; j<100 ; j++) {
          {
            res=dir.rel(name+i+ext);
            if (! res.exists()) {
              break;
              
            }
            i++;
          }
        }
        _thread.retVal=res;return;
        
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"newItem":{"nowait":false},"backItem":{"nowait":false},"item":{"nowait":false},"uniqFile":{"nowait":false}},"fields":{"config":{},"mapEXT":{},"mapDir":{},"pitch":{},"mf":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.PatList',
  shortName: 'PatList',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_PatList_main() {
        "use strict";
        var _this=this;
        
        "field strict";
        
        
        
        _this.layers = _this.config.layers;
        
        _this.curL = _this.layers[0];
        
        _this.savePats = [];
        
        _this.bw = 50;
        
        _this.patSels = _this.config.layers.map((function anonymous_259(layer,lidx) {
          
          return layer.pats.map((function anonymous_301(p,i) {
            
            return new Tonyu.classes.mapEditor2.PatSel({y: _this.y+(_this.config.layers.length-1-lidx)*_this.bw+16,x: _this.x+32*i,p: p,la: layer});
          }));
        }));
        
        _this.savePats=_this.layers.map((function anonymous_432(layer) {
          
          return layer.pats[_this.clamp(1,0,layer.pats.length-1)];
        }));
        _this.p=_this.savePats[_this.curL];
        _this.cursor = new Tonyu.classes.kernel.Actor({x: 0,y: 0,layer: _this.layer,text: "▲"});
        
        _this.size=20;
        _this.shift(0);
      },
      fiber$main :function _trc_PatList_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        "field strict";
        
        
        
        _this.layers = _this.config.layers;
        
        _this.curL = _this.layers[0];
        
        _this.savePats = [];
        
        _this.bw = 50;
        
        _this.patSels = _this.config.layers.map((function anonymous_259(layer,lidx) {
          
          return layer.pats.map((function anonymous_301(p,i) {
            
            return new Tonyu.classes.mapEditor2.PatSel({y: _this.y+(_this.config.layers.length-1-lidx)*_this.bw+16,x: _this.x+32*i,p: p,la: layer});
          }));
        }));
        
        _this.savePats=_this.layers.map((function anonymous_432(layer) {
          
          return layer.pats[_this.clamp(1,0,layer.pats.length-1)];
        }));
        _this.p=_this.savePats[_this.curL];
        _this.cursor = new Tonyu.classes.kernel.Actor({x: 0,y: 0,layer: _this.layer,text: "▲"});
        
        _this.size=20;
        
        _thread.enter(function _trc_PatList_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$shift(_thread, 0);
              __pc=1;return;
            case 1:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      draw :function _trc_PatList_draw() {
        "use strict";
        var _this=this;
        
      },
      __getter__curLIndex :function _trc_PatList___getter__curLIndex() {
        "use strict";
        var _this=this;
        
        return _this.layers.indexOf(_this.curL);
      },
      __setter__curLIndex :function _trc_PatList___setter__curLIndex(v) {
        "use strict";
        var _this=this;
        
        _this.curL=_this.layers[v];
      },
      changeLayer :function _trc_PatList_changeLayer() {
        "use strict";
        var _this=this;
        var i;
        
        i = _this.curLIndex;
        
        _this.savePats[i]=_this.p;
        i=(i+1)%_this.layers.length;
        _this.p=_this.savePats[i];
        _this.curLIndex=i;
        _this.shift(0);
      },
      fiber$changeLayer :function _trc_PatList_f_changeLayer(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var i;
        
        i = _this.curLIndex;
        
        _this.savePats[i]=_this.p;
        i=(i+1)%_this.layers.length;
        _this.p=_this.savePats[i];
        _this.curLIndex=i;
        
        _thread.enter(function _trc_PatList_ent_changeLayer(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$shift(_thread, 0);
              __pc=1;return;
            case 1:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __getter__defaultLayer :function _trc_PatList___getter__defaultLayer() {
        "use strict";
        var _this=this;
        
        return Tonyu.globals.$frontLayer;
      },
      shift :function _trc_PatList_shift(by) {
        "use strict";
        var _this=this;
        var a;
        var i;
        
        a = _this.patSels[_this.curLIndex];
        
        i = 0;
        for (; i<a.length ; i++) {
          {
            if (a[i].p===_this.p&&! _this.clamped(i+by,0,a.length-1)) {
              _this.p=a[i+by].p;
              _this.cursor.x=a[i+by].x;
              _this.cursor.y=a[i+by].y+16;
              break;
              
              
            }
          }
        }
      },
      fiber$shift :function _trc_PatList_f_shift(_thread,by) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var a;
        var i;
        
        a = _this.patSels[_this.curLIndex];
        
        i = 0;
        for (; i<a.length ; i++) {
          {
            if (a[i].p===_this.p&&! _this.clamped(i+by,0,a.length-1)) {
              _this.p=a[i+by].p;
              _this.cursor.x=a[i+by].x;
              _this.cursor.y=a[i+by].y+16;
              break;
              
              
            }
          }
        }
        
        _thread.retVal=_this;return;
      },
      set :function _trc_PatList_set(p,la) {
        "use strict";
        var _this=this;
        var preP;
        var preL;
        
        preP = _this.p;
        preL = _this.curL;
        
        _this.curL=la||_this.curL;
        _this.p=p;
        if (preP==_this.p&&preL==_this.curL) {
          return false;
          
        }
        _this.shift(0);
        return true;
      },
      fiber$set :function _trc_PatList_f_set(_thread,p,la) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        var preP;
        var preL;
        
        preP = _this.p;
        preL = _this.curL;
        
        _this.curL=la||_this.curL;
        _this.p=p;
        if (preP==_this.p&&preL==_this.curL) {
          _thread.retVal=false;return;
          
          
        }
        
        _thread.enter(function _trc_PatList_ent_set(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$shift(_thread, 0);
              __pc=1;return;
            case 1:
              
              _thread.exit(true);return;
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true},"__getter__curLIndex":{"nowait":true},"__setter__curLIndex":{"nowait":true},"changeLayer":{"nowait":false},"__getter__defaultLayer":{"nowait":true},"shift":{"nowait":false},"set":{"nowait":false}},"fields":{"editor":{},"config":{},"patSels":{},"layers":{},"curL":{},"savePats":{},"bw":{},"cursor":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.PatSel',
  shortName: 'PatSel',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_PatSel_main() {
        "use strict";
        var _this=this;
        
        
        _this.on("touch",Tonyu.bindFunc(_this,_this.sel));
      },
      fiber$main :function _trc_PatSel_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        
        _this.on("touch",Tonyu.bindFunc(_this,_this.sel));
        
        _thread.retVal=_this;return;
      },
      draw :function _trc_PatSel_draw(ctx) {
        "use strict";
        var _this=this;
        
        if (_this.p>- 1) {
          if (_this.width&&_this.height) {
            _this.scaleX=32/_this.width;
            _this.scaleY=32/_this.height;
            
          }
          return __superClass.prototype.draw.apply( _this, [ctx]);
          
        }
        _this.text="Del";
        _this.fillStyle="white";
        __superClass.prototype.draw.apply( _this, [ctx]);
        _this.width=32;
        _this.height=32;
        _this.text=null;
      },
      __getter__defaultLayer :function _trc_PatSel___getter__defaultLayer() {
        "use strict";
        var _this=this;
        
        return Tonyu.globals.$frontLayer;
      },
      sel :function _trc_PatSel_sel(e) {
        "use strict";
        var _this=this;
        
        Tonyu.globals.$editor.curP.set(_this.p,_this.la);
      },
      fiber$sel :function _trc_PatSel_f_sel(_thread,e) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        Tonyu.globals.$editor.curP.set(_this.p,_this.la);
        
        _thread.retVal=_this;return;
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true},"__getter__defaultLayer":{"nowait":true},"sel":{"nowait":false}},"fields":{"la":{}}}
});
Tonyu.klass.define({
  fullName: 'mapEditor2.StartMapEditor',
  shortName: 'StartMapEditor',
  namespace: 'mapEditor2',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: function (__superClass) {
    return {
      main :function _trc_StartMapEditor_main() {
        "use strict";
        var _this=this;
        
        _this.bp = Tonyu.globals.$pat_mapchip;
        
        Tonyu.globals.$editorConfig={layers: [{name: "base",pats: [- 1,_this.bp+88,_this.bp+89,_this.bp+90,_this.bp+91]},{name: "on",pats: [- 1,_this.bp+1,_this.bp+2,_this.bp+3,_this.bp+4,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_neko+10]}],mapDir: _this.file("../maps/"),showHelp: true};
        _this.loadPage(Tonyu.classes.mapEditor2.MapFiles);
      },
      fiber$main :function _trc_StartMapEditor_f_main(_thread) {
        "use strict";
        var _this=this;
        //var _arguments=Tonyu.A(arguments);
        var __pc=0;
        
        _this.bp = Tonyu.globals.$pat_mapchip;
        
        Tonyu.globals.$editorConfig={layers: [{name: "base",pats: [- 1,_this.bp+88,_this.bp+89,_this.bp+90,_this.bp+91]},{name: "on",pats: [- 1,_this.bp+1,_this.bp+2,_this.bp+3,_this.bp+4,Tonyu.globals.$pat_neko,Tonyu.globals.$pat_neko+10]}],mapDir: _this.file("../maps/"),showHelp: true};
        
        _thread.enter(function _trc_StartMapEditor_ent_main(_thread) {
          if (_thread.lastEx) __pc=_thread.catchPC;
          for(var __cnt=100 ; __cnt--;) {
            switch (__pc) {
            case 0:
              _this.fiber$loadPage(_thread, Tonyu.classes.mapEditor2.MapFiles);
              __pc=1;return;
            case 1:
              
              _thread.exit(_this);return;
            }
          }
        });
      },
      __dummy: false
    };
  },
  decls: {"methods":{"main":{"nowait":false}},"fields":{"bp":{}}}
});

//# sourceMappingURL=concat.js.map