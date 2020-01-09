/* Require shared configuration variables, eg. our Google Project ID */
var config = require('./config');

/* Require "customer" service for querying, creating, and deleting customer */
var customer = require('./customer')(config);

/* Require "auth" service for authenticating users and getting profile info */
var auth = require('./auth')(config);

/* Require Express web framework and Express middleware */
var express = require('express');
var multer = require('multer')
var session = require('cookie-session');

/* Configure Express web application */
var app = express();
app.use(express.static('public'));
app.set('view engine', 'jade');
app.enable('trust proxy');
app.use(multer({
    inMemory: true
}));
app.use(session({
    signed: true,
    secret: config.cookieSecret
}));

/* Fetch all customer and display them */
app.get('/', function(req, res, next) {
    customer.getCustomers(function(err, customer, key) {
        if (err) return next(err);
        var keycustomer = customer.map((customer) => Object.assign(customer, {
            id: customer.id || customer[key].id
        }));
        res.render('index', {
            customer: keycustomer,
            //user: req.session.user
        });
    });
});


/* Fetch all customer by filters & display them */
app.get('/', function(req, res, next) {
    customer.getUserCustomers(function(err, customer, key) {
        if (err) return next(err);
        var keycustomer = customer.map((customer) => Object.assign(customer, {
            id: customer.id || customer[key].id
        }));
        res.render('index', {
            customer: keycustomer,
            user: req.session.user
        });
    });
});


/* Add a new customer */
app.post('/customer', function(req, res, next) {
    if (!req.customer.name || !req.customer.email)
        return next(new Error('Must provide customer name and email'));
    customer.addcustomer(req.customer.name, req.customer.email, req.customer.age, userId, function(err) {
        if (err) return next(err);
        res.redirect(req.get('Referer') || '/');
    })
});

/* Delete customer by key */
app.get('/customer/delete', function(req, res, next) {
    customer.deletecustomer(req.query.id, function(err) {
        if (err) return next(err);
        res.redirect('/');
    });
});

app.get('/_ah/health', function(req, res) {
    res.type('text').send('ok');
});

/* Run web application */
app.listen(8080);

console.log('Running on http://localhost:8080/');