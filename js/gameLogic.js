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

// ALL DOM ELEMENTS SELECTORS NEEDED FOR GAME INTERFACE AND INTERACTION
const gameContainer = document.querySelector(".game-container");
const finalScreen = document.getElementById("finalScreen");
const resetButton = document.getElementById("resetButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverMessage = document.getElementById("gameOverMessage");
const tryAgainButton = document.getElementById("tryAgainButton");
const congratsMessage = document.getElementById("congratsMessage");
const actionButtons = document.querySelectorAll(".dev-activity");
const energyBar = document.getElementById("energyFill");
const knowledgeBar = document.getElementById("knowledgeFill");
const motivationBar = document.getElementById("motivationFill");
const stressBar = document.getElementById("stressFill");

// AN OBJECT THAT MAPS KNOWLEDGE LEVELS TO DEVELOPER TITLES
const developerLevel = {
	0: "Beginner",
	1: "Junior Developer",
	2: "Mid-level Developer",
	3: "Senior Developer",
	4: "Head of Software",
};
// TRY TO GET THE SAVED LEVEL DATA FROM LOCALSTORAGE
// IF THERE IS NO SAVED DATA, IT WILL USE THE DEFAULT KNOWLEDGELEVEL WHICH IS SET TO 0.
let level = JSON.parse(localStorage.getItem("levelUp")) || {
	knowledgeLevel: 0,
};
// SETS THE DEVELOPER TITLE BASED ON THE CURRENT KNOWLEDGE LEVEL.
const devTitle = developerLevel[level.knowledgeLevel];

// UPDATES THE TEXT IN THE ELEMENT WITH ID "DISPLAYLEVEL".
// IT SHOWS THE LEVEL AND THE CORRESPONDING DEVELOPER TITLE.
document.getElementById(
	"displayLevel"
).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

// SEE IF THERE IS SAVED GAME STATE DATA IN LOCALSTORAGE AND PARSE IT.
// IF THERE IS NO SAVED DATA, IT WILL USE THIS DEFAULT OBJECT INSTEAD.
// THIS OBJECT STORES THE INITIAL STATS FOR THE PLAYER’S DEV.
let gameState = JSON.parse(localStorage.getItem("gameState")) || {
	energy: 100,
	knowledge: 0,
	motivation: 100,
	stress: 0,
};

updateStats();

// THIS FUNCTION HANDLES UPDATING THE DEV'S STATS ON SCREEN AND IN STORAGE.
// IT KEEPS THE NUMBERS BETWEEN 0 AND 100, SO THEY DON’T GO < 0 OR > 100.
// THEN IT UPDATES THE NUMBERS AND BARS IN THE UI TO MATCH THE CURRENT STATS.
// SAVES THE NEW STATS TO LOCALSTORAGE SO THEY DON'T RESET UPON REFRESH.
// IF ENERGY DROPS TO 0, IT SHOWS THE GAME OVER SCREEN AND STOPS THE GAME.
// IF KNOWLEDGE REACHES 100, YOUR DEV LEVELS UP AND KNOWLEDGE RESETS TO 0.
function updateStats() {
	// MAKES SURE ALL GAME STATS STAY WITHIN DEFINED RANGES
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

	// UPDATE THE TEXT CONTENT OF THE STATS DISPLAY (ENERGY, KNOWLEDGE, MOTIVATION, STRESS)
	// ENSURES THAT EACH STAT DOESN'T GO OVER THE MAX OF 100
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

	// UPDATE THE PERCENTAGE AND DEFINED COLOUR OF EACH STAT BAR
	energyBar.style.width = `${gameState.energy}%`;
	updateBarColor(energyBar, gameState.energy);
	knowledgeBar.style.width = `${gameState.knowledge}%`;
	updateBarColor(knowledgeBar, gameState.knowledge);
	motivationBar.style.width = `${gameState.motivation}%`;
	updateBarColor(motivationBar, gameState.motivation);
	stressBar.style.width = `${gameState.stress}%`;
	updateBarColor(stressBar, gameState.stress);

	// SAVE THE UPDATED GAME STATE TO LOCALSTORAGE
	localStorage.setItem("gameState", JSON.stringify(gameState));

	// IF ENERGY REACHES 0, THE GAME ENDS
	if (gameState.energy <= 0) {
		gameOverSound.play();
		gameOverBackground.play();
		backgroundMusic.pause();
		showGameOverScreen();
	}
	// IF KNOWLEDGE REACHES 100, IT WILL LEVEL UP AND RESET KNOWLEDGE TO 0
	if (gameState.knowledge >= 100) {
		levelUp();
		gameState.knowledge = 0;
	}
}

// THIS FUNCTION HANDLES THE CHANGES TO THE COLOUR OF A STAT BAR BASED ON ITS VALUE.
// FIRST, IT REMOVES ANY EXISTING COLOUR CLASSES (LOW, MEDIUM, HIGH).
// THEN IT APPLIES A NEW CLASS BASED ON THE VALUE:
// - IF 70 OR ABOVE, IT ADDS THE "HIGH" CLASS (GREEN).
// - IF BETWEEN 40 AND 69, IT ADDS THE "MEDIUM" CLASS (ORANGE).
// - IF BELOW 40, IT ADDS THE "LOW" CLASS (RED).
// PROVIDES VISUAL FEEDBACK TO SHOW IF A STAT IS GOOD, OKAY, OR LOW.
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

// THIS FUNCTION HANDLES THE LEVELING UP OF THE DEVELOPER
// IF THE KNOWLEDGE LEVEL IS BELOW 4, IT INCREASES IT BY 1 AND SAVES IT TO LOCAL STORAGE
// LOOKS UP THE NEW DEVELOPER TITLE AND UPDATES THE DISPLAYED TEXT.
// PLAYS A LEVEL-UP SOUND FOR EVERY NEW LEVEL REACH
// CHECKS IF THE DEVELOPER HAS REACHED THE MAXIMUM LEVEL (4) ,IT SHOWS THE FINAL SCREEN
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

// THIS FUNCTION DISPLAYS A TEMPORARY MESSAGE INSIDE A TEXT BALLOON.
// IT SETS THE BALLOON'S TEXT TO WHATEVER IS PASSED IN AS "TEXT".
// THEN IT MAKES THE BALLOON VISIBLE BY SETTING DISPLAY TO "BLOCK".
// AFTER 3.5 SECONDS, IT HIDES THE BALLOON AGAIN BY DISPLAY "NONE".
// THIS IS USED TO SHOW  FEEDBACK OR MESSAGES TO THE USER IN THE UI.
function showDevMessage(text) {
	const balloonText = document.getElementById("devMessage");
	balloonText.querySelector("p").textContent = text;
	balloonText.style.display = "block";

	setTimeout(() => {
		balloonText.style.display = "none";
	}, 3500);
}

// THIS FUNCTION SHOWS THE FINAL WIN SCREEN WHEN TRIGGERED.
// IT PLAYS A WIN SOUND, PAUSES THE BACKGROUND MUSIC,
// HIDES OTHER SCREENS, AND DISPLAYS THE FINAL SCREEN.
function showFinalScreen() {
	winSound.play();
	backgroundMusic.pause();
	congratsMessage.style.display = "block";
	finalScreen.style.display = "flex";
	gameOverScreen.style.display = "none";
	gameContainer.style.display = "none";
}

// THIS FUNCTION SHOWS THE GAME OVER SCREEN WHEN TRIGGERED.
// IT HIDES OTHER SCREENS AND DISPLAYS THE GAME OVER SCREEN.
function showGameOverScreen() {
	gameOverMessage.style.display = "block";
	finalScreen.style.display = "none";
	gameOverScreen.style.display = "flex";
	gameContainer.style.display = "none";
}

// THIS FUNCTION RESETS THE GAME STATE TO ITS INITIAL VALUES.
// IT RESETS ENERGY, KNOWLEDGE, MOTIVATION, STRESS, AND LEVEL TO DEFAULTS.
// PAUSES MAIN GAME AUDIO AND PLAYS  SAVES THE RESET STATE TO LOCAL STORAGE.
// IT UPDATES THE LEVEL DISPLAY, HIDES END SCREENS, SHOWS THE GAME AGAIN,
// ENABLES ALL ACTION BUTTONS, AND CALLS updateStats() TO REFLECT THE CHANGES.
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
	updateStats();
}

