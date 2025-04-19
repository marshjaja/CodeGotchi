// let gameOver = new Audio("./gameOver.mp3");
// const developerLevel = {
// 	0: "Beginner",
// 	1: "Junior Developer",
// 	2: "Mid-level Developer",
// 	3: "Senior Developer",
// 	4: "Head of Software",
// };
// let level = JSON.parse(localStorage.getItem("levelUp")) || {
// 	knowledgeLevel: 0,
// };
// const devTitle = developerLevel[level.knowledgeLevel];
// document.getElementById(
// 	"displayLevel"
// ).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

// // DEFINE PETDEV STATS AND THE GAME LOGIC
// let gameState = JSON.parse(localStorage.getItem("gameState")) || {
// 	DEVNAME: "", // HAVE USER SET NAME LATER AND STORE IN LOCAL STORAGE
// 	energy: 100, // STARTING ENERGY LEVEL
// 	knowledge: 0, // STARTING KNOWLEDGE LEVEL
// 	motivation: 100, // STARTING MOTIVATION LEVEL
// 	stress: 0, // STARTING STRESS LEVEL
// };
// updateStats();

// // ENSURE ALL VALUES STAY WITHIN THEIR MIN/MAX LIMITS,USE MIN()/MAX() FUNCTIONS LATER
// function updateStats() {
// 	if (level.knowledgeLevel === 4) {
// 		gameState.energy = 100;
// 		gameState.knowledge = 100;
// 		gameState.motivation = 100;
// 		gameState.stress = 0;
// 	}

// 	if (gameState.energy > 100) {
// 		gameState.energy = 100;
// 	}
// 	if (gameState.energy < 0) {
// 		gameState.energy = 0;
// 	}
// 	if (gameState.knowledge < 0) {
// 		gameState.knowledge = 0;
// 	}
// 	if (gameState.motivation > 100) {
// 		gameState.motivation = 100;
// 	}
// 	if (gameState.motivation < 0) {
// 		gameState.motivation = 0;
// 	}
// 	if (gameState.stress > 100) {
// 		gameState.stress = 100;
// 	}
// 	if (gameState.stress < 0) {
// 		gameState.stress = 0;
// 	}

// 	//  UPDATE THE GAMESTATES VALUES IN THE HTML PROGRESS BARS

// 	document.getElementById("knowledge").value = gameState.knowledge;
// 	document.getElementById("energy").value = gameState.energy;
// 	document.getElementById("motivation").value = gameState.motivation;
// 	document.getElementById("stress").value = gameState.stress;

// 	const energyFill = document.getElementById("energyFill");
// 	energyFill.style.width = `${gameState.energy}%`;
// 	updateBarColor(energyFill, gameState.energy);

// 	const knowledgeFill = document.getElementById("knowledgeFill");
// 	knowledgeFill.style.width = `${gameState.knowledge}%`;
// 	updateBarColor(knowledgeFill, gameState.knowledge);

// 	const motivationFill = document.getElementById("motivationFill");
// 	motivationFill.style.width = `${gameState.motivation}%`;
// 	updateBarColor(motivationFill, gameState.motivation);

// 	const stressFill = document.getElementById("stressFill");
// 	stressFill.style.width = `${gameState.stress}%`;
// 	updateBarColor(stressFill, gameState.stress);

// 	document.getElementById("energy").textContent = Math.min(
// 		gameState.energy,
// 		100
// 	);
// 	document.getElementById("knowledge").textContent = Math.min(
// 		gameState.knowledge,
// 		100
// 	);
// 	document.getElementById("motivation").textContent = Math.min(
// 		gameState.motivation,
// 		100
// 	);
// 	document.getElementById("stress").textContent = Math.min(
// 		gameState.stress,
// 		100
// 	);

// 	// console.log(`Your knowledge is: ${gameState.knowledge}`);
// 	// console.log(`Your energy is: ${gameState.energy}`);
// 	// console.log(`Your motivation is: ${gameState.motivation}`);
// 	// console.log(`Your stress level is: ${gameState.stress}`);
// 	console.log(`Your Dev level is: ${level.knowledgeLevel}`);
// 	//STTORE IN LOCALSTORAGE
// 	localStorage.setItem("gameState", JSON.stringify(gameState));

