var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

// Images
var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = 'img/bird.png';
bg.src = 'img/bg.png';
fg.src = 'img/fg.png';
pipeUp.src = 'img/pipeUp.png';
pipeBottom.src = 'img/pipeBottom.png';

// Audio
var fly = new Audio();
var scoreAudio = new Audio();

fly.src = 'audio/fly.mp3';
scoreAudio.src = 'audio/score.mp3';

// distance between blocks
var gap = 90; 

// Press any key
document.addEventListener('keydown', moveUp);

//Bird up animation
function moveUp(argument) {
 	yPos -= 25;
 	fly.play();
};

//Create blocks
var pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
};

// Count
var score = 0;

// bird position
var xPos = 10;
var yPos = 150;
var grav = 1.5; // step


// Draw canvas
function draw() {

	ctx.drawImage(bg, 0, 0);

	//Draw blocks
	for(var i = 0; i < pipe.length; i++) {
	 ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
	 ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

	 pipe[i].x--;

	 if(pipe[i].x == 125) {
 		pipe.push({
 			x : cvs.width,
			y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
 		});
	 }

	 // tracking touches
	 if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
	 	location.reload()
	 }

	 if(pipe[i].x == 5){
	 	score++;
	 	scoreAudio.play();
	 }
	}

	//Draw images	

	ctx.drawImage(fg, 0, cvs.height - fg.height);
	ctx.drawImage(bird, xPos, yPos); 


	yPos += grav; // gravitation

	ctx.fillStyle = "#000";
	ctx.font = "24px Arial";
	ctx.fillText("Count: " + score, 10, cvs.height - 20);


	requestAnimationFrame(draw); // bird animation
};


pipeBottom.onload = draw;  // Draw canvas after download last image