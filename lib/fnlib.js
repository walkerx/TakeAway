
exports.randomXToY = function (minVal,maxVal,floatVal){
	var randVal = minVal+(Math.random()*(maxVal-minVal));
	return typeof floatVal=='undefined'?Math.round(randVal):randVal.toFixed(floatVal);
};


exports.battleField = function (tanks, bullets) {
	var empty = true;
	for(var x in tanks){
		empty = false;
		break;
	}
	if(empty) return;
	
	for(var i = 0; i < bullets.length; i++){
		//console.log(bullets[i]);
		bullets[i].move();
	}
};