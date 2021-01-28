let mode;
mode = localStorage.getItem("mode");

if (mode === "light") {
	lightMode();
} else {
	darkMode();
}

function darkMode() {
	document.body.style.backgroundColor = "black";
	document.main.style.backgroundColor = "black";
	const inFocus = document.querySelector(".inFocus");
	if (inFocus) {
		inFocus.style.color = "#b33131";
	}
	const homeHeader = document.querySelector(".homeHeader");
	if (homeHeader) {
		homeHeader.style.color = "#b33131";
	}
	const inFocusDate = document.querySelector(".inFocusDate");
	if (inFocusDate) {
		inFocusDate.style.color = "#e9e9e9";
	}
	const upcomingEventsHeader = document.querySelector(
		".upcomingEventsHeader"
	);
	if (upcomingEventsHeader) {
		upcomingEventsHeader.style.color = "#b33131";
	}
	const int = document.querySelectorAll(".int");
	for (var i = 0; i < int.length; i++) {
		if (int) {
			int[i].style.color = "#b33131";
		}
	}
	const showCard = document.querySelectorAll(".showCard");
	for (var i = 0; i < showCard.length; i++) {
		if (showCard) {
			showCard[i].style.backgroundColor = "black";
		}
	}
	const viewEvent = document.querySelectorAll(".viewEvent");
	for (var i = 0; i < viewEvent.length; i++) {
		if (viewEvent) {
			viewEvent[i].style.backgroundColor = "black";
			viewEvent[i].style.color = "white";
		}
	}
	document.querySelector(".jumbotron").classList.add("jumbotronBlack");
	document.querySelector(".navbar").style.backgroundColor = "black";
	document.querySelector(".darkmodebtn").onclick = lightMode;
	document.querySelector(".darkmodebtn").classList.add("darkmodeOn");
	localStorage.setItem("mode", "dark");
	mode = localStorage.getItem("mode");
}

function lightMode() {
	document.body.style.backgroundColor = "white";
	const inFocus = document.querySelector(".inFocus");
	if (inFocus) {
		inFocus.style.color = "#0f8d78";
	}
	const homeHeader = document.querySelector(".homeHeader");
	if (homeHeader) {
		homeHeader.style.color = "white";
	}
	const inFocusDate = document.querySelector(".inFocusDate");
	if (inFocusDate) {
		inFocusDate.style.color = "#a34a4a";
	}
	const upcomingEventsHeader = document.querySelector(
		".upcomingEventsHeader"
	);
	if (upcomingEventsHeader) {
		upcomingEventsHeader.style.color = "white";
	}
	const int = document.querySelectorAll(".int");
	for (var i = 0; i < int.length; i++) {
		if (int) {
			int[i].style.color = "white	";
		}
	}
	const showCard = document.querySelectorAll(".showCard");
	for (var i = 0; i < showCard.length; i++) {
		if (showCard) {
			showCard[i].style.backgroundColor = "white";
		}
	}
	const viewEvent = document.querySelectorAll(".viewEvent");
	for (var i = 0; i < viewEvent.length; i++) {
		if (viewEvent) {
			viewEvent[i].style.backgroundColor = " #0f8d78";
			viewEvent[i].style.color = "white";
		}
	}
	document.querySelector(".jumbotron").classList.remove("jumbotronBlack");
	document.querySelector(".navbar").style.backgroundColor = " #202020";
	document.querySelector(".darkmodebtn").onclick = darkMode;
	document.querySelector(".darkmodebtn").classList.remove("darkmodeOn");
	localStorage.setItem("mode", "light");
	mode = localStorage.getItem("mode");
}

// #a34a4a;
