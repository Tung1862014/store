const staffRoute = require('./staff');
const customerRoute = require('./customer');
const loginRoute = require('./login');
const homeRoute = require('./home');
const billRoute = require('./bill');
const productRoute = require('./product');
const supplierRoute = require('./supplier');

function route(app) {
    app.use('/supplier', supplierRoute);
    app.use('/staff', staffRoute);
    app.use('/customer', customerRoute);
    app.use('/bill', billRoute);
    app.use('/login', loginRoute);
    app.use('/product', productRoute);
    app.use('/', homeRoute);

    // app.get('/', function (req, res, next) {
    //     console.log('Request URL:')
    //     next()
    //   }, function (req, res, next) {
    //     console.log('Request Type')
    //     next()
    //   });
}

module.exports = route;
