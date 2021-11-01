function getData(url, func) {
	let xht = new XMLHttpRequest();
	xht.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			func(this);
		}
	}
	xht.open('POST', url, true);
	xht.send();
}

function setData(sets) {
	let data = sets.responseText;
	let jsonres = JSON.parse(data);
	for (let i = 0; i < jsonres.length; i++) {
		let tbl = document.getElementById('tbl');
		let trr = document.createElement('tr'); // The multiple rows
		let nameCell = document.createElement('td');
		let dateCell = document.createElement('td');
		let startCell = document.createElement('td');
		let stopCell = document.createElement('td');
		//console.log('break');
		//console.log(jsonres[i]["name"]);
		let name = document.createTextNode(jsonres[i]["name"])
		let dates = document.createTextNode(new Date(jsonres[i]['bookDate']).toDateString())
		let start = document.createTextNode(jsonres[i]['startTime'])
		let stop = document.createTextNode(jsonres[i]['stopTime'])
		nameCell.appendChild(name);
		dateCell.appendChild(dates);
		startCell.appendChild(start);
		stopCell.appendChild(stop);
		trr.appendChild(nameCell);
		trr.appendChild(dateCell);
		trr.appendChild(startCell);
		trr.appendChild(stopCell);
		//tbl.appendChild(nameCell);
		tbl.append(trr);
		//tbl.appendChild(tdd);
	}
	//console.log(sets.body.length)
	console.log(sets)
	console.log(data);
	// document.getElementById('test').innerHTML = sets.response;
	// console.log(sets)
	// console.log(sets.response.type);
	// console.log(sets.responseText);
}