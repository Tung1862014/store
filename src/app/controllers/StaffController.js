const Staff = require('../models/Staff');
const {
    multipleMongooseToObject,
    mongooseToObject,
} = require('../../util/mongoose');

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

    //[Get] /update
    edit(req, res, next) {
        // res.send(req.params.slug);
        Staff.findById(req.params.id)
            .then((user) => {
                res.render('staffs/update', {
                    user: mongooseToObject(user),
                });
            })
            .catch(next);
        
    }
    //[PUT] /update/save
    update(req, res, next) {
        // res.json(req.body)

        Staff.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/staff'))
            .catch(next);
        
    }

    //[POST]  /staffs/insert
    inserts(req, res, next) {
        //

        const formData = req.body;
        const user = new Staff(formData);
        user.save()
            .then(() => res.redirect('/staff'))
            .catch((error) => {});
    }
     // [DELETE] /delete/save/:id
     delete(req, res, next){
        Staff.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new StaffController();
