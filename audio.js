// ALL THE SOUNDS FOR THE APP
const backgroundMusic = new Audio("./audio/Cuddle Clouds.wav");
const gameOverSound = new Audio("./audio/gameOver.mp3");
const gameOverBackground = new Audio("./audio/gameboy-sad.wav");
const winSound = new Audio("./audio/Fanfare_1.wav");
const btnSound = new Audio("./audio/tamagotchi-btn.wav");
const levelUpSound = new Audio("./audio/tama-powerup.wav");
backgroundMusic.loop = true;
backgroundMusic.volume = 1.0;
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
