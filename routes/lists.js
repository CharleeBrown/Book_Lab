var express = require('express');
var router = express.Router();
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

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('list');
//   // When the list page is loaded.
// };

router.get('/', (req, res) => {

  let nowDate = new Date().toISOString();
  client.connect(async err => {
    // The server queries the db for any bookings >= the current date.
    const query = {
      bookDate: {
        $gte: nowDate
      }
    };
    console.log(nowDate);

    // The query results are returned and send to the page.
    return collect
      .find(query)
      .sort()
      .toArray()
      .then((items) => {
        res.json(items);
        return items;
      })
      .catch((err) => console.error(`Failed to find documents: ${err}`));
  });
  client.close();
});

module.exports = router;