//  WHEN CLICKED TOGGLES THE APP'S BACKGROUND MUSIC
// UPDATES THE ICON TO SHOW MUTE OR VOLUME ICON, AND TEXT OFF/ON FOR MORE CLARITY IN UI

const musicToggle = document.getElementById("toggleMusic");
const musicIcon = musicToggle.querySelector("i");
const musicText = musicToggle.querySelector(".musicText");

musicToggle.addEventListener("click", () => {
	if (backgroundMusic.paused) {
		backgroundMusic.play();
		musicText.textContent = "On";
		musicIcon.classList.remove("fa-volume-mute");
		musicIcon.classList.add("fa-volume-up");
	} else {
		backgroundMusic.pause();
		musicText.textContent = "Off";
		musicIcon.classList.remove("fa-volume-up");
		musicIcon.classList.add("fa-volume-mute");
	}
});

//  WHEN CLICKED TOGGLES WIN MUSIC ON AND OFF
// UPDATES THE ICON TO SHOW MUTE OR VOLUME ICON,AND TEXT OFF/ON FOR MORE CLARITY IN UI
const winSoundToggle = document.getElementById("toggleWinSound");
const winSoundIcon = document.getElementById("winScreenIcon");
const winSoundText = winSoundToggle.querySelector(".musicText");

