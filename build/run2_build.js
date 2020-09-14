/* global process, nodeRequire*/
(function () {
	   const top= `${process.cwd().replace(/\\/g,"/")}`;
	   const build= `${top}/build`;
	   const www=`${top}/www`;
	   const js=`${www}/js`;
	   const gen=`${js}/g2`;
	   //console.log(`${js}/reqConf2.js`);
	   const fs=nodeRequire("fs");
	   //console.log(fs.existsSync(`${js}/reqConf2.js`));
	   const conf=nodeRequire(`${js}/reqConf2`).conf;
	   const entry="runScript2";
	   const filename=`${entry}_concat`;
	   const urlPrefix="js";
	   function uglifyWithSourceMap(str,url) {
		   try {
			var UglifyJS = nodeRequire("uglify-es");
			var r=UglifyJS.minify({[`${filename}.js`]:str},{
				sourceMap: {
					url,includeSources:true,
				}
			});
			if (r.error) return {code:str};
			//console.log(r);
			return r;
		   }catch(e) {
			console.log("Uglify fail "+e);
			return {code:str};
		   }
	   }

	return {
	    name: 'js/almond',
	    include: [entry],
	    optimize:"none",
	    baseUrl: www,
	    wrap: {
	        startFile: `${build}/run2_head.txt`,
	        endFile: `${build}/run2_tail.txt`
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
