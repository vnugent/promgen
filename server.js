'use strict';

var path    = require("path");
var express = require('express');
var server = express();

var register = require('prom-client').register;
var client = require('prom-client');

var counter = new client.Counter('counterA', 'counterA help message');

var gauge = new client.Gauge('gaugeA', 'gaugeA help message');


server.get('/metrics', function(req, res) {
	counter.inc();
	gauge.set(getRandomIntInclusive(1,100));
	res.end(register.metrics());
	console.log(counter.name, ' ', counter.get().values);
	console.log(gauge.name, ' ', gauge.get().values);
	console.log("-----------------------")
});

server.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'))
});

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

server.listen(8080);
