const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

// DISABLE IMAGE SMOOTHING TO KEEP PIXELS SHARP FOR RETRO/PIXEL ART STYLE
context.imageSmoothingEnabled = false;

// LOAD BACKGROUND AND SPRITE SHEET IMAGES FROM FILE PATHS
const background = new Image();
background.src = "./images/tamagotchi-pixel-purple.png";
const spriteSheet = new Image();
spriteSheet.src = "./images/piskel-dev.png";

// DEFINE SPRITE (FRAME) SIZE, ANIMATION SPEED, TOTAL FRAMES, AND CURRENT FRAME INDEX
const spriteWidth = 256;
const spriteHeight = 240;
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

// DRAWS A SINGLE FRAME FROM THE SPRITE ONTO THE CANVAS.
// IT CALCULATES WHICH PART OF THE SPRITE SHEET TO USE BASED ON THE CURRENT FRAME INDEX AND MOOD.
// DRAWS THE BACKGROUND, AND FINALLY DRAWS THE SPRITE CHARACTER.
function drawFrame(frameIndex) {
	// CALCULATES THE X POSITION TO SLICE THE CORRECT FRAME FROM THE SPRITE SHEET
	const sourceX = frameIndex * spriteWidth;

	// CALCULATES THE Y POSITION BASED ON THE CURRENT MOOD/STATE (HAPPY, TIRED, BURNED)
	const sourceY = stateRows[currentState] * spriteHeight;

	// CENTER THE SPRITE ON THE CANVAS HORIZONTALLY AND SLIGHTLY ABOVE CENTER VERTICALLY TO SIT WITHIN THE BACKGROUND SPRITE
	const drawX = (canvas.width - spriteWidth) / 2;
	const drawY = (canvas.height - spriteHeight) / 2 - 30;

	// CLEAR THE ENTIRE CANVAS BEFORE DRAWING THE NEXT FRAME
	context.clearRect(0, 0, canvas.width, canvas.height);

	// DRAW THE BACKGROUND IMAGE, STATIC BEHIND THE SPRITE
	context.drawImage(background, 0, 0, canvas.width, canvas.height);

	// DRAW THE SPRITE FRAME BY CALCULATING ITS POSITION IN THE SPRITE SHEET USING X AND Y COORDINATES, WIDTH, HEIGHT
	context.drawImage(
		spriteSheet,
		sourceX, // X POSITION IN SPRITE SHEET
		sourceY, // Y POSITION IN SPRITE SHEET
		spriteWidth, // WIDTH OF THE FRAME TO SLICE
		spriteHeight, // HEIGHT OF THE FRAME TO SLICE
		drawX, // X POSITION ON CANVAS
		drawY, // Y POSITION ON CANVAS
		spriteWidth, // WIDTH TO DRAW ON CANVAS
		spriteHeight // HEIGHT TO DRAW ON CANVAS
	);
}

// UPDATE THE CURRENT FRAME INDEX FOR THE ANIMATION
function updateAnimation() {
	currentFrame = (currentFrame + 1) % totalFrames;
}

// THE MAIN ANIMATION LOOP, UPDATES THE SPRITE FRAME AND DRAWS CURRENT FRAME
function gameLoop() {
	drawFrame(currentFrame);
	requestAnimationFrame(gameLoop);
}

// START THE ANIMATION AFTER THE SPRITE SHEET HAS LOADED
spriteSheet.onload = () => {
	setInterval(updateAnimation, animationSpeed);
	gameLoop();
};

export { gameLoop };
