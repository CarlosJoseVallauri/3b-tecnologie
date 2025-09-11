"use strict";

window.onload= function(){
	
	let txtData1 = document.getElementById("txtData1");
	let txtData2 = document.getElementById("txtData2");
	let button = document.getElementsByTagName("button")[0];
	let log = document.getElementById("log");

	let dataCorrente = deleteOffset(new Date());

	txtData1.valueAsDate = dataCorrente;
	txtData2.value = dataCorrente.toISOString().substring(0, 19);

	button.addEventListener("click", function(){	
		let Date1 = txtData1.valueAsDate;
		let Date2 = new Date(txtData2.value);

		log.innerHTML = ""
		log.innerHTML += txtData1.value + "<br>"
		log.innerHTML += txtData2.value + "<br><br>"
		
		log.innerHTML += Date1 + "<br>";
		log.innerHTML += Date2 + "<br><br>";
		
		log.innerHTML += Date1.toISOString() + "<br>";
		log.innerHTML += Date2.toISOString() + "<br><br>";

		log.innerHTML += Date1.toLocaleString() + "<br>";
		log.innerHTML += Date2.toLocaleString() + "<br><br>";

		log.innerHTML += Date1.getTime() + "<br>";
		log.innerHTML += Date2.getTime() + "<br><br>";

		log.innerHTML += txtData1.valueAsDate.toISOString().substring(0, 10) + "<br>";
		log.innerHTML += Date2.toISOString().substring(0, 16) + "<br><br>";

		log.innerHTML += moment(Date1.toISOString()).format("YYYY-MM-DD") + "<br>";
		log.innerHTML += moment(Date2.toISOString()).local().format("YYYY-MM-DD") + "<br><br>";

		let diff = moment.duration(moment(Date2.toISOString()).diff(moment(Date1.toISOString())));

		log.innerHTML += `Giorni ${diff.days()} Ore ${diff.hours() - Date2.getTimezoneOffset() / 60} Minuti ${diff.minutes()}`;
	})

}

function deleteOffset(currentDate){
	return new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60 * 1000);
}