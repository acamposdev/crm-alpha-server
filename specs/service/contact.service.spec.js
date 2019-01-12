var app = require('../../app');
var service = require('../../service/contact.service');

service.findByCustomerId(1).then((result) => {
    logger.info('Testing... ' + result.length);
    result.forEach((item) => {
        logger.info(JSON.stringify(item));
    });
});

service.findByCriteria({
    customerId: 1,
    caseId: 1
}).then((result) => {
    logger.info('Testing... ' + result.length);
    result.forEach((item) => {
        logger.info(JSON.stringify(item));
    });
});