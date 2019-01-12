var moment = require('moment');

module.exports = function(sequelize, DataTypes) {
    var Case = sequelize.define('Case', {
        ref: DataTypes.STRING,
        opendate: {
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
        lastmodificationdate: DataTypes.DATE,
        finalizationdate: DataTypes.DATE,
        comments: DataTypes.STRING,
        customerId:  DataTypes.STRING
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: false,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: false,

        // define the table's name
        tableName: 'Case'
    });

    Case.associate = function(models) {
        Case.hasMany(models.Contact, { foreignKey: 'caseId' });
    }

    Case.prototype.opendateFormatted = function() {
        return moment(this.opendate).format('YYYY-MM-DD HH:mm');;
    }

    Case.prototype.finalizationdateFormatted = function() {
        return moment(this.finalizationdate).format('YYYY-MM-DD HH:mm');;
    }

    return Case;
};
