'use strict';

exports.makeascii = function (request, reply) {
  const figlet = require('figlet')
  figlet(request.payload.ascii, function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      console.log(data);
      reply(data);
});
}
