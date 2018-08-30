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

let minX = canvas.width * .05,
	maxX = canvas.width - (canvas.width*.15);

let gameBox = canvas.getBoundingClientRect();
let postX = canvas.width/2,
	postY = canvas.height - canvas.height * .08,
	gameArr = [], count = 20, fire = 500;
	
let keyPress = {a:0,w:0,d:0,s:0}

let thisGame = true;

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
	constructor(x,y,adj,post,type){
		this.enemy = Math.random() >= 0.5;//true;
		this.gun = true;
		this.life = true;
		this.enemyLife = 5;
		this.x = x;
		this.y = y;
		this.spaceRad = 15;
		this.gunX = x;
		this.gunY = y;
		this.offset = adj;
		this.gunPlace = post;
		this.enemyY = -5;
		this.fireX = x;
		this.fireY = -5;
		this.enemyX =  Math.random() * (maxX - minX) + minX;
		this.enemySpeed = Math.random() * (7 - 3) + 3;
		this.spaceImg = new Image;
		this.spaceImg.src = "space.png";
		this.shootImg = new Image;
		this.shootImg.src = "shot.png";
		this.fireImg = new Image;
		this.fireImg.src = "fire.png"
		this.enemyImg = new Image;
		this.enemyImg.src = "monster.png"
		this.type = type;
	}
	drawShip(){
		//change the x and y coordination on keypress
		if(keyPress.a == 5){this.x -= keyPress.a}
		else if(keyPress.d == 5){this.x += keyPress.d}
		else if(keyPress.w == 5){this.y -= keyPress.w}
		else if(keyPress.s == 5){this.y += keyPress.s}
		//draw canvas with the new coordinates
		if(this.x-this.spaceImg.width*.12/2 > canvas.width*.03 && this.x-this.spaceImg.width*.12/2 < canvas.width - (canvas.width*.15) &&
			this.y-this.spaceImg.height*.12/2 > canvas.height*.03 && this.y-this.spaceImg.height*.12/2 < canvas.height - (canvas.height*.15)){			
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
		if(this.gunPlace == "left"){
			/*ctx.beginPath();
			ctx.arc(this.gunX-this.offset,this.gunY,15,0,2*Math.PI);
			ctx.strokeStyle = "white"
			ctx.stroke();
			ctx.closePath();*/
			ctx.drawImage(this.shootImg,this.gunX-this.offset-(this.shootImg.width*.06/2),this.gunY-(this.shootImg.height*.06/2),this.shootImg.width*.06,this.shootImg.height*.06);
		}else if(this.gunPlace == "right"){
			/*ctx.beginPath();
			ctx.arc(this.gunX+this.offset,this.gunY,15,0,2*Math.PI);
			ctx.strokeStyle = "white"
			ctx.stroke();
			ctx.closePath();*/
			ctx.drawImage(this.shootImg,this.gunX+this.offset-(this.shootImg.width*.06/2),this.gunY-(this.shootImg.height*.06/2),this.shootImg.width*.06,this.shootImg.height*.06);
		}
	}
	getEnemy(){
			this.enemyY += this.enemySpeed;
			ctx.beginPath();
			ctx.arc(this.enemyX,this.enemyY,this.spaceRad,0,2*Math.PI);
			ctx.fillStyle = "white";
			ctx.fill();
			ctx.closePath();
			//ctx.drawImage(this.enemyImg,this.enemyX-(this.enemyImg.width*.25/2),this.enemyY-(this.enemyImg.height*.25/2),this.enemyImg.width*.25,this.fireImg.enemyImg*.25);
			//ctx.drawImage(this.enemyImg,this.enemyX-(this.enemyImg.width*.12/2),this.enemyY-(this.enemyImg.height*.12/2),this.enemyImg.width*.12,this.enemyImg.height*.12);
	}		
	getBoss(){
		
	}
	getFireball(){
		if(this.type == 'fire'){
			
			this.fireY += 15
			
			/*ctx.beginPath();
			ctx.arc(this.fireX,this.fireY,30,0,2*Math.PI);
			ctx.fiilStyle = "yellow";
			ctx.fill();
			ctx.closePath()*/
			//ctx.drawImage(this.enemyImg,this.fireX-(this.enemyImg.width*.25/2),this.fireY-(this.enemyImg.height*.25/2),this.enemyImg.width*.25,this.enemyImg.height*.25);
			ctx.drawImage(this.fireImg,this.fireX-(this.fireImg.width*.25/2),this.fireY-(this.fireImg.height*.25/2),this.fireImg.width*.25,this.fireImg.height*.25);
		}
	}
	gameCollision(){
		//test the current fire
		//left fire
		if(this.gunPlace == "left"){
			//loop through all object in array for the enemy collision
			gameArr.forEach(x => {
				let distX = (this.gunX-this.offset) - x.enemyX,
					distY = this.gunY - x.enemyY;
				let dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
				if(dist <= (15 + this.spaceRad)){
					//once collide dec enemys life
					x.enemyLife -= 1;
					this.gun = false;
					if(x.enemyLife == 0){
						//if life is zero make it false
						x.enemy = false;
					}
				}
			});
		//right fire
		}else if(this.gunPlace == "right"){
			//loop through all object in array for the enemy collision
			gameArr.forEach(x => {
				let distX = (this.gunX+this.offset) - x.enemyX,
					distY = this.gunY - x.enemyY;
				let dist = Math.sqrt(Math.pow(distX,2) + Math.pow(distY,2));
				if(dist <= (15 + this.spaceRad)){
					//once collide dec enemys life
					x.enemyLife -= 1;
					this.gun = false;
					if(x.enemyLife == 0){
						//if life is zero make it false
						x.enemy = false;
					}
				}
			});
		}
		
		
		//change life from true to false if the obj is not needed anymore.
		if(this.gunY < 0 && this.enemyY > canvas.height && this.type == 'none'){
			this.life = false;
		}else if(this.gun == false && this.enemy == false && this.type == 'none'){
			this.life = false;
		}else if(this.gunY < 0 && this.enemy == false && this.type == 'none'){
			this.life = false;
		}else if(this.gun == false && this.enemyY > canvas.height && this.type == 'none'){
			this.life = false;
		}else if(this.fireY > canvas.height){
			this.life = false;
		}
	}
	enemyCollide(){
		gameArr.forEach(x => {
			let distEnemyX = this.x - x.enemyX,
				distEnemyY = this.y - x.enemyY,
				distFireX = this.x - x.fireX,
				distFireY = this.y - x.fireY;
			let distEnemy = Math.sqrt(Math.pow(distEnemyX,2) + Math.pow(distEnemyY,2)),
				distFire = Math.sqrt(Math.pow(distFireX,2) + Math.pow(distFireY,2));
			
			if(distEnemy <= (30 + this.spaceRad) || distFire <= (60)){
					//once collide dec enemys life
					thisGame = false;
			}
		});
	}
}


function start(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	count -= 1;
	fire -= 1;	
	//autofire
	if(count == 0){
		game = new games(postX,postY,35,'left','none');
		gameArr.push(game);
		game = new games(postX,postY,35,'right','none');
		gameArr.push(game);
		count = 20;
	}
	//countdown for fireball
	if(fire == 0){
		game = new games(postX,postY,0,'none','fire');
		gameArr.push(game);
		fire = parseInt(Math.random() * (500 - 50) + 50);
	}
	//draw fireball
	gameArr.forEach(x => x.getFireball());
	//draw auto fire
	gameArr.forEach(x => x.gun == true && x.type == 'none' ? x.triggerShoot() : 0);
	//draw enemy
	gameArr.forEach(x => x.enemy == true && x.type == 'none' ? x.getEnemy() : 0);
	//check fire and enemy collision
	gameArr.forEach(x => x.gameCollision());
	gameArr.forEach(x => x.enemyCollide());
	//draw ships
	gameArr.forEach(x => x.drawShip());
	//filter arr. remove those not in need
	gameArr = gameArr.filter(x => x.life == true);
	//animate background
	createBg.drawBackground();
	if(thisGame){
		requestAnimationFrame(start);
	}
}

//on key down function
window.onkeydown = function(e){
	if(e.key == 'a' || e.key == 'ArrowLeft'){
		keyPress.a = 5
	}else if(e.key == 'd' || e.key == 'ArrowRight'){
		keyPress.d = 5
	}else if(e.key == 'w' || e.key == 'ArrowUp'){
		keyPress.w = 5
	}else if(e.key == 's' || e.key == 'ArrowDown'){
		keyPress.s = 5
	}
}

//on key up function
window.onkeyup = function(){
	keyPress = {a:0,s:0,d:0,w:0};
}

createBg = new background();
start();
