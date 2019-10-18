var game;

var gameOptions = {
	width:640,
	height:480
};

window.onload = function(){
	game = new Phaser.Game({
		width: gameOptions.width,
		height: gameOptions.height,
		backgroundColor: 0x000000,
		scene: [playGame],
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	window.focus();
}

class playGame extends Phaser.Scene{

	constructor(){
		super("PlayGame");
	}

	create(){
		this.snake = [this.add.rectangle(100,100,10,10,0xffffff)];
		this.cordsArray = [
			[100,100],
			[90,100],
			[80,100],
			[70,100],
			[60,100],
		];

		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();
		this.addTail();

		this.speed = 10;
		this.curDirection = 0;
		this.input.keyboard.on("keydown", this.changeDirection, this);
		this.counter = 0;

		this.gameTimer = this.time.addEvent({
			delay:500,
			callback: this.moveSnake,
			callbackScope: this,
			loop: true,
		});
		this.gameTimer.paused = false;
	}

	moveSnake(){

		this.cordsArray[1] = this.cordsArray[0];

		switch(this.curDirection){
			case 0:
				this.cordsArray[0][0] += this.speed;
				break;
			case 1:
				this.cordsArray[0][1] += this.speed;
				break;
			case 2:
				this.cordsArray[0][0] -= this.speed;
				break;
			case 3:
				this.cordsArray[0][1] -= this.speed;
				break;
		}
		
		this.snake[this.counter].x = this.cordsArray[0][0];
		this.snake[this.counter].y = this.cordsArray[0][1];
		this.cordsArray.shift();
		this.cordsArray.push([this.snake[this.counter].x, this.snake[this.counter].y]);

		this.counter++;
		if(this.counter > this.snake.length-1){
			this.counter = 0;
		}
	}

	changeDirection(e){
		switch(e.code){
			case "ArrowUp":
				this.curDirection = 3;
				break;
			case "ArrowLeft":
				this.curDirection = 2;
				break;
			case "ArrowDown":
				this.curDirection = 1;
				break;
			case "ArrowRight":
				this.curDirection = 0;
		}
	}

	addTail(){
		this.snake.push(this.add.rectangle(100,100,10,10,0xffffff));
		this.cordsArray.push([100,100]);
	}

	update(){

	}

}