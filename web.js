var express = require('express');

var app = express.createServer();

app.get('/', function(request, response) {
  response.send('main page');
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
	});
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
