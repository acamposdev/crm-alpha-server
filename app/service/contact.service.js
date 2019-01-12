var models = require('../libs/sequelize');
const Op = models.Sequelize.Op;

/**
 * @class
 * 
 * Service for Contact
 */
function ContactService() {

    /**
     * Method for Contact creation
     * @param {Contact} entity Contact object
     */
    function create(entity) {
        entity.date = new Date().getTime();
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - create ' , entity);
            models.Contact.create(entity).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for Contact update
     * @param {Contact} entity Contact object
     */
    function update(entity) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - update ' , entity);
            models.Contact.upsert(entity).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for get Contact by id
     * @param {Contact} pk 
     */
    function get(pk) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - get ' , pk);
            models.Contact.findOne( { where: { id: pk }} ).then(function(result) {
                resolve(result || {});
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for get all Contacts by customerId
     * @param {number} pk Customer id (px)
     */
    function findByCustomerId(customerId) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - findByCustomerId ' , customerId);
            models.Contact.findAll( 
                { 
                    where: { 
                        customerId: customerId 
                    }, 
                    order: [
                        ['date', 'DESC']
                    ]
                })
                .then(function(result) {
                    resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }


    /**
     * Method for get all Contacts by customerId
     * @param {number} pk Contact id (pk)
     */
    function findByCaseId(caseId) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - findByCaseId ' , caseId);
            models.Contact.findAll( { 
                where: { 
                    caseId: caseId 
                },
                order: [
                    ['date', 'DESC']
                ]
            })
            .then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * Method for get all Contacts by criteria (where)
     * @param {JSON} criteria 
     */
    function findByCriteria(criteria) {
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - findByCriteria ' , criteria);
            models.Contact.findAll( { where: criteria } ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    /**
     * 
     * @param {Date} datefrom date of creation
     * @param {Date} dateto date of creation
     * @param {string} channel channel of message
     * @param {string} type type of message (incoming/outgoing)
     */
    function search(datefrom, dateto, channel, type) {
        let criteria = {};

        // channel
        if (channel) {
            criteria.channel = channel
        }

        // type criteria
        if (type) {
            criteria.type = {
                [Op.eq]: type
            }
        }

        // datefrom criteria
        if (datefrom && dateto) {
            criteria.date = {
                    [Op.between]: [new Date(+datefrom), new Date(+dateto)]
            }
        }
        
        return new Promise(function(resolve, reject) {
            logger.debug('  (ContactService) - search ' + JSON.stringify(criteria));
            models.Contact.findAll( { where: criteria } ).then(function(result) {
                resolve(result);
            }).catch(function(err) {
                reject(err);
            });
        });
    }

    return { 
        create,
        update,
        get,
        findByCustomerId,
        findByCaseId,
        findByCriteria,
        search
    }
}

module.exports = new ContactService();