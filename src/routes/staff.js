const express = require('express');
const router = express.Router();

const staffController = require('../app/controllers/StaffController');
router.post('/insert', staffController.inserts);

router.put('/update/save/:id', staffController.update);

router.delete('/delete/save/:id', staffController.delete);

router.get('/update/:id', staffController.edit);

router.get('/', staffController.index);

module.exports = router;
