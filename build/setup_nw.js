/**
 * setup_nw.js
 * 1. download NW.js zip file
 * 2. unzip some file
 * 3. Tonyu2 icon change
 */
const https = require("https");
const fs = require("fs-extra");
const {performance} = require("perf_hooks");
const AdmZip = require("adm-zip");
const execSync = require("child_process").execSync;

dlMain().then(() => {
    console.log("setup complete!");
});

async function dlMain() {
    const verJson = await getJson("https://nwjs.io/versions.json");
    // console.log(verJson);

    const version = verJson.stable; // EX) "v0.48.1"
    const osFile = "win-x64";
    const [url, fileName, dirName] = getURL(version, osFile);
    
    console.log("url  : "+url);
    console.log("file : "+fileName);

    const workDir = "download/";
    const zipFileName = workDir+fileName;
    fs.mkdirsSync(workDir);

    if (!fs.existsSync(zipFileName)) {
        await downloadNw(url, zipFileName);
    } else {
        console.log("cache zip");
    }
    await setupFile(zipFileName, dirName, workDir);
}

function getURL(version, osFile) {
    const dirName = "nwjs-sdk-"+version+"-"+osFile;
    const fileName = dirName+".zip";
    const url = "https://dl.nwjs.io/"+version+"/"+fileName;
    return [url, fileName, dirName];
}

function getJson(url) {
    return new Promise(resolve => {
        const data = [];
        https.get(url, (res) => {
            res.on("data", (chunk) => {
                data.push(chunk);
            }).on("end", () => {
                const d = Buffer.concat(data);
                const j = JSON.parse(d);
                resolve(j);
            });
        });
    });
}

function downloadNw(url, fileName) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(fileName);
        const req = https.get(url, (res) => {
            // console.log("statusCode:", res.statusCode);
            // console.log("headers:", res.headers);
            let size = parseInt(res.headers["content-length"]);
            const progress = new Progress(size, (per, cnt, size, cntsecdisp) => {
                // process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write("["+per+"%]  "+dispSize(cnt)+" / "+dispSize(size)+"  ("+dispSize(cntsecdisp)+"/sec)         ");
            });
            res.on("data", (d) => {
                progress.notice(d.length);
            });
            res.pipe(file);
            file.on("finish", function() {
                file.close();
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log("downloaded");
                resolve();
            });
        });
        req.end();
    });
}

function setupFile(zipFileName, dirName, workDir) {
    return new Promise((resolve, reject) => {
        const files = [
            "d3dcompiler_47.dll",
            "ffmpeg.dll",
            "icudtl.dat",
            "libEGL.dll", // and swiftshader/libEGL.dll
            "libGLESv2.dll", // and swiftshader/libGLESv2.dll
            "locales/",
            "node.dll",
            "nw.dll",
            "nw_100_percent.pak",
            "nw_200_percent.pak",
            "nw_elf.dll",
            "resources.pak",
            "v8_context_snapshot.bin",
            "nw.exe"
        ];
        const zipEntryNameIdx = dirName.length + 1;

        const zip = new AdmZip(zipFileName);
        const zipEntries = zip.getEntries();
        zipEntries.forEach((zipEntry) => {
            const entryName = zipEntry.entryName;
            const isExtract = files.find((name) => entryName.lastIndexOf(name)>=0);
            if (!isExtract) return;

            const writeFile = entryName.substring(zipEntryNameIdx);
            const writeDir = entryName.substring(zipEntryNameIdx, entryName.lastIndexOf("/")+1);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write("unzip "+writeFile);
            // console.log("unzip", writeFile, writeDir, entryName);
            zip.extractEntryTo(entryName, writeDir, false, true);
        });
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log("unziped");

        console.log("remove", "Tonyu2.exe");
        fs.removeSync("Tonyu2.exe");

        const cmd = "node node_modules/exe-edit/out/cli.js nw.exe Tonyu2.exe --icon www/favicon.ico"
        console.log(cmd);
        const stdout = execSync(cmd);
        // console.log(stdout.toString());

        console.log("remove", "nw.exe");
        fs.removeSync("nw.exe");

        resolve();
    })
}

class Progress {
    constructor(size, fnDisp) {
        this.cnt = 0;
        this.size = size;
        this.cntsec = 0;
        this.cntsecdisp = 0;
        this.t1 = performance.now();
        this.fnDisp = fnDisp;
    }
    notice(dlen) {
        const now = performance.now();
        this.cnt += dlen;
        this.cntsec += dlen;
        const upMs = 500;
        if (now - this.t1 >= upMs) {
            this.t1 += upMs;
            this.cntsecdisp = this.cntsec * 1000/upMs;
            this.cntsec = 0;
            const per = parseInt(this.cnt/this.size*100);
            this.fnDisp(per, this.cnt, this.size, this.cntsecdisp);
        }
    }
}

function dispSize(b) {
    return b < 1024 ? b+" B" : 
        b < 1048576 ? parseInt(b/1024)+" KiB" :
        b < 1073741824 ? parseInt(b/1048576)+" MiB" :
        parseInt(b/1073741824)+" GiB";
}