if (winSoundToggle) {
	winSoundToggle.addEventListener("click", () => {
		if (winSound.paused) {
			winSound.play();
			winSoundText.textContent = "On";
			winSoundIcon.classList.remove("fa-volume-mute");
			winSoundIcon.classList.add("fa-volume-up");
		} else {
			winSound.pause();
			winSoundText.textContent = "Off";
			winSoundIcon.classList.remove("fa-volume-up");
			winSoundIcon.classList.add("fa-volume-mute");
		}
	});
}

//  WHEN CLICKED TOGGLES LOSE MUSIC ON AND OFF
// UPDATES THE ICON TO SHOW MUTE OR VOLUME ICON, AND TEXT OFF/ON FOR MORE CLARITY IN UI
const loseSoundToggle = document.getElementById("gameOverSoundToggle");
const loseSoundIcon = document.getElementById("loseScreenIcon");
const loseSoundText = loseSoundToggle.querySelector(".musicText");

if (loseSoundToggle) {
	loseSoundToggle.addEventListener("click", () => {
		if (gameOverSound.paused) {
			gameOverSound.play();
			gameOverBackground.play();
			loseSoundText.textContent = "On";
			loseSoundIcon.classList.remove("fa-volume-mute");
			loseSoundIcon.classList.add("fa-volume-up");
		} else {
			gameOverSound.pause();
			gameOverBackground.pause();
			loseSoundText.textContent = "Off";
			loseSoundIcon.classList.remove("fa-volume-up");
			loseSoundIcon.classList.add("fa-volume-mute");
		}
	});
}

//EVENT LISTENERS FOR BUTTONS FOR GAME ACTIONS AND CONTROLS
document.getElementById("code").addEventListener("click", code);
document.getElementById("study").addEventListener("click", study);
document.getElementById("debug").addEventListener("click", debug);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("break").addEventListener("click", takeBreak);
document.getElementById("freeTime").addEventListener("click", freeTimeActivity);
resetButton.addEventListener("click", resetGame);
tryAgainButton.addEventListener("click", resetGame);

export { gameState, level, showDevMessage, updateStats, actionButtons };
