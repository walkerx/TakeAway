Array.prototype.remove=function(dx) 
{ 
    if(isNaN(dx)||dx>this.length){return false;} 
    for(var i=0,n=0;i<this.length;i++) 
    { 
        if(this[i]!=this[dx]) 
        { 
            this[n++]=this[i]; 
        } 
    } 
    this.length-=1;
}

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
	for(var i in tanks){
		tanks[i].updata();
	}
	
	for(var i = 0; i < bullets.length; i++){
		//console.log(bullets[i]);
		if(bullets[i].x < 500 && bullets[i].x > -100 && bullets[i].y > -100 && bullets[i].y < 400){
			bullets[i].move();
		}else{
			bullets.remove(i);
		}
	}
};