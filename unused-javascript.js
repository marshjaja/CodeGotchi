// function storeUserName() {
// 	const userInput = document.getElementById("userInput").value;
// 	console.log("User name is:", userInput);
// 	gameState.DEVNAME = userInput;
// 	localStorage.setItem("user-name", userInput);
// 	document.getElementById("hello").innerHTML = `Hi ${userInput}!`; // ✅ FIXED
// }

// // Then attach it to the button:
// document.getElementById("submitBtn").addEventListener("click", storeUserName);

// let userName = localStorage.getItem("user-name");
// if (userName) {
// 	document.getElementById("hello").innerHTML = `Welcome back ${userName}!`;
// }
// // RENAME FUNCTION
// function renameUser() {
// 	localStorage.removeItem("user-name");
// 	gameState.DEVNAME = "";
// 	document.getElementById("hello").innerHTML =
// 		// "What would you like to name your Dev?";
// 		"Every great Dev needs a name. What’s yours?";
// 	document.getElementById("userInput").value = "";
// }

// ATTACH THE FUNCTION TO THE RENAME BUTTON
// document.getElementById("renameBtn").addEventListener("click", renameUser);

// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");

// let gameState = {
// 	devName: "",
// 	energy: 100,
// 	knowledge: 0,
// 	motivation: 100,
// 	stress: 0,
// };

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

// 	// gameState.energy = Math.max(0, Math.min(100, gameState.energy));
// 	// gameState.knowledge = Math.max(0, gameState.knowledge);
// 	// gameState.motivation = Math.max(0, Math.min(100, gameState.motivation));
// 	// gameState.stress = Math.max(0, Math.min(100, gameState.stress));

// 	document.getElementById("energy").value = gameState.energy;
// 	document.getElementById("knowledge").value = gameState.knowledge;
// 	document.getElementById("motivation").value = gameState.motivation;
// 	document.getElementById("stress").value = gameState.stress;
// }
// function code() {
// 	if (gameState.energy > 0) {
// 		gameState.energy -= 10;
// 		gameState.knowledge += 2;
// 		if (Math.random() < 0.1) {
// 			alert("You bug encountered a bug");
// 			gameState.stress += 15;
// 		}
// 		updateStats();
// 		if (gameState.energy < 30) {
// 			console.log("Your dev is getting tired");
// 		}
// 		if (gameState.energy <= 0) {
// 			console.log("Your dev is burned out game over");
// 			gameState.energy = 0;
// 			gameState.motivation -= 100;
// 			gameState.stress += 100;
// 			updateStats();
// 		}
// 	}
// }

// function study() {
// 	gameState.energy -= 5;

// 	if (Math.random() < 0.1) {
// 		alert("You encountered a concept you couldn't quite grasp");
// 		gameState.stress += 10;
// 		gameState.motivation -= 10;
// 	} else {
// 		gameState.knowledge += 7;
// 	}

// 	updateStats();
// }

// function debug() {
// 	gameState.energy -= 5;
// 	gameState.stress += 5;

// 	if (Math.random() < 0.2) {
// 		gameState.motivation += 10;
// 		alert("Bug fixed!");
// 	} else {
// 		gameState.motivation -= 5;
// 		alert("Code crashed!");
// 		gameState.stress += 10;
// 	}
// 	updateStats();
// }

// function takeBreak() {
// 	let breakInterval = setInterval(() => {
// 		if (gameState.energy < 100) {
// 			gameState.energy += 20;
// 		}
// 		if (gameState.stress > 0) {
// 			gameState.stress -= 2;
// 		}
// 		updateStats();

// 		if (gameState.energy >= 70 && gameState.stress <= 30) {
// 			console.log(gameState.energy);
// 			console.log("Break over! Your dev is feeling rested and full of ideas!");
// 			clearInterval(breakInterval);
// 		}
// 	}, 1000);
// }

// function sleep() {
// 	gameState.energy = 100;
// 	gameState.stress -= 80;
// 	updateStats();
// }

// function snack() {}

// function freeTimeActivity() {
// 	const activities = ["Networking", "Exercise", "Side project"];
// 	const activity = activities[Math.floor(Math.random() * activities.length)];

// 	if (activity === "Networking") {
// 		gameState.knowledge += 50;
// 		console.log("You are at a networking event");
// 	} else if (activity === "Exercise") {
// 		gameState.stress -= 10;
// 		gameState.energy += 50;

// 		console.log("You are enjoying some hot Yoga");
// 	} else {
// 		gameState.stress += 10;
// 		gameState.motivation += 50;
// 		console.log("You are working on your side project");
// 	}
// 	updateStats();
// }

// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ###################⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️  SQUARE SCREEN BACKGROUND  ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️###################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################

// import { gameState } from "./script.js";

// // GET THE 2D DRAWING CONTEXT FROM THE CANVAS ELEMENT FOR RENDERING GRAPHICS
// const canvas = document.getElementById("gameCanvas");
// const context = canvas.getContext("2d");

// //
// context.imageSmoothingEnabled = false;

// // LOAD BACKGROUND AND SPRITE SHEET IMAGES FROM FILE PATHS
// const background = new Image();
// background.src = "./pixel-art-bg.png";
// const spriteSheet = new Image();
// spriteSheet.src = "./status-4sheet.png";

