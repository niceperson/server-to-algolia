'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {

    // decorate config
    fastify.decorate('config', opts.Config);

    // registering fastify plugin
    fastify.register(require('fastify-sensible')).after(()=>{
        fastify.setErrorHandler(function (error, request, reply) {
            const hermo = {
                messages: [{
                    type: 'error',
                    text: error.message,
                }],
                status: reply.res.statusCode,
                success: 'false'
            };
            reply.send(hermo);
        });
    });
    fastify.register(require('fastify-multipart'),{addToBody: true,});
    fastify.register(require('fastify-formbody'));
    fastify.register(require('fastify-cors'),{origin:true});

    // registering routes
    fastify.register(require('./routes'));
    fastify.register(require('./routes'),{prefix:'/app'});


    //----------------------------------------------------------------| restricted area below


    // This loads all plugins defined in plugins (our-plugins)
    // those should be support plugins that are reused
    // through your application
    fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: Object.assign({}, opts)
    });


    // Make sure to call next when done
    next();
}