// 	if (gameState.energy <= 0) {
// 		gameOver.play();
// 	}
// 	if (gameState.knowledge >= 100) {
// 		levelUp();
// 		//RESET TO 0 IF HIGHTER THAN 100, MEANS LEVEL UP
// 		gameState.knowledge = 0;
// 	}
// }
// function updateBarColor(statBarColour, value) {
// 	statBarColour.classList.remove("low", "medium", "high");

// 	if (value >= 70) {
// 		statBarColour.classList.add("high");
// 	} else if (value >= 40) {
// 		statBarColour.classList.add("medium");
// 	} else {
// 		statBarColour.classList.add("low");
// 	}
// }
// function levelUp() {
// 	//LEVEL PLUS 1, CAN'T GO OVER HEAD OF SOFTWARE
// 	if (level.knowledgeLevel < 4) {
// 		level.knowledgeLevel += 1;
// 		localStorage.setItem("levelUp", JSON.stringify(level));
// 	}

// 	const devTitle = developerLevel[level.knowledgeLevel];
// 	document.getElementById(
// 		"displayLevel"
// 	).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

// 	if (level.knowledgeLevel === 4) {
// 		gameState.knowledge = 100;
// 		endGame();
// 		document.getElementById("finalScreen").style.display = "flex";
// 		document.querySelector(".game-container").style.display = "none";
// 	}
// }

// // PERFORM THE "CODE" ACTION, DECREASE ENERGY, GAIN KNOWLEDGE, COULD INCREASE STRESS
// function code() {
// 	if (level.knowledgeLevel === 4) return;

// 	if (gameState.energy > 0) {
// 		gameState.energy -= 10;
// 		if (level.knowledgeLevel < 4) {
// 			gameState.knowledge += 2;
// 		}

// 		// 10% CHANCE TO ENCOUNTER A BUG THAT ADDS STRESS
// 		if (Math.random() < 0.1) {
// 			// alert("You encountered a bug!");
// 			console.log("You encountered a bug!");
// 			gameState.stress += 15;
// 		}

// 		updateStats();

// 		// IF ENERGY DROPS BELOW 30, SHOW A WARNING
// 		if (gameState.energy < 30) {
// 			// alert("Your dev is getting tired");
// 			console.log("Your dev is getting tired");
// 		}

// 		// IF ENERGY HITS ZERO OR BELOW, DEV PET IS BURNED OUT, GAME OVER
// 		if (gameState.energy <= 0) {
// 			gameState.energy = 0;
// 			gameState.motivation -= 100;
// 			gameState.stress += 100;
// 			updateStats();
// 		}
// 	}
// }

// // PERFORM THE "STUDY" ACTION, DECREASE ENERGY SLIGHTLY, INCREASE KNOWLEDGE, COULD CAUSE A BIT OF  STRESS
// function study() {
// 	if (level.knowledgeLevel === 4) return;

// 	gameState.energy -= 5;
// 	gameState.motivation += 10;

// 	// 20% CHANCE TO HIT A HARD TOPIC
// 	if (Math.random() < 0.2) {
// 		// alert("You encountered a confusing concept you could not quite grasp!");
// 		console.log(
// 			"You encountered a confusing concept you could not quite grasp!"
// 		);
// 		gameState.stress += 10;
// 		gameState.motivation -= 30;
// 	} else {
// 		gameState.knowledge += 7;
// 	}

// 	updateStats();
// }

// // PERFORM THE "DEBUG" ACTION, MODERATE STRESS RISK, MOTIVATION CHANGES BASED ON SUCCESS/FAILURE
// function debug() {
// 	if (level.knowledgeLevel === 4) return;

// 	gameState.energy -= 5;
// 	gameState.stress += 5;

