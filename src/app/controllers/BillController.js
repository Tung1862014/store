const Bill = require('../models/Bill');
const Staff = require('../models/Staff');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class BillController {
    //[GET]  /staff
    index1(req, res, next) {
        //
        Bill.find({})
            .then((bills) => {
                res.render('home', {
                    bills: multipleMongooseToObject(bills),
                })
            })
            next()
    }
    index2(req, res, next) {
        Staff.find({})
            .then((users) => {
                res.render('home', {
                    users: multipleMongooseToObject(users),
                })
                
            })
            next()
    }
    indexBill(req, res, next) {
        //
        Bill.find({})
            .then((bills) => {
                res.render('bill', {
                    bills: multipleMongooseToObject(bills),
                });
            })
            .catch(next);
    }

    // //[Get] /update
    // edit(req, res, next) {
    //     // res.send(req.params.slug);
    //     Staff.findById(req.params.id)
    //         .then((user) => {
    //             res.render('staffs/update', {
    //                 user: mongooseToObject(user),
    //             });
    //         })
    //         .catch(next);
        
    // }
    // //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)

        Bill.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/bill'))
            .catch(next);
        
    }

    // [DELETE] /delete/save/:id
    delete(req, res, next) {
        //res.send(req.params.id)
        Bill.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /delete/save/:id/force
    forceDelete(req, res, next){
        Bill.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[GET] /trash
    trashBill(req, res, next){
        Bill.findDeleted()
        // res.send(deletedAt)
            .then((bills) => {
                res.render('bills/trash', {
                    bills: multipleMongooseToObject(bills),
                });
            })
            .catch(next);
    }

    //[PATCH] /supplier/:id/restore
    restore(req, res, next){
        Bill.restore({_id: req.params.id})
        .then(() => res.redirect('back'))
        .catch(next);
    }
}

module.exports = new BillController();
