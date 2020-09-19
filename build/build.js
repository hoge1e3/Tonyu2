const path = require("path");
const execSync = require("child_process").execSync;

const cmds = [
    "node build/setVersion.js",
    "node_modules\\.bin\\r_js -o build/selPrj_build.js",
    "node_modules\\.bin\\r_js -o build/editor_build.js",
    "node_modules\\.bin\\r_js -o build/run2_build.js",
    "node_modules\\.bin\\r_js -o build/run1_build.js",
    "node_modules\\.bin\\r_js -o build/sysdebug_build.js"
];

for (const cmd of cmds) {
    console.log(cmd);
    const stdout = execSync(cmd);
    // console.log(stdout.toString());
}