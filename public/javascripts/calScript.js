let templates = {
	time: function(schedule) {
		return schedule.title + ' <i class="fa fa-refresh"></i>' + schedule.start;
	},
	popupIsAllDay: function () {
		return 'All Day';
	},
	popupStateFree: function () {
		return 'Free';
	},
	popupStateBusy: function () {
		return 'Busy';
	},
	titlePlaceholder: function () {
		return 'Subject';
	},
	locationPlaceholder: function () {
		return 'Location';
	},
	startDatePlaceholder: function () {
		return 'Start date';
	},
	endDatePlaceholder: function () {
		return 'End date';
	},
	popupSave: function () {
		return 'Save';
	},
	popupUpdate: function () {
		return 'Update';
	},
	popupDetailDate: function (isAllDay, start, end) {
		var isSameDate = moment(start).isSame(end);
		var endFormat = (isSameDate ? '' : 'm-dd-YYYY') + 'hh:mm a';

		if (isAllDay) {
			return moment(start).format('MM.DD.YYYY hh:mm a') + (isSameDate ? '' : ' - ' + moment(end).format('MM.DD.YYYY hh:mm a'));
		}

		return (moment(start).format('MM.DD.YYYY hh:mm a') + ' - ' + moment(end).format(endFormat));
	},
	popupDetailLocation: function (schedule) {
		return 'Location : Cal Lab';
	},
	popupDetailUser: function (schedule) {
		return 'User : ' + (schedule.attendees || []).join(', ');
	},
	popupDetailState: function (schedule) {
		return 'State : ' + schedule.state || 'Busy';
	},
	popupDetailRepeat: function (schedule) {
		return 'Repeat : ' + schedule.recurrenceRule;
	},
	popupDetailBody: function (schedule) {
		return 'Body : ' + schedule.body;
	},
	popupEdit: function () {
		return 'Edit';
	},
	popupDelete: function (_id) {

		return 'Delete';
	}
};
let cal = new tui.Calendar('#calendar', {
	defaultView: 'month', // monthly view option
	scheduleView: true,
	useCreationPopup: true,
	useDetailPopup: true,
	template:templates
});

function getDates(url) {
	fetch(url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
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
					'id': jsonres[i]['_id'],
					calendarId: x.toString(),
					title: jsonres[i]['name'],
					category: 'time',
					dueDateClass: '',
					start: jsonres[i]['startTime'],
					end: jsonres[i]['stopTime'],
					silent: false
				};
				newArray.push(newObj);
				x += 1;
			}

			cal.createSchedules(newArray);
			console.log(newArray);
			//createDates(data
		});
}


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
		scheduleView: true, // schedule view option
		taskView:true, // schedule view option
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