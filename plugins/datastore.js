'use strict'

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope
const fp = require('fastify-plugin');
const { Datastore } = require('@google-cloud/datastore');

module.exports = fp(async function (fastify, opts) {

    // Creates a client
    const datastore = new Datastore();

    const doList = async (task, order) => {
        const query = datastore.createQuery(task).order(order);
        return await datastore.runQuery(query);
    }

    const doInsert = async (task, data, sync) => {
        const tosync = sync || false
        const entity = {
            key: datastore.key(task),
            data: data
        }
        if(tosync) {
            return await datastore.save(entity);
        } else {
            datastore.save(entity);
        }
    }

    const doUpdate = async (task, taskId, data) => {

        if(data.length == 0) {
            return false;
        }

        const transaction = datastore.transaction();
        const taskKey = datastore.key([task,Number(taskId)]);
        fastify.log.info(taskKey);
        fastify.log.info(taskKey.path);

        try {
            await transaction.run();
            const [task] = await transaction.get(taskKey);

            Object.keys(data).forEach(key => {
                task[key] = data[key];
            });

            transaction.save({
                key: taskKey,
                data: task,
            });

            return await transaction.commit();
        } catch (e) {
            transaction.rollback();
            throw e;
        }
    }

    const doDelete = async (task, taskId) => {
        const key = datastore.key([task,Number(taskId)]);
        return await datastore.delete(taskKey);
    }

    const dataStoreHelper = {
        core: datastore,
        list: doList,
        insert: doInsert,
        update: doUpdate,
        delete: doDelete,
    };


    fastify.decorate('datastore', dataStoreHelper);
});