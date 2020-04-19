"use strict";

const dotenv = require('dotenv').config();
const Hapi = require('@hapi/hapi');
const constants = require('./config/config.json');
const routes = require('./app/routes');
const Qs = require('qs');

const options = {
	state : {
		cookies : {
			strictHeader : false
		}
	}
};

const host = constants[process.env.NODE_ENV].host;
const port = constants[process.env.NODE_ENV].app_port
const server = Hapi.server({
    port: port,
	host: host,
	query: {
        parser: (query) => Qs.parse(query)
    }
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