class CustomerController {
    //[GET]  /staff
    index(req, res) {
        res.render('customer');
    }
}

module.exports = new CustomerController();
