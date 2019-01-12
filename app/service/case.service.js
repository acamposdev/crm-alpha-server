var models = require('../libs/sequelize');
const Op = models.Sequelize.Op;

/**
 * @class
 * 
 * Service for Cases
 */
function CaseService() {

    /**
     * Method for Case creation
     * @param {Case} entity Case object
     */
    function create(entity) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (CaseService) - create ' , entity);
            models.Case.create(entity).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for Case update
     * @param {Case} entity Case object
     */
    function saveOrUpdate(entity) {
        return new Promise(function(resolve, reject) {
            if (entity.id) {
                entity.lastmodificationdate = new Date().getTime();
                logger.debug('  (CaseService) - saveOrUpdate... updating ' , entity);
                models.Case.findOne( { where: { id: entity.id } } ).then((obj) => {
                    obj.update(entity).then(function(result) {
                        resolve(result);
                    }).catch(function(err) {
                        logger.error(err);
                        reject(err);
                    });
                }).catch((err) => {
                    logger.error(err);
                    reject(err);
                });
                
            } else {
                entity.opendate = new Date().getTime();
                logger.debug('  (CaseService) - saveOrUpdate... save ' , entity);
                models.Case.create(entity).then(function(result) {
                    resolve(result);
                }).catch(function(err) {
                    logger.error(err);
                    reject(err);
                });
            }
        });
    }

    /**
     * Method for get Case by id
     * @param {Case} pk 
     */
    function get(pk) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (CaseService) - get ' + pk);
            models.Case.findOne( { where: { id: pk }} ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for get all Cases by customerId
     * @param {Case} pk 
     */
    function findByCustomerId(customerId) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (CaseService) - findByCustomerId ' , customerId);
            models.Case.findAll( { 
                where: { 
                    customerId: customerId 
                },
                order: [
                    ['opendate', 'DESC']
                ]
            } ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for get all Cases by criteria (where)
     * @param {JSON} criteria 
     */
    function findByCriteria(criteria) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (CaseService) - findByCriteria ' , criteria);
            models.Case.findAll( { where: criteria } ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for search in contacts table
     * @param {string} ref reference number of case
     * @param {number} opendatefrom date in millis
     * @param {number} opendateto date un millis
     * @param {number} lastmodificationdatefrom date in millis
     * @param {number} lastmodificationdateto date in millis 
     * @param {number} finalizationdatefrom date in millis 
     * @param {number} finalizationdateto date in millis 
     * @param {number} customerId customer id (pk)
     */
    function search(ref, opendatefrom, opendateto, lastmodificationdatefrom, lastmodificationdateto, finalizationdatefrom, finalizationdateto, customerId) {
        let criteria = {};

        // customerId
        if (customerId) {
            criteria.customerId = customerId
        }

        // ref criteria
        if (ref) {
            criteria.ref = {
                [Op.like]: '%' + ref + '%'
            }
        }

        // opendate criteria
        if (opendatefrom && opendateto) {
            criteria.opendate = {
                    [Op.between]: [new Date(+opendatefrom), new Date(+opendateto)]
            }
        }
        
        // lastmodificationdate criteria
        if (lastmodificationdatefrom && lastmodificationdateto) {
            criteria.lastmodificationdate = {
                [Op.or]: {
                    [Op.between]: [new Date(+lastmodificationdatefrom), new Date(+lastmodificationdateto)],
                    [Op.eq]: null
                }
            }
        }

        // finalizationdate criteria
        if (finalizationdatefrom && finalizationdateto) {
            criteria.finalizationdate = {
                [Op.or]: {
                    [Op.between]: [new Date(+finalizationdatefrom), new Date(+finalizationdateto)],
                    [Op.eq]: null
                }
            }
        }

        return new Promise(function(resolve, reject) {
            logger.debug('  (CaseService) - search ' + JSON.stringify(criteria));
            models.Case.findAll( { where: criteria } ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    return { 
        create,
        saveOrUpdate,
        get,
        findByCustomerId,
        findByCriteria,
        search
    }
}

module.exports = new CaseService();