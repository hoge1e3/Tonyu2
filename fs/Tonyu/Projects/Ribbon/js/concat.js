Tonyu.klass.define({
  fullName: 'user.Button',
  shortName: 'Button',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=40000414;//user.Button:414
      while (true) {
        //$LASTPOS=40000432;//user.Button:432
        if (! _this.disabled&&(_this.getkey(1)||Tonyu.globals.$touches[0].touched)) {
          //$LASTPOS=40000496;//user.Button:496
          if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
            //$LASTPOS=40000543;//user.Button:543
            _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
            
          }
          //$LASTPOS=40000603;//user.Button:603
          if (_this.clicked==1) {
            //$LASTPOS=40000633;//user.Button:633
            Tonyu.classes.user.Button.last=_this;
            //$LASTPOS=40000663;//user.Button:663
            if (_this.onClick) {
              //$LASTPOS=40000676;//user.Button:676
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=40000718;//user.Button:718
          _this.clicked=0;
          
        }
        //$LASTPOS=40000739;//user.Button:739
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
            //$LASTPOS=40000414;//user.Button:414
          case 1:
            //$LASTPOS=40000432;//user.Button:432
            if (! _this.disabled&&(_this.getkey(1)||Tonyu.globals.$touches[0].touched)) {
              //$LASTPOS=40000496;//user.Button:496
              if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
                //$LASTPOS=40000543;//user.Button:543
                _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
                
              }
              //$LASTPOS=40000603;//user.Button:603
              if (_this.clicked==1) {
                //$LASTPOS=40000633;//user.Button:633
                Tonyu.classes.user.Button.last=_this;
                //$LASTPOS=40000663;//user.Button:663
                if (_this.onClick) {
                  //$LASTPOS=40000676;//user.Button:676
                  _this.onClick();
                }
                
              }
              
            } else {
              //$LASTPOS=40000718;//user.Button:718
              _this.clicked=0;
              
            }
            //$LASTPOS=40000739;//user.Button:739
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
      
      //$LASTPOS=40000101;//user.Button:101
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=40000121;//user.Button:121
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=40000166;//user.Button:166
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=40000204;//user.Button:204
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=40000244;//user.Button:244
      _this.disabledStrokeStyle=_this.disabledStrokeStyle||"#ddd";
      //$LASTPOS=40000297;//user.Button:297
      _this.padding=_this.padding||5;
      //$LASTPOS=40000324;//user.Button:324
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=40000363;//user.Button:363
      _this.height=_this.height||50;
      //$LASTPOS=40000390;//user.Button:390
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
      
      //$LASTPOS=40000853;//user.Button:853
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=40000890;//user.Button:890
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=40000932;//user.Button:932
      if (_this.disabled) {
        //$LASTPOS=40000946;//user.Button:946
        c.strokeStyle=_this.disabledStrokeStyle;
      }
      //$LASTPOS=40000985;//user.Button:985
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=40001027;//user.Button:1027
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=40001071;//user.Button:1071
      size = _this.height-_this.padding*2;
      //$LASTPOS=40001102;//user.Button:1102
      f = c.font.replace(/^[0-9]+px /,"");
      //$LASTPOS=40001145;//user.Button:1145
      c.font=size+"px "+f;
      //$LASTPOS=40001183;//user.Button:1183
      c.textBaseline="top";
      //$LASTPOS=40001209;//user.Button:1209
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.disabled?_this.disabledStrokeStyle:_this.strokeStyle;
      //$LASTPOS=40001293;//user.Button:1293
      r = c.measureText(_this.text);
      //$LASTPOS=40001324;//user.Button:1324
      c.fillText(_this.text,_this.left+_this.width/2-r.width/2,_this.top+_this.padding);
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false},"inRect":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.Flash',
  shortName: 'Flash',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Flash_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000081;//user.Flash:81
      _this.p=- 1;
      //$LASTPOS=41000088;//user.Flash:88
      _this.v=0;
      //$LASTPOS=41000093;//user.Flash:93
      while (1) {
        //$LASTPOS=41000109;//user.Flash:109
        _this.update();
        //$LASTPOS=41000123;//user.Flash:123
        Tonyu.globals.$Screen.setBGColor(_this.color(_this.v,_this.v,100+_this.trunc(_this.v/2)));
        //$LASTPOS=41000175;//user.Flash:175
        _this.v=_this.v-20;
        //$LASTPOS=41000187;//user.Flash:187
        if (_this.v<10) {
          //$LASTPOS=41000197;//user.Flash:197
          _this.v=0;
        }
        
      }
      //$LASTPOS=41000204;//user.Flash:204
      _this.die();
    },
    fiber$main :function _trc_Flash_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000081;//user.Flash:81
      _this.p=- 1;
      //$LASTPOS=41000088;//user.Flash:88
      _this.v=0;
      
      _thread.enter(function _trc_Flash_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=41000093;//user.Flash:93
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=41000109;//user.Flash:109
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=41000123;//user.Flash:123
            Tonyu.globals.$Screen.setBGColor(_this.color(_this.v,_this.v,100+_this.trunc(_this.v/2)));
            //$LASTPOS=41000175;//user.Flash:175
            _this.v=_this.v-20;
            //$LASTPOS=41000187;//user.Flash:187
            if (_this.v<10) {
              //$LASTPOS=41000197;//user.Flash:197
              _this.v=0;
            }
            __pc=1;break;
          case 3:
            
            //$LASTPOS=41000204;//user.Flash:204
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    doFlash :function _trc_Flash_doFlash() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=41000071;//user.Flash:71
      _this.v=255;
    },
    fiber$doFlash :function _trc_Flash_f_doFlash(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=41000071;//user.Flash:71
      _this.v=255;
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"doFlash":{"nowait":false}}}
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
      
      //$LASTPOS=42000020;//user.Main:20
      Tonyu.globals.$VTR=new Tonyu.classes.user.VTR({playBack: _this.playBack});
      //$LASTPOS=42000098;//user.Main:98
      Tonyu.globals.$ths=[];
      //$LASTPOS=42000107;//user.Main:107
      //$LASTPOS=42000112;//user.Main:112
      _this.i=0;
      while(_this.i<13) {
        {
          //$LASTPOS=42000135;//user.Main:135
          _this.t=new Tonyu.classes.user.Pend({t: _this.t});
          //$LASTPOS=42000154;//user.Main:154
          Tonyu.globals.$ths.push(_this.t);
        }
        _this.i++;
      }
      //$LASTPOS=42000170;//user.Main:170
      Tonyu.globals.$kasc=0;
      //$LASTPOS=42000300;//user.Main:300
      _this.p=- 1;
      //$LASTPOS=42000306;//user.Main:306
      _this.ppc=0;
      //$LASTPOS=42000313;//user.Main:313
      Tonyu.globals.$mu=0.95;
      //$LASTPOS=42000336;//user.Main:336
      Tonyu.globals.$score=0;
      //$LASTPOS=42000346;//user.Main:346
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_Main,true);
      //$LASTPOS=42000377;//user.Main:377
      Tonyu.globals.$srank=2000;
      //$LASTPOS=42000390;//user.Main:390
      Tonyu.globals.$time=60;
      //$LASTPOS=42000400;//user.Main:400
      Tonyu.globals.$level=1;
      //$LASTPOS=42000410;//user.Main:410
      Tonyu.globals.$exp=0;
      //$LASTPOS=42000418;//user.Main:418
      _this.x=100;
      //$LASTPOS=42000424;//user.Main:424
      _this.y=30;
      //$LASTPOS=42000430;//user.Main:430
      new Tonyu.classes.user.Star;
      //$LASTPOS=42000440;//user.Main:440
      Tonyu.globals.$rank=new Tonyu.classes.user.TRank1;
      //$LASTPOS=42000458;//user.Main:458
      Tonyu.globals.$Flsh=new Tonyu.classes.user.Flash;
      //$LASTPOS=42000475;//user.Main:475
      if (Tonyu.globals.$debug) {
        //$LASTPOS=42000487;//user.Main:487
        _this.charC=new Tonyu.classes.kernel.Actor({x: 20,y: 20,text: 0});
      }
      //$LASTPOS=42000523;//user.Main:523
      while (1) {
        //$LASTPOS=42000538;//user.Main:538
        _this.update();
        //$LASTPOS=42000552;//user.Main:552
        if (_this.charC) {
          //$LASTPOS=42000563;//user.Main:563
          _this.charC.text=_this.all().length;
        }
        //$LASTPOS=42000605;//user.Main:605
        if (Tonyu.globals.$tincr) {
          //$LASTPOS=42000617;//user.Main:617
          _this.i=Tonyu.globals.$tincr.i;
        } else {
          //$LASTPOS=42000634;//user.Main:634
          _this.i=120;
        }
        //$LASTPOS=42000645;//user.Main:645
        _this.status();
        //$LASTPOS=42000686;//user.Main:686
        if (Tonyu.globals.$time>0) {
          //$LASTPOS=42000709;//user.Main:709
          _this.drawText(300,_this.y,"Time :"+_this.trunc(Tonyu.globals.$time),_this.color(255,255,255));
          //$LASTPOS=42000775;//user.Main:775
          Tonyu.globals.$time=Tonyu.globals.$time-(1/30);
          
        } else {
          //$LASTPOS=42000846;//user.Main:846
          _this.gov();
          
        }
        //$LASTPOS=42000965;//user.Main:965
        if (Tonyu.globals.$exp>Tonyu.globals.$level*5&&Tonyu.globals.$time>0) {
          //$LASTPOS=42001006;//user.Main:1006
          Tonyu.globals.$tincr=_this.appear(new Tonyu.classes.user.TimeIncr(400,_this.y+20,_this.trunc(Tonyu.globals.$time)*10*Tonyu.globals.$level));
          //$LASTPOS=42001078;//user.Main:1078
          Tonyu.globals.$level+=1;
          //$LASTPOS=42001097;//user.Main:1097
          Tonyu.globals.$exp=0;
          //$LASTPOS=42001136;//user.Main:1136
          _this.appear(new Tonyu.classes.user.Star(100,- 100,Tonyu.globals.$pat_star+3,0));
          
        }
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42000020;//user.Main:20
      Tonyu.globals.$VTR=new Tonyu.classes.user.VTR({playBack: _this.playBack});
      //$LASTPOS=42000098;//user.Main:98
      Tonyu.globals.$ths=[];
      //$LASTPOS=42000107;//user.Main:107
      //$LASTPOS=42000112;//user.Main:112
      _this.i=0;
      while(_this.i<13) {
        {
          //$LASTPOS=42000135;//user.Main:135
          _this.t=new Tonyu.classes.user.Pend({t: _this.t});
          //$LASTPOS=42000154;//user.Main:154
          Tonyu.globals.$ths.push(_this.t);
        }
        _this.i++;
      }
      //$LASTPOS=42000170;//user.Main:170
      Tonyu.globals.$kasc=0;
      //$LASTPOS=42000300;//user.Main:300
      _this.p=- 1;
      //$LASTPOS=42000306;//user.Main:306
      _this.ppc=0;
      //$LASTPOS=42000313;//user.Main:313
      Tonyu.globals.$mu=0.95;
      //$LASTPOS=42000336;//user.Main:336
      Tonyu.globals.$score=0;
      //$LASTPOS=42000346;//user.Main:346
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_Main,true);
      //$LASTPOS=42000377;//user.Main:377
      Tonyu.globals.$srank=2000;
      //$LASTPOS=42000390;//user.Main:390
      Tonyu.globals.$time=60;
      //$LASTPOS=42000400;//user.Main:400
      Tonyu.globals.$level=1;
      //$LASTPOS=42000410;//user.Main:410
      Tonyu.globals.$exp=0;
      //$LASTPOS=42000418;//user.Main:418
      _this.x=100;
      //$LASTPOS=42000424;//user.Main:424
      _this.y=30;
      //$LASTPOS=42000430;//user.Main:430
      new Tonyu.classes.user.Star;
      //$LASTPOS=42000440;//user.Main:440
      Tonyu.globals.$rank=new Tonyu.classes.user.TRank1;
      //$LASTPOS=42000458;//user.Main:458
      Tonyu.globals.$Flsh=new Tonyu.classes.user.Flash;
      //$LASTPOS=42000475;//user.Main:475
      if (Tonyu.globals.$debug) {
        //$LASTPOS=42000487;//user.Main:487
        _this.charC=new Tonyu.classes.kernel.Actor({x: 20,y: 20,text: 0});
      }
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42000523;//user.Main:523
          case 1:
            if (!(1)) { __pc=10; break; }
            //$LASTPOS=42000538;//user.Main:538
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=42000552;//user.Main:552
            if (_this.charC) {
              //$LASTPOS=42000563;//user.Main:563
              _this.charC.text=_this.all().length;
            }
            //$LASTPOS=42000605;//user.Main:605
            if (Tonyu.globals.$tincr) {
              //$LASTPOS=42000617;//user.Main:617
              _this.i=Tonyu.globals.$tincr.i;
            } else {
              //$LASTPOS=42000634;//user.Main:634
              _this.i=120;
            }
            //$LASTPOS=42000645;//user.Main:645
            _this.fiber$status(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=42000686;//user.Main:686
            if (!(Tonyu.globals.$time>0)) { __pc=4; break; }
            {
              //$LASTPOS=42000709;//user.Main:709
              _this.drawText(300,_this.y,"Time :"+_this.trunc(Tonyu.globals.$time),_this.color(255,255,255));
              //$LASTPOS=42000775;//user.Main:775
              Tonyu.globals.$time=Tonyu.globals.$time-(1/30);
            }
            __pc=6;break;
          case 4:
            //$LASTPOS=42000846;//user.Main:846
            _this.fiber$gov(_thread);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=42000965;//user.Main:965
            if (!(Tonyu.globals.$exp>Tonyu.globals.$level*5&&Tonyu.globals.$time>0)) { __pc=9; break; }
            //$LASTPOS=42001006;//user.Main:1006
            _this.fiber$appear(_thread, new Tonyu.classes.user.TimeIncr(400,_this.y+20,_this.trunc(Tonyu.globals.$time)*10*Tonyu.globals.$level));
            __pc=7;return;
          case 7:
            Tonyu.globals.$tincr=_thread.retVal;
            
            //$LASTPOS=42001078;//user.Main:1078
            Tonyu.globals.$level+=1;
            //$LASTPOS=42001097;//user.Main:1097
            Tonyu.globals.$exp=0;
            //$LASTPOS=42001136;//user.Main:1136
            _this.fiber$appear(_thread, new Tonyu.classes.user.Star(100,- 100,Tonyu.globals.$pat_star+3,0));
            __pc=8;return;
          case 8:
            
          case 9:
            
            __pc=1;break;
          case 10:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    status :function _trc_Main_status() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=42001202;//user.Main:1202
      _this.drawText(_this.x,_this.y,"Score: "+Tonyu.globals.$score,_this.color(255,255,255));
      //$LASTPOS=42001257;//user.Main:1257
      if (_this.i<60||(_this.i%2)<1) {
        //$LASTPOS=42001282;//user.Main:1282
        _this.drawText(400,_this.y,"level:"+_this.trunc(Tonyu.globals.$level),_this.color(155,255,255));
      }
    },
    fiber$status :function _trc_Main_f_status(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=42001202;//user.Main:1202
      _this.drawText(_this.x,_this.y,"Score: "+Tonyu.globals.$score,_this.color(255,255,255));
      //$LASTPOS=42001257;//user.Main:1257
      if (_this.i<60||(_this.i%2)<1) {
        //$LASTPOS=42001282;//user.Main:1282
        _this.drawText(400,_this.y,"level:"+_this.trunc(Tonyu.globals.$level),_this.color(155,255,255));
      }
      
      _thread.retVal=_this;return;
    },
    gov :function _trc_Main_gov() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=42001357;//user.Main:1357
      Tonyu.globals.$VTR.stop();
      //$LASTPOS=42001374;//user.Main:1374
      while (_this.all(Tonyu.classes.user.Uploader).length>0) {
        //$LASTPOS=42001405;//user.Main:1405
        _this.update();
      }
      //$LASTPOS=42001419;//user.Main:1419
      Tonyu.globals.$VTR.hideMenu();
      //$LASTPOS=42001440;//user.Main:1440
      if (! _this.playBack||! _this.playBack.uploaded) {
        //$LASTPOS=42001487;//user.Main:1487
        _this.playBack=_this.playBack||Tonyu.globals.$VTR.data();
        //$LASTPOS=42001527;//user.Main:1527
        new Tonyu.classes.user.Button({top: 150,text: "PlayBack",height: 50,page: Tonyu.classes.user.Main,arg: {playBack: _this.playBack}});
        
      }
      //$LASTPOS=42001644;//user.Main:1644
      new Tonyu.classes.user.Button({top: 250,text: "Retry",height: 30,page: Tonyu.classes.user.Main});
      //$LASTPOS=42001702;//user.Main:1702
      new Tonyu.classes.user.Button({top: 300,text: "Title",height: 30,page: Tonyu.classes.user.Title});
      //$LASTPOS=42001761;//user.Main:1761
      Tonyu.classes.user.Button.last=null;
      //$LASTPOS=42001783;//user.Main:1783
      while (! Tonyu.classes.user.Button.last) {
        //$LASTPOS=42001804;//user.Main:1804
        _this.status();
        //$LASTPOS=42001813;//user.Main:1813
        _this.update();
        
      }
      //$LASTPOS=42001828;//user.Main:1828
      //$LASTPOS=42001833;//user.Main:1833
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=42001863;//user.Main:1863
          Tonyu.classes.user.Button.last.fillStyle="white";
          //$LASTPOS=42001902;//user.Main:1902
          _this.update();
          //$LASTPOS=42001920;//user.Main:1920
          Tonyu.classes.user.Button.last.fillStyle="gray";
          //$LASTPOS=42001958;//user.Main:1958
          _this.update();
        }
        i++;
      }
      //$LASTPOS=42001978;//user.Main:1978
      _this.loadPage(Tonyu.classes.user.Button.last.page,Tonyu.classes.user.Button.last.arg);
    },
    fiber$gov :function _trc_Main_f_gov(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=42001357;//user.Main:1357
      Tonyu.globals.$VTR.stop();
      
      _thread.enter(function _trc_Main_ent_gov(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=42001374;//user.Main:1374
          case 1:
            if (!(_this.all(Tonyu.classes.user.Uploader).length>0)) { __pc=3; break; }
            //$LASTPOS=42001405;//user.Main:1405
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=42001419;//user.Main:1419
            Tonyu.globals.$VTR.hideMenu();
            //$LASTPOS=42001440;//user.Main:1440
            if (! _this.playBack||! _this.playBack.uploaded) {
              //$LASTPOS=42001487;//user.Main:1487
              _this.playBack=_this.playBack||Tonyu.globals.$VTR.data();
              //$LASTPOS=42001527;//user.Main:1527
              new Tonyu.classes.user.Button({top: 150,text: "PlayBack",height: 50,page: Tonyu.classes.user.Main,arg: {playBack: _this.playBack}});
              
            }
            //$LASTPOS=42001644;//user.Main:1644
            new Tonyu.classes.user.Button({top: 250,text: "Retry",height: 30,page: Tonyu.classes.user.Main});
            //$LASTPOS=42001702;//user.Main:1702
            new Tonyu.classes.user.Button({top: 300,text: "Title",height: 30,page: Tonyu.classes.user.Title});
            //$LASTPOS=42001761;//user.Main:1761
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=42001783;//user.Main:1783
          case 4:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=7; break; }
            //$LASTPOS=42001804;//user.Main:1804
            _this.fiber$status(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=42001813;//user.Main:1813
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=4;break;
          case 7:
            
            //$LASTPOS=42001828;//user.Main:1828
            //$LASTPOS=42001833;//user.Main:1833
            i = 0;;
          case 8:
            if (!(i<5)) { __pc=11; break; }
            //$LASTPOS=42001863;//user.Main:1863
            Tonyu.classes.user.Button.last.fillStyle="white";
            //$LASTPOS=42001902;//user.Main:1902
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            //$LASTPOS=42001920;//user.Main:1920
            Tonyu.classes.user.Button.last.fillStyle="gray";
            //$LASTPOS=42001958;//user.Main:1958
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            i++;
            __pc=8;break;
          case 11:
            
            //$LASTPOS=42001978;//user.Main:1978
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Button.last.page, Tonyu.classes.user.Button.last.arg);
            __pc=12;return;
          case 12:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    appear :function _trc_Main_appear(o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return o;
    },
    fiber$appear :function _trc_Main_f_appear(_thread,o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=o;return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"status":{"nowait":false},"gov":{"nowait":false},"appear":{"nowait":false}}}
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
      
      //$LASTPOS=43000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=43000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=43000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=43000017;//user.NameEntry:17
      _this.y=100;
      //$LASTPOS=43000024;//user.NameEntry:24
      _this.me=new Tonyu.classes.kernel.Actor({text: "Input your name:",align: "left",x: _this.x,y: _this.y-20,size: 15});
      //$LASTPOS=43000093;//user.NameEntry:93
      _this.align="left";
      //$LASTPOS=43000107;//user.NameEntry:107
      if (! _this.text) {
        //$LASTPOS=43000118;//user.NameEntry:118
        _this.text="";
      }
      //$LASTPOS=43000127;//user.NameEntry:127
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @";
      //$LASTPOS=43000175;//user.NameEntry:175
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=43000209;//user.NameEntry:209
      _this.bts=[];
      //$LASTPOS=43000217;//user.NameEntry:217
      //$LASTPOS=43000222;//user.NameEntry:222
      _this.i=0;
      while(_this.i<_this.cand.length) {
        {
          //$LASTPOS=43000251;//user.NameEntry:251
          _this.ch=_this.cand.substring(_this.i,_this.i+1);
          //$LASTPOS=43000281;//user.NameEntry:281
          _this.m=_this.map[_this.ch];
          //$LASTPOS=43000296;//user.NameEntry:296
          _this.putKey((_this.m?_this.m:_this.ch),_this.floor(_this.i/8),_this.i%8);
        }
        _this.i++;
      }
      //$LASTPOS=43000361;//user.NameEntry:361
      _this.size=30;
      //$LASTPOS=43000370;//user.NameEntry:370
      _this.bts.push(_this.okb=new Tonyu.classes.user.Button({disabled: _this.text.length==0,left: _this.x,width: 200,top: _this.y+300,height: 30,text: "OK",onClick: (function anonymous_490() {
        
        //$LASTPOS=43000503;//user.NameEntry:503
        _this.entered=true;
        //$LASTPOS=43000525;//user.NameEntry:525
        _this.die();
      })}));
      //$LASTPOS=43000542;//user.NameEntry:542
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+230,width: 200,top: _this.y+300,height: 30,text: "Cancel",onClick: (function anonymous_627() {
        
        //$LASTPOS=43000640;//user.NameEntry:640
        _this.cancelled=true;
        //$LASTPOS=43000664;//user.NameEntry:664
        _this.die();
      })}));
    },
    fiber$main :function _trc_NameEntry_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=43000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=43000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=43000017;//user.NameEntry:17
      _this.y=100;
      //$LASTPOS=43000024;//user.NameEntry:24
      _this.me=new Tonyu.classes.kernel.Actor({text: "Input your name:",align: "left",x: _this.x,y: _this.y-20,size: 15});
      //$LASTPOS=43000093;//user.NameEntry:93
      _this.align="left";
      //$LASTPOS=43000107;//user.NameEntry:107
      if (! _this.text) {
        //$LASTPOS=43000118;//user.NameEntry:118
        _this.text="";
      }
      //$LASTPOS=43000127;//user.NameEntry:127
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @";
      //$LASTPOS=43000175;//user.NameEntry:175
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=43000209;//user.NameEntry:209
      _this.bts=[];
      //$LASTPOS=43000217;//user.NameEntry:217
      //$LASTPOS=43000222;//user.NameEntry:222
      _this.i=0;
      while(_this.i<_this.cand.length) {
        {
          //$LASTPOS=43000251;//user.NameEntry:251
          _this.ch=_this.cand.substring(_this.i,_this.i+1);
          //$LASTPOS=43000281;//user.NameEntry:281
          _this.m=_this.map[_this.ch];
          //$LASTPOS=43000296;//user.NameEntry:296
          _this.putKey((_this.m?_this.m:_this.ch),_this.floor(_this.i/8),_this.i%8);
        }
        _this.i++;
      }
      //$LASTPOS=43000361;//user.NameEntry:361
      _this.size=30;
      //$LASTPOS=43000370;//user.NameEntry:370
      _this.bts.push(_this.okb=new Tonyu.classes.user.Button({disabled: _this.text.length==0,left: _this.x,width: 200,top: _this.y+300,height: 30,text: "OK",onClick: (function anonymous_490() {
        
        //$LASTPOS=43000503;//user.NameEntry:503
        _this.entered=true;
        //$LASTPOS=43000525;//user.NameEntry:525
        _this.die();
      })}));
      //$LASTPOS=43000542;//user.NameEntry:542
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+230,width: 200,top: _this.y+300,height: 30,text: "Cancel",onClick: (function anonymous_627() {
        
        //$LASTPOS=43000640;//user.NameEntry:640
        _this.cancelled=true;
        //$LASTPOS=43000664;//user.NameEntry:664
        _this.die();
      })}));
      
      _thread.retVal=_this;return;
    },
    die :function _trc_NameEntry_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      var _it_297;
      
      //$LASTPOS=43000757;//user.NameEntry:757
      _it_297=Tonyu.iterator(_this.bts,1);
      while(_it_297.next()) {
        b=_it_297[0];
        
        //$LASTPOS=43000776;//user.NameEntry:776
        b.die();
      }
      //$LASTPOS=43000789;//user.NameEntry:789
      _this.me.die();
      //$LASTPOS=43000803;//user.NameEntry:803
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    putKey :function _trc_NameEntry_putKey(letter,r,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43000853;//user.NameEntry:853
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+c*_this.W,top: _this.y+50+r*_this.W,width: _this.W-5,height: _this.H-5,padding: 5,text: letter,onClick: (function anonymous_984() {
        
        //$LASTPOS=43000988;//user.NameEntry:988
        _this.keyin(letter);
      }),fillStyle: "#fe8"}));
    },
    keyin :function _trc_NameEntry_keyin(l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=43001056;//user.NameEntry:1056
      if (l=="SP") {
        //$LASTPOS=43001069;//user.NameEntry:1069
        l=" ";
      }
      //$LASTPOS=43001080;//user.NameEntry:1080
      if (l=="BS") {
        //$LASTPOS=43001093;//user.NameEntry:1093
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=43001140;//user.NameEntry:1140
        _this.text+=l;
      }
      //$LASTPOS=43001153;//user.NameEntry:1153
      _this.okb.disabled=(_this.text.length==0);
    },
    fiber$keyin :function _trc_NameEntry_f_keyin(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=43001056;//user.NameEntry:1056
      if (l=="SP") {
        //$LASTPOS=43001069;//user.NameEntry:1069
        l=" ";
      }
      //$LASTPOS=43001080;//user.NameEntry:1080
      if (l=="BS") {
        //$LASTPOS=43001093;//user.NameEntry:1093
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=43001140;//user.NameEntry:1140
        _this.text+=l;
      }
      //$LASTPOS=43001153;//user.NameEntry:1153
      _this.okb.disabled=(_this.text.length==0);
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"die":{"nowait":true},"putKey":{"nowait":true},"keyin":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.NetIndicator',
  shortName: 'NetIndicator',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_NetIndicator_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000000;//user.NetIndicator:0
      _this.text="Plase wait...";
      //$LASTPOS=44000022;//user.NetIndicator:22
      _this.x=235;
      //$LASTPOS=44000028;//user.NetIndicator:28
      _this.y=235;
      //$LASTPOS=44000034;//user.NetIndicator:34
      _this.size=30;
      //$LASTPOS=44000042;//user.NetIndicator:42
      _this.vy=0.1;
      //$LASTPOS=44000050;//user.NetIndicator:50
      while (true) {
        //$LASTPOS=44000068;//user.NetIndicator:68
        _this.y+=_this.vy;
        //$LASTPOS=44000079;//user.NetIndicator:79
        _this.vy+=0.1;
        //$LASTPOS=44000092;//user.NetIndicator:92
        if (_this.y>235) {
          //$LASTPOS=44000103;//user.NetIndicator:103
          _this.vy=- 1;
        }
        //$LASTPOS=44000114;//user.NetIndicator:114
        _this.update();
        
      }
    },
    fiber$main :function _trc_NetIndicator_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.NetIndicator:0
      _this.text="Plase wait...";
      //$LASTPOS=44000022;//user.NetIndicator:22
      _this.x=235;
      //$LASTPOS=44000028;//user.NetIndicator:28
      _this.y=235;
      //$LASTPOS=44000034;//user.NetIndicator:34
      _this.size=30;
      //$LASTPOS=44000042;//user.NetIndicator:42
      _this.vy=0.1;
      
      _thread.enter(function _trc_NetIndicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000050;//user.NetIndicator:50
          case 1:
            //$LASTPOS=44000068;//user.NetIndicator:68
            _this.y+=_this.vy;
            //$LASTPOS=44000079;//user.NetIndicator:79
            _this.vy+=0.1;
            //$LASTPOS=44000092;//user.NetIndicator:92
            if (_this.y>235) {
              //$LASTPOS=44000103;//user.NetIndicator:103
              _this.vy=- 1;
            }
            //$LASTPOS=44000114;//user.NetIndicator:114
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
  fullName: 'user.NetModule',
  shortName: 'NetModule',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_NetModule_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_NetModule_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    serverTop :function _trc_NetModule_serverTop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      
      //$LASTPOS=45000114;//user.NetModule:114
      res = WebSite.serverTop;
      //$LASTPOS=45000145;//user.NetModule:145
      if (res.match(/\/$/)) {
        //$LASTPOS=45000167;//user.NetModule:167
        res=res.substring(0,res.length-1);
      }
      return res;
    },
    fiber$serverTop :function _trc_NetModule_f_serverTop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=45000114;//user.NetModule:114
      res = WebSite.serverTop;
      //$LASTPOS=45000145;//user.NetModule:145
      if (res.match(/\/$/)) {
        //$LASTPOS=45000167;//user.NetModule:167
        res=res.substring(0,res.length-1);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    getProjectName :function _trc_NetModule_getProjectName() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000244;//user.NetModule:244
      if (_this.project) {
        return _this.project;
      }
      //$LASTPOS=45000277;//user.NetModule:277
      _this.project=Tonyu.currentProject.getName();
      //$LASTPOS=45000358;//user.NetModule:358
      _this.appAuthID="APPAUTH_EMBED_MARK";
      return _this.project;
    },
    fiber$getProjectName :function _trc_NetModule_f_getProjectName(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000244;//user.NetModule:244
      if (_this.project) {
        _thread.retVal=_this.project;return;
        
      }
      //$LASTPOS=45000277;//user.NetModule:277
      _this.project=Tonyu.currentProject.getName();
      //$LASTPOS=45000358;//user.NetModule:358
      _this.appAuthID="APPAUTH_EMBED_MARK";
      _thread.retVal=_this.project;return;
      
      
      _thread.retVal=_this;return;
    },
    map :function _trc_NetModule_map(a,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var e;
      var _it_301;
      
      //$LASTPOS=45000429;//user.NetModule:429
      res = [];
      //$LASTPOS=45000445;//user.NetModule:445
      _it_301=Tonyu.iterator(a,1);
      while(_it_301.next()) {
        e=_it_301[0];
        
        //$LASTPOS=45000472;//user.NetModule:472
        res.push(f(e));
        
      }
      return res;
    },
    fiber$map :function _trc_NetModule_f_map(_thread,a,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var e;
      var _it_301;
      
      //$LASTPOS=45000429;//user.NetModule:429
      res = [];
      //$LASTPOS=45000445;//user.NetModule:445
      _it_301=Tonyu.iterator(a,1);
      while(_it_301.next()) {
        e=_it_301[0];
        
        //$LASTPOS=45000472;//user.NetModule:472
        res.push(f(e));
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    dbInsert :function _trc_NetModule_dbInsert(kind,records) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var res;
      var i;
      var id;
      var _it_305;
      
      //$LASTPOS=45000545;//user.NetModule:545
      _this.getProjectName();
      //$LASTPOS=45000567;//user.NetModule:567
      if (! (records instanceof Array)) {
        //$LASTPOS=45000600;//user.NetModule:600
        records=[records];
      }
      //$LASTPOS=45000623;//user.NetModule:623
      a = _this.asyncResult();
      //$LASTPOS=45000648;//user.NetModule:648
      $.ajax({url: _this.serverTop()+"/dbInsert",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json))),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=45000903;//user.NetModule:903
      res;
      //$LASTPOS=45000916;//user.NetModule:916
      res=_this.waitFor(a);
      //$LASTPOS=45000936;//user.NetModule:936
      _it_305=Tonyu.iterator(a[0],2);
      while(_it_305.next()) {
        i=_it_305[0];
        id=_it_305[1];
        
        //$LASTPOS=45000969;//user.NetModule:969
        records[i]._kind=kind;
        //$LASTPOS=45001000;//user.NetModule:1000
        records[i]._id=id;
        
      }
      //$LASTPOS=45001048;//user.NetModule:1048
      if (records.length==1) {
        return records[0];
      }
      return records;
    },
    fiber$dbInsert :function _trc_NetModule_f_dbInsert(_thread,kind,records) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var res;
      var i;
      var id;
      var _it_305;
      
      
      _thread.enter(function _trc_NetModule_ent_dbInsert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000545;//user.NetModule:545
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45000567;//user.NetModule:567
            if (! (records instanceof Array)) {
              //$LASTPOS=45000600;//user.NetModule:600
              records=[records];
            }
            //$LASTPOS=45000623;//user.NetModule:623
            a = _this.asyncResult();
            //$LASTPOS=45000648;//user.NetModule:648
            $.ajax({url: _this.serverTop()+"/dbInsert",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json))),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=45000903;//user.NetModule:903
            res;
            //$LASTPOS=45000916;//user.NetModule:916
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            res=_thread.retVal;
            
            //$LASTPOS=45000936;//user.NetModule:936
            _it_305=Tonyu.iterator(a[0],2);
            while(_it_305.next()) {
              i=_it_305[0];
              id=_it_305[1];
              
              //$LASTPOS=45000969;//user.NetModule:969
              records[i]._kind=kind;
              //$LASTPOS=45001000;//user.NetModule:1000
              records[i]._id=id;
              
            }
            //$LASTPOS=45001048;//user.NetModule:1048
            if (!(records.length==1)) { __pc=3; break; }
            _thread.exit(records[0]);return;
          case 3:
            
            _thread.exit(records);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    dbSelect :function _trc_NetModule_dbSelect(kind,where) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var res;
      
      //$LASTPOS=45001141;//user.NetModule:1141
      _this.getProjectName();
      //$LASTPOS=45001163;//user.NetModule:1163
      a = _this.asyncResult();
      //$LASTPOS=45001188;//user.NetModule:1188
      if (! where) {
        //$LASTPOS=45001200;//user.NetModule:1200
        where={};
      }
      //$LASTPOS=45001214;//user.NetModule:1214
      $.ajax({url: _this.serverTop()+"/dbSelect",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,where: JSON.stringify(_this.obj2json(where)),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=45001435;//user.NetModule:1435
      res;
      //$LASTPOS=45001448;//user.NetModule:1448
      res=_this.waitFor(a);
      return _this.map(a[0],Tonyu.bindFunc(_this,_this.json2obj));
    },
    fiber$dbSelect :function _trc_NetModule_f_dbSelect(_thread,kind,where) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var res;
      
      
      _thread.enter(function _trc_NetModule_ent_dbSelect(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45001141;//user.NetModule:1141
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45001163;//user.NetModule:1163
            a = _this.asyncResult();
            //$LASTPOS=45001188;//user.NetModule:1188
            if (! where) {
              //$LASTPOS=45001200;//user.NetModule:1200
              where={};
            }
            //$LASTPOS=45001214;//user.NetModule:1214
            $.ajax({url: _this.serverTop()+"/dbSelect",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,where: JSON.stringify(_this.obj2json(where)),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=45001435;//user.NetModule:1435
            res;
            //$LASTPOS=45001448;//user.NetModule:1448
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            res=_thread.retVal;
            
            _thread.exit(_this.map(a[0],Tonyu.bindFunc(_this,_this.json2obj)));return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    dbDelete :function _trc_NetModule_dbDelete(records) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var a;
      var res;
      
      //$LASTPOS=45001560;//user.NetModule:1560
      _this.getProjectName();
      //$LASTPOS=45001582;//user.NetModule:1582
      a = _this.asyncResult();
      //$LASTPOS=45001607;//user.NetModule:1607
      if (! (records instanceof Array)) {
        //$LASTPOS=45001643;//user.NetModule:1643
        records=[records];
      }
      //$LASTPOS=45001666;//user.NetModule:1666
      $.ajax({url: _this.serverTop()+"/dbDelete",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json)))},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=45001877;//user.NetModule:1877
      res;
      //$LASTPOS=45001890;//user.NetModule:1890
      res=_this.waitFor(a);
      return a[0];
    },
    fiber$dbDelete :function _trc_NetModule_f_dbDelete(_thread,records) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var a;
      var res;
      
      
      _thread.enter(function _trc_NetModule_ent_dbDelete(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45001560;//user.NetModule:1560
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=45001582;//user.NetModule:1582
            a = _this.asyncResult();
            //$LASTPOS=45001607;//user.NetModule:1607
            if (! (records instanceof Array)) {
              //$LASTPOS=45001643;//user.NetModule:1643
              records=[records];
            }
            //$LASTPOS=45001666;//user.NetModule:1666
            $.ajax({url: _this.serverTop()+"/dbDelete",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json)))},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=45001877;//user.NetModule:1877
            res;
            //$LASTPOS=45001890;//user.NetModule:1890
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            res=_thread.retVal;
            
            _thread.exit(a[0]);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    json2obj :function _trc_NetModule_json2obj(json) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var k;
      var v;
      var _it_315;
      
      //$LASTPOS=45001947;//user.NetModule:1947
      res = {};
      //$LASTPOS=45001963;//user.NetModule:1963
      _it_315=Tonyu.iterator(json,2);
      while(_it_315.next()) {
        k=_it_315[0];
        v=_it_315[1];
        
        //$LASTPOS=45001995;//user.NetModule:1995
        if (k!="__typeMap") {
          //$LASTPOS=45002029;//user.NetModule:2029
          if (_this.annotateType(json,k)=="date") {
            //$LASTPOS=45002081;//user.NetModule:2081
            res[k]=new Date(v);
            
          } else {
            //$LASTPOS=45002138;//user.NetModule:2138
            res[k]=v;
            
          }
          
        }
        
      }
      return res;
    },
    fiber$json2obj :function _trc_NetModule_f_json2obj(_thread,json) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var k;
      var v;
      var _it_315;
      
      //$LASTPOS=45001947;//user.NetModule:1947
      res = {};
      //$LASTPOS=45001963;//user.NetModule:1963
      _it_315=Tonyu.iterator(json,2);
      while(_it_315.next()) {
        k=_it_315[0];
        v=_it_315[1];
        
        //$LASTPOS=45001995;//user.NetModule:1995
        if (k!="__typeMap") {
          //$LASTPOS=45002029;//user.NetModule:2029
          if (_this.annotateType(json,k)=="date") {
            //$LASTPOS=45002081;//user.NetModule:2081
            res[k]=new Date(v);
            
          } else {
            //$LASTPOS=45002138;//user.NetModule:2138
            res[k]=v;
            
          }
          
        }
        
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    obj2json :function _trc_NetModule_obj2json(obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var k;
      var v;
      var _it_320;
      
      //$LASTPOS=45002217;//user.NetModule:2217
      res = {};
      //$LASTPOS=45002233;//user.NetModule:2233
      _it_320=Tonyu.iterator(obj,2);
      while(_it_320.next()) {
        k=_it_320[0];
        v=_it_320[1];
        
        //$LASTPOS=45002264;//user.NetModule:2264
        if (v instanceof Date) {
          //$LASTPOS=45002301;//user.NetModule:2301
          _this.annotateType(res,k,"date");
          //$LASTPOS=45002341;//user.NetModule:2341
          res[k]=v.getTime();
          
        } else {
          //$LASTPOS=45002390;//user.NetModule:2390
          res[k]=v;
          
        }
        
      }
      return res;
    },
    fiber$obj2json :function _trc_NetModule_f_obj2json(_thread,obj) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      var k;
      var v;
      var _it_320;
      
      //$LASTPOS=45002217;//user.NetModule:2217
      res = {};
      
      _thread.enter(function _trc_NetModule_ent_obj2json(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45002233;//user.NetModule:2233
            _it_320=Tonyu.iterator(obj,2);
          case 1:
            if (!(_it_320.next())) { __pc=5; break; }
            k=_it_320[0];
            v=_it_320[1];
            
            //$LASTPOS=45002264;//user.NetModule:2264
            if (!(v instanceof Date)) { __pc=3; break; }
            //$LASTPOS=45002301;//user.NetModule:2301
            _this.fiber$annotateType(_thread, res, k, "date");
            __pc=2;return;
          case 2:
            
            //$LASTPOS=45002341;//user.NetModule:2341
            res[k]=v.getTime();
            __pc=4;break;
          case 3:
            {
              //$LASTPOS=45002390;//user.NetModule:2390
              res[k]=v;
            }
          case 4:
            
            __pc=1;break;
          case 5:
            
            _thread.exit(res);return;
            _thread.exit(_this);return;
          }
        }
      });
    },
    annotateType :function _trc_NetModule_annotateType(obj,k,type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45002466;//user.NetModule:2466
      if (k=="__typeMap") {
        return "obj";
      }
      //$LASTPOS=45002504;//user.NetModule:2504
      if (type) {
        //$LASTPOS=45002524;//user.NetModule:2524
        if (! obj.__typeMap) {
          //$LASTPOS=45002544;//user.NetModule:2544
          obj.__typeMap={};
        }
        //$LASTPOS=45002570;//user.NetModule:2570
        obj.__typeMap[k]=type;
        
      } else {
        //$LASTPOS=45002614;//user.NetModule:2614
        if (! obj.__typeMap) {
          return "str";
        }
        return obj.__typeMap[k]||"str";
        
      }
    },
    fiber$annotateType :function _trc_NetModule_f_annotateType(_thread,obj,k,type) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45002466;//user.NetModule:2466
      if (k=="__typeMap") {
        _thread.retVal="obj";return;
        
      }
      //$LASTPOS=45002504;//user.NetModule:2504
      if (type) {
        //$LASTPOS=45002524;//user.NetModule:2524
        if (! obj.__typeMap) {
          //$LASTPOS=45002544;//user.NetModule:2544
          obj.__typeMap={};
        }
        //$LASTPOS=45002570;//user.NetModule:2570
        obj.__typeMap[k]=type;
        
      } else {
        //$LASTPOS=45002614;//user.NetModule:2614
        if (! obj.__typeMap) {
          _thread.retVal="str";return;
          
        }
        _thread.retVal=obj.__typeMap[k]||"str";return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    handleError :function _trc_NetModule_handleError(a,e,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45002724;//user.NetModule:2724
      alert(e+":"+s);
    },
    fiber$handleError :function _trc_NetModule_f_handleError(_thread,a,e,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45002724;//user.NetModule:2724
      alert(e+":"+s);
      
      _thread.retVal=_this;return;
    },
    now :function _trc_NetModule_now() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return new Date();
    },
    fiber$now :function _trc_NetModule_f_now(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=new Date();return;
      
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"serverTop":{"nowait":false},"getProjectName":{"nowait":false},"map":{"nowait":false},"dbInsert":{"nowait":false},"dbSelect":{"nowait":false},"dbDelete":{"nowait":false},"json2obj":{"nowait":false},"obj2json":{"nowait":false},"annotateType":{"nowait":false},"handleError":{"nowait":false},"now":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Pend',
  shortName: 'Pend',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Pend_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=46000655;//user.Pend:655
      _this.x=200;
      //$LASTPOS=46000661;//user.Pend:661
      _this.y=200;
      //$LASTPOS=46000668;//user.Pend:668
      _this.vx=0;
      //$LASTPOS=46000673;//user.Pend:673
      _this.vy=0;
      //$LASTPOS=46000679;//user.Pend:679
      _this.mu=0.7*0.9;
      //$LASTPOS=46000692;//user.Pend:692
      _this.ospd=0.1*2;
      //$LASTPOS=46000704;//user.Pend:704
      _this.spd=_this.ospd;
      //$LASTPOS=46000714;//user.Pend:714
      _this.thr=0;
      //$LASTPOS=46000721;//user.Pend:721
      _this.grav=0.3;
      //$LASTPOS=46000731;//user.Pend:731
      _this.cnt=0;
      //$LASTPOS=46000738;//user.Pend:738
      while (1) {
        //$LASTPOS=46000753;//user.Pend:753
        _this.cspd=_this.vx*_this.vx+_this.vy*_this.vy;
        //$LASTPOS=46000813;//user.Pend:813
        if (_this.t) {
          //$LASTPOS=46000830;//user.Pend:830
          _this.tx=_this.t.x;
          //$LASTPOS=46000837;//user.Pend:837
          _this.ty=_this.t.y;
          
        } else {
          //$LASTPOS=46000866;//user.Pend:866
          _this.tx=Tonyu.globals.$VTR.x;
          //$LASTPOS=46000885;//user.Pend:885
          _this.ty=Tonyu.globals.$VTR.y;
          
        }
        //$LASTPOS=46000932;//user.Pend:932
        _this.vx+=(_this.tx-_this.x)*_this.spd;
        //$LASTPOS=46000952;//user.Pend:952
        _this.vy+=(_this.ty-_this.y)*_this.spd+_this.grav;
        //$LASTPOS=46000982;//user.Pend:982
        _this.vx=_this.vx*_this.mu;
        //$LASTPOS=46000996;//user.Pend:996
        _this.vy=_this.vy*_this.mu;
        //$LASTPOS=46001015;//user.Pend:1015
        _this.x+=_this.vx;
        //$LASTPOS=46001026;//user.Pend:1026
        _this.y+=_this.vy;
        //$LASTPOS=46001042;//user.Pend:1042
        _this.p=- 1;
        //$LASTPOS=46001065;//user.Pend:1065
        if (_this.cnt%2==0) {
          //$LASTPOS=46001078;//user.Pend:1078
          _this.update();
        }
        
      }
    },
    fiber$main :function _trc_Pend_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=46000655;//user.Pend:655
      _this.x=200;
      //$LASTPOS=46000661;//user.Pend:661
      _this.y=200;
      //$LASTPOS=46000668;//user.Pend:668
      _this.vx=0;
      //$LASTPOS=46000673;//user.Pend:673
      _this.vy=0;
      //$LASTPOS=46000679;//user.Pend:679
      _this.mu=0.7*0.9;
      //$LASTPOS=46000692;//user.Pend:692
      _this.ospd=0.1*2;
      //$LASTPOS=46000704;//user.Pend:704
      _this.spd=_this.ospd;
      //$LASTPOS=46000714;//user.Pend:714
      _this.thr=0;
      //$LASTPOS=46000721;//user.Pend:721
      _this.grav=0.3;
      //$LASTPOS=46000731;//user.Pend:731
      _this.cnt=0;
      
      _thread.enter(function _trc_Pend_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=46000738;//user.Pend:738
          case 1:
            if (!(1)) { __pc=4; break; }
            //$LASTPOS=46000753;//user.Pend:753
            _this.cspd=_this.vx*_this.vx+_this.vy*_this.vy;
            //$LASTPOS=46000813;//user.Pend:813
            if (_this.t) {
              //$LASTPOS=46000830;//user.Pend:830
              _this.tx=_this.t.x;
              //$LASTPOS=46000837;//user.Pend:837
              _this.ty=_this.t.y;
              
            } else {
              //$LASTPOS=46000866;//user.Pend:866
              _this.tx=Tonyu.globals.$VTR.x;
              //$LASTPOS=46000885;//user.Pend:885
              _this.ty=Tonyu.globals.$VTR.y;
              
            }
            //$LASTPOS=46000932;//user.Pend:932
            _this.vx+=(_this.tx-_this.x)*_this.spd;
            //$LASTPOS=46000952;//user.Pend:952
            _this.vy+=(_this.ty-_this.y)*_this.spd+_this.grav;
            //$LASTPOS=46000982;//user.Pend:982
            _this.vx=_this.vx*_this.mu;
            //$LASTPOS=46000996;//user.Pend:996
            _this.vy=_this.vy*_this.mu;
            //$LASTPOS=46001015;//user.Pend:1015
            _this.x+=_this.vx;
            //$LASTPOS=46001026;//user.Pend:1026
            _this.y+=_this.vy;
            //$LASTPOS=46001042;//user.Pend:1042
            _this.p=- 1;
            //$LASTPOS=46001065;//user.Pend:1065
            if (!(_this.cnt%2==0)) { __pc=3; break; }
            //$LASTPOS=46001078;//user.Pend:1078
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
          case 3:
            
            __pc=1;break;
          case 4:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    draw :function _trc_Pend_draw(ctx) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var rad;
      
      //$LASTPOS=46000037;//user.Pend:37
      if (Tonyu.globals.$rank.rank<10) {
        //$LASTPOS=46000066;//user.Pend:66
        ctx.strokeStyle=_this.color(0,255,0);
        
      } else {
        //$LASTPOS=46000109;//user.Pend:109
        if (Tonyu.globals.$rank.rank<20) {
          //$LASTPOS=46000138;//user.Pend:138
          ctx.strokeStyle=_this.color(255,255,0);
          
        } else {
          //$LASTPOS=46000193;//user.Pend:193
          ctx.strokeStyle=_this.color(255,155+(Tonyu.globals.$rank.rank%4)*50,(Tonyu.globals.$rank.rank%4)*50);
          //$LASTPOS=46000269;//user.Pend:269
          ctx.lineWidth=2;
          
        }
      }
      //$LASTPOS=46000296;//user.Pend:296
      ctx.beginPath();
      //$LASTPOS=46000317;//user.Pend:317
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=46000338;//user.Pend:338
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=46000361;//user.Pend:361
      ctx.stroke();
      //$LASTPOS=46000379;//user.Pend:379
      if (! _this.t) {
        //$LASTPOS=46000397;//user.Pend:397
        rad = Tonyu.globals.$rank.rank;
        //$LASTPOS=46000425;//user.Pend:425
        if (rad>=15) {
          //$LASTPOS=46000438;//user.Pend:438
          rad=15+(Tonyu.globals.$rank.rank%4);
        }
        //$LASTPOS=46000469;//user.Pend:469
        ctx.beginPath();
        //$LASTPOS=46000494;//user.Pend:494
        ctx.arc(_this.tx,_this.ty,rad,0,6.3);
        //$LASTPOS=46000532;//user.Pend:532
        ctx.stroke();
        
      }
      //$LASTPOS=46000556;//user.Pend:556
      ctx.lineWidth=1;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"draw":{"nowait":true}}}
});
Tonyu.klass.define({
  fullName: 'user.PlayBackList',
  shortName: 'PlayBackList',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.user.NetModule],
  methods: {
    main :function _trc_PlayBackList_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var e;
      var _it_326;
      
      //$LASTPOS=47000032;//user.PlayBackList:32
      _this.n=new Tonyu.classes.user.NetIndicator;
      //$LASTPOS=47000052;//user.PlayBackList:52
      _this.s=_this.dbSelect("Replay",{$order: {score: - 1},$hide: ["buf"],$limit: 5});
      //$LASTPOS=47000117;//user.PlayBackList:117
      _this.n.die();
      //$LASTPOS=47000126;//user.PlayBackList:126
      _this.x=20;
      //$LASTPOS=47000132;//user.PlayBackList:132
      _this.y=30;
      //$LASTPOS=47000138;//user.PlayBackList:138
      _this.p=- 1;
      //$LASTPOS=47000144;//user.PlayBackList:144
      new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: "Name"});
      //$LASTPOS=47000178;//user.PlayBackList:178
      new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: "Score"});
      //$LASTPOS=47000213;//user.PlayBackList:213
      new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: "Greats"});
      //$LASTPOS=47000249;//user.PlayBackList:249
      new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: "Max Combo"});
      //$LASTPOS=47000288;//user.PlayBackList:288
      _this.y+=30;
      //$LASTPOS=47000295;//user.PlayBackList:295
      _it_326=Tonyu.iterator(_this.s,1);
      while(_it_326.next()) {
        e=_it_326[0];
        
        //$LASTPOS=47000314;//user.PlayBackList:314
        new Tonyu.classes.user.Button({left: _this.x,top: _this.y,width: 50,height: 20,text: "Play",padding: 3,e: e});
        //$LASTPOS=47000388;//user.PlayBackList:388
        new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: e.name});
        //$LASTPOS=47000426;//user.PlayBackList:426
        new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: e.score});
        //$LASTPOS=47000465;//user.PlayBackList:465
        new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: e.greatCount});
        //$LASTPOS=47000509;//user.PlayBackList:509
        new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: e.maxCombo});
        //$LASTPOS=47000551;//user.PlayBackList:551
        _this.y+=50;
        
      }
      //$LASTPOS=47000560;//user.PlayBackList:560
      new Tonyu.classes.user.Button({left: _this.x,top: _this.y,text: "Back",page: Tonyu.classes.user.Title,height: 20,width: 400});
      //$LASTPOS=47000629;//user.PlayBackList:629
      Tonyu.classes.user.Button.last=null;
      //$LASTPOS=47000647;//user.PlayBackList:647
      while (! Tonyu.classes.user.Button.last) {
        //$LASTPOS=47000668;//user.PlayBackList:668
        _this.update();
      }
      //$LASTPOS=47000678;//user.PlayBackList:678
      if (Tonyu.classes.user.Button.last.page) {
        //$LASTPOS=47000706;//user.PlayBackList:706
        _this.loadPage(Tonyu.classes.user.Button.last.page);
        
      } else {
        //$LASTPOS=47000747;//user.PlayBackList:747
        _this.n=new Tonyu.classes.user.NetIndicator;
        //$LASTPOS=47000771;//user.PlayBackList:771
        _this.s=_this.dbSelect("Replay",Tonyu.classes.user.Button.last.e);
        //$LASTPOS=47000811;//user.PlayBackList:811
        _this.n.die();
        //$LASTPOS=47000824;//user.PlayBackList:824
        _this.s[0].uploaded=true;
        //$LASTPOS=47000848;//user.PlayBackList:848
        _this.loadPage(Tonyu.classes.user.Main,{playBack: _this.s[0]});
        
      }
    },
    fiber$main :function _trc_PlayBackList_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      var _it_326;
      
      //$LASTPOS=47000032;//user.PlayBackList:32
      _this.n=new Tonyu.classes.user.NetIndicator;
      
      _thread.enter(function _trc_PlayBackList_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=47000052;//user.PlayBackList:52
            _this.fiber$dbSelect(_thread, "Replay", {$order: {score: - 1},$hide: ["buf"],$limit: 5});
            __pc=1;return;
          case 1:
            _this.s=_thread.retVal;
            
            //$LASTPOS=47000117;//user.PlayBackList:117
            _this.n.die();
            //$LASTPOS=47000126;//user.PlayBackList:126
            _this.x=20;
            //$LASTPOS=47000132;//user.PlayBackList:132
            _this.y=30;
            //$LASTPOS=47000138;//user.PlayBackList:138
            _this.p=- 1;
            //$LASTPOS=47000144;//user.PlayBackList:144
            new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: "Name"});
            //$LASTPOS=47000178;//user.PlayBackList:178
            new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: "Score"});
            //$LASTPOS=47000213;//user.PlayBackList:213
            new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: "Greats"});
            //$LASTPOS=47000249;//user.PlayBackList:249
            new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: "Max Combo"});
            //$LASTPOS=47000288;//user.PlayBackList:288
            _this.y+=30;
            //$LASTPOS=47000295;//user.PlayBackList:295
            _it_326=Tonyu.iterator(_this.s,1);
            while(_it_326.next()) {
              e=_it_326[0];
              
              //$LASTPOS=47000314;//user.PlayBackList:314
              new Tonyu.classes.user.Button({left: _this.x,top: _this.y,width: 50,height: 20,text: "Play",padding: 3,e: e});
              //$LASTPOS=47000388;//user.PlayBackList:388
              new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: e.name});
              //$LASTPOS=47000426;//user.PlayBackList:426
              new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: e.score});
              //$LASTPOS=47000465;//user.PlayBackList:465
              new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: e.greatCount});
              //$LASTPOS=47000509;//user.PlayBackList:509
              new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: e.maxCombo});
              //$LASTPOS=47000551;//user.PlayBackList:551
              _this.y+=50;
              
            }
            //$LASTPOS=47000560;//user.PlayBackList:560
            new Tonyu.classes.user.Button({left: _this.x,top: _this.y,text: "Back",page: Tonyu.classes.user.Title,height: 20,width: 400});
            //$LASTPOS=47000629;//user.PlayBackList:629
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=47000647;//user.PlayBackList:647
          case 2:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=4; break; }
            //$LASTPOS=47000668;//user.PlayBackList:668
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=47000678;//user.PlayBackList:678
            if (!(Tonyu.classes.user.Button.last.page)) { __pc=6; break; }
            //$LASTPOS=47000706;//user.PlayBackList:706
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Button.last.page);
            __pc=5;return;
          case 5:
            
            __pc=9;break;
          case 6:
            //$LASTPOS=47000747;//user.PlayBackList:747
            _this.n=new Tonyu.classes.user.NetIndicator;
            //$LASTPOS=47000771;//user.PlayBackList:771
            _this.fiber$dbSelect(_thread, "Replay", Tonyu.classes.user.Button.last.e);
            __pc=7;return;
          case 7:
            _this.s=_thread.retVal;
            
            //$LASTPOS=47000811;//user.PlayBackList:811
            _this.n.die();
            //$LASTPOS=47000824;//user.PlayBackList:824
            _this.s[0].uploaded=true;
            //$LASTPOS=47000848;//user.PlayBackList:848
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Main, {playBack: _this.s[0]});
            __pc=8;return;
          case 8:
            
          case 9:
            
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
  fullName: 'user.PTS',
  shortName: 'PTS',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_PTS_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=48000113;//user.PTS:113
      _this.i=60;
      //$LASTPOS=48000119;//user.PTS:119
      while (_this.i>0) {
        //$LASTPOS=48000137;//user.PTS:137
        _this.i=_this.i-1;
        //$LASTPOS=48000148;//user.PTS:148
        _this.c=255;
        //$LASTPOS=48000155;//user.PTS:155
        if (_this.i<12) {
          //$LASTPOS=48000165;//user.PTS:165
          _this.c=_this.i*20;
        }
        //$LASTPOS=48000202;//user.PTS:202
        _this.drawText(_this.x,_this.y,_this.score,_this.color(_this.c,_this.c,_this.c));
        //$LASTPOS=48000249;//user.PTS:249
        _this.update();
        
      }
      //$LASTPOS=48000261;//user.PTS:261
      _this.die();
    },
    fiber$main :function _trc_PTS_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=48000113;//user.PTS:113
      _this.i=60;
      
      _thread.enter(function _trc_PTS_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=48000119;//user.PTS:119
          case 1:
            if (!(_this.i>0)) { __pc=3; break; }
            //$LASTPOS=48000137;//user.PTS:137
            _this.i=_this.i-1;
            //$LASTPOS=48000148;//user.PTS:148
            _this.c=255;
            //$LASTPOS=48000155;//user.PTS:155
            if (_this.i<12) {
              //$LASTPOS=48000165;//user.PTS:165
              _this.c=_this.i*20;
            }
            //$LASTPOS=48000202;//user.PTS:202
            _this.drawText(_this.x,_this.y,_this.score,_this.color(_this.c,_this.c,_this.c));
            //$LASTPOS=48000249;//user.PTS:249
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=48000261;//user.PTS:261
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_PTS_initialize(x,y,sc,dp) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=48000041;//user.PTS:41
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=48000060;//user.PTS:60
      _this.score=sc+"pts";
      //$LASTPOS=48000080;//user.PTS:80
      if (dp>1) {
        //$LASTPOS=48000090;//user.PTS:90
        _this.score=_this.score+"x"+dp;
      }
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Star',
  shortName: 'Star',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Star_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=49002100;//user.Star:2100
      _this.cy=Tonyu.globals.$level;
      //$LASTPOS=49002111;//user.Star:2111
      _this.bp=Tonyu.globals.$pat_star+3;
      //$LASTPOS=49002127;//user.Star:2127
      _this.an=0;
      //$LASTPOS=49002133;//user.Star:2133
      Tonyu.globals.$mu=0.99;
      //$LASTPOS=49002143;//user.Star:2143
      _this.maxs=6;
      //$LASTPOS=49002151;//user.Star:2151
      _this.maxlife=100;
      //$LASTPOS=49002164;//user.Star:2164
      _this.life=_this.maxlife*0.5;
      //$LASTPOS=49002182;//user.Star:2182
      _this.vx=0;
      //$LASTPOS=49002187;//user.Star:2187
      _this.vy=- 1;
      //$LASTPOS=49002194;//user.Star:2194
      _this.x=230;
      //$LASTPOS=49002201;//user.Star:2201
      _this.y=- 150;
      //$LASTPOS=49002209;//user.Star:2209
      _this.cnt=0;
      //$LASTPOS=49002217;//user.Star:2217
      while (Tonyu.globals.$time>0.8) {
        //$LASTPOS=49002256;//user.Star:2256
        _this.an=_this.an+1;
        //$LASTPOS=49002269;//user.Star:2269
        if (_this.an>2) {
          //$LASTPOS=49002279;//user.Star:2279
          _this.an=0;
        }
        //$LASTPOS=49002289;//user.Star:2289
        _this.p=_this.bp+_this.an;
        //$LASTPOS=49002324;//user.Star:2324
        if (_this.x<0) {
          //$LASTPOS=49002333;//user.Star:2333
          _this.vx=_this.abs(_this.vx);
        }
        //$LASTPOS=49002349;//user.Star:2349
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=49002369;//user.Star:2369
          _this.vx=- _this.abs(_this.vx);
        }
        //$LASTPOS=49002386;//user.Star:2386
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=49002407;//user.Star:2407
          _this.vy=- _this.abs(_this.vy);
        }
        //$LASTPOS=49002424;//user.Star:2424
        if (_this.y<- 110) {
          //$LASTPOS=49002436;//user.Star:2436
          _this.vy=1;
        }
        //$LASTPOS=49002471;//user.Star:2471
        _this.x+=_this.vx;
        //$LASTPOS=49002477;//user.Star:2477
        _this.vx=_this.vx*Tonyu.globals.$mu;
        //$LASTPOS=49002492;//user.Star:2492
        _this.y+=_this.vy;
        //$LASTPOS=49002498;//user.Star:2498
        _this.vy=_this.vy*Tonyu.globals.$mu;
        //$LASTPOS=49002526;//user.Star:2526
        _this.ath();
        //$LASTPOS=49002547;//user.Star:2547
        _this.vy=_this.vy+0.03;
        //$LASTPOS=49002563;//user.Star:2563
        if (_this.vy>_this.maxs) {
          //$LASTPOS=49002576;//user.Star:2576
          _this.vy=_this.maxs;
        }
        //$LASTPOS=49002589;//user.Star:2589
        if (_this.vy<- _this.maxs) {
          //$LASTPOS=49002603;//user.Star:2603
          _this.vy=- _this.maxs;
        }
        //$LASTPOS=49002617;//user.Star:2617
        if (_this.vx>_this.maxs) {
          //$LASTPOS=49002630;//user.Star:2630
          _this.vx=_this.maxs;
        }
        //$LASTPOS=49002643;//user.Star:2643
        if (_this.vx<- _this.maxs) {
          //$LASTPOS=49002657;//user.Star:2657
          _this.vx=- _this.maxs;
        }
        //$LASTPOS=49002691;//user.Star:2691
        if (_this.life<_this.maxlife) {
          //$LASTPOS=49002709;//user.Star:2709
          _this.life+=0.2;
        }
        //$LASTPOS=49002740;//user.Star:2740
        _this.drawLine(0,Tonyu.globals.$screenHeight-10-_this.cy,_this.life,Tonyu.globals.$screenHeight-10-_this.cy,_this.color(0,255-_this.cy*20,0));
        //$LASTPOS=49002823;//user.Star:2823
        if (_this.life<0) {
          //$LASTPOS=49002880;//user.Star:2880
          _this.crash();
          //$LASTPOS=49002897;//user.Star:2897
          _this.life=_this.maxlife;
          //$LASTPOS=49002919;//user.Star:2919
          _this.appear(new Tonyu.classes.user.PTS(_this.x,_this.y+30,Tonyu.globals.$rank.rank*4,Tonyu.globals.$gcont));
          //$LASTPOS=49002972;//user.Star:2972
          _this.y=- 30;
          //$LASTPOS=49002978;//user.Star:2978
          _this.vy=0;
          //$LASTPOS=49002992;//user.Star:2992
          Tonyu.globals.$score=Tonyu.globals.$score+50+Tonyu.globals.$rank.rank*4*Tonyu.globals.$gcont;
          //$LASTPOS=49003038;//user.Star:3038
          Tonyu.globals.$time=Tonyu.globals.$time+Tonyu.globals.$rank.rank*0.05*Tonyu.globals.$gcont;
          
        }
        //$LASTPOS=49003084;//user.Star:3084
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=49003162;//user.Star:3162
          Tonyu.globals.$time=Tonyu.globals.$time*0;
          //$LASTPOS=49003207;//user.Star:3207
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=49003236;//user.Star:3236
        _this.cnt++;
        //$LASTPOS=49003247;//user.Star:3247
        if (_this.cnt%2==0) {
          //$LASTPOS=49003261;//user.Star:3261
          _this.update();
        }
        
      }
      //$LASTPOS=49003274;//user.Star:3274
      Tonyu.globals.$rank.rank=0;
      //$LASTPOS=49003288;//user.Star:3288
      _this.crash();
      //$LASTPOS=49003297;//user.Star:3297
      _this.die();
    },
    fiber$main :function _trc_Star_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=49002100;//user.Star:2100
      _this.cy=Tonyu.globals.$level;
      //$LASTPOS=49002111;//user.Star:2111
      _this.bp=Tonyu.globals.$pat_star+3;
      //$LASTPOS=49002127;//user.Star:2127
      _this.an=0;
      //$LASTPOS=49002133;//user.Star:2133
      Tonyu.globals.$mu=0.99;
      //$LASTPOS=49002143;//user.Star:2143
      _this.maxs=6;
      //$LASTPOS=49002151;//user.Star:2151
      _this.maxlife=100;
      //$LASTPOS=49002164;//user.Star:2164
      _this.life=_this.maxlife*0.5;
      //$LASTPOS=49002182;//user.Star:2182
      _this.vx=0;
      //$LASTPOS=49002187;//user.Star:2187
      _this.vy=- 1;
      //$LASTPOS=49002194;//user.Star:2194
      _this.x=230;
      //$LASTPOS=49002201;//user.Star:2201
      _this.y=- 150;
      //$LASTPOS=49002209;//user.Star:2209
      _this.cnt=0;
      
      _thread.enter(function _trc_Star_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49002217;//user.Star:2217
          case 1:
            if (!(Tonyu.globals.$time>0.8)) { __pc=8; break; }
            //$LASTPOS=49002256;//user.Star:2256
            _this.an=_this.an+1;
            //$LASTPOS=49002269;//user.Star:2269
            if (_this.an>2) {
              //$LASTPOS=49002279;//user.Star:2279
              _this.an=0;
            }
            //$LASTPOS=49002289;//user.Star:2289
            _this.p=_this.bp+_this.an;
            //$LASTPOS=49002324;//user.Star:2324
            if (_this.x<0) {
              //$LASTPOS=49002333;//user.Star:2333
              _this.vx=_this.abs(_this.vx);
            }
            //$LASTPOS=49002349;//user.Star:2349
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=49002369;//user.Star:2369
              _this.vx=- _this.abs(_this.vx);
            }
            //$LASTPOS=49002386;//user.Star:2386
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=49002407;//user.Star:2407
              _this.vy=- _this.abs(_this.vy);
            }
            //$LASTPOS=49002424;//user.Star:2424
            if (_this.y<- 110) {
              //$LASTPOS=49002436;//user.Star:2436
              _this.vy=1;
            }
            //$LASTPOS=49002471;//user.Star:2471
            _this.x+=_this.vx;
            //$LASTPOS=49002477;//user.Star:2477
            _this.vx=_this.vx*Tonyu.globals.$mu;
            //$LASTPOS=49002492;//user.Star:2492
            _this.y+=_this.vy;
            //$LASTPOS=49002498;//user.Star:2498
            _this.vy=_this.vy*Tonyu.globals.$mu;
            //$LASTPOS=49002526;//user.Star:2526
            _this.fiber$ath(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49002547;//user.Star:2547
            _this.vy=_this.vy+0.03;
            //$LASTPOS=49002563;//user.Star:2563
            if (_this.vy>_this.maxs) {
              //$LASTPOS=49002576;//user.Star:2576
              _this.vy=_this.maxs;
            }
            //$LASTPOS=49002589;//user.Star:2589
            if (_this.vy<- _this.maxs) {
              //$LASTPOS=49002603;//user.Star:2603
              _this.vy=- _this.maxs;
            }
            //$LASTPOS=49002617;//user.Star:2617
            if (_this.vx>_this.maxs) {
              //$LASTPOS=49002630;//user.Star:2630
              _this.vx=_this.maxs;
            }
            //$LASTPOS=49002643;//user.Star:2643
            if (_this.vx<- _this.maxs) {
              //$LASTPOS=49002657;//user.Star:2657
              _this.vx=- _this.maxs;
            }
            //$LASTPOS=49002691;//user.Star:2691
            if (_this.life<_this.maxlife) {
              //$LASTPOS=49002709;//user.Star:2709
              _this.life+=0.2;
            }
            //$LASTPOS=49002740;//user.Star:2740
            _this.drawLine(0,Tonyu.globals.$screenHeight-10-_this.cy,_this.life,Tonyu.globals.$screenHeight-10-_this.cy,_this.color(0,255-_this.cy*20,0));
            //$LASTPOS=49002823;//user.Star:2823
            if (!(_this.life<0)) { __pc=5; break; }
            //$LASTPOS=49002880;//user.Star:2880
            _this.fiber$crash(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=49002897;//user.Star:2897
            _this.life=_this.maxlife;
            //$LASTPOS=49002919;//user.Star:2919
            _this.fiber$appear(_thread, new Tonyu.classes.user.PTS(_this.x,_this.y+30,Tonyu.globals.$rank.rank*4,Tonyu.globals.$gcont));
            __pc=4;return;
          case 4:
            
            //$LASTPOS=49002972;//user.Star:2972
            _this.y=- 30;
            //$LASTPOS=49002978;//user.Star:2978
            _this.vy=0;
            //$LASTPOS=49002992;//user.Star:2992
            Tonyu.globals.$score=Tonyu.globals.$score+50+Tonyu.globals.$rank.rank*4*Tonyu.globals.$gcont;
            //$LASTPOS=49003038;//user.Star:3038
            Tonyu.globals.$time=Tonyu.globals.$time+Tonyu.globals.$rank.rank*0.05*Tonyu.globals.$gcont;
          case 5:
            
            //$LASTPOS=49003084;//user.Star:3084
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=49003162;//user.Star:3162
              Tonyu.globals.$time=Tonyu.globals.$time*0;
              //$LASTPOS=49003207;//user.Star:3207
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=49003236;//user.Star:3236
            _this.cnt++;
            //$LASTPOS=49003247;//user.Star:3247
            if (!(_this.cnt%2==0)) { __pc=7; break; }
            //$LASTPOS=49003261;//user.Star:3261
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
            __pc=1;break;
          case 8:
            
            //$LASTPOS=49003274;//user.Star:3274
            Tonyu.globals.$rank.rank=0;
            //$LASTPOS=49003288;//user.Star:3288
            _this.fiber$crash(_thread);
            __pc=9;return;
          case 9:
            
            //$LASTPOS=49003297;//user.Star:3297
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    appear :function _trc_Star_appear(o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return o;
    },
    fiber$appear :function _trc_Star_f_appear(_thread,o) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=o;return;
      
      
      _thread.retVal=_this;return;
    },
    crash :function _trc_Star_crash() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=49000071;//user.Star:71
      i;
      //$LASTPOS=49000098;//user.Star:98
      i=0;
      //$LASTPOS=49000107;//user.Star:107
      Tonyu.globals.$exp+=1;
      //$LASTPOS=49000173;//user.Star:173
      if (Tonyu.globals.$rank.rank<10) {
        //$LASTPOS=49000217;//user.Star:217
        Tonyu.globals.$sound.playSE(Tonyu.globals.$se_bad);
        //$LASTPOS=49000249;//user.Star:249
        Tonyu.globals.$preg=0;
        //$LASTPOS=49000266;//user.Star:266
        Tonyu.globals.$gcont=1;
        //$LASTPOS=49000307;//user.Star:307
        while (i<360) {
          //$LASTPOS=49000335;//user.Star:335
          _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
          //$LASTPOS=49000389;//user.Star:389
          i=i+60;
          
        }
        
      } else {
        //$LASTPOS=49000418;//user.Star:418
        if (Tonyu.globals.$rank.rank<15) {
          //$LASTPOS=49000463;//user.Star:463
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_good);
          //$LASTPOS=49000496;//user.Star:496
          Tonyu.globals.$preg=0;
          //$LASTPOS=49000513;//user.Star:513
          Tonyu.globals.$gcont=1;
          //$LASTPOS=49000555;//user.Star:555
          while (i<360) {
            //$LASTPOS=49000583;//user.Star:583
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            //$LASTPOS=49000637;//user.Star:637
            i=i+30;
            
          }
          
        } else {
          //$LASTPOS=49000710;//user.Star:710
          Tonyu.globals.$Flsh.doFlash();
          //$LASTPOS=49000735;//user.Star:735
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
          //$LASTPOS=49000823;//user.Star:823
          if (Tonyu.globals.$preg) {
            //$LASTPOS=49000834;//user.Star:834
            Tonyu.globals.$gcont=Tonyu.globals.$gcont+1;
          } else {
            //$LASTPOS=49000856;//user.Star:856
            Tonyu.globals.$gcont=1;
          }
          //$LASTPOS=49000874;//user.Star:874
          Tonyu.globals.$preg=1;
          //$LASTPOS=49000891;//user.Star:891
          Tonyu.globals.$VTR.addGreat(Tonyu.globals.$gcont);
          //$LASTPOS=49000945;//user.Star:945
          while (i<360) {
            //$LASTPOS=49000973;//user.Star:973
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            //$LASTPOS=49001027;//user.Star:1027
            i=i+60;
            
          }
          //$LASTPOS=49001053;//user.Star:1053
          i=15;
          //$LASTPOS=49001068;//user.Star:1068
          while (i<360) {
            //$LASTPOS=49001096;//user.Star:1096
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*10,_this.sin(i)*10));
            //$LASTPOS=49001152;//user.Star:1152
            i=i+30;
            
          }
          
        }
      }
      //$LASTPOS=49001216;//user.Star:1216
      _this.appear(new Tonyu.classes.user.TRank2(_this.x,_this.y,Tonyu.globals.$rank.rank,Tonyu.globals.$gcont));
    },
    fiber$crash :function _trc_Star_f_crash(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=49000071;//user.Star:71
      i;
      //$LASTPOS=49000098;//user.Star:98
      i=0;
      //$LASTPOS=49000107;//user.Star:107
      Tonyu.globals.$exp+=1;
      
      _thread.enter(function _trc_Star_ent_crash(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49000173;//user.Star:173
            if (!(Tonyu.globals.$rank.rank<10)) { __pc=4; break; }
            //$LASTPOS=49000217;//user.Star:217
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_bad);
            //$LASTPOS=49000249;//user.Star:249
            Tonyu.globals.$preg=0;
            //$LASTPOS=49000266;//user.Star:266
            Tonyu.globals.$gcont=1;
            //$LASTPOS=49000307;//user.Star:307
          case 1:
            if (!(i<360)) { __pc=3; break; }
            //$LASTPOS=49000335;//user.Star:335
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=49000389;//user.Star:389
            i=i+60;
            __pc=1;break;
          case 3:
            
            __pc=16;break;
          case 4:
            //$LASTPOS=49000418;//user.Star:418
            if (!(Tonyu.globals.$rank.rank<15)) { __pc=8; break; }
            //$LASTPOS=49000463;//user.Star:463
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_good);
            //$LASTPOS=49000496;//user.Star:496
            Tonyu.globals.$preg=0;
            //$LASTPOS=49000513;//user.Star:513
            Tonyu.globals.$gcont=1;
            //$LASTPOS=49000555;//user.Star:555
          case 5:
            if (!(i<360)) { __pc=7; break; }
            //$LASTPOS=49000583;//user.Star:583
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=6;return;
          case 6:
            
            //$LASTPOS=49000637;//user.Star:637
            i=i+30;
            __pc=5;break;
          case 7:
            
            __pc=15;break;
          case 8:
            //$LASTPOS=49000710;//user.Star:710
            Tonyu.globals.$Flsh.doFlash();
            //$LASTPOS=49000735;//user.Star:735
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
            //$LASTPOS=49000823;//user.Star:823
            if (Tonyu.globals.$preg) {
              //$LASTPOS=49000834;//user.Star:834
              Tonyu.globals.$gcont=Tonyu.globals.$gcont+1;
            } else {
              //$LASTPOS=49000856;//user.Star:856
              Tonyu.globals.$gcont=1;
            }
            //$LASTPOS=49000874;//user.Star:874
            Tonyu.globals.$preg=1;
            //$LASTPOS=49000891;//user.Star:891
            Tonyu.globals.$VTR.addGreat(Tonyu.globals.$gcont);
            //$LASTPOS=49000945;//user.Star:945
          case 9:
            if (!(i<360)) { __pc=11; break; }
            //$LASTPOS=49000973;//user.Star:973
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=10;return;
          case 10:
            
            //$LASTPOS=49001027;//user.Star:1027
            i=i+60;
            __pc=9;break;
          case 11:
            
            //$LASTPOS=49001053;//user.Star:1053
            i=15;
            //$LASTPOS=49001068;//user.Star:1068
          case 12:
            if (!(i<360)) { __pc=14; break; }
            //$LASTPOS=49001096;//user.Star:1096
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*10,_this.sin(i)*10));
            __pc=13;return;
          case 13:
            
            //$LASTPOS=49001152;//user.Star:1152
            i=i+30;
            __pc=12;break;
          case 14:
            
          case 15:
            
          case 16:
            
            //$LASTPOS=49001216;//user.Star:1216
            _this.fiber$appear(_thread, new Tonyu.classes.user.TRank2(_this.x,_this.y,Tonyu.globals.$rank.rank,Tonyu.globals.$gcont));
            __pc=17;return;
          case 17:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    crashTo2 :function _trc_Star_crashTo2(t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return (_this.dist(t.x-_this.x,t.y-_this.y)<35);
    },
    fiber$crashTo2 :function _trc_Star_f_crashTo2(_thread,t) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal=(_this.dist(t.x-_this.x,t.y-_this.y)<35);return;
      
      
      _thread.retVal=_this;return;
    },
    ath :function _trc_Star_ath() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      var t;
      var pt;
      var dl;
      var dm;
      
      //$LASTPOS=49001352;//user.Star:1352
      i;t;pt;dl;dm;
      //$LASTPOS=49001395;//user.Star:1395
      i=Tonyu.globals.$ths.length-1;
      //$LASTPOS=49001416;//user.Star:1416
      dl=0;
      //$LASTPOS=49001426;//user.Star:1426
      while (i>=0) {
        //$LASTPOS=49001497;//user.Star:1497
        t=Tonyu.globals.$ths[i];
        //$LASTPOS=49001516;//user.Star:1516
        if (_this.crashTo2(t)) {
          //$LASTPOS=49001579;//user.Star:1579
          _this.vx=_this.vx+(_this.x-t.x)*0.4;
          //$LASTPOS=49001610;//user.Star:1610
          _this.vy=_this.vy+(_this.y-t.y)*0.4;
          //$LASTPOS=49001641;//user.Star:1641
          dl=1;
          //$LASTPOS=49001659;//user.Star:1659
          if (pt) {
            //$LASTPOS=49001685;//user.Star:1685
            dm=_this.dist(pt.x-t.x,pt.y-_this.y)*0.8+20;
            //$LASTPOS=49001764;//user.Star:1764
            if (dm>dl) {
              //$LASTPOS=49001775;//user.Star:1775
              dl=dm;
            }
            
          }
          
        }
        //$LASTPOS=49001814;//user.Star:1814
        pt=t;
        //$LASTPOS=49001828;//user.Star:1828
        i=i-1;
        
      }
      //$LASTPOS=49001845;//user.Star:1845
      if (dl) {
        //$LASTPOS=49001893;//user.Star:1893
        if (Tonyu.globals.$kasc==0) {
          //$LASTPOS=49001907;//user.Star:1907
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri);
        } else {
          //$LASTPOS=49001948;//user.Star:1948
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri2);
        }
        //$LASTPOS=49001984;//user.Star:1984
        Tonyu.globals.$kasc=1-Tonyu.globals.$kasc;
        //$LASTPOS=49002007;//user.Star:2007
        _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,- _this.vx,- _this.vy));
        //$LASTPOS=49002047;//user.Star:2047
        _this.life=_this.life-dl*0.15;
        //$LASTPOS=49002074;//user.Star:2074
        Tonyu.globals.$score=Tonyu.globals.$score+1;
        
      }
    },
    fiber$ath :function _trc_Star_f_ath(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      var t;
      var pt;
      var dl;
      var dm;
      
      //$LASTPOS=49001352;//user.Star:1352
      i;t;pt;dl;dm;
      //$LASTPOS=49001395;//user.Star:1395
      i=Tonyu.globals.$ths.length-1;
      //$LASTPOS=49001416;//user.Star:1416
      dl=0;
      //$LASTPOS=49001426;//user.Star:1426
      while (i>=0) {
        //$LASTPOS=49001497;//user.Star:1497
        t=Tonyu.globals.$ths[i];
        //$LASTPOS=49001516;//user.Star:1516
        if (_this.crashTo2(t)) {
          //$LASTPOS=49001579;//user.Star:1579
          _this.vx=_this.vx+(_this.x-t.x)*0.4;
          //$LASTPOS=49001610;//user.Star:1610
          _this.vy=_this.vy+(_this.y-t.y)*0.4;
          //$LASTPOS=49001641;//user.Star:1641
          dl=1;
          //$LASTPOS=49001659;//user.Star:1659
          if (pt) {
            //$LASTPOS=49001685;//user.Star:1685
            dm=_this.dist(pt.x-t.x,pt.y-_this.y)*0.8+20;
            //$LASTPOS=49001764;//user.Star:1764
            if (dm>dl) {
              //$LASTPOS=49001775;//user.Star:1775
              dl=dm;
            }
            
          }
          
        }
        //$LASTPOS=49001814;//user.Star:1814
        pt=t;
        //$LASTPOS=49001828;//user.Star:1828
        i=i-1;
        
      }
      
      _thread.enter(function _trc_Star_ent_ath(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=49001845;//user.Star:1845
            if (!(dl)) { __pc=2; break; }
            //$LASTPOS=49001893;//user.Star:1893
            if (Tonyu.globals.$kasc==0) {
              //$LASTPOS=49001907;//user.Star:1907
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri);
            } else {
              //$LASTPOS=49001948;//user.Star:1948
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri2);
            }
            //$LASTPOS=49001984;//user.Star:1984
            Tonyu.globals.$kasc=1-Tonyu.globals.$kasc;
            //$LASTPOS=49002007;//user.Star:2007
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,- _this.vx,- _this.vy));
            __pc=1;return;
          case 1:
            
            //$LASTPOS=49002047;//user.Star:2047
            _this.life=_this.life-dl*0.15;
            //$LASTPOS=49002074;//user.Star:2074
            Tonyu.globals.$score=Tonyu.globals.$score+1;
          case 2:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"appear":{"nowait":false},"crash":{"nowait":false},"crashTo2":{"nowait":false},"ath":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TBomb',
  shortName: 'TBomb',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TBomb_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=50000104;//user.TBomb:104
      _this.i=3;
      //$LASTPOS=50000109;//user.TBomb:109
      while (_this.i>0) {
        //$LASTPOS=50000127;//user.TBomb:127
        _this.j=30;
        //$LASTPOS=50000137;//user.TBomb:137
        while (_this.j>0) {
          //$LASTPOS=50000159;//user.TBomb:159
          _this.x=_this.x+_this.vx*2;
          //$LASTPOS=50000177;//user.TBomb:177
          _this.y=_this.y+_this.vy*2;
          //$LASTPOS=50000195;//user.TBomb:195
          _this.j=_this.j-1;
          //$LASTPOS=50000210;//user.TBomb:210
          _this.update();
          
        }
        //$LASTPOS=50000230;//user.TBomb:230
        _this.p=_this.p-1;
        //$LASTPOS=50000236;//user.TBomb:236
        _this.vx=_this.vx*0.9;
        //$LASTPOS=50000246;//user.TBomb:246
        _this.vy=_this.vy*0.9;
        //$LASTPOS=50000261;//user.TBomb:261
        _this.i=_this.i-1;
        
      }
      //$LASTPOS=50000270;//user.TBomb:270
      _this.p=- 1;
      //$LASTPOS=50000276;//user.TBomb:276
      _this.die();
    },
    fiber$main :function _trc_TBomb_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=50000104;//user.TBomb:104
      _this.i=3;
      
      _thread.enter(function _trc_TBomb_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=50000109;//user.TBomb:109
          case 1:
            if (!(_this.i>0)) { __pc=5; break; }
            //$LASTPOS=50000127;//user.TBomb:127
            _this.j=30;
            //$LASTPOS=50000137;//user.TBomb:137
          case 2:
            if (!(_this.j>0)) { __pc=4; break; }
            //$LASTPOS=50000159;//user.TBomb:159
            _this.x=_this.x+_this.vx*2;
            //$LASTPOS=50000177;//user.TBomb:177
            _this.y=_this.y+_this.vy*2;
            //$LASTPOS=50000195;//user.TBomb:195
            _this.j=_this.j-1;
            //$LASTPOS=50000210;//user.TBomb:210
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=50000230;//user.TBomb:230
            _this.p=_this.p-1;
            //$LASTPOS=50000236;//user.TBomb:236
            _this.vx=_this.vx*0.9;
            //$LASTPOS=50000246;//user.TBomb:246
            _this.vy=_this.vy*0.9;
            //$LASTPOS=50000261;//user.TBomb:261
            _this.i=_this.i-1;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=50000270;//user.TBomb:270
            _this.p=- 1;
            //$LASTPOS=50000276;//user.TBomb:276
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_TBomb_initialize(x,y,vx,vy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=50000042;//user.TBomb:42
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,Tonyu.globals.$pat_star+2,0]);
      //$LASTPOS=50000072;//user.TBomb:72
      _this.vx=vx;
      //$LASTPOS=50000088;//user.TBomb:88
      _this.vy=vy;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TimeIncr',
  shortName: 'TimeIncr',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TimeIncr_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51000067;//user.TimeIncr:67
      _this.i=120;
      //$LASTPOS=51000074;//user.TimeIncr:74
      while (_this.i>0) {
        //$LASTPOS=51000092;//user.TimeIncr:92
        _this.i-=1;
        //$LASTPOS=51000102;//user.TimeIncr:102
        _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
        //$LASTPOS=51000152;//user.TimeIncr:152
        _this.update();
        
      }
      //$LASTPOS=51000164;//user.TimeIncr:164
      while (_this.sc>0) {
        //$LASTPOS=51000183;//user.TimeIncr:183
        Tonyu.globals.$score+=10;
        //$LASTPOS=51000199;//user.TimeIncr:199
        _this.sc-=10;
        //$LASTPOS=51000211;//user.TimeIncr:211
        _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
        //$LASTPOS=51000261;//user.TimeIncr:261
        _this.update();
        
      }
      //$LASTPOS=51000273;//user.TimeIncr:273
      _this.die();
    },
    fiber$main :function _trc_TimeIncr_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=51000067;//user.TimeIncr:67
      _this.i=120;
      
      _thread.enter(function _trc_TimeIncr_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=51000074;//user.TimeIncr:74
          case 1:
            if (!(_this.i>0)) { __pc=3; break; }
            //$LASTPOS=51000092;//user.TimeIncr:92
            _this.i-=1;
            //$LASTPOS=51000102;//user.TimeIncr:102
            _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
            //$LASTPOS=51000152;//user.TimeIncr:152
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=51000164;//user.TimeIncr:164
          case 4:
            if (!(_this.sc>0)) { __pc=6; break; }
            //$LASTPOS=51000183;//user.TimeIncr:183
            Tonyu.globals.$score+=10;
            //$LASTPOS=51000199;//user.TimeIncr:199
            _this.sc-=10;
            //$LASTPOS=51000211;//user.TimeIncr:211
            _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
            //$LASTPOS=51000261;//user.TimeIncr:261
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6:
            
            //$LASTPOS=51000273;//user.TimeIncr:273
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_TimeIncr_initialize(x,y,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=51000038;//user.TimeIncr:38
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=51000057;//user.TimeIncr:57
      _this.sc=s;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Title',
  shortName: 'Title',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Title_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=52000022;//user.Title:22
      Tonyu.globals.$textPool=[];
      //$LASTPOS=52000037;//user.Title:37
      new Tonyu.classes.kernel.Actor({text: "RibbonMania",x: 235,y: 100,size: 50});
      //$LASTPOS=52000089;//user.Title:89
      new Tonyu.classes.kernel.Actor({text: "Great",x: 335,y: 150,size: 30,fillStyle: _this.color(255,155,0)});
      //$LASTPOS=52000162;//user.Title:162
      new Tonyu.classes.user.Flash;
      //$LASTPOS=52000174;//user.Title:174
      _this.s=new Tonyu.classes.user.Button({text: "Sound "+(Tonyu.globals.$snd?"on":"off"),page: Tonyu.classes.user.Main,top: 220,fillStyle: _this.color(0,200,55)});
      //$LASTPOS=52000269;//user.Title:269
      new Tonyu.classes.user.Button({text: "Game Start",page: Tonyu.classes.user.Main,top: 300,fillStyle: _this.color(0,150,255)});
      //$LASTPOS=52000347;//user.Title:347
      new Tonyu.classes.user.Button({text: "PlayBack",page: Tonyu.classes.user.PlayBackList,top: 380,fillStyle: _this.color(255,0,150)});
      //$LASTPOS=52000431;//user.Title:431
      while (true) {
        //$LASTPOS=52000450;//user.Title:450
        Tonyu.classes.user.Button.last=null;
        //$LASTPOS=52000473;//user.Title:473
        while (! Tonyu.classes.user.Button.last) {
          //$LASTPOS=52000504;//user.Title:504
          if (Tonyu.globals.$touches[0].touched>60) {
            //$LASTPOS=52000547;//user.Title:547
            Tonyu.globals.$debug=true;
            //$LASTPOS=52000573;//user.Title:573
            _this.print("Enter debug mode");
            
          }
          //$LASTPOS=52000620;//user.Title:620
          _this.update();
          
        }
        //$LASTPOS=52000642;//user.Title:642
        if (Tonyu.classes.user.Button.last!=_this.s) {
          break;
          
        }
        //$LASTPOS=52000674;//user.Title:674
        Tonyu.globals.$snd=! Tonyu.globals.$snd;
        //$LASTPOS=52000691;//user.Title:691
        _this.s.text="Sound "+(Tonyu.globals.$snd?"on":"off");
        //$LASTPOS=52000734;//user.Title:734
        Tonyu.globals.$sound.mute=! Tonyu.globals.$snd;
        //$LASTPOS=52000758;//user.Title:758
        Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
        
      }
      //$LASTPOS=52000789;//user.Title:789
      //$LASTPOS=52000794;//user.Title:794
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=52000821;//user.Title:821
          Tonyu.classes.user.Button.last.fillStyle="white";
          //$LASTPOS=52000857;//user.Title:857
          _this.update();
          //$LASTPOS=52000872;//user.Title:872
          Tonyu.classes.user.Button.last.fillStyle="gray";
          //$LASTPOS=52000907;//user.Title:907
          _this.update();
        }
        i++;
      }
      //$LASTPOS=52000921;//user.Title:921
      _this.loadPage(Tonyu.classes.user.Button.last.page);
    },
    fiber$main :function _trc_Title_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=52000022;//user.Title:22
      Tonyu.globals.$textPool=[];
      //$LASTPOS=52000037;//user.Title:37
      new Tonyu.classes.kernel.Actor({text: "RibbonMania",x: 235,y: 100,size: 50});
      //$LASTPOS=52000089;//user.Title:89
      new Tonyu.classes.kernel.Actor({text: "Great",x: 335,y: 150,size: 30,fillStyle: _this.color(255,155,0)});
      //$LASTPOS=52000162;//user.Title:162
      new Tonyu.classes.user.Flash;
      //$LASTPOS=52000174;//user.Title:174
      _this.s=new Tonyu.classes.user.Button({text: "Sound "+(Tonyu.globals.$snd?"on":"off"),page: Tonyu.classes.user.Main,top: 220,fillStyle: _this.color(0,200,55)});
      //$LASTPOS=52000269;//user.Title:269
      new Tonyu.classes.user.Button({text: "Game Start",page: Tonyu.classes.user.Main,top: 300,fillStyle: _this.color(0,150,255)});
      //$LASTPOS=52000347;//user.Title:347
      new Tonyu.classes.user.Button({text: "PlayBack",page: Tonyu.classes.user.PlayBackList,top: 380,fillStyle: _this.color(255,0,150)});
      
      _thread.enter(function _trc_Title_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=52000431;//user.Title:431
          case 1:
            //$LASTPOS=52000450;//user.Title:450
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=52000473;//user.Title:473
          case 2:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=4; break; }
            //$LASTPOS=52000504;//user.Title:504
            if (Tonyu.globals.$touches[0].touched>60) {
              //$LASTPOS=52000547;//user.Title:547
              Tonyu.globals.$debug=true;
              //$LASTPOS=52000573;//user.Title:573
              _this.print("Enter debug mode");
              
            }
            //$LASTPOS=52000620;//user.Title:620
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=52000642;//user.Title:642
            if (!(Tonyu.classes.user.Button.last!=_this.s)) { __pc=5; break; }
            __pc=6; break;
            
          case 5:
            
            //$LASTPOS=52000674;//user.Title:674
            Tonyu.globals.$snd=! Tonyu.globals.$snd;
            //$LASTPOS=52000691;//user.Title:691
            _this.s.text="Sound "+(Tonyu.globals.$snd?"on":"off");
            //$LASTPOS=52000734;//user.Title:734
            Tonyu.globals.$sound.mute=! Tonyu.globals.$snd;
            //$LASTPOS=52000758;//user.Title:758
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
            __pc=1;break;
          case 6:
            
            //$LASTPOS=52000789;//user.Title:789
            //$LASTPOS=52000794;//user.Title:794
            i = 0;;
          case 7:
            if (!(i<5)) { __pc=10; break; }
            //$LASTPOS=52000821;//user.Title:821
            Tonyu.classes.user.Button.last.fillStyle="white";
            //$LASTPOS=52000857;//user.Title:857
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=52000872;//user.Title:872
            Tonyu.classes.user.Button.last.fillStyle="gray";
            //$LASTPOS=52000907;//user.Title:907
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            i++;
            __pc=7;break;
          case 10:
            
            //$LASTPOS=52000921;//user.Title:921
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Button.last.page);
            __pc=11;return;
          case 11:
            
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
  fullName: 'user.TRank0',
  shortName: 'TRank0',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TRank0_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
    },
    fiber$main :function _trc_TRank0_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.retVal=_this;return;
    },
    putRank :function _trc_TRank0_putRank() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var s;
      var sc;
      
      //$LASTPOS=53000043;//user.TRank0:43
      s;sc;
      //$LASTPOS=53000091;//user.TRank0:91
      if (_this.rank<10) {
        //$LASTPOS=53000114;//user.TRank0:114
        _this.drawText(_this.x,_this.y,"Bad",_this.color(0,255,0));
        
      } else {
        //$LASTPOS=53000161;//user.TRank0:161
        if (_this.rank<15) {
          //$LASTPOS=53000184;//user.TRank0:184
          _this.drawText(_this.x,_this.y,"Good",_this.color(255,255,0));
          
        } else {
          //$LASTPOS=53000244;//user.TRank0:244
          s="Great ";
          //$LASTPOS=53000264;//user.TRank0:264
          if (_this.gcon>1) {
            //$LASTPOS=53000276;//user.TRank0:276
            s=s+_this.gcon;
          }
          //$LASTPOS=53000294;//user.TRank0:294
          _this.drawText(_this.x,_this.y,s,_this.color(255,155,0));
          
        }
      }
    },
    fiber$putRank :function _trc_TRank0_f_putRank(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var s;
      var sc;
      
      //$LASTPOS=53000043;//user.TRank0:43
      s;sc;
      //$LASTPOS=53000091;//user.TRank0:91
      if (_this.rank<10) {
        //$LASTPOS=53000114;//user.TRank0:114
        _this.drawText(_this.x,_this.y,"Bad",_this.color(0,255,0));
        
      } else {
        //$LASTPOS=53000161;//user.TRank0:161
        if (_this.rank<15) {
          //$LASTPOS=53000184;//user.TRank0:184
          _this.drawText(_this.x,_this.y,"Good",_this.color(255,255,0));
          
        } else {
          //$LASTPOS=53000244;//user.TRank0:244
          s="Great ";
          //$LASTPOS=53000264;//user.TRank0:264
          if (_this.gcon>1) {
            //$LASTPOS=53000276;//user.TRank0:276
            s=s+_this.gcon;
          }
          //$LASTPOS=53000294;//user.TRank0:294
          _this.drawText(_this.x,_this.y,s,_this.color(255,155,0));
          
        }
      }
      
      _thread.retVal=_this;return;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"putRank":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.TRank1',
  shortName: 'TRank1',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_TRank1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=54000164;//user.TRank1:164
      Tonyu.globals.$gcont=0;
      //$LASTPOS=54000174;//user.TRank1:174
      _this.gcon=0;
      //$LASTPOS=54000182;//user.TRank1:182
      _this.p=- 1;
      //$LASTPOS=54000188;//user.TRank1:188
      _this.x=400;
      //$LASTPOS=54000195;//user.TRank1:195
      _this.y=400;
      //$LASTPOS=54000202;//user.TRank1:202
      while (1) {
        //$LASTPOS=54000233;//user.TRank1:233
        _this.rank=0;
        //$LASTPOS=54000245;//user.TRank1:245
        _this.px=Tonyu.globals.$VTR.x;
        //$LASTPOS=54000260;//user.TRank1:260
        _this.py=Tonyu.globals.$VTR.y;
        //$LASTPOS=54000275;//user.TRank1:275
        while (_this.dist(Tonyu.globals.$VTR.x-_this.px,Tonyu.globals.$VTR.y-_this.py)<10) {
          //$LASTPOS=54000353;//user.TRank1:353
          _this.px=Tonyu.globals.$VTR.x;
          //$LASTPOS=54000372;//user.TRank1:372
          _this.py=Tonyu.globals.$VTR.y;
          //$LASTPOS=54000391;//user.TRank1:391
          _this.rank=_this.rank+2;
          //$LASTPOS=54000412;//user.TRank1:412
          _this.update();
          
        }
        //$LASTPOS=54000432;//user.TRank1:432
        _this.update();
        //$LASTPOS=54000446;//user.TRank1:446
        Tonyu.globals.$gcont=0;
        
      }
    },
    fiber$main :function _trc_TRank1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=54000164;//user.TRank1:164
      Tonyu.globals.$gcont=0;
      //$LASTPOS=54000174;//user.TRank1:174
      _this.gcon=0;
      //$LASTPOS=54000182;//user.TRank1:182
      _this.p=- 1;
      //$LASTPOS=54000188;//user.TRank1:188
      _this.x=400;
      //$LASTPOS=54000195;//user.TRank1:195
      _this.y=400;
      
      _thread.enter(function _trc_TRank1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=54000202;//user.TRank1:202
          case 1:
            if (!(1)) { __pc=6; break; }
            //$LASTPOS=54000233;//user.TRank1:233
            _this.rank=0;
            //$LASTPOS=54000245;//user.TRank1:245
            _this.px=Tonyu.globals.$VTR.x;
            //$LASTPOS=54000260;//user.TRank1:260
            _this.py=Tonyu.globals.$VTR.y;
            //$LASTPOS=54000275;//user.TRank1:275
          case 2:
            if (!(_this.dist(Tonyu.globals.$VTR.x-_this.px,Tonyu.globals.$VTR.y-_this.py)<10)) { __pc=4; break; }
            //$LASTPOS=54000353;//user.TRank1:353
            _this.px=Tonyu.globals.$VTR.x;
            //$LASTPOS=54000372;//user.TRank1:372
            _this.py=Tonyu.globals.$VTR.y;
            //$LASTPOS=54000391;//user.TRank1:391
            _this.rank=_this.rank+2;
            //$LASTPOS=54000412;//user.TRank1:412
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=54000432;//user.TRank1:432
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=54000446;//user.TRank1:446
            Tonyu.globals.$gcont=0;
            __pc=1;break;
          case 6:
            
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
  fullName: 'user.TRank2',
  shortName: 'TRank2',
  namespace: 'user',
  superclass: Tonyu.classes.user.TRank0,
  includes: [],
  methods: {
    main :function _trc_TRank2_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=55000145;//user.TRank2:145
      _this.p=- 1;
      //$LASTPOS=55000151;//user.TRank2:151
      _this.i=60;
      //$LASTPOS=55000195;//user.TRank2:195
      while (_this.i>0) {
        //$LASTPOS=55000213;//user.TRank2:213
        _this.i=_this.i-1;
        //$LASTPOS=55000224;//user.TRank2:224
        if (_this.i%2<1) {
          //$LASTPOS=55000281;//user.TRank2:281
          _this.putRank();
          
        }
        //$LASTPOS=55000302;//user.TRank2:302
        _this.update();
        
      }
    },
    fiber$main :function _trc_TRank2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=55000145;//user.TRank2:145
      _this.p=- 1;
      //$LASTPOS=55000151;//user.TRank2:151
      _this.i=60;
      
      _thread.enter(function _trc_TRank2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=55000195;//user.TRank2:195
          case 1:
            if (!(_this.i>0)) { __pc=5; break; }
            //$LASTPOS=55000213;//user.TRank2:213
            _this.i=_this.i-1;
            //$LASTPOS=55000224;//user.TRank2:224
            if (!(_this.i%2<1)) { __pc=3; break; }
            //$LASTPOS=55000281;//user.TRank2:281
            _this.fiber$putRank(_thread);
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=55000302;//user.TRank2:302
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
            __pc=1;break;
          case 5:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_TRank2_initialize(x,y,r,gc) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=55000094;//user.TRank2:94
      Tonyu.classes.user.TRank0.apply( _this, [x,y,Tonyu.globals.$pat_star+2]);
      //$LASTPOS=55000122;//user.TRank2:122
      _this.rank=r;
      //$LASTPOS=55000134;//user.TRank2:134
      _this.gcon=gc;
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"new":{"nowait":false}}}
});
Tonyu.klass.define({
  fullName: 'user.Uploader',
  shortName: 'Uploader',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [Tonyu.classes.user.NetModule],
  methods: {
    main :function _trc_Uploader_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=56000040;//user.Uploader:40
      _this.defName=_this.file("name.json").obj()||{name: ""};
      //$LASTPOS=56000086;//user.Uploader:86
      _this.ne=new Tonyu.classes.user.NameEntry({mesg: "Input your name",text: _this.defName.name});
      //$LASTPOS=56000146;//user.Uploader:146
      while (! _this.ne.isDead()) {
        //$LASTPOS=56000166;//user.Uploader:166
        _this.update();
      }
      //$LASTPOS=56000194;//user.Uploader:194
      if (_this.ne.cancelled) {
        //$LASTPOS=56000218;//user.Uploader:218
        _this.vtr.notifyCancelled();
        //$LASTPOS=56000245;//user.Uploader:245
        _this.die();
        //$LASTPOS=56000251;//user.Uploader:251
        _this.update();
        
      }
      //$LASTPOS=56000263;//user.Uploader:263
      _this.defName.name=_this.ne.text;
      //$LASTPOS=56000303;//user.Uploader:303
      _this.file("name.json").obj(_this.defName);
      //$LASTPOS=56000335;//user.Uploader:335
      _this.data.name=_this.ne.text;
      //$LASTPOS=56000355;//user.Uploader:355
      _this.n=new Tonyu.classes.user.NetIndicator;
      //$LASTPOS=56000375;//user.Uploader:375
      _this.dbInsert("Replay",_this.data);
      //$LASTPOS=56000400;//user.Uploader:400
      _this.data.uploaded=true;
      //$LASTPOS=56000420;//user.Uploader:420
      _this.n.die();
      //$LASTPOS=56000429;//user.Uploader:429
      _this.vtr.notifyUploaded();
      //$LASTPOS=56000451;//user.Uploader:451
      _this.die();
    },
    fiber$main :function _trc_Uploader_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=56000040;//user.Uploader:40
      _this.defName=_this.file("name.json").obj()||{name: ""};
      //$LASTPOS=56000086;//user.Uploader:86
      _this.ne=new Tonyu.classes.user.NameEntry({mesg: "Input your name",text: _this.defName.name});
      
      _thread.enter(function _trc_Uploader_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=56000146;//user.Uploader:146
          case 1:
            if (!(! _this.ne.isDead())) { __pc=3; break; }
            //$LASTPOS=56000166;//user.Uploader:166
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=56000194;//user.Uploader:194
            if (!(_this.ne.cancelled)) { __pc=5; break; }
            //$LASTPOS=56000218;//user.Uploader:218
            _this.vtr.notifyCancelled();
            //$LASTPOS=56000245;//user.Uploader:245
            _this.die();
            //$LASTPOS=56000251;//user.Uploader:251
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=56000263;//user.Uploader:263
            _this.defName.name=_this.ne.text;
            //$LASTPOS=56000303;//user.Uploader:303
            _this.file("name.json").obj(_this.defName);
            //$LASTPOS=56000335;//user.Uploader:335
            _this.data.name=_this.ne.text;
            //$LASTPOS=56000355;//user.Uploader:355
            _this.n=new Tonyu.classes.user.NetIndicator;
            //$LASTPOS=56000375;//user.Uploader:375
            _this.fiber$dbInsert(_thread, "Replay", _this.data);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=56000400;//user.Uploader:400
            _this.data.uploaded=true;
            //$LASTPOS=56000420;//user.Uploader:420
            _this.n.die();
            //$LASTPOS=56000429;//user.Uploader:429
            _this.vtr.notifyUploaded();
            //$LASTPOS=56000451;//user.Uploader:451
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
  fullName: 'user.VTR',
  shortName: 'VTR',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_VTR_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57000019;//user.VTR:19
      _this.x=130;
      //$LASTPOS=57000026;//user.VTR:26
      _this.y=230;
      //$LASTPOS=57000033;//user.VTR:33
      _this.p=- 1;
      //$LASTPOS=57000039;//user.VTR:39
      Tonyu.globals.$mouseX=130;
      //$LASTPOS=57000052;//user.VTR:52
      Tonyu.globals.$mouseY=230;
      //$LASTPOS=57000065;//user.VTR:65
      if (_this.playBack) {
        //$LASTPOS=57000085;//user.VTR:85
        _this.extend(_this.playBack);
        //$LASTPOS=57000107;//user.VTR:107
        _this.i=0;
        //$LASTPOS=57000116;//user.VTR:116
        _this.showMenu();
        
      } else {
        //$LASTPOS=57000141;//user.VTR:141
        _this.score=0;
        //$LASTPOS=57000154;//user.VTR:154
        _this.greatCount=0;
        //$LASTPOS=57000172;//user.VTR:172
        _this.maxCombo=0;
        //$LASTPOS=57000188;//user.VTR:188
        _this.buf=[];
        
      }
      //$LASTPOS=57000198;//user.VTR:198
      while (true) {
        //$LASTPOS=57000217;//user.VTR:217
        if (! _this.playBack) {
          //$LASTPOS=57000242;//user.VTR:242
          _this.dx=0;
          //$LASTPOS=57000256;//user.VTR:256
          if (_this.abs(_this.x-Tonyu.globals.$mouseX)<49) {
            //$LASTPOS=57000313;//user.VTR:313
            _this.dx=_this.floor(Tonyu.globals.$mouseX-_this.x)+50;
            
          } else {
            //$LASTPOS=57000352;//user.VTR:352
            if (_this.x<Tonyu.globals.$mouseX) {
              //$LASTPOS=57000381;//user.VTR:381
              _this.dx=99;
              
            }
          }
          //$LASTPOS=57000406;//user.VTR:406
          _this.dy=0;
          //$LASTPOS=57000420;//user.VTR:420
          if (_this.abs(_this.y-Tonyu.globals.$mouseY)<49) {
            //$LASTPOS=57000457;//user.VTR:457
            _this.dy=_this.floor(Tonyu.globals.$mouseY-_this.y)+50;
            
          } else {
            //$LASTPOS=57000496;//user.VTR:496
            if (_this.y<Tonyu.globals.$mouseY) {
              //$LASTPOS=57000525;//user.VTR:525
              _this.dy=99;
              
            }
          }
          //$LASTPOS=57000598;//user.VTR:598
          _this.buf.push(_this.dx+_this.dy*100);
          
        } else {
          //$LASTPOS=57000630;//user.VTR:630
          if (_this.i<_this.buf.length) {
            //$LASTPOS=57000658;//user.VTR:658
            _this.dx=_this.buf[_this.i]%100;
            //$LASTPOS=57000683;//user.VTR:683
            _this.dy=_this.floor((_this.buf[_this.i])/100);
            //$LASTPOS=57000759;//user.VTR:759
            _this.i++;
            //$LASTPOS=57000772;//user.VTR:772
            if (_this.upB&&_this.upB.clicked==1) {
              //$LASTPOS=57000813;//user.VTR:813
              new Tonyu.classes.user.Uploader({data: _this.playBack,vtr: _this});
              //$LASTPOS=57000864;//user.VTR:864
              _this.hideMenu();
              
            }
            
          }
        }
        //$LASTPOS=57000896;//user.VTR:896
        _this.x+=(_this.dx-50);
        //$LASTPOS=57000912;//user.VTR:912
        _this.y+=(_this.dy-50);
        //$LASTPOS=57001083;//user.VTR:1083
        if (_this.stopped) {
          break;
          
        }
        //$LASTPOS=57001107;//user.VTR:1107
        _this.update();
        
      }
    },
    fiber$main :function _trc_VTR_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57000019;//user.VTR:19
      _this.x=130;
      //$LASTPOS=57000026;//user.VTR:26
      _this.y=230;
      //$LASTPOS=57000033;//user.VTR:33
      _this.p=- 1;
      //$LASTPOS=57000039;//user.VTR:39
      Tonyu.globals.$mouseX=130;
      //$LASTPOS=57000052;//user.VTR:52
      Tonyu.globals.$mouseY=230;
      
      _thread.enter(function _trc_VTR_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57000065;//user.VTR:65
            if (!(_this.playBack)) { __pc=2; break; }
            //$LASTPOS=57000085;//user.VTR:85
            _this.extend(_this.playBack);
            //$LASTPOS=57000107;//user.VTR:107
            _this.i=0;
            //$LASTPOS=57000116;//user.VTR:116
            _this.fiber$showMenu(_thread);
            __pc=1;return;
          case 1:
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=57000141;//user.VTR:141
              _this.score=0;
              //$LASTPOS=57000154;//user.VTR:154
              _this.greatCount=0;
              //$LASTPOS=57000172;//user.VTR:172
              _this.maxCombo=0;
              //$LASTPOS=57000188;//user.VTR:188
              _this.buf=[];
            }
          case 3:
            
            //$LASTPOS=57000198;//user.VTR:198
          case 4:
            //$LASTPOS=57000217;//user.VTR:217
            if (!(! _this.playBack)) { __pc=5; break; }
            {
              //$LASTPOS=57000242;//user.VTR:242
              _this.dx=0;
              //$LASTPOS=57000256;//user.VTR:256
              if (_this.abs(_this.x-Tonyu.globals.$mouseX)<49) {
                //$LASTPOS=57000313;//user.VTR:313
                _this.dx=_this.floor(Tonyu.globals.$mouseX-_this.x)+50;
                
              } else {
                //$LASTPOS=57000352;//user.VTR:352
                if (_this.x<Tonyu.globals.$mouseX) {
                  //$LASTPOS=57000381;//user.VTR:381
                  _this.dx=99;
                  
                }
              }
              //$LASTPOS=57000406;//user.VTR:406
              _this.dy=0;
              //$LASTPOS=57000420;//user.VTR:420
              if (_this.abs(_this.y-Tonyu.globals.$mouseY)<49) {
                //$LASTPOS=57000457;//user.VTR:457
                _this.dy=_this.floor(Tonyu.globals.$mouseY-_this.y)+50;
                
              } else {
                //$LASTPOS=57000496;//user.VTR:496
                if (_this.y<Tonyu.globals.$mouseY) {
                  //$LASTPOS=57000525;//user.VTR:525
                  _this.dy=99;
                  
                }
              }
              //$LASTPOS=57000598;//user.VTR:598
              _this.buf.push(_this.dx+_this.dy*100);
            }
            __pc=9;break;
          case 5:
            //$LASTPOS=57000630;//user.VTR:630
            if (!(_this.i<_this.buf.length)) { __pc=8; break; }
            //$LASTPOS=57000658;//user.VTR:658
            _this.dx=_this.buf[_this.i]%100;
            //$LASTPOS=57000683;//user.VTR:683
            _this.dy=_this.floor((_this.buf[_this.i])/100);
            //$LASTPOS=57000759;//user.VTR:759
            _this.i++;
            //$LASTPOS=57000772;//user.VTR:772
            if (!(_this.upB&&_this.upB.clicked==1)) { __pc=7; break; }
            //$LASTPOS=57000813;//user.VTR:813
            new Tonyu.classes.user.Uploader({data: _this.playBack,vtr: _this});
            //$LASTPOS=57000864;//user.VTR:864
            _this.fiber$hideMenu(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
          case 9:
            
            //$LASTPOS=57000896;//user.VTR:896
            _this.x+=(_this.dx-50);
            //$LASTPOS=57000912;//user.VTR:912
            _this.y+=(_this.dy-50);
            //$LASTPOS=57001083;//user.VTR:1083
            if (!(_this.stopped)) { __pc=10; break; }
            __pc=12; break;
            
          case 10:
            
            //$LASTPOS=57001107;//user.VTR:1107
            _this.fiber$update(_thread);
            __pc=11;return;
          case 11:
            
            __pc=4;break;
          case 12:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    data :function _trc_VTR_data() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      return {buf: _this.buf,score: _this.score,greatCount: _this.greatCount,maxCombo: _this.maxCombo};
    },
    fiber$data :function _trc_VTR_f_data(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      _thread.retVal={buf: _this.buf,score: _this.score,greatCount: _this.greatCount,maxCombo: _this.maxCombo};return;
      
      
      _thread.retVal=_this;return;
    },
    addGreat :function _trc_VTR_addGreat(combo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001201;//user.VTR:1201
      _this.greatCount++;
      //$LASTPOS=57001219;//user.VTR:1219
      if (combo>_this.maxCombo) {
        //$LASTPOS=57001239;//user.VTR:1239
        _this.maxCombo=combo;
      }
    },
    fiber$addGreat :function _trc_VTR_f_addGreat(_thread,combo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001201;//user.VTR:1201
      _this.greatCount++;
      //$LASTPOS=57001219;//user.VTR:1219
      if (combo>_this.maxCombo) {
        //$LASTPOS=57001239;//user.VTR:1239
        _this.maxCombo=combo;
      }
      
      _thread.retVal=_this;return;
    },
    notifyUploaded :function _trc_VTR_notifyUploaded() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001281;//user.VTR:1281
      _this.uploaded=true;
      //$LASTPOS=57001300;//user.VTR:1300
      _this.showMenu();
    },
    fiber$notifyUploaded :function _trc_VTR_f_notifyUploaded(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001281;//user.VTR:1281
      _this.uploaded=true;
      
      _thread.enter(function _trc_VTR_ent_notifyUploaded(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57001300;//user.VTR:1300
            _this.fiber$showMenu(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    notifyCancelled :function _trc_VTR_notifyCancelled() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001339;//user.VTR:1339
      _this.showMenu();
    },
    fiber$notifyCancelled :function _trc_VTR_f_notifyCancelled(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_VTR_ent_notifyCancelled(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57001339;//user.VTR:1339
            _this.fiber$showMenu(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    stop :function _trc_VTR_stop() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001368;//user.VTR:1368
      _this.score=Tonyu.globals.$score;
      //$LASTPOS=57001386;//user.VTR:1386
      _this.stopped=true;
      //$LASTPOS=57001404;//user.VTR:1404
      _this.hideMenu();
    },
    fiber$stop :function _trc_VTR_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001368;//user.VTR:1368
      _this.score=Tonyu.globals.$score;
      //$LASTPOS=57001386;//user.VTR:1386
      _this.stopped=true;
      
      _thread.enter(function _trc_VTR_ent_stop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57001404;//user.VTR:1404
            _this.fiber$hideMenu(_thread);
            __pc=1;return;
          case 1:
            
            _thread.exit(_this);return;
          }
        }
      });
    },
    hideMenu :function _trc_VTR_hideMenu() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001436;//user.VTR:1436
      if (_this.upB) {
        //$LASTPOS=57001447;//user.VTR:1447
        _this.upB.die();
        //$LASTPOS=57001458;//user.VTR:1458
        _this.upB=null;
        
      }
      //$LASTPOS=57001473;//user.VTR:1473
      if (_this.tiB) {
        //$LASTPOS=57001482;//user.VTR:1482
        _this.tiB.die();
      }
    },
    fiber$hideMenu :function _trc_VTR_f_hideMenu(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001436;//user.VTR:1436
      if (_this.upB) {
        //$LASTPOS=57001447;//user.VTR:1447
        _this.upB.die();
        //$LASTPOS=57001458;//user.VTR:1458
        _this.upB=null;
        
      }
      //$LASTPOS=57001473;//user.VTR:1473
      if (_this.tiB) {
        //$LASTPOS=57001482;//user.VTR:1482
        _this.tiB.die();
      }
      
      _thread.retVal=_this;return;
    },
    showMenu :function _trc_VTR_showMenu() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=57001513;//user.VTR:1513
      if (! _this.uploaded) {
        //$LASTPOS=57001528;//user.VTR:1528
        _this.upB=new Tonyu.classes.user.Button({top: 300,text: "Upload this play",height: 30});
      }
      //$LASTPOS=57001593;//user.VTR:1593
      _this.tiB=new Tonyu.classes.user.Button({top: 350,text: "Return to title",height: 30,onClick: (function anonymous_1667() {
        
        //$LASTPOS=57001685;//user.VTR:1685
        _this.loadPage(Tonyu.classes.user.Title);
      })});
    },
    fiber$showMenu :function _trc_VTR_f_showMenu(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=57001513;//user.VTR:1513
      if (! _this.uploaded) {
        //$LASTPOS=57001528;//user.VTR:1528
        _this.upB=new Tonyu.classes.user.Button({top: 300,text: "Upload this play",height: 30});
      }
      
      _thread.enter(function _trc_VTR_ent_showMenu(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=57001593;//user.VTR:1593
            _this.tiB=new Tonyu.classes.user.Button({top: 350,text: "Return to title",height: 30,onClick: (function anonymous_1667() {
              
              //$LASTPOS=57001685;//user.VTR:1685
              _this.loadPage(Tonyu.classes.user.Title);
            })});
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"data":{"nowait":false},"addGreat":{"nowait":false},"notifyUploaded":{"nowait":false},"notifyCancelled":{"nowait":false},"stop":{"nowait":false},"hideMenu":{"nowait":false},"showMenu":{"nowait":false}}}
});
