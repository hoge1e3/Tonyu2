
process.chdir("./www/js/g2");
const fs=require("fs");
if (fs.existsSync("send.bat")) {
	const { spawn } = require('child_process');
	const ls=spawn('send.bat', []);	
	ls.stdout.on('data', (data) => {
	  console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
	  console.error(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`child process exited with code ${code}`);
	});
} else {
	console.log("build:send skipped");
}

