"use strict";

var Hapi = require('@hapi/hapi');
var constants = require('src/config/constants.js');
var routes = require('src/routes');
var _ = require('underscore');

var options = {
	state : {
		cookies : {
			strictHeader : false
		}
	}
};

var host = constants.application['host'];
var port = constants.application['port'];
var server = Hapi.createServer(host, port, options);

server.ext('onRequest', function(request, next){
	request.plugins.createControllerParams = function(requestParams){
		var params = _.clone(requestParams);
		params.userId = request.auth.credentials.userId;
		return params;
	};
	next();
});

// Add all the routes within the routes folder
for (var route in routes) {
	server.route(routes[route]);
}

module.exports = server;

if (process.env.NODE_ENV !== 'test') {
	server.start();

	console.log(`Server running in port ${port}`);
}