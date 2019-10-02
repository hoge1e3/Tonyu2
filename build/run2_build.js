/* global process, nodeRequire*/
(function () {
	   const top= `${process.cwd().replace(/\\/g,"/")}/..`;
	   const build= `${top}/build`;
	   const www=`${top}/www`;
	   const js=`${www}/js`;
	   const gen=`${js}/g2`;
	   //console.log(`${js}/reqConf2.js`);
	   //const fs=require("fs");
	   //console.log(fs.existsSync(`${js}/reqConf2.js`));
	   const conf=nodeRequire(`${js}/reqConf2`).conf;
	return {
	    name: 'js/almond',
	    include: ['runScript2'],
	    optimize:"none",
	    baseUrl: www,
	    wrap: {
	        startFile: `${build}/run2_head.txt`,
	        endFile: `${build}/run2_tail.txt`
	    },
	    paths: conf.paths,
	    out: `${gen}/runScript2_concat.js`,
	    shim: conf.shim

	};

})();
