var express = require('express');
var router = express.Router();

var form = require('../app/controllers/form.controller');
var customer = require('../app/controllers/customer.controller');

// Params autoload 
router.param('customerId', customer.load);

router.get('/customers/:customerId', form.load,
    function(req, res, next) {
        res
        .status(200)
        .send({
            form: req.form,
            customer: req.customer || {}
        });
    }
);

router.get('/customers',
    function(req, res, next) {
        res
        .status(200)
        .send(customers);
    }
);

module.exports = router;