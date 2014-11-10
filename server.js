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
//  connect to mongoDB database on modulus.io
mongoose.connect('mongodb://jonos:jonos@proximus.modulusmongo.net:27017/et4ojohO');
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

// listen
app.listen(8080);
console.log("App listening on port 8080");

// define model
var Todo = mongoose.model('Todo', {
	text: String
});

// routes

// api
// get all todos
app.get('/api/todos', function(req, res) {
  Todo.find(function(err, todos) {
  	// if there is an error retrieving, send the error. 
  	if (err)
  		res.send(err)
  	res.json(todos);  // return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {
  // create a todo, information comes from AJAX request from Angular
  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
  	if (err)
  		res.send(err);

  	// get and return all todos after you create another
  	Todo.find(function(err, todos) {
  		if (err)
  			res.send(err)
  		res.json(todos);
  	});
  });
});


app.delete('/api/todos/:todo_id', function(req, res) {
  Todo.remove({
  	_id : req.params.todo_id
  }, function(err, todo) {
    if (err)
    	res.send(err);

    // get and return all the todos after you create another
    Todo.find(function(err, todos) {
    	if (err)
    		res.send(err)
    	res.json(todos);
    });
  });
});