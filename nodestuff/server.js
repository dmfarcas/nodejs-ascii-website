

module.exports = function () {
  'use strict';

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

  server.connection({ port: 3000 });
  server.register(require('inert'));


  server.route([{
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('index.html');
    }
  },
  {
      method: 'GET',
      path: '/{param*}',
      handler: {
          directory: {
              path: '../public'
          }
      }
  },
  {
      method: 'POST',
      path: '/makeascii',
      handler: function (request, reply) {
        routeFunctions.makeascii(request, reply);
    }
  }]);


  server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
  });


  server.start((err) => {
      if (err) {
          throw err;
      }
      console.log('Server running at:', server.info.uri);
  });
}
