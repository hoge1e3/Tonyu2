const https = require("https");
const fs = require("fs");
const {performance} = require("perf_hooks");
// const zlib = require("zlib");
// const stream = require("stream");

dlMain().then(() => {
    console.log("Success dl_nw.js");
});

async function dlMain() {
    const verJson = await getJson("https://nwjs.io/versions.json");
    // console.log(verJson);

    let version = verJson.stable; // EX) "v0.48.1"
    let osFile = "win-x64";
    let [url, fileName] = getURL(version, osFile);
    // fileName = ""+fileName;
    
    console.log("url  : "+url);
    console.log("file : "+fileName);

    await dlNw(url, fileName);
    // await unzip(fileName, "nwdir");
}

function getURL(version, osFile) {
    const fileName = "nwjs-sdk-"+version+"-"+osFile+".zip";
    const url = "https://dl.nwjs.io/"+version+"/"+fileName;
    return [url, fileName];
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

function dlNw(url, fileName) {
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

// function unzip(zipFileName, fileName) {
//     return new Promise((resolve, reject) => {
//         console.log("zipFileName  : "+zipFileName);
//         console.log("fileName : "+fileName);

//         const unzip = zlib.createUnzip();
//         const src = fs.createReadStream(zipFileName);
//         const dist = fs.createWriteStream(fileName);
        
//         let size = fs.statSync(zipFileName).size;
//         const progress = new Progress(size, (per, cnt, size, cntsecdisp) => {
//             // process.stdout.clearLine();
//             process.stdout.cursorTo(0);
//             process.stdout.write("["+per+"%]  "+dispSize(cnt)+" / "+dispSize(size)+"  ("+dispSize(cntsecdisp)+"/sec)         ");
//         });
//         dist.on("data", (d) => {
//             progress.notice(d.length);
//         });
//         dist.on("finish", (err) => {
//             process.stdout.clearLine();
//             process.stdout.cursorTo(0);
//             console.log("finish Unzip");
//             resolve();
//         });

//         stream.pipeline(src, unzip, dist, (err) => {
//             console.error("error Unzip:", err);
//         });
//     })
// }

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