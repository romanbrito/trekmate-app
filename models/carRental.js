module.exports = function(sequelize, DataTypes) {
    var CarRental = sequelize.define("Car_Rental", {
         rental_comp: {
             type: DataTypes.STRING,
                    allowNull: false,
                    validate: { len: [1]}
         },
         confirmation_num: {
             type: DataTypes.STRING,
                    allowNull: true
         }
    },
    {
        classMethods: {
            associate: function(models) {
                CarRental.belongsTo(models.Trip,
                {
                    constraints: false,
                    onDelete: "cascade",
                    foreignKey: {
                        allowNull: true
                    }
                });
                CarRental.hasOne(models.Trip, {
                  constraints: false,
                  foreignKey: {
                    allowNull: true
                  }
                });
            }
        }
    });
    return CarRental;
};
