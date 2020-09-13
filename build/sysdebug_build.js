/* global process, nodeRequire*/
(function() {
    const top = `${process.cwd()}`;
    const build = `${top}/build`;
    const www = `${top}/www`;
    const js = `${www}/js`;
    const gen = `${js}/g2`;
	const fs=nodeRequire("fs");
    const conf = nodeRequire(`${js}/reqConf2`).conf;
    const entry = "SysDebugger";
    const filename = `${entry}_concat`;

    function uglifyWithSourceMap(str, url) {
        try {
            var UglifyJS = nodeRequire("uglify-es");
            var r = UglifyJS.minify({
                [`${filename}.js`]: str
            }, {
                sourceMap: {
                    url,
                    includeSources: true,
                    //filename: "${filename}.js"
                }
            });
            if (r.error) return {
                code: str
            };
            //console.log(r);
            return r;
        } catch (e) {
            console.log("Uglify fail " + e);
            return {
                code: str
            };
        }
    }
    return {
        name: 'js/almond',
        include: [entry],
        //insertRequire: ['SEnvClient'],
        optimize: "none",
        baseUrl: www,
        wrap: {
            startFile: `${build}/sysdebug_head.txt`,
            endFile: `${build}/sysdebug_tail.txt`
        },
        paths: conf.paths,
        out: r=>{
			const u=uglifyWithSourceMap(r,`${filename}.min.js.map`);
			if (u.map) fs.writeFileSync( `${gen}/${filename}.min.js.map`,u.map);
			fs.writeFileSync( `${gen}/${filename}.min.js`,u.code);
		},
        shim: conf.shim

    };

})();
