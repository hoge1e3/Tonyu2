Tonyu.klass.define({
  fullName: 'user.Test',
  shortName: 'Test',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Test_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=45000000;//user.Test:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=45000043;//user.Test:43
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=45000066;//user.Test:66
      Tonyu.globals.$map.zOrder=1000;
      //$LASTPOS=45000084;//user.Test:84
      _this.x=20;
      //$LASTPOS=45000089;//user.Test:89
      _this.y=20;
      //$LASTPOS=45000096;//user.Test:96
      while (true) {
        //$LASTPOS=45000114;//user.Test:114
        _this.x++;
        //$LASTPOS=45000123;//user.Test:123
        _this.y++;
        //$LASTPOS=45000132;//user.Test:132
        Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
        //$LASTPOS=45000210;//user.Test:210
        _this.update();
        
      }
      //$LASTPOS=45000222;//user.Test:222
      _this.a=6601;
    },
    fiber$main :function _trc_Test_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=45000000;//user.Test:0
      Tonyu.globals.$map=new Tonyu.classes.kernel.Map({chipWidth: 32,chipHeight: 32});
      //$LASTPOS=45000043;//user.Test:43
      Tonyu.globals.$map.load("map.json");
      //$LASTPOS=45000066;//user.Test:66
      Tonyu.globals.$map.zOrder=1000;
      //$LASTPOS=45000084;//user.Test:84
      _this.x=20;
      //$LASTPOS=45000089;//user.Test:89
      _this.y=20;
      
      _thread.enter(function _trc_Test_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=45000096;//user.Test:96
          case 1:
            //$LASTPOS=45000114;//user.Test:114
            _this.x++;
            //$LASTPOS=45000123;//user.Test:123
            _this.y++;
            //$LASTPOS=45000132;//user.Test:132
            Tonyu.globals.$Screen.scrollTo(_this.x-Tonyu.globals.$screenWidth/2,_this.y-Tonyu.globals.$screenHeight/2);
            //$LASTPOS=45000210;//user.Test:210
            _this.fiber$update(_thread);
            __pc=2;return;
          case 2:
            
            __pc=1;break;
          case 3:
            
            //$LASTPOS=45000222;//user.Test:222
            _this.a=6601;
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
