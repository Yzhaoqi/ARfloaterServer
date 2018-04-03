var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var jsonParser = bodyParser.json();
mongoose.connect('mongodb://localhost/ar-floater');

var db = mongoose.connection;
var Schema = mongoose.Schema;
var floaterSchema = new Schema({}, {strict: false});
var Floater = mongoose.model('Floater', floaterSchema);
db.on('error', console.error.bind(console, 'connection error:'));

router.post('/getFloater', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  var la = data.latitude;
  var lo = data.longitude;
  var title = data.title;
  
  Floater.findOne({latitude:data.latitude, longitude:data.longitude, title:data.title}, function(err, floater) {
    if (err) {
      res.send("Floater not Found");
    } else {
      if (floater == null) {
        res.send("Floater not Found");
      } else {
        res.send(floater);
      }
    }
  })
});

router.post('/submitFloater', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  if (data.latitude == undefined || data.longitude == undefined) return res.send("Error No Location");
  if (data.title == undefined) return res.send("Error title");
  if (data.text == undefined) return res.send("Error text");

  var floater = new Floater(data);
  floater.save(function(err, floater) {
    if (err) {
      console.log(err);
    } else {
      res.send("Success");
    }
  });
});

router.post('/submitLeaveWords', jsonParser, function(req, res) {
  console.log(req.body);
  if (req.body == {}) return res.sendStatus(400);

  var data = req.body;
  var la = data.latitude;
  var lo = data.longitude;
  var title = data.title;

  Floater.updateOne({latitude:data.latitude, longitude:data.longitude, title:data.title}, {$set:{leavewords:data.leavewords}}, function(err, tank) {
    if (err) {
      res.send("Error Not Found");
    } else {
      if (tank.n > 0) {
        res.send("Success");
      } else {
        res.send("Error Not Found");
      }
    }
  })
})

module.exports = router;
