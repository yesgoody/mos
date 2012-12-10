var express = require('express');

var app = express.createServer();

app.get('/', function(request, response) {
  response.send('main page');
});


var testJson = {
	"server":"yesgoody-mos", 
	"version":"alpha",
	"utc":Date.now()};
app.get('/api', function(req, res){
	testJson.req = req.query;
	res.json(testJson);
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});