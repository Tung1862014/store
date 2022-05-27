const Supplier = require('../models/Supplier');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class SupplierController {
    //[GET]  /staff
    index(req, res, next) {
        //
        Supplier.find()
        // res.send(deletedAt)
            .then((suppliers) => {
                res.render('supplier', {
                    suppliers: multipleMongooseToObject(suppliers),
                });
            })
            .catch(next);
    }

    // //[Get] /update
    edit(req, res, next) {
        //res.send(req.params.id);
        Supplier.findById(req.params.id)
            .then((supplier) => {
                res.render('suppliers/update', {
                    supplier: mongooseToObject(supplier),
                });
            })
            .catch(next);
        
     }
    // //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)

        Supplier.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/supplier'))
            .catch(next);
        
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
        //
        // res.send('insert sss')
        const formData = req.body;
        const supplier = new Supplier(formData);
        supplier.save()
            .then(() => res.redirect('/supplier'))
            .catch((error) => {});
    }

    // [DELETE] /delete/save/:id
    delete(req, res, next) {
        //res.send(req.params.id)
        Supplier.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /delete/save/:id/force
    forceDelete(req, res, next){
        Supplier.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[GET] /trash
    trashSupplier(req, res, next){
        Supplier.findDeleted()
        // res.send(deletedAt)
            .then((suppliers) => {
                res.render('suppliers/trash', {
                    suppliers: multipleMongooseToObject(suppliers),
                });
            })
            .catch(next);
    }

    //[PATCH] /supplier/:id/restore
    restore(req, res, next){
        Supplier.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new SupplierController();