// 	// 20% CHANCE TO FIX THE BUG, ELSE GET FRUSTRATED
// 	if (Math.random() < 0.2) {
// 		// alert("You fixed the bug!");
// 		console.log("You fixed the bug!");
// 		gameState.motivation += 10;
// 	} else {
// 		// alert("Your code has crashed!");
// 		console.log("Your code has crashed!");
// 		gameState.motivation -= 20;
// 		gameState.stress += 10;
// 	}

// 	updateStats();
// }

// // START A "BREAK" LOOP THAT REGAINS ENERGY OVER TIME AND REDUCES STRESS
// function takeBreak() {
// 	if (level.knowledgeLevel === 4) return;

// 	if (gameState.energy < 100) gameState.energy += 20;
// 	if (gameState.stress > 0) gameState.stress -= 2;
// 	updateStats();

// 	// ONCE DEV IS WELL RESTED AND CALM, END THE BREAK
// 	if (gameState.energy >= 70 && gameState.stress <= 30) {
// 		console.log("Break over! Your dev is feeling rested.");
// 	}
// 	// RUNS EVERY SECOND
// }

// // "SLEEP" FULLY RESTORES ENERGY AND REDUCES STRESS SIGNIFICANTLY
// function sleep() {
// 	gameState.energy = 100;
// 	gameState.stress -= 80;
// 	updateStats();
// }

// // RANDOMLY SELECT A FREE TIME ACTIVITY THAT CHANGES GAME STATS
// function freeTimeActivity() {
// 	if (level.knowledgeLevel === 4) return;

// 	const activities = ["Networking", "Exercise", "Side project"];
// 	const activity = activities[Math.floor(Math.random() * activities.length)];

// 	if (activity === "Networking") {
// 		gameState.knowledge += 50;
// 		console.log("You are at a networking event.");
// 		// alert("You are at a networking event.Gaining vital knowledge");
// 		console.log("You are at a networking event.Gaining vital knowledge");
// 	} else if (activity === "Exercise") {
// 		gameState.stress -= 10;
// 		gameState.energy += 50;
// 		console.log("You're doing some yoga. Recharging your body and mind.");
// 		// alert("You're doing some yoga. Recharging your body and mind.");
// 	} else {
// 		gameState.stress += 10;
// 		gameState.motivation += 50;
// 		console.log(
// 			"You are working on your side project.Your motivation is peaking"
// 		);
// 		// alert("You are working on your side project.Your motivation is peaking");
// 	}

// 	updateStats();
// }

// // CONNECT BUTTON CLICKS TO THE CORRESPONDING ACTION FUNCTIONS
// document.getElementById("code").addEventListener("click", code);
// document.getElementById("study").addEventListener("click", study);
// document.getElementById("debug").addEventListener("click", debug);
// document.getElementById("sleep").addEventListener("click", sleep);
// document.getElementById("break").addEventListener("click", takeBreak);
// document.getElementById("freeTime").addEventListener("click", freeTimeActivity);

// //DISABLE BUTTONS AFTER RACHING LEVEL 4
// function endGame() {
// 	document.querySelectorAll("button.dev-activity").forEach((btn) => {
// 		btn.disabled = true;
// 	});
// 	document.getElementById("congratsMessage").textContent =
// 		"🎓 Your Dev has reached their final form: Head of Software!";
// }

// // EXPORT GAME STATE FOR USE IN THE SPRITE ANIMATION MODULE
// export { gameState };

// let gameOver = new Audio("./gameOver.mp3");
// const developerLevel = {
// 	0: "Beginner",
// 	1: "Junior Developer",
// 	2: "Mid-level Developer",
// 	3: "Senior Developer",
// 	4: "Head of Software",
// };
// let level = JSON.parse(localStorage.getItem("levelUp")) || {
// 	knowledgeLevel: 0,
// };
// const devTitle = developerLevel[level.knowledgeLevel];
// document.getElementById(
// 	"displayLevel"
// ).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

// // DEFINE PETDEV STATS AND THE GAME LOGIC
// let gameState = JSON.parse(localStorage.getItem("gameState")) || {
// 	DEVNAME: "",
// 	energy: 100,
// 	knowledge: 0,
// 	motivation: 100,
// 	stress: 0,
// };

