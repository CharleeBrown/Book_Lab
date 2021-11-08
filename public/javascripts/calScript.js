function getDates(url) {
	fetch(url, {
			headers: {'Accept': 'application/json','Content-Type': 'application/json'},
			method: 'POST'
				})
		.then(response => response.json())
		.then(data => {
			let x = 1;
			let newArray = [];
			let newdata = JSON.stringify(data);
			let jsonres = JSON.parse(newdata);
			for (let i = 0; i < jsonres.length; i++) {
				let newObj = {
					'id': x.toString(),
					calendarId: x.toString(),
					title: jsonres[i]['name'],
					category: 'time',
					dueDateClass: '',
					start: jsonres[i]['startTime'],
					end: jsonres[i]['stopTime']
				};
			newArray.push(newObj);
				x += 1;
			};
			let cal = new tui.Calendar('#calendar', {
				defaultView: 'month', // monthly view option
				scheduleView: true,
				useCreationPopup:false,
				useDetailPopup:false,
			});
			cal.createSchedules(newArray);
			console.log(newArray);
			//createDates(data
		});
};

function setDates(sets) {
	let newCal = document.getElementById('calendar');
	console.log(sets);
	let x = 1;
	let newArray = [];
	for (let i in sets) {
		let newObj = {
			"id": x,
			calendarId: x,
			title: sets[i].name,
			category: 'Cal Lab',
			dueDateClass: '',
			start: sets[i].startTime,
			end: sets[i].stopTime
		};
		x += 1;
		newArray.push(newObj);
	}

	let cal = new tui.Calendar('#calendar', {
		defaultView: 'month', // monthly view option
		taskView: ['task'],
		scheduleView: false
	});
	cal.createSchedules;
	// sessionStorage.setItem('schedule', JSON.stringify(newArray));

	// cal.createSchedules(JSON.parse(sessionStorage.getItem('schedule')));
	// console.log("test");
	// console.log("test");
	// let newa = JSON.parse(await sessionStorage.getItem('schedule'));
	// console.log(newa);
	// // console.log(newArray);
	// return newArray;
}

function createDates(dates) {


}

// function getDates(url, func) {
// 	let xht = new XMLHttpRequest();
// 	xht.onreadystatechange = function () {
// 		if (this.readyState == 4 && this.status == 200) {
// 			func(this);
// 		}
// 	};
// 	xht.open('POST', url, true);
// 	xht.send();
// }