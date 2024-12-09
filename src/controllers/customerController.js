const { addCustomer, getCustomers, deleteCustomer } = require('../models/customerModel');

async function handleGetCustomers(req, res) {
    try {
        const id = req.params.id || null;
        const customers = await getCustomers(id);
        if (id && !customers) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleAddCustomer(req, res) {
    try {
        const { id, name, email, age } = req.body;
        const newCustomer = await addCustomer(id, name, email, age);
        res.status(201).json(newCustomer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function handleDeleteCustomer(req, res) {
    try {
        const id = req.params.id;
        const message = await deleteCustomer(id);
        res.json({ message });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { handleGetCustomers, handleAddCustomer, handleDeleteCustomer };
