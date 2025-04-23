const nameBtn = document.getElementById("submitBtn");
const startGameBtn = document.getElementById("startGameBtn");
const alertDevName = document.getElementById("not-named-alert");

if (nameBtn) {
	nameBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const nameInput = document.getElementById("userInput");
		const chosenName = nameInput.value.trim();

		if (chosenName) {
			localStorage.setItem("dev-name", chosenName);

			alertDevName.textContent = `You've named your Dev: ${chosenName}`;
			alertDevName.style.color = "green";
			alertDevName.style.marginTop = "10px";

			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
		} else {
			alertDevName.textContent = "Please enter a name!";
			alertDevName.style.color = "red";
			alertDevName.style.marginTop = "10px";

			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
		}

		nameInput.value = "";
	});
}

if (startGameBtn) {
	startGameBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const nameInput = document.getElementById("userInput");
		let chosenName = nameInput.value.trim();

		if (!chosenName) {
			chosenName = localStorage.getItem("dev-name");
		}

		if (chosenName) {
			localStorage.setItem("dev-name", chosenName);
			window.location.href = "codegotchi.html";
		} else {
			alertDevName.textContent = "Please enter a name for your Dev!";
			alertDevName.style.color = "red";
			alertDevName.style.marginTop = "10px";
			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
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
