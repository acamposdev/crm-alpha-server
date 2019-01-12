var crypto = require('crypto');
var crypto = require('../libs/crypto');

// Modelo para usuarios
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING, // usuario
        password: DataTypes.STRING, // contraseña del usuario
        name: DataTypes.STRING, // nombre
        language: DataTypes.STRING, // Idioma es-ES, en-GB, de-DE, ca-ES
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: false,

        // define the table's name
        tableName: 'User'
    });

    User.associate = function(models) {
        models.User.belongsTo(models.Role, {foreignKey: 'roleId'});
    }

    User.verifyPassword = function (password) {
        var encripted = crypto.createHmac('sha1', crypto.key).update(password).digest('hex');
        return encripted === this.password;
    }         

    return User;
};
