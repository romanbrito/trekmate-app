module.exports = function(sequelize, DataTypes) {
    var Activity = sequelize.define("Activity", {
         activity_name: {
             type: DataTypes.STRING,
             allowNull: false
         },
         description: {
             type: DataTypes.STRING,
             allowNull: false
         },
         time_of_event: {
             type: DataTypes.TIME,
             allowNull: false
         }
    },
    {
      classMethods: {
        associate: function(models) {
            Activity.belongsTo(models.Trip,
            {
              constraints: false,
              onDelete: "cascade",
              foreignKey: {
                  allowNull: true
              }
            });
            Activity.hasOne(models.Trip, {
              constraints: false,
              foreignKey: {
                allowNull: true
              }
            });
          }
        }
    });

  return Activity;
};
