const path = require("path");
const execSync = require("child_process").execSync;

const cmds = [
    "node setVersion.js",
    "..\\node_modules\\.bin\\r_js -o selPrj_build.js",
    "..\\node_modules\\.bin\\r_js -o editor_build.js",
    "..\\node_modules\\.bin\\r_js -o run2_build.js",
    "..\\node_modules\\.bin\\r_js -o run1_build.js",
    "..\\node_modules\\.bin\\r_js -o sysdebug_build.js"
];

for (const cmd of cmds) {
    console.log(cmd);
    const stdout = execSync(cmd, {cwd: __dirname});
    // console.log(stdout.toString());
}