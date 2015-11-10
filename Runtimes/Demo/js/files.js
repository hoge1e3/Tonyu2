function loadFiles(dir){
	dir.rel('res.json').obj({"images":[{"name":"$pat_base","url":"images/base.png","pwidth":32,"pheight":32},{"name":"$pat_neko","url":"images/neko.png","pwidth":32,"pheight":32},{"name":"$pat_mapchip","url":"images/mapchip.png","pwidth":32,"pheight":32},{"name":"$icon_thumbnail","pwidth":100,"pheight":100,"url":"images/icon_thumbnail.png"}],"sounds":[]});
	dir.rel('options.json').obj({"compiler":{"defaultSuperClass":"Actor","commentLastPos":true,"diagnose":false},"run":{"mainClass":"Main","bootClass":"Boot"},"kernelEditable":false,"plugins":{}});
}