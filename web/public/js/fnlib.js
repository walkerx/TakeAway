function join(){
	var user = {};
	user.name = $("#name").val();		
	socket.emit('new', user);
	$("#top").html("<div id=log></div><div id=dir></div>");
}

function addPlayer(data){	
	addTank(data.position.x,data.position.y,0,data.name);
	//$("#log").text(data.name + ".." + data.position.x.toString() + "..." + data.position.y.toString());
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
	tanks[data.name].x = data.position.x;
	tanks[data.name].y = data.position.y;
	tanks[data.name].dir = data.dir;
	//$("#dir").text(dir.name + "..." + dir.position.x + "..." + dir.position.y);
}

function updateTank(data){
	tanks[data.name].x = data.position.x;
	tanks[data.name].y = data.position.y;
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
	}
	if(tank.type == 0) {tank.name = name;}
	tanks[name] = tank;
}






