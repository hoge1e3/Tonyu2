/* global process, nodeRequire*/
(function () {
	   const top= `${process.cwd().replace(/\\/g,"/")}/..`;
	   const build= `${top}/build`;
	   const www=`${top}/www`;
	   const js=`${www}/js`;
	   const gen=`${js}/g2`;
	   //console.log(`${js}/reqConf2.js`);
	   const fs=nodeRequire("fs");
	   //console.log(fs.existsSync(`${js}/reqConf2.js`));
	   const conf=nodeRequire(`${js}/reqConf2`).conf;
	   function uglify(str) {
	       try {
	           var UglifyJS = nodeRequire("uglify-es");
	           var r=UglifyJS.minify(str);
			   if (r.error) return str;
			   return r.code;
	       }catch(e) {
	           console.log("Uglify fail "+e);
			   return str;
	       }
	   }
	return {
	    name: 'js/almond',
	    include: ['runScript'],
	    optimize:"none",
	    baseUrl: www,
	    wrapold: {
	        startFile: `${build}/run2_head.txt`,
	        endFile: `${build}/run2_tail.txt`
	    },
	    paths: conf.paths,
	    out: (r)=> {
			//console.log("Writing", r);
			r=r.replace(/"[^"]*"\/\*WORKER_URL\*\//,"WORKER_URL");
			const content=JSON.stringify(uglify(fs.readFileSync(`${www}/BuilderWorker.js`,'utf8')));
			const urlFunc=`()=>{
				const b=new Blob([${content}],{type:"text/javscript"});
				return URL.createObjectURL(b);
			}`;
			const urlVal=`(${urlFunc})()`;
			r=`(function (WORKER_URL) {
				${r}
			})(${urlVal});`;

			fs.writeFileSync( `${gen}/runScript_concat.js`,r);
		},
	    shim: conf.shim

	};

})();
