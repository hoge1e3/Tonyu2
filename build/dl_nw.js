const https = require("https");
const fs = require("fs-extra");
const {performance} = require("perf_hooks");
const AdmZip = require("adm-zip");

dlMain().then(() => {});

async function dlMain() {
    const verJson = await getJson("https://nwjs.io/versions.json");
    // console.log(verJson);

    const version = verJson.stable; // EX) "v0.48.1"
    const osFile = "win-x64";
    const [url, fileName, dirName] = getURL(version, osFile);
    
    console.log("url  : "+url);
    console.log("file : "+fileName);

    const workDir = "./download/";
    const zipFileName = workDir+fileName;
    fs.mkdirsSync(workDir);

    if (!fs.existsSync(zipFileName)) {
        await downloadNw(url, zipFileName);
    } else {
        console.log("cache zip");
    }
    await unzip(zipFileName, workDir);
    await copyFile(dirName, workDir);
    fs.removeSync(workDir+dirName);
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
                console.log("downloaded!");
                resolve();
            });
        });
        req.on("error", (e) => {
            console.error(e);
            reject();
        });
        req.end();
    });
}

function unzip(zipFileName, dirName) {
    return new Promise((resolve, reject) => {
        const zip = new AdmZip(zipFileName);
        const zipEntries = zip.getEntries();
        const size = zipEntries.length;
        let cnt = 0;
        zipEntries.forEach((zipEntry) => {
            zip.extractEntryTo(zipEntry.entryName, dirName, true, true);
            cnt ++;
            const per = parseInt(cnt / size * 100);
            process.stdout.clearLine();
            process.stdout.cursorTo(0);
            process.stdout.write("["+per+"%]  "+cnt+" / "+size+"   "+zipEntry.entryName);
            if (cnt >= size) {
                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                console.log("unziped!");
            }
        });
        resolve();
    })
}

function copyFile(dirName, workDir) {
    return new Promise((resolve, reject) => {
        const src = workDir+dirName+"/";
        const dist = "./";
        const files = [
            "d3dcompiler_47.dll",
            "ffmpeg.dll",
            "icudtl.dat",
            "libEGL.dll",
            "libGLESv2.dll",
            "locales/",
            // "natives_blob.bin",
            "node.dll",
            "nw.dll",
            "nw_100_percent.pak",
            "nw_200_percent.pak",
            "nw_elf.dll",
            "resources.pak",
            "v8_context_snapshot.bin",
            "nw.exe"
        ];
        for (const f of files) {
            fs.copySync(src+f, dist+f);
            console.log("copy", src+f, dist+f);
        }
        fs.moveSync("./nw.exe", "./Tonyu2.exe", { overwrite: true });
        console.log("rename", "./nw.exe", "./Tonyu2.exe");
        resolve();
    });
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