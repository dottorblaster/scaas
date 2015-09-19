var Hapi = require('hapi'),
	Utils = require('./lib/utils.js'),
	config = require('./config.js'),
	server = new Hapi.Server(),
	sc = config.sc;

server.connection({port: config.port});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		var r = {response: sc};

		Utils.requestFormatter(request, r).dilate(request, r, {1:'gran', 2:'grandissimo'});
		return reply(JSON.stringify(r)).type('application/json');
	}
});

server.route({
	method: 'GET',
	path: '/caps',
	handler: function(request, reply){
		var r = {response: sc.toUpperCase()};

		Utils.requestFormatter(request, r).dilate(request, r, {1:'GRAN', 2:'GRANDISSIMO'});
		return reply(JSON.stringify(r)).type('application/json');
	}
});

server.route({
	method: 'GET',
	path: '/camel',
	handler: function(request, reply){
		var r = {response: "StoCazzo"};

		Utils.requestFormatter(request, r).dilate(request, r, {1:'Gran', 2:'Grandissimo'});
		return reply(JSON.stringify(r)).type('application/json');
	}
});

server.route({
	method: 'GET',
	path: '/ascii',
	handler: function(request, reply){
		var r = {response: "8====D"};

		Utils.requestFormatter(request, r).dilate(request, r, {1:'===', 2:'====='});
		return reply(JSON.stringify(r)).type('application/json');
	}
});

server.start(function () {
	console.log('A stocazzo provider is running at:', server.info.uri);
});

exports.server = server;
