module.exports = function(sequelize, DataTypes) {
    var Role = sequelize.define('Role', {
      name: DataTypes.STRING
    }, {
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
  
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: false,
  
      // disable the modification of table names; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
  
      // define the table's name
      tableName: 'Role'
    });

    Role.associate = function(models) {
        models.Role.hasMany(models.User, {foreignKey: 'roleId'});
    }

    return Role;
  };
  