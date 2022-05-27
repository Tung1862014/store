const express = require('express');
const router = express.Router();

const staffController = require('../app/controllers/StaffController');
router.post('/insert', staffController.inserts);

router.get('/update/:slug', staffController.update);

router.get('/', staffController.index);

module.exports = router;
