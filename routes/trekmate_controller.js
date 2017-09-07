var express = require("express");
var router = express.Router();
var db = require("../models/index");

// routes

router.get("/", function (req, res) {
    res.render("frontpage");
});

router.post("/dashboard", function (req, res) {
    res.render("dashboard");
});

module.exports = router;
