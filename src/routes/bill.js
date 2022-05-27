const express = require('express');
const router = express.Router();

const billController = require('../app/controllers/BillController');
// const staffController = require('../app/controllers/StaffController');
// router.post('/insert', staffController.inserts);

router.put('/update/save/:id', billController.update);

router.delete('/delete/save/:id', billController.delete);

router.patch('/:id/restore', billController.restore);

router.delete('/delete/save/:id/force', billController.forceDelete);

router.get('/trash', billController.trashBill);

// router.get('/update/:id', staffController.edit);

router.get('/', billController.indexBill );

module.exports = router;
