const staffRoute = require('./staff');
const customerRoute = require('./customer');

function route(app) {
    app.use('/staff', staffRoute);
    app.use('/customer', customerRoute);

    app.get('/', (req, res) => {
        res.render('home');
    });
}

module.exports = route;
