//APP SOUNDS
const backgroundMusic = new Audio("./audio/Cuddle Clouds.wav");
backgroundMusic.loop = true;
backgroundMusic.volume = 1.0;
let gameOverSound = new Audio("./audio/gameOver.mp3");
let gameOverBackground = new Audio("./audio/gameboy-sad.wav");
let winSound = new Audio("./audio/Fanfare_1.wav");
const btnSound = new Audio("./audio/tamagotchi-btn.wav");
const levelUpSound = new Audio("./audio/tama-powerup.wav");
levelUpSound.volume = 0.3;
gameOverSound.volume = 0.3;
gameOverBackground.volume = 0.3;

export {
	backgroundMusic,
	gameOverSound,
	gameOverBackground,
	winSound,
	btnSound,
	levelUpSound,
};
