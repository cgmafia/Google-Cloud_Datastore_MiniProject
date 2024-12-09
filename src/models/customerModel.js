const { Datastore } = require('@google-cloud/datastore');
const config = require('../config/config');

const datastore = new Datastore({ projectId: config.datastore.projectId });

const CUSTOMER_KIND = 'Customer';

async function addCustomer(id, name, email, age) {
    const customerKey = datastore.key([CUSTOMER_KIND, id]);
    const entity = {
        key: customerKey,
        data: { name, email, age }
    };
    await datastore.save(entity);
    return { id, ...entity.data };
}

async function getCustomers(id = null) {
    const query = datastore.createQuery(CUSTOMER_KIND);
    if (id) {
        const customerKey = datastore.key([CUSTOMER_KIND, id]);
        const [customer] = await datastore.get(customerKey);
        return customer || null;
    }
    const [customers] = await datastore.runQuery(query);
    return customers;
}

async function deleteCustomer(id) {
    const customerKey = datastore.key([CUSTOMER_KIND, id]);
    await datastore.delete(customerKey);
    return `Customer ${id} deleted successfully.`;
}

module.exports = { addCustomer, getCustomers, deleteCustomer };