// const energyBar = document.getElementById("energyFill");
// const knowledgeBar = document.getElementById("knowledgeFill");
// const motivationBar = document.getElementById("motivationFill");
// const stressBar = document.getElementById("stressFill");

// updateStats();

// function updateStats() {
// 	if (gameState.energy > 100) {
// 		gameState.energy = 100;
// 	}
// 	if (gameState.energy < 0) {
// 		gameState.energy = 0;
// 	}
// 	if (gameState.knowledge < 0) {
// 		gameState.knowledge = 0;
// 	}
// 	if (gameState.motivation > 100) {
// 		gameState.motivation = 100;
// 	}
// 	if (gameState.motivation < 0) {
// 		gameState.motivation = 0;
// 	}
// 	if (gameState.stress > 100) {
// 		gameState.stress = 100;
// 	}
// 	if (gameState.stress < 0) {
// 		gameState.stress = 0;
// 	}

// 	document.getElementById("knowledge").textContent = Math.min(
// 		gameState.knowledge,
// 		100
// 	);
// 	document.getElementById("energy").textContent = Math.min(
// 		gameState.energy,
// 		100
// 	);
// 	document.getElementById("motivation").textContent = Math.min(
// 		gameState.motivation,
// 		100
// 	);
// 	document.getElementById("stress").textContent = Math.min(
// 		gameState.stress,
// 		100
// 	);

// 	energyBar.style.width = `${gameState.energy}%`;
// 	updateBarColor(energyBar, gameState.energy);
// 	knowledgeBar.style.width = `${gameState.knowledge}%`;
// 	updateBarColor(knowledgeBar, gameState.knowledge);
// 	motivationBar.style.width = `${gameState.motivation}%`;
// 	updateBarColor(motivationBar, gameState.motivation);
// 	stressBar.style.width = `${gameState.stress}%`;
// 	updateBarColor(stressBar, gameState.stress);

// 	localStorage.setItem("gameState", JSON.stringify(gameState));

// 	if (gameState.energy <= 0) {
// 		gameOver.play();
// 		endGame();
// 	}
// 	if (gameState.knowledge >= 100) {
// 		levelUp();
// 		gameState.knowledge = 0;
// 	}
// }

// function updateBarColor(statBarColour, value) {
// 	statBarColour.classList.remove("low", "medium", "high");

// 	if (value >= 70) {
// 		statBarColour.classList.add("high");
// 	} else if (value >= 40) {
// 		statBarColour.classList.add("medium");
// 	} else {
// 		statBarColour.classList.add("low");
// 	}
// }

// function levelUp() {
// 	if (level.knowledgeLevel < 4) {
// 		level.knowledgeLevel += 1;
// 		localStorage.setItem("levelUp", JSON.stringify(level));
// 	}

// 	const devTitle = developerLevel[level.knowledgeLevel];
// 	document.getElementById(
// 		"displayLevel"
// 	).textContent = `Level: ${level.knowledgeLevel}, ${devTitle}`;

// 	if (level.knowledgeLevel === 4) {
// 		endGame();
// 	}
// }

// function code() {
// 	if (level.knowledgeLevel === 4) return;

// 	if (gameState.energy > 0) {
// 		gameState.energy -= 10;
// 		if (level.knowledgeLevel < 4) {
// 			gameState.knowledge += 2;
// 		}

// 		if (Math.random() < 0.1) {
// 			console.log("You encountered a bug!");
// 			gameState.stress += 15;
// 		}

// 		updateStats();

// 		if (gameState.energy < 30) {
// 			console.log("Your dev is getting tired");
// 		}

// 		if (gameState.energy <= 0) {
// 			gameState.energy = 0;
// 			gameState.motivation -= 100;
// 			gameState.stress += 100;
// 			updateStats();
// 			endGame();
// 		}
// 	}
// }

// function study() {
// 	if (level.knowledgeLevel === 4) return;

// 	gameState.energy -= 5;
// 	gameState.motivation += 10;

