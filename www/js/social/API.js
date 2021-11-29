define(function (require,exports,module){
    module.exports=class {
        constructor(prj) {
            this.prj=prj;
        }
        dir() {
            return this.prj.getDir();
        }
        get() {
            const confFile=this.confFile();
            if (!confFile.exists()) return {};
            return confFile.obj()[this.key()]||{};
        }
        key() {
            return this.dir().name();
        }
        set(data) {
            const confFile=this.confFile();
            const d=(confFile.exists() ? confFile.obj() : {});
            d[this.key()]=data;
            confFile.obj(d);
        }
        confFile() {
            return this.dir().up().rel("api.json");
        }
    };
});
