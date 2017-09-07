var express = require("express");
var router = express.Router();
var http = require('http');
var https = require('https');
var db = require("../models");
var config = require('../config/config.json');
var dateFormat = require('dateformat');

function FlightQueryURL(APIname, protocol, version, format, parameters, options) {

    const baseURI = config.flightStats.baseURL;
    const appId = config.flightStats.appId;
    const appKey = config.flightStats.appKey;

    var queryURL = baseURI +
        "/" + APIname +
        "/" + protocol +
        "/" + version +
        "/" + format +
        "/" + parameters +
        appId + appKey +
        options;

    return queryURL;
}

router.post("/api/flight", function (req, res) {
    console.log('flights ' + JSON.stringify(req.body));
    db.Flight.create(req.body)
        .then(function (dbFlight) {
        res.redirect("/trip/" + req.body.TripUuid);
    });
});


router.post("/flightStats", function (req, res) {

    // flight api
    var flightDate = req.body.flightDate;
    var flightNumber = req.body.flightNumber;
    var flightNumberArrStr = flightNumber.split(" ");
    var airlineCode = flightNumberArrStr[0];
    var flight = flightNumberArrStr[1];
    flightDate = dateFormat(flightDate, "yyyy/m/d");

    // console.log(flightDate);
    // console.log(airlineCode);
    // console.log(flight);


    var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flightDate;

    var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");

    var request = https.get(url, function (response) {
        var buffer = ""
            , data;
        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {
            var hbsObject = {
                flightStatus: JSON.parse(buffer)
            };
            //res.json(hbsObject);
            res.render("tripinfo", hbsObject);
        });
    });
});

module.exports = router;