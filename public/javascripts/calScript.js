let x = 1;
let cal = new tui.Calendar('#calendar', {
	defaultView: 'month', // monthly view option
	taskView: ['task'],
	scheduleView: false
});

function getDates(url){
	fetch(url, 
		{headers: 
			{'Accept': 'application/json',
			'Content-Type': 'application/json'
		}, 
	method: 'POST'})
	.then(response => response.json())
	.then(data=>{setDates(data)});
};

async function setDates(sets) {
	let newCal = document.getElementById('calendar');
	console.log(sets);
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
		x+=1;
		
		newArray.push(newObj);
		
	}
	sessionStorage.setItem('schedule', JSON.stringify(newArray));

	cal.createSchedules(JSON.parse(sessionStorage.getItem('schedule')));
	console.log("test");
	console.log("test");
	let newa = JSON.parse(await sessionStorage.getItem('schedule'));
	console.log(newa);
	// console.log(newArray);
	// return newArray;
};


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
