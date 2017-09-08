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
    var flight_date = req.body.flight_date;
    var flight_number = req.body.flight_number;
    var TripUuid = req.body.TripUuid;
    var flightNumberArrStr = flight_number.split(" ");
    var airlineCode = flightNumberArrStr[0];
    var flight = flightNumberArrStr[1];
    flight_date = dateFormat(flight_date, "yyyy/m/d");


    // <li>Status &nbsp;{{buffer.flightStatuses.[0].status}}</li>
    // <li>Departure Airport &nbsp;{{buffer.flightStatuses.[0].departureAirportFsCode}}</li>
    // <li>Arrival Airport &nbsp;{{buffer.flightStatuses.[0].arrivalAirportFsCode}}</li>

    // console.log(flightDate);
    // console.log(airlineCode);
    // console.log(flight);


    var parameters = "flight/status/" + airlineCode + "/" + flight + "/arr/" + flight_date;

    var url = FlightQueryURL("flightstatus", "rest", "v2", "json", parameters, "", "flightInfo");

    var request = https.get(url, function (response) {
        var buffer = ""
            , data;
        response.on("data", function (chunk) {
            buffer += chunk;
        });

        response.on("end", function (err) {

            var flight_stats = JSON.parse(buffer);

            db.Flight.update({
                flight_status: flight_stats.flightStatuses[0].status,
                departure_airport: flight_stats.flightStatuses[0].departureAirportFsCode,
                arrival_airport: flight_stats.flightStatuses[0].arrivalAirportFsCode
            },{
                where: {
                    id: req.body.flight_id
                }
            }).then(function (flight) {
                console.log('the flight ' + flight);
                res.redirect("/trip/" + TripUuid);
            });
        });
    });
});

module.exports = router;