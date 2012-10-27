function randomXToY(minVal,maxVal,floatVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

var clients = {};
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
	clients[socket.id] = {};
	socket.on('new', function (data) {
		clients[socket.id].name = data.name;
		var position = {};
		position.x = randomXToY(0, 300);
		position.y = randomXToY(0, 200);
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
		}
		socket.emit('move', clients[socket.id]);
		socket.broadcast.emit('move', clients[socket.id]);
	});
	socket.on('disconnect', function () {
		socket.broadcast.emit('remove', clients[socket.id]);
		delete clients[socket.id];
	});
});