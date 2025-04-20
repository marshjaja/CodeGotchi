const gameContainer = document.querySelector(".game-container");
const finalScreen = document.getElementById("finalScreen");
const resetButton = document.getElementById("resetButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverMessage = document.getElementById("gameOverMessage");
const tryAgainButton = document.getElementById("tryAgainButton");
const congratsMessage = document.getElementById("congratsMessage");
const actionButtons = document.querySelectorAll(".dev-activity");

//APP SOUNDS
const backgroundMusic = new Audio("./Cuddle Clouds.wav");
backgroundMusic.loop = true;
backgroundMusic.volume = 1.0;
let gameOverSound = new Audio("./gameOver.mp3");
let gameOverBackground = new Audio("./gameboy-sad.wav");
let winSound = new Audio("./Fanfare_1.wav");
const btnSound = new Audio("./tamagotchi-btn.wav");
const levelUpSound = new Audio("./tama-powerup.wav");
levelUpSound.volume = 0.3;
gameOverSound.volume = 0.3;
gameOverBackground.volume = 0.3;

const developerLevel = {
	0: "Beginner",
	1: "Junior Developer",
	2: "Mid-level Developer",
	3: "Senior Developer",
	4: "Head of Software",
};
let level = JSON.parse(localStorage.getItem("levelUp")) || {
	knowledgeLevel: 0,
};
const devTitle = developerLevel[level.knowledgeLevel];
document.getElementById(
	"displayLevel"
).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

let gameState = JSON.parse(localStorage.getItem("gameState")) || {
	DEVNAME: "",
	energy: 100,
	knowledge: 0,
	motivation: 100,
	stress: 0,
};

const energyBar = document.getElementById("energyFill");
const knowledgeBar = document.getElementById("knowledgeFill");
const motivationBar = document.getElementById("motivationFill");
const stressBar = document.getElementById("stressFill");

let gameStarted = false; // Add this line  to track if the game has started.

updateStats();

function updateStats() {
	if (gameState.energy > 100) {
		gameState.energy = 100;
	}
	if (gameState.energy < 0) {
		gameState.energy = 0;
	}
	if (gameState.knowledge < 0) {
		gameState.knowledge = 0;
	}
	if (gameState.motivation > 100) {
		gameState.motivation = 100;
	}
	if (gameState.motivation < 0) {
		gameState.motivation = 0;
	}
	if (gameState.stress > 100) {
		gameState.stress = 100;
	}
	if (gameState.stress < 0) {
		gameState.stress = 0;
	}

	document.getElementById("knowledge").textContent = Math.min(
		gameState.knowledge,
		100
	);
	document.getElementById("energy").textContent = Math.min(
		gameState.energy,
		100
	);
	document.getElementById("motivation").textContent = Math.min(
		gameState.motivation,
		100
	);
	document.getElementById("stress").textContent = Math.min(
		gameState.stress,
		100
	);

	energyBar.style.width = `${gameState.energy}%`;
	updateBarColor(energyBar, gameState.energy);
	knowledgeBar.style.width = `${gameState.knowledge}%`;
	updateBarColor(knowledgeBar, gameState.knowledge);
	motivationBar.style.width = `${gameState.motivation}%`;
	updateBarColor(motivationBar, gameState.motivation);
	stressBar.style.width = `${gameState.stress}%`;
	updateBarColor(stressBar, gameState.stress);

	localStorage.setItem("gameState", JSON.stringify(gameState));

	if (gameState.energy <= 0 && gameStarted) {
		// Check if gameStarted is true
		gameOverSound.play();
		gameOverBackground.play();
		backgroundMusic.pause();
		showGameOverScreen();
	}
	if (gameState.knowledge >= 100) {
		levelUp();
		gameState.knowledge = 0;
	}
}

function updateBarColor(statBarColour, value) {
	statBarColour.classList.remove("low", "medium", "high");

	if (value >= 70) {
		statBarColour.classList.add("high");
	} else if (value >= 40) {
		statBarColour.classList.add("medium");
	} else {
		statBarColour.classList.add("low");
	}
}

function levelUp() {
	if (level.knowledgeLevel < 4) {
		level.knowledgeLevel += 1;
		localStorage.setItem("levelUp", JSON.stringify(level));
	}

	const devTitle = developerLevel[level.knowledgeLevel];
	document.getElementById(
		"displayLevel"
	).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

	levelUpSound.play();
	if (level.knowledgeLevel === 4) {
		showFinalScreen();
	}
}

function code() {
	gameStarted = true; // Set gameStarted to true when any action is performed
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	if (gameState.energy > 0) {
		gameState.energy -= 10;
		if (level.knowledgeLevel < 4) {
			gameState.knowledge += 2;
		}

		if (Math.random() < 0.2) {
			showDevMessage("Oh no... Deployed to prod on a Friday at 5PM... 😬");
			gameState.stress += 35;
		}

		updateStats();

		if (gameState.energy <= 30) {
			showDevMessage("⚠️ I am getting tired!");
		}
		if (gameState.energy <= 10) {
			showDevMessage("⚠️ I Think I am about to pass out! ;(");
		}

		if (gameState.energy <= 0) {
			gameState.energy = 0;
			gameState.motivation -= 100;
			gameState.stress += 100;
			updateStats();
			showGameOverScreen();
		}
	}
}

function study() {
	gameStarted = true;
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	gameState.energy -= 5;
	gameState.motivation += 10;

	if (Math.random() < 0.2) {
		showDevMessage(
			"I’ve encountered a confusing concept… 404: Understanding not found."
		);
		gameState.stress += 10;
		gameState.motivation -= 30;
	} else {
		gameState.knowledge += 7;
	}

	updateStats();
}

function debug() {
	gameStarted = true;
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	gameState.energy -= 5;
	gameState.stress += 5;

	if (Math.random() < 0.2) {
		showDevMessage("Bug? What bug? I’ve got this! 😎");
		gameState.motivation += 10;
	} else {
		showDevMessage("Who broke the build??! Oh wait... it was me. 😭");
		gameState.motivation -= 20;
		gameState.stress += 10;
	}

	updateStats();
}

// function takeBreak() {
// 	gameStarted = true;
// 	if (level.knowledgeLevel === 4) return;
// 	btnSound.play();

// 	if (gameState.energy < 100) gameState.energy += 20;
// 	if (gameState.stress > 0) gameState.stress -= 2;
// 	updateStats();

// 	if (gameState.energy >= 70 && gameState.stress <= 30) {
// 		showDevMessage("Break over! Your dev is feeling rested.");
// 	}
// }

function takeBreak() {
	actionButtons.forEach((btn) => {
		btn.disabled = true;
	});

	showDevMessage(
		"Hold on... You can’t rush brilliance...\nTaking five... Be right back!"
	);

	let breakInterval = setInterval(() => {
		if (gameState.energy < 100) {
			gameState.energy += 20;
		}
		if (gameState.stress > 0) {
			gameState.stress -= 10;
		}
		updateStats();

		if (gameState.energy >= 70 || gameState.stress <= 40) {
			// if (gameState.energy >= 70 && gameState.stress <= 40) {
			console.log(gameState.energy);
			actionButtons.forEach((btn) => {
				btn.disabled = false;
			});
			showDevMessage("Break over! I'm feeling rested and full of ideas!");

			clearInterval(breakInterval);
		}
	}, 2000);
}

function sleep() {
	gameStarted = true;
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	gameState.energy = 100;
	gameState.stress -= 80;
	showDevMessage("Zzz...Taking a nap... don't deploy anything without me!");
	updateStats();
}

function freeTimeActivity() {
	gameStarted = true;
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	const activities = ["Networking", "Exercise", "Side project"];
	const activity = activities[Math.floor(Math.random() * activities.length)];

	if (activity === "Networking") {
		gameState.knowledge += 50;
		showDevMessage("At a networking event, levelling up my connections!");
	} else if (activity === "Exercise") {
		gameState.stress -= 10;
		gameState.energy += 50;
		showDevMessage("Doing some Yoga. Recharging my body and mind.");
	} else {
		gameState.stress += 10;
		gameState.motivation += 50;
		showDevMessage("Tinkering on my side hustles, motivation: 100%! 💡");
	}

	updateStats();
}

function showDevMessage(text) {
	const balloonText = document.getElementById("devMessage");
	balloonText.querySelector("p").textContent = text;
	balloonText.style.display = "block";

	setTimeout(() => {
		balloonText.style.display = "none";
	}, 3500);
}

function showFinalScreen() {
	// actionButtons.forEach((btn) => {
	// 	btn.disabled = true;
	// });
	winSound.play();
	backgroundMusic.pause();
	congratsMessage.style.display = "block";
	finalScreen.style.display = "flex";
	gameOverScreen.style.display = "none";
	gameContainer.style.display = "none";
}

function showGameOverScreen() {
	// actionButtons.forEach((btn) => {
	// 	btn.disabled = true;
	// });
	gameOverMessage.style.display = "block";
	finalScreen.style.display = "none";
	gameOverScreen.style.display = "flex";
	gameContainer.style.display = "none";
}

function resetGame() {
	gameState.energy = 100;
	gameState.knowledge = 0;
	gameState.motivation = 100;
	gameState.stress = 0;
	level.knowledgeLevel = 0;
	gameOverBackground.pause();
	gameOverSound.pause();

	localStorage.setItem("gameState", JSON.stringify(gameState));
	localStorage.setItem("levelUp", JSON.stringify(level));

	document.getElementById("displayLevel").textContent = `Level: ${
		level.knowledgeLevel
	}, ${developerLevel[level.knowledgeLevel]}`;
	finalScreen.style.display = "none";
	gameOverScreen.style.display = "none";
	gameContainer.style.display = "flex";
	gameStarted = false; // Reset  when the game is reset
	actionButtons.forEach((btn) => {
		btn.disabled = false;
	});
	updateStats();
}

// Attach music start to a user click
const toggleBtn = document.getElementById("toggleMusic");
const musicIcon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
	if (backgroundMusic.paused) {
		backgroundMusic.play();
		musicIcon.classList.remove("fa-volume-mute");
		musicIcon.classList.add("fa-volume-up");
	} else {
		backgroundMusic.pause();
		musicIcon.classList.remove("fa-volume-up");
		musicIcon.classList.add("fa-volume-mute");
	}
});

document.getElementById("code").addEventListener("click", code);
document.getElementById("study").addEventListener("click", study);
document.getElementById("debug").addEventListener("click", debug);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("break").addEventListener("click", takeBreak);
document.getElementById("freeTime").addEventListener("click", freeTimeActivity);
resetButton.addEventListener("click", resetGame);
tryAgainButton.addEventListener("click", resetGame);

export { gameState };
