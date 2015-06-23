Tonyu.klass.define({
  fullName: 'user.Net',
  shortName: 'Net',
  namespace: 'user',
  superclass: Tonyu.classes.kernel.Actor,
  includes: [],
  methods: {
    main :function _trc_Net_main() {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      
      //$LASTPOS=1000027;//user.Net:27
      _this.r=_this.runAsync((function anonymous_38(succ) {
        
        //$LASTPOS=1000053;//user.Net:53
        $.get("http://cho.is.meisei-u.ac.jp/sotu/tonyu/server/cho_net.php",{},succ);
      }));
      //$LASTPOS=1000137;//user.Net:137
      _this.print(_this.r[0]);
    },
    fiber$main :function _trc_Net_f_main(_thread) {
      var _this=this.isTonyuObject?this:Tonyu.not_a_tonyu_object(this);
      //var _arguments=Tonyu.A(arguments);
      var __pc=0;
      
      
      _thread.enter(function _trc_Net_ent_main(_thread) {
        if (_thread.lastEx) __pc=_thread.catchPC;
        for(var __cnt=100 ; __cnt--;) {
          switch (__pc) {
          case 0:
            //$LASTPOS=1000027;//user.Net:27
            _this.fiber$runAsync(_thread, (function anonymous_38(succ) {
              
              //$LASTPOS=1000053;//user.Net:53
              $.get("http://cho.is.meisei-u.ac.jp/sotu/tonyu/server/cho_net.php",{},succ);
            }));
            __pc=1;return;
          case 1:
            _this.r=_thread.retVal;
            
            //$LASTPOS=1000137;//user.Net:137
            _this.print(_this.r[0]);
            _thread.exit(_this);return;
          }
        }
      });
    },
    __dummy: false
  },
  decls: {"methods":{"main":{"nowait":false}}}
});
