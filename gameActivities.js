import {
	gameState,
	level,
	updateStats,
	showDevMessage,
	actionButtons,
} from "./gameLogic.js";
import { btnSound } from "./audio.js";

// THIS FUNCTION HANDLES THE code() FUNCTION.
// CHECKS IF THE DEV HAS ENERGY TO CODE.
// DECREASES THE DEV'S ENERGY.
// INCREASES THE DEV'S KNOWLEDGE IF NOT AT THE FINAL LEVEL.
// INTRODUCES A RANDOM CHANCE TO INCREASE STRESS.
// DISPLAYS WARNING MESSAGES IF ENERGY LEVELS ARE LOW.
// IF  ENERGY IS BELOW 0 GAME ENDS(game over screen will show)
// UPDATES THE GAME STATISTICS.
// PLAYS A SOUND ON BUTTON CLICK
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL BEFORE PROCEEDING.
function code() {
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

		// if (gameState.energy <= 0) {
		// 	gameState.energy = 0;
		// 	gameState.motivation -= 100;
		// 	gameState.stress += 100;
		// 	updateStats();
		// }
	}
}
// THIS FUNCTION HANDLES THE study() FUNCTION
// DECREASES THE DEV'S ENERGY AND INCREASES THEIR MOTIVATION.
// RANDOMLY DETERMINES IF STUDYING IS CHALLENGING OR EFFECTIVE.
// DISPLAYS A UI MESSAGE BASED ON THE STUDYING OUTCOME, AFFECTING STRESS AND MOTIVATION (NEGATIVELY) OR KNOWLEDGE (POSITIVELY).
// UPDATES THE GAME STATISTICS.
// PLAYS A SOUND ON BUTTON CLICK
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL BEFORE PROCEEDING.

function study() {
	// gameStarted = true;
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

// THIS FUNCTION SIMULATES THE DEV DEBUGGING CODE.
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL AND EXITS IF SO.
// DECREASES THE DEV'S ENERGY AND INCREASES THEIR STRESS.
// RANDOMLY DETERMINES IF DEBUGGING IS SUCCESSFUL OR NOT.
// DISPLAYS A UI MESSAGE BASED ON THE DEBUGGING OUTCOME, AFFECTING MOTIVATION AND POTENTIALLY STRESS.
// PLAYS A SOUND ON BUTTON CLICK
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL BEFORE PROCEEDING.

function debug() {
	// gameStarted = true;
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
// THIS FUNCTION HANDLES THE  takeBreak() FUNCTION
// DISPLAYS A UI MESSAGE INDICATING THE START OF THE BREAK.
// DISABLES ALL ACTION BUTTONS AT THE START OF THE BREAK, AS TO REALLY SIMULATE HAVING A BREAK/PAUSING
// USES AN INTERVAL TO PERIODICALLY(every 3 seconds) INCREASE ENERGY AND DECREASE STRESS.
// UPDATES THE UI STATS DURING THE BREAK.
// CHECKS IF ENERGY LEVEL IS SUFFICIENT OR STRESS IS DECREASED ENOUGH TO END THE BREAK.
// RE-ENABLES ACTION BUTTONS AND DISPLAYS A UI MESSAGE INDICATING THE BREAK IS OVER.
// CLEARS THE INTERVAL WHEN THE BREAK CONDITIONS ARE MET.
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
			console.log(gameState.energy);
			actionButtons.forEach((btn) => {
				btn.disabled = false;
			});
			showDevMessage("Break over! I'm feeling rested and full of ideas!");

			clearInterval(breakInterval);
		}
	}, 2000);
}

// THIS FUNCTION SIMULATES THE DEVELOPER SLEEPING.
// SETS THE DEV'S ENERGY TO MAX(100) AND SIGNIFICANTLY REDUCES THEIR STRESS LEVEL (-50).
// DISPLAYS A UI MESSAGE AND UPDATES THE GAME STATISTICS.
// PLAYS A SOUND ON BUTTON CLICK
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL BEFORE PROCEEDING.
function sleep() {
	// gameStarted = true;
	if (level.knowledgeLevel === 4) return;
	btnSound.play();

	gameState.energy = 100;
	gameState.stress -= 50;
	showDevMessage("Zzz...Taking a nap... don't deploy anything without me!");
	updateStats();
}

// THIS FUNCTION HANDLES THE FREE TIME ACTIVITY.
// RANDOMLY CHOOSES BETWEEN NETWORKING, EXERCISE, OR A SIDE PROJECT.
// DISPLAYS A UI MESSAGE WITH THE RANDOMLY SELECTED ACTIVITY
// EACH ACTIVITY HAS DIFFERENT EFFECTS ON THE DEV'S STATS (KNOWLEDGE, STRESS, ENERGY, MOTIVATION).
// PLAYS A SOUND ON BUTTON CLICK
// CHECKS IF THE DEV HAS REACHED THE FINAL LEVEL BEFORE PROCEEDING.
function freeTimeActivity() {
	// gameStarted = true;
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

export { code, study, debug, takeBreak, sleep, freeTimeActivity };
