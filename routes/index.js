'use strict';

/**
 * this is the main entrypoint for routes
 * intended to be the single autoload of routes
 */

const autoload = require('auto-load');
const allObj = autoload(__dirname + '/src');

module.exports = async function (fastify, opts, done) {

    Object.keys(allObj).forEach((key)=>{
        fastify.register(allObj[key]);
    });

    done();
};