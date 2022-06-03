const Customer = require('../models/Customer');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');
class CustomerController {
    //[GET]  /customer
    index(req, res, next) {
        //
        Promise.all([Customer.find({}), req.cookies.nameuser])
            .then(([customers, usecooki]) => {
                res.render('customer', {
                    customers: multipleMongooseToObject(customers),
                    usecooki,
                });
            })
            .catch(next);
    }
    //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)
        // res.json(req.params.id);
        Customer.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/customer'))
            .catch(next);
    }
}

module.exports = new CustomerController();
