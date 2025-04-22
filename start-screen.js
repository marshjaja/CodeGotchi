const startGameBtn = document.getElementById("startGameBtn");
if (startGameBtn) {
	startGameBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const nameInput = document.getElementById("userInput");
		let name = nameInput.value.trim();

		if (!name) {
			name = localStorage.getItem("dev-name");
		}

		if (name) {
			localStorage.setItem("dev-name", name);
			window.location.href = "codegotchi.html";
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
