module.exports = function(req, res, next) {
    // If the user is logged in, continue with the request to the restricted route
    if (req.user) {
        return next();
    }
    // Otherwise, redirect them to the login page
    return res.redirect("/#login");
};