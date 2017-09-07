module.exports = function(router, db) {
  router.post("/api/destination", function(req, res) {
    db.Destination.create(req.body)
    .then(function(activity) {
      res.redirect("/dashboard");
    });
  });

  router.put("/api/destination", function(req, res) {
    db.Destination.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(destination) {
      res.redirect("/trip/" + destination.TripUuid);
    });
  });

  router.delete("/api/destination", function(req, res) {
    db.Destination.destroy(
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
