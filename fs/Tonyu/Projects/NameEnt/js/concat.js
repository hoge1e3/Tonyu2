Tonyu.klass.define({
  fullName: 'user.Botan',
  shortName: 'Botan',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Botan_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000282;//user.Botan:282
      //$LASTPOS=40000286;//user.Botan:286
      _this.i=0;
      while(_this.i<60) {
        {
          //$LASTPOS=40000306;//user.Botan:306
          _this.y++;
          //$LASTPOS=40000315;//user.Botan:315
          _this.update();
        }
        _this.i++;
      }
    },
    fiber$main :function _trc_Botan_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Botan_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=40000282;//user.Botan:282
            //$LASTPOS=40000286;//user.Botan:286
            _this.i=0;;
          case 1:
            if (!(_this.i<60)) { __pc=3; break; }
            //$LASTPOS=40000306;//user.Botan:306
            _this.y++;
            //$LASTPOS=40000315;//user.Botan:315
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
    initialize :function _trc_Botan_initialize(options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000022;//user.Botan:22
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=40000042;//user.Botan:42
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=40000087;//user.Botan:87
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=40000125;//user.Botan:125
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=40000165;//user.Botan:165
      _this.padding=_this.padding||5;
      //$LASTPOS=40000192;//user.Botan:192
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=40000231;//user.Botan:231
      _this.height=_this.height||50;
      //$LASTPOS=40000258;//user.Botan:258
      _this.left=_this.left||50;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Button',
  shortName: 'Button',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000361;//user.Button:361
      while (true) {
        //$LASTPOS=41000379;//user.Button:379
        if (_this.getkey(1)||Tonyu.globals.$touches[0].touched) {
          //$LASTPOS=41000428;//user.Button:428
          if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
            //$LASTPOS=41000475;//user.Button:475
            _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
            
          }
          //$LASTPOS=41000535;//user.Button:535
          if (_this.clicked==1) {
            //$LASTPOS=41000565;//user.Button:565
            Tonyu.classes.user.Button.last=_this;
            //$LASTPOS=41000595;//user.Button:595
            if (_this.onClick) {
              //$LASTPOS=41000608;//user.Button:608
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=41000650;//user.Button:650
          _this.clicked=0;
          
        }
        //$LASTPOS=41000671;//user.Button:671
        _this.update();
        
      }
    },
    fiber$main :function _trc_Button_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Button_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000361;//user.Button:361
          case 1:
            //$LASTPOS=41000379;//user.Button:379
            if (_this.getkey(1)||Tonyu.globals.$touches[0].touched) {
              //$LASTPOS=41000428;//user.Button:428
              if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
                //$LASTPOS=41000475;//user.Button:475
                _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
                
              }
              //$LASTPOS=41000535;//user.Button:535
              if (_this.clicked==1) {
                //$LASTPOS=41000565;//user.Button:565
                Tonyu.classes.user.Button.last=_this;
                //$LASTPOS=41000595;//user.Button:595
                if (_this.onClick) {
                  //$LASTPOS=41000608;//user.Button:608
                  _this.onClick();
                }
                
              }
              
            } else {
              //$LASTPOS=41000650;//user.Button:650
              _this.clicked=0;
              
            }
            //$LASTPOS=41000671;//user.Button:671
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
    initialize :function _trc_Button_initialize(options) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000101;//user.Button:101
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=41000121;//user.Button:121
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=41000166;//user.Button:166
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=41000204;//user.Button:204
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=41000244;//user.Button:244
      _this.padding=_this.padding||5;
      //$LASTPOS=41000271;//user.Button:271
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=41000310;//user.Button:310
      _this.height=_this.height||50;
      //$LASTPOS=41000337;//user.Button:337
      _this.left=_this.left||50;
    },
    inRect :function _trc_Button_inRect(p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;
    },
    fiber$inRect :function _trc_Button_f_inRect(_thread,p) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=p.x>=_this.left&&p.x<=_this.left+_this.width&&p.y>=_this.top&&p.y<=_this.top+_this.height;return;
      
      
      _thread.retVal=_this;return;
    },
    draw :function _trc_Button_draw(c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var size;
      var f;
      var r;
      
      //$LASTPOS=41000785;//user.Button:785
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=41000822;//user.Button:822
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=41000864;//user.Button:864
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=41000906;//user.Button:906
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=41000950;//user.Button:950
      size = _this.height-_this.padding*2;
      //$LASTPOS=41000981;//user.Button:981
      f = c.font.replace(/^[0-9]+px /,"");
      //$LASTPOS=41001024;//user.Button:1024
      c.font=size+"px "+f;
      //$LASTPOS=41001062;//user.Button:1062
      c.textBaseline="top";
      //$LASTPOS=41001088;//user.Button:1088
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.strokeStyle;
      //$LASTPOS=41001138;//user.Button:1138
      r = c.measureText(_this.text);
      //$LASTPOS=41001169;//user.Button:1169
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.NameEntry',
  shortName: 'NameEntry',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_NameEntry_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=42000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=42000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=42000017;//user.NameEntry:17
      _this.y=50;
      //$LASTPOS=42000023;//user.NameEntry:23
      _this.align="left";
      //$LASTPOS=42000037;//user.NameEntry:37
      if (! _this.text) {
        //$LASTPOS=42000048;//user.NameEntry:48
        _this.text="";
      }
      //$LASTPOS=42000057;//user.NameEntry:57
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @;";
      //$LASTPOS=42000131;//user.NameEntry:131
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=42000165;//user.NameEntry:165
      _this.bts=[];
      //$LASTPOS=42000173;//user.NameEntry:173
      //$LASTPOS=42000178;//user.NameEntry:178
      _this.i=0;
      while(_this.i<_this.cand.length) {
        {
          //$LASTPOS=42000207;//user.NameEntry:207
          _this.ch=_this.cand.substring(_this.i,_this.i+1);
          //$LASTPOS=42000237;//user.NameEntry:237
          _this.m=_this.map[_this.ch];
          //$LASTPOS=42000252;//user.NameEntry:252
          _this.print(_this.i+"/"+_this.cand.length);
          //$LASTPOS=42000282;//user.NameEntry:282
          _this.putKey((_this.m?_this.m:_this.ch),_this.floor(_this.i/8),_this.i%8);
        }
        _this.i++;
      }
      //$LASTPOS=42000348;//user.NameEntry:348
      _this.print("end");
      //$LASTPOS=42000362;//user.NameEntry:362
      _this.size=30;
      //$LASTPOS=42000371;//user.NameEntry:371
      _this.t=0;
      //$LASTPOS=42000376;//user.NameEntry:376
      while (true) {
        //$LASTPOS=42000394;//user.NameEntry:394
        _this.y=_this.sin(_this.t)*50+50;
        //$LASTPOS=42000414;//user.NameEntry:414
        _this.t+=20;
        //$LASTPOS=42000425;//user.NameEntry:425
        _this.update();
        
      }
    },
    fiber$main :function _trc_NameEntry_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=42000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=42000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=42000017;//user.NameEntry:17
      _this.y=50;
      //$LASTPOS=42000023;//user.NameEntry:23
      _this.align="left";
      //$LASTPOS=42000037;//user.NameEntry:37
      if (! _this.text) {
        //$LASTPOS=42000048;//user.NameEntry:48
        _this.text="";
      }
      //$LASTPOS=42000057;//user.NameEntry:57
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @;";
      //$LASTPOS=42000131;//user.NameEntry:131
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=42000165;//user.NameEntry:165
      _this.bts=[];
      
      _thread.enter(function _trc_NameEntry_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000173;//user.NameEntry:173
            //$LASTPOS=42000178;//user.NameEntry:178
            _this.i=0;;
          case 1:
            if (!(_this.i<_this.cand.length)) { __pc=3; break; }
            //$LASTPOS=42000207;//user.NameEntry:207
            _this.ch=_this.cand.substring(_this.i,_this.i+1);
            //$LASTPOS=42000237;//user.NameEntry:237
            _this.m=_this.map[_this.ch];
            //$LASTPOS=42000252;//user.NameEntry:252
            _this.print(_this.i+"/"+_this.cand.length);
            //$LASTPOS=42000282;//user.NameEntry:282
            _this.fiber$putKey(_thread, (_this.m?_this.m:_this.ch), _this.floor(_this.i/8), _this.i%8);
            __pc=2;return;
          case 2:
            
            _this.i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=42000348;//user.NameEntry:348
            _this.print("end");
            //$LASTPOS=42000362;//user.NameEntry:362
            _this.size=30;
            //$LASTPOS=42000371;//user.NameEntry:371
            _this.t=0;
            //$LASTPOS=42000376;//user.NameEntry:376
          case 4:
            //$LASTPOS=42000394;//user.NameEntry:394
            _this.y=_this.sin(_this.t)*50+50;
            //$LASTPOS=42000414;//user.NameEntry:414
            _this.t+=20;
            //$LASTPOS=42000425;//user.NameEntry:425
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    putKey :function _trc_NameEntry_putKey(letter,r,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42000469;//user.NameEntry:469
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+c*_this.W,top: _this.y+50+r*_this.W,width: _this.W-5,height: _this.H-5,padding: 5,text: letter,onClick: (function anonymous_600() {
        
        //$LASTPOS=42000604;//user.NameEntry:604
        _this.keyin(letter);
      }),fillStyle: "#fe8"}));
    },
    fiber$putKey :function _trc_NameEntry_f_putKey(_thread,letter,r,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_NameEntry_ent_putKey(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000469;//user.NameEntry:469
            _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+c*_this.W,top: _this.y+50+r*_this.W,width: _this.W-5,height: _this.H-5,padding: 5,text: letter,onClick: (function anonymous_600() {
              
              //$LASTPOS=42000604;//user.NameEntry:604
              _this.keyin(letter);
            }),fillStyle: "#fe8"}));
            _thread.exit(_this);return;
          }
        }
      });
    },
    keyin :function _trc_NameEntry_keyin(l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      var _it_274;
      
      //$LASTPOS=42000780;//user.NameEntry:780
      if (l=="OK") {
        //$LASTPOS=42000803;//user.NameEntry:803
        _it_274=Tonyu.iterator(_this.bts,1);
        while(_it_274.next()) {
          b=_it_274[0];
          
          //$LASTPOS=42000822;//user.NameEntry:822
          b.die();
        }
        //$LASTPOS=42000839;//user.NameEntry:839
        _this.entered=true;
        return _this;
        
      }
      //$LASTPOS=42000879;//user.NameEntry:879
      if (l=="SP") {
        //$LASTPOS=42000892;//user.NameEntry:892
        l=" ";
      }
      //$LASTPOS=42000903;//user.NameEntry:903
      if (l=="BS") {
        //$LASTPOS=42000916;//user.NameEntry:916
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=42000963;//user.NameEntry:963
        _this.text+=l;
      }
    },
    fiber$keyin :function _trc_NameEntry_f_keyin(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var b;
      var _it_274;
      
      //$LASTPOS=42000780;//user.NameEntry:780
      if (l=="OK") {
        //$LASTPOS=42000803;//user.NameEntry:803
        _it_274=Tonyu.iterator(_this.bts,1);
        while(_it_274.next()) {
          b=_it_274[0];
          
          //$LASTPOS=42000822;//user.NameEntry:822
          b.die();
        }
        //$LASTPOS=42000839;//user.NameEntry:839
        _this.entered=true;
        _thread.retVal=_this;return;
        
        
      }
      //$LASTPOS=42000879;//user.NameEntry:879
      if (l=="SP") {
        //$LASTPOS=42000892;//user.NameEntry:892
        l=" ";
      }
      //$LASTPOS=42000903;//user.NameEntry:903
      if (l=="BS") {
        //$LASTPOS=42000916;//user.NameEntry:916
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=42000963;//user.NameEntry:963
        _this.text+=l;
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"putKey":{"nowait":false},"keyin":{"nowait":false}}}
});
