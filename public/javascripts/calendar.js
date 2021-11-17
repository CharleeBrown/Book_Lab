document.addEventListener('DOMContentLoaded', function () {
	
	function setDates() {
		fetch('/main', {
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
						title: jsonres[i]['name'],
						start: jsonres[i]['startTime'].toString(),
						end: jsonres[i]['stopTime'].toString(),
					};
					newArray.push(newObj);
					x += 1;
				}

				console.log(newArray);
				let passArray = newArray;
				return passArray;
			});
		}



		var calendarEl = document.getElementById('calendar');

		var calendar = new FullCalendar.Calendar(calendarEl, {
			initialView: 'dayGridMonth',
			dateClick: function (info) {
				alert('test');
			},
			eventClick: function (info) {
				alert(info.event.start.toLocaleTimeString() + ' - ' + info.event.end.toLocaleTimeString());
			},
			initialDate: '2021-11-07',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay'
			},
			
			events: [newArray]
		});

		console.log(calendar.events);
		calendar.render();

})


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
			return newStart.toLocaleString('en-US', {
				hour: 'numeric',
				hour12: true
			} + (isSameDate ? '' : newStop.toLocaleString('en-US', {
				hour: 'numeric',
				hour12: true
			})));
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
		return 'Body : ' + schedule.body;
	},
	popupEdit: function () {
		return '';
	},
	popupDelete: function (schedule) {

		return '';
	}
};