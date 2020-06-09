'use strict'

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const fp = require('fastify-plugin');
const algoliasearch = require('algoliasearch');

module.exports = fp(async function (fastify, opts) {

    const client = algoliasearch(fastify.config.algolia.appid, fastify.config.algolia.admin);

    fastify.decorate('algolia', client);
});
