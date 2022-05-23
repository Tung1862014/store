const express = require('express');
const router = express.Router();

const customerController = require('../app/controllers/CustomerController');

router.get('/', customerController.index);

module.exports = router;
