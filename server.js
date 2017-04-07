'use strict';

var path    = require("path");
var express = require('express');
var server = express();

var register = require('prom-client').register;
var client = require('prom-client');

// uncomment the following 2 lines to disable default node.js metrics
 clearInterval(client.defaultMetrics());
 client.register.clear();

var counters = []
var gauges = []

for (var i=0; i<15; i++) {
    counters.push(new client.Counter('counter' + i , 'Help message for counter' + i));
    gauges.push(new client.Gauge('gauge' + i, 'Help message for gauge' +i));
}


function update() {
    for (var i=0; i<15; i++) {
        counters[i].inc();
        gauges[i].set(getRandomIntInclusive(1,100));
    }
}




server.get('/metrics', function(req, res) {
    update();
    res.end(register.metrics());
    console.log(counters[0].name, ' ', counters[0].get().values);
    console.log(gauges[0].name, ' ', gauges[0].get().values);
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
