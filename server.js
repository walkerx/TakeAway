var players = {};

var io = require('socket.io').listen(8080);
var util = require('util');
var fn = require('lib/fnlib');
var factory = require('lib/Factory');

io.sockets.on('connection', function (socket) {
	//players[socket.id] = new Tank();
	socket.on('new', function (data) {
		players[socket.id] = factory.create(data.name, 1);
		socket.broadcast.emit('addOne', players[socket.id]);
	    socket.emit('addAll', players);
	});
	
  	socket.on('move', function (data) {
		players[socket.id].move(data.dir);
		socket.emit('move', players[socket.id]);
		socket.broadcast.emit('move', players[socket.id]);
	});
	
	socket.on('shot', function () {
		players[socket.id].shot();
		socket.emit('shot', players[socket.id]);
		socket.broadcast.emit('shot', players[socket.id]);
	});
	/*socket.on('bulletMove', function () {
		socket.broadcast.emit('updateBullets', bullets);
	}*/
	socket.on('disconnect', function () {
		socket.broadcast.emit('remove', players[socket.id]);
		delete players[socket.id];
	});
});