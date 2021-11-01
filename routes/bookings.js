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
    bookDate: req.body.labDate,
    startTime: req.body.starTime
  };
  console.log("created the object");
  console.log(req.body.labDate);
  let obj = {
    name: req.body.username,
    bookDate: new Date(req.body.labDate),
    startTime: req.body.startTime,
    stopTime: req.body.leaveTime,
  };
  client.connect(async (err) => {
    console.log("starting to wait");
   return await collect.find(query) // TODO: Work on sending the request to the database.
      .sort()
      .toArray()
      .catch(err => console.log(err))
      .then((items) => {
        
        if(items.length <= 0){
          console.log(items);
       
        collect.insertOne(obj);
    
      }
      else{
        console.log("Match found, select new date");
        //res.status(200).redirect('/');
        }
        return items;
      });
    });
    res.status(200).redirect('/lists');
});


module.exports = router;
