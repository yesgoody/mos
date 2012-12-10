var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://localhost/mos');
var app = express.createServer();

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("mongodb is on");
});

var OrderSchema = new mongoose.Schema({
    time: Number,
	type: String,
	data: {
		customerID : Number,
		merchantID : Number,
		price : Number,
		details : 
			[{item : String, num : Number}]
	}
});

var Order = db.model('Order', OrderSchema);

app.get('/', function(request, response) {
  response.send('main page');
});
app.get('/list', function(req, res) {
	return Order.find(function(err, orders){
		if(!err){
			return res.send(orders);
		}
		else{
			return console.log(err);
		}
	});
});

var testJson = {
	"service":"yesgoody-mos", 
	"version":"alpha",
	"utc":Date.now()};
	
app.post('/api', function(req, res){
	req.on("data", function(d){
		//console.log(d.toString());
		testJson.params = req.params;
		testJson.headers = req.headers;
		testJson.query = req.query;
		testJson.path = req.path;
		testJson.data = JSON.parse(d);
		res.json(testJson);
		var order = new Order(JSON.parse(d));
		order.save(function (err) {
		  if (!err) {
			  console.log("created!");
		  }
		  else{
		  	console.log("saving error");
		  }
		});
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