// 	if (Math.random() < 0.2) {
// 		console.log(
// 			"You encountered a confusing concept you could not quite grasp!"
// 		);
// 		gameState.stress += 10;
// 		gameState.motivation -= 30;
// 	} else {
// 		gameState.knowledge += 7;
// 	}

// 	updateStats();
// }

// function debug() {
// 	if (level.knowledgeLevel === 4) return;

// 	gameState.energy -= 5;
// 	gameState.stress += 5;

// 	if (Math.random() < 0.2) {
// 		console.log("You fixed the bug!");
// 		gameState.motivation += 10;
// 	} else {
// 		console.log("Your code has crashed!");
// 		gameState.motivation -= 20;
// 		gameState.stress += 10;
// 	}

// 	updateStats();
// }

// function takeBreak() {
// 	if (level.knowledgeLevel === 4) return;

// 	if (gameState.energy < 100) gameState.energy += 20;
// 	if (gameState.stress > 0) gameState.stress -= 2;
// 	updateStats();

// 	if (gameState.energy >= 70 && gameState.stress <= 30) {
// 		console.log("Break over! Your dev is feeling rested.");
// 	}
// }

// function sleep() {
// 	gameState.energy = 100;
// 	gameState.stress -= 80;
// 	updateStats();
// }

// function freeTimeActivity() {
// 	if (level.knowledgeLevel === 4) return;

// 	const activities = ["Networking", "Exercise", "Side project"];
// 	const activity = activities[Math.floor(Math.random() * activities.length)];

// 	if (activity === "Networking") {
// 		gameState.knowledge += 50;
// 		console.log("You are at a networking event.");
// 	} else if (activity === "Exercise") {
// 		gameState.stress -= 10;
// 		gameState.energy += 50;
// 		console.log("You're doing some yoga. Recharging your body and mind.");
// 	} else {
// 		gameState.stress += 10;
// 		gameState.motivation += 50;
// 		console.log(
// 			"You are working on your side project.Your motivation is peaking"
// 		);
// 	}

// 	updateStats();
// }

// const gameContainer = document.querySelector(".game-container");
// const finalScreen = document.getElementById("finalScreen");
// const resetButton = document.getElementById("resetButton");
// const congratsMessage = document.getElementById("congratsMessage");

// function endGame() {
// 	document.querySelectorAll("button.action-button").forEach((btn) => {
// 		btn.disabled = true;
// 	});
// 	document.getElementById("congratsMessage").textContent =
// 		"🎓 Your Dev has reached their final form: Head of Software!";
// 	finalScreen.style.display = "flex";
// 	gameContainer.style.display = "none";
// }

// function resetGame() {
// 	gameState.energy = 100;
// 	gameState.knowledge = 0;
// 	gameState.motivation = 100;
// 	gameState.stress = 0;
// 	level.knowledgeLevel = 0;

// 	localStorage.setItem("gameState", JSON.stringify(gameState));
// 	localStorage.setItem("levelUp", JSON.stringify(level));

// 	document.getElementById("displayLevel").textContent = `Level: ${
// 		level.knowledgeLevel
// 	}, ${developerLevel[level.knowledgeLevel]}`;
// 	congratsMessage.style.display = "none";
// 	finalScreen.style.display = "none";
// 	gameContainer.style.display = "flex";

// 	document.querySelectorAll("button.action-button").forEach((btn) => {
// 		btn.disabled = false;
// 	});
// 	updateStats();
// }

// document.getElementById("code").addEventListener("click", code);
// document.getElementById("study").addEventListener("click", study);
// document.getElementById("debug").addEventListener("click", debug);
// document.getElementById("sleep").addEventListener("click", sleep);
// document.getElementById("break").addEventListener("click", takeBreak);
// document.getElementById("freeTime").addEventListener("click", freeTimeActivity);
// resetButton.addEventListener("click", resetGame);
const gameContainer = document.querySelector(".game-container");
const finalScreen = document.getElementById("finalScreen");
const resetButton = document.getElementById("resetButton");
const gameOverScreen = document.getElementById("gameOverScreen");
const gameOverMessage = document.getElementById("gameOverMessage");

const tryAgainButton = document.getElementById("tryAgainButton");
const congratsMessage = document.getElementById("congratsMessage");
const actionButtons = document.querySelectorAll(".action-button");

let gameOver = new Audio("./gameOver.mp3");
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
		gameOver.play();
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

	if (level.knowledgeLevel === 4) {
		showFinalScreen();
	}
}

function code() {
	if (level.knowledgeLevel === 4) return;

	if (gameState.energy > 0) {
		gameState.energy -= 10;
		if (level.knowledgeLevel < 4) {
			gameState.knowledge += 2;
		}

		if (Math.random() < 0.1) {
			console.log("You encountered a bug!");
			gameState.stress += 15;
		}

		updateStats();

		if (gameState.energy < 30) {
			console.log("Your dev is getting tired");
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
	if (level.knowledgeLevel === 4) return;

	gameState.energy -= 5;
	gameState.motivation += 10;

	if (Math.random() < 0.2) {
		console.log(
			"You encountered a confusing concept you could not quite grasp!"
		);
		gameState.stress += 10;
		gameState.motivation -= 30;
	} else {
		gameState.knowledge += 7;
	}

	updateStats();
}

function debug() {
	if (level.knowledgeLevel === 4) return;

	gameState.energy -= 5;
	gameState.stress += 5;

	if (Math.random() < 0.2) {
		console.log("You fixed the bug!");
		gameState.motivation += 10;
	} else {
		console.log("Your code has crashed!");
		gameState.motivation -= 20;
		gameState.stress += 10;
	}

	updateStats();
}

function takeBreak() {
	if (level.knowledgeLevel === 4) return;

	if (gameState.energy < 100) gameState.energy += 20;
	if (gameState.stress > 0) gameState.stress -= 2;
	updateStats();

	if (gameState.energy >= 70 && gameState.stress <= 30) {
		console.log("Break over! Your dev is feeling rested.");
	}
}

function sleep() {
	gameState.energy = 100;
	gameState.stress -= 80;
	updateStats();
}

function freeTimeActivity() {
	if (level.knowledgeLevel === 4) return;

	const activities = ["Networking", "Exercise", "Side project"];
	const activity = activities[Math.floor(Math.random() * activities.length)];

	if (activity === "Networking") {
		gameState.knowledge += 50;
		console.log("You are at a networking event.");
	} else if (activity === "Exercise") {
		gameState.stress -= 10;
		gameState.energy += 50;
		console.log("You're doing some yoga. Recharging your body and mind.");
	} else {
		gameState.stress += 10;
		gameState.motivation += 50;
		console.log(
			"You are working on your side project.Your motivation is peaking"
		);
	}

	updateStats();
}

function showFinalScreen() {
	// actionButtons.forEach((btn) => {
	//     btn.disabled = true;
	// });
	congratsMessage.style.display = "block";
	finalScreen.style.display = "flex";
	gameOverScreen.style.display = "none";
	gameContainer.style.display = "none";
}

function showGameOverScreen() {
	// actionButtons.forEach((btn) => {
	//     btn.disabled = true;
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

	localStorage.setItem("gameState", JSON.stringify(gameState));
	localStorage.setItem("levelUp", JSON.stringify(level));

	document.getElementById("displayLevel").textContent = `Level: ${
		level.knowledgeLevel
	}, ${developerLevel[level.knowledgeLevel]}`;
	finalScreen.style.display = "none";
	gameOverScreen.style.display = "none";
	gameContainer.style.display = "flex";

	actionButtons.forEach((btn) => {
		btn.disabled = false;
	});
	updateStats();
}

document.getElementById("code").addEventListener("click", code);
document.getElementById("study").addEventListener("click", study);
document.getElementById("debug").addEventListener("click", debug);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("break").addEventListener("click", takeBreak);
document.getElementById("freeTime").addEventListener("click", freeTimeActivity);
resetButton.addEventListener("click", resetGame);
tryAgainButton.addEventListener("click", resetGame);
export { gameState };
