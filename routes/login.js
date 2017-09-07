var isAuthenticated = require("../config/isAuthenticated");

module.exports = function(router, db, passport) {
  router.get("/", function(req, res) {
    if (req.user) {
      var user = {
        user: req.user.id
      };
      res.render("index", user);
    } else {
      res.render("index");
    }
  });

  router.post("/login", passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/' // see text
  }));

  router.post("/signup", function(req, res) {
    console.log(req.body);
    db.User.create(req.body)
    .then(function() {
      res.redirect(307, "/login");
    })
    .catch(function(err) {
      console.log(err);
      res.json(err);
    });
  });

  router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  return router;
};
