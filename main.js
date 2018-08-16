
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
//get the boundbox for the mouse x and y;
let gameBox = canvas.getBoundingClientRect();

let mouseX, mouseY, spaceShips, shotGuns, createBg, enemy = [], bullets = [];

let spaceImg = new Image;
spaceImg.src = "space.png";
let shootImg = new Image;
shootImg.src = "shot.png";

let shotY = (canvas.height-(canvas.height*.15))-shootImg.height*.07/2;
//this is where we put the moving background
class background{
	constructor(){
		//initialized background
		this.speed = 1;
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
//draw the spacecraft
class spacecraft{
	constructor(x,y,dX,dY){
		//initialized spacecraft
		this.x = x;
		this.y = y;
		this.dx = dX;
		this.dy = dY;
		this.trueX = (dX - gameBox.x) - canvas.width/2;
		this.trueY = (canvas.width/2 - ((dY - gameBox.y) + canvas.width/2)) + canvas.width/2;
		this.deg = (Math.atan2(this.trueY,this.trueX)) * 180/Math.PI;
	}
	drawImage(){
		//draw the spacecraft
		ctx.clearRect(0,0,canvas.width,canvas.height);
		if(((this.dx-gameBox.x)-spaceImg.width*.15/2)>10 &&((this.dx-gameBox.x)-spaceImg.width*.15/2)<420){
			ctx.drawImage(spaceImg,(this.dx-gameBox.x)-spaceImg.width*.15/2,(canvas.height-(canvas.height*.10))-spaceImg.height*.15/2,spaceImg.width*.15,spaceImg.height*.15);
		}else if(((this.dx-gameBox.x)-spaceImg.width*.15/2)<10){
			ctx.drawImage(spaceImg,10,(canvas.height-(canvas.height*.10))-spaceImg.height*.15/2,spaceImg.width*.15,spaceImg.height*.15);
		}else if(((this.dx-gameBox.x)-spaceImg.width*.15/2)>420){
			ctx.drawImage(spaceImg,420,(canvas.height-(canvas.height*.10))-spaceImg.height*.15/2,spaceImg.width*.15,spaceImg.height*.15);
		}
	}
}

class shootGun{
	constructor(dx,dy,speed){
		this.dx = dx;
		this.dy = dy;
		this.speed = speed
	}
	triggerGun(){
		this.speed -= 8;
		if(((this.dx-gameBox.x)-spaceImg.width*.10/2)>10 &&((this.dx-gameBox.x)-spaceImg.width*.10/2)<420){
			ctx.drawImage(shootImg,((this.dx-gameBox.x)-shootImg.width*.07/2)+35,this.speed,shootImg.width*.07,shootImg.height*.07)
			ctx.drawImage(shootImg,((this.dx-gameBox.x)-shootImg.width*.07/2)-35,this.speed,shootImg.width*.07,shootImg.height*.07)
		}else if(((this.dx-gameBox.x)-spaceImg.width*.15/2)<10){
			ctx.drawImage(shootImg,80,this.speed,shootImg.width*.07,shootImg.height*.07)
			ctx.drawImage(shootImg,10,this.speed,shootImg.width*.07,shootImg.height*.07)
		}else if(((this.dx-gameBox.x)-spaceImg.width*.15/2)>420){
			ctx.drawImage(shootImg,485,this.speed,shootImg.width*.07,shootImg.height*.07)
			ctx.drawImage(shootImg,415,this.speed,shootImg.width*.07,shootImg.height*.07)
		}
	}
}

//function for animation
function start(){
	//draw the background
	createBg.drawBackground();
	//add the spaceships
	spaceShips = new spacecraft(canvas.width/2,canvas.height/2,mouseX,mouseY);
	spaceShips.drawImage();
	//draw the bullets if trigger
	bullets.forEach(x => x.triggerGun());
	//loop
	requestAnimationFrame(start);
}

//this is where we add bullets on mouse click
window.onclick = function(e){
	shotGuns = new shootGun(e.clientX,e.clientY,shotY);
	bullets.push(shotGuns);
}

//get the x and y coordinates on mouse move
window.onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
}

createBg = new background();
start();
