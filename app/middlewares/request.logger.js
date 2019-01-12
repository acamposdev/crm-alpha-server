module.exports = function(req, res, next) {
    logger.debug('');
    logger.debug(req.method + ': ' + req.path);
    logger.debug('----------------------------------------------');
    next();
}