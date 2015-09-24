Tonyu.klass.define({
  fullName: 'user.Chara1',
  shortName: 'Chara1',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Chara1_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000001;//user.Chara1:1
      _this.x=200;
      //$LASTPOS=1000008;//user.Chara1:8
      _this.y=30;
      //$LASTPOS=1000014;//user.Chara1:14
      while (true) {
        //$LASTPOS=1000032;//user.Chara1:32
        _this.rotation++;
        //$LASTPOS=1000048;//user.Chara1:48
        _this.update();
        
      }
    },
    fiber$main :function _trc_Chara1_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      //$LASTPOS=1000001;//user.Chara1:1
      _this.x=200;
      //$LASTPOS=1000008;//user.Chara1:8
      _this.y=30;
      
      _thread.enter(function _trc_Chara1_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000014;//user.Chara1:14
          case 1:
            //$LASTPOS=1000032;//user.Chara1:32
            _this.rotation++;
            //$LASTPOS=1000048;//user.Chara1:48
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
