module.exports = function (sequelize, Datatypes) {
    var Flight = sequelize.define("Flight", {
            flight_number: {
                type: Datatypes.STRING,
                allowNull: false
            },
            flight_date: {
                type: Datatypes.DATEONLY,
                allowNull: true
            },
            city_departure: {
                type: Datatypes.STRING,
                allowNull: true
            },
            flight_status: {
                type: Datatypes.STRING,
                allowNull: true
            },
            departure_airport: {
                type: Datatypes.STRING,
                allowNull: true
            },
            arrival_airport: {
                type: Datatypes.STRING,
                allowNull: true
            }
        },
        {// Associations
            classMethods: {
                associate: function (models) {
                    Flight.belongsTo(models.Trip, {
                        constraints: false,
                        onDelete: "cascade",
                        foreignKey: {
                            allowNull: true
                            // foreignKey created TripId
                        }
                    });
                    Flight.hasOne(models.Trip, {
                        constraints: false,
                        foreignKey: {
                            allowNull: true
                        }
                    });
                }
            }
        });
    return Flight;
};
