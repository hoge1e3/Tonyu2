const path = require("path");
const execSync = require("child_process").execSync;

const cmds = [
    "node ..\\..\\tonyu2-compiler\\index.js ..\\www\\Kernel\\"
];

for (const cmd of cmds) {
    console.log(cmd);
    const stdout = execSync(cmd, {cwd: __dirname});
    // console.log(stdout.toString());
}