var canvas = document.getElementById("pong_singleplayer_canvas");
var ctx = canvas.getContext("2d");

var level = 1;
var difficulty = Math.floor(level/5) + 1;
if (difficulty > 3){
	difficulty = 3;
}

var paddleWidth = 125;
var paddleX = (canvas.width - paddleWidth)/2;
var paddleColor = "black";
var paddleSpeed = difficulty*4;
var paddleStartAnimation = false;
var paddleStartAnimationP2 = false;
var angle = 0;
var angleInDegrees = 0;
var angleSpeed = 6;
var angleLevel = 0;
var randomStop = getRandomInteger(203, 215);
if (randomStop == 209){
	randomStop++;
}
var startGameOnlyOnce = true;
var leftPressed = false;
var rightPressed = false;
var paddleCounter = 0;

var ballFirstBounce = false;
var ballRadius = 15;
var ballColor = "black";
var x = canvas.width/2;
var y = -ballRadius;
var dx = 0;
var dy = 0;
var ballPoints = [];
for (var i=0; i<8; i++){
	ballPoints[i] = {x: 0, y: 0};
}
var speed = paddleSpeed/1.5;
var realAngle = 0;
var score = 0;

var bricksColors = ["green", "lightskyblue", "blue", "orange", "red"];
var bricksOffset = 60;
var brickWidth = 90;
var brickHeight = 20;
var brickY = 50;
var brickX = 60;
var brickColumnCount = 6;
var brickRowCount = 3;
var bricksCount = brickRowCount*brickColumnCount;
var bricks = [];
for (var c=0; c<brickColumnCount; c++){
	bricks[c] = [];
	for (var r=0; r<brickRowCount; r++){
		bricks[c][r] = {x: 0, y: 0, color: "green", hitpoints: Math.floor(Math.random() * (difficulty*3)), protected: false};
	}
}

var debug = false;
var debugChars = ["h", "a", "l", "l", "o"];
var debugInt = 0;
var debugMax = 5;
var stop = false;
var debugWin = false;

var drawBallVar = true;
var drawPaddleVar = true;
var drawBricksVar = true;
var drawScoreVar = true;

var protected = false;
var protectedRest = 5;

var gameStarted = false;

function reinitialiseVars() {
	bricksCount = brickRowCount*brickColumnCount;
	drawBallVar = true;
	drawPaddleVar = true;
	drawBricksVar = true;
	drawScoreVar = true;
	for (var c=0; c<brickColumnCount; c++){
		bricks[c] = [];
		for (var r=0; r<brickRowCount; r++){
			bricks[c][r] = {x: 0, y: 0, color: "green", hitpoints: Math.floor(Math.random() * (difficulty*3))};
		}
	}
	difficulty = Math.floor(level/5) + 1;
	if (difficulty > 3){
		difficulty = 3;
	}
	randomStop = getRandomInteger(203, 215);
	if (randomStop == 209){
		randomStop++;
	}
	startGameOnlyOnce = true;
	paddleCounter = 0;
	ballFirstBounce = false;
	x = canvas.width/2;
	y = -ballRadius;
	dx = 0;
	dy = 0;
	speed = paddleSpeed/2;
	gameStarted = false;
	angle = 0;
	angleInDegrees = 0;
	angleSpeed = 6;
	angleLevel = 0;
	realAngle = 0;
	paddleX = (canvas.width - paddleWidth)/2;
}

let interval = setInterval(drawGame, 10);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
drawPaddle();
drawBall();
drawBricks();
drawScore();

function startGame(){
	hideElement("pong_singleplayer_interact", true);
	paddleStartAnimation = true;
}

function drawGame(){
	if (gameStarted || paddleStartAnimationP2 || paddleStartAnimation){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		if (drawPaddleVar){
			drawPaddle();
		}
		if (drawBallVar){
			drawBall();
		}
		if (drawBricksVar){
			drawBricks();
		}
		if (drawScoreVar){
			drawScore();
		}
		protectedRest += -1;
		if (protectedRest == 0){
			protectedRest = 5;
			protected = false;
		}
	}
}

function drawPaddle(){
	if (debugWin){
		paddleX = x - paddleWidth/2;
		if (paddleX < 0){
			paddleX = 0;
		}
		if (paddleX > canvas.width - paddleWidth){
			paddleX = canvas.width - paddleWidth;
		}
	}
	if (!paddleStartAnimation && !paddleStartAnimationP2 && !gameStarted){
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - 80, paddleWidth, 20);
		ctx.fillStyle = paddleColor;
		ctx.fill();
		ctx.closePath();
	}
	if (paddleStartAnimation){
		ctx.save();
		ctx.translate(paddleX + paddleWidth/2, canvas.height - 70);
		ctx.rotate(angle*Math.PI/180);
		ctx.beginPath();
		ctx.rect(-paddleWidth/2, - 10, paddleWidth, 20);
		ctx.fillStyle = paddleColor;
		ctx.fill();
		ctx.closePath();
		ctx.restore();
		angle += angleSpeed;
		angleLevel++;
		if (angleLevel > randomStop - speed*4){
			if (!ballFirstBounce){
				ballFirstBounce = true;
				dy = speed;
			}
		}
		if (angleLevel > randomStop){
			angleSpeed = 0;
		}

	}else if (gameStarted) {
		if (rightPressed){
			paddleX += paddleSpeed;
			if (paddleX > canvas.width - paddleWidth){
				paddleX = canvas.width - paddleWidth;
			}
		}else if (leftPressed){
			paddleX += -paddleSpeed;
			if (paddleX < 0){
				paddleX = 0;
			}
		}
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height - 80, paddleWidth, 20);
		ctx.fillStyle = paddleColor;
		ctx.fill();
		ctx.closePath();
	}else if (paddleStartAnimationP2){
		realAngle = angle - 180*6;
		oneeightyatfirst = true;
		if (realAngle > 180){
			if (paddleCounter > 50){
				ctx.save();
				ctx.translate(paddleX + paddleWidth/2, canvas.height - 70);
				ctx.rotate(angle*Math.PI/180);
				ctx.beginPath();
				ctx.rect(-paddleWidth/2, - 10, paddleWidth, 20);
				ctx.fillStyle = paddleColor;
				ctx.fill();
				ctx.closePath();
				ctx.restore();
				angle--;
			}else{
				paddleCounter++;
				ctx.save();
				ctx.translate(paddleX + paddleWidth/2, canvas.height - 70);
				ctx.rotate(angle*Math.PI/180);
				ctx.beginPath();
				ctx.rect(-paddleWidth/2, - 10, paddleWidth, 20);
				ctx.fillStyle = paddleColor;
				ctx.fill();
				ctx.closePath();
				ctx.restore();
			}
		}else if (realAngle < 180){
			if (paddleCounter > 50){
				ctx.save();
				ctx.translate(paddleX + paddleWidth/2, canvas.height - 70);
				ctx.rotate(angle*Math.PI/180);
				ctx.beginPath();
				ctx.rect(-paddleWidth/2, - 10, paddleWidth, 20);
				ctx.fillStyle = paddleColor;
				ctx.fill();
				ctx.closePath();
				ctx.restore();
				angle++;
			}else{
				paddleCounter++;
				ctx.save();
				ctx.translate(paddleX + paddleWidth/2, canvas.height - 70);
				ctx.rotate(angle*Math.PI/180);
				ctx.beginPath();
				ctx.rect(-paddleWidth/2, - 10, paddleWidth, 20);
				ctx.fillStyle = paddleColor;
				ctx.fill();
				ctx.closePath();
				ctx.restore();
			}
		}else {
			paddleStartAnimationP2 = false;
			gameStarted = true;
			drawPaddle();
			console.log(gameStarted);
		}
	}
}

function drawBall(){
	ballPaddleCollisionDetection();
	ballBorderCollisionDetection();
	ballBricksCollisionDetection();
	y = y + dy;
	x = x + dx;
	ctx.beginPath();
  	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  	ctx.fillStyle = ballColor;
  	ctx.fill();
  	ctx.closePath();
  	calculateBallPositions();
}

