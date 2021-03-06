module.exports = function(sequelize, DataTypes) {
    var Contact = sequelize.define('Contact', {
        date: { 
            type: DataTypes.DATE, 
            defaultValue: DataTypes.NOW 
        },
        channel: DataTypes.STRING,
        type: DataTypes.STRING,
        customerId:  DataTypes.STRING
    }, {
        // don't add the timestamp attributes (updatedAt, createdAt)
        timestamps: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // disable the modification of table names; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,

        // define the table's name
        tableName: 'Contact'
    });

    Contact.associate = function(models) {
        Contact.belongsTo(models.Case, { foreignKey: 'caseId' });
    }

    return Contact;
};
  