'use strict'

async function parseAlgoliaResult(result) {
    const output = [];

    let myType;
    let myTitle;

    result.forEach((obj) => {
        switch(obj.index) {
            case 'product_index':
                myType = 'mall';
                myTitle = 'Product';
            break;
            case 'brand_index':
                myType = 'brand';
                myTitle = 'Brand';
            break;
            case 'flagship_index':
                myType = 'flagship';
                myTitle = 'Official Flagship';
            break;
        }

        if (obj.hits.length) {
            output.push({
                type: myType,
                title: myTitle,
                items: obj.hits,
            })
        }
    });

    return output;
}

module.exports = async function (fastify, opts) {
    fastify.route({
        method: 'POST',
        url:fastify.config.server.base+'/suggestion',
        handler: async function (request, reply) {
            const { algolia, uaParser, httpErrors } = fastify;
            const { keyword } = request.body;

            if (!keyword) {
                throw httpErrors.badRequest('Keyword Not Defined');
            }

            // define queries
            const queries = [
                {
                    indexName: 'flagship_index',
                    query: keyword,
                    params: {
                        hitsPerPage: 10
                    }
                },
                {
                    indexName: 'brand_index',
                    query: keyword,
                    params: {
                        hitsPerPage: 10
                    }
                },
                {
                    indexName: 'product_index',
                    query: keyword,
                    params: {
                        hitsPerPage: 25
                    }
                },
            ];

            try {
                const algoliaXForwardedFor = request.headers['x-real-ip'] || request.headers.host;
                const algoliaUserToken = request.headers.hertoken || request.headers['x-hermo-session-id'] || algoliaXForwardedFor;
                algolia.setExtraHeader('X-Algolia-UserToken', algoliaUserToken);
                algolia.setExtraHeader('X-Forwarded-For', algoliaXForwardedFor);
                const searchReq = await algolia.search(queries);

                if (searchReq.results) {
                    const output = await parseAlgoliaResult(searchReq.results);

                    if (output.length === 0) {
                        throw httpErrors.notFound('No Results Found');
                    }
                    return output;
                }
            } catch (e) {
                console.log(e);
                return e;
            }
        }

    });

}
