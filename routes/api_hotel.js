module.exports = function(router, db) {
  router.post("/api/hotel", function(req, res) {
    db.Hotel.create(req.body)
    .then(function(hotel) {
      res.redirect("/trip/" + hotel.TripUuid);
    });
  });

  router.put("/api/hotel", function(req, res) {
    db.Hotel.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(hotel) {
      res.redirect("/trip/" + hotel.TripUuid);
    });
  });

  router.delete("/api/hotel", function(req, res) {
    var tripId = req.body.TripUuid;
    db.Activity.destroy(
      {
        where: {
          id: req.body.id
        }
      })
    .then(function() {
      res.redirect("/trip/" + tripId);
    });
  });
  return router;
};
