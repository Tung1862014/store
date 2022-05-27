const Product = require('../models/Product');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class ProductController {
    //[GET]  /staff
    index(req, res, next) {
        //
        // res.send('Product  !!!!');
        Product.find({})
            .then((products) => {
                res.render('product', {
                    products: multipleMongooseToObject(products),
                });
            })
            .catch(next);
    }

    // //[Get] /update
    edit(req, res, next) {
        // res.send(req.params.slug);
        Product.findById(req.params.id)
            .then((product) => {
                res.render('products/update', {
                    product: mongooseToObject(product),
                });
            })
            .catch(next);
        
    }
    // //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)

        Product.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/product'))
            .catch(next);
        
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
        //
        // res.send('insert sss')
        const formData = req.body;
        const product = new Product(formData);
        product.save()
            .then(() => res.redirect('/product'))
            .catch((error) => {});
    }

    // [DELETE] /delete/save/:id
    delete(req, res, next) {
        //res.send(req.params.id)
        Product.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ProductController();
