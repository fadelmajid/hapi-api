"use strict";

const Hapi = require('@hapi/hapi');
const constants = require('./config/config.json');
const routes = require('./app/routes');
const _ = require('underscore');
const environment = process.env;

const options = {
	state : {
		cookies : {
			strictHeader : false
		}
	}
};

const host = constants['development'].host;
const port = constants['development'].app_port
const server = Hapi.server({
    port: port,
    host: host
});

// Add all the routes within the routes folder
for (const route in routes) {
	server.route(routes[route]);
}

module.exports = server;

if (process.env.NODE_ENV !== 'test') {
	server.start();

	console.log(`Server running in port ${port}`);
}