function loadFiles(dir){
   if (WebSite.isNW) return;
	dir.rel('res.json').obj({"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_sample","url":"images/Sample.png"},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_mapchip","url":"images/mapchip.png","pwidth":32,"pheight":32},{"name":"$pat_inputPad","url":"images/inputPad.png"},{"name":"$icon_thumbnail","pwidth":200,"pheight":200,"url":"images/icon_thumbnail.png"}],"sounds":[]});
	dir.rel('options.json').obj({"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"Boot","globals":{"$defaultFPS":60}},"kernelEditable":false,"plugins":{}});
}