function CaseController() {
    let caseService = require('../service/case.service');    

    function getCasesByCustomerId(req, res, next) {
        const {
            customerId
        } = req.query;

        logger.debug('(CaseController) - all [customerId=' + customerId + ']');
        
        caseService.findByCustomerId(customerId).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function loadCaseById(req, res, next) {
        const {
            caseId
        } = req.params;

        logger.debug('(CaseController) - load, caseId=' , caseId);
        
        caseService.get(caseId).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function save(req, res, next) {
        logger.debug('(CaseController) - save, params: ' , req.body);

        if (!req.body.customerId) {
            return processResponse({
                        status: 400,
                        message: 'Es obligatorio el parametro customerId'
                    }, res);
        }

        caseService.saveOrUpdate(req.body).then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    function search(req, res) {
        logger.debug('(CaseController) - search, params: ' , req.query);

        const {
            ref,
            opendatefrom,
            opendateto,
            lastmodificationdatefrom,
            lastmodificationdateto,
            finalizationdatefrom,
            finalizationdateto,
            customerId
        } = req.query;

        caseService.search(ref, opendatefrom, opendateto, lastmodificationdatefrom, lastmodificationdateto, finalizationdatefrom, finalizationdateto, customerId)
        .then((result) => {
            processResponse(null, res, result);
        }).catch((err) => {
            processResponse(err, res);
        });
    }

    let processResponse = function(err, res, model) {
        if (err) {
            logger.error('(CaseController) - processResponse, ERROR: ' + JSON.stringify(err));
            return res
                    .status(err.status || 500)
                    .send(err);
        }

        logger.debug('(CaseController) - processResponse... OK');
        return res
                .status(200)
                .send(model);
    }

    return {
        getCasesByCustomerId,
        loadCaseById,
        search,
        save
    }
}

module.exports = new CaseController();