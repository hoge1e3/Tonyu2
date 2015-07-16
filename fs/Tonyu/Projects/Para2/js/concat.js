Tonyu.klass.define({
  fullName: 'user.Main',
  shortName: 'Main',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Main_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=44000000;//user.Main:0
      _this.n=new Tonyu.classes.user.Neko({x: 100,y: 100});
      //$LASTPOS=44000025;//user.Main:25
      _this.x=20;
      //$LASTPOS=44000030;//user.Main:30
      _this.y=100;
      //$LASTPOS=44000037;//user.Main:37
      while (true) {
        //$LASTPOS=44000055;//user.Main:55
        if (_this.getkey(32)==1) {
          //$LASTPOS=44000073;//user.Main:73
          _this.x+=10;
        }
        //$LASTPOS=44000107;//user.Main:107
        _this.update();
        
      }
    },
    fiber$main :function _trc_Main_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=44000000;//user.Main:0
      _this.n=new Tonyu.classes.user.Neko({x: 100,y: 100});
      //$LASTPOS=44000025;//user.Main:25
      _this.x=20;
      //$LASTPOS=44000030;//user.Main:30
      _this.y=100;
      
      _thread.enter(function _trc_Main_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=44000037;//user.Main:37
          case 1:
            //$LASTPOS=44000055;//user.Main:55
            if (_this.getkey(32)==1) {
              //$LASTPOS=44000073;//user.Main:73
              _this.x+=10;
            }
            //$LASTPOS=44000107;//user.Main:107
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
  fullName: 'user.Neko',
  shortName: 'Neko',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Neko_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000000;//user.Neko:0
      _this.p=Tonyu.globals.$pat_neko;
      //$LASTPOS=45000014;//user.Neko:14
      _this.by=_this.y;
      //$LASTPOS=45000020;//user.Neko:20
      _this.on("crashTo",Tonyu.classes.user.Main,Tonyu.bindFunc(_this,_this.bikkuri));
    },
    fiber$main :function _trc_Neko_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000000;//user.Neko:0
      _this.p=Tonyu.globals.$pat_neko;
      //$LASTPOS=45000014;//user.Neko:14
      _this.by=_this.y;
      //$LASTPOS=45000020;//user.Neko:20
      _this.on("crashTo",Tonyu.classes.user.Main,Tonyu.bindFunc(_this,_this.bikkuri));
      
      _thread.retVal=_this;return;
    },
    bikkuri :function _trc_Neko_bikkuri() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      var i;
      
      //$LASTPOS=45000066;//user.Neko:66
      _this.p=Tonyu.globals.$pat_neko+8;
      //$LASTPOS=45000085;//user.Neko:85
      //$LASTPOS=45000090;//user.Neko:90
      i = 0;
      while(i<=10) {
        {
          //$LASTPOS=45000119;//user.Neko:119
          _this.x++;
          //$LASTPOS=45000132;//user.Neko:132
          _this.y=_this.by+(i-5)*(i-5)-25;
          //$LASTPOS=45000161;//user.Neko:161
          _this.update();
        }
        i++;
      }
      //$LASTPOS=45000181;//user.Neko:181
      _this.p=Tonyu.globals.$pat_neko+0;
    },
    fiber$bikkuri :function _trc_Neko_f_bikkuri(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      var i;
      
      //$LASTPOS=45000066;//user.Neko:66
      _this.p=Tonyu.globals.$pat_neko+8;
      
      _thread.enter(function _trc_Neko_ent_bikkuri(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000085;//user.Neko:85
            //$LASTPOS=45000090;//user.Neko:90
            i = 0;;
          case 1:
            if (!(i<=10)) { __pc=3; break; }
            //$LASTPOS=45000119;//user.Neko:119
            _this.x++;
            //$LASTPOS=45000132;//user.Neko:132
            _this.y=_this.by+(i-5)*(i-5)-25;
            //$LASTPOS=45000161;//user.Neko:161
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            i++;
            __pc=1;break;
          case 3:
            
            //$LASTPOS=45000181;//user.Neko:181
            _this.p=Tonyu.globals.$pat_neko+0;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false},"bikkuri":{"nowait":false}}}
});
