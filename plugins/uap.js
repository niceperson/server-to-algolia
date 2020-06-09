'use strict'

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const fp = require('fastify-plugin');
const expressUseragent = require('express-useragent');

module.exports = fp(async function (fastify, opts) {

    async function uaParser(query, header) {

        const userAgent = await expressUseragent.parse(header['user-agent']);
        const userAgentTrimmed = {
            browser: userAgent.browser,
            version: userAgent.version,
            os: userAgent.os,
            platform: userAgent.platform,
            geoIp: userAgent.geoIp,
            source: userAgent.source,
            isMobile: userAgent.isMobile,
            isTablet: userAgent.isTablet,
            isiPad: userAgent.isiPad,
            isiPod: userAgent.isiPod,
            isiPhone: userAgent.isiPhone,
            isAndroid: userAgent.isAndroid,
        }
        const user_id = await getUserIdFromHertoken(header);
        let tracking = {
            type: 'input',
            query_method: 'algolia',
            user_id: user_id,
        };
        Object.assign(tracking, query)
        Object.assign(tracking, header);
        Object.assign(tracking, userAgentTrimmed);

        // do come cleanup
        delete tracking.hertoken;

        return tracking;
    }

    fastify.decorate('uaParser', uaParser);
});


async function getUserIdFromHertoken(header) {
    let user_id = 0;

    if (header.hasOwnProperty('hertoken')) {
        let buffer = Buffer.from(header.hertoken.split('.')[0], 'Base64');
        let jsonToken = JSON.parse(buffer);
        user_id = jsonToken.id;
    }

    return user_id;
}

