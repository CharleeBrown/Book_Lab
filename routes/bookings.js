var express = require('express');
var router = express.Router();
let config = require('./configs');
const { MongoClient } = require("mongodb");
const uri = config.connString;
const client = new MongoClient(uri,{
  useNewUrlParser: true,
  useUnifiedTopology:true,
});
const collect = client.db("mainDB").collection("CalLabBooking");

/* GET bookings listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/',function(req,res,next){
  console.log("Arrived");
  let query = {
    bookDate: req.body.bookDate,
    startTime: req.body.starTime
  };
  console.log("created the object");
  console.log(req.body.bookDate);

  client.connect(async (err) => {
    console.log("starting to wait");
   return await collect.find(query) // TODO: Work on sending the request to the database.
      .sort()
      .toArray()
      .then((items) => {
        console.log(items);
        res.status(200).redirect('/');
        });
    });
});


module.exports = router;
