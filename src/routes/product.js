const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');
router.post('/insert', productController.inserts);

router.put('/update/save/:id', productController.update);

router.delete('/delete/save/:id', productController.delete);

router.get('/update/:id', productController.edit);

router.get('/', productController.index);

module.exports = router;
