module.exports = function() {
    'use strict';

    require('babel-register')({
        presets: ['es2015', 'react'],
    });

    const Hapi = require('hapi');
    const routeFunctions = require('./routefunctions.js');
    const Path = require('path');
    const server = new Hapi.Server({
        connections: {
            routes: {
                files: {
                    relativeTo: Path.join(__dirname, '../public')
                }
            }
        }
    });

    server.connection({
        port: 3000
    });

    server.register([{
        register: require('inert')
    }, {
        register: require('vision')
    }]);

    server.views({
        engines: {
            jsx: require('hapi-react-views')
        },
        relativeTo: __dirname,
        path: 'views'
    });


    server.route([{
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '../public'
            }
        }
    }, {
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.file('index.html');
        }
    }, {
        method: 'GET',
        path: '/getasciilist',
        handler: (request, reply) => {
            routeFunctions.getasciilist(request, reply);
        }
    }, {
        method: 'POST',
        path: '/makeascii',
        handler: (request, reply) => {
            routeFunctions.makeascii(request, reply);
        }
    }]);


    server.on('response', (request) => {
        console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
    });


    server.start((err) => {
        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });
}