function drawBricks(){
	for (var c=0; c<brickColumnCount; c++){
		for (var r=0; r<brickRowCount; r++){
			if (bricks[c][r].hitpoints >= 0){
				brickY = r*(brickHeight+bricksOffset)/2 + 50;
				brickX = c*(brickWidth+bricksOffset) + 60;
				bricks[c][r].y = brickY;
				bricks[c][r].x = brickX;
				bricks[c][r].color = bricksColors[bricks[c][r].hitpoints];
				ctx.beginPath();
				ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
				ctx.fillStyle = bricks[c][r].color;
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawScore(){
	ctx.font = "32px Arial";
	ctx.fillStyle = "chartreuse";
	ctx.fillText("Score: " + score, 8, 30);
}

function calculateBallPositions(){
	var slice = 2 * Math.PI / 8;
    for (var i = 0; i < 8; i++) {
        var angle = slice * i;
        ballPoints[i].x = (x + ballRadius * Math.cos(angle));
        ballPoints[i].y = (y + ballRadius * Math.sin(angle));
    }
}

function ballPaddleCollisionDetection(){
	var onlyOnce = 0;
	realAngle = (angle - 180*6) - 180;
	if (ballFirstBounce){
		for (var i=0; i<8; i++){
			if (ballPoints[i].y > canvas.height - 80){
				if (onlyOnce == 0){
					dy = -speed * Math.cos(realAngle*2*Math.PI/180);
					dx = speed * Math.sin(realAngle*2*Math.PI/180);
					onlyOnce++;
					ballFirstBounce = false;
					paddleStartAnimation = false;
					paddleStartAnimationP2 = true;
				}
			}
		}
	}
	if (gameStarted){
		for (var i=0; i<8; i++){
			if (isInRangeOf(ballPoints[i].y, canvas.height - 80, canvas.height - 75) && ballPoints[i].x > paddleX && ballPoints[i].x < paddleX + paddleWidth){
				dy = -(Math.abs(dy));
				if (leftPressed && dx > -speed/4 && paddleX > 0){
					dx += -speed/7;
				}
				if (rightPressed && dx < speed/4 && paddleX < canvas.width - paddleX){
					dx += speed/10;			
				}
			}
		}
	}
}

function ballBricksCollisionDetection(){
	for (var c=0; c<brickColumnCount; c++){
		for (var r=0; r<brickRowCount; r++){
			for (var i=0; i<8; i++){
				if (bricks[c][r].hitpoints > -1 && !protected){
					var onlyOnceBrickHit = true;
					//left side of the bricks
					if (isInRangeOf(ballPoints[i].x, bricks[c][r].x, bricks[c][r].x + 2) && isInRangeOf(ballPoints[i].y, bricks[c][r].y, bricks[c][r].y + brickHeight)){
						dx = -(Math.abs(dx));
						if (onlyOnceBrickHit){
							bricks[c][r].hitpoints += -1;
							if (bricks[c][r].hitpoints == -1){
								bricksCount += -1;
							}
							score++;
							protected = true;
						}
						onlyOnceBrickHit = false;
						console.log("left");
					}
					//right side of the bricks
					if (isInRangeOf(ballPoints[i].x, bricks[c][r].x + brickWidth - 2, bricks[c][r].x + brickWidth) && isInRangeOf(ballPoints[i].y, bricks[c][r].y + brickHeight, bricks[c][r].y)){
						dx = Math.abs(dx);
						if (onlyOnceBrickHit) {
							bricks[c][r].hitpoints += -1;
							if (bricks[c][r].hitpoints == -1){
								bricksCount += -1;
							}
							score++;
							protected = true;
						}
						onlyOnceBrickHit = false;
						console.log("right");
					}
					//top side of the bricks
					if (isInRangeOf(ballPoints[i].x, bricks[c][r].x, bricks[c][r].x + brickWidth) && isInRangeOf(ballPoints[i].y, bricks[c][r].y, bricks[c][r].y + 2)){
						dy = -(Math.abs(dy));
						if (onlyOnceBrickHit) {
							bricks[c][r].hitpoints += -1;
							if (bricks[c][r].hitpoints == -1){
								bricksCount += -1;
							}
							score++;
							protected = true;
						}
						onlyOnceBrickHit = false;
						console.log("top");
					}
					//botton side of the bricks
					if (isInRangeOf(ballPoints[i].x, bricks[c][r].x, bricks[c][r].x + brickWidth) && isInRangeOf(ballPoints[i].y, bricks[c][r].y + brickHeight - 2, bricks[c][r].y + brickHeight)){
						dy = Math.abs(dy);
						if (onlyOnceBrickHit) {
							bricks[c][r].hitpoints += -1;
							if (bricks[c][r].hitpoints == -1){
								bricksCount += -1;
							}
							score++;
							protected = true;
						}
						onlyOnceBrickHit = false;
						console.log("bottom");
					}
				}
				
				if (bricksCount == 0){
					reinitialiseVars();
					hideElement("pong_singleplayer_interact", false);
					document.getElementById("pong_singleplayer_interact").innerHTML = "Click on this text or press enter to continue"
					gameStarted = false;
					ctx.font = "64px Fantasy";
					ctx.fillStyle = "#25DEAD";
					ctx.fillText("Round won! Congrats!", canvas.width/2 -200 , canvas.height/2 + 50);
					level++;
				}
			}
		}
	}
}

function clearBricksProtection(c, r){
	setTimeout(function (){
		bricks[c][r].protected = false;
	}, 20);
}
	
function ballBorderCollisionDetection(){
	if (gameStarted){
		if (y < ballRadius/2){
			dy = -dy;
		}
		if (y - ballRadius > canvas.height){
			gameStarted = false;
			ctx.font = "96px Fantasy";
			ctx.fillStyle = "#FF0000";
			ctx.fillText("Game over", canvas.width/2 -230 , canvas.height/2 + 50);
			ctx.font = "32px Arial";
			ctx.fillStyle = "#FF0000";
			ctx.fillText("Your score was: " + score, canvas.width/2 -140, canvas.height/2 + 90);
			hideElement("pong_singleplayer_interact", false);
			document.getElementById("pong_singleplayer_interact").innerHTML = "Click on this text or press enter to retry";
			reinitialiseVars();
			score = 0;
			drawScoreVar = false;
			drawGame();
		}
		if (x > canvas.width - ballRadius || x < 0 + ballRadius){
			dx = -dx;
		}
	}
}

function keyDownHandler(e){
	if (e.key == "Enter"){
		if (startGameOnlyOnce){
			startGame();
			startGameOnlyOnce = false;
		}
	}
	if (e.key == "d" || e.key == "ArrowRight"){
		if (!debugWin){
			rightPressed = true;
		}
	}
	if (e.key == "a" || e.key == "ArrowLeft"){
		if (!debugWin){
			leftPressed = true;
		}
	}
	if (e.key == "_" && debug){
		if (stop){
			interval = setInterval(drawGame, 10);
			stop = false;
			console.log(stop);
		}else{
			clearInterval(interval);
			stop = true;
			console.log(stop);
		}
	}
	if (e.key == "l" && debug){
		interval = setInterval(drawGame, 10);
	}
	if (e.key == "w" && debug){
		if (debugWin){
			debugWin = false;
			console.log(debugWin);
		}else{
			debugWin = true;
			console.log(debugWin);
		}
	}
	if (e.key == debugChars[debugInt]){
		debugInt++;
		if (debugInt == debugMax){
			debug = true;
			document.title = "Pong debug";
		}
	}
}

function keyUpHandler(e){
	if (e.key == "d" || e.key == "ArrowRight"){
		rightPressed = false;
	}
	if (e.key == "a" || e.key == "ArrowLeft"){
		leftPressed = false;
	}
}

function removeElement(elementId){
	var element = document.getElementById(elementId);
	element.parentNode.removeChild(element);
}

function hideElement(elementId, hide){
	if (hide){
		document.getElementById(elementId).style.visibility = "hidden";
	}else{
		document.getElementById(elementId).style.visibility = "visible";
	}
}

function getRandomInteger(min, max){
	return Math.floor((Math.random() * (max - min)) + min);
}

function isInRangeOf(value, first, second){
	if (value > first && value < second){
		return true;
	}else{
		return false;
	}
}