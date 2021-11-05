var express = require('express');		//required constants  for express
var router = express.Router();
let config = require('./configs');
const {MongoClient} = require("mongodb");
const uri = config.connString;
const client = new MongoClient(uri, {useNewUrlParser: true,useUnifiedTopology: true,});
const collect = client.db("mainDB").collection("CalLabBooking");

router.get('/', function (req, res, next) { // Main endpoint for GET requests.
	res.render('main');
});


router.post('/', function (req, res, next) {  // Main endpoint for POST requests.
	let nowDate = new Date('11/01/2021');
	client.connect(async err => {
		const query = {bookDate: {$gte: nowDate} }; // The server queries the db for any bookings >= the current date.
		console.log(nowDate);
			 return await collect
			.find(query)
			.sort()
			.toArray()
			.then((items) => {
			res.status(200).send(items);
			//return items;
			})
			.catch((err) => console.error(`Failed to find documents: ${err}`));

	});
	//			res.render('main').send(items);
	console.log("Sent");


});

client.close();
// /* GET home page. */

// function createObj(results) {
// 	let jsonData = {};
// 	let otherData = {};
// 	results.forEach(function (column) {


// 		// let columnname = column.name;
// 		// jsonData[columnname] = column.value;

// 	});
// 	// console.log(jsonData);
// }

module.exports = router;