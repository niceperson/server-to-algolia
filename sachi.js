'use strict'

// Load app config
const Config = require('./config');

// Require the framework
const Fastify = require('fastify');

// Init App instance
const Api = {
    Config: Config,
    Fastify: Fastify(Config.fastify),
    Start: async () => {
        try {
            // // Load config
            // await Api.Fastify.decorate('config', Config);
            // // Register come fastify plugin.
            await Api.Fastify.register(require('fastify-blipp'));
            // Register application as a normal plugin.
            await Api.Fastify.register(require('./app.js'), {Config});
            // Start listening.
            await Api.Fastify.listen(Config.server.port, Config.server.host);
            // Endpoints at a glance
            await Api.Fastify.blipp();
        } catch (err) {
            Api.Fastify.log.error(err);
            process.exit(1);
        }
    }
};

// Launch API
Api.Start();