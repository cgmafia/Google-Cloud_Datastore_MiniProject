const express = require('express');
const { handleGetCustomers, handleAddCustomer, handleDeleteCustomer } = require('../controllers/customerController');

const router = express.Router();

router.get('/:id?', handleGetCustomers);
router.post('/', handleAddCustomer);
router.delete('/:id', handleDeleteCustomer);

module.exports = router;
