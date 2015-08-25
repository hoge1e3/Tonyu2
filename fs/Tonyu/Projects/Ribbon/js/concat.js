Tonyu.klass.define({
  fullName: 'user.Button',
  shortName: 'Button',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Button_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000414;//user.Button:414
      while (true) {
        //$LASTPOS=1000432;//user.Button:432
        if (! _this.disabled&&(_this.getkey(1)||Tonyu.globals.$touches[0].touched)) {
          //$LASTPOS=1000496;//user.Button:496
          if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
            //$LASTPOS=1000543;//user.Button:543
            _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
            
          }
          //$LASTPOS=1000603;//user.Button:603
          if (_this.clicked==1) {
            //$LASTPOS=1000633;//user.Button:633
            Tonyu.classes.user.Button.last=_this;
            //$LASTPOS=1000663;//user.Button:663
            if (_this.onClick) {
              //$LASTPOS=1000676;//user.Button:676
              _this.onClick();
            }
            
          }
          
        } else {
          //$LASTPOS=1000718;//user.Button:718
          _this.clicked=0;
          
        }
        //$LASTPOS=1000739;//user.Button:739
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
            //$LASTPOS=1000414;//user.Button:414
          case 1:
            //$LASTPOS=1000432;//user.Button:432
            if (! _this.disabled&&(_this.getkey(1)||Tonyu.globals.$touches[0].touched)) {
              //$LASTPOS=1000496;//user.Button:496
              if (_this.inRect({x: Tonyu.globals.$mouseX,y: Tonyu.globals.$mouseY})) {
                //$LASTPOS=1000543;//user.Button:543
                _this.clicked=_this.getkey(1)||Tonyu.globals.$touches[0].touched;
                
              }
              //$LASTPOS=1000603;//user.Button:603
              if (_this.clicked==1) {
                //$LASTPOS=1000633;//user.Button:633
                Tonyu.classes.user.Button.last=_this;
                //$LASTPOS=1000663;//user.Button:663
                if (_this.onClick) {
                  //$LASTPOS=1000676;//user.Button:676
                  _this.onClick();
                }
                
              }
              
            } else {
              //$LASTPOS=1000718;//user.Button:718
              _this.clicked=0;
              
            }
            //$LASTPOS=1000739;//user.Button:739
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
      
      //$LASTPOS=1000101;//user.Button:101
      Tonyu.classes.kernel.Actor.apply( _this, [options]);
      //$LASTPOS=1000121;//user.Button:121
      _this.fillStyle=_this.fillStyle||"rgb(179,255,142)";
      //$LASTPOS=1000166;//user.Button:166
      _this.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=1000204;//user.Button:204
      _this.clickedStyle=_this.clickedStyle||"white";
      //$LASTPOS=1000244;//user.Button:244
      _this.disabledStrokeStyle=_this.disabledStrokeStyle||"#ddd";
      //$LASTPOS=1000297;//user.Button:297
      _this.padding=_this.padding||5;
      //$LASTPOS=1000324;//user.Button:324
      _this.width=_this.width||Tonyu.globals.$screenWidth-100;
      //$LASTPOS=1000363;//user.Button:363
      _this.height=_this.height||50;
      //$LASTPOS=1000390;//user.Button:390
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
      
      //$LASTPOS=1000853;//user.Button:853
      c.fillStyle=_this.fillStyle||"gray";
      //$LASTPOS=1000890;//user.Button:890
      c.strokeStyle=_this.strokeStyle||"black";
      //$LASTPOS=1000932;//user.Button:932
      if (_this.disabled) {
        //$LASTPOS=1000946;//user.Button:946
        c.strokeStyle=_this.disabledStrokeStyle;
      }
      //$LASTPOS=1000985;//user.Button:985
      c.fillRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=1001027;//user.Button:1027
      c.strokeRect(_this.left,_this.top,_this.width,_this.height);
      //$LASTPOS=1001071;//user.Button:1071
      size = _this.height-_this.padding*2;
      //$LASTPOS=1001102;//user.Button:1102
      f = c.font.replace(/^[0-9]+px /,"");
      //$LASTPOS=1001145;//user.Button:1145
      c.font=size+"px "+f;
      //$LASTPOS=1001183;//user.Button:1183
      c.textBaseline="top";
      //$LASTPOS=1001209;//user.Button:1209
      c.fillStyle=_this.clicked?_this.clickedStyle:_this.disabled?_this.disabledStrokeStyle:_this.strokeStyle;
      //$LASTPOS=1001293;//user.Button:1293
      r = c.measureText(_this.text);
      //$LASTPOS=1001324;//user.Button:1324
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
      
      //$LASTPOS=2000081;//user.Flash:81
      _this.p=- 1;
      //$LASTPOS=2000088;//user.Flash:88
      _this.v=0;
      //$LASTPOS=2000093;//user.Flash:93
      while (1) {
        //$LASTPOS=2000109;//user.Flash:109
        _this.update();
        //$LASTPOS=2000123;//user.Flash:123
        Tonyu.globals.$Screen.setBGColor(_this.color(_this.v,_this.v,100+_this.trunc(_this.v/2)));
        //$LASTPOS=2000175;//user.Flash:175
        _this.v=_this.v-20;
        //$LASTPOS=2000187;//user.Flash:187
        if (_this.v<10) {
          //$LASTPOS=2000197;//user.Flash:197
          _this.v=0;
        }
        
      }
      //$LASTPOS=2000204;//user.Flash:204
      _this.die();
    },
    fiber$main :function _trc_Flash_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000081;//user.Flash:81
      _this.p=- 1;
      //$LASTPOS=2000088;//user.Flash:88
      _this.v=0;
      
      _thread.enter(function _trc_Flash_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=2000093;//user.Flash:93
          case 1:
            if (!(1)) { __pc=3; break; }
            //$LASTPOS=2000109;//user.Flash:109
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=2000123;//user.Flash:123
            Tonyu.globals.$Screen.setBGColor(_this.color(_this.v,_this.v,100+_this.trunc(_this.v/2)));
            //$LASTPOS=2000175;//user.Flash:175
            _this.v=_this.v-20;
            //$LASTPOS=2000187;//user.Flash:187
            if (_this.v<10) {
              //$LASTPOS=2000197;//user.Flash:197
              _this.v=0;
            }
            __pc=1;break;
          case 3:
            
            //$LASTPOS=2000204;//user.Flash:204
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    doFlash :function _trc_Flash_doFlash() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=2000071;//user.Flash:71
      _this.v=255;
    },
    fiber$doFlash :function _trc_Flash_f_doFlash(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=2000071;//user.Flash:71
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
      
      //$LASTPOS=3000020;//user.Main:20
      Tonyu.globals.$VTR=new Tonyu.classes.user.VTR({playBack: _this.playBack});
      //$LASTPOS=3000098;//user.Main:98
      Tonyu.globals.$ths=[];
      //$LASTPOS=3000107;//user.Main:107
      //$LASTPOS=3000112;//user.Main:112
      _this.i=0;
      while(_this.i<13) {
        {
          //$LASTPOS=3000135;//user.Main:135
          _this.t=new Tonyu.classes.user.Pend({t: _this.t});
          //$LASTPOS=3000154;//user.Main:154
          Tonyu.globals.$ths.push(_this.t);
        }
        _this.i++;
      }
      //$LASTPOS=3000170;//user.Main:170
      Tonyu.globals.$kasc=0;
      //$LASTPOS=3000300;//user.Main:300
      _this.p=- 1;
      //$LASTPOS=3000306;//user.Main:306
      _this.ppc=0;
      //$LASTPOS=3000313;//user.Main:313
      Tonyu.globals.$mu=0.95;
      //$LASTPOS=3000336;//user.Main:336
      Tonyu.globals.$score=0;
      //$LASTPOS=3000346;//user.Main:346
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_Main,true);
      //$LASTPOS=3000377;//user.Main:377
      Tonyu.globals.$srank=2000;
      //$LASTPOS=3000390;//user.Main:390
      Tonyu.globals.$time=60;
      //$LASTPOS=3000400;//user.Main:400
      Tonyu.globals.$level=1;
      //$LASTPOS=3000410;//user.Main:410
      Tonyu.globals.$exp=0;
      //$LASTPOS=3000418;//user.Main:418
      _this.x=100;
      //$LASTPOS=3000424;//user.Main:424
      _this.y=30;
      //$LASTPOS=3000430;//user.Main:430
      new Tonyu.classes.user.Star;
      //$LASTPOS=3000440;//user.Main:440
      Tonyu.globals.$rank=new Tonyu.classes.user.TRank1;
      //$LASTPOS=3000458;//user.Main:458
      Tonyu.globals.$Flsh=new Tonyu.classes.user.Flash;
      //$LASTPOS=3000475;//user.Main:475
      if (Tonyu.globals.$debug) {
        //$LASTPOS=3000487;//user.Main:487
        _this.charC=new Tonyu.classes.kernel.Actor({x: 20,y: 20,text: 0});
      }
      //$LASTPOS=3000523;//user.Main:523
      while (1) {
        //$LASTPOS=3000538;//user.Main:538
        _this.update();
        //$LASTPOS=3000552;//user.Main:552
        if (_this.charC) {
          //$LASTPOS=3000563;//user.Main:563
          _this.charC.text=_this.all().length;
        }
        //$LASTPOS=3000605;//user.Main:605
        if (Tonyu.globals.$tincr) {
          //$LASTPOS=3000617;//user.Main:617
          _this.i=Tonyu.globals.$tincr.i;
        } else {
          //$LASTPOS=3000634;//user.Main:634
          _this.i=120;
        }
        //$LASTPOS=3000645;//user.Main:645
        _this.status();
        //$LASTPOS=3000686;//user.Main:686
        if (Tonyu.globals.$time>0) {
          //$LASTPOS=3000709;//user.Main:709
          _this.drawText(300,_this.y,"Time :"+_this.trunc(Tonyu.globals.$time),_this.color(255,255,255));
          //$LASTPOS=3000775;//user.Main:775
          Tonyu.globals.$time=Tonyu.globals.$time-(1/30);
          
        } else {
          //$LASTPOS=3000846;//user.Main:846
          _this.gov();
          
        }
        //$LASTPOS=3000965;//user.Main:965
        if (Tonyu.globals.$exp>Tonyu.globals.$level*5&&Tonyu.globals.$time>0) {
          //$LASTPOS=3001006;//user.Main:1006
          Tonyu.globals.$tincr=_this.appear(new Tonyu.classes.user.TimeIncr(400,_this.y+20,_this.trunc(Tonyu.globals.$time)*10*Tonyu.globals.$level));
          //$LASTPOS=3001078;//user.Main:1078
          Tonyu.globals.$level+=1;
          //$LASTPOS=3001097;//user.Main:1097
          Tonyu.globals.$exp=0;
          //$LASTPOS=3001136;//user.Main:1136
          _this.appear(new Tonyu.classes.user.Star(100,- 100,Tonyu.globals.$pat_star+3,0));
          
        }
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3000020;//user.Main:20
      Tonyu.globals.$VTR=new Tonyu.classes.user.VTR({playBack: _this.playBack});
      //$LASTPOS=3000098;//user.Main:98
      Tonyu.globals.$ths=[];
      //$LASTPOS=3000107;//user.Main:107
      //$LASTPOS=3000112;//user.Main:112
      _this.i=0;
      while(_this.i<13) {
        {
          //$LASTPOS=3000135;//user.Main:135
          _this.t=new Tonyu.classes.user.Pend({t: _this.t});
          //$LASTPOS=3000154;//user.Main:154
          Tonyu.globals.$ths.push(_this.t);
        }
        _this.i++;
      }
      //$LASTPOS=3000170;//user.Main:170
      Tonyu.globals.$kasc=0;
      //$LASTPOS=3000300;//user.Main:300
      _this.p=- 1;
      //$LASTPOS=3000306;//user.Main:306
      _this.ppc=0;
      //$LASTPOS=3000313;//user.Main:313
      Tonyu.globals.$mu=0.95;
      //$LASTPOS=3000336;//user.Main:336
      Tonyu.globals.$score=0;
      //$LASTPOS=3000346;//user.Main:346
      Tonyu.globals.$sound.playBGM(Tonyu.globals.$se_Main,true);
      //$LASTPOS=3000377;//user.Main:377
      Tonyu.globals.$srank=2000;
      //$LASTPOS=3000390;//user.Main:390
      Tonyu.globals.$time=60;
      //$LASTPOS=3000400;//user.Main:400
      Tonyu.globals.$level=1;
      //$LASTPOS=3000410;//user.Main:410
      Tonyu.globals.$exp=0;
      //$LASTPOS=3000418;//user.Main:418
      _this.x=100;
      //$LASTPOS=3000424;//user.Main:424
      _this.y=30;
      //$LASTPOS=3000430;//user.Main:430
      new Tonyu.classes.user.Star;
      //$LASTPOS=3000440;//user.Main:440
      Tonyu.globals.$rank=new Tonyu.classes.user.TRank1;
      //$LASTPOS=3000458;//user.Main:458
      Tonyu.globals.$Flsh=new Tonyu.classes.user.Flash;
      //$LASTPOS=3000475;//user.Main:475
      if (Tonyu.globals.$debug) {
        //$LASTPOS=3000487;//user.Main:487
        _this.charC=new Tonyu.classes.kernel.Actor({x: 20,y: 20,text: 0});
      }
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3000523;//user.Main:523
          case 1:
            if (!(1)) { __pc=10; break; }
            //$LASTPOS=3000538;//user.Main:538
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=3000552;//user.Main:552
            if (_this.charC) {
              //$LASTPOS=3000563;//user.Main:563
              _this.charC.text=_this.all().length;
            }
            //$LASTPOS=3000605;//user.Main:605
            if (Tonyu.globals.$tincr) {
              //$LASTPOS=3000617;//user.Main:617
              _this.i=Tonyu.globals.$tincr.i;
            } else {
              //$LASTPOS=3000634;//user.Main:634
              _this.i=120;
            }
            //$LASTPOS=3000645;//user.Main:645
            _this.fiber$status(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=3000686;//user.Main:686
            if (!(Tonyu.globals.$time>0)) { __pc=4; break; }
            {
              //$LASTPOS=3000709;//user.Main:709
              _this.drawText(300,_this.y,"Time :"+_this.trunc(Tonyu.globals.$time),_this.color(255,255,255));
              //$LASTPOS=3000775;//user.Main:775
              Tonyu.globals.$time=Tonyu.globals.$time-(1/30);
            }
            __pc=6;break;
          case 4:
            //$LASTPOS=3000846;//user.Main:846
            _this.fiber$gov(_thread);
            __pc=5;return;
          case 5:
            
          case 6:
            
            //$LASTPOS=3000965;//user.Main:965
            if (!(Tonyu.globals.$exp>Tonyu.globals.$level*5&&Tonyu.globals.$time>0)) { __pc=9; break; }
            //$LASTPOS=3001006;//user.Main:1006
            _this.fiber$appear(_thread, new Tonyu.classes.user.TimeIncr(400,_this.y+20,_this.trunc(Tonyu.globals.$time)*10*Tonyu.globals.$level));
            __pc=7;return;
          case 7:
            Tonyu.globals.$tincr=_thread.retVal;
            
            //$LASTPOS=3001078;//user.Main:1078
            Tonyu.globals.$level+=1;
            //$LASTPOS=3001097;//user.Main:1097
            Tonyu.globals.$exp=0;
            //$LASTPOS=3001136;//user.Main:1136
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
      
      //$LASTPOS=3001202;//user.Main:1202
      _this.drawText(_this.x,_this.y,"Score: "+Tonyu.globals.$score,_this.color(255,255,255));
      //$LASTPOS=3001257;//user.Main:1257
      if (_this.i<60||(_this.i%2)<1) {
        //$LASTPOS=3001282;//user.Main:1282
        _this.drawText(400,_this.y,"level:"+_this.trunc(Tonyu.globals.$level),_this.color(155,255,255));
      }
    },
    fiber$status :function _trc_Main_f_status(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=3001202;//user.Main:1202
      _this.drawText(_this.x,_this.y,"Score: "+Tonyu.globals.$score,_this.color(255,255,255));
      //$LASTPOS=3001257;//user.Main:1257
      if (_this.i<60||(_this.i%2)<1) {
        //$LASTPOS=3001282;//user.Main:1282
        _this.drawText(400,_this.y,"level:"+_this.trunc(Tonyu.globals.$level),_this.color(155,255,255));
      }
      
      _thread.retVal=_this;return;
    },
    gov :function _trc_Main_gov() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=3001357;//user.Main:1357
      Tonyu.globals.$VTR.stop();
      //$LASTPOS=3001374;//user.Main:1374
      while (_this.all(Tonyu.classes.user.Uploader).length>0) {
        //$LASTPOS=3001405;//user.Main:1405
        _this.update();
      }
      //$LASTPOS=3001419;//user.Main:1419
      Tonyu.globals.$VTR.hideMenu();
      //$LASTPOS=3001440;//user.Main:1440
      if (! _this.playBack||! _this.playBack.uploaded) {
        //$LASTPOS=3001487;//user.Main:1487
        _this.playBack=_this.playBack||Tonyu.globals.$VTR.data();
        //$LASTPOS=3001527;//user.Main:1527
        new Tonyu.classes.user.Button({top: 150,text: "PlayBack",height: 50,page: Tonyu.classes.user.Main,arg: {playBack: _this.playBack}});
        
      }
      //$LASTPOS=3001644;//user.Main:1644
      new Tonyu.classes.user.Button({top: 250,text: "Retry",height: 30,page: Tonyu.classes.user.Main});
      //$LASTPOS=3001702;//user.Main:1702
      new Tonyu.classes.user.Button({top: 300,text: "Title",height: 30,page: Tonyu.classes.user.Title});
      //$LASTPOS=3001761;//user.Main:1761
      Tonyu.classes.user.Button.last=null;
      //$LASTPOS=3001783;//user.Main:1783
      while (! Tonyu.classes.user.Button.last) {
        //$LASTPOS=3001804;//user.Main:1804
        _this.status();
        //$LASTPOS=3001813;//user.Main:1813
        _this.update();
        
      }
      //$LASTPOS=3001828;//user.Main:1828
      //$LASTPOS=3001833;//user.Main:1833
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=3001863;//user.Main:1863
          Tonyu.classes.user.Button.last.fillStyle="white";
          //$LASTPOS=3001902;//user.Main:1902
          _this.update();
          //$LASTPOS=3001920;//user.Main:1920
          Tonyu.classes.user.Button.last.fillStyle="gray";
          //$LASTPOS=3001958;//user.Main:1958
          _this.update();
        }
        i++;
      }
      //$LASTPOS=3001978;//user.Main:1978
      _this.loadPage(Tonyu.classes.user.Button.last.page,Tonyu.classes.user.Button.last.arg);
    },
    fiber$gov :function _trc_Main_f_gov(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=3001357;//user.Main:1357
      Tonyu.globals.$VTR.stop();
      
      _thread.enter(function _trc_Main_ent_gov(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=3001374;//user.Main:1374
          case 1:
            if (!(_this.all(Tonyu.classes.user.Uploader).length>0)) { __pc=3; break; }
            //$LASTPOS=3001405;//user.Main:1405
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=3001419;//user.Main:1419
            Tonyu.globals.$VTR.hideMenu();
            //$LASTPOS=3001440;//user.Main:1440
            if (! _this.playBack||! _this.playBack.uploaded) {
              //$LASTPOS=3001487;//user.Main:1487
              _this.playBack=_this.playBack||Tonyu.globals.$VTR.data();
              //$LASTPOS=3001527;//user.Main:1527
              new Tonyu.classes.user.Button({top: 150,text: "PlayBack",height: 50,page: Tonyu.classes.user.Main,arg: {playBack: _this.playBack}});
              
            }
            //$LASTPOS=3001644;//user.Main:1644
            new Tonyu.classes.user.Button({top: 250,text: "Retry",height: 30,page: Tonyu.classes.user.Main});
            //$LASTPOS=3001702;//user.Main:1702
            new Tonyu.classes.user.Button({top: 300,text: "Title",height: 30,page: Tonyu.classes.user.Title});
            //$LASTPOS=3001761;//user.Main:1761
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=3001783;//user.Main:1783
          case 4:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=7; break; }
            //$LASTPOS=3001804;//user.Main:1804
            _this.fiber$status(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=3001813;//user.Main:1813
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
            __pc=4;break;
          case 7:
            
            //$LASTPOS=3001828;//user.Main:1828
            //$LASTPOS=3001833;//user.Main:1833
            i = 0;;
          case 8:
            if (!(i<5)) { __pc=11; break; }
            //$LASTPOS=3001863;//user.Main:1863
            Tonyu.classes.user.Button.last.fillStyle="white";
            //$LASTPOS=3001902;//user.Main:1902
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            //$LASTPOS=3001920;//user.Main:1920
            Tonyu.classes.user.Button.last.fillStyle="gray";
            //$LASTPOS=3001958;//user.Main:1958
            _this.fiber$update(_thread);
            __pc=10;return;
          case 10:
            
            i++;
            __pc=8;break;
          case 11:
            
            //$LASTPOS=3001978;//user.Main:1978
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
      
      //$LASTPOS=4000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=4000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=4000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=4000017;//user.NameEntry:17
      _this.y=100;
      //$LASTPOS=4000024;//user.NameEntry:24
      _this.me=new Tonyu.classes.kernel.Actor({text: "Input your name:",align: "left",x: _this.x,y: _this.y-20,size: 15});
      //$LASTPOS=4000093;//user.NameEntry:93
      _this.align="left";
      //$LASTPOS=4000107;//user.NameEntry:107
      if (! _this.text) {
        //$LASTPOS=4000118;//user.NameEntry:118
        _this.text="";
      }
      //$LASTPOS=4000127;//user.NameEntry:127
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @";
      //$LASTPOS=4000175;//user.NameEntry:175
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=4000209;//user.NameEntry:209
      _this.bts=[];
      //$LASTPOS=4000217;//user.NameEntry:217
      //$LASTPOS=4000222;//user.NameEntry:222
      _this.i=0;
      while(_this.i<_this.cand.length) {
        {
          //$LASTPOS=4000251;//user.NameEntry:251
          _this.ch=_this.cand.substring(_this.i,_this.i+1);
          //$LASTPOS=4000281;//user.NameEntry:281
          _this.m=_this.map[_this.ch];
          //$LASTPOS=4000296;//user.NameEntry:296
          _this.putKey((_this.m?_this.m:_this.ch),_this.floor(_this.i/8),_this.i%8);
        }
        _this.i++;
      }
      //$LASTPOS=4000361;//user.NameEntry:361
      _this.size=30;
      //$LASTPOS=4000370;//user.NameEntry:370
      _this.bts.push(_this.okb=new Tonyu.classes.user.Button({disabled: _this.text.length==0,left: _this.x,width: 200,top: _this.y+300,height: 30,text: "OK",onClick: (function anonymous_490() {
        
        //$LASTPOS=4000503;//user.NameEntry:503
        _this.entered=true;
        //$LASTPOS=4000525;//user.NameEntry:525
        _this.die();
      })}));
      //$LASTPOS=4000542;//user.NameEntry:542
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+230,width: 200,top: _this.y+300,height: 30,text: "Cancel",onClick: (function anonymous_627() {
        
        //$LASTPOS=4000640;//user.NameEntry:640
        _this.cancelled=true;
        //$LASTPOS=4000664;//user.NameEntry:664
        _this.die();
      })}));
    },
    fiber$main :function _trc_NameEntry_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4000001;//user.NameEntry:1
      _this.W=50;
      //$LASTPOS=4000006;//user.NameEntry:6
      _this.H=50;
      //$LASTPOS=4000012;//user.NameEntry:12
      _this.x=20;
      //$LASTPOS=4000017;//user.NameEntry:17
      _this.y=100;
      //$LASTPOS=4000024;//user.NameEntry:24
      _this.me=new Tonyu.classes.kernel.Actor({text: "Input your name:",align: "left",x: _this.x,y: _this.y-20,size: 15});
      //$LASTPOS=4000093;//user.NameEntry:93
      _this.align="left";
      //$LASTPOS=4000107;//user.NameEntry:107
      if (! _this.text) {
        //$LASTPOS=4000118;//user.NameEntry:118
        _this.text="";
      }
      //$LASTPOS=4000127;//user.NameEntry:127
      _this.cand="ABCDEFGHIJKLMNOPQRSTUVWXYZ.0123456789 @";
      //$LASTPOS=4000175;//user.NameEntry:175
      _this.map={"@": "BS"," ": "SP",";": "OK"};
      //$LASTPOS=4000209;//user.NameEntry:209
      _this.bts=[];
      //$LASTPOS=4000217;//user.NameEntry:217
      //$LASTPOS=4000222;//user.NameEntry:222
      _this.i=0;
      while(_this.i<_this.cand.length) {
        {
          //$LASTPOS=4000251;//user.NameEntry:251
          _this.ch=_this.cand.substring(_this.i,_this.i+1);
          //$LASTPOS=4000281;//user.NameEntry:281
          _this.m=_this.map[_this.ch];
          //$LASTPOS=4000296;//user.NameEntry:296
          _this.putKey((_this.m?_this.m:_this.ch),_this.floor(_this.i/8),_this.i%8);
        }
        _this.i++;
      }
      //$LASTPOS=4000361;//user.NameEntry:361
      _this.size=30;
      //$LASTPOS=4000370;//user.NameEntry:370
      _this.bts.push(_this.okb=new Tonyu.classes.user.Button({disabled: _this.text.length==0,left: _this.x,width: 200,top: _this.y+300,height: 30,text: "OK",onClick: (function anonymous_490() {
        
        //$LASTPOS=4000503;//user.NameEntry:503
        _this.entered=true;
        //$LASTPOS=4000525;//user.NameEntry:525
        _this.die();
      })}));
      //$LASTPOS=4000542;//user.NameEntry:542
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+230,width: 200,top: _this.y+300,height: 30,text: "Cancel",onClick: (function anonymous_627() {
        
        //$LASTPOS=4000640;//user.NameEntry:640
        _this.cancelled=true;
        //$LASTPOS=4000664;//user.NameEntry:664
        _this.die();
      })}));
      
      _thread.retVal=_this;return;
    },
    die :function _trc_NameEntry_die() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var b;
      var _it_5;
      
      //$LASTPOS=4000757;//user.NameEntry:757
      _it_5=Tonyu.iterator(_this.bts,1);
      while(_it_5.next()) {
        b=_it_5[0];
        
        //$LASTPOS=4000776;//user.NameEntry:776
        b.die();
      }
      //$LASTPOS=4000789;//user.NameEntry:789
      _this.me.die();
      //$LASTPOS=4000803;//user.NameEntry:803
      Tonyu.classes.kernel.Actor.prototype.die.apply( _this, []);
    },
    putKey :function _trc_NameEntry_putKey(letter,r,c) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4000853;//user.NameEntry:853
      _this.bts.push(new Tonyu.classes.user.Button({left: _this.x+c*_this.W,top: _this.y+50+r*_this.W,width: _this.W-5,height: _this.H-5,padding: 5,text: letter,onClick: (function anonymous_984() {
        
        //$LASTPOS=4000988;//user.NameEntry:988
        _this.keyin(letter);
      }),fillStyle: "#fe8"}));
    },
    keyin :function _trc_NameEntry_keyin(l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=4001056;//user.NameEntry:1056
      if (l=="SP") {
        //$LASTPOS=4001069;//user.NameEntry:1069
        l=" ";
      }
      //$LASTPOS=4001080;//user.NameEntry:1080
      if (l=="BS") {
        //$LASTPOS=4001093;//user.NameEntry:1093
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=4001140;//user.NameEntry:1140
        _this.text+=l;
      }
      //$LASTPOS=4001153;//user.NameEntry:1153
      _this.okb.disabled=(_this.text.length==0);
    },
    fiber$keyin :function _trc_NameEntry_f_keyin(_thread,l) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=4001056;//user.NameEntry:1056
      if (l=="SP") {
        //$LASTPOS=4001069;//user.NameEntry:1069
        l=" ";
      }
      //$LASTPOS=4001080;//user.NameEntry:1080
      if (l=="BS") {
        //$LASTPOS=4001093;//user.NameEntry:1093
        _this.text=_this.text.substring(0,_this.text.length-1);
      } else {
        //$LASTPOS=4001140;//user.NameEntry:1140
        _this.text+=l;
      }
      //$LASTPOS=4001153;//user.NameEntry:1153
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
      
      //$LASTPOS=5000000;//user.NetIndicator:0
      _this.text="Plase wait...";
      //$LASTPOS=5000022;//user.NetIndicator:22
      _this.x=235;
      //$LASTPOS=5000028;//user.NetIndicator:28
      _this.y=235;
      //$LASTPOS=5000034;//user.NetIndicator:34
      _this.size=30;
      //$LASTPOS=5000042;//user.NetIndicator:42
      _this.vy=0.1;
      //$LASTPOS=5000050;//user.NetIndicator:50
      while (true) {
        //$LASTPOS=5000068;//user.NetIndicator:68
        _this.y+=_this.vy;
        //$LASTPOS=5000079;//user.NetIndicator:79
        _this.vy+=0.1;
        //$LASTPOS=5000092;//user.NetIndicator:92
        if (_this.y>235) {
          //$LASTPOS=5000103;//user.NetIndicator:103
          _this.vy=- 1;
        }
        //$LASTPOS=5000114;//user.NetIndicator:114
        _this.update();
        
      }
    },
    fiber$main :function _trc_NetIndicator_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=5000000;//user.NetIndicator:0
      _this.text="Plase wait...";
      //$LASTPOS=5000022;//user.NetIndicator:22
      _this.x=235;
      //$LASTPOS=5000028;//user.NetIndicator:28
      _this.y=235;
      //$LASTPOS=5000034;//user.NetIndicator:34
      _this.size=30;
      //$LASTPOS=5000042;//user.NetIndicator:42
      _this.vy=0.1;
      
      _thread.enter(function _trc_NetIndicator_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=5000050;//user.NetIndicator:50
          case 1:
            //$LASTPOS=5000068;//user.NetIndicator:68
            _this.y+=_this.vy;
            //$LASTPOS=5000079;//user.NetIndicator:79
            _this.vy+=0.1;
            //$LASTPOS=5000092;//user.NetIndicator:92
            if (_this.y>235) {
              //$LASTPOS=5000103;//user.NetIndicator:103
              _this.vy=- 1;
            }
            //$LASTPOS=5000114;//user.NetIndicator:114
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
      
      //$LASTPOS=6000114;//user.NetModule:114
      res = WebSite.serverTop;
      //$LASTPOS=6000145;//user.NetModule:145
      if (res.match(/\/$/)) {
        //$LASTPOS=6000167;//user.NetModule:167
        res=res.substring(0,res.length-1);
      }
      return res;
    },
    fiber$serverTop :function _trc_NetModule_f_serverTop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var res;
      
      //$LASTPOS=6000114;//user.NetModule:114
      res = WebSite.serverTop;
      //$LASTPOS=6000145;//user.NetModule:145
      if (res.match(/\/$/)) {
        //$LASTPOS=6000167;//user.NetModule:167
        res=res.substring(0,res.length-1);
      }
      _thread.retVal=res;return;
      
      
      _thread.retVal=_this;return;
    },
    getProjectName :function _trc_NetModule_getProjectName() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6000244;//user.NetModule:244
      if (_this.project) {
        return _this.project;
      }
      //$LASTPOS=6000277;//user.NetModule:277
      _this.project=Tonyu.currentProject.getName();
      //$LASTPOS=6000358;//user.NetModule:358
      _this.appAuthID="APPAUTH_EMBED_MARK";
      return _this.project;
    },
    fiber$getProjectName :function _trc_NetModule_f_getProjectName(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6000244;//user.NetModule:244
      if (_this.project) {
        _thread.retVal=_this.project;return;
        
      }
      //$LASTPOS=6000277;//user.NetModule:277
      _this.project=Tonyu.currentProject.getName();
      //$LASTPOS=6000358;//user.NetModule:358
      _this.appAuthID="APPAUTH_EMBED_MARK";
      _thread.retVal=_this.project;return;
      
      
      _thread.retVal=_this;return;
    },
    map :function _trc_NetModule_map(a,f) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var res;
      var e;
      var _it_9;
      
      //$LASTPOS=6000429;//user.NetModule:429
      res = [];
      //$LASTPOS=6000445;//user.NetModule:445
      _it_9=Tonyu.iterator(a,1);
      while(_it_9.next()) {
        e=_it_9[0];
        
        //$LASTPOS=6000472;//user.NetModule:472
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
      var _it_9;
      
      //$LASTPOS=6000429;//user.NetModule:429
      res = [];
      //$LASTPOS=6000445;//user.NetModule:445
      _it_9=Tonyu.iterator(a,1);
      while(_it_9.next()) {
        e=_it_9[0];
        
        //$LASTPOS=6000472;//user.NetModule:472
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
      var _it_13;
      
      //$LASTPOS=6000545;//user.NetModule:545
      _this.getProjectName();
      //$LASTPOS=6000567;//user.NetModule:567
      if (! (records instanceof Array)) {
        //$LASTPOS=6000600;//user.NetModule:600
        records=[records];
      }
      //$LASTPOS=6000623;//user.NetModule:623
      a = _this.asyncResult();
      //$LASTPOS=6000648;//user.NetModule:648
      $.ajax({url: _this.serverTop()+"/dbInsert",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json))),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=6000903;//user.NetModule:903
      res;
      //$LASTPOS=6000916;//user.NetModule:916
      res=_this.waitFor(a);
      //$LASTPOS=6000936;//user.NetModule:936
      _it_13=Tonyu.iterator(a[0],2);
      while(_it_13.next()) {
        i=_it_13[0];
        id=_it_13[1];
        
        //$LASTPOS=6000969;//user.NetModule:969
        records[i]._kind=kind;
        //$LASTPOS=6001000;//user.NetModule:1000
        records[i]._id=id;
        
      }
      //$LASTPOS=6001048;//user.NetModule:1048
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
      var _it_13;
      
      
      _thread.enter(function _trc_NetModule_ent_dbInsert(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6000545;//user.NetModule:545
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=6000567;//user.NetModule:567
            if (! (records instanceof Array)) {
              //$LASTPOS=6000600;//user.NetModule:600
              records=[records];
            }
            //$LASTPOS=6000623;//user.NetModule:623
            a = _this.asyncResult();
            //$LASTPOS=6000648;//user.NetModule:648
            $.ajax({url: _this.serverTop()+"/dbInsert",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json))),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=6000903;//user.NetModule:903
            res;
            //$LASTPOS=6000916;//user.NetModule:916
            _this.fiber$waitFor(_thread, a);
            __pc=2;return;
          case 2:
            res=_thread.retVal;
            
            //$LASTPOS=6000936;//user.NetModule:936
            _it_13=Tonyu.iterator(a[0],2);
            while(_it_13.next()) {
              i=_it_13[0];
              id=_it_13[1];
              
              //$LASTPOS=6000969;//user.NetModule:969
              records[i]._kind=kind;
              //$LASTPOS=6001000;//user.NetModule:1000
              records[i]._id=id;
              
            }
            //$LASTPOS=6001048;//user.NetModule:1048
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
      
      //$LASTPOS=6001141;//user.NetModule:1141
      _this.getProjectName();
      //$LASTPOS=6001163;//user.NetModule:1163
      a = _this.asyncResult();
      //$LASTPOS=6001188;//user.NetModule:1188
      if (! where) {
        //$LASTPOS=6001200;//user.NetModule:1200
        where={};
      }
      //$LASTPOS=6001214;//user.NetModule:1214
      $.ajax({url: _this.serverTop()+"/dbSelect",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,where: JSON.stringify(_this.obj2json(where)),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=6001435;//user.NetModule:1435
      res;
      //$LASTPOS=6001448;//user.NetModule:1448
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
            //$LASTPOS=6001141;//user.NetModule:1141
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=6001163;//user.NetModule:1163
            a = _this.asyncResult();
            //$LASTPOS=6001188;//user.NetModule:1188
            if (! where) {
              //$LASTPOS=6001200;//user.NetModule:1200
              where={};
            }
            //$LASTPOS=6001214;//user.NetModule:1214
            $.ajax({url: _this.serverTop()+"/dbSelect",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,where: JSON.stringify(_this.obj2json(where)),kind: kind},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=6001435;//user.NetModule:1435
            res;
            //$LASTPOS=6001448;//user.NetModule:1448
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
      
      //$LASTPOS=6001560;//user.NetModule:1560
      _this.getProjectName();
      //$LASTPOS=6001582;//user.NetModule:1582
      a = _this.asyncResult();
      //$LASTPOS=6001607;//user.NetModule:1607
      if (! (records instanceof Array)) {
        //$LASTPOS=6001643;//user.NetModule:1643
        records=[records];
      }
      //$LASTPOS=6001666;//user.NetModule:1666
      $.ajax({url: _this.serverTop()+"/dbDelete",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json)))},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
      //$LASTPOS=6001877;//user.NetModule:1877
      res;
      //$LASTPOS=6001890;//user.NetModule:1890
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
            //$LASTPOS=6001560;//user.NetModule:1560
            _this.fiber$getProjectName(_thread);
            __pc=1;return;
          case 1:
            
            //$LASTPOS=6001582;//user.NetModule:1582
            a = _this.asyncResult();
            //$LASTPOS=6001607;//user.NetModule:1607
            if (! (records instanceof Array)) {
              //$LASTPOS=6001643;//user.NetModule:1643
              records=[records];
            }
            //$LASTPOS=6001666;//user.NetModule:1666
            $.ajax({url: _this.serverTop()+"/dbDelete",type: "post",data: {project: _this.project,appAuthID: _this.appAuthID,records: JSON.stringify(_this.map(records,Tonyu.bindFunc(_this,_this.obj2json)))},success: a.receiver,error: Tonyu.bindFunc(_this,_this.handleError)});
            //$LASTPOS=6001877;//user.NetModule:1877
            res;
            //$LASTPOS=6001890;//user.NetModule:1890
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
      var _it_23;
      
      //$LASTPOS=6001947;//user.NetModule:1947
      res = {};
      //$LASTPOS=6001963;//user.NetModule:1963
      _it_23=Tonyu.iterator(json,2);
      while(_it_23.next()) {
        k=_it_23[0];
        v=_it_23[1];
        
        //$LASTPOS=6001995;//user.NetModule:1995
        if (k!="__typeMap") {
          //$LASTPOS=6002029;//user.NetModule:2029
          if (_this.annotateType(json,k)=="date") {
            //$LASTPOS=6002081;//user.NetModule:2081
            res[k]=new Date(v);
            
          } else {
            //$LASTPOS=6002138;//user.NetModule:2138
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
      var _it_23;
      
      //$LASTPOS=6001947;//user.NetModule:1947
      res = {};
      //$LASTPOS=6001963;//user.NetModule:1963
      _it_23=Tonyu.iterator(json,2);
      while(_it_23.next()) {
        k=_it_23[0];
        v=_it_23[1];
        
        //$LASTPOS=6001995;//user.NetModule:1995
        if (k!="__typeMap") {
          //$LASTPOS=6002029;//user.NetModule:2029
          if (_this.annotateType(json,k)=="date") {
            //$LASTPOS=6002081;//user.NetModule:2081
            res[k]=new Date(v);
            
          } else {
            //$LASTPOS=6002138;//user.NetModule:2138
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
      var _it_28;
      
      //$LASTPOS=6002217;//user.NetModule:2217
      res = {};
      //$LASTPOS=6002233;//user.NetModule:2233
      _it_28=Tonyu.iterator(obj,2);
      while(_it_28.next()) {
        k=_it_28[0];
        v=_it_28[1];
        
        //$LASTPOS=6002264;//user.NetModule:2264
        if (v instanceof Date) {
          //$LASTPOS=6002301;//user.NetModule:2301
          _this.annotateType(res,k,"date");
          //$LASTPOS=6002341;//user.NetModule:2341
          res[k]=v.getTime();
          
        } else {
          //$LASTPOS=6002390;//user.NetModule:2390
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
      var _it_28;
      
      //$LASTPOS=6002217;//user.NetModule:2217
      res = {};
      
      _thread.enter(function _trc_NetModule_ent_obj2json(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=6002233;//user.NetModule:2233
            _it_28=Tonyu.iterator(obj,2);
          case 1:
            if (!(_it_28.next())) { __pc=5; break; }
            k=_it_28[0];
            v=_it_28[1];
            
            //$LASTPOS=6002264;//user.NetModule:2264
            if (!(v instanceof Date)) { __pc=3; break; }
            //$LASTPOS=6002301;//user.NetModule:2301
            _this.fiber$annotateType(_thread, res, k, "date");
            __pc=2;return;
          case 2:
            
            //$LASTPOS=6002341;//user.NetModule:2341
            res[k]=v.getTime();
            __pc=4;break;
          case 3:
            {
              //$LASTPOS=6002390;//user.NetModule:2390
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
      
      //$LASTPOS=6002466;//user.NetModule:2466
      if (k=="__typeMap") {
        return "obj";
      }
      //$LASTPOS=6002504;//user.NetModule:2504
      if (type) {
        //$LASTPOS=6002524;//user.NetModule:2524
        if (! obj.__typeMap) {
          //$LASTPOS=6002544;//user.NetModule:2544
          obj.__typeMap={};
        }
        //$LASTPOS=6002570;//user.NetModule:2570
        obj.__typeMap[k]=type;
        
      } else {
        //$LASTPOS=6002614;//user.NetModule:2614
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
      
      //$LASTPOS=6002466;//user.NetModule:2466
      if (k=="__typeMap") {
        _thread.retVal="obj";return;
        
      }
      //$LASTPOS=6002504;//user.NetModule:2504
      if (type) {
        //$LASTPOS=6002524;//user.NetModule:2524
        if (! obj.__typeMap) {
          //$LASTPOS=6002544;//user.NetModule:2544
          obj.__typeMap={};
        }
        //$LASTPOS=6002570;//user.NetModule:2570
        obj.__typeMap[k]=type;
        
      } else {
        //$LASTPOS=6002614;//user.NetModule:2614
        if (! obj.__typeMap) {
          _thread.retVal="str";return;
          
        }
        _thread.retVal=obj.__typeMap[k]||"str";return;
        
        
      }
      
      _thread.retVal=_this;return;
    },
    handleError :function _trc_NetModule_handleError(a,e,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=6002724;//user.NetModule:2724
      alert(e+":"+s);
    },
    fiber$handleError :function _trc_NetModule_f_handleError(_thread,a,e,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=6002724;//user.NetModule:2724
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
      
      //$LASTPOS=7000655;//user.Pend:655
      _this.x=200;
      //$LASTPOS=7000661;//user.Pend:661
      _this.y=200;
      //$LASTPOS=7000668;//user.Pend:668
      _this.vx=0;
      //$LASTPOS=7000673;//user.Pend:673
      _this.vy=0;
      //$LASTPOS=7000679;//user.Pend:679
      _this.mu=0.7*0.9;
      //$LASTPOS=7000692;//user.Pend:692
      _this.ospd=0.1*2;
      //$LASTPOS=7000704;//user.Pend:704
      _this.spd=_this.ospd;
      //$LASTPOS=7000714;//user.Pend:714
      _this.thr=0;
      //$LASTPOS=7000721;//user.Pend:721
      _this.grav=0.3;
      //$LASTPOS=7000731;//user.Pend:731
      _this.cnt=0;
      //$LASTPOS=7000738;//user.Pend:738
      while (1) {
        //$LASTPOS=7000753;//user.Pend:753
        _this.cspd=_this.vx*_this.vx+_this.vy*_this.vy;
        //$LASTPOS=7000813;//user.Pend:813
        if (_this.t) {
          //$LASTPOS=7000830;//user.Pend:830
          _this.tx=_this.t.x;
          //$LASTPOS=7000837;//user.Pend:837
          _this.ty=_this.t.y;
          
        } else {
          //$LASTPOS=7000866;//user.Pend:866
          _this.tx=Tonyu.globals.$VTR.x;
          //$LASTPOS=7000885;//user.Pend:885
          _this.ty=Tonyu.globals.$VTR.y;
          
        }
        //$LASTPOS=7000932;//user.Pend:932
        _this.vx+=(_this.tx-_this.x)*_this.spd;
        //$LASTPOS=7000952;//user.Pend:952
        _this.vy+=(_this.ty-_this.y)*_this.spd+_this.grav;
        //$LASTPOS=7000982;//user.Pend:982
        _this.vx=_this.vx*_this.mu;
        //$LASTPOS=7000996;//user.Pend:996
        _this.vy=_this.vy*_this.mu;
        //$LASTPOS=7001015;//user.Pend:1015
        _this.x+=_this.vx;
        //$LASTPOS=7001026;//user.Pend:1026
        _this.y+=_this.vy;
        //$LASTPOS=7001042;//user.Pend:1042
        _this.p=- 1;
        //$LASTPOS=7001065;//user.Pend:1065
        if (_this.cnt%2==0) {
          //$LASTPOS=7001078;//user.Pend:1078
          _this.update();
        }
        
      }
    },
    fiber$main :function _trc_Pend_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=7000655;//user.Pend:655
      _this.x=200;
      //$LASTPOS=7000661;//user.Pend:661
      _this.y=200;
      //$LASTPOS=7000668;//user.Pend:668
      _this.vx=0;
      //$LASTPOS=7000673;//user.Pend:673
      _this.vy=0;
      //$LASTPOS=7000679;//user.Pend:679
      _this.mu=0.7*0.9;
      //$LASTPOS=7000692;//user.Pend:692
      _this.ospd=0.1*2;
      //$LASTPOS=7000704;//user.Pend:704
      _this.spd=_this.ospd;
      //$LASTPOS=7000714;//user.Pend:714
      _this.thr=0;
      //$LASTPOS=7000721;//user.Pend:721
      _this.grav=0.3;
      //$LASTPOS=7000731;//user.Pend:731
      _this.cnt=0;
      
      _thread.enter(function _trc_Pend_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=7000738;//user.Pend:738
          case 1:
            if (!(1)) { __pc=4; break; }
            //$LASTPOS=7000753;//user.Pend:753
            _this.cspd=_this.vx*_this.vx+_this.vy*_this.vy;
            //$LASTPOS=7000813;//user.Pend:813
            if (_this.t) {
              //$LASTPOS=7000830;//user.Pend:830
              _this.tx=_this.t.x;
              //$LASTPOS=7000837;//user.Pend:837
              _this.ty=_this.t.y;
              
            } else {
              //$LASTPOS=7000866;//user.Pend:866
              _this.tx=Tonyu.globals.$VTR.x;
              //$LASTPOS=7000885;//user.Pend:885
              _this.ty=Tonyu.globals.$VTR.y;
              
            }
            //$LASTPOS=7000932;//user.Pend:932
            _this.vx+=(_this.tx-_this.x)*_this.spd;
            //$LASTPOS=7000952;//user.Pend:952
            _this.vy+=(_this.ty-_this.y)*_this.spd+_this.grav;
            //$LASTPOS=7000982;//user.Pend:982
            _this.vx=_this.vx*_this.mu;
            //$LASTPOS=7000996;//user.Pend:996
            _this.vy=_this.vy*_this.mu;
            //$LASTPOS=7001015;//user.Pend:1015
            _this.x+=_this.vx;
            //$LASTPOS=7001026;//user.Pend:1026
            _this.y+=_this.vy;
            //$LASTPOS=7001042;//user.Pend:1042
            _this.p=- 1;
            //$LASTPOS=7001065;//user.Pend:1065
            if (!(_this.cnt%2==0)) { __pc=3; break; }
            //$LASTPOS=7001078;//user.Pend:1078
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
      
      //$LASTPOS=7000037;//user.Pend:37
      if (Tonyu.globals.$rank.rank<10) {
        //$LASTPOS=7000066;//user.Pend:66
        ctx.strokeStyle=_this.color(0,255,0);
        
      } else {
        //$LASTPOS=7000109;//user.Pend:109
        if (Tonyu.globals.$rank.rank<20) {
          //$LASTPOS=7000138;//user.Pend:138
          ctx.strokeStyle=_this.color(255,255,0);
          
        } else {
          //$LASTPOS=7000193;//user.Pend:193
          ctx.strokeStyle=_this.color(255,155+(Tonyu.globals.$rank.rank%4)*50,(Tonyu.globals.$rank.rank%4)*50);
          //$LASTPOS=7000269;//user.Pend:269
          ctx.lineWidth=2;
          
        }
      }
      //$LASTPOS=7000296;//user.Pend:296
      ctx.beginPath();
      //$LASTPOS=7000317;//user.Pend:317
      ctx.moveTo(_this.x,_this.y);
      //$LASTPOS=7000338;//user.Pend:338
      ctx.lineTo(_this.tx,_this.ty);
      //$LASTPOS=7000361;//user.Pend:361
      ctx.stroke();
      //$LASTPOS=7000379;//user.Pend:379
      if (! _this.t) {
        //$LASTPOS=7000397;//user.Pend:397
        rad = Tonyu.globals.$rank.rank;
        //$LASTPOS=7000425;//user.Pend:425
        if (rad>=15) {
          //$LASTPOS=7000438;//user.Pend:438
          rad=15+(Tonyu.globals.$rank.rank%4);
        }
        //$LASTPOS=7000469;//user.Pend:469
        ctx.beginPath();
        //$LASTPOS=7000494;//user.Pend:494
        ctx.arc(_this.tx,_this.ty,rad,0,6.3);
        //$LASTPOS=7000532;//user.Pend:532
        ctx.stroke();
        
      }
      //$LASTPOS=7000556;//user.Pend:556
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
      var _it_34;
      
      //$LASTPOS=8000032;//user.PlayBackList:32
      _this.n=new Tonyu.classes.user.NetIndicator;
      //$LASTPOS=8000052;//user.PlayBackList:52
      _this.s=_this.dbSelect("Replay",{$order: {score: - 1},$hide: ["buf"],$limit: 5});
      //$LASTPOS=8000117;//user.PlayBackList:117
      _this.n.die();
      //$LASTPOS=8000126;//user.PlayBackList:126
      _this.x=20;
      //$LASTPOS=8000132;//user.PlayBackList:132
      _this.y=30;
      //$LASTPOS=8000138;//user.PlayBackList:138
      _this.p=- 1;
      //$LASTPOS=8000144;//user.PlayBackList:144
      new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: "Name"});
      //$LASTPOS=8000178;//user.PlayBackList:178
      new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: "Score"});
      //$LASTPOS=8000213;//user.PlayBackList:213
      new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: "Greats"});
      //$LASTPOS=8000249;//user.PlayBackList:249
      new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: "Max Combo"});
      //$LASTPOS=8000288;//user.PlayBackList:288
      _this.y+=30;
      //$LASTPOS=8000295;//user.PlayBackList:295
      _it_34=Tonyu.iterator(_this.s,1);
      while(_it_34.next()) {
        e=_it_34[0];
        
        //$LASTPOS=8000314;//user.PlayBackList:314
        new Tonyu.classes.user.Button({left: _this.x,top: _this.y,width: 50,height: 20,text: "Play",padding: 3,e: e});
        //$LASTPOS=8000388;//user.PlayBackList:388
        new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: e.name});
        //$LASTPOS=8000426;//user.PlayBackList:426
        new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: e.score});
        //$LASTPOS=8000465;//user.PlayBackList:465
        new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: e.greatCount});
        //$LASTPOS=8000509;//user.PlayBackList:509
        new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: e.maxCombo});
        //$LASTPOS=8000551;//user.PlayBackList:551
        _this.y+=50;
        
      }
      //$LASTPOS=8000560;//user.PlayBackList:560
      new Tonyu.classes.user.Button({left: _this.x,top: _this.y,text: "Back",page: Tonyu.classes.user.Title,height: 20,width: 400});
      //$LASTPOS=8000629;//user.PlayBackList:629
      Tonyu.classes.user.Button.last=null;
      //$LASTPOS=8000647;//user.PlayBackList:647
      while (! Tonyu.classes.user.Button.last) {
        //$LASTPOS=8000668;//user.PlayBackList:668
        _this.update();
      }
      //$LASTPOS=8000678;//user.PlayBackList:678
      if (Tonyu.classes.user.Button.last.page) {
        //$LASTPOS=8000706;//user.PlayBackList:706
        _this.loadPage(Tonyu.classes.user.Button.last.page);
        
      } else {
        //$LASTPOS=8000747;//user.PlayBackList:747
        _this.n=new Tonyu.classes.user.NetIndicator;
        //$LASTPOS=8000771;//user.PlayBackList:771
        _this.s=_this.dbSelect("Replay",Tonyu.classes.user.Button.last.e);
        //$LASTPOS=8000811;//user.PlayBackList:811
        _this.n.die();
        //$LASTPOS=8000824;//user.PlayBackList:824
        _this.s[0].uploaded=true;
        //$LASTPOS=8000848;//user.PlayBackList:848
        _this.loadPage(Tonyu.classes.user.Main,{playBack: _this.s[0]});
        
      }
    },
    fiber$main :function _trc_PlayBackList_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var e;
      var _it_34;
      
      //$LASTPOS=8000032;//user.PlayBackList:32
      _this.n=new Tonyu.classes.user.NetIndicator;
      
      _thread.enter(function _trc_PlayBackList_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=8000052;//user.PlayBackList:52
            _this.fiber$dbSelect(_thread, "Replay", {$order: {score: - 1},$hide: ["buf"],$limit: 5});
            __pc=1;return;
          case 1:
            _this.s=_thread.retVal;
            
            //$LASTPOS=8000117;//user.PlayBackList:117
            _this.n.die();
            //$LASTPOS=8000126;//user.PlayBackList:126
            _this.x=20;
            //$LASTPOS=8000132;//user.PlayBackList:132
            _this.y=30;
            //$LASTPOS=8000138;//user.PlayBackList:138
            _this.p=- 1;
            //$LASTPOS=8000144;//user.PlayBackList:144
            new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: "Name"});
            //$LASTPOS=8000178;//user.PlayBackList:178
            new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: "Score"});
            //$LASTPOS=8000213;//user.PlayBackList:213
            new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: "Greats"});
            //$LASTPOS=8000249;//user.PlayBackList:249
            new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: "Max Combo"});
            //$LASTPOS=8000288;//user.PlayBackList:288
            _this.y+=30;
            //$LASTPOS=8000295;//user.PlayBackList:295
            _it_34=Tonyu.iterator(_this.s,1);
            while(_it_34.next()) {
              e=_it_34[0];
              
              //$LASTPOS=8000314;//user.PlayBackList:314
              new Tonyu.classes.user.Button({left: _this.x,top: _this.y,width: 50,height: 20,text: "Play",padding: 3,e: e});
              //$LASTPOS=8000388;//user.PlayBackList:388
              new Tonyu.classes.kernel.Actor({x: _this.x+100,y: _this.y,text: e.name});
              //$LASTPOS=8000426;//user.PlayBackList:426
              new Tonyu.classes.kernel.Actor({x: _this.x+200,y: _this.y,text: e.score});
              //$LASTPOS=8000465;//user.PlayBackList:465
              new Tonyu.classes.kernel.Actor({x: _this.x+270,y: _this.y,text: e.greatCount});
              //$LASTPOS=8000509;//user.PlayBackList:509
              new Tonyu.classes.kernel.Actor({x: _this.x+350,y: _this.y,text: e.maxCombo});
              //$LASTPOS=8000551;//user.PlayBackList:551
              _this.y+=50;
              
            }
            //$LASTPOS=8000560;//user.PlayBackList:560
            new Tonyu.classes.user.Button({left: _this.x,top: _this.y,text: "Back",page: Tonyu.classes.user.Title,height: 20,width: 400});
            //$LASTPOS=8000629;//user.PlayBackList:629
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=8000647;//user.PlayBackList:647
          case 2:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=4; break; }
            //$LASTPOS=8000668;//user.PlayBackList:668
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=8000678;//user.PlayBackList:678
            if (!(Tonyu.classes.user.Button.last.page)) { __pc=6; break; }
            //$LASTPOS=8000706;//user.PlayBackList:706
            _this.fiber$loadPage(_thread, Tonyu.classes.user.Button.last.page);
            __pc=5;return;
          case 5:
            
            __pc=9;break;
          case 6:
            //$LASTPOS=8000747;//user.PlayBackList:747
            _this.n=new Tonyu.classes.user.NetIndicator;
            //$LASTPOS=8000771;//user.PlayBackList:771
            _this.fiber$dbSelect(_thread, "Replay", Tonyu.classes.user.Button.last.e);
            __pc=7;return;
          case 7:
            _this.s=_thread.retVal;
            
            //$LASTPOS=8000811;//user.PlayBackList:811
            _this.n.die();
            //$LASTPOS=8000824;//user.PlayBackList:824
            _this.s[0].uploaded=true;
            //$LASTPOS=8000848;//user.PlayBackList:848
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
      
      //$LASTPOS=9000113;//user.PTS:113
      _this.i=60;
      //$LASTPOS=9000119;//user.PTS:119
      while (_this.i>0) {
        //$LASTPOS=9000137;//user.PTS:137
        _this.i=_this.i-1;
        //$LASTPOS=9000148;//user.PTS:148
        _this.c=255;
        //$LASTPOS=9000155;//user.PTS:155
        if (_this.i<12) {
          //$LASTPOS=9000165;//user.PTS:165
          _this.c=_this.i*20;
        }
        //$LASTPOS=9000202;//user.PTS:202
        _this.drawText(_this.x,_this.y,_this.score,_this.color(_this.c,_this.c,_this.c));
        //$LASTPOS=9000249;//user.PTS:249
        _this.update();
        
      }
      //$LASTPOS=9000261;//user.PTS:261
      _this.die();
    },
    fiber$main :function _trc_PTS_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=9000113;//user.PTS:113
      _this.i=60;
      
      _thread.enter(function _trc_PTS_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=9000119;//user.PTS:119
          case 1:
            if (!(_this.i>0)) { __pc=3; break; }
            //$LASTPOS=9000137;//user.PTS:137
            _this.i=_this.i-1;
            //$LASTPOS=9000148;//user.PTS:148
            _this.c=255;
            //$LASTPOS=9000155;//user.PTS:155
            if (_this.i<12) {
              //$LASTPOS=9000165;//user.PTS:165
              _this.c=_this.i*20;
            }
            //$LASTPOS=9000202;//user.PTS:202
            _this.drawText(_this.x,_this.y,_this.score,_this.color(_this.c,_this.c,_this.c));
            //$LASTPOS=9000249;//user.PTS:249
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=9000261;//user.PTS:261
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_PTS_initialize(x,y,sc,dp) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=9000041;//user.PTS:41
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=9000060;//user.PTS:60
      _this.score=sc+"pts";
      //$LASTPOS=9000080;//user.PTS:80
      if (dp>1) {
        //$LASTPOS=9000090;//user.PTS:90
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
      
      //$LASTPOS=10002100;//user.Star:2100
      _this.cy=Tonyu.globals.$level;
      //$LASTPOS=10002111;//user.Star:2111
      _this.bp=Tonyu.globals.$pat_star+3;
      //$LASTPOS=10002127;//user.Star:2127
      _this.an=0;
      //$LASTPOS=10002133;//user.Star:2133
      Tonyu.globals.$mu=0.99;
      //$LASTPOS=10002143;//user.Star:2143
      _this.maxs=6;
      //$LASTPOS=10002151;//user.Star:2151
      _this.maxlife=100;
      //$LASTPOS=10002164;//user.Star:2164
      _this.life=_this.maxlife*0.5;
      //$LASTPOS=10002182;//user.Star:2182
      _this.vx=0;
      //$LASTPOS=10002187;//user.Star:2187
      _this.vy=- 1;
      //$LASTPOS=10002194;//user.Star:2194
      _this.x=230;
      //$LASTPOS=10002201;//user.Star:2201
      _this.y=- 150;
      //$LASTPOS=10002209;//user.Star:2209
      _this.cnt=0;
      //$LASTPOS=10002217;//user.Star:2217
      while (Tonyu.globals.$time>0.8) {
        //$LASTPOS=10002256;//user.Star:2256
        _this.an=_this.an+1;
        //$LASTPOS=10002269;//user.Star:2269
        if (_this.an>2) {
          //$LASTPOS=10002279;//user.Star:2279
          _this.an=0;
        }
        //$LASTPOS=10002289;//user.Star:2289
        _this.p=_this.bp+_this.an;
        //$LASTPOS=10002324;//user.Star:2324
        if (_this.x<0) {
          //$LASTPOS=10002333;//user.Star:2333
          _this.vx=_this.abs(_this.vx);
        }
        //$LASTPOS=10002349;//user.Star:2349
        if (_this.x>Tonyu.globals.$screenWidth) {
          //$LASTPOS=10002369;//user.Star:2369
          _this.vx=- _this.abs(_this.vx);
        }
        //$LASTPOS=10002386;//user.Star:2386
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=10002407;//user.Star:2407
          _this.vy=- _this.abs(_this.vy);
        }
        //$LASTPOS=10002424;//user.Star:2424
        if (_this.y<- 110) {
          //$LASTPOS=10002436;//user.Star:2436
          _this.vy=1;
        }
        //$LASTPOS=10002471;//user.Star:2471
        _this.x+=_this.vx;
        //$LASTPOS=10002477;//user.Star:2477
        _this.vx=_this.vx*Tonyu.globals.$mu;
        //$LASTPOS=10002492;//user.Star:2492
        _this.y+=_this.vy;
        //$LASTPOS=10002498;//user.Star:2498
        _this.vy=_this.vy*Tonyu.globals.$mu;
        //$LASTPOS=10002526;//user.Star:2526
        _this.ath();
        //$LASTPOS=10002547;//user.Star:2547
        _this.vy=_this.vy+0.03;
        //$LASTPOS=10002563;//user.Star:2563
        if (_this.vy>_this.maxs) {
          //$LASTPOS=10002576;//user.Star:2576
          _this.vy=_this.maxs;
        }
        //$LASTPOS=10002589;//user.Star:2589
        if (_this.vy<- _this.maxs) {
          //$LASTPOS=10002603;//user.Star:2603
          _this.vy=- _this.maxs;
        }
        //$LASTPOS=10002617;//user.Star:2617
        if (_this.vx>_this.maxs) {
          //$LASTPOS=10002630;//user.Star:2630
          _this.vx=_this.maxs;
        }
        //$LASTPOS=10002643;//user.Star:2643
        if (_this.vx<- _this.maxs) {
          //$LASTPOS=10002657;//user.Star:2657
          _this.vx=- _this.maxs;
        }
        //$LASTPOS=10002691;//user.Star:2691
        if (_this.life<_this.maxlife) {
          //$LASTPOS=10002709;//user.Star:2709
          _this.life+=0.2;
        }
        //$LASTPOS=10002740;//user.Star:2740
        _this.drawLine(0,Tonyu.globals.$screenHeight-10-_this.cy,_this.life,Tonyu.globals.$screenHeight-10-_this.cy,_this.color(0,255-_this.cy*20,0));
        //$LASTPOS=10002823;//user.Star:2823
        if (_this.life<0) {
          //$LASTPOS=10002880;//user.Star:2880
          _this.crash();
          //$LASTPOS=10002897;//user.Star:2897
          _this.life=_this.maxlife;
          //$LASTPOS=10002919;//user.Star:2919
          _this.appear(new Tonyu.classes.user.PTS(_this.x,_this.y+30,Tonyu.globals.$rank.rank*4,Tonyu.globals.$gcont));
          //$LASTPOS=10002972;//user.Star:2972
          _this.y=- 30;
          //$LASTPOS=10002978;//user.Star:2978
          _this.vy=0;
          //$LASTPOS=10002992;//user.Star:2992
          Tonyu.globals.$score=Tonyu.globals.$score+50+Tonyu.globals.$rank.rank*4*Tonyu.globals.$gcont;
          //$LASTPOS=10003038;//user.Star:3038
          Tonyu.globals.$time=Tonyu.globals.$time+Tonyu.globals.$rank.rank*0.05*Tonyu.globals.$gcont;
          
        }
        //$LASTPOS=10003084;//user.Star:3084
        if (_this.y>Tonyu.globals.$screenHeight) {
          //$LASTPOS=10003162;//user.Star:3162
          Tonyu.globals.$time=Tonyu.globals.$time*0;
          //$LASTPOS=10003207;//user.Star:3207
          Tonyu.globals.$sound.stopBGM();
          
        }
        //$LASTPOS=10003236;//user.Star:3236
        _this.cnt++;
        //$LASTPOS=10003247;//user.Star:3247
        if (_this.cnt%2==0) {
          //$LASTPOS=10003261;//user.Star:3261
          _this.update();
        }
        
      }
      //$LASTPOS=10003274;//user.Star:3274
      Tonyu.globals.$rank.rank=0;
      //$LASTPOS=10003288;//user.Star:3288
      _this.crash();
      //$LASTPOS=10003297;//user.Star:3297
      _this.die();
    },
    fiber$main :function _trc_Star_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=10002100;//user.Star:2100
      _this.cy=Tonyu.globals.$level;
      //$LASTPOS=10002111;//user.Star:2111
      _this.bp=Tonyu.globals.$pat_star+3;
      //$LASTPOS=10002127;//user.Star:2127
      _this.an=0;
      //$LASTPOS=10002133;//user.Star:2133
      Tonyu.globals.$mu=0.99;
      //$LASTPOS=10002143;//user.Star:2143
      _this.maxs=6;
      //$LASTPOS=10002151;//user.Star:2151
      _this.maxlife=100;
      //$LASTPOS=10002164;//user.Star:2164
      _this.life=_this.maxlife*0.5;
      //$LASTPOS=10002182;//user.Star:2182
      _this.vx=0;
      //$LASTPOS=10002187;//user.Star:2187
      _this.vy=- 1;
      //$LASTPOS=10002194;//user.Star:2194
      _this.x=230;
      //$LASTPOS=10002201;//user.Star:2201
      _this.y=- 150;
      //$LASTPOS=10002209;//user.Star:2209
      _this.cnt=0;
      
      _thread.enter(function _trc_Star_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10002217;//user.Star:2217
          case 1:
            if (!(Tonyu.globals.$time>0.8)) { __pc=8; break; }
            //$LASTPOS=10002256;//user.Star:2256
            _this.an=_this.an+1;
            //$LASTPOS=10002269;//user.Star:2269
            if (_this.an>2) {
              //$LASTPOS=10002279;//user.Star:2279
              _this.an=0;
            }
            //$LASTPOS=10002289;//user.Star:2289
            _this.p=_this.bp+_this.an;
            //$LASTPOS=10002324;//user.Star:2324
            if (_this.x<0) {
              //$LASTPOS=10002333;//user.Star:2333
              _this.vx=_this.abs(_this.vx);
            }
            //$LASTPOS=10002349;//user.Star:2349
            if (_this.x>Tonyu.globals.$screenWidth) {
              //$LASTPOS=10002369;//user.Star:2369
              _this.vx=- _this.abs(_this.vx);
            }
            //$LASTPOS=10002386;//user.Star:2386
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=10002407;//user.Star:2407
              _this.vy=- _this.abs(_this.vy);
            }
            //$LASTPOS=10002424;//user.Star:2424
            if (_this.y<- 110) {
              //$LASTPOS=10002436;//user.Star:2436
              _this.vy=1;
            }
            //$LASTPOS=10002471;//user.Star:2471
            _this.x+=_this.vx;
            //$LASTPOS=10002477;//user.Star:2477
            _this.vx=_this.vx*Tonyu.globals.$mu;
            //$LASTPOS=10002492;//user.Star:2492
            _this.y+=_this.vy;
            //$LASTPOS=10002498;//user.Star:2498
            _this.vy=_this.vy*Tonyu.globals.$mu;
            //$LASTPOS=10002526;//user.Star:2526
            _this.fiber$ath(_thread);
            __pc=2;return;
          case 2:
            
            //$LASTPOS=10002547;//user.Star:2547
            _this.vy=_this.vy+0.03;
            //$LASTPOS=10002563;//user.Star:2563
            if (_this.vy>_this.maxs) {
              //$LASTPOS=10002576;//user.Star:2576
              _this.vy=_this.maxs;
            }
            //$LASTPOS=10002589;//user.Star:2589
            if (_this.vy<- _this.maxs) {
              //$LASTPOS=10002603;//user.Star:2603
              _this.vy=- _this.maxs;
            }
            //$LASTPOS=10002617;//user.Star:2617
            if (_this.vx>_this.maxs) {
              //$LASTPOS=10002630;//user.Star:2630
              _this.vx=_this.maxs;
            }
            //$LASTPOS=10002643;//user.Star:2643
            if (_this.vx<- _this.maxs) {
              //$LASTPOS=10002657;//user.Star:2657
              _this.vx=- _this.maxs;
            }
            //$LASTPOS=10002691;//user.Star:2691
            if (_this.life<_this.maxlife) {
              //$LASTPOS=10002709;//user.Star:2709
              _this.life+=0.2;
            }
            //$LASTPOS=10002740;//user.Star:2740
            _this.drawLine(0,Tonyu.globals.$screenHeight-10-_this.cy,_this.life,Tonyu.globals.$screenHeight-10-_this.cy,_this.color(0,255-_this.cy*20,0));
            //$LASTPOS=10002823;//user.Star:2823
            if (!(_this.life<0)) { __pc=5; break; }
            //$LASTPOS=10002880;//user.Star:2880
            _this.fiber$crash(_thread);
            __pc=3;return;
          case 3:
            
            //$LASTPOS=10002897;//user.Star:2897
            _this.life=_this.maxlife;
            //$LASTPOS=10002919;//user.Star:2919
            _this.fiber$appear(_thread, new Tonyu.classes.user.PTS(_this.x,_this.y+30,Tonyu.globals.$rank.rank*4,Tonyu.globals.$gcont));
            __pc=4;return;
          case 4:
            
            //$LASTPOS=10002972;//user.Star:2972
            _this.y=- 30;
            //$LASTPOS=10002978;//user.Star:2978
            _this.vy=0;
            //$LASTPOS=10002992;//user.Star:2992
            Tonyu.globals.$score=Tonyu.globals.$score+50+Tonyu.globals.$rank.rank*4*Tonyu.globals.$gcont;
            //$LASTPOS=10003038;//user.Star:3038
            Tonyu.globals.$time=Tonyu.globals.$time+Tonyu.globals.$rank.rank*0.05*Tonyu.globals.$gcont;
          case 5:
            
            //$LASTPOS=10003084;//user.Star:3084
            if (_this.y>Tonyu.globals.$screenHeight) {
              //$LASTPOS=10003162;//user.Star:3162
              Tonyu.globals.$time=Tonyu.globals.$time*0;
              //$LASTPOS=10003207;//user.Star:3207
              Tonyu.globals.$sound.stopBGM();
              
            }
            //$LASTPOS=10003236;//user.Star:3236
            _this.cnt++;
            //$LASTPOS=10003247;//user.Star:3247
            if (!(_this.cnt%2==0)) { __pc=7; break; }
            //$LASTPOS=10003261;//user.Star:3261
            _this.fiber$update(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
            __pc=1;break;
          case 8:
            
            //$LASTPOS=10003274;//user.Star:3274
            Tonyu.globals.$rank.rank=0;
            //$LASTPOS=10003288;//user.Star:3288
            _this.fiber$crash(_thread);
            __pc=9;return;
          case 9:
            
            //$LASTPOS=10003297;//user.Star:3297
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
      
      //$LASTPOS=10000071;//user.Star:71
      i;
      //$LASTPOS=10000098;//user.Star:98
      i=0;
      //$LASTPOS=10000107;//user.Star:107
      Tonyu.globals.$exp+=1;
      //$LASTPOS=10000173;//user.Star:173
      if (Tonyu.globals.$rank.rank<10) {
        //$LASTPOS=10000217;//user.Star:217
        Tonyu.globals.$sound.playSE(Tonyu.globals.$se_bad);
        //$LASTPOS=10000249;//user.Star:249
        Tonyu.globals.$preg=0;
        //$LASTPOS=10000266;//user.Star:266
        Tonyu.globals.$gcont=1;
        //$LASTPOS=10000307;//user.Star:307
        while (i<360) {
          //$LASTPOS=10000335;//user.Star:335
          _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
          //$LASTPOS=10000389;//user.Star:389
          i=i+60;
          
        }
        
      } else {
        //$LASTPOS=10000418;//user.Star:418
        if (Tonyu.globals.$rank.rank<15) {
          //$LASTPOS=10000463;//user.Star:463
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_good);
          //$LASTPOS=10000496;//user.Star:496
          Tonyu.globals.$preg=0;
          //$LASTPOS=10000513;//user.Star:513
          Tonyu.globals.$gcont=1;
          //$LASTPOS=10000555;//user.Star:555
          while (i<360) {
            //$LASTPOS=10000583;//user.Star:583
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            //$LASTPOS=10000637;//user.Star:637
            i=i+30;
            
          }
          
        } else {
          //$LASTPOS=10000710;//user.Star:710
          Tonyu.globals.$Flsh.doFlash();
          //$LASTPOS=10000735;//user.Star:735
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
          //$LASTPOS=10000823;//user.Star:823
          if (Tonyu.globals.$preg) {
            //$LASTPOS=10000834;//user.Star:834
            Tonyu.globals.$gcont=Tonyu.globals.$gcont+1;
          } else {
            //$LASTPOS=10000856;//user.Star:856
            Tonyu.globals.$gcont=1;
          }
          //$LASTPOS=10000874;//user.Star:874
          Tonyu.globals.$preg=1;
          //$LASTPOS=10000891;//user.Star:891
          Tonyu.globals.$VTR.addGreat(Tonyu.globals.$gcont);
          //$LASTPOS=10000945;//user.Star:945
          while (i<360) {
            //$LASTPOS=10000973;//user.Star:973
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            //$LASTPOS=10001027;//user.Star:1027
            i=i+60;
            
          }
          //$LASTPOS=10001053;//user.Star:1053
          i=15;
          //$LASTPOS=10001068;//user.Star:1068
          while (i<360) {
            //$LASTPOS=10001096;//user.Star:1096
            _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*10,_this.sin(i)*10));
            //$LASTPOS=10001152;//user.Star:1152
            i=i+30;
            
          }
          
        }
      }
      //$LASTPOS=10001216;//user.Star:1216
      _this.appear(new Tonyu.classes.user.TRank2(_this.x,_this.y,Tonyu.globals.$rank.rank,Tonyu.globals.$gcont));
    },
    fiber$crash :function _trc_Star_f_crash(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=10000071;//user.Star:71
      i;
      //$LASTPOS=10000098;//user.Star:98
      i=0;
      //$LASTPOS=10000107;//user.Star:107
      Tonyu.globals.$exp+=1;
      
      _thread.enter(function _trc_Star_ent_crash(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10000173;//user.Star:173
            if (!(Tonyu.globals.$rank.rank<10)) { __pc=4; break; }
            //$LASTPOS=10000217;//user.Star:217
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_bad);
            //$LASTPOS=10000249;//user.Star:249
            Tonyu.globals.$preg=0;
            //$LASTPOS=10000266;//user.Star:266
            Tonyu.globals.$gcont=1;
            //$LASTPOS=10000307;//user.Star:307
          case 1:
            if (!(i<360)) { __pc=3; break; }
            //$LASTPOS=10000335;//user.Star:335
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=2;return;
          case 2:
            
            //$LASTPOS=10000389;//user.Star:389
            i=i+60;
            __pc=1;break;
          case 3:
            
            __pc=16;break;
          case 4:
            //$LASTPOS=10000418;//user.Star:418
            if (!(Tonyu.globals.$rank.rank<15)) { __pc=8; break; }
            //$LASTPOS=10000463;//user.Star:463
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_good);
            //$LASTPOS=10000496;//user.Star:496
            Tonyu.globals.$preg=0;
            //$LASTPOS=10000513;//user.Star:513
            Tonyu.globals.$gcont=1;
            //$LASTPOS=10000555;//user.Star:555
          case 5:
            if (!(i<360)) { __pc=7; break; }
            //$LASTPOS=10000583;//user.Star:583
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=6;return;
          case 6:
            
            //$LASTPOS=10000637;//user.Star:637
            i=i+30;
            __pc=5;break;
          case 7:
            
            __pc=15;break;
          case 8:
            //$LASTPOS=10000710;//user.Star:710
            Tonyu.globals.$Flsh.doFlash();
            //$LASTPOS=10000735;//user.Star:735
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
            //$LASTPOS=10000823;//user.Star:823
            if (Tonyu.globals.$preg) {
              //$LASTPOS=10000834;//user.Star:834
              Tonyu.globals.$gcont=Tonyu.globals.$gcont+1;
            } else {
              //$LASTPOS=10000856;//user.Star:856
              Tonyu.globals.$gcont=1;
            }
            //$LASTPOS=10000874;//user.Star:874
            Tonyu.globals.$preg=1;
            //$LASTPOS=10000891;//user.Star:891
            Tonyu.globals.$VTR.addGreat(Tonyu.globals.$gcont);
            //$LASTPOS=10000945;//user.Star:945
          case 9:
            if (!(i<360)) { __pc=11; break; }
            //$LASTPOS=10000973;//user.Star:973
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*5,_this.sin(i)*5));
            __pc=10;return;
          case 10:
            
            //$LASTPOS=10001027;//user.Star:1027
            i=i+60;
            __pc=9;break;
          case 11:
            
            //$LASTPOS=10001053;//user.Star:1053
            i=15;
            //$LASTPOS=10001068;//user.Star:1068
          case 12:
            if (!(i<360)) { __pc=14; break; }
            //$LASTPOS=10001096;//user.Star:1096
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,_this.cos(i)*10,_this.sin(i)*10));
            __pc=13;return;
          case 13:
            
            //$LASTPOS=10001152;//user.Star:1152
            i=i+30;
            __pc=12;break;
          case 14:
            
          case 15:
            
          case 16:
            
            //$LASTPOS=10001216;//user.Star:1216
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
      
      //$LASTPOS=10001352;//user.Star:1352
      i;t;pt;dl;dm;
      //$LASTPOS=10001395;//user.Star:1395
      i=Tonyu.globals.$ths.length-1;
      //$LASTPOS=10001416;//user.Star:1416
      dl=0;
      //$LASTPOS=10001426;//user.Star:1426
      while (i>=0) {
        //$LASTPOS=10001497;//user.Star:1497
        t=Tonyu.globals.$ths[i];
        //$LASTPOS=10001516;//user.Star:1516
        if (_this.crashTo2(t)) {
          //$LASTPOS=10001579;//user.Star:1579
          _this.vx=_this.vx+(_this.x-t.x)*0.4;
          //$LASTPOS=10001610;//user.Star:1610
          _this.vy=_this.vy+(_this.y-t.y)*0.4;
          //$LASTPOS=10001641;//user.Star:1641
          dl=1;
          //$LASTPOS=10001659;//user.Star:1659
          if (pt) {
            //$LASTPOS=10001685;//user.Star:1685
            dm=_this.dist(pt.x-t.x,pt.y-_this.y)*0.8+20;
            //$LASTPOS=10001764;//user.Star:1764
            if (dm>dl) {
              //$LASTPOS=10001775;//user.Star:1775
              dl=dm;
            }
            
          }
          
        }
        //$LASTPOS=10001814;//user.Star:1814
        pt=t;
        //$LASTPOS=10001828;//user.Star:1828
        i=i-1;
        
      }
      //$LASTPOS=10001845;//user.Star:1845
      if (dl) {
        //$LASTPOS=10001893;//user.Star:1893
        if (Tonyu.globals.$kasc==0) {
          //$LASTPOS=10001907;//user.Star:1907
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri);
        } else {
          //$LASTPOS=10001948;//user.Star:1948
          Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri2);
        }
        //$LASTPOS=10001984;//user.Star:1984
        Tonyu.globals.$kasc=1-Tonyu.globals.$kasc;
        //$LASTPOS=10002007;//user.Star:2007
        _this.appear(new Tonyu.classes.user.TBomb(_this.x,_this.y,- _this.vx,- _this.vy));
        //$LASTPOS=10002047;//user.Star:2047
        _this.life=_this.life-dl*0.15;
        //$LASTPOS=10002074;//user.Star:2074
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
      
      //$LASTPOS=10001352;//user.Star:1352
      i;t;pt;dl;dm;
      //$LASTPOS=10001395;//user.Star:1395
      i=Tonyu.globals.$ths.length-1;
      //$LASTPOS=10001416;//user.Star:1416
      dl=0;
      
      _thread.enter(function _trc_Star_ent_ath(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=10001426;//user.Star:1426
          case 1:
            if (!(i>=0)) { __pc=2; break; }
            {
              //$LASTPOS=10001497;//user.Star:1497
              t=Tonyu.globals.$ths[i];
              //$LASTPOS=10001516;//user.Star:1516
              if (_this.crashTo2(t)) {
                //$LASTPOS=10001579;//user.Star:1579
                _this.vx=_this.vx+(_this.x-t.x)*0.4;
                //$LASTPOS=10001610;//user.Star:1610
                _this.vy=_this.vy+(_this.y-t.y)*0.4;
                //$LASTPOS=10001641;//user.Star:1641
                dl=1;
                //$LASTPOS=10001659;//user.Star:1659
                if (pt) {
                  //$LASTPOS=10001685;//user.Star:1685
                  dm=_this.dist(pt.x-t.x,pt.y-_this.y)*0.8+20;
                  //$LASTPOS=10001764;//user.Star:1764
                  if (dm>dl) {
                    //$LASTPOS=10001775;//user.Star:1775
                    dl=dm;
                  }
                  
                }
                
              }
              //$LASTPOS=10001814;//user.Star:1814
              pt=t;
              //$LASTPOS=10001828;//user.Star:1828
              i=i-1;
            }
            __pc=1;break;
          case 2:
            
            //$LASTPOS=10001845;//user.Star:1845
            if (!(dl)) { __pc=4; break; }
            //$LASTPOS=10001893;//user.Star:1893
            if (Tonyu.globals.$kasc==0) {
              //$LASTPOS=10001907;//user.Star:1907
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri);
            } else {
              //$LASTPOS=10001948;//user.Star:1948
              Tonyu.globals.$sound.playSE(Tonyu.globals.$se_kasuri2);
            }
            //$LASTPOS=10001984;//user.Star:1984
            Tonyu.globals.$kasc=1-Tonyu.globals.$kasc;
            //$LASTPOS=10002007;//user.Star:2007
            _this.fiber$appear(_thread, new Tonyu.classes.user.TBomb(_this.x,_this.y,- _this.vx,- _this.vy));
            __pc=3;return;
          case 3:
            
            //$LASTPOS=10002047;//user.Star:2047
            _this.life=_this.life-dl*0.15;
            //$LASTPOS=10002074;//user.Star:2074
            Tonyu.globals.$score=Tonyu.globals.$score+1;
          case 4:
            
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
      
      //$LASTPOS=11000104;//user.TBomb:104
      _this.i=3;
      //$LASTPOS=11000109;//user.TBomb:109
      while (_this.i>0) {
        //$LASTPOS=11000127;//user.TBomb:127
        _this.j=30;
        //$LASTPOS=11000137;//user.TBomb:137
        while (_this.j>0) {
          //$LASTPOS=11000159;//user.TBomb:159
          _this.x=_this.x+_this.vx*2;
          //$LASTPOS=11000177;//user.TBomb:177
          _this.y=_this.y+_this.vy*2;
          //$LASTPOS=11000195;//user.TBomb:195
          _this.j=_this.j-1;
          //$LASTPOS=11000210;//user.TBomb:210
          _this.update();
          
        }
        //$LASTPOS=11000230;//user.TBomb:230
        _this.p=_this.p-1;
        //$LASTPOS=11000236;//user.TBomb:236
        _this.vx=_this.vx*0.9;
        //$LASTPOS=11000246;//user.TBomb:246
        _this.vy=_this.vy*0.9;
        //$LASTPOS=11000261;//user.TBomb:261
        _this.i=_this.i-1;
        
      }
      //$LASTPOS=11000270;//user.TBomb:270
      _this.p=- 1;
      //$LASTPOS=11000276;//user.TBomb:276
      _this.die();
    },
    fiber$main :function _trc_TBomb_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=11000104;//user.TBomb:104
      _this.i=3;
      
      _thread.enter(function _trc_TBomb_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=11000109;//user.TBomb:109
          case 1:
            if (!(_this.i>0)) { __pc=5; break; }
            //$LASTPOS=11000127;//user.TBomb:127
            _this.j=30;
            //$LASTPOS=11000137;//user.TBomb:137
          case 2:
            if (!(_this.j>0)) { __pc=4; break; }
            //$LASTPOS=11000159;//user.TBomb:159
            _this.x=_this.x+_this.vx*2;
            //$LASTPOS=11000177;//user.TBomb:177
            _this.y=_this.y+_this.vy*2;
            //$LASTPOS=11000195;//user.TBomb:195
            _this.j=_this.j-1;
            //$LASTPOS=11000210;//user.TBomb:210
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=11000230;//user.TBomb:230
            _this.p=_this.p-1;
            //$LASTPOS=11000236;//user.TBomb:236
            _this.vx=_this.vx*0.9;
            //$LASTPOS=11000246;//user.TBomb:246
            _this.vy=_this.vy*0.9;
            //$LASTPOS=11000261;//user.TBomb:261
            _this.i=_this.i-1;
            __pc=1;break;
          case 5:
            
            //$LASTPOS=11000270;//user.TBomb:270
            _this.p=- 1;
            //$LASTPOS=11000276;//user.TBomb:276
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_TBomb_initialize(x,y,vx,vy) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=11000042;//user.TBomb:42
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,Tonyu.globals.$pat_star+2,0]);
      //$LASTPOS=11000072;//user.TBomb:72
      _this.vx=vx;
      //$LASTPOS=11000088;//user.TBomb:88
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
      
      //$LASTPOS=12000067;//user.TimeIncr:67
      _this.i=120;
      //$LASTPOS=12000074;//user.TimeIncr:74
      while (_this.i>0) {
        //$LASTPOS=12000092;//user.TimeIncr:92
        _this.i-=1;
        //$LASTPOS=12000102;//user.TimeIncr:102
        _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
        //$LASTPOS=12000152;//user.TimeIncr:152
        _this.update();
        
      }
      //$LASTPOS=12000164;//user.TimeIncr:164
      while (_this.sc>0) {
        //$LASTPOS=12000183;//user.TimeIncr:183
        Tonyu.globals.$score+=10;
        //$LASTPOS=12000199;//user.TimeIncr:199
        _this.sc-=10;
        //$LASTPOS=12000211;//user.TimeIncr:211
        _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
        //$LASTPOS=12000261;//user.TimeIncr:261
        _this.update();
        
      }
      //$LASTPOS=12000273;//user.TimeIncr:273
      _this.die();
    },
    fiber$main :function _trc_TimeIncr_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=12000067;//user.TimeIncr:67
      _this.i=120;
      
      _thread.enter(function _trc_TimeIncr_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=12000074;//user.TimeIncr:74
          case 1:
            if (!(_this.i>0)) { __pc=3; break; }
            //$LASTPOS=12000092;//user.TimeIncr:92
            _this.i-=1;
            //$LASTPOS=12000102;//user.TimeIncr:102
            _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
            //$LASTPOS=12000152;//user.TimeIncr:152
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=12000164;//user.TimeIncr:164
          case 4:
            if (!(_this.sc>0)) { __pc=6; break; }
            //$LASTPOS=12000183;//user.TimeIncr:183
            Tonyu.globals.$score+=10;
            //$LASTPOS=12000199;//user.TimeIncr:199
            _this.sc-=10;
            //$LASTPOS=12000211;//user.TimeIncr:211
            _this.drawText(_this.x,_this.y,"Bonus:"+_this.sc,_this.color(200,240,100));
            //$LASTPOS=12000261;//user.TimeIncr:261
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            __pc=4;break;
          case 6:
            
            //$LASTPOS=12000273;//user.TimeIncr:273
            _this.die();
            _thread.exit(_this);return;
          }
        }
      });
    },
    initialize :function _trc_TimeIncr_initialize(x,y,s) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=12000038;//user.TimeIncr:38
      Tonyu.classes.kernel.Actor.apply( _this, [x,y,- 1]);
      //$LASTPOS=12000057;//user.TimeIncr:57
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
      
      //$LASTPOS=13000022;//user.Title:22
      Tonyu.globals.$textPool=[];
      //$LASTPOS=13000037;//user.Title:37
      new Tonyu.classes.kernel.Actor({text: "RibbonMania",x: 235,y: 100,size: 50});
      //$LASTPOS=13000089;//user.Title:89
      new Tonyu.classes.kernel.Actor({text: "Great",x: 335,y: 150,size: 30,fillStyle: _this.color(255,155,0)});
      //$LASTPOS=13000162;//user.Title:162
      new Tonyu.classes.user.Flash;
      //$LASTPOS=13000174;//user.Title:174
      _this.s=new Tonyu.classes.user.Button({text: "Sound "+(Tonyu.globals.$snd?"on":"off"),page: Tonyu.classes.user.Main,top: 220,fillStyle: _this.color(0,200,55)});
      //$LASTPOS=13000269;//user.Title:269
      new Tonyu.classes.user.Button({text: "Game Start",page: Tonyu.classes.user.Main,top: 300,fillStyle: _this.color(0,150,255)});
      //$LASTPOS=13000347;//user.Title:347
      new Tonyu.classes.user.Button({text: "PlayBack",page: Tonyu.classes.user.PlayBackList,top: 380,fillStyle: _this.color(255,0,150)});
      //$LASTPOS=13000431;//user.Title:431
      while (true) {
        //$LASTPOS=13000450;//user.Title:450
        Tonyu.classes.user.Button.last=null;
        //$LASTPOS=13000473;//user.Title:473
        while (! Tonyu.classes.user.Button.last) {
          //$LASTPOS=13000504;//user.Title:504
          if (Tonyu.globals.$touches[0].touched>60) {
            //$LASTPOS=13000547;//user.Title:547
            Tonyu.globals.$debug=true;
            //$LASTPOS=13000573;//user.Title:573
            _this.print("Enter debug mode");
            
          }
          //$LASTPOS=13000620;//user.Title:620
          _this.update();
          
        }
        //$LASTPOS=13000642;//user.Title:642
        if (Tonyu.classes.user.Button.last!=_this.s) {
          break;
          
        }
        //$LASTPOS=13000674;//user.Title:674
        Tonyu.globals.$snd=! Tonyu.globals.$snd;
        //$LASTPOS=13000691;//user.Title:691
        _this.s.text="Sound "+(Tonyu.globals.$snd?"on":"off");
        //$LASTPOS=13000734;//user.Title:734
        Tonyu.globals.$sound.mute=! Tonyu.globals.$snd;
        //$LASTPOS=13000758;//user.Title:758
        Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
        
      }
      //$LASTPOS=13000789;//user.Title:789
      //$LASTPOS=13000794;//user.Title:794
      i = 0;
      while(i<5) {
        {
          //$LASTPOS=13000821;//user.Title:821
          Tonyu.classes.user.Button.last.fillStyle="white";
          //$LASTPOS=13000857;//user.Title:857
          _this.update();
          //$LASTPOS=13000872;//user.Title:872
          Tonyu.classes.user.Button.last.fillStyle="gray";
          //$LASTPOS=13000907;//user.Title:907
          _this.update();
        }
        i++;
      }
      //$LASTPOS=13000921;//user.Title:921
      _this.loadPage(Tonyu.classes.user.Button.last.page);
    },
    fiber$main :function _trc_Title_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=13000022;//user.Title:22
      Tonyu.globals.$textPool=[];
      //$LASTPOS=13000037;//user.Title:37
      new Tonyu.classes.kernel.Actor({text: "RibbonMania",x: 235,y: 100,size: 50});
      //$LASTPOS=13000089;//user.Title:89
      new Tonyu.classes.kernel.Actor({text: "Great",x: 335,y: 150,size: 30,fillStyle: _this.color(255,155,0)});
      //$LASTPOS=13000162;//user.Title:162
      new Tonyu.classes.user.Flash;
      //$LASTPOS=13000174;//user.Title:174
      _this.s=new Tonyu.classes.user.Button({text: "Sound "+(Tonyu.globals.$snd?"on":"off"),page: Tonyu.classes.user.Main,top: 220,fillStyle: _this.color(0,200,55)});
      //$LASTPOS=13000269;//user.Title:269
      new Tonyu.classes.user.Button({text: "Game Start",page: Tonyu.classes.user.Main,top: 300,fillStyle: _this.color(0,150,255)});
      //$LASTPOS=13000347;//user.Title:347
      new Tonyu.classes.user.Button({text: "PlayBack",page: Tonyu.classes.user.PlayBackList,top: 380,fillStyle: _this.color(255,0,150)});
      
      _thread.enter(function _trc_Title_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=13000431;//user.Title:431
          case 1:
            //$LASTPOS=13000450;//user.Title:450
            Tonyu.classes.user.Button.last=null;
            //$LASTPOS=13000473;//user.Title:473
          case 2:
            if (!(! Tonyu.classes.user.Button.last)) { __pc=4; break; }
            //$LASTPOS=13000504;//user.Title:504
            if (Tonyu.globals.$touches[0].touched>60) {
              //$LASTPOS=13000547;//user.Title:547
              Tonyu.globals.$debug=true;
              //$LASTPOS=13000573;//user.Title:573
              _this.print("Enter debug mode");
              
            }
            //$LASTPOS=13000620;//user.Title:620
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=13000642;//user.Title:642
            if (!(Tonyu.classes.user.Button.last!=_this.s)) { __pc=5; break; }
            __pc=6; break;
            
          case 5:
            
            //$LASTPOS=13000674;//user.Title:674
            Tonyu.globals.$snd=! Tonyu.globals.$snd;
            //$LASTPOS=13000691;//user.Title:691
            _this.s.text="Sound "+(Tonyu.globals.$snd?"on":"off");
            //$LASTPOS=13000734;//user.Title:734
            Tonyu.globals.$sound.mute=! Tonyu.globals.$snd;
            //$LASTPOS=13000758;//user.Title:758
            Tonyu.globals.$sound.playSE(Tonyu.globals.$se_great);
            __pc=1;break;
          case 6:
            
            //$LASTPOS=13000789;//user.Title:789
            //$LASTPOS=13000794;//user.Title:794
            i = 0;;
          case 7:
            if (!(i<5)) { __pc=10; break; }
            //$LASTPOS=13000821;//user.Title:821
            Tonyu.classes.user.Button.last.fillStyle="white";
            //$LASTPOS=13000857;//user.Title:857
            _this.fiber$update(_thread);
            __pc=8;return;
          case 8:
            
            //$LASTPOS=13000872;//user.Title:872
            Tonyu.classes.user.Button.last.fillStyle="gray";
            //$LASTPOS=13000907;//user.Title:907
            _this.fiber$update(_thread);
            __pc=9;return;
          case 9:
            
            i++;
            __pc=7;break;
          case 10:
            
            //$LASTPOS=13000921;//user.Title:921
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
      
      //$LASTPOS=14000043;//user.TRank0:43
      s;sc;
      //$LASTPOS=14000091;//user.TRank0:91
      if (_this.rank<10) {
        //$LASTPOS=14000114;//user.TRank0:114
        _this.drawText(_this.x,_this.y,"Bad",_this.color(0,255,0));
        
      } else {
        //$LASTPOS=14000161;//user.TRank0:161
        if (_this.rank<15) {
          //$LASTPOS=14000184;//user.TRank0:184
          _this.drawText(_this.x,_this.y,"Good",_this.color(255,255,0));
          
        } else {
          //$LASTPOS=14000244;//user.TRank0:244
          s="Great ";
          //$LASTPOS=14000264;//user.TRank0:264
          if (_this.gcon>1) {
            //$LASTPOS=14000276;//user.TRank0:276
            s=s+_this.gcon;
          }
          //$LASTPOS=14000294;//user.TRank0:294
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
      
      //$LASTPOS=14000043;//user.TRank0:43
      s;sc;
      //$LASTPOS=14000091;//user.TRank0:91
      if (_this.rank<10) {
        //$LASTPOS=14000114;//user.TRank0:114
        _this.drawText(_this.x,_this.y,"Bad",_this.color(0,255,0));
        
      } else {
        //$LASTPOS=14000161;//user.TRank0:161
        if (_this.rank<15) {
          //$LASTPOS=14000184;//user.TRank0:184
          _this.drawText(_this.x,_this.y,"Good",_this.color(255,255,0));
          
        } else {
          //$LASTPOS=14000244;//user.TRank0:244
          s="Great ";
          //$LASTPOS=14000264;//user.TRank0:264
          if (_this.gcon>1) {
            //$LASTPOS=14000276;//user.TRank0:276
            s=s+_this.gcon;
          }
          //$LASTPOS=14000294;//user.TRank0:294
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
      
      //$LASTPOS=15000164;//user.TRank1:164
      Tonyu.globals.$gcont=0;
      //$LASTPOS=15000174;//user.TRank1:174
      _this.gcon=0;
      //$LASTPOS=15000182;//user.TRank1:182
      _this.p=- 1;
      //$LASTPOS=15000188;//user.TRank1:188
      _this.x=400;
      //$LASTPOS=15000195;//user.TRank1:195
      _this.y=400;
      //$LASTPOS=15000202;//user.TRank1:202
      while (1) {
        //$LASTPOS=15000233;//user.TRank1:233
        _this.rank=0;
        //$LASTPOS=15000245;//user.TRank1:245
        _this.px=Tonyu.globals.$VTR.x;
        //$LASTPOS=15000260;//user.TRank1:260
        _this.py=Tonyu.globals.$VTR.y;
        //$LASTPOS=15000275;//user.TRank1:275
        while (_this.dist(Tonyu.globals.$VTR.x-_this.px,Tonyu.globals.$VTR.y-_this.py)<10) {
          //$LASTPOS=15000353;//user.TRank1:353
          _this.px=Tonyu.globals.$VTR.x;
          //$LASTPOS=15000372;//user.TRank1:372
          _this.py=Tonyu.globals.$VTR.y;
          //$LASTPOS=15000391;//user.TRank1:391
          _this.rank=_this.rank+2;
          //$LASTPOS=15000412;//user.TRank1:412
          _this.update();
          
        }
        //$LASTPOS=15000432;//user.TRank1:432
        _this.update();
        //$LASTPOS=15000446;//user.TRank1:446
        Tonyu.globals.$gcont=0;
        
      }
    },
    fiber$main :function _trc_TRank1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=15000164;//user.TRank1:164
      Tonyu.globals.$gcont=0;
      //$LASTPOS=15000174;//user.TRank1:174
      _this.gcon=0;
      //$LASTPOS=15000182;//user.TRank1:182
      _this.p=- 1;
      //$LASTPOS=15000188;//user.TRank1:188
      _this.x=400;
      //$LASTPOS=15000195;//user.TRank1:195
      _this.y=400;
      
      _thread.enter(function _trc_TRank1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=15000202;//user.TRank1:202
          case 1:
            if (!(1)) { __pc=6; break; }
            //$LASTPOS=15000233;//user.TRank1:233
            _this.rank=0;
            //$LASTPOS=15000245;//user.TRank1:245
            _this.px=Tonyu.globals.$VTR.x;
            //$LASTPOS=15000260;//user.TRank1:260
            _this.py=Tonyu.globals.$VTR.y;
            //$LASTPOS=15000275;//user.TRank1:275
          case 2:
            if (!(_this.dist(Tonyu.globals.$VTR.x-_this.px,Tonyu.globals.$VTR.y-_this.py)<10)) { __pc=4; break; }
            //$LASTPOS=15000353;//user.TRank1:353
            _this.px=Tonyu.globals.$VTR.x;
            //$LASTPOS=15000372;//user.TRank1:372
            _this.py=Tonyu.globals.$VTR.y;
            //$LASTPOS=15000391;//user.TRank1:391
            _this.rank=_this.rank+2;
            //$LASTPOS=15000412;//user.TRank1:412
            _this.fiber$update(_thread);
            __pc=3;return;
          case 3:
            
            __pc=2;break;
          case 4:
            
            //$LASTPOS=15000432;//user.TRank1:432
            _this.fiber$update(_thread);
            __pc=5;return;
          case 5:
            
            //$LASTPOS=15000446;//user.TRank1:446
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
      
      //$LASTPOS=16000145;//user.TRank2:145
      _this.p=- 1;
      //$LASTPOS=16000151;//user.TRank2:151
      _this.i=60;
      //$LASTPOS=16000195;//user.TRank2:195
      while (_this.i>0) {
        //$LASTPOS=16000213;//user.TRank2:213
        _this.i=_this.i-1;
        //$LASTPOS=16000224;//user.TRank2:224
        if (_this.i%2<1) {
          //$LASTPOS=16000281;//user.TRank2:281
          _this.putRank();
          
        }
        //$LASTPOS=16000302;//user.TRank2:302
        _this.update();
        
      }
    },
    fiber$main :function _trc_TRank2_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=16000145;//user.TRank2:145
      _this.p=- 1;
      //$LASTPOS=16000151;//user.TRank2:151
      _this.i=60;
      
      _thread.enter(function _trc_TRank2_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=16000195;//user.TRank2:195
          case 1:
            if (!(_this.i>0)) { __pc=5; break; }
            //$LASTPOS=16000213;//user.TRank2:213
            _this.i=_this.i-1;
            //$LASTPOS=16000224;//user.TRank2:224
            if (!(_this.i%2<1)) { __pc=3; break; }
            //$LASTPOS=16000281;//user.TRank2:281
            _this.fiber$putRank(_thread);
            __pc=2;return;
          case 2:
            
          case 3:
            
            //$LASTPOS=16000302;//user.TRank2:302
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
      
      //$LASTPOS=16000094;//user.TRank2:94
      Tonyu.classes.user.TRank0.apply( _this, [x,y,Tonyu.globals.$pat_star+2]);
      //$LASTPOS=16000122;//user.TRank2:122
      _this.rank=r;
      //$LASTPOS=16000134;//user.TRank2:134
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
      
      //$LASTPOS=17000040;//user.Uploader:40
      _this.defName=_this.file("name.json").obj()||{name: ""};
      //$LASTPOS=17000086;//user.Uploader:86
      _this.ne=new Tonyu.classes.user.NameEntry({mesg: "Input your name",text: _this.defName.name});
      //$LASTPOS=17000146;//user.Uploader:146
      while (! _this.ne.isDead()) {
        //$LASTPOS=17000166;//user.Uploader:166
        _this.update();
      }
      //$LASTPOS=17000194;//user.Uploader:194
      if (_this.ne.cancelled) {
        //$LASTPOS=17000218;//user.Uploader:218
        _this.vtr.notifyCancelled();
        //$LASTPOS=17000245;//user.Uploader:245
        _this.die();
        //$LASTPOS=17000251;//user.Uploader:251
        _this.update();
        
      }
      //$LASTPOS=17000263;//user.Uploader:263
      _this.defName.name=_this.ne.text;
      //$LASTPOS=17000303;//user.Uploader:303
      _this.file("name.json").obj(_this.defName);
      //$LASTPOS=17000335;//user.Uploader:335
      _this.data.name=_this.ne.text;
      //$LASTPOS=17000355;//user.Uploader:355
      _this.n=new Tonyu.classes.user.NetIndicator;
      //$LASTPOS=17000375;//user.Uploader:375
      _this.dbInsert("Replay",_this.data);
      //$LASTPOS=17000400;//user.Uploader:400
      _this.data.uploaded=true;
      //$LASTPOS=17000420;//user.Uploader:420
      _this.n.die();
      //$LASTPOS=17000429;//user.Uploader:429
      _this.vtr.notifyUploaded();
      //$LASTPOS=17000451;//user.Uploader:451
      _this.die();
    },
    fiber$main :function _trc_Uploader_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=17000040;//user.Uploader:40
      _this.defName=_this.file("name.json").obj()||{name: ""};
      //$LASTPOS=17000086;//user.Uploader:86
      _this.ne=new Tonyu.classes.user.NameEntry({mesg: "Input your name",text: _this.defName.name});
      
      _thread.enter(function _trc_Uploader_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=17000146;//user.Uploader:146
          case 1:
            if (!(! _this.ne.isDead())) { __pc=3; break; }
            //$LASTPOS=17000166;//user.Uploader:166
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=17000194;//user.Uploader:194
            if (!(_this.ne.cancelled)) { __pc=5; break; }
            //$LASTPOS=17000218;//user.Uploader:218
            _this.vtr.notifyCancelled();
            //$LASTPOS=17000245;//user.Uploader:245
            _this.die();
            //$LASTPOS=17000251;//user.Uploader:251
            _this.fiber$update(_thread);
            __pc=4;return;
          case 4:
            
          case 5:
            
            //$LASTPOS=17000263;//user.Uploader:263
            _this.defName.name=_this.ne.text;
            //$LASTPOS=17000303;//user.Uploader:303
            _this.file("name.json").obj(_this.defName);
            //$LASTPOS=17000335;//user.Uploader:335
            _this.data.name=_this.ne.text;
            //$LASTPOS=17000355;//user.Uploader:355
            _this.n=new Tonyu.classes.user.NetIndicator;
            //$LASTPOS=17000375;//user.Uploader:375
            _this.fiber$dbInsert(_thread, "Replay", _this.data);
            __pc=6;return;
          case 6:
            
            //$LASTPOS=17000400;//user.Uploader:400
            _this.data.uploaded=true;
            //$LASTPOS=17000420;//user.Uploader:420
            _this.n.die();
            //$LASTPOS=17000429;//user.Uploader:429
            _this.vtr.notifyUploaded();
            //$LASTPOS=17000451;//user.Uploader:451
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
      
      //$LASTPOS=18000019;//user.VTR:19
      _this.x=130;
      //$LASTPOS=18000026;//user.VTR:26
      _this.y=230;
      //$LASTPOS=18000033;//user.VTR:33
      _this.p=- 1;
      //$LASTPOS=18000039;//user.VTR:39
      Tonyu.globals.$mouseX=130;
      //$LASTPOS=18000052;//user.VTR:52
      Tonyu.globals.$mouseY=230;
      //$LASTPOS=18000065;//user.VTR:65
      if (_this.playBack) {
        //$LASTPOS=18000085;//user.VTR:85
        _this.extend(_this.playBack);
        //$LASTPOS=18000107;//user.VTR:107
        _this.i=0;
        //$LASTPOS=18000116;//user.VTR:116
        _this.showMenu();
        
      } else {
        //$LASTPOS=18000141;//user.VTR:141
        _this.score=0;
        //$LASTPOS=18000154;//user.VTR:154
        _this.greatCount=0;
        //$LASTPOS=18000172;//user.VTR:172
        _this.maxCombo=0;
        //$LASTPOS=18000188;//user.VTR:188
        _this.buf=[];
        
      }
      //$LASTPOS=18000198;//user.VTR:198
      while (true) {
        //$LASTPOS=18000217;//user.VTR:217
        if (! _this.playBack) {
          //$LASTPOS=18000242;//user.VTR:242
          _this.dx=0;
          //$LASTPOS=18000256;//user.VTR:256
          if (_this.abs(_this.x-Tonyu.globals.$mouseX)<49) {
            //$LASTPOS=18000313;//user.VTR:313
            _this.dx=_this.floor(Tonyu.globals.$mouseX-_this.x)+50;
            
          } else {
            //$LASTPOS=18000352;//user.VTR:352
            if (_this.x<Tonyu.globals.$mouseX) {
              //$LASTPOS=18000381;//user.VTR:381
              _this.dx=99;
              
            }
          }
          //$LASTPOS=18000406;//user.VTR:406
          _this.dy=0;
          //$LASTPOS=18000420;//user.VTR:420
          if (_this.abs(_this.y-Tonyu.globals.$mouseY)<49) {
            //$LASTPOS=18000457;//user.VTR:457
            _this.dy=_this.floor(Tonyu.globals.$mouseY-_this.y)+50;
            
          } else {
            //$LASTPOS=18000496;//user.VTR:496
            if (_this.y<Tonyu.globals.$mouseY) {
              //$LASTPOS=18000525;//user.VTR:525
              _this.dy=99;
              
            }
          }
          //$LASTPOS=18000598;//user.VTR:598
          _this.buf.push(_this.dx+_this.dy*100);
          
        } else {
          //$LASTPOS=18000630;//user.VTR:630
          if (_this.i<_this.buf.length) {
            //$LASTPOS=18000658;//user.VTR:658
            _this.dx=_this.buf[_this.i]%100;
            //$LASTPOS=18000683;//user.VTR:683
            _this.dy=_this.floor((_this.buf[_this.i])/100);
            //$LASTPOS=18000759;//user.VTR:759
            _this.i++;
            //$LASTPOS=18000772;//user.VTR:772
            if (_this.upB&&_this.upB.clicked==1) {
              //$LASTPOS=18000813;//user.VTR:813
              new Tonyu.classes.user.Uploader({data: _this.playBack,vtr: _this});
              //$LASTPOS=18000864;//user.VTR:864
              _this.hideMenu();
              
            }
            
          }
        }
        //$LASTPOS=18000896;//user.VTR:896
        _this.x+=(_this.dx-50);
        //$LASTPOS=18000912;//user.VTR:912
        _this.y+=(_this.dy-50);
        //$LASTPOS=18001083;//user.VTR:1083
        if (_this.stopped) {
          break;
          
        }
        //$LASTPOS=18001107;//user.VTR:1107
        _this.update();
        
      }
    },
    fiber$main :function _trc_VTR_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18000019;//user.VTR:19
      _this.x=130;
      //$LASTPOS=18000026;//user.VTR:26
      _this.y=230;
      //$LASTPOS=18000033;//user.VTR:33
      _this.p=- 1;
      //$LASTPOS=18000039;//user.VTR:39
      Tonyu.globals.$mouseX=130;
      //$LASTPOS=18000052;//user.VTR:52
      Tonyu.globals.$mouseY=230;
      
      _thread.enter(function _trc_VTR_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18000065;//user.VTR:65
            if (!(_this.playBack)) { __pc=2; break; }
            //$LASTPOS=18000085;//user.VTR:85
            _this.extend(_this.playBack);
            //$LASTPOS=18000107;//user.VTR:107
            _this.i=0;
            //$LASTPOS=18000116;//user.VTR:116
            _this.fiber$showMenu(_thread);
            __pc=1;return;
          case 1:
            
            __pc=3;break;
          case 2:
            {
              //$LASTPOS=18000141;//user.VTR:141
              _this.score=0;
              //$LASTPOS=18000154;//user.VTR:154
              _this.greatCount=0;
              //$LASTPOS=18000172;//user.VTR:172
              _this.maxCombo=0;
              //$LASTPOS=18000188;//user.VTR:188
              _this.buf=[];
            }
          case 3:
            
            //$LASTPOS=18000198;//user.VTR:198
          case 4:
            //$LASTPOS=18000217;//user.VTR:217
            if (!(! _this.playBack)) { __pc=5; break; }
            {
              //$LASTPOS=18000242;//user.VTR:242
              _this.dx=0;
              //$LASTPOS=18000256;//user.VTR:256
              if (_this.abs(_this.x-Tonyu.globals.$mouseX)<49) {
                //$LASTPOS=18000313;//user.VTR:313
                _this.dx=_this.floor(Tonyu.globals.$mouseX-_this.x)+50;
                
              } else {
                //$LASTPOS=18000352;//user.VTR:352
                if (_this.x<Tonyu.globals.$mouseX) {
                  //$LASTPOS=18000381;//user.VTR:381
                  _this.dx=99;
                  
                }
              }
              //$LASTPOS=18000406;//user.VTR:406
              _this.dy=0;
              //$LASTPOS=18000420;//user.VTR:420
              if (_this.abs(_this.y-Tonyu.globals.$mouseY)<49) {
                //$LASTPOS=18000457;//user.VTR:457
                _this.dy=_this.floor(Tonyu.globals.$mouseY-_this.y)+50;
                
              } else {
                //$LASTPOS=18000496;//user.VTR:496
                if (_this.y<Tonyu.globals.$mouseY) {
                  //$LASTPOS=18000525;//user.VTR:525
                  _this.dy=99;
                  
                }
              }
              //$LASTPOS=18000598;//user.VTR:598
              _this.buf.push(_this.dx+_this.dy*100);
            }
            __pc=9;break;
          case 5:
            //$LASTPOS=18000630;//user.VTR:630
            if (!(_this.i<_this.buf.length)) { __pc=8; break; }
            //$LASTPOS=18000658;//user.VTR:658
            _this.dx=_this.buf[_this.i]%100;
            //$LASTPOS=18000683;//user.VTR:683
            _this.dy=_this.floor((_this.buf[_this.i])/100);
            //$LASTPOS=18000759;//user.VTR:759
            _this.i++;
            //$LASTPOS=18000772;//user.VTR:772
            if (!(_this.upB&&_this.upB.clicked==1)) { __pc=7; break; }
            //$LASTPOS=18000813;//user.VTR:813
            new Tonyu.classes.user.Uploader({data: _this.playBack,vtr: _this});
            //$LASTPOS=18000864;//user.VTR:864
            _this.fiber$hideMenu(_thread);
            __pc=6;return;
          case 6:
            
          case 7:
            
          case 8:
            
          case 9:
            
            //$LASTPOS=18000896;//user.VTR:896
            _this.x+=(_this.dx-50);
            //$LASTPOS=18000912;//user.VTR:912
            _this.y+=(_this.dy-50);
            //$LASTPOS=18001083;//user.VTR:1083
            if (!(_this.stopped)) { __pc=10; break; }
            __pc=12; break;
            
          case 10:
            
            //$LASTPOS=18001107;//user.VTR:1107
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
      
      //$LASTPOS=18001201;//user.VTR:1201
      _this.greatCount++;
      //$LASTPOS=18001219;//user.VTR:1219
      if (combo>_this.maxCombo) {
        //$LASTPOS=18001239;//user.VTR:1239
        _this.maxCombo=combo;
      }
    },
    fiber$addGreat :function _trc_VTR_f_addGreat(_thread,combo) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001201;//user.VTR:1201
      _this.greatCount++;
      //$LASTPOS=18001219;//user.VTR:1219
      if (combo>_this.maxCombo) {
        //$LASTPOS=18001239;//user.VTR:1239
        _this.maxCombo=combo;
      }
      
      _thread.retVal=_this;return;
    },
    notifyUploaded :function _trc_VTR_notifyUploaded() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=18001281;//user.VTR:1281
      _this.uploaded=true;
      //$LASTPOS=18001300;//user.VTR:1300
      _this.showMenu();
    },
    fiber$notifyUploaded :function _trc_VTR_f_notifyUploaded(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001281;//user.VTR:1281
      _this.uploaded=true;
      
      _thread.enter(function _trc_VTR_ent_notifyUploaded(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001300;//user.VTR:1300
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
      
      //$LASTPOS=18001339;//user.VTR:1339
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
            //$LASTPOS=18001339;//user.VTR:1339
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
      
      //$LASTPOS=18001368;//user.VTR:1368
      _this.score=Tonyu.globals.$score;
      //$LASTPOS=18001386;//user.VTR:1386
      _this.stopped=true;
      //$LASTPOS=18001404;//user.VTR:1404
      _this.hideMenu();
    },
    fiber$stop :function _trc_VTR_f_stop(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001368;//user.VTR:1368
      _this.score=Tonyu.globals.$score;
      //$LASTPOS=18001386;//user.VTR:1386
      _this.stopped=true;
      
      _thread.enter(function _trc_VTR_ent_stop(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001404;//user.VTR:1404
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
      
      //$LASTPOS=18001436;//user.VTR:1436
      if (_this.upB) {
        //$LASTPOS=18001447;//user.VTR:1447
        _this.upB.die();
        //$LASTPOS=18001458;//user.VTR:1458
        _this.upB=null;
        
      }
      //$LASTPOS=18001473;//user.VTR:1473
      if (_this.tiB) {
        //$LASTPOS=18001482;//user.VTR:1482
        _this.tiB.die();
      }
    },
    fiber$hideMenu :function _trc_VTR_f_hideMenu(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001436;//user.VTR:1436
      if (_this.upB) {
        //$LASTPOS=18001447;//user.VTR:1447
        _this.upB.die();
        //$LASTPOS=18001458;//user.VTR:1458
        _this.upB=null;
        
      }
      //$LASTPOS=18001473;//user.VTR:1473
      if (_this.tiB) {
        //$LASTPOS=18001482;//user.VTR:1482
        _this.tiB.die();
      }
      
      _thread.retVal=_this;return;
    },
    showMenu :function _trc_VTR_showMenu() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=18001513;//user.VTR:1513
      if (! _this.uploaded) {
        //$LASTPOS=18001528;//user.VTR:1528
        _this.upB=new Tonyu.classes.user.Button({top: 300,text: "Upload this play",height: 30});
      }
      //$LASTPOS=18001593;//user.VTR:1593
      _this.tiB=new Tonyu.classes.user.Button({top: 350,text: "Return to title",height: 30,onClick: (function anonymous_1667() {
        
        //$LASTPOS=18001685;//user.VTR:1685
        _this.loadPage(Tonyu.classes.user.Title);
      })});
    },
    fiber$showMenu :function _trc_VTR_f_showMenu(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=18001513;//user.VTR:1513
      if (! _this.uploaded) {
        //$LASTPOS=18001528;//user.VTR:1528
        _this.upB=new Tonyu.classes.user.Button({top: 300,text: "Upload this play",height: 30});
      }
      
      _thread.enter(function _trc_VTR_ent_showMenu(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=18001593;//user.VTR:1593
            _this.tiB=new Tonyu.classes.user.Button({top: 350,text: "Return to title",height: 30,onClick: (function anonymous_1667() {
              
              //$LASTPOS=18001685;//user.VTR:1685
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
