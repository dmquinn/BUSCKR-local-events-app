let mode;
mode = localStorage.getItem("mode");

if (mode === "light") {
	lightMode();
} else {
	darkMode();
}

function darkMode() {
	// window.style.transition = "0s";
	document.body.style.backgroundColor = "black";
	document.getElementsByTagName("h1").style.color = "#b33131";
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
		inFocusDate.style.color = "#a34a4a";
	}
	const upcomingEventsHeader = document.querySelector(
		".upcomingEventsHeader"
	);
	if (upcomingEventsHeader) {
		upcomingEventsHeader.style.color = "#b33131";
	}

	const viewEvent = document.querySelector(".viewEvent");
	if (viewEvent) {
		viewEvent.style.backgroundColor = "white";
		viewEvent.style.color = "black";
	}
	document.querySelector(".jumbotron").classList.add("jumbotronBlack");
	document.querySelector(".navbar").style.backgroundColor = "black";
	document.querySelector(".darkmodebtn").onclick = lightMode;
	localStorage.setItem("mode", "dark");
	mode = localStorage.getItem("mode");
}

function lightMode() {
	document.body.style.backgroundColor = "white";
	document.getElementsByTagName("h1").style.color = "#0f8d78";
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

	const viewEvent = document.querySelector(".viewEvent");
	if (viewEvent) {
		viewEvent.style.backgroundColor = "#0f8d78";
		viewEvent.style.color = "white";
	}
	document.querySelector(".jumbotron").classList.remove("jumbotronBlack");
	document.querySelector(".navbar").style.backgroundColor = " #202020";
	document.querySelector(".darkmodebtn").onclick = darkMode;
	localStorage.setItem("mode", "light");
	mode = localStorage.getItem("mode");
}

// #a34a4a;
