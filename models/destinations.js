module.exports = function(sequelize, DataTypes) {
    var Destination = sequelize.define("Destination", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false
            },
            longitude: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            latitude: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
             classMethods: {
                 associate: function(models) {
                    Destination.belongsTo(models.Trip,
                    {
                        constraints: false,
                        onDelete: "cascade",
                        foreignKey: {
                            allowNull: true
                        }
                    });
                    Destination.hasOne(models.Trip, {
                        constraints: false,
                        foreignKey: {
                          allowNull: true
                        }
                    });
                    }
                 }
             });
             return Destination;
};
