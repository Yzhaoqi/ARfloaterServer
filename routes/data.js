var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var floater = [];

var jsonParser = bodyParser.json();

router.post('/getFloater', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  var la = data.latitude;
  var lo = data.longitude;
  var title = data.title;

  for (var i = 0, length = floater.length; i < length; i++) {
    if (floater[i].latitude == la && floater[i].longitude == lo && floater[i].title == title) {
      return res.send(floater[i]);
    }
  }
  console.log("Floater not Found");
  res.send("Floater not Found");
});

router.post('/submitFloater', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  if (data.latitude == undefined || data.longitude == undefined) return res.send("Error No Location");
  if (data.title == undefined) return res.send("Error title");
  if (data.text == undefined) return res.send("Error text");

  floater.push(data);
  res.send("Success");
});

router.post('/submitLeaveWords', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  var la = data.latitude;
  var lo = data.longitude;
  var title = data.title;

  for (var i = 0, length = floater.length; i < length; i++) {
    if (floater[i].latitude == la && floater[i].longitude == lo && floater[i].title == title && floater[i].text == data.text) {
      floater[i] = data;
      return res.send("Success");
    }
  }
  
  res.send("Error No Found");
})

module.exports = router;
