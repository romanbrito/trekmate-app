module.exports = function(sequelize, DataTypes) {
    var Trip = sequelize.define("Trip", {
         uuid: {
             type: DataTypes.UUID,
             defaultValue: DataTypes.UUIDV1,
             primaryKey: true
         },
         city: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: { len: [1]}
         },
         state: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: { len: [1]}
         },
         departure_date: {
             type: DataTypes.DATE,
             allowNull: false
         },
         return_date: {
             type: DataTypes.DATE,
             allowNull: false
         }
    },
    {
        classMethods: {
            associate: function(models) {
                Trip.hasMany(models.Activity, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                });
                Trip.belongsTo(models.Activity, {
                  constraints: false,
                  foreignKey: {
                    allowNull: false
                  }
                });
                Trip.hasMany(models.Car_Rental, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                });
                Trip.belongsTo(models.Car_Rental, {
                  constraints: false,
                  foreignKey: {
                    allowNull: false
                  }
                });
                Trip.hasMany(models.Destination, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                });
                Trip.belongsTo(models.Destination, {
                  constraints: false,
                  foreignKey: {
                    allowNull: false
                  }
                });
                Trip.hasMany(models.Flight, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                });
                Trip.belongsTo(models.Flight, {
                  constraints: false,
                  foreignKey: {
                    allowNull: false
                  }
                });
                Trip.hasMany(models.Hotel, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                });
                Trip.belongsTo(models.Hotel, {
                  constraints: false,
                  foreignKey: {
                    allowNull: false
                  }
                });
                Trip.hasMany(models.User, {
                  constraints: false,
                  foreignKey: {
                      allowNull: true
                  }
                })
                Trip.belongsTo(models.User, {
                    constraints: false,
                    onDelete: "cascade",
                    foreignKey: {
                      allowNull: false
                    }
                });
            }
        }
    });


    return Trip;
};
