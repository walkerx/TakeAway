var clients = {};
var bullets = [];

var io = require('socket.io').listen(8080);
var fn = require('lib/fnlib');
var tank = require('lib/Tank');

io.sockets.on('connection', function (socket) {
	clients[socket.id] = {};
	socket.on('new', function (data) {
		clients[socket.id] = { "name" : data.name , "isShot" : false, "dir" : 0 };
		var position = {};
		position.x = fn.randomXToY(0, 300);
		position.y = fn.randomXToY(0, 200);
		clients[socket.id].position = position;
		for(var i in clients){
	    	socket.emit('add', clients[i]);
		}
		socket.broadcast.emit('add', clients[socket.id]);
	});
  	socket.on('move', function (data) {
		clients[socket.id].dir = data.dir;
		switch (data.dir) {
	    		case 2:
	        		clients[socket.id].position.x -= 2;
	            	break;
	            case 0:
	                clients[socket.id].position.y -= 2;
	                break;
	            case 3:
	                clients[socket.id].position.x += 2;
	                break;
	            case 1:
	                clients[socket.id].position.y += 2;
	                break;
				default:
					return;
		}
		socket.emit('move', clients[socket.id]);
		socket.broadcast.emit('move', clients[socket.id]);
	});
	socket.on('shot', function () {
		if(clients[socket.id].isShot === false){
			clients[socket.id].isShot = ture;
			var bullets = clients[socket.id].bullets;
			for(var i = 0; i <= bullets.length; i++){
					switch (bullets[i].dir) {
						case 0:
							bullets[i].y -= 10;
						case 1:
							bullets[i].y += 10;
						case 2:
							bullets[i].x -= 10;
						case 3:
							bullets[i].x += 10;
						default:
							return;
					}
			}
			socket.emit('shot', clients[socket.id]);
			socket.broadcast.emit('shot', clients[socket.id]);
		}else if(clients[socket.id].isShot === true){
			
		}
	});
	socket.on('bulletMove', function () {
		
		socket.broadcast.emit('updateBullets', bullets);
	}
	socket.on('disconnect', function () {
		socket.broadcast.emit('remove', clients[socket.id]);
		delete clients[socket.id];
	});
});