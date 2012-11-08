exports.ClassA = ClassA;
function ClassA() {
    console.log('ClassA constructor called');
    this.className = 'ClassA';
}
ClassA.prototype.print = function(){
   console.log('className: '+this.className);
}

