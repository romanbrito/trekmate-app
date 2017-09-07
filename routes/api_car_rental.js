module.exports = function(router, db) {
  router.post("/api/car-rental", function(req, res) {
    db.Car_Rental.create(req.body)
    .then(function(carRental) {
      res.redirect("/trip/" + carRental.TripUuid);
    });
  });

  router.put("/api/car-rental", function(req, res) {
    db.Car_Rental.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(carRental) {
      res.redirect("/trip/" + carRental.TripUuid);
    });
  });

  router.delete("/api/car-rental", function(req, res) {
    db.Car_Rental.destroy(
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
