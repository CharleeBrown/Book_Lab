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


router.get('/', function (req, res, next) {
	res.render('main');

});

router.post('/', function (req, res, next) {
	let nowDate = new Date();
	client.connect(err => {
		// The server queries the db for any bookings >= the current date.
		const query = {
			bookDate: {
				$gt: nowDate
			}
		};
		console.log(nowDate);
		// The query results are returned and send to the page.
		return collect
			.find(query)
			.sort()
			.toArray()
			.then((items) => {
				console.log(items);
				//res.status(200).render('main').json(items);
				//   console.log(items);
				//addItems(items);
				res.json(items);
				return items;
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