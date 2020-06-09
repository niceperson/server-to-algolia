'use strict'

module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'GET',
        url:fastify.config.server.base + '/health',
        handler: async function (request, reply) {
            return `i'm good`;
        }
    });
};
