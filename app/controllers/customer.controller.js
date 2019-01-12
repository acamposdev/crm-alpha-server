function CustomerController() {

    function load(req, res, next) {
        customers.forEach(customer => {
            if (customer.id == req.params.customerId) {
                req.customer = customer;
            }
        });
        next();
    }

    return {
        load
    }
}

module.exports = new CustomerController();