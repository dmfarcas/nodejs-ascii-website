'use strict';

exports.makeascii = (request, reply) => {
    const figlet = require('figlet')
    figlet(request.payload.ascii, request.payload.font, (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        reply(
            data
        );
    });
}

exports.getasciilist = (request, reply) => {
    const fs = require("fs");
    fs.readdir("./node_modules/figlet/fonts", (err, data) => {
        reply(
            data
        );
    });
}
