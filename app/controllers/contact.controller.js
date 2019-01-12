function ContactController() {
    let contactService = require('../service/contact.service');    

    function getContactsByCustomerId(req, res) {
        const {
            customerId
        } = req.query
        logger.debug('(ContactController) - getContactsByCustomerId, customerId=' , customerId);
        contactService.findByCustomerId(customerId).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function save(req, res) {
        logger.debug('(ContactController) - save, params: ' , req.body);

        if (!req.body.customerId) {
            return processResponse({
                        status: 400,
                        message: 'Es obligatorio el parametro customerId'
                    }, res);
        }

        contactService.create(req.body).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function loadContactById(req, res) {
        logger.debug('(ContactController) - loadContactById, params: ' , req.params);
        contactService.get(req.params.contactId).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function loadByCase(req, res) {
        logger.debug('(ContactController) - loadByCase, params: ' , req.cases.id);
        contactService.findByCriteria({ 
            caseId: req.cases.id
         }).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function search(req, res) {
        logger.debug('(ContactController) - search, params: ' , req.query);

        const {
            datefrom,
            dateto,
            channel,
            type,
        } = req.query;

        contactService.search(datefrom, dateto, channel, type)
        .then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }


    let processResponse = function(err, res, model) {
        if (err) {
            logger.error('(ContactController) - processResponse, ERROR: ' + JSON.stringify(err));
            return res
                    .status(err.status || 500)
                    .send(err);
        }

        logger.debug('(ContactController) - processResponse... OK');
        return res
                .status(200)
                .send(model);
    }


    return {
        getContactsByCustomerId,
        loadContactById,
        loadByCase,
        save,
        search
    }
}

module.exports = new ContactController();