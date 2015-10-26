(function () {
  var rom={
    base: '/Tonyu/Kernel/',
    data: {
      '': '{}'
    }
  };
  if (WebSite.devMode || WebSite.disableROM['ROM_k.js'] || WebSite.isNW) {
    rom.base='/ROM'+rom.base;
  } else {
    FS.mountROM(rom);
  }
})();