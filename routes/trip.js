module.exports = function(router, db) {
  router.get("/trip/:id?", function (req, res) {
    var tripId;
    if (req.params.id) {
      tripId = req.params.id;
    } else {
      tripId = req.body.uuid;
    }
    db.Trip.findOne({
      where: {
        uuid: tripId
      }
    })
    .then(function(dbTrip) {
      var trip = dbTrip;
      db.Activity.findAll({
        where: {
          TripUuid: tripId
        }
      })
      .then(function(dbActivity) {
        var activity = dbActivity;
        db.Car_Rental.findAll({
          where: {
            TripUuid: tripId
          }
        })
        .then(function(dbCar) {
          var carRental = dbCar;
          db.Flight.findAll({
            where: {
              TripUuid: tripId
            }
          })
          .then(function(dbFlight) {
            var flight = dbFlight;
            db.Hotel.findAll({
              where: {
                TripUuid: tripId
              }
            })
            .then(function(dbHotel) {
              var hotel = dbHotel;
              db.User.findOne({
                where: {
                  id: req.user.id
                }
              })
              .then(function(dbUser) {
                var user = dbUser;

                var info = {
                  trip: trip,
                  user: user,
                  flight: flight,
                  hotel: hotel,
                  carRental: carRental,
                  activity: activity
                }

                console.log(carRental);

                res.render("tripinfo", info);
              });
            });
          });
        });
      });
    });
  });

  router.get("/trips", function(req, res) {
    res.render("tripinfo");
  });

  return router;
};
