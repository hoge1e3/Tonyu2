var express = require('express'), http = require('http');

var app = express();
var server = http.createServer(app);

/*var express = require('express');
var app = express.createServer();*/
var LSFile= require("./LSFile");
var dumpScript= require("./dumpScript");
var bp=require("body-parser");
/*var getRawBody = require('raw-body');

app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '10mb',
    encoding: 'utf8'
  }, function (err, string) {
    if (err)
      return next(err);
    req.text = string;
    next();
  });
});*/

//app.use(express.json({limit: '50mb'}));
//app.configure(function () {
//app.use(express.limit(100000000));
app.use(express.static(__dirname+"/../../" ,{maxAge:864000000}));
    //app.use(express.staticCache());
app.use(bp({limit: '50mb'}));

//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//});

app.get('/genShim', dumpScript.genShim );
app.get('/concat', dumpScript.concat );
app.get('/File2LS', LSFile.File2LS);
app.post('/LS2File', LSFile.LS2File);
app.post('/File2LSSync', LSFile.File2LSSync);
app.post('/LS2FileSync', LSFile.LS2FileSync);
app.get('/getDirInfo', LSFile.getDirInfo);

app.post('/edit/File2LSSync', LSFile.File2LSSync);
app.post('/edit/LS2FileSync', LSFile.LS2FileSync);
app.get('/edit/getDirInfo', LSFile.getDirInfo);


var http = require('http');
//var server = http.createServer(app);
server.listen(3000);
