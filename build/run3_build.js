/* global process, nodeRequire*/
(function () {
	   const top= `${process.cwd()}/..`;
	   const build= `${top}/build`;
	   const www=`${top}/www`;
	   const js=`${www}/js`;
	   const gen=`${js}/g2`;
	   const conf=nodeRequire(`${js}/reqConf2`).conf;
	return {
	    name: 'js/almond',
	    include: ['runScript3'],
	    //insertRequire: ['SEnvClient'],
	    optimize:"none",
	    baseUrl: www,
	    wrap: {
	        startFile: `${build}/run3_head.txt`,
	        endFile: `${build}/run3_tail.txt`
	    },
	    paths: conf.paths,
	    out: `${gen}/runScript3_concat.js`,
	    shim: conf.shim

	};

})();
