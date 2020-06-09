/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {

    // tracking table
    pgm.createTable({schema:'search_service', name:'tracking'}, {
        id: 'id',
        user_id: 'id',
        type: 'text',
        keyword: 'text',
        query_method: 'text',
        query_text: 'text',
        query_result: 'text',
        link_type: 'text',
        link_pk: 'text',
        link_url: 'text',
        ip: 'text',
        platform: 'text',
        browser: 'text',
        browser_version: 'text',
        device_type: 'text',
        is_deleted: {type: 'boolean', default: false },
        created_by: 'text',
        created_at: {type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp') },
        updated_by: 'text',
        updated_at: {type: 'timestamptz'},
    }, {ifExists:true});
};

exports.down = (pgm) => {
    // drop table tracking
    pgm.dropTable('tracking', {ifExists:true});
};