// // DEFINE SPRITE (FRAME) SIZE, ANIMATION SPEED, TOTAL FRAMES, AND CURRENT FRAME INDEX
// const spriteWidth = 256;
// const spriteHeight = 256;
// const animationSpeed = 1000;
// const totalFrames = 4;
// let currentFrame = 0;

// // DEFINE MOOD ROWS IN THE SPRITE SHEET
// const stateRows = {
// 	happy: 0,
// 	tired: 1,
// 	burned: 2,
// };
// let currentState = "happy";

// // UPDATE THE SPRITE STATE BASED ON ENERGY LEVEL
// function updateSpriteState() {
// 	if (gameState.energy >= 60) {
// 		currentState = "happy";
// 	} else if (gameState.energy > 0) {
// 		currentState = "tired";
// 	} else {
// 		currentState = "burned";
// 	}
// }

// // DRAW A SINGLE FRAME FROM THE SPRITE SHEET, USING THE CORRECT MOOD ROW
// function drawFrame(frameIndex) {
// 	const sourceX = frameIndex * spriteWidth;
// 	const sourceY = stateRows[currentState] * spriteHeight; // USE CURRENT MOOD

// 	const drawX = (canvas.width - spriteWidth) / 2;
// 	const drawY = (canvas.height - spriteHeight) / 2 - 40;

// 	// CLEAR THE CANVAS
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	// DRAW THE STATIC BACKGROUND
// 	context.drawImage(background, 0, 0, canvas.width, canvas.height);
// 	// DRAW THE SPRITE FRAME
// 	context.drawImage(
// 		spriteSheet,
// 		sourceX,
// 		sourceY,
// 		spriteWidth,
// 		spriteHeight,
// 		drawX,
// 		drawY,
// 		spriteWidth,
// 		spriteHeight
// 	);
// 	// OUTLINE FOR TESTING
// 	// context.strokeStyle = "red";
// 	// context.strokeRect(drawX, drawY, spriteWidth, spriteHeight);
// }

// // UPDATE THE CURRENT FRAME INDEX FOR THE ANIMATION
// function updateAnimation() {
// 	currentFrame = (currentFrame + 1) % totalFrames;
// }

// // THE MAIN ANIMATION LOOP: UPDATES THE SPRITE STATE AND DRAWS THE FRAME
// function gameLoop() {
// 	updateSpriteState(); // UPDATE MOOD BASED ON ENERGY
// 	drawFrame(currentFrame);
// 	requestAnimationFrame(gameLoop);
// }

// // START THE ANIMATION LOOP AFTER THE SPRITE SHEET HAS LOADED
// spriteSheet.onload = () => {
// 	setInterval(updateAnimation, animationSpeed);
// 	gameLoop();
// };

// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ###################⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️   SQUARE SCREEN BACKGROUND ⬆️⬆️⬆️⬆️⬆️⬆️⬆️⬆️###################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################

// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ##########################   OLDER UNCLEAR IMAGE CODE NO BG BELOW  #########################
// ############################################################################################
// ############################################################################################
// ############################################################################################
// ############################################################################################

// const canvas = document.getElementById("gameCanvas");
// const context = canvas.getContext("2d");

// const spriteSheet = new Image();
// spriteSheet.src = "./pixel-art-3.png";

// const spriteWidth = 256;
// const spriteHeight = 256;
// const animationSpeed = 200; // milliseconds
// const totalFrames = 4;

// const stateRows = {
// 	happy: 0,
// 	content: 1,
// 	neutral: 2,
// 	sad: 3,
// 	burned: 4,
// };

// const pet = {
// 	x: 0,
// 	y: 0,
// 	energy: 100,
// 	state: "neutral",
// 	frame: 0,

// 	updateState() {
// 		const prevState = this.state;

// 		if (this.energy >= 75) {
// 			this.state = "happy";
// 		} else if (this.energy >= 50) {
// 			this.state = "content";
// 		} else if (this.energy >= 25) {
// 			this.state = "neutral";
// 		} else {
// 			this.state = "burned";
// 		}

// 		// Only reset frame if the state actually changed
// 		if (this.state !== prevState) {
// 			this.frame = 0;
// 		}
// 	},

// 	nextFrame() {
// 		this.frame = (this.frame + 1) % totalFrames;
// 	},

// 	draw(ctx) {
// 		const sourceX = this.frame * spriteWidth;
// 		const sourceY = stateRows[this.state] * spriteHeight;

// 		ctx.drawImage(
// 			spriteSheet,
// 			sourceX,
// 			sourceY,
// 			spriteWidth,
// 			spriteHeight,
// 			this.x,
// 			this.y,
// 			spriteWidth,
// 			spriteHeight
// 		);
// 	},
// };

// function updateAnimation() {
// 	pet.nextFrame();
// 	// console.log("Frame:", pet.frame);
// }

// function gameLoop() {
// 	context.clearRect(0, 0, canvas.width, canvas.height);
// 	pet.updateState();
// 	pet.draw(context);
// 	requestAnimationFrame(gameLoop);
// }

// spriteSheet.onload = () => {
// 	console.log("image loaded");
// 	setInterval(updateAnimation, animationSpeed);
// 	gameLoop();
// };
