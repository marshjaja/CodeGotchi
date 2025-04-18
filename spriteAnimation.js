import { gameState } from "./gameLogic.js";

// GET THE 2D DRAWING CONTEXT FROM THE CANVAS ELEMENT FOR RENDERING GRAPHICS
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

//
context.imageSmoothingEnabled = false;

// LOAD BACKGROUND AND SPRITE SHEET IMAGES FROM FILE PATHS
const background = new Image();
background.src = "./images/tamagotchi-pixel-purple.png";
const spriteSheet = new Image();
// spriteSheet.src = "./status-4sheet.png";
spriteSheet.src = "./images/piskel-dev.png";

// DEFINE SPRITE (FRAME) SIZE, ANIMATION SPEED, TOTAL FRAMES, AND CURRENT FRAME INDEX
const spriteWidth = 256;
const spriteHeight = 256;
const animationSpeed = 1000;
const totalFrames = 4;
let currentFrame = 0;

// DEFINE MOOD ROWS IN THE SPRITE SHEET
const stateRows = {
	happy: 0,
	tired: 1,
	burned: 2,
};
let currentState = "happy";

// UPDATE THE SPRITE STATE BASED ON ENERGY LEVEL
function updateSpriteState() {
	if (gameState.energy >= 60) {
		currentState = "happy";
	} else if (gameState.energy > 0) {
		currentState = "tired";
	} else {
		currentState = "burned";
	}
}

// DRAW A SINGLE FRAME FROM THE SPRITE SHEET, USING THE CORRECT MOOD ROW
function drawFrame(frameIndex) {
	const sourceX = frameIndex * spriteWidth;
	const sourceY = stateRows[currentState] * spriteHeight; // USE CURRENT MOOD

	const drawX = (canvas.width - spriteWidth) / 2;
	const drawY = (canvas.height - spriteHeight) / 2 - 10;

	// CLEAR THE CANVAS
	context.clearRect(0, 0, canvas.width, canvas.height);
	// DRAW THE STATIC BACKGROUND
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
	// DRAW THE SPRITE FRAME
	context.drawImage(
		spriteSheet,
		sourceX,
		sourceY,
		spriteWidth,
		spriteHeight,
		drawX,
		drawY,
		spriteWidth,
		spriteHeight
	);
	// // DRAW A RED OUTLINE AROUND THE SPRITE (FOR DEBUGGING)
	// context.strokeStyle = "red";
	// context.strokeRect(drawX, drawY, spriteWidth, spriteHeight);
}

// UPDATE THE CURRENT FRAME INDEX FOR THE ANIMATION
function updateAnimation() {
	currentFrame = (currentFrame + 1) % totalFrames;
}

// THE MAIN ANIMATION LOOP: UPDATES THE SPRITE STATE AND DRAWS THE FRAME
function gameLoop() {
	updateSpriteState(); // UPDATE MOOD BASED ON ENERGY
	drawFrame(currentFrame);
	requestAnimationFrame(gameLoop);
}

// START THE ANIMATION LOOP AFTER THE SPRITE SHEET HAS LOADED
spriteSheet.onload = () => {
	setInterval(updateAnimation, animationSpeed);
	gameLoop();
};

export { gameLoop };

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
