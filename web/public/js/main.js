var socket = io.connect('http://localhost',{port:8080});
var tanks = {};
var key = {};
var bullets = {};

function main()
{
	setInterval("loop()",20);
}

function loop(){
	draw();
	updata();
}

function draw()
{
	clear("main");
	//drawHitFxs();
	//drawBombFxs();
	drawTanks();
	//drawBullets();
	//drawTankStarts();
	//drawFood();
	//drawScoreNums();
}

function updata()
{
	//updataHitFxs();
	//updataBombFxs();
	//updataBullets();
	//updataTanks();
	//updataTankStarts();
	//updataFood();
	//addTanks();
	keyboardEvent();
}

function updataTanks()
{	
	//for(var i = 0; i < playerNum; i ++)
	for(var i in tanks)
	{
		tanks[i].updata();
	}
}

function drawTanks()
{
	//for(var i = 0; i < tanks.length ; i ++)
	for(var i in tanks)
	{
		tanks[i].draw("main");
	}
}

function clear(whichCanvas)
{	
	var myCanvas = document.getElementById(whichCanvas);
	var graphics = myCanvas.getContext("2d");
	
	graphics.clearRect(0,0,512,448);
}
