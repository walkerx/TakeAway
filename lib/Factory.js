var util = require("util");
var Tank = require('./Tank').Tank;
var Bullet = require('./Bullet').Bullet;
var fn = require('./fnlib');

var create = exports.create = function(name, type){
	var x = fn.randomXToY(0, 300), y = fn.randomXToY(0, 200);
	switch(type){
		case "0": 
			return new MyTank(x, y, name);
		case "1":
			return new Tank1(x, y, name);
		case "2":
			return new Tank2(x, y, name);
		case "3":
		    return new Tank3(x, y, name);
		default:
			return new MyTank(x, y, name);
	}
}

function MyTank(x, y, name)
{
	Tank.call(this, x, y, "myTank", 2, 0, name);
	this.isGod = true;
	this.godTime = 600;
	this.dir = 0;
	this.score = 0;
	//this.name = 0;
	this.live = 5;
	this.score = 0;
}
util.inherits(MyTank, Tank);
//MyTank.prototype = new Tank();

/*
MyTank.prototype.shot = function()
{
	if(!this.isShot)
	{	
		this.isShot = true;
		var bullet = new Bullet(this.x,this.y,this.type,this.dir,this.name);
		//bullets.push(bullet);
		return bullet;
		//sound.play("attack");
	}
};*/

MyTank.prototype.updata = function()
{
	if(this.isShot) 
	{
		this.time++;
		if(this.time > this.shotSpeed)
		{
			this.time = 0;
			this.isShot = false;
		}
	}
	
	if(this.isGod) 
	{
		this.godTime--;		
		//changed by me
		if(this.godTime == 0)	{this.godTime = 600}//{this.isGod = false;}
	}
};

function Tank1(x, y, name)
{
	Tank.call(this, x, y, "tank1", 2, 1, name);
	this.score = 100;
}
util.inherits(Tank1, Tank);

function Tank2(x, y, name)
{
	Tank.call(this, x, y, "tank2", 3, 2, name);
	this.score = 200;
}
util.inherits(Tank2, Tank);

function Tank3(x, y, name)
{
	Tank.call(this, x, y, "tank3", 1, 3, name);
	this.life = 3;
	this.score = 400;
	return;
}
util.inherits(Tank3, Tank);


