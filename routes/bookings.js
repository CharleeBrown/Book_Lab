var express = require('express');
var router = express.Router();
let config = require('./configs');
const {
  MongoClient
} = require("mongodb");
const uri = config.connString;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const collect = client.db("mainDB").collection("CalLabBooking");

/* GET bookings listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function (req, res, next) {
  let query = {
    startTime: req.body.starTime // A query
  };

  let start = new Date(req.body.startTime);
  let leave = new Date(req.body.leaveTime);
  console.log(start);
  console.log(leave);
  let obj = {
    name: req.body.username,
    startTime: start,
    stopTime: leave,
  };
  client.connect(async (err) => {
    //console.log("starting to wait");
    return await collect.find(query) // TODO: Work on sending the request to the database.
      .sort()
      .toArray()
      .catch(err => console.log(err))
      .then((items) => {
        if (items.length <= 0) {
          //    console.log(items);
          collect.insertOne(obj);

        }
        return items;
      });
  });
  res.status(200).redirect('/main');
});


module.exports = router;