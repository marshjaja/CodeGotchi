const nameBtn = document.getElementById("submitBtn");
const startGameBtn = document.getElementById("startGameBtn");
const alertDevName = document.getElementById("not-named-alert");
const displayDevName = document.getElementById("dev-name");

// THIS SECTION HANDLES THE 'NAME YOUR DEV' BUTTON FUNCTIONALITY
// ON BUTTON CLICK, THE NAME IS SAVED TO LOCAL STORAGE.
// A SUCCESS MESSAGE IS DISPLAYED IF NAME IS VALID AND BETWEEN 4 TO 12 CHARACTERS.
// IF NAME IS EMPTY, THE USER IS PROMPTED TO ENTER A NAME.
// IF THE NAME IS INVALID (NOT BETWEEN 4 TO 12 CHARACTERS), AN ERROR MESSAGE IS DISPLAYED.
// MESSAGE IS CLEARED AFTER 1.5 SECONDS AND THE INPUT FIELD IS RESET.

if (nameBtn) {
	nameBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const nameInput = document.getElementById("userInput");
		const chosenName = nameInput.value.trim();

		if (!chosenName) {
			alertDevName.textContent = "Please enter a name!";
			alertDevName.style.color = "red";
			alertDevName.style.marginTop = "10px";

			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
		} else if (chosenName.length >= 4 && chosenName.length <= 14) {
			localStorage.setItem("dev-name", chosenName);

			alertDevName.textContent = `You've named your Dev: ${chosenName}`;
			alertDevName.style.color = "green";
			alertDevName.style.marginTop = "10px";
			displayDevName.textContent = `Hi ${chosenName}`;

			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
		} else {
			alertDevName.textContent = "Name must be between 4 and 12 characters!";
			alertDevName.style.color = "red";
			alertDevName.style.marginTop = "10px";

			setTimeout(() => {
				alertDevName.textContent = "";
			}, 1500);
		}

		nameInput.value = "";
	});
}
// THIS SECTION HANDLES THE 'START GAME' BUTTON FUNCTIONALITY
// CHECK IF NO NAM ALREADY EXISTS OR IF THE USER HAS ENTERED A NAME FOR THEIR DEV.
// IF A NAME IS ENTERED, IT IS STORED IN LOCAL STORAGE AND THE USER IS REDIRECTED TO THE GAME PAGE.
// IF NO NAME IS ENTERED, AN ERROR MESSAGE IS DISPLAYED, PROMPTS USER TO ENTER A NAME.
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

// THIS SECTION RETRIEVES THE DEV NAME FROM LOCAL STORAGE, CAPITALIZES THE FIRST LETTER,
// IF A DEV NAME IS FOUND IN LOCAL STORAGE, IT WILL BE DISPLAYED
// IN A GREETING MESSAGE ON THE SCREEN.
const devName = localStorage.getItem("dev-name");
if (devName) {
	// CAPITALISES THE FIRST LETTER OF THE NAME CHOSEN
	const devNameCapitalised =
		devName.charAt(0).toUpperCase() + devName.slice(1).toLowerCase();

	const devNamInUi = document.getElementById("dev-name");
	if (devNamInUi) {
		devNamInUi.textContent = `Hi ${devNameCapitalised}!`;
	}
}
