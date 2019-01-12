const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config');

// Object with Sequelize and sequelize instances (Singleton)
let db = {}

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.db.host,
  dialect: config.db.dialect,
  logging: console.log,
  pool: {
    max: 20,
    min: 0
  },

  // SQLite only
  storage: 'database.sqlite',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

/**
 * Load models in 'model' folder
 */
fs
    .readdirSync('./app/model')
    .forEach(function(file) {
        if (file != '.DS_Store') {
            var model = sequelize['import'](path.join('../model', file));
            db[model.name] = model;
        }
    });

/**
 * Load associations from model definition
 */
Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Sincronizamos los esquemas
sequelize.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
    // Sincronizamos los esquemas
    sequelize.sync({ force: false }).then(() => {
    }).catch(function(err) {
        logger.log('error', 'ERROR creating tables: ' + err);
    });
}).catch((err) => {
    logger.error('Unable to connect to the database:', err.message);
});

// Load Sequelize and sequelize on db Object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Exports db object
module.exports = db;