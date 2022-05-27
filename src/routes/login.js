const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/LoginController');
// router.post('/insert', staffController.inserts);

// router.put('/update/save/:id', staffController.update);

// router.get('/update/:id', staffController.edit);

router.get('/', loginController.index);

module.exports = router;
