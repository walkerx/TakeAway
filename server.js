function randomXToY(minVal,maxVal,floatVal)
{
  var randVal = minVal+(Math.random()*(maxVal-minVal));
  return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
}

//var userList = new Array();
var clients = {};
var io = require('socket.io').listen(8080);

io.sockets.on('connection', function (socket) {
	clients[socket.id] = {};
	socket.on('new', function (data) {
		clients[socket.id].name = data.name;
		var position = {};
		position.x = randomXToY(0, 700);
		position.y = randomXToY(-400, 0);
		clients[socket.id].position = position;
	    socket.emit('add', clients[socket.id]);
		socket.broadcast.emit('add', clients[socket.id]);
	});
  	socket.on('move', function (data) {
		switch (data.dir) {
	            case "left":
	                clients[socket.id].position.x -= 5;
	                break;
	            case "up":
	                clients[socket.id].position.y += 5;
	                break;
	            case "right":
	                clients[socket.id].position.x += 5;
	                break;
	            case "down":
	                clients[socket.id].position.y -= 5;
	                break;
		}
		socket.emit('move', clients[socket.id]);
		socket.broadcast.emit('move', clients[socket.id]);
	});
	socket.on('disconnect', function () {
		delete clients[socket.id];
	});
});