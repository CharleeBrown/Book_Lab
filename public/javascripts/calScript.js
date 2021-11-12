let templates = {
	time: function (schedule) {
		let scheduleTime = new Date(schedule.start);
		let scheduleStops = new Date(schedule.end);
		return scheduleTime.toLocaleTimeString([], {
			timeStyle: 'short'
		}) + '  ' + schedule.title;
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
		let newStart = new Date(start);
		let newStop = new Date(end);
		var isSameDate = moment(start).isSame(end);
		var endFormat = (isSameDate ? '' : 'MM.DD.YYYY') + 'hh:mm a';

		if (isAllDay) {
			return newStart.toLocaleString('en-US', { hour: 'numeric', hour12: true } + (isSameDate ? '' :  newStop.toLocaleString('en-US', { hour: 'numeric', hour12: true })));
		}

		return newStart.toLocaleTimeString() + ' - ' + newStop.toLocaleTimeString();
	},
	popupDetailLocation: function (schedule) {
		return schedule.locationPlaceholder = ' Cal Lab';
		//return 'Location : Cal Lab';
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
		return 'Body : ' + schedule.body ;
	},
	popupEdit: function () {
		return '';
	},
	popupDelete: function (schedule) {

		return '';
	}
};
let cal = new tui.Calendar('#calendar', {
	defaultView: 'month', // monthly view option
	scheduleView: false,
	useCreationPopup: false,
	useDetailPopup: false,
	template: templates
});
cal.on({
	'clickSchedule':function(e){
		return
	}
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
					start: jsonres[i]['startTime'].toString(),
					end: jsonres[i]['stopTime'].toString(),
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


// function setDates(sets) {
// 	let newCal = document.getElementById('calendar');
// 	console.log(sets);
// 	let x = 1;
// 	let newArray = [];
// 	for (let i in sets) {
// 		let newObj = {
// 			"id": x,
// 			calendarId: x,
// 			title: sets[i].name,
// 			category: 'Cal Lab',
// 			dueDateClass: '',
// 			start: sets[i].startTime,
// 			end: sets[i].stopTime
// 		};
// 		console.log(newObj);
// 		x += 1;
// 		newArray.push(newObj);
// 	}

// 	let cal = new tui.Calendar('#calendar', {
// 		defaultView: 'month', // monthly view option
// 		taskView: ['task'],
// 		scheduleView: true, // schedule view option
// 		taskView: true, // schedule view option
// 	});
// 	cal.createSchedules;
// }

function createDates(dates) {
}
