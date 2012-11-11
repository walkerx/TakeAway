function join(){
	var user = {};
	user.name = $("#name").val();
	user.type = $("#type").val();		
	socket.emit('new', user);
	$("#top").html("<div id=log></div><div id=dir></div>");
}

function addPlayer(data){	
	addTank(data.x, data.y, data.type, data.name);
	//$("#log").text(data.name + ".." + data.position.x.toString() + "..." + data.position.y.toString());
}

function addPlayers(data){
	for(var i in data){	
		addTank(data[i].x, data[i].y, data[i].type, data[i].name);
	}
	$("#log").text(data.name + ".." + data.x + "..." + data.y);
}

function removePlayer(data){
	delete tanks[data.name];
}

function move(dir) {
	var data = {};
	data.dir = dir;
	//var date = new Date();
	//$("#log").text(date.getTime()+ "");
	socket.emit("move", data);
}

function updatePosition(data) {
	//var date = new Date();
	//$("#dir").text(date.getTime()+"");
	tanks[data.name].x = data.x;
	tanks[data.name].y = data.y;
	tanks[data.name].dir = data.dir;
	$("#dir").text(data.name + "..." + data.x + "..." + data.y);
}

function updateTank(data){
	tanks[data.name].x = data.x;
	tanks[data.name].y = data.y;
}

function addTank(x, y, type, name)
{
	var tank;
	switch(type)
	{
		case 0: tank = new MyTank(x,y);
				break;
		case 1: tank = new Tank1(x,y);
				break;
		case 2: tank = new Tank2(x,y);
				break;
		case 3: tank = new Tank3(x,y);
				break;
		default: tank = new MyTank(x, y);
				break;
	}
	//if(tank.type == 0) {
	tank.name = name;
	tanks[name] = tank;
}

function shot()
{
	socket.emit('shot');
}

function addBullet(data){
	var bullet = new Bullet(data.x, data.y, data.type, data.dir, data.name);
	bullets.push(bullet);
}

function updateBullets(data){
	var newBullets = [];
	for(var i = 0; i < data.length; i++){
		var bullet = new Bullet(data[i].x, data[i].y, data[i].type, data[i].dir, data[i].name);
		newBullets.push(bullet);
	}
	bullets = newBullets;
}



