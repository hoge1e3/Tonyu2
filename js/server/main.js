var express = require('express');
var app = express.createServer();
var SFile = require("./SFile");

app.get('/File2LS', function(req, res){
	//res.send(req.query.base);
	res.send( SFile.get("Libs.txt").text() );
});
app.post('/LS2File', function(req, res){
	var base=req.body.base;

});


app.use(express.static(__dirname+"/../../" ,{maxAge:864000000}));
app.use(express.staticCache());
app.use(express.bodyParser());
var http = require('http');
var server = http.createServer(app);
server.listen(3000);