// 3rd Party Packages
var bodyParser =     require("body-parser");        // ??
var express =        require("express");            // express
var jwt =            require('jsonwebtoken');
var _ =              require('lodash');
var methodOverride = require("method-override");
var mongoose =       require("mongoose");           // mongoose model
var ObjectId =       require('mongodb').ObjectID;
var morgan =         require('morgan');
var request =        require("request");            // ??
var cors =           require('cors');               // NEED TO LEARN MORE!!!
var slackbot =       require('./classes/slackBot');

// local files
var config = require('./config.js');

// Variables
var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(morgan('dev'));
app.use(cors());

/*
// CORS Support
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, token');
    next();
});*/

// Connect to mongoDB
var db = mongoose.connect(config.db);
app.set('superSecret', config.secret);
mongoose.connection.once('open', function(db) {

    // Loaders
    app.models =    require('./models/index');
    app.classes =   require('./classes/index');
    app.scrapers =  require('./scrapers/index');
    var routes =    require('./routes');

    // Loops through and pairs routes with controllers
    _.each(routes, function(controller, route) {
        app.use(route, controller(app, route));
    });

    console.log("Thare be dragons on port " + port );
    app.listen(port);

    // Run scrape job!
    app.scrapers.nwAnime.scrape(app.models.anime, app.models.animeEpisode);
    //app.scrapers.thumbnailScraper.scrape(app);
    
});

exports = module.exports = app;