const Staff = require('../models/Staff');
const { multipleMongooseToObject,  mongooseToObject } = require('../../util/mongoose');

class StaffController {
    //[GET]  /staff
    index(req, res, next) {
        //
        Staff.find({})
            .then((users) => {
                res.render('staff', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(next);
    }

    //[POST] /Insert
    update(req, res,next) {
        Staff.find({})
            .then((users) => {
                res.render('staffs/update', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(next);

        // res.send(req.params.slug);
        // Staff.findOne({slug: req.params.slug})
        //     .then(user => {
        //         res.render('staffs/update',{
        //             user:  mongooseToObject(user)
        //         })
        //     })
        //     .catch(next);
            // .finally((users) => {
            //     res.render('staffs/update', {
            //         users: multipleMongooseToObject(users),
            //     });
            // });
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
        //

        const formData = req.body;
       const user = new Staff(formData);
       user.save()
       .then(() => res.redirect('/staff'))
       .catch(error =>{

       })
}
}

module.exports = new StaffController();
