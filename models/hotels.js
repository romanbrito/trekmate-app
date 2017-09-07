module.exports = function(sequelize, DataTypes) {
    var Hotel = sequelize.define("Hotel", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
         },
         hotel_name: {
             type: DataTypes.STRING,
             allowNull: false,
             validate: {len: [1]}
         },
         address: {
             type: DataTypes.STRING,
             allowNull: true,
         },
         checkin_time: {
             type: DataTypes.TIME,
             allowNull: true
         }
    },
        {
             classMethods: {
                 associate: function(models) {
                    Hotel.belongsTo(models.Trip,
                    {
                        constraints: false,
                        onDelete: "cascade",
                        foreignKey: {
                            allowNull: true
                        }
                    });
                    Hotel.hasOne(models.Trip, {
                      constraints: false,
                      foreignKey: {
                        allowNull: true
                      }
                    });
                    }
                 }
             });

         return Hotel;
};
