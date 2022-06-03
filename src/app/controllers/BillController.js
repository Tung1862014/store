const Bill = require('../models/Bill');
const Staff = require('../models/Staff');
const Customer = require('../models/Customer');
const Supplier = require('../models/Supplier');

// const dbConn = require('../../config/db');
// const Database = require('../../config/Database')
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

// let mydb = new Database(dbConn);

// const sql_selectAll_bill = 'SELECT * FROM hoadon';
// const sql_selectCount_bill = 'SELECT count(*) as counts FROM hoadon';
// const sql_selectCount_staff = 'SELECT count(*) as counts FROM hoadon';
// const sql_selectCount_customer = 'SELECT count(*) as counts FROM hoadon';
// const sql_selectCount_supplier = 'SELECT count(*) as counts FROM hoadon';

class BillController {
    //[GET]  /staff
    index(req, res, next) {
        Promise.all([
            Bill.find({}),
            Staff.countDocuments(),
            Customer.countDocuments(),
            Bill.countDocuments(),
            Supplier.countDocuments(),
            req.cookies.nameuser,
        ])
            .then(
                ([
                    bills,
                    countStaff,
                    countCustomer,
                    countBill,
                    countSupplier,
                    usecooki,
                ]) =>
                    res.render('home', {
                        countStaff,
                        countCustomer,
                        countBill,
                        countSupplier,
                        bills: multipleMongooseToObject(bills),
                        usecooki,
                    }),
            )
            .catch(next);
    }

    //[GET]  /
    // index(req, res, next) {
    //     Promise.all([ mydb.query(sql_selectAll_bill), mydb.query(sql_selectCount_staff),mydb.query(sql_selectCount_customer),mydb.query(sql_selectCount_bill),mydb.query(sql_selectCount_supplier)])
    //         .then(([ results,staffs, customers, bills, suppliers]) =>
    //             // res.json({numbers,results}),

    //             res.render('home', {
    //                 results,
    //                 staffs,
    //                 customers,
    //                 bills,
    //                 suppliers,
    //             })
    //         )
    // }
    //     index(req, res, next) {

    //         dbConn.query('SELECT * FROM hoadon',function (error, results, fields) {
    //             if (error) res.send ('error');
    //             else res.json(results);
    //         });

    // }
    // //[GET] /bill
    indexBill(req, res, next) {
        Promise.all([
            Bill.find({}),
            Bill.countDocumentsDeleted(),
            req.cookies.nameuser,
        ])
            .then(([bills, deleteBill, usecooki]) =>
                res.render('bill', {
                    deleteBill,
                    bills: multipleMongooseToObject(bills),
                    usecooki,
                }),
            )
            .catch(next);
    }

    // // // //[Get] /update
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
        //res.send(req.body);

        Bill.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/bill'))
            .catch(next);
    }

    // // [DELETE] /delete/save/:id
    delete(req, res, next) {
        //res.send(req.params.id)
        Bill.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // // [DELETE] /delete/save/:id/force
    forceDelete(req, res, next) {
        Bill.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[GET] /trash
    trashBill(req, res, next) {
        Promise.all([Bill.findDeleted(), req.cookies.nameuser])
            // res.send(deletedAt)
            .then(([bills, usecooki]) => {
                res.render('bills/trash', {
                    bills: multipleMongooseToObject(bills),
                    usecooki,
                });
            })
            .catch(next);
    }

    // //[PATCH] /supplier/:id/restore
    restore(req, res, next) {
        Bill.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // ////[POST] /handle-form-action
    handleFormActions(req, res, next) {
        // res.send(req.body.statusIds);
        switch (req.body.action) {
            case 'delete':
                Bill.delete({ _id: { $in: req.body.billIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'updates':
                // res.json({$on: req.body.status})
                Bill.updateOne(
                    { _id: { $in: req.body.billIds } },
                    { $status: req.body.status },
                )
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }

    // ////[POST] /handle-form-restore
    handleFormRestore(req, res, next) {
        switch (req.body.action) {
            case 'restore':
                Bill.restore({ _id: { $in: req.body.billIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Restore is invalid' });
        }
    }

    // [GET] /detail/:id
    detailBill(req, res, next) {
        Bill.findById(req.params.id)
            .then((bill) => {
                // res.json(bill)
                res.render('bills/detail', {
                    bill: mongooseToObject(bill),
                });
            })
            .catch(next);
    }
}

module.exports = new BillController();
