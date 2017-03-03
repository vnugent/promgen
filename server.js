'use strict';

var express = require('express');
var server = express();

var register = require('prom-client').register;
var client = require('prom-client');

var counter = new client.Counter('metric_name', 'metric_help');
counter.inc(); // Inc with 1
counter.inc(10); // Inc with 10

server.get('/metrics', function(req, res) {
	res.end(register.metrics());
});

server.listen(3000);