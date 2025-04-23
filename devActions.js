import { level, gameState } from "./js/gameLogic";
// PERFORM THE "CODE" ACTION, DECREASE ENERGY, GAIN KNOWLEDGE, COULD INCREASE STRESS
function code() {
	if (level.knowledgeLevel === 4) return;

	if (gameState.energy > 0) {
		gameState.energy -= 10;
		if (level.knowledgeLevel < 4) {
			gameState.knowledge += 2;
		}

		// 10% CHANCE TO ENCOUNTER A BUG THAT ADDS STRESS
		if (Math.random() < 0.1) {
			// alert("You encountered a bug!");
			console.log("You encountered a bug!");
			gameState.stress += 15;
		}

		updateStats();

		// IF ENERGY DROPS BELOW 30, SHOW A WARNING
		if (gameState.energy < 30) {
			// alert("Your dev is getting tired");
			console.log("Your dev is getting tired");
		}

		// IF ENERGY HITS ZERO OR BELOW, DEV PET IS BURNED OUT, GAME OVER
		if (gameState.energy <= 0) {
			gameState.energy = 0;
			gameState.motivation -= 100;
			gameState.stress += 100;
			updateStats();
		}
	}
}
// PERFORM THE "STUDY" ACTION, DECREASE ENERGY SLIGHTLY, INCREASE KNOWLEDGE, COULD CAUSE A BIT OF  STRESS
function study() {
	if (level.knowledgeLevel === 4) return;

	gameState.energy -= 5;
	gameState.motivation += 10;

	// 20% CHANCE TO HIT A HARD TOPIC
	if (Math.random() < 0.2) {
		// alert("You encountered a confusing concept you could not quite grasp!");
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

// PERFORM THE "DEBUG" ACTION, MODERATE STRESS RISK, MOTIVATION CHANGES BASED ON SUCCESS/FAILURE
function debug() {
	if (level.knowledgeLevel === 4) return;

	gameState.energy -= 5;
	gameState.stress += 5;

	// 20% CHANCE TO FIX THE BUG, ELSE GET FRUSTRATED
	if (Math.random() < 0.2) {
		// alert("You fixed the bug!");
		console.log("You fixed the bug!");
		gameState.motivation += 10;
	} else {
		// alert("Your code has crashed!");
		console.log("Your code has crashed!");
		gameState.motivation -= 20;
		gameState.stress += 10;
	}

	updateStats();
}

// START A "BREAK" LOOP THAT REGAINS ENERGY OVER TIME AND REDUCES STRESS
function takeBreak() {
	if (level.knowledgeLevel === 4) return;

	if (gameState.energy < 100) gameState.energy += 20;
	if (gameState.stress > 0) gameState.stress -= 2;
	updateStats();

	// ONCE DEV IS WELL RESTED AND CALM, END THE BREAK
	if (gameState.energy >= 70 && gameState.stress <= 30) {
		console.log("Break over! Your dev is feeling rested.");
	}
	// RUNS EVERY SECOND
}

// "SLEEP" FULLY RESTORES ENERGY AND REDUCES STRESS SIGNIFICANTLY
function sleep() {
	gameState.energy = 100;
	gameState.stress -= 80;
	updateStats();
}

// RANDOMLY SELECT A FREE TIME ACTIVITY THAT CHANGES GAME STATS
function freeTimeActivity() {
	if (level.knowledgeLevel === 4) return;

	const activities = ["Networking", "Exercise", "Side project"];
	const activity = activities[Math.floor(Math.random() * activities.length)];

	if (activity === "Networking") {
		gameState.knowledge += 50;
		console.log("You are at a networking event.");
		// alert("You are at a networking event.Gaining vital knowledge");
		console.log("You are at a networking event.Gaining vital knowledge");
	} else if (activity === "Exercise") {
		gameState.stress -= 10;
		gameState.energy += 50;
		console.log("You're doing some yoga. Recharging your body and mind.");
		// alert("You're doing some yoga. Recharging your body and mind.");
	} else {
		gameState.stress += 10;
		gameState.motivation += 50;
		console.log(
			"You are working on your side project.Your motivation is peaking"
		);
		// alert("You are working on your side project.Your motivation is peaking");
	}

	updateStats();
}

// CONNECT BUTTON CLICKS TO THE CORRESPONDING ACTION FUNCTIONS
document.getElementById("code").addEventListener("click", code);
document.getElementById("study").addEventListener("click", study);
document.getElementById("debug").addEventListener("click", debug);
document.getElementById("sleep").addEventListener("click", sleep);
document.getElementById("break").addEventListener("click", takeBreak);
document.getElementById("freeTime").addEventListener("click", freeTimeActivity);
