module.exports = function(router, db) {
  router.post("/api/trip", function(req, res) {
    console.log(req.body);
    db.Trip.create({
      city: req.body.city,
      state: req.body.state,
      departure_date: req.body.departure_date,
      return_date: req.body.return_date,
      UserId: req.user.id
    })
    .then(function(newTrip) {
      res.redirect("/dashboard");
    });
  });

  router.put("/api/trip", function(req, res) {
    db.Trip.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(trip) {
      res.redirect("/trip/" + trip.id);
    });
  });

  router.delete("/api/trip", function(req, res) {
    db.Trip.destroy(
      {
        where: {
          id: req.body.id
        }
      })
    .then(function() {
      res.redirect("/dashboard");
    });
  });
  return router;
};
