var darkmode = document.querySelector(".darkMode");
darkmode.addEventListener("click", function () {
	document.body.style.backgroundColor = "black";
	document.querySelector(".inFocus").style.color = "#b33131";
	document.querySelector(".homeHeader").style.color = "#b33131";
	document.querySelector(".introText").style.color = " #bdbdbd";
	document.querySelector(".inFocusDate").style.color = " #a34a4a";
	document.querySelector(".jumbotron").classList.add("jumbotronBlack");
	document.querySelector(".navbar").style.backgroundColor = "black";
});
