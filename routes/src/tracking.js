'use strict'

module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url:fastify.config.server.base + '/tracking',
        handler: async function (request, reply) {

            const { body, headers } = request;
            const { uaParser, datastore } = fastify;

            const query = body.query;
            if (query.keyword === null) {
                query.keyword = body.keyword || null;
            }

            try {
                const tracking = await uaParser(query, headers);
                datastore.insert('SearchTracking', tracking);
                return tracking;
            } catch (e) {
                return e;
            }
        }
    });
};