
let	div = document.getElementsByTagName("div" )[0],
	bgCanvas = document.getElementById("background"),
	bgCtx = bgCanvas.getContext("2d"),
	canvas = document.getElementById("game"),
	ctx = canvas.getContext("2d");

bgCanvas.width = div.clientWidth;
bgCanvas.height = div.clientHeight;
canvas.width = div.clientWidth;
canvas.height = div.clientHeight;

let gameBox = canvas.getBoundingClientRect();

let mouseX, mouseY, spaceShips, shotGuns, createBg, ships = [], bullets = [];

let spaceImg = new Image;
spaceImg.src = "space.png";
let shootImg = new Image;
shootImg.src = "shot.png";

let shotY = (canvas.height-(canvas.height*.15))-shootImg.height*.07/2;

class background{
	constructor(){
		this.speed = 1;
		this.x = 0;
		this.bg = new Image;
		this.bg.src = "bgstar.png"
	}
	drawBackground(){
		//bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
		this.x += this.speed
		bgCtx.drawImage(this.bg,0,this.x,this.bg.width*.775,this.bg.height*.775)
		bgCtx.drawImage(this.bg,0,this.x-bgCanvas.height,this.bg.width*.775,this.bg.height*.775)
		
		if(this.x >= bgCanvas.height){
			this.x = 0;
		}
	}
}

class spacecraft{
	constructor(x,y,dX,dY){
		this.x = x;
		this.y = y;
		this.dx = dX;
		this.dy = dY;
		this.trueX = (dX - gameBox.x) - canvas.width/2;
		this.trueY = (canvas.width/2 - ((dY - gameBox.y) + canvas.width/2)) + canvas.width/2;
		this.deg = (Math.atan2(this.trueY,this.trueX)) * 180/Math.PI;
	}
	drawLine(){
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.dx-gameBox.left,this.dy-gameBox.top);
		ctx.stroke();
	}
	drawImage(){
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

function start(){
	createBg.drawBackground();
	ships.forEach(x => x.drawImage());
	bullets.forEach(x => x.triggerGun());
	requestAnimationFrame(start);
}

window.onclick = function(e){
	//spaceShips.shootGun();
	shotGuns = new shootGun(e.clientX,e.clientY,shotY);
	bullets.push(shotGuns);
}

window.onmousemove = function(e){
	mouseX = e.clientX;
	mouseY = e.clientY;
	spaceShips = new spacecraft(canvas.width/2,canvas.height/2,mouseX,mouseY);
	ships.push(spaceShips);
}

createBg = new background();


start();