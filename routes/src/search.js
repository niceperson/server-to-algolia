'use strict'

module.exports = async function (fastify, opts) {
    fastify.route({
    	method: 'GET',
    	url:fastify.config.server.base,
    	handler: async function (request, reply) {
	        const { algolia } = fastify;
	        const  q = request.query.keyword;
	        const queries = [
	            // {
	            //     indexName: 'flagship_index',
	            //     query: q,
	            //     params: {
	            //         hitsPerPage: 50
	            //     }
	            // },
	            // {
	            //     indexName: 'brand_index',
	            //     query: q,
	            //     params: {
	            //         hitsPerPage: 50
	            //     }
	            // },
	            {
	                indexName: 'product_index',
	                query: q,
	                params: {
	                    hitsPerPage: 100
	                }
	            },
	        ];

	        try {
	            const request = await algolia.search(queries);
	            return request;
	        } catch (e) {
	            console.log(e);
	            return 'error';
	        }
        }
    });
};


