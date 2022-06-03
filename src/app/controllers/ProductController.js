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
        Promise.all([Product.find({}), req.cookies.nameuser])
            .then(([products, usecooki]) => {
                
                res.render('product', {
                    products: multipleMongooseToObject(products),
                    usecooki,
                });
            })
            .catch(next);
    }

    // //[Get] /update
    edit(req, res, next) {
        // res.send(req.params.slug);
        Promise.all([Product.findById(req.params.id), req.cookies.nameuser])
            .then(([product, usecooki]) => {
                res.render('products/update', {
                    product: mongooseToObject(product),
                    usecooki,
                });
            })
            .catch(next);
    }
    // //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)

        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/product'))
            .catch(next);
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
    //    var arrayToString = JSON.stringify(Object.assign({}, req.files));  // convert array to string
    //     var stringToJsonObject = JSON.parse(arrayToString);
        //
        //res.send(stringToJsonObject[0].path);
        // res.send('insert sss')

       
        const formData = req.body;
        const product = new Product(formData);
        if(req.files){
            let paths ='';
            
            const arr =  req.files;
            arr.forEach(function(e, index, arr){
               paths = paths + e.path +',';
            })
            paths = paths.substring(0, paths.lastIndexOf(','));
            product.image = paths;
        }
        product
            .save()
            .then(() => res.redirect('/product'))
            .catch((error) => {});
    }

    // [DELETE] /delete/save/:id
    delete(req, res, next) {
        //res.send(req.params.id)
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new ProductController();
