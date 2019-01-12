var app = require('../../app');
var service = require('../../service/case.service');

service.findByCustomerId(1).then((result) => {
    logger.info('Testing... ' + result.length);
    result.forEach((item) => {
        logger.info(JSON.stringify(item));
    });
});