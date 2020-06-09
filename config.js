'use strict';

require('make-promises-safe');
require('dotenv').config();


const cote_env = process.env.COTE_ENV;
const node_env = process.env.NODE_ENV;
const api_base = process.env.API_BASE;
const api_host = process.env.API_HOST;
const api_port = process.env.API_PORT;
const redis_host = process.env.REDIS_HOST;
const redis_port = process.env.REDIS_PORT;
const algolia_appid = process.env.ALGOLIA_APPLICATION_ID;
const algolia_search = process.env.ALGOLIA_SEARCH_KEY;
const algolia_admin = process.env.ALGOLIA_ADMIN_KEY;


const config = {
    server: {
        base: api_base,
        host: api_host,
        port: api_port,
    },
    fastify: {
        trustProxy: true,
        logger: {
            level: (node_env == 'production') ? 'error' : 'debug',
            prettyPrint: (node_env == 'production') ? false : true,
        },
	    pluginTimeout: 10000,
        ignoreTrailingSlash: true,
    },
    algolia: {
        appid: algolia_appid,
        search: algolia_search,
        admin: algolia_admin,
    },
    postgres: {},
    mysql: {},
};


module.exports = config;
