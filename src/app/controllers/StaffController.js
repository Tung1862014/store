const Staff = require('../models/Staff');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

class StaffController {
    //[GET]  /staff
    index(req, res, next) {
        //
        Promise.all([Staff.find({}), req.cookies.nameuser])

            .then(([users, usecooki]) => {
                res.render('staff', {
                    users: multipleMongooseToObject(users),
                    usecooki,
                });
            })
            .catch(next);
    }

    //[Get] /update

    edit(req, res, next) {
        Promise.all([Staff.findById(req.params.id), req.cookies.nameuser])

            .then(([user, usecooki]) => {
                res.render('staffs/update', {
                    user: mongooseToObject(user),
                    usecooki,
                });
            })
            .catch(next);
    }

    //[PUT] /update/save
    update(req, res, next) {
        Staff.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/staff'))
            .catch(next);
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
        // res.send(req.body);
        const formData = req.body;
        const user = new Staff(formData);
        user.save()
            .then(() => res.redirect('/staff'))
            .catch((error) => {
                res.send('loooooooo');
            });
    }
    // [DELETE] /delete/save/:id
    delete(req, res, next) {
        Staff.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new StaffController();
