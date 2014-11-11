// Set up
var express = require('express');
// create app with express
var app = express();
// mongoose for mongodb
var mongoose = require('mongoose');
// log requests to the console (express4)
var morgan = require('morgan');
// pull information from HTML POST (express4)
var bodyParser = require('body-parser');
// simulate DELETE and PUT (express 4)
var methodOverride = require('method-override');

// configuration
// load the database
var database = require('./config/database')
//  connect to mongoDB database on modulus.io
mongoose.connect(database.url);
// set the static files location
app.use(express.static(__dirname + '/public'));
// log every request to the console
app.use(morgan('dev'));
// parse applicaton/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

// load the routes
require('./app/routes')(app);

// listen
app.listen(8080);
console.log("App listening on port 8080");