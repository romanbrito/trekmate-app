var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(router, db) {
  router.get("/dashboard", isAuthenticated, function(req, res) {
    db.Trip.findAll({
      where: {
        UserId: req.user.id
      }
    })
    .then(function(tripInfo) {

      var info = {
        trips: tripInfo,
        user: req.user
      };
      res.render("dashboard", info);
      //res.json(info);
    });
  });

  return router;
};
