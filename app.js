var express = require('express');
var phantom = require('phantom');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(cors());
app.use(bodyParser({limit: '50mb'})); // for parsing application/json
app.use(express.static(__dirname + '/public'));

// include my modules
var config = require('./config.js');
var print_service = require('./routes/print_service');

// routes
app.post('/print', print_service.print);

app.get('/', function (req, res) {
	res.send("Documentation is comming soon!");
});

app.listen(config.PORT, function () {
  console.log('Magic happens on port ' + config.PORT + '!');
});