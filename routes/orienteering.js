var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = express.Router();

var data = [];

var jsonParser = bodyParser.json();
mongoose.connect('mongodb://localhost/ar-floater');

var store_ids = [];

var db = mongoose.connection;
var Schema = mongoose.Schema;
var orienteeringSchema = new Schema({}, {strict: false});
var Orienteering = mongoose.model('Orienteering', orienteeringSchema);
db.on('error', console.error.bind(console, 'connection error:'));

Orienteering.find(function(err, ori) {
  for (var s in ori) {
    store_ids[ori[s].toObject().activity_id] = true;
  }
})

router.get('/getId', function(req, res) {
  var id="";

  while (id == "") {
    for(var i=0;i<4;i++){
      id+=Math.floor(Math.random()*10);
    }
    if (store_ids[id] == undefined) break;
    id="";
  }
  res.send(id);
});

router.post('/submitActivity', jsonParser, function(req, res) {
  var s = req.body;
  console.log(s);
  var id = s.activity_id;
  if (store_ids[id] == undefined) {
    var orienteering = new Orienteering(s);
    orienteering.save(function(err, orienteering) {
      if (err) {
        res.send("Fail");
      } else {
        store_ids[id] = true;
        res.send("Success");
      }
    });
  } else {
    res.send("Fail");
  }
});

router.post('/updateActivity', jsonParser, function(req, res) {
  var s = req.body;
  console.log(s);
  var id = s.activity_id;
  Orienteering.updateOne({activity_id:id}, {$set:{data:s.data}}, function(err, tank){
    if (err) {
      res.send("Fail");
    } else {
      if (tank.n > 0) {
        res.send("Success");
      } else {
        res.send("Fail");
      }
    }
  })
    
});

router.post('/getActivity', function(req, res) {
  console.log(req.body.activity_id);
  s = req.body;
  Orienteering.findOne({activity_id:s.activity_id}, function(err, ori) {
    if (err) {
      res.send("Fail");
    } else {
      if (ori == null) {
        console.log(ori);
        res.send("Fail");
      } else {
        res.send(ori);
      }
    }
  });
});

router.post('/checkPassword', function(req, res) {
  console.log(req.body);
  s = req.body;
  Orienteering.findOne({activity_id:s.activity_id}, function(err, ori) {
    if (err) {
      res.send("Fail");
    } else {
      console.log(ori);
      if (ori == null) {
        res.send("Fail");
      } else {
        if (ori.toObject().password == s.password) {
          res.send("Success");
        } else {
          res.send("Fail")
        }
      }
    }
  });
});

module.exports = router;
