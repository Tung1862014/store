const express = require('express');
const router = express.Router();

const staffController = require('../app/controllers/StaffController');

router.get('/:slug', staffController.limit);

router.get('/', staffController.index);

module.exports = router;
