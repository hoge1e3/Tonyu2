(function () {
  var rom={
    
  };
  if (WebSite.devMode) {
    rom.base='/ROM'+rom.base;
  }
  FS.mountROM(rom);
})();