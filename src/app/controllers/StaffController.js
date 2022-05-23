const Staff = require('../models/Staff');
const { multipleMongooseToObject } = require('../../util/mongoose');

class StaffController {
    //[GET]  /staff
    index(req, res, next) {
        Staff.find({})
            .then((users) => {
                res.render('staff', {
                    users: multipleMongooseToObject(users),
                });
            })
            .catch(next);
    }

    //[POST] /limit
    limit(req, res) {
        res.send('limit');
    }
}

module.exports = new StaffController();
