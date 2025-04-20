const submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
	submitBtn.addEventListener("click", () => {
		const name = document.getElementById("userInput").value.trim();

		if (name) {
			localStorage.setItem("dev-name", name);
			window.location.href = "index.html";
		} else {
			alert("Please enter a name for your Dev!");
		}
	});
}

const devName = localStorage.getItem("dev-name");
if (devName) {
	const devNameCapitalised =
		devName.charAt(0).toUpperCase() + devName.slice(1).toLowerCase();

	const devNamInUi = document.getElementById("dev-name");
	if (devNamInUi) {
		devNamInUi.textContent = `Hi ${devNameCapitalised}!`;
	}
}
