module.exports = function(router, db) {
  router.post("/api/activity", function(req, res) {
    db.Activity.create(req.body)
    .then(function(activity) {
      var newEntry = {
        activity: activity
      }
      res.redirect("/trip/" + activity.TripUuid);
    });
  });

  router.put("/api/activity", function(req, res) {
    db.Activity.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
    .then(function(activity) {
      res.redirect("/trip/" + activity.TripUuid);
    });
  });

  router.delete("/api/activity", function(req, res) {
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
