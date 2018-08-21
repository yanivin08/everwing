let	div = document.getElementsByTagName("div" )[0],
	bgCanvas = document.getElementById("background"),
	bgCtx = bgCanvas.getContext("2d"),
	canvas = document.getElementById("game"),
	ctx = canvas.getContext("2d");
//background canvas
bgCanvas.width = div.clientWidth;
bgCanvas.height = div.clientHeight;
//game canvas
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

let gameBox = canvas.getBoundingClientRect();
let postX = canvas.width/2,
	postY = canvas.height - canvas.height * .08,
	gameArr = [], count = 20;
	
let keyPress = {a:0,w:0,d:0,s:0}

class background{
	constructor(){
		//initialized background
		this.speed = 2;
		this.x = 0;
		this.bg = new Image;
		this.bg.src = "bgstar.png"
	}
	drawBackground(){
		this.x += this.speed
		//add the first layer of the background
		bgCtx.drawImage(this.bg,0,this.x,this.bg.width*.775,this.bg.height*.775)
		//then add the second layer at the top of the first background
		bgCtx.drawImage(this.bg,0,this.x-bgCanvas.height,this.bg.width*.775,this.bg.height*.775)
		//loop once the first layer reach the end of the canvas.
		if(this.x >= bgCanvas.height){
			this.x = 0;
		}
	}
}

class games{
	constructor(x,y,left,right){
		this.x = x;
		this.y = y;
		this.spaceRad = 50;
		this.gunX = x;
		this.gunY = y;
		this.gunLeft = left;
		this.gunRight = right;
		this.enemyY = -100;
		this.enemyX = Math.floor((Math.random() * canvas.width - (canvas.width*15)) + canvas.width * .05);
		this.spaceImg = new Image;
		this.spaceImg.src = "space.png";
		this.shootImg = new Image;
		this.shootImg.src = "shot.png";
	}
	drawShip(){
		//change the x and y coordination on keypress
		if(keyPress.a == 3){this.x -= keyPress.a}
		else if(keyPress.d == 3){this.x += keyPress.d}
		else if(keyPress.w == 3){this.y -= keyPress.w}
		else if(keyPress.s == 3){this.y += keyPress.s}
		//draw canvas with the new coordinates
		if(this.x-this.spaceImg.width*.12/2 > canvas.width*.03 && this.x-this.spaceImg.width*.12/2 < canvas.width - (canvas.width*.15) &&
			this.y-this.spaceImg.height*.12/2 > canvas.height*.03 && this.y-this.spaceImg.height*.12/2 < canvas.height - (canvas.height*.15)){
			ctx.beginPath();
			ctx.arc(this.x,this.y,this.spaceRad,0,2*Math.PI);
			ctx.stroke();
			ctx.closePath();
			
			ctx.drawImage(this.spaceImg,this.x-this.spaceImg.width*.12/2,this.y-this.spaceImg.height*.12/2,this.spaceImg.width*.12,this.spaceImg.height*.12);
		}else if(this.x-this.spaceImg.width*.12/2 < canvas.width*.03){
			this.x += keyPress.a
			ctx.drawImage(this.spaceImg,canvas.width*.03,this.y-this.spaceImg.height*.12/2,this.spaceImg.width*.12,this.spaceImg.height*.12);
		}else if(this.x-this.spaceImg.width*.12/2 > canvas.width - (canvas.width*.15)){
			this.x -= keyPress.d
			ctx.drawImage(this.spaceImg,canvas.width - (canvas.width*.15),this.y-this.spaceImg.height*.12/2,this.spaceImg.width*.12,this.spaceImg.height*.12);
		}else if(this.y-this.spaceImg.height*.12/2 < canvas.height*.03){
			this.y += keyPress.w
			ctx.drawImage(this.spaceImg,this.x-this.spaceImg.width*.12/2,canvas.height*.03,this.spaceImg.width*.12,this.spaceImg.height*.12);
		}else if(this.y-this.spaceImg.height*.12/2 > canvas.height - (canvas.height*.15)){
			this.y -= keyPress.s
			ctx.drawImage(this.spaceImg,this.x-this.spaceImg.width*.12/2,canvas.height - (canvas.height*.15),this.spaceImg.width*.12,this.spaceImg.height*.12);
		}
		//then get the new coordinates and assign to the new set of array
		postX = this.x;
		postY = this.y;
	}
	triggerShoot(){
		this.gunY -= 8;
		ctx.drawImage(this.shootImg,this.gunX-this.gunLeft,this.gunY,this.shootImg.width*.05,this.shootImg.height*.05);
		ctx.drawImage(this.shootImg,this.gunX+this.gunRight,this.gunY,this.shootImg.width*.05,this.shootImg.height*.05);
	}
	getEnemy(){

		this.enemyY += 5;
		
		ctx.beginPath();
		ctx.arc(this.enemyX,this.enemyY,50,0,2*Math.PI);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	}
}


function start(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	//game.drawShip();
	count -= 1;
	gameArr.forEach(x => x.drawShip());
	if(count == 0){
		//console.log(gameArr);
		game = new games(postX,postY,35,25);
		gameArr.push(game);
		game = new games(postX,postY,35,25);
		gameArr.push(game);
		
		count = 20;
	}
	
	gameArr.forEach(x => x.drawShip());
	gameArr.forEach(x => x.triggerShoot());
	gameArr.forEach(x => x.getEnemy());
	gameArr = gameArr.filter(x => x.gunY > 0);
	//gameArr = gameArr.filter(x =>)
	createBg.drawBackground();
	requestAnimationFrame(start);
}

window.onkeydown = function(e){
	if(e.key == 'a' || e.key == 'ArrowLeft'){
		keyPress.a = 3
	}else if(e.key == 'd' || e.key == 'ArrowRight'){
		keyPress.d = 3
	}else if(e.key == 'w' || e.key == 'ArrowUp'){
		keyPress.w = 3
	}else if(e.key == 's' || e.key == 'ArrowDown'){
		keyPress.s = 3
	}
}

window.onkeyup = function(){
	keyPress = {a:0,s:0,d:0,w:0};
}

createBg = new background();
start();
