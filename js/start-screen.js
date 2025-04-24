const nameBtn = document.getElementById("submitBtn");
const startGameBtn = document.getElementById("startGameBtn");
const alertDevName = document.getElementById("not-named-alert");

// THIS SECTION HANDLES THE 'NAME YOUR DEV' BUTTON FUNCTIONALITY
// ON BUTTON CLCK THE NAME IS SAVED IT TO LOCAL STORAGE.
//  A SUCCESS MESSAGE IS DISPLAYED IN THE UI.
// IF NO NAME IS ENTERED, AN ERROR MESSAGE IS DISPLAYED.
// AFTER A SUCCESS OR ERROR MESSAGE, THE INPUT FIELD IS CLEARED.
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
