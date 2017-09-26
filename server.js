
// Dependencies
var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');

// Set up Express app
var app = express();
app.set('port', process.env.PORT || 8080);
// var port = process.env.PORT || 8080;

// database models for syncing
var db = require("./models");

// Serve static content
app.use(express.static(process.cwd() + '/public'));
// Serve static files in the public directory
//app.use(express.static(path.join(__dirname, 'public')));

// Set up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set handlebars
var exphbs = require('express-handlebars');
var hbs = exphbs.create({
    // helpers : helpers,
    defaultLayout: 'main',
    partialsDir: [
        //   'shared/templates/',
        'views/partials/'
    ]
});

//  Instead of this we are using the previous, notice defaultLayout
// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set up sessions and then initialize Passport to enable authentication
var session = require("express-session");
var passport = require("./config/passport");
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true, cookie: {} }));
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}
app.use(passport.initialize());
app.use(passport.session());

// favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

// Routes
app.use(require('./routes/api_activity.js')(router, db));
app.use(require('./routes/api_car_rental.js')(router, db));
app.use(require('./routes/api_destination.js')(router, db));
app.use(require('./routes/api_hotel.js')(router, db));
app.use(require('./routes/api_trips.js')(router, db));
app.use(require('./routes/dashboard.js')(router, db));
app.use(require('./routes/login.js')(router, db, passport));
app.use(require('./routes/trip.js')(router, db));
// roman
// app.use(require('./routes/trekmate_controller'));
app.use(require('./routes/api_flight'));


// Syncing our sequelize models and then starting our express app
// force: true to allow structure modifications in our database,
// this is the case with associations

db.sequelize.sync({ force: false}).then(function () {
    var server = app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
    });
});
