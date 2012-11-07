
//socket.on('connect', function (socket) {
//});

socket.on('addOne', function (data) {
	addPlayer(data);
});

socket.on('addAll', function (data) {
	addPlayers(data);
});

socket.on("move", function (data) {
	updatePosition(data);
});

socket.on("remove", function (data) {
	removePlayer(data);
});

socket.on("shot", function (data) {
	addBullet(data);
});

socket.on("disconnect", function (data) {
	exit(data);
});

document.onkeydown = function(e) 
{
	key[e.keyCode] = true;
}
document.onkeyup = function(e) 
{
	key[e.keyCode] = false;
}

function keyboardEvent()
{
	if(key[K_UP]) {move(UP);}
	else if(key[K_DOWN]) {move(DOWN);}
	else if(key[K_LEFT]) {move(LEFT);}
	else if(key[K_RIGHT]) {move(RIGHT);}
	if(key[K_SPACE]) {shot();}
}


