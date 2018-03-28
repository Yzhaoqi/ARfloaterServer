var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

var data = [];

var jsonParser = bodyParser.json();

router.get('/getId', function(req, res) {
  var id="";
  while (id == "") {
    for(var i=0;i<4;i++){
      id+=Math.floor(Math.random()*10);
    }
    if (data[id] == undefined) break;
    id="";
  }
  res.send(id);
});

router.post('/submitActivity', jsonParser, function(req, res) {
  var s = req.body;
  console.log(s);
  var id = s.id;
  var _data = s.data;
  if (data[id] == undefined) {
    data[id] = _data;
    res.send("Success");
  } else {
    res.send("Fail");
  }
});

router.post('/getActivity', function(req, res) {
  console.log(req.body.id);
  s = req.body;
  if (data[s.id] != undefined) {
    res.send(data[s.id]);
  } else {
    res.send("Fail");
  }
});


module.exports = router;
