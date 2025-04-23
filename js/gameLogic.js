import {
	backgroundMusic,
	gameOverSound,
	gameOverBackground,
	winSound,
	levelUpSound,
} from "./audio.js";
import {
	code,
	study,
	debug,
	takeBreak,
	sleep,
	freeTimeActivity,
} from "./gameActivities.js";
const gameContainer = document.querySelector(".game-container");
const finalScreen = document.getElementById("finalScreen");
const resetButton = document.getElementById("resetButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverMessage = document.getElementById("gameOverMessage");
const tryAgainButton = document.getElementById("tryAgainButton");
const congratsMessage = document.getElementById("congratsMessage");
const actionButtons = document.querySelectorAll(".dev-activity");

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

// let gameStarted = false; // Add this line  to track if the game has started.

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

	if (gameState.energy <= 0) {
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

// THIS FUNCTION HANDLES THE DEVELOPER LEVELING UP.
// IF THE CURRENT KNOWLEDGE LEVEL IS LESS THAN THE MAXIMUM (4), INCREMENTS THE LEVEL BY ONE.
// INCREMENTS THE KNOWLEDGE LEVEL AND UPDATES IT IN LOCAL STORAGE.
// DISPLAYS THE DEV'S TITLE BASED ON THE (NEW) LEVEL.
// UPDATES THE DISPLAYED LEVEL AND TITLE IN THE UI.
// PLAYS A LEVEL-UP SOUND FOR EVERY NEW LEVEL REACH.
// CHECKS IF THE DEVELOPER HAS REACHED THE MAXIMUM LEVEL (4) AND, IF SO, TRIGGERS THE FINAL SCREEN.

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
	// gameStarted = false;
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

export { gameState, level, showDevMessage, updateStats, actionButtons